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

if (!nexacro.Grid) {
	nexacro.GridLongPressEventInfo = function (obj, id, pointinfos, from_comp, from_refer_comp, cell, col, row, subrow, pivotindex, mergecell, mergecol, mergerow) {
		nexacro.LongPressEventInfo.call(this, obj, id, pointinfos, from_comp, from_refer_comp);

		this.cell = cell;
		this.col = col;
		this.row = row;
		this.subrow = subrow;
		this.pivotindex = pivotindex;
		this.mergecell = mergecell;
		this.mergecol = mergecol;
		this.mergerow = mergerow;
	};
	var _pGridLongPressEventInfo = nexacro._createPrototype(nexacro.LongPressEventInfo, nexacro.GridLongPressEventInfo);
	nexacro.GridLongPressEventInfo.prototype = _pGridLongPressEventInfo;
	_pGridLongPressEventInfo._type_name = "GridLongPressEventInfo";

	delete _pGridLongPressEventInfo;

	nexacro.GridDragEventInfo = function (obj, id, dragdata, userdata, datatype, filelist, src_comp, src_refer_comp, from_comp, from_refer_comp, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, cell, col, mergecell, mergecol, mergerow, pivotindex, row, subrow, meta_key) {
		nexacro.DragEventInfo.call(this, obj, id || "ongriddrag", dragdata, userdata, datatype, filelist, src_comp, src_refer_comp, from_comp, from_refer_comp, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, meta_key);

		this.cell = cell;
		this.col = col;
		this.row = row;
		this.subrow = subrow;
		this.pivotindex = pivotindex;
		this.mergecell = mergecell;
		this.mergecol = mergecol;
		this.mergerow = mergerow;
	};
	var _pGridDragEventInfo = nexacro._createPrototype(nexacro.DragEventInfo, nexacro.GridDragEventInfo);
	nexacro.GridDragEventInfo.prototype = _pGridDragEventInfo;
	_pGridDragEventInfo._type_name = "GridDragEventInfo";

	delete _pGridDragEventInfo;

	nexacro.GridClickEventInfo = function (obj, id, beforeCell, beforeCol, beforeRow, beforeSubrow, beforePvt, afterCell, afterCol, afterRow, afterSubrow, afterPvt, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		nexacro.ClickEventInfo.call(this, obj, id || "ongridclick", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);

		this.cell = afterCell;
		this.col = afterCol;
		this.row = afterRow;
		this.subrow = afterSubrow;
		this.pivotindex = afterPvt;
		this.oldcell = beforeCell;
		this.oldcol = beforeCol;
		this.oldrow = beforeRow;
		this.oldsubrow = beforeSubrow;
		this.oldpivotindex = beforePvt;
	};
	var _pGridClickEventInfo = nexacro._createPrototype(nexacro.ClickEventInfo, nexacro.GridClickEventInfo);
	nexacro.GridClickEventInfo.prototype = _pGridClickEventInfo;
	_pGridClickEventInfo._type_name = "GridClickEventInfo";
	_pGridClickEventInfo._is_event = true;
	delete _pGridClickEventInfo;

	nexacro.GridEditEventInfo = function (obj, id, cell, col, pivotindex, row, subrow, value) {
		this.id = this.eventid = id || "ongridedit";
		this.fromobject = this.fromreferenceobject = obj;
		this.cell = cell;
		this.col = col;
		this.row = row;
		this.subrow = subrow;
		this.pivotindex = pivotindex;
		this.value = value;
	};
	var _pGridEditEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.GridEditEventInfo);
	nexacro.GridEditEventInfo.prototype = _pGridEditEventInfo;
	_pGridEditEventInfo._type_name = "GridEditEventInfo";

	delete _pGridEditEventInfo;

	nexacro.GridKeyEventInfo = function (obj, id, cell, col, pivotindex, row, subrow, alt_key, ctrl_key, shift_key, key_code, meta_key) {
		this.id = this.eventid = id || "ongridkeyevent";
		this.fromobject = this.fromreferenceobject = obj;
		this.cell = cell;
		this.col = col;
		this.row = row;
		this.subrow = subrow;
		this.pivotindex = pivotindex;

		this.altkey = alt_key;
		this.ctrlkey = ctrl_key;
		this.shiftkey = shift_key;
		this.metakey = meta_key;
		this.keycode = key_code;
	};
	var _pGridKeyEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.GridKeyEventInfo);
	nexacro.GridKeyEventInfo.prototype = _pGridKeyEventInfo;
	_pGridKeyEventInfo._type_name = "GridKeyEventInfo";

	nexacro.GridInputEventInfo = function (obj, cell, col, row, subrow, pivotindex, id) {
		this.id = this.eventid = id || "oninput";
		this.fromobject = this.fromreferenceobject = obj;
		this.cell = cell;
		this.col = col;
		this.row = row;
		this.subrow = subrow;
		this.pivotindex = pivotindex;
	};
	var _pGridInputEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.GridInputEventInfo);
	nexacro.GridInputEventInfo.prototype = _pGridInputEventInfo;
	_pGridInputEventInfo._type_name = "GridInputEventInfo";

	delete _pGridInputEventInfo;

	nexacro.GridFormatChangedEventInfo = function (obj, id, newvalue, oldvalue, reason) {
		this.id = this.eventid = id || "ongridformatchanged";
		this.fromobject = this.fromreferenceobject = obj;
		this.newvalue = newvalue;
		this.oldvalue = oldvalue;
		this.reason = reason;
	};
	var _pGridFormatChangedEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.GridFormatChangedEventInfo);
	nexacro.GridFormatChangedEventInfo.prototype = _pGridFormatChangedEventInfo;
	_pGridFormatChangedEventInfo._type_name = "GridFormatChangedEventInfo";

	delete _pGridFormatChangedEventInfo;

	nexacro.GridSelectEventInfo = function (obj, id, cell, col, row, subrow, pivotindex, oldcell, oldcol, oldrow, oldsubrow, oldpivotindex, selectendcol, selectendpivot, selectendrow, selectendsubrow, selectstartcol, selectstartpivot, selectstartrow, selectstartsubrow) {
		this.id = this.eventid = id || "ongridselect";
		this.fromobject = this.fromreferenceobject = obj;

		this.cell = cell;
		this.col = col;
		this.row = row;
		this.subrow = subrow;
		this.pivotindex = pivotindex;

		this.oldcell = oldcell;
		this.oldcol = oldcol;
		this.oldrow = oldrow;
		this.oldpivotindex = oldpivotindex;
		this.oldsubrow = oldsubrow;

		this.selectendcol = selectendcol;
		this.selectendpivot = selectendpivot;
		this.selectendrow = selectendrow;
		this.selectendsubrow = selectendsubrow;

		this.selectstartcol = selectstartcol;
		this.selectstartpivot = selectstartpivot;
		this.selectstartrow = selectstartrow;
		this.selectstartsubrow = selectstartsubrow;
	};
	var _pGridSelectEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.GridSelectEventInfo);
	nexacro.GridSelectEventInfo.prototype = _pGridSelectEventInfo;
	_pGridSelectEventInfo._type_name = "GridSelectEventInfo";

	delete _pGridSelectEventInfo;

	nexacro.GridTreeStatusEventInfo = function (obj, id, cell, realrow, row, reason) {
		this.id = this.eventid = id || "ongridtreestatus";
		this.fromobject = this.fromreferenceobject = obj;
		this.cell = cell;
		this.realrow = realrow;
		this.row = row;
		this.reason = reason;
	};
	var _pGridTreeStatusEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.GridTreeStatusEventInfo);
	nexacro.GridTreeStatusEventInfo.prototype = _pGridTreeStatusEventInfo;
	_pGridTreeStatusEventInfo._type_name = "GridTreeStatusEventInfo";

	delete _pGridTreeStatusEventInfo;

	nexacro.GridMouseEventInfo = function (obj, id, cell, col, mergecell, mergecol, mergerow, pivotindex, row, subrow, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		nexacro.MouseEventInfo.call(this, obj, id || "ongridmouse", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);

		this.cell = cell;
		this.col = col;
		this.mergecell = mergecell;
		this.mergecol = mergecol;
		this.mergerow = mergerow;
		this.pivotindex = pivotindex;
		this.row = row;
		this.subrow = subrow;
	};
	var _pGridMouseEventInfo = nexacro._createPrototype(nexacro.MouseEventInfo, nexacro.GridMouseEventInfo);
	nexacro.GridMouseEventInfo.prototype = _pGridMouseEventInfo;
	_pGridMouseEventInfo._type_name = "GridMouseEventInfo";

	delete _pGridMouseEventInfo;

	nexacro.GridSizeChangedEventInfo = function (obj, id, formatindex, index, newvalue, oldvalue, reason, subindex) {
		this.id = this.eventid = id || "ongridsizechanged";
		this.fromobject = this.fromreferenceobject = obj;
		this.eventid = id;
		this.formatindex = formatindex;
		this.index = index;
		this.newvalue = newvalue;
		this.oldvalue = oldvalue;
		this.reason = reason;
		this.subindex = subindex;
	};

	var _pGridSizeChangedEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.GridSizeChangedEventInfo);
	nexacro.GridSizeChangedEventInfo.prototype = _pGridSizeChangedEventInfo;
	_pGridSizeChangedEventInfo._type_name = "GridSizeChangedEventInfo";

	delete _pGridSizeChangedEventInfo;

	nexacro._GridCellControl = function (id, left, top, width, height, right, bottom, parent, refinfo, rowidx, cellidx) {
		this._grid = refinfo ? refinfo._grid : null;

		nexacro._CellControl.call(this, id, left, top, width, height, right, bottom, parent, refinfo, cellidx, this._grid, rowidx);

		if (parent) {
			this._band = parent._band;
		}
		else {
			this._band = null;
		}

		this._clickcall = false;
		this._is_clickproc = false;
		this._refresh_display = false;

		this._cellExpandObj = "_GridExpandControl";
		this._cellButtonObj = "_GridButtonControl";
		this._cellCheckBoxObj = "_GridCheckboxControl";
		this._cellImageObj = "_GridImageControl";
		this._cellComboObj = "_GridComboControl";
		this._cellCalendarObj = "_GridCalendarControl";
		this._cellEditObj = "_GridEditControl";
		this._cellTextAreaObj = "_GridTextAreaControl";
		this._cellProgressBarObj = "_GridProgressBarControl";
		this._cellMaskEditObj = "_GridMaskEditControl";
		this._cellTreeObj = "_CellTreeItemControl";

		if (nexacro._enableaccessibility && refinfo) {
			var dispaytype = refinfo._getDisplaytype(rowidx);
			if (dispaytype == "treeitemcontrol") {
				this._skip_mobile_tabfocus = true;
			}
		}
	};

	var _pGridCell = nexacro._createPrototype(nexacro._CellControl, nexacro._GridCellControl);
	nexacro._GridCellControl.prototype = _pGridCell;
	_pGridCell._is_subcontrol = true;
	_pGridCell._type_name = "GridCellControl";


	_pGridCell._getDataRow = function () {
		var grid = this._grid;
		if (grid) {
			var datarow = grid._getDataRow(this._rowidx);
			return datarow;
		}
		else {
			return this._rowidx;
		}
	};

	_pGridCell._isFakeCell = function () {
		var grid = this._grid;
		return grid._isFakeCell(this._rowidx);
	};

	_pGridCell.destroy = function () {
		if (this._grid) {
			if (this._tree_lbuttondown && this._grid) {
				if (nexacro._Browser == "IE" && nexacro._BrowserVersion <= 8) {
					this._control_element.destroy();
				}

				this._grid._lbuttondown_treecell = this;
				nexacro._OnceCallbackTimer.callonce(this._grid, function () {
					if (this._lbuttondown_treecell) {
						this._lbuttondown_treecell.destroy();
					}
				}, 10);
				return;
			}

			if (this._grid._lbuttondown_treecell == this) {
				this._grid._lbuttondown_treecell = null;
			}
		}
		nexacro.Component.prototype.destroy.call(this);

		this._virtualmerge = null;
		this._grid = null;
		this._band = null;
	};

	_pGridCell.on_destroy_contents = function () {
		if (this._editor) {
			if (this._editor == this._grid._currentCellEditor) {
				this._grid._hideEditor();
			}
		}
		nexacro._CellControl.prototype.on_destroy_contents.call(this);
	};

	_pGridCell._on_apply_status = function (oldstatus, status, olduserstatus, userstatus, apply, status_param, value_param, applycssstatus, applycssuserstatus) {
		nexacro.Component.prototype._on_apply_status.call(this, oldstatus, status, olduserstatus, userstatus, apply, status_param, value_param, applycssstatus, applycssuserstatus);

		var grid = this._grid;
		var datarow = grid._getDataRow(this._rowidx);

		if (grid._isFakeCell(datarow)) {
			this._changeStatus("mouseover", false);
			this._changeStatus("focused", false);
			return;
		}
	};

	_pGridCell._on_focus = function (self_flag, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus) {
		this._grid._focused_row = this._getDataRow();
		this._grid._focused_cell = this._cellidx;
		nexacro.Component.prototype._on_focus.call(this, self_flag, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus);
	};

	_pGridCell.on_changeStatus = function (changestatus, value, applystatus, currentstatus, currentuserstatus) {
		if (this._getRowControl()._floating) {
			return "enabled";
		}

		return applystatus;
	};

	_pGridCell.on_changeUserStatus = function (changestatus, value, applyuserstatus, currentstatus, currentuserstatus) {
		if (this._getRowControl()._floating) {
			return "";
		}

		if (changestatus == "blinked" && value) {
			return changestatus;
		}

		return applyuserstatus;
	};

	_pGridCell.on_apply_status = function (status, userstatus, status_param, value_param) {
		if (!this._rowstatuschange) {
			if (status_param == "mouseover" || status_param == "focused") {
				this._grid._on_apply_cell_status(this, status_param, value_param);
			}
		}
	};

	_pGridCell._getClassCSSSelector = function () {
		var cssarr;
		if (this._getRowControl()._floating) {
			cssarr = nexacro.Component.prototype._getClassCSSSelector.call(this);
		}
		else {
			cssarr = nexacro._CellControl.prototype._getClassCSSSelector.call(this);
		}

		return cssarr;
	};

	_pGridCell._apply_setfocus = function (evt_name, self_flag) {
		nexacro._CellControl.prototype._apply_setfocus.call(this, evt_name, self_flag);

		var control_elem = this._control_element;


		if (evt_name == "lbuttondown") {
			this._grid._focus_proc = control_elem;
		}


		if (nexacro._enableaccessibility) {
			this._grid.currentcell = this._cellidx;
			this._grid._currentBand = this._band.id;
		}
	};

	_pGridCell._on_last_lbuttonup = function () {
		if (this.parent) {
			this.parent._on_last_lbuttonup();
		}
	};

	_pGridCell._on_last_keyup = function () {
		if (this.parent) {
			var grid = this._grid;
			var lastfocus = grid._find_lastFocused();
			var isfocused = true;
			if (grid) {
				isfocused = (lastfocus == grid) ? true : false;
				if (isfocused && !grid._showEditing && grid._is_data_enter_apply) {
					this._setFocus(false);
				}
			}
			this.parent._on_last_keyup();
		}
	};

	_pGridCell._on_killfocus = function () {
		this._setAccessibilityStatFlag(this._status, this._pseudo);
		if (nexacro._enableaccessibility) {
			if (nexacro._OS == "Android" && nexacro._Browser != "Runtime") {
				this._setAccessibilityStatLive(false);
			}
		}
	};

	_pGridCell._getTreeStatus = function () {
		return this._grid.getTreeStatus(this._rowidx);
	};


	_pGridCell.__getAccessibilityMakeAddLabelMiddleClass = function () {
		var tmpLabel = "", grid = this._grid, curCellinfo = this._refinfo, i, n;


		if (curCellinfo._type == "body" || curCellinfo._type == "summary") {
			var headband = grid._headBand;
			var label = "", cells = null, cellinfo = null, leftLabel = "", headLabel = "";

			if (this.parentcell) {
				cells = this.parentcell.parent._cells;
			}
			else {
				cells = this.parent._cells;
			}


			for (i = 0, n = cells.length; i < n; i++) {
				cellinfo = cells[i]._refinfo;

				if (cellinfo._area == "left") {
					label = cells[i]._getAccessibilityLabel(true);
					if (cellinfo._row <= curCellinfo._row && curCellinfo._row <= (cellinfo._row + cellinfo._rowspan - 1)) {
						if (leftLabel) {
							leftLabel += " " + label;
						}
						else {
							leftLabel = label;
						}
					}
				}
				else {
					break;
				}
			}


			if (headband) {
				var rows = headband._get_rows();
				var row_len = rows.length;
				if (rows && row_len) {
					cells = rows[0]._cells;

					for (i = 0, n = cells.length; i < n; i++) {
						cellinfo = cells[i]._refinfo;

						var is_currow = row_len == 1 ? true : cellinfo._row == curCellinfo._row ? true : false;
						if (is_currow && cellinfo._col <= curCellinfo._col && curCellinfo._col <= (cellinfo._colspan + cellinfo._col - 1)) {
							label = cells[i]._getAccessibilityLabel(true);
							if (headLabel) {
								headLabel = headLabel + " " + label;
							}
							else {
								headLabel = label;
							}
						}
					}
				}
			}


			if (curCellinfo._area == "left") {
				if (headLabel) {
					tmpLabel += " " + headLabel;
				}
			}
			else {
				if (grid.accessibilityreadbandlabel) {
					tmpLabel += " " + leftLabel + " " + headLabel;
				}
				else {
					if (leftLabel && grid._beforegridrowpos != grid.currentrow) {
						tmpLabel += " " + leftLabel;
					}

					if (grid._beforegridcolpos != grid.currentcol
						 || (grid._is_first_bodycell && (grid.currentcell == 0 || grid.currentrow == grid.rowcount - 1))) {
						if (headLabel) {
							if (tmpLabel) {
								tmpLabel = tmpLabel + " " + headLabel;
							}
							else {
								tmpLabel = headLabel;
							}
						}
					}
				}
			}
		}

		return tmpLabel;
	};

	_pGridCell._getAccessibilityRoleParentType = function () {
		var cellinfo = this._refinfo;
		var role;

		if (cellinfo._type == "head") {
			role = "columnheader";
		}
		else if (cellinfo._type == "body" && cellinfo._area == "left") {
			role = "rowheader";
		}

		return role;
	};


	_pGridCell._resetScrollPos = function (target_comp, left, top, right, bottom, focus_direction) {
		var grid = this._grid;
		if (grid) {
			if (nexacro._enableaccessibility && nexacro._accessibilitytype == 5 && grid._scrollbars == 0) {
				var row = this.parent;
				if (row) {
					row._showfull(this);
					top = row._adjust_top;
				}
				bottom = top + this._adjust_height;
				nexacro.Component.prototype._resetScrollPos.call(this, target_comp, left, top, right, bottom, focus_direction);
			}
		}
	};

	_pGridCell._common_lbuttonup = function (changedtouchinfos, elem, canvasX, canvasY, from_elem) {
		if (changedtouchinfos) {
			var touchinfo = nexacro._getFirstTouchInfo(changedtouchinfos);

			if (touchinfo) {
				elem = touchinfo._elem;
				canvasX = touchinfo.canvasx;
				canvasY = touchinfo.canvasy;
				from_elem = elem;
			}
		}

		if (elem != from_elem) {
			var upelem = this._is_real_upelem = from_elem;
			var grid = this._grid;
			var is_inGridElem = false;

			while (upelem) {
				if (upelem._type_name == "GridCellControl") {
					grid._lastmouseentercell = upelem;
				}
				if (upelem instanceof nexacro.Grid) {
					is_inGridElem = true;
					break;
				}
				upelem = upelem.parent;
			}

			if (!upelem) {
				this._is_real_upelem = upelem;
			}
			if (!is_inGridElem) {
				if (nexacro._Browser == "IE" || (nexacro._Browser == "Edge" && nexacro._BrowserType == "Edge")) {
					if (grid._showEditing && canvasX >= 0 && canvasX < this._adjust_width && canvasY >= 0 && canvasY < this._adjust_height) {
						grid._lastmouseentercell = this;
						this._clickcall = true;
					}
				}
			}
		}
		return true;
	};

	_pGridCell._on_touchend = function (touch_manager, touchinfos, changedtouchinfos) {
		if (this._common_lbuttonup(changedtouchinfos, null, null, null, null)) {
			nexacro.Component.prototype._on_touchend.call(this, touch_manager, touchinfos, changedtouchinfos);
		}
	};

	_pGridCell._on_lbuttonup = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, from_elem, meta_key) {
		if (this._common_lbuttonup(null, elem, canvasX, canvasY, from_elem)) {
			nexacro.Component.prototype._on_lbuttonup.call(this, elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, from_elem, meta_key);
		}

		return true;
	};

	_pGridCell._common_mouseenter = function (from_comp) {
		if (!this._is_alive) {
			return false;
		}

		var grid = this._grid;
		var datarow = grid._getDataRow(this._rowidx);

		if (grid._isFakeCell(datarow)) {
			return false;
		}

		if (from_comp != this) {
			if (this.parentcell) {
				grid._mouseovercell = {
					row : this.parentcell._rowidx, 
					cell : this.parentcell._cellidx
				};
				grid._lastmouseentercell = this.parentcell;
			}
			else {
				grid._mouseovercell = {
					row : this._rowidx, 
					cell : this._cellidx
				};
				grid._lastmouseentercell = this;
			}

			return true;
		}
		return true;
	};

	_pGridCell._on_mouseenter = function (elem, from_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, meta_key) {
		if (this._isSubCell) {
			return nexacro.Component.prototype._on_mouseenter.call(this, elem, from_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, meta_key);
		}
		else if (this._common_mouseenter(from_comp)) {
			return nexacro.Component.prototype._on_mouseenter.call(this._grid._lastmouseentercell, elem, from_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, meta_key);
		}
	};

	_pGridCell._common_mouseleave = function (to_comp) {
		if (!this._is_alive) {
			return false;
		}

		var grid = this._grid;
		var datarow = grid._getDataRow(this._rowidx);

		grid._setGlobalCursor(null, this, this);

		if (grid._isFakeCell(datarow)) {
			return false;
		}

		if (to_comp != this) {
			grid._mouseovercell = null;
			return true;
		}
		return false;
	};

	_pGridCell._on_mouseleave = function (elem, to_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, meta_key) {
		if (this._isSubCell) {
			return nexacro.Component.prototype._on_mouseleave.call(this, elem, to_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, meta_key);
		}
		else if (this._common_mouseleave(to_comp)) {
			if (!this._grid._lastmouseentercell) {
				this._grid._lastmouseentercell = this;
			}

			return nexacro.Component.prototype._on_mouseleave.call(this._grid._lastmouseentercell, elem, to_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, meta_key);
		}
	};

	_pGridCell._common_fire_lbuttondown = function (from_comp) {
		var grid = this._grid;
		var datarow = grid._getDataRow(this._rowidx);
		this._is_clickproc = false;
		this._clickcall = false;

		grid._lastmouseentercell = this;

		if (!grid || grid._isFakeCell(datarow)) {
			return false;
		}

		if (this._refinfo._isSubCell) {
			return this.parent._common_fire_lbuttondown(from_comp);
		}

		if (!this._is_mergetemp) {
			if (this._band.id == "body") {
				var show = false;

				if ((datarow != grid._selectinfo.curdsrow) || (this._cellidx != grid._selectinfo.curcell)) {
					if (grid.autoenter == "select") {
						show = true;
					}
				}
				else {
					if (!grid._showEditing) {
						show = true;
					}
				}
				if (show) {
					grid._showEditorCell = true;
					grid._showEditRowIdx = datarow;
					grid._showEditCellIdx = this._cellidx;
				}
			}
			else {
				if ((datarow != grid._selectinfo.curdsrow) || (this._cellidx != grid._selectinfo.curcell)) {
					if (grid._showEditing) {
						grid._hideEditor();
					}
				}
			}
		}
	};

	_pGridCell.on_fire_user_ontouchstart = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		this._common_fire_lbuttondown(from_comp);

		var parent = this._grid.parent;
		var touchinfo = nexacro._getFirstTouchInfo(changedtouchinfos);
		var subcomp = from_refer_comp;

		while (subcomp && subcomp instanceof nexacro.Component) {
			if (subcomp instanceof nexacro._GridCellControl) {
				break;
			}

			var canvas = subcomp._getRecalcCanvasXY(from_refer_comp._control_element, touchinfo.canvasx, touchinfo.canvasy);
			touchinfo.canvasx = canvas[0];
			touchinfo.canvasy = canvas[1];

			if (this._subComp == subcomp) {
				break;
			}

			subcomp = subcomp.parent;
		}

		if (this._isSubCell) {
			touchinfo.canvasx += this._adjust_left;
			touchinfo.canvasy += this._adjust_top;
			touchinfo.clientx += this._adjust_left;
			touchinfo.clienty += this._adjust_top;
		}

		if (this._subComp == from_comp) {
			var padding = this._getCurrentStylePadding();
			if (padding) {
				touchinfo.canvasx += padding.left;
				touchinfo.canvasy += padding.top;
				touchinfo.clientx += padding.left;
				touchinfo.clienty += padding.top;
			}
		}

		var retn = this._grid.on_fire_user_ontouchstart(touchinfos, changedtouchinfos, from_comp, from_refer_comp, true);

		var canvas_new = this._grid._getRecalcCanvasXY(from_refer_comp._control_element, touchinfo.canvasx, touchinfo.canvasy);
		touchinfo.canvasx = canvas_new[0];
		touchinfo.canvasy = canvas_new[1];

		var clientXY_new = this._getClientXY(touchinfo.clientx, touchinfo.clienty);
		touchinfo.clientx = clientXY_new[0];
		touchinfo.clienty = clientXY_new[1];

		if (!retn) {
			while (parent) {
				if (parent.on_fire_user_ontouchstart) {
					retn = parent.on_fire_user_ontouchstart(touchinfos, changedtouchinfos, from_comp, from_refer_comp);
					if (retn) {
						break;
					}
				}
				parent = parent.parent;
			}
		}
		return true;
	};

	_pGridCell.on_fire_user_onlbuttondown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		var subcomp = from_refer_comp;
		while (subcomp && subcomp instanceof nexacro.Component) {
			if (subcomp instanceof nexacro._GridCellControl) {
				break;
			}

			var canvas = subcomp._getRecalcCanvasXY(from_refer_comp._control_element, canvasX, canvasY);
			canvasX = canvas[0];
			canvasY = canvas[1];

			if (this._subComp == subcomp) {
				break;
			}

			subcomp = subcomp.parent;
		}

		this._common_fire_lbuttondown(from_comp);

		var parent = this._grid.parent;

		if (this._isSubCell) {
			canvasX += this._adjust_left;
			canvasY += this._adjust_top;
			clientX += this._adjust_left;
			clientY += this._adjust_top;
		}

		if (this._subComp == from_comp) {
			var padding = this._getCurrentStylePadding();
			if (padding) {
				canvasX += padding.left;
				canvasY += padding.top;
				clientX += padding.left;
				clientY += padding.top;
			}
		}

		var retn = this._grid.on_fire_user_onlbuttondown(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key, true);

		var canvas_new = this._grid._getRecalcCanvasXY(from_refer_comp._control_element, canvasX, canvasY);
		canvasX = canvas_new[0];
		canvasY = canvas_new[1];

		var clientXY_new = this._getClientXY(canvasX, clientY);
		clientX = clientXY_new[0];
		clientY = clientXY_new[1];

		if (!retn) {
			while (parent) {
				if (parent.on_fire_user_onlbuttondown) {
					retn = parent.on_fire_user_onlbuttondown(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);
					if (retn) {
						break;
					}
				}
				parent = parent.parent;
			}
		}
		return true;
	};

	_pGridCell._common_fire_lbuttonup = function (touchinfos, changedtouchinfos, button, altKey, ctrlKey, shiftKey, screenX, screenY, canvasX, canvasY, clientX, clientY, obj, from_refer_comp, from_elem, meta_key) {
		var retn = false;
		var window = this._getWindow();
		var orgcell = this;

		if (this._is_real_upelem) {
			orgcell = window.findComponent(this._is_real_upelem);
		}

		var subcomp = from_refer_comp;
		while (subcomp && subcomp instanceof nexacro.Component) {
			if (subcomp instanceof nexacro._GridCellControl || subcomp instanceof nexacro.Grid) {
				break;
			}

			var canvas = subcomp._getRecalcCanvasXY(from_refer_comp._control_element, canvasX, canvasY);
			canvasX = canvas[0];
			canvasY = canvas[1];

			if (this._subComp == subcomp) {
				break;
			}

			subcomp = subcomp.parent;
		}

		var padding, parent;
		var canvas_new;
		var clientXY_new;
		var org_canvasX = canvasX;
		var org_canvasY = canvasY;
		var org_clientX = clientX;
		var org_clientY = clientY;
		var grid = this._grid;

		if (changedtouchinfos) {
			var touchinfo = nexacro._getFirstTouchInfo(changedtouchinfos);

			if (!touchinfo) {
				return false;
			}

			if (this._isSubCell) {
				touchinfo.canvasx += this._adjust_left;
				touchinfo.canvasy += this._adjust_top;
				touchinfo.clientx += this._adjust_left;
				touchinfo.clienty += this._adjust_top;
			}

			if (this._subComp == obj) {
				padding = this._getCurrentStylePadding();
				if (padding) {
					touchinfo.canvasx += padding.left;
					touchinfo.canvasy += padding.top;
					touchinfo.clientx += padding.left;
					touchinfo.clienty += padding.top;
				}
			}

			parent = grid.parent;
			retn = grid.on_fire_user_ontouchend(touchinfos, changedtouchinfos, orgcell, orgcell, true);

			canvas_new = grid._getRecalcCanvasXY(from_refer_comp._control_element, touchinfo.canvasx, touchinfo.canvasy);
			touchinfo.canvasx = canvas_new[0];
			touchinfo.canvasy = canvas_new[1];

			clientXY_new = this._getClientXY(touchinfo.clientx, touchinfo.clienty);
			touchinfo.clientx = clientXY_new[0];
			touchinfo.clienty = clientXY_new[1];

			if (!retn) {
				while (parent) {
					if (parent.on_fire_user_ontouchend) {
						retn = parent.on_fire_user_ontouchend(touchinfos, changedtouchinfos, obj, from_refer_comp);
						if (retn) {
							break;
						}
					}
					parent = parent.parent;
				}
			}
		}
		else {
			if (this._isSubCell) {
				canvasX += this._adjust_left;
				canvasY += this._adjust_top;
				clientX += this._adjust_left;
				clientY += this._adjust_top;
			}

			if (this._subComp == obj) {
				padding = this._getCurrentStylePadding();
				if (padding) {
					canvasX += padding.left;
					canvasY += padding.top;
					clientX += padding.left;
					clientY += padding.top;
				}
			}

			parent = grid.parent;
			retn = grid.on_fire_user_onlbuttonup(button, altKey, ctrlKey, shiftKey, screenX, screenY, canvasX, canvasY, clientX, clientY, orgcell, orgcell, from_elem, meta_key, true);

			org_canvasX = canvasX;
			org_canvasY = canvasY;

			canvas_new = grid._getRecalcCanvasXY(from_refer_comp._control_element, canvasX, canvasY);
			canvasX = canvas_new[0];
			canvasY = canvas_new[1];

			org_clientX = clientX;
			org_clientY = clientY;

			clientXY_new = this._getClientXY(canvasX, clientY);
			clientX = clientXY_new[0];
			clientY = clientXY_new[1];

			if (!retn) {
				while (parent) {
					if (parent.on_fire_user_onlbuttonup) {
						retn = parent.on_fire_user_onlbuttonup(button, altKey, ctrlKey, shiftKey, screenX, screenY, canvasX, canvasY, clientX, clientY, obj, from_refer_comp, from_elem, meta_key);
						if (retn) {
							break;
						}
					}
					parent = parent.parent;
				}
			}
		}

		if (!this._is_alive) {
			return true;
		}

		var datarow = grid._getDataRow(this._rowidx);
		var upelem = this._is_real_upelem;
		var alreadyclick = this._is_clickproc;
		var clickcall = this._clickcall;

		this._is_real_upelem = null;
		this._is_clickproc = false;
		this._clickcall = false;

		if (grid._isFakeCell(datarow)) {
			return false;
		}

		var cell = (this.parentcell) ? this.parentcell : this;
		var upelemtemp, check;

		if (!alreadyclick) {
			if (grid._lastmouseentercell == cell) {
				if ((datarow == grid._selectinfo.curdsrow) && (cell._cellidx == grid._selectinfo.curcell)) {
					if (grid._showEditing) {
						var editor = grid._currentCellEditor;
						if (editor) {
							if (upelem instanceof nexacro.InputElement) {
								upelem.setElementFocus();

								if (editor.getCaretPos) {
									var selection = editor.getSelect();

									if (selection[0] == selection[1]) {
										var cpos = editor.getCaretPos();
										editor._setFocus(false);

										if (editor.setCaretPos) {
											editor.setCaretPos(cpos);
										}
									}
								}
								else {
									editor._setFocus(false);
								}
							}
							else {
								editor._setFocus(false);
							}
						}

						if (upelem) {
							check = false;
							upelemtemp = upelem;

							while (upelemtemp) {
								if (upelemtemp._cellobj == obj) {
									check = true;
									break;
								}
								upelemtemp = upelemtemp.parent;
							}

							if (!check) {
								check = clickcall;
							}

							if (check) {
								cell.on_fire_onclick(button, altKey, ctrlKey, shiftKey, screenX, screenY, org_canvasX, org_canvasY, org_clientX, org_clientY, obj, from_refer_comp, meta_key, "control", true);
							}
						}
					}
					else {
						if (upelem) {
							var parentcell = (obj.parentcell) ? obj.parentcell : obj;
							check = false;
							upelemtemp = upelem;

							while (upelemtemp) {
								if (upelemtemp == parentcell) {
									check = true;
									break;
								}
								upelemtemp = upelemtemp.parent;
							}

							if (check) {
								cell.on_fire_onclick(button, altKey, ctrlKey, shiftKey, screenX, screenY, org_canvasX, org_canvasY, org_clientX, org_clientY, obj, from_refer_comp, meta_key, "control", true);
							}
						}
					}
				}
			}
		}
	};

	_pGridCell.on_fire_user_ontouchend = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		this._common_fire_lbuttonup(touchinfos, changedtouchinfos, "", false, false, false, -1, -1, -1, -1, -1, -1, from_comp, from_refer_comp, null);
		return true;
	};

	_pGridCell.on_fire_user_onlbuttonup = function (button, altKey, ctrlKey, shiftKey, screenX, screenY, canvasX, canvasY, clientX, clientY, obj, refer_comp, from_elem, meta_key) {
		this._common_fire_lbuttonup(null, null, button, altKey, ctrlKey, shiftKey, screenX, screenY, canvasX, canvasY, clientX, clientY, obj, refer_comp, from_elem, meta_key);
		return true;
	};

	_pGridCell.on_fire_oninput = function () {
		return this._grid.on_fire_oninput();
	};

	_pGridCell.on_fire_ondropdown = function (obj) {
		return this._grid.on_fire_ondropdown(obj);
	};

	_pGridCell.on_fire_oncloseup = function (obj, pretext, posttext, prevalue, postvalue) {
		var cell = this._cellidx;
		var col = this._refinfo._col;
		var pivotindex = -9;
		var row = this._getDataRow();
		var subrow = this._refinfo._row;

		this._changeStatus("mouseover", false);

		return this._grid.on_fire_oncloseup(obj, pretext, posttext, prevalue, postvalue, cell, col, pivotindex, row, subrow);
	};

	_pGridCell.on_fire_onclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key, clickitem, logic) {
		if (!logic) {
			var subcomp = from_refer_comp;
			while (subcomp && subcomp instanceof nexacro.Component) {
				if (subcomp instanceof nexacro._GridCellControl) {
					break;
				}

				var canvas = subcomp._getRecalcCanvasXY(from_refer_comp._control_element, canvasX, canvasY);
				canvasX = canvas[0];
				canvasY = canvas[1];

				if (this._subComp == subcomp) {
					break;
				}

				subcomp = subcomp.parent;
			}
		}

		if (this._isSubCell) {
			canvasX += this._adjust_left;
			canvasY += this._adjust_top;
			clientX += this._adjust_left;
			clientY += this._adjust_top;
		}

		if (this._subComp == from_comp) {
			var padding = this._getCurrentStylePadding();

			if (padding) {
				canvasX += padding.left;
				canvasY += padding.top;
				clientX += padding.left;
				clientY += padding.top;
			}
		}

		if (this._band) {
			this._is_clickproc = true;

			if (clickitem == undefined) {
				clickitem = "";
			}

			if (this._grid._isflingend) {
				return true;
			}

			if (this._grid._scrollpixel == "all") {
				this._showfull(this);
			}
			else {
				this.parent._showfull(this);
			}

			if (this._band.id == "body") {
				this._grid.on_fire_cellclick(this, clickitem, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);
			}
			else if (this._band.id == "head") {
				this._grid.on_fire_headclick(this, clickitem, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);
			}
			else if (this._band.id == "summary") {
				this._grid.on_fire_summaryclick(this, clickitem, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);
			}

			this._needToggle("onclick", from_comp);
		}
		return true;
	};

	_pGridCell.on_fire_ondblclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key, clickitem) {
		var subcomp = from_refer_comp;
		while (subcomp && subcomp instanceof nexacro.Component) {
			if (subcomp instanceof nexacro._GridCellControl) {
				break;
			}

			var canvas = subcomp._getRecalcCanvasXY(from_refer_comp._control_element, canvasX, canvasY);
			canvasX = canvas[0];
			canvasY = canvas[1];

			if (this._subComp == subcomp) {
				break;
			}

			subcomp = subcomp.parent;
		}

		if (this._isSubCell) {
			canvasX += this._adjust_left;
			canvasY += this._adjust_top;
			clientX += this._adjust_left;
			clientY += this._adjust_top;
		}

		if (this._subComp == from_comp) {
			var padding = this._getCurrentStylePadding();

			if (padding) {
				canvasX += padding.left;
				canvasY += padding.top;
				clientX += padding.left;
				clientY += padding.top;
			}
		}

		if (this._band) {
			nexacro._fireBeforeDblclick(from_refer_comp, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);

			if (clickitem == undefined) {
				clickitem = "";
			}
			if (this._band.id == "body") {
				return this._grid.on_fire_celldblclick(this, clickitem, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);
			}
			else if (this._band.id == "head") {
				return this._grid.on_fire_headdblclick(this, clickitem, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);
			}
			else if (this._band.id == "summary") {
				return this._grid.on_fire_summarydblclick(this, clickitem, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);
			}
			if (!this._is_alive) {
				return;
			}
		}
		return true;
	};


	_pGridCell._getFormatSize = function () {
		var cellinfo = this._refinfo;
		var col = cellinfo._col;
		var colspan = cellinfo._colspan;
		var row = cellinfo._row;
		var rowspan = cellinfo._rowspan;
		var format = this._grid._curFormat;

		return format._getFormatCellSize(col, row, colspan, rowspan, this._rowidx, true);
	};

	_pGridCell.__showExpand = function (flag) {
		if (!this._expandCtrl) {
			return;
		}

		if (this._fakecell || this._virtualmerge) {
			this._expandCtrl.set_visible(false);
			return;
		}

		var grid = this._grid;
		var cellinfo = this._refinfo;
		var datarow = grid._getDataRow(this._rowidx);
		var expandshow = cellinfo._getAttrValue(cellinfo.expandshow, datarow);

		if (expandshow == "show") {
			if (flag == false) {
				if (cellinfo.suppressalign.indexOf("over") >= 0) {
					this._expandCtrl.set_visible(true);
				}
				else {
					this._expandCtrl.set_visible(this.selected);
				}
			}
			else {
				this._expandCtrl.set_visible(true);
			}
		}
		else {
			this._expandCtrl.set_visible(false);
		}
		this._updateAvailableArea();
	};

	_pGridCell._isUpdateArea = function () {
		if (this._isSubCell || this.id == "tempcell") {
			return true;
		}

		var grid = this._grid;
		var format = grid._curFormat;
		var gridrow = this._getRowControl(), gridrow_elem = gridrow.getElement(), update_left = gridrow_elem.scroll_left, update_right = update_left + grid._adjust_width - format.leftWidth - format.rightWidth;
		var cellinfo = this._refinfo;

		if (cellinfo._area != "body" || (update_left <= this.getOffsetRight() && update_right >= this._adjust_left)) {
			return true;
		}

		return false;
	};

	_pGridCell._getRemoveLine = function () {
		var grid = this._grid;
		var cellinfo = this._refinfo;
		var remove_l, remove_t, remove_r, remove_b;
		if (this._isSubCell) {
			remove_l = true;
			remove_t = true;
			remove_r = true;
			remove_b = true;
		}
		else if (this._band.id == "summary" && (grid.summarytype != "top" && grid.summarytype != "lefttop")) {
			if (cellinfo._area == "right") {
				remove_l = false;
				remove_t = false;
				remove_r = true;
				remove_b = true;
			}
			else {
				remove_l = true;
				remove_t = false;
				remove_r = false;
				remove_b = true;
			}
		}
		else {
			if (cellinfo._area == "right") {
				remove_l = false;
				remove_t = true;
				remove_r = true;
				remove_b = false;
			}
			else {
				remove_l = true;
				remove_t = true;
				remove_r = false;
				remove_b = false;
			}
		}

		return [remove_l, remove_t, remove_r, remove_b];
	};

	_pGridCell._updateAll = function (status, onlycontents, nochk_updatearea) {
		if (this.__update(status, onlycontents, nochk_updatearea)) {
			var control_elem = this.getElement();
			if (control_elem) {
				var remove_line = this._getRemoveLine();
				var remove_l, remove_t, remove_r, remove_b;
				var grid = this._grid;

				remove_l = remove_line[0];
				remove_t = remove_line[1];
				remove_r = remove_line[2];
				remove_b = remove_line[3];

				var datarow = this._getDataRow();

				if (!this._isSubCell) {
					var subcomp = this._subComp;

					if (grid._focused_row == datarow) {
						if (grid._isSelectRowType() || grid._focused_cell == this._cellidx) {
							if (grid._isFocused()) {
								this._changeStatus("focused", true);
								if (subcomp && subcomp._focusedstatus) {
									subcomp._focusedstatus = undefined;
									subcomp._changeStatus("focused", true);
								}
							}
						}
					}
					else {
						this._changeStatus("focused", false);
						if (subcomp && subcomp._statusmap["focused"]) {
							subcomp._focusedstatus = subcomp._statusmap["focused"];
							subcomp._changeStatus("focused", false);
						}
					}

					if (grid._mouseovercell && grid._mouseovercell.row != datarow) {
						this._changeStatus("mouseover", false);
					}
				}

				var cellinfo = this._refinfo;
				var suppproc = false;

				if (this.subcells.length > 0) {
					for (var i = 0, n = this.subcells.length; i < n; i++) {
						this.subcells[i]._updateAll();
					}
				}
				else {
					if (this._isCellSuppress(cellinfo, datarow) && (cellinfo._getSuppress(datarow) != 0 || grid._supphorztype > 0)) {
						if (this._band.id == "body" && cellinfo.suppressalign.indexOf("over") >= 0) {
							this._hideInnerElement();
						}
						else {
							if (this._disp_show) {
								var suppinfo = this._getSuppressInfo();
								if (suppinfo) {
									var suppressborder = suppinfo.border_proc;


									if (this._getDisplayRowIdx() == this._grid._getDispRowCnt() - 1) {
										suppressborder = 0;
									}

									if (suppressborder > 0) {
										remove_b = true;
									}

									if (suppinfo.horz_border_proc == 1) {
										if (cellinfo._area == "left") {
											remove_r = true;
										}
										else if (cellinfo._area == "right") {
											remove_l = true;
										}
									}

									if (suppinfo.text_proc != 0 || suppinfo.horz_text_proc != 0) {
										this._hideInnerElement();
									}
									else {
										this._showInnerElement();
									}

									suppproc = true;
								}
								else {
									if (this._disp_show && this._hideInner) {
										this._showInnerElement();
									}
								}
							}
						}
					}
					else {
						if (this._disp_show && this._hideInner) {
							this._showInnerElement();
						}
					}
				}

				if (!onlycontents) {
					this._control_element.setElementBorderNone(remove_l, remove_t, remove_r, remove_b);
				}

				if (control_elem._mode == "text") {
					this._changeClientmode("text");
				}

				if (grid._isFakeCell(datarow) == false && !suppproc) {
					var vminfo = this._virtualmerge = grid._checkVirtualMerge(cellinfo, datarow);

					if (vminfo) {
						var isselect = this._isSelectedColor();
						var background;
						if (this.id != "tempcell") {
							background = grid._getCellStyleInfo(vminfo.targetcell, "background", vminfo.targetrow, isselect);
							this.set_background(background);
						}

						var remove = vminfo.remove;
						if (remove.indexOf("right") >= 0) {
							remove_r = true;
						}
						else if (remove.indexOf("left") >= 0) {
							remove_l = true;
						}

						if (remove.indexOf("bottom") >= 0) {
							remove_b = true;
						}
						else if (remove.indexOf("top") >= 0) {
							remove_t = true;
						}

						this._control_element.setElementBorderNone(remove_l, remove_t, remove_r, remove_b);
						this._hideInnerElement();
					}
					else {
						this._showInnerElement();
					}
				}
			}
		}
	};

	_pGridCell._isCellSuppress = function (cellinfo, datarow) {
		if (!this._grid._is_use_suppress && !this._grid._supphorztype) {
			return false;
		}

		if (!datarow) {
			datarow = this._grid._getDataRow(this._rowidx);
		}

		if (!cellinfo) {
			cellinfo = this._refinfo;
		}

		var disp_type = cellinfo._getDisplaytype(datarow);
		return (disp_type != "treeitemcontrol");
	};

	_pGridCell._getSuppressInfo = function () {
		var grid = this._grid;
		var row2;

		if (grid._fixed_rowcnt > 0) {
			if (grid._fixed_endrow >= this._rowidx) {
				row2 = grid._fixed_startrow;
			}
			else {
				row2 = grid._toprowpos[0] - (grid._fixed_rowcnt - grid._fixed_startrow);
			}
		}
		else {
			row2 = grid._toprowpos[0];
		}

		var row = this._rowidx - row2;

		if (this._rowidx >= 0 && row < 0) {
			return null;
		}

		return this._refinfo._getSuppressInfo(row);
	};

	_pGridCell._getDisplayRowIdx = function () {
		return this._rowidx - this._grid._getBodyBegRowPos(this._rowidx);
	};

	_pGridCell._setDisplayText = function () {
		if (!this._is_alive) {
			return;
		}
		this._displaytext = this._getDisplayText();
		this.on_apply_text();
	};

	_pGridCell._showfull = function (is_vscroll) {
		if (!this._is_alive) {
			return;
		}
		if (this._isSubCell) {
			return this.parent._showfull();
		}

		var band = this._band;
		var scrollleft = this._grid._getScrollLeft();
		var scrolltop = this._grid._getScrollTop();
		var topPos = this.parent._adjust_top;

		var l = this._adjust_left;
		var t = this._adjust_top + topPos;
		var w = this._adjust_width;
		var h = this._adjust_height;
		var r = l + w;
		var b = t + h;

		l -= scrollleft;
		r -= scrollleft;
		t -= scrolltop;
		b -= scrolltop;

		var grid = this._grid;
		var gridrow = this._getRowControl();
		var hscroll = grid._hscrollmng;
		var vscroll = grid._vscrollmng;
		var cellinfo = this._refinfo;
		var bandrc = gridrow._getAreaRect(cellinfo._area);

		if (hscroll && cellinfo._area == "body") {
			if (w < bandrc.width) {
				if (l < 0) {
					hscroll.setPos(hscroll.pos + l);
				}
				else if (r > bandrc.width) {
					var gap = r - bandrc.width;
					hscroll.setPos(hscroll.pos + gap);
				}
			}
		}

		if (band.id == "body") {
			if (vscroll && is_vscroll && !gridrow._fixed) {
				if (h < band._getClientHeight()) {
					if (t < 0) {
						vscroll.setPixelPos(vscroll._pos + t);
					}
					else if (b > band._getClientHeight()) {
						var gab = b - band._getClientHeight();
						vscroll.setPixelPos(vscroll._pos + gab);
					}
				}
			}
		}
	};

	_pGridCell._needToggle = function (eventname, from_comp) {
		if (!this._is_alive) {
			return;
		}

		var grid = this._grid;
		var datarow = grid._getDataRow(this._rowidx);
		var editType = this._refinfo._getEdittype(datarow);

		if (grid.selectchangetype == "down" && eventname == "onclick") {
			return;
		}
		else if (grid.selectchangetype == "up" && eventname == "onlbuttondown") {
			return;
		}

		if (editType == "checkbox" && nexacro._toBoolean(grid.readonly) == false) {
			if (this._curDisplayType != "checkboxcontrol") {
				grid._toggleVal(datarow, this._refinfo);
			}
			else {
				if (eventname == "onclick" || eventname == "onlbuttondown") {
					if (this._grid.cellclickbound == "cell" && from_comp == this) {
						if (this._subComp && this._subComp._toggleCheck) {
							this._subComp._toggleCheck();
						}
					}
				}
				else {
					if (this._subComp && this._subComp._toggleCheck) {
						this._subComp._toggleCheck();
					}
				}
			}
		}
	};

	_pGridCell._getRowControl = function () {
		return (this._isSubCell) ? this.parent.parent : this.parent;
	};

	_pGridCell._setPositionInGrid = function (editComp, noScrollPos, noPadding, noscroll_posinfo) {
		if (!this._is_alive) {
			return {
				left : 0, 
				top : 0, 
				right : 0, 
				bottom : 0, 
				width : 0, 
				height : 0, 
				orgt : 0, 
				orgl : 0
			};
		}
		var gridrow = this._getRowControl();
		var band = this._band;
		var grid = this._grid;
		var cellinfo = this._refinfo;
		var rect = gridrow._getAreaRect(cellinfo._area);

		var areal = rect.left;
		var arear = rect.left + rect.width;

		var is_fixed = (band.id == "body" && gridrow._fixed);
		var bandt = band._adjust_top + ((band.id == "body" && is_fixed == false) ? grid._fixed_height : 0);
		var bandb = band.getOffsetBottom();

		var l = this._adjust_left + areal;
		var t = gridrow._adjust_top + this._adjust_top + bandt;
		var border;

		if (band._refinfo._noborder == true && cellinfo._row == 0 && this._getDisplayRowIdx() <= 0) {
			border = this._getCurrentStyleBorder();
			t += border ? border.bottom._width : 0;
		}
		else if (this._rowidx == -2) {
			if (grid.summarytype != "top" && grid.summarytype != "lefttop") {
				border = this._getCurrentStyleBorder();
				t += border ? border.top._width : 0;
			}
		}

		var crect = this._getAvailableRect();
		var padding;

		if (!noPadding) {
			padding = this._getCurrentStylePadding();
			l += (padding) ? padding.left : 0;
			t += (padding) ? padding.top : 0;
		}
		else {
			padding = this._getCurrentStylePadding();
			crect.width += (padding) ? (padding.left + padding.right) : 0;
			crect.height += (padding) ? (padding.top + padding.bottom) : 0;
		}

		if (noscroll_posinfo) {
			noscroll_posinfo.left = l;
			noscroll_posinfo.right = l + crect.width;
			noscroll_posinfo.top = t;
			noscroll_posinfo.bottom = t + crect.height;
		}

		if (!noScrollPos) {
			var band_scroll_top = (is_fixed) ? 0 : grid._getScrollTop();
			var area_scroll_left = grid._getScrollLeft();

			if (cellinfo._area == "body") {
				l -= (area_scroll_left >= 0) ? area_scroll_left : 0;
			}
			if (band.id == "body") {
				t -= (band_scroll_top >= 0) ? band_scroll_top : 0;
			}
		}

		var r = l + crect.width;
		var b = t + crect.height;
		var orgt = t, orgl = l;

		if (t < bandt) {
			t = bandt;
		}
		if (b > bandb) {
			b = bandb;
		}
		if (l < areal) {
			l = areal;
		}
		if (r > arear) {
			r = arear;
		}

		var w = r - l;
		var h = b - t;

		if (w < 0) {
			w = 0;
		}
		if (h < 0) {
			h = 0;
		}

		if (editComp) {
			if (w == 0 || h == 0) {
				editComp.move(0, -10, 0, 0);
			}
			else {
				editComp.move(l, t, w, h);
			}
		}

		return {
			left : l, 
			top : t, 
			right : r, 
			bottom : b, 
			width : w, 
			height : h, 
			orgt : orgt, 
			orgl : orgl
		};
	};

	_pGridCell._setCompPositionInGrid = function (editComp, noScrollPos, noPadding, noscroll_posinfo) {
		if (!this._is_alive) {
			return {
				left : 0, 
				top : 0, 
				right : 0, 
				bottom : 0, 
				width : 0, 
				height : 0, 
				orgt : 0, 
				orgl : 0
			};
		}
		var gridrow = this._getRowControl();
		var band = this._band;
		var grid = this._grid;
		var cellinfo = this._refinfo;
		var rect = gridrow._getAreaRect(cellinfo._area);

		var areal = rect.left;
		var arear = rect.left + rect.width;

		var is_fixed = (band.id == "body" && gridrow._fixed);
		var bandt = band._adjust_top + ((band.id == "body" && is_fixed == false) ? grid._fixed_height : 0);
		var bandb = band.getOffsetBottom();

		var l = this._adjust_left + editComp._adjust_left + areal;
		var t = gridrow._adjust_top + this._adjust_top + editComp._adjust_top + bandt;
		var border;

		if (band._refinfo._noborder == true && cellinfo._row == 0 && this._getDisplayRowIdx() <= 0) {
			border = this._getCurrentStyleBorder();
			t += border ? border.bottom._width : 0;
		}
		else if (this._rowidx == -2) {
			if (grid.summarytype != "top" && grid.summarytype != "lefttop") {
				border = this._getCurrentStyleBorder();
				t += border ? border.top._width : 0;
			}
		}

		var crect = this._getAvailableRect();
		var crect2 = this._getControlRect();
		crect.left = Math.max(crect.left, crect2.left);
		crect.top = Math.max(crect.top, crect2.top);
		crect.right = Math.min(crect.right, crect2.right);
		crect.bottom = Math.min(crect.bottom, crect2.bottom);
		crect.width = crect.right - crect.left;
		crect.height = crect.bottom - crect.top;


		if (noscroll_posinfo) {
			noscroll_posinfo.left = l;
			noscroll_posinfo.right = l + crect.width;
			noscroll_posinfo.top = t;
			noscroll_posinfo.bottom = t + crect.height;
		}

		if (!noScrollPos) {
			var band_scroll_top = (is_fixed) ? 0 : grid._getScrollTop();
			var area_scroll_left = grid._getScrollLeft();

			if (cellinfo._area == "body") {
				l -= (area_scroll_left >= 0) ? area_scroll_left : 0;
			}
			if (band.id == "body") {
				t -= (band_scroll_top >= 0) ? band_scroll_top : 0;
			}
		}

		var r = l + crect.width;
		var b = t + crect.height;
		var orgt = t, orgl = l;

		if (t < bandt) {
			t = bandt;
		}
		if (b > bandb) {
			b = bandb;
		}
		if (l < areal) {
			l = areal;
		}
		if (r > arear) {
			r = arear;
		}

		var w = r - l;
		var h = b - t;

		if (w < 0) {
			w = 0;
		}
		if (h < 0) {
			h = 0;
		}



		return {
			left : l, 
			top : t, 
			right : r, 
			bottom : b, 
			width : w, 
			height : h, 
			orgt : orgt, 
			orgl : orgl
		};
	};
	_pGridCell._getCompPositionInBand = function (editComp) {
		if (!this._is_alive) {
			return {
				left : 0, 
				top : 0, 
				right : 0, 
				bottom : 0, 
				width : 0, 
				height : 0, 
				orgt : 0, 
				orgl : 0, 
				orgr : 0, 
				orgb : 0
			};
		}
		var gridrow = this._getRowControl();
		var band = this._band;
		var grid = this._grid;
		var cellinfo = this._refinfo;

		var rect = gridrow._getAreaRect(cellinfo._area);

		var areal = rect.left;
		var arear = rect.left + rect.width;

		var is_fixed = (band.id == "body" && gridrow._fixed);
		var bandt = (band.id == "body" && is_fixed == false) ? grid._fixed_height : 0;
		var bandb = band._adjust_height;

		var l = this._adjust_left + editComp._adjust_left + areal;
		var t = gridrow._adjust_top + this._adjust_top + editComp._adjust_top + bandt;


		var crect = this._getAvailableRect();
		var crect2 = this._getControlRect();
		crect.left = Math.max(crect.left, crect2.left);
		crect.top = Math.max(crect.top, crect2.top);
		crect.right = Math.min(crect.right, crect2.right);
		crect.bottom = Math.min(crect.bottom, crect2.bottom);
		crect.width = crect.right - crect.left;
		crect.height = crect.bottom - crect.top;

		var band_scroll_top = (is_fixed) ? 0 : grid._getScrollTop();
		var area_scroll_left = grid._getScrollLeft();

		if (cellinfo._area == "body") {
			l -= (area_scroll_left >= 0) ? area_scroll_left : 0;
		}
		if (band.id == "body") {
			t -= (band_scroll_top >= 0) ? band_scroll_top : 0;
		}


		var r = l + crect.width;
		var b = t + crect.height;
		var orgt = t, orgl = l, orgr = r, orgb = b;

		if (t < bandt) {
			t = bandt;
		}
		if (b > bandb) {
			b = bandb;
		}
		if (l < areal) {
			l = areal;
		}
		if (r > arear) {
			r = arear;
		}

		var w = r - l;
		var h = b - t;

		if (w < 0) {
			w = 0;
		}
		if (h < 0) {
			h = 0;
		}

		return {
			left : l, 
			top : t, 
			right : r, 
			bottom : b, 
			width : w, 
			height : h, 
			orgt : orgt, 
			orgl : orgl, 
			orgr : orgr, 
			orgb : orgb
		};
	};
	_pGridCell._getPositionInBand = function () {
		if (!this._is_alive) {
			return {
				left : 0, 
				top : 0, 
				right : 0, 
				bottom : 0, 
				width : 0, 
				height : 0, 
				orgt : 0, 
				orgl : 0, 
				orgr : 0, 
				orgb : 0
			};
		}
		var gridrow = this._getRowControl();
		var band = this._band;
		var grid = this._grid;
		var cellinfo = this._refinfo;

		var rect = gridrow._getAreaRect(cellinfo._area);

		var areal = rect.left;
		var arear = rect.left + rect.width;

		var is_fixed = (band.id == "body" && gridrow._fixed);
		var bandt = (band.id == "body" && is_fixed == false) ? grid._fixed_height : 0;
		var bandb = band._adjust_height;

		var l = this._adjust_left + areal;
		var t = gridrow._adjust_top + this._adjust_top + bandt;

		var band_scroll_top = (is_fixed) ? 0 : grid._getScrollTop();
		var area_scroll_left = grid._getScrollLeft();

		if (cellinfo._area == "body") {
			l -= (area_scroll_left >= 0) ? area_scroll_left : 0;
		}
		if (band.id == "body") {
			t -= (band_scroll_top >= 0) ? band_scroll_top : 0;
		}

		var r = l + this._adjust_width;
		var b = t + this._adjust_height;
		var orgt = t, orgl = l, orgr = r, orgb = b;

		if (t < bandt) {
			t = bandt;
		}
		if (b > bandb) {
			b = bandb;
		}
		if (l < areal) {
			l = areal;
		}
		if (r > arear) {
			r = arear;
		}

		var w = r - l;
		var h = b - t;

		if (w < 0) {
			w = 0;
		}
		if (h < 0) {
			h = 0;
		}

		return {
			left : l, 
			top : t, 
			right : r, 
			bottom : b, 
			width : w, 
			height : h, 
			orgt : orgt, 
			orgl : orgl, 
			orgr : orgr, 
			orgb : orgb
		};
	};

	_pGridCell._isConditionEditor = function () {
		var grid = this._grid;
		var datarow = grid._getDataRow(this._rowidx);

		return (grid._currentCellCell == this._cellidx && grid._currentCellRow == datarow);
	};

	_pGridCell._showEditor = function (focus, showfull) {
		var textCtrl = this._text_elem;
		var cellinfo = this._refinfo;
		var grid = this._grid;
		var datarow = grid._getDataRow(this._rowidx);
		var editComp;
		var evt_name;
		if (nexacro._isTouchInteraction) {
			evt_name = "touch";
		}

		if (showfull) {
			this._showfull();
		}

		if (this._grid._showEditing) {
			this._grid._hideEditor();
		}

		grid._currentCellCell = this._cellidx;
		grid._currentCellRow = datarow;

		if (textCtrl) {
			textCtrl.setElementVisible(false);
		}
		if (this._subComp) {
			this._subComp.set_visible(false);
			this._subComp._changeStatus("mouseover", false);
		}

		grid._currentCellEditor = editComp = this._createEditor();
		editComp._EditUpdateAll(cellinfo, this);
		editComp.set_visible(true);

		if (focus || nexacro._isTouchInteraction || grid.selectchangetype == "up") {
			editComp._apply_setfocus(evt_name);
		}

		if (grid.autoenter == "select" && grid._lbuttondown_proc) {
			editComp._user_push = true;
			editComp._changeStatus("focused", true);
			editComp._is_pushed_area = true;
			editComp._is_push = true;
		}
		else {
			editComp._changeStatus("focused", true);
		}

		if (nexacro._enableaccessibility) {
			editComp._setFocus(false);
		}

		this._editor = editComp;

		if (editComp.setCaretPos) {
			if (!editComp.autoselect) {
				editComp.setCaretPos(0);
			}
			else if (grid._keydown_keycode == 37 || grid._keydown_keycode == 39) {
				nexacro._OnceCallbackTimer.callonce(this, function () {
					editComp.setSelect(0, -1);
				});
			}
		}
		else if (editComp.comboedit && editComp.comboedit.setCaretPos) {
			if (!editComp.comboedit.autoselect) {
				editComp.comboedit.setCaretPos(0);
			}
			else if (grid._keydown_keycode == 37 || grid._keydown_keycode == 39) {
				nexacro._OnceCallbackTimer.callonce(this, function () {
					editComp.comboedit.setSelect(0, -1);
				});
			}
		}
		grid._has_inputElement = true;
	};

	_pGridCell._hideEditor = function () {
		var text = this._text_elem;

		if (!this._hideInner) {
			if (text) {
				text.setElementVisible(true);
			}

			if (this._subComp) {
				this._subComp.set_visible(true);
				this._subComp._changeStatus("mouseover", false);
			}
		}

		this._destroyEditor();

		this._grid._currentCellCell = -1;
		this._grid._currentCellRow = -1;
		this._grid._has_inputElement = false;
	};

	_pGridCell._getPositionInRootComponent = function (comp) {
		var rect = this._setCompPositionInGrid(comp);
		var bandrect = this._getCompPositionInBand(comp);
		return [rect, bandrect];
	};
	delete _pGridCell;

	nexacro._GridSubCellControl = function (id, left, top, width, height, right, bottom, parent, cellinfo, rowidx, cellidx) {
		nexacro._GridCellControl.call(this, id, left, top, width, height, right, bottom, parent, cellinfo, rowidx, cellidx);
		this._isSubCell = true;
	};

	var _pSubGridCell = nexacro._createPrototype(nexacro._GridCellControl, nexacro._GridSubCellControl);
	nexacro._GridSubCellControl.prototype = _pSubGridCell;
	_pSubGridCell._is_subcontrol = true;
	_pSubGridCell._type_name = "GridSubCellControl";

	_pSubGridCell.on_getIDCSSSelector = function () {
		return "subcell";
	};

	nexacro._GridExpandControl = function (parent, left, top, right, bottom, controlmode) {
		nexacro._CellExpandControl.call(this, parent, left, top, right, bottom, controlmode);

		if (parent._refinfo) {
			this._grid = parent._grid;
			this._cellobj = parent;
			this._cellinfo = parent._refinfo;
		}
		else {
			this._grid = parent;
		}
	};

	var _pGridExpand = nexacro._createPrototype(nexacro._CellExpandControl, nexacro._GridExpandControl);
	nexacro._GridExpandControl.prototype = _pGridExpand;

	_pGridExpand.on_destroy_contents = function () {
		nexacro._CellExpandControl.prototype.on_destroy_contents.call(this);
		this._grid = null;
	};

	_pGridExpand._on_bubble_mouseenter = function (elem, from_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope, meta_key) {
		var call = true;
		if (bubble_scope) {
			call = this._cellobj._common_mouseenter();
		}

		if (call) {
			nexacro.Button.prototype._on_bubble_mouseenter.call(this, elem, from_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope, meta_key);
		}

		return true;
	};

	_pGridExpand._on_bubble_mouseleave = function (elem, to_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope, meta_key) {
		var call = true;
		if (bubble_scope) {
			call = this._cellobj._common_mouseleave();
		}

		if (call) {
			nexacro.Button.prototype._on_bubble_mouseleave.call(this, elem, to_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope, meta_key);
		}

		return true;
	};

	_pGridExpand.on_fire_user_ontouchstart = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		this._cellobj.on_fire_user_ontouchstart(touchinfos, changedtouchinfos, from_comp, from_refer_comp);
		var touchinfo = nexacro._getFirstTouchInfo(changedtouchinfos);

		if (touchinfo) {
			this._grid.on_fire_onexpanddown("", false, false, false, touchinfo.screenx, touchinfo.screeny, touchinfo.canvasx, touchinfo.canvasy, touchinfo.clientx, touchinfo.clienty, from_comp, from_refer_comp);
		}

		return true;
	};

	_pGridExpand.on_fire_user_onlbuttondown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		this._cellobj.on_fire_user_onlbuttondown(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);
		this._grid.on_fire_onexpanddown(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);
		return true;
	};

	_pGridExpand.on_fire_user_ontouchend = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		this._cellobj.on_fire_user_ontouchend(touchinfos, changedtouchinfos, from_comp, from_refer_comp);
		var touchinfo = nexacro._getFirstTouchInfo(changedtouchinfos);
		if (touchinfo) {
			this._grid.on_fire_onexpandup("", false, false, false, touchinfo.screenx, touchinfo.screeny, touchinfo.canvasx, touchinfo.canvasy, touchinfo.clientx, touchinfo.clienty, from_comp, from_refer_comp);
		}
		return true;
	};

	_pGridExpand.on_fire_user_onlbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem, meta_key) {
		this._cellobj.on_fire_user_onlbuttonup(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem, meta_key);
		this._grid.on_fire_onexpandup(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem, meta_key);
		return true;
	};

	_pGridExpand._on_last_lbuttonup = function () {
		this._cellobj._on_last_lbuttonup();
	};

	_pGridExpand._on_last_keyup = function () {
		this._cellobj._on_last_keyup();
	};


	delete _pGridExpand;

	nexacro._GridButtonControl = function (id, left, top, width, height, parent, displaymode, controlmode) {
		nexacro._CellButtonControl.call(this, id, left, top, width, height, parent, displaymode, controlmode);

		if (parent._refinfo) {
			this._grid = parent._refinfo._grid;
			this._cellinfo = parent._refinfo;
			this._cellobj = parent;
		}
		else {
			this._grid = parent;
			this._cellinfo = null;
			this._cellobj = null;
		}
	};
	var _pGridButton = nexacro._createPrototype(nexacro._CellButtonControl, nexacro._GridButtonControl);
	nexacro._GridButtonControl.prototype = _pGridButton;

	_pGridButton.on_destroy_contents = function () {
		nexacro._CellButtonControl.prototype.on_destroy_contents.call(this);
		this._grid = null;
	};

	_pGridButton.on_fire_user_onkeyup = function (key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp, meta_key) {
		var ret = nexacro.Component.prototype.on_fire_user_onkeyup.call(this, key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp, meta_key);
		if (key_code == 13 || key_code == 32) {
			this.click();
		}
		return ret;
	};

	_pGridButton._on_bubble_touchend = function (touch_manager, touchinfos, changedtouchinfos, event_bubbles, fire_comp, refer_comp, is_userbubble) {
		var call = true;
		if (is_userbubble) {
			call = this._cellobj._common_lbuttonup(changedtouchinfos, null, null, null, null);
		}

		if (call) {
			nexacro.Button.prototype._on_bubble_touchend.call(this, touch_manager, touchinfos, changedtouchinfos, event_bubbles, fire_comp, refer_comp, is_userbubble);
		}

		return true;
	};

	_pGridButton._on_bubble_lbuttonup = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, from_elem, bubble_scope, meta_key) {
		var call = true;
		if (bubble_scope) {
			call = this._cellobj._common_lbuttonup(null, elem, canvasX, canvasY, from_elem);
		}

		if (call) {
			nexacro.Button.prototype._on_bubble_lbuttonup.call(this, elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, from_elem, bubble_scope, meta_key);
		}

		return true;
	};

	_pGridButton._on_bubble_mouseenter = function (elem, from_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope, meta_key) {
		var call = true;
		if (bubble_scope) {
			call = this._cellobj._common_mouseenter();
		}

		if (call) {
			nexacro.Button.prototype._on_bubble_mouseenter.call(this, elem, from_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope, meta_key);
		}

		return true;
	};

	_pGridButton._on_bubble_mouseleave = function (elem, to_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope, meta_key) {
		var call = true;
		if (bubble_scope) {
			call = this._cellobj._common_mouseleave();
		}

		if (call) {
			nexacro.Button.prototype._on_bubble_mouseleave.call(this, elem, to_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope, meta_key);
		}

		return true;
	};

	_pGridButton.on_fire_user_ontouchstart = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		nexacro.Button.prototype.on_fire_user_ontouchstart.call(this, touchinfos, changedtouchinfos, from_comp, from_refer_comp);
		this._cellobj.on_fire_user_ontouchstart(touchinfos, changedtouchinfos, from_comp, from_refer_comp);
		return true;
	};

	_pGridButton.on_fire_user_onlbuttondown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		nexacro.Button.prototype.on_fire_user_onlbuttondown.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);
		this._cellobj.on_fire_user_onlbuttondown(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);
		return true;
	};

	_pGridButton.on_fire_user_ontouchend = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		nexacro.Button.prototype.on_fire_user_ontouchend.call(this, touchinfos, changedtouchinfos, from_comp, from_refer_comp);
		this._cellobj.on_fire_user_ontouchend(touchinfos, changedtouchinfos, from_comp, from_refer_comp);
		return true;
	};

	_pGridButton.on_fire_user_onlbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem, meta_key) {
		nexacro.Button.prototype.on_fire_user_onlbuttonup.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem, meta_key);
		this._cellobj.on_fire_user_onlbuttonup(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem, meta_key);
		return true;
	};

	_pGridButton._on_last_lbuttonup = function () {
		this._cellobj._on_last_lbuttonup();
	};

	_pGridButton._on_last_keyup = function () {
		this._cellobj._on_last_keyup();
	};

	_pGridButton._on_click = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, meta_key) {
		if (!this._is_alive) {
			return;
		}

		var visible = this.visible;
		if (this._displaymode && this._grid.selectchangetype == "up") {
			visible = true;
		}

		var force = false;
		if (nexacro._isTouchInteraction) {
			if (!visible && this._grid._showEditing) {
				force = true;
			}
		}

		if ((force || visible) && this._isEnable() && this.enableevent) {
			var clientXY = this._getClientXY(canvasX, canvasY);
			this.on_fire_onclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, this, meta_key);
		}
	};

	_pGridButton._setDataset = function () {
	};

	delete _pGridButton;

	nexacro._GridProgressBarControl = function (id, left, top, width, height, parent, controlmode) {
		nexacro._CellProgressBarControl.call(this, id, left, top, width, height, parent, controlmode);

		if (parent._refinfo) {
			this._grid = parent._refinfo._grid;
			this._cellinfo = parent._refinfo;
			this._cellobj = parent;
		}
		else {
			this._grid = parent;
		}
	};
	var _pGridBar = nexacro._GridProgressBarControl.prototype = nexacro._createPrototype(nexacro._CellProgressBarControl, nexacro._GridProgressBarControl);


	_pGridBar.on_destroy_contents = function () {
		nexacro._CellProgressBarControl.prototype.on_destroy_contents.call(this);
		this._grid = null;
	};

	_pGridBar._on_bubble_mouseenter = function (elem, from_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope, meta_key) {
		var call = true;
		if (bubble_scope) {
			call = this._cellobj._common_mouseenter();
		}

		if (call) {
			nexacro.ProgressBar.prototype._on_bubble_mouseenter.call(this, elem, from_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope, meta_key);
		}

		return true;
	};

	_pGridBar._on_bubble_mouseleave = function (elem, to_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope, meta_key) {
		var call = true;
		if (bubble_scope) {
			call = this._cellobj._common_mouseleave();
		}

		if (call) {
			nexacro.ProgressBar.prototype._on_bubble_mouseleave.call(this, elem, to_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope, meta_key);
		}

		return true;
	};

	_pGridBar._on_last_lbuttonup = function () {
		this._cellobj._on_last_lbuttonup();
	};

	_pGridBar._on_last_keyup = function () {
		this._cellobj._on_last_keyup();
	};

	delete _pGridBar;

	nexacro._GridEditControl = function (id, left, top, width, height, parent, displaymode, controlmode) {
		nexacro._CellEditControl.call(this, id, left, top, width, height, parent, displaymode, controlmode);

		if (parent._refinfo) {
			this._grid = parent._refinfo._grid;
			this._cellinfo = parent._refinfo;
			this._cellobj = parent;
		}
		else {
			this._grid = parent;
		}
	};

	var _pGridEdit = nexacro._createPrototype(nexacro._CellEditControl, nexacro._GridEditControl);
	nexacro._GridEditControl.prototype = _pGridEdit;

	_pGridEdit.on_destroy_contents = function () {
		nexacro._CellEditControl.prototype.on_destroy_contents.call(this);
		this._grid = null;
	};

	_pGridEdit.on_apply_autoskip = function () {
		this._grid._moveToCell("next", true);
	};

	_pGridEdit._on_bubble_touchend = function (touch_manager, touchinfos, changedtouchinfos, event_bubbles, fire_comp, refer_comp, is_userbubble) {
		var call = true;
		if (is_userbubble) {
			call = this._cellobj._common_lbuttonup(changedtouchinfos, null, null, null, null);
		}

		if (call) {
			nexacro.Edit.prototype._on_bubble_touchend.call(this, touch_manager, touchinfos, changedtouchinfos, event_bubbles, fire_comp, refer_comp, is_userbubble);
		}

		return true;
	};

	_pGridEdit._on_bubble_lbuttonup = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, from_elem, bubble_scope, meta_key) {
		var call = true;
		if (bubble_scope) {
			call = this._cellobj._common_lbuttonup(null, elem, canvasX, canvasY, from_elem);
		}

		if (call) {
			nexacro.Edit.prototype._on_bubble_lbuttonup.call(this, elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, from_elem, bubble_scope, meta_key);
		}

		return true;
	};

	_pGridEdit._on_bubble_mouseenter = function (elem, from_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope, meta_key) {
		var call = true;
		if (bubble_scope) {
			call = this._cellobj._common_mouseenter();
		}

		if (call) {
			nexacro.Edit.prototype._on_bubble_mouseenter.call(this, elem, from_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope, meta_key);
		}

		return true;
	};

	_pGridEdit._on_bubble_mouseleave = function (elem, to_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope, meta_key) {
		var call = true;
		if (bubble_scope) {
			call = this._cellobj._common_mouseleave();
		}

		if (call) {
			nexacro.Edit.prototype._on_bubble_mouseleave.call(this, elem, to_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope, meta_key);
		}
		return true;
	};

	_pGridEdit.on_fire_onkillfocus = function (newobj, newreferobj) {
		return this._cellobj.on_fire_onkillfocus(newobj, newreferobj);
	};

	_pGridEdit.on_fire_user_ontouchend = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		nexacro.Edit.prototype.on_fire_user_ontouchend.call(this, touchinfos, changedtouchinfos, from_comp, from_refer_comp);
		this._cellobj.on_fire_user_ontouchend(touchinfos, changedtouchinfos, from_comp, from_refer_comp);
		return true;
	};

	_pGridEdit.on_fire_user_onlbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem, meta_key) {
		nexacro.Edit.prototype.on_fire_user_onlbuttonup.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem, meta_key);
		this._cellobj.on_fire_user_onlbuttonup(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem, meta_key);
		return true;
	};

	_pGridEdit.on_fire_user_ontouchstart = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		nexacro.Edit.prototype.on_fire_user_ontouchstart.call(this, touchinfos, changedtouchinfos, from_comp, from_refer_comp);
		this._cellobj.on_fire_user_ontouchstart(touchinfos, changedtouchinfos, from_comp, from_refer_comp);
		return true;
	};

	_pGridEdit.on_fire_user_onlbuttondown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		nexacro.Edit.prototype.on_fire_user_onlbuttondown.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);
		this._cellobj.on_fire_user_onlbuttondown(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);
		return true;
	};

	_pGridEdit.on_fire_onclick = function (obj, caretpos, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key, clickitem) {
		nexacro.Edit.prototype.on_fire_onclick.call(this, obj, caretpos, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);
		this._cellobj.on_fire_onclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key, clickitem);
		return true;
	};

	if (nexacro._Browser == "Gecko" || nexacro._Browser == "Opera") {
		_pGridEdit._on_click = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, meta_key) {
			if (!this._is_alive) {
				return;
			}

			var visible = this.visible;

			if (this._displaymode) {
				visible = true;
			}

			if (visible && this._isEnable() && this.enableevent) {
				var caretPos = this.getCaretPos();
				var clientXY = this._getClientXY(canvasX, canvasY);
				this.on_fire_onclick(this, caretPos, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, this, meta_key, "control");
			}
		};
	}
	else {
		_pGridEdit._on_click = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, meta_key) {
			if (!this._is_alive) {
				return;
			}

			var visible = this.visible;
			if (this._displaymode && this._grid.selectchangetype == "up") {
				visible = true;
			}

			if (visible && this._isEnable() && this.enableevent) {
				var caretPos = this.getCaretPos();
				var clientXY = this._getClientXY(canvasX, canvasY);
				this.on_fire_onclick(this, caretPos, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, this, meta_key, "control");
			}
		};
	}

	_pGridEdit._on_last_lbuttonup = function () {
		this._cellobj._on_last_lbuttonup();
	};

	_pGridEdit._on_last_keyup = function () {
		this._cellobj._on_last_keyup();
	};

	_pGridEdit._setDataset = function (b_async, row) {
		var cellinfo = this._cellinfo;
		var grid = this._grid;
		var datarow = this._update_datarow;

		if (row != undefined) {
			datarow = row;
		}

		var retn = true;

		if (this._input_element && grid._hide_applydata) {
			if (this._input_element.isComposing()) {
				this._input_element.on_complete_composition_value();

				if (nexacro._Browser == "IE" && nexacro._BrowserVersion == 9) {
					this.value = this._input_element.value;
				}
			}
			else {
				if (nexacro._Browser == "IE" && nexacro._BrowserVersion == 9 && this._input_element._composer && this._input_element._composer.status == nexacro._CompositionState.END) {
					this.value = this._input_element.value;
				}
			}
		}

		if (cellinfo.text._bindtype == 1) {
			grid._is_async_recreate = b_async;
			grid._dsEventOccured = true;

			var fail = {
				status : ""
			};
			grid._binddataset.setColumn(datarow, cellinfo.text._bindexpr, this.value, fail);

			if (fail.status == "cancolumnchange") {
				retn = false;
			}

			grid._is_async_recreate = false;
			grid._dsEventOccured = false;
		}
		return retn;
	};

	delete _pGridEdit;

	nexacro._GridTextAreaControl = function (id, left, top, width, height, parent, displaymode, controlmode) {
		nexacro._CellTextAreaControl.call(this, id, left, top, width, height, parent, displaymode, controlmode);

		if (parent._refinfo) {
			this._grid = parent._refinfo._grid;
			this._cellinfo = parent._refinfo;
			this._cellobj = parent;
		}
		else {
			this._grid = parent;
		}
	};

	var _pGridTextArea = nexacro._createPrototype(nexacro._CellTextAreaControl, nexacro._GridTextAreaControl);
	nexacro._GridTextAreaControl.prototype = _pGridTextArea;

	_pGridTextArea.on_destroy_contents = function () {
		nexacro._CellTextAreaControl.prototype.on_destroy_contents.call(this);
		this._grid = null;
	};



	_pGridTextArea._on_bubble_touchend = function (touch_manager, touchinfos, changedtouchinfos, event_bubbles, fire_comp, refer_comp, is_userbubble) {
		var call = true;
		if (is_userbubble) {
			call = this._cellobj._common_lbuttonup(changedtouchinfos, null, null, null, null);
		}

		if (call) {
			nexacro.TextArea.prototype._on_bubble_touchend.call(this, touch_manager, touchinfos, changedtouchinfos, event_bubbles, fire_comp, refer_comp, is_userbubble);
		}

		return true;
	};

	_pGridTextArea._on_bubble_lbuttonup = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, from_elem, bubble_scope, meta_key) {
		var call = true;
		if (bubble_scope) {
			call = this._cellobj._common_lbuttonup(null, elem, canvasX, canvasY, from_elem);
		}

		if (call) {
			nexacro.TextArea.prototype._on_bubble_lbuttonup.call(this, elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, from_elem, bubble_scope, meta_key);
		}

		return true;
	};

	_pGridTextArea._on_bubble_mouseenter = function (elem, from_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope, meta_key) {
		var call = true;
		if (bubble_scope) {
			call = this._cellobj._common_mouseenter();
		}

		if (call) {
			nexacro.TextArea.prototype._on_bubble_mouseenter.call(this, elem, from_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope, meta_key);
		}

		return true;
	};

	_pGridTextArea._on_bubble_mouseleave = function (elem, to_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope, meta_key) {
		var call = true;
		if (bubble_scope) {
			call = this._cellobj._common_mouseleave();
		}

		if (call) {
			nexacro.TextArea.prototype._on_bubble_mouseleave.call(this, elem, to_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope, meta_key);
		}

		return true;
	};

	_pGridTextArea.on_fire_user_ontouchend = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		nexacro.TextArea.prototype.on_fire_user_ontouchend.call(this, touchinfos, changedtouchinfos, from_comp, from_refer_comp);
		this._cellobj.on_fire_user_ontouchend(touchinfos, changedtouchinfos, from_comp, from_refer_comp);
		return true;
	};

	_pGridTextArea.on_fire_user_onlbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem, meta_key) {
		nexacro.TextArea.prototype.on_fire_user_onlbuttonup.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem, meta_key);
		this._cellobj.on_fire_user_onlbuttonup(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem, meta_key);
		return true;
	};

	_pGridTextArea.on_fire_user_ontouchstart = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		nexacro.TextArea.prototype.on_fire_user_ontouchstart.call(this, touchinfos, changedtouchinfos, from_comp, from_refer_comp);
		this._cellobj.on_fire_user_ontouchstart(touchinfos, changedtouchinfos, from_comp, from_refer_comp);
		return true;
	};

	_pGridTextArea.on_fire_user_onlbuttondown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		nexacro.TextArea.prototype.on_fire_user_onlbuttondown.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);
		this._cellobj.on_fire_user_onlbuttondown(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);
		return true;
	};

	_pGridTextArea.on_fire_onclick = function (obj, caretpos, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key, clickitem) {
		nexacro.TextArea.prototype.on_fire_onclick.call(this, obj, caretpos, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);
		this._cellobj.on_fire_onclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key, clickitem);
		return true;
	};

	if (nexacro._Browser == "Gecko" || nexacro._Browser == "Opera") {
		_pGridTextArea._on_click = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, meta_key) {
			if (!this._is_alive) {
				return;
			}

			var visible = this.visible;
			if (this._displaymode) {
				visible = true;
			}

			if (visible && this._isEnable() && this.enableevent) {
				var caretPos = this.getCaretPos();
				var clientXY = this._getClientXY(canvasX, canvasY);
				this.on_fire_onclick(this, caretPos, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, this, meta_key, "control");
			}
		};
	}
	else {
		_pGridTextArea._on_click = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, meta_key) {
			if (!this._is_alive) {
				return;
			}

			var visible = this.visible;
			if (this._displaymode && this._grid.selectchangetype == "up") {
				visible = true;
			}

			if (visible && this._isEnable() && this.enableevent) {
				var caretPos = this.getCaretPos();
				var clientXY = this._getClientXY(canvasX, canvasY);

				this.on_fire_onclick(this, caretPos, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, this, meta_key, "control");
			}
		};
	}

	_pGridTextArea._on_last_lbuttonup = function () {
		this._cellobj._on_last_lbuttonup();
	};

	_pGridTextArea._on_last_keyup = function () {
		this._cellobj._on_last_keyup();
	};

	_pGridTextArea._setDataset = function (b_async, row) {
		var cellinfo = this._cellinfo;
		var grid = this._grid;
		var datarow = this._update_datarow;

		if (row != undefined) {
			datarow = row;
		}

		var retn = true;

		if (this._input_element && grid._hide_applydata) {
			if (this._input_element.isComposing()) {
				this._input_element.on_complete_composition_value();
			}
			else {
				if (nexacro._Browser == "IE" && nexacro._BrowserVersion == 9 && this._input_element._composer && this._input_element._composer.status == nexacro._CompositionState.END) {
					this.value = this._input_element.value;
				}
			}
		}

		if (cellinfo.text._bindtype == 1 && !this.readonly) {
			grid._is_async_recreate = b_async;
			grid._dsEventOccured = true;

			var fail = {
				status : ""
			};
			grid._binddataset.setColumn(datarow, cellinfo.text._bindexpr, this.value, fail);

			if (fail.status == "cancolumnchange") {
				retn = false;
			}

			grid._is_async_recreate = false;
			grid._dsEventOccured = false;
		}
		return retn;
	};

	delete _pGridTextArea;

	nexacro._GridMaskEditControl = function (id, left, top, width, height, parent, controlmode) {
		nexacro._CellMaskEditControl.call(this, id, left, top, width, height, parent, controlmode);

		if (parent._refinfo) {
			this._grid = parent._refinfo._grid;
			this._cellinfo = parent._refinfo;
			this._cellobj = parent;
		}
		else {
			this._grid = parent;
		}
	};

	var _pGridMaskEdit = nexacro._createPrototype(nexacro._CellMaskEditControl, nexacro._GridMaskEditControl);
	nexacro._GridMaskEditControl.prototype = _pGridMaskEdit;

	_pGridMaskEdit.on_destroy_contents = function () {
		nexacro._CellMaskEditControl.prototype.on_destroy_contents.call(this);
		this._grid = null;
	};

	_pGridMaskEdit.on_apply_autoskip = function () {
		this._grid._moveToCell("next", true);
	};

	_pGridMaskEdit._on_bubble_touchend = function (touch_manager, touchinfos, changedtouchinfos, event_bubbles, fire_comp, refer_comp, is_userbubble) {
		var call = true;
		if (is_userbubble) {
			call = this._cellobj._common_lbuttonup(changedtouchinfos, null, null, null, null);
		}

		if (call) {
			nexacro.MaskEdit.prototype._on_bubble_touchend.call(this, touch_manager, touchinfos, changedtouchinfos, event_bubbles, fire_comp, refer_comp, is_userbubble);
		}

		return true;
	};

	_pGridMaskEdit._on_bubble_lbuttonup = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, from_elem, bubble_scope, meta_key) {
		var call = true;
		if (bubble_scope) {
			call = this._cellobj._common_lbuttonup(null, elem, canvasX, canvasY, from_elem);
		}

		if (call) {
			nexacro.MaskEdit.prototype._on_bubble_lbuttonup.call(this, elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, from_elem, bubble_scope, meta_key);
		}

		return true;
	};

	_pGridMaskEdit._on_bubble_mouseenter = function (elem, from_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope, meta_key) {
		var call = true;
		if (bubble_scope) {
			call = this._cellobj._common_mouseenter();
		}

		if (call) {
			nexacro.MaskEdit.prototype._on_bubble_mouseenter.call(this, elem, from_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope, meta_key);
		}

		return true;
	};

	_pGridMaskEdit._on_bubble_mouseleave = function (elem, to_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope, meta_key) {
		var call = true;
		if (bubble_scope) {
			call = this._cellobj._common_mouseleave();
		}

		if (call) {
			nexacro.MaskEdit.prototype._on_bubble_mouseleave.call(this, elem, to_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope, meta_key);
		}

		return true;
	};

	_pGridMaskEdit.on_fire_user_ontouchend = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		nexacro.MaskEdit.prototype.on_fire_user_ontouchend.call(this, touchinfos, changedtouchinfos, from_comp, from_refer_comp);
		this._cellobj.on_fire_user_ontouchend(touchinfos, changedtouchinfos, from_comp, from_refer_comp);
		return true;
	};

	_pGridMaskEdit.on_fire_user_onlbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem, meta_key) {
		nexacro.MaskEdit.prototype.on_fire_user_onlbuttonup.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem, meta_key);
		this._cellobj.on_fire_user_onlbuttonup(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem, meta_key);
		return true;
	};

	_pGridMaskEdit.on_fire_user_ontouchstart = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		nexacro.MaskEdit.prototype.on_fire_user_ontouchstart.call(this, touchinfos, changedtouchinfos, from_comp, from_refer_comp);
		this._cellobj.on_fire_user_ontouchstart(touchinfos, changedtouchinfos, from_comp, from_refer_comp);
		return true;
	};

	_pGridMaskEdit.on_fire_user_onlbuttondown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		nexacro.MaskEdit.prototype.on_fire_user_onlbuttondown.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);
		this._cellobj.on_fire_user_onlbuttondown(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);
		return true;
	};

	_pGridMaskEdit.on_fire_onclick = function (obj, caretpos, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key, clickitem) {
		nexacro.MaskEdit.prototype.on_fire_onclick.call(this, obj, caretpos, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);
		this._cellobj.on_fire_onclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key, clickitem);
		return true;
	};

	if (nexacro._Browser == "Gecko" || nexacro._Browser == "Opera") {
		_pGridMaskEdit._on_click = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, meta_key) {
			if (!this._is_alive) {
				return;
			}

			var visible = this.visible;
			if (this._displaymode) {
				visible = true;
			}

			if (visible && this._isEnable() && this.enableevent) {
				var caretPos = this.getCaretPos();
				var clientXY = this._getClientXY(canvasX, canvasY);
				this.on_fire_onclick(this, caretPos, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, this, meta_key, "control");
			}
		};
	}
	else {
		_pGridMaskEdit._on_click = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, meta_key) {
			if (!this._is_alive) {
				return;
			}

			var visible = this.visible;
			if (this._displaymode && this._grid.selectchangetype == "up") {
				visible = true;
			}

			if (visible && this._isEnable() && this.enableevent) {
				var caretPos = this.getCaretPos();
				var clientXY = this._getClientXY(canvasX, canvasY);
				this.on_fire_onclick(this, caretPos, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, this, meta_key, "control");
			}
		};
	}

	_pGridMaskEdit._on_last_lbuttonup = function () {
		this._cellobj._on_last_lbuttonup();
	};

	_pGridMaskEdit._on_last_keyup = function () {
		this._cellobj._on_last_keyup();
	};

	_pGridMaskEdit._setDataset = function (b_async, row) {
		var cellinfo = this._cellinfo;
		var grid = this._grid;
		var datarow = this._update_datarow;

		if (row != undefined) {
			datarow = row;
		}

		var retn = true;

		if (cellinfo.text._bindtype == 1) {
			grid._is_async_recreate = b_async;
			grid._dsEventOccured = true;

			var fail = {
				status : ""
			};
			grid._binddataset.setColumn(datarow, cellinfo.text._bindexpr, this.value, fail);

			if (fail.status == "cancolumnchange") {
				retn = false;
			}

			grid._is_async_recreate = false;
			grid._dsEventOccured = false;
		}
		return retn;
	};

	delete _pGridMaskEdit;

	nexacro._GridCalendarControl = function (id, left, top, width, height, parent, displaymode, controlmode) {
		nexacro._CellCalendarControl.call(this, id, left, top, width, height, parent, displaymode, controlmode);

		if (parent._refinfo) {
			this._grid = parent._refinfo._grid;
			this._cellinfo = parent._refinfo;
			this._cellobj = parent;
		}
		else {
			this._grid = parent;
		}
	};

	var _pGridCalendar = nexacro._createPrototype(nexacro._CellCalendarControl, nexacro._GridCalendarControl);
	nexacro._GridCalendarControl.prototype = _pGridCalendar;

	_pGridCalendar.on_destroy_contents = function () {
		nexacro._CellCalendarControl.prototype.on_destroy_contents.call(this);
		this._grid = null;
	};

	_pGridCalendar.set_innerdataset = function (str) {
		var ret = nexacro._CellCalendarControl.prototype.set_innerdataset.call(this, str);

		if (this._controlmode) {
			var grid = this._grid;
			if (grid) {
				for (var i = 0, n = grid.getCellCount("body"); i < n; i++) {
					grid.setCellProperty("body", i, "calendarinnerdataset", str);
				}

				if (grid._currentCellEditor && grid._currentCellEditor instanceof nexacro._GridCalendarControl) {
					grid._currentCellEditor.set_innerdataset(str);
				}
			}
		}
		return ret;
	};

	_pGridCalendar.set_backgroundcolumn = function (str) {
		nexacro._CellCalendarControl.prototype.set_backgroundcolumn.call(this, str);
		if (this._controlmode) {
			var grid = this._grid;
			if (grid) {
				for (var i = 0, n = grid.getCellCount("body"); i < n; i++) {
					grid.setCellProperty("body", i, "calendarbackgroundcolumn", str);
				}
			}
		}
	};

	_pGridCalendar.set_bordercolumn = function (str) {
		nexacro._CellCalendarControl.prototype.set_bordercolumn.call(this, str);
		if (this._controlmode) {
			var grid = this._grid;
			if (grid) {
				for (var i = 0, n = grid.getCellCount("body"); i < n; i++) {
					grid.setCellProperty("body", i, "calendarbordercolumn", str);
				}
			}
		}
	};

	_pGridCalendar.set_datecolumn = function (str) {
		nexacro._CellCalendarControl.prototype.set_datecolumn.call(this, str);
		if (this._controlmode) {
			var grid = this._grid;
			if (grid) {
				for (var i = 0, n = grid.getCellCount("body"); i < n; i++) {
					grid.setCellProperty("body", i, "calendardatecolumn", str);
				}
			}
		}
	};

	_pGridCalendar.set_textcolorcolumn = function (str) {
		nexacro._CellCalendarControl.prototype.set_textcolorcolumn.call(this, str);
		if (this._controlmode) {
			var grid = this._grid;
			if (grid) {
				for (var i = 0, n = grid.getCellCount("body"); i < n; i++) {
					grid.setCellProperty("body", i, "calendartextcolorcolumn", str);
				}
			}
		}
	};

	_pGridCalendar._on_bubble_touchend = function (touch_manager, touchinfos, changedtouchinfos, event_bubbles, fire_comp, refer_comp, is_userbubble) {
		var call = true;
		if (is_userbubble) {
			call = this._cellobj._common_lbuttonup(changedtouchinfos, null, null, null, null);
		}

		if (call) {
			nexacro.Calendar.prototype._on_bubble_touchend.call(this, touch_manager, touchinfos, changedtouchinfos, event_bubbles, fire_comp, refer_comp, is_userbubble);
		}

		return true;
	};

	_pGridCalendar._on_bubble_lbuttonup = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, from_elem, bubble_scope, meta_key) {
		var call = true;
		if (bubble_scope) {
			call = this._cellobj._common_lbuttonup(null, elem, canvasX, canvasY, from_elem);
		}

		if (call) {
			nexacro.Calendar.prototype._on_bubble_lbuttonup.call(this, elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, from_elem, bubble_scope, meta_key);
		}

		return true;
	};

	_pGridCalendar._on_mouseenter = function (elem, from_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, meta_key) {
		if (this._isPopupVisible()) {
			var cellobj = this._cellobj;
			if (cellobj) {
				var grid = cellobj._grid;
				grid._lastmouseentercell = null;
			}
		}
		return nexacro.Component.prototype._on_mouseenter.call(this, elem, from_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, meta_key);
	};

	_pGridCalendar._on_bubble_mouseenter = function (elem, from_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope, meta_key) {
		var call = true;
		if (bubble_scope) {
			call = this._cellobj._common_mouseenter();
		}

		if (call) {
			nexacro.Calendar.prototype._on_bubble_mouseenter.call(this, elem, from_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope, meta_key);
		}

		return true;
	};

	_pGridCalendar._on_bubble_mouseleave = function (elem, to_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope, meta_key) {
		var call = true;
		if (bubble_scope) {
			call = this._cellobj._common_mouseleave();
		}

		if (call) {
			nexacro.Calendar.prototype._on_bubble_mouseleave.call(this, elem, to_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope, meta_key);
		}

		return true;
	};

	_pGridCalendar.on_notify_onkeydown = function (obj, e) {
		var grid = this._grid;

		if (e.keycode == nexacro.Event.KEY_DOWN && e.altkey) {
			grid._is_editor_keyaction = false;
		}
		if (!obj._displaymode) {
			return (nexacro.Calendar.prototype.on_notify_onkeydown.call(this, obj, e));
		}
	};

	_pGridCalendar.on_fire_onchanged = function (obj, pre_text, pre_value, post_text, post_value) {
		if (!obj._displaymode) {
			if (this._grid.autoupdatetype == "dateselect" || this._grid.autoupdatetype == "itemselect") {
				this._setDataset(true, undefined, false, post_text, post_value, pre_value);
			}
			return (nexacro.Calendar.prototype.on_fire_onchanged.call(this, obj, pre_text, pre_value, post_text, post_value));
		}
	};

	_pGridCalendar.on_fire_user_ontouchend = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		var touchinfo = nexacro._getFirstTouchInfo(changedtouchinfos);

		if (this._isSubCell) {
			touchinfo.canvasx -= from_refer_comp._adjust_left;
			touchinfo.canvasy -= from_refer_comp._adjust_top;
			touchinfo.clientx -= from_refer_comp._adjust_left;
			touchinfo.clienty -= from_refer_comp._adjust_top;
		}

		nexacro.Calendar.prototype.on_fire_user_ontouchend.call(this, touchinfos, changedtouchinfos, from_comp, from_refer_comp);
		this._cellobj.on_fire_user_ontouchend(touchinfos, changedtouchinfos, from_comp, from_refer_comp);
		return true;
	};

	_pGridCalendar.on_fire_user_onlbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem, meta_key) {
		if (from_refer_comp != this) {
			canvasX -= from_refer_comp._adjust_left;
			clientX -= from_refer_comp._adjust_left;
			canvasY -= from_refer_comp._adjust_top;
			clientY -= from_refer_comp._adjust_top;
		}

		nexacro.Calendar.prototype.on_fire_user_onlbuttonup.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem, meta_key);
		this._cellobj.on_fire_user_onlbuttonup(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem, meta_key);
		return true;
	};

	_pGridCalendar.on_fire_user_ontouchstart = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		var touchinfo = nexacro._getFirstTouchInfo(changedtouchinfos);

		if (this._isSubCell) {
			touchinfo.canvasx -= from_refer_comp._adjust_left;
			touchinfo.canvasy -= from_refer_comp._adjust_top;
			touchinfo.clientx -= from_refer_comp._adjust_left;
			touchinfo.clienty -= from_refer_comp._adjust_top;
		}

		nexacro.Calendar.prototype.on_fire_user_ontouchstart.call(this, touchinfos, changedtouchinfos, from_comp, from_refer_comp);
		this._cellobj.on_fire_user_ontouchstart(touchinfos, changedtouchinfos, from_comp, from_refer_comp);
		return true;
	};

	_pGridCalendar.on_fire_user_onlbuttondown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		if (from_refer_comp != this) {
			canvasX -= from_refer_comp._adjust_left;
			clientX -= from_refer_comp._adjust_left;
			canvasY -= from_refer_comp._adjust_top;
			clientY -= from_refer_comp._adjust_top;
		}

		nexacro.Calendar.prototype.on_fire_user_onlbuttondown.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);
		this._cellobj.on_fire_user_onlbuttondown(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);
		return true;
	};

	_pGridCalendar._on_edit_oneditclick = function (obj, e) {
		var padding = this._getCurrentStylePadding();
		var canvasX = e.canvasx + (padding ? padding.left : 0);
		var canvasY = e.canvasy + (padding ? padding.top : 0);
		var clientXY = this._getClientXY(canvasX, canvasY);
		this.on_fire_oneditclick(obj, e.caretpos, e.button, e.altkey, e.ctrlkey, e.shiftkey, e.screenx, e.screeny, e.canvasx, e.canvasy, e.clientx, e.clienty, e.fromobject, e.fromreferenceobject, e.metakey);
		var ret = this._cellobj.on_fire_onclick(e.button, e.altkey, e.ctrlkey, e.shiftkey, e.screenx, e.screeny, canvasX, canvasY, clientXY[0], clientXY[1], e.fromobject, e.fromreferenceobject, e.metakey, "control");
		if (this._type == "system") {
			var control_elem = this.getElement();
			if (control_elem) {
				var calendar = this._cellobj._editor;
				if (!calendar) {
					calendar = this;
				}
				calendar.calendaredit._prevent_clickevent = false;

				var isdropdown = this._cellobj.on_fire_ondropdown(obj);
				if (isdropdown) {
					nexacro._openSystemCalendar(calendar, this.value, "_on_notify_mobile_valuechanged");
				}

				calendar.calendaredit._prevent_clickevent = true;
			}
		}

		return ret;
	};

	_pGridCalendar._on_drop_onclick = function (obj, e) {
		nexacro.Calendar.prototype._on_drop_onclick.call(this, obj, e);

		var padding = this._getCurrentStylePadding();
		var canvasX = e.canvasx + (padding ? padding.left : 0);
		var canvasY = e.canvasy + (padding ? padding.top : 0);
		var clientXY = this._getClientXY(canvasX, canvasY);

		return this._cellobj.on_fire_onclick(e.button, e.altkey, e.ctrlkey, e.shiftkey, e.screenx, e.screeny, canvasX, canvasY, clientXY[0], clientXY[1], e.fromobject, e.fromreferenceobject, e.metakey, "control");
	};
	_pGridCalendar._on_drop_mobile_onclick = function (obj, e) {
		nexacro.Calendar.prototype._on_drop_mobile_onclick.call(this, obj, e);

		var padding = this._getCurrentStylePadding();
		var canvasX = e.canvasx + (padding ? padding.left : 0);
		var canvasY = e.canvasy + (padding ? padding.top : 0);
		var clientXY = this._getClientXY(canvasX, canvasY);

		return this._cellobj.on_fire_onclick(e.button, e.altkey, e.ctrlkey, e.shiftkey, e.screenx, e.screeny, canvasX, canvasY, clientXY[0], clientXY[1], e.fromobject, e.fromreferenceobject, e.metakey, "control");
	};

	_pGridCalendar._on_click = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, meta_key) {
		if (!this._is_alive) {
			return;
		}

		var visible = this.visible;
		if (this._displaymode && this._grid.selectchangetype == "up") {
			visible = true;
		}

		if (visible && this._isEnable() && this.enableevent) {
			var clientXY = this._getClientXY(canvasX, canvasY);
			this.on_fire_onclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, this, meta_key, "control");
		}
	};

	_pGridCalendar._on_last_lbuttonup = function () {
		this._cellobj._on_last_lbuttonup();
	};

	_pGridCalendar._on_last_keyup = function () {
		this._cellobj._on_last_keyup();
	};


	_pGridCalendar._setDataset = function (b_async, row, fire, post_text, post_value, oldvalue) {
		var cellinfo = this._cellinfo;
		var grid = this._grid;
		var datarow = this._update_datarow;

		if (fire == undefined) {
			fire = true;
		}

		this._setValueCtrl(fire, post_text, post_value);

		if (row != undefined) {
			datarow = row;
		}

		var retn = true;

		if (cellinfo.text._bindtype == 1 && this._is_value_changed) {
			grid._is_async_recreate = b_async;
			grid._dsEventOccured = true;

			var fail = {
				status : ""
			};
			grid._binddataset.setColumn(datarow, cellinfo.text._bindexpr, this.value, fail);

			if (fail.status == "cancolumnchange") {
				this._setValue(oldvalue);
				retn = false;
			}
			grid._is_async_recreate = false;
			grid._dsEventOccured = false;
		}
		return retn;
	};

	delete _pGridCalendar;

	nexacro._GridComboControl = function (id, left, top, width, height, parent, displaymode, controlmode) {
		nexacro._CellComboControl.call(this, id, left, top, width, height, parent, displaymode, controlmode);
		if (parent._refinfo) {
			this._grid = parent._refinfo._grid;
			this._cellinfo = parent._refinfo;
			this._cellobj = parent;
		}
		else {
			this._grid = parent;
		}
	};

	var _pGridCombo = nexacro._createPrototype(nexacro._CellComboControl, nexacro._GridComboControl);
	nexacro._GridComboControl.prototype = _pGridCombo;

	_pGridCombo.on_destroy_contents = function () {
		nexacro._CellComboControl.prototype.on_destroy_contents.call(this);
		this._grid = null;
	};

	_pGridCombo._on_bubble_touchend = function (touch_manager, touchinfos, changedtouchinfos, event_bubbles, fire_comp, refer_comp, is_userbubble) {
		var call = true;
		if (is_userbubble) {
			call = this._cellobj._common_lbuttonup(changedtouchinfos, null, null, null, null);
		}

		if (call) {
			nexacro.Combo.prototype._on_bubble_touchend.call(this, touch_manager, touchinfos, changedtouchinfos, event_bubbles, fire_comp, refer_comp, is_userbubble);
		}

		return true;
	};

	_pGridCombo._on_bubble_lbuttonup = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, from_elem, bubble_scope, meta_key) {
		var call = true;
		if (bubble_scope) {
			call = this._cellobj._common_lbuttonup(null, elem, canvasX, canvasY, from_elem);
		}

		if (call) {
			nexacro.Combo.prototype._on_bubble_lbuttonup.call(this, elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, from_elem, bubble_scope, meta_key);
		}

		return true;
	};

	_pGridCombo._on_mouseenter = function (elem, from_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, meta_key) {
		if (this._isPopupVisible()) {
			var cellobj = this._cellobj;
			if (cellobj) {
				var grid = cellobj._grid;
				grid._lastmouseentercell = null;
			}
		}
		return nexacro.Component.prototype._on_mouseenter.call(this, elem, from_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, meta_key);
	};

	_pGridCombo._on_bubble_mouseenter = function (elem, from_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope, meta_key) {
		var call = true;
		if (bubble_scope) {
			call = this._cellobj._common_mouseenter();
		}

		if (call) {
			nexacro.Combo.prototype._on_bubble_mouseenter.call(this, elem, from_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope, meta_key);
		}

		return true;
	};

	_pGridCombo._on_bubble_mouseleave = function (elem, to_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope, meta_key) {
		var call = true;
		if (bubble_scope) {
			call = this._cellobj._common_mouseleave();
		}

		if (call) {
			nexacro.Combo.prototype._on_bubble_mouseleave.call(this, elem, to_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope, meta_key);
		}

		return true;
	};

	_pGridCombo.on_fire_user_ontouchend = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		var touchinfo = nexacro._getFirstTouchInfo(changedtouchinfos);

		if (this._isSubCell) {
			touchinfo.canvasx -= from_refer_comp._adjust_left;
			touchinfo.canvasy -= from_refer_comp._adjust_top;
			touchinfo.clientx -= from_refer_comp._adjust_left;
			touchinfo.clienty -= from_refer_comp._adjust_top;
		}

		nexacro.Combo.prototype.on_fire_user_ontouchend.call(this, touchinfos, changedtouchinfos, from_comp, from_refer_comp);
		this._cellobj.on_fire_user_ontouchend(touchinfos, changedtouchinfos, from_comp, from_refer_comp);
		return true;
	};

	_pGridCombo.on_fire_user_onlbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem, meta_key) {
		if (from_refer_comp != this) {
			canvasX -= from_refer_comp._adjust_left;
			clientX -= from_refer_comp._adjust_left;
			canvasY -= from_refer_comp._adjust_top;
			clientY -= from_refer_comp._adjust_top;
		}

		nexacro.Combo.prototype.on_fire_user_onlbuttonup.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem, meta_key);
		this._cellobj.on_fire_user_onlbuttonup(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem, meta_key);
		return true;
	};

	_pGridCombo.on_fire_user_ontouchstart = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		var touchinfo = nexacro._getFirstTouchInfo(changedtouchinfos);

		if (this._isSubCell) {
			touchinfo.canvasx -= from_refer_comp._adjust_left;
			touchinfo.canvasy -= from_refer_comp._adjust_top;
			touchinfo.clientx -= from_refer_comp._adjust_left;
			touchinfo.clienty -= from_refer_comp._adjust_top;
		}

		nexacro.Combo.prototype.on_fire_user_ontouchstart.call(this, touchinfos, changedtouchinfos, from_comp, from_refer_comp);
		this._cellobj.on_fire_user_ontouchstart(touchinfos, changedtouchinfos, from_comp, from_refer_comp);
		return true;
	};

	_pGridCombo.on_fire_user_onlbuttondown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		if (from_refer_comp != this) {
			canvasX -= from_refer_comp._adjust_left;
			clientX -= from_refer_comp._adjust_left;
			canvasY -= from_refer_comp._adjust_top;
			clientY -= from_refer_comp._adjust_top;
		}

		nexacro.Combo.prototype.on_fire_user_onlbuttondown.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);
		this._cellobj.on_fire_user_onlbuttondown(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);
		return true;
	};

	_pGridCombo.on_fire_onitemchanged = function (obj, preindex, pretext, prevalue, postindex, posttext, postvalue) {
		if (!obj._displaymode) {
			if (this._grid.autoupdatetype == "comboselect" || this._grid.autoupdatetype == "itemselect") {
				this._setDataset(true, undefined, prevalue);
			}

			return (nexacro.Combo.prototype.on_fire_onitemchanged.call(this, obj, preindex, pretext, prevalue, postindex, posttext, postvalue));
		}
	};

	_pGridCombo._on_edit_oneditclick = function (obj, e) {
		var padding = this._getCurrentStylePadding();
		var canvasX = e.canvasx + (padding ? padding.left : 0);
		var canvasY = e.canvasy + (padding ? padding.top : 0);
		var clientXY = this._getClientXY(canvasX, canvasY);

		return this._cellobj.on_fire_onclick(e.button, e.altkey, e.ctrlkey, e.shiftkey, e.screenx, e.screeny, canvasX, canvasY, clientXY[0], clientXY[1], e.fromobject, e.fromreferenceobject, e.metakey, "control");
	};

	_pGridCombo._on_edit_mobile_oneditclick = function (obj, e) {
		nexacro.Combo.prototype._on_edit_mobile_oneditclick.call(this, obj, e);

		var padding = this._getCurrentStylePadding();
		var canvasX = e.canvasx + (padding ? padding.left : 0);
		var canvasY = e.canvasy + (padding ? padding.top : 0);
		var clientXY = this._getClientXY(canvasX, canvasY);

		return this._cellobj.on_fire_onclick(e.button, e.altkey, e.ctrlkey, e.shiftkey, e.screenx, e.screeny, canvasX, canvasY, clientXY[0], clientXY[1], e.fromobject, e.fromreferenceobject, e.metakey, "control");
	};

	_pGridCombo._on_drop_mobile_onclick = function (obj, e) {
		nexacro.Combo.prototype._on_drop_mobile_onclick.call(this, obj, e);

		var padding = this._getCurrentStylePadding();
		var canvasX = e.canvasx + (padding ? padding.left : 0);
		var canvasY = e.canvasy + (padding ? padding.top : 0);
		var clientXY = this._getClientXY(canvasX, canvasY);

		return this._cellobj.on_fire_onclick(e.button, e.altkey, e.ctrlkey, e.shiftkey, e.screenx, e.screeny, canvasX, canvasY, clientXY[0], clientXY[1], e.fromobject, e.fromreferenceobject, e.metakey, "control");
	};

	_pGridCombo._on_drop_onclick = function (obj, e) {
		nexacro.Combo.prototype._on_drop_onclick.call(this, obj, e);

		var padding = this._getCurrentStylePadding();
		var canvasX = e.canvasx + (padding ? padding.left : 0);
		var canvasY = e.canvasy + (padding ? padding.top : 0);
		var clientXY = this._getClientXY(canvasX, canvasY);

		return this._cellobj.on_fire_onclick(e.button, e.altkey, e.ctrlkey, e.shiftkey, e.screenx, e.screeny, canvasX, canvasY, clientXY[0], clientXY[1], e.fromobject, e.fromreferenceobject, e.metakey, "control");
	};

	_pGridCombo._on_click = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, meta_key) {
		if (!this._is_alive) {
			return;
		}

		var visible = this.visible;
		if (this._displaymode && this._grid.selectchangetype == "up") {
			visible = true;
		}

		if (visible && this._isEnable() && this.enableevent) {
			var clientXY = this._getClientXY(canvasX, canvasY);
			this.on_fire_onclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, this, meta_key);
		}
	};

	_pGridCombo._on_last_lbuttonup = function () {
		this._cellobj._on_last_lbuttonup();
	};

	_pGridCombo._on_last_keyup = function () {
		this._cellobj._on_last_keyup();
	};

	_pGridCombo._setDataset = function (b_async, row, prevalue) {
		var cellinfo = this._cellinfo;
		var grid = this._grid;
		var datarow = this._update_datarow;

		if (row != undefined) {
			datarow = row;
		}

		var retn = true;

		if (cellinfo.text._bindtype == 1) {
			grid._is_async_recreate = b_async;
			grid._dsEventOccured = true;

			var fail = {
				status : ""
			};
			grid._binddataset.setColumn(datarow, cellinfo.text._bindexpr, this.value, fail);

			if (fail.status == "cancolumnchange") {
				this.set_value(prevalue);
				retn = false;
			}
			grid._is_async_recreate = false;
			grid._dsEventOccured = false;
		}
		return retn;
	};

	delete _pGridCombo;

	nexacro._GridCellControlCheckbox = function (id, left, top, width, height, parent) {
		nexacro._CellCheckboxControlBase.call(this, id, left, top, width, height, parent);
	};

	var _pGridCellCheckbox = nexacro._createPrototype(nexacro._CellCheckboxControlBase, nexacro._GridCellControlCheckbox);
	nexacro._GridCellControlCheckbox.prototype = _pGridCellCheckbox;


	_pGridCellCheckbox.on_notify_checkbox_onkeydown = function () {
	};

	_pGridCellCheckbox._on_last_lbuttonup = function () {
		this._cellobj._on_last_lbuttonup();
	};

	_pGridCellCheckbox._on_last_keyup = function () {
		this._cellobj._on_last_keyup();
	};


	delete _pGridCellCheckbox;

	nexacro._GridCheckboxControl = function (id, left, top, width, height, parent, controlmode) {
		nexacro._GridCellControlCheckbox.call(this, id, left, top, width, height, parent);
		this._controlmode = (controlmode) ? true : false;
		this._grid = this._view;
	};

	var _pGridCheckbox = nexacro._createPrototype(nexacro._GridCellControlCheckbox, nexacro._GridCheckboxControl);
	nexacro._GridCheckboxControl.prototype = _pGridCheckbox;



	_pGridCheckbox._on_bubble_mouseenter = function (elem, from_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope, meta_key) {
		var call = true;
		if (bubble_scope) {
			call = this._cellobj._common_mouseenter();
		}

		if (call) {
			nexacro._GridCellControlCheckbox.prototype._on_bubble_mouseenter.call(this, elem, from_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope, meta_key);
		}

		return true;
	};

	_pGridCheckbox._on_bubble_mouseleave = function (elem, to_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope, meta_key) {
		var call = true;
		if (bubble_scope) {
			call = this._cellobj._common_mouseleave();
		}

		if (call) {
			nexacro._GridCellControlCheckbox.prototype._on_bubble_mouseleave.call(this, elem, to_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope, meta_key);
		}

		return true;
	};

	_pGridCheckbox._common_fire_lbuttondown = function () {
		var grid = this._grid;

		if (grid) {
			var datarow = grid._getDataRow(this._cellobj._rowidx);
			if (grid._isFakeCell(datarow)) {
				return false;
			}
		}
	};

	_pGridCheckbox.on_fire_user_ontouchstart = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		this._common_fire_lbuttondown();
		return this._cellobj.on_fire_user_ontouchstart(touchinfos, changedtouchinfos, from_comp, from_refer_comp);
	};

	_pGridCheckbox.on_fire_user_onlbuttondown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		this._common_fire_lbuttondown();
		return this._cellobj.on_fire_user_onlbuttondown(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);
	};

	_pGridCheckbox.on_fire_user_ontouchend = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		nexacro._GridCellControlCheckbox.prototype.on_fire_user_ontouchend.call(this, touchinfos, changedtouchinfos, from_comp, from_refer_comp);
		this._cellobj.on_fire_user_ontouchend(touchinfos, changedtouchinfos, from_comp, from_refer_comp);
		return true;
	};

	_pGridCheckbox.on_fire_user_onlbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem, meta_key) {
		nexacro._GridCellControlCheckbox.prototype.on_fire_user_onlbuttonup.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem, meta_key);
		this._cellobj.on_fire_user_onlbuttonup(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem, meta_key);
		return true;
	};

	_pGridCheckbox.on_fire_onclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		var grid = this._grid;

		if (grid) {
			var datarow = grid._getDataRow(this._cellobj._rowidx);
			if (grid._isFakeCell(datarow)) {
				return false;
			}
		}

		if (grid.selectchangetype != "down") {
			if (nexacro._toBoolean(grid.readonly) == false) {
				this._toggleCheck();
			}
		}

		if (!this._is_alive) {
			return;
		}

		return this._cellobj.on_fire_onclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key, "control");
	};

	_pGridCheckbox.on_fire_ondblclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		var grid = this._grid;
		if (grid) {
			var datarow = grid._getDataRow(this._cellobj._rowidx);
			if (grid._isFakeCell(datarow)) {
				return false;
			}
		}

		return this._cellobj.on_fire_ondblclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key, "control");
	};

	_pGridCheckbox._toggleCheck = function () {
		var cellobj = this._cellobj;
		var cellinfo = this._cellinfo;
		var grid = this._grid;
		var datarow = grid._getDataRow(cellobj._rowidx);
		var editType = cellinfo._getEdittype(datarow);

		if (editType == "checkbox") {
			var v = this._isChecked(this.value);

			if (v) {
				v = nexacro._isNull(this.falsevalue) ? 0 : this.falsevalue;
			}
			else {
				v = nexacro._isNull(this.truevalue) ? 1 : this.truevalue;
			}

			if (cellinfo.text._bindtype == 1) {
				grid._dsEventOccured = true;
				if (cellinfo._grid._binddataset.setColumn(datarow, cellinfo.text._bindexpr, v)) {
					v = this._getDisplayText();
					this.set_value(v);
				}
				if (grid) {
					grid._dsEventOccured = false;
				}
			}
		}
	};

	_pGridCheckbox._getDisplayText = function () {
		if (this.parent) {
			return this.parent._getDisplayText();
		}
		return "";
	};

	delete _pGridCheckbox;

	nexacro._GridImageControl = function (id, left, top, width, height, parent) {
		nexacro._CellImageControl.call(this, id, left, top, width, height, parent);

		if (parent._refinfo) {
			this._grid = parent._refinfo._grid;
			this._cellinfo = parent._refinfo;
			this._cellobj = parent;
		}
	};

	var _pGridImage = nexacro._createPrototype(nexacro._CellImageControl, nexacro._GridImageControl);
	nexacro._GridImageControl.prototype = _pGridImage;

	_pGridImage.on_destroy_contents = function () {
		nexacro._CellImageControl.prototype.on_destroy_contents.call(this);
		this._grid = null;
	};

	_pGridImage._on_bubble_mouseenter = function (elem, from_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope, meta_key) {
		var call = true;
		if (bubble_scope) {
			call = this._cellobj._common_mouseenter();
		}

		if (call) {
			nexacro.Component.prototype._on_bubble_mouseenter.call(this, elem, from_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope, meta_key);
		}

		return true;
	};

	_pGridImage._on_bubble_mouseleave = function (elem, to_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope, meta_key) {
		var call = true;
		if (bubble_scope) {
			call = this._cellobj._common_mouseleave();
		}

		if (call) {
			nexacro.Component.prototype._on_bubble_mouseleave.call(this, elem, to_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope, meta_key);
		}

		return true;
	};

	_pGridImage.on_fire_onclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		return this.parent.on_fire_onclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key, "image");
	};

	_pGridImage.on_fire_user_onlbuttondown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		return this.parent.on_fire_user_onlbuttondown(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, this, from_refer_comp, meta_key);
	};

	_pGridImage.on_fire_user_ontouchend = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		return this.parent.on_fire_user_ontouchend(touchinfos, changedtouchinfos, this, from_refer_comp);
	};

	_pGridImage.on_fire_user_onlbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem, meta_key) {
		return this.parent.on_fire_user_onlbuttonup(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, this, from_refer_comp, from_elem, meta_key);
	};

	_pGridImage.on_fire_user_onkeydown = function (key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp, meta_key) {
		return this.parent.on_fire_user_onkeydown(key_code, alt_key, ctrl_key, shift_key, this, from_refer_comp, meta_key);
	};

	_pGridImage.on_fire_user_onkeyup = function (key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp, meta_key) {
		return this.parent.on_fire_user_onkeyup(key_code, alt_key, ctrl_key, shift_key, this, from_refer_comp, meta_key);
	};

	_pGridImage._on_last_lbuttonup = function () {
		this._cellobj._on_last_lbuttonup();
	};

	_pGridImage._on_last_keyup = function () {
		this._cellobj._on_last_keyup();
	};


	delete _pGridImage;

	nexacro._GridSelectorButtonControl = function (id, left, top, width, height, right, bottom, parent, target, idx) {
		nexacro.Button.call(this, id, left, top, width, height, right, bottom, null, null, null, null, target);
		this._real_parent = parent;
		this._band = parent._band;
		this._grid = target;
		this._idx = idx;
		this._point = {
			x : 0, 
			y : 0, 
			w : 0, 
			h : 0
		};
		this._minibox = null;
		this._minibox_size = 8;
		this._minibox_wgap = 0;
		this._minibox_hgap = 0;
		this._minibox_backcolor = "black";
		this._is_track = true;
		this._setControl();
	};
	var _pGridSelectorButtonControl = nexacro._GridSelectorButtonControl.prototype = nexacro._createPrototype(nexacro.Button, nexacro._GridSelectorButtonControl);
	_pGridSelectorButtonControl._is_subcontrol = true;

	_pGridSelectorButtonControl._updateMiniBox = function () {
		if (!this.image || !this._image_width || !this._image_height) {
			var x = (this._adjust_height - this._minibox_size) / 2;

			this._minibox_wgap = x;
			this._minibox_hgap = x;

			if (!this._minibox) {
				this._minibox = new nexacro.Component("minibox", x, x, this._minibox_size, this._minibox_size, null, null, null, null, null, null, this);
				this._minibox._is_simple_control = true;
				this._minibox._is_track = true;
				this._minibox.set_background(this._minibox_backcolor);

				this._minibox._on_starttrack = function () {
					return this.parent._on_starttrack();
				};
				this._minibox._on_movetrack = function (x, y, dragdata) {
					return this.parent._on_movetrack(x, y, dragdata);
				};
				this._minibox._on_endtrack = function (x, y, dragdata) {
					return this.parent._on_endtrack(x, y, dragdata);
				};

				this._minibox.createComponent();
			}
			else {
				this._minibox.move(x, x, this._minibox_size, this._minibox_size);
			}
		}
		else {
			if (this._minibox) {
				this._minibox.destroy();
				this._minibox = null;
			}
			if (this._img_elem) {
				this._minibox_wgap = (this._adjust_width - this._image_width) / 2;
				this._minibox_hgap = (this._adjust_height - this._image_height) / 2;

				if (this._minibox_wgap < 0) {
					this._minibox_wgap = 0;
				}
				if (this._minibox_hgap < 0) {
					this._minibox_hgap = 0;
				}
			}
		}
	};

	_pGridSelectorButtonControl.on_fire_onsize = function () {
		this._updateMiniBox();
	};

	_pGridSelectorButtonControl.on_create_contents = function () {
		nexacro.Button.prototype.on_create_contents.call(this);
		this._updateMiniBox();
	};

	_pGridSelectorButtonControl.on_created_contents = function (win) {
		nexacro.Button.prototype.on_created_contents.call(this, win);

		if (this._minibox) {
			this._minibox.on_created();
		}
	};

	_pGridSelectorButtonControl.on_destroy_contents = function () {
		this._band = null;
		this._grid = null;
		this._minibox = null;
		this._real_parent = null;
		nexacro.Button.prototype.on_destroy_contents.call(this);
	};

	_pGridSelectorButtonControl._on_starttrack = function () {
		var p = this._real_parent;
		p._is_tracking = true;
		p._track_reset_scroll = false;
		p._track_up_scroll = false;

		var scroll_top = this._grid._getScrollTop();
		var scroll_left = this._grid._getScrollLeft();

		this._point.hgap = 0;
		this._point.wgap = 0;
		this._point.scrolltop = scroll_top;
		this._point.scrollleft = scroll_left;

		this._point.x = p._area_pos.l;
		this._point.y = p._area_pos.t;
		this._point.w = p._area_pos.w;
		this._point.h = p._area_pos.h;


		var start_row = -1, end_row = -1;
		var select_area = this._grid._selectinfo.area;
		if (select_area.length > 0) {
			var area = select_area[select_area.length - 1];
			start_row = area.begrow;
			end_row = area.endrow;

			if (this._idx != p._pre_idx) {
				var areainfo = this._grid._selectinfo.areainfo;
				var ctrlpoint = this._grid._selectinfo.ctrlpoint;
				var cellinfo;
				if (areainfo) {
					var format = this._grid._curFormat;
					var subrowlen = format._bodyrows.length;
					if (this._idx == 0) {
						cellinfo = format._bodycells[areainfo.ecell];
						ctrlpoint._set(cellinfo, areainfo.erow, subrowlen);
					}
					else if (this._idx == 1) {
						cellinfo = format._bodycells[areainfo.scell];
						ctrlpoint._set(cellinfo, areainfo.srow, subrowlen);
					}
					else if (this._idx == 2) {
						cellinfo = format._bodycells[areainfo.ecell];
						ctrlpoint._set(cellinfo, areainfo.srow, subrowlen);
					}
					else if (this._idx == 3) {
						cellinfo = format._bodycells[areainfo.scell];
						ctrlpoint._set(cellinfo, areainfo.erow, subrowlen);
					}
				}
			}
		}


		if (this._grid._fixed_rowcnt > 0) {
			if (start_row >= this._grid._fixed_startrow && start_row <= this._grid._fixed_endrow) {
				this._point.y = p._area_pos.t += this._point.scrolltop;

				if (end_row > this._grid._fixed_endrow && scroll_top > 0) {
					if (p._end_scroll_top >= 0) {
						this._point.h = p._area_pos.h -= scroll_top;
					}
				}
			}
		}

		p.set_visible(true);
		p._trackbar[0].set_visible(false);
		p._trackbar[1].set_visible(false);
		p._trackbar[2].set_visible(false);
		p._trackbar[3].set_visible(false);

		p._start_begarea = this._grid._selectinfo.arearect.barea;
		p._start_endarea = this._grid._selectinfo.arearect.earea;

		if (this._idx == 0) {
			this._area = p._start_begarea;
		}
		else {
			this._area = p._start_endarea;
		}

		this._grid._track_mode = "areaselect";


		p._callback_start.call(this._grid, p._area_pos, this._idx);
	};

	_pGridSelectorButtonControl._on_movetrack = function (x, y) {
		var p = this._real_parent;

		var cur_scrolltop = this._grid._getScrollTop();
		var cur_scrollleft = this._grid._getScrollLeft();

		var scroll_top_gap = 0, scroll_left_gap = 0;

		if (p._start_scroll_top >= 0) {
			scroll_top_gap = p._start_scroll_top - cur_scrolltop;
		}
		if (p._start_scroll_left >= 0) {
			scroll_left_gap = p._start_scroll_left - cur_scrollleft;
		}

		var ctrl_row = this._grid._selectinfo.ctrlpoint.row;

		var bApply_scroll_top = true;
		if (this._grid._fixed_rowcnt > 0 && ctrl_row >= this._grid._fixed_startrow && ctrl_row <= this._grid._fixed_endrow) {
			bApply_scroll_top = false;
		}

		var l, t, w, h;
		if (this._idx == 0) {
			l = this._point.x + x;
			t = this._point.y + y;
			w = this._point.w - x + scroll_left_gap;
			h = this._point.h - y + (bApply_scroll_top ? scroll_top_gap : 0);
		}
		else if (this._idx == 1) {
			l = this._point.x + scroll_left_gap;
			t = this._point.y + (bApply_scroll_top ? scroll_top_gap : 0);
			w = this._point.w + x - scroll_left_gap;
			h = this._point.h + y - (bApply_scroll_top ? scroll_top_gap : 0);
		}
		else if (this._idx == 2) {
			l = this._point.x + x;
			t = this._point.y;
			w = this._point.w - x;
			h = this._point.h + y;
		}
		else if (this._idx == 3) {
			l = this._point.x;
			t = this._point.y + y;
			w = this._point.w + x;
			h = this._point.h - y;
		}

		var select_area = this._grid._selectinfo.area;
		if (this._grid._fixed_rowcnt > 0 && select_area.length) {
			var border = this._grid._getCurrentStyleBorder();
			var border_top = (border) ? parseInt(border.right._width, 10) : 0;

			var headheight = this._grid._getHeadHeight();
			var fixedheight = this._grid._fixed_height;
			var fixedbottom = headheight + fixedheight + border_top;

			var cur_area = select_area[select_area.length - 1];
			var cur_srow = cur_area.begrow;
			var cur_erow = cur_area.endrow;

			var ctrlpoint = this._grid._selectinfo.ctrlpoint;

			var fixederow = this._grid._fixed_endrow;
			var vscroll = this._grid._vscrollmng;

			if ((t + h) < fixedbottom) {
				p._track_reset_scroll = true;
			}

			if (cur_erow > fixederow) {
				p._track_up_scroll = true;
			}

			if (p._track_reset_scroll && cur_srow <= fixederow && cur_scrolltop > 0 && (t + h) >= fixedbottom) {
				vscroll.setPos(0);
				p._track_reset_scroll = false;
			}
			else if (p._track_up_scroll && ctrlpoint.row <= fixederow && cur_scrolltop > 0 && (t + h) <= (fixedbottom)) {
				vscroll.setPos(vscroll.pos - 1);
			}
			else if (ctrlpoint.row > fixederow && cur_scrolltop > 0 && t <= fixedbottom) {
				vscroll.setPos(vscroll.pos - 1);
			}
		}

		var type = p._setAreaPos(l, t, w, h, true, this._idx);
		p._adjust_scroll = false;

		if (type[0] != "" || type[1] != "") {
			var area = null;
			if (p._onlyarea) {
				area = p._curarea;
			}

			var p_l = p._area_pos.l;
			var p_t = p._area_pos.t;
			var p_w = p._area_pos.w;
			var p_h = p._area_pos.h;

			p._callback_scroll.call(this._grid, type, area);

			p._area_pos.l = p_l;
			p._area_pos.t = p_t;
			p._area_pos.w = p_w;
			p._area_pos.h = p_h;
		}




		p._callback.call(this._grid, p._area_pos, this._idx, true);
	};

	_pGridSelectorButtonControl._on_endtrack = function (x, y) {
		var p = this._real_parent;
		p._is_tracking = false;
		p._adjust_scroll = true;
		p.set_visible(false);
		p._trackbar[0].set_visible(true);
		p._trackbar[1].set_visible(true);
		p._start_begarea = this._grid._selectinfo.arearect.barea;
		p._start_endarea = this._grid._selectinfo.arearect.earea;

		if (this._idx == 0) {
			this._area = p._start_begarea;
		}
		else {
			this._area = p._start_endarea;
		}

		p._end_scroll_top = this._grid._getScrollTop();
		p._end_scroll_left = this._grid._getScrollLeft();
		p._pre_idx = this._idx;

		var select_area = this._grid._selectinfo.area;
		if (this._grid._fixed_rowcnt > 0 && select_area.length) {
			var cur_area = select_area[select_area.length - 1];
			var cur_erow = cur_area.endrow;

			var fixederow = this._grid._fixed_endrow;

			if (cur_erow > fixederow) {
				p._track_up_scroll = true;
			}
			else {
				p._track_up_scroll = false;
			}
		}

		this._grid._track_mode = "";

		this._grid._updateSelector();
	};

	delete _pGridSelectorButtonControl;

	nexacro._GridSelector = function (id, left, top, width, height, right, bottom, parent) {
		nexacro.Component.call(this, id, left, top, width, height, right, bottom, null, null, null, null, parent);
		this._is_subcontrol = true;

		this._is_simple_control = true;

		this._callback_start = null;
		this._callback = null;
		this._callback_scroll = null;
		this._trackbar = [];
		this._grid = parent;
		this._band = parent._bodyBand;
		this._area_pos = {
			l : 0, 
			t : 0, 
			w : 0, 
			h : 0, 
			empty : true
		};
		this._curarea = "";
		this._onlyarea = false;
		this._start_begarea = "";
		this._start_endarea = "";
		this._start_scroll_top = -1;
		this._start_scroll_left = -1;
		this._end_scroll_top = -1;
		this._end_scroll_left = -1;
		this._pre_idx = -1;
	};

	var _pGridSelector = nexacro._createPrototype(nexacro.Component, nexacro._GridSelector);
	nexacro._GridSelector.prototype = _pGridSelector;
	_pGridSelector._is_subcontrol = true;
	_pGridSelector._type_name = "GridSelectorControl";

	_pGridSelector._trackbar_size = 22;

	_pGridSelector.on_create_contents = function () {
	};

	_pGridSelector.on_created_contents = function () {
		if (this._trackbar[0]) {
			this._trackbar[0].on_created();
			this._trackbar[1].on_created();
			this._trackbar[2].on_created();
			this._trackbar[3].on_created();
		}
	};

	_pGridSelector.on_destroy_contents = function () {
		this._trackbar[0].destroy();
		this._trackbar[1].destroy();
		this._trackbar[0] = null;
		this._trackbar[1] = null;
		this._trackbar[2] = null;
		this._trackbar[3] = null;
		this._trackbar = null;
		this._band = null;
		this._grid = null;
	};

	_pGridSelector._createButton = function () {
		if (!this._trackbar[0]) {
			this._trackbar[0] = new nexacro._GridSelectorButtonControl("selectortrackbar1", 0, 0, 0, 0, null, null, this, this.parent, 0);
			this._trackbar[0].createComponent();
			this._trackbar[1] = new nexacro._GridSelectorButtonControl("selectortrackbar2", 0, 0, 0, 0, null, null, this, this.parent, 1);
			this._trackbar[1].createComponent();
			this._trackbar[2] = new nexacro._GridSelectorButtonControl("selectortrackbar3", 0, 0, 0, 0, null, null, this, this.parent, 2);
			this._trackbar[2].createComponent();
			this._trackbar[3] = new nexacro._GridSelectorButtonControl("selectortrackbar4", 0, 0, 0, 0, null, null, this, this.parent, 3);
			this._trackbar[3].createComponent();

			this._trackbar[0]._no_slide_scroll = true;
			this._trackbar[1]._no_slide_scroll = true;
			this._trackbar[2]._no_slide_scroll = true;
			this._trackbar[3]._no_slide_scroll = true;
			this._recalcarea();
		}
	};

	_pGridSelector._updateAll = function () {
	};

	_pGridSelector._recalcarea = function (mode) {
		if (!this._trackbar[0]) {
			return;
		}

		if (this._area_pos.empty) {
			this._trackbar[0].set_visible(false);
			this._trackbar[1].set_visible(false);
			this._trackbar[2].set_visible(false);
			this._trackbar[3].set_visible(false);
			return;
		}

		if (mode != "hscroll" && mode != "vscroll") {
			this.__showbutton(false);
		}

		var fullsize = this._trackbar_size;
		var halfsize = fullsize / 2;
		var grid = this._grid;
		var format = grid._curFormat;
		var leftwidth = format.leftWidth;
		var rightstart = grid._getClientWidth() - format.rightWidth;
		var hmin, hmax, vmin, vmax;
		var l, t, r, b;
		var adjust_top;

		vmin = this._band._adjust_top;
		vmax = this._band.getOffsetBottom();

		hmin = [];
		hmax = [];

		if (this._start_begarea == "left") {
			hmin[0] = 0;
			hmax[0] = leftwidth;
		}
		else if (this._start_begarea == "right") {
			hmin[0] = rightstart;
			hmax[0] = grid._getClientWidth();
		}
		else {
			hmin[0] = leftwidth;
			hmax[0] = rightstart;
		}

		if (this._start_endarea == "left") {
			hmin[1] = 0;
			hmax[1] = leftwidth;
		}
		else if (this._start_endarea == "right") {
			hmin[1] = rightstart;
			hmax[1] = grid._getClientWidth();
		}
		else {
			hmin[1] = leftwidth;
			hmax[1] = rightstart;
		}


		var fixedheight = this._grid._fixed_height;

		var fixed_srow = this._grid._fixed_startrow;
		var fixed_rowcnt = this._grid._fixed_rowcnt;
		var infixedrows = [false, false, false, false];
		var scroll_top = this._grid._scroll_top;

		if (fixed_rowcnt) {
			var area = this._grid._selectinfo.area;
			var srow, erow;
			if (area.length > 0) {
				srow = area[area.length - 1].begrow;
				erow = area[area.length - 1].endrow;

				if (srow <= (fixed_srow + fixed_rowcnt)) {
					infixedrows[0] = infixedrows[3] = true;
				}

				if (erow <= (fixed_srow + fixed_rowcnt)) {
					infixedrows[1] = infixedrows[2] = true;
				}
			}
		}

		adjust_top = infixedrows[0] ? scroll_top : 0;
		l = this._area_pos.l - halfsize;
		t = this._area_pos.t - halfsize + adjust_top;
		r = l + fullsize;
		b = t + fullsize;

		this._trackbar[0].move(l, t, fullsize, fullsize);

		var wgap = this._trackbar[0]._minibox_wgap;
		var hgap = this._trackbar[0]._minibox_hgap;

		var lastfocus = grid._find_lastFocused();

		if (lastfocus == grid) {
			if (r - wgap < hmin[0] || b - hgap < vmin || l + wgap > hmax[0] || t + hgap > vmax || t + hgap < fixedheight) {
				this._trackbar[0].visible = infixedrows[0] || false;
			}
			else {
				this._trackbar[0].visible = true;
			}
		}
		else {
			this._trackbar[0].visible = false;
		}

		adjust_top = infixedrows[1] ? scroll_top : 0;
		l = this._area_pos.l + this._area_pos.w - halfsize;
		t = this._area_pos.t + this._area_pos.h - halfsize + adjust_top;
		r = l + fullsize;
		b = t + fullsize;

		this._trackbar[1].move(l, t, fullsize, fullsize);

		if (lastfocus == grid) {
			if (r - wgap < hmin[1] || b - hgap < vmin || l + wgap > hmax[1] || t + hgap > vmax || t + hgap < fixedheight) {
				this._trackbar[1].visible = infixedrows[1] || false;
			}
			else {
				this._trackbar[1].visible = true;
			}
		}
		else {
			this._trackbar[1].visible = false;
		}

		adjust_top = infixedrows[2] ? scroll_top : 0;
		l = this._area_pos.l - halfsize;
		t = this._area_pos.t + this._area_pos.h - halfsize + adjust_top;
		r = l + fullsize;
		b = t + fullsize;

		this._trackbar[2].move(l, t, fullsize, fullsize);

		if (lastfocus == grid) {
			if (r - wgap < hmin[0] || b - hgap < vmin || l + wgap > hmax[0] || t + hgap > vmax || t + hgap < fixedheight) {
				this._trackbar[2].visible = false;
			}
		}

		adjust_top = infixedrows[3] ? scroll_top : 0;
		l = this._area_pos.l + this._area_pos.w - halfsize;
		t = this._area_pos.t - halfsize + adjust_top;
		r = l + fullsize;
		b = t + fullsize;

		this._trackbar[3].move(l, t, fullsize, fullsize);

		if (lastfocus == grid) {
			if (r - wgap < hmin[1] || b - hgap < vmin || l + wgap > hmax[1] || t + hgap > vmax || t + hgap < fixedheight) {
				this._trackbar[3].visible = false;
			}
		}

		this.__showbutton(true);
	};

	if (nexacro._OS == "Android" && (nexacro._Browser == "Safari" || nexacro._Browser == "MobileSafari")) {
		_pGridSelector.__showbutton = function (v) {
			if (this._trackbar[0]) {
				if (!v) {
					this._trackbar[0]._control_element.setElementVisible(false);
					this._trackbar[1]._control_element.setElementVisible(false);
					this._trackbar[2]._control_element.setElementVisible(false);
					this._trackbar[3]._control_element.setElementVisible(false);
				}
				else {
					nexacro._OnceCallbackTimer.callonce(this, function () {
						this._trackbar[0]._control_element.setElementVisible(this._trackbar[0].visible);
						this._trackbar[1]._control_element.setElementVisible(this._trackbar[1].visible);
					}, 10);
				}
			}
		};
	}
	else {
		_pGridSelector.__showbutton = function (v) {
			if (this._trackbar[0]) {
				if (!v) {
					this._trackbar[0]._control_element.setElementVisible(false);
					this._trackbar[1]._control_element.setElementVisible(false);
					this._trackbar[2]._control_element.setElementVisible(false);
					this._trackbar[3]._control_element.setElementVisible(false);
				}
				else {
					this._trackbar[0]._control_element.setElementVisible(this._trackbar[0].visible);
					this._trackbar[1]._control_element.setElementVisible(this._trackbar[1].visible);
				}
			}
		};
	}

	_pGridSelector._trackingHScroll = function (idx, left, right, bodystart, rightstart, scroll_left, scroll_max) {
		if (!this._adjust_scroll && (this._grid.scrolltype == "none" || this._grid.scrolltype == "vertical")) {
			return [0, 0];
		}

		return this._grid._trackingHScroll(idx, left, right, this._start_begarea, this._start_endarea, bodystart, rightstart, scroll_left, scroll_max);
	};

	_pGridSelector._setAreaPos = function (left, top, width, height, is_track, idx) {
		var retn = ["", ""];
		var grid = this._grid;
		this._curarea = grid._selectinfo.ctrlpoint.area;

		if (is_track) {
			var typeinfo = this._grid._getTrackType(this, left, top, width, height, idx, this._onlyarea);

			left = typeinfo.adjust_l;
			top = typeinfo.adjust_t;
			width = typeinfo.adjust_w;
			height = typeinfo.adjust_h;

			retn[0] = typeinfo.type[0];
			retn[1] = typeinfo.type[1];
		}

		var empty = (grid._selectinfo.area.length > 0) ? false : true;

		if (width <= 0) {
			width = 1;
		}
		if (height <= 0) {
			height = 1;
		}

		this._area_pos.l = left;
		this._area_pos.t = top;
		this._area_pos.w = width;
		this._area_pos.h = height;
		this._area_pos.area = this._curarea;
		this._area_pos.empty = empty;
		if (is_track) {
			this._area_pos.scrolltop = grid._getScrollTop();
		}
		return retn;
	};

	_pGridSelector.move = function (left, top, width, height, mode) {
		if (!this._is_tracking) {
			if (left > this._grid._getClientWidth()) {
				return;
			}

			this._start_begarea = this._grid._selectinfo.arearect.barea;
			this._start_endarea = this._grid._selectinfo.arearect.earea;
			this._setAreaPos(left, top, width, height);
			this._recalcarea(mode);
		}
		else {
			this._setAreaPos(left, top, width, height);
		}

		return nexacro.Component.prototype.move.call(this, left, top, width, height, undefined, undefined);
	};

	_pGridSelector._setCallbackFn = function (startfn, applyfn, scrollfn) {
		this._callback_start = startfn;
		this._callback = applyfn;
		this._callback_scroll = scrollfn;
	};

	_pGridSelector._initTrackInfo = function () {
		this._start_scroll_top = -1;
		this._start_scroll_left = -1;
		this._end_scroll_top = -1;
		this._end_scroll_left = -1;
		this._pre_idx = -1;
	};

	delete _pGridSelector;

	nexacro._OverlayControl = function (left, top, width, height, right, bottom, parent, org_left, org_top, org_width, org_height, use_ext_ctrl, id, use_event, is_left, is_headsumm) {
		nexacro.Component.call(this, ((id) ? id : "overlaycontrol"), left, top, width, height, right, bottom, null, null, null, null, parent);
		this._org_left = org_left;
		this._org_top = org_top;
		this._org_width = org_width;
		this._org_height = org_height;
		this._use_event = use_event;
		this._is_subcontrol = true;
		this._skip_mobile_tabfocus = true;
		this._is_left = is_left;
		this._is_headsumm = is_headsumm;

		if (!use_ext_ctrl) {
			this._ctrl = new nexacro.Static("ctrl", 0, 0, this._org_width, this._org_height, null, null, null, null, null, null, this);
		}
	};

	var _pOverlayControl = nexacro._createPrototype(nexacro.Component, nexacro._OverlayControl);
	nexacro._OverlayControl.prototype = _pOverlayControl;
	_pOverlayControl._is_subcontrol = true;
	_pOverlayControl._type_name = "OverlayControl";

	_pOverlayControl.on_create_contents = function () {
		nexacro.Component.prototype.on_create_contents.call(this);

		if (!this._use_event) {
			this._control_element.setElementPointerEvents("none");
		}

		this._ctrl.createComponent(true);

		var ctrl = this._ctrl;
		for (var attr in ctrl) {
			if (attr.indexOf("set_") >= 0) {
				var str = "this." + attr + " = function(v)\n";
				str += "{";
				str += "    this._ctrl." + attr + "(v);";
				str += "}";
				eval(str);
			}
		}
	};

	_pOverlayControl.on_created_contents = function () {
		nexacro.Component.prototype.on_created_contents.call(this);

		if (!this._use_event) {
			this._control_element.setElementPointerEvents("none");
		}

		this._ctrl.on_created();

		if (!this._use_event) {
			this._ctrl._control_element.setElementPointerEvents("none");
		}
	};

	_pOverlayControl.on_attach_contents_handle = function (win) {
		nexacro.Component.on_attach_contents_handle(this, win);
		this._ctrl.attachHandle(win);

		if (!this._use_event) {
			this._ctrl._control_element.setElementPointerEvents("none");
		}
	};

	_pOverlayControl.setControlElemPosition = function (left, top, width, height, fixed_area_scroll, autofit_col) {
		var grid = this.parent;
		var hpos = this._org_left - ((this._is_left) ? 0 : grid._getScrollLeft());
		var vpos = this._org_top - ((this._is_headsumm || fixed_area_scroll) ? 0 : grid._getScrollTop());
		var format = grid._curFormat;
		var leftWidth = (this._is_left) ? 0 : format.leftWidth;
		var paddtop = (this._padding) ? this._padding.top : 0;

		if (hpos < leftWidth) {
			this._ctrl.move(hpos - leftWidth, this._ctrl.top);
		}
		else {
			this._ctrl.move(0, this._ctrl.top);
		}

		if (vpos < 0) {
			this._ctrl.move(this._ctrl.left, vpos + paddtop);
		}
		else {
			this._ctrl.move(this._ctrl.left, 0);
		}

		if (autofit_col) {
			this._ctrl.set_width(width);
		}

		this._control_element.setElementPosition(left, top);
		this._control_element.setElementSize(width, height);
	};

	_pOverlayControl._on_last_lbuttonup = function () {
		this.parent._on_last_lbuttonup();
	};

	_pOverlayControl._on_last_keyup = function () {
		this.parent._on_last_keyup();
	};

	_pOverlayControl.move = nexacro._emptyFn;

	delete _pOverlayControl;

	nexacro._GridSelectionControl = function (left, top, width, height, right, bottom, parent, id) {
		nexacro.Component.call(this, ((id) ? id : "selection"), left, top, width, height, right, bottom, null, null, null, null, parent);
	};

	var _GridSelectionControl = nexacro._createPrototype(nexacro.Component, nexacro._GridSelectionControl);
	nexacro._GridSelectionControl.prototype = _GridSelectionControl;
	_GridSelectionControl._is_subcontrol = true;
	_GridSelectionControl._is_nc_control = true;
	_GridSelectionControl._is_simple_control = true;
	_GridSelectionControl._type_name = "GridSelectionControl";

	_GridSelectionControl.on_create_contents = function () {
		nexacro.Component.prototype.on_create_contents.call(this);

		if (!this._use_event) {
			this._control_element.setElementPointerEvents("none");
		}
	};

	_GridSelectionControl.on_created_contents = function () {
		nexacro.Component.prototype.on_created_contents.call(this);

		if (!this._use_event) {
			this._control_element.setElementPointerEvents("none");
		}
	};

	delete _GridSelectionControl;

	nexacro._GridResizerControl = function (id, left, top, width, height, right, bottom, parent) {
		nexacro.Component.call(this, id, left, top, width, height, right, bottom, null, null, null, null, parent);
		this._is_simple_control = true;
		this._is_track = true;

		this._callback = null;
		this._index = -1;
		this._direction = "";
		this._tracksize = -1;
		this._is_range = false;
		this._movedPos = 0;
		this._is_tracking = false;
		this._no_slide_scroll = true;
	};

	var _pGridResizer = nexacro._createPrototype(nexacro.Component, nexacro._GridResizerControl);
	nexacro._GridResizerControl.prototype = _pGridResizer;
	_pGridResizer._is_subcontrol = true;
	_pGridResizer._type_name = "GridControlResizerControl";

	_pGridResizer.on_create_contents = function () {
	};

	_pGridResizer.on_created_contents = function () {
		this.set_visible(false);
		this._on_apply_tracksize();

		this.set_background("gray");

		var direction = this._direction;
		var resize_cursor;

		if (direction == "horizon") {
			resize_cursor = nexacro.CursorObject("col-resize");
		}
		else {
			resize_cursor = nexacro.CursorObject("row-resize");
		}

		this._control_element.setElementCursor(resize_cursor);
	};

	_pGridResizer._setCallbackFn = function (fn) {
		this._callback = fn;
	};

	_pGridResizer._setIndex = function (idx) {
		this._index = idx;
	};

	_pGridResizer._setDirection = function (dir) {
		if (this._direction != dir) {
			this._direction = dir;
			this._on_apply_direction();
		}
	};

	_pGridResizer._on_apply_direction = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			this._on_apply_tracksize();

			var direction = this._direction;
			var resize_cursor;

			if (direction == "horizon") {
				resize_cursor = nexacro.CursorObject("col-resize");
			}
			else {
				resize_cursor = nexacro.CursorObject("row-resize");
			}

			this.on_apply_cursor(resize_cursor);
		}
	};

	_pGridResizer._setTracksize = function (size) {
		if (this._tracksize != size) {
			this._tracksize = size;
			this._on_apply_tracksize();
		}
	};

	_pGridResizer._on_apply_tracksize = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			var size = this._tracksize;
			var direction = this._direction;
			if (direction == "horizon") {
				this.resize(1, size);
			}
			else if (direction == "vertical") {
				this.resize(size, 1);
			}

			var remove_l = false, remove_t = false, remove_r = false, remove_b = false;
			if (direction == "horizon") {
				remove_t = true;
				remove_r = true;
				remove_b = true;
			}
			else {
				remove_l = true;
				remove_r = true;
				remove_b = true;
			}

			control_elem.setElementBorderNone(remove_l, remove_t, remove_r, remove_b);
		}
	};

	_pGridResizer._moveLeftTo = function (left) {
		this.left = left = left || 0;
		this.move(left, this.top);
	};

	_pGridResizer._moveTopTo = function (top) {
		this.top = top = top || 0;
		this.move(this.left, top);
	};

	_pGridResizer._on_starttrack = function () {
		if (!this._is_alive) {
			return;
		}
		this._movedPos = 0;
		this._is_tracking = true;
	};

	_pGridResizer._on_movetrack = function (x, y) {
		if (!this._is_alive) {
			return;
		}

		var parent = this.parent;
		if (parent.ondrag && parent.ondrag.defaultprevented == true) {
			return;
		}
		if (parent.ondragmove && parent.ondragmove.defaultprevented == true) {
			return;
		}

		if (!this.visible) {
			this.set_visible(true);
		}
		if (this._direction == "horizon") {
			var _x = x - this._movedPos;
			this._moveLeftTo(this.left + _x);
			this._movedPos = x;
		}
		else if (this._direction == "vertical") {
			var _y = y - this._movedPos;
			this._moveTopTo(this.top + _y);
			this._movedPos = y;
		}
	};

	_pGridResizer._on_endtrack = function (x, y) {
		if (!this._is_alive) {
			return;
		}

		var control_elem = this.getElement();
		if (control_elem) {
			nexacro._initDragInfo();

			if (this.visible) {
				this.set_visible(false);
			}

			var parent = this.parent;
			if ((parent.ondrag && parent.ondrag.defaultprevented == true) || (parent.ondragmove && parent.ondragmove.defaultprevented == true)) {
			}
			else {
				if (this._callback && this._movedPos != 0) {
					if (this._direction == "horizon") {
						this._callback.call(this.parent, x, this._index);
					}
					else if (this._direction == "vertical") {
						this._callback.call(this.parent, y, this._index);
					}
				}
			}
		}
		this._is_tracking = false;
	};

	_pGridResizer._applyElementVisible = function (v) {
		if (this._control_element) {
			this._control_element.setElementDisplay(v ? "" : "none");
		}
	};

	delete _pGridResizer;

	nexacro._CellTreeItemControl = function (id, left, top, width, height, right, bottom, parent) {
		nexacro._CellTreeControl.call(this, id, left, top, width, height, right, bottom, parent);
		this._grid = this._view;
		this._checkboxObj = "_GridCellControlCheckbox";
	};

	var _pGridTree = nexacro._createPrototype(nexacro._CellTreeControl, nexacro._CellTreeItemControl);
	nexacro._CellTreeItemControl.prototype = _pGridTree;

	_pGridTree.on_destroy_contents = function () {
		nexacro._CellTreeControl.prototype.on_destroy_contents.call(this);
		this._grid = null;
	};

	_pGridTree._on_bubble_mouseenter = function (elem, from_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope, meta_key) {
		var call = true;
		if (bubble_scope) {
			call = this._cellobj._common_mouseenter();
		}

		if (call) {
			nexacro.Component.prototype._on_bubble_mouseenter.call(this, elem, from_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope, meta_key);
		}

		return true;
	};

	_pGridTree._on_bubble_mouseleave = function (elem, to_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope, meta_key) {
		var call = true;
		if (bubble_scope) {
			call = this._cellobj._common_mouseleave();
		}

		if (call) {
			nexacro.Component.prototype._on_bubble_mouseleave.call(this, elem, to_comp, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope, meta_key);
		}

		return true;
	};

	_pGridTree._on_last_lbuttonup = function () {
		this._cellobj._on_last_lbuttonup();
	};

	_pGridTree._on_last_keyup = function () {
		this._cellobj._on_last_keyup();
	};

	_pGridTree._common_fire_lbuttondown = function (canvasX, canvasY, refercomp) {
		if (this._isEditTypeTree() && this._btnimg_ctrl && this._grid.treeusebutton != "noclick") {
			var check = false;

			if (this._btnimg_ctrl.visible) {
				if ((refercomp instanceof nexacro._TreeItemIconControl) && this._is_elem_area(this._btnimg_ctrl._control_element, canvasX, canvasY)) {
					check = true;
				}
			}
			else {
				if (this._is_elem_area(this._btnimg_ctrl._control_element, canvasX, canvasY)) {
					check = true;
				}
			}

			if (check) {
				var grid = this._grid;
				var cellobj = this._cellobj;
				cellobj._tree_lbuttondown = true;

				grid._toggleTreeState(cellobj._rowidx, true);

				if (this._is_alive) {
					cellobj._tree_lbuttondown = false;
				}
			}
		}
	};

	_pGridTree.on_fire_user_ontouchstart = function (touchinfos, changedtouchinfos) {
		var touchinfo = nexacro._getFirstTouchInfo(changedtouchinfos);
		if (touchinfo) {
			this._common_fire_lbuttondown(touchinfo.canvasx, touchinfo.canvasy);
		}
	};

	_pGridTree.on_fire_user_onlbuttondown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		this._common_fire_lbuttondown(canvasX, canvasY, from_refer_comp);
	};

	_pGridTree._common_fire_lbuttonup = function () {
		if (this._cellobj._tree_lbuttondown) {
			this._cellobj._tree_lbuttondown = false;
		}
	};

	_pGridTree.on_fire_user_ontouchend = function () {
		this._common_fire_lbuttonup();
	};

	_pGridTree.on_fire_user_onlbuttonup = function () {
		this._common_fire_lbuttonup();
	};

	_pGridTree._on_treecheckboxclick = function (obj, e) {
		var grid = this._grid;

		if (!this._is_alive || grid.readonly) {
			return;
		}

		if (obj == this._chk_ctrl) {
			var cellobj = this._cellobj;
			var cellinfo = this._cellinfo;
			var rowidx = grid._getDataRow(cellobj._rowidx);
			var disprowidx = cellobj._getDisplayRowIdx();

			if (cellinfo.treecheck._bindtype == 1) {
				var checked = grid._treeChecked[rowidx];
				var colid = cellinfo.treecheck._bindexpr;
				var v = (checked == 0) ? 1 : 0;
				grid._binddataset.setColumn(rowidx, colid, v);
			}
			else {
				if (grid._toggleTreeChecked(cellobj._rowidx)) {
					grid._refreshBodyRow(disprowidx);
				}
			}
		}
	};

	_pGridTree.on_fire_onclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key, clickitem) {
		if (!this._is_alive) {
			return;
		}

		var obj = from_refer_comp;
		while (obj) {
			if (obj._type_name == "CheckBoxControl") {
				break;
			}

			obj = obj.parent;
		}

		if (this._isEditTypeTree()) {
			this._on_treecheckboxclick(obj);
		}

		return this._cellobj.on_fire_onclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key, clickitem);
	};

	_pGridTree._is_elem_area = function (elem, point_x, point_y) {
		var scale = this._getCumulativeZoomFactor() / 100.0;

		var left = elem.left;
		var top = elem.top;
		var width = elem.width *  scale;
		var height = elem.height *  scale;

		if (point_x >= left && point_x <= (left + width)) {
			return (point_y >= top && point_y <= (top + height));
		}
		else {
			return false;
		}
	};

	_pGridTree._lineUpdate = function (rowidx, level) {
		if (this._grid.treeuseline != this._treeuseline) {
			this._createLines();

			if (this._rightline_ctrl) {
				this._rightline_ctrl.set_visible(this._grid.treeuseline);
			}

			if (this._upline_ctrl) {
				this._upline_ctrl.set_visible(this._grid.treeuseline);
			}

			if (this._downline_ctrl) {
				this._downline_ctrl.set_visible(this._grid.treeuseline);
			}

			this._treeuseline = this._grid.treeuseline;
		}

		var grid = this._grid;
		var startlevel = this._cellinfo._getTreeStartLevel(rowidx);
		var bExistNextNode = (grid._hasSameNextNode[rowidx]) ? grid._hasSameNextNode[rowidx][1] : false;
		var bRootNode = (startlevel >= level) ? true : false;

		this._createLeftLine(rowidx);
		var ctrl;

		if (this._rightline_ctrl) {
			ctrl = this._rightline_ctrl;
			ctrl._set_line(false, true);
		}
		if (this._upline_ctrl) {
			ctrl = this._upline_ctrl;
			ctrl._set_line(!bRootNode, false);
		}

		if (this._downline_ctrl && !bRootNode && bExistNextNode) {
			ctrl = this._downline_ctrl;
			ctrl._set_line(true, false);
		}
		else if (this._downline_ctrl) {
			this._downline_ctrl.set_visible(false);
		}

		this._treeline_visible(!this._cellobj._hideInner);
	};

	_pGridTree._getRowParentLevel = function (p_level, startrow) {
		var level;
		var cellinfo = this._cellinfo;

		for (var i = startrow; i >= 0; i--) {
			level = cellinfo._getTreeLevel(i);

			if (level == p_level) {
				return i;
			}
			else if (level < p_level) {
				break;
			}
		}
		return -9;
	};

	_pGridTree.__isNextSameLevelInSameParent = function (parentlvl, startrow) {
		var rowcount = this._grid._rowcount;
		var cellinfo = this._cellinfo;
		var level;
		var parentrow = this._getRowParentLevel(parentlvl, startrow);

		if (parentrow >= 0) {
			var retn = this._grid._hasSameNextNode[parentrow];
			return retn[1];
		}
		else {
			for (var i = startrow; i < rowcount; i++) {
				level = cellinfo._getTreeLevel(i);
				if (level < parentlvl) {
					break;
				}
				else if (level == parentlvl) {
					return true;
				}
			}
		}
		return false;
	};

	_pGridTree._createLeftLine = function (rowidx) {
		var grid = this._grid;
		var i, n;
		if (!grid.treeuseline) {
			for (i = 0, n = this._leftline_ctrls.length; i < n; i++) {
				this._leftline_ctrls[i].destroy();
			}
			this._leftline_ctrls = [];

			return;
		}

		var level = this._cellinfo._getTreeLevel(rowidx);
		var parentlevel = level - 1;
		var bExistNextParentNode;

		i = 0;
		var leftlines = this._leftline_ctrls;

		while (grid._rootlevel < parentlevel) {
			bExistNextParentNode = this.__isNextSameLevelInSameParent(parentlevel, rowidx);

			if (bExistNextParentNode) {
				var parentheight = this._getLineHeight();
				var ctrl = leftlines[i];

				if (!ctrl) {
					ctrl = new nexacro._CellTreeLineControl("treeleftline", 0, 0, 1, parentheight, null, null, this.parent);
					ctrl.createComponent();
					this._leftline_ctrls[i] = ctrl;
				}
				else {
					ctrl.set_height(parentheight);
				}

				ctrl._set_line(true, false);
				ctrl._depth = parentlevel;
				i++;
			}
			parentlevel--;
		}

		while (leftlines.length > i) {
			leftlines[leftlines.length - 1].destroy();
			leftlines.splice(leftlines.length - 1, 1);
		}
	};

	delete _pGridTree;

	nexacro._GridCoverControl = function (parent, grid) {
		nexacro.Component.call(this, "gridblur", 0, 0, 0, 0, 0, 0, null, null, null, null, parent);
		this._grid = grid;
	};

	var _pGridCoverControl = nexacro._createPrototype(nexacro.Component, nexacro._GridCoverControl);
	nexacro._GridCoverControl.prototype = _pGridCoverControl;
	_pGridCoverControl._type_name = "GridCoverControl";

	_pGridCoverControl._is_subcontrol = true;
	_pGridCoverControl._is_scrollable = false;
	_pGridCoverControl._is_nc_control = true;
	_pGridCoverControl._is_simple_control = true;

	_pGridCoverControl.on_create_contents = function () {
		this.set_visible(false);
		this.set_background("#ffffff");
		this.set_opacity("0.8");
	};

	_pGridCoverControl.on_destroy_contents = function () {
		this._grid = null;
	};

	_pGridCoverControl._coverOn = function (srow, erow) {
		var grid = this._grid;
		var rowsize = grid._bodyrowheight;
		var body = this.parent;
		var top = body._getClientTop() + grid._fixed_height;
		var left = body._getClientLeft();
		var width = body._getClientWidth();
		var height = body._getClientHeight();
		var tpos = srow *  rowsize;

		if (erow != undefined) {
			var epos = erow *  rowsize;
			height = epos - tpos;
		}
		else {
			height -= tpos;
		}

		this.move(left, top + tpos, width, height);

		this.set_visible(true);
	};

	_pGridCoverControl._coverOff = function () {
		if (this.visible) {
			this.set_visible(false);
			return true;
		}
		return false;
	};

	delete _pGridCoverControl;

	nexacro._GridRowControl = function (parent, left, top, width, height, rowidx, temp, floating, right, bottom) {
		nexacro.Component.call(this, "gridrow_" + rowidx, left, top, width, height, right, bottom, null, null, null, null, parent);


		this._grid = parent.parent;
		this._band = parent;
		this._cells = [];
		this._rowidx = rowidx;
		this._row_sizes = [];
		this._row_tops = [];
		this._row_bottoms = [];
		this._format_rows = [];
		this._format_cols = [];
		this._format_cells = [];
		this._noupdate_remain_cells = [];
		this.accessibilityrole = "none";
		this._fixed = false;
		this._is_temp = !!temp;
		this._use_translate_move = true;
		this._use_translate_scroll = true;
		this._is_nc_control = this._floating = !!floating;
		this._colsubrowscells = [];
	};

	var _pGridRow = nexacro._createPrototype(nexacro.Component, nexacro._GridRowControl);
	nexacro._GridRowControl.prototype = _pGridRow;

	_pGridRow._is_subcontrol = true;
	_pGridRow._is_scrollable = false;

	_pGridRow._type_name = "GridRowControl";
	_pGridRow._makeCssRefInfo = function () {
		return (this._grid._makeCssRefInfoCtrl(this));
	};

	_pGridRow.createCommand = function () {
		var str = "";
		if (!this._is_loading) {
			var enable = this._isEnable();

			if ((this._real_enable == null && enable == false) || (this._real_enable && this._real_enable != enable)) {
				this._real_enable = enable;
				this._changeStatus("disabled", !enable);
				this.on_apply_prop_enable(enable);
			}
			else {
				this._real_enable = enable;
			}

			var control_elem = this._control_element;
			if (control_elem) {
				str = control_elem.createCommandStart();

				str += control_elem.createCommandAreaStart("left");
				str += this.on_create_contents_command("left");
				str += control_elem.createCommandAreaEnd("left");

				str += control_elem.createCommandAreaStart("body");
				str += this.on_create_contents_command("body");
				str += control_elem.createCommandAreaEnd("body");

				str += control_elem.createCommandAreaStart("right");
				str += this.on_create_contents_command("right");
				str += control_elem.createCommandAreaEnd("right");

				str += control_elem.createCommandEnd();
			}

			if (!this._is_subcontrol) {
				this._registerHotkey();
			}

			this._is_create_commandstr = true;
		}
		return str;
	};

	_pGridRow.on_create_contents = function () {
		if (this._is_temp) {
			return;
		}

		this._init(this._grid._curFormat);

		if (this._grid._async_create) {
			this._createCellComponents_async();
		}
		else {
			this._createCellComponents();
		}
	};

	_pGridRow.on_created_contents = function (win) {
		if (this._is_temp) {
			return;
		}

		var format = this._grid._curFormat;
		var scroll_width = format.bodyWidth;
		var control_elem = this._control_element;

		control_elem._setContainerMaxWidth(scroll_width);
		control_elem.setElementHScrollPos(this._grid._getScrollLeft());

		if (control_elem.setInnerHTML && this._grid._use_innerhtml && !this._is_nc_control) {
			this._is_create_commandstr = true;
			var str = "";

			str += control_elem.createCommandAreaStart("left");
			str += this._createCellElements(0, true, "left");
			str += control_elem.createCommandAreaEnd("left");

			str += control_elem.createCommandAreaStart("body");
			str += this._createCellElements(0, true, "body");
			str += control_elem.createCommandAreaEnd("body");

			str += control_elem.createCommandAreaStart("right");
			str += this._createCellElements(0, true, "right");
			str += control_elem.createCommandAreaEnd("right");

			control_elem.setInnerHTML(str);
			this.attachHandle(win);
		}
		else {
			if (this._grid._async_create) {
				this._createCellElements_async(false);
			}
			else {
				this._createCellElements(0, false);
			}
		}
	};

	_pGridRow.on_create_contents_command = function (area) {
		if (this._grid._async_create) {
			return "";
		}

		var str = this._createCellElements(0, true, area);

		return str;
	};

	_pGridRow.on_attach_contents_handle = function (win) {
		if (this._grid._async_create) {
			nexacro._GridRowControl.prototype.on_created_contents.call(this);
			return;
		}

		var cells = this._cells;
		var cells_len = cells.length;

		if (cells_len == 0) {
			return;
		}

		var subcells, subcells_len;


		for (var i = 0; i < cells_len; i++) {
			cells[i].attachHandle(win);

			subcells = cells[i].subcells;
			subcells_len = subcells.length;

			for (var j = 0; j < subcells_len; j++) {
				subcells[j].attachHandle(win);
			}
		}
	};

	_pGridRow.on_destroy_contents = function () {
		var cells = this._cells, cells_len = cells.length;

		for (var i = 0; i < cells_len; i++) {
			cells[i].destroy();
		}

		this._colsubrowscells = this._grid = this._cells = this._format = this._band = this._cells = this._row_sizes = this._row_tops = this._row_bottoms = this._format_rows = this._format_cols = this._format_cells = this._noupdate_remain_cells = this._hide_hscroll_cells = this._hide_hscroll_cell_indexes = null;
	};

	_pGridRow._on_changeStatus = function (status, value) {
		if (!this._is_alive) {
			return;
		}

		this._oldstatus = this._status;
		var applystatus = "enabled";

		this._statusmap[status] = value;
		var statusmap = this._statusmap;
		if (statusmap.disabled) {
			applystatus = "disabled";
		}

		this._status = this.on_changeStatus(status, value, applystatus, this._status, this._userstatus);

		if (this._oldstatus != this._status) {
			this._apply_status(this._oldstatus, this._status, this._olduserstatus, this._userstatus, undefined, status, value);
		}

		if (nexacro._enableaccessibility) {
			this._setAccessibilityStatFlag(this._status, this._userstatus);
		}
	};

	_pGridRow._last_scroll_left = 0;
	_pGridRow._callback_func_onscroll = function (left, top) {
		if (this._last_scroll_left != left) {
			var delta = this._last_scroll_left - left;
			this._last_scroll_left = left;

			var dir = (delta > 0 ? -1 : (delta < 0 ? 1 : 0));

			var updaterange = this._getColScrollInfo(dir);
			this._grid._adjustGridScrollCols_callback_onscroll_after(dir, left, updaterange[0], updaterange[1]);
		}
	};

	_pGridRow._callback_func_onscroll_node_acivate = function (scrollleft) {
		this._grid._hscrollmng.setPos(scrollleft);
	};

	_pGridRow.on_change_containerRect = function (width, height) {
		var grid = this._grid;

		if (grid._rtl && nexacro._Browser == "Runtime") {
			var cells = this._cells;
			var cellslen = cells.length;
			var i = 0;

			for (; i < cellslen; i++) {
				cells[i]._update_position(true);
			}
		}
		nexacro.Component.prototype.on_change_containerRect.call(this, width, height);
	};

	_pGridRow.on_getIDCSSSelector = function () {
		return "row";
	};

	_pGridRow.on_fire_onclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		if (this._is_temp) {
			return;
		}

		if (nexacro._isTouchInteraction) {
			this._grid._hideEditor();
		}

		if (this._band) {
			this._band.on_fire_onclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);
		}
	};

	_pGridRow.on_create_control_element = function (parent_elem) {
		var control_elem;
		var gap = 0;

		if (this._floating) {
			var border = this._border;
			gap = this._grid._floating_gap + ((border) ? border.left._width : 0);
		}

		if (!this._is_temp) {
			control_elem = new nexacro.GridRowControlElement(parent_elem, gap);
		}
		else {
			control_elem = new nexacro.ControlElement(parent_elem);
		}

		var format = this._grid._curFormat;

		control_elem.setLinkedControl(this);
		control_elem._left_width = format.leftWidth;
		control_elem._right_width = format.rightWidth;

		if (!this._is_temp) {
			control_elem._setContainerMaxWidth(this._band._scrollWidth);
		}

		this._control_element = control_elem;
		return control_elem;
	};

	_pGridRow._apply_setfocus = function (evt_name, self_flag) {
		if (self_flag) {
			nexacro.Component.prototype._apply_setfocus.call(this, evt_name);
		}
	};

	_pGridRow._getAccessibilityLabel = function () {
		var label = "";
		var grid = this._grid;
		if (grid._isSelectRowType()) {
			var cellLabel = "";
			var cells = this._cells;

			for (var i = 0, n = cells.length; i < n; i++) {
				cellLabel = cells[i]._getAccessibilityLabel(true);
				if (label) {
					if (cellLabel) {
						label += " " + cellLabel;
					}
				}
				else {
					label = cellLabel;
				}
			}
		}
		return label;
	};

	_pGridRow._init = function (format) {
		var grid = this._grid, control_elem = this._control_element;

		control_elem.setArea(format.leftWidth, format.rightWidth);

		if (this._rowidx == -1) {
			this._format_rows = format._headrows;
			this._format_cells = format._headcells;
		}
		else if (this._rowidx == -2) {
			this._format_rows = format._summrows;
			this._format_cells = format._summcells;
		}
		else {
			this._format_rows = format._bodyrows;
			this._format_cells = format._bodycells;
		}

		this._format_cols = format._cols;

		if (!this._format_cols) {
			this._format_cols = [];
		}

		if (!this._format_rows) {
			this._format_rows = [];
		}

		if (!this._format_cells) {
			this._format_cells = [];
		}

		var rowSizeListSub, datarow = 0;

		if (this._rowidx == -1) {
			rowSizeListSub = grid._rowHeadListSub;
		}
		else if (this._rowidx == -2) {
			rowSizeListSub = grid._rowSummListSub;
		}
		else {
			datarow = grid._getDataRow(this._rowidx);
			rowSizeListSub = grid._rowSizeListSub;
		}

		var rows = this._format_rows, rows_len = rows.length, size = 0, top = 0, i;

		this._row_tops = [];
		this._row_sizes = [];
		this._row_bottoms = [];

		if (datarow >= 0) {
			var start = datarow *  rows_len;

			if (!this._floating) {
				for (i = 0; i < rows_len; i++) {
					this._row_tops.push(top);
					size = (rowSizeListSub.length > 0) ? rowSizeListSub[start + i] : rows[i].size;
					this._row_sizes.push(size);
					top += size;
					this._row_bottoms.push(top);
				}
			}
			else {
				for (i = 0; i < rows_len; i++) {
					this._row_tops.push(top);
					size = rows[i].size;
					this._row_sizes.push(size);
					top += size;
					this._row_bottoms.push(top);
				}
			}
		}
		else {
			for (i = 0; i < rows_len; i++) {
				this._row_tops.push(top);
				size = (rowSizeListSub.length > 0) ? rowSizeListSub[i] : rows[i].size;
				this._row_sizes.push(size);
				top += size;
				this._row_bottoms.push(top);
			}
		}
	};

	_pGridRow._setTempCursor = function (cursor) {
		var cells = this._cells;

		for (var i = 0, n = cells.length; i < n; i++) {
			if (cursor) {
				cells[i]._temp_cursor = cells[i].cursor;
			}
			else {
				cursor = cells[i]._temp_cursor;
			}

			cells[i]._updateCursor(cursor);
		}
		this._updateCursor(cursor);
	};

	_pGridRow._on_last_lbuttonup = function () {
		this.parent._on_last_lbuttonup();
	};

	_pGridRow._on_last_keyup = function () {
		this.parent._on_last_keyup();
	};

	_pGridRow._updateAll = function (status, is_remain_cell, onlycontents, for_select, startcol, removecell) {
		var grid = this._grid;
		var cells = is_remain_cell ? this._noupdate_remain_cells : this._cells;
		var cells_len = cells.length;
		var subcells;
		var subcells_len;
		var exprbindcells = for_select ? grid._getUseBindExprProp("body") : [];
		var datarow = grid._getDataRow(this._rowidx);
		var cell, cellinfo;
		var selected;

		if (!exprbindcells) {
			exprbindcells = [];
		}

		this._noupdate_remain_cells = [];

		var i, j;
		var k = 0;

		for (i = 0; i < cells_len; i++) {
			cell = cells[i];
			cellinfo = cell._refinfo;

			if (removecell && removecell == cell) {
				continue;
			}

			if (startcol) {
				if ((cellinfo._col + cellinfo._colspan - 1) < startcol) {
					continue;
				}
			}

			if (cellinfo._area != "body" || (cell._is_created && cell._isUpdateArea())) {
				if (grid._isSelectRowType()) {
					if (selected == undefined) {
						selected = grid._isSelectedCell(cell._cellidx, datarow);
					}
				}
				else {
					selected = grid._isSelectedCell(cell._cellidx, datarow);
				}

				subcells = cell.subcells;
				subcells_len = subcells.length;

				for (j = 0; j < subcells_len; j++) {
					subcells[j].selected = selected;
				}

				if (cell.selected != selected) {
					cell.selected = selected;
					cell._updateAll(status, false);

					if (exprbindcells[k] == cell._cellidx) {
						k++;
					}
				}
				else {
					if (for_select) {
						if (exprbindcells[k] == cell._cellidx) {
							cell._updateAll(status, onlycontents);
							k++;
						}
					}
					else {
						cell._updateAll(status, onlycontents);
					}
				}
			}
			else {
				if (grid._is_performance_scroll && for_select && cellinfo._area == "body") {
					if (grid._isSelectRowType()) {
						if (selected == undefined) {
							selected = grid._isSelectedCell(cell._cellidx, datarow);
						}
					}
					else {
						selected = grid._isSelectedCell(cell._cellidx, datarow);
					}
					cell.selected = selected;
					cell._changeUserStatus("selected", cell._isSelectedColor());
				}

				this._noupdate_remain_cells.push(cell);
			}
		}
	};

	_pGridRow._getAreaRect = function (area) {
		var rect = {
			left : 0, 
			top : 0, 
			width : 0, 
			height : 0
		};
		if (!this._is_alive) {
			return rect;
		}
		var format = this._grid._curFormat;

		rect.top = this._getClientTop();
		rect.height = this._getClientHeight();

		if (area == "left") {
			rect.left = this._getClientLeft();
			rect.width = format.leftWidth;
		}
		else if (area == "right") {
			rect.left = this._getClientWidth() - format.rightWidth;
			rect.width = format.rightWidth;
		}
		else {
			rect.left = format.leftWidth;
			rect.width = this._getClientWidth() - format.leftWidth - format.rightWidth;
		}
		return rect;
	};

	_pGridRow._changeRow = function (row, init) {
		if (this._rowidx == row) {
			return false;
		}

		this._rowidx = row;

		if (init) {
			this._init(this._grid._curFormat);
		}

		return true;
	};

	_pGridRow._hideArea = function () {
		if (this._fixed) {
			return "";
		}

		var band = this._band;
		var grid = this._grid;
		var scrolltop = grid._getScrollTop();

		var t = this._adjust_top;
		var h = this._adjust_height;
		var b = t + h;

		t -= scrolltop;
		b -= scrolltop;

		var bandrc = grid._getAvailableRect(band);
		var border = band._getCurrentStyleBorder();

		b -= border ? border.top._width : 0;
		b -= border ? border.bottom._width : 0;

		if (b <= 0) {
			return "top";
		}
		else if (t >= bandrc.bottom) {
			return "bottom";
		}

		return "";
	};

	_pGridRow._showfull = function (clickcell) {
		if (!this._fixed) {
			var band = this._band;
			var grid = this._grid;
			var scrolltop = grid._getScrollTop();

			var t = this._adjust_top;
			var h = this._adjust_height;
			var b = t + h;

			t -= scrolltop;
			b -= scrolltop;

			var vscroll = grid._vscrollmng;
			var bandrc = grid._getAvailableRect(band);
			var border = band._getCurrentStyleBorder();

			b -= border ? border.top._width : 0;
			b -= border ? border.bottom._width : 0;

			if (vscroll) {
				if (h < bandrc.height) {
					if (t < 0) {
						vscroll.setRowPos(grid._toprowpos[0]);
					}
					else if (b > bandrc.bottom) {
						vscroll.setRowPos(grid._toprowpos[0] + 1);
					}
				}
			}
		}

		if (clickcell && clickcell._is_alive) {
			clickcell._showfull(false);
		}
	};

	_pGridRow._createCellElements_async = function (bCommandMode) {
		nexacro._OnceCallbackTimer.callonce(this, function () {
			this._createCellElements(0, bCommandMode);
		});
	};

	_pGridRow._createCellComponents = function () {
		var _cols = this._format_cols, _rows = this._format_rows, _cells = this._format_cells, _row_tops = this._row_tops, _row_bottoms = this._row_bottoms, cellcnt = (_cells) ? _cells.length : 0, _cellinfo, top = 0, left, width, height, cellitem, id, _subcells, _subcellsLen, col, row, subcellitem, selected, _subcellinfo, grid = this._grid, datarow = grid._getDataRow(this._rowidx);

		var subrow_len = _rows.length;
		var subrowscells = this._colsubrowscells = [];

		for (var i = 0; i < subrow_len; i++) {
			subrowscells.push([]);
		}

		for (i = 0; i < cellcnt; i++) {
			_cellinfo = _cells[i];

			left = _cols[_cellinfo._col].left;
			top = _row_tops[_cellinfo._row];
			width = _cols[_cellinfo._col + _cellinfo._colspan - 1].right - left;
			height = _row_bottoms[_cellinfo._row + _cellinfo._rowspan - 1] - top;

			if (grid._isSelectRowType()) {
				if (selected == undefined) {
					selected = grid._isSelectedCell(_cellinfo._cellidx, datarow);
				}
			}
			else {
				selected = grid._isSelectedCell(_cellinfo._cellidx, datarow);
			}

			id = "cell_" + this._rowidx + "_" + _cellinfo._cellidx;
			cellitem = new nexacro._GridCellControl(id, left, top, width, height, null, null, this, _cellinfo, this._rowidx, _cellinfo._cellidx);
			cellitem.selected = selected;

			subrowscells[_cellinfo._row][_cellinfo._col] = cellitem;

			var step = 0;
			switch (_cellinfo._area) {
				case "left":
					step = 1;
					break;
				case "right":
					step = 2;
					break;
			}

			cellitem.set_positionstep(step);
			cellitem.createComponent(true);

			if (cellitem._text_elem) {
				cellitem._text_elem.setElementPointerEvents();
			}

			this._cells[i] = cellitem;

			_subcells = _cellinfo._subcells;
			_subcellsLen = _subcells.length;

			for (var j = 0; j < _subcellsLen; j++) {
				_subcellinfo = _subcells[j];
				col = _cellinfo._col + _subcellinfo._col;
				row = _cellinfo._row + _subcellinfo._row;

				left = _cols[col].left;
				top = _row_tops[row];
				width = _cols[col + _subcellinfo._colspan - 1].right - left;
				height = _row_bottoms[row + _subcellinfo._rowspan - 1] - top;

				left -= _cols[_cellinfo._col].left;
				top -= _row_tops[_cellinfo._row];
				id = "subcell_" + this._rowidx + "_" + _cellinfo._cellidx + "_" + _subcellinfo._cellidx;
				subcellitem = new nexacro._GridSubCellControl(id, left, top, width, height, null, null, cellitem, _subcellinfo, this._rowidx, _subcellinfo._cellidx);
				subcellitem.selected = selected;
				subcellitem.parentcell = cellitem;
				subcellitem.createComponent(true);
				cellitem.subcells[j] = subcellitem;
			}
		}
	};

	_pGridRow._createCellElements = function (startcol, bCommandMode, area, se_info, dir) {
		var cells = this._cells;
		var cells_len = cells.length;

		if (cells_len == 0) {
			return "";
		}

		var str = "";
		var grid = this._grid, update = false, datarow = grid._getDataRow(this._rowidx), selected, cellinfo;

		if (this._rowidx < 0 || grid._is_created == true) {
			update = true;
		}

		var use_recycle_colscroll = grid._use_recycle_colscroll;
		var scol, ecol;

		if (se_info) {
			scol = se_info.s;
			ecol = se_info.e;
		}

		var vstart, vend;
		var hlstart = -1, hlend = -1, hrstart = -1;
		var i = (dir < 0) ? i = cells_len - 1 : 0;

		if (!dir) {
			this._clearHideColumnCell();
		}

		var show_start = false;

		while (true) {
			cellinfo = cells[i]._refinfo;

			while (true) {
				if (startcol) {
					if ((cellinfo._col + cellinfo._colspan - 1) < startcol) {
						break;
					}
				}

				if (area && cellinfo._area != area) {
					break;
				}


				if (cellinfo._area == "body") {
					if (this._rowidx >= 0 && scol != undefined) {
						if (((cellinfo._col + cellinfo._colspan - 1) < scol) || (cellinfo._col > ecol)) {
							break;
						}
					}

					if (cells[i]._isUpdateArea() || this._floating) {
						if (grid._isSelectRowType()) {
							if (selected == undefined) {
								selected = grid._isSelectedCell(cells[i]._cellidx, datarow);
							}
						}
						else {
							selected = grid._isSelectedCell(cells[i]._cellidx, datarow);
						}

						show_start = true;

						if (vstart == undefined) {
							vstart = cellinfo._col;
						}

						vend = cellinfo._col;

						if (cells[i]._is_created) {
							if (cells[i]._refresh_display == true) {
								if (update) {
									cells[i].selected = selected;
									cells[i]._updateAll();
								}

								cells[i]._refresh_display = false;
							}
						}
						else {
							if (bCommandMode) {
								if (update) {
									cells[i].selected = selected;
									cells[i]._updateAll();
								}
								str += cells[i].createCommand();
							}
							else if (use_recycle_colscroll) {
								var currcell = cells[i];
								var prevcell = this._popHideColumnCell(cellinfo);

								if (prevcell) {
									cells[prevcell._cellidx] = currcell;
									prevcell._changeCell(currcell);
									cells[i] = prevcell;

									if (update) {
										cells[i].selected = selected;
										cells[i]._updateAll();
									}
								}
								else {
									if (update) {
										cells[i].selected = selected;
										cells[i]._updateAll();
									}
									cells[i].on_created();
								}
							}
							else {
								if (update) {
									cells[i].selected = selected;
									cells[i]._updateAll();
								}
								cells[i].on_created();
							}
						}
					}
					else {
						if (hlstart == -1) {
							hlstart = cellinfo._col;
						}

						if (vstart == undefined) {
							if (hlstart == -1) {
								hlstart = cellinfo._col;
							}

							hlend = cellinfo._col + cellinfo._colspan - 1;
						}
						else {
							if (hlstart == -1) {
								hrstart = cellinfo._col;
							}
						}

						if (cells[i]._is_created) {
							if (use_recycle_colscroll && !show_start) {
								this._pushHideColumnCell(cells[i]);
							}

							if (cells[i]._refresh_display == false) {
								cells[i]._refresh_display = true;
							}
						}
					}
				}
				else {
					if (cells[i]._is_created) {
						break;
					}

					if (update) {
						cells[i]._updateAll();
					}
					if (bCommandMode) {
						str += cells[i].createCommand();
					}
					else {
						cells[i].on_created();
					}
				}
				break;
			}

			if (dir < 0) {
				i--;
				if (i >= 0) {
					continue;
				}
			}
			else {
				i++;
				if (i < cells_len) {
					continue;
				}
			}
			break;
		}

		if (se_info) {
			se_info.s = vstart;
			se_info.e = vend;
		}

		this._update_scol = vstart;
		this._update_ecol = vend;

		this._hidel_ecol = hlend;
		this._hider_scol = hrstart;

		return str;
	};

	_pGridRow._createsHorzCells = function (col, ani, dir, show_start) {
		var cellsrows = this._colsubrowscells;
		var cellsrows_len = cellsrows.length;

		if (cellsrows_len == 0) {
			return false;
		}

		var grid = this._grid, datarow = grid._getDataRow(this._rowidx), selected, cellctrl, cellinfo;
		var cells = this._cells;

		var use_recycle_colscroll = grid._use_recycle_colscroll;

		for (var i = 0; i < cellsrows_len; i++) {
			cellctrl = cellsrows[i][col];

			if (!cellctrl) {
				continue;
			}

			cellinfo = cellctrl._refinfo;

			if (cellinfo._area == "body") {
				if (cellctrl._isUpdateArea()) {
					if (grid._isSelectRowType()) {
						if (selected == undefined) {
							selected = grid._isSelectedCell(cellctrl._cellidx, datarow);
						}
					}
					else {
						selected = grid._isSelectedCell(cellctrl._cellidx, datarow);
					}

					show_start = true;
					cellctrl.selected = selected;
					cellctrl._updateAll();

					if (cellctrl._is_created) {
						if (ani) {
							if (cellctrl._refresh_display == true) {
								cellctrl._refresh_display = false;
								cellctrl._setDisplay(true);
							}
						}
					}
					else {
						cellctrl.selected = selected;
						cellctrl._updateAll();
						cellctrl.on_created();
					}
				}
				else {
					if (cellctrl._is_created) {
						if (use_recycle_colscroll && !show_start) {
							this._pushHideColumnCell(cellctrl);
						}

						if (ani) {
							if (cellctrl._refresh_display == false) {
								cellctrl._setDisplay(false);
								cellctrl._refresh_display = true;
							}
						}
					}
				}
			}
			else {
				cellctrl._updateAll();

				if (!cellctrl._is_created) {
					cellctrl.on_created();
				}
			}
		}
		return show_start;
	};

	_pGridRow._hideHorzCells = function (col) {
		if (col < 0) {
			return;
		}

		var grid = this._grid;
		var cellsrows = this._colsubrowscells;
		var cellsrows_len = cellsrows.length;

		if (cellsrows_len == 0) {
			return false;
		}

		var datarow = grid._getDataRow(this._rowidx), cellctrl;

		for (var i = 0; i < cellsrows_len; i++) {
			cellctrl = cellsrows[i][col];

			if (!cellctrl) {
				continue;
			}

			if (cellctrl._is_created) {
				this._pushHideColumnCell(cellctrl);
			}
		}
	};

	_pGridRow._scrollHorzCells = function (col) {
		var cellsrows = this._colsubrowscells;
		var cellsrows_len = cellsrows.length;

		if (cellsrows_len == 0) {
			return "";
		}

		var grid = this._grid, datarow = grid._getDataRow(this._rowidx), selected, cellctrl, cellinfo;

		var updated = false;
		for (var i = 0; i < cellsrows_len; i++) {
			cellctrl = cellsrows[i][col];

			if (!cellctrl) {
				continue;
			}

			cellinfo = cellctrl._refinfo;

			if (cellinfo._area == "body") {
				if (grid._isSelectRowType()) {
					if (selected == undefined) {
						selected = grid._isSelectedCell(cellctrl._cellidx, datarow);
					}
				}
				else {
					selected = grid._isSelectedCell(cellctrl._cellidx, datarow);
				}

				cellctrl.selected = selected;
				cellctrl._updateAll();

				if (!cellctrl._is_created) {
					cellctrl.on_created();
					updated = true;
				}
				else if (cellctrl._refresh_display == true) {
					cellctrl._refresh_display = false;
				}
			}
			else {
				cellctrl._updateAll();

				if (!cellctrl._is_created) {
					cellctrl.on_created();
					updated = true;
				}
			}
		}

		return updated;
	};

	_pGridRow._isUseHideCell = function (cellinfo, datarow) {
		if (cellinfo._colspan > 1 || cellinfo._rowspan > 1) {
			return false;
		}

		if (cellinfo.expandshow._value != "hide") {
			return false;
		}

		return true;
	};

	_pGridRow._clearHideColumnCell = function () {
		this._hide_hscroll_cells = null;
		this._hide_hscroll_cell_indexes = null;
	};

	_pGridRow._pushHideColumnCell = function (cell) {
		var cellinfo = cell._refinfo;
		var grid = this._grid;
		var datarow = grid._getDataRow(this._rowidx);

		if (!this._isUseHideCell(cellinfo, datarow)) {
			return false;
		}

		if (cell._editor) {
			return false;
		}

		var displaytype = cellinfo._getDisplaytype(datarow);
		var hide_h_cells = this._hide_hscroll_cells;
		var hide_h_cell_indexes = this._hide_hscroll_cell_indexes;
		var h_cells, h_idxes;

		if (!hide_h_cells) {
			hide_h_cells = this._hide_hscroll_cells = {
			};
			hide_h_cell_indexes = this._hide_hscroll_cell_indexes = {
			};
		}
		if (!hide_h_cells[displaytype]) {
			hide_h_cells[displaytype] = [];
			hide_h_cell_indexes[displaytype] = new Array(this._cells.length);
		}

		h_cells = hide_h_cells[displaytype];
		h_idxes = hide_h_cell_indexes[displaytype];

		if (!h_idxes[cell._cellidx]) {
			h_idxes[cell._cellidx] = true;
			h_cells.push(cell);
		}
		return true;
	};

	_pGridRow._popHideColumnCell = function (cellinfo) {
		var grid = this._grid;
		var datarow = grid._getDataRow(this._rowidx);

		if (!this._isUseHideCell(cellinfo, datarow)) {
			return null;
		}

		var displaytype = cellinfo._getDisplaytype(datarow);
		var hide_h_cells = this._hide_hscroll_cells;
		var hide_h_cell_indexes = this._hide_hscroll_cell_indexes;
		var cell = null;
		var h_cells, h_idxes;

		if (hide_h_cells && hide_h_cells[displaytype]) {
			h_cells = hide_h_cells[displaytype];
			h_idxes = hide_h_cell_indexes[displaytype];

			while (cell = h_cells.pop()) {
				h_idxes[cell._cellidx] = undefined;

				break;
			}
		}
		return cell;
	};

	_pGridRow._update_scol;
	_pGridRow._update_ecol;
	_pGridRow._hidel_ecol;
	_pGridRow._hider_scol;

	_pGridRow._getUpdateColRange = function (dir) {
		var cells = this._cells;
		var cells_len = cells.length;
		var cellinfo, vstart, vend, hstart, hend;
		var vs = false, hs = false;

		var prev_hidel = this._hidel_ecol;
		var prev_hider = this._hider_scol;

		for (var i = 0; i < cells_len; i++) {
			cellinfo = cells[i]._refinfo;

			if (cellinfo._area != "body") {
				continue;
			}

			var update_area = cells[i]._isUpdateArea();
			if (update_area == false) {
				if (!vs) {
					this._hidel_ecol = cellinfo._col;
				}
				else {
					if (!hs) {
						hs = true;
						this._hider_scol = cellinfo._col;
					}
				}
			}
			else {
				vs = true;
			}

			if (dir > 0) {
				if (cellinfo._col <= this._update_ecol) {
					continue;
				}
			}
			if (dir < 0) {
				if (cellinfo._col >= this._update_scol) {
					continue;
				}
			}

			if (cellinfo._area == "body" && update_area) {
				if (vstart == undefined) {
					vstart = cellinfo._col;
				}

				vend = cellinfo._col + cellinfo._colspan - 1;
			}
			else if (vstart != undefined) {
				break;
			}
		}

		if (dir > 0) {
			if (vstart == undefined) {
				vstart = this._update_ecol;
			}
			if (vend == undefined) {
				vend = vstart;
			}

			hstart = prev_hidel;
			hend = this._hidel_ecol;
		}
		else if (dir < 0) {
			if (vend == undefined) {
				vend = this._update_scol;
			}
			if (vstart == undefined) {
				vstart = vend;
			}

			hstart = this._hider_scol;
			hend = prev_hider;
		}
		else {
			if (vstart == undefined) {
				vstart = this._update_scol;
			}
			if (vend == undefined) {
				vend = this._update_ecol;
			}

			this._hide_scol = this._hide_ecol = undefined;
			hstart = -1;
			hend = -1;
		}

		this._update_scol = vstart;
		this._update_ecol = vend;

		return [[vstart, vend], [hstart, hend]];
	};

	_pGridRow._getColScrollInfo = function (dir) {
		var elem = this.getElement();
		var update_left = elem.scroll_left;
		var update_right = update_left + this._grid._adjust_width;

		var cells = this._cells;
		var cells_len = cells.length;
		var cellinfo;
		var start, end;

		for (var i = 0; i < cells_len; i++) {
			cellinfo = cells[i]._refinfo;

			if (update_left <= cells[i].getOffsetRight() && update_right >= cells[i]._adjust_left) {
				start = (start != undefined ? Math.min(start, cellinfo._col) : cellinfo._col);

				if (cellinfo._area == "body") {
					var col = cellinfo._col + cellinfo._colspan - 1;
					end = (end != undefined ? Math.max(end, col) : col);
				}
				else {
					end = (end != undefined ? Math.max(end, cellinfo._col) : cellinfo._col);
				}
			}
		}

		return [start | 0, end | 0];
	};

	_pGridRow._adjustCellDisplay = function (startcol, endcol) {
		var cellsrows = this._colsubrowscells;
		var cellsrows_len = cellsrows.length;

		var cells = this._cells;
		var cells_len = cells.length;
		var cellinfo, cellctrl;

		for (var i = 0; i < cells_len; i++) {
			for (var j = 0; j < cellsrows_len; j++) {
				cellctrl = cellsrows[j][i];

				if (!cellctrl) {
					continue;
				}

				cellinfo = cellctrl._refinfo;

				if (cellinfo._area == "body") {
					if (cellctrl._is_created && (cellinfo._col < startcol || cellinfo._col > endcol)) {
						if (cellctrl._refresh_display == false) {
							cellctrl._refresh_display = true;
						}
					}
				}
			}
		}
	};

	_pGridRow._createCellComponents_async = function () {
		nexacro._OnceCallbackTimer.callonce(this, function () {
			this._createCellComponents();
		});
	};

	_pGridRow._resetCellsSize = function (format, startcol) {
		var cols = this._format_cols, cols_len = cols ? cols.length : 0, cells, cells_len, cell, cellinfo, subcells, subcells_len, subcell, subcellinfo, left, width, top, height, subcol, subrow;

		this._control_element.setArea(format.leftWidth, format.rightWidth);

		cells = this._cells;
		cells_len = cells.length;

		var _row_tops = this._row_tops, _row_bottoms = this._row_bottoms;

		for (var i = 0; i < cells_len; i++) {
			cell = cells[i];
			cellinfo = cell._refinfo;

			if (startcol) {
				if ((cellinfo._col + cellinfo._colspan - 1) < startcol) {
					continue;
				}
			}

			if (cellinfo._col >= cols_len) {
				continue;
			}

			left = cols[cellinfo._col].left;
			top = _row_tops[cellinfo._row];
			width = cols[cellinfo._col + cellinfo._colspan - 1].right - left;
			height = _row_bottoms[cellinfo._row + cellinfo._rowspan - 1] - top;

			cell.move(left, top, width, height);
			var expand_ctrl = cell._expandCtrl;
			if (expand_ctrl) {
				var border = cell._getCurrentStyleBorder();
				var padding = cell._getCurrentStylePadding();

				left = width - expand_ctrl.width - ((border) ? border.right._width : 0) - ((padding) ? padding.right : 0);
				expand_ctrl.set_left(left);
			}

			subcells = cell.subcells;
			subcells_len = subcells.length;

			for (var j = 0; j < subcells_len; j++) {
				subcell = subcells[j];
				subcellinfo = subcell._refinfo;

				subcol = cellinfo._col + subcellinfo._col;
				subrow = cellinfo._row + subcellinfo._row;

				left = cols[subcol].left;
				top = _row_tops[subrow];
				width = cols[subcol + subcellinfo._colspan - 1].right - left;
				height = _row_bottoms[subrow + subcellinfo._rowspan - 1] - top;

				left -= cols[cellinfo._col].left;
				top -= _row_tops[cellinfo._row];

				subcell.move(left, top, width, height);
				expand_ctrl = subcell._expandCtrl;
				if (expand_ctrl) {
					left = width - expand_ctrl.width;
					top = expand_ctrl.top;
					width = expand_ctrl.width;
					height = expand_ctrl.height;

					expand_ctrl.move(left, top, width, height);
				}
			}
		}
	};

	_pGridRow._isEnable = function () {
		if (this._grid) {
			return this._grid._enable;
		}

		return true;
	};

	_pGridRow._get_cells = function () {
		return this._cells;
	};

	delete _pGridRow;

	nexacro._GridMatrixManager = function (grid, band) {
		this._width = 0;
		this._height = 0;
		this._grid = grid;
		this._isBody = band._isBody;
		this._rows = [];
		this._band = band;
		this._fixed_rows = [];
	};

	var _pGridMatrixManager = nexacro._createPrototype(nexacro.Object, nexacro._GridMatrixManager);
	nexacro._GridMatrixManager.prototype = _pGridMatrixManager;

	_pGridMatrixManager._is_subcontrol = true;

	_pGridMatrixManager.destroy = function () {
		this._deleteAllRow();
		this._grid = this._band = this._rows = this._fixed_rows = null;
	};

	_pGridMatrixManager._init = function () {
		this._deleteAllRow();
	};

	_pGridMatrixManager._getBodyRowTopPos = function (rowidx) {
		if (rowidx < 0) {
			return 0;
		}

		var grid = this._grid, top = 0;
		var rowcnt, i;

		if (grid._fixed_endrow >= 0 && rowidx >= grid._fixed_startrow && rowidx <= grid._fixed_endrow) {
			if (grid._is_variable_bodyrowsize == false) {
				top = grid._bodyrowheight *  (rowidx - grid._fixed_startrow);
			}
			else {
				rowcnt = grid._fixed_rowcnt;

				for (i = 0; i < rowcnt; i++) {
					if (grid._fixed_startrow + i == rowidx) {
						break;
					}

					top += grid._getRowSize(grid._fixed_startrow + i);
				}
			}
		}
		else if (rowidx < grid._fixed_startrow) {
			rowcnt = grid._getGridRowCount();

			for (i = 0; i < rowcnt; i++) {
				if (i == grid._fixed_startrow) {
					break;
				}
				top += grid._getRowSize(i);
			}
			top = -top;
		}
		else {
			if (grid._is_variable_bodyrowsize == false) {
				top = grid._bodyrowheight *  rowidx;
			}
			else {
				rowcnt = grid._getGridRowCount();

				for (i = 0; i < rowcnt; i++) {
					if (i == rowidx) {
						break;
					}

					top += grid._getRowSize(i);
				}
			}

			top -= grid._fixedrow_height;
		}
		return top;
	};

	_pGridMatrixManager._getAllRows = function () {
		var rows;

		if (this._isBody && this._fixed_rows.length) {
			rows = [];
			rows = rows.concat(this._fixed_rows);
			rows = rows.concat(this._rows);
		}
		else {
			rows = this._rows;
		}
		return rows;
	};

	_pGridMatrixManager._getPhysicalRow = function (rows, rowidx) {
		var length = rows.length;

		for (var i = 0; i < length; i++) {
			if (rows[i]._rowidx == rowidx) {
				return i;
			}
		}
		return null;
	};

	_pGridMatrixManager._adjustTreeDisplay = function (rowidx, collapse) {
		var update_rows = [], grid = this._grid, band = this._band, rows = this._rows, rows_len = rows.length, toprow = 0, update_row_phidx = this._getPhysicalRow(this._rows, rowidx), update_row = rows[update_row_phidx], sub = false, i;

		if (!update_row) {
			update_row = rows[0];
			update_row_phidx = 0;
		}

		if (update_row) {
			if (collapse) {
				for (i = rows_len - 1; i >= update_row_phidx; i--) {
					if (update_row._rowidx < rows[i]._rowidx) {
						this._subtractRow();
						sub = true;
					}
					else {
						update_rows[0] = rows[i];
					}
				}
			}
			else {
				for (i = update_row_phidx; i < rows_len; i++) {
					if (update_row_phidx == i) {
						update_rows[0] = rows[i];
					}
					else {
						this._subtractRow();
						sub = true;
					}
				}
			}
		}

		if (sub) {
			grid._setHscrollElement();
			grid._absolutelyResetScrollPos(true);
			grid._control_element.setElementHScrollPos(grid._scroll_left);
			grid._absolutelyResetScrollPos(false);
		}

		var add = this._adjustRowsDisplay();

		rows_len = rows.length;
		band._update_rows = update_rows;

		if (rows_len) {
			toprow = rows[0]._rowidx;
		}

		for (i = 0; i < rows_len; i++) {
			rows[i]._rowidx = toprow + i;
		}


		var _vposold = (grid._vscrollmng) ? grid._vscrollmng._pos : 0;

		var change = grid._resetColSizeList();
		if (change || add) {
			this._adjustColsDisplay(true);

			if (grid._is_variable_bodyrowsize) {
				band._clearScrollDisplayRows();
			}
		}
		else {
			grid._resetScrollMax();
		}

		var _vposnew = (grid._vscrollmng) ? grid._vscrollmng._pos : 0;

		var vlimit = grid._control_element.vscroll_limit;

		if (_vposnew < 0) {
			_vposnew = 0;
		}
		else if (_vposnew > vlimit) {
			_vposnew = vlimit;
		}

		if (_vposold != _vposnew) {
			grid._toprowpos = grid._getScreenTopRowPos(_vposnew);
			grid._bottomrowpos = grid._getScreenBottomRowPos(_vposnew);
		}

		band._on_refresh_rows();

		return change;
	};

	_pGridMatrixManager._adjustRowsDisplay = function (reset_bandsize, is_scrolling) {
		var grid = this._grid, add = false, sub = false, rows = this._rows, rows_len = rows.length, addcnt, i, n, size, top;
		var rowitem, l, t, w, h, gridrowcnt;

		if (this._isBody) {
			if (reset_bandsize) {
				gridrowcnt = grid._getGridRowCount();
				for (i = 0; i < rows.length; i++) {
					rowitem = rows[i];

					if (rowitem._rowidx >= gridrowcnt) {
						rowitem.destroy();
						rows[i] = null;
						rows.splice(i, 1);
						i--;
						sub = true;
					}
					else {
						l = rowitem._adjust_left;
						t = this._getBodyRowTopPos(rowitem._rowidx);
						w = this._band._getClientWidth();
						h = grid._getRowSize(rowitem._rowidx);
						rows[i].move(l, t, w, h);
					}
				}
				rows_len = rows.length;

				var frows = this._fixed_rows;

				for (i = 0, n = frows.length; i < n; i++) {
					rowitem = frows[i];
					l = rowitem._adjust_left;
					t = this._getBodyRowTopPos(rowitem._rowidx);
					w = this._band._getClientWidth();
					h = grid._getRowSize(rowitem._rowidx);
					frows[i].move(l, t, w, h);
				}
			}


			if (grid._fixed_endrow >= 0 && this._fixed_rows.length == 0) {
				var sfixrow = grid._fixed_startrow;
				var efixrow = grid._fixed_endrow;
				top = 0;

				for (i = sfixrow; i <= efixrow; i++) {
					size = grid._getRowSize(i);
					if (size < 0) {
						break;
					}

					this._addRow(top, size, i, false, true);
					top += size;
				}
			}


			grid._resetDisplayInfo(reset_bandsize);
			var dispcnt = 0;

			if (grid._disprowcnt > 0) {
				addcnt = (grid._disprowcnt % 2) ? 1 : 2;
				dispcnt = grid._disprowcnt + addcnt;
			}
			var rowcnt = grid._getGridRowCount();
			var variable_size = grid._is_variable_bodyrowsize;

			if (dispcnt < 0) {
				dispcnt = 0;
			}

			if (rowcnt < rows_len) {
				for (i = rows_len - 1; i >= rowcnt; i--) {
					this._subtractRow();
					sub = true;
				}
				rows_len = rows.length;
			}

			if (dispcnt < rows_len) {
				if (rows_len % 2 == 0) {
					for (i = rows_len - 1; i >= dispcnt; i--) {
						if (!variable_size) {
							this._subtractRow();
							sub = true;
						}
					}
				}
			}
			else if (dispcnt > rows_len) {
				var toprow = 0, lastrow = rowcnt - 1;

				if (rows_len > 0) {
					toprow = rows[0]._rowidx;
				}
				else {
					toprow = grid._toprowpos[0];
				}

				var backrow = toprow;
				var newrow, back = false;

				for (i = rows_len; i < dispcnt; i++) {
					if (rowcnt <= i) {
						break;
					}

					newrow = toprow + i;

					if (lastrow < newrow) {
						newrow = --backrow;
						back = true;
					}

					top = this._getBodyRowTopPos(newrow);
					size = grid._getRowSize(newrow);

					if (newrow <= lastrow && newrow >= grid._getFixRowCnt() && size > 0) {
						this._addRow(top, size, newrow, is_scrolling);
						add = true;
					}
				}
				if (back && add) {
					rows.sort(function (a, b) {
						return a._rowidx - b._rowidx;
					});
				}
			}

			rows_len = rows.length;

			if (grid.fillareatype != "none" && dispcnt > rows_len) {
				top = 0;
				size = this._band._datarowsheight;

				if (rows_len) {
					top = rows[rows_len - 1].getOffsetBottom();
				}

				for (i = rows_len; i < dispcnt; i++) {
					this._addRow(top, size, i, is_scrolling);
					top += size;
					add = true;
				}
			}

			if (rows.length > 0) {
				grid._begrowpos = rows[0]._rowidx;
				grid._endrowpos = rows[rows.length - 1]._rowidx;
			}
			else {
				grid._begrowpos = 0;
				grid._endrowpos = 0;
			}
		}
		else {
			if (reset_bandsize) {
				for (i = 0; i < rows.length; i++) {
					rowitem = rows[i];

					l = rowitem._adjust_left;
					t = rowitem._adjust_top;
					w = this._band._getClientWidth();
					h = this._band._getClientHeight();
					rowitem.move(l, t, w, h);
				}
			}

			if (rows_len == 0) {
				if (this._band.id == "head") {
					size = grid._getRowSize(-1);
					this._addRow(0, size, -1);
					add = true;
				}
				else if (this._band.id == "summary") {
					size = grid._getRowSize(-2);
					this._addRow(0, size, -2);
					add = true;
				}
			}
		}

		if (add || sub || rows.length == 0) {
			grid._setHscrollElement();
			grid._absolutelyResetScrollPos(true);
			grid._control_element.setElementHScrollPos(grid._scroll_left);
			grid._absolutelyResetScrollPos(false);

			if (grid._is_variable_bodyrowsize) {
				this._band._clearScrollDisplayRows();
			}
		}

		return add;
	};

	_pGridMatrixManager._adjustColsDisplay = function (reset_colsize, scrolling, startcol, dir) {
		if (!scrolling) {
			this._grid._resetScrollMax();
		}

		var rows = this._getAllRows(), rows_len = rows.length;
		var i;

		if (reset_colsize) {
			var format = this._grid._curFormat;

			for (i = 0; i < rows_len; i++) {
				rows[i]._init(format);
				rows[i].set_width(rows[i].parent._getClientWidth());
				rows[i]._resetCellsSize(format, startcol);

				if (!scrolling) {
					rows[i]._updateAll(null, false, undefined, undefined, startcol);
				}

				rows[i]._createCellElements(startcol, undefined, undefined, undefined, dir);
			}
		}
		else {
			for (i = 0; i < rows_len; i++) {
				if (!scrolling) {
					rows[i]._updateAll(null, true, undefined, undefined, startcol);
				}

				rows[i]._createCellElements(startcol, undefined, undefined, undefined, dir);
			}
		}
	};

	_pGridMatrixManager._adjustColsScrollEnd = function (startcol, endcol) {
		var rows = this._getAllRows(), rows_len = rows.length;

		for (var rowidx = 0; rowidx < rows_len; rowidx++) {
			rows[rowidx]._adjustCellDisplay(startcol, endcol);
		}
	};

	_pGridMatrixManager._adjustColsDisplay2 = function (dir) {
		var rows = this._getAllRows(), show_col_range, hide_range, rows_len = rows.length;

		var grid = this._grid;
		var perfscroll = grid._is_performance_scroll;

		for (var i = 0; i < rows_len; i++) {
			if (!show_col_range) {
				var range = rows[i]._getUpdateColRange(dir);
				show_col_range = range[0];
				hide_range = range[1];
			}

			var j;
			var show_start;

			if (dir < 0) {
				show_start = false;
				for (j = show_col_range[1]; j >= show_col_range[0]; j--) {
					show_start = rows[i]._createsHorzCells(j, perfscroll, dir, show_start);
				}
			}
			else {
				show_start = false;
				for (j = show_col_range[0]; j <= show_col_range[1]; j++) {
					show_start = rows[i]._createsHorzCells(j, perfscroll, dir, show_start);
				}
			}
		}
	};

	_pGridMatrixManager._adjustColsScroll = function (dir, startcol, endcol, framecnt) {
		var rows = this._getAllRows(), rows_len = rows.length;

		var updated = false;
		var colidx;
		var rowidx;

		if (dir < 0) {
			for (colidx = endcol; colidx >= startcol; colidx--) {
				for (rowidx = 0; rowidx < rows_len; rowidx++) {
					updated |= rows[rowidx]._scrollHorzCells(colidx);
				}
				if (updated) {
					framecnt--;
				}
				if (framecnt == 0) {
					return colidx;
				}
				updated = false;
			}
		}
		else if (dir > 0) {
			for (colidx = startcol; colidx <= endcol; colidx++) {
				for (rowidx = 0; rowidx < rows_len; rowidx++) {
					updated |= rows[rowidx]._scrollHorzCells(colidx);
				}
				if (updated) {
					framecnt--;
				}
				if (framecnt == 0) {
					return colidx;
				}
				updated = false;
			}
		}
		return endcol;
	};

	_pGridMatrixManager._addRow = function (top, height, rowidx, is_scrolling, is_fixed) {
		var rect = this._grid._getAvailableRect(this._band), row = new nexacro._GridRowControl(this._band, rect.left, top, rect.width, height, rowidx);

		row._fixed = !!is_fixed;
		row.createComponent();

		if (!is_scrolling) {
			this._band._create_rows.push(row);
		}

		if (is_fixed) {
			this._fixed_rows.push(row);
		}
		else {
			this._rows.push(row);
		}
	};

	_pGridMatrixManager._subtractRow = function () {
		if (this._rows.length > 0) {
			var rowidx = this._rows.length - 1, row = this._rows[rowidx], create_rows = this._band._create_rows, create_rows_len = create_rows.length;

			for (var i = 0; i < create_rows_len; i++) {
				if (create_rows[i] == row) {
					create_rows.splice(i, 1);
					break;
				}
			}
			row.destroy();
			this._rows.splice(rowidx, 1);
		}
	};

	_pGridMatrixManager._deleteAllRow = function () {
		var rows = this._rows;

		for (var i = 0, n = rows.length; i < n; i++) {
			rows[i].destroy();
		}

		var fixed_rows = this._fixed_rows;

		for (i = 0, n = fixed_rows.length; i < n; i++) {
			fixed_rows[i].destroy();
		}

		var create_rows = this._band._create_rows;

		for (i = 0, n = create_rows.length; i < n; i++) {
			create_rows[i].destroy();
		}

		this._band._create_rows = [];
		this._rows = [];
		this._fixed_rows = [];
		this._grid._setHscrollElement();
		this._grid._is_over_scroll = 0;
		this._grid._destroyResizer();
	};

	_pGridMatrixManager._isShowScreenRow = function (row, scroll_top, client_height) {
		if (row._rowidx < 0) {
			return true;
		}

		var visible_top = scroll_top, visible_bottom = visible_top + client_height;

		if (visible_top < row.getOffsetBottom() && visible_bottom > row._adjust_top) {
			return true;
		}

		return false;
	};

	_pGridMatrixManager._getScrollRowsInfo = function (vpos, each, scrollrows) {
		var grid = this._grid, rows = this._rows, rows_len = rows.length, lastPosition = grid._last_scroll_top;

		var update_info = scrollrows || {
		};

		var _prev_toprowpos = grid._toprowpos;
		var _prev_bottomrowpos = grid._bottomrowpos;
		var _prev_dir = update_info.dir;
		var display_rows;
		var i, n;

		update_info.timestamp = (performance ? performance.now() : (new Date()));
		update_info.starttime = update_info.timestamp;
		update_info.scrollmode = each;
		update_info.framecnt = (each ? each : rows_len);
		update_info.skipped = 0;
		update_info.toprow = grid._getScreenTopRowPos(vpos);
		update_info.bottomrow = grid._getScreenBottomRowPos(vpos);
		update_info.bottomrowex = [update_info.bottomrow, 0];
		update_info.usehidden = true;

		if (!update_info.display_rows) {
			update_info.display_rows = display_rows = [];

			for (i = 0, n = rows_len; i < n; i++) {
				display_rows.push(rows[i]);
			}

			if (grid._is_variable_bodyrowsize) {
				display_rows.sort(function (a, b) {
					return a._rowidx - b._rowidx;
				});
			}
		}
		else {
			display_rows = update_info.display_rows;
		}

		var toprowpos, bottomrowpos;
		var updaterow;
		var display_cnt;
		var out_cnt;

		if (vpos > lastPosition) {
			toprowpos = update_info.toprow[0];
			bottomrowpos = update_info.bottomrow;

			update_info.dir = 1;

			update_info.curidx = 0;

			if (bottomrowpos < 0) {
				update_info.bottomrowex = grid._getScreenBottomRowPosEx(vpos);
			}

			updaterow = Math.max(_prev_bottomrowpos + 1, toprowpos);

			if (updaterow > toprowpos) {
				if (_prev_dir < 0 && bottomrowpos > 0) {
					display_cnt = (bottomrowpos - toprowpos + 1);
					for (i = 0, n = (rows_len - display_cnt); i < n; i++) {
						display_rows.push(display_rows.shift());
					}
				}

				out_cnt = (toprowpos - _prev_toprowpos[0]);

				for (i = 0, n = out_cnt; i < n; i++) {
					display_rows.push(display_rows.shift());
				}
			}
		}
		else if (vpos < lastPosition) {
			toprowpos = update_info.toprow[0];
			bottomrowpos = update_info.bottomrow;

			update_info.dir = -1;

			update_info.curidx = rows_len - 1;

			updaterow = Math.min(_prev_toprowpos[0] - 1, bottomrowpos);
			if (updaterow < bottomrowpos) {
				if (_prev_dir > 0 && toprowpos > 0) {
					display_cnt = (bottomrowpos - toprowpos + 1);
					for (i = 0, n = (rows_len - display_cnt); i < n; i++) {
						display_rows.unshift(display_rows.pop());
					}
				}

				out_cnt = (_prev_toprowpos[0] - toprowpos);

				for (i = 0, n = out_cnt; i < n; i++) {
					display_rows.unshift(display_rows.pop());
				}
			}
		}

		return update_info;
	};

	_pGridMatrixManager._adjustScrollRows = function (vpos, is_updatecontents, each, startrow) {
		var grid = this._grid, totalcnt = grid._getGridRowCount(), rows = this._rows, first_rowidx = grid._getFixRowCnt(), last_rowidx = totalcnt - 1, hide_rows = [], hide_row, r, l, w, h, t, band = this._band, variable_size = grid._is_variable_bodyrowsize, hide_len = 0, dir = 0, hidecnt = 0, target_rowidx, lastPosition = grid._last_scroll_top, b_row_sort = false, b_adjust_row = false, editor = grid._currentCellEditor, swap_row1 = (editor) ? editor.parent.parent : null, swap_row2 = null, editing_rowidx = grid._getGridRow(grid._currentCellRow);

		if (editor && editor.parent._is_mergetemp) {
			swap_row1 = null;
			editing_rowidx = -1;
		}

		var updateinfo = band._rowscroll_info;
		var usehidden = (updateinfo) ? updateinfo.usehidden : false;

		if (vpos > lastPosition) {
			dir = 1;
		}
		else if (vpos < lastPosition) {
			dir = -1;
		}

		if (!each) {
			each = rows.length;
		}

		var i, n;
		var prev_rowidx;

		if (dir > 0) {
			for (i = 0, n = rows.length; i < n; i++) {
				if (this._isShowScreenRow(rows[i], vpos, band._getClientHeight()) == true) {
					break;
				}

				if (each > hide_rows.length) {
					hide_rows.push(rows[i]);
				}

				hidecnt++;
			}

			hide_len = hide_rows.length;

			prev_rowidx = null;

			if (hide_len > 0) {
				if (rows.length == hidecnt) {
					target_rowidx = grid._toprowpos[0];

					if (target_rowidx % 2 != hide_rows[0]._rowidx % 2) {
						hide_rows.push(hide_rows.shift());
						rows.push(rows.shift());
					}

					for (i = 0; i < hide_len; i++) {
						hide_row = hide_rows[i];

						if (i == 0 && hide_row._overrow) {
							break;
						}

						hide_row._overrow = false;
						r = target_rowidx++;

						if (r >= grid.rowcount) {
							if (prev_rowidx == null) {
								prev_rowidx = grid._toprowpos[0] - 1;
							}

							r = prev_rowidx--;
							hide_row._overrow = true;


							if (r < 0) {
								break;
							}
						}

						if (r == editing_rowidx) {
							swap_row2 = hide_row;
						}

						hide_row._changeRow(r, variable_size);
						l = hide_row._adjust_left;
						w = hide_row._adjust_width;
						h = grid._getRowSize(r);
						t = this._getBodyRowTopPos(r);
						hide_row.move(l, t, w, h);

						if (variable_size) {
							hide_row._resetCellsSize(grid._curFormat);
						}
					}
				}
				else {
					target_rowidx = rows[rows.length - 1]._rowidx + 1;

					for (i = 0; i < hide_len; i++) {
						hide_row = hide_rows[i];
						hide_row._overrow = false;
						r = target_rowidx++;

						if (r > last_rowidx) {
							if (!variable_size) {
								hide_rows.splice(i--, 1);
								hide_len = hide_rows.length;
							}
							continue;
						}
						if (r == editing_rowidx) {
							swap_row2 = hide_row;
						}

						hide_row._changeRow(r, variable_size);
						l = hide_row._adjust_left;
						w = hide_row._adjust_width;
						h = grid._getRowSize(r);
						t = this._getBodyRowTopPos(r);
						hide_row.move(l, t, w, h);

						if (variable_size) {
							hide_row._resetCellsSize(grid._curFormat);
						}
					}
					b_row_sort = true;
				}
				if (prev_rowidx != null) {
					b_row_sort = true;
				}
			}

			if (variable_size) {
				b_adjust_row = true;
			}
		}
		else if (dir < 0) {
			if (variable_size) {
				this._adjustRowsDisplay(false, true);
			}

			for (i = rows.length - 1; i >= 0; i--) {
				if (this._isShowScreenRow(rows[i], vpos, band._getClientHeight()) == true) {
					break;
				}

				if (each > hide_rows.length) {
					hide_rows.push(rows[i]);
				}

				hidecnt++;
			}

			hide_len = hide_rows.length;

			if (hide_len > 0) {
				if (rows.length == hidecnt) {
					target_rowidx = grid._toprowpos[0];

					if (target_rowidx % 2 != hide_rows[hide_len - 1]._rowidx % 2) {
						hide_rows.push(hide_rows.shift());
						rows.unshift(rows.pop());
					}

					for (i = hide_len - 1; i >= 0; i--) {
						hide_row = hide_rows[i];
						hide_row._overrow = false;
						r = target_rowidx++;

						if (r == editing_rowidx) {
							swap_row2 = hide_row;
						}

						hide_row._changeRow(r, variable_size);

						if (variable_size) {
							hide_row._resetCellsSize(grid._curFormat);
						}
					}

					for (i = 0; i < hide_len; i++) {
						hide_row = hide_rows[i];
						r = hide_row._rowidx;
						l = hide_row._adjust_left;
						w = hide_row._adjust_width;
						h = grid._getRowSize(r);
						t = this._getBodyRowTopPos(r);
						hide_row.move(l, t, w, h);
					}
				}
				else {
					target_rowidx = rows[0]._rowidx - 1;

					for (i = 0; i < hide_len; i++) {
						hide_row = hide_rows[i];
						hide_row._overrow = false;
						r = target_rowidx--;

						if (r < first_rowidx) {
							continue;
						}

						if (r == editing_rowidx) {
							swap_row2 = hide_row;
						}

						hide_row._changeRow(r, variable_size);
						l = hide_row._adjust_left;
						w = hide_row._adjust_width;
						h = grid._getRowSize(r);
						t = this._getBodyRowTopPos(r);
						hide_row.move(l, t, w, h);

						if (variable_size) {
							hide_row._resetCellsSize(grid._curFormat);
						}
					}
					b_row_sort = true;
				}
			}
		}
		else {
			if (is_updatecontents) {
				prev_rowidx = null;

				target_rowidx = grid._toprowpos[0];

				var org_row, org_rows = rows, orgrows_len = rows.length;

				if (orgrows_len && target_rowidx % 2 != org_rows[0]._rowidx % 2) {
					var oddrow = org_rows.shift();
					org_rows.push(oddrow);
				}

				for (i = 0; i < orgrows_len; i++) {
					org_row = org_rows[i];

					org_row._overrow = false;
					r = target_rowidx++;

					if (r >= grid.rowcount) {
						if (prev_rowidx == null) {
							prev_rowidx = grid._toprowpos[0] - 1;
						}

						r = prev_rowidx--;
						org_row._overrow = true;


						if (r < 0) {
							break;
						}
					}

					var change = org_row._changeRow(r, variable_size);

					if (r == editing_rowidx) {
						swap_row2 = org_row;
					}

					l = org_row._adjust_left;
					w = org_row._adjust_width;
					h = grid._getRowSize(r);
					t = this._getBodyRowTopPos(r);

					if (h < 0) {
						continue;
					}

					org_row.move(l, t, w, h);

					if (usehidden) {
						org_row._control_element.setElementDisplay("");
					}

					if (variable_size) {
						org_row._resetCellsSize(grid._curFormat);
					}

					if (change) {
						hide_rows.push(org_row);
					}
				}

				if (prev_rowidx != null) {
					b_row_sort = true;
				}
			}
		}

		if (rows.length > 0) {
			if (swap_row1 && swap_row2 && (swap_row1 != swap_row2)) {
				var tr = swap_row1._rowidx;
				var tl = swap_row1._adjust_left;
				var tt = swap_row1._adjust_top;
				var tw = swap_row1._adjust_width;
				var th = swap_row1._adjust_height;

				swap_row1._changeRow(swap_row2._rowidx, variable_size);
				swap_row1.move(swap_row2._adjust_left, swap_row2._adjust_top, swap_row2._adjust_width, swap_row2._adjust_height);

				swap_row2._changeRow(tr, variable_size);
				swap_row2.move(tl, tt, tw, th);

				if (variable_size) {
					swap_row1._resetCellsSize(grid._curFormat);
					swap_row2._resetCellsSize(grid._curFormat);
				}

				if (hide_rows.length != rows.length) {
					hide_rows.push(swap_row1);
				}

				b_row_sort = true;
			}

			if (b_row_sort) {
				rows.sort(function (a, b) {
					return a._rowidx - b._rowidx;
				});
			}

			if (b_adjust_row) {
				this._adjustRowsDisplay(false, true);
			}

			grid._begrowpos = rows[0]._rowidx;
			grid._endrowpos = rows[rows.length - 1]._rowidx;
		}

		return hide_rows;
	};

	_pGridMatrixManager._adjustScrollRows2 = function (vpos, is_updatecontents, each) {
		var grid = this._grid, totalcnt = grid._getGridRowCount(), first_rowidx = grid._getFixRowCnt(), last_rowidx = totalcnt - 1, body = this._band, rows = this._rows, variable_size = grid._is_variable_bodyrowsize, b_adjust_row = false, editor = grid._currentCellEditor, swap_row1 = (editor) ? editor.parent.parent : null, swap_row2 = null, editing_rowidx = grid._getGridRow(grid._currentCellRow);

		if (editor && editor.parent._is_mergetemp) {
			swap_row1 = null;
			editing_rowidx = -1;
		}

		var updateinfo = body._rowscroll_info;
		if (!updateinfo) {
			body._update_rows = this._adjustScrollRows(vpos, is_updatecontents, each);
			return (body._update_rows.length > 0);
		}

		body._update_rows = [];

		var dir = updateinfo.dir;
		var scrollmode = updateinfo.scrollmode;
		var skipped = updateinfo.skipped | 0;
		var framecnt = (scrollmode == 0 ? updateinfo.framecnt : updateinfo.framecnt *  (1 + skipped));
		var toprow = updateinfo.toprow[0];
		var bottomrow = updateinfo.bottomrow;
		var usehidden = updateinfo.usehidden;
		var display_rows = updateinfo.display_rows;
		var row_len = display_rows.length;
		var curidx = updateinfo.curidx;
		var editrowidx = -1;
		var editrowswapidx = -1;
		var continue_scroll = false;
		var i;

		var row, rowidx, newidx, l, w, h, t;
		if (dir > 0) {
			for (i = curidx; i < row_len; i++) {
				row = display_rows[i];
				rowidx = row._rowidx;
				newidx = toprow + i;

				if (swap_row1 && swap_row1 == row) {
					editrowidx = i;
				}

				if (framecnt > 0) {
					if (usehidden) {
						row._control_element.setElementDisplay("");
					}

					if (newidx != rowidx) {
						if (!variable_size && newidx > last_rowidx) {
							continue;
						}

						if (newidx == editing_rowidx) {
							swap_row2 = row;
							editrowswapidx = i;
						}

						row._changeRow(newidx, variable_size);
						l = row._adjust_left;
						w = row._adjust_width;
						h = grid._getRowSize(newidx);
						t = this._getBodyRowTopPos(newidx);
						row.move(l, t, w, h);

						body._update_rows.push(row);

						if (variable_size) {
							row._resetCellsSize(grid._curFormat);
						}

						--framecnt;
					}
					updateinfo.curidx++;
				}
				else if (usehidden) {
					row._control_element.setElementDisplay(newidx != rowidx ? "none" : "");
				}
				if (!usehidden && framecnt <= 0) {
					break;
				}
			}
			if (variable_size) {
				b_adjust_row = true;
			}

			continue_scroll = (updateinfo.curidx < row_len);
		}
		else if (dir < 0) {
			if (variable_size) {
				this._adjustRowsDisplay(false, true);
			}

			var borromrowidx = row_len - 1;
			for (i = curidx; i >= 0; i--) {
				row = display_rows[i];
				rowidx = row._rowidx;
				newidx = bottomrow - (borromrowidx - i);

				if (swap_row1 && swap_row1 == row) {
					editrowidx = i;
				}

				var row_elem = row._control_element;
				if (framecnt > 0) {
					if (usehidden) {
						row_elem.setElementDisplay("");
					}

					if (newidx != rowidx) {
						if (newidx < first_rowidx) {
							continue;
						}

						if (newidx == editing_rowidx) {
							swap_row2 = row;
							editrowswapidx = i;
						}

						row._changeRow(newidx, variable_size);
						l = row._adjust_left;
						w = row._adjust_width;
						h = grid._getRowSize(newidx);
						t = this._getBodyRowTopPos(newidx);
						row.move(l, t, w, h);

						body._update_rows.push(row);

						if (variable_size) {
							row._resetCellsSize(grid._curFormat);
						}

						--framecnt;
					}
					updateinfo.curidx--;
				}
				else if (usehidden) {
					row_elem.setElementDisplay(newidx != rowidx ? "none" : "");
				}
				if (!usehidden && framecnt <= 0) {
					break;
				}
			}

			continue_scroll = (updateinfo.curidx >= 0);
		}

		if (rows.length > 0) {
			if (swap_row1 && swap_row2 && (swap_row1 != swap_row2)) {
				var tr = swap_row1._rowidx;
				var tl = swap_row1._adjust_left;
				var tt = swap_row1._adjust_top;
				var tw = swap_row1._adjust_width;
				var th = swap_row1._adjust_height;

				swap_row1._changeRow(swap_row2._rowidx, variable_size);
				swap_row1.move(swap_row2._adjust_left, swap_row2._adjust_top, swap_row2._adjust_width, swap_row2._adjust_height);

				swap_row2._changeRow(tr, variable_size);
				swap_row2.move(tl, tt, tw, th);

				if (variable_size) {
					swap_row1._resetCellsSize(grid._curFormat);
					swap_row2._resetCellsSize(grid._curFormat);
				}

				display_rows[editrowswapidx] = swap_row1;
				display_rows[editrowidx] = swap_row2;

				body._update_rows.push(swap_row1);
			}

			rows.sort(function (a, b) {
				return a._rowidx - b._rowidx;
			});

			if (b_adjust_row) {
				this._adjustRowsDisplay(false, true);
			}

			grid._begrowpos = rows[0]._rowidx;
			grid._endrowpos = rows[rows.length - 1]._rowidx;
		}

		return continue_scroll;
	};
	delete _pGridMatrixManager;

	nexacro._GridBandControl = function (id, left, top, width, height, right, bottom, parent, refobj) {
		nexacro.Component.call(this, id, left, top, width, height, right, bottom, null, null, null, null, parent);

		this._isBody = (id == "body");
		this._refinfo = refobj;
		this._grid = parent;
		this._rowsizesperdatarow = null;
		this._datarowsheight = -1;
		this._colinfos = null;
		this._rowinfos = null;
		this._cellsinfo = null;
		this._update_rows = [];
		this._create_rows = [];
		this._text_elem = null;
		this._use_translate_scroll = true;
		this._use_readonly_status = true;

		if (refobj) {
			refobj._bandctrl = this;
		}

		this._matrix = new nexacro._GridMatrixManager(this._grid, this);
		this._scrollWidth = 0;
		this._scrollHeight = 0;
		this._recreating = false;
		this.accessibilityrole = "none";
		this.selectborder = "";
	};

	var _pGridBand = nexacro._createPrototype(nexacro.Component, nexacro._GridBandControl);
	nexacro._GridBandControl.prototype = _pGridBand;

	_pGridBand._is_subcontrol = true;
	_pGridBand._type_name = "GridBandControl";


	_pGridBand._apply_normalstyleFromInfo = function () {
		var info = this._refinfo;
		var normal_prop = info._property_map;
		var prop, val, datarow = this._grid._currentDSrow;

		for (var i = 0, n = normal_prop.length; i < n; i++) {
			if ((normal_prop[i][3] == true) || (normal_prop[i][0].substring(0, 13) == "accessibility")) {
				prop = normal_prop[i][0];

				if (normal_prop[i][1] == true) {
					val = info._getAttrValue(info[prop], datarow);
				}
				else {
					val = info[prop];
				}

				this["set_" + prop](val);
			}
		}
	};

	_pGridBand._getClassCSSSelector = function () {
		var cssclassselector = this.cssclass || this._cssclass_expr;

		if (cssclassselector) {
			if (typeof cssclassselector == "object") {
				cssclassselector = cssclassselector.toString();
			}
			return cssclassselector.trim().split(",");
		}
		return "";
	};

	_pGridBand._getElementClassCSSSelector = function () {
		var cssarr = this._getClassCSSSelector();

		if (cssarr) {
			cssarr.push("dummy");
		}

		return cssarr;
	};

	_pGridBand.on_create_contents = function () {
		var control_elem = this.getElement();
		var format = this._grid._curFormat;
		if (control_elem && format) {
			this._recreate_contents();

			if (this._isBody) {
				var text_elem = this._text_elem = new nexacro.TextBoxElement(control_elem);
				text_elem.setElementSize(this._getClientWidth(), this._getClientHeight());
				text_elem.setElementVisible(false);
				text_elem.setElementTextAlign("center");
				text_elem.setElementVerticalAlign("middle");

				if (this._get_rows().length == 0) {
					var text = this.parent.nodatatext;
					text_elem.setElementText(text);
				}
			}
		}
	};

	_pGridBand.on_created_contents = function (win) {
		var control_elem = this.getElement();
		var format = this._grid._curFormat;

		if (control_elem && format) {
			var text_elem = this._text_elem;
			if (text_elem) {
				text_elem.create(win);
			}

			var grid = this._grid;

			if (grid._is_created == false && (grid._img_preload_cnt > 0 || grid.autosizingtype != "none")) {
			}
			else {
				this._on_refresh_rows();

				var _hpos = grid._getScrollLeft();
				var _vpos = grid._getScrollTop();

				if (_hpos > 0) {
					this._matrix._adjustColsDisplay();
					grid._absolutelyResetScrollPos(true);
					grid._control_element.setElementHScrollPos(_hpos);
					grid._absolutelyResetScrollPos(false);
				}

				if (_vpos > 0) {
					grid._absolutelyResetScrollPos(true);
					grid._control_element.setElementVScrollPos(_vpos);
					grid._absolutelyResetScrollPos(false);
				}
			}

			if (nexacro._enableaccessibility && !grid._accept_focus) {
				if (this.accessibilityenable) {
					grid._accept_focus = true;
				}
			}
			this.on_apply_prop_tooltip();
			this._apply_normalstyleFromInfo();
		}
	};

	_pGridBand._on_apply_status = function (oldstatus, status, olduserstatus, userstatus, apply, status_param, value_param, applycssstatus, applycssuserstatus) {
		var grid = this._grid;

		if (status == "mouseover" || status == "focused") {
			if (grid.mouseovertype == "cell" || grid.mouseovertype == "row") {
				status = oldstatus;
			}
		}

		nexacro.Component.prototype._on_apply_status.call(this, oldstatus, status, olduserstatus, userstatus, apply, status_param, value_param, applycssstatus, applycssuserstatus);

		if (this._isBody) {
			var rowcount = grid._getGridRowCount();

			if (this.getElement() && rowcount == 0) {
				if (grid.nodataimage) {
					var val = "transparent " + grid.nodataimage + " center center no-repeat";
					var background = nexacro.BackgroundObject(val, this);
					this._control_element.setElementBackground(background);
				}
				else {
					this.on_apply_background(this._background);
				}
			}
			else {
				this.on_apply_background(this._background);
			}
		}
	};

	_pGridBand.on_create_contents_command = function () {
		var str = "";
		var control_elem = this.getElement();
		var format = this._grid._curFormat;

		if (control_elem && format) {
			var text_elem = this._text_elem;
			if (text_elem) {
				str += text_elem.createCommand();
			}

			if (this._update_rows.length > 0 || this._create_rows.length > 0) {
				var update_rows = this._update_rows;
				var create_rows = this._create_rows;

				this._on_refresh_rows_physical(update_rows, create_rows, false, false, false);

				for (var i = 0, n = create_rows.length; i < n; i++) {
					str += create_rows[i].createCommand();
				}
				this._update_rows = [];
			}
		}

		return str;
	};

	_pGridBand.on_attach_contents_handle = function (win) {
		var text_elem = this._text_elem;
		if (text_elem) {
			text_elem.attachHandle(win);
		}

		for (var i = 0, n = this._create_rows.length; i < n; i++) {
			if (this._create_rows[i]._is_alive) {
				this._create_rows[i].attachHandle(win);
			}
		}
		this._create_rows = [];

		this.on_apply_text();
		var grid = this._grid;

		if (this.id == "head") {
			grid._applyResizer();
		}

		var _hpos = grid._getScrollLeft();
		var _vpos = grid._getScrollTop();

		if (_hpos > 0) {
			this._matrix._adjustColsDisplay();
			grid._absolutelyResetScrollPos(true);
			grid._control_element.setElementHScrollPos(_hpos);
			grid._absolutelyResetScrollPos(false);
		}

		if (_vpos > 0) {
			grid._absolutelyResetScrollPos(true);
			grid._control_element.setElementVScrollPos(_vpos);
			grid._absolutelyResetScrollPos(false);
		}

		if (nexacro._enableaccessibility && !grid._accept_focus) {
			if (this.accessibilityenable) {
				grid._accept_focus = true;
			}
		}
		this.on_apply_prop_tooltip();
		this._apply_normalstyleFromInfo();
	};

	_pGridBand.on_destroy_contents = function () {
		if (this._text_elem) {
			this._text_elem.destroy();
			this._text_elem = null;
		}
		if (this._refinfo) {
			this._refinfo._bandctrl = null;
			this._refinfo = null;
		}
		this._rows = null;
		this._grid = null;
		this._matrix.destroy();
		this._matrix = null;

		this._colinfos = null;
		this._rowinfos = null;
		this._cellsinfo = null;
		this._update_rows = null;
		this._create_rows = null;
		this._rowsizesperdatarow = null;
		this._scroll_rect_queue = null;
	};

	_pGridBand._update_rect_useaniframe = false;
	_pGridBand.on_change_containerRect = function (width, height) {
		if (this._recreating) {
			return;
		}

		if (this._text_elem) {
			var rect = this._grid._getAvailableRect(this);
			this._text_elem.setElementPosition(rect.left, rect.top);
			this._text_elem.setElementSize(rect.width, rect.height);
		}

		var grid = this._grid;

		if (grid._is_contents_recreating) {
			return;
		}

		if (grid._is_changingRect) {
			if (grid._colautofit) {
				if (grid.autosizingtype == "row" || grid.autosizingtype == "both") {
					if (grid._is_body_wordwrap || grid._is_head_wordwrap || grid._is_summ_wordwrap) {
						grid._resetRowSizeList();
						grid._resetColSizeList();
					}
				}
			}
		}

		if (this._is_created || this._update_size_contents) {
			if (this._update_rect_useaniframe) {
				var pThis = this;

				if (!this._aniframe_clientrect) {
					this._scroll_rect_queue = [];
					this._aniframe_clientrect = new nexacro.AnimationFrame(this, function () {
						pThis._callback_update_rect();
					});
				}

				var cnt = this._scroll_rect_queue.push(1);

				if (cnt == 1) {
					this._aniframe_clientrect.start();
				}
			}
			else {
				this._callback_update_rect(true);
			}
		}
	};

	_pGridBand._callback_update_rect = function (no_ani) {
		if (this._adjust_width == 0 || this._adjust_height == 0) {
			return;
		}

		var grid = this._grid;

		if (this._isBody) {
			var _vpos = grid._getScrollTop();

			if (_vpos < 0) {
				_vpos = 0;
			}

			grid._last_scroll_top = _vpos;
			grid._toprowpos = grid._getScreenTopRowPos(_vpos);
			grid._bottomrowpos = grid._getScreenBottomRowPos(_vpos);

			if (grid._needUpdateExtinner(true)) {
				grid._recreate_contents_all(false, false, true);
			}
			else {
				this._matrix._adjustRowsDisplay(true);
				this._matrix._adjustColsDisplay();

				this._update_rows = this._matrix._adjustScrollRows(_vpos, true);
			}
			this._clearScrollDisplayRows();
			grid._updateHighlightrowPos();
		}
		else {
			this._matrix._adjustRowsDisplay(true);
			this._matrix._adjustColsDisplay();
		}

		this._on_refresh_rows();

		if (!no_ani) {
			this._scroll_rect_queue.pop();

			if (this._scroll_rect_queue.length > 0) {
				this._aniframe_clientrect.start();
			}
		}
	};

	_pGridBand._clearScrollDisplayRows = function () {
		if (this._isBody && this._rowscroll_info) {
			this._rowscroll_info.display_rows = null;
		}
	};

	_pGridBand.on_create_control_element = function (parent_elem) {
		var control_elem = new nexacro.GridBandControlElement(parent_elem, this.id);
		control_elem.setLinkedControl(this);
		this._control_element = control_elem;
		return control_elem;
	};


	_pGridBand._apply_setfocus = function (evt_name, self_flag) {
		if (self_flag || nexacro._enableaccessibility) {
			nexacro.Component.prototype._apply_setfocus.call(this, evt_name);
		}

		if (nexacro._enableaccessibility) {
			this._grid._currentBand = this.id;

			if (this.id == "head") {
				this._grid._currentDSrow = -1;
			}
			else if (this.id == "summary") {
				this._grid._currentDSrow = -2;
			}
			else {
				this._grid._currentDSrow = 0;
			}
		}
	};

	_pGridBand.on_get_accessibility_label = function () {
		return this.id;
	};

	_pGridBand._setAccessibilityStatFocus = function (evt_name) {
		var label = this._getAccessibilityLabel();
		if (this._isBody) {
			if (this._grid.rowcount <= 0) {
				label += (this._grid.nodatatext) ? this._grid.nodatatext : "";
			}
			this._setAccessibilityLabel(label);
		}
		nexacro.Component.prototype._setAccessibilityStatFocus.call(this, evt_name);
	};

	_pGridBand.on_apply_wordWrap = function () {
		this._refresh_contents();
	};

	_pGridBand.on_apply_prop_tooltip = function () {
		var control_elem = this.getElement();
		this.tooltiptext = this._refinfo._getTooltipText();
		this.tooltiptype = this._refinfo.tooltiptype;

		nexacro.Component.prototype.on_apply_prop_tooltip.call(this);

		if (control_elem) {
			var rows = this._get_rows();
			var cells;

			for (var i = 0, n = rows.length; i < n; i++) {
				cells = rows[i]._cells;

				for (var j = 0, nn = cells.length; j < nn; j++) {
					cells[j].on_apply_prop_tooltip();
				}
			}
		}
	};

	_pGridBand.on_apply_text = function () {
		if (this._text_elem) {
			if (this._isBody && this._get_rows().length == 0) {
				var text = this.parent.nodatatext;
				this._text_elem.setElementVisible(text ? true : false);
				this._text_elem.setElementText(text);
				this._grid._text_elem.setElementVisible(false);
			}
			else {
				this._text_elem.setElementVisible(false);
			}
		}
	};

	_pGridBand.on_getIDCSSSelector = function () {
		return this.id;
	};

	_pGridBand.on_apply_prop_enable = function (v) {
		var control_elem = this.getElement();
		nexacro.Component.prototype.on_apply_prop_enable.call(this, v);

		if (control_elem) {
			var rows = this._get_rows();
			var cells;

			for (var i = 0, n = rows.length; i < n; i++) {
				rows[i]._setEnable(v);
				cells = rows[i]._cells;

				for (var j = 0, nn = cells.length; j < nn; j++) {
					cells[j]._setEnable(v);
				}
			}
		}
	};

	_pGridBand.on_fire_onclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		var grid = this._grid;
		if (nexacro._isTouchInteraction) {
			grid._hideEditor();
		}

		if (grid.onnodataareaclick && grid.onnodataareaclick._has_handlers) {
			return grid.on_fire_onnodataareaclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, grid, this, meta_key);
		}
		return false;
	};

	_pGridBand.on_fire_ondblclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		if (this.parent.onnodataareadblclick && this.parent.onnodataareadblclick._has_handlers) {
			return this.parent.on_fire_onnodataareadblclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp.parent, from_refer_comp, meta_key);
		}
		return false;
	};

	_pGridBand._on_refresh_rows = function (scrolling, no_update_supp, no_after_apply, is_create) {
		var grid = this._grid;
		if (this._control_element.handle) {
			var update_rows = this._update_rows;
			var create_rows = this._create_rows;

			this._on_refresh_rows_physical(update_rows, create_rows, scrolling, no_update_supp, true);

			this._update_rows = [];
			this._create_rows = [];

			this.on_apply_text();

			if (!no_after_apply) {
				grid._applyResizer();
			}

			if (!scrolling) {
				grid._adjustOverlayControls(!!is_create);
			}
		}
	};

	_pGridBand._on_refresh_rows_physical = function (update_rows, create_rows, scrolling, no_update_supp, bCreate) {
		var update_rows_len = update_rows.length;
		var i, create_rows_len = create_rows.length;

		if (this._isBody) {
			var grid = this._grid;
			if (grid._is_created == true) {
				var rows = this._get_rows();
				var rows_len = rows.length;

				if (!no_update_supp) {
					grid._suppressUpdate();
				}

				for (i = 0; i < create_rows_len; i++) {
					var create_row = create_rows[i];

					if (create_row._is_alive) {
						create_row._updateAll();
					}
				}

				var onlycontents = false;

				if (rows_len != update_rows_len) {
					onlycontents = (!grid._isUseBindExprStyle("body") && !grid._is_variable_bodyrowsize && !grid._hasVirtualMergeCell());
				}

				for (i = 0; i < update_rows_len; i++) {
					if (update_rows[i]._is_alive) {
						update_rows[i]._updateAll(undefined, undefined, onlycontents);
					}
				}

				if (grid._is_use_suppress || grid._supphorztype) {
					var cells = grid._curFormat._bodycells, cells_cnt = cells.length;
					var rowidx, datarow, rowupdate;

					for (var j = 0; j < rows_len; j++) {
						rowidx = rows[j]._rowidx;
						datarow = (grid._hasTree) ? grid._treeIndexes[rowidx] : rowidx;
						rowupdate = false;

						if (grid._mouseovercell && grid._mouseovercell.row == rowidx) {
							rowupdate = true;
						}

						for (i = 0; i < cells_cnt; i++) {
							if (rowupdate || cells[i].suppress != 0) {
								this._refreshRowCell(j, i, grid._isSelectedCell(i, datarow));
							}
							else if ((grid._supphorztype == 1 || grid._supphorztype == 3) && cells[i]._area == "left") {
								this._refreshRowCell(j, i, grid._isSelectedCell(i, datarow));
							}
							else if ((grid._supphorztype == 2 || grid._supphorztype == 3) && cells[i]._area == "right") {
								this._refreshRowCell(j, i, grid._isSelectedCell(i, datarow));
							}
						}
					}
				}
			}
		}
		else {
			for (i = 0; i < create_rows_len; i++) {
				create_rows[i]._updateAll();
			}

			for (i = 0; i < update_rows_len; i++) {
				update_rows[i]._updateAll();
			}
		}

		if (bCreate) {
			for (i = 0; i < create_rows_len; i++) {
				create_rows[i].on_created();
			}
		}
	};

	_pGridBand._on_last_lbuttonup = function () {
		this.parent._on_last_lbuttonup();
	};

	_pGridBand._on_last_keyup = function () {
		this.parent._on_last_keyup();
	};

	_pGridBand._refreshRowCell = function (displayrow, cellidx, selected, status, onlycontents, for_select) {
		var rows = this._get_rows();
		var cells = rows[displayrow]._cells;
		var cell = cells[cellidx];

		if (!cell) {
			return;
		}

		cell.selected = selected;

		var subcells = cell.subcells;
		var subcellsLen = subcells.length;

		for (var i = 0; i < subcellsLen; i++) {
			subcells[i].selected = selected;
		}
		cell._updateAll(status, onlycontents, for_select);
	};

	_pGridBand._refreshRow = function (displayrow, status, for_select, removecell) {
		var rows = this._get_rows();
		var row = rows[displayrow];
		row._updateAll(status, false, undefined, for_select, null, removecell);
	};

	_pGridBand._refreshCelltype = function (celltype, clearCurstyle) {
		var format = this.parent._curFormat;

		function checktype (cells, celltype) {
			var cells_len = cells.length;

			for (var i = 0; i < cells_len; i++) {
				if (cells[i].celltype == celltype) {
					return true;
				}
			}
			return false;
		}

		if (celltype == "head") {
			if (format._bodycells) {
				if (checktype(format._bodycells, celltype)) {
					this.parent._refreshBody(clearCurstyle);
				}
			}
			if (format._summcells) {
				if (checktype(format._summcells, celltype)) {
					this.parent._refreshSumm(clearCurstyle);
				}
			}
		}
		else if (celltype == "summary") {
			if (format._bodycells) {
				if (checktype(format._bodycells, celltype)) {
					this.parent._refreshBody(clearCurstyle);
				}
			}
			if (format._headcells) {
				if (checktype(format._headcells, celltype)) {
					this.parent._refreshHead(clearCurstyle);
				}
			}
		}
		else {
			if (format._summcells) {
				if (checktype(format._summcells, celltype)) {
					this.parent._refreshSumm(clearCurstyle);
				}
			}
			if (format._headcells) {
				if (checktype(format._headcells, celltype)) {
					this.parent._refreshHead(clearCurstyle);
				}
			}
		}
	};

	_pGridBand._refresh_contents = function (clearCurstyle) {
		if (this.id == "head") {
			this.parent._refreshHead(clearCurstyle);
			this._refreshCelltype("head", clearCurstyle);
		}
		else if (this.id == "summary") {
			this.parent._refreshSumm(clearCurstyle);
			this._refreshCelltype("summary", clearCurstyle);
		}
		else {
			this.parent._refreshBody(clearCurstyle);
			this._refreshCelltype("body", clearCurstyle);
		}
	};

	_pGridBand._isEnable = function () {
		if (this._grid) {
			return this._grid._isEnable();
		}
		return true;
	};

	_pGridBand._get_cols = function (format) {
		var cols = format._cols, cols_len = cols.length, col, left_cols = [], right_cols = [], body_cols = [];

		for (var i = 0; i < cols_len; i++) {
			col = cols[i];
			if (col._area == "left") {
				left_cols.push(col.size);
			}
			else if (col._area == "right") {
				right_cols.push(col.size);
			}
			else {
				body_cols.push(col.size);
			}
		}

		this._colinfos = cols;
		return [body_cols, left_cols, right_cols];
	};

	_pGridBand._recreate_contents = function (init_scroll, scrolling, no_hide_edit, no_update_supp) {
		var grid = this._grid, format = grid._curFormat, rows;

		this._matrix._init();

		if (!format) {
			return;
		}

		this._create_rows = [];
		this._update_rows = [];
		this._rowsizesperdatarow = [];
		this._recreating = true;

		if (this.id == "head") {
			if (grid._focused_row == -1) {
				this._grid._focused_row = undefined;
				this._grid._focused_cell = undefined;
			}
			rows = format._headrows;
			this._datarowsheight = format.headHeight;
		}
		else if (this.id == "summary") {
			if (grid._focused_row == -2) {
				this._grid._focused_row = undefined;
				this._grid._focused_cell = undefined;
			}
			rows = format._summrows;
			this._datarowsheight = format.summHeight;
		}
		else {
			if (grid._focused_row >= 0) {
				this._grid._focused_row = undefined;
				this._grid._focused_cell = undefined;
			}
			rows = format._bodyrows;
			grid._rowheight = this._datarowsheight = format._body_height;
		}

		var rows_len = rows ? rows.length : 0;

		for (var i = 0; i < rows_len; i++) {
			this._rowsizesperdatarow.push(rows[i].size);
		}

		var hpos = (grid._hscrollmng) ? grid._hscrollmng.pos : 0, _vpos = (grid._vscrollmng) ? grid._vscrollmng._pos : 0;

		if (this._isBody) {
			this._control_element._setFixArea(grid._fixed_height);

			if (!scrolling && !no_hide_edit) {
				grid._hideEditor();
			}

			grid._resetScrollMax(this);
			this._control_element._resetExtendContainer(this._scrollHeight);

			var vlimit = grid._control_element.vscroll_limit;

			if (_vpos < 0) {
				_vpos = 0;
			}
			else if (_vpos > vlimit) {
				_vpos = vlimit;
			}

			grid._toprowpos = grid._getScreenTopRowPos(_vpos);
			grid._bottomrowpos = grid._getScreenBottomRowPos(_vpos);

			this._matrix._adjustRowsDisplay();

			if (!grid._headBand && !grid._summBand) {
				grid._setScrollMaxSize(this._scrollWidth, this._scrollHeight, this._band_scroll_tops);
			}

			if (grid._is_created && !grid._autofiting) {
				this._on_refresh_rows(false, no_update_supp, undefined, true);
				grid._applyAutofittype(true);
			}
		}
		else {
			this._scrollWidth = format.bodyWidth;
			this._matrix._adjustRowsDisplay();
			grid._setScrollMaxSize(this._scrollWidth);

			if (grid._is_created && !grid._autofiting) {
				this._on_refresh_rows(false, no_update_supp, undefined, true);
			}
		}

		var lastfocus = grid._find_lastFocused();
		if (lastfocus == grid) {
			grid._control_element.setElementFocus();
		}

		var hlimit = grid._control_element.hscroll_limit;

		if (hpos < 0) {
			hpos = 0;
		}
		else if (hpos > hlimit) {
			hpos = hlimit;
		}

		if (this._isBody) {
			if (hpos > 0) {
				if (init_scroll) {
					grid._hscrollmng.setPos(0);
					grid._control_element.setElementHScrollPos(0);
				}
				else {
					if (grid._control_element._target_hscroll_elements) {
						this._matrix._adjustColsDisplay();
						grid._absolutelyResetScrollPos(true);
						grid._control_element.setElementHScrollPos(hpos);
						grid._absolutelyResetScrollPos(false);
					}
				}
			}
			if (_vpos > 0) {
				if (init_scroll) {
					grid._vscrollmng.setPos(0);
					this._control_element.setElementVScrollPos(0);
					this._is_over_scroll = 0;
				}
				else {
					grid._absolutelyResetScrollPos(true);
					grid._control_element.setElementVScrollPos(_vpos);
					grid._absolutelyResetScrollPos(false);
				}
			}
		}
		else {
			if (hpos > 0) {
				if (init_scroll) {
					grid._hscrollmng.setPos(0);
					grid._control_element.setElementHScrollPos(0);
				}
				else {
					this._matrix._adjustColsDisplay();
					grid._absolutelyResetScrollPos(true);
					grid._control_element.setElementHScrollPos(hpos);
					grid._absolutelyResetScrollPos(false);
				}
			}
		}
		this._recreating = false;
	};

	_pGridBand._get_rows = function () {
		return this._matrix._getAllRows();
	};

	_pGridBand._get_row = function (dataRowIdx) {
		var rows = this._get_rows();
		var rows_len = (rows) ? rows.length : 0;
		var grid = this._grid;
		var datarow;

		for (var i = 0; i < rows_len; i++) {
			datarow = grid._getDataRow(rows[i]._rowidx);

			if (dataRowIdx == datarow) {
				return rows[i];
			}
		}
		return null;
	};

	_pGridBand._updateAll = function (clearCurstyle) {
		if (this.getElement()) {
			this._apply_status(this._oldstatus, this._status, this._olduserstatus, this._userstatus);
		}
	};

	delete _pGridBand;

	nexacro._GridHScrollManager = function (grid) {
		this.max = 0;
		this.min = 0;
		this.pos = 0;
		this.line = 0;
		this.page = 0;
		this.view = 0;

		this._pos = 0;
		this._min = 0;
		this._max = 0;
		this._orgmax = 0;
		this._grid = grid;
	};

	var _pGridHScrollManager = nexacro._GridHScrollManager.prototype = nexacro._createPrototype(nexacro.Object, nexacro._GridHScrollManager);

	_pGridHScrollManager.setPos = function (v, evt_kind, evtsync) {
		if (v < this.min) {
			v = this.min;
		}
		if (v > this.max) {
			v = this.max;
		}

		if (this.pos != v) {
			this.pos = v;
			this._pos = this._scroll_convert_pixel(v);
		}
		if (!evtsync) {
			this._grid._scrollTo(this._pos, this._grid._vscroll_pos, undefined, true, undefined, evt_kind);
		}
	};

	_pGridHScrollManager.destroy = function () {
		this._grid = null;
	};

	_pGridHScrollManager._scroll_convert_pixel = function (v) {
		return v;
	};

	_pGridHScrollManager._scroll_reverse_convert = function (v) {
		return [v, v];
	};

	_pGridHScrollManager._setInfo = function (left, top, width, height, si_min, si_max, si_line, si_page, si_view, si_pos) {
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
	};

	delete _pGridHScrollManager;

	nexacro._GridVScrollManager = function (grid) {
		this.max = 0;
		this.min = 0;
		this.pos = 0;
		this.line = 0;
		this.page = 0;
		this.view = 0;

		this._pos = 0;
		this._min = 0;
		this._max = 0;
		this._orgmax = 0;
		this._grid = grid;
	};

	var _pGridVScrollManager = nexacro._GridVScrollManager.prototype = nexacro._createPrototype(nexacro.Object, nexacro._GridVScrollManager);

	_pGridVScrollManager.setPos = function (v, evt_kind) {
		if (v < this.min) {
			v = this.min;
		}
		if (v > this.max) {
			v = this.max;
		}

		if (this.pos != v) {
			this.pos = v;
			this._pos = this._scroll_convert_pixel(v);
		}
		this._grid._scrollTo(this._grid._hscroll_pos, this._pos, undefined, true, undefined, evt_kind);
	};

	_pGridVScrollManager.setPixelPos = function (v, evt_kind, adjustrow, evtsync) {
		if (v < this._min) {
			v = this._min;
		}
		if (v > this._max) {
			v = this._max;
		}

		this._no_set_scrollinfo = true;
		if (this._pos != v) {
			if (adjustrow) {
				var posarr = this._scroll_reverse_convert(v);
				this.pos = posarr[0];
				this._pos = posarr[1];
			}
			else {
				this.pos = this._scroll_reverse_convert(v)[0];
				this._pos = v;
			}
		}

		if (!evtsync) {
			this._grid._scrollTo(this._grid._hscroll_pos, this._pos, undefined, true, undefined, evt_kind);
		}
	};

	_pGridVScrollManager.setRowPos = function (v, evt_kind) {
		var grid = this._grid;
		v -= grid._getFixRowCnt();

		if (grid._scrollpixel == "all") {
			v = this._scroll_convert_pixel(v, true);
		}
		this.setPos(v, evt_kind);
	};

	_pGridVScrollManager._setInfo = function (left, top, width, height, si_min, si_max, si_line, si_page, si_view, si_pos) {
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
			this._grid._scrollTo(this._grid._hscroll_pos, this.l_pos, undefined, true, undefined, "");
		}
	};

	_pGridVScrollManager._scroll_convert_pixel = function (v, is_notcheck) {
		var grid = this._grid;
		var bodyband = grid._bodyBand;

		if (grid._scrollpixel != "all" || is_notcheck) {
			if (bodyband) {
				var srowidx = grid._getFixRowCnt();
				var rowidx = v + srowidx;

				if (grid._is_variable_bodyrowsize) {
					var height = 0, row;

					for (var i = srowidx; i < rowidx; i++) {
						row = grid._getDataRow(i);
						height += grid._rowSizeList[row];
					}
					v = height;
				}
				else {
					v = (rowidx - srowidx) *  bodyband._datarowsheight;
				}
			}
		}

		return v;
	};

	_pGridVScrollManager._scroll_reverse_convert = function (v, is_notcheck, is_max) {
		var grid = this._grid;
		var bodyband = grid._bodyBand;
		var renew = v;
		var height, row, i;

		if (grid._scrollpixel != "all" || is_notcheck) {
			if (bodyband) {
				if (grid._is_variable_bodyrowsize) {
					var srowidx = grid._getFixRowCnt();
					var rowcnt = grid._getGridRowCount();
					height = 0;
					row = 0;

					if (is_max) {
						for (i = srowidx; i < rowcnt; i++) {
							row = grid._getDataRow(i);

							if (v <= height) {
								row = i;
								renew = height;
								break;
							}
							height += grid._rowSizeList[row];
						}
					}
					else {
						for (i = srowidx; i < rowcnt; i++) {
							row = grid._getDataRow(i);

							if (v < height) {
								row = i - 1;

								if (grid._rowSizeList[row] > bodyband._getClientHeight()) {
									if (height - v < bodyband._getClientHeight()) {
										if (v < this._orgmax) {
											renew = height - bodyband._getClientHeight();
										}
									}
								}
								else {
									if (v < this._orgmax) {
										renew = height - grid._rowSizeList[row];
									}
								}
								break;
							}
							height += grid._rowSizeList[row];
						}
					}
					v = row;
					v -= srowidx;
				}
				else {
					row = 0;

					if (is_max) {
						if (v > 0) {
							row = Math.ceil(v / bodyband._datarowsheight);
						}

						renew = row *  bodyband._datarowsheight;
					}
					else {
						if (v == this._orgmax) {
							row = Math.ceil(v / bodyband._datarowsheight);
						}
						else if (v > 0) {
							row = Math.floor(v / bodyband._datarowsheight);
						}

						height = bodyband._datarowsheight *  (row + 1);
						if (bodyband._datarowsheight > bodyband._getClientHeight()) {
							if (height - v < bodyband._getClientHeight()) {
								renew = height - bodyband._getClientHeight();
							}
						}
						else {
							renew = row *  bodyband._datarowsheight;
						}
					}
					v = row;
				}
			}
		}

		return [v, renew];
	};

	_pGridVScrollManager._checkoverscroll = function (si_pos) {
		var grid = this._grid;

		if (grid._scrollpixel != "all") {
			grid._is_over_scroll = 0;

			if (this._pos > this._orgmax) {
				grid._is_over_scroll = this._pos - this._orgmax;
			}
		}
	};

	_pGridVScrollManager.destroy = function () {
		this._grid = null;
	};

	delete _pGridVScrollManager;

	nexacro.Grid = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent) {
		nexacro.Component.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);


		this._event_list = {
			"onclick" : 1, 
			"ondblclick" : 1, 
			"onkillfocus" : 1, 
			"onsetfocus" : 1, 
			"onkeypress" : 1, 
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
			"onmove" : 1, 
			"onsize" : 1, 
			"ongesture" : 1, 
			"onvscrolllastover" : 1, 
			"onvscroll" : 1, 
			"onhscroll" : 1, 
			"onvtracklast" : 1, 
			"oncellclick" : 1, 
			"onheadclick" : 1, 
			"onsummaryclick" : 1, 
			"oncelldblclick" : 1, 
			"onheaddblclick" : 1, 
			"onsummarydblclick" : 1, 
			"onnodataareaclick" : 1, 
			"onnodataareadblclick" : 1, 
			"onselectchanged" : 1, 
			"oncellposchanged" : 1, 
			"onenteredit" : 1, 
			"onenterdown" : 1, 
			"cantreestatuschange" : 1, 
			"ontreestatuschanged" : 1, 
			"onsubselectchanged" : 1, 
			"oncolresizing" : 1, 
			"onrowresizing" : 1, 
			"ondropdown" : 1, 
			"oncloseup" : 1, 
			"onitemchanged" : 1, 
			"onexpanddown" : 1, 
			"oninput" : 1, 
			"oncellimeaction" : 1, 
			"onexpandup" : 1, 
			"oncolresized" : 1, 
			"onrowresized" : 1, 
			"oncontextmenu" : 1, 
			"ontouchstart" : 1, 
			"ontouchmove" : 1, 
			"ontouchend" : 1, 
			"ondevicebuttonup" : 1
		};

		this._hscrollmng = new nexacro._GridHScrollManager(this);
		this._vscrollmng = new nexacro._GridVScrollManager(this);


		this._use_readonly_status = true;
		this._use_translate_scroll = false;
		this._is_scrollable = true;
		this._is_locale_control = true;
		this._formats = {
		};
		this._curFormat = null;
		this._headBand = null;
		this._summBand = null;
		this._bodyBand = null;

		this._exprcache = {
		};

		this._selectstartrow = [];
		this._selectstartcol = [];
		this._selectstartsubrow = [];
		this._selectstartpvt = [];
		this._selectendrow = [];
		this._selectendcol = [];
		this._selectendsubrow = [];
		this._selectendpvt = [];
		this._resizerCols = [];
		this._resizerRows = [];
		this._imgsize_cache = {
		};
		this._rowSizeListSub = [];
		this._rowSizeList = [];
		this._rowHeadListSub = [];
		this._rowHeadList = [];
		this._rowSummListSub = [];
		this._rowSummList = [];
		this._begrowpos = 0;
		this._endrowpos = 0;
		this._toprowpos = [0, 0];
		this._bottomrowpos = -1;
		this._isflingend = undefined;

		this._selectinfo = {
			rows : [], 
			selects : [], 
			ctrlpoint : {
				"cell" : -1, 
				"col" : -1, 
				"subrow" : -1, 
				"row" : -9, 
				"colspan" : -1, 
				"rowspan" : -1, 
				"_init" : function () {
					this.cell = -1;
					this.col = -1;
					this.subrow = -1;
					this.row = -9;
					this.colspan = -1;
					this.rowspan = -1;
					this.subrowslen = 0;
					this.area = "";
				}, 
				"_set" : function (cellinfo, row, subrowslen) {
					this.cell = cellinfo._cellidx;
					this.col = cellinfo._col;
					this.subrow = cellinfo._row;
					this.row = row;
					this.colspan = cellinfo._colspan;
					this.rowspan = cellinfo._rowspan;
					this.subrowslen = subrowslen;
					this.area = cellinfo._area;
				}
			}, 
			area : [], 
			"curcell" : -1, 
			"curcol" : -1, 
			"curpvt" : -9, 
			"cursubrow" : -1, 
			"curdsrow" : -1, 
			"currow" : -9, 
			"getSelectCells" : function (row) {
				return this.selects[row + 2];
			}, 
			arearect : {
				left : 0, 
				top : 0, 
				width : 0, 
				height : 0, 
				barea : "", 
				earea : ""
			}
		};

		this._text_elem = null;
		this._is_use_suppress = false;
		this._is_head_wordwrap = false;
		this._is_body_wordwrap = false;
		this._is_summ_wordwrap = false;
		this._recreate_contents_proc = [];
		this._keydown_elem = null;
		this._tree_load_all = null;
		this._image_load_all = null;
		this._is_editor_keyaction = true;
		this._focus_proc = null;
		this._after_recreate_contents_all = null;
		this._after_recreate = false;
		this._is_async_recreate = false;
		this._is_after_recreate = false;


		this.accessibilityrole = "grid";
		this._accept_arrow = false;
		this._accept_focus = false;
		this._is_first_focus = false;
		this._is_first_bodycell = false;
		this._is_band_focus = false;
		this._beforegridrowpos = -1;
		this._beforegridcolpos = -1;
		this.accessibilityreadbandlabel = true;


		this._aniframe_rowscroll = null;
		this._aniframe_rowscroll_float = null;
		this._aniframe_colscroll = null;
		this._aniframe_rowscroll_end = null;
		this._aniframe_colscroll_end = null;
		this._aniframe_clientrect = null;

		this._use_bind_expr_cells = {
			body : null, 
			head : null, 
			summ : null
		};
		this._is_use_bind_expr_style = {
			body : null, 
			head : null, 
			summ : null
		};
		this._expr_allrow_update_prop = false;
		this._expr_allrow_update_style = false;


		this._is_data_enter_apply = false;
		this._select_ctrl = null;
		this._format_str = null;
		this._track_point = {
			x : -1, 
			y : -1
		};
		this._track_idx = -1;
		this._track_start_info = null;
		this._track_mode = "";
		this._overlay_controls = [];
		this._selections = [];
		this._func_queue = [];
		this._recalcXY_info = null;
		this._virtual_mergecell_arr = [];
		this._enable_redraw_history = {
		};
		this._autofitcol_rate = [];
		this._org_treeStates = [];

		this._scroll_vpos_queue = [];
		this._style_tempband = {
		};
		this._blinktask = null;
		this._tempmergeeditor = null;
	};

	var _pGrid = nexacro._createPrototype(nexacro.Component, nexacro.Grid);
	nexacro.Grid.prototype = _pGrid;

	_pGrid._type_name = "Grid";

	_pGrid._rowheight = 24;

	_pGrid._rowcount = 0;
	_pGrid._rowposition = -1;

	_pGrid._beforeheadcellpos = -1;
	_pGrid._beforeheadrowpos = -1;
	_pGrid._beforeheadcolpos = -1;
	_pGrid._beforeheadsubrowpos = -1;

	_pGrid._beforebodycellpos = -1;
	_pGrid._beforebodyrowpos = -1;
	_pGrid._beforebodycolpos = -1;
	_pGrid._beforebodysubrowpos = -1;
	_pGrid._beforepvt = -9;

	_pGrid._beforesummcellpos = -1;
	_pGrid._beforesummrowpos = -1;
	_pGrid._beforesummcolpos = -1;
	_pGrid._beforesummsubrowpos = -1;

	_pGrid._multiselect = "none";

	_pGrid._bodyrowheight = 0;
	_pGrid._mouseRowPos = -9;
	_pGrid._mouseovercell = null;
	_pGrid._mouseCellPos = -1;
	_pGrid._dsEventOccured = false;
	_pGrid._bPivotGrid = false;

	_pGrid._showEditorCell = false;
	_pGrid._showEditRowIdx = -1;
	_pGrid._showEditCellIdx = -1;

	_pGrid._dbclickPreCell = -1;
	_pGrid._dbclickPreCol = -1;
	_pGrid._dbclickPreRow = -9;
	_pGrid._dbclickPreSubrow = -1;
	_pGrid._dbclickPrePvt = -9;
	_pGrid._lbuttondown_proc = false;

	_pGrid._bDragArea = false;
	_pGrid._nDragRow = -1;
	_pGrid._nDragCell = -1;
	_pGrid._nDragPivot = -9;
	_pGrid._nDragEndRow = -1;
	_pGrid._nDragEndCell = -1;
	_pGrid._nDragEndCol = -9;
	_pGrid._nDragBand = -1;
	_pGrid._bShiftClick = false;

	_pGrid._selectClear = false;
	_pGrid._acceptstab = true;

	_pGrid.body = null;
	_pGrid.head = null;
	_pGrid.summ = null;
	_pGrid.summary = null;

	_pGrid.currentcell = -1;
	_pGrid.currentcol = -1;
	_pGrid.currentpivot = -9;
	_pGrid.currentsubrow = -1;
	_pGrid.currentrow = -9;
	_pGrid._currentDSrow = -1;
	_pGrid._currentBand = "body";

	_pGrid.selectcount = 0;
	_pGrid.selectstartrow = -9;
	_pGrid.selectstartcol = -1;
	_pGrid.selectstartsubrow = -1;
	_pGrid.selectstartpivot = -9;
	_pGrid.selectendrow = -9;
	_pGrid.selectendcol = -1;
	_pGrid.selectendsubrow = -1;
	_pGrid.selectendpivot = -9;

	_pGrid.pagerowcount = 0;
	_pGrid._pagerowcnt = 0;
	_pGrid.rowcount = 0;
	_pGrid.pivotcount = 0;
	_pGrid._disprowcnt = 0;

	_pGrid._displaycalendarctrl = null;

	_pGrid.fillareatype = "none";
	_pGrid._resetfillarea = false;
	_pGrid.scrollpixel = "default";
	_pGrid._scrollpixel = (nexacro._isTouchInteraction) ? "all" : "none";
	_pGrid._selectscrollmode = (nexacro._isTouchInteraction) ? "scroll" : "select";
	_pGrid.dragscrolltype = "both";
	_pGrid.hideendline = "none";
	_pGrid.userdata = "";
	_pGrid.nodataimage = "";
	_pGrid.nodatatext = "";
	_pGrid.summarytype = "default";
	_pGrid.suppresslevel = "sameskip";
	_pGrid.useselcolor = true;
	_pGrid.showselection = false;

	_pGrid.autoupdatetype = "none";
	_pGrid.cellclickbound = "control";
	_pGrid.cellmovingtype = "none";
	_pGrid.cellsizebandtype = "body";
	_pGrid.cellsizingtype = "none";
	_pGrid.extendsizetype = "none";
	_pGrid.readonly = false;
	_pGrid.selectbandtype = "default";
	_pGrid.selectchangetype = "down";
	_pGrid.selecttype = "row";
	_pGrid.wheelscrollrow = 2;
	_pGrid.usecontrolkey = true;
	_pGrid.treeusebutton = "use";
	_pGrid.treeuseline = true;
	_pGrid.treeusecheckbox = true;
	_pGrid.treeuseimage = true;
	_pGrid.treeuseexpandkey = false;
	_pGrid.treeasynctoggle = false;
	_pGrid.treeinitstatus = "collapse,null";
	_pGrid.treepathdelimiter = ".";
	_pGrid.useinputpanel = false;
	_pGrid.usesoftkeyboard = true;
	_pGrid.suppresshorzcell = "none";

	_pGrid._enable = true;
	_pGrid._changeDisplayer = false;
	_pGrid._autoSizeRowProc = false;
	_pGrid._iskey_movetocell = false;


	_pGrid.binddataset = "";
	_pGrid._binddataset = null;

	_pGrid._userRowposChange = false;
	_pGrid._create_selection = null;

	_pGrid.formatid = "";
	_pGrid.formats = "";
	_pGrid.locale = "";
	_pGrid.areaselecttype = "limitband";
	_pGrid.autoenter = "none";
	_pGrid.autofitbandtype = "body";
	_pGrid.autofitminheight = 100;
	_pGrid.autofitminwidth = 100;
	_pGrid.autofittype = "none";
	_pGrid.autosizingtype = "none";
	_pGrid.autosizebandtype = "body";
	_pGrid.selectscrollmode = "default";

	_pGrid._colautofit = false;
	_pGrid._rowautofit = false;
	_pGrid._autofiting = false;
	_pGrid._bodyAutoSize = true;
	_pGrid._headAutoSize = false;
	_pGrid._summAutoSize = false;
	_pGrid._AutoSizeLcol = false;
	_pGrid._AutoSizeRcol = false;
	_pGrid._rowSizeEx = false;
	_pGrid._noInternalvscroll = false;
	_pGrid._is_variable_bodyrowsize = false;
	_pGrid._bGridCtrlLdown = false;
	_pGrid._locale = "";


	_pGrid._fixed_startrow = -9;
	_pGrid._fixed_endrow = -9;
	_pGrid._fixed_height = 0;
	_pGrid._fixedrow_height = 0;
	_pGrid._fixed_rowcnt = 0;
	_pGrid._fixed_row_scrolling = false;

	_pGrid.createcellasync = false;

	_pGrid.cellcombobuttonsize = undefined;
	_pGrid.cellcalendarbuttonsize = undefined;
	_pGrid.cellcomboscrollbarsize = undefined;
	_pGrid.celltextareascrollbarsize = undefined;
	_pGrid.cellcalendarpopuptype = undefined;
	_pGrid.cellcombopopuptype = undefined;
	_pGrid.cellcheckboxsize = undefined;
	_pGrid.cellcalendarpopupsize = undefined;
	_pGrid.cellcombopopupsize = undefined;

	_pGrid.mouseovertype = "default";
	_pGrid.fastvscrolltype = "alldisplay";
	_pGrid.cellexprupdatecondition = "all";
	_pGrid.scrolldisplaymode = "normal";

	_pGrid._is_listtype = true;

	_pGrid._use_innerhtml = false;
	_pGrid._use_recycle_colscroll = (nexacro._Browser != "Runtime");


	_pGrid._accessibility_row = -1;
	_pGrid._accessibility_cellidx = -1;
	_pGrid._skip_mobile_tabfocus = true;

	_pGrid.on_create_contents = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			var text_elem = this._text_elem = new nexacro.TextBoxElement(control_elem);
			text_elem.setElementSize(this._getClientWidth(), this._getClientHeight());
			text_elem.setElementVisible(false);
			text_elem.setElementTextAlign("center");
			text_elem.setElementVerticalAlign("middle");

			if (this.binddataset && !this._binddataset) {
				var ds = this._findDataset(this.binddataset);
				if (ds) {
					this.setBindDataset(ds);
				}
			}

			this._createBandsAndAreas(true);
		}
	};

	_pGrid.on_created_contents = function (win) {
		var text_elem = this._text_elem;
		if (text_elem) {
			text_elem.create(win);
		}

		var head_band = this._headBand;
		if (head_band) {
			head_band.on_created();
		}

		var body_band = this._bodyBand;
		if (body_band) {
			body_band.on_created();
		}

		var summ_band = this._summBand;
		if (summ_band) {
			summ_band.on_created();
		}

		var select_ctrl = this._select_ctrl;
		if (select_ctrl) {
			select_ctrl.on_created();
		}

		if (this._covercontrol) {
			this._covercontrol.on_created();
		}
		if (this._highlight_row_main) {
			this._highlight_row_main.on_created();
		}
		if (this._highlight_row_sublast) {
			this._highlight_row_sublast.on_created();
		}
		if (this._highlight_row_subcenter) {
			this._highlight_row_subcenter.on_created();
		}

		this._onResetScrollBar();

		if (body_band || head_band || summ_band) {
			this._applyAutofittype(true);
		}

		if (this._create_selection != null) {
			var sel = this._create_selection;
			this._resetSelect(sel.row, sel.cell, sel.col, sel.subrow, sel.pivot);
		}

		this._create_selection = null;
		this._is_created = true;

		var recreatecontents = false;

		if (this._useexprtree) {
			recreatecontents = true;
		}
		if (this.autosizingtype != "none") {
			if (this._img_preload_cnt == 0) {
				recreatecontents = true;
			}
		}
		if (recreatecontents) {
			this._recreate_contents_all(true, true);
		}
		else {
			this._refreshBody();
		}

		if (nexacro._enableaccessibility && !this._accept_focus) {
			if (this.accessibilityenable) {
				this._accept_focus = true;
			}
		}
		this.on_apply_nodatatext();
		this.on_apply_nodataimage();
		this.on_apply_readonly();
		this._applyResizer();
		this.on_apply_prop_rtl();

		if (this._after_resizeband) {
			this._resizeBand();
		}

		this._adjustOverlayControls(true);
		if (!this._isMultiSelect() && !this._isAreaSelect()) {
			this._initSelect(this._rowposition);
		}
	};

	_pGrid._on_apply_status = function (oldstatus, status, olduserstatus, userstatus, apply, status_param, value_param, applycssstatus, applycssuserstatus) {
		if (status == "mouseover") {
			if (this.mouseovertype == "cell" || this.mouseovertype == "row") {
				status = oldstatus;
			}
		}

		nexacro.Component.prototype._on_apply_status.call(this, oldstatus, status, olduserstatus, userstatus, apply, status_param, value_param, applycssstatus, applycssuserstatus);

		var rowcount = this._getGridRowCount();
		if (this.getElement() && rowcount == 0 && this._bodyBand == null && this._is_created) {
			if (this.nodataimage) {
				var val = "transparent " + this.nodataimage + " center center no-repeat";
				var background = nexacro.BackgroundObject(val, this);
				this._control_element.setElementBackground(background);
			}
			else {
				this.on_apply_background(this._background);
			}
		}
		else {
			this.on_apply_background(this._background);
		}
	};

	_pGrid.on_create_contents_command = function () {
		var command = "";
		var text_elem = this._text_elem;
		if (text_elem) {
			command += text_elem.createCommand();
		}

		var head_band = this._headBand;
		if (head_band) {
			command += head_band.createCommand();
		}

		var body_band = this._bodyBand;
		if (body_band) {
			command += body_band.createCommand();
		}

		var summ_band = this._summBand;
		if (summ_band) {
			command += summ_band.createCommand();
		}
		return command;
	};

	_pGrid.on_attach_contents_handle = function (win) {
		var text_elem = this._text_elem;
		if (text_elem) {
			text_elem.attachHandle(win);
		}

		var head_band = this._headBand;
		if (head_band) {
			head_band._control_element._cur_border = head_band._border || head_band._getCSSStyleValue("border", head_band._status);
			head_band.attachHandle(win);
		}

		var body_band = this._bodyBand;
		if (body_band) {
			body_band._control_element._cur_border = body_band._border || body_band._getCSSStyleValue("border", body_band._status);
			body_band.attachHandle(win);
		}

		var summ_band = this._summBand;
		if (summ_band) {
			summ_band._control_element._cur_border = summ_band._border || summ_band._getCSSStyleValue("border", summ_band._status);
			summ_band.attachHandle(win);
		}

		var select_ctrl = this._select_ctrl;
		if (select_ctrl) {
			select_ctrl.attachHandle(win);
		}

		this._onResetScrollBar();

		if (body_band || head_band || summ_band) {
			this._applyAutofittype(true);
		}

		if (this._create_selection != null) {
			var sel = this._create_selection;
			this._resetSelect(sel.row, sel.cell, sel.col, sel.subrow, sel.pivot);
		}

		this._create_selection = null;
		this._is_created = true;

		var recreatecontents = false;

		if (this._useexprtree) {
			recreatecontents = true;
		}
		if (this.autosizingtype != "none") {
			if (this._img_preload_cnt == 0) {
				recreatecontents = true;
			}
		}
		if (recreatecontents) {
			this._recreate_contents_all(true, true);
		}
		else {
			this._refreshBody();
		}

		if (nexacro._enableaccessibility && !this._accept_focus) {
			if (this.accessibilityenable) {
				this._accept_focus = true;
			}
		}
		this.on_apply_nodatatext();
		this.on_apply_nodataimage();
		this.on_apply_readonly();
		this._applyResizer();
		this.on_apply_prop_rtl();

		if (this._control_element) {
			if (this._control_element._arrangeBandOrder) {
				this._control_element._arrangeBandOrder();
			}
		}

		if (this._after_resizeband) {
			this._resizeBand();
		}

		if (this._select_ctrl) {
			this._select_ctrl.on_created(win);
		}

		if (this._covercontrol) {
			this._covercontrol.on_created();
		}
		if (this._highlight_row_main) {
			this._highlight_row_main.on_created();
		}
		if (this._highlight_row_sublast) {
			this._highlight_row_sublast.on_created();
		}
		if (this._highlight_row_subcenter) {
			this._highlight_row_subcenter.on_created();
		}

		this._adjustOverlayControls(true);
		if (!this._isMultiSelect() && !this._isAreaSelect()) {
			this._initSelect(this._rowposition);
		}
	};

	_pGrid._destroyFormats = function () {
		var formats = this._formats;
		if (formats) {
			for (var id in formats) {
				var format = formats[id];

				if (format && format.destroy) {
					format.destroy();
					formats[id] = null;
				}
			}
			this._formats = {
			};
		}
	};
	_pGrid.on_destroy_contents = function () {
		if (this._binddataset) {
			this._removeDSEventHandlers(this._binddataset);
		}

		if (this._aniframe_rowscroll) {
			this._aniframe_rowscroll.destroy();
		}
		if (this._aniframe_rowscroll_float) {
			this._aniframe_rowscroll_float.destroy();
		}
		if (this._aniframe_colscroll) {
			this._aniframe_colscroll.destroy();
		}
		if (this._aniframe_rowscroll_end) {
			this._aniframe_rowscroll_end.destroy();
		}
		if (this._aniframe_colscroll_end) {
			this._aniframe_colscroll_end.destroy();
		}
		if (this._aniframe_clientrect) {
			this._aniframe_clientrect.destroy();
		}

		this._aniframe_rowscroll = null;
		this._aniframe_rowscroll_float = null;
		this._aniframe_colscroll = null;
		this._aniframe_rowscroll_end = null;
		this._aniframe_colscroll_end = null;
		this._aniframe_clientrect = null;

		this._scroll_vpos_queue = null;

		this._destroyHighlightRow();

		var text_elem = this._text_elem;
		if (text_elem) {
			text_elem.destroy();
			this._text_elem = null;
		}
		this._destroyBands(true);

		this._destroyFormats();

		this._select_ctrl = null;
		this._currentCellEditor = null;

		if (this._displaycalendarctrl) {
			delete this._displaycalendarctrl;
			this._displaycalendarctrl = null;
		}

		this._binddataset = null;
		if (this._resizer_colctrl) {
			this._resizer_colctrl.destroy();
		}
		if (this._resizer_rowctrl) {
			this._resizer_rowctrl.destroy();
		}

		if (this._extratrack_timer) {
			this._extratrack_timer._handle.stop();
			this._extratrack_timer._handle = null;
			this._extratrack_timer = null;
		}

		this._clearTreeStates();
		this._clearTempBand(true);
		this._blinktask = null;

		if (this._tempmergeeditor) {
			this._tempmergeeditor.destroy();
			this._tempmergeeditor = null;
		}

		this._destroyOverlayControls();
		this._destroySelectionControls();

		this._hscrollmng.destroy();
		this._hscrollmng = null;
		this._vscrollmng.destroy();
		this._vscrollmng = null;
		this._curFormat = null;
		this._formats = null;
		this._mouseovercell = null;
		this._lastmouseentercell = null;
		this._prevAreaCellObj = null;
		this._selectstartrow = null;
		this._selectstartcol = null;
		this._selectstartsubrow = null;
		this._selectstartpvt = null;
		this._selectendrow = null;
		this._selectendcol = null;
		this._selectendsubrow = null;
		this._selectendpvt = null;
		this._resizerCols = null;
		this._resizerRows = null;
		this._imgsize_cache = null;
		this._rowSizeListSub = null;
		this._rowSizeList = null;
		this._rowHeadListSub = null;
		this._rowHeadList = null;
		this._rowSummListSub = null;
		this._rowSummList = null;
		this._toprowpos = null;
		this._selectinfo = null;
		this._recreate_contents_proc = null;
		this._keydown_elem = null;
		this._tree_load_all = null;
		this._image_load_all = null;
		this._focus_proc = null;
		this._after_recreate_contents_all = null;
		this._band_scroll_tops = null;
		this._format_str = null;
		this._exprcache = null;
		this._use_bind_expr_cells = null;
		this._is_use_bind_expr_style = null;
		this._setdataobj = null;
		this._resizer_colctrl = null;
		this._resizer_rowctrl = null;
		this.selectstartrow = null;
		this.selectstartcol = null;
		this.selectstartsubrow = null;
		this.selectstartpivot = null;
		this.selectendrow = null;
		this.selectendcol = null;
		this.selectendsubrow = null;
		this.selectendpivot = null;
		this.formats = null;
		this._overlay_controls = null;
		this._selections = null;
		this._recalcXY_info = null;
		this._virtual_mergecell_arr = null;
		this._enable_redraw_history = null;
		this._autofitcol_rate = null;
		this._org_treeStates = null;
		this._treeCellinfo = null;
		this._band_resizing_no_autofit = null;
		this._global_cursor_obj = null;
		this._global_cursor = null;
		this._start_perftime = null;
		this._end_perftime = null;

		if (this._afterrecreatetask) {
			this._afterrecreatetask.destroy();
			this._afterrecreatetask = null;
		}
		if (this._applytask) {
			this._applytask.destroy();
			this._applytask = null;
		}
		this._arrtextsizeCache = null;
	};

	_pGrid._clearTempBand = function (b_destroy) {
		if (this._style_tempband["head"]) {
			this._style_tempband["head"].destroy();
			this._style_tempband["head"] = null;
		}

		if (this._style_tempband["body"]) {
			this._style_tempband["body"].destroy();
			this._style_tempband["body"] = null;
		}

		if (this._style_tempband["summary"]) {
			this._style_tempband["summary"].destroy();
			this._style_tempband["summary"] = null;
		}

		if (b_destroy) {
			this._style_tempband = null;
		}
	};

	_pGrid._is_changingRect = false;
	_pGrid.on_change_containerRect = function (width, height) {
		if (!this._is_changingRect) {
			nexacro.Component.prototype.on_change_containerRect.call(this, width, height);
		}
		if (this._is_created_contents) {
			var text_elem = this._text_elem;
			text_elem.setElementSize(width, height);
		}
		this._is_changingRect = true;
		this._resizeBand();
		this._adjustOverlayControls(false);
		this._is_changingRect = false;
	};

	_pGrid.on_create_control_element = function (parent_elem) {
		var control_elem = new nexacro.GridScrollableControlElement(parent_elem);
		control_elem.setLinkedControl(this);
		this._control_element = control_elem;
		return control_elem;
	};

	_pGrid._on_deactivate = function () {
		if (!this._isSelected()) {
			this._changeStatus("enabled", true);
		}
	};

	_pGrid.on_update_position = function (resize_flag, move_flag, update) {
		nexacro.Component.prototype.on_update_position.call(this, resize_flag, move_flag, update);

		if (this._currentCellEditor && this._currentCellEditor._isPopupVisible()) {
			this._currentCellEditor.on_update_position(resize_flag, move_flag, update);
		}
	};

	_pGrid.applyto_bindSource = function (propid, Val) {
		if (this._currentCellEditor) {
			this._currentCellEditor._setDataset();
		}
	};

	_pGrid._getAccessibilityRole = function (accessibility) {
		var role = nexacro.Component.prototype._getAccessibilityRole.call(this);
		if (this._hasTree) {
			role = "treegrid";
		}
		return role;
	};

	_pGrid._isAccessibilityEnable = function () {
		return this._accept_focus;
	};

	_pGrid.on_get_accessibility_label = function () {
		return this.id;
	};




	_pGrid.on_fire_sys_onaccessibilitygesture = function (direction, fire_comp, refer_comp) {
		var bIsAndroidRuntimeAccessibility = (nexacro._Browser == "Runtime" && nexacro._accessibilitytype == 5);
		var bIsNotInitialized = (this._currentBand == "body" && this._accessibility_row == -1 && this._accessibility_cellidx == -1);

		if (bIsAndroidRuntimeAccessibility) {
			if (direction === undefined) {
				return false;
			}
			if (bIsNotInitialized) {
				this._accessibility_row = 0;
				this._accessibility_cellidx = 0;
			}
		}

		var ret = false;
		var curFormat = this._curFormat;
		if (curFormat) {
			var headcells_len = (curFormat._headcells) ? curFormat._headcells.length : 0;
			var bodycells_len = (curFormat._bodycells) ? curFormat._bodycells.length : 0;
			var summcells_len = (curFormat._summcells) ? curFormat._summcells.length : 0;

			if (this._currentBand == "grid" && this._accessibility_cellidx < 0 && this._accessibility_row < 0) {
				if (headcells_len == 0 && bodycells_len == 0 && summcells_len == 0) {
					var _form = this._getForm();
					var comp = _form._getTabOrderNext(this, (direction > 0) ? direction : -1, true);
					if (comp && (!this.nodatatext || this.nodatatext.length <= 0)) {
						comp._setAccessibilityNotifyEvent(direction);
					}
				}

				if (direction) {
					this._currentBand = "head";
					this._accessibility_row = 0;
					this._accessibility_cellidx = -1;
				}
				else {
					this._currentBand = "summary";
					this._accessibility_row = 0;
					this._accessibility_cellidx = summcells_len;
				}
			}

			var cellobj = null;
			while (true) {
				if (direction) {
					this._accessibility_cellidx++;
				}
				else {
					this._accessibility_cellidx--;
				}

				if (this._currentBand == "head") {
					if (direction) {
						if (!this._headBand || this._accessibility_cellidx >= headcells_len) {
							this._currentBand = "body";
							this._accessibility_row = 0;
							this._accessibility_cellidx = 0;


							if (this.rowcount <= 0 && this.nodatatext) {
								this._bodyBand._setAccessibilityNotifyEvent();
								ret = true;
								break;
							}
						}
					}
					else {
						if (!this._headBand || this._accessibility_cellidx < 0) {
							this._accessibility_row = -1;
							this._accessibility_cellidx = -1;
							break;
						}
					}
				}
				else if (this._currentBand == "summary") {
					if (direction) {
						if (!this._summBand || this._accessibility_cellidx >= summcells_len) {
							this._accessibility_row = -1;
							this._accessibility_cellidx = -1;
							break;
						}
					}
					else {
						if (!this._summBand || this._accessibility_cellidx < 0) {
							this._currentBand = "body";
							this._accessibility_row = this._rowcount - 1;
							this._accessibility_cellidx = bodycells_len - 1;


							if (this.rowcount <= 0 && this.nodatatext) {
								this._bodyBand._setAccessibilityNotifyEvent();
								ret = true;
								break;
							}
						}
					}
				}
				else {
					if (direction) {
						if (this._accessibility_cellidx >= bodycells_len) {
							this._accessibility_row++;
							this._accessibility_cellidx = 0;
						}

						if (this._rowcount <= 0 || this._accessibility_row >= this._rowcount) {
							this._currentBand = "summary";
							this._accessibility_row = 0;
							this._accessibility_cellidx = 0;
						}
					}
					else {
						if (this._accessibility_cellidx < 0) {
							this._accessibility_row--;
							this._accessibility_cellidx = bodycells_len - 1;
						}

						if (this._rowcount <= 0 || this._accessibility_row < 0) {
							this._currentBand = "head";
							this._accessibility_row = 0;
							this._accessibility_cellidx = headcells_len - 1;
						}
					}
				}

				cellobj = this._getAccessibilityCurrentCell(this._accessibility_row, this._accessibility_cellidx);
				if (cellobj) {
					cellobj._setAccessibilityNotifyEvent();
					ret = true;
					break;
				}
			}
		}
		return ret;
	};

	_pGrid._setAccessibilityNotifyEvent = function (direction) {
		this._resetScrollPos(this, this._adjust_left, this._adjust_top, this._adjust_left + this._adjust_width, this._adjust_top + this._adjust_height, (direction && direction > 0) ? 0 : 1);

		this._accessibility_row = -1;
		this._accessibility_cellidx = -1;
		this._currentBand = "grid";

		this.on_fire_sys_onaccessibilitygesture(direction);
	};

	_pGrid._setAccessibilityInfoByHover = function (control) {
		var ret = false;
		if (control) {
			if (control._cellobj) {
				control = control._cellobj;
			}

			if (control instanceof nexacro._GridCellControl) {
				this._currentBand = control._band.id;
				this._accessibility_cellidx = control._cellidx;
				this._accessibility_row = this._getDataRow(control._rowidx);
				this._first_focus = true;
			}
			else {
				this._first_focus = false;
			}

			ret = control._setAccessibilityInfoByHover();
		}
		return ret;
	};

	_pGrid.set_fillareatype = function (v) {
		switch (v) {
			case "none":
			case "linerow":
			case "datarow":
			case "controlrow":
			case "allrow":
				if (v != this.fillareatype) {
					this.fillareatype = v;
					this.on_apply_fillareatype();
				}
				break;
		}
	};

	_pGrid.on_apply_fillareatype = function () {
		this._resetfillarea = true;

		if (this._bodyBand) {
			this._bodyBand._matrix._adjustRowsDisplay();
			this._bodyBand._matrix._adjustColsDisplay();
			this._bodyBand._on_refresh_rows(false, false);
		}

		this._resetfillarea = false;
	};

	_pGrid.set_selectscrollmode = function (v) {
		switch (v) {
			case "select":
			case "scroll":
				this._selectscrollmode = this.selectscrollmode = v;
				break;
			case "default":
				this.selectscrollmode = v;
				this._selectscrollmode = (nexacro._isTouchInteraction) ? "scroll" : "select";
				break;
		}
	};

	_pGrid.set_scrollpixel = function (v) {
		if (v != this.scrollpixel) {
			switch (v) {
				case "none":
				case "all":
					this.scrollpixel = this._scrollpixel = v;
					this.on_apply_scrollpixel();
					break;
				case "default":
					this.scrollpixel = v;
					this._scrollpixel = (nexacro._isTouchInteraction) ? "all" : "none";
					this.on_apply_scrollpixel();
					break;
			}
		}
	};

	_pGrid.on_apply_scrollpixel = function () {
		this._updateScrollInfo();
	};

	_pGrid.set_mouseovertype = function (v) {
		if (v != this.mouseovertype) {
			switch (v) {
				case "cell":
				case "row":
					this.mouseovertype = v;
					break;
				default:
					this.mouseovertype = "default";
					break;
			}
		}
	};

	_pGrid._updateScrollInfo = function () {
		if (this._control_element) {
			this._control_element._updateClientRect();
		}
	};

	_pGrid.set_hideendline = function (v) {
		switch (v) {
			case "none":
			case "row":
			case "col":
			case "both":
				if (v != this.hideendline) {
					this.hideendline = v;
					this.on_apply_hideendline();
				}
				break;
		}
	};

	_pGrid.on_apply_hideendline = function () {
		this._refreshAll();
	};

	_pGrid.set_userdata = function (v) {
		if (this.userdata != v) {
			this.userdata = v;
		}
	};

	_pGrid.set_nodataimage = function (v) {
		if (v && v.substring(0, 4).toLowerCase() != "url(") {
			v = "URL(" + v + ")";
		}

		this.nodataimage = v;
		this.on_apply_nodataimage();
	};

	_pGrid.on_apply_nodataimage = function () {
		if (this.getElement()) {
			var body = this._bodyBand;
			if (body) {
				body._updateAll(true);
			}
			else {
				this._apply_status(this._oldstatus, this._status, this._olduserstatus, this._userstatus);
			}
		}
	};

	_pGrid.set_nodatatext = function (v) {
		this.nodatatext = v;
		this.on_apply_nodatatext();
	};

	_pGrid.on_apply_nodatatext = function () {
		var rowcount = this._getGridRowCount();
		if (this.getElement() && rowcount == 0) {
			var body = this._bodyBand;
			if (body) {
				if (this._text_elem) {
					this._text_elem.setElementVisible(false);
				}

				body.on_apply_text();
			}
			else {
				if (this._text_elem) {
					var text = this.nodatatext;
					this._text_elem.setElementVisible(true);
					this._text_elem.setElementText(text);
				}
			}
		}
		else {
			if (this._text_elem) {
				this._text_elem.setElementVisible(false);
			}
		}
	};

	_pGrid.set_summarytype = function (v) {
		switch (v) {
			case "default":
			case "top":
			case "left":
			case "lefttop":
				if (v != this.summarytype) {
					this.summarytype = v;
					this.on_apply_summarytype();
				}
				break;
		}
	};

	_pGrid.on_apply_summarytype = function () {
		if (this.getElement() && this._curFormat != null && this._curFormat.summHeight > 0) {
			this._recreate();
		}
	};

	_pGrid.set_suppresslevel = function (v) {
		switch (v) {
			case "sameskip":
			case "allskip":
			case "allcompare":
				if (v != this.suppresslevel) {
					this.suppresslevel = v;
					this.on_apply_suppresslevel();
				}
				break;
		}
	};

	_pGrid.on_apply_suppresslevel = function () {
		if (this.getElement() && this._curFormat != null) {
			this._refreshBody();
		}
	};

	_pGrid.set_showselection = function (v) {
		if (v != undefined) {
			v = nexacro._toBoolean(v);
			this.showselection = v;
			this.on_apply_showselection();
		}
	};

	_pGrid.on_apply_showselection = function () {
		this._applySelection();
	};

	_pGrid.set_useselcolor = function (v) {
		if (v != undefined) {
			v = nexacro._toBoolean(v);
			this.useselcolor = v;
			this.on_apply_useselcolor();
		}
	};

	_pGrid.on_apply_useselcolor = function () {
		this._refreshBody();
	};

	_pGrid.setBindDataset = function (obj) {
		if (obj instanceof nexacro.Dataset) {
			if (this._binddataset) {
				this._removeDSEventHandlers(this._binddataset);
			}

			if (!obj) {
				this._binddataset = null;
				this.binddataset = "";
			}
			else {
				this._binddataset = obj;
				this.binddataset = obj.id;
			}
			this.on_apply_prop_binddataset();
		}
	};

	_pGrid.getBindDataset = function () {
		return this._binddataset;
	};

	_pGrid.set_binddataset = function (str) {
		if (str && typeof str != "string") {
			this.setBindDataset(str);
			return;
		}
		if (str != this.binddataset || this.binddataset && !this._binddataset) {
			if (this._binddataset) {
				this._removeDSEventHandlers(this._binddataset);
			}

			if (!str) {
				this._binddataset = null;
				this.binddataset = "";
			}
			else {
				str = str.replace("@", "");
				this._binddataset = this._findDataset(str);
				this.binddataset = str;
			}
			this.on_apply_prop_binddataset();
		}
		return this.binddataset;
	};

	_pGrid.on_apply_prop_binddataset = function () {
		var dsobj = this._binddataset;

		this._isUserChangeHeadRowSize = false;
		this._isUserChangeBodyRowSize = false;
		this._isUserChangeSummRowSize = false;

		if (this._is_down_act && !this._isDownActionKeyMouse()) {
			this._is_down_act = false;
		}

		if (dsobj) {
			this.binddataset = dsobj.id;
			this.rowcount = this._rowcount = dsobj.rowcount;
			this._rowposition = dsobj.rowposition;

			this._exprcache = {
			};
			this._initTreeStates();
			this._recreate_contents_all(true, true);
			this._initSelect(this._rowposition);
			this._setDSEventHandlers(dsobj);
		}
		else {
			this.rowcount = this._rowcount = 0;
			this._rowposition = -1;
			this._exprcache = {
			};
			this._initTreeStates();
			this._recreate_contents_all(true, true);
			this._initSelect(this._rowposition);
		}
	};

	_pGrid.set_formatid = function (v) {
		if (this.formatid != v) {
			this.formatid = v;
			this.on_apply_formatid();
		}
	};

	_pGrid.on_apply_formatid = function () {
		var formatid = this.formatid;
		if (formatid == "" || !formatid) {
			formatid = this._default_formatid;
		}

		this._curFormat = this._formats[formatid];
		this._autofitcol_rate = [];
		this._clearBindTypeFlag();
		this._clearTempBand();
		this._initVirtualMerge();
		this._recreate();
		this._resetSelect(this._rowposition);
	};

	_pGrid.set_formats = function (v) {
		this.formats = v;
		this.on_apply_formats();
	};

	_pGrid.on_apply_formats = function () {
		this._destroyFormats();
		this._setContents(this.formats);
		this._initVirtualMerge();
		this._recreate();
		this._resetSelect(this._rowposition);
	};

	_pGrid.set_locale = function (v) {
		if (v != this.locale) {
			this.locale = v;
			this._locale = v;
			this.on_apply_locale(v);
		}
	};

	_pGrid.on_apply_locale = function (v) {
		this._recreate();
	};

	_pGrid.set_areaselecttype = function (v) {
		if (this.areaselecttype != v) {
			switch (v) {
				case "overband":
				case "limitband":
					this.areaselecttype = v;

					break;
			}
		}
	};

	_pGrid.set_autoenter = function (v) {
		if (this.autoenter != v) {
			switch (v) {
				case "select":
				case "key":
				case "none":
					this.autoenter = v;
					break;
			}
		}
	};

	_pGrid.set_autofitbandtype = function (v) {
		if (this.autofitbandtype != v) {
			switch (v) {
				case "body":
				case "allband":
				case "nohead":
				case "noleft":
				case "nohead,noleft":
					this.autofitbandtype = v;

					break;
			}
		}
	};

	_pGrid.set_autofitminheight = function (v) {
		if (this.autofitminheight != v) {
			this.autofitminheight = (isNaN(v) ? 100 : parseInt(v, 10));
		}
	};

	_pGrid.set_autofitminwidth = function (v) {
		if (this.autofitminwidth != v) {
			this.autofitminwidth = (isNaN(v) ? 100 : parseInt(v, 10));
		}
	};

	_pGrid.set_autofittype = function (v) {
		if (this.autofittype != v) {
			switch (v) {
				case "none":
				case "col":
				case "row":
				case "both":
				case "allpivot":
				case "allrow":
				case "allboth":
				case "col,allrow":
				case "row,allpivot":
					this.autofittype = v;
					this.on_apply_prop_autofittype();
					break;
			}
		}
	};

	_pGrid.on_apply_prop_autofittype = function () {
		if (this._curFormat) {
			if (!this._isUserChangeColSize) {
				this._autofitcol_rate = [];
			}

			var width;
			var bodysize = this._getBodyClientSize();
			var control_elem = this.getElement();

			width = bodysize[0];

			if (control_elem) {
				if (!this._is_created && width <= 0) {
					width = control_elem.client_width;
				}

				this._curFormat._resetOrgColSize(true, this._autofitcol_rate, width);
			}
		}
		this._applyAutofittype(true, true);
	};

	_pGrid.set_visible = function (v) {
		if (v === undefined || v === null) {
			return;
		}
		v = nexacro._toBoolean(v);

		if (this.visible != v) {
			nexacro.Component.prototype.set_visible.call(this, v);
			if (v && this._is_created) {
				this._refreshAll();
				if (nexacro._Browser == "Chrome" || (nexacro._Browser == "Edge" && nexacro._BrowserType == "WebKit")) {
					if (this._vscrollmng) {
						this._absolutelyResetScrollPos(true);
						var limit = this._control_element.vscroll_limit;
						var top = this._vscrollmng._pos;
						if (top >= limit) {
							top = limit;
							this._control_element.setElementVScrollPos(top - 1);
						}
						else {
							this._control_element.setElementVScrollPos(top + 1);
						}
						this._control_element.setElementVScrollPos(top);
						this._absolutelyResetScrollPos(false);
					}
				}
			}
		}
	};

	_pGrid.set_autosizebandtype = function (v) {
		if (this.autosizebandtype != v) {
			var error = false;
			switch (v) {
				case "body":
					this._bodyAutoSize = true;
					this._headAutoSize = false;
					this._summAutoSize = false;
					this._AutoSizeLcol = false;
					this._AutoSizeRcol = false;
					break;
				case "head":
					this._bodyAutoSize = false;
					this._headAutoSize = true;
					this._summAutoSize = false;
					this._AutoSizeLcol = false;
					this._AutoSizeRcol = false;
					break;
				case "summary":
					this._bodyAutoSize = false;
					this._headAutoSize = false;
					this._summAutoSize = true;
					this._AutoSizeLcol = false;
					this._AutoSizeRcol = false;
					break;
				case "allband":
					this._bodyAutoSize = true;
					this._headAutoSize = true;
					this._summAutoSize = true;
					this._AutoSizeLcol = true;
					this._AutoSizeRcol = true;
					break;
				case "nohead":
					this._bodyAutoSize = true;
					this._headAutoSize = false;
					this._summAutoSize = true;
					this._AutoSizeLcol = false;
					this._AutoSizeRcol = false;
					break;
				case "noleft":
					this._bodyAutoSize = true;
					this._headAutoSize = true;
					this._summAutoSize = true;
					this._AutoSizeLcol = false;
					this._AutoSizeRcol = true;
					break;
				case "nohead,noleft":
					this._bodyAutoSize = true;
					this._headAutoSize = false;
					this._summAutoSize = true;
					this._AutoSizeLcol = false;
					this._AutoSizeRcol = true;
					break;
				default:
					error = true;
					break;
			}
			if (!error) {
				this.autosizebandtype = v;
				this.on_apply_autosizebandtype();
			}
		}
	};

	_pGrid.on_apply_autosizebandtype = function () {
		if (this.getElement()) {
			this._recreate_contents_all(true, true);
		}
	};

	_pGrid.set_autosizingtype = function (v) {
		if (this.autosizingtype != v) {
			var size = false;
			if (this.extendsizetype == "row" || this.extendsizetype == "both") {
				size = true;
			}

			switch (v) {
				case "none":
				case "col":
					this._rowSizeEx = size;
					break;
				case "row":
				case "both":
					this._rowSizeEx = true;
					break;
			}
			if (v == "row" || v == "none" || !v) {
				if (this._curFormat) {
					var width;
					var bodysize = this._getBodyClientSize();
					var control_elem = this.getElement();

					width = bodysize[0];

					if (control_elem) {
						if (!this._is_created && width <= 0) {
							width = control_elem.client_width;
						}

						this._curFormat._resetOrgColSize(true, this._autofitcol_rate, width);
					}
				}
			}
			this.autosizingtype = v;
		}
		this.on_apply_autosizingtype();
	};

	_pGrid.on_apply_autosizingtype = function () {
		if (this.getElement()) {
			this._isUserChangeHeadRowSize = false;
			this._isUserChangeBodyRowSize = false;
			this._isUserChangeSummRowSize = false;

			this._recreate_contents_all(true, true);
			this._resetFixSize();
		}
	};

	_pGrid.set_readonly = function (v) {
		if (v != null) {
			v = nexacro._toBoolean(v);
			if (v != this.readonly) {
				this.readonly = v;
				this.on_apply_readonly();
			}
		}
	};

	_pGrid.on_apply_readonly = function () {
		var v = this.readonly;

		this._changeStatus("readonly", v);
		if (this._headBand) {
			this._headBand._changeStatus("readonly", v);
		}
		if (this._bodyBand) {
			this._bodyBand._changeStatus("readonly", v);
		}
		if (this._summBand) {
			this._summBand._changeStatus("readonly", v);
		}

		this._refreshAll();
	};

	_pGrid.set_selectbandtype = function (v) {
		if (this.selectbandtype != v) {
			switch (v) {
				case "default":
				case "allband":
				case "body":
				case "nohead":
				case "noleft":
					this.selectbandtype = v;
					this.on_apply_selectbandtype();
					break;
			}
		}
	};

	_pGrid.on_apply_selectbandtype = function () {
	};

	_pGrid.set_selectchangetype = function (v) {
		if (this.selectchangetype != v) {
			switch (v) {
				case "up":
				case "down":
					this.selectchangetype = v;
					break;
			}
		}
	};

	_pGrid.set_selecttype = function (v) {
		if (this.selecttype != v) {
			var oldtype = this._isSelectRowType();
			var newtype;

			switch (v) {
				case "row":
				case "cell":
				case "area":
				case "multirow":
				case "multicell":
				case "multiarea":
				case "treecell":
				case "multitreecell":
					this.selecttype = v;
					newtype = this._isSelectRowType();
					this.on_apply_selecttype(oldtype && !newtype);
					break;
				default:
					if (this.selecttype != "row") {
						this.selecttype = "row";
						newtype = true;
						this.on_apply_selecttype(oldtype && !newtype);
					}
					break;
			}
		}
	};

	_pGrid.on_apply_selecttype = function (refreshrow) {
		this._resetSelect();
		this._refreshBody();

		if (refreshrow && this._mouseovercell) {
			var cell = this._getCurrentBodyCell(this._mouseovercell.row, this._mouseovercell.cell);

			if (cell) {
				this._on_apply_cell_status(cell, "mouseover", false, true);
				this._on_apply_cell_status(cell, "mouseover", true);
			}
		}
		this._updateSelector();
	};

	_pGrid._applySelectorScroll = function (type, area) {
		var oldpos, new_pos, newpos;
		var retn = false;
		var topPos = this._toprowpos[0];
		var ctrl_flag = this._selectinfo.area.length > 1 && this.selecttype == "multirow";

		if (type[0] == "leftover0") {
			this._multiselect = ctrl_flag ? "ctrl" : "shift";
			this._moveToCell("prev", false, true, area, null);
			retn = true;
		}
		else if (type[0] == "rightover0") {
			this._multiselect = ctrl_flag ? "ctrl" : "shift";
			this._moveToCell("next", false, true, area, this._selectinfo.ctrlpoint.col);
			retn = true;
		}
		else if (type[0] == "leftover1") {
			this._multiselect = ctrl_flag ? "ctrl" : "shift";
			this._moveToCell("prev", false, true, area, this._selectinfo.ctrlpoint.col);
			retn = true;
		}
		else if (type[0] == "rightover1") {
			this._multiselect = ctrl_flag ? "ctrl" : "shift";
			this._moveToCell("next", false, true, area, null);
			retn = true;
		}

		if (type[1] == "topover0" || type[1] == "topover1") {
			new_pos = this._selectinfo.currow - 1;
			oldpos = this._begrowpos;
			if (topPos != new_pos) {
				newpos = this._jumpCurrentRow(new_pos);
			}
			retn = (oldpos != newpos);
		}
		else if (type[1] == "bottomover0" || type[1] == "bottomover1") {
			new_pos = this._selectinfo.currow + 1;
			oldpos = this._begrowpos;

			newpos = this._jumpCurrentRow(new_pos);
			retn = (oldpos != newpos);
		}
		return retn;
	};

	_pGrid._startAreaSizing = function (posobj, idx) {
		var format = this._curFormat;
		var subrowlen = format._bodyrows.length;

		var info = this._getAreaInfoWithPos(posobj, idx);
		var cellinfo;

		if (idx == 0) {
			cellinfo = format._bodycells[info.ecell];
			if (cellinfo) {
				this._selectinfo.ctrlpoint._set(cellinfo, info.erow, subrowlen);
			}
		}
		else if (idx == 1) {
			cellinfo = format._bodycells[info.scell];
			if (cellinfo) {
				this._selectinfo.ctrlpoint._set(cellinfo, info.srow, subrowlen);
			}
		}
		else if (idx == 2) {
			cellinfo = format._bodycells[info.ecell];
			if (cellinfo) {
				this._selectinfo.ctrlpoint._set(cellinfo, info.srow, subrowlen);
			}
		}
		else if (idx == 3) {
			cellinfo = format._bodycells[info.scell];
			if (cellinfo) {
				this._selectinfo.ctrlpoint._set(cellinfo, info.erow, subrowlen);
			}
		}
	};

	_pGrid._applyAreaSizing = function (posobj, idx, is_tracking) {
		var beforeCell = this._selectinfo.curcell;
		var beforeCol = this._selectinfo.curcol;
		var beforeRow = this._selectinfo.curdsrow;
		var beforeSubrow = this._selectinfo.cursubrow;
		var beforePvt = this._selectinfo.curpvt;
		var afterCell, afterCol, afterRow, afterSubrow, afterPvt = this._selectinfo.curpvt;

		var info = this._getAreaInfoWithPos(posobj, idx);

		if (idx == 0) {
			this._setSelectedInfo(info.scell, info.scol, info.srow, info.ssubrow, null, info);
			afterCell = info.scell;
			afterCol = info.scol;
			afterRow = info.srow;
			afterSubrow = info.ssubrow;
		}
		else if (idx == 1) {
			this._setSelectedInfo(info.ecell, info.ecol, info.erow, info.esubrow, null, info);
			afterCell = info.ecell;
			afterCol = info.ecol;
			afterRow = info.erow;
			afterSubrow = info.esubrow;
		}
		else if (idx == 2) {
			this._setSelectedInfo(info.scell, info.scol, info.erow, info.esubrow, null, info);
			afterCell = info.scell;
			afterCol = info.scol;
			afterRow = info.erow;
			afterSubrow = info.esubrow;
		}
		else if (idx == 3) {
			this._setSelectedInfo(info.ecell, info.ecol, info.erow, info.esubrow, null, info);
			afterCell = info.ecell;
			afterCol = info.ecol;
			afterRow = info.srow;
			afterSubrow = info.ssubrow;
		}

		var kind;
		if (is_tracking) {
			kind = "selectorsizing";
		}
		else if (is_tracking === false) {
			kind = "selector";
		}
		if (this._selectinfo.area.length > 1 && this.selecttype == "multirow") {
			this._multiselect = "ctrl";
		}
		else {
			this._multiselect = "shift";
		}
		this._ChangeSelect(afterCell, afterCol, afterRow, afterSubrow, afterPvt, false, beforeCell, beforeCol, beforeRow, beforeSubrow, beforePvt, "body", kind);
	};

	_pGrid._getAreaInfoWithPos = function (posobj, idx) {
		var scroll_left = this._getScrollLeft();
		var scroll_top = this._getScrollTop();
		var scroll_max = this._getScollMaxLeft();
		var select_ctrl = this._select_ctrl;

		var scale = this._getCumulativeZoomFactor() / 100.0;


		var wheelZoom = nexacro._getDevicePixelRatio(this.getElement());


		scale = scale *  wheelZoom;

		var l = posobj.l / scale;
		var r = l + posobj.w / scale;
		var t = posobj.t / scale;
		var b = t + posobj.h / scale;

		var format = this._curFormat;
		var rowcnt = this._getGridRowCount();
		var row, srow, erow, scell, ecell, scol, ecol, ssubrow, esubrow, spvt, epvt;
		var cell_left, cell_top, cell_right, cell_bottom;
		var toppos;
		var begarea, endarea;

		if (select_ctrl) {
			begarea = select_ctrl._start_begarea;
			endarea = select_ctrl._start_endarea;
		}
		else {
			begarea = this._selectinfo.arearect.barea;
			endarea = this._selectinfo.arearect.earea;
		}


		var fixed_rowcnt = parseInt(this._fixed_rowcnt);
		var fixed_startrow = fixed_rowcnt > 0 ? parseInt(this._fixed_startrow) : 0;
		var fixed_endrow = parseInt(this._fixed_endrow);

		if (fixed_rowcnt > 0) {
			toppos = this._getHeadHeight();
		}
		else {
			toppos = this._getHeadHeight() - scroll_top;
		}

		if (this.summarytype == "top" || this.summarytype == "lefttop") {
			toppos += this._getSummHeight();
		}

		var row_top, row_bottom;
		var cells = format._bodycells;
		var cells_len = cells.length;
		var col, area;
		var condition;
		var cell_rect;
		srow = -1;

		row_top = toppos;

		for (var i = fixed_startrow; i < rowcnt; i++) {
			if (fixed_rowcnt > 0 && i == (fixed_endrow + 1)) {
				row_top -= scroll_top;
			}
			row_bottom = row_top + this._getRowSize(i);

			if (this._track_mode == "areaselect") {
				condition = (t < row_bottom);
				if (i == 0 && t < row_top) {
					condition = true;
				}
			}
			else {
				condition = (row_top <= t && t < row_bottom);
			}

			var j;
			if (srow < 0 && condition) {
				srow = this._getDataRow(i);

				for (j = 0; j < cells_len; j++) {
					area = cells[j]._area;
					col = cells[j]._col;
					row = cells[j]._row;


					cell_rect = this._getSubCellRect(i, j, -1, -1, false);
					cell_left = cell_rect.left;
					cell_right = cell_rect.right;
					cell_bottom = cell_rect.bottom;

					if (fixed_rowcnt > 0 && i <= fixed_endrow) {
						cell_bottom += scroll_top;
					}

					if (this._track_mode == "areaselect") {
						condition = (cell_left <= l && l < cell_right && t < cell_bottom);
						if (j == 0 && l < cell_left) {
							condition = true;
						}
					}
					else {
						condition = (cell_left <= l && l < cell_right && t < cell_bottom);
					}

					if (condition) {
						if (endarea != begarea || (begarea == "body" && endarea == "body")) {
							if (begarea != "left" && scroll_left > 0 && area == "left") {
								continue;
							}

							if (begarea != "right" && scroll_left < scroll_max && area == "right") {
								continue;
							}

							if (endarea != "right" && area == "right") {
								continue;
							}
						}

						scell = j;
						scol = col;
						ssubrow = row;

						if (posobj.area != "right") {
							break;
						}
						else if (cells[j]._area == "right") {
							break;
						}
					}
				}
			}


			if (this._track_mode == "areaselect") {
				condition = b < row_bottom;

				if ((i + 1) == rowcnt && b >= row_bottom) {
					condition = true;
				}
			}
			else {
				condition = row_top < b && b <= row_bottom;
			}

			if (srow >= 0 && condition) {
				erow = this._getDataRow(i);

				for (j = 0; j < cells_len; j++) {
					col = cells[j]._col;
					row = cells[j]._row;



					cell_rect = this._getSubCellRect(i, j, -1, -1, false);

					cell_top = cell_rect.top;

					if (fixed_rowcnt > 0 && i <= fixed_endrow) {
						cell_top += scroll_top;
					}

					if (cells[j]._area == "right") {
						cell_left = cell_rect.left - scroll_left;
						cell_right = cell_rect.right - scroll_left;
					}
					else {
						cell_left = cell_rect.left;
						cell_right = cell_rect.right;
					}
					if (this._track_mode == "areaselect") {
						condition = cell_left < r && r <= cell_right;
						if ((j + 1) == cells_len && r >= cell_right) {
							condition = true;
						}
					}
					else {
						condition = cell_left < r && r <= cell_right && cell_top < b;
					}

					if (condition) {
						if (endarea != begarea || (begarea == "body" && endarea == "body")) {
							if (endarea != "right" && scroll_left < scroll_max && cells[j]._area == "right") {
								continue;
							}

							if (endarea != "left" && scroll_left > 0 && cells[j]._area == "left") {
								continue;
							}

							if (begarea != "left" && cells[j]._area == "left") {
								continue;
							}
						}

						ecell = j;
						ecol = col;
						esubrow = row;

						if (posobj.area != "right") {
							break;
						}
						else if (cells[j]._area == "right") {
							break;
						}
					}
				}
				break;
			}
			row_top = row_bottom;
		}
		spvt = epvt = this._selectinfo.curpvt;

		return {
			srow : srow, 
			erow : erow, 
			scell : scell, 
			ecell : ecell, 
			scol : scol, 
			ecol : ecol, 
			ssubrow : ssubrow, 
			esubrow : esubrow, 
			spvt : spvt, 
			epvt : epvt
		};
	};

	_pGrid._getSelectRect = function (onlyarea, bApplyFixedRow) {
		if (!this._selectinfo) {
			return null;
		}

		var rect = this._selectinfo.arearect;
		var area = this._selectinfo.area;

		rect.left = 0;
		rect.top = 0;
		rect.width = 0;
		rect.height = 0;
		rect.barea = "";
		rect.earea = "";

		var scroll_left = this._getScrollLeft();
		var scroll_top = this._getScrollTop();

		while (area.length) {
			var areainfo = area[area.length - 1];
			var format = this._curFormat;
			var cols = format._cols;
			var rows = format._bodyrows;
			var subrow_size_list = this._rowSizeListSub;
			var begcol = areainfo.begcol;
			var endcol = areainfo.endcol;
			var bodystart = format.leftWidth;
			var rightstart = this._getClientWidth() - format.rightWidth;

			var fixed_startrow = this._fixed_startrow;

			if (areainfo.begrow < 0) {
				break;
			}

			if (!this._isAreaSelect()) {
				begcol = 0;
				endcol = cols.length - 1;
			}



			if (begcol >= 0 && endcol >= 0) {
				if (onlyarea && cols[begcol]._area != cols[endcol]._area) {
					break;
				}

				rect.barea = cols[begcol]._area;
				rect.earea = cols[endcol]._area;



				if (rect.barea == "right") {
					rect.left = rightstart + cols[begcol].left;
					rect.width = cols[endcol].right - cols[begcol].left;
				}
				else {
					if (rect.barea == "left") {
						rect.left = cols[begcol].left;
					}
					else {
						rect.left = bodystart + cols[begcol].left - scroll_left;
					}

					if (rect.earea == "left") {
						rect.width = cols[endcol].right - rect.left;
					}
					else if (rect.earea == "body") {
						rect.width = (bodystart + cols[endcol].right - scroll_left) - rect.left;
					}
					else {
						rect.width = (rightstart + cols[endcol].right) - rect.left;
					}
				}
			}
			else {
				rect.left = this._getClientLeft();
				rect.width = this._getClientWidth();
			}

			var area_begrow = areainfo.begrow;
			var area_endrow = areainfo.endrow;
			var i;

			for (var row = 0; row <= area_endrow; row++) {
				var s = 0, e = rows.length - 1;

				if (this._hasTree) {
					if (this._getGridRow(row) < -2) {
						continue;
					}
				}

				if (row < area_begrow) {
					if (bApplyFixedRow && row < fixed_startrow) {
						continue;
					}

					for (i = s; i <= e; i++) {
						rect.top += subrow_size_list[row *  rows.length + i];
					}
				}
				else {
					if (row == area_begrow) {
						s = areainfo.begsubrow[0];
					}
					if (row == area_endrow) {
						e = areainfo.endsubrow[row - area_begrow];
					}

					for (i = 0; i <= e; i++) {
						if (i < s) {
							rect.top += subrow_size_list[row *  rows.length + i];
						}
						else {
							rect.height += subrow_size_list[row *  rows.length + i];
						}
					}
				}
			}

			rect.top += this._bodyBand._adjust_top - scroll_top;

			break;
		}
		this._selectinfo.arearect = rect;

		return rect;
	};

	_pGrid._updateSelector = function (mode, pos) {
		var v = this._isAreaSelect() && nexacro._isTouchInteraction;

		if (this._control_element) {
			var rect, l, t, w, h;

			var select_ctrl = this._select_ctrl;
			if (v) {
				if (!select_ctrl) {
					select_ctrl = new nexacro._GridSelector("gridselector", 0, 0, 0, 0, null, null, this);
					select_ctrl._setCallbackFn(this._startAreaSizing, this._applyAreaSizing, this._applySelectorScroll);
					select_ctrl.createComponent();
					select_ctrl._createButton();
					this._select_ctrl = select_ctrl;
				}

				if ((mode == "vscroll" || mode == "hscroll") && !select_ctrl._is_tracking) {
					rect = this._selectinfo.arearect;

					if (mode == "hscroll") {
						if (rect.barea == "left") {
							if (rect.earea == "body") {
								rect.width -= pos;
							}
						}
						else if (rect.barea == "body") {
							rect.left -= pos;

							if (rect.earea == "right") {
								rect.width += pos;
							}
						}
					}
					if (mode == "vscroll") {
						rect.top -= pos;
					}

					l = rect.left;
					t = rect.top;
					w = rect.width;
					h = rect.height;

					if (t + h <= this._bodyBand._adjust_top) {
						v = false;
					}
				}
				else {
					rect = this._getSelectRect(select_ctrl._onlyarea, true);

					l = rect.left;
					t = rect.top;
					w = rect.width;
					h = rect.height;
				}

				if (!l && !t && !w && !h) {
					v = false;
				}

				select_ctrl.move(l, t, w, h, mode);

				if (v) {
					if (!select_ctrl._is_tracking) {
						select_ctrl.set_visible(false);
					}
				}
				else {
					select_ctrl.set_visible(false);
				}
			}
		}
		else {
			if (this._select_ctrl) {
				this._select_ctrl.destroy();
				this._select_ctrl = null;
			}
		}
	};

	_pGrid.set_autoupdatetype = function (v) {
		if (this.autoupdatetype != v) {
			switch (v) {
				case "none":
				case "comboselect":
				case "dateselect":
				case "itemselect":
					this.autoupdatetype = v;
					break;
			}
		}
	};

	_pGrid.set_cellclickbound = function (v) {
		if (this.cellclickbound != v) {
			switch (v) {
				case "control":
				case "cell":
					this.cellclickbound = v;
					break;
			}
		}
	};

	_pGrid.set_cellmovingtype = function (v) {
		if (this.cellmovingtype != v) {
			switch (v) {
				case "none":
				case "col":
				case "col,band":
				case "col,merge":
				case "col,line":
					this.cellmovingtype = v;
					break;
			}
		}
	};

	_pGrid.set_cellsizebandtype = function (v) {
		if (this.cellsizebandtype != v) {
			switch (v) {
				case "body":
				case "allband":
				case "nohead":
				case "noleft":
				case "nohead,noleft":
					this.cellsizebandtype = v;
					this.on_apply_cellsizebandtype();
					break;
			}
		}
	};

	_pGrid.on_apply_cellsizebandtype = function () {
	};

	_pGrid.set_cellsizingtype = function (v) {
		if (this.cellsizingtype != v) {
			switch (v) {
				case "none":
				case "col":
				case "row":
				case "both":
					this.cellsizingtype = v;
					this.on_apply_cellsizingtype();
					break;
			}
		}
	};

	_pGrid.on_apply_cellsizingtype = function () {
		this._applyResizer();
	};

	_pGrid.set_extendsizetype = function (v) {
		if (this.extendsizetype != v) {
			var size = false;
			if (this.autosizingtype == "row" || this.autosizingtype == "both") {
				size = true;
			}

			var error = false;
			switch (v) {
				case "none":
				case "col":
					this._rowSizeEx = size;
					break;
				case "row":
				case "both":
					this._rowSizeEx = true;
					break;
				default:
					error = true;
					break;
			}

			if (!error) {
				this.extendsizetype = v;
				this.on_apply_extendsizetype();
			}
		}
	};

	_pGrid.on_apply_extendsizetype = function () {
		if (this.getElement()) {
			this._recreate_contents_all(true, true);
		}
	};

	_pGrid.set_wheelscrollrow = function (v) {
		if (this.wheelscrollrow != v) {
			this.wheelscrollrow = (isNaN(v) ? 2 : parseInt(v, 10));
		}
	};

	_pGrid.set_usecontrolkey = function (v) {
		if (this.usecontrolkey != v) {
			this.usecontrolkey = v;
		}
	};

	_pGrid.set_treeusebutton = function (v) {
		if (this.treeusebutton != v) {
			switch (v) {
				case "use":
				case "no":
				case "noclick":
					this.treeusebutton = v;
					this.on_apply_treeusebutton();
					break;
			}
		}
	};

	_pGrid.set_dragscrolltype = function (v) {
		nexacro.Form.prototype.set_dragscrolltype.call(this, v);
	};

	_pGrid.on_apply_treeusebutton = function () {
		this._refreshBody();
	};

	_pGrid.set_treeuseline = function (v) {
		if (v != null && this.treeuseline != v) {
			v = nexacro._toBoolean(v);
			this.treeuseline = v;
			this.on_apply_treeuseline();
		}
	};

	_pGrid.on_apply_treeuseline = function () {
		this._refreshBody();
	};

	_pGrid.set_treeusecheckbox = function (v) {
		if (v != null && this.treeusecheckbox != v) {
			v = nexacro._toBoolean(v);
			this.treeusecheckbox = v;
			this.on_apply_treeusecheckbox();
		}
	};

	_pGrid.on_apply_treeusecheckbox = function () {
		this._refreshBody();
	};

	_pGrid.set_treeuseimage = function (v) {
		if (v != null && this.treeuseimage != v) {
			v = nexacro._toBoolean(v);
			this.treeuseimage = v;
			this.on_apply_treeuseimage();
		}
	};

	_pGrid.on_apply_treeuseimage = function () {
		this._refreshBody();
	};

	_pGrid.set_treeuseexpandkey = function (v) {
		if (v != null && this.treeuseexpandkey != v) {
			v = nexacro._toBoolean(v);
			this.treeuseexpandkey = v;
		}
	};

	_pGrid.set_treeinitstatus = function (v) {
		this.treeinitstatus = v;
		var expand, value;
		var error = false;

		switch (v) {
			case "collapse,null":
				expand = false;
				value = false;
				break;
			case "expand,null":
				expand = true;
				value = false;
				break;
			case "collapse,all":
				expand = false;
				value = true;
				break;
			case "expand,all":
				expand = true;
				value = true;
				break;
			default:
				error = true;
				break;
		}

		if (!error) {
			this.on_apply_treeinitstatus(expand, value);
		}
	};

	_pGrid.on_apply_treeinitstatus = function (expand, value) {
		if (!this._hasTree) {
			return;
		}

		var format = this._curFormat;

		if (!format) {
			return;
		}

		var cells = format._bodycells;
		var cellsLen = cells.length;
		var _treeIndexes = this._treeIndexes;
		var _treeStates = this._treeStates;

		if (!_treeIndexes || !_treeStates) {
			return;
		}

		this._org_treeStates = [];

		var update, precnt, state;
		var i, j;

		if (!value) {
			update = false;
			var dsrowidx;

			for (i = _treeIndexes.length - 1; i >= 0; i--) {
				var cellinfo, editType;
				dsrowidx = this.getDatasetRow(i);

				for (j = 0; j < cellsLen; j++) {
					cellinfo = cells[j];
					editType = cellinfo._getEdittype(dsrowidx);

					if (editType == "tree") {
						break;
					}
				}
				if (cellinfo) {
					if (cellinfo.treestate._bindtype != 0) {
						state = cellinfo._getAttrValue(cellinfo.treestate, dsrowidx);
					}
					if (!state && state !== 0) {
						precnt = _treeIndexes.length;
						if (expand) {
							if (this._setTreeState(i, 1, false, "null") > 0) {
								i += (_treeIndexes.length - precnt + 1);
								update = true;
							}
						}
						else {
							if (this._setTreeState(i, 0, false, "null") > 0) {
								update = true;
							}
						}
					}
					else {
						precnt = _treeIndexes.length;

						var s = this._setTreeState(i, state, false, "null_value");
						if (s == 2) {
							if ((_treeIndexes.length - precnt) > 0) {
								i += (_treeIndexes.length - precnt + 1);
							}

							update = true;
						}
						else if (s == 1) {
							update = true;
						}
					}
				}
			}
			if (update == true) {
				this._recreate_contents_all(false, false, true);
			}
		}
		else {
			update = false;

			if (!expand) {
				for (i = _treeIndexes.length - 1; i >= 0; i--) {
					if (this._setTreeState(i, 0, false, "all") > 0) {
						update = true;
					}
				}

				for (i = _treeStates.length - 1; i >= 0; i--) {
					state = this._getOrgTreeStates(i);

					if (state == 2) {
						_treeStates[i] = 2;
					}
				}
			}
			else {
				for (i = 0; i < _treeIndexes.length; i++) {
					if (this._setTreeState(i, 1, false, "all") > 0) {
						update = true;
					}
				}
			}

			if (update == true) {
				if (this.autosizingtype == "col" || this.autosizingtype == "both") {
					this._recreate_contents_all(true, false);
				}
				else {
					this._recreate_contents_all(false, false, true);
				}
			}
		}
	};

	_pGrid.set_treepathdelimiter = function (v) {
		if (this.treepathdelimiter != v) {
			this.treepathdelimiter = v;
		}
	};

	_pGrid.set_useinputpanel = function (v) {
		if (this.useinputpanel != v) {
			this.useinputpanel = v;
		}
	};

	_pGrid.set_usesoftkeyboard = function (v) {
		v = nexacro._toBoolean(v);
		if (v != this.usesoftkeyboard) {
			this.usesoftkeyboard = v;
		}
	};

	_pGrid.on_apply_prop_enable = function (v) {
		this._enable = v;
		nexacro.Component.prototype.on_apply_prop_enable.call(this, v);

		if (this._is_created) {
			var band = this._headBand;
			if (band) {
				band._setEnable(v);
			}
			band = this._bodyBand;
			if (band) {
				band._setEnable(v);
			}
			band = this._summBand;
			if (band) {
				band._setEnable(v);
			}
		}
	};

	_pGrid.on_apply_prop_rtl = function () {
		nexacro.Component.prototype.on_apply_prop_rtl.call(this);
		this._refreshAll();
	};

	_pGrid.createFormat = function () {
		var pDataset = this._binddataset;
		var i;
		var nColCount = 0;

		if (pDataset) {
			nColCount = pDataset.getColCount();
			this.rowcount = this._rowcount = pDataset.rowcount;
			this._rowposition = pDataset.rowposition;
		}

		var strContents;

		if (nColCount > 0) {
			strContents = "<Formats>\n";
			strContents += "<Format id=\"default\">\n";
			strContents += "<Columns>\n";
			{

				for (i = 0; i < nColCount; i++) {
					strContents += "<Column size=\"";
					strContents += "80";
					strContents += "\"/>\n";
				}
			}
			strContents += "</Columns>\n";
			strContents += "<Rows>\n";
			{

				strContents += "<Row band=\"head\" size=\"";
				strContents += "24";
				strContents += "\"/>\n";
				strContents += "<Row band=\"body\" size=\"";
				strContents += "24";
				strContents += "\"/>\n";
			}
			strContents += "</Rows>\n";
			strContents += "<Band id=\"head\">\n";
			{

				for (i = 0; i < nColCount; i++) {
					strContents += "<Cell col=\"";
					strContents += i.toString();
					strContents += "\" displaytype=\"normal\" text=\"";
					strContents += pDataset.getColID(i);
					strContents += "\"/>\n";
				}
			}
			strContents += "</Band>\n";
			strContents += "<Band id=\"body\">\n";
			{

				for (i = 0; i < nColCount; i++) {
					strContents += "<Cell col=\"";
					strContents += i.toString();
					strContents += "\" displaytype=\"normal\" text=\"bind:";
					strContents += pDataset.getColID(i);
					strContents += "\"/>\n";
				}
			}
			strContents += "</Band>\n";
			strContents += "</Format>\n";
			strContents += "</Formats>\n";
		}
		else {
			strContents = "<Formats>\n";
			strContents += "<Format id=\"default\">\n";
			strContents += "</Format>\n";
			strContents += "</Formats>\n";
		}

		this.set_formats(strContents);
		return 0;
	};

	_pGrid.setFormat = function (id) {
		var format = this._formats[id];

		if (format) {
			if (format != this._curFormat) {
				this.set_formatid(id);
				return true;
			}
		}
		else {
			this.formatid = "";
			this._curFormat = null;
			this._clearTempBand();
			this._clearBindTypeFlag();
			this._destroyBands();
		}
		return false;
	};

	_pGrid.getFormatString = function () {
		return this.formats;
	};

	_pGrid.getCurFormatString = function (bOrginal) {
		if (this._curFormat) {
			if (bOrginal) {
				return this._curFormat._getOrgFormatStr();
			}
			else {
				return this._curFormat._getFormatStr();
			}
		}
		else {
			return this.formats;
		}
	};

	_pGrid.getFormatIdList = function () {
		if (!this._format_str) {
			return [];
		}

		var list = [];

		list = list.concat(this._format_str);
		return list;
	};

	_pGrid.getCellPos = function () {
		return this._selectinfo.curcell;
	};

	_pGrid.setCellPos = function (nCellIdx, nRowIdx) {
		if (nRowIdx >= 0) {
			return this._moveToPosCell(nRowIdx, nCellIdx);
		}
		else {
			return this._moveToPosCell(this._selectinfo.curdsrow, nCellIdx);
		}
	};

	_pGrid.getCellCount = function (strBand) {
		if (!this._curFormat) {
			return 0;
		}

		strBand = strBand.toLowerCase();
		var cells;
		if (strBand == "head") {
			cells = this._curFormat._headcells;
		}
		else if (strBand == "summ" || strBand == "summary") {
			cells = this._curFormat._summcells;
		}
		else {
			cells = this._curFormat._bodycells;
		}

		if (cells) {
			return cells.length;
		}
		return 0;
	};

	_pGrid.getCellRect = function (nRow, nCellIdx, nPivotIdx) {
		return this.getSubCellRect(nRow, nCellIdx, -1, nPivotIdx);
	};

	_pGrid.getSubCellRect = function (nRow, nCellIdx, nSubCellIdx, nPivotIdx) {
		return this._getSubCellRect(nRow, nCellIdx, nSubCellIdx, nPivotIdx, true);
	};

	_pGrid._getSubCellRect = function (nRow, nCellIdx, nSubCellIdx, nPivotIdx, bApplyScroll) {
		var rect = {
			"left" : 0, 
			"top" : 0, 
			"right" : 0, 
			"bottom" : 0, 
			"width" : 0, 
			"height" : 0
		};
		rect.left = 0;
		rect.top = 0;
		rect.right = 0;
		rect.bottom = 0;
		rect.width = 0;
		rect.height = 0;

		var cellinfo;
		var k, i, j;
		var size;
		var top;
		var left;
		var right;
		var bottom;
		var _cols;
		var cellinfo_row;
		var cellinfo_col;
		var cellinfo_rowspan;
		var cellinfo_colspan;

		if (nRow >= 0 && nRow < this._rowcount) {
			if (this._curFormat && this._curFormat._bodycells) {
				var parentinfo = null;
				cellinfo = this._curFormat._bodycells[nCellIdx];

				if (cellinfo && nSubCellIdx >= 0) {
					parentinfo = cellinfo;
					cellinfo = cellinfo._subcells[nSubCellIdx];
				}
				if (cellinfo) {
					bottom = this._getHeadHeight();
					_cols = this._curFormat._cols;

					if (this.summarytype == "top" || this.summarytype == "lefttop") {
						bottom += this._getSummHeight();
					}

					var bodyrows = this._curFormat._bodyrows;
					var rowcnt = bodyrows.length;
					var rowcount = this._getGridRowCount();
					cellinfo_row = (parentinfo) ? parentinfo._row + cellinfo._row : cellinfo._row;
					cellinfo_col = (parentinfo) ? parentinfo._col + cellinfo._col : cellinfo._col;
					cellinfo_rowspan = cellinfo._rowspan;
					cellinfo_colspan = cellinfo._colspan;
					var _rowSizeListSub = this._rowSizeListSub;
					var row;

					for (i = 0; i < rowcount; i++) {
						row = i;
						if (this._hasTree) {
							row = this._treeIndexes[row];
						}

						var r = row *  rowcnt;

						if (row == nRow) {
							for (k = 0; k < cellinfo_row; k++) {
								bottom += _rowSizeListSub[r++];
							}
							top = bottom;

							for (j = 0; j < cellinfo_rowspan; j++) {
								bottom += _rowSizeListSub[r++];
							}
							break;
						}
						else {
							for (var jj = 0; jj < rowcnt; jj++) {
								bottom += _rowSizeListSub[r + jj];
							}
						}
					}

					size = 0;
					for (i = 0; i < cellinfo_col; i++) {
						size += _cols[i].size;
					}

					left = size;
					size = 0;

					for (i = 0; i < cellinfo_col + cellinfo_colspan; i++) {
						size += _cols[i].size;
					}

					right = size;

					if (cellinfo._area == "body" || cellinfo._area == "") {
						left -= this._getScrollLeft();
						right -= this._getScrollLeft();
					}

					top -= this._getScrollTop();
					bottom -= this._getScrollTop();

					if (bApplyScroll) {
						if (left < 0) {
							left = 0;
						}
						if (right < 0) {
							right = 0;
						}
						if (top < 0) {
							top = 0;
						}
						if (bottom < 0) {
							bottom = 0;
						}
					}

					rect.left = left;
					rect.right = right;
					rect.top = top;
					rect.bottom = bottom;
					rect.width = right - left;
					rect.height = bottom - top;
				}
			}
		}
		else if (nRow == -1) {
			if (this._curFormat && this._curFormat._headcells) {
				cellinfo = this._curFormat._headcells[nCellIdx];

				if (cellinfo && nSubCellIdx >= 0) {
					cellinfo = cellinfo._subcells[nSubCellIdx];
				}

				if (cellinfo) {
					bottom = 0;
					_cols = this._curFormat._cols;

					var headrows = this._curFormat._headrows;
					cellinfo_row = cellinfo._row;
					cellinfo_col = cellinfo._col;
					cellinfo_rowspan = cellinfo._rowspan;
					cellinfo_colspan = cellinfo._colspan;

					for (k = 0; k < cellinfo_row; k++) {
						bottom += headrows[k].size;
					}

					top = bottom;

					for (k = 0; k < cellinfo_rowspan; k++) {
						bottom += headrows[k + cellinfo_row].size;
					}

					size = 0;
					for (i = 0; i < cellinfo_col; i++) {
						size += _cols[i].size;
					}

					left = size;
					size = 0;

					for (i = 0; i < cellinfo_col + cellinfo_colspan; i++) {
						size += _cols[i].size;
					}

					right = size;

					if (cellinfo._area == "body" || cellinfo._area == "") {
						left -= this._getScrollLeft();
						right -= this._getScrollLeft();
					}
					if (bApplyScroll) {
						if (left < 0) {
							left = 0;
						}
						if (right < 0) {
							right = 0;
						}
					}

					rect.left = left;
					rect.right = right;
					rect.top = top;
					rect.bottom = bottom;
					rect.width = right - left;
					rect.height = bottom - top;
				}
			}
		}
		else if (nRow == -2) {
			if (this._curFormat && this._curFormat._summcells) {
				cellinfo = this._curFormat._summcells[nCellIdx];

				if (cellinfo && nSubCellIdx >= 0) {
					cellinfo = cellinfo._subcells[nSubCellIdx];
				}

				if (cellinfo) {
					bottom = 0;
					_cols = this._curFormat._cols;

					if (this.summarytype == "top" || this.summarytype == "lefttop") {
						bottom += this._getHeadHeight();
					}
					else {
						bottom = this._getClientTop() + this._getClientHeight() - this._getSummHeight();
					}

					var summrows = this._curFormat._summrows;
					cellinfo_row = cellinfo._row;
					cellinfo_col = cellinfo._col;
					cellinfo_rowspan = cellinfo._rowspan;
					cellinfo_colspan = cellinfo._colspan;

					for (k = 0; k < cellinfo_row; k++) {
						bottom += summrows[k].size;
					}

					top = bottom;

					for (k = 0; k < cellinfo_rowspan; k++) {
						bottom += summrows[k + cellinfo_row].size;
					}

					size = 0;
					for (i = 0; i < cellinfo_col; i++) {
						size += _cols[i].size;
					}

					left = size;
					size = 0;

					for (i = 0; i < cellinfo_col + cellinfo_colspan; i++) {
						size += _cols[i].size;
					}

					right = size;

					if (cellinfo._area == "body" || cellinfo._area == "") {
						left -= this._getScrollLeft();
						right -= this._getScrollLeft();
					}
					if (bApplyScroll) {
						if (left < 0) {
							left = 0;
						}
						if (right < 0) {
							right = 0;
						}
					}
					rect.left = left;
					rect.right = right;
					rect.top = top;
					rect.bottom = bottom;
					rect.width = right - left;
					rect.height = bottom - top;
				}
			}
		}
		return rect;
	};

	_pGrid.getCellText = function (nRow, nCellIdx, nPivotIdx) {
		var cellinfo;
		if (nRow >= 0) {
			if (this._curFormat && this._curFormat._bodycells) {
				cellinfo = this._curFormat._bodycells[nCellIdx];
				if (cellinfo) {
					if (this._hasTree) {
						if (nRow < this._treeIndexes.length) {
							nRow = this._treeIndexes[nRow];
							return cellinfo._getDisplayText(nRow);
						}
					}
					else {
						if (nRow < this._rowcount) {
							return cellinfo._getDisplayText(nRow);
						}
					}
				}
			}
		}
		else if (nRow == -1) {
			if (this._curFormat && this._curFormat._headcells) {
				cellinfo = this._curFormat._headcells[nCellIdx];
				if (cellinfo) {
					return cellinfo._getDisplayText(this._currentDSrow);
				}
			}
		}
		else if (nRow == -2) {
			if (this._curFormat && this._curFormat._summcells) {
				cellinfo = this._curFormat._summcells[nCellIdx];
				if (cellinfo) {
					return cellinfo._getDisplayText(this._currentDSrow);
				}
			}
		}
	};

	_pGrid.getCellValue = function (nRow, nCellIdx, nPivotIdx) {
		if (nPivotIdx == undefined) {
			nPivotIdx = 0;
		}

		var cellinfo;
		if (nRow >= 0) {
			if (this._curFormat && this._curFormat._bodycells) {
				cellinfo = this._curFormat._bodycells[nCellIdx];
				if (cellinfo) {
					if (this._hasTree) {
						if (nRow < this._treeIndexes.length) {
							nRow = this._treeIndexes[nRow];
							return cellinfo._getValue(nRow, true);
						}
					}
					else {
						if (nRow < this._rowcount) {
							return cellinfo._getValue(nRow, true);
						}
					}
				}
			}
		}
		else if (nRow == -1) {
			if (this._curFormat && this._curFormat._headcells) {
				cellinfo = this._curFormat._headcells[nCellIdx];
				if (cellinfo) {
					return cellinfo._getValue(this._currentDSrow, true);
				}
			}
		}
		else if (nRow == -2) {
			if (this._curFormat && this._curFormat._summcells) {
				cellinfo = this._curFormat._summcells[nCellIdx];
				if (cellinfo) {
					return cellinfo._getValue(this._currentDSrow, true);
				}
			}
		}
	};

	_pGrid.getSubCellCount = function (strBand, nCellIdx) {
		var format = this._curFormat;
		strBand = strBand.toLowerCase();

		if (format) {
			var cells;
			if (strBand == "head") {
				cells = format._headcells;
			}
			else if (strBand == "summ" || strBand == "summary") {
				cells = format._summcells;
			}
			else {
				cells = format._bodycells;
			}
			if (cells && cells.length > nCellIdx && nCellIdx >= 0) {
				var cell = cells[nCellIdx];
				return cell._subcells.length;
			}
		}
		return 0;
	};

	_pGrid.getSubCellProperty = function (strBand, nCellIdx, nSubCellIdx, strPropID) {
		var format = this._curFormat;

		if (!format) {
			return undefined;
		}

		return format.getSubCellProperty(strBand, nCellIdx, nSubCellIdx, strPropID);
	};

	_pGrid.getSubCellText = function (nRow, nCellIdx, nSubCellIdx, nPivotIdx) {
		var cellinfo;
		if (nRow >= 0) {
			if (this._curFormat && this._curFormat._bodycells) {
				if (nCellIdx >= 0 && nCellIdx < this._curFormat._bodycells.length) {
					cellinfo = this._curFormat._bodycells[nCellIdx];
					if (cellinfo && nSubCellIdx >= 0 && nSubCellIdx < cellinfo._subcells.length) {
						if (this._hasTree) {
							if (nRow < this._treeIndexes.length) {
								nRow = this._treeIndexes[nRow];
								return cellinfo._subcells[nSubCellIdx]._getDisplayText(nRow);
							}
						}
						else {
							if (nRow < this._rowcount) {
								return cellinfo._subcells[nSubCellIdx]._getDisplayText(nRow);
							}
						}
					}
				}
			}
		}
		else if (nRow == -1) {
			if (this._curFormat && this._curFormat._headcells) {
				cellinfo = this._curFormat._headcells[nCellIdx];
				if (cellinfo && nSubCellIdx >= 0 && nSubCellIdx < cellinfo._subcells.length) {
					return cellinfo._subcells[nSubCellIdx]._getDisplayText(this._currentDSrow);
				}
			}
		}
		else if (nRow == -2) {
			if (this._curFormat && this._curFormat._summcells) {
				cellinfo = this._curFormat._summcells[nCellIdx];
				if (cellinfo && nSubCellIdx >= 0 && nSubCellIdx < cellinfo._subcells.length) {
					return cellinfo._subcells[nSubCellIdx]._getDisplayText(this._currentDSrow);
				}
			}
		}
	};

	_pGrid.getSubCellValue = function (nRow, nCellIdx, nSubCellIdx, nPivotIdx) {
		var cellinfo;
		if (nRow >= 0) {
			if (this._curFormat && this._curFormat._bodycells) {
				if (nCellIdx >= 0 && nCellIdx < this._curFormat._bodycells.length) {
					cellinfo = this._curFormat._bodycells[nCellIdx];
					if (cellinfo && nSubCellIdx >= 0 && nSubCellIdx < cellinfo._subcells.length) {
						if (this._hasTree) {
							if (nRow < this._treeIndexes.length) {
								nRow = this._treeIndexes[nRow];
								return cellinfo._subcells[nSubCellIdx]._getValue(nRow);
							}
						}
						else {
							if (nRow < this._rowcount) {
								return cellinfo._subcells[nSubCellIdx]._getValue(nRow);
							}
						}
					}
				}
			}
		}
		else if (nRow == -1) {
			if (this._curFormat && this._curFormat._headcells) {
				cellinfo = this._curFormat._headcells[nCellIdx];
				if (cellinfo && nSubCellIdx >= 0 && nSubCellIdx < cellinfo._subcells.length) {
					return cellinfo._subcells[nSubCellIdx]._getValue(this._currentDSrow);
				}
			}
		}
		else if (nRow == -2) {
			if (this._curFormat && this._curFormat._summcells) {
				cellinfo = this._curFormat._summcells[nCellIdx];
				if (cellinfo && nSubCellIdx >= 0 && nSubCellIdx < cellinfo._subcells.length) {
					return cellinfo._subcells[nSubCellIdx]._getValue(this._currentDSrow);
				}
			}
		}
	};

	_pGrid.setSubCellProperty = function (strBand, nCellIdx, nSubCellIdx, strPropID, varValue) {
		var format = this._curFormat;

		if (!format) {
			return false;
		}

		var cellinfo = format.setSubCellProperty(strBand, nCellIdx, nSubCellIdx, strPropID, varValue);
		if (cellinfo) {
			this._refreshCell(strBand, nCellIdx, -1, strPropID, nSubCellIdx);
		}

		return (cellinfo != null);
	};

	_pGrid.setFormatColProperty = function (nColIdx, strPropID, nValue) {
		if (strPropID && this._curFormat) {
			strPropID = strPropID.toLowerCase();
			if (this._curFormat.setFormatColProperty(nColIdx, strPropID, nValue)) {
				this._clearBindTypeFlag();

				if (strPropID == "band") {
					this._autofitcol_rate = [];
					this._recreate();
				}
				else if (strPropID == "size") {
					if (this.enableredraw) {
						this._updateColSize(nColIdx);
					}
					else {
						this._autofitcol_rate = [];
						if (!this._enable_redraw_history.updatecolsize) {
							this._enable_redraw_history.updatecolsize = [];
						}

						this._enable_redraw_history.updatecolsize.push(nColIdx);
					}
				}
				else {
					this._recreate_contents_all(false, false);
				}
				return true;
			}
		}
		return false;
	};

	_pGrid.setFormatRowProperty = function (nRowIdx, strPropID, nValue) {
		if (strPropID && this._curFormat) {
			strPropID = strPropID.toLowerCase();
			if (this._curFormat.setFormatRowProperty(nRowIdx, strPropID, nValue)) {
				this._clearBindTypeFlag();

				if (strPropID == "band" || strPropID == "size") {
					this._isUserChangeHeadRowSize = false;
					this._isUserChangeSummRowSize = false;
					this._isUserChangeBodyRowSize = false;
					this._recreate();
				}
				else {
					this._recreate_contents_all(false, false);
				}
				return true;
			}
		}
		return false;
	};

	_pGrid.getFormatColProperty = function (nCollIdx, strPropId) {
		if (this._curFormat) {
			return this._curFormat.getFormatColProperty(nCollIdx, strPropId);
		}

		return null;
	};

	_pGrid.getFormatRowProperty = function (nRowIdx, strPropId) {
		if (this._curFormat) {
			return this._curFormat.getFormatRowProperty(nRowIdx, strPropId);
		}

		return null;
	};

	_pGrid.getFormatColCount = function () {
		if (this._curFormat) {
			return this._curFormat._cols.length;
		}
		return 0;
	};

	_pGrid.getFormatRowCount = function () {
		if (this._curFormat) {
			var format = this._curFormat;
			var rowcnt = 0;

			if (format._headrows) {
				rowcnt += format._headrows.length;
			}
			if (format._bodyrows) {
				rowcnt += format._bodyrows.length;
			}
			if (format._summrows) {
				rowcnt += format._summrows.length;
			}

			return rowcnt;
		}
		return 0;
	};

	_pGrid.getFormatColSize = function (nColIdx) {
		if (this._curFormat) {
			if (this._curFormat._cols.length > 0 && this._curFormat._cols.length > nColIdx) {
				var col = this._curFormat._cols[nColIdx];
				if (col) {
					return col.orgsize;
				}
			}
		}
		return -1;
	};

	_pGrid.getFormatRowSize = function (nRowIdx) {
		if (this._curFormat) {
			if (nRowIdx < 0) {
				return -1;
			}

			var top = 0;
			var rows = this._curFormat._headrows;
			var row;

			if (rows) {
				if (rows.length > nRowIdx) {
					row = rows[nRowIdx];
					return row.orgsize;
				}
				top += rows.length;
			}

			if (this.summarytype == "top" || this.summarytype == "lefttop") {
				rows = this._curFormat._summrows;
				if (rows) {
					if (rows.length + top > nRowIdx) {
						row = rows[nRowIdx - top];
						return row.orgsize;
					}
					top += rows.length;
				}
				rows = this._curFormat._bodyrows;
				if (rows) {
					if (rows.length + top > nRowIdx) {
						row = rows[nRowIdx - top];
						return row.orgsize;
					}
				}
			}
			else {
				rows = this._curFormat._bodyrows;
				if (rows) {
					if (rows.length + top > nRowIdx) {
						row = rows[nRowIdx - top];
						return row.orgsize;
					}
					top += rows.length;
				}
				rows = this._curFormat._summrows;
				if (rows) {
					if (rows.length + top > nRowIdx) {
						row = rows[nRowIdx - top];
						return row.orgsize;
					}
				}
			}
		}
		return -1;
	};

	_pGrid._isUserChangeHeadRowSize = false;
	_pGrid._isUserChangeBodyRowSize = false;
	_pGrid._isUserChangeSummRowSize = false;
	_pGrid._isUserChangeColSize = false;

	_pGrid.setRealColSize = function (enumband, nColIndex, nSize, bBandIndex) {
		this._isUserChangeColSize = true;

		if (enumband && bBandIndex) {
			return this._setColSize(enumband, nColIndex, nSize, true, true);
		}
		else {
			return this._setColSize(-9, nColIndex, nSize, false, true);
		}
	};

	_pGrid.setRealRowSize = function (nRowIndex, nSize, nSubRowIndex, bBandIndex) {
		var format = this._curFormat;

		if (bBandIndex == undefined) {
			bBandIndex = true;
		}

		var band = "none";
		if (bBandIndex) {
			if (nRowIndex >= 0) {
				band = "body";
			}
			else if (nRowIndex == -1) {
				band = "head";
			}
			else if (nRowIndex == -2) {
				band = "summ";
			}
		}
		else {
			if (format._headrows) {
				if (nRowIndex < format._headrows.length) {
					band = "head";
				}
				else {
					nRowIndex -= format._headrows.length;
				}
			}

			if (band == "none") {
				if (this.summarytype == "top" || this.summarytype == "lefttop") {
					if (format._summrows) {
						if (nRowIndex < format._summrows.length) {
							band = "summ";
						}
						else {
							nRowIndex -= format._headrows.length;
						}
					}
					if (band == "none") {
						band = "body";
					}
				}
				else {
					if (format._bodyrows) {
						var length = (this._hasTree) ? this._treeIndexes.length : this._rowcount;
						if (nRowIndex < length) {
							band = "body";
						}
						else {
							nRowIndex -= length;
						}
					}
					if (band == "none") {
						if (format._summrows) {
							if (nRowIndex < format._summrows.length) {
								band = "summ";
							}
						}
					}
				}
			}
		}

		var change = false;
		var index, oldsize, newsize;
		var rows;
		var rowsLen;
		var _rowSizeList;
		var _rowSizeListSub;
		var i;

		if (band == "body") {
			if (format && format._bodyrows) {
				var nRow = nRowIndex;
				if (this._hasTree) {
					if (nRow >= this._treeIndexes.length) {
						return false;
					}

					nRow = this._treeIndexes[nRow];
				}
				else {
					if (nRow >= this._rowcount) {
						return false;
					}
				}

				rows = format._bodyrows;
				rowsLen = rows.length;
				_rowSizeList = this._rowSizeList;
				_rowSizeListSub = this._rowSizeListSub;

				if (nSubRowIndex >= 0) {
					if (nSubRowIndex < rowsLen) {
						this._is_variable_bodyrowsize = true;

						index = (nRow *  rowsLen) + nSubRowIndex;
						oldsize = _rowSizeListSub[index];
						newsize = nSize;

						if (oldsize != newsize) {
							_rowSizeListSub[index] = newsize;
							_rowSizeList[nRow] += (newsize - oldsize);
							change = true;

							this._updateRowSizeExtendEx(format._bodyrows, _rowSizeList, _rowSizeListSub, nRow, true);

							if (this.enableredraw) {
								if (this.extendsizetype != "row" && this.extendsizetype != "both") {
									if (this._isDownActionKeyMouse()) {
										nexacro._OnceCallbackTimer.callonce(this, function () {
											if (this._bodyBand) {
												this._bodyBand._recreate_contents();
											}
										});
									}
									else {
										if (this._bodyBand) {
											this._bodyBand._recreate_contents();
										}
									}
								}
								else {
									this._updateRowSize(nRowIndex, nSubRowIndex);
								}
							}
							else {
								if (this.extendsizetype != "row" && this.extendsizetype != "both") {
									this._enable_redraw_history.recreate_body = true;
								}
								else {
									if (!this._enable_redraw_history.updaterowsize) {
										this._enable_redraw_history.updaterowsize = [];
									}

									this._enable_redraw_history.updaterowsize.push([nRowIndex, nSubRowIndex]);
								}
							}
							this._isUserChangeBodyRowSize = true;
						}
					}
					else {
						return false;
					}
				}
				else {
					if (nRow < _rowSizeList.length) {
						this._is_variable_bodyrowsize = true;

						for (i = 0; i < rowsLen; i++) {
							index = (nRow *  rowsLen) + i;
							oldsize = _rowSizeListSub[index];
							newsize = nSize;

							if (oldsize != newsize) {
								_rowSizeListSub[index] = newsize;
								_rowSizeList[nRow] += (newsize - oldsize);
								change = true;
							}
						}

						if (change) {
							this._updateRowSizeExtendEx(format._bodyrows, _rowSizeList, _rowSizeListSub, nRow, true);

							if (this.enableredraw) {
								if (this._isDownActionKeyMouse()) {
									nexacro._OnceCallbackTimer.callonce(this, function () {
										if (this._bodyBand) {
											this._bodyBand._recreate_contents();
										}
									});
								}
								else {
									if (this._bodyBand) {
										this._bodyBand._recreate_contents();
									}
								}
							}
							else {
								this._enable_redraw_history.recreate_body = true;
							}
							this._isUserChangeBodyRowSize = true;
						}
					}
					else {
						return false;
					}
				}
			}
		}
		else if (band == "head") {
			if (format && format._headrows) {
				rows = format._headrows;
				rowsLen = rows.length;
				_rowSizeList = this._rowHeadList;
				_rowSizeListSub = this._rowHeadListSub;

				if (nSubRowIndex >= 0) {
					if (nSubRowIndex < rowsLen) {
						index = nSubRowIndex;
						oldsize = _rowSizeListSub[index];
						newsize = nSize;

						if (oldsize != newsize) {
							_rowSizeListSub[index] = newsize;
							_rowSizeList[0] += (newsize - oldsize);
							change = true;
							this._updateRowSizeExtendEx(format._headrows, _rowSizeList, _rowSizeListSub, 0);
						}
					}
					else {
						return false;
					}
				}
				else {
					for (i = 0; i < rowsLen; i++) {
						index = i;
						oldsize = _rowSizeListSub[index];
						newsize = nSize;

						if (oldsize != newsize) {
							_rowSizeListSub[index] = newsize;
							_rowSizeList[0] += (newsize - oldsize);
							change = true;
						}
					}

					if (change == true) {
						this._updateRowSizeExtendEx(format._headrows, _rowSizeList, _rowSizeListSub, 0);
					}
				}

				if (change) {
					if (this.enableredraw) {
						if (this._isDownActionKeyMouse()) {
							nexacro._OnceCallbackTimer.callonce(this, function () {
								if (this._headBand) {
									this._headBand._recreate_contents();
								}

								this._resizeBand();
							});
						}
						else {
							if (this._headBand) {
								this._headBand._recreate_contents();
							}

							this._resizeBand();
						}
					}
					else {
						this._enable_redraw_history.recreate_head = true;
						this._enable_redraw_history.resize_band = true;
					}
					this._isUserChangeHeadRowSize = true;
				}
			}
		}
		else if (band == "summ") {
			if (format && format._summrows) {
				rows = format._summrows;
				rowsLen = rows.length;
				_rowSizeList = this._rowSummList;
				_rowSizeListSub = this._rowSummListSub;

				if (nSubRowIndex >= 0) {
					if (nSubRowIndex < rowsLen) {
						index = nSubRowIndex;
						oldsize = _rowSizeListSub[index];
						newsize = nSize;

						if (oldsize != newsize) {
							_rowSizeListSub[index] = newsize;
							_rowSizeList[0] += (newsize - oldsize);
							change = true;
							this._updateRowSizeExtendEx(format._summrows, _rowSizeList, _rowSizeListSub, 0);
						}
					}
					else {
						return false;
					}
				}
				else {
					for (i = 0; i < rowsLen; i++) {
						index = i;
						oldsize = _rowSizeListSub[index];
						newsize = nSize;

						if (oldsize != newsize) {
							_rowSizeListSub[index] = newsize;
							_rowSizeList[0] += (newsize - oldsize);
							change = true;
						}
					}

					if (change == true) {
						this._updateRowSizeExtendEx(format._summrows, _rowSizeList, _rowSizeListSub, 0);
					}
				}

				if (change == true) {
					if (this.enableredraw) {
						if (this._isDownActionKeyMouse()) {
							nexacro._OnceCallbackTimer.callonce(this, function () {
								if (this._summBand) {
									this._summBand._recreate_contents();
								}

								this._resizeBand();
							});
						}
						else {
							if (this._summBand) {
								this._summBand._recreate_contents();
							}

							this._resizeBand();
						}
					}
					else {
						this._enable_redraw_history.recreate_summ = true;
						this._enable_redraw_history.resize_band = true;
					}
					this._isUserChangeSummRowSize = true;
				}
			}
		}

		if (change) {
			this._resetScrollMax();
		}

		return change;
	};

	_pGrid.getRealColSize = function (nColIndex, bBandIndex) {
		var format = this._curFormat;

		var leftcnt = this._getColFixCnt("left");
		var bodycnt = this._getColFixCnt("body");
		var _cols = format._cols;
		var _colsLen = _cols.length;


		if (bBandIndex == true) {
			if (nColIndex >= 0) {
				nColIndex += leftcnt;
			}
			else if (nColIndex == -2) {
				nColIndex += leftcnt;
				nColIndex += bodycnt;
			}

			if (_colsLen <= nColIndex) {
				return -1;
			}
		}
		return _cols[nColIndex].size;
	};

	_pGrid.getRealRowSize = function (nRowIndex, nSubRowIndex, bBandIndex) {
		var format = this._curFormat;

		if (bBandIndex == undefined) {
			bBandIndex = true;
		}
		var rows;
		var band = "none";

		if (bBandIndex) {
			if (nRowIndex >= 0) {
				band = "body";
			}
			else if (nRowIndex == -1) {
				band = "head";
			}
			else if (nRowIndex == -2) {
				band = "summ";
			}
		}
		else {
			if (format._headrows) {
				if (nRowIndex < format._headrows.length) {
					band = "head";
				}
				else {
					nRowIndex -= format._headrows.length;
				}
			}

			if (band == "none") {
				if (this.summarytype == "top" || this.summarytype == "lefttop") {
					if (format._summrows) {
						if (nRowIndex < format._summrows.length) {
							band = "summ";
						}
						else {
							nRowIndex -= format._headrows.length;
						}
					}
					if (band == "none") {
						band = "body";
					}
				}
				else {
					if (format._bodyrows) {
						var length = (this._hasTree) ? this._treeIndexes.length : this._rowcount;
						if (nRowIndex < length) {
							band = "body";
						}
						else {
							nRowIndex -= length;
						}
					}
					if (band == "none") {
						if (format._summrows) {
							if (nRowIndex < format._summrows.length) {
								band = "summ";
							}
						}
					}
				}
			}
		}

		if (band == "body") {
			if (format && format._bodyrows) {
				var nRow = nRowIndex;
				if (this._hasTree) {
					if (nRow >= this._treeIndexes.length) {
						return 0;
					}
					nRow = this._treeIndexes[nRow];
				}
				else {
					if (nRow >= this._rowcount) {
						return 0;
					}
				}

				rows = format._bodyrows;

				if (nSubRowIndex >= 0) {
					if (nSubRowIndex < rows.length) {
						return this._rowSizeListSub[nRow *  rows.length + nSubRowIndex];
					}
					else {
						return 0;
					}
				}
				else {
					if (nRow < this._rowSizeList.length) {
						return this._rowSizeList[nRow];
					}
					else {
						return 0;
					}
				}
			}
		}
		else if (band == "head") {
			if (format && format._headrows) {
				rows = format._headrows;

				if (nSubRowIndex >= 0) {
					if (nSubRowIndex < rows.length) {
						return this._rowHeadListSub[nSubRowIndex];
					}
					else {
						return 0;
					}
				}
				else {
					return this._rowHeadList[0];
				}
			}
		}
		else if (band == "summ") {
			if (format && format._summrows) {
				rows = format._summrows;

				if (nSubRowIndex >= 0) {
					if (nSubRowIndex < rows.length) {
						return this._rowSummListSub[nSubRowIndex];
					}
					else {
						return 0;
					}
				}
				else {
					return this._rowSummList[0];
				}
			}
		}
		return 0;
	};

	_pGrid.getRealColFullSize = function (strBand) {
		var i, leftcnt, size = 0;
		var bodycnt;
		var rightcnt;

		if (!strBand) {
			leftcnt = this._getColFixCnt("left");
			for (i = 0; i < leftcnt; i++) {
				size += this.getRealColSize(i);
			}

			bodycnt = this._getColFixCnt("body");

			for (i = 0; i < bodycnt; i++) {
				size += this.getRealColSize(leftcnt + i);
			}

			rightcnt = this._getColFixCnt("right");
			for (i = 0; i < rightcnt; i++) {
				size += this.getRealColSize(leftcnt + bodycnt + i);
			}
		}
		else {
			strBand = strBand.toLowerCase();
			if (strBand == "left") {
				leftcnt = this._getColFixCnt("left");
				for (i = 0; i < leftcnt; i++) {
					size += this.getRealColSize(i);
				}
			}
			else if (strBand == "body") {
				leftcnt = this._getColFixCnt("left");
				bodycnt = this._getColFixCnt("body");
				for (i = 0; i < bodycnt; i++) {
					size += this.getRealColSize(leftcnt + i);
				}
			}
			else if (strBand == "right") {
				leftcnt = this._getColFixCnt("left");
				bodycnt = this._getColFixCnt("body");
				rightcnt = this._getColFixCnt("right");
				for (i = 0; i < rightcnt; i++) {
					size += this.getRealColSize(leftcnt + bodycnt + i);
				}
			}
		}
		return size;
	};

	_pGrid.getRealRowFullSize = function (strBand) {
		var length;
		var i;
		var size;

		if (!strBand) {
			length = (this._hasTree) ? this._treeIndexes.length : this._rowcount;
			size = 0;

			for (i = 0; i < length; i++) {
				size += this.getRealRowSize(i);
			}

			size += this.getRealRowSize(-1);
			size += this.getRealRowSize(-2);
			return size;
		}
		else {
			strBand = strBand.toLowerCase();
			if (strBand == "body") {
				length = (this._hasTree) ? this._treeIndexes.length : this._rowcount;
				size = 0;
				for (i = 0; i < length; i++) {
					size += this.getRealRowSize(i);
				}

				return size;
			}
			else if (strBand == "head") {
				return this.getRealRowSize(-1);
			}
			else if (strBand == "summ" || strBand == "summary") {
				return this.getRealRowSize(-2);
			}
		}
		return 0;
	};

	_pGrid.__createDefualtColFormat = function (band) {
		var strContents;

		strContents = "<Formats>\n";
		strContents += "<Format id=\"default\">\n";
		strContents += "<Columns>\n";
		strContents += "<Column size=\"40\"/>\n";
		strContents += "</Columns>\n";

		if (band == "head") {
			strContents += "<Rows>\n";
			strContents += "<Row size=\"24\" band=\"head\"/>";
			strContents += "</Rows>\n";
			strContents += "<Band id=\"head\">\n";
			strContents += "<Cell/>\n";
			strContents += "</Band>\n";
		}
		else if (band == "summ" || band == "summary") {
			strContents += "<Rows>\n";
			strContents += "<Row size=\"24\" band=\"summ\"/>";
			strContents += "</Rows>\n";
			strContents += "<Band id=\"summary\">\n";
			strContents += "<Cell/>\n";
			strContents += "</Band>\n";
		}
		else if (band == "body") {
			strContents += "<Rows>\n";
			strContents += "<Row size=\"24\" band=\"body\"/>";
			strContents += "</Rows>\n";
			strContents += "<Band id=\"body\">\n";
			strContents += "<Cell/>\n";
			strContents += "</Band>\n";
		}

		strContents += "</Format>\n";
		strContents += "</Formats>\n";

		this.set_formats(strContents);

		return 0;
	};

	_pGrid.appendContentsRow = function (strBand, bBandAppend) {
		if (!strBand) {
			strBand = "body";
		}

		if (typeof (strBand) == "number") {
			if (strBand == -1) {
				strBand = "head";
			}
			else if (strBand == -2) {
				strBand = "summ";
			}
			else if (strBand >= 0) {
				strBand = "body";
			}
		}

		strBand = strBand.toLowerCase();

		if (!this._curFormat) {
			return this.__createDefualtColFormat(strBand);
		}

		if (bBandAppend == undefined) {
			bBandAppend = true;
		}

		if (bBandAppend == false) {
			strBand = this._getLastRowBand();
		}

		var row = this._curFormat.appendContentsRow(strBand, bBandAppend);
		var rows;

		if (row >= 0) {
			this._clearTempBand();
			this._clearBindTypeFlag();
			this._recreate();
			this._initSelect();

			if (strBand == "body" || strBand >= 0) {
				if (rows = this._curFormat._headrows) {
					row += rows.length;
				}
				if (this.summarytype == "top" || this.summarytype == "lefttop") {
					if (rows = this._curFormat._summrows) {
						row += rows.length;
					}
				}
			}
			else if (strBand == "summ" || strBand == "summary" || strBand == -2) {
				if (rows = this._curFormat._headrows) {
					row += rows.length;
				}
				if (this.summarytype != "top" && this.summarytype != "lefttop") {
					if (rows = this._curFormat._bodyrows) {
						row += rows.length;
					}
				}
			}
		}
		return row;
	};

	_pGrid.appendContentsCol = function (strBand, bBandAppend) {
		if (!this._curFormat || (!isNaN(parseInt(strBand)) && strBand < -2) || this.getFormatRowCount() == 0) {
			return -1;
		}

		this._autofitcol_rate = [];
		var col = this._curFormat.appendContentsCol(strBand, bBandAppend);

		if (col >= 0) {
			this._clearTempBand();
			this._clearBindTypeFlag();
			this._recreate();
		}

		return col;
	};

	_pGrid.insertContentsRow = function (strBand, nSubRowIndex, bBandIndex) {
		if (!this._curFormat) {
			return -1;
		}

		if (arguments.length == 1) {
			nSubRowIndex = strBand;
			strBand = "body";
		}
		var row = this._curFormat.insertContentsRow(strBand, nSubRowIndex, bBandIndex);
		var rows;

		if (row >= 0) {
			this._clearTempBand();
			this._clearBindTypeFlag();
			this._recreate();

			if (strBand == "body" || strBand >= 0) {
				if (rows = this._curFormat._headrows) {
					row += rows.length;
				}
				if (this.summarytype == "top" || this.summarytype == "lefttop") {
					if (rows = this._curFormat._summrows) {
						row += rows.length;
					}
				}
			}
			else if (strBand == "summ" || strBand == "summary" || strBand == -2) {
				if (rows = this._curFormat._headrows) {
					row += rows.length;
				}
				if (this.summarytype != "top" && this.summarytype != "lefttop") {
					if (rows = this._curFormat._bodyrows) {
						row += rows.length;
					}
				}
			}
		}
		return row;
	};

	_pGrid.insertContentsCol = function (strBand, nColIndex, bBandIndex) {
		if (!this._curFormat) {
			return -1;
		}

		this._autofitcol_rate = [];
		var col = this._curFormat.insertContentsCol(strBand, nColIndex, bBandIndex);

		if (col >= 0) {
			this._clearTempBand();
			this._clearBindTypeFlag();
			this._recreate();
		}

		return col;
	};

	_pGrid.deleteContentsRow = function (strBand, nSubRowIndex, bBandIndex) {
		if (!this._curFormat) {
			return -1;
		}

		if (arguments.length == 1) {
			nSubRowIndex = strBand;
			strBand = "body";
		}
		var row = this._curFormat.deleteContentsRow(strBand, nSubRowIndex, bBandIndex);

		if (row >= 0) {
			this._clearTempBand();
			this._clearBindTypeFlag();
			this._recreate();
		}

		return row;
	};

	_pGrid.deleteContentsCol = function (strBand, nColIndex, bBandIndex) {
		if (!this._curFormat) {
			return -1;
		}

		this._autofitcol_rate = [];
		var col = this._curFormat.deleteContentsCol(strBand, nColIndex, bBandIndex);

		if (col >= 0) {
			this._clearTempBand();
			this._clearBindTypeFlag();
			this._recreate();
		}

		return col;
	};

	_pGrid.mergeContentsCell = function (strBand, nStartRow, nStartCol, nEndRow, nEndCol, nFirstCell, bKeepSubCell) {
		if (!this._curFormat) {
			return -1;
		}

		bKeepSubCell = nexacro._toBoolean(bKeepSubCell);
		var cell = this._curFormat.mergeContentsCell(strBand, nStartRow, nStartCol, nEndRow, nEndCol, nFirstCell, bKeepSubCell);

		if (cell >= 0) {
			this._clearTempBand();
			this._clearBindTypeFlag();
			this._recreate();
		}

		return cell;
	};

	_pGrid.splitContentsCell = function (strBand, nStartRow, nStartCol, nEndRow, nEndCol, bMakeSubCell) {
		if (!this._curFormat) {
			return -1;
		}
		else {
			bMakeSubCell = nexacro._toBoolean(bMakeSubCell);
			var cell = this._curFormat.splitContentsCell(strBand, nStartRow, nStartCol, nEndRow, nEndCol, bMakeSubCell);

			if (cell > 0) {
				this._clearTempBand();
				this._clearBindTypeFlag();
				this._recreate();
			}
			return cell;
		}
	};

	_pGrid.setBandProperty = function (strBand, strPropID, varValue) {
		var format = this._curFormat;

		if (!format) {
			return false;
		}

		strBand = strBand.toLowerCase();

		var bandinfo = format.setBandProperty(strBand, strPropID, varValue);
		if (bandinfo) {
			strBand = strBand.toLowerCase();

			var pre = strPropID.substr(0, 13).toLowerCase();
			var band;

			if (pre == "accessibility") {
				if (strBand == "body") {
					band = this._bodyBand;
					band["set_" + strPropID](varValue);
				}
				else if (strBand == "head") {
					band = this._headBand;
					band["set_" + strPropID](varValue);
				}
				else {
					band = this._summBand;
					band["set_" + strPropID](varValue);
				}
			}
			else {
				if (strBand == "body") {
					this._refreshBody(true);
				}
				else if (strBand == "head") {
					this._refreshHead(true);
				}
				else {
					this._refreshSumm(true);
				}
			}
		}
		return (bandinfo != null);
	};

	_pGrid.getBandProperty = function (strBand, strPropID) {
		var format = this._curFormat;

		if (!format) {
			return null;
		}

		strBand = strBand.toLowerCase();

		return format.getBandProperty(strBand, strPropID);
	};

	_pGrid.setCellProperty = function (strBand, nCellIdx, strPropID, varValue) {
		var format = this._curFormat;

		if (!format) {
			return false;
		}

		strBand = strBand.toLowerCase();

		var cells, cellcnt, cellinfo2;
		var cellinfo = format.setCellProperty(strBand, nCellIdx, strPropID, varValue);
		if (cellinfo) {
			if (strPropID == "displaytype" && varValue == "treeitemcontrol") {
				this._setTreeCellinfo(cellinfo);
				this._setTree(true);
			}
			else if (strPropID == "autosizecol" || strPropID == "autosizerow") {
				this._recreate_contents_all(true, false);
			}
			else if (strPropID == "text" || strPropID == "expr") {
				if (strBand == "head" && this._headAutoSize) {
					this._recreate_contents_all(true, false);
				}
				else if (strBand == "body" && this._bodyAutoSize) {
					this._recreate_contents_all(true, false);
				}
				else if ((strBand == "summ" || strBand == "summary") && this._summAutoSize) {
					this._recreate_contents_all(true, false);
				}
				else {
					this._refreshCell(strBand, nCellIdx, -1);
				}
			}
			else if (strPropID == "suppress") {
				if (varValue != 0) {
					this._is_use_suppress = true;
				}
				else {
					cellinfo._clearSuppressInfo();

					cells = this._curFormat._bodycells;
					cellcnt = cells ? cells.length : 0;

					this._is_use_suppress = false;
					for (var j = 0; j < cellcnt; j++) {
						cellinfo2 = cells[j];
						if (cellinfo2.suppress != 0) {
							this._is_use_suppress = true;
							break;
						}
					}
				}
				this._refreshBody();
			}
			else if (strPropID == "suppressalign" && this._is_use_suppress) {
				this._destroyOverlayControls();
				this._destroySelectionControls();
				this._refreshBody();
			}
			else {
				if (strPropID == "displaytype") {
					this._changeDisplayer = true;
				}
				else if (strPropID == "wordwrap") {
					if (varValue != "none") {
						if (strBand == "head") {
							this._is_head_wordwrap = true;
						}
						if (strBand == "body") {
							this._is_body_wordwrap = true;
						}
						if ((strBand == "summ" || strBand == "summary")) {
							this._is_head_wordwrap = true;
						}
					}
					else {
						if (strBand == "body") {
							cells = this._curFormat._bodycells;
							cellcnt = cells ? cells.length : 0;

							this._is_body_wordwrap = false;
							for (var jj = 0; jj < cellcnt; jj++) {
								cellinfo2 = cells[jj];
								if (cellinfo2.wordwrap != "none") {
									this._is_body_wordwrap = true;
									break;
								}
							}
						}

						if (strBand == "head") {
							cells = this._curFormat._headcells;
							cellcnt = cells ? cells.length : 0;

							this._is_head_wordwrap = false;
							for (var jjj = 0; jjj < cellcnt; jjj++) {
								cellinfo2 = cells[jjj];
								if (cellinfo2.wordwrap != "none") {
									this._is_head_wordwrap = true;
									break;
								}
							}
						}

						if ((strBand == "summ" || strBand == "summary")) {
							cells = this._curFormat._summcells;
							cellcnt = cells ? cells.length : 0;

							this._is_summ_wordwrap = false;
							for (var jjjj = 0; jjjj < cellcnt; jjjj++) {
								cellinfo2 = cells[jjjj];
								if (cellinfo2.wordwrap != "none") {
									this._is_summ_wordwrap = true;
									break;
								}
							}
						}
					}
				}

				this._refreshCell(strBand, nCellIdx, -1, strPropID);

				if (this._currentCellEditor) {
					this._currentCellEditor._setProperty(true);
				}

				this._changeDisplayer = false;
			}
		}

		return (cellinfo != null);
	};

	_pGrid.getCellProperty = function (strBand, nCellIdx, strPropID) {
		var format = this._curFormat;

		if (!format) {
			return null;
		}

		strBand = strBand.toLowerCase();

		return format.getCellProperty(strBand, nCellIdx, strPropID);
	};

	_pGrid.getCellPropertyValue = function (nRowIndex, nCellIdx, strPropID) {
		var format = this._curFormat;

		if (!format) {
			return undefined;
		}

		return format.getCellPropertyValue(nRowIndex, nCellIdx, strPropID);
	};

	_pGrid.getSubCellPropertyValue = function (nRowIndex, nCellIdx, nSubCellIdx, strPropID) {
		var format = this._curFormat;

		if (!format) {
			return undefined;
		}

		return format.getSubCellPropertyValue(nRowIndex, nCellIdx, nSubCellIdx, strPropID);
	};

	_pGrid.autoFitRow = function (strType) {
	};

	_pGrid.autoFitCol = function () {
		var af = this.autofittype;
		this.autofittype = "col";

		if (this._curFormat) {
			var width;
			var bodysize = this._getBodyClientSize();
			var control_elem = this.getElement();

			width = bodysize[0];

			if (control_elem) {
				if (!this._is_created && width <= 0) {
					width = control_elem.client_width;
				}

				this._curFormat._resetOrgColSize(true, this._autofitcol_rate, width);
			}
		}

		var retn = this._applyAutofittype(true);
		this.autofittype = af;
		return retn;
	};

	_pGrid.autoSizeRow = function (nRowIndex, nSubRowIndex, bIsDatasetRow) {
		if (!this._binddataset || !this._curFormat || nRowIndex == undefined) {
			return false;
		}

		if (bIsDatasetRow == undefined || bIsDatasetRow == true) {
			nRowIndex = this._getDataRow(nRowIndex);
		}

		var retn = false;
		var change = false;
		var index;
		var oldsize;
		var newsize;
		var rows;
		var rowsLen;
		var j;

		this._autoSizeRowProc = true;

		if (nRowIndex >= 0) {
			this._is_variable_bodyrowsize = true;

			rows = this._curFormat._bodyrows;
			rowsLen = rows.length;

			if (nSubRowIndex >= 0) {
				index = (nRowIndex *  rows.length) + nSubRowIndex;
				oldsize = this._rowSizeListSub[index];
				newsize = this._getMaxSubRowSize(nRowIndex, nSubRowIndex);

				if (oldsize != newsize) {
					this._rowSizeListSub[index] = newsize;
					this._rowSizeList[nRowIndex] += (newsize - oldsize);
					change = true;
				}
			}
			else {
				for (j = 0; j < rowsLen; j++) {
					index = (nRowIndex *  rows.length) + j;
					oldsize = this._rowSizeListSub[index];
					newsize = this._getMaxSubRowSize(nRowIndex, j);

					if (oldsize != newsize) {
						this._rowSizeListSub[index] = newsize;
						this._rowSizeList[nRowIndex] += (newsize - oldsize);
						change = true;
					}
				}
			}
			if (change == true) {
				this._updateRowSizeExtend();
			}

			this._recreate_contents_all(false, false);
			retn = true;
		}
		else if (nRowIndex == -1) {
			rows = this._curFormat._headrows;
			rowsLen = rows.length;

			if (nSubRowIndex >= 0) {
				index = nSubRowIndex;
				oldsize = this._rowHeadListSub[index];
				newsize = this._getMaxSubRowSize(nRowIndex, nSubRowIndex);

				if (oldsize != newsize) {
					this._rowHeadListSub[index] = newsize;
					this._rowHeadList[0] += (newsize - oldsize);
					change = true;
				}
			}
			else {
				for (j = 0; j < rowsLen; j++) {
					index = j;
					oldsize = this._rowHeadListSub[index];
					newsize = this._getMaxSubRowSize(nRowIndex, j);

					if (oldsize != newsize) {
						this._rowHeadListSub[index] = newsize;
						this._rowHeadList[0] += (newsize - oldsize);
						change = true;
					}
				}
			}
			if (change == true) {
				this._updateRowSizeExtend();
			}

			this._resizeBand();
			this._recreate_contents_all(false, false);
			retn = true;
		}
		else if (nRowIndex == -2) {
			rows = this._curFormat._summrows;
			rowsLen = rows.length;

			if (nSubRowIndex >= 0) {
				index = nSubRowIndex;
				oldsize = this._rowSummListSub[index];
				newsize = this._getMaxSubRowSize(nRowIndex, nSubRowIndex);

				if (oldsize != newsize) {
					this._rowSummListSub[index] = newsize;
					this._rowSummList[0] += (newsize - oldsize);
					change = true;
				}
			}
			else {
				for (j = 0; j < rowsLen; j++) {
					index = j;
					oldsize = this._rowSummListSub[index];
					newsize = this._getMaxSubRowSize(nRowIndex, j);

					if (oldsize != newsize) {
						this._rowSummListSub[index] = newsize;
						this._rowSummList[0] += (newsize - oldsize);
						change = true;
					}
				}
			}
			if (change == true) {
				this._updateRowSizeExtend();
			}

			this._resizeBand();
			this._recreate_contents_all(false, false);
			retn = true;
		}
		this._autoSizeRowProc = false;
		return retn;
	};

	_pGrid.autoSizeCol = function (strBand, nColIndex, bBandindex) {
		var size;

		if (bBandindex == undefined) {
			bBandindex = false;
		}

		if (nColIndex == -1) {
			var cols = this._curFormat._cols;
			var colsLen = cols.length;

			for (var i = 0; i < colsLen; i++) {
				size = this._getMaxColDataSizeBand(i);

				if (size >= 0) {
					this._setColSize(strBand, i, size, false, true, true, (i != colsLen - 1));
				}
			}
		}
		else if (nColIndex >= 0) {
			if (bBandindex) {
				var leftcnt = this._getColFixCnt("left");
				var bodycnt = this._getColFixCnt("body");
				var rightcnt = this._getColFixCnt("right");

				if (strBand == "left") {
					if (nColIndex >= leftcnt) {
						return;
					}
				}
				if (strBand == "body" && nColIndex >= 0) {
					if (nColIndex >= bodycnt) {
						return;
					}

					nColIndex += leftcnt;
				}
				else if (strBand == "right") {
					if (nColIndex >= rightcnt) {
						return;
					}

					nColIndex += leftcnt;
					nColIndex += bodycnt;
				}
			}

			size = this._getMaxColDataSizeBand(nColIndex);

			if (size >= 0) {
				this._setColSize(strBand, nColIndex, size, false, true, true);
			}
		}
	};

	_pGrid.isDropdownCalendar = function () {
		if (this._currentCellEditor && this._currentCellEditor.visible == true && this._currentCellEditor._type_name == "CalendarControl") {
			return this._currentCellEditor.isDropdown();
		}
		return false;
	};

	_pGrid.isDropdownCombo = function () {
		if (this._currentCellEditor && this._currentCellEditor.visible == true && this._currentCellEditor._type_name == "ComboControl") {
			return this._currentCellEditor.isDropdown();
		}
		return false;
	};

	_pGrid.moveToNextCell = function () {
		return this._moveToCell("next", true, false, undefined, undefined, true);
	};

	_pGrid.moveToPrevCell = function () {
		return this._moveToCell("prev", true, false, undefined, undefined, true);
	};

	_pGrid.showEditor = function (bShow) {
		if (this._hide_applydata) {
			nexacro._OnceCallbackTimer.callonce(this, function () {
				this.showEditor(bShow);
			}, 50);

			return true;
		}

		var val;

		if (bShow === undefined) {
			bShow = true;
		}
		bShow = nexacro._toBoolean(bShow);

		if (this._showEditing == bShow) {
			return false;
		}

		if (bShow) {
			this.setFocus(false);
			val = this._showEditor();
		}
		else {
			val = this._hideEditor();
		}
		return val;
	};

	_pGrid.dropdownCombo = function () {
		if (this._currentCellEditor && this._currentCellEditor.visible == true && this._currentCellEditor._type_name == "ComboControl") {
			this._currentCellEditor.dropdown();
			return true;
		}
		return false;
	};

	_pGrid.dropdownCalendar = function () {
		if (this._currentCellEditor && this._currentCellEditor.visible == true && this._currentCellEditor._type_name == "CalendarControl") {
			this._currentCellEditor.dropdown();
			return true;
		}
		return false;
	};

	_pGrid.getCurEditType = function () {
		var cellinfo = this._getBodyCellInfo(this._selectinfo.curcell);
		if (cellinfo) {
			return cellinfo._getAttrValue(cellinfo.edittype, this._selectinfo.curdsrow);
		}
		return "";
	};

	_pGrid.getEditCaret = function () {
		if (this._showEditing) {
			var editComp = this._currentCellEditor;
			if (editComp && editComp.getCaretPos) {
				return editComp.getCaretPos();
			}
		}
		return -1;
	};

	_pGrid.getEditSelect = function () {
		var editComp = this._currentCellEditor;
		if (editComp && editComp.getSelect) {
			return editComp.getSelect();
		}
	};

	_pGrid.getEditSelectedText = function () {
		var editComp = this._currentCellEditor;
		if (editComp && editComp.getSelectedText) {
			return editComp.getSelectedText();
		}
		return "";
	};

	_pGrid.getEditText = function () {
		if (this._showEditing) {
			var editComp = this._currentCellEditor;
			if (editComp) {
				return editComp.text;
			}
		}
	};

	_pGrid.getEditingText = function () {
		if (this._showEditing) {
			var editComp = this._currentCellEditor;
			if (editComp) {
				return editComp._getEditingText();
			}
		}
	};

	_pGrid.getEditValue = function () {
		if (this._showEditing) {
			var editComp = this._currentCellEditor;
			if (editComp) {
				return editComp.value;
			}
		}
	};

	_pGrid.getEditingValue = function () {
		if (this._showEditing) {
			var editComp = this._currentCellEditor;
			if (editComp) {
				return editComp._getEditingValue();
			}
		}
	};

	_pGrid.setEditValue = function (value) {
		if (this._showEditing) {
			var editComp = this._currentCellEditor;
			if (editComp) {
				return editComp.set_value(value);
			}
		}
	};

	_pGrid.setEditingValue = function (value) {
		if (this._showEditing) {
			var editComp = this._currentCellEditor;
			if (editComp) {
				return editComp._setEditingValue(value);
			}
		}
	};

	_pGrid.setEditText = _pGrid.setEditValue;

	_pGrid.setEditCaret = function (nPos) {
	};

	_pGrid.setEditSelect = function (nStart, nEnd) {
		var editor = this._currentCellEditor;

		if (!editor) {
			return false;
		}

		if (nStart == -1) {
			editor.setSelect(0, 0);
			return true;
		}
		else {
			if (editor.setSelect) {
				return editor.setSelect(nStart, nEnd);
			}
		}
		return false;
	};

	_pGrid.setEditSelectedText = function (strText) {
	};


	_pGrid.updateToDataset = function () {
		if (this._dsEventOccured) {
			return false;
		}

		if (this._showEditing) {
			var editComp = this._currentCellEditor;
			if (editComp) {
				editComp._setDataset(false, this._currentCellRow);
				return true;
			}
			return false;
		}
		return false;
	};

	_pGrid.setTreeStatus = function (nRowIndex, bTreeStatus) {
		if (!this._hasTree) {
			return false;
		}

		bTreeStatus = nexacro._toBoolean(bTreeStatus);
		var indexes = this._treeIndexes;
		var rowcount = indexes.length;
		var rows = this._bodyBand._get_rows();

		if (rowcount <= nRowIndex || !rows || rows.length == 0) {
			return false;
		}

		var retn;

		if (bTreeStatus) {
			retn = this._setTreeState(nRowIndex, 1, true);
		}
		else {
			retn = this._setTreeState(nRowIndex, 0, true);
		}

		if (retn > 0) {
			return true;
		}

		return false;
	};

	_pGrid.getTreeStatus = function (nRowIndex) {
		if (!this._hasTree) {
			return -1;
		}

		var indexes = this._treeIndexes;
		var rowcount = indexes.length;
		var rows = this._bodyBand._get_rows();

		if (rowcount <= nRowIndex || !rows || rows.length == 0) {
			return -1;
		}

		var dsrowidx = indexes[nRowIndex];
		var state = this._treeStates[dsrowidx];

		var cellinfo = this._treeCellinfo;
		var editType = cellinfo._getEdittype(dsrowidx);

		if (editType == "tree") {
			if (cellinfo.treestate._bindtype == 1) {
				var colid = cellinfo.treestate._bindexpr;
				var state2 = this._binddataset.getColumn(dsrowidx, colid);

				if (state2 > 1) {
					state = state2;
				}
			}
		}

		if (state == 2) {
			state++;
		}
		return state;
	};

	_pGrid.getTreeChildCount = function (nRowIndex, bIsDatasetRow) {
		if (this._hasTree) {
			var row = nRowIndex;

			if (bIsDatasetRow == undefined) {
				bIsDatasetRow = true;
			}
			else {
				bIsDatasetRow = nexacro._toBoolean(bIsDatasetRow);
			}

			if (bIsDatasetRow === false) {
				row = this.getDatasetRow(nRowIndex);
			}

			if (row < 0 || this._rowcount <= row) {
				return 0;
			}

			var cellinfo = this._treeCellinfo;
			var lvl1 = cellinfo._getTreeLevel(row);
			var lvl2, temp = -1;
			var cnt = 0;

			for (var i = row + 1, n = this._rowcount; i < n; i++) {
				lvl2 = cellinfo._getTreeLevel(i);
				if (lvl1 >= lvl2) {
					break;
				}

				if (temp >= 0) {
					if (temp >= lvl2) {
						if (temp > lvl2) {
							temp = lvl2;
						}

						cnt++;
					}
				}
				else {
					cnt++;
					temp = lvl2;
				}
			}
			return cnt;
		}
		return 0;
	};

	_pGrid.getTreeChildRow = function (nRowIndex, nChildIndex, bIsDatasetRow) {
		if (this._hasTree) {
			var row = nRowIndex;

			if (bIsDatasetRow == undefined) {
				bIsDatasetRow = true;
			}
			else {
				bIsDatasetRow = nexacro._toBoolean(bIsDatasetRow);
			}

			if (bIsDatasetRow === false) {
				row = this.getDatasetRow(nRowIndex);
			}

			if (row < 0 || this._rowcount <= row) {
				return -1;
			}

			var cellinfo = this._treeCellinfo;
			var lvl1 = cellinfo._getTreeLevel(row);
			var lvl2, temp = -1;
			var lastrow = -1;
			var cnt = 0;

			for (var i = row + 1, n = this._rowcount; i < n; i++) {
				lvl2 = cellinfo._getTreeLevel(i);
				if (lvl1 >= lvl2) {
					break;
				}

				if (temp >= 0) {
					if (temp >= lvl2) {
						if (temp > lvl2) {
							temp = lvl2;
						}

						cnt++;
						if (nChildIndex == cnt) {
							return i;
						}

						lastrow = i;
					}
				}
				else {
					temp = lvl2;
					if (nChildIndex == 0) {
						return i;
					}

					lastrow = i;
				}
			}

			if (nChildIndex == -1) {
				return lastrow;
			}
		}

		return -1;
	};

	_pGrid.getTreeParentRow = function (nRowIndex, bIsDatasetRow) {
		if (this._hasTree) {
			var row = nRowIndex;

			if (bIsDatasetRow == undefined) {
				bIsDatasetRow = true;
			}
			else {
				bIsDatasetRow = nexacro._toBoolean(bIsDatasetRow);
			}

			if (bIsDatasetRow === false) {
				row = this.getDatasetRow(nRowIndex);
			}

			if (row < 0 || this._rowcount <= row) {
				return -1;
			}

			var cellinfo = this._treeCellinfo;
			var lvl1 = cellinfo._getTreeLevel(row);
			var lvl2;

			for (var i = row - 1; i >= 0; i--) {
				lvl2 = cellinfo._getTreeLevel(i);
				if (lvl1 > lvl2) {
					return i;
				}
			}
		}
		return -1;
	};

	_pGrid.getTreeSiblingRow = function (nRowIndex, nOffset, bIsDatasetRow) {
		if (this._hasTree) {
			var row = nRowIndex;

			if (nOffset === undefined) {
				nOffset = 1;
			}

			if (bIsDatasetRow == undefined) {
				bIsDatasetRow = true;
			}
			else {
				bIsDatasetRow = nexacro._toBoolean(bIsDatasetRow);
			}

			if (bIsDatasetRow === false) {
				row = this.getDatasetRow(nRowIndex);
			}

			if (row < 0 || this._rowcount <= row) {
				return -1;
			}

			var cellinfo = this._treeCellinfo;
			var lvl1 = cellinfo._getTreeLevel(row);
			var lvl2;
			var set = 0;
			var i, n;

			if (nOffset < 0) {
				for (i = row - 1; i >= 0; i--) {
					lvl2 = cellinfo._getTreeLevel(i);
					if (lvl1 > lvl2) {
						break;
					}
					else if (lvl1 == lvl2) {
						set--;
						if (nOffset == set) {
							return i;
						}
					}
				}
			}
			else if (nOffset > 0) {
				for (i = row + 1, n = this._rowcount; i < n; i++) {
					lvl2 = cellinfo._getTreeLevel(i);
					if (lvl1 > lvl2) {
						break;
					}
					else if (lvl1 == lvl2) {
						set++;
						if (nOffset == set) {
							return i;
						}
					}
				}
			}
			else {
				return row;
			}
		}
		return -1;
	};

	_pGrid.getTreePath = function (nRowIndex, bIsDatasetRow) {
		if (this._hasTree) {
			var row = nRowIndex;

			if (bIsDatasetRow == undefined) {
				bIsDatasetRow = true;
			}
			else {
				bIsDatasetRow = nexacro._toBoolean(bIsDatasetRow);
			}

			if (bIsDatasetRow === false) {
				row = this.getDatasetRow(nRowIndex);
			}

			if (row < 0 || this._rowcount <= row) {
				return "";
			}

			var cellinfo = this._treeCellinfo;
			var val = [];
			var i = 0;

			while (row >= 0) {
				val[i] = cellinfo._getValue(row);
				row = this.getTreeParentRow(row);
				i++;
			}

			var str = "";
			for (i = val.length - 1; i >= 0; i--) {
				str += val[i];

				if (i > 0) {
					str += this.treepathdelimiter;
				}
			}
			return str;
		}
		return "";
	};

	_pGrid.getTreeRow = function (nRowIndex) {
		if (this._hasTree) {
			if (typeof (nRowIndex) == "string") {
				var treepath = nRowIndex;
				var cnt = this._rowcount;
				var path;
				nRowIndex = -1;

				for (var i = 0; i < cnt; i++) {
					path = this.getTreePath(i, true);
					if (path == treepath) {
						nRowIndex = i;
						break;
					}
				}
			}
			if (nRowIndex >= 0) {
				var _treeIndexes = this._treeIndexes;
				var _treeIndexesLen = _treeIndexes.length;

				for (var k = 0; k < _treeIndexesLen; k++) {
					if (_treeIndexes[k] == nRowIndex) {
						return k;
					}
				}
			}
		}
		return -1;
	};

	_pGrid.getDatasetRow = function (nRowIndex) {
		if (nRowIndex >= 0) {
			if (this._hasTree) {
				if (this._treeIndexes.length > nRowIndex) {
					return this._treeIndexes[nRowIndex];
				}
			}
			else {
				if (this._rowcount > nRowIndex) {
					return nRowIndex;
				}
			}
		}
		return -1;
	};

	_pGrid.isTreeLeafRow = function (nRowIndex, bIsDatasetRow) {
		if (this._hasTree) {
			var cnt = this.getTreeChildCount(nRowIndex, bIsDatasetRow);
			if (cnt == 0) {
				if (bIsDatasetRow == undefined) {
					bIsDatasetRow = true;
				}
				else {
					bIsDatasetRow = nexacro._toBoolean(bIsDatasetRow);
				}

				var row = nRowIndex;
				if (bIsDatasetRow === false) {
					row = this.getDatasetRow(nRowIndex);
				}

				if (row < 0 || this._rowcount <= row) {
					return false;
				}

				return true;
			}
		}
		return false;
	};

	_pGrid.isTreeRootRow = function (nRowIndex, bIsDatasetRow) {
		if (this._hasTree) {
			var row = nRowIndex;

			if (bIsDatasetRow == undefined) {
				bIsDatasetRow = true;
			}
			else {
				bIsDatasetRow = nexacro._toBoolean(bIsDatasetRow);
			}

			if (bIsDatasetRow === false) {
				row = this.getDatasetRow(nRowIndex);
			}

			if (row < 0 || this._rowcount <= row) {
				return false;
			}

			var cellinfo = this._treeCellinfo;
			var lvl = cellinfo._getTreeLevel(row);
			var start = cellinfo._getTreeStartLevel(row);

			if (start == lvl) {
				return true;
			}
		}
		return false;
	};

	_pGrid.isTreeExpandedRow = function (nRowIndex, bIsDatasetRow) {
		if (this._hasTree) {
			var row = nRowIndex;

			if (bIsDatasetRow == undefined) {
				bIsDatasetRow = true;
			}
			else {
				bIsDatasetRow = nexacro._toBoolean(bIsDatasetRow);
			}

			if (bIsDatasetRow === false) {
				row = this.getDatasetRow(nRowIndex);
			}

			if (row < 0 || this._rowcount <= row) {
				return false;
			}

			while (row >= 0) {
				row = this.getTreeParentRow(row);

				if (row < 0) {
					break;
				}

				var indexes = this._treeIndexes;
				var rowcount = indexes.length;

				if (row >= 0 && rowcount > 0) {
					var state = this._treeStates[row];

					if (state == 0) {
						return false;
					}
				}
			}
			return true;
		}
		return false;
	};

	_pGrid.isTreeCollapsedRow = function (nRowIndex, bIsDatasetRow) {
		if (this._hasTree) {
			var row = nRowIndex;

			if (bIsDatasetRow == undefined) {
				bIsDatasetRow = true;
			}
			else {
				bIsDatasetRow = nexacro._toBoolean(bIsDatasetRow);
			}

			if (bIsDatasetRow === false) {
				row = this.getDatasetRow(nRowIndex);
			}

			if (row < 0 || this._rowcount <= row) {
				return false;
			}

			while (row >= 0) {
				row = this.getTreeParentRow(row);

				if (row < 0) {
					break;
				}

				var indexes = this._treeIndexes;
				var rowcount = indexes.length;

				if (row >= 0 && rowcount > 0) {
					var state = this._treeStates[row];

					if (state == 0) {
						return true;
					}
				}
			}
		}
		return false;
	};

	_pGrid.getCsvData = function () {
	};

	_pGrid.getHeadValue = function (nCell) {
		var format = this._curFormat;
		if (format && format._headcells && nCell >= 0 && format._headcells.length > nCell) {
			var cellinfo = this._curFormat._headcells[nCell];

			if (cellinfo) {
				return cellinfo._getValue(this._currentDSrow);
			}
		}
		return null;
	};

	_pGrid.getSummValue = function (nCell) {
		var format = this._curFormat;
		if (format && format._summcells && nCell >= 0 && format._summcells.length > nCell) {
			var cellinfo = this._curFormat._summcells[nCell];

			if (cellinfo) {
				return cellinfo._getValue(this._currentDSrow);
			}
		}
		return null;
	};

	_pGrid.getBindCellIndex = function (strBand, strColID) {
		var format = this._curFormat;

		if (!format) {
			return -1;
		}

		strBand = strBand.toLowerCase();

		var cellinfo;
		var i;

		if (strColID) {
			if (strBand == "head" && format._headcells) {
				var _headcells = format._headcells;
				var _headcellsLen = _headcells.length;

				for (i = 0; i < _headcellsLen; i++) {
					cellinfo = _headcells[i];

					if (cellinfo.text._bindexpr == strColID) {
						return i;
					}
				}
			}
			else if (strBand == "body" && format._bodycells) {
				var _bodycells = format._bodycells;
				var _bodycellsLen = _bodycells.length;

				for (i = 0; i < _bodycellsLen; i++) {
					cellinfo = _bodycells[i];

					if (cellinfo.text._bindexpr == strColID) {
						return i;
					}
				}
			}
			else if ((strBand == "summ" || strBand == "summary") && format._summcells) {
				var _summcells = format._summcells;
				var _summcellsLen = _summcells.length;

				for (i = 0; i < _summcellsLen; i++) {
					cellinfo = _summcells[i];

					if (cellinfo.text._bindexpr == strColID) {
						return i;
					}
				}
			}
		}
		return -1;
	};

	_pGrid.isAboveSelected = function () {
	};

	_pGrid.mergeCell = function (scol, ecol, srow, erow, ssubrow, esubrow) {
		if (nexacro._Browser == "IE" && nexacro._BrowserVersion < 11) {
			return false;
		}

		return this._setVirtualMerge(scol, srow, ssubrow, ecol, erow, esubrow, false);
	};

	_pGrid.splitCell = function (scol, ecol, srow, erow, ssubrow, esubrow) {
		if (nexacro._Browser == "IE" && nexacro._BrowserVersion < 11) {
			return false;
		}

		return this._setVirtualMerge(scol, srow, ssubrow, ecol, erow, esubrow, true);
	};

	_pGrid._absolutelyResetScrollPos = function (v) {
		var head = this._headBand;
		var body = this._bodyBand;
		var summ = this._summBand;

		if (this._control_element) {
			this._control_element._reset_scrollpos = v;
		}

		if (head && head._control_element) {
			head._control_element._reset_scrollpos = v;
		}

		if (body && body._control_element) {
			body._control_element._reset_scrollpos = v;
		}

		if (summ && summ._control_element) {
			summ._control_element._reset_scrollpos = v;
		}
	};

	_pGrid._no_use_onscroll_callback_after = false;
	_pGrid._moverow_frame_df = 0;
	_pGrid._moverow_frame = _pGrid._moverow_frame_df;

	_pGrid._float_updown = false;
	_pGrid._float_center = false;
	_pGrid._float_move = false;
	_pGrid._floating_row_addsize = 2;
	_pGrid._floating_row_border = "1px solid gray";
	_pGrid._floating_row_shadow = "1px 1px 12px gray";
	_pGrid._floating_gap = 3;

	_pGrid._createHighlightRow = function () {
		if (!this._use_blindscroll) {
			return;
		}

		var body = this._bodyBand;

		if (!body) {
			return;
		}

		if (!this._covercontrol) {
			this._covercontrol = new nexacro._GridCoverControl(this._bodyBand, this);
			this._covercontrol.createComponent();
		}

		var top;

		if (!this._highlight_row_main) {
			top = (this._float_center && !this._float_updown) ? ((body._getClientHeight() - (this._bodyrowheight + this._floating_row_addsize)) / 2) : this._floating_gap;
			var highlight_row_main = this._highlight_row_main = new nexacro._GridRowControl(body, this._floating_gap, top + this._fixed_height, null, this._bodyrowheight + this._floating_row_addsize, 0, false, true, this._floating_gap);
			highlight_row_main.set_border(this._floating_row_border);
			highlight_row_main.set_boxShadow(this._floating_row_shadow);
			highlight_row_main.set_visible(false);
			highlight_row_main._updateAll();
			highlight_row_main.createComponent();
		}

		if (!this._float_move) {
			if (this._float_updown) {
				if (!this._highlight_row_sublast) {
					var highlight_row_sublast = this._highlight_row_sublast = new nexacro._GridRowControl(body, this._floating_gap, null, null, this._bodyrowheight + this._floating_row_addsize, 0, false, true, this._floating_gap, this._floating_gap - this._fixed_height);
					highlight_row_sublast.set_border(this._floating_row_border);
					highlight_row_sublast.set_boxShadow(this._floating_row_shadow);
					highlight_row_sublast.set_visible(false);
					highlight_row_sublast._updateAll();
					highlight_row_sublast.createComponent();
				}
				if (this._float_center) {
					if (!this._highlight_row_subcenter) {
						top = ((body._getClientHeight() - (this._bodyrowheight + this._floating_row_addsize)) / 2);
						var highlight_row_subcenter = this._highlight_row_subcenter = new nexacro._GridRowControl(body, this._floating_gap, top + this._fixed_height, null, this._bodyrowheight + this._floating_row_addsize, 0, false, true, this._floating_gap);
						highlight_row_subcenter.set_border(this._floating_row_border);
						highlight_row_subcenter.set_boxShadow(this._floating_row_shadow);
						highlight_row_subcenter.set_visible(false);
						highlight_row_subcenter._updateAll();
						highlight_row_subcenter.createComponent();
					}
				}
			}
		}
	};

	_pGrid._updateHighlightrowPos = function () {
		if (!this._bodyBand) {
			return;
		}

		if (!this._float_move) {
			var top;
			if (this._highlight_row_main) {
				top = (this._float_center && !this._float_updown) ? ((this._bodyBand._getClientHeight() - (this._bodyrowheight + this._floating_row_addsize)) / 2) : this._floating_gap;
				this._highlight_row_main._setTop(top + this._fixed_height);
				this._highlight_row_main._update_position();
			}
			if (this._highlight_row_sublast) {
				this._highlight_row_sublast._setBottom(this._floating_gap - this._fixed_height);
				this._highlight_row_sublast._update_position();
			}
			if (this._highlight_row_subcenter) {
				top = (this._bodyBand._getClientHeight() - (this._bodyrowheight + this._floating_row_addsize)) / 2 + this._fixed_height;
				this._highlight_row_subcenter._setTop(top);
				this._highlight_row_subcenter._update_position();
			}
		}
	};

	_pGrid._destroyHighlightRow = function () {
		if (this._highlight_row_main) {
			this._highlight_row_main.destroy();
		}
		if (this._highlight_row_sublast) {
			this._highlight_row_sublast.destroy();
		}
		if (this._highlight_row_subcenter) {
			this._highlight_row_subcenter.destroy();
		}
		if (this._covercontrol) {
			this._covercontrol.destroy();
		}

		this._covercontrol = null;
		this._highlight_row_main = null;
		this._highlight_row_sublast = null;
		this._highlight_row_subcenter = null;
	};

	_pGrid._setBlindBody = function (v) {
		var body = this._bodyBand;

		if (this._covercontrol && body) {
			if (v) {
				this._covercontrol._coverOn(0);
			}
			else {
				this._covercontrol._coverOff(0);
			}
		}
	};

	_pGrid._getRowIdxInClient = function (top) {
		var lastrow = this.rowcount - 1;
		var rowpos = this._toprowpos[0];
		var remain = this._toprowpos[1];
		var disprowcnt = this._disprowcnt;
		var bodyrow_h = this._bodyrowheight, incrow_h;
		var i;

		if (!this._is_variable_bodyrowsize) {
			incrow_h = remain - bodyrow_h + this._fixed_height;
			for (i = 0; i < disprowcnt; i++) {
				incrow_h += bodyrow_h;

				if (top < incrow_h) {
					rowpos += i;
					break;
				}
			}
		}
		else {
			var toppos = rowpos;
			var rowsizelist = this._rowSizeList;
			var rowsize;

			incrow_h = remain - rowsizelist[this._getDataRow(toppos)] + this._fixed_height;
			for (i = 0; i < disprowcnt; i++) {
				rowsize = rowsizelist[this._getDataRow(toppos + i)];
				incrow_h += rowsize;

				if (top < incrow_h) {
					rowpos += i;
					break;
				}
			}
		}

		if (rowpos > lastrow) {
			rowpos = lastrow;
		}

		return rowpos;
	};

	_pGrid._floatingScrollRows_callback = function (no_ani) {
		var control_elem = this._control_element;
		var vscroll_limit = control_elem.vscroll_limit;
		var pos = this._vscrollmng._pos;
		var body = this._bodyBand;

		if (pos > vscroll_limit) {
			pos = vscroll_limit;
		}

		this._last_scroll_top = control_elem.scroll_top;
		this._toprowpos = this._getScreenTopRowPos(pos);
		this._bottomrowpos = this._getScreenBottomRowPos(pos);

		this._setBlindBody(true);

		var rowpos;
		var disprowcnt = this._disprowcnt;
		var highlight_row_main = this._highlight_row_main;
		var top;

		if (this._float_move) {
			var ratio = (pos) ? this._vscrollmng._pos / this._vscrollmng._max : 0;
			var bodyrow_h = this._bodyrowheight;
			var body_height = body._getClientHeight();

			if (pos < vscroll_limit) {
				top = ((body_height - (bodyrow_h + this._floating_row_addsize)) *  ratio) + this._fixed_height;
				rowpos = this._getRowIdxInClient(top);
			}
			else {
				top = body_height - (bodyrow_h + this._floating_row_addsize) + this._fixed_height;
				rowpos = this.rowcount - 1;
			}

			highlight_row_main._changeRow(rowpos);
			highlight_row_main._updateAll(undefined, undefined, true);
			highlight_row_main.set_top(top);
			highlight_row_main._control_element.setElementHScrollPos(this._getScrollLeft());
			highlight_row_main.set_visible(true);
		}
		else {
			var centerpos = 0;

			rowpos = this._toprowpos[0];

			if (this._float_center) {
				top = (body._getClientHeight() - (this._bodyrowheight + this._floating_row_addsize)) / 2 + this._fixed_height;
				centerpos = this._getRowIdxInClient(top) - rowpos;
			}

			if (this._float_updown) {
				highlight_row_main._changeRow(rowpos);
				highlight_row_main._updateAll(undefined, undefined, true);
				highlight_row_main._control_element.setElementHScrollPos(this._getScrollLeft());
				highlight_row_main.set_visible(true);

				var highlight_row_sublast = this._highlight_row_sublast;
				highlight_row_sublast._changeRow(rowpos + disprowcnt - 1);
				highlight_row_sublast._updateAll(undefined, undefined, true);
				highlight_row_sublast._control_element.setElementHScrollPos(this._getScrollLeft());
				highlight_row_sublast.set_visible(true);

				if (this._float_center) {
					var highlight_row_subcenter = this._highlight_row_subcenter;
					highlight_row_subcenter._changeRow(rowpos + centerpos);
					highlight_row_subcenter._updateAll(undefined, undefined, true);
					highlight_row_subcenter._control_element.setElementHScrollPos(this._getScrollLeft());
					highlight_row_subcenter.set_visible(true);
				}
			}
			else {
				highlight_row_main._changeRow(rowpos + centerpos);
				highlight_row_main._updateAll(undefined, undefined, true);
				highlight_row_main._control_element.setElementHScrollPos(this._getScrollLeft());
				highlight_row_main.set_visible(true);
			}
		}

		if (!no_ani) {
			this._scroll_vpos_queue.pop();

			if (this._scroll_vpos_queue.length > 0) {
				this._aniframe_rowscroll_float.start();
			}
		}
		else {
			this._aniframe_rowscroll.stop();
			this._scroll_vpos_queue = [];
		}
	};

	_pGrid._adjustGridScrollRows_callback_end = function (callbacktimer) {
		if (this._aniframe_rowscroll_end._skipscrolltask && this._isflingend) {
			this._aniframe_rowscroll_end._skipscrolltask = undefined;

			return;
		}
		var control_elem = this._control_element;
		var vscroll_limit = control_elem.vscroll_limit;
		var pos = this._vscrollmng._pos;
		var body = this._bodyBand;

		if (pos > vscroll_limit) {
			pos = vscroll_limit;
		}

		if (this._aniframe_rowscroll_float) {
			this._aniframe_rowscroll_float.stop();
		}

		this._aniframe_rowscroll_end.stop();

		if (!callbacktimer && this._applytask) {
			this._applytask.destroy();
			this._applytask = null;
		}

		this._last_scroll_top = control_elem.scroll_top;
		this._toprowpos = this._getScreenTopRowPos(pos);
		this._bottomrowpos = this._getScreenBottomRowPos(pos);

		this._scroll_vpos_queue = [];
		body._update_rows = body._matrix._adjustScrollRows(pos, true);

		if (this._use_blindscroll) {
			this._setBlindBody(false);

			if (this._highlight_row_main) {
				this._highlight_row_main.set_visible(false);
			}
			if (this._highlight_row_sublast) {
				this._highlight_row_sublast.set_visible(false);
			}
			if (this._highlight_row_subcenter) {
				this._highlight_row_subcenter.set_visible(false);
			}
		}

		body._on_refresh_rows(true, undefined, false);
		this._no_use_onscroll_callback_after = true;

		if (this._is_performance_scroll) {
			this._absolutelyResetScrollPos(true);
			control_elem.setElementVScrollPos(pos);
			this._absolutelyResetScrollPos(false);
		}
		else {
			control_elem.setElementVScrollPos(pos);
		}

		this._updateSelector("vscroll", pos - this._last_scroll_top);
		this._adjustOverlayControls(false);

		if (this._is_variable_bodyrowsize) {
			body._clearScrollDisplayRows();
		}

		if (this._isflingend) {
			nexacro._OnceCallbackTimer.callonce(this, function () {
				this._isflingend = undefined;
			}, 200);
		}
	};

	_pGrid._adjustGridScrollRows_callback = function (no_ani) {
		var control_elem = this._control_element;
		var vscroll_limit = control_elem.vscroll_limit;
		var pos = this._vscrollmng._pos;
		var body = this._bodyBand;

		if (pos > vscroll_limit) {
			pos = vscroll_limit;
		}

		this._last_scroll_top = control_elem.scroll_top;
		this._toprowpos = this._getScreenTopRowPos(pos);
		this._bottomrowpos = this._getScreenBottomRowPos(pos);

		if (!no_ani) {
			if (this._moverow_frame > 0) {
				if (body._update_rows.length > 0) {
					this._aniframe_rowscroll.start();
				}
				else {
					this._scroll_vpos_queue = [];
				}
			}
			else {
				this._scroll_vpos_queue.pop();

				if (this._scroll_vpos_queue.length > 0) {
					this._aniframe_rowscroll.start();
				}
			}
		}
		else {
			this._aniframe_rowscroll.stop();
			this._scroll_vpos_queue = [];
		}
		body._update_rows = body._matrix._adjustScrollRows(pos, false, this._moverow_frame);
		body._on_refresh_rows(true, undefined, true);
		this._no_use_onscroll_callback_after = true;
		control_elem.setElementVScrollPos(pos);
		this._updateSelector("vscroll", pos - this._last_scroll_top);
		this._adjustOverlayControls(false);
	};

	_pGrid._scroll_interval = 0;
	_pGrid._scroll_threshold = 1000;
	_pGrid._scroll_end_divider = 3;
	_pGrid._adjustGridScrollRows_callback_onscroll_after2 = function (pos) {
		var body;
		var control_elem;
		var vscroll_limit;

		if (pos == undefined) {
			body = this._bodyBand;
			pos = this._vscrollmng._pos;

			control_elem = this._control_element;
			vscroll_limit = control_elem.vscroll_limit;

			if (pos > vscroll_limit) {
				pos = vscroll_limit;
			}

			var rows_len = body._matrix._rows.length;
			var scroll_info = body._rowscroll_info;
			var scrollmode = scroll_info.scrollmode;
			var framecnt = (scrollmode == 0 ? rows_len : scroll_info.framecnt *  (1 + (scroll_info.skipped | 0)));
			var starttime = scroll_info.starttime;
			var lasttime = scroll_info.timestamp;
			var timestamp = (performance ? performance.now() : (new Date()));

			if (framecnt < rows_len) {
				var duration = timestamp - starttime;
				if (duration > this._scroll_threshold) {
					scroll_info.framecnt = framecnt = rows_len / this._scroll_end_divider;
				}
			}
			else if (scrollmode > 0 && starttime != lasttime && (timestamp - lasttime) < this._scroll_interval) {
				scroll_info.skipped = (scroll_info.skipped | 0) + 1;
				this._aniframe_rowscroll.start();
				return;
			}
			scroll_info.timestamp = timestamp;

			var bcontinue = body._matrix._adjustScrollRows2(pos, true, framecnt);

			if (bcontinue) {
				this._aniframe_rowscroll.start();
			}

			body._on_refresh_rows(true, undefined, true);
			this._adjustOverlayControls(false);
		}
		else {
			body = this._bodyBand;
			pos = this._vscrollmng._pos;

			control_elem = this._control_element;
			vscroll_limit = control_elem.vscroll_limit;

			if (pos > vscroll_limit) {
				pos = vscroll_limit;
			}

			body._rowscroll_info = body._matrix._getScrollRowsInfo(pos, this._moverow_frame, body._rowscroll_info);
			this._toprowpos = body._rowscroll_info.toprow;
			this._bottomrowpos = body._rowscroll_info.bottomrow;

			this._aniframe_rowscroll.start();
		}
	};

	_pGrid._adjustGridScrollRows_callback_onscroll_after = function (pos) {
		if (this._no_use_onscroll_callback_after == true) {
			this._no_use_onscroll_callback_after = false;
			return;
		}

		if (this._is_performance_scroll) {
			this._aniframe_rowscroll.stop();
		}

		if (this._use_eachscroll) {
			return this._adjustGridScrollRows_callback_onscroll_after2(pos);
		}

		if (pos == undefined) {
			var body = this._bodyBand;
			pos = this._vscrollmng._pos;
			var control_elem = this._control_element;
			var vscroll_limit = control_elem.vscroll_limit;

			if (pos > vscroll_limit) {
				pos = vscroll_limit;
			}

			this._toprowpos = this._getScreenTopRowPos(pos);
			this._bottomrowpos = this._getScreenBottomRowPos(pos);
			body._update_rows = body._matrix._adjustScrollRows(pos, true, this._moverow_frame);

			if (this._moverow_frame > 0 && body._update_rows.length > 0) {
				this._aniframe_rowscroll.start();
			}

			body._on_refresh_rows(true, undefined, true);
			this._adjustOverlayControls(false);
		}
		else {
			this._aniframe_rowscroll.start();
		}
	};

	_pGrid._adjustGridScrollRows_callback_onscroll = function () {
		this._no_use_onscroll_callback_after = false;

		var pos = this._vscrollmng._pos;
		var control_elem = this._control_element;
		var vscroll_limit = control_elem.vscroll_limit;

		if (pos > vscroll_limit) {
			pos = vscroll_limit;
		}

		this._last_scroll_top = control_elem.scroll_top;
		control_elem.setElementVScrollPos(pos);
		this._updateSelector("vscroll", pos - this._last_scroll_top);
	};

	_pGrid._callback_onvscroll = _pGrid._adjustGridScrollRows_callback_onscroll_after;

	_pGrid._applytask = null;
	_pGrid._startApplyTimer = function (kind, applytime) {
		var pthis = this;

		if (this._applytask) {
			this._applytask.destroy();
			this._applytask = null;
		}

		this._applytask = new nexacro._CallbackTimer(this, function (id) {
			return pthis._callbackApplyTimer(kind);
		}, applytime);
		this._applytask.start();
	};

	_pGrid._callbackApplyTimer = function (kind) {
		if (kind == "v") {
			this._adjustGridScrollRows_callback_end(true);
		}
		else if (kind == "h") {
			this._adjustGridScrollCols_callback_end(true);
		}

		this._applytask.destroy();
		this._applytask = null;
	};

	_pGrid._is_over_scroll = 0;
	_pGrid._on_beforescroll = function (prehpos, prevpos, posthpos, postvpos, evttype, evtkind) {
		var hmove = Math.abs(prehpos - posthpos);
		var vmove = Math.abs(prevpos - postvpos);

		if (hmove < vmove) {
			if (prevpos > postvpos || (prevpos < postvpos && this._vscrollmng._orgmax != prevpos)) {
				this._vscrollmng.setPixelPos(postvpos, evtkind, true, true);
				this.on_vscroll(postvpos, evttype, evtkind);

				if (this._use_eachscroll) {
					this._startApplyTimer("v", 1200);
				}
			}
		}
		else if (hmove > vmove) {
			if (prehpos > posthpos || (prehpos < posthpos && this._hscrollmng._orgmax != prehpos)) {
				this._hscrollmng.setPos(posthpos, evtkind, true);
				this.on_hscroll(posthpos, evttype, evtkind);

				if (this._use_eachscroll) {
					this._startApplyTimer("h", 1200);
				}
			}
		}
		else if (evttype == "trackend" || evttype == "trackstart") {
			if (evtkind == "vertical") {
				this.on_vscroll(postvpos, evttype, evtkind);
			}
			else if (evtkind == "horizontal") {
				this.on_hscroll(posthpos, evttype, evtkind);
			}
		}
	};

	_pGrid.on_vscroll = function (postvpos, evttype, evtkind) {
		if (this.scrolltype == "none" || this.scrolltype == "horizontal") {
			return;
		}

		this._is_over_scroll = 0;

		var vscroll = this._vscrollmng;

		if (!vscroll) {
			return;
		}

		if (this._scrollpixel != "all") {
			if (vscroll._pos > vscroll._orgmax) {
				this._is_over_scroll = vscroll._pos - vscroll._orgmax;
			}
		}

		var control_elem = this._control_element;

		if (!control_elem || !this._bodyBand || evttype == "trackstart" || evttype == "tracklastover" || evttype == "trackfirstover") {
			return;
		}

		if (evttype == "trackend" || evttype == "first" || evttype == "last") {
			this._procRefreshDOM = true;
		}

		this._aniframe_rowscroll_end._skipscrolltask = true;
		this._aniframe_rowscroll_end.stop();

		var cnt;
		var limit;

		if (this._is_performance_scroll && (!this._use_blindscroll || (evtkind != "fling" && evttype != "track" && evttype != "trackfirst" && evttype != "tracklast"))) {
			if (evttype == "trackend") {
				this._adjustGridScrollRows_callback_end();
			}
			else {
				this._adjustGridScrollRows_callback_onscroll();
			}
		}
		else if (nexacro._isTouchInteraction && nexacro._Browser != "Runtime") {
			if (evtkind == "mousewheel_v") {
				this._aniframe_rowscroll_end.start();
			}
			else if (this._use_blindscroll && evtkind == "fling") {
				limit = (this._bodyrowheight + this._floating_row_addsize) + this._floating_gap *  2;
				cnt = this._scroll_vpos_queue.push(postvpos);

				if (cnt == 1) {
					if (this._bodyBand._getClientHeight() < limit) {
						this._aniframe_rowscroll_end.start();
					}
					else {
						this._aniframe_rowscroll_float.start();
					}
				}
			}
			else {
				if (this._use_blindscroll || !evtkind) {
					this._aniframe_rowscroll_end.start();
				}
				else {
					this._adjustGridScrollRows_callback_onscroll();
				}
			}
		}
		else {
			if (evttype == "track" || evttype == "trackfirst" || evttype == "tracklast") {
				cnt = this._scroll_vpos_queue.push(postvpos);

				if (cnt == 1) {
					if (this._use_blindscroll) {
						limit = (this._bodyrowheight + this._floating_row_addsize) + this._floating_gap *  2;
						if (this._bodyBand._getClientHeight() < limit) {
							this._aniframe_rowscroll.start();
						}
						else {
							this._aniframe_rowscroll_float.start();
						}
					}
					else {
						this._aniframe_rowscroll.start();
					}
				}
			}
			else if (evtkind == "fling") {
				if (this._use_blindscroll) {
					limit = (this._bodyrowheight + this._floating_row_addsize) + this._floating_gap *  2;

					if (this._bodyBand._getClientHeight() < limit) {
						this._adjustGridScrollRows_callback(true);
					}
					else {
						this._floatingScrollRows_callback(true);
					}
				}
				else {
					this._adjustGridScrollRows_callback(true);
				}
			}
			else if (evttype != "trackstart") {
				this._adjustGridScrollRows_callback_end();
			}
		}

		this._procRefreshDOM = undefined;

		return true;
	};

	_pGrid._adjustGridScrollCols_callback = function () {
		var control_elem = this._control_element;
		var pos = this._hscrollmng._pos;

		var hscroll_limit = control_elem.hscroll_limit;

		if (pos > hscroll_limit) {
			pos = hscroll_limit;
		}

		this._scroll_hpos_queue.pop();

		if (this._scroll_hpos_queue.length > 0) {
			this._aniframe_colscroll.start();
		}

		if (!nexacro._isTouchInteraction) {
			this._last_scroll_left = control_elem.scroll_left;
			this._control_element.setElementHScrollPos(pos);
			this._updateSelector("hscroll", pos - this._last_scroll_left);
		}

		var dir = pos - this._last_scroll_left;

		if (this._bodyBand) {
			this._bodyBand._matrix._adjustColsDisplay(false, true, undefined, dir);
		}
		if (this._headBand) {
			this._headBand._matrix._adjustColsDisplay(false, true, undefined, dir);
		}
		if (this._summBand) {
			this._summBand._matrix._adjustColsDisplay(false, true, undefined, dir);
		}

		this._adjustOverlayControls(false);
	};

	_pGrid._adjustGridScrollCols_callback2 = function (dir) {
		if (this._headBand) {
			this._headBand._matrix._adjustColsDisplay2(dir);
		}
		if (this._bodyBand) {
			this._bodyBand._matrix._adjustColsDisplay2(dir);
		}
		if (this._summBand) {
			this._summBand._matrix._adjustColsDisplay2(dir);
		}

		this._adjustOverlayControls(false);
	};

	_pGrid._adjustGridScrollCols_callback3 = function (dir, startcol, endcol, starttime, updatecol) {
		var timestamp = (performance ? performance.now() : (new Date()));

		var nextcol, framecolcnt = 1;
		if (this._is_performance_scroll) {
			if (updatecol < 0) {
				this._bodyBand._matrix._adjustColsScrollEnd(startcol, endcol);
				return;
			}

			var duration = timestamp - starttime;
			if (duration > this._scroll_threshold) {
				framecolcnt = (endcol - startcol) / this._scroll_end_divider;
			}

			var start, end;
			if (dir > 0) {
				start = updatecol;
				end = endcol;
			}
			else if (dir < 0) {
				start = startcol;
				end = updatecol;
			}

			if (this._headBand) {
				nextcol = this._headBand._matrix._adjustColsScroll(dir, start, end, framecolcnt);
			}
			if (this._summBand) {
				nextcol = this._summBand._matrix._adjustColsScroll(dir, start, end, framecolcnt);
			}
			if (this._bodyBand) {
				nextcol = this._bodyBand._matrix._adjustColsScroll(dir, start, end, framecolcnt);
			}

			var bcontinue = false;
			if (dir > 0) {
				nextcol += 1;
				bcontinue = (nextcol <= endcol);
			}
			else if (dir < 0) {
				nextcol -= 1;
				bcontinue = (nextcol >= startcol);
			}

			if (bcontinue) {
				this._aniframe_colscroll.start();
			}
			else {
				if (this._bodyBand) {
					nextcol = -1;
					this._aniframe_colscroll.start();
				}
			}
		}
		else {
			if (this._headBand) {
				this._headBand._matrix._adjustColsDisplay2(dir);
			}
			if (this._bodyBand) {
				this._bodyBand._matrix._adjustColsDisplay2(dir);
			}
			if (this._summBand) {
				this._summBand._matrix._adjustColsDisplay2(dir);
			}
		}

		this._adjustOverlayControls(false);

		return nextcol;
	};

	_pGrid._adjustGridScrollCols_callback_end = function () {
		var pos = this._hscrollmng._pos;
		var control_elem = this._control_element;
		var hscroll_limit = control_elem.hscroll_limit;

		if (pos > hscroll_limit) {
			pos = hscroll_limit;
		}

		this._scroll_hpos_queue = [];
		this._aniframe_colscroll_end.stop();

		var dir = pos - this._last_scroll_left;

		this._last_scroll_left = this._control_element.scroll_left;
		this._control_element.setElementHScrollPos(pos);
		this._updateSelector("hscroll", pos - this._last_scroll_left);

		if (this._bodyBand) {
			this._bodyBand._matrix._adjustColsDisplay(false, true, undefined, dir);
		}
		if (this._headBand) {
			this._headBand._matrix._adjustColsDisplay(false, true, undefined, dir);
		}
		if (this._summBand) {
			this._summBand._matrix._adjustColsDisplay(false, true, undefined, dir);
		}

		this._adjustOverlayControls(false);
	};

	_pGrid._each_adjustGridScrollCols_callback = function (pthis, dir, start, end) {
		var starttime = (performance ? performance.now() : (new Date()));
		var updatecol = (dir > 0 ? start : (dir < 0 ? end : start));
		return function () {
			updatecol = pthis._adjustGridScrollCols_callback3(dir, start, end, starttime, updatecol);
		};
	};

	_pGrid._adjustGridScrollCols_callback_onscroll_after = function (dir, pos, startcol, endcol) {
		if (!this._is_performance_scroll) {
			return;
		}

		if (this._last_scroll_left != pos) {
			this._last_scroll_left = pos;

			if (this._use_eachscroll) {
				this._aniframe_colscroll = new nexacro.AnimationFrame(this, this._each_adjustGridScrollCols_callback(this, dir, startcol, endcol));
				this._aniframe_colscroll.start();
			}
			else {
				this._aniframe_colscroll = new nexacro.AnimationFrame(this, this._adjustGridScrollCols_callback2(dir));
				this._aniframe_colscroll.start();
			}
		}
	};

	_pGrid._adjustGridScrollCols_callback_onscroll = function () {
		var control_elem = this._control_element;
		this._no_use_onscroll_callback_after = false;
		var hscroll_limit = control_elem.hscroll_limit;
		var pos = this._hscrollmng._pos;

		if (pos > hscroll_limit) {
			pos = hscroll_limit;
		}

		this._last_scroll_left = control_elem.scroll_left;
		control_elem.setElementHScrollPos(pos);
		this._updateSelector("hscroll", pos - this._last_scroll_left);
	};

	_pGrid.on_hscroll = function (posthpos, evttype, evtkind) {
		if (this.scrolltype == "none" || this.scrolltype == "vertical") {
			return;
		}


		var control_elem = this._control_element;

		if (!control_elem || evttype == "tracklastover" || evttype == "trackfirstover") {
			return;
		}

		if (evttype == "trackend" || evttype == "first" || evttype == "last") {
			this._procRefreshDOM = true;
		}

		if (!this._aniframe_colscroll) {
			var pThis = this;
			this._scroll_hpos_queue = [];

			this._aniframe_colscroll = new nexacro.AnimationFrame(this, function () {
				pThis._adjustGridScrollCols_callback();
			});
			this._aniframe_colscroll_end = new nexacro.AnimationFrame(this, function () {
				pThis._adjustGridScrollCols_callback_end();
			});
		}
		else {
			this._aniframe_colscroll_end.stop();
		}

		if (this._is_performance_scroll) {
			this._aniframe_colscroll.stop();

			if (evttype == "trackend") {
				this._adjustGridScrollCols_callback_end();
			}
			else {
				this._adjustGridScrollCols_callback_onscroll();
			}
		}
		else {
			if (evttype == "track" || evttype == "trackfirst" || evttype == "tracklast") {
				var cnt = this._scroll_hpos_queue.push(posthpos);

				if (cnt == 1) {
					this._aniframe_colscroll.start();
				}
			}
			else if (evttype != "trackstart") {
				this._adjustGridScrollCols_callback_end();
			}
		}
		this._procRefreshDOM = undefined;
		return true;
	};

	_pGrid._use_blindscroll = false;
	_pGrid.set_fastvscrolltype = function (v) {
		if (this.fastvscrolltype != v) {
			switch (v) {
				case "default":
					this._float_updown = false;
					this._float_center = false;
					this._use_blindscroll = false;
					this._float_move = false;
					break;
				case "centerdisplay":
					this._float_updown = false;
					this._float_center = true;
					this._use_blindscroll = true;
					this._float_move = false;
					break;
				case "topdisplay":
					this._float_updown = false;
					this._float_center = false;
					this._use_blindscroll = true;
					this._float_move = false;
					break;
				case "topbottomdisplay":
					this._float_updown = true;
					this._float_center = false;
					this._use_blindscroll = true;
					this._float_move = false;
					break;
				case "topcenterbottomdisplay":
					this._float_updown = true;
					this._float_center = true;
					this._use_blindscroll = true;
					this._float_move = false;
					break;
				case "trackbarfollow":
					this._float_updown = false;
					this._float_center = false;
					this._use_blindscroll = true;
					this._float_move = true;
					break;
				default:
					return;
			}
			this.fastvscrolltype = v;
			this.on_apply_fastvscrolltype();
		}
	};

	_pGrid.on_apply_fastvscrolltype = function () {
		this._destroyHighlightRow();
		this._createHighlightRow();

		if (!this._bodyBand) {
			return;
		}

		var pthis = this;

		if (this._use_blindscroll && !this._aniframe_rowscroll_float) {
			this._aniframe_rowscroll_float = new nexacro.AnimationFrame(this, function () {
				pthis._floatingScrollRows_callback();
			});
		}
	};

	_pGrid._is_performance_scroll = false;
	_pGrid._use_eachscroll = false;
	_pGrid.set_scrolldisplaymode = function (v) {
		if (this.scrolldisplaymode != v) {
			switch (v) {
				case "normal":
				case "page":
				case "line":
					this.scrolldisplaymode = v;
					this.on_apply_scrolldisplaymode();
					break;
			}
		}
	};

	_pGrid.on_apply_scrolldisplaymode = function () {
		if (nexacro._Browser == "IE" || (nexacro._Browser == "Edge" && nexacro._BrowserType == "Edge")) {
			if (!nexacro._use_translate_scroll) {
				switch (this.scrolldisplaymode) {
					case "normal":
						this._use_eachscroll = false;
						this._moverow_frame = this._moverow_frame_df;
						this._is_performance_scroll = false;
						break;
					case "page":
						this._use_eachscroll = false;
						this._moverow_frame = this._moverow_frame_df;
						this._is_performance_scroll = true;
						break;
					case "line":
						this._use_eachscroll = true;
						this._moverow_frame = 1;
						this._is_performance_scroll = true;
						break;
					default:
						return;
				}
			}
		}

		if (this._aniframe_rowscroll) {
			this._aniframe_rowscroll.destroy();
			this._aniframe_rowscroll = null;
		}

		if (this._aniframe_colscroll) {
			this._aniframe_colscroll.destroy();
			this._aniframe_colscroll = null;
		}

		var pThis = this;
		if (!this._aniframe_rowscroll_end) {
			this._aniframe_rowscroll_end = new nexacro.AnimationFrame(this, function () {
				pThis._adjustGridScrollRows_callback_end();
			});
		}

		if (this._is_performance_scroll || (nexacro._isTouchInteraction && nexacro._Browser != "Runtime")) {
			if (this._bodyBand) {
				this._bodyBand._control_element._setOnScrollCallbackTarget(this);
			}

			this._aniframe_rowscroll = new nexacro.AnimationFrame(this, function () {
				pThis._adjustGridScrollRows_callback_onscroll_after();
			});
		}
		else {
			this._aniframe_rowscroll = new nexacro.AnimationFrame(this, function () {
				pThis._adjustGridScrollRows_callback();
			});
		}
	};

	_pGrid._isWheelScrollable = function (delta) {
		var control_elem = this._control_element;
		if (!control_elem) {
			return false;
		}

		var st = control_elem.scroll_top;
		var sh = control_elem.container_maxheight;
		var ch = this._getBodyClientSize()[1];

		if ((st + ch >= sh && delta < 0) || (st == 0 && delta > 0)) {
			return false;
		}

		return true;
	};

	_pGrid._wheel_delta = 120;
	_pGrid._setVScrollDefaultAction = function (wheelDelta) {
		if (this.scrolltype == "none" || this.scrolltype == "horizontal") {
			return false;
		}

		var absdelta = Math.abs(wheelDelta);
		var pos, max;
		var vscroll = this._vscrollmng;
		var prevpos = vscroll.pos;
		var cnt = Math.floor(absdelta / this._wheel_delta);

		if (cnt == 0) {
			cnt = 1;
		}

		var scrollrow = (this.wheelscrollrow *  cnt);

		if (this._scrollpixel != "all") {
			if (wheelDelta < 0) {
				if (vscroll.max > vscroll.pos) {
					pos = vscroll.pos + scrollrow;
				}
				else {
					vscroll.setPixelPos(vscroll._pos - wheelDelta, "mousewheel_v");
					if (prevpos != vscroll.pos) {
						return true;
					}

					return false;
				}
			}
			else {
				if (vscroll.min < vscroll.pos) {
					pos = vscroll.pos - scrollrow;
				}
				else {
					vscroll.setPixelPos(vscroll._pos - wheelDelta, "mousewheel_v");
					if (prevpos != vscroll.pos) {
						return true;
					}

					return false;
				}
			}
		}
		else {
			if (wheelDelta < 0) {
				pos = vscroll._scroll_reverse_convert(vscroll.pos, true)[0];
				max = vscroll._scroll_reverse_convert(vscroll.max, true)[0];

				if (max > pos) {
					pos += scrollrow;
				}
				else {
					vscroll.setPixelPos(vscroll._pos - wheelDelta, "mousewheel_v");

					if (prevpos != vscroll.pos) {
						return true;
					}

					return false;
				}
			}
			else {
				pos = vscroll._scroll_reverse_convert(vscroll.pos, true)[0];
				pos -= scrollrow;
			}
		}

		vscroll.setRowPos(pos + this._getFixRowCnt(), "mousewheel_v");

		if (prevpos != vscroll.pos) {
			return true;
		}

		return false;
	};

	_pGrid._makeEventInfo = function (cellobj, subcellobj, from_refer_comp) {
		var obj = {
			cell : -1, 
			col : -1, 
			row : -9, 
			subrow : -1, 
			mergecell : -1, 
			mergecol : -1, 
			mergerow : -1, 
			pivotindex : -9
		};

		if (cellobj && cellobj._type_name == "GridCellControl") {
			obj.cell = cellobj._cellidx;
			obj.col = cellobj._refinfo._col;
			obj.row = this._getDataRow(cellobj._rowidx);
			obj.subrow = cellobj._refinfo._row;

			if (subcellobj) {
				obj.col += subcellobj._refinfo._col;
				obj.mergecell = subcellobj._cellidx;
				obj.mergecol = subcellobj._refinfo._col;
				obj.mergerow = subcellobj._refinfo._row;
			}
		}
		else {
			var band = this._findBandObj(from_refer_comp);

			if (band) {
				if (band.id == "head") {
					obj.row = -1;
				}
				else if (band.id == "summary") {
					obj.row = -2;
				}
			}
		}
		return obj;
	};

	_pGrid.on_fire_sys_onslideend = function (elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, from_comp, from_refer_comp) {
		if (this._aniframe_colscroll_end) {
			this._aniframe_colscroll_end.start();
		}
		if (this._aniframe_rowscroll_end) {
			this._aniframe_rowscroll_end.start();
		}

		this._applyResizer();
		return nexacro.Component.prototype.on_fire_sys_onslideend.call(this, elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, from_comp, from_refer_comp);
	};

	_pGrid.on_fire_sys_onflingend = function () {
		if (this._aniframe_colscroll_end) {
			this._aniframe_colscroll_end.start();
		}
		if (this._aniframe_rowscroll_end) {
			this._aniframe_rowscroll_end._skipscrolltask = undefined;
			this._aniframe_rowscroll_end.start();
		}

		this._isflingend = true;

		return true;
	};

	_pGrid._on_nodataareaclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		if (!this._is_alive) {
			return;
		}
		if (this.enable) {
			this.on_fire_onnodataareaclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);
		}
		return true;
	};

	_pGrid.on_fire_onnodataareaclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		if (this.onnodataareaclick && this.onnodataareaclick._has_handlers) {
			var evt = new nexacro.MouseEventInfo(from_comp, "onnodataareaclick", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);
			return this.onnodataareaclick._fireEvent(this, evt);
		}
		return true;
	};

	_pGrid._on_nodataareadblclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		if (!this._is_alive) {
			return;
		}
		if (this.enable) {
			this.on_fire_onnodataareadblclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);
		}
		return true;
	};

	_pGrid.on_fire_onnodataareadblclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		if (this.onnodataareadblclick && this.onnodataareadblclick._has_handlers) {
			var evt = new nexacro.MouseEventInfo(from_comp, "onnodataareadblclick", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);
			return this.onnodataareadblclick._fireEvent(this, evt);
		}
		return true;
	};

	_pGrid.on_fire_user_ondragenter = function (src_comp, src_refer_comp, dragdata, userdata, datatype, filelist, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		if (this._noFireDragFlag == true || (src_comp && src_comp._selectscrollmode && (src_comp._selectscrollmode == "scroll"))) {
			return true;
		}

		var cellobj = from_refer_comp;
		cellobj = this._findCellObj(cellobj);

		if (cellobj) {
			if (cellobj.parentcell) {
				cellobj = cellobj.parentcell;
			}
		}

		var posobj = this._recalcXY(cellobj, canvasX, canvasY, false, from_refer_comp);
		canvasX = posobj.canvasX;
		canvasY = posobj.canvasY;
		clientX = posobj.clientX;
		clientY = posobj.clientY;

		return nexacro.Component.prototype.on_fire_user_ondragenter.call(this, src_comp, src_refer_comp, dragdata, userdata, datatype, filelist, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);
	};

	_pGrid.on_fire_user_ondragleave = function (src_comp, src_refer_comp, dragdata, userdata, datatype, filelist, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		if (this._noFireDragFlag == true || (src_comp && src_comp._selectscrollmode && (src_comp._selectscrollmode == "scroll"))) {
			return true;
		}

		var cellobj = from_refer_comp;
		cellobj = this._findCellObj(cellobj);

		if (cellobj) {
			if (cellobj.parentcell) {
				cellobj = cellobj.parentcell;
			}
		}

		var posobj = this._recalcXY(cellobj, canvasX, canvasY, false, from_refer_comp);
		canvasX = posobj.canvasX;
		canvasY = posobj.canvasY;
		clientX = posobj.clientX;
		clientY = posobj.clientY;

		return nexacro.Component.prototype.on_fire_user_ondragleave.call(this, src_comp, src_refer_comp, dragdata, userdata, datatype, filelist, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);
	};

	_pGrid.on_fire_user_ondragmove = function (src_comp, src_refer_comp, dragdata, userdata, datatype, filelist, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		var trackInfo = nexacro._cur_track_info;
		if (this._noFireDragFlag == true) {
			if (trackInfo && trackInfo.target && trackInfo.target._is_tracking == true && (this._resizer_rowctrl == trackInfo.target || this._resizer_colctrl == trackInfo.target)) {
				trackInfo.target._on_movetrack(trackInfo.distX, trackInfo.distY);
			}
			return true;
		}
		var ret = false;
		var cellobj = from_refer_comp;
		cellobj = this._findCellObj(cellobj);

		var subcellobj;
		if (cellobj) {
			if (cellobj.parentcell) {
				subcellobj = cellobj;
				cellobj = cellobj.parentcell;
			}
		}

		var posobj = this._recalcXY(cellobj, canvasX, canvasY, false, from_refer_comp);
		canvasX = posobj.canvasX;
		canvasY = posobj.canvasY;
		clientX = posobj.clientX;
		clientY = posobj.clientY;

		if (!src_comp || !src_comp._selectscrollmode || src_comp._selectscrollmode && (src_comp._selectscrollmode !== "scroll")) {
			if (this.ondragmove && this.ondragmove._has_handlers) {
				var evtinfo = this._makeEventInfo(cellobj, subcellobj, from_refer_comp);
				var cell = evtinfo.cell;
				var col = evtinfo.col;
				var mergecell = evtinfo.mergecell;
				var mergecol = evtinfo.mergecol;
				var mergerow = evtinfo.mergerow;
				var pivotindex = evtinfo.pivotindex;
				var row = evtinfo.row;
				var subrow = evtinfo.subrow;

				var evt = new nexacro.GridDragEventInfo(this, "ondragmove", dragdata, userdata, datatype, filelist, src_comp, src_refer_comp, from_comp, from_refer_comp, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, cell, col, mergecell, mergecol, mergerow, pivotindex, row, subrow, meta_key);

				ret = this.ondragmove._fireUserEvent(this, evt);
			}
		}

		if (trackInfo && trackInfo.target && trackInfo.target._is_tracking == true && (this._resizer_rowctrl == trackInfo.target || this._resizer_colctrl == trackInfo.target)) {
			trackInfo.target._on_movetrack(trackInfo.distX, trackInfo.distY);
		}
		return ret;
	};

	_pGrid.on_fire_sys_ondragmove = function (src_comp, src_refer_comp, dragdata, userdata, datatype, filelist, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, xdeltavalue, ydeltavalue, meta_key) {
		if (this._selectscrollmode == "select") {
			if (!this._is_drag_sameselect) {
				return this._areaselectMove(from_refer_comp, canvasX, canvasY);
			}
			else {
				this._is_drag_selecting = true;
			}
		}
		else {
			return nexacro.Component.prototype.on_fire_sys_ondragmove.call(this, src_comp, src_refer_comp, dragdata, userdata, datatype, filelist, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, xdeltavalue, ydeltavalue, meta_key);
		}
	};

	_pGrid._noFireDragFlag = false;
	_pGrid.on_fire_user_ondrag = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, self_refer_comp, meta_key) {
		var cellobj = from_refer_comp;
		cellobj = this._findCellObj(cellobj);

		var subcellobj;
		if (cellobj) {
			if (cellobj.parentcell) {
				subcellobj = cellobj;
				cellobj = cellobj.parentcell;
			}
		}
		this._noFireDragFlag = false;

		var evt = null;
		var userdata = null;
		var dragdata = this._getDragData();
		var ret = null;

		if (this.ondrag && this.ondrag._has_handlers) {
			var posobj = this._recalcXY(cellobj, canvasX, canvasY, false, from_refer_comp);
			canvasX = posobj.canvasX;
			canvasY = posobj.canvasY;
			clientX = posobj.clientX;
			clientY = posobj.clientY;

			var evtinfo = this._makeEventInfo(cellobj, subcellobj, from_refer_comp);
			var cell = evtinfo.cell;
			var col = evtinfo.col;
			var mergecell = evtinfo.mergecell;
			var mergecol = evtinfo.mergecol;
			var mergerow = evtinfo.mergerow;
			var pivotindex = evtinfo.pivotindex;
			var row = evtinfo.row;
			var subrow = evtinfo.subrow;
			evt = new nexacro.GridDragEventInfo(this, "ondrag", this._getDragData(), null, "text", null, this, self_refer_comp, from_comp, from_refer_comp, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, cell, col, mergecell, mergecol, mergerow, pivotindex, row, subrow, meta_key);
		}
		if (this._selectscrollmode !== "scroll") {
			if (evt) {
				if (this.ondrag._fireUserEvent(this, evt) == true) {
					ret = [true, this, self_refer_comp, evt.dragdata, evt.userdata];
				}
				else if (this.ondrag.defaultprevented == true) {
					ret = [false, this, self_refer_comp, evt.dragdata, evt.userdata];
				}
			}
		}
		else {
			this._noFireDragFlag = true;
		}



		var resize_cursor;
		var resizer = false;
		if (this._resizer_rowctrl && this._resizer_rowctrl._is_tracking == true) {
			resize_cursor = nexacro.CursorObject("row-resize");
			this._setGlobalCursor(resize_cursor, cellobj, cellobj);
			resizer = true;
		}
		else if (this._resizer_colctrl && this._resizer_colctrl._is_tracking == true) {
			resize_cursor = nexacro.CursorObject("col-resize");
			this._setGlobalCursor(resize_cursor, cellobj, cellobj);
			resizer = true;
		}
		else if (cellobj && cellobj._type_name == "GridCellControl" && cellobj._rowidx == -1) {
			if (this.cellmovingtype != "none" && this._selectscrollmode !== "scroll") {
				var colidx = cellobj._refinfo._col;
				var info0 = this._getColMergeInfo("head", colidx);
				var info1 = this._getColMergeInfo("body", colidx);
				var info2 = this._getColMergeInfo("summ", colidx);
				var dragcursor = nexacro.CursorObject("move");

				if (info0[1] == 1 && (info1 == null || info1[1] == 1) && (info2 == null || info2[1] == 1)) {
					this._movingcell = cellobj;
					cellobj.parent._setTempCursor(dragcursor);
				}
			}
			else {
				this._movingcell = null;
			}

			if (this._movingcell != null) {
				if (ret) {
					this._noFireDragFlag = !ret[0];
					ret[0] = true;
				}
				else {
					this._noFireDragFlag = true;
					ret = [true, this, self_refer_comp, dragdata, userdata];
				}
			}
			else {
				if (this._selectscrollmode == "scroll") {
					ret = [this._noFireDragFlag, this, self_refer_comp, dragdata, userdata];
				}
			}
		}
		else if (this._selectscrollmode == "scroll") {
			ret = [this._noFireDragFlag, this, self_refer_comp, dragdata, userdata];
		}

		if (!ret) {
			ret = [false];
		}

		if (this._noFireDragFlag == true) {
			var dragInfo = nexacro._cur_drag_info;
			if (dragInfo) {
				dragInfo.isSelfAction = true;
			}
		}
		return ret;
	};
	_pGrid._on_bubble_drag = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, meta_key) {
		if (!this._is_alive) {
			return;
		}
		var clientXY, canvas;
		var pThis;
		var is_parent_bubble = false;
		var ret;
		var bubblefire = false;
		if (event_bubbles === undefined) {
			var is_subcontrol_bubble;

			if (!refer_comp) {
				refer_comp = this;
			}

			pThis = this._getFromComponent(this);

			if (this._is_subcontrol) {
				is_subcontrol_bubble = true;
			}
			else {
				if (this.visible && this._isEnable()) {
					is_subcontrol_bubble = false;
					clientXY = this._getClientXY(canvasX, canvasY);

					event_bubbles = this.on_fire_user_ondrag(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, refer_comp, refer_comp, meta_key);
					is_parent_bubble = (event_bubbles[0] == true && this._noFireDragFlag == true && this._selectscrollmode != "scroll");
					if (!event_bubbles || event_bubbles[0] !== true) {
						if (!this.ondrag || (pThis && (pThis.ondrag && !pThis.ondrag.defaultprevented))) {
							this.on_fire_sys_ondrag(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, refer_comp, refer_comp, meta_key);
						}
					}
				}
			}

			if (!event_bubbles || event_bubbles[0] !== true || is_parent_bubble) {
				if (pThis && (!pThis.ondrag || (pThis.ondrag && !pThis.ondrag.stoppropagation)) && !this._window && this.parent && !this.parent._is_application) {
					canvas = this._getRecalcCanvasXY(elem, canvasX, canvasY);

					canvasX = canvas[0];
					canvasY = canvas[1];
					if (is_subcontrol_bubble) {
						ret = this.parent._on_bubble_drag(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, this, refer_comp, meta_key);
					}
					else {
						ret = this.parent._on_bubble_drag(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, false, this, refer_comp, meta_key);
					}
					bubblefire = true;
				}
			}
			if (!is_parent_bubble && !this._noFireDragFlag == true && bubblefire == true) {
				return ret;
			}
			return event_bubbles;
		}
		else {
			if ((!event_bubbles || event_bubbles[0] !== true || (event_bubbles[0] == true && this._noFireDragFlag == true)) && this.parent && !this.parent._is_application) {
				clientXY = this._getClientXY(canvasX, canvasY);
				if (this.visible && this._isEnable()) {
					event_bubbles = this.on_fire_user_ondrag(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, refer_comp, this, meta_key);
					is_parent_bubble = (event_bubbles[0] == true && this._noFireDragFlag == true && this._selectscrollmode != "scroll");
				}
				if (!event_bubbles || event_bubbles[0] !== true || is_parent_bubble) {
					pThis = this._getFromComponent(this);

					if (this.visible && this._isEnable()) {
						if (pThis && (!pThis.ondrag || (pThis.ondrag && !pThis.ondrag.defaultprevented))) {
							this.on_fire_sys_ondrag(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, refer_comp, this, meta_key);
						}
					}

					if (pThis && (!pThis.ondrag || (pThis.ondrag && !pThis.ondrag.stoppropagation)) && !this._window && this.parent && !this.parent._is_application) {
						canvas = this._getRecalcCanvasXY(elem, canvasX, canvasY);

						canvasX = canvas[0];
						canvasY = canvas[1];

						ret = this.parent._on_bubble_drag(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, false, fire_comp, refer_comp, meta_key);
						bubblefire = true;
					}
				}
			}
			if (!is_parent_bubble && !this._noFireDragFlag == true && bubblefire == true) {
				return ret;
			}
			return event_bubbles;
		}
	};
	_pGrid.on_fire_user_ondrop = function (src_comp, src_refer_comp, dragdata, userdata, datatype, filelist, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		var cellobj = from_refer_comp;
		cellobj = this._findCellObj(cellobj);

		var subcellobj;
		if (cellobj) {
			if (cellobj.parentcell) {
				subcellobj = cellobj;
				cellobj = cellobj.parentcell;
			}
		}

		var posobj = this._recalcXY(cellobj, canvasX, canvasY, false, from_refer_comp);
		canvasX = posobj.canvasX;
		canvasY = posobj.canvasY;
		clientX = posobj.clientX;
		clientY = posobj.clientY;

		if (this._resizer_rowctrl && this._resizer_rowctrl._is_tracking == true) {
			this._setGlobalCursor(null, cellobj, cellobj);
		}
		else if (this._resizer_colctrl && this._resizer_colctrl._is_tracking == true) {
			this._setGlobalCursor(null, cellobj, cellobj);
		}
		else if (this.cellmovingtype != "none" && this._movingcell) {
			var movingcell = this._movingcell;
			var format = this._curFormat;

			movingcell.parent._setTempCursor(null);

			if (movingcell && movingcell._is_alive && movingcell != cellobj && cellobj._rowidx == -1) {
				var fromcol = movingcell._refinfo._col;
				var tocol = cellobj._refinfo._col;
				var fromcolspan = movingcell._refinfo._colspan;

				var info = this._getColMergeInfo("head", tocol);
				tocol = info[0];
				var tocolspan = info[1];

				this._autofitcol_rate = [];
				format._moveColumn(fromcol, tocol, fromcolspan, tocolspan, this.cellmovingtype);

				this._addRefreshContents("cellmoving", this._headBand);
				this._addRefreshContents("cellmoving", this._bodyBand);
				this._addRefreshContents("cellmoving", this._summBand);
			}
			this._movingcell = null;
		}

		if (this._noFireDragFlag == true || (src_comp && src_comp._selectscrollmode && (src_comp._selectscrollmode == "scroll"))) {
			if (src_comp && src_comp._noFireDragFlag) {
				src_comp._noFireDragFlag = false;
			}
			this._noFireDragFlag = false;
			return true;
		}

		if (this.ondrop && this.ondrop._has_handlers) {
			var evtinfo = this._makeEventInfo(cellobj, subcellobj, from_refer_comp);
			var cell = evtinfo.cell;
			var col = evtinfo.col;
			var mergecell = evtinfo.mergecell;
			var mergecol = evtinfo.mergecol;
			var mergerow = evtinfo.mergerow;
			var pivotindex = evtinfo.pivotindex;
			var row = evtinfo.row;
			var subrow = evtinfo.subrow;

			var evt = new nexacro.GridDragEventInfo(this, "ondrop", dragdata, userdata, datatype, filelist, src_comp, src_refer_comp, from_comp, from_refer_comp, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, cell, col, mergecell, mergecol, mergerow, pivotindex, row, subrow, meta_key);

			return this.ondrop._fireUserEvent(this, evt);
		}
		return false;
	};

	_pGrid._isDownUpScroll = function () {
		if ((this._down_scroll_top >= 0 && this._down_scroll_top != this._last_scroll_top) || this._isflingend) {
			return true;
		}

		return false;
	};

	_pGrid._mouseSelection = function (cellobj, ctrl_key, shift_key, canvasX, canvasY, from_comp, from_refer_comp, no_select, meta_key) {
		var editor = this._currentCellEditor;
		var fobj = from_refer_comp;
		var bhide = true;

		if (fobj._editor && fobj._editor == editor) {
			fobj = fobj._editor;
		}

		while (fobj) {
			if (fobj == editor || fobj instanceof nexacro.ScrollBarControl) {
				bhide = false;
				break;
			}
			fobj = fobj.parent;
		}

		this._select_cancel = true;

		if (bhide && editor) {
			this._hideEditor();
		}

		var select_cancel = this._select_cancel;
		this._select_cancel = undefined;

		if (!select_cancel) {
			return;
		}
		if (this._resizer_colctrl && this._resizer_colctrl._is_tracking) {
			return;
		}
		if (this._resizer_rowctrl && this._resizer_rowctrl._is_tracking) {
			return;
		}
		if (this._isDownUpScroll()) {
			return;
		}

		if (cellobj && cellobj._type_name == "GridCellControl") {
			this._lbuttondown_proc = true;

			var band = cellobj._band.id;
			var retn = this._on_grid_lbuttondown(cellobj, band, ctrl_key, shift_key, no_select, meta_key);

			if (!cellobj._is_alive || no_select) {
				return;
			}

			var datarow;
			if (this._showEditorCell) {
				if (nexacro._toBoolean(this.readonly) == false) {
					if (retn) {
						var cell = cellobj;

						if (cell._virtualmerge) {
							this._showEditorMergeCell(cell, true);
						}
						else if (cell._hasEditor()) {
							cell._showEditor(true);
							datarow = this._getDataRow(cell._rowidx);
							this._beforeEditRowIdx = datarow;
							this._beforeEditCellIdx = cell._cellidx;
							this._showEditing = true;
						}
						else {
							cell._setSubControlFocus(true);
						}
					}
					else {
						this._onceTime_focus = true;
						this._showEditor();
						this._onceTime_focus = false;
					}
				}
				this._showEditorCell = false;
				this._showEditRowIdx = -1;
				this._showEditCellIdx = -1;
			}

			if (this.selectchangetype == "down" && nexacro._toBoolean(this.readonly) == false) {
				datarow = this._getDataRow(cellobj._rowidx);
				var displayType = cellobj._refinfo._getDisplaytype(datarow);

				if (displayType == "checkboxcontrol") {
					if (this.cellclickbound == "cell") {
						cellobj._needToggle("onlbuttondown", cellobj);
					}
					else {
						if (cellobj != from_refer_comp && cellobj._subComp && cellobj._subComp._toggleCheck) {
							if (cellobj.selected) {
								cellobj._subComp._toggleCheck();
							}
						}
					}
				}
				else {
					cellobj._needToggle("onlbuttondown", cellobj);
				}
			}
			this._lbuttondown_proc = false;
		}
	};

	_pGrid._common_fire_sys_lbuttondown = function (cellobj, ctrl_key, shift_key, canvasX, canvasY, from_comp, from_refer_comp, meta_key) {
		if (!this._is_alive) {
			return;
		}

		if (this.selectchangetype == "up") {
			if (this._isAreaSelect() && this._selectscrollmode == "select") {
				this._mouseSelection(cellobj, ctrl_key, shift_key, canvasX, canvasY, from_comp, from_refer_comp, meta_key);
			}
			else if (this.selecttype == "multirow") {
				this._mouseSelection(cellobj, ctrl_key, shift_key, canvasX, canvasY, from_comp, from_refer_comp, true, meta_key);
			}

			var win = this._getWindow();
			if (!win._cur_ldown_elem) {
				this._setdataobj = null;
			}
		}
		else {
			this._mouseSelection(cellobj, ctrl_key, shift_key, canvasX, canvasY, from_comp, from_refer_comp, meta_key);
		}

		if (this._is_down_act) {
			this._on_last_lbuttonup(true);
		}
	};

	_pGrid._common_fire_user_lbuttondown = function (cellobj, ctrl_key, shift_key, canvasX, canvasY, from_comp, from_refer_comp, meta_key) {
		if (!this._is_alive) {
			return;
		}

		this._resizerStart(canvasX, canvasY, cellobj, "down", from_refer_comp);

		var resizer_colctrl = this._resizer_colctrl;
		var resizer_rowctrl = this._resizer_rowctrl;
		var client = this._getClientXY(canvasX, canvasY);
		var win = this._getWindow();

		if (resizer_colctrl && resizer_colctrl._is_range) {
			resizer_colctrl._setTracksize(this._getClientHeight());

			if (resizer_colctrl._direction == "horizon") {
				resizer_colctrl.move(client[0], this._getClientTop(), 1, resizer_colctrl._tracksize);
			}

			nexacro._setTrackInfo(win, resizer_colctrl, win._curWindowX, win._curWindowY);
		}
		else if (resizer_rowctrl && resizer_rowctrl._is_range) {
			resizer_rowctrl._setTracksize(this._getClientWidth());

			if (resizer_rowctrl._direction == "vertical") {
				resizer_rowctrl.move(this._getClientLeft(), client[1], resizer_rowctrl._tracksize, 1);
			}

			nexacro._setTrackInfo(win, resizer_rowctrl, win._curWindowX, win._curWindowY);
		}

		if (this._select_ctrl) {
			this._select_ctrl._initTrackInfo();
		}
	};

	_pGrid._recalcTouchInfosXY = function (obj, touchinfos, need_recalcXY, from_refer_comp) {
		var touchinfo, posobj;
		for (var i = 0, n = touchinfos.length; i < n; i++) {
			if (touchinfo = touchinfos[i]) {
				posobj = this._recalcXY(obj, touchinfo.canvasx, touchinfo.canvasy, need_recalcXY, from_refer_comp);
				touchinfo.canvasx = posobj.canvasX;
				touchinfo.canvasy = posobj.canvasY;
				touchinfo.clientx = posobj.clientX;
				touchinfo.clienty = posobj.clientY;
			}
		}
	};

	_pGrid._getRecalcCanvasXY = function (elem, canvasX, canvasY) {
		if (this._recalcXY_info) {
			canvasX = this._recalcXY_info[0] + this._adjust_left;
			canvasY = this._recalcXY_info[1] + this._adjust_top;
			this._recalcXY_info = null;
		}
		else {
			canvasX += this._adjust_left - this._scroll_left || 0;
			canvasY += this._adjust_top - this._scroll_top || 0;
		}
		return [canvasX, canvasY];
	};

	_pGrid._recalcXY = function (obj, canvasX, canvasY, need_recalcXY, from_refer_comp) {
		var real_canvasX = canvasX;
		var real_canvasY = canvasY;
		var rect;

		if (obj._type_name == "GridCellControl") {
			if (need_recalcXY) {
				rect = obj._setPositionInGrid(null, false, true);

				real_canvasX = canvasX + rect.orgl;
				real_canvasY = canvasY + rect.orgt;
			}
			else {
				var area = obj._refinfo._area;
				var band = obj._band.id;

				if (area == "body") {
					real_canvasX = canvasX + this._curFormat.leftWidth;
					real_canvasX -= this._getScrollLeft();
				}
				else if (area == "right") {
					var gridrow = obj._getRowControl();
					rect = gridrow._getAreaRect(area);
					var areal = rect.left;
					real_canvasX = canvasX + areal;
				}

				if (band == "body" && !obj.parent._fixed) {
					real_canvasY -= this._getScrollTop();
					real_canvasY += this._fixed_height;
				}
			}
		}

		if (!(from_refer_comp instanceof nexacro.Grid)) {
			if (from_refer_comp._type_name == "GridRowControl") {
				real_canvasY -= this._getScrollTop();
			}

			var cur_border = this._border || this._getCSSStyleValue("border", this._status);
			if (cur_border) {
				real_canvasX += cur_border.left._width;
				real_canvasY += cur_border.top._width;
			}
		}

		this._recalcXY_info = [real_canvasX, real_canvasY];
		var real_clientXY = this._getClientXY(real_canvasX, real_canvasY);

		return {
			canvasX : real_canvasX, 
			canvasY : real_canvasY, 
			clientX : real_clientXY[0], 
			clientY : real_clientXY[1]
		};
	};

	_pGrid.on_fire_user_ontouchstart = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp, need_recalcXY) {
		return this.on_fire_ontouchstart(touchinfos, changedtouchinfos, from_comp, from_refer_comp, true, need_recalcXY);
	};

	_pGrid.on_fire_sys_ontouchstart = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp, need_recalcXY) {
		return this.on_fire_ontouchstart(touchinfos, changedtouchinfos, from_comp, from_refer_comp, false, need_recalcXY);
	};

	_pGrid._down_scroll_top = -1;
	_pGrid.on_fire_ontouchstart = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp, user_fire, need_recalcXY) {
		var cellobj = from_refer_comp;

		cellobj = this._findCellObj(cellobj);

		this._recalcTouchInfosXY(cellobj, changedtouchinfos, need_recalcXY, from_refer_comp);

		var touchinfo = nexacro._getFirstTouchInfo(changedtouchinfos);

		if (cellobj) {
			if (cellobj.parentcell) {
				cellobj = cellobj.parentcell;
			}
		}

		var retn = false;
		if (this.ontouchstart && this.ontouchstart._has_handlers) {
			var evt = new nexacro.TouchEventInfo(this, "ontouchstart", touchinfos, changedtouchinfos, from_comp, from_refer_comp);

			if (user_fire) {
				retn = this.ontouchstart._fireUserEvent(this, evt);
			}
			else {
				retn = this.ontouchstart._fireSysEvent(this, evt);
			}
		}

		this._down_scroll_top = this._last_scroll_top;

		if (touchinfo) {
			if (user_fire) {
				this._common_fire_user_lbuttondown(cellobj, false, false, touchinfo.canvasx, touchinfo.canvasy, from_comp, from_refer_comp);
			}
			else {
				if (this._selectscrollmode == "select") {
					if (cellobj._band && cellobj._band.id == "body") {
						if (this._isAreaSelect()) {
							this._common_fire_sys_lbuttondown(cellobj, false, false, touchinfo.canvasx, touchinfo.canvasy, from_comp, from_refer_comp);
						}
					}
				}
			}
		}
		return retn;
	};

	_pGrid.on_fire_user_onlbuttondown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key, need_recalcXY) {
		return this.on_fire_onlbuttondown(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, true, need_recalcXY, meta_key);
	};

	_pGrid.on_fire_sys_onlbuttondown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key, need_recalcXY) {
		return this.on_fire_onlbuttondown(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, false, need_recalcXY, meta_key);
	};

	_pGrid.on_touch_lbuttondown_basic_action = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, fire_comp, refer_comp, meta_key) {
		var retn = nexacro.Component.prototype.on_touch_lbuttondown_basic_action.call(this, elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, fire_comp, refer_comp, meta_key);

		var cellobj = refer_comp;

		cellobj = this._findCellObj(cellobj);

		if (cellobj) {
			if (cellobj.parentcell) {
				cellobj = cellobj.parentcell;
			}
		}

		var posobj = this._recalcXY(cellobj, canvasX, canvasY, false, refer_comp);
		canvasX = posobj.canvasX;
		canvasY = posobj.canvasY;
		this._lastmouseentercell = cellobj;
		this._down_scroll_top = this._last_scroll_top;
		this._common_fire_user_lbuttondown(cellobj, ctrl_key, shift_key, canvasX, canvasY, fire_comp, refer_comp, meta_key);

		if (this._selectscrollmode == "select") {
			if (cellobj._band && cellobj._band.id == "body") {
				if (this._isAreaSelect()) {
					this._common_fire_sys_lbuttondown(cellobj, ctrl_key, shift_key, canvasX, canvasY, fire_comp, refer_comp, meta_key);
				}
			}
		}

		return retn;
	};

	_pGrid.on_fire_onlbuttondown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, user_fire, need_recalcXY, meta_key) {
		var cellobj = from_refer_comp;

		cellobj = this._findCellObj(cellobj);

		var subcellobj;
		if (cellobj) {
			if (cellobj.parentcell) {
				subcellobj = cellobj;
				cellobj = cellobj.parentcell;
			}
		}

		var posobj = this._recalcXY(cellobj, canvasX, canvasY, need_recalcXY, from_refer_comp);
		canvasX = posobj.canvasX;
		canvasY = posobj.canvasY;
		clientX = posobj.clientX;
		clientY = posobj.clientY;

		var retn = false;
		if (this.onlbuttondown && this.onlbuttondown._has_handlers) {
			var evtinfo = this._makeEventInfo(cellobj, subcellobj, from_refer_comp);

			var obj = this._getRootComponent(from_comp);
			var cell = evtinfo.cell;
			var col = evtinfo.col;
			var mergecell = evtinfo.mergecell;
			var mergecol = evtinfo.mergecol;
			var mergerow = evtinfo.mergerow;
			var pivotindex = evtinfo.pivotindex;
			var row = evtinfo.row;
			var subrow = evtinfo.subrow;

			var evt = new nexacro.GridMouseEventInfo(obj, "onlbuttondown", cell, col, mergecell, mergecol, mergerow, pivotindex, row, subrow, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);

			if (user_fire) {
				retn = this.onlbuttondown._fireUserEvent(this, evt);
			}
			else {
				retn = this.onlbuttondown._fireSysEvent(this, evt);
			}
		}



		if (!nexacro._isTouchInteraction && button != "touch") {
			if (user_fire) {
				this._common_fire_user_lbuttondown(cellobj, ctrl_key, shift_key, canvasX, canvasY, from_comp, from_refer_comp, meta_key);
			}
			else {
				this._common_fire_sys_lbuttondown(cellobj, ctrl_key, shift_key, canvasX, canvasY, from_comp, from_refer_comp, meta_key);
			}
		}
		return retn;
	};

	_pGrid.on_fire_user_onrbuttondown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		var cellobj = from_refer_comp;

		cellobj = this._findCellObj(cellobj);

		var subcellobj;
		if (cellobj) {
			if (cellobj.parentcell) {
				subcellobj = cellobj;
				cellobj = cellobj.parentcell;
			}
		}

		var posobj = this._recalcXY(cellobj, canvasX, canvasY, false, from_refer_comp);
		canvasX = posobj.canvasX;
		canvasY = posobj.canvasY;
		clientX = posobj.clientX;
		clientY = posobj.clientY;

		if (this.onrbuttondown && this.onrbuttondown._has_handlers) {
			var evtinfo = this._makeEventInfo(cellobj, subcellobj, from_refer_comp);

			var obj = this._getRootComponent(from_refer_comp);
			var cell = evtinfo.cell;
			var col = evtinfo.col;
			var mergecell = evtinfo.mergecell;
			var mergecol = evtinfo.mergecol;
			var mergerow = evtinfo.mergerow;
			var pivotindex = evtinfo.pivotindex;
			var row = evtinfo.row;
			var subrow = evtinfo.subrow;

			var evt = new nexacro.GridMouseEventInfo(obj, "onrbuttondown", cell, col, mergecell, mergecol, mergerow, pivotindex, row, subrow, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);
			return this.onrbuttondown._fireUserEvent(this, evt);
		}
		return false;
	};

	_pGrid.on_fire_user_onmousedown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		return this.on_fire_onmousedown(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, true, meta_key);
	};

	_pGrid.on_fire_sys_onmousedown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		return this.on_fire_onmousedown(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, false, meta_key);
	};

	_pGrid.on_fire_onmousedown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, user_fire, meta_key) {
		var cellobj = from_refer_comp;

		cellobj = this._findCellObj(cellobj);

		var subcellobj;
		if (cellobj) {
			if (cellobj.parentcell) {
				subcellobj = cellobj;
				cellobj = cellobj.parentcell;
			}
		}

		var posobj = this._recalcXY(cellobj, canvasX, canvasY, false, from_refer_comp);
		canvasX = posobj.canvasX;
		canvasY = posobj.canvasY;
		clientX = posobj.clientX;
		clientY = posobj.clientY;

		var retn = false;
		if (this.onmousedown && this.onmousedown._has_handlers) {
			var evtinfo = this._makeEventInfo(cellobj, subcellobj, from_refer_comp);

			var obj = this._getRootComponent(from_comp);
			var cell = evtinfo.cell;
			var col = evtinfo.col;
			var mergecell = evtinfo.mergecell;
			var mergecol = evtinfo.mergecol;
			var mergerow = evtinfo.mergerow;
			var pivotindex = evtinfo.pivotindex;
			var row = evtinfo.row;
			var subrow = evtinfo.subrow;

			var evt = new nexacro.GridMouseEventInfo(obj, "onmousedown", cell, col, mergecell, mergecol, mergerow, pivotindex, row, subrow, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);

			if (user_fire) {
				retn = this.onmousedown._fireUserEvent(this, evt);
			}
			else {
				retn = this.onmousedown._fireSysEvent(this, evt);
			}
		}

		return retn;
	};

	_pGrid._resetFixSize = function () {
		var rowsizes = this._rowSizeList;
		var fixrow_height = 0, fix_height = 0;
		var srow = this._fixed_startrow;
		var erow = this._fixed_endrow;

		if (srow < 0) {
			return;
		}

		for (var i = 0, n = rowsizes.length; i < n; i++) {
			fixrow_height += rowsizes[i];

			if (srow > i) {
				continue;
			}

			fix_height += rowsizes[i];

			if (erow == i) {
				break;
			}
		}

		this._fixed_height = fix_height;
		this._fixedrow_height = fixrow_height;

		this._updateHighlightrowPos();
	};

	_pGrid.setFixedRow = function (row) {
		this._setFixedRow(row, undefined);
	};

	_pGrid._setFixedRow = function (fixrow, no_redraw) {
		if (this._hasTree) {
			return;
		}

		var bfix = (fixrow < 0) ? false : true;
		var srow, erow = this._endrowpos;

		srow = this._fixed_startrow;

		if (srow < 0) {
			srow = this._toprowpos[0];
		}

		if (fixrow >= 0 && (fixrow < srow || fixrow > erow)) {
			return;
		}

		if (bfix) {
			if (this._fixed_height) {
				this._setFixedRow(-1);
				return;
			}
		}

		if (bfix) {
			var rowcnt = this._getGridRowCount();
			var toppos = this._toprowpos[0];
			var fixedheight = 0, fixedrow_height = 0;
			var bset = false;
			var rowheight = 0;

			for (var i = 0; i < rowcnt; i++) {
				this._fixed_rowcnt++;
				rowheight = this._getRowSize(i);
				fixedrow_height += rowheight;

				if (i >= toppos) {
					if (this._fixed_startrow < 0) {
						this._fixed_startrow = i;
					}

					fixedheight += rowheight;
					bset = true;
				}

				if (i >= fixrow) {
					break;
				}
			}

			if (bset) {
				this._fixedrow_height = fixedrow_height;
				this._fixed_endrow = fixrow;
				this._fixed_height = fixedheight;

				if (!no_redraw) {
					this._recreate_contents_all(false, true, true);
				}
			}
			else {
				this._fixed_startrow = -9;
				this._fixed_endrow = -9;
				this._fixed_height = 0;
				this._fixedrow_height = 0;
				this._fixed_rowcnt = 0;
			}
		}
		else {
			srow = this._fixed_startrow;

			this._fixed_endrow = -9;
			this._fixed_height = 0;
			this._fixedrow_height = 0;
			this._fixed_rowcnt = 0;
			this._fixed_startrow = -9;

			if (!no_redraw) {
				this._recreate_contents_all(false, false, true);

				if (srow >= 0) {
					this._vscrollmng.setRowPos(srow);
				}
			}
		}

		this._destroyHighlightRow();
		this._createHighlightRow();
	};

	_pGrid._getFixRowCnt = function () {
		return (this._bodyBand) ? this._fixed_rowcnt : 0;
	};

	_pGrid._on_last_lbuttonup = function (down_act) {
		if (this._afterrecreatetask) {
			this._afterrecreatetask.destroy();
			this._afterrecreatetask = null;
		}

		if (this._movingcell) {
			this._movingcell.parent._setTempCursor(null);
			this._movingcell = null;
		}

		this._is_down_act = false;
		this._setdataobj = null;

		var args = this._after_recreate_contents_all;
		if (args != null) {
			if (!this._after_recreate) {
				this._is_after_recreate = true;
				this._recreate_contents_all(args[0], args[1], args[2], args[3]);
				this._after_recreate_contents_all = null;
				this._is_after_recreate = false;
				this._moveCellAfterFocus();
			}
		}

		if (this._after_recreate) {
			this._is_after_recreate = true;
			this._recreate();
			this._after_recreate = false;
			this._is_after_recreate = false;
			this._after_recreate_contents_all = null;
		}

		if (this._currentCellEditor && this._currentCellEditor._user_push) {
			this._currentCellEditor._user_push = false;
			this._currentCellEditor._changeStatus("focused", true);
			this._currentCellEditor._is_pushed_area = false;
			this._currentCellEditor._is_push = false;
		}

		if (this._after_hideeditor) {
			this._hideEditorMergeCell(this._after_hideeditor);
		}
	};

	_pGrid._on_last_keyup = function (down_act) {
		if (this._afterrecreatetask) {
			this._afterrecreatetask.destroy();
			this._afterrecreatetask = null;
		}

		this._is_down_act = false;
		this._setdataobj = null;

		var args = this._after_recreate_contents_all;
		if (args != null) {
			if (!this._after_recreate) {
				this._is_after_recreate = true;
				this._recreate_contents_all(args[0], args[1], args[2], args[3]);
				this._after_recreate_contents_all = null;
				this._is_after_recreate = false;
				this._moveCellAfterFocus();
			}
		}

		if (this._after_recreate) {
			this._is_after_recreate = true;
			this._recreate();
			this._after_recreate = false;
			this._is_after_recreate = false;
			this._after_recreate_contents_all = null;
		}

		if (this._after_hideeditor) {
			this._hideEditorMergeCell(this._after_hideeditor);
		}
	};

	_pGrid._common_fire_sys_lbuttonup = function (cellobj, altKey, ctrlKey, shiftKey, metaKey) {
		if (!this._is_alive) {
			return;
		}
		if (!this.enable) {
			return true;
		}

		if (cellobj && cellobj._type_name == "GridCellControl") {
			var newPos = this._getDataRow(cellobj._rowidx);

			if (this._isFakeCell(newPos)) {
				this._is_drag_selectstart = false;
				this._is_drag_selecting = false;
				this._is_drag_sameselect = false;
				return true;
			}
			if (ctrlKey == false && shiftKey == false && this._is_drag_selecting == false && newPos >= 0) {
				if (this._isMultiSelected()) {
					if (this._isIncludeSelectpos(cellobj._cellidx, newPos)) {
						this._clrMultiSelect();
						this._refreshAll(true);
						this._ChangeSelect(this._selectinfo.curcell, this._selectinfo.curcol, this._selectinfo.curdsrow, this._selectinfo.cursubrow, this._selectinfo.curpvt, false, this._selectinfo.curcell, this._selectinfo.curcol, this._selectinfo.curdsrow, this._selectinfo.cursubrow, this._selectinfo.curpvt, "body", "lbuttonup");
					}
				}
			}
		}

		this._is_drag_selectstart = false;
		this._is_drag_selecting = false;
		this._is_drag_sameselect = false;
		this._execRefreshContents("colsizing", false, true);
		this._execRefreshContents("rowsizing", false, false);
		this._execRefreshContents("cellmoving", true);
		this._exeFuncQueue("colsizing");
		this._exeFuncQueue("rowsizing");
	};

	_pGrid._is_down_act = false;
	_pGrid._cancelEvent = function (target_comp) {
		this._endExtraTrack();
		this._is_drag_selectstart = false;
		this._is_drag_selecting = false;
		this._is_drag_sameselect = false;
		this._is_down_act = this._isDownActionKeyMouse();
		this._setdataobj = null;
		this._focus_proc = null;

		if (this._afterrecreatetask) {
			this._afterrecreatetask.destroy();
			this._afterrecreatetask = null;
		}

		if (this._select_cancel) {
			this._select_cancel = false;
		}
	};

	_pGrid.on_fire_user_ontouchend = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp, need_recalcXY) {
		this._is_up_act = true;
		var retn = this.on_fire_ontouchend(touchinfos, changedtouchinfos, from_comp, from_refer_comp, true, need_recalcXY);
		this._is_up_act = false;

		return retn;
	};

	_pGrid.on_fire_sys_ontouchend = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp, need_recalcXY) {
		return this.on_fire_ontouchend(touchinfos, changedtouchinfos, from_comp, from_refer_comp, false, need_recalcXY);
	};

	_pGrid.on_fire_ontouchend = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp, user_fire, need_recalcXY) {
		var cellobj = from_refer_comp;

		cellobj = this._findCellObj(cellobj);

		this._recalcTouchInfosXY(cellobj, changedtouchinfos, need_recalcXY, from_refer_comp);

		if (cellobj) {
			if (cellobj.parentcell) {
				cellobj = cellobj.parentcell;
			}
		}

		var retn = false;
		if (this.ontouchend && this.ontouchend._has_handlers) {
			var evt = new nexacro.TouchEventInfo(this, "ontouchend", touchinfos, changedtouchinfos, from_comp, from_refer_comp);

			if (user_fire) {
				retn = this.ontouchend._fireUserEvent(this, evt);
			}
			else {
				retn = this.ontouchend._fireSysEvent(this, evt);
			}
		}

		if (!user_fire) {
			this._common_fire_sys_lbuttonup(cellobj, false, false, false);
		}

		return retn;
	};

	_pGrid._isCheckAlive = function (comp) {
		var parent = comp;
		while (parent != this) {
			if (!parent || parent._is_alive == false) {
				return false;
			}
			parent = parent.parent;
		}
		return true;
	};

	_pGrid._on_afterHideWaitComp = function (pseudo) {
		if (this._currentCellEditor) {
			this._currentCellEditor._setFocus(false);
		}
	};
	_pGrid.on_fire_user_onlbuttonup = function (button, altKey, ctrlKey, shiftKey, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem, metaKey, need_recalcXY) {
		this._is_up_act = true;
		var retn = this.on_fire_onlbuttonup(button, altKey, ctrlKey, shiftKey, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem, true, need_recalcXY, metaKey);
		this._is_up_act = false;

		return retn;
	};

	_pGrid.on_fire_sys_onlbuttonup = function (button, altKey, ctrlKey, shiftKey, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem, metaKey, need_recalcXY) {
		return this.on_fire_onlbuttonup(button, altKey, ctrlKey, shiftKey, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem, false, need_recalcXY, metaKey);
	};

	_pGrid.on_fire_onlbuttonup = function (button, altKey, ctrlKey, shiftKey, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem, user_fire, need_recalcXY, metaKey) {
		var lastfocus = this._find_lastFocused();

		if (lastfocus instanceof nexacro.Div) {
			lastfocus = lastfocus._getLastFocused();
		}

		if (lastfocus == this) {
			if (this._focus_proc) {
				if (!this._showEditing) {
					if (this._isCheckAlive(this._focus_proc.parent)) {
						var is_vscroll = false;
						if (this._scrollpixel == "all") {
							is_vscroll = true;
						}
						if (!this._isDownUpScroll() && nexacro._Browser != "Runtime") {
							this._focus_proc.parent._showfull(is_vscroll);
						}
						this._focus_proc.parent._setFocus(false);
					}
				}
				else if (this._currentCellEditor && this._currentCellEditor.setCaretPos && !this._currentCellEditor.parent._is_mergetemp) {
					if (this._currentCellEditor.autoselect) {
						this._currentCellEditor.setSelect(0, -1);
					}
					else {
						this._currentCellEditor.setCaretPos(0);
					}
				}
				this._focus_proc = null;
			}
		}

		var cellobj = from_refer_comp;

		cellobj = this._findCellObj(cellobj);

		var subcellobj;
		if (cellobj) {
			if (cellobj.parentcell) {
				subcellobj = cellobj;
				cellobj = cellobj.parentcell;
			}
		}

		var posobj = this._recalcXY(cellobj, canvasX, canvasY, need_recalcXY, from_refer_comp);
		canvasX = posobj.canvasX;
		canvasY = posobj.canvasY;
		clientX = posobj.clientX;
		clientY = posobj.clientY;

		var retn = false;
		if (this.onlbuttonup && this.onlbuttonup._has_handlers) {
			var evtinfo = this._makeEventInfo(cellobj, subcellobj, from_refer_comp);

			var obj = this._getRootComponent(from_refer_comp);
			var cell = evtinfo.cell;
			var col = evtinfo.col;
			var mergecell = evtinfo.mergecell;
			var mergecol = evtinfo.mergecol;
			var mergerow = evtinfo.mergerow;
			var pivotindex = evtinfo.pivotindex;
			var row = evtinfo.row;
			var subrow = evtinfo.subrow;

			var evt = new nexacro.GridMouseEventInfo(obj, "onlbuttonup", cell, col, mergecell, mergecol, mergerow, pivotindex, row, subrow, button, altKey, ctrlKey, shiftKey, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, metaKey);
			if (user_fire) {
				retn = this.onlbuttonup._fireUserEvent(this, evt);
			}
			else {
				retn = this.onlbuttonup._fireSysEvent(this, evt);
			}
		}

		if (!user_fire) {
			if (cellobj) {
				if (this.selectchangetype == "up") {
					if (this.selecttype != "area" && this.selecttype != "multiarea") {
						if (!this._is_drag_selecting) {
							this._mouseSelection(cellobj, ctrlKey, shiftKey, canvasX, canvasY, from_comp, from_refer_comp, metaKey);
							this._endExtraTrack();
						}
					}
				}
			}

			this._common_fire_sys_lbuttonup(cellobj, altKey, ctrlKey, shiftKey, metaKey);
			this._resizerStart(canvasX, canvasY, cellobj, "up", from_refer_comp);
		}
		return retn;
	};

	_pGrid.on_fire_user_onrbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem, meta_key) {
		var cellobj = from_refer_comp;

		cellobj = this._findCellObj(cellobj);

		var subcellobj;
		if (cellobj) {
			if (cellobj.parentcell) {
				subcellobj = cellobj;
				cellobj = cellobj.parentcell;
			}
		}

		var posobj = this._recalcXY(cellobj, canvasX, canvasY, false, from_refer_comp);
		canvasX = posobj.canvasX;
		canvasY = posobj.canvasY;
		clientX = posobj.clientX;
		clientY = posobj.clientY;

		if (this.onrbuttonup && this.onrbuttonup._has_handlers) {
			var evtinfo = this._makeEventInfo(cellobj, subcellobj, from_refer_comp);

			var obj = this._getRootComponent(from_refer_comp);
			var cell = evtinfo.cell;
			var col = evtinfo.col;
			var mergecell = evtinfo.mergecell;
			var mergecol = evtinfo.mergecol;
			var mergerow = evtinfo.mergerow;
			var pivotindex = evtinfo.pivotindex;
			var row = evtinfo.row;
			var subrow = evtinfo.subrow;

			var evt = new nexacro.GridMouseEventInfo(obj, "onrbuttonup", cell, col, mergecell, mergecol, mergerow, pivotindex, row, subrow, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);
			this._is_up_act = true;
			var retn = this.onrbuttonup._fireUserEvent(this, evt);
			this._is_up_act = false;

			return retn;
		}
		return false;
	};

	_pGrid.on_fire_user_onmouseup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		this._is_up_act = true;
		var retn = this.on_fire_onmouseup(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, true, meta_key);
		this._is_up_act = false;

		return retn;
	};

	_pGrid.on_fire_sys_onmouseup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		return this.on_fire_onmouseup(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, false, meta_key);
	};

	_pGrid.on_fire_onmouseup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, user_fire, meta_key) {
		var cellobj = from_refer_comp;

		cellobj = this._findCellObj(cellobj);

		var subcellobj;
		if (cellobj) {
			if (cellobj.parentcell) {
				subcellobj = cellobj;
				cellobj = cellobj.parentcell;
			}
		}

		var posobj = this._recalcXY(cellobj, canvasX, canvasY, false, from_refer_comp);
		canvasX = posobj.canvasX;
		canvasY = posobj.canvasY;
		clientX = posobj.clientX;
		clientY = posobj.clientY;

		var retn = false;
		if (this.onmouseup && this.onmouseup._has_handlers) {
			var evtinfo = this._makeEventInfo(cellobj, subcellobj, from_refer_comp);

			var obj = this._getRootComponent(from_comp);
			var cell = evtinfo.cell;
			var col = evtinfo.col;
			var mergecell = evtinfo.mergecell;
			var mergecol = evtinfo.mergecol;
			var mergerow = evtinfo.mergerow;
			var pivotindex = evtinfo.pivotindex;
			var row = evtinfo.row;
			var subrow = evtinfo.subrow;

			var evt = new nexacro.GridMouseEventInfo(obj, "onmouseup", cell, col, mergecell, mergecol, mergerow, pivotindex, row, subrow, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);
			if (user_fire) {
				retn = this.onmouseup._fireUserEvent(this, evt);
			}
			else {
				retn = this.onmouseup._fireSysEvent(this, evt);
			}
		}

		return retn;
	};

	_pGrid._resizerStart = function (canvasX, canvasY, cellobj, kind, from_refer_comp) {
		if (this._movingcell) {
			return;
		}

		var resizer_colctrl = this._resizer_colctrl;
		var resizer_rowctrl = this._resizer_rowctrl;

		if ((resizer_colctrl && resizer_colctrl._is_tracking) || (resizer_rowctrl && resizer_rowctrl._is_tracking)) {
			return;
		}

		var r_canvasX = canvasX;
		var r_canvasY = canvasY;
		var rowidx = cellobj._rowidx;
		var cellidx = cellobj._cellidx;

		if (cellobj._is_alive == false) {
			if (rowidx == -1) {
				cellobj = this._getCurrentHeadCell(cellidx, true);
			}
			else {
				cellobj = this._getCurrentBodyCell(rowidx, cellidx);
			}
		}

		if (!cellobj) {
			return;
		}

		var area = (cellobj._refinfo) ? cellobj._refinfo._area : "";
		var band = (cellobj._band) ? cellobj._band.id : "";
		if (band == "summary") {
			band = "summ";
		}
		if (area == "body") {
			r_canvasX += this._getScrollLeft();
		}
		if (band == "body") {
			if (!cellobj.parent._fixed) {
				r_canvasY += this._getScrollTop();
			}
		}

		var action = false;
		var resize_cursor;
		var resizer_range;
		var resizer_arr_length;
		var i;
		var range;

		if (resizer_colctrl && !resizer_colctrl._is_tracking) {
			resize_cursor = nexacro.CursorObject("col-resize");
			resizer_range = this._resizerColRange;
			resizer_arr_length = resizer_range.length;

			if (resizer_arr_length > 0) {
				resizer_colctrl._is_range = false;

				for (i = 0; i < resizer_arr_length; i++) {
					range = resizer_range[i];

					if (r_canvasX >= (range.left - 2) && r_canvasX <= (range.right + 2)) {
						if (area != range.area) {
							continue;
						}

						if (r_canvasY >= range.top && r_canvasY <= range.bottom) {
							this.a = r_canvasX;
							resizer_colctrl._is_range = true;
							resizer_colctrl._setIndex(range.index);
							this._setGlobalCursor(resize_cursor, cellobj, cellobj);
							action = true;
							break;
						}
					}
				}
			}
			if (!resizer_colctrl._is_range && !resizer_colctrl._is_tracking && (!resizer_rowctrl || !resizer_rowctrl._is_tracking)) {
				if (cellobj._type_name != "GridCellControl") {
					this._setGlobalCursor(null, from_refer_comp, from_refer_comp);
				}
				else {
					this._setGlobalCursor(null, cellobj, cellobj);
				}
				action = false;
			}
			else if (resizer_colctrl._is_tracking) {
				this._setGlobalCursor(resize_cursor, cellobj, cellobj);
				action = true;
			}
		}

		if (action) {
			return;
		}

		if (resizer_rowctrl && !resizer_rowctrl._is_tracking) {
			resize_cursor = nexacro.CursorObject("row-resize");
			resizer_range = this._resizerRowRange;
			resizer_arr_length = resizer_range.length;

			if (resizer_arr_length > 0) {
				resizer_rowctrl._is_range = false;

				for (i = 0; i < resizer_arr_length; i++) {
					range = resizer_range[i];

					if (r_canvasY >= range.top && r_canvasY <= range.bottom) {
						if (band != range.area) {
							continue;
						}

						if (r_canvasX >= range.left && r_canvasX <= range.right) {
							resizer_rowctrl._is_range = true;
							resizer_rowctrl._setIndex(range.index);
							this._setGlobalCursor(resize_cursor, cellobj, cellobj);
							break;
						}
					}
				}
			}
			if (!resizer_rowctrl._is_range && !resizer_rowctrl._is_tracking && (!resizer_colctrl || !resizer_colctrl._is_tracking)) {
				if (cellobj._type_name != "GridCellControl") {
					this._setGlobalCursor(null, from_refer_comp, from_refer_comp);
				}
				else {
					this._setGlobalCursor(null, cellobj, cellobj);
				}
			}
			else if (resizer_rowctrl._is_tracking) {
				this._setGlobalCursor(resize_cursor, cellobj, cellobj);
			}
		}
	};

	_pGrid.on_fire_user_ontouchmove = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		var cellobj = from_refer_comp;

		cellobj = this._findCellObj(cellobj);

		this._recalcTouchInfosXY(cellobj, changedtouchinfos, false, from_refer_comp);

		var retn = false;
		if (this.ontouchmove && this.ontouchmove._has_handlers) {
			var evt = new nexacro.TouchEventInfo(this, "ontouchmove", touchinfos, changedtouchinfos, from_comp, from_refer_comp);
			retn = this.ontouchmove._fireUserEvent(this, evt);
		}

		return retn;
	};

	_pGrid.on_fire_user_onmousemove = function (button, altKey, ctrlKey, shiftKey, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, metaKey) {
		if (!from_refer_comp._is_alive) {
			return;
		}

		var cellobj = from_refer_comp;

		cellobj = this._findCellObj(cellobj);

		var subcellobj;
		if (cellobj) {
			if (cellobj.parentcell) {
				subcellobj = cellobj;
				cellobj = cellobj.parentcell;
			}
		}

		var posobj = this._recalcXY(cellobj, canvasX, canvasY, false, from_refer_comp);
		canvasX = posobj.canvasX;
		canvasY = posobj.canvasY;
		clientX = posobj.clientX;
		clientY = posobj.clientY;

		var retn = false;
		if (this.onmousemove && this.onmousemove._has_handlers) {
			var evtinfo = this._makeEventInfo(cellobj, subcellobj, from_refer_comp);

			var obj = this._getRootComponent(from_refer_comp);
			var cell = evtinfo.cell;
			var col = evtinfo.col;
			var mergecell = evtinfo.mergecell;
			var mergecol = evtinfo.mergecol;
			var mergerow = evtinfo.mergerow;
			var pivotindex = evtinfo.pivotindex;
			var row = evtinfo.row;
			var subrow = evtinfo.subrow;

			var evt = new nexacro.GridMouseEventInfo(obj, "onmousemove", cell, col, mergecell, mergecol, mergerow, pivotindex, row, subrow, button, altKey, ctrlKey, shiftKey, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, metaKey);
			retn = this.onmousemove._fireUserEvent(this, evt);
		}

		if (!nexacro._isTouchInteraction) {
			this._resizerStart(canvasX, canvasY, cellobj, "move", from_refer_comp);
		}

		return retn;
	};

	_pGrid._prevAreaCellObj = null;

	_pGrid._areaselectMove = function (from_refer_comp, canvasX, canvasY) {
		if (this._is_drag_selectstart && !this._showEditing && this._selectscrollmode == "select") {
			var cellobj = from_refer_comp;

			cellobj = this._findCellObj(cellobj);

			var subcellobj;
			var fixed_endrow, selectinfo;
			var cur_selected_area;
			var cur_srow;
			var cur_erow;
			var cur_vscrollpos;
			var mode;

			if (cellobj && (cellobj._type_name == "GridCellControl" || cellobj._type_name == "GridSubCellControl")) {
				if (cellobj.parentcell) {
					subcellobj = cellobj;
					cellobj = cellobj.parentcell;
				}

				var posobj = this._recalcXY(cellobj, canvasX, canvasY, false, from_refer_comp);
				canvasX = posobj.canvasX;
				canvasY = posobj.canvasY;

				if ((this._prevAreaCellObj == cellobj) && !this._fixed_row_scrolling) {
					return;
				}


				var newPos = this._getDataRow(cellobj._rowidx);
				if (newPos == undefined) {
					newPos = 0;
				}

				if (this._isFakeCell(newPos) || newPos < 0) {
					return true;
				}

				var beforeCell = this._beforebodycellpos = this._selectinfo.curcell;
				var beforeCol = this._beforebodycolpos = this._selectinfo.curcol;
				var beforeRow = this._beforebodyrowpos = this._selectinfo.curdsrow;
				var beforeSubrow = this._beforebodysubrowpos = this._selectinfo.cursubrow;
				var beforePvt = this._beforepvt = this._selectinfo.curpvt;

				var afterCell = cellobj._cellidx;
				var afterCol = cellobj._refinfo._col;
				var afterRow = newPos;
				var afterSubrow = cellobj._refinfo._row;
				var afterPvt = -9;

				if (subcellobj) {
					afterCol += subcellobj._refinfo._col;
				}

				if (this._fixed_rowcnt > 0) {
					fixed_endrow = this._fixed_endrow;

					selectinfo = this._selectinfo;
					if (selectinfo.area.length > 0) {
						cur_selected_area = selectinfo.area[selectinfo.area.length - 1];
						cur_srow = cur_selected_area.begrow;
						cur_erow = cur_selected_area.endrow;
						cur_vscrollpos = this._vscrollmng.pos;

						if (afterRow < beforeRow) {
							mode = "up";
						}
						else if (afterRow > beforeRow) {
							mode = "down";
						}
						else {
							mode = "keep";
						}

						if (mode == "up") {
							this._fixed_row_scrolling = true;
							if (cur_erow > afterRow && afterRow <= fixed_endrow && cur_erow > fixed_endrow) {
								this._vscrollmng.setPos(cur_vscrollpos - 1);
							}
							else {
								this._fixed_row_scrolling = false;
							}
						}
						else if (mode == "down") {
							if (cur_srow <= this._fixed_endrow && cur_erow <= this._fixed_endrow) {
								this._fixed_row_scroll_zeroset = true;
							}
							else {
								this._fixed_row_scroll_zeroset = false;
							}

							if (this._fixed_row_scroll_zeroset && afterRow && (afterRow <= 0 || (afterRow <= this._fixed_endrow && cur_erow > this._fixed_endrow) || (afterRow > this._fixed_endrow && cur_srow <= this._fixed_endrow))) {
								if (cur_vscrollpos > 0) {
									this._vscrollmng.setPos(0);
									this._fixed_row_scroll_zeroset = false;
									return;
								}
							}
						}
						else {
							if (cur_vscrollpos == 0) {
								this._fixed_row_scrolling = false;
							}
							else if (this._fixed_row_scrolling) {
								this._vscrollmng.setPos(cur_vscrollpos - 1);
							}
						}
					}
				}

				if (this._fixed_rowcnt > 0) {
					fixed_endrow = this._fixed_endrow;

					selectinfo = this._selectinfo;
					if (selectinfo.area.length > 0) {
						cur_selected_area = selectinfo.area[selectinfo.area.length - 1];
						cur_srow = cur_selected_area.begrow;
						cur_erow = cur_selected_area.endrow;
						cur_vscrollpos = this._vscrollmng.pos;

						if (afterRow < beforeRow) {
							mode = "up";
						}
						else if (afterRow > beforeRow) {
							mode = "down";
						}
						else {
							mode = "keep";
						}

						if (mode == "up") {
							this._fixed_row_scrolling = true;
							if (cur_erow > afterRow && afterRow <= fixed_endrow && cur_erow > fixed_endrow) {
								this._vscrollmng.setPos(cur_vscrollpos - 1);
							}
							else {
								this._fixed_row_scrolling = false;
							}
						}
						else if (mode == "down") {
							if (cur_srow <= this._fixed_endrow && cur_erow <= this._fixed_endrow) {
								this._fixed_row_scroll_zeroset = true;
							}
							else {
								this._fixed_row_scroll_zeroset = false;
							}

							if (this._fixed_row_scroll_zeroset && afterRow && (afterRow <= 0 || (afterRow <= this._fixed_endrow && cur_erow > this._fixed_endrow) || (afterRow > this._fixed_endrow && cur_srow <= this._fixed_endrow))) {
								if (cur_vscrollpos > 0) {
									this._vscrollmng.setPos(0);
									this._fixed_row_scroll_zeroset = false;
									return;
								}
							}
						}
						else {
							if (cur_vscrollpos == 0) {
								this._fixed_row_scrolling = false;
							}
							else if (this._fixed_row_scrolling) {
								this._vscrollmng.setPos(cur_vscrollpos - 1);
							}
						}
					}
				}

				while (true) {
					if (this.selecttype == "multirow" && afterRow == beforeRow) {
						break;
					}

					this._setSelectedInfo(afterCell, afterCol, afterRow, afterSubrow, afterPvt);
					this._ChangeSelect(afterCell, afterCol, afterRow, afterSubrow, afterPvt, false, beforeCell, beforeCol, beforeRow, beforeSubrow, beforePvt, cellobj._band.id, "mousemove");
					break;
				}
				this._prevAreaCellObj = cellobj;
			}
		}
	};

	_pGrid._on_start_extratrack = function (windowX, windowY, screenX, screenY, keepstart) {
		if (!this._lastmouseentercell) {
			return;
		}
		var scroll_left = this._getScrollLeft();
		var scroll_top = this._getScrollTop();

		this._track_point.x = screenX;
		this._track_point.y = screenY;
		this._track_point.w = 0;
		this._track_point.h = 0;
		this._track_point.cur_rect = {
			l : 0, 
			t : 0, 
			w : 0, 
			h : 0
		};

		this._track_start_info = {
		};
		this._track_start_info.target = this._lastmouseentercell;

		this._track_start_info.cell_screenX = nexacro.System.clientToScreenX(this._lastmouseentercell, 0);
		this._track_start_info.cell_screenY = nexacro.System.clientToScreenY(this._lastmouseentercell, 0);


		var frame = this._getOwnerFrame();

		if (frame && (frame._window_type == 1 || frame._window_type == 4 || frame._window_type == 5)) {
			var adjust_x = this._lastmouseentercell._adjust_left;
			var adjust_y = this._lastmouseentercell._adjust_top;

			var parent = this._lastmouseentercell.parent;

			while (parent) {
				if (parent._is_frame) {
					break;
				}
				adjust_x += parent._adjust_left;
				adjust_y += parent._adjust_top;

				parent = parent.parent;
			}

			var frame_screenx = nexacro.System.clientToScreenX(frame, 0);
			if (frame_screenx == 0 && frame._adjust_left < 0) {
				frame_screenx = frame._adjust_left;
			}

			this._track_start_info.cell_screenX = frame_screenx + adjust_x;
		}

		this._track_start_info.start_screenX = screenX;
		this._track_start_info.start_screenY = screenY;
		this._track_start_info.scrollLeft = scroll_left;
		this._track_start_info.scrollTop = scroll_top;

		this._track_start_info._start_begarea = this._selectinfo.arearect.barea;
		this._track_start_info._start_endarea = this._selectinfo.arearect.earea;

		var rectinfo = this._getExtraTrackSelectRect(screenX, screenY, 0, 0, true);

		if (!keepstart) {
			this._startAreaSizing(rectinfo, rectinfo.idx);
		}

		this._track_mode = "areaselect";
	};

	_pGrid._on_move_extratrack = function (obj, windowX, windowY, distX, distY, screenX, screenY) {
		var rootcomp = this._getRootComponent(obj);

		if (!obj || (this._showEditing == false && (rootcomp != this || (rootcomp == this && obj instanceof nexacro._GridCellControl && (obj._band.id == "head" || obj._band.id == "summary")) || (rootcomp == this && obj instanceof nexacro._GridRowControl && obj._band.id == "body") || (rootcomp == this && obj.id == "body")))) {
			var rectinfo = this._getExtraTrackSelectRect(screenX, screenY, distX, distY, false);
			var idx = rectinfo.idx;

			var typeinfo = this._getTrackType(this._track_start_info, rectinfo.l, rectinfo.t, rectinfo.w, rectinfo.h, idx, false);

			var select_area = this._selectinfo.area;
			if (this._fixed_rowcnt > 0 && select_area.length) {
				var cur_area = select_area[select_area.length - 1];
				var cur_srow = cur_area.begrow;
				var cur_erow = cur_area.endrow;

				var ctrlpoint = this._selectinfo.ctrlpoint;

				var border = this._getCurrentStyleBorder();
				var border_top = (border) ? parseInt(border.right._width, 10) : 0;

				var headheight = this._getHeadHeight();
				var fixedheight = this._fixed_height;
				var fixedbottom = headheight + fixedheight + border_top;
				var fixederow = this._fixed_endrow;
				var t = rectinfo.t;
				var h = rectinfo.h;

				var cur_scrolltop = this._getScrollTop();
				var vscroll = this._vscrollmng;

				if (cur_srow <= fixederow && cur_erow <= fixederow && cur_scrolltop > 0 && (t + h) > fixedbottom) {
					vscroll.setPos(0);
				}
				else if (cur_srow <= fixederow && cur_erow >= fixederow && cur_scrolltop > 0 && (t + h) <= fixedbottom) {
					vscroll.setPos(vscroll.pos - 1);
				}
				else if (ctrlpoint.row > fixederow && cur_scrolltop > 0 && t <= fixedbottom) {
					vscroll.setPos(vscroll.pos - 1);
				}
			}

			this._applySelectorScroll(typeinfo.type);
			this._applyAreaSizing(rectinfo, idx);

			this._extratrack_typeinfo = typeinfo;
			this._extratrack_rectinfo = rectinfo;
			this._extratrack_idx = idx;

			var init_interval = 500;
			var min_intervalgap = 10;

			function getTimerInterval (obj) {
				var interval = init_interval;

				var grid_x = nexacro.System.clientToScreenX(obj, 0);
				var grid_y = nexacro.System.clientToScreenY(obj, 0);
				var frame = obj._getOwnerFrame();

				if (frame && (frame._window_type == 1 || frame._window_type == 4)) {
					var adjust_x = obj._adjust_left;
					var adjust_y = obj._adjust_top;

					var parent = obj.parent;

					while (parent) {
						if (parent._is_frame) {
							break;
						}

						adjust_x += parent._adjust_left;
						adjust_y += parent._adjust_top;

						parent = parent.parent;
					}


					var frame_screenx = nexacro.System.clientToScreenX(frame, 0);
					if (frame_screenx == 0 && frame._adjust_left < 0) {
						frame_screenx = frame._adjust_left;
					}

					grid_x = frame_screenx + adjust_x;
				}

				var grid_r = grid_x + parseInt(obj._adjust_width);
				var grid_b = grid_y + parseInt(obj._adjust_height);

				var wgap = (screenX < grid_x) ? (grid_x - screenX) : (screenX - grid_r);
				var hgap = (screenY < grid_y) ? (grid_y - screenY) : (screenY - grid_b);

				if (wgap >= 0) {
					interval = interval - (wgap *  10);

					return interval > 0 ? interval : 1;
				}

				if (hgap >= 0) {
					interval = interval - (hgap *  10);

					return interval > 0 ? interval : 1;
				}

				return -1;
			}

			var timer_interval = getTimerInterval(this);

			if (timer_interval > 0 && timer_interval < min_intervalgap) {
				timer_interval = min_intervalgap;
			}

			if (timer_interval > 0) {
				if (!this._extratrack_timer) {
					this._extratrack_timer = {
					};
					this._extratrack_timer._handle = null;
					this._extratrack_timer._interval = timer_interval;

					this._extratrack_timer._handle = new nexacro._CallbackTimer(this, function () {
						this._applySelectorScroll(this._extratrack_idx, this._extratrack_typeinfo.type);
						this._applyAreaSizing(this._extratrack_rectinfo, this._extratrack_idx);
					}, timer_interval);

					this._extratrack_timer._handle.start();
				}
				else {
					if (this._extratrack_timer && this._extratrack_timer._interval != timer_interval) {
						if (timer_interval > 0) {
							this._extratrack_timer._interval = timer_interval;
							this._extratrack_timer._handle.setInterval(timer_interval);
							this._extratrack_timer._handle.start();
						}
						else {
							this._extratrack_timer._handle.stop();
						}
					}
				}
			}
		}
		else {
			if (this._extratrack_timer) {
				this._extratrack_timer._handle.stop();
			}
		}
	};

	_pGrid._on_end_extratrack = function (x, y, dragdata) {
		this._track_start_info = null;
		this._track_idx = -1;
		this._track_mode = "";

		if (this._extratrack_timer) {
			this._extratrack_timer._handle.stop();
			this._extratrack_timer._handle = null;
			this._extratrack_timer = null;
		}

		this._getSelectRect(false, true);
	};

	_pGrid._endExtraTrack = function () {
		this._on_end_extratrack();
		nexacro._cur_extra_track_info = null;
	};

	_pGrid._trackingHScroll = function (idx, left, right, start_begarea, start_endarea, bodystart, rightstart, scroll_left, scroll_max) {
		var retn = [0, 0];

		if (this.scrolltype == "none" || this.scrolltype == "vertical") {
			return retn;
		}

		var hscroll = this._hscrollmng;

		if (idx == 0 || idx == 2) {
			if (start_begarea == "right") {
				if (left < rightstart && left > bodystart) {
					hscroll.setPos(scroll_max);
				}
			}
			else if (start_begarea == "left") {
				if (left > bodystart && left < rightstart) {
					hscroll.setPos(0);
					retn[1] = scroll_left;
				}
			}
		}
		else {
			if (start_endarea == "left") {
				if (right > bodystart && right < rightstart) {
					hscroll.setPos(0);
				}
			}
			else if (start_endarea == "right") {
				if (right < rightstart && right > bodystart) {
					hscroll.setPos(scroll_max);
					retn[0] = scroll_left - scroll_max;
					retn[1] = scroll_max - scroll_left;
				}
			}
		}
		return retn;
	};

	_pGrid._getTrackType = function (obj, left, top, width, height, idx, onlyarea) {
		var hmin, hmax, vmin, vmax;
		var grid = this;
		var format = grid._curFormat;
		var type = ["", ""];
		var area = grid._selectinfo.ctrlpoint.area;

		var leftwidth = format.leftWidth;
		var rightstart = grid._getClientWidth() - format.rightWidth;
		var bodylast = format.leftWidth + format.bodyWidth;
		var scroll_left = grid._getScrollLeft();
		var scroll_max = grid._getScollMaxLeft();
		var right = left + width;
		var headheight = grid._getHeadHeight();
		var fixedheight = grid._fixed_height;
		var fixedbottom = headheight + fixedheight;


		if (onlyarea) {
			if (area == "left") {
				hmin = 0;
				hmax = leftwidth;
			}
			else if (area == "right") {
				hmin = rightstart;
				hmax = grid._getClientWidth();
			}
			else {
				hmin = leftwidth;
				hmax = (bodylast < rightstart) ? bodylast : rightstart;
			}
		}
		else {
			var move = this._trackingHScroll(idx, left, right, leftwidth, obj._start_begarea, obj._start_endarea, rightstart, scroll_left, scroll_max);

			left += move[0];
			width += move[1];

			if (area == "left") {
				hmin = 0;

				if (scroll_left == scroll_max) {
					hmax = (bodylast < grid._getClientWidth()) ? bodylast : grid._getClientWidth();
				}
				else {
					hmax = (bodylast < rightstart) ? bodylast : rightstart;
				}
			}
			else if (area == "right") {
				if (scroll_left == 0) {
					hmin = 0;
				}
				else {
					hmin = leftwidth;
				}

				hmax = grid._getClientWidth();
			}
			else {
				if (scroll_left == 0) {
					hmin = 0;
				}
				else {
					hmin = leftwidth;
				}

				if (scroll_left == scroll_max) {
					hmax = (bodylast < grid._getClientWidth()) ? bodylast : grid._getClientWidth();
				}
				else {
					hmax = (bodylast < rightstart) ? bodylast : rightstart;
				}
			}
		}

		vmin = this._bodyBand._adjust_top;
		vmax = this._bodyBand.getOffsetBottom();

		var b, r;

		if (idx == 0) {
			if (left < hmin) {
				width -= (hmin - left);
				left = hmin;

				if (this._start_begarea != "left") {
					type[0] = "leftover0";
				}
			}
			else if (left > hmax || (scroll_left < scroll_max && left > rightstart)) {
				type[0] = "rightover0";
			}

			if (grid._fixed_rowcnt > 0) {
				if (top < (fixedheight + headheight)) {
					type[1] = "topover0";
				}
				else if (top > vmax) {
					type[1] = "bottomover0";
				}
			}
			else {
				if (top < vmin) {
					height -= (vmin - top);
					top = vmin;
					type[1] = "topover0";
				}
				else if (top > vmax) {
					type[1] = "bottomover0";
				}
			}

			if (width <= 0) {
				left += width - 1;
			}

			if (height <= 0) {
				top += height - 1;
			}
		}
		else if (idx == 1) {
			r = left + width;
			b = top + height;

			if (r < hmin || (scroll_left > 0 && r < leftwidth)) {
				type[0] = "leftover1";
			}
			else if (r > hmax) {
				width = hmax - left;

				if (this._start_endarea != "right") {
					type[0] = "rightover1";
				}
			}

			if (b < vmin) {
				type[1] = "topover1";
			}
			else if (b > vmax) {
				height = vmax - top;
				type[1] = "bottomover1";
			}
		}
		else if (idx == 2) {
			b = top + height;

			if (left < hmin) {
				width -= (hmin - left);
				left = hmin;

				if (this._start_begarea != "left") {
					type[0] = "leftover0";
				}
			}
			else if (left > hmax || (scroll_left < scroll_max && left > rightstart)) {
				type[0] = "rightover0";
			}
			if (b < vmin || b > fixedbottom) {
				type[1] = "topover1";
			}
			else if (b > vmax) {
				height = vmax - top;
				type[1] = "bottomover1";
			}
		}
		else if (idx == 3) {
			r = left + width;

			if (r < hmin || (scroll_left > 0 && r < leftwidth)) {
				type[0] = "leftover1";
			}
			else if (r > hmax) {
				width = hmax - left;

				if (this._start_endarea != "right") {
					type[0] = "rightover1";
				}
			}
			if (top < vmin) {
				type[1] = "topover1";
			}
			else if (top > vmax) {
				height = vmax - top;
				type[1] = "bottomover1";
			}
		}

		return {
			type : type, 
			adjust_l : left, 
			adjust_t : top, 
			adjust_w : width, 
			adjust_h : height
		};
	};

	_pGrid._getExtraTrackSelectRect = function (screenX, screenY, distX, distY, bApplyFixedRow) {
		var idx = 1;
		var startinfo = this._track_start_info;

		var start_cell_startX = startinfo.start_screenX;
		var start_cell_startY = startinfo.start_screenY;


		var start_cell_scrollLeft = startinfo.scrollLeft;
		var start_cell_scrollTop = startinfo.scrollTop;


		var start_cell_row = startinfo.target._rowidx;

		var scroll_left = this._getScrollLeft();
		var scroll_top = this._getScrollTop();
		var scroll_left_gap = scroll_left - start_cell_scrollLeft;
		var scroll_top_gap = scroll_top - start_cell_scrollTop;
		var adjust_scroll_top_gap = scroll_top_gap;

		var grid_body_screenx = nexacro.System.clientToScreenX(this, 0);
		var grid_body_screeny = nexacro.System.clientToScreenY(this, 0);

		var frame = this._getOwnerFrame();

		if (frame && (frame._window_type == 1 || frame._window_type == 4 || frame._window_type == 5)) {
			var adjust_x = this._adjust_left;
			var adjust_y = this._adjust_top;

			var parent = this.parent;

			while (parent) {
				if (parent._is_frame) {
					break;
				}

				adjust_x += parent._adjust_left;
				adjust_y += parent._adjust_top;

				parent = parent.parent;
			}
			var frame_screenx = nexacro.System.clientToScreenX(frame, 0);
			if (frame_screenx == 0 && frame._adjust_left < 0) {
				frame_screenx = frame._adjust_left;
			}

			grid_body_screenx = frame_screenx + adjust_x;
		}

		var bApply_scroll_top = true;
		if (this._fixed_rowcnt > 0 && start_cell_row >= this._fixed_startrow && start_cell_row <= this._fixed_endrow) {
			bApply_scroll_top = false;
		}

		if (!bApply_scroll_top) {
			adjust_scroll_top_gap = 0;
		}

		if (screenX < (start_cell_startX - scroll_left_gap) && screenY < (start_cell_startY - adjust_scroll_top_gap)) {
			idx = 0;
		}
		else if (screenX > (start_cell_startX - scroll_left_gap) && screenY > (start_cell_startY - adjust_scroll_top_gap)) {
			idx = 1;
		}
		else if (screenX < (start_cell_startX - scroll_left_gap) && screenY > (start_cell_startY - adjust_scroll_top_gap)) {
			idx = 2;
		}
		else if (screenX > (start_cell_startX - scroll_left_gap) && screenY < (start_cell_startY - adjust_scroll_top_gap)) {
			idx = 3;
		}


		var x = distX;
		var y = distY;


		var l, t, w, h;

		if (idx == 0) {
			l = this._track_point.x - grid_body_screenx + x;
			t = this._track_point.y - grid_body_screeny + y;
			w = -(x);
			h = -(y) - (bApply_scroll_top ? scroll_top_gap : 0);
		}
		else if (idx == 1) {
			l = this._track_point.x - grid_body_screenx - scroll_left_gap;
			t = this._track_point.y - grid_body_screeny - (bApply_scroll_top ? scroll_top_gap : 0);
			w = x + scroll_left_gap;
			h = y + (bApply_scroll_top ? scroll_top_gap : 0);
		}
		else if (idx == 2) {
			l = this._track_point.x - grid_body_screenx + x;
			t = this._track_point.y - grid_body_screeny - (bApply_scroll_top ? scroll_top_gap : 0);
			w = -(x) - scroll_left_gap;

			h = y + (bApply_scroll_top ? scroll_top_gap : 0);
		}
		else if (idx == 3) {
			l = this._track_point.x - grid_body_screenx - scroll_left_gap;
			t = this._track_point.y - grid_body_screeny + y;
			w = x + scroll_left_gap;
			h = -(y) - (bApply_scroll_top ? scroll_top_gap : 0);
		}

		return {
			idx : idx, 
			l : l, 
			t : t, 
			w : w, 
			h : h
		};
	};

	_pGrid.on_fire_sys_onmousemove = function (button, altKey, ctrlKey, shiftKey, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, metaKey) {
		if (!this.enable) {
			return true;
		}

		var win = this._getWindow();
		if (win && win._cur_ldown_elem) {
			return this._areaselectMove(from_refer_comp, canvasX, canvasY);
		}
	};

	_pGrid._setSelectedInfo = function (cell, col, datarow, subrow, pvt, areainfo) {
		if (this._currentBand != "body") {
			return;
		}

		if (cell !== null) {
			this._selectinfo.curcell = this.currentcell = cell;
		}
		if (col !== null) {
			this._selectinfo.curcol = this.currentcol = col;
		}
		if (datarow !== null) {
			this._selectinfo.curdsrow = this._currentDSrow = datarow;
			this._selectinfo.currow = this.currentrow = (datarow < 0) ? datarow : this._getTreeRowPosition(datarow);
		}
		if (subrow !== null) {
			this._selectinfo.cursubrow = this.currentsubrow = subrow;
		}
		if (pvt !== null) {
			this._selectinfo.curpvt = this.currentpivot = pvt;
		}

		if (areainfo) {
			this._selectinfo.areainfo = null;
			this._selectinfo.areainfo = {
				srow : areainfo.srow, 
				erow : areainfo.erow, 
				scell : areainfo.scell, 
				ecell : areainfo.ecell, 
				scol : areainfo.scol, 
				ecol : areainfo.ecol, 
				ssubrow : areainfo.ssubrow, 
				esubrow : areainfo.esubrow, 
				spvt : areainfo.spvt, 
				epvt : areainfo.epvt
			};
		}
	};

	_pGrid._is_drag_selecting = false;
	_pGrid._on_grid_lbuttondown = function (cellobj, band, ctrlkey, shiftkey, no_select, metakey) {
		if (!this._is_alive) {
			return;
		}
		if (!this.enable) {
			return true;
		}

		var newPos = this._getDataRow(cellobj._rowidx);
		if (newPos == undefined) {
			newPos = 0;
		}

		if (this._isFakeCell(newPos) || newPos < 0) {
			return true;
		}

		var beforeCell = this._beforebodycellpos = this._selectinfo.curcell;
		var beforeCol = this._beforebodycolpos = this._selectinfo.curcol;
		var beforeRow = this._beforebodyrowpos = this._selectinfo.curdsrow;
		var beforeSubrow = this._beforebodysubrowpos = this._selectinfo.cursubrow;
		var beforePvt = this._beforepvt = this._selectinfo.curpvt;

		var afterCell = cellobj._cellidx;
		var afterCol = cellobj._refinfo._col;
		var afterRow = newPos;
		var afterSubrow = cellobj._refinfo._row;
		var afterPvt = -9;

		var parentcell = cellobj.parentcell;
		this._prevAreaCellObj = cellobj;

		if (parentcell) {
			afterCell = parentcell._cellidx;
			afterCol += parentcell._refinfo._col;
			this._prevAreaCellObj = parentcell;
		}

		if (!no_select) {
			this._setSelectedInfo(afterCell, afterCol, afterRow, afterSubrow, afterPvt);
		}

		if (ctrlkey == true) {
			if (this._isMultiSelect()) {
				this._multiselect = "ctrl";
			}
			else {
				this._multiselect = "none";
			}
		}
		else if (shiftkey == true) {
			if (this._isMultiSelect() || this._isAreaSelect()) {
				this._multiselect = "shift";
			}
			else {
				this._multiselect = "none";
			}
		}
		else {
			if (this._multiselect != "none") {
				this._selectClear = true;
			}

			this._multiselect = "none";
		}

		if ((this._isAreaSelect() || this._isMultiSelect()) && !nexacro._isTouchInteraction) {
			this._is_drag_selectstart = true;
		}

		var retn = false;

		if (!no_select) {
			retn = this._ChangeSelect(afterCell, afterCol, afterRow, afterSubrow, afterPvt, false, beforeCell, beforeCol, beforeRow, beforeSubrow, beforePvt, band, "lbuttondown");
		}

		var win = this._getWindow();
		if (win && (!nexacro._enabletouchevent && !win._cur_ldown_elem)) {
			return;
		}

		if (this._selectscrollmode != "select") {
			return retn;
		}
		this._is_drag_sameselect = retn ? false : true;

		if (!nexacro._isTouchInteraction && (this._isAreaSelect() || this.selecttype == "multirow")) {
			if (nexacro._Browser == "Runtime") {
				var frame = this._getOwnerFrame();

				if (frame._window_type != 2 && frame._window_type != 5) {
					frame = nexacro.getApplication().mainframe;
				}

				var x = win._curWindowX - ((frame._adjust_left >= 0) ? frame._adjust_left : 0);
				var y = win._curWindowY - ((frame._adjust_top >= 0) ? frame._adjust_top : 0);
				x = x *  nexacro._getDevicePixelRatio(this.getElement());
				y = y *  nexacro._getDevicePixelRatio(this.getElement());

				var screenX = nexacro.System.clientToScreenX(frame, 0) + x;
				var screenY = nexacro.System.clientToScreenY(frame, 0) + y;

				nexacro._setExtraTrackInfo(win, this, win._curWindowX, win._curWindowY, screenX, screenY, shiftkey || no_select);
			}
			else {
				nexacro._setExtraTrackInfo(win, this, win._curWindowX, win._curWindowY, win._cur_screen_pos.x, win._cur_screen_pos.y, shiftkey || no_select);
			}
		}

		return retn;
	};

	_pGrid.on_fire_onselectchanged = function (obj, cell, col, row, subrow, pvt, oldcell, oldcol, oldrow, oldsubrow, oldpvt, selectendcol, selectendpivot, selectendrow, selectendsubrow, selectstartcol, selectstartpivot, selectstartrow, selectstartsubrow) {
		if (this.onselectchanged && this.onselectchanged._has_handlers) {
			var evt = new nexacro.GridSelectEventInfo(obj, "onselectchanged", cell, col, row, subrow, pvt, oldcell, oldcol, oldrow, oldsubrow, oldpvt, selectendcol, selectendpivot, selectendrow, selectendsubrow, selectstartcol, selectstartpivot, selectstartrow, selectstartsubrow);
			return this.onselectchanged._fireEvent(this, evt);
		}
		return true;
	};

	_pGrid.on_fire_oncellposchanged = function (obj, cell, col, row, subrow, pvt, oldcell, oldcol, oldrow, oldsubrow, oldpvt, selectendcol, selectendpivot, selectendrow, selectendsubrow, selectstartcol, selectstartpivot, selectstartrow, selectstartsubrow) {
		if (this.oncellposchanged && this.oncellposchanged._has_handlers) {
			var evt = new nexacro.GridSelectEventInfo(obj, "oncellposchanged", cell, col, row, subrow, pvt, oldcell, oldcol, oldrow, oldsubrow, oldpvt, selectendcol, selectendpivot, selectendrow, selectendsubrow, selectstartcol, selectstartpivot, selectstartrow, selectstartsubrow);
			return this.oncellposchanged._fireEvent(this, evt);
		}
		return true;
	};

	_pGrid.on_fire_user_onkeyup = function (keyCode, altKey, ctrlKey, shiftKey, obj, refer_comp, metaKey) {
		if (!this.enable) {
			return true;
		}

		if (shiftKey == false && ctrlKey == false) {
			if (keyCode != nexacro.Event.KEY_SHIFT && keyCode != nexacro.Event.KEY_CTRL) {
				this._multiselect = "none";
			}
		}

		if (this._iskey_movetocell) {
			this._moveCellAfterFocus();
		}

		this._iskey_movetocell = false;
		this._keydown_elem = null;
		this._keydown_keycode = undefined;

		this._is_up_act = true;
		var retn = nexacro.Component.prototype.on_fire_user_onkeyup.call(this, keyCode, altKey, ctrlKey, shiftKey, obj, refer_comp, metaKey);
		this._is_up_act = false;

		if (!this._is_alive) {
			return retn;
		}

		if (keyCode == nexacro.Event.KEY_RIGHT && altKey) {
			var format = this._curFormat;
			if (format) {
				var bodycells = format._bodycells;
				if (bodycells && bodycells.length) {
					var cellinfo = this._getBodyCellInfo(this._selectinfo.curcell);
					if (cellinfo) {
						var expandshow = cellinfo._getAttrValue(cellinfo.expandshow, this._selectinfo.curdsrow);
						if (expandshow == "show") {
							if (this.onkeyup && this.onkeyup.defaultprevented == true) {
							}
							else {
								this.on_fire_onexpandup("none", altKey, ctrlKey, shiftKey, -1, -1, -1, -1, -1, -1, obj, refer_comp, metaKey);
							}
						}
					}
				}
			}
		}

		return retn;
	};

	_pGrid.on_fire_sys_onkeydown = function (keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp, meta_key) {
		if (this._is_down_act) {
			this._on_last_keyup(true);
		}
	};

	_pGrid._accessibilityHotkeyAction = function (keyCode, altKey, ctrlKey, shiftKey, metaKey) {
		var accGridHotkey = nexacro._AccessibilityUtil.checkComponentHotkey(this, keyCode, altKey, ctrlKey, shiftKey, metaKey);
		if (accGridHotkey) {
			this._hideEditor();
			var row = this.currentrow;
			switch (accGridHotkey) {
				case nexacro._AccessibilityUtil.Hotkey.FIRSTCELL:
					this.currentcell = 0;
					this._currentBand = "grid";
					if (this._vscrollmng) {
						this._vscrollmng.setPos(0);
					}
					this._setAccessibilityBandFocus("next", false, true);
					break;
				case nexacro._AccessibilityUtil.Hotkey.LASTCELL:
					this.currentcell = this._getAccessibilityCellIndex() - 1;
					this._currentBand = "grid";
					if (this._vscrollmng) {
						this._vscrollmng.setPos(this._vscrollmng._max);
					}
					this._setAccessibilityBandFocus("prev", false, true);
					break;
				case nexacro._AccessibilityUtil.Hotkey.FIRSTCELLINROW:
					this.currentcol = 0;
					if (nexacro._enableaccessibility) {
						this._moveToPosAccessibilityCell(row, 0);
					}
					else {
						this._moveToPosCell(row, 0);
					}
					break;
				case nexacro._AccessibilityUtil.Hotkey.LASTCELLINROW:
					this.currentcol = this._curFormat._cols.length - 1;
					if (nexacro._enableaccessibility) {
						this._moveToPosAccessibilityCell(row, this.currentcol);
					}
					else {
						this._moveToPosCell(row, this.currentcol);
					}
					break;
				case nexacro._AccessibilityUtil.Hotkey.FIRSTCELLINCOLUMN:
					this._currentBand = "grid";
					if (this._vscrollmng) {
						this._vscrollmng.setPos(0);
					}

					if (nexacro._enableaccessibility) {
						this._setAccessibilityBandFocus("next", false, true);
					}
					else {
						this._moveToPosCell(0, this.currentcol);
					}
					break;
				case nexacro._AccessibilityUtil.Hotkey.LASTCELLINCOLUMN:
					this._currentBand = "grid";
					if (this._vscrollmng) {
						this._vscrollmng.setPos(this._vscrollmng._max);
					}

					if (nexacro._enableaccessibility) {
						this._setAccessibilityBandFocus("prev", false, true);
					}
					else {
						this._moveToPosCell(this._rowcount - 1, this.currentcol);
					}
					break;
			}
			return true;
		}
		return false;
	};

	_pGrid.on_fire_user_onkeydown = function (keyCode, altKey, ctrlKey, shiftKey, obj, refer_comp, metaKey) {
		if (nexacro._enableaccessibility && this._accessibilityHotkeyAction(keyCode, altKey, ctrlKey, shiftKey, metaKey)) {
			return true;
		}

		if (!this.enable) {
			return true;
		}

		var ret = nexacro.Component.prototype.on_fire_user_onkeydown.call(this, keyCode, altKey, ctrlKey, shiftKey, obj, refer_comp, metaKey);

		if ((this.onkeydown && this.onkeydown.defaultprevented == true) || !this._is_alive) {
			return ret;
		}

		this._keydown_elem = this._getWindow()._keydown_element;

		if (!this._keydown_elem) {
			return false;
		}

		this._keydown_keycode = keyCode;

		var ref_comp = refer_comp;
		var is_popup_visible = false;

		if (keyCode != nexacro.Event.KEY_TAB) {
			if (refer_comp instanceof nexacro._GridCalendarControl || refer_comp.parent instanceof nexacro._GridCalendarControl || 
				refer_comp instanceof nexacro._GridComboControl || refer_comp.parent instanceof nexacro._GridComboControl) {
				while (ref_comp && ref_comp != this) {
					if (ref_comp._isPopupVisible()) {
						is_popup_visible = true;
						break;
					}
					ref_comp = ref_comp.parent;
				}

				if (is_popup_visible) {
					if (keyCode == nexacro.Event.KEY_ENTER && this._showEditing) {
						this._need_confirm_control_value = true;
						this.on_fire_onenterdown(keyCode, altKey, ctrlKey, shiftKey, obj, refer_comp, "", metaKey);
						this._need_confirm_control_value = false;
					}

					return ret;
				}
			}
		}

		var areamove = false;

		if (this._isAreaSelect()) {
			areamove = true;
		}

		if (shiftKey == true) {
			if (keyCode == nexacro.Event.KEY_SHIFT) {
				return ret;
			}

			if (this._isMultiSelect() || this._isAreaSelect()) {
				this._multiselect = "shift";
			}
			else {
				this._multiselect = "none";
			}
		}
		else if (ctrlKey == true) {
			if (keyCode == nexacro.Event.KEY_CTRL) {
				return ret;
			}

			if (this._multiselect != "none") {
				this._selectClear = true;
			}

			this._multiselect = "none";
		}
		else {
			if (this._multiselect != "none") {
				this._selectClear = true;
			}

			this._multiselect = "none";
		}

		var bEnterDown = false;
		var bShowEditor = true;
		this._is_data_enter_apply = false;

		if (this.autoenter == "key") {
			if (ctrlKey == false && altKey == false) {
				if (this._isChar(keyCode) || keyCode == 25 || (keyCode == 229 && nexacro._Browser == "Runtime" && nexacro._OS == "Windows")) {
					if (!this._showEditing) {
						this._showEditor();

						if (keyCode == nexacro.Event.KEY_ENTER) {
							bEnterDown = true;
						}
						else {
							if (this._currentCellEditor && this._currentCellEditor._cellobj._writable) {
								this._currentCellEditor.set_value("");
							}
						}
					}
				}
			}
		}

		if (!bEnterDown && keyCode == nexacro.Event.KEY_ENTER && this._showEditing) {
			var edit = this._currentCellEditor;
			var edittype = edit._cellinfo._getEdittype(this._getDataRow(edit._cellobj._rowidx));
			var acceptsenter = edit._cellinfo._getAttrValue(edit._cellinfo.textareaacceptsenter, this._selectinfo.curdsrow);
			acceptsenter = nexacro._toBoolean(acceptsenter);

			if (edittype == "textarea" && ((!acceptsenter && (altKey || ctrlKey || shiftKey)) || (acceptsenter && !altKey && !ctrlKey && !shiftKey))) {
			}
			else if (edittype == "text" || edittype == "mask" || edittype == "date" || edittype == "combo" || edittype == "textarea") {
				bEnterDown = true;
				bShowEditor = false;

				var ref_comp = refer_comp;
				var is_popup_visible = false;

				while (ref_comp && ref_comp != this) {
					if (ref_comp._isPopupVisible()) {
						is_popup_visible = true;
						break;
					}
					ref_comp = ref_comp.parent;
				}

				if (is_popup_visible) {
				}
				else {
					this._hideEditor();
					if (this._setdataobj && this._setdataobj.succ == false) {
						bShowEditor = true;
					}
					else {
						if (this.autoenter == "select") {
							var cellobj = this._findCellObj(refer_comp);
							if (cellobj) {
								if (cellobj.parentcell) {
									cellobj = cellobj.parentcell;
								}

								if (!cellobj._virtualmerge && (cellobj._rowidx != this.currentrow || cellobj._cellidx != this.currentcell)) {
									bShowEditor = true;
								}
								else {
									this._is_data_enter_apply = true;
								}
							}
							else {
								this._is_data_enter_apply = true;
							}
						}
					}
				}
			}
		}

		var firecomp = refer_comp;
		var postvalue = "";
		var newpos;
		var editType;
		var format = this._curFormat;
		var bodycells;
		var cellinfo;

		if (keyCode == nexacro.Event.KEY_UP) {
			if (this._isEditorKeyAction(this._keydown_elem, refer_comp, keyCode, altKey, ctrlKey, shiftKey, metaKey) == false) {
				if (ctrlKey) {
					if (this._scrollpixel == "all") {
						newpos = this._vscrollmng.pos - 25;
					}
					else {
						newpos = this._vscrollmng.pos - 1;
					}

					if (newpos < 0) {
						newpos = 0;
					}

					this._vscrollmng.setPos(newpos);
				}
				else {
					if (nexacro._enableaccessibility) {
						ret = this._moveToAccessibilityCell("up", false);
					}
					else {
						this._moveToCell("up");
					}
				}
			}
		}
		else if (keyCode == nexacro.Event.KEY_DOWN) {
			if (this._isEditorKeyAction(this._keydown_elem, refer_comp, keyCode, altKey, ctrlKey, shiftKey, metaKey) == false) {
				if (ctrlKey) {
					if (this._scrollpixel == "all") {
						newpos = this._vscrollmng.pos + 25;
					}
					else {
						newpos = this._vscrollmng.pos + 1;
					}

					if (newpos > this._vscrollmng.max) {
						newpos = this._vscrollmng.max;
					}

					this._vscrollmng.setPos(newpos);
				}
				else {
					if (nexacro._enableaccessibility) {
						ret = this._moveToAccessibilityCell("down", false);
					}
					else {
						this._moveToCell("down");
					}
				}
			}
		}
		else if (keyCode == nexacro.Event.KEY_SPACE) {
			if (!nexacro._enableaccessibility || nexacro._enableaccessibility && this._currentBand == "body") {
				if (format) {
					bodycells = format._bodycells;
					if (bodycells && bodycells.length) {
						cellinfo = bodycells[this._selectinfo.curcell];
						if (cellinfo) {
							editType = cellinfo._getEdittype(this._selectinfo.curdsrow);
							if (editType == "checkbox" && nexacro._toBoolean(this.readonly) == false) {
								if (this._toggleVal(this._selectinfo.curdsrow, cellinfo)) {
									this._jumpCurrentRow(this._selectinfo.currow);
								}
							}
						}
					}
				}
			}
		}
		else if (keyCode == nexacro.Event.KEY_ENTER) {
			if (!nexacro._enableaccessibility || nexacro._enableaccessibility && this._currentBand == "body") {
				{

					editType = "";

					if (refer_comp._type_name == "GridCellControl") {
						editType = refer_comp._refinfo._getEdittype(this._getDataRow(refer_comp._rowidx));
						postvalue = refer_comp._refinfo._getValue(this._getDataRow(refer_comp._rowidx));
					}
					else if (refer_comp instanceof nexacro._GridCheckboxControl) {
						postvalue = refer_comp._cellinfo._getValue(this._getDataRow(refer_comp._cellobj._rowidx));
					}
					else if (refer_comp.parent instanceof nexacro._GridCheckboxControl) {
						postvalue = refer_comp.parent._cellinfo._getValue(this._getDataRow(refer_comp.parent._cellobj._rowidx));
					}

					if (refer_comp instanceof nexacro._GridEditControl || 
						refer_comp instanceof nexacro._GridTextAreaControl || 
						refer_comp instanceof nexacro._GridMaskEditControl || 
						refer_comp instanceof nexacro._GridCheckboxControl || refer_comp.parent instanceof nexacro._GridCheckboxControl || editType == "checkbox" || 
						refer_comp instanceof nexacro._GridCalendarControl || refer_comp.parent instanceof nexacro._GridCalendarControl || 
						refer_comp instanceof nexacro._GridComboControl || refer_comp.parent instanceof nexacro._GridComboControl) {
						if (nexacro._Browser == "IE" || (nexacro._Browser == "Edge" && nexacro._BrowserType == "Edge")) {
							if (refer_comp instanceof nexacro._GridComboControl) {
								firecomp = refer_comp.comboedit;
							}
						}
						if (this._showEditing || editType == "checkbox") {
							if (!altKey && !ctrlKey && !shiftKey) {
								bEnterDown = true;
							}
						}
						else if (bShowEditor) {
							if (this._find_lastFocused() == this) {
								if (!this._getWindow()._modal_frame_stack.length) {
									nexacro._OnceCallbackTimer.callonce(this, function () {
										if (this._find_lastFocused() == this) {
											if (!this._getWindow()._modal_frame_stack.length) {
												this._showEditor();
											}
										}
									});
								}
							}
						}
					}
					else {
						if (!this._showEditing) {
							nexacro._OnceCallbackTimer.callonce(this, function () {
								this._showEditor();
							});
						}
					}
				}
			}
		}
		else if (keyCode == nexacro.Event.KEY_LEFT) {
			if (format) {
				bodycells = format._bodycells;
				if (bodycells && bodycells.length) {
					cellinfo = this._getBodyCellInfo(this._selectinfo.curcell);
					if (cellinfo) {
						editType = cellinfo._getEdittype(this._selectinfo.curdsrow);
						if (this._hasTree && editType == "tree" && (this.treeuseexpandkey || altKey)) {
							this._is_editor_keyaction = false;
							this._treeStateKeyAction(this._selectinfo.currow, 0);
						}
						else if (editType == "combo" && 
							cellinfo._getAttrValue(cellinfo.combotype, this._selectinfo.curdsrow) == "dropdown") {
							this._is_editor_keyaction = false;
							if (nexacro._enableaccessibility) {
								ret = this._moveToAccessibilityCell("prev", false, undefined, areamove);
							}
							else {
								this._moveToCell("prev", false, areamove, undefined, undefined, true);
							}
						}
					}
				}

				if (this._isEditorKeyAction(this._keydown_elem, refer_comp, keyCode, altKey, ctrlKey, shiftKey, metaKey) == false) {
					if (nexacro._enableaccessibility) {
						ret = this._moveToAccessibilityCell("prev", false, undefined, areamove);
					}
					else {
						this._moveToCell("prev", false, areamove, undefined, undefined, true);
					}
				}
			}
		}
		else if (keyCode == nexacro.Event.KEY_RIGHT) {
			if (format) {
				bodycells = format._bodycells;
				if (bodycells && bodycells.length) {
					cellinfo = this._getBodyCellInfo(this._selectinfo.curcell);
					if (cellinfo) {
						editType = cellinfo._getEdittype(this._selectinfo.curdsrow);
						if (this._hasTree && editType == "tree" && (this.treeuseexpandkey || altKey)) {
							this._is_editor_keyaction = false;
							this._treeStateKeyAction(this._selectinfo.currow, 1);
						}
						else if (editType == "combo" && 
							cellinfo._getAttrValue(cellinfo.combotype, this._selectinfo.curdsrow) == "dropdown") {
							this._is_editor_keyaction = false;
							if (nexacro._enableaccessibility) {
								ret = this._moveToAccessibilityCell("next", false, undefined, areamove);
								this._keydown_elem._event_stop = true;
							}
							else {
								this._moveToCell("next", false, areamove, undefined, undefined, true);
							}
						}
						else {
							var expandshow = cellinfo._getAttrValue(cellinfo.expandshow, this._selectinfo.curdsrow);
							if (expandshow == "show" && altKey) {
								this._is_editor_keyaction = false;
								this.on_fire_onexpanddown("none", altKey, ctrlKey, shiftKey, -1, -1, -1, -1, -1, -1, obj, refer_comp, metaKey);
							}
						}
					}
				}

				if (this._isEditorKeyAction(this._keydown_elem, refer_comp, keyCode, altKey, ctrlKey, shiftKey, metaKey) == false) {
					if (nexacro._enableaccessibility) {
						ret = this._moveToAccessibilityCell("next", false, undefined, areamove);
					}
					else {
						this._moveToCell("next", false, areamove, undefined, undefined, true);
					}
					if (nexacro._enableaccessibility) {
						this._keydown_elem._event_stop = true;
					}
				}
			}
		}
		else if (keyCode == nexacro.Event.KEY_PAGE_UP) {
			if (this._vscrollmng) {
				newpos = this._vscrollmng._pos - this._vscrollmng.page;

				if (this._scrollpixel != "all") {
					newpos = this._vscrollmng._scroll_reverse_convert(newpos)[0];
				}

				if (newpos < 0) {
					newpos = 0;
				}

				this._vscrollmng.setPos(newpos, "page_v");
			}
		}
		else if (keyCode == nexacro.Event.KEY_PAGE_DOWN) {
			if (this._vscrollmng) {
				newpos = this._vscrollmng._pos + this._vscrollmng.page;

				if (this._scrollpixel != "all") {
					newpos = this._vscrollmng._scroll_reverse_convert(newpos)[0];
				}

				if (newpos > this._vscrollmng.max) {
					newpos = this._vscrollmng.max;
				}

				this._vscrollmng.setPos(newpos, "page_v");
			}
		}
		else if (keyCode == nexacro.Event.KEY_TAB) {
			var tempselect = this._multiselect;
			if (nexacro._enableaccessibility) {
				if (shiftKey) {
					this._multiselect = "none";
					this._acceptstab = this._moveToAccessibilityCell("prev", true);
					this._multiselect = tempselect;
				}
				else {
					this._acceptstab = this._moveToAccessibilityCell("next", true);
				}
			}
			else {
				if (shiftKey == true) {
					this._multiselect = "none";
					this._acceptstab = this._moveToCell("prev", true, false, undefined, undefined, true);
					this._multiselect = tempselect;
				}
				else {
					this._acceptstab = this._moveToCell("next", true, false, undefined, undefined, true);
				}
			}
			if (this._acceptstab && this._iskey_movetocell) {
				this._moveCellAfterFocus();
				this._iskey_movetocell = false;
			}
			this._keydown_elem._event_stop = true;

			return this._acceptstab;
		}
		else {
			if (this.autoenter == "key") {
				if (ctrlKey == false && altKey == false) {
					if (this._isChar(keyCode) || keyCode == 25 || (keyCode == 229 && nexacro._Browser == "Runtime" && nexacro._OS == "Windows")) {
						if (!this._showEditing) {
							this._showEditor();
						}
					}
				}
			}
		}

		if (bEnterDown) {
			this.on_fire_onenterdown(keyCode, altKey, ctrlKey, shiftKey, obj, firecomp, postvalue, metaKey);
		}

		return ret;
	};

	_pGrid.on_fire_allclick = function (obj, eventid, clickitem, beforeCell, beforeCol, beforeRow, beforeSubrow, beforePvt, afterCell, afterCol, afterRow, afterSubrow, afterPvt, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		if ((this.onlbuttondown && this.onlbuttondown.defaultprevented == true) || (this.onlbuttonup && this.onlbuttonup.defaultprevented == true)) {
			return;
		}
		if (this._isDownUpScroll()) {
			return;
		}

		var click = this[eventid];
		if (click && click._has_handlers && this.enableevent) {
			var evt = new nexacro.GridClickEventInfo(obj, eventid, beforeCell, beforeCol, beforeRow, beforeSubrow, beforePvt, afterCell, afterCol, afterRow, afterSubrow, afterPvt, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);
			evt.clickitem = clickitem;
			return click._fireEvent(this, evt);
		}
		return true;
	};

	_pGrid._getByteLength_UTF8 = function (s, b, i, c) {
		for (b = i = 0; c = s.charCodeAt(i++); b += c >> 11 ? 3 : c >> 7 ? 2 : 1) {
		}
		return b;
	};

	_pGrid.on_fire_cellclick = function (cellobj, clickitem, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		if (!this._is_alive) {
			return;
		}

		if (!this.enable) {
			return true;
		}

		var newPos = this._getDataRow(cellobj._rowidx);

		if (this._isFakeCell(newPos)) {
			return true;
		}

		var subcellobj;
		if (cellobj.parentcell) {
			subcellobj = cellobj;
			cellobj = cellobj.parentcell;
		}

		var posobj = this._recalcXY(cellobj, canvasX, canvasY, true, from_refer_comp);
		canvasX = posobj.canvasX;
		canvasY = posobj.canvasY;
		clientX = posobj.clientX;
		clientY = posobj.clientY;

		if (nexacro._isTouchInteraction || (button == "touch")) {
			if (cellobj._band.id == "body") {
				if (!(this._selectscrollmode == "select" && this._isAreaSelect())) {
					this._mouseSelection(cellobj, ctrl_key, shift_key, canvasX, canvasY, from_comp, from_refer_comp, meta_key);
				}
			}

			if (((subcellobj && subcellobj._editor) || (cellobj._editor)) && !clickitem) {
				clickitem = "control";
			}
		}

		var beforeCell = this._beforebodycellpos;
		var beforeCol = this._beforebodycolpos;
		var beforeRow = this._beforebodyrowpos;
		var beforeSubrow = this._beforebodysubrowpos;
		var beforePvt = this._beforepvt;

		var afterCell = cellobj._cellidx;
		var afterCol = cellobj._refinfo._col;
		var afterRow = newPos;
		var afterSubrow = cellobj._refinfo._row;
		var afterPvt = -9;

		if (button == "none") {
			beforeCell = afterCell;
			beforeCol = afterCol;
			beforeRow = afterRow;
			beforeSubrow = afterSubrow;
			beforePvt = -9;
		}

		if (subcellobj) {
			afterCol += subcellobj._refinfo._col;
		}


		var obj = from_refer_comp;
		var showEditclick = false;

		while (obj && !(obj instanceof nexacro.Grid)) {
			if (obj._displaymode == false && !obj._clickevt_able) {
				showEditclick = true;
			}

			obj = obj.parent;
		}

		if (!showEditclick) {
			this.on_fire_allclick(this, "oncellclick", clickitem, beforeCell, beforeCol, beforeRow, beforeSubrow, beforePvt, afterCell, afterCol, afterRow, afterSubrow, afterPvt, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);
		}
	};

	_pGrid.on_fire_headclick = function (cellobj, clickitem, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		if (!this.enable || !this._is_alive) {
			return true;
		}

		var subcellobj;
		if (cellobj.parentcell) {
			subcellobj = cellobj;
			cellobj = cellobj.parentcell;
		}

		var posobj = this._recalcXY(cellobj, canvasX, canvasY, true, from_refer_comp);
		canvasX = posobj.canvasX;
		canvasY = posobj.canvasY;
		clientX = posobj.clientX;
		clientY = posobj.clientY;

		var beforeCell = this._beforeheadcellpos;
		var beforeCol = this._beforeheadcolpos;
		var beforeRow = this._beforeheadrowpos;
		var beforeSubrow = this._beforeheadsubrowpos;
		var beforePvt = this._beforepvt;

		var afterCell = this._beforeheadcellpos = cellobj._cellidx;
		var afterCol = this._beforeheadcolpos = cellobj._refinfo._col;
		var afterRow = this._beforeheadrowpos = this._getDataRow(cellobj._rowidx);
		var afterSubrow = this._beforeheadsubrowpos = cellobj._refinfo._row;
		var afterPvt = -9;

		if (subcellobj) {
			afterCol += subcellobj._refinfo._col;
		}

		this.on_fire_allclick(this, "onheadclick", clickitem, beforeCell, beforeCol, beforeRow, beforeSubrow, beforePvt, afterCell, afterCol, afterRow, afterSubrow, afterPvt, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);
	};

	_pGrid.on_fire_summaryclick = function (cellobj, clickitem, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		if (!this.enable || !this._is_alive) {
			return true;
		}

		var subcellobj;
		if (cellobj.parentcell) {
			subcellobj = cellobj;
			cellobj = cellobj.parentcell;
		}

		var posobj = this._recalcXY(cellobj, canvasX, canvasY, true, from_refer_comp);
		canvasX = posobj.canvasX;
		canvasY = posobj.canvasY;
		clientX = posobj.clientX;
		clientY = posobj.clientY;

		var beforeCell = this._beforesummcellpos;
		var beforeCol = this._beforesummcolpos;
		var beforeRow = this._beforesummrowpos;
		var beforeSubrow = this._beforesummsubrowpos;
		var beforePvt = this._beforepvt;

		var afterCell = this._beforesummcellpos = cellobj._cellidx;
		var afterCol = this._beforesummcolpos = cellobj._refinfo._col;
		var afterRow = this._beforesummrowpos = this._getDataRow(cellobj._rowidx);
		var afterSubrow = this._beforesummsubrowpos = cellobj._refinfo._row;
		var afterPvt = -9;

		if (subcellobj) {
			afterCol += subcellobj._refinfo._col;
		}

		this.on_fire_allclick(this, "onsummaryclick", clickitem, beforeCell, beforeCol, beforeRow, beforeSubrow, beforePvt, afterCell, afterCol, afterRow, afterSubrow, afterPvt, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);
	};

	_pGrid.on_fire_celldblclick = function (cellobj, clickitem, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		if (!this.enable || !this._is_alive) {
			return true;
		}

		var newPos = this._getDataRow(cellobj._rowidx);

		if (this._isFakeCell(newPos)) {
			return true;
		}

		var subcellobj;
		if (cellobj.parentcell) {
			subcellobj = cellobj;
			cellobj = cellobj.parentcell;
		}

		var posobj = this._recalcXY(cellobj, canvasX, canvasY, true, from_refer_comp);
		canvasX = posobj.canvasX;
		canvasY = posobj.canvasY;
		clientX = posobj.clientX;
		clientY = posobj.clientY;

		var beforeCell = this._dbclickPreCell;
		var beforeCol = this._dbclickPreCol;
		var beforeRow = this._dbclickPreRow;
		var beforeSubrow = this._dbclickPreSubrow;
		var beforePvt = this._dbclickPrePvt;

		var afterCell = cellobj._cellidx;
		var afterCol = cellobj._refinfo._col;
		var afterRow = newPos;
		var afterSubrow = cellobj._refinfo._row;
		var afterPvt = -9;

		if (subcellobj) {
			afterCol += subcellobj._refinfo._col;
		}

		this._dbclickPreCell = afterCell;
		this._dbclickPreCol = afterCol;
		this._dbclickPreRow = afterRow;
		this._dbclickPreSubrow = afterSubrow;
		this._dbclickPrePvt = afterPvt;

		this.on_fire_allclick(this, "oncelldblclick", clickitem, beforeCell, beforeCol, beforeRow, beforeSubrow, beforePvt, afterCell, afterCol, afterRow, afterSubrow, afterPvt, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);
	};

	_pGrid.on_fire_headdblclick = function (cellobj, clickitem, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		if (!this.enable || !this._is_alive) {
			return true;
		}

		var subcellobj;
		if (cellobj.parentcell) {
			subcellobj = cellobj;
			cellobj = cellobj.parentcell;
		}

		var posobj = this._recalcXY(cellobj, canvasX, canvasY, true, from_refer_comp);
		canvasX = posobj.canvasX;
		canvasY = posobj.canvasY;
		clientX = posobj.clientX;
		clientY = posobj.clientY;

		var beforeCell = this._dbclickPreCell;
		var beforeCol = this._dbclickPreCol;
		var beforeRow = this._dbclickPreRow;
		var beforeSubrow = this._dbclickPreSubrow;
		var beforePvt = this._dbclickPrePvt;

		var afterCell = cellobj._cellidx;
		var afterCol = cellobj._refinfo._col;
		var afterRow = this._getDataRow(cellobj._rowidx);
		var afterSubrow = cellobj._refinfo._row;
		var afterPvt = -9;

		if (subcellobj) {
			afterCol += subcellobj._refinfo._col;
		}

		this._dbclickPreCell = afterCell;
		this._dbclickPreCol = afterCol;
		this._dbclickPreRow = afterRow;
		this._dbclickPreSubrow = afterSubrow;
		this._dbclickPrePvt = afterPvt;

		this.on_fire_allclick(this, "onheaddblclick", clickitem, beforeCell, beforeCol, beforeRow, beforeSubrow, beforePvt, afterCell, afterCol, afterRow, afterSubrow, afterPvt, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);
	};

	_pGrid.on_fire_summarydblclick = function (cellobj, clickitem, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		if (!this.enable || !this._is_alive) {
			return true;
		}

		var subcellobj;
		if (cellobj.parentcell) {
			subcellobj = cellobj;
			cellobj = cellobj.parentcell;
		}

		var posobj = this._recalcXY(cellobj, canvasX, canvasY, true, from_refer_comp);
		canvasX = posobj.canvasX;
		canvasY = posobj.canvasY;
		clientX = posobj.clientX;
		clientY = posobj.clientY;

		var beforeCell = this._dbclickPreCell;
		var beforeCol = this._dbclickPreCol;
		var beforeRow = this._dbclickPreRow;
		var beforeSubrow = this._dbclickPreSubrow;
		var beforePvt = this._dbclickPrePvt;

		var afterCell = cellobj._cellidx;
		var afterCol = cellobj._refinfo._col;
		var afterRow = this._getDataRow(cellobj._rowidx);
		var afterSubrow = cellobj._refinfo._row;
		var afterPvt = -9;

		if (subcellobj) {
			afterCol += subcellobj._refinfo._col;
		}

		this._dbclickPreCell = afterCell;
		this._dbclickPreCol = afterCol;
		this._dbclickPreRow = afterRow;
		this._dbclickPreSubrow = afterSubrow;
		this._dbclickPrePvt = afterPvt;

		this.on_fire_allclick(this, "onsummarydblclick", clickitem, beforeCell, beforeCol, beforeRow, beforeSubrow, beforePvt, afterCell, afterCol, afterRow, afterSubrow, afterPvt, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);
	};

	_pGrid.on_dsnotify_onrowposchanged = function (obj, e) {
		var oldPos = this._rowposition;
		var newPos = parseInt(obj.rowposition, 10);

		this._rowposition = newPos;

		if (this.getElement() && this._userRowposChange == false) {
			var cellOldPos = -1;
			var cellNewPos = -1;
			var pthis = this;

			if (this._hasTree) {
				cellOldPos = this._getTreeRowPosition(oldPos);
				cellNewPos = this._getTreeRowPosition(newPos);
			}
			else {
				cellOldPos = oldPos;
				cellNewPos = newPos;
			}

			var beforeCell;
			var beforeCol;
			var beforeRow;
			var beforeSubrow;
			var beforePvt;

			var afterCell;
			var afterCol;
			var afterRow;
			var afterSubrow;
			var afterPvt = -9;

			if (cellNewPos < 0) {
				afterCell = (this._selectinfo.curcell < 0) ? 0 : this._selectinfo.curcell;
				afterCol = (this._selectinfo.curcol < 0) ? 0 : this._selectinfo.curcol;
				afterRow = newPos;
				afterSubrow = (this._selectinfo.cursubrow < 0) ? 0 : this._selectinfo.cursubrow;

				function proc1 () {
					pthis._hideEditor();

					beforeCell = pthis._beforebodycellpos = pthis._selectinfo.curcell;
					beforeCol = pthis._beforebodycolpos = pthis._selectinfo.curcol;
					beforeRow = pthis._beforebodyrowpos = pthis._selectinfo.curdsrow;
					beforeSubrow = pthis._beforebodysubrowpos = pthis._selectinfo.cursubrow;
					beforePvt = pthis._beforepvt = pthis._selectinfo.curpvt;

					pthis._setSelectedInfo(afterCell, afterCol, afterRow, afterSubrow, afterPvt);
					pthis._ChangeSelect(afterCell, afterCol, afterRow, afterSubrow, afterPvt, true, beforeCell, beforeCol, beforeRow, beforeSubrow, beforePvt, "body");
					pthis._moveCellAfterFocus();
				}

				if (this._is_async_recreate) {
					nexacro._OnceCallbackTimer.callonce(this, proc1, 100);
				}
				else {
					proc1();
				}
			}
			else if (cellOldPos == cellNewPos) {
			}
			else {
				afterCell = (this._selectinfo.curcell < 0) ? 0 : this._selectinfo.curcell;
				afterCol = (this._selectinfo.curcol < 0) ? 0 : this._selectinfo.curcol;
				afterRow = newPos;
				afterSubrow = (this._selectinfo.cursubrow < 0) ? 0 : this._selectinfo.cursubrow;

				if (afterRow >= 0 && (this._isMultiSelect() || this._isAreaSelect())) {
					if (obj._bWorkingstatus == true) {
						this._hideEditor();

						beforeCell = this._beforebodycellpos = this._selectinfo.curcell;
						beforeCol = this._beforebodycolpos = this._selectinfo.curcol;
						beforeRow = this._beforebodyrowpos = this._selectinfo.curdsrow;
						beforeSubrow = this._beforebodysubrowpos = this._selectinfo.cursubrow;
						beforePvt = this._beforepvt = this._selectinfo.curpvt;

						this._beforebodycellpos = -1;
						this._beforebodycolpos = -1;
						this._beforebodyrowpos = -1;
						this._beforebodysubrowpos = -1;

						this._setSelectedInfo(-1, -1, -1, -1, null);

						this._ChangeSelect(-1, -1, -1, -1, afterPvt, true, beforeCell, beforeCol, beforeRow, beforeSubrow, beforePvt, "body");
						this._moveCellAfterFocus();
					}
					else {
						if (this._getUseBindExprProp("body") || this._isUseBindExprStyle("body")) {
							this._refreshBody(true);
						}
						if (this._isUseBindExprStyle("head") || this._getUseBindExprProp("head")) {
							this._refreshHead(true);
						}
						if (this._isUseBindExprStyle("summ") || this._getUseBindExprProp("summ")) {
							this._refreshSumm(true);
						}

						var disprow = this._dsRowToDispRow(afterRow);

						function proc2 () {
							pthis._jumpCurrentRow(disprow);
							pthis._moveCellAfterFocus();
						}

						if (this._is_async_recreate) {
							nexacro._OnceCallbackTimer.callonce(this, proc2, 100);
						}
						else {
							proc2();
						}
					}
				}
				else {
					function proc3 () {
						pthis._hideEditor();

						beforeCell = pthis._beforebodycellpos = pthis._selectinfo.curcell;
						beforeCol = pthis._beforebodycolpos = pthis._selectinfo.curcol;
						beforeRow = pthis._beforebodyrowpos = pthis._selectinfo.curdsrow;
						beforeSubrow = pthis._beforebodysubrowpos = pthis._selectinfo.cursubrow;
						beforePvt = pthis._beforepvt = pthis._selectinfo.curpvt;

						pthis._setSelectedInfo(afterCell, afterCol, afterRow, afterSubrow, afterPvt);

						pthis._ChangeSelect(afterCell, afterCol, afterRow, afterSubrow, afterPvt, true, beforeCell, beforeCol, beforeRow, beforeSubrow, beforePvt, "body");
						pthis._moveCellAfterFocus();
					}

					if (this._is_async_recreate) {
						nexacro._OnceCallbackTimer.callonce(this, proc3, 100);
					}
					else {
						proc3();
					}
				}
			}
		}
	};

	_pGrid.on_dsnotify_oncolumnchanged = function (obj, e, async_call) {
		if (this._is_async_recreate) {
			if (!async_call) {
				var win = this._getWindow();
				win._postMessage(this, "oncolumnchanged", this._callbackPostmsg, [obj, e]);
			}
			return;
		}

		if (obj._bWorkingstatus == true) {
			this._recreate_contents_all(true, false);
			return;
		}

		var cols = [];
		var ds;

		this._clearCellStyleCache(this._curFormat);

		if (this._isTreeStateChanged(e, this._dsEventOccured) == true) {
			this._updateTreeStates();

			var rowidx = this._getTreeRowPosition(e.row);
			var state = this._treeStates[e.row];

			if (this._bodyBand) {
				if (rowidx == -1) {
					this._recreate_contents_all(true, false, true);
				}
				else {
					if (this._treeCellinfo.treelevel._bindexpr == e.columnid) {
						this._refreshBody();
					}
					else {
						if (state == 0) {
							this._bodyBand._matrix._adjustTreeDisplay(rowidx, true);
						}
						else {
							this._bodyBand._matrix._adjustTreeDisplay(rowidx, false);
						}

						var parentrow = this.getTreeParentRow(rowidx, true);
						parentrow = this._dsRowToDispRow(parentrow, true);

						this._refreshBodyRow(parentrow);
					}
				}
			}
		}
		else if ((this.autosizingtype == "row" || this.autosizingtype == "both") && this._isChangeBodyRowSizeList(e.row) == true) {
			this._recreate_contents_all(true, false);
		}
		else if ((this.autosizingtype == "col" || this.autosizingtype == "both") && this._isChangeBodyColSizeList(e.columnid, cols, e.row) == true) {
			this._autofitcol_rate = [];

			if (cols.length > 1) {
				if (this.autosizingtype == "both") {
					this._recreate_contents_all(true, false);
				}
				else {
					this._recreate_contents_all(false, false);
				}
			}
			else if (cols.length == 1) {
				if (this.enableredraw) {
					this._updateColSize(cols[0]);
				}
				else {
					if (!this._enable_redraw_history.updatecolsize) {
						this._enable_redraw_history.updatecolsize = [];
					}

					this._enable_redraw_history.updatecolsize.push(cols[0]);
				}
			}
		}
		else {
			if (e.row >= 0) {
				if (this._hasTree && this._treeCellinfo.treecheck._bindexpr == e.columnid) {
					this._treeChecked = this._createTreeChecked();
				}

				var displayrow = this._dsRowToDispRow(e.row, true);
				if (displayrow >= 0) {
					var bindcells = this._getBindTextCellInfo(e.columnid);
					var bhead = false;
					var bsumm = false;

					if (bindcells) {
						var cells = bindcells[0];
						var bind = bindcells[1];

						var cellsLen = cells.length, csupp;
						var i;

						if (this._is_use_suppress) {
							for (i = 0; i < cellsLen; i++) {
								csupp = cells[i]._getSuppress(e.row);
								if (csupp != 0) {
									this._suppressUpdate();
									break;
								}
							}
						}

						var b_continue = false;

						for (i = 0; i < cellsLen; i++) {
							if (cells[i]._type == "head") {
								bhead = true;
							}
							else if (cells[i]._type == "summary") {
								bsumm = true;
							}
							else {
								if (e.col == -1 && e.colidx == -1) {
									if (e.newvalue != undefined) {
										if (!b_continue) {
											if (this._hasTree) {
												this._initTreeStates(true, true);
												this._recreate_contents_all(false, false, true);
											}
											else {
												this._refreshBodyRow(displayrow);
											}
											b_continue = true;
										}

										if (this._currentCellEditor && cells[i]._col == this._currentCellEditor._cellinfo._col && cells[i]._row == this._currentCellEditor._cellinfo._row && e.row == this._currentCellRow) {
											this._currentCellEditor._setProperty();
										}
									}
								}
								else {
									{

										var isrefreshexprcell = false;
										csupp = cells[i]._getSuppress(e.row);
										if (csupp > 0) {
											var bodycells = this._curFormat._bodycells;
											isrefreshexprcell = true;

											for (var j = 0, n = bodycells.length; j < n; j++) {
												if (bodycells[j]._getSuppress(e.row) >= csupp) {
													this._refreshCell("body", j);
												}
											}
										}
										else if (csupp < 0) {
											if (!b_continue) {
												this._refreshBodyRow(displayrow);
												b_continue = true;
												isrefreshexprcell = true;
											}
										}
										else {
											if (!b_continue) {
												ds = this._binddataset;
												if (ds.keystring && ds._keycols.length > 0) {
													this._refreshBody();
												}
												else {
													this._refreshBodyRow(displayrow);
													isrefreshexprcell = true;
												}
												b_continue = true;
											}
										}

										if (isrefreshexprcell) {
											var exprbindcells = null;

											if ((exprbindcells = this._getUseBindExprProp("body"))) {
												if (this._expr_allrow_update_prop || this._expr_allrow_update_style) {
													for (var jj = 0; jj < exprbindcells.length; jj++) {
														this._refreshCell("body", exprbindcells[jj], undefined);
													}
												}
											}
										}

										if (bind && this._currentCellEditor && cells[i]._col == this._currentCellEditor._cellinfo._col && cells[i]._row == this._currentCellEditor._cellinfo._row && e.row == this._currentCellRow) {
											this._currentCellEditor._setProperty();
										}
									}
								}
								bsumm = true;
							}
						}
					}
					if (bhead || this._getUseBindExprProp("head")) {
						this._refreshHead();
					}
					if (bsumm || this._getUseBindExprProp("summ")) {
						this._refreshSumm();
					}
				}
				else {
					if (this._hasTree) {
						if (e.columnid == "") {
							this._initTreeStates(true);
							this._recreate_contents_all(false, false, true);
						}
						else {
							ds = this._binddataset;
							if (ds.keystring && ds._keycols.length > 0) {
								this._refreshBody();
							}
						}
					}
				}
			}
			else {
				this._refreshHead();
				this._refreshSumm();

				if (obj._isConstColumn(e.col) == true) {
					this._refreshBody();
				}
			}
		}
	};

	_pGrid.on_dsnotify_onload = function (obj, e) {
		if (!this._is_created && this._rowcount == obj.rowcount) {
			return;
		}

		var prevrowcnt = this._rowcount;
		var _reason = e.reason;

		this.rowcount = this._rowcount = obj.rowcount;
		this._rowposition = obj.rowposition;

		if (_reason != 91) {
			this._initSelect(this._rowposition);
		}

		if (this._is_down_act && !this._isDownActionKeyMouse()) {
			this._is_down_act = false;
		}

		this._exprcache = {
		};
		this._initTreeStates();

		var _errorcode = e.errorcode;
		if (_errorcode < 0) {
			return;
		}

		if (_reason == 0 || _reason == 1 || _reason == 2 || _reason == 3) {
			if (_reason == 1 || (_reason == 0 && e.progressload)) {
				if (this.autosizingtype != "none") {
					if (this._async_create == true) {
						this._recreate_contents_all_async(true, false, false, undefined, prevrowcnt);
					}
					else {
						this._recreate_contents_all(true, false, false, undefined, prevrowcnt);
					}
				}
				else {
					this._updateBodyClient("progressload", undefined, prevrowcnt);
				}
			}
			else {
				if (this.autosizingtype != "none") {
					if (this._async_create == true) {
						this._recreate_contents_all_async(true, true, false);
					}
					else {
						this._recreate_contents_all(true, true, false);
					}
				}
				else {
					this._updateBodyClient("load");
				}
			}
		}
		else if (_reason == 91) {
			this._recreate_contents_all(true, true);
			this._binddataset = null;
		}
		else if (_reason == 12) {
			var body = this._bodyBand;
			if (!body) {
				return;
			}

			var lastrow = prevrowcnt - 1;
			var toppos = body._matrix._getBodyRowTopPos(lastrow + 1) - this._getScrollTop();
			var rect = this._getAvailableRect(body);
			var chk_srow = prevrowcnt;

			var disp_rows_len = body._matrix._rows.length;
			var row = lastrow + 1;

			if (toppos >= rect.height && lastrow < row && (disp_rows_len % 2 != 1)) {
				if (this._isUserChangeHeadRowSize || this._isUserChangeBodyRowSize || this._isUserChangeSummRowSize) {
					this._recreate_contents_all(true, false, true);
				}
				else {
					this._resetRowSizeList(chk_srow);
					this._resetColSizeList(chk_srow);
					this._resetScrollMax();
				}
			}
			else {
				if (this._hasTree) {
					this._initTreeStates(true);
					this._recreate_contents_all(true, false, true);
				}
				else if (this.autosizingtype == "col" || this.autosizingtype == "both") {
					this._recreate_contents_all(true, false);
				}
				else {
					this._updateBodyClient("appenddata");
				}
			}
		}
	};

	_pGrid.on_dsnotify_onrowsetchanged = function (obj, e) {
		var dataset = this._binddataset;
		var bchange_rowcnt = (this._rowcount != dataset.rowcount);
		var prev_rowcnt = this._rowcount;
		this.rowcount = this._rowcount = dataset.rowcount;

		var updaterow_pos = false;
		if (this._rowposition != dataset.rowposition) {
			updaterow_pos = true;
		}

		if (this._is_down_act && !this._isDownActionKeyMouse()) {
			this._is_down_act = false;
		}

		this._rowposition = dataset.rowposition;
		if (this._curFormat) {
			var lastrow = this._rowcount - 1;
			var kind;

			switch (e.reason) {
				case 10:
					kind = "assign";
					break;
				case 11:
					kind = "copydata";
					break;
				case 12:
					if (e.row == -1) {
						kind = "appenddata";
					}
					else if (e.row == lastrow) {
						kind = "addrow";
					}
					else if (e.row < lastrow) {
						kind = "insertrow";
					}
					break;
				case 20:
					if (e.row == -1) {
						kind = "deletemultirows";
					}
					else {
						kind = "deleterow";
					}
					break;
				case 22:
					kind = "deleteall";
					break;
				case 23:
					kind = "cleardata";
					break;
				case 24:
					kind = "clear";
					break;
				case 30:
					kind = "keystring";
					break;
				case 31:
					if (e.row == -1) {
						kind = "filter";
					}
					else {
						kind = "filterrow";
					}
					break;
				case 32:
					kind = "moverow";
					break;
				case 33:
					kind = "exchangerow";
					break;
				case 34:
					kind = "addcolumn";
					break;
				case 41:
					kind = "enableevent";
					break;
				case 40:
					kind = "rowtype";
					break;
				default:
					break;
			}

			if (kind == "copydata" || kind == "addcolumn" || kind == "assign" || kind == "filter") {
				this._exprcache = {
				};
				this._resetSelect(this._rowposition);
			}
			else if (kind == "enableevent" || kind == "appenddata") {
				this._exprcache = {
				};
			}
			else if (kind == "deleterow" || kind == "filterrow") {
				this._updateTreeStates(e.row, false);
				this._delOverSelectInfo();
			}
			else if (kind == "deletemultirows") {
				var rows = obj._deleteRows;

				for (var i = rows.length - 1; i >= 0; i--) {
					this._updateTreeStates(rows[i], false);
				}
				this._delOverSelectInfo();
			}
			else if (kind == "deleteall" || kind == "cleardata" || kind == "clear") {
				this._clrMultiSelect();
				this._setSelectedInfo(-1, -1, -1, -1, null);
				this._destroyOverlayControls();
				this._destroySelectionControls();
			}
			else if (kind == "copydata") {
				this._setSelectedInfo(null, null, this._rowposition, 0, null);
			}
			else if (kind == "addrow" || kind == "insertrow" || kind == "appendrow") {
				this._updateTreeStates(e.row, true);
			}

			if (kind != "addrow") {
				this._clearCellStyleCache(this._curFormat);
			}

			if (this._is_async_recreate) {
				var win = this._getWindow();
				win._postMessage(this, "afterrowset", this._callbackPostmsg, [kind, updaterow_pos, e.row, bchange_rowcnt, prev_rowcnt]);
			}
			else {
				this._afterRowsetChanged(kind, updaterow_pos, e.row, bchange_rowcnt, prev_rowcnt);
			}
		}
	};

	_pGrid._clearCellStyleCache = function (format) {
		if (!format) {
			return;
		}

		var cellinfos, cellcount;

		for (var j = -2; j < 1; j++) {
			if (j == -2) {
				cellinfos = format._summcells;
			}
			else if (j == -1) {
				cellinfos = format._headcells;
			}
			else if (j >= 0) {
				cellinfos = format._bodycells;
			}

			if (cellinfos) {
				cellcount = cellinfos.length;
				for (var i = 0; i < cellcount; i++) {
					cellinfos[i]._clearStyle();
				}
			}
		}
	};

	_pGrid._callbackPostmsg = function (e) {
		var args = e.data;
		if (e.id == "afterrowset") {
			this._afterRowsetChanged(args[0], args[1], args[2], args[3], args[4]);
		}
		else if (e.id == "oncolumnchanged") {
			this.on_dsnotify_oncolumnchanged(args[0], args[1], true);
		}
	};

	_pGrid._afterRowsetChanged = function (kind, updaterow_pos, row, bchange_rowcnt, prev_rowcnt) {
		if (this.getElement()) {
			var bodyBand = this._bodyBand;

			this._hideEditor(true);

			if (kind == "copydata" || kind == "assign") {
				this._initTreeStates();

				if (!this.enableredraw) {
					this._enable_redraw_history.recreate = true;
					return;
				}

				this._recreate_contents_all(true, true);
			}
			else if (kind == "addcolumn") {
				this._initTreeStates(true);

				if (!this.enableredraw) {
					this._enable_redraw_history.recreate = true;
					return;
				}

				this._recreate_contents_all(true, false);
			}
			else if (kind == "keystring") {
				this._initTreeStates();

				if (!this.enableredraw) {
					this._enable_redraw_history.recreate = true;
					return;
				}

				if (this.autosizingtype == "col" || this.autosizingtype == "both") {
					this._recreate_contents_all(true, false);
				}
				else {
					this._recreate_contents_all(true, false, true);
				}

				this._resetSelect(this._rowposition, this._selectinfo.curcell, this._selectinfo.curcol, this._selectinfo.cursubrow, this._selectinfo.curpvt);
			}
			else if (kind == "enableevent") {
				this._initTreeStates(true);

				if (!this.enableredraw) {
					this._enable_redraw_history.recreate = true;
					return;
				}

				if (bchange_rowcnt || this.autosizingtype != "none") {
					this._recreate_contents_all(true, false);
				}
				else {
					if (this._hasTree) {
						if (bodyBand) {
							bodyBand._matrix._adjustRowsDisplay(true);
							bodyBand._matrix._adjustColsDisplay();
							bodyBand._on_refresh_rows();
						}
					}
					this._refreshAll();
				}

				if (updaterow_pos == false) {
					this._select_noscroll = true;
				}

				if (!this._isMultiSelect() && !this._isAreaSelect()) {
					this._resetSelect(this._rowposition, this._selectinfo.curcell, this._selectinfo.curcol, this._selectinfo.cursubrow, this._selectinfo.curpvt);
				}

				this._select_noscroll = false;

				if (!this._is_created) {
					this._create_selection = {
						cell : this._selectinfo.curcell, 
						col : this._selectinfo.curcol, 
						row : this._selectinfo.curdsrow, 
						subrow : this._selectinfo.cursubrow, 
						pvt : this._selectinfo.curpvt
					};
				}
			}
			else if (kind == "addrow" || kind == "appenddata" || kind == "deleterow" || kind == "filterrow" || kind == "insertrow" || kind == "deletemultirows" || kind == "filter") {
				if (bodyBand) {
					var chk_srow;

					if (kind == "addrow" || kind == "appenddata") {
						chk_srow = prev_rowcnt;
					}

					if (row <= this._fixed_endrow) {
						if (!this.enableredraw) {
							this._enable_redraw_history.recreate = true;
							return;
						}

						this._resetRowSizeList(chk_srow);
						this._resetColSizeList(chk_srow);
						this._setFixedRow(-1);
					}
					else {
						var lastrow = this._getDataRow(this._endrowpos);
						var toppos = bodyBand._matrix._getBodyRowTopPos(lastrow + 1) - this._getScrollTop();
						var rect = this._getAvailableRect(bodyBand);
						var disp_rows_len = bodyBand._matrix._rows.length;

						if (toppos >= rect.height && lastrow < row && (disp_rows_len % 2 != 1) && this._vscrollmng.max > 0) {
							if (!this.enableredraw) {
								this._enable_redraw_history.recreate = true;
								return;
							}

							if (this._isUserChangeHeadRowSize || this._isUserChangeBodyRowSize || this._isUserChangeSummRowSize) {
								this._recreate_contents_all(true, false, true, undefined, chk_srow);
							}
							else {
								this._resetRowSizeList(chk_srow);
								this._resetColSizeList(chk_srow);
								this._resetScrollMax();
							}
							if (kind == "deleterow") {
								var disprow = this._dsRowToDispRow(row);
								this._jumpCurrentRow(disprow);
							}
							else {
							}
						}
						else {
							if (kind == "insertrow") {
							}
							else {
								if (this._hasTree) {
									this._initTreeStates((kind == "addrow" || kind == "appenddata" || kind == "deleterow"));
								}
							}

							if (!this.enableredraw) {
								this._enable_redraw_history.recreate = true;
								return;
							}

							if (this.autosizingtype == "col" || this.autosizingtype == "both") {
								this._recreate_contents_all(true, false, false, undefined, chk_srow);
							}
							else if (this.autosizingtype == "row") {
								this._recreate_contents_all(true, false, false, undefined, chk_srow);
							}
							else {
								if (this._hasTree) {
									this._recreate_contents_all(true, false, false, undefined, chk_srow);
								}
								else {
									this._updateBodyClient(kind, row, chk_srow);
								}
							}
						}
					}
				}
				else {
					if (!this.enableredraw) {
						this._enable_redraw_history.recreate = true;
						return;
					}

					this._recreate_contents_all(true, false);
				}
			}
			else if (kind == "exchangerow" || kind == "moverow") {
				if (this.autosizingtype != "none" || this._hasTree) {
					this._initTreeStates(true);

					if (!this.enableredraw) {
						this._enable_redraw_history.recreate = true;
						return;
					}

					this._recreate_contents_all(false, false, true);
				}
				else {
					this._refreshBody();
				}
			}
			else if (kind == "rowtype") {
				if (!this.enableredraw) {
					this._enable_redraw_history.refreshall = true;
					return;
				}

				this._refreshAll();
			}
			else {
				this._initTreeStates();

				if (!this.enableredraw) {
					this._enable_redraw_history.recreate = true;
					return;
				}

				this._recreate_contents_all(true, false);
			}
			this._moveCellAfterFocus();
		}
	};

	_pGrid._getDisplayRowCount = function () {
		var band = this._bodyBand;
		if (band) {
			return band._get_rows().length;
		}

		return 0;
	};

	_pGrid._needUpdateExtinner = function (b_size) {
		var _vpos = (this.vscrollbar) ? this.vscrollbar._pos : 0;
		var band = this._bodyBand;
		var ext_cnt = band._control_element._getExtendContainerCount();

		if (ext_cnt > 0 && (b_size || _vpos > (this._div_max_height - (this._getClientWidth() *  2)))) {
			return true;
		}

		return false;
	};

	_pGrid._updateBodyClient = function (kind, row, chk_srow) {
		var band = this._bodyBand;
		if (!band) {
			return;
		}

		var oldfixed = this._fixed_height;

		this._resetRowSizeList(chk_srow);
		this._resetColSizeList(chk_srow);

		if ((oldfixed != this._fixed_height) && this._bodyBand) {
			this._bodyBand._control_element._setFixArea(this._fixed_height);
		}

		this._resetScrollMax();
		this._applyAutofittype(true);

		var beforerowcnt = this._getDisplayRowCount();
		var rows;
		var rows_len;
		var disprow;
		var datarow;
		var i;
		var lastPosition;
		var _vpos;

		if (kind == "insertrow") {
			if (this._needUpdateExtinner()) {
				this._recreate_contents_all(false, false, true);
			}
			else {
				band._matrix._adjustRowsDisplay();
				band._matrix._adjustColsDisplay();

				rows = band._get_rows();
				rows_len = rows.length;

				for (i = 0; i < rows_len; i++) {
					datarow = this._getDataRow(rows[i]._rowidx);
					if (row > datarow) {
						continue;
					}

					band._update_rows.push(rows[i]);
				}

				band._on_refresh_rows();
			}

			disprow = this._dsRowToDispRow(row);
			this._jumpCurrentRow(disprow);
		}
		else if (kind == "deleterow") {
			_vpos = (this._vscrollmng) ? this._vscrollmng._pos : 0;
			_vpos -= this._is_over_scroll;

			if (_vpos < 0) {
				_vpos = 0;
			}

			if (this._needUpdateExtinner()) {
				this._recreate_contents_all(false, false, true);
			}
			else {
				this._toprowpos = this._getScreenTopRowPos(_vpos);
				this._bottomrowpos = this._getScreenBottomRowPos(_vpos);

				band._matrix._adjustRowsDisplay();
				band._matrix._adjustColsDisplay();

				rows = band._get_rows();
				rows_len = rows.length;

				for (i = 0; i < rows_len; i++) {
					datarow = this._getDataRow(rows[i]._rowidx);
					if (row > datarow) {
						continue;
					}

					band._update_rows.push(rows[i]);
				}

				band._on_refresh_rows();
			}

			row = this._binddataset.rowposition;

			disprow = this._dsRowToDispRow(row);
			this._jumpCurrentRow(disprow);

			lastPosition = this._last_scroll_top;

			if (lastPosition != _vpos) {
				band._update_rows = band._matrix._adjustScrollRows(_vpos);
			}

			band._on_refresh_rows();

			if (this._is_over_scroll > 0) {
				this._vscrollmng.setPos(this._vscrollmng.pos - 1);
			}
		}
		else if (kind == "load") {
			if (this._needUpdateExtinner()) {
				this._recreate_contents_all(false, true, true);
			}
			else {
				this._toprowpos = this._getScreenTopRowPos(0);
				this._bottomrowpos = this._getScreenBottomRowPos(0);

				band._update_rows = band._matrix._adjustScrollRows(0, true);
				band._matrix._adjustRowsDisplay();
				band._matrix._adjustColsDisplay();
				band._on_refresh_rows();

				this._vscrollmng.setPos(0);
			}
		}
		else if (kind == "progressload") {
			if (this._needUpdateExtinner()) {
				this._recreate_contents_all(false, false, true);
			}
		}
		else {
			_vpos = (this._vscrollmng) ? this._vscrollmng._pos : 0;
			_vpos -= this._is_over_scroll;

			if (_vpos < 0) {
				_vpos = 0;
			}

			this._toprowpos = this._getScreenTopRowPos(_vpos);
			this._bottomrowpos = this._getScreenBottomRowPos(_vpos);

			if (this._needUpdateExtinner()) {
				this._recreate_contents_all(false, false, true);
			}
			else {
				if (kind == "filterrow" || kind == "deletemultirows" || kind == "filter") {
					band._matrix._init();
				}

				band._matrix._adjustRowsDisplay();
				band._matrix._adjustColsDisplay();
			}

			lastPosition = this._last_scroll_top;

			if (lastPosition != _vpos) {
				band._update_rows = band._matrix._adjustScrollRows(_vpos);
			}

			band._on_refresh_rows();

			if (this._is_over_scroll > 0) {
				this._vscrollmng.setPos(this._vscrollmng.pos - 1);
			}
		}

		var afterrowcnt = this._getDisplayRowCount();

		if (this.fillareatype != "none" || kind == "load") {
			this._refreshBody();
		}

		this._updateNodata(beforerowcnt, afterrowcnt);

		if (this._isUseBindExprStyle("head") || this._getUseBindExprProp("head")) {
			this._refreshHead(true);
		}
		if (this._isUseBindExprStyle("summ") || this._getUseBindExprProp("summ")) {
			this._refreshSumm(true);
		}
	};

	_pGrid.set_enableredraw = function (v) {
		if (v != null && this.enableredraw != v) {
			v = nexacro._toBoolean(v);
			this.enableredraw = v;

			if (v) {
				if (this._curFormat) {
					this._curFormat._updateFormatStr();
				}

				this.on_apply_enableredraw();
			}
		}
		return v;
	};

	_pGrid.on_apply_enableredraw = function () {
		nexacro.Component.prototype.on_apply_enableredraw.call(this);

		if (this._enable_redraw_history.recreate) {
			this.redraw();
			this._enable_redraw_history = {
			};
			return;
		}

		var ds = this._binddataset;
		if (ds && ds.oncolumnchanged && ds.oncolumnchanged._firestat) {
			this._recreate_contents_all(true, false);
			this._enable_redraw_history = {
			};
			return;
		}

		if (this._enable_redraw_history.recreate_body) {
			this._resetRowSizeList();
			this._resetColSizeList();

			if (this._bodyBand) {
				this._bodyBand._recreate_contents();
			}
		}
		else if (this._enable_redraw_history.refresh_body && !this._enable_redraw_history.refreshall) {
			this._refreshBody(true);
		}

		if (this._enable_redraw_history.recreate_head) {
			this._resetRowSizeList();
			this._resetColSizeList();

			if (this._headBand) {
				this._headBand._recreate_contents();
			}
		}
		else if (this._enable_redraw_history.refresh_head && !this._enable_redraw_history.refreshall) {
			this._refreshHead(true);
		}

		if (this._enable_redraw_history.recreate_summ) {
			this._resetRowSizeList();
			this._resetColSizeList();

			if (this._summBand) {
				this._summBand._recreate_contents();
			}
		}
		else if (this._enable_redraw_history.refresh_summ && !this._enable_redraw_history.refreshall) {
			this._refreshSumm(true);
		}

		if (this._enable_redraw_history.refreshall) {
			this._refreshAll(true);
		}

		if (this._enable_redraw_history.resize_band) {
			this._resizeBand();
		}

		var props;
		var props_len;
		var i;

		if (this._enable_redraw_history.updatecolsize) {
			props = this._enable_redraw_history.updatecolsize;
			props_len = props.length;
			var min = props[0];

			for (i = 1; i < props_len; i++) {
				min = Math.min(props[i], min);
			}
			this._updateColSize(min);
		}

		if (this._enable_redraw_history.updaterowsize) {
			props = this._enable_redraw_history.updaterowsize;
			props_len = props.length;

			for (i = 0; i < props_len; i++) {
				this._updateRowSize(props[i][0], props[i][1], (i < props_len - 1));
			}
		}

		if (this._enable_redraw_history.autofit) {
			var prop = this._enable_redraw_history.autofit;
			this._applyAutofittype(prop[0], prop[1]);
		}

		this._enable_redraw_history = {
		};
	};

	_pGrid._isSelectedCell = function (cell, datarow) {
		var selects = this._selectinfo.getSelectCells(datarow);

		if (!this._isSelectRowType()) {
			if (selects && selects[cell]) {
				return true;
			}
		}
		else {
			if (selects) {
				return true;
			}
		}
		return false;
	};

	_pGrid.isSelectedCell = function (nCell, strBand, nRowIdx, nPivotIdx) {
		if (arguments.length == 0) {
			return false;
		}
		else if (arguments.length == 1) {
			strBand = "body";
			nRowIdx = 0;
		}
		else if (arguments.length == 2) {
			if (strBand) {
				strBand = strBand.toLowerCase();
			}

			if (strBand == "body") {
				nRowIdx = 0;
			}
			else if ((strBand == "summ" || strBand == "summary")) {
				nRowIdx = -2;
			}
			else {
				nRowIdx = -1;
			}
		}
		else if (arguments.length == 3) {
			if (strBand) {
				strBand = strBand.toLowerCase();
			}
			if ((strBand == "summ" || strBand == "summary")) {
				nRowIdx = -2;
			}
			else if (strBand == "head") {
				nRowIdx = -1;
			}
		}

		return this._isSelectedCell(nCell, nRowIdx);
	};

	_pGrid.getSelectedRows = function () {
		var selects = [].concat(this._selectinfo.rows);
		var retn = [];

		for (var i = 0, n = selects.length; i < n; i++) {
			retn[i] = this._getTreeRowPosition(selects[i]);
		}

		return retn;
	};

	_pGrid.getSelectedDatasetRows = function () {
		var retn = [].concat(this._selectinfo.rows);

		for (var i = 0; i < retn.length; i++) {
			if (retn[i] < 0) {
				retn.splice(i, 1);
				i--;
			}
		}

		if (retn.length == 0) {
			retn = -9;
		}

		return retn;
	};

	_pGrid.clearSelect = function () {
		this._selectinfo.area = [];
		this._resetSelect(-1, -1, -1, -1, -9);
		return true;
	};

	_pGrid.selectRow = function (nRow, bSelect) {
		if (!this._isSelectRowType()) {
			return false;
		}

		if (bSelect == undefined) {
			bSelect = true;
		}

		nRow = this._getDataRow(nRow);
		return this._selectRow(nRow, bSelect);
	};

	_pGrid.selectCell = function (nRow, nCellidx, bSelect) {
		if (this.selecttype != "multicell" && this.selecttype != "cell") {
			return false;
		}

		if (bSelect == undefined) {
			bSelect = true;
		}

		return this._selectRow(nRow, bSelect, false, nCellidx);
	};

	_pGrid.selectArea = function (nStartRowIdx, nStartCellIdx, nEndRowIdx, nEndCellIdx) {
		if (!this._isAreaSelect()) {
			return false;
		}

		var i, j, n, m;
		var ret, tmp, trigger;
		var strBand, objCell, nCellIdx, nColIdx, nSubRowIdx;

		var beforeCellIdx = this._selectinfo.curcell;
		var beforeColIdx = this._selectinfo.curcol;
		var beforeRowIdx = this._selectinfo.curdsrow;
		var beforeSubRowIdx = this._selectinfo.cursubrow;
		var beforePvtIdx = this._selectinfo.curpvt;

		var format = this._curFormat;

		var getCell = function (cells, idx) {
			for (j = 0, m = cells.length; j < m; j++) {
				if (cells[j]._cellidx == idx) {
					ret = cells[j];
					break;
				}
			}
			return ret;
		};

		if (nStartRowIdx > nEndRowIdx) {
			tmp = nStartRowIdx;
			nStartRowIdx = nEndRowIdx;
			nEndRowIdx = tmp;
		}

		if (nStartCellIdx > nEndCellIdx) {
			tmp = nStartCellIdx;
			nStartCellIdx = nEndCellIdx;
			nEndCellIdx = tmp;
		}

		var arrRowIdx = [nStartRowIdx, nEndRowIdx];
		var arrCellIdx = [nStartCellIdx, nEndCellIdx];
		for (i = 0, n = arrRowIdx.length; i < n; i++) {
			switch (arrRowIdx[i]) {
				case -1:
					strBand = "head";
					objCell = getCell(format._headcells, arrCellIdx[i]);
					break;
				case -2:
					strBand = "summ";
					objCell = getCell(format._summcells, arrCellIdx[i]);
					break;
				default:
					strBand = "body";
					objCell = getCell(format._bodycells, arrCellIdx[i]);
					break;
			}

			if (objCell) {
				nCellIdx = objCell._cellidx;
				nColIdx = objCell._col;
				nSubRowIdx = objCell._row;

				this._setSelectedInfo(nCellIdx, nColIdx, arrRowIdx[i], nSubRowIdx, null);

				if (i == 0) {
					trigger = "func_area1";
					if (this._isMultiSelect()) {
						this._multiselect = "ctrl";
					}
					else {
						this._clrMultiSelect();
						this._multiselect = "none";
					}
				}
				else if (i == 1) {
					trigger = "func_area2";
					this._multiselect = "shift";
				}

				ret = this._ChangeSelect(nCellIdx, nColIdx, arrRowIdx[i], nSubRowIdx, this._selectinfo.curpvt, false, beforeCellIdx, beforeColIdx, beforeRowIdx, beforeSubRowIdx, beforePvtIdx, strBand, trigger);
			}
		}

		return ret;
	};

	_pGrid._selectRow = function (row, bSelect, noDraw, cell, bDataset) {
		var beforeCell = this._selectinfo.curcell;
		var beforeCol = this._selectinfo.curcol;
		var beforeRow = this._selectinfo.curdsrow;
		var beforeSubrow = this._selectinfo.cursubrow;
		var beforePvt = this._selectinfo.curpvt;
		var band = "body";

		if (row == -1) {
			band = "head";
		}
		else if (row == -2) {
			band = "summ";
		}

		this._setSelectedInfo(null, null, row, 0, null);

		if (band != "body" && cell == undefined) {
			cell = 0;
		}

		if (cell != undefined) {
			var cells;
			if (band == "head") {
				cells = this._curFormat._headcells;
			}
			else if (band == "summ") {
				cells = this._curFormat._summcells;
			}
			else {
				cells = this._curFormat._bodycells;
			}

			if (!cells || !cells.length) {
				return false;
			}

			var col = cells[cell]._col;
			var subrow = cells[cell]._row;

			this._setSelectedInfo(cell, col, null, subrow, null);
		}

		var retn = false;

		if (!bDataset) {
			bDataset = false;
		}

		var afterCell = (cell != undefined) ? cell : ((this._selectinfo.curcell < 0) ? 0 : this._selectinfo.curcell);
		var afterCol = (this._selectinfo.curcol < 0) ? 0 : this._selectinfo.curcol;
		var afterRow = row;
		var afterSubrow = (this._selectinfo.cursubrow < 0) ? 0 : this._selectinfo.cursubrow;
		var afterPvt = this._selectinfo.curpvt;
		var curselect = this.isSelectedCell((cell == undefined ? 0 : cell), band, row);

		if (bSelect != curselect) {
			if (this._isMultiSelect()) {
				this._multiselect = "ctrl";
				retn = this._ChangeSelect(afterCell, afterCol, afterRow, afterSubrow, afterPvt, bDataset, beforeCell, beforeCol, beforeRow, beforeSubrow, beforePvt, band, "func_selectrow");
			}
			else {
				this._clrMultiSelect();
				retn = true;

				if (bSelect) {
					retn = this._ChangeSelect(afterCell, afterCol, afterRow, afterSubrow, afterPvt, false, beforeCell, beforeCol, beforeRow, beforeSubrow, beforePvt, band, "func_selectrow");
				}
			}
			this._moveCellAfterFocus();
		}
		else {
			this._setSelectedInfo(null, null, beforeRow, 0, null);

			if (cell != undefined) {
				this._setSelectedInfo(beforeCell, null, null, null, null);
			}
		}

		if (!noDraw) {
			this._refreshBody();

			if (band == "head") {
				this._refreshHead();
			}
			else if (band == "summ") {
				this._refreshSumm();
			}
		}

		return retn;
	};

	_pGrid._on_killfocus = function (new_focus, new_ref_focus) {
		if (!this._is_alive) {
			return;
		}

		if (this._binddataset && this._binddataset.cancolumnchange && this._binddataset.cancolumnchange._firestat) {
			this._hideEditor(true, true);
		}
		else {
			this._hideEditor(false, true);
		}

		this._focusSelectorPoint(false);

		if (nexacro._enableaccessibility) {
			this._accept_arrow = false;
			this._acceptstab = false;
		}
		this._is_async_recreate = false;
	};

	_pGrid._focusSelectorPoint = function (v) {
		if (this._isAreaSelect()) {
			if (this._select_ctrl) {
				this._select_ctrl._trackbar[0].set_visible(v);
				this._select_ctrl._trackbar[1].set_visible(v);
				this._select_ctrl._trackbar[2].set_visible(v);
				this._select_ctrl._trackbar[3].set_visible(v);
			}
		}
	};

	_pGrid._on_focus = function (self_flag, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus) {
		this._acceptstab = true;

		if (this._showEditorFocus) {
			return;
		}

		var retn = false;



		if (!self_flag) {
			this._focusSelectorPoint(true);
		}

		if (evt_name == "tabkey" || evt_name == "shifttabkey") {
			retn = nexacro.Component.prototype._on_focus.call(this, self_flag, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus);

			if (this._bodyBand && (self_flag == false || nexacro._enableaccessibility)) {
				var rows = this._bodyBand._get_rows();

				if (rows.length > 0) {
					if (rows[0]._cells && rows[0]._cells.length > 0) {
						var editcell = null;
						this._showEditorFocus = true;

						if (evt_name == "shifttabkey") {
							editcell = this._getLastEditableCell();
							if (editcell.row !== null) {
								if (this._vscrollmng) {
									this._vscrollmng.setPos(this._vscrollmng.max);
								}

								retn = this._moveToPosCell(editcell.row, editcell.cell);
							}
						}
						else {
							editcell = this._getFirstEditableCell();

							if (editcell.row !== null) {
								if (this._vscrollmng) {
									this._vscrollmng.setPos(0);
								}

								retn = this._moveToPosCell(editcell.row, editcell.cell);
							}
						}
						if (nexacro._enableaccessibility && editcell.row !== null) {
							this._currentBand = "body";
							var cellobj = this._getAccessibilityCurrentCell();
							if (cellobj) {
								if (evt_name == "tabkey") {
									this._is_first_focus = true;
									this._is_first_bodycell = true;
								}
								this._moveToPosAccessibilityCell(this.currentrow, this.currentcell);
							}
						}
						this._showEditorFocus = false;
					}
				}
			}
		}
		else {
			retn = nexacro.Component.prototype._on_focus.call(this, self_flag, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus);

			if (nexacro._enableaccessibility) {
				this._accept_arrow = true;
				this._acceptstab = true;
				retn = false;
				if ((nexacro._accessibilitytype == 4 || nexacro._accessibilitytype == 5) && evt_name === undefined) {
					this._moveToPosAccessibilityCell(this.currentrow, this.currentcell);
				}
			}
			else {
				if (self_flag == false) {
					if (evt_name == "lbuttondown" && refer_new_focus && refer_new_focus._type_name == "GridCellControl") {
					}
					else if (this.autoenter == "select") {
						if (nexacro._Browser == "IE" || nexacro._Browser == "Opera" || (nexacro._Browser == "Edge" && nexacro._BrowserType == "Edge")) {
							this._onceTime_focus = true;
						}

						var cellobj = this._findCellObj(refer_new_focus);
						if (cellobj && cellobj._type_name != "GridCellControl") {
							cellobj = null;
						}

						this._showEditorFocus = true;
						this._showEditor(cellobj);
						this._showEditorFocus = false;
						this._onceTime_focus = false;
					}
				}
			}
		}
		if (nexacro._enableaccessibility) {
			this._is_first_focus = false;
		}
		return retn;
	};

	_pGrid.on_fire_oninput = function () {
		var cell = this._selectinfo.curcell;
		var col = this._selectinfo.curcol;
		var pivotindex = this._selectinfo.curpvt;
		var row = this._selectinfo.curdsrow;
		var subrow = this._selectinfo.cursubrow;

		if (this.oninput && this.oninput._has_handlers) {
			var evt = new nexacro.GridInputEventInfo(this, cell, col, row, subrow, pivotindex, "oninput");
			return this.oninput._fireEvent(this, evt);
		}
		return true;
	};

	_pGrid.on_fire_cantreestatuschange = function (row, realrow, reason) {
		var cell = this._selectinfo.curcell;

		if (this.cantreestatuschange && this.cantreestatuschange._has_handlers) {
			var evt = new nexacro.GridTreeStatusEventInfo(this, "cantreestatuschange", cell, realrow, row, reason);
			return this.cantreestatuschange._fireEvent(this, evt);
		}
		return true;
	};

	_pGrid.on_fire_ontreestatuschanged = function (row, realrow, reason) {
		var cell = this._selectinfo.curcell;

		if (this.ontreestatuschanged && this.ontreestatuschanged._has_handlers) {
			var evt = new nexacro.GridTreeStatusEventInfo(this, "ontreestatuschanged", cell, realrow, row, reason);
			return this.ontreestatuschanged._fireEvent(this, evt);
		}
		return true;
	};

	_pGrid.on_fire_oncloseup = function (obj, pretext, posttext, prevalue, postvalue, cell, col, pivotindex, row, subrow) {
		if (this.oncloseup && this.oncloseup._has_handlers) {
			var value = this._evtvalue(obj, postvalue);
			var evt = new nexacro.GridEditEventInfo(this, "oncloseup", cell, col, pivotindex, row, subrow, value);
			this._is_up_act = true;
			var ret = this.oncloseup._fireEvent(this, evt);
			this._is_up_act = false;
			return ret;
		}
		return true;
	};

	_pGrid.on_fire_ondropdown = function (obj) {
		if (this.ondropdown && this.ondropdown._has_handlers) {
			var cell = this._selectinfo.curcell;
			var col = this._selectinfo.curcol;
			var pivotindex = this._selectinfo.curpvt;
			var row = this._selectinfo.curdsrow;
			var subrow = this._selectinfo.cursubrow;
			var value = this._evtvalue(obj);

			var evt = new nexacro.GridEditEventInfo(this, "ondropdown", cell, col, pivotindex, row, subrow, value);
			return this.ondropdown._fireCheckEvent(this, evt);
		}
		return true;
	};

	_pGrid.on_fire_onenterdown = function (keyCode, altKey, ctrlKey, shiftKey, obj, refer_comp, postvalue, metaKey) {
		if (this.readonly) {
			return;
		}

		if (this.onenterdown && this.onenterdown._has_handlers) {
			var cell = this._selectinfo.curcell;
			var col = this._selectinfo.curcol;
			var pivotindex = this._selectinfo.curpvt;
			var row = this._selectinfo.curdsrow;
			var subrow = this._selectinfo.cursubrow;
			var value = this._evtvalue(refer_comp, postvalue, true);

			var evt = new nexacro.GridEditEventInfo(this, "onenterdown", cell, col, pivotindex, row, subrow, value);
			return this.onenterdown._fireEvent(this, evt);
		}
		return true;
	};

	_pGrid.on_fire_onexpanddown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		if (this.readonly) {
			return;
		}

		var cellobj = from_comp;
		cellobj = this._findCellObj(cellobj);

		var subcellobj;
		if (cellobj) {
			if (cellobj.parentcell) {
				subcellobj = cellobj;
				cellobj = cellobj.parentcell;
			}
		}

		var posobj = this._recalcXY(cellobj, canvasX, canvasY, false, from_refer_comp);
		canvasX = posobj.canvasX;
		canvasY = posobj.canvasY;
		clientX = posobj.clientX;
		clientY = posobj.clientY;
		if (this.onexpanddown && this.onexpanddown._has_handlers) {
			var evtinfo = this._makeEventInfo(cellobj, subcellobj, from_refer_comp);

			var obj = this._getRootComponent(from_refer_comp);
			var cell = evtinfo.cell;
			var col = evtinfo.col;
			var mergecell = evtinfo.mergecell;
			var mergecol = evtinfo.mergecol;
			var mergerow = evtinfo.mergerow;
			var pivotindex = evtinfo.pivotindex;
			var row = evtinfo.row;
			var subrow = evtinfo.subrow;

			var evt = new nexacro.GridMouseEventInfo(obj, "onexpanddown", cell, col, mergecell, mergecol, mergerow, pivotindex, row, subrow, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);
			return this.onexpanddown._fireEvent(this, evt);
		}
		return false;
	};

	_pGrid.on_fire_onexpandup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		if (this.readonly) {
			return;
		}

		var cellobj = from_comp;
		cellobj = this._findCellObj(cellobj);

		var subcellobj;
		if (cellobj) {
			if (cellobj.parentcell) {
				subcellobj = cellobj;
				cellobj = cellobj.parentcell;
			}
		}

		var posobj = this._recalcXY(cellobj, canvasX, canvasY, false, from_refer_comp);
		canvasX = posobj.canvasX;
		canvasY = posobj.canvasY;
		clientX = posobj.clientX;
		clientY = posobj.clientY;

		if (this.onexpandup && this.onexpandup._has_handlers) {
			var evtinfo = this._makeEventInfo(cellobj, subcellobj, from_refer_comp);

			var obj = this._getRootComponent(from_comp);
			var cell = evtinfo.cell;
			var col = evtinfo.col;
			var mergecell = evtinfo.mergecell;
			var mergecol = evtinfo.mergecol;
			var mergerow = evtinfo.mergerow;
			var pivotindex = evtinfo.pivotindex;
			var row = evtinfo.row;
			var subrow = evtinfo.subrow;
			var evt = new nexacro.GridMouseEventInfo(obj, "onexpandup", cell, col, mergecell, mergecol, mergerow, pivotindex, row, subrow, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);

			this._is_up_act = true;
			var retn = this.onexpandup._fireEvent(this, evt);
			this._is_up_act = false;

			return retn;
		}
		return false;
	};

	_pGrid.on_fire_oncolresized = function (args) {
		if (this.oncolresized && this.oncolresized._has_handlers) {
			var formatindex = args[0];
			var index = args[1];
			var newvalue = args[2];
			var oldvalue = args[3];
			var subindex = args[4];
			var evt = new nexacro.GridSizeChangedEventInfo(this, "oncolresized", formatindex, index, newvalue, oldvalue, 1, subindex);
			return this.oncolresized._fireEvent(this, evt);
		}
		return false;
	};

	_pGrid.on_fire_onrowresized = function (args) {
		if (this.onrowresized && this.onrowresized._has_handlers) {
			var formatindex = args[0];
			var index = args[1];
			var newvalue = args[2];
			var oldvalue = args[3];
			var subindex = args[4];
			var evt = new nexacro.GridSizeChangedEventInfo(this, "onrowresized", formatindex, index, newvalue, oldvalue, 2, subindex);
			return this.onrowresized._fireEvent(this, evt);
		}
		return false;
	};

	_pGrid.on_fire_onimeaction = function (obj, key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp) {
		if (!this._is_alive) {
			return;
		}

		if (!this.enable) {
			return true;
		}

		if (this.oncellimeaction && this.oncellimeaction._has_handlers) {
			var cell = this._selectinfo.curcell;
			var col = this._selectinfo.curcol;
			var pivotindex = this._selectinfo.curpvt;
			var row = this._selectinfo.curdsrow;
			var subrow = this._selectinfo.cursubrow;

			var evt = new nexacro.GridKeyEventInfo(this, "oncellimeaction", cell, col, pivotindex, row, subrow, alt_key, ctrl_key, shift_key, key_code);
			return this.oncellimeaction._fireEvent(this, evt);
		}
		return false;
	};

	_pGrid._is_recreating = false;
	_pGrid._recreate = function () {
		if (!this.enableredraw) {
			this._enable_redraw_history.recreate = true;
			return true;
		}

		if (!this.getElement()) {
			return false;
		}

		var kind_act = {
			"act" : ""
		};
		var down_act = this._isDownActionKeyMouse(kind_act) || this._is_down_act;
		if (down_act && !this._userRowposChange && !this._is_after_recreate) {
			this._after_recreate = true;

			this._startAfterRecreateTimer(kind_act.act);
			return;
		}

		this._is_recreating = true;
		var vpos = (this._vscrollmng) ? this._vscrollmng._pos : 0;
		var hpos = (this._hscrollmng) ? this._hscrollmng._pos : 0;

		this._destroyBands();
		this._createBandsAndAreas();
		this._autosizeMergeCell();
		this._refreshBody();
		this._onResetScrollBar();
		this._recreate_contents_proc = [];

		if (this._vscrollmng) {
			this._vscrollmng.setPixelPos(0);
			this._vscrollmng.setPixelPos(vpos);
		}

		if (this._hscrollmng) {
			this._hscrollmng.setPos(0);
			this._hscrollmng.setPos(hpos);
		}

		this._destroyHighlightRow();
		this._createHighlightRow();

		this._is_recreating = false;

		if (this.autoenter == "select") {
			this._showEditor();
		}

		return true;
	};

	_pGrid.set_createcellasync = function (v) {
		if (v != null) {
			v = nexacro._toBoolean(v);
			this.createcellasync = v;

			if (nexacro._Browser == "IE" && nexacro._BrowserVersion <= 8) {
				this._async_create = v;
			}
			else {
				this._async_create = false;
			}
		}
	};

	_pGrid.set_cellcombobuttonsize = function (v) {
		if (v != this.cellcombobuttonsize) {
			this.cellcombobuttonsize = v;
			this.on_apply_cellcombobuttonsize();
		}
	};

	_pGrid.on_apply_cellcombobuttonsize = function () {
		this._refreshAll();
	};

	_pGrid.set_cellcalendarbuttonsize = function (v) {
		if (v != this.cellcalendarbuttonsize) {
			this.cellcalendarbuttonsize = v;
			this.on_apply_cellcalendarbuttonsize();
		}
	};

	_pGrid.on_apply_cellcalendarbuttonsize = function () {
		this._refreshAll();
	};

	_pGrid.set_cellcomboscrollbarsize = function (v) {
		if (v != this.cellcomboscrollbarsize) {
			this.cellcomboscrollbarsize = v;
			this.on_apply_cellcomboscrollbarsize();
		}
	};

	_pGrid.on_apply_cellcomboscrollbarsize = function () {
		this._refreshAll();
	};

	_pGrid.set_celltextareascrollbarsize = function (v) {
		if (v != this.celltextareascrollbarsize) {
			this.celltextareascrollbarsize = v;
			this.on_apply_celltextareascrollbarsize();
		}
	};

	_pGrid.on_apply_celltextareascrollbarsize = function () {
		this._refreshAll();
	};

	_pGrid.set_cellcalendarpopuptype = function (v) {
		if (v != this.cellcalendarpopuptype) {
			this.cellcalendarpopuptype = v;
			this.on_apply_cellcalendarpopuptype();
		}
	};

	_pGrid.on_apply_cellcalendarpopuptype = function () {
		this._refreshAll();
	};

	_pGrid.set_cellcombopopuptype = function (v) {
		if (v != this.cellcombopopuptype) {
			this.cellcombopopuptype = v;
			this.on_apply_cellcombopopuptype();
		}
	};

	_pGrid.on_apply_cellcombopopuptype = function () {
		this._refreshAll();
	};

	_pGrid.set_cellcalendarpopupsize = function (v) {
		if (v != this.cellcalendarpopupsize) {
			this.cellcalendarpopupsize = v;
			this.on_apply_cellcalendarpopupsize();
		}
	};

	_pGrid.on_apply_cellcalendarpopupsize = function () {
		this._refreshAll();
	};

	_pGrid.set_cellcombopopupsize = function (v) {
		if (v != this.cellcombopopupsize) {
			this.cellcombopopupsize = v;
			this.on_apply_cellcombopopupsize();
		}
	};

	_pGrid.on_apply_cellcombopopupsize = function () {
		this._refreshAll();
	};

	_pGrid.set_cellcheckboxsize = function (v) {
		if (v != this.cellcheckboxsize) {
			this.cellcheckboxsize = v;
			this.on_apply_cellcheckboxsize();
		}
	};

	_pGrid.on_apply_cellcheckboxsize = function () {
		this._refreshAll();
	};

	_pGrid.set_cellexprupdatecondition = function (v) {
		switch (v) {
			case "all":
			case "celltext":
			case "none":
				if (v != this.cellexprupdatecondition) {
					this.cellexprupdatecondition = v;
					this.on_apply_cellexprupdatecondition();
				}
				break;
		}
	};

	_pGrid.on_apply_cellexprupdatecondition = function () {
		this._clearBindTypeFlag();
		this._refreshAll();
	};

	_pGrid._recreate_contents_all_async = function (reset_size, init_scroll, only_body, no_hide_edit, chk_srow) {
		nexacro._OnceCallbackTimer.callonce(this, function () {
			return this._recreate_contents_all(reset_size, init_scroll, only_body, no_hide_edit, chk_srow);
		});
	};

	_pGrid._isDownActionKeyMouse = function (kind) {
		if (this._is_up_act) {
			return false;
		}

		var window = this._getWindow();

		if (window && (window._cur_ldown_elem || window._keydown_element)) {
			var elem = window._cur_ldown_elem || window._keydown_element, comp = window.findComponent(elem, 0, 0)[0], isgrid = false;

			if (kind) {
				window._cur_ldown_elem ? kind["act"] = "L" : window._keydown_element ? kind["act"] = "K" : "";
			}

			while (comp) {
				if (comp instanceof nexacro.ScrollBarControl) {
					break;
				}

				if (comp instanceof nexacro.Grid && comp == this && comp.id == this.id) {
					isgrid = true;
					break;
				}
				comp = comp.parent;
			}
			return isgrid;
		}
		return false;
	};

	_pGrid._startAfterRecreateTimer = function (kind) {
		var pthis = this;

		if (this._afterrecreatetask) {
			this._afterrecreatetask.destroy();
			this._afterrecreatetask = null;
		}

		this._afterrecreatetask = new nexacro._CallbackTimer(this, function (id) {
			return pthis._callbackAfterRecreateTimer(kind);
		}, 100);
		this._afterrecreatetask.start();
	};

	_pGrid._callbackAfterRecreateTimer = function (kind) {
		if (kind == "K") {
			this._on_last_keyup();
		}

		if (this._afterrecreatetask) {
			this._afterrecreatetask.destroy();
			this._afterrecreatetask = null;
		}
	};

	_pGrid._recreate_contents_all = function (reset_size, init_scroll, only_body, no_hide_edit, chk_srow) {
		if (!this.enableredraw) {
			this._enable_redraw_history.recreate = true;
			return;
		}

		var kind_act = {
			"act" : ""
		};
		var down_act = this._isDownActionKeyMouse(kind_act) || this._is_down_act;
		if (down_act && !this._userRowposChange && !this._is_after_recreate) {
			var args = [reset_size, init_scroll, only_body, no_hide_edit];
			if (this._after_recreate_contents_all) {
				args[0] = args[0] || this._after_recreate_contents_all[0];
				args[1] = args[1] || this._after_recreate_contents_all[1];
				args[2] = args[2] || this._after_recreate_contents_all[2];
				args[3] = args[3] && this._after_recreate_contents_all[3];
				args[2] = args[4] || this._after_recreate_contents_all[4];
			}
			this._after_recreate_contents_all = args;

			this._startAfterRecreateTimer(kind_act.act);
			return;
		}

		var beforerowcnt = this._getDisplayRowCount();

		if (reset_size) {
			this._resetRowSizeList(chk_srow);
			this._resetColSizeList(chk_srow);
			this._is_contents_recreating = true;
			this._resizeBand();
			this._is_contents_recreating = false;

			if (this._bodyBand) {
				this._bodyBand._recreate_contents(init_scroll, false, no_hide_edit);
				this._bodyBand._matrix._adjustColsDisplay(true);
			}

			if (!only_body) {
				if (this._headBand) {
					this._headBand._recreate_contents();
					this._headBand._matrix._adjustColsDisplay(true);
				}

				if (this._summBand) {
					this._summBand._recreate_contents();
					this._summBand._matrix._adjustColsDisplay(true);
				}
			}
			else {
				if (this._isUseBindExprStyle("head") || this._getUseBindExprProp("head")) {
					this._refreshHead(true);
				}
				if (this._isUseBindExprStyle("summ") || this._getUseBindExprProp("summ")) {
					this._refreshSumm(true);
				}
			}
			this._autosizeMergeCell();
		}
		else {
			if (this._bodyBand) {
				this._bodyBand._recreate_contents(init_scroll, false, no_hide_edit);
			}

			if (!only_body) {
				if (this._headBand) {
					this._headBand._recreate_contents();
				}

				if (this._summBand) {
					this._summBand._recreate_contents();
				}
			}
			else {
				if (this._isUseBindExprStyle("head") || this._getUseBindExprProp("head")) {
					this._refreshHead(true);
				}
				if (this._isUseBindExprStyle("summ") || this._getUseBindExprProp("summ")) {
					this._refreshSumm(true);
				}
			}
		}

		var afterrowcnt = this._getDisplayRowCount();

		this._updateNodata(beforerowcnt, afterrowcnt);

		this._updateSelector();
		this._adjustOverlayControls(true);
	};

	_pGrid._updateNodata = function (beforerowcnt, afterrowcnt) {
		if ((beforerowcnt == 0 && afterrowcnt > 0) || (beforerowcnt > 0 && afterrowcnt == 0)) {
			var band = this._bodyBand;

			if (band) {
				band._updateAll(true);
			}
			else {
			}
		}
	};

	_pGrid._getBodyRowsSize = function (s_datarow, e_datarow, s_subrow, e_subrow) {
		if (this._rowSizeList.length) {
			if (s_datarow >= 0 && e_datarow >= 0) {
				var rows = this._curFormat._bodyrows;
				var rows_len = rows.length;
				var size = 0;
				var i, j;

				for (i = s_datarow; i <= e_datarow; i++) {
					if (s_subrow && i == s_datarow) {
						for (j = s_subrow; j < rows_len; j++) {
							size += this._rowSizeListSub[(i *  rows_len) + j];
						}
					}
					else if (e_subrow && i == e_datarow) {
						for (j = 0; j <= e_subrow; j++) {
							size += this._rowSizeListSub[(i *  rows_len) + j];
						}
					}
					else {
						size += this._rowSizeList[i];
					}
				}
				return size;
			}
		}
		return 0;
	};

	_pGrid._getRowSize = function (rowidx) {
		var format = this._curFormat;

		if (rowidx == -1) {
			if (this._rowHeadList.length > 0) {
				return this._rowHeadList[0];
			}
			else {
				return format.headHeight;
			}
		}
		else if (rowidx == -2) {
			if (this._rowSummList.length > 0) {
				return this._rowSummList[0];
			}
			else {
				return format.summHeight;
			}
		}
		else {
			var datarow = this._getDataRow(rowidx);

			if (datarow >= 0) {
				if (this._rowSizeList.length > 0) {
					return this._rowSizeList[datarow];
				}
				else {
					return format._body_height;
				}
			}
		}
		return -1;
	};

	_pGrid._getHeadHeight = function () {
		var format = this._curFormat;
		if (format == null || format._headband == null) {
			return 0;
		}

		var height = this._rowHeadList[0];

		if (height == undefined) {
			height = format.headHeight;
		}

		return height;
	};

	_pGrid._getSummHeight = function () {
		var format = this._curFormat;
		if (format == null || format._summband == null) {
			return 0;
		}

		var height = this._rowSummList[0];

		if (height == undefined) {
			height = format.summHeight;
		}

		return height;
	};

	_pGrid._createBandsAndAreas = function (grid_create) {
		if (!this.enableredraw) {
			this._enable_redraw_history.recreate = true;
			return;
		}

		var format = this._curFormat;
		if (format == null) {
			return;
		}

		this._applyAutofittype(false);

		var cells = this._curFormat._bodycells;
		var cellcnt = cells ? cells.length : 0;
		var cellinfo;

		for (var j = 0; j < cellcnt; j++) {
			cellinfo = cells[j];
			if (cellinfo.suppress != 0) {
				this._is_use_suppress = true;
			}

			if (cellinfo.wordwrap != "none") {
				this._is_body_wordwrap = true;
			}

			if (this._is_use_suppress && this._is_body_wordwrap) {
				break;
			}
		}

		cells = this._curFormat._headcells;
		cellcnt = cells ? cells.length : 0;

		for (j = 0; j < cellcnt; j++) {
			cellinfo = cells[j];
			if (cellinfo.wordwrap != "none") {
				this._is_head_wordwrap = true;
				break;
			}
		}

		cells = this._curFormat._summcells;
		cellcnt = cells ? cells.length : 0;

		for (j = 0; j < cellcnt; j++) {
			cellinfo = cells[j];
			if (cellinfo.wordwrap != "none") {
				this._is_summ_wordwrap = true;
				break;
			}
		}

		var rect = this._getAvailableRect(this);
		var clientwidth = rect.width;
		var clientheight = rect.height;
		var control_elem = this.getElement();
		var top, bottom;
		var headHeight = format.headHeight;
		var summHeight = format.summHeight;

		if (this.summarytype == "top" || this.summarytype == "lefttop") {
			top = headHeight + summHeight;
			bottom = clientheight;
		}
		else {
			top = headHeight;
			bottom = clientheight - summHeight;
		}
		if (bottom < top) {
			bottom = top;
		}

		var bodyband, summband, headband;

		if (format._bodyband) {
			this._bodyBand = bodyband = new nexacro._GridBandControl("body", 0, top, clientwidth, bottom - top, null, null, this, format._bodyband);
			this.body = format._bodyband;
		}

		if (summHeight > 0) {
			rect = this._getAvailableRect(this);
			clientwidth = rect.width;
			clientheight = rect.height;

			if (this.summarytype == "top" || this.summarytype == "lefttop") {
				top = headHeight;
				bottom = headHeight + summHeight;
			}
			else {
				bottom = clientheight;
				top = bottom - summHeight;
			}
			this._summBand = summband = new nexacro._GridBandControl("summary", 0, top, clientwidth, bottom - top, null, null, this, format._summband);
			this.summ = this.summary = format._summband;
		}
		else {
			this._summBand = null;
		}

		if (headHeight > 0) {
			rect = this._getAvailableRect(this);
			clientwidth = rect.width;
			top = 0;
			bottom = headHeight;
			this._headBand = headband = new nexacro._GridBandControl("head", 0, top, clientwidth, bottom - top, null, null, this, format._headband);
			this._headBand._is_scrollable = false;
			this.head = format._headband;
		}
		else {
			this._headBand = null;
		}

		this._resetRowSizeList();
		this._resetColSizeList();

		this._is_createbandarea = true;
		if (headband) {
			this._headBand.createComponent();
		}

		if (bodyband) {
			this._bodyBand.createComponent();
			control_elem.setVertScrollElements(this._bodyBand._control_element);
			this.on_apply_fastvscrolltype();
			this.on_apply_scrolldisplaymode();
		}

		if (summband) {
			this._summBand.createComponent();
		}

		this._is_createbandarea = false;
		this._grid_creating = grid_create;
		this._resizeBand(false);
		this._grid_creating = false;
	};

	_pGrid._band_scroll_tops = null;
	_pGrid._setScrollMaxSize = function (scroll_width, scroll_height, band_scroll_tops) {
		if (band_scroll_tops) {
			this._band_scroll_tops = band_scroll_tops;
		}

		if (this._control_element) {
			this._control_element._setInnerElementScrollMaxTops(this._band_scroll_tops);

			if (scroll_height == undefined) {
				if (this._bodyBand) {
					scroll_height = this._bodyBand._scrollHeight;
				}
				else {
					scroll_height = 0;
				}
			}
			this._control_element.setElementScrollMaxSize(scroll_width, scroll_height);
			this._onResetScrollBar();
		}
	};

	_pGrid._resizing_band = 0;
	_pGrid._after_resizeband = false;
	_pGrid._resizeBand = function (no_autofit) {
		if (!this._band_resizing_no_autofit) {
			this._band_resizing_no_autofit = [];
		}

		if (this._band_resizing_no_autofit.length > 0) {
			no_autofit = this._band_resizing_no_autofit[0];
		}

		this._band_resizing_no_autofit.push(no_autofit);

		if (!this._grid_creating && !this._is_created) {
			this._after_resizeband = true;
			this._band_resizing_no_autofit.pop();
			return;
		}
		if (this._is_createbandarea) {
			this._band_resizing_no_autofit.pop();
			return;
		}
		this._after_resizeband = false;

		var clientleft = this._getClientLeft();
		var clienttop = this._getClientTop();
		var clientwidth = this._getClientWidth();
		var clientheight = this._getClientHeight();
		var headHeight = this._getHeadHeight();
		var summHeight = this._getSummHeight();
		var l, t, w, h;

		l = clientleft;
		w = clientwidth;

		this._resizing_band++;

		if (this._bodyBand) {
			if (this.summarytype == "top" || this.summarytype == "lefttop") {
				t = headHeight + summHeight;
				h = clientheight - t;
			}
			else {
				t = headHeight;
				h = clientheight - summHeight - t;
			}
			if (h < 0) {
				h = 0;
			}

			this._bodyBand._update_size_contents = true;
			this._bodyBand.move(l, t, w, h);
			this._bodyBand._update_size_contents = false;
		}

		clientwidth = this._getClientWidth();
		clientheight = this._getClientHeight();

		if (this._summBand) {
			if (this.summarytype == "top" || this.summarytype == "lefttop") {
				t = headHeight;
				h = headHeight + summHeight - t;
			}
			else {
				w = clientwidth;
				t = clientheight - summHeight;
				h = clientheight - t;
			}
			this._summBand._update_size_contents = true;
			this._summBand.move(l, t, w, h);
			this._summBand._update_size_contents = true;
		}

		clientwidth = this._getClientWidth();

		if (this._headBand) {
			w = clientwidth;
			t = clienttop;
			h = headHeight;
			this._headBand._update_size_contents = true;
			this._headBand.move(l, t, w, h);
			this._headBand._update_size_contents = true;
		}

		if (!no_autofit && (this._colautofit || this._rowautofit)) {
			this._applyAutofittype(true);
		}

		this._updateSelector();
		this._updateScrollInfo();
		this._resizing_band--;
		this._resetScrollMax();
		this._band_resizing_no_autofit.pop();
	};

	_pGrid._onResetScrollBar = function () {
		var control_elem = this._control_element;
		if (control_elem) {
			var hscrollbar_size = this._getHScrollBarSize();
			var vscrollbar_size = this._getVScrollBarSize();

			var bcreatevscroll = false;
			var bcreatehscroll = false;

			var hscrollbartype = this._getHScrollBarType();
			var vscrollbartype = this._getVScrollBarType();

			var scrolltype = this.scrolltype;

			var vscroll_enable = false;
			var hscroll_enable = false;

			if (hscrollbartype != "none") {
				bcreatehscroll = true;
			}

			if (vscrollbartype != "none") {
				bcreatevscroll = true;
			}

			if (this._is_form && this.getStepCount() > 0) {
				bcreatehscroll = false;
			}

			var client_left = control_elem.client_left;
			var client_top = control_elem.client_top;
			var client_width = control_elem.client_width;
			var client_height = control_elem.client_height;
			var zoomfactor = control_elem.zoom / 100;

			var v_elements = control_elem._target_vscroll_elements, v_element = v_elements, h_elements = control_elem._target_hscroll_elements, h_element = h_elements;
			if (nexacro._isArray(v_elements)) {
				v_element = v_elements[0];
			}
			if (nexacro._isArray(h_elements)) {
				h_element = h_elements[0];
			}

			var v_client_height = (v_element) ? v_element._calculateClientHeight(0) : client_height;
			var h_client_width = (h_element) ? h_element._calculateClientWidth(client_width) : client_width;
			var scroll_left = (h_element) ? h_element.scroll_left : 0;
			var scroll_top = (v_element) ? v_element._getScrollTop() : 0;

			if (this._isFastVscrolling()) {
				scroll_top = this.vscrollbar._pos;

				if (scroll_top > control_elem.vscroll_limit) {
					scroll_top = control_elem.vscroll_limit;
				}
			}

			var zclient_width = h_client_width / zoomfactor;
			var zclient_height = v_client_height / zoomfactor;

			var paddingleft, paddingtop, paddingright, paddingbottom;
			paddingleft = paddingtop = paddingright = paddingbottom = 0;

			var padding = control_elem.padding ? control_elem.padding : control_elem._padding_info;

			if (control_elem._apply_client_padding && padding) {
				paddingleft = padding.left;
				paddingtop = padding.top;
				paddingright = padding.right;
				paddingbottom = padding.bottom;
			}

			var hscroll_left = client_left - paddingleft;
			var hscroll_top = client_height + paddingtop + paddingbottom;
			var hscroll_width = client_width + paddingleft + paddingright;

			var vscroll_left = client_width + paddingleft + paddingright;
			var vscroll_top = client_top - paddingtop;
			var vscroll_height = client_height + paddingtop + paddingbottom;

			if (bcreatehscroll) {
				this._createHScrollBar(hscrollbar_size);

				if (hscrollbar_size > 0) {
					if (control_elem.hscroll_limit <= 0 && hscrollbartype != "fixed") {
						hscrollbar_size = 0;
					}

					if (hscrollbartype == "autoindicator") {
						hscroll_top -= hscrollbar_size;
						this.hscrollbar.set_visible(false);
					}
					else {
						this.hscrollbar.set_visible(true);
					}
				}


				if (this._isEnable() && hscrollbar_size > 0 && (scrolltype != "none" && scrolltype != "vertical") && control_elem.hscroll_limit > 0) {
					hscroll_enable = true;
				}
			}
			else {
				if (this.hscrollbar) {
					this.hscrollbar.destroy();
					this.hscrollbar = null;
				}
			}

			if (bcreatevscroll) {
				this._createVScrollBar(vscrollbar_size);

				if (vscrollbar_size > 0) {
					if (control_elem.vscroll_limit <= 0 && vscrollbartype != "fixed") {
						vscrollbar_size = 0;
					}

					if (vscrollbartype == "autoindicator") {
						vscroll_left -= vscrollbar_size;
						this.vscrollbar.set_visible(false);
					}
					else {
						this.vscrollbar.set_visible(true);
					}

					if (this._isEnable() && vscrollbar_size > 0 && (scrolltype != "none" && scrolltype != "horizontal") && control_elem.vscroll_limit > 0) {
						vscroll_enable = true;
					}
				}
			}
			else {
				if (this.vscrollbar) {
					this.vscrollbar.destroy();
					this.vscrollbar = null;
				}
			}

			this._hscrollmng._setInfo(hscroll_left, hscroll_top, hscroll_width, hscrollbar_size, 0, control_elem.hscroll_limit, this._scroll_default_value, zclient_width, zclient_width, scroll_left);
			this._vscrollmng._setInfo(vscroll_left, vscroll_top, vscrollbar_size, vscroll_height, 0, control_elem.vscroll_limit, this._scroll_default_value, zclient_height, zclient_height, scroll_top);

			if (this._hscroll_pos > control_elem.vscroll_limit) {
				this._hscroll_pos = control_elem.hscroll_limit;
			}

			if (this._vscroll_pos > control_elem.vscroll_limit) {
				this._vscroll_pos = control_elem.vscroll_limit;
			}

			if (this.hscrollbar) {
				this.hscrollbar._setScrollInfo(hscroll_left, hscroll_top, hscroll_width, hscrollbar_size, 0, control_elem.hscroll_limit, this._scroll_default_value, zclient_width, zclient_width, hscroll_enable, scroll_left);

				if (!this.hscrollbar._is_created) {
					this.hscrollbar.on_created(this._getWindow());
				}
			}

			if (this.vscrollbar) {
				this.vscrollbar._setScrollInfo(vscroll_left, vscroll_top, vscrollbar_size, vscroll_height, 0, control_elem.vscroll_limit, this._scroll_default_value, zclient_height, zclient_height, vscroll_enable, scroll_top);
				if (!this.vscrollbar._is_created) {
					this.vscrollbar.on_created(this._getWindow());
				}
			}
		}
	};

	_pGrid._setHscrollElement = function () {
		if (!this._control_element) {
			return;
		}

		var horz_control_elems = [];


		var rows;
		var i, n;

		if (this._bodyBand) {
			rows = this._bodyBand._get_rows();

			for (i = 0, n = rows.length; i < n; i++) {
				horz_control_elems.push(rows[i]._control_element);
			}
		}
		if (this._headBand) {
			rows = this._headBand._matrix._rows;

			for (i = 0, n = rows.length; i < n; i++) {
				horz_control_elems.push(rows[i]._control_element);
			}
		}
		if (this._summBand) {
			rows = this._summBand._matrix._rows;

			for (i = 0, n = rows.length; i < n; i++) {
				horz_control_elems.push(rows[i]._control_element);
			}
		}

		if (horz_control_elems.length == 0) {
			horz_control_elems = null;
		}

		this._control_element.setHorzScrollElements(horz_control_elems);
	};

	nexacro._bigdata_innertest = 0;

	if (nexacro._bigdata_innertest) {
		_pGrid._div_max_height = 1000;
	}
	else if (nexacro._Browser == "IE" || (nexacro._Browser == "Edge" && nexacro._BrowserType == "Edge")) {
		_pGrid._div_max_height = 1530000;
	}
	else if (nexacro._Browser == "Gecko") {
		_pGrid._div_max_height = 17890000;
	}
	else {
		_pGrid._div_max_height = 5000000;
	}

	_pGrid._resetScrollMax = function (body) {
		if (this._resizing_band > 0) {
			return;
		}

		if (!body) {
			body = this._bodyBand;
		}

		if (!body) {
			return;
		}

		var format = this._curFormat;
		var rowcnt = this._getGridRowCount();
		var scrollwidth = format.bodyWidth;
		var rowSizes = this._rowSizeList;
		var datarow;
		var band_scroll_tops = [];
		var band_sizes_cnt = 1;
		var band_scroll_max = this._div_max_height;
		var scrollheight = 0;

		for (var i = 0; i < rowcnt; i++) {
			datarow = this._getDataRow(i);
			scrollheight += rowSizes[datarow];

			if (scrollheight - this._fixedrow_height >= band_scroll_max *  band_sizes_cnt) {
				band_scroll_tops.push(scrollheight - rowSizes[datarow]);
				band_sizes_cnt++;
			}
		}

		scrollheight -= this._fixedrow_height;
		band_scroll_tops.push(scrollheight);

		body._scrollHeight = scrollheight;
		body._scrollWidth = scrollwidth;

		this._setScrollMaxSize(body._scrollWidth, body._scrollHeight, band_scroll_tops);
	};

	_pGrid._setContents = function (str) {
		var contentsElem = nexacro._parseXMLDocument(str);
		var formatElems = contentsElem.getElementsByTagName("Format");
		var len = formatElems ? formatElems.length : 0;
		var firstformat = "";

		this._format_str = [];
		this._autofitcol_rate = [];

		for (var i = 0; i < len; i++) {
			var formatElem = formatElems[i];
			var idstr = formatElem.getAttribute("id");
			if (idstr == null || idstr == "") {
				idstr = "default";
			}

			if (firstformat == "" || idstr == "default") {
				this._default_formatid = firstformat = idstr;
			}

			var format = new nexacro.GridFormat(idstr, this);
			format._loadFromDOM(formatElem);
			this._formats[idstr] = format;
			this._format_str.push(idstr);
		}
		this.formats = str;

		if (this.formatid == "" || (this._is_created && this.formatid != firstformat)) {
			this.formatid = firstformat;
		}

		this._curFormat = this._formats[this.formatid];
		this._clearTempBand();

		return true;
	};

	_pGrid._destroyBands = function (parent_destroy) {
		if (!this.enableredraw) {
			this._enable_redraw_history.recreate = true;
			return;
		}

		if (!parent_destroy) {
			this._hideEditor(true);
		}

		if (this._bodyBand) {
			if (this._control_element) {
				this._control_element.setVertScrollElements(null);
			}

			this._bodyBand.destroy();
			this._bodyBand = null;
			this.body = null;
		}
		if (this._summBand) {
			this._summBand.destroy();
			this._summBand = null;
			this.summary = null;
			this.summ = null;
		}
		if (this._headBand) {
			this._headBand.destroy();
			this._headBand = null;
			this.head = null;
		}
		if (this._select_ctrl) {
			this._select_ctrl.destroy();
			this._select_ctrl = null;
		}
		if (this.controlbutton) {
			this.controlbutton = null;
		}
		if (this.controlcalendar) {
			this.controlcalendar = null;
		}
		if (this.controlcheckbox) {
			this.controlcheckbox = null;
		}
		if (this.controlcombo) {
			this.controlcombo = null;
		}
		if (this.controledit) {
			this.controledit = null;
		}
		if (this.controlmaskedit) {
			this.controlmaskedit = null;
		}
		if (this.controltextarea) {
			this.controltextarea = null;
		}
		if (this.controlprogressbar) {
			this.controlprogressbar = null;
		}
		if (this.controlexpand) {
			this.controlexpand = null;
		}
		this.on_apply_nodatatext();

		this._destroyOverlayControls();
		this._destroySelectionControls();
	};

	_pGrid._refreshAll = function (clearCurstyle) {
		this._refreshHead(clearCurstyle);
		this._refreshSumm(clearCurstyle);
		this._refreshBody(clearCurstyle);
	};

	_pGrid._getBodyCellInfo = function (nCellIdx) {
		if (this._curFormat && this._curFormat._bodycells) {
			var cellinfo = this._curFormat._bodycells[nCellIdx];
			if (cellinfo) {
				return cellinfo;
			}
		}

		return null;
	};

	_pGrid._isFastVscrolling = function () {
		return (this._covercontrol && this._covercontrol.visible);
	};

	_pGrid._getBodyCellItem = function (nRowIdx, nCellIdx) {
		return (this._bodyBand._get_rows()[nRowIdx]._cells[nCellIdx]);
	};

	_pGrid._refreshBodyCell = function (cell, displayrow, for_select, styleprop, subcellidx) {
		if (!this.enableredraw) {
			this._enable_redraw_history.refresh_body = true;
			return;
		}

		if (this._after_recreate) {
			return;
		}

		if (displayrow < 0) {
			return;
		}

		var band = this._bodyBand;
		if (band) {
			var rows = band._get_rows();

			if (rows.length <= displayrow) {
				return;
			}

			var rowidx = rows[displayrow]._rowidx;
			var dsrowidx = (this._hasTree) ? this._treeIndexes[rowidx] : rowidx;
			var selected = this._isSelectedCell(cell, dsrowidx);

			if (rows[displayrow]) {
				var cellobj = rows[displayrow]._cells[cell];
				var datarow = cellobj._getDataRow();

				if (subcellidx >= 0) {
					var subcellinfo = cellobj._refinfo._subcells[subcellidx];
					if (styleprop && subcellinfo && cellobj.subcells[subcellidx]["set_" + styleprop]) {
						cellobj.subcells[subcellidx]["set_" + styleprop](subcellinfo._getAttrValue(subcellinfo[styleprop], datarow));
					}
				}
				else {
					var cellinfo = cellobj._refinfo;
					if (styleprop && cellobj["set_" + styleprop]) {
						cellobj["set_" + styleprop](cellinfo._getAttrValue(cellinfo[styleprop], datarow));
					}
				}

				band._refreshRowCell(displayrow, cell, selected, undefined, undefined, for_select);
			}
		}
	};

	_pGrid._refreshHead = function (clearCurstyle) {
		if (!this.enableredraw) {
			this._enable_redraw_history.refresh_head = true;
			return;
		}

		if (this._after_recreate) {
			return;
		}

		var band = this._headBand;
		if (band) {
			var rowcnt = band._get_rows().length;

			band._updateAll(clearCurstyle);

			for (var i = 0; i < rowcnt; i++) {
				band._refreshRow(i);
			}
		}
		this._applyResizer();
		this._adjustOverlayControls(false, "head");
	};

	_pGrid._refreshSumm = function (clearCurstyle) {
		if (!this.enableredraw) {
			this._enable_redraw_history.refresh_summ = true;
			return;
		}

		if (this._after_recreate) {
			return;
		}

		var band = this._summBand;
		if (band) {
			var rowcnt = band._get_rows().length;

			band._updateAll(clearCurstyle);

			for (var i = 0; i < rowcnt; i++) {
				band._refreshRow(i);
			}
			band._updateAll(clearCurstyle);
		}
		this._adjustOverlayControls(false, "summ");
	};

	_pGrid._refreshBody = function (clearCurstyle, for_select, no_overlay, no_update_supp) {
		if (!this.enableredraw) {
			this._enable_redraw_history.refresh_body = true;
			return;
		}

		if (this._after_recreate) {
			return;
		}

		var band = this._bodyBand;
		if (band) {
			if (!no_update_supp) {
				this._suppressUpdate();
			}

			var rowcnt = this._getDispRowCnt();

			band._updateAll(clearCurstyle);

			for (var i = 0; i < rowcnt; i++) {
				band._refreshRow(i, undefined, for_select);
			}

			if (!no_overlay) {
				this._adjustOverlayControls(this._is_recreating);
			}
		}
	};

	_pGrid._isSuppressSameRow = function (displaytype, pdatarow, cdatarow, cellinfo) {
		var text1, text2;
		if (displaytype == "treeitemcontrol") {
			return false;
		}

		text1 = cellinfo._getDisplayText(pdatarow);
		text2 = cellinfo._getDisplayText(cdatarow);

		if (text1 == text2) {
			return true;
		}

		return false;
	};

	_pGrid._isSuppressSameCol = function (displaytype, pcellinfo, ccellinfo, cdatarow) {
		var text1, text2;
		if (displaytype == "treeitemcontrol") {
			return false;
		}

		text1 = pcellinfo._getDisplayText(cdatarow);
		text2 = ccellinfo._getDisplayText(cdatarow);

		if (text1 == text2) {
			return true;
		}

		return false;
	};

	_pGrid._analyzeSuppress = function (exportFlag) {
		var supphorztype = this._supphorztype;
		var usesupp = this._is_use_suppress;

		if (!usesupp && !supphorztype) {
			return;
		}

		var cells = this._curFormat._bodycells;

		if (!cells) {
			return;
		}

		var total_dispcnt;

		if (exportFlag) {
			total_dispcnt = this._getGridRowCount();
		}
		else {
			total_dispcnt = this._getSuppRowTotal();
		}

		if (total_dispcnt == 0) {
			return;
		}

		var cellcnt = cells.length;
		var cellinfo;
		var csuppinfo, csupp, rowidx, cdatarow;
		var i, j;
		for (j = 0; j < cellcnt; j++) {
			cellinfo = cells[j];

			if (cellinfo.suppress == 0 && supphorztype == 0) {
				continue;
			}

			cellinfo._clearSuppressInfo();

			var displaytype, psuppinfo, pdatarow;
			var same_cnt = 0, first = true, firstsuppinfo = null;

			for (i = 0; i <= total_dispcnt; i++) {
				if (nexacro._Browser == "Runtime" && exportFlag) {
					nexacro._peekWindowHandleMessageQueuePassing(this._getWindow());
				}

				rowidx = (!exportFlag) ? this.__getBodyCellRowIdxFromIdx(i) : i;
				cdatarow = this._getDataRow(rowidx);

				displaytype = cellinfo._getDisplaytype(cdatarow);

				if (usesupp) {
					csupp = cellinfo._getSuppress(cdatarow);

					if (i > 0) {
						psuppinfo = cellinfo._getSuppressInfo(i - 1, true);
					}

					if (csupp > 0 && i > 0 && psuppinfo) {
						if (total_dispcnt == i) {
							break;
						}

						pdatarow = this._getDataRow((!exportFlag) ? this.__getBodyCellRowIdxFromIdx(i - 1) : i - 1);

						if (this._isFakeCell(cdatarow)) {
							continue;
						}

						if (this._isSuppressSameRow(displaytype, pdatarow, cdatarow, cellinfo)) {
							psuppinfo.last = false;
							psuppinfo.first = first;

							if (first) {
								firstsuppinfo = psuppinfo;
							}

							same_cnt++;
							first = false;
						}
						else {
							psuppinfo.last = true;
							psuppinfo.same_rowcnt = same_cnt;

							if (firstsuppinfo) {
								firstsuppinfo.same_rowcnt = same_cnt;
								firstsuppinfo = null;
							}
							same_cnt = 0;
							first = true;
						}

						if (cdatarow == this._rowcount - 1) {
							csuppinfo = cellinfo._getSuppressInfo(i, true);

							if (firstsuppinfo) {
								firstsuppinfo.same_rowcnt = same_cnt;
							}

							csuppinfo.last = true;
							csuppinfo.same_rowcnt = same_cnt;
						}
					}
				}

				if (supphorztype > 0 && j > 0) {
					var p_cellinfo = cells[j - 1];

					if (this._treeCellinfo != p_cellinfo && this._treeCellinfo != cellinfo) {
						if (((supphorztype == 1 || supphorztype == 3) && cellinfo._area == "left") || ((supphorztype == 2 || supphorztype == 3) && p_cellinfo._area == "right")) {
							csuppinfo = p_cellinfo._getSuppressInfo(i, true);

							if (this._isSuppressSameCol(displaytype, p_cellinfo, cellinfo, cdatarow)) {
								csuppinfo.horzlast = false;
								cellinfo._getSuppressInfo(i, true);
							}
							else {
								csuppinfo.horzlast = true;
							}
						}
					}
				}
			}
		}

		if (!usesupp) {
			return;
		}

		var suppresslevel = this.suppresslevel;

		if (suppresslevel == "sameskip" || suppresslevel == "allcompare") {
			i = 0;
			function __analyzeSuppress_row_loop2 (grid) {
				if (nexacro._Browser == "Runtime" && exportFlag) {
					nexacro._peekWindowHandleMessageQueuePassing(grid._getWindow());
				}

				if (i < total_dispcnt) {
					var suppressRow = [];
					var suppressCol = [];

					rowidx = (!exportFlag) ? grid.__getBodyCellRowIdxFromIdx(i) : i;
					cdatarow = grid._getDataRow(rowidx);

					for (j = 0; j < cellcnt; j++) {
						cellinfo = cells[j];
						csupp = cellinfo._getSuppress(cdatarow);

						if (csupp > 0) {
							suppressRow.push(cellinfo);
						}
						if (csupp < 0) {
						}
					}

					if (suppressRow.length > 0) {
						suppressRow.sort(function (a, b) {
							return a._getSuppress(cdatarow) - b._getSuppress(cdatarow);
						});

						var suppressRowLen = suppressRow.length;

						for (var jj = 0; jj < suppressRowLen; jj++) {
							cellinfo = suppressRow[jj];

							if (cellinfo) {
								for (var k = 0; k < cellcnt; k++) {
									if (k == cellinfo._col) {
										continue;
									}
									grid._compareSuppressCol(i, k, cellinfo._col, suppresslevel, cdatarow);
								}
							}
						}
					}

					if (suppressCol.length > 0) {
						suppressCol.sort(function (a, b) {
							return b._getSuppress(cdatarow) - a._getSuppress(cdatarow);
						});

						var suppressColLen = suppressCol.length;

						for (var jjj = 0; jjj < suppressColLen; jjj++) {
							cellinfo = suppressCol[jjj];

							if (cellinfo) {
								for (var kk = 0; kk < cellcnt; kk++) {
									if (kk == cellinfo._col) {
										continue;
									}
								}
							}
						}
					}
					i++;
					return false;
				}
				return true;
			}
			while (true) {
				if (__analyzeSuppress_row_loop2(this)) {
					break;
				}
				if (__analyzeSuppress_row_loop2(this)) {
					break;
				}
				if (__analyzeSuppress_row_loop2(this)) {
					break;
				}
				if (__analyzeSuppress_row_loop2(this)) {
					break;
				}
				if (__analyzeSuppress_row_loop2(this)) {
					break;
				}
				if (__analyzeSuppress_row_loop2(this)) {
					break;
				}
				if (__analyzeSuppress_row_loop2(this)) {
					break;
				}
				if (__analyzeSuppress_row_loop2(this)) {
					break;
				}
				if (__analyzeSuppress_row_loop2(this)) {
					break;
				}
				if (__analyzeSuppress_row_loop2(this)) {
					break;
				}
			}
		}

		if (total_dispcnt > 0) {
			var count = 0;
			var start;
			var csuppinfo2;

			for (j = 0; j < cellcnt; j++) {
				start = 0;

				var center;

				for (i = 0; i < total_dispcnt; i++) {
					if (nexacro._Browser == "Runtime" && exportFlag) {
						nexacro._peekWindowHandleMessageQueuePassing(this._getWindow());
					}

					cellinfo = cells[j];

					if (cellinfo.suppress == 0) {
						continue;
					}

					rowidx = (!exportFlag) ? this.__getBodyCellRowIdxFromIdx(i) : i;

					cdatarow = this._getDataRow(rowidx);

					if (cellinfo.suppressalign.indexOf("middle") < 0) {
						break;
					}

					csuppinfo = cellinfo._getSuppressInfo(i);
					csuppinfo.middle = false;

					csupp = cellinfo._getSuppress(cdatarow);

					if (csupp > 0) {
						count++;
						if (csuppinfo.last == true) {
							if (count == 1) {
								csuppinfo.middle = true;
							}
							else {
								center = Math.round(count / 2);
								csuppinfo2 = cellinfo._getSuppressInfo(start + center - 1);
								csuppinfo2.middle = true;
							}
							start = i + 1;
							count = 0;
						}
					}
				}
			}
		}
	};

	_pGrid._compareSuppressCol = function (row, col, curcol, supplvl, cdatarow) {
		var cells = this._curFormat._bodycells;
		var pinfo = cells[col];
		var cinfo = cells[curcol];
		var psuppinfo, csuppinfo;
		var csupp = cinfo._getSuppress(cdatarow);
		var psupp = pinfo._getSuppress(cdatarow);

		if (csupp <= 0 || psupp <= 0) {
			return false;
		}

		if (psupp < csupp) {
			psuppinfo = pinfo._getSuppressInfo(row);
			csuppinfo = cinfo._getSuppressInfo(row);

			if (psuppinfo.last == true) {
				csuppinfo.last = true;
			}
			return true;
		}
		else if (supplvl == "allcompare" && psupp == csupp) {
			psuppinfo = pinfo._getSuppressInfo(row);
			csuppinfo = cinfo._getSuppressInfo(row);

			if (psuppinfo.last == true) {
				csuppinfo.last = true;
			}
			if (csuppinfo.last == true) {
				psuppinfo.last = true;
			}
			return true;
		}
		return false;
	};

	_pGrid.__getBodyCellRowIdxFromIdx = function (idx) {
		var toprowpos;
		if (this._fixed_rowcnt) {
			if (idx + this._fixed_startrow <= this._fixed_endrow) {
				toprowpos = this._fixed_startrow;
			}
			else {
				idx -= this._fixed_rowcnt - this._fixed_startrow;
				toprowpos = this._toprowpos[0];
			}
		}
		else {
			toprowpos = this._toprowpos[0];
		}
		return idx + toprowpos;
	};

	_pGrid._getSuppRowTotal = function () {
		var total_dispcnt;
		var disprowcnt = this._disprowcnt;

		if (this._fixed_rowcnt > 0) {
			total_dispcnt = this._fixed_rowcnt - this._fixed_startrow + disprowcnt;
		}
		else {
			total_dispcnt = disprowcnt;
		}

		return total_dispcnt;
	};

	_pGrid._suppressUpdate = function () {
		this._analyzeSuppress();

		var supphorztype = this._supphorztype;
		var usesupp = this._is_use_suppress;

		if (!usesupp && !supphorztype) {
			return;
		}

		if (!this._curFormat || !this._curFormat._bodycells) {
			return;
		}

		var total_dispcnt = this._getSuppRowTotal();

		for (var i = 0; i <= total_dispcnt; i++) {
			this._suppressUpdateRow(i, 0, total_dispcnt - 1);
		}
	};

	_pGrid._suppressUpdateRow = function (row, start_rowpos, end_rowpos, exportFlag) {
		var band = this._bodyBand;

		if (band == null) {
			return;
		}

		var cells = this._curFormat._bodycells;
		var cellcnt = cells.length;
		var rowidx = (!exportFlag) ? this.__getBodyCellRowIdxFromIdx(row) : row;
		var cellinfo, prelast, curlast;
		var psuppinfo, csuppinfo, csupp;
		var cdatarow = this._getDataRow(rowidx);
		var supphorztype = this._supphorztype;

		if (cdatarow < 0) {
			return;
		}

		for (var col = 0; col < cellcnt; col++) {
			cellinfo = cells[col];
			csuppinfo = cellinfo._getSuppressInfo(row);
			csupp = cellinfo._getSuppress(cdatarow);

			if (!csuppinfo) {
				continue;
			}

			if (csupp > 0) {
				if (csupp > 0 && (row - start_rowpos) > 0) {
					psuppinfo = cellinfo._getSuppressInfo(row - 1);
				}

				prelast = (psuppinfo ? psuppinfo.last : true);
				curlast = (row == end_rowpos ? true : csuppinfo.last);

				if (cellinfo.suppressalign.indexOf("first") >= 0) {
					if (prelast == false) {
						csuppinfo.text_proc = csupp;
					}
					else {
						csuppinfo.text_proc = 0;
					}
				}
				else if (cellinfo.suppressalign.indexOf("last") >= 0) {
					if (curlast == false) {
						csuppinfo.text_proc = csupp;
					}
					else {
						csuppinfo.text_proc = 0;
					}
				}
				else if (cellinfo.suppressalign.indexOf("middle") >= 0) {
					if (csuppinfo.middle == true) {
						csuppinfo.text_proc = 0;
					}
					else {
						csuppinfo.text_proc = csupp;
					}
				}

				if (psuppinfo) {
					if (prelast == false) {
						psuppinfo.border_proc = csupp;
					}
					else {
						psuppinfo.border_proc = 0;
					}
				}
			}
			else if (csupp == undefined) {
				if (cellinfo.suppressalign.indexOf("first") >= 0 || cellinfo.suppressalign.indexOf("middle") >= 0) {
					csuppinfo.text_proc = 1;
				}
			}

			if (supphorztype > 0) {
				if (col > 0) {
					var p_cellinfo = cells[col - 1];
					var p_suppinfo = p_cellinfo._getSuppressInfo(row);

					if (!p_suppinfo) {
						continue;
					}

					var start = false;
					if ((p_suppinfo.first || p_suppinfo.last) && (csuppinfo.first || csuppinfo.last)) {
						if (p_cellinfo._area == "left") {
							if (!csuppinfo.same_rowcnt) {
								if (p_suppinfo.horzlast == false) {
									start = true;
									p_suppinfo.horz_border_proc = 1;
								}

								if (start) {
									csuppinfo.horz_text_proc = 1;
								}
							}
						}
						else if (p_cellinfo._area == "right") {
							if (!p_suppinfo.same_rowcnt) {
								if (p_suppinfo.horzlast == false) {
									start = true;
									csuppinfo.horz_border_proc = 1;
								}

								if (start) {
									p_suppinfo.horz_text_proc = 1;
								}

								if (start && csuppinfo.horzlast == true) {
									csuppinfo.horz_border_proc = 1;
								}
							}
						}
					}
				}
			}
		}
	};

	_pGrid._refreshBodyRow = function (displayrow, status, removecell, for_select) {
		if (!this.enableredraw) {
			this._enable_redraw_history.refresh_body = true;
			return;
		}

		if (this._after_recreate) {
			return;
		}

		var band = this._bodyBand;
		if (band) {
			var rows = band._get_rows();
			if (rows.length <= displayrow) {
				return;
			}

			var rowcnt = this._getDispRowCnt();
			if (displayrow >= 0 && displayrow < rowcnt) {
				var rowidx = rows[displayrow]._rowidx;
				var dsrowidx = (this._hasTree) ? this._treeIndexes[rowidx] : rowidx;

				if (dsrowidx == undefined) {
					return;
				}

				band._refreshRow(displayrow, status, for_select, removecell);
			}
			this._adjustOverlayControls(false);
		}
	};

	_pGrid._global_cursor = undefined;
	_pGrid._setGlobalCursor = function (cursor, obj, to_obj) {
		if (nexacro._cur_track_info || nexacro._cur_extra_track_info) {
			return;
		}

		if (this._global_cursor !== cursor) {
			if (!to_obj) {
				this._global_cursor = cursor;
			}

			if (cursor) {
				this._global_cursor_obj = obj;
			}
			else if (!obj) {
				obj = this._global_cursor_obj;
			}

			while (obj) {
				obj._updateCursor(cursor);

				if (obj instanceof nexacro.Grid) {
					return;
				}

				if (obj == to_obj) {
					return;
				}
				obj = obj.parent;
			}
		}
	};

	_pGrid._getColMergeInfo = function (band, col_idx) {
		var cells;

		if (band == "head") {
			cells = this._curFormat._headcells;
		}
		else if (band == "summ" || band == "summary") {
			cells = this._curFormat._summcells;
		}
		else {
			cells = this._curFormat._bodycells;
		}

		if (!cells) {
			return null;
		}

		var cellsLen = cells.length;
		var cell;
		var col = col_idx;
		var colspan = 1;
		var retn = [];

		for (var i = 0; i < cellsLen; i++) {
			cell = cells[i];
			if (cell._col <= col_idx && (cell._col + cell._colspan) > col_idx) {
				if (colspan < cell._colspan) {
					colspan = cell._colspan;
					col = cell._col;
				}
			}
		}
		retn[0] = col;
		retn[1] = colspan;

		return retn;
	};

	_pGrid._applySelect = function (arrS, arrE, pos) {
		var each = false;

		if (this.summarytype == "top" || this.summarytype == "lefttop") {
			each = true;
		}

		if (arrS.length == 0 || (each && pos < 0)) {
			arrS.splice(0, 0, pos);
			arrE.splice(0, 0, pos);
		}
		else {
			var nobodys, nobodye;
			var mincnt = 0;
			var i;

			if (each) {
				for (i = 0; i < arrS.length; i++) {
					if (arrS[i] >= 0) {
						break;
					}

					mincnt++;
				}

				nobodys = arrS.splice(0, mincnt);
				nobodye = arrE.splice(0, mincnt);
			}

			var cnt = arrS.length;

			if (cnt == 0) {
				arrS.splice(0, 0, pos);
				arrE.splice(0, 0, pos);
			}
			else if (cnt == 1 || arrS[0] > pos) {
				this._addSelect(arrS, arrE, 0, pos);
			}
			else if (arrE[cnt - 1] < pos) {
				this._addSelect(arrS, arrE, cnt - 1, pos);
			}
			else {
				for (i = 0; i < cnt; i++) {
					if (arrE[i] < pos && arrS[i + 1] > pos) {
						if ((arrE[i] + 1) == pos && (arrS[i + 1] - 1) > pos) {
							this._addSelect(arrS, arrE, i, pos);
						}
						else if ((arrE[i] + 1) < pos && (arrS[i + 1] - 1) == pos) {
							this._addSelect(arrS, arrE, i + 1, pos);
						}
						else if ((arrE[i] + 1) == pos && (arrS[i + 1] - 1) == pos) {
							this._addSelect(arrS, arrE, i, pos);
							arrE[i] = arrE[i + 1];
							arrS.splice(i + 1, 1);
							arrE.splice(i + 1, 1);
						}
						else if ((arrE[i] + 1) < pos && (arrS[i + 1] - 1) > pos) {
							arrS.push(pos);
							arrE.push(pos);
							arrS.sort();
							arrE.sort();
						}
						break;
					}
				}
			}

			if (each) {
				for (i = 0; i < nobodys.length; i++) {
					arrS.splice(0, 0, nobodys[i]);
					arrE.splice(0, 0, nobodye[i]);
				}
			}
		}
	};

	_pGrid._addSelect = function (arrS, arrE, idx, pos) {
		if (arrE[idx] < pos) {
			if ((arrE[idx] + 1) == pos) {
				arrE[idx] = pos;
			}
			else {
				arrS.push(pos);
				arrE.push(pos);
			}
		}
		else if (arrS[idx] > pos) {
			if ((arrS[idx] - 1) == pos) {
				arrS[idx] = pos;
			}
			else {
				arrS.push(pos);
				arrE.push(pos);
				arrS.sort();
				arrE.sort();
			}
		}
	};

	_pGrid._findCellObj = function (fromComp) {
		var cellobj = fromComp;
		while (cellobj && cellobj._type_name != "GridCellControl" && cellobj._type_name != "GridSubCellControl") {
			if (cellobj instanceof nexacro.Grid) {
				if (cellobj == this) {
					break;
				}
				else {
					cellobj = fromComp;
					break;
				}
			}

			if (cellobj._cellobj && cellobj._cellobj._is_alive
				 && (cellobj._cellobj._type_name == "GridCellControl" || cellobj._cellobj._type_name == "GridSubCellControl")) {
				cellobj = cellobj._cellobj;
				break;
			}
			cellobj = cellobj.parent;
		}
		return cellobj;
	};

	_pGrid._findBandObj = function (fromComp) {
		var bandobj = fromComp;
		while (bandobj && bandobj._type_name != "GridBandControl") {
			if (bandobj == this) {
				break;
			}

			bandobj = bandobj.parent;
		}
		return bandobj;
	};

	_pGrid._isFakeCell = function (rowidx) {
		if (this._rowcount <= rowidx || rowidx < -2) {
			return true;
		}

		return false;
	};

	_pGrid._moveToPosCell = function (rowidx, cellidx) {
		var newPos = rowidx;
		var retn = true;

		if (newPos == undefined) {
			newPos = 0;
		}

		if (this._isFakeCell(newPos)) {
			return false;
		}

		var cellinfo = this._getBodyCellInfo(cellidx);
		if (!cellinfo) {
			return false;
		}

		var beforeCell = this._beforebodycellpos = this._selectinfo.curcell;
		var beforeCol = this._beforebodycolpos = this._selectinfo.curcol;
		var beforeRow = this._beforebodyrowpos = this._selectinfo.curdsrow;
		var beforeSubrow = this._beforebodysubrowpos = this._selectinfo.cursubrow;
		var beforePvt = this._beforepvt = this._selectinfo.curpvt;

		var afterCell = cellidx;
		var afterCol = cellinfo._col;
		var afterRow = newPos;
		var afterSubrow = cellinfo._row;
		var afterPvt = -9;

		this._setSelectedInfo(afterCell, afterCol, afterRow, afterSubrow, afterPvt);

		while (true) {
			if (afterCell != beforeCell) {
				break;
			}
			if (afterCol != beforeCol) {
				break;
			}
			if (afterRow != beforeRow) {
				break;
			}
			if (afterSubrow != beforeSubrow) {
				break;
			}
			if (afterPvt != beforePvt) {
				break;
			}

			retn = false;
			break;
		}

		if (retn) {
			retn = this._ChangeSelect(afterCell, afterCol, afterRow, afterSubrow, afterPvt, false, beforeCell, beforeCol, beforeRow, beforeSubrow, beforePvt, "body");
		}

		if (retn && this._isSelectRowType()) {
			var disprow = this._dsRowToDispRow(afterRow);
			this._jumpCurrentRow(disprow);

			var cellobj = this._getCurrentBodyCell(afterRow, afterCell);
			if (cellobj) {
				cellobj._showfull();
			}
		}

		this._moveCellAfterFocus();

		return retn;
	};

	_pGrid._getColFixCnt = function (area) {
		if (this._curFormat) {
			return this._curFormat._getColFixCnt(area);
		}
		return -1;
	};

	_pGrid._getGridBand = function (nCell) {
		if (!this._curFormat || !this._curFormat._bodycells) {
			return -1;
		}

		var cell = this._curFormat._bodycells[nCell];
		if (cell) {
			if (this._bPivotGrid) {
				var leftcnt = this._getColFixCnt("left");
				var rightcnt = this._getColFixCnt("right");

				if (cell._col < leftcnt) {
					return -1;
				}
				else if (cell._col >= (this._curFormat._bodycells.length - rightcnt)) {
					return -2;
				}
				else {
					return 0;
				}
			}
			else {
				return 0;
			}
		}
		return -9;
	};

	_pGrid._clrMultiSelect = function () {
		this._selectinfo.rows = [];
		this._selectinfo.selects = [];

		this._selectstartrow = [];
		this._selectstartcol = [];
		this._selectstartsubrow = [];
		this._selectstartpvt = [];

		this._selectendrow = [];
		this._selectendcol = [];
		this._selectendsubrow = [];
		this._selectendpvt = [];

		this._defaultSelect();
	};

	_pGrid._isIncludeSelectpos = function (cell, row) {
		var selects = this._selectinfo.getSelectCells(row);

		if (selects && selects[cell]) {
			return true;
		}

		return false;
	};

	_pGrid._addSelectpos = function (cell, row, no_sort) {
		var select = this._selectinfo.selects;
		var rows = this._selectinfo.rows;

		if (!select[row + 2]) {
			select[row + 2] = [];
		}

		select[row + 2][cell] = true;

		for (var i = 0, n = rows.length; i < n; i++) {
			if (rows[i] == row) {
				return;
			}
		}
		rows.push(row);

		if (!no_sort) {
			rows.sort(function (a, b) {
				return a - b;
			});
		}
	};

	_pGrid._delSelectpos = function (cell, row, adjust) {
		var select = this._selectinfo.selects;
		var rows = this._selectinfo.rows;
		var i, j, n;
		var rowLen;
		var cells;
		var exist;

		if (cell < 0) {
			if (nexacro._isArray(row)) {
				rowLen = row.length;
				for (i = rowLen - 1; i >= 0; i--) {
					if (adjust) {
						if (select.length > row[i] + 2) {
							select.splice(row[i] + 2, 1);
						}
					}
					else {
						select[row[i] + 2] = undefined;
					}

					for (j = 0; j < rows.length; j++) {
						if (rows[j] == row[i]) {
							rows.splice(j, 1);
							break;
						}
					}
				}
			}
			else {
				if (adjust) {
					if (select.length > row + 2) {
						select.splice(row + 2, 1);
					}
				}
				else {
					select[row + 2] = undefined;
				}

				for (j = 0; j < rows.length; j++) {
					if (rows[j] == row) {
						rows.splice(j, 1);
						break;
					}
				}
			}
		}
		else {
			if (nexacro._isArray(row)) {
				rowLen = row.length;

				for (i = rowLen - 1; i >= 0; i--) {
					cells = select[row[i] + 2];

					if (cells) {
						cells[cell] = false;
					}

					exist = false;
					for (j = 0, n = cells.length; j < n; j++) {
						if (cells[j]) {
							exist = true;
							break;
						}
					}

					if (!exist) {
						select[row + 2] = undefined;

						for (j = 0; j < rows.length; j++) {
							if (rows[j] == row[i]) {
								rows.splice(j, 1);
								break;
							}
						}
					}
				}
			}
			else {
				cells = select[row + 2];

				if (cells) {
					cells[cell] = false;
				}

				exist = false;
				for (j = 0, n = cells.length; j < n; j++) {
					if (cells[j]) {
						exist = true;
						break;
					}
				}

				if (!exist) {
					select[row + 2] = undefined;

					for (j = 0; j < rows.length; j++) {
						if (rows[j] == row) {
							rows.splice(j, 1);
							break;
						}
					}
				}
			}
		}
	};

	_pGrid._resetSelectStartEndRow = function () {
		var select = this._selectinfo.selects;
		this._selectstartrow = [];
		this._selectendrow = [];

		for (var i = 0, n = select.length; i < n; i++) {
			if (select[i]) {
				this._applySelect(this._selectstartrow, this._selectendrow, i - 2);
			}
		}

		this.selectstartrow = this._selectstartrow;
		this.selectendrow = this._selectendrow;

		if (!this.selectstartrow.length) {
			this.selectstartrow = -9;
		}
		if (!this.selectendrow.length) {
			this.selectendrow = -9;
		}
	};

	_pGrid._isMultiSelected = function () {
		if (!this._curFormat || !this._curFormat._bodycells) {
			return false;
		}

		if (this._isSelectRowType()) {
			if (this._selectinfo.rows.length > 1) {
				return true;
			}
		}
		else {
			if (this._selectinfo.rows.length > 1) {
				return true;
			}
			else if (this._selectinfo.rows.length == 1) {
				var cells = this._selectinfo.selects[this._selectinfo.rows[0] + 2];
				var cnt = 0;

				for (var i = 0, n = cells.length; i < n; i++) {
					if (cells[i]) {
						cnt++;
					}
					if (cnt > 1) {
						return true;
					}
				}
			}
		}
		return false;
	};

	_pGrid._initSelect = function (row, cell, col, subrow, pvt) {
		cell = (cell !== undefined) ? cell : 0;
		col = (col !== undefined) ? col : 0;
		row = (row !== undefined) ? row : 0;
		subrow = (subrow !== undefined) ? subrow : 0;
		pvt = (pvt !== undefined) ? pvt : -9;

		this._resetSelect(row, cell, col, subrow, pvt);
	};

	_pGrid._resetSelect = function (row, cell, col, subrow, pvt) {
		var bcell = this._selectinfo.curcell;
		var bcol = this._selectinfo.curcol;
		var brow = this._selectinfo.curdsrow;
		var bsubrow = this._selectinfo.cursubrow;
		var bpvt = this._selectinfo.curpvt;

		cell = (cell !== undefined) ? cell : this._selectinfo.curcell;
		col = (col !== undefined) ? col : this._selectinfo.curcol;
		row = (row !== undefined) ? row : this._selectinfo.curdsrow;
		subrow = (subrow !== undefined) ? subrow : this._selectinfo.cursubrow;
		pvt = (pvt !== undefined) ? pvt : this._selectinfo.curpvt;

		if (this.getElement()) {
			if (row >= 0 && cell < 0) {
				if (this._isSelectRowType()) {
					cell = 0;
				}
				else {
					cell = col = subrow = 0;
				}
			}

			this._clrMultiSelect();
			this._multiselect = "none";
			this._setSelectedInfo(cell, col, row, subrow, pvt);
			this._ChangeSelect(cell, col, row, subrow, pvt, true, bcell, bcol, brow, bsubrow, bpvt, "body");
			this._refreshHead(true);
			this._refreshSumm(true);
		}
	};

	_pGrid._ChangeSelect = function (cell, col, row, subrow, pvt, bDataset, oldcell, oldcol, oldrow, oldsubrow, oldpvt, bandstr, evt_kind) {
		bDataset = bDataset || false;
		var selectmode = this._multiselect;

		var format = this._curFormat;

		if (!format || ((evt_kind == "lbuttondown" || evt_kind == "keydown") && this._setdataobj && this._setdataobj.succ == false)) {
			this._setdataobj = null;
			this._setSelectedInfo(oldcell, oldcol, oldrow, oldsubrow, oldpvt);
			return false;
		}

		var cells, cellcnt, cellinfo, subrowslen = 0;
		var b_select_changed = false;
		var b_cellpos_changed = false;

		if (bandstr == "head") {
			cells = format._headcells;
			b_select_changed = (oldrow != row || oldcell != cell);

			if (format._headrows) {
				subrowslen = format._headrows.length;
			}
		}
		else if (bandstr == "summ" || bandstr == "summary") {
			cells = format._summcells;
			b_select_changed = (oldrow != row || oldcell != cell);

			if (format._summrows) {
				subrowslen = format._summrows.length;
			}
		}
		else {
			cells = format._bodycells;

			if (this._isSelectRowType()) {
				b_select_changed = (oldrow != row);
				b_cellpos_changed = (oldrow != row || oldcell != cell);
			}
			else {
				b_cellpos_changed = b_select_changed = (oldrow != row || oldcell != cell);
			}

			if (format._bodyrows) {
				subrowslen = format._bodyrows.length;
			}
		}

		if (!cells) {
			this._setSelectedInfo(oldcell, oldcol, oldrow, oldsubrow, oldpvt);
			return false;
		}

		cellcnt = cells.length;
		cellinfo = cells[cell];

		var clear = false;


		if ((bandstr == "body" && row < 0) || cell < 0) {
			clear = (selectmode != "normal");

			this._clrMultiSelect();
			this._selectDraw(cell, col, row, subrow, pvt, bDataset, oldcell, oldcol, oldrow, oldsubrow, oldpvt, clear, []);
			this._selectinfo.area = [];
			this._defaultSelect();

			if (b_cellpos_changed) {
				this.on_fire_oncellposchanged(this, cell, col, row, subrow, pvt, oldcell, oldcol, oldrow, oldsubrow, oldpvt, this.selectendcol, this.selectendpivot, this.selectendrow, this.selectendsubrow, this.selectstartcol, this.selectstartpivot, this.selectstartrow, this.selectstartsubrow);
			}

			if (b_select_changed) {
				this.on_fire_onselectchanged(this, cell, col, row, subrow, pvt, oldcell, oldcol, oldrow, oldsubrow, oldpvt, this.selectendcol, this.selectendpivot, this.selectendrow, this.selectendsubrow, this.selectstartcol, this.selectstartpivot, this.selectstartrow, this.selectstartsubrow);
			}

			return true;
		}
		else if (!cellinfo) {
			this._setSelectedInfo(oldcell, oldcol, oldrow, oldsubrow, oldpvt);
			return false;
		}

		clear = (this._selectClear || clear);
		this._selectClear = false;

		var ctrlkey_change = false;

		if (selectmode == "ctrl") {
			if (this.selecttype == "multirow") {
				if (!this._isIncludeSelectpos(0, row)) {
					ctrlkey_change = true;
				}
			}
			if (this.selecttype == "multicell") {
				if (!this._isIncludeSelectpos(cell, row)) {
					ctrlkey_change = true;
				}
			}
		}


		if (bDataset == false) {
			if (this._binddataset && bandstr == "body" && row >= 0 && (ctrlkey_change == true || oldrow != row)) {
				this._userRowposChange = true;
				var row2 = this._binddataset._setRowPosition(row, 51);
				this._userRowposChange = false;

				if (row != row2) {
					if (row2 === undefined) {
						this._setSelectedInfo(oldcell, oldcol, oldrow, oldsubrow, oldpvt);
						this._selectDraw(oldcell, oldcol, oldrow, oldsubrow, oldpvt, bDataset, cell, col, row, subrow, pvt, true, []);
						return false;
					}
					else {
						row = row2;
					}
				}
			}
		}

		var _controlpoint_cell = this._selectinfo.ctrlpoint;
		var selectRows = [];
		var b_fire = false;
		var multiidx = 0;

		function makeClearRows (grid) {
			var select_rows = grid._selectinfo.rows;
			var j = 0;

			selectRows = [];

			for (var i = 0, n = select_rows.length; i < n; i++) {
				selectRows[j++] = grid._dsRowToDispRow(select_rows[i]);
			}

			return select_rows;
		}


		if (selectmode == "none") {
			if (bandstr == "body") {
				if (this._isAreaSelect() || this._isMultiSelect()) {
					if (this._isIncludeSelectpos(cell, row)) {
						if (evt_kind == "keydown" || evt_kind == "mousemove") {
							b_fire = true;
						}
						else {
							_controlpoint_cell._set(cellinfo, row, subrowslen);
							if (b_cellpos_changed && evt_kind == "lbuttondown") {
								this.on_fire_oncellposchanged(this, cell, col, row, subrow, pvt, oldcell, oldcol, oldrow, oldsubrow, oldpvt, this.selectendcol, this.selectendpivot, this.selectendrow, this.selectendsubrow, this.selectstartcol, this.selectstartpivot, this.selectstartrow, this.selectstartsubrow);
							}
							return false;
						}
					}
					else {
						if (evt_kind == "lbuttonup") {
							b_fire = true;
						}
					}

					if (evt_kind == "mousemove") {
						this._is_drag_selecting = true;
					}
					else {
						selectRows = makeClearRows(this);
						this._clrMultiSelect();

						if (evt_kind != "lbuttonup") {
							_controlpoint_cell._set(cellinfo, row, subrowslen);
						}
					}
				}
				else {
					this._clrMultiSelect();
					_controlpoint_cell._set(cellinfo, row, subrowslen);
				}
			}
			else {
				selectRows = makeClearRows(this);
				this._clrMultiSelect();
				_controlpoint_cell._set(cellinfo, row, subrowslen);
			}
			this._selectinfo.area = [];
		}
		else if (selectmode == "ctrl") {
			if (evt_kind != "mousemove") {
				_controlpoint_cell._set(cellinfo, row, subrowslen);
			}


			if (this.selecttype == "multirow") {
				if (ctrlkey_change == false && (evt_kind == "lbuttondown" || (evt_kind && evt_kind.indexOf("func") >= 0))) {
					this._delMultirowSelectInfo(row);
					this._delSelectpos(-1, row);
					this._resetSelectStartEndRow();
					this._selectDraw(cell, col, row, subrow, pvt, bDataset, oldcell, oldcol, oldrow, oldsubrow, oldpvt, clear, selectRows);
					this._defaultSelect();

					this.on_fire_onselectchanged(this, cell, col, row, subrow, pvt, oldcell, oldcol, oldrow, oldsubrow, oldpvt, this.selectendcol, this.selectendpivot, this.selectendrow, this.selectendsubrow, this.selectstartcol, this.selectstartpivot, this.selectstartrow, this.selectstartsubrow);
					return true;
				}

				b_fire = true;
				multiidx = this._selectinfo.area.length;

				if (evt_kind == "mousemove") {
					this._is_drag_selecting = true;
					multiidx--;
				}
			}
			else if (this.selecttype == "multiarea") {
				multiidx = this._selectinfo.area.length;

				if (evt_kind == "mousemove") {
					this._is_drag_selecting = true;
					multiidx--;
				}
			}
		}
		else if (selectmode == "shift") {
			if (this.selecttype == "multiarea") {
				multiidx = this._selectinfo.area.length - 1;
			}

			this._clrMultiSelect();
			clear = true;
		}


		if (this._isSelectRowType() == false) {
			if (b_select_changed) {
				b_fire = true;
			}

			if (this._isAreaSelect()) {
				this._applyAreaSelectPos(cell, row, multiidx, "area");
			}
			else {
				this._addSelectpos(cell, row);
				this._applySelect(this._selectstartrow, this._selectendrow, row);
				this._applySelect(this._selectstartcol, this._selectendcol, col);
				this._applySelect(this._selectstartsubrow, this._selectendsubrow, subrow);
			}
		}


		else {
			if (b_select_changed) {
				b_fire = true;
			}

			if (this._isMultiSelect()) {
				this._applyAreaSelectPos(cell, row, multiidx, "row");
			}
			else {
				for (var i = 0; i < cellcnt; i++) {
					this._addSelectpos(i, row);
				}

				this._applySelect(this._selectstartrow, this._selectendrow, row);
			}
		}


		this._defaultSelect();


		var b_draw = false;

		if (bDataset == false) {
			if (this._binddataset && bandstr == "body" && row >= 0 && (ctrlkey_change == true || oldrow != row)) {
				this._rowposition = row;
				b_draw = true;
			}
			else {
				if (clear == true) {
					b_draw = true;
				}
				else if (b_fire == true) {
					b_draw = true;
				}
			}
		}
		else {
			clear = (this._isMultiSelect() || this._isAreaSelect());
			b_draw = true;
		}

		if (b_draw) {
			this._selectDraw(cell, col, row, subrow, pvt, bDataset, oldcell, oldcol, oldrow, oldsubrow, oldpvt, clear, selectRows, evt_kind);
		}


		if (b_cellpos_changed && evt_kind != "func_area1") {
			this.on_fire_oncellposchanged(this, cell, col, row, subrow, pvt, oldcell, oldcol, oldrow, oldsubrow, oldpvt, this.selectendcol, this.selectendpivot, this.selectendrow, this.selectendsubrow, this.selectstartcol, this.selectstartpivot, this.selectstartrow, this.selectstartsubrow);
		}

		if (b_fire && evt_kind != "func_area1") {
			this.on_fire_onselectchanged(this, cell, col, row, subrow, pvt, oldcell, oldcol, oldrow, oldsubrow, oldpvt, this.selectendcol, this.selectendpivot, this.selectendrow, this.selectendsubrow, this.selectstartcol, this.selectstartpivot, this.selectstartrow, this.selectstartsubrow);
		}

		return true;
	};

	_pGrid._applyAreaSelectPos = function (cell, row, idx, type) {
		var format = this._curFormat;
		var cells, subrowsLen;
		var bodycells = [], bodycellslen = 0, bodyrowslen = 0, headcells = [], headcellslen = 0, headrowslen = 0, summcells = [], summcellslen = 0, summrowslen = 0;

		if (format._bodycells) {
			bodycells = format._bodycells;
			bodycellslen = bodycells.length;
			bodyrowslen = format._bodyrows.length;
		}
		if (format._headcells) {
			headcells = format._headcells;
			headcellslen = headcells.length;
			headrowslen = format._headrows.length;
		}
		if (format._summcells) {
			summcells = format._summcells;
			summcellslen = summcells.length;
			summrowslen = format._summrows.length;
		}

		if (row == -2) {
			cells = summcells;
			subrowsLen = summrowslen;
		}
		else if (row == -1) {
			cells = headcells;
			subrowsLen = headrowslen;
		}
		else {
			cells = bodycells;
			subrowsLen = bodyrowslen;
		}

		var ctrlpoint = this._selectinfo.ctrlpoint;
		var cellinfo = cells[cell];
		var begcol, endcol, begrow, endrow, begsubrow = [], endsubrow = [], last;

		begcol = Math.min(ctrlpoint.col, cellinfo._col);
		endcol = Math.max((ctrlpoint.col + ctrlpoint.colspan - 1), (cellinfo._col + cellinfo._colspan - 1));

		if (ctrlpoint.row < row) {
			begrow = ctrlpoint.row;
			endrow = row;

			last = endrow - begrow;

			begsubrow[0] = ctrlpoint.subrow;
			endsubrow[0] = ctrlpoint.subrowslen - 1;
			begsubrow[last] = 0;
			endsubrow[last] = cellinfo._row + cellinfo._rowspan - 1;
		}
		else if (ctrlpoint.row > row) {
			begrow = row;
			endrow = ctrlpoint.row;

			last = endrow - begrow;

			begsubrow[0] = cellinfo._row;
			endsubrow[0] = subrowsLen - 1;
			begsubrow[last] = 0;
			endsubrow[last] = ctrlpoint.subrow + ctrlpoint.rowspan - 1;
		}
		else {
			begrow = endrow = row;

			begsubrow[0] = Math.min(cellinfo._row, ctrlpoint.subrow);
			endsubrow[0] = Math.max(cellinfo._row + cellinfo._rowspan - 1, ctrlpoint.subrow + ctrlpoint.rowspan - 1);
		}

		var ii;
		for (var i = begrow + 1; i < endrow; i++) {
			ii = i - begrow;
			begsubrow[ii] = 0;

			if (i == -1) {
				endsubrow[ii] = headrowslen - 1;
			}
			else {
				endsubrow[ii] = bodyrowslen - 1;
			}
		}

		var areainfo;

		if (type == "area") {
			if (begrow >= 0 || begrow == endrow) {
				areainfo = this._adjustMergeArea(cells, begcol, endcol, begrow, endrow, begsubrow, endsubrow);
			}
			else {
				var bsubrow, esubrow;
				var prevbegcol = begcol, prevendcol = endcol;
				var summbegsubrow;
				var summendsubrow;
				var headbegsubrow;
				var headendsubrow;

				while (true) {
					bsubrow = [].concat(begsubrow);
					esubrow = [].concat(endsubrow);

					if (begrow == -2) {
						summbegsubrow = bsubrow.splice(0, 1);
						summendsubrow = esubrow.splice(0, 1);
						headbegsubrow = bsubrow.splice(0, 1);
						headendsubrow = esubrow.splice(0, 1);

						areainfo = this._adjustMergeArea(summcells, prevbegcol, prevendcol, -2, -2, summbegsubrow, summendsubrow);

						prevbegcol = areainfo.begcol;
						prevendcol = areainfo.endcol;

						areainfo = this._adjustMergeArea(headcells, prevbegcol, prevendcol, -1, -1, headbegsubrow, headendsubrow);

						if (prevbegcol != areainfo.begcol || prevendcol != areainfo.endcol) {
							prevbegcol = areainfo.begcol;
							prevendcol = areainfo.endcol;
							continue;
						}
					}
					else if (begrow == -1) {
						headbegsubrow = bsubrow.splice(0, 1);
						headendsubrow = esubrow.splice(0, 1);

						areainfo = this._adjustMergeArea(headcells, prevbegcol, prevendcol, -1, -1, headbegsubrow, headendsubrow);

						prevbegcol = areainfo.begcol;
						prevendcol = areainfo.endcol;
					}

					if (endrow >= 0) {
						areainfo = this._adjustMergeArea(bodycells, prevbegcol, prevendcol, 0, endrow, bsubrow, esubrow);
					}

					if (areainfo) {
						if (prevbegcol != areainfo.begcol || prevendcol != areainfo.endcol) {
							prevbegcol = areainfo.begcol;
							prevendcol = areainfo.endcol;
							continue;
						}
					}
					break;
				}

				if (areainfo) {
					areainfo.begrow = begrow;
					areainfo.begsubrow = begsubrow;
					areainfo.endsubrow = endsubrow;
				}
			}
		}
		else {
			areainfo = this._adjustRowArea(begrow, endrow);
		}

		this._selectinfo.area[idx] = areainfo;

		var select_area = this._selectinfo.area;
		var select_area_len = select_area.length;

		this._clrMultiSelect();
		var cell_scol, cell_ecol, cell_ssubrow, cell_esubrow;
		var a, j, k;
		var cellsLen;

		if (type == "area") {
			for (a = 0; a < select_area_len; a++) {
				begcol = select_area[a].begcol;
				endcol = select_area[a].endcol;
				begrow = select_area[a].begrow;
				endrow = select_area[a].endrow;
				begsubrow = select_area[a].begsubrow;
				endsubrow = select_area[a].endsubrow;

				this._selectstartrow[a] = begrow;
				this._selectendrow[a] = endrow;
				this._selectstartcol[a] = begcol;
				this._selectendcol[a] = endcol;
				this._selectstartsubrow[a] = begsubrow[0];
				this._selectendsubrow[a] = endsubrow[endsubrow.length - 1];

				for (i = begrow, j = 0; i <= endrow; i++, j++) {
					if (i == -2) {
						cells = summcells;
						cellsLen = summcellslen;
					}
					else if (i == -1) {
						cells = headcells;
						cellsLen = headcellslen;
					}
					else {
						cells = bodycells;
						cellsLen = bodycellslen;
					}

					for (k = 0; k < cellsLen; k++) {
						cell_scol = cells[k]._col;
						cell_ecol = cells[k]._col + cells[k]._colspan - 1;
						cell_ssubrow = cells[k]._row;
						cell_esubrow = cells[k]._row + cells[k]._rowspan - 1;

						if (cell_scol >= begcol && cell_ecol <= endcol && cell_ssubrow >= begsubrow[j] && cell_esubrow <= endsubrow[j]) {
							this._addSelectpos(k, i);
						}
					}
				}
			}
		}
		else {
			for (a = 0; a < select_area_len; a++) {
				begrow = select_area[a].begrow;
				endrow = select_area[a].endrow;

				for (i = begrow, j = 0; i <= endrow; i++, j++) {
					if (i == -2) {
						cellsLen = summcellslen;
					}
					else if (i == -1) {
						cellsLen = headcellslen;
					}
					else {
						cellsLen = bodycellslen;
					}

					if (cellsLen == 0) {
						continue;
					}

					for (k = 0; k < cellsLen; k++) {
						this._addSelectpos(k, i, true);
					}

					this._applySelect(this._selectstartrow, this._selectendrow, i);
				}
			}

			var rows = this._selectinfo.rows;
			rows.sort(function (a, b) {
				return a - b;
			});
		}
	};

	_pGrid._delMultirowSelectInfo = function (row) {
		var area = this._selectinfo.area;
		var area_len = area.length;

		for (var i = 0; i < area_len; i++) {
			if (area[i].begrow == area[i].endrow && area[i].begrow == row) {
				area.splice(i, 1);
				break;
			}
			else if (area[i].begrow == row && area[i].endrow != row) {
				area[i].begrow++;
				break;
			}
			else if (area[i].endrow == row && area[i].begrow != row) {
				area[i].endrow--;
				break;
			}
			else if (area[i].begrow < row && area[i].endrow > row) {
				var endrow = area[i].endrow;
				area[i].endrow = row - 1;
				var newarea = this._adjustRowArea(row + 1, endrow);
				area.splice(i + 1, 0, newarea);
				break;
			}
		}
	};

	_pGrid._delOverSelectInfo = function () {
		var rows = this._selectinfo.rows;
		var max_rowidx = this.rowcount - 1;

		for (var i = rows.length - 1, row, isDeleted; i >= 0; i--) {
			row = rows[i];
			if (row > max_rowidx) {
				isDeleted = true;
				this._delMultirowSelectInfo(row);
				this._delSelectpos(-1, row);
			}
			else {
				break;
			}
		}

		if (isDeleted) {
			this._resetSelectStartEndRow();
			this._defaultSelect();
		}
	};

	_pGrid._adjustRowArea = function (begrow, endrow) {
		return {
			begcol : -1, 
			endcol : -1, 
			begrow : begrow, 
			endrow : endrow, 
			begsubrow : [], 
			endsubrow : []
		};
	};

	_pGrid._adjustMergeArea = function (cells, begcol, endcol, begrow, endrow, begsubrow, endsubrow) {
		var last = endrow - begrow;
		var cells_len = cells.length;
		var cell_scol, cell_ecol, cell_ssubrow, cell_esubrow;
		var update, rows_len = begsubrow.length;

		for (var i = 0; i < cells_len; i++) {
			cell_scol = cells[i]._col;
			cell_ecol = cells[i]._col + cells[i]._colspan - 1;
			cell_ssubrow = cells[i]._row;
			cell_esubrow = cells[i]._row + cells[i]._rowspan - 1;

			update = false;

			for (var j = 0; j < rows_len; j++) {
				if (((begcol <= cell_scol && endcol >= cell_scol) || (begcol <= cell_ecol && endcol >= cell_ecol) || (begcol > cell_scol && endcol < cell_ecol)) && ((begsubrow[j] <= cell_ssubrow && endsubrow[j] >= cell_ssubrow) || (begsubrow[j] <= cell_esubrow && endsubrow[j] >= cell_esubrow) || (begsubrow[j] > cell_ssubrow && endsubrow[j] < cell_esubrow))) {
					if (begcol > cell_scol) {
						begcol = cell_scol;
						update = true;
					}
					if (endcol < cell_ecol) {
						endcol = cell_ecol;
						update = true;
					}

					if (j == 0) {
						if (begsubrow[0] > cell_ssubrow) {
							begsubrow[0] = cell_ssubrow;
							update = true;
						}
					}

					if (j == last) {
						if (endsubrow[last] < cell_esubrow) {
							endsubrow[last] = cell_esubrow;
							update = true;
						}
					}

					if (update == true) {
						i = 0;
						break;
					}
				}
			}
		}

		return {
			begcol : begcol, 
			endcol : endcol, 
			begrow : begrow, 
			endrow : endrow, 
			begsubrow : begsubrow, 
			endsubrow : endsubrow
		};
	};

	_pGrid._defaultSelect = function () {
		this.selectstartrow = this._selectstartrow;
		this.selectstartcol = this._selectstartcol;
		this.selectstartsubrow = this._selectstartsubrow;
		this.selectstartpivot = this._selectstartpvt;
		this.selectendrow = this._selectendrow;
		this.selectendcol = this._selectendcol;
		this.selectendsubrow = this._selectendsubrow;
		this.selectendpivot = this._selectendpvt;

		if (!this.selectstartrow.length) {
			this.selectstartrow = -9;
		}
		if (!this.selectstartcol.length) {
			this.selectstartcol = -1;
		}
		if (!this.selectstartsubrow.length) {
			this.selectstartsubrow = -1;
		}
		if (!this.selectstartpivot.length) {
			this.selectstartpivot = -9;
		}
		if (!this.selectendrow.length) {
			this.selectendrow = -9;
		}
		if (!this.selectendcol.length) {
			this.selectendcol = -1;
		}
		if (!this.selectendsubrow.length) {
			this.selectendsubrow = -1;
		}
		if (!this.selectendpivot.length) {
			this.selectendpivot = -9;
		}
	};

	_pGrid._dsRowToDispRow = function (datasetRowidx, bCalcScroll) {
		var row;
		if (this._hasTree) {
			row = this._getTreeRowPosition(datasetRowidx);
		}
		else {
			row = datasetRowidx;
		}

		if (bCalcScroll) {
			row -= this._getBodyBegRowPos(row);
		}

		return row;
	};

	_pGrid._jumpCurrentRow = function (rowidx) {
		if (rowidx < 0) {
			return this._begrowpos;
		}

		var topPos = this._toprowpos[0];
		var vscroll = this._vscrollmng;
		var page_spos = this._getBodyBegRowPos(rowidx);

		if (this._lbuttondown_proc == false) {
			if (rowidx <= topPos) {
				if (!this._select_noscroll && vscroll) {
					vscroll.setRowPos(rowidx);
				}

				page_spos = this._getBodyBegRowPos(rowidx);
			}
			else if (rowidx > (topPos + this.pagerowcount - 1)) {
				var gap = (this.pagerowcount > 0) ? this._pagerowcnt - this.pagerowcount : 0;

				if (!this._select_noscroll && vscroll) {
					vscroll.setRowPos(rowidx - this._pagerowcnt + 1 + gap);
				}

				page_spos = this._getBodyBegRowPos(rowidx);
			}
			else {
				if (this._isRemainAreaScroll()) {
					if (!this._select_noscroll && vscroll) {
						vscroll.setRowPos(rowidx);
					}

					page_spos = this._getBodyBegRowPos(rowidx);
				}
			}
		}
		return page_spos;
	};

	_pGrid._getBodyBegRowPos = function (rowidx) {
		if (this._fixed_rowcnt > 0) {
			if (this._fixed_endrow >= rowidx) {
				return this._fixed_startrow;
			}

			return this._begrowpos - (this._fixed_rowcnt - this._fixed_startrow);
		}
		return this._begrowpos;
	};

	_pGrid._clearRows = function (oldrows) {
		if (oldrows.length > 0) {
			for (var i = 0, n = oldrows.length; i < n; i++) {
				if (oldrows[i] == -2) {
					this._refreshSumm(true);
				}
				else if (oldrows[i] == -1) {
					this._refreshHead(true);
				}
				else {
					this._refreshBodyRow(oldrows[i] - this._getBodyBegRowPos(oldrows[i]));
				}
			}
			return true;
		}
		return false;
	};

	_pGrid._selectDraw = function (afterCell, afterCol, afterRow, afterSubrow, afterPvt, bDataset, beforeCell, beforeCol, beforeRow, beforeSubrow, beforePvt, bAllRowDraw, oldrows, kind) {
		var oldPos = this._dsRowToDispRow(beforeRow);
		var newPos = this._dsRowToDispRow(afterRow);

		this._setSelectedInfo(null, null, afterRow, null, null);

		var bBodyRowDraw = false;
		var bHeadRowDraw = false;
		var bSummRowDraw = false;
		var exprbindcells = this._getUseBindExprProp("body");
		if (!exprbindcells) {
			exprbindcells = [];
		}

		if (exprbindcells.length) {
			bBodyRowDraw = this._expr_allrow_update_prop || this._expr_allrow_update_style;
		}
		if (this._isUseBindExprStyle("head") || this._getUseBindExprProp("head") || newPos == -1 || oldPos == -1) {
			bHeadRowDraw = true;
		}
		if (this._isUseBindExprStyle("summ") || this._getUseBindExprProp("summ") || newPos == -2 || oldPos == -2) {
			bSummRowDraw = true;
		}

		var i;

		if (this._isSelectRowType()) {
			if (newPos < 0 && (kind && kind.indexOf("func") < 0)) {
				if (bAllRowDraw) {
					if (!this._clearRows(oldrows)) {
						this._refreshBody(true, false);
					}
				}
				else {
					this._refreshBodyRow(oldPos - this._getBodyBegRowPos(oldPos), undefined, undefined, true);

					if (bBodyRowDraw) {
						for (i = 0; i < exprbindcells.length; i++) {
							this._refreshCell("body", exprbindcells[i], undefined, undefined, undefined, true);
						}
					}
				}

				if (bHeadRowDraw) {
					this._refreshHead(true);
				}
				if (bSummRowDraw) {
					this._refreshSumm(true);
				}
			}
			else if (newPos != oldPos) {
				this._jumpCurrentRow(newPos);

				if (this._isMultiSelect()) {
					this._refreshBody(true, !bAllRowDraw);

					if (bHeadRowDraw) {
						this._refreshHead(true);
					}
					if (bSummRowDraw) {
						this._refreshSumm(true);
					}
				}
				else {
					if (bAllRowDraw) {
						if (!this._clearRows(oldrows)) {
							this._refreshBody(true, true);
						}
						else {
							this._refreshBodyRow(newPos - this._getBodyBegRowPos(newPos), undefined, undefined, true);

							if (bBodyRowDraw) {
								for (i = 0; i < exprbindcells.length; i++) {
									this._refreshCell("body", exprbindcells[i], undefined, undefined, undefined, true);
								}
							}
						}
					}
					else {
						this._refreshBodyRow(oldPos - this._getBodyBegRowPos(oldPos), undefined, undefined, true);
						this._refreshBodyRow(newPos - this._getBodyBegRowPos(newPos), undefined, undefined, true);

						if (bBodyRowDraw) {
							for (i = 0; i < exprbindcells.length; i++) {
								this._refreshCell("body", exprbindcells[i], undefined, undefined, undefined, true);
							}
						}
					}

					if (bHeadRowDraw) {
						this._refreshHead(true);
					}
					if (bSummRowDraw) {
						this._refreshSumm(true);
					}
				}
			}
			else {
				if (this._isMultiSelect()) {
					this._refreshBody(true, !bAllRowDraw);

					if (bHeadRowDraw) {
						this._refreshHead(true);
					}
					if (bSummRowDraw) {
						this._refreshSumm(true);
					}
				}
			}
		}
		else {
			if (newPos < 0 && (kind && kind.indexOf("func") < 0)) {
				if (bAllRowDraw) {
					if (!this._clearRows(oldrows)) {
						this._refreshBody(true, false);
					}
				}
				else {
					this._refreshBodyCell(beforeCell, oldPos - this._getBodyBegRowPos(oldPos), true);

					if (bBodyRowDraw) {
						for (i = 0; i < exprbindcells.length; i++) {
							this._refreshCell("body", exprbindcells[i], undefined, undefined, undefined, true);
						}
					}
				}

				if (bHeadRowDraw) {
					this._refreshHead(true);
				}
				if (bSummRowDraw) {
					this._refreshSumm(true);
				}
			}
			else if (newPos != oldPos || afterCell != beforeCell) {
				if (kind != "selectorsizing") {
					this._jumpCurrentRow(newPos);
					var cellobj;

					if (newPos == -1) {
						cellobj = this._getCurrentHeadCell(-1);
					}
					else if (newPos == -2) {
						cellobj = this._getCurrentSummCell(-1);
					}
					else {
						cellobj = this._getCurrentBodyCell(-1, -1);
					}

					if (cellobj) {
						var area = cellobj._refinfo._area;
						var select_ctrl = this._select_ctrl;

						if (select_ctrl && select_ctrl._is_tracking) {
							if (area == "body") {
								cellobj.parent._showfull(cellobj);
							}
							else if (area == "left") {
								if (this._hscrollmng) {
									this._hscrollmng.setPos(0);
								}
							}
							else {
								var scroll_max = this._getScollMaxLeft();

								if (this._hscrollmng) {
									this._hscrollmng.setPos(scroll_max);
								}
							}
						}
						else if (!kind) {
							cellobj.parent._showfull(cellobj);
						}
						else if (kind == "keydown") {
							cellobj._showfull(true);
						}
					}
				}

				if (this._isAreaSelect()) {
					if (kind == "selectorsizing") {
						if (nexacro._OS == "Android" && (nexacro._Browser == "Safari" || nexacro._Browser == "MobileSafari")) {
							nexacro._OnceCallbackTimer.callonce(this, function () {
								this._refreshBody(true, !bAllRowDraw);
							}, 10);
						}
						else {
							this._refreshBody(true, !bAllRowDraw);
						}
					}
					else {
						this._refreshBody(true, !bAllRowDraw);

						if (bHeadRowDraw) {
							this._refreshHead(true);
						}
						if (bSummRowDraw) {
							this._refreshSumm(true);
						}
					}
				}
				else {
					if (bAllRowDraw) {
						this._clearRows(oldrows);
						this._refreshBody(true, !bAllRowDraw);
					}
					else {
						this._refreshBodyCell(beforeCell, oldPos - this._getBodyBegRowPos(oldPos), true);
						this._refreshBodyCell(afterCell, newPos - this._getBodyBegRowPos(newPos), true);

						if (bBodyRowDraw) {
							for (i = 0; i < exprbindcells.length; i++) {
								this._refreshCell("body", exprbindcells[i], undefined, undefined, undefined, true);
							}
						}
					}

					if (bHeadRowDraw) {
						this._refreshHead(true);
					}
					if (bSummRowDraw) {
						this._refreshSumm(true);
					}
				}
			}
			else {
				if (this._isAreaSelect()) {
					if (kind == "selectorsizing") {
						if (nexacro._OS == "Android" && (nexacro._Browser == "Safari" || nexacro._Browser == "MobileSafari")) {
							nexacro._OnceCallbackTimer.callonce(this, function () {
								this._refreshBody(true, !bAllRowDraw);
							}, 10);
						}
						else {
							this._refreshBody(true, !bAllRowDraw);
						}
					}
					else {
						this._refreshBody(true, !bAllRowDraw);

						if (bHeadRowDraw) {
							this._refreshHead(true);
						}
						if (bSummRowDraw) {
							this._refreshSumm(true);
						}
					}
				}
				else if (this._isMultiSelect()) {
					if (bAllRowDraw) {
						this._clearRows(oldrows);
						this._refreshBody(true, !bAllRowDraw);
					}
					else {
						this._refreshBodyCell(afterCell, newPos - this._getBodyBegRowPos(newPos), true);

						if (bBodyRowDraw) {
							for (i = 0; i < exprbindcells.length; i++) {
								this._refreshCell("body", exprbindcells[i], undefined, undefined, undefined, true);
							}
						}
					}

					if (bHeadRowDraw) {
						this._refreshHead(true);
					}
					if (bSummRowDraw) {
						this._refreshSumm(true);
					}
				}
			}
		}

		this._adjustOverlayControls(false);
		this._updateSelector();
		this._applySelection();
	};

	_pGrid.redrawExprCell = function (band) {
		var exprbindcells;
		var i;

		if (!band) {
			if (exprbindcells = this._getUseBindExprFullProp("head")) {
				for (i = 0; i < exprbindcells.length; i++) {
					this._refreshCell("head", exprbindcells[i]);
				}
			}
			if (exprbindcells = this._getUseBindExprFullProp("body")) {
				for (i = 0; i < exprbindcells.length; i++) {
					this._refreshCell("body", exprbindcells[i]);
				}
			}
			if (exprbindcells = this._getUseBindExprFullProp("summary")) {
				for (i = 0; i < exprbindcells.length; i++) {
					this._refreshCell("summary", exprbindcells[i]);
				}
			}
		}
		else {
			switch (band) {
				case "head":
				case "body":
				case "summary":
					if (exprbindcells = this._getUseBindExprFullProp(band)) {
						for (i = 0; i < exprbindcells.length; i++) {
							this._refreshCell(band, exprbindcells[i]);
						}
					}
					break;
			}
		}
	};

	_pGrid._isUseBindExprStyle = function (bandstr) {
		if (this._is_use_bind_expr_style[bandstr] !== null) {
			return this._is_use_bind_expr_style[bandstr];
		}

		var retn = this._is_use_bind_expr_style[bandstr] = !!this._getUseBindExprProp(bandstr, "cssclass");

		if (bandstr == "body" && retn) {
			this._expr_allrow_update_style = true;
		}

		return !!retn;
	};

	_pGrid._getUseBindExprProp = function (bandstr, propname) {
		var band;
		var cells;
		var format = this._curFormat;

		if (!format) {
			return null;
		}

		if (bandstr == "summary") {
			bandstr = "summ";
		}

		if (!propname) {
			if (this._use_bind_expr_cells[bandstr] !== null) {
				return this._use_bind_expr_cells[bandstr];
			}

			this._use_bind_expr_cells[bandstr] = undefined;
		}

		if (bandstr == "body") {
			band = this._bodyBand;
			cells = format._bodycells;
		}
		else if (bandstr == "head") {
			band = this._headBand;
			cells = format._headcells;
		}
		else {
			band = this._summBand;
			cells = format._summcells;
		}

		if (!cells) {
			return null;
		}

		var i, j, n, nn;

		if (band) {
			var key, property_map;

			if (propname) {
				var retn = [];

				for (i = 0, n = cells.length; i < n; i++) {
					if (cells[i][propname] && cells[i][propname]._bindtype > 0) {
						retn.push(i);
					}
				}

				if (retn.length > 0) {
					return retn;
				}
				else {
					return undefined;
				}
			}
			else {
				if (bandstr == "body") {
					for (i = 0, n = cells.length; i < n; i++) {
						property_map = cells[i]._property_map;

						for (j = 0, nn = property_map.length; j < nn; j++) {
							key = property_map[j][nexacro._CELLINFO_PMAP_PROPNAME];

							if (cells[i][key] && (cells[i][key]._bindtype == 2 || (key == "expr" && cells[i][key]._value))) {
								this._expr_allrow_update_prop = true;

								if (property_map[j][nexacro._CELLINFO_PMAP_STYLE] == true) {
									this._is_use_bind_expr_style["body"] = true;
									this._expr_allrow_update_style = true;

									if (this.cellexprupdatecondition != "all") {
										continue;
									}
								}
								else {
									if (this.cellexprupdatecondition == "none") {
										continue;
									}
									if (this.cellexprupdatecondition == "celltext" && key != "text" && key != "expr") {
										continue;
									}
								}

								if (this._use_bind_expr_cells["body"] == undefined) {
									this._use_bind_expr_cells["body"] = [];
								}

								this._use_bind_expr_cells["body"].push(i);
								break;
							}
						}
					}
				}
				else {
					for (i = 0, n = cells.length; i < n; i++) {
						property_map = cells[i]._property_map;

						for (j = 0, nn = property_map.length; j < nn; j++) {
							key = property_map[j][nexacro._CELLINFO_PMAP_PROPNAME];

							if (cells[i][key] && (cells[i][key]._bindtype > 0 || key == "expr")) {
								if (property_map[j][nexacro._CELLINFO_PMAP_STYLE] == true) {
									this._is_use_bind_expr_style[bandstr] = true;
								}

								if (this._use_bind_expr_cells[bandstr] == undefined) {
									this._use_bind_expr_cells[bandstr] = [];
								}

								this._use_bind_expr_cells[bandstr].push(i);
								break;
							}
						}
					}
				}
			}
		}
		return this._use_bind_expr_cells[bandstr];
	};

	_pGrid._getUseBindExprFullProp = function (bandstr) {
		var band;
		var cells;
		var format = this._curFormat;

		if (!format) {
			return null;
		}

		if (bandstr == "summary") {
			bandstr = "summ";
		}

		if (bandstr == "body") {
			band = this._bodyBand;
			cells = format._bodycells;
		}
		else if (bandstr == "head") {
			band = this._headBand;
			cells = format._headcells;
		}
		else {
			band = this._summBand;
			cells = format._summcells;
		}

		var _use_bind_expr_cells = [];
		var i, j, n, nn;

		if (band) {
			var key, property_map;

			if (bandstr == "body") {
				for (i = 0, n = cells.length; i < n; i++) {
					property_map = cells[i]._property_map;

					for (j = 0, nn = property_map.length; j < nn; j++) {
						key = property_map[j][nexacro._CELLINFO_PMAP_PROPNAME];

						if (cells[i][key] && (cells[i][key]._bindtype == 2 || key == "expr")) {
							_use_bind_expr_cells.push(i);
							break;
						}
					}
				}
			}
			else {
				for (i = 0, n = cells.length; i < n; i++) {
					property_map = cells[i]._property_map;

					for (j = 0, nn = property_map.length; j < nn; j++) {
						key = property_map[j][nexacro._CELLINFO_PMAP_PROPNAME];

						if (cells[i][key] && (cells[i][key]._bindtype > 0 || key == "expr")) {
							_use_bind_expr_cells.push(i);
							break;
						}
					}
				}
			}
		}

		return _use_bind_expr_cells;
	};

	_pGrid._clearBindTypeFlag = function () {
		this._use_bind_expr_cells.body = null;
		this._use_bind_expr_cells.head = null;
		this._use_bind_expr_cells.summ = null;
		this._is_use_bind_expr_style.body = null;
		this._is_use_bind_expr_style.head = null;
		this._is_use_bind_expr_style.summ = null;
		this._expr_allrow_update_prop = false;
		this._expr_allrow_update_style = false;
		this._flush_cell_oldrow = undefined;
		this._flush_cell_oldcell = undefined;
	};

	_pGrid._toggleVal = function (datarow, cellinfo) {
		if (!cellinfo) {
			return false;
		}

		var v = cellinfo._getValue(datarow);
		var truevalue = cellinfo._getAttrValue(cellinfo["checkboxtruevalue"], datarow);
		if (truevalue !== null && truevalue != undefined) {
			truevalue = truevalue.toString();
		}
		var falsevalue = cellinfo._getAttrValue(cellinfo["checkboxfalsevalue"], datarow);
		if (falsevalue !== null && falsevalue != undefined) {
			falsevalue = falsevalue.toString();
		}
		var ischecked;
		if (truevalue != null) {
			if (falsevalue != null) {
				if (v === falsevalue || v === undefined) {
					ischecked = false;
				}
				else if (v === truevalue) {
					ischecked = true;
				}
			}
			else {
				if (v === truevalue) {
					ischecked = true;
				}
				else {
					ischecked = false;
				}
			}
		}
		else {
			if (falsevalue != null) {
				if (v === this.falsevalue) {
					ischecked = false;
				}
				else {
					ischecked = true;
				}
			}
			else {
				ischecked = nexacro._toBoolean(v);
			}
		}
		if (ischecked) {
			v = nexacro._isNull(falsevalue) ? 0 : falsevalue;
		}
		else {
			v = nexacro._isNull(truevalue) ? 1 : truevalue;
		}


		if (cellinfo.text._bindtype == 1) {
			this._dsEventOccured = true;
			var retn = this._binddataset.setColumn(datarow, cellinfo.text._bindexpr, v);
			if (nexacro._enableaccessibility) {
				var cellobj = this._getAccessibilityCurrentCell();
				if (cellobj) {
					cellobj._setAccessibilityStatChecked(nexacro._toBoolean(v));
				}
			}
			this._dsEventOccured = false;
			return retn;
		}
		return false;
	};

	_pGrid._isEditorKeyAction = function (elem, comp, keyCode, altKey, ctrlKey, shiftKey, metaKey) {
		if (this._is_editor_keyaction == false) {
			this._is_editor_keyaction = true;
			return true;
		}

		if (!this._showEditing) {
			return false;
		}

		if (elem.isInputElement()) {
			var pos;
			var elem_val;
			var v;
			var line;

			if (elem.readonly == true) {
				return false;
			}

			if (keyCode == nexacro.Event.KEY_LEFT) {
				if (ctrlKey || shiftKey || altKey || metaKey) {
					return true;
				}

				pos = elem.getElementCaretPos();
				elem_val = elem.getElementValue();
				v = elem_val ? elem_val.length : 0;

				if (this._rtl) {
					if ((pos && pos != -1) && pos.begin != v) {
						return true;
					}
				}
				else {
					if ((pos && pos != -1) && pos.begin != 0) {
						return true;
					}
				}
			}
			else if (keyCode == nexacro.Event.KEY_RIGHT) {
				if (ctrlKey || shiftKey || altKey || metaKey) {
					return true;
				}

				pos = elem.getElementCaretPos();
				elem_val = elem.getElementValue();
				v = elem_val ? elem_val.length : 0;

				if (this._rtl) {
					if ((pos && pos != -1) && pos.begin != 0) {
						return true;
					}
				}
				else {
					if ((pos && pos != -1) && pos.begin != v) {
						return true;
					}
				}
			}
			else if (keyCode == nexacro.Event.KEY_UP) {
				if (ctrlKey || shiftKey || altKey || metaKey) {
					return true;
				}

				if (elem.usemultiline) {
					line = elem.getElementCaretLine();

					if (line != 1) {
						return true;
					}
				}
			}
			else if (keyCode == nexacro.Event.KEY_DOWN) {
				if (ctrlKey || shiftKey || altKey || metaKey) {
					return true;
				}

				if (elem.usemultiline) {
					line = elem.getElementCaretLine();

					comp = elem.parent.linkedcontrol;
					var max_line = parseInt(comp._getLineCount());

					if (line != max_line) {
						return true;
					}
				}
			}
		}
		return false;
	};

	_pGrid._getDlgCode = function (keycode, altKey, ctrlKey, shiftKey, metaKey) {
		if (nexacro._enableaccessibility && nexacro._accessibilitytype == 5) {
			this._accept_arrow = true;
		}
		return {
			want_tab : this._acceptstab, 
			want_return : false, 
			want_escape : false, 
			want_chars : false, 
			want_arrows : this._accept_arrow
		};
	};

	_pGrid._getFirstEditableCell = function () {
		var editType;

		if (this._binddataset && this._curFormat && this._curFormat._bodycells) {
			var rlen = this._getGridRowCount();
			var clen = this._curFormat._bodycells.length;

			for (var i = 0; i < rlen; i++) {
				for (var j = 0; j < clen; j++) {
					var row = i;
					if (this._hasTree) {
						row = this._treeIndexes[row];
					}

					editType = this._curFormat._bodycells[j]._getEdittype(row);

					if (editType !== "" && editType !== "none") {
						return {
							row : row, 
							cell : j
						};
					}
				}
			}
		}
		return {
			row : null, 
			cell : null
		};
	};

	_pGrid._getLastEditableCell = function () {
		var editType;

		if (this._binddataset) {
			var rlen = this._getGridRowCount();
			var clen = this._curFormat._bodycells.length;
			for (var i = rlen - 1; i >= 0; i--) {
				for (var j = clen - 1; j >= 0; j--) {
					var row = i;
					if (this._hasTree) {
						row = this._treeIndexes[row];
					}

					editType = this._curFormat._bodycells[j]._getEdittype(row);

					if (editType !== "" && editType !== "none") {
						return {
							row : row, 
							cell : j
						};
					}
				}
			}
		}
		return {
			row : null, 
			cell : null
		};
	};

	_pGrid._isChar = function (keyCode) {
		switch (keyCode) {
			case 9:
			case 25:
			case 27:
			case 144:
			case 145:
				return false;
				break;
		}

		if ((keyCode >= 16 && keyCode <= 21) || (keyCode >= 33 && keyCode <= 40) || (keyCode >= 91 && keyCode <= 93) || (keyCode >= 112 && keyCode <= 123)) {
			return false;
		}

		return true;
	};

	_pGrid._on_apply_cell_status = function (cellobj, status, value, rowstatus) {
		if (this.enableredraw) {
			if (rowstatus == undefined) {
				rowstatus = this._isSelectRowType();

				if (status == "mouseover") {
					if (this.mouseovertype == "cell") {
						rowstatus = false;
					}
					else if (this.mouseovertype == "row") {
						rowstatus = true;
					}
				}
			}

			if (rowstatus) {
				var rowobj = cellobj._getRowControl();
				var cells = rowobj._cells;

				for (var i = 0, n = cells.length; i < n; i++) {
					cells[i]._rowstatuschange = true;
					cells[i]._changeStatus(status, value);
					cells[i]._rowstatuschange = null;
				}
			}
			else {
				cellobj._rowstatuschange = true;
				cellobj._changeStatus(status, value);
				cellobj._rowstatuschange = null;
			}
		}
	};

	_pGrid._setDSEventHandlers = function (ds) {
		ds._setEventHandler("onload", this.on_dsnotify_onload, this);
		ds._setEventHandler("onrowposchanged", this.on_dsnotify_onrowposchanged, this);
		ds._setEventHandler("oncolumnchanged", this.on_dsnotify_oncolumnchanged, this);
		ds._setEventHandler("onrowsetchanged", this.on_dsnotify_onrowsetchanged, this);
	};

	_pGrid._removeDSEventHandlers = function (ds) {
		ds._removeEventHandler("onload", this.on_dsnotify_onload, this);
		ds._removeEventHandler("onrowposchanged", this.on_dsnotify_onrowposchanged, this);
		ds._removeEventHandler("oncolumnchanged", this.on_dsnotify_oncolumnchanged, this);
		ds._removeEventHandler("onrowsetchanged", this.on_dsnotify_onrowsetchanged, this);
	};

	_pGrid._getBodyClientSize = function () {
		var format = this._curFormat;
		var height = 0, width = 0, clientrect;
		clientrect = this._getAvailableRect(this);
		width = clientrect.width;
		height = clientrect.height;

		if (format) {
			if (!this._bodyBand) {
				clientrect = this._getAvailableRect(this);
				width = clientrect.width - format.leftWidth - format.rightWidth;
				height = clientrect.height - this._getHeadHeight() - this._getSummHeight();
			}
			else {
				clientrect = this._getAvailableRect(this._bodyBand);
				width = clientrect.width - format.leftWidth - format.rightWidth;
				height = clientrect.height;
			}
		}
		return [width, height];
	};

	_pGrid._applyAutofittype = function (redraw, property_set) {
		if (this.enableredraw == false) {
			this._enable_redraw_history.autofit = [redraw, property_set];
			return;
		}

		var format = this._curFormat;
		var control_elem = this.getElement();

		if (!format || !control_elem) {
			return;
		}

		var width;
		var height;
		var bodysize = this._getBodyClientSize();

		width = bodysize[0];
		height = bodysize[1];

		if (!this._is_created && (width <= 0 || height <= 0)) {
			width = control_elem.client_width;
		}

		var change = false;

		switch (this.autofittype) {
			case "col":
				this._colautofit = true;
				this._rowautofit = false;
				break;
			case "row":
				this._colautofit = false;
				this._rowautofit = true;
				break;
			case "both":
				this._colautofit = true;
				this._rowautofit = true;
				break;
			case "allrow":
				this._colautofit = false;
				break;
			case "allboth":
				this._colautofit = true;
				break;
			case "col,allrow":
				this._colautofit = true;
				break;
			case "allpivot":
				this._colautofit = true;
				break;
			case "row,allpivot":
				this._colautofit = false;
				break;
			case "none":
				this._colautofit = false;
				this._rowautofit = false;
				change = property_set;
				break;
		}

		if (this._colautofit && width >= 0) {
			change = format._adjustColWidth(width, this._autofitcol_rate);
		}

		if (change) {
			if (redraw) {
				if (this.autosizingtype != "none") {
					this._autofiting = true;
					this._recreate_contents_all(true, false);
					this._autofiting = false;
				}
				else {
					this._autofiting = true;

					if (this._bodyBand) {
						var scrollheight = this._bodyBand._scrollHeight;
						var scrollwidth = this._bodyBand._scrollWidth;

						if (this._colautofit) {
							if (width != scrollwidth) {
								this._setScrollMaxSize(width, scrollheight);
								this._bodyBand._scrollWidth = width;
							}
							this._bodyBand._matrix._adjustColsDisplay(true, true);
						}
						else {
							this._setScrollMaxSize(format.bodyWidth, scrollheight);
							this._bodyBand._scrollWidth = format.bodyWidth;
							this._bodyBand._matrix._adjustColsDisplay(true);
						}
					}
					if (this._headBand) {
						this._headBand._matrix._adjustColsDisplay(true);
					}
					if (this._summBand) {
						this._summBand._matrix._adjustColsDisplay(true);
					}

					this._autofiting = false;
					this._onResetScrollBar();
				}
			}
			this._applyResizer();
			return true;
		}
		return false;
	};

	_pGrid._resetColSizeList = function (chk_srow) {
		var change = false;

		if (this.autofittype != "col" && this.autofittype != "both" && this.autofittype != "allboth" && this.autofittype != "col,allrow") {
			var format = this._curFormat;

			if (!format) {
				return false;
			}

			var i, size, cols = format._cols, colsLen = cols.length;

			if (this.autosizingtype == "col" || this.autosizingtype == "both") {
				for (i = 0; i < colsLen; i++) {
					size = this._getMaxColDataSizeBand(i, chk_srow);

					if (size >= 0 && this._setColSize(-9, i, size, false, false, true, (i != colsLen - 1))) {
						change = true;
					}
				}

				if (this.autofittype == "col" || this.autofittype == "both" || this.autofittype == "allboth" || this.autofittype == "col,allrow") {
					this._applyAutofittype(true);
				}
			}
			else {
				for (i = 0; i < colsLen; i++) {
					size = cols[i].size;

					if (size >= 0 && this._setColSize(-9, i, size, false, false, true, (i != colsLen - 1))) {
						change = true;
					}
				}
			}
		}

		return change;
	};

	_pGrid.redraw = function () {
		if (!this.enableredraw) {
			this._enable_redraw_history.recreate = true;
			return;
		}

		this._recreate();

		if (this._select_ctrl) {
			this._select_ctrl._updateAll();
		}
	};

	_pGrid._getRowSizeInfo = function (datarow) {
		var format = this._curFormat;
		var rowsize, subrowsizes = [];

		if (datarow == -1) {
			rowsize = this._rowHeadList[0];
			subrowsizes = this._rowHeadListSub;

			return {
				row_size : rowsize, 
				subrow_sizes : subrowsizes
			};
		}
		else if (datarow == -2) {
			rowsize = this._rowSummList[0];
			subrowsizes = this._rowSummListSub;

			return {
				row_size : rowsize, 
				subrow_sizes : subrowsizes
			};
		}
		else if (datarow >= 0) {
			var rows = format._bodyrows;
			var rowsLen = rows.length;
			var list = this._rowSizeListSub = [];
			var listsub = this._rowSizeList = [];

			rowsize = list[datarow];

			for (var i = 0; i < rowsLen; i++) {
				subrowsizes[i] = listsub[datarow *  rowsLen + i];
			}

			return {
				row_size : rowsize, 
				subrow_sizes : subrowsizes
			};
		}
		return null;
	};

	_pGrid._resetRowSizeList = function (chk_srow) {
		if (!this._curFormat) {
			return;
		}

		var noauto = false;

		if (this.autosizingtype != "none" && !this._preloadImage()) {
			noauto = true;
		}

		var format = this._curFormat;
		var keep;
		var i, j;
		var rows;
		var rowsLen;
		var height, h;

		if (format._headrows) {
			keep = this._isUserChangeHeadRowSize;

			if (!keep) {
				this._rowHeadListSub = [];
				this._rowHeadList = [];
			}

			rows = format._headrows;
			rowsLen = rows.length;
			h = 0;

			var _rowHeadListSub = this._rowHeadListSub, _rowHeadList = this._rowHeadList;

			if (!(keep && _rowHeadList[0] >= 0)) {
				if (!noauto && this._binddataset && this._headAutoSize && (this._autoSizeRowProc || this.autosizingtype == "row" || this.autosizingtype == "both")) {
					for (j = 0; j < rowsLen; j++) {
						height = this._getMaxSubRowSize(-1, j);
						_rowHeadListSub[j] = height;
						h += height;
					}
				}
				else {
					for (j = 0; j < rowsLen; j++) {
						height = rows[j].size;
						_rowHeadListSub[j] = height;
						h += height;
					}
				}
				this._rowHeadList[0] = h;
			}
		}

		if (format._summrows) {
			keep = this._isUserChangeSummRowSize;

			if (!keep) {
				this._rowSummListSub = [];
				this._rowSummList = [];
			}
			rows = format._summrows;
			rowsLen = rows.length;
			h = 0;

			var _rowSummListSub = this._rowSummListSub, _rowSummList = this._rowSummList;

			if (!(keep && _rowSummList[0] >= 0)) {
				if (!noauto && this._binddataset && this._summAutoSize && (this._autoSizeRowProc || this.autosizingtype == "row" || this.autosizingtype == "both")) {
					for (j = 0; j < rowsLen; j++) {
						height = this._getMaxSubRowSize(-2, j);
						_rowSummListSub[j] = height;
						h += height;
					}
				}
				else {
					for (j = 0; j < rowsLen; j++) {
						height = rows[j].size;
						_rowSummListSub[j] = height;
						h += height;
					}
				}
				this._rowSummList[0] = h;
			}
		}

		if (format._bodyrows) {
			keep = this._isUserChangeBodyRowSize;

			if (!keep && !chk_srow) {
				this._rowSizeList = [];
				this._rowSizeListSub = [];
			}

			rows = format._bodyrows;
			rowsLen = rows.length;

			var rowcount = this._rowcount, _rowSizeListSub = this._rowSizeListSub, _rowSizeList = this._rowSizeList;

			chk_srow = !chk_srow ? 0 : chk_srow;

			if (!noauto && this._binddataset && this._bodyAutoSize && (this._autoSizeRowProc || this.autosizingtype == "row" || this.autosizingtype == "both")) {
				for (i = chk_srow; i < rowcount; i++) {
					if (keep) {
						if (_rowSizeList[i] >= 0) {
							continue;
						}
					}

					h = 0;
					for (j = 0; j < rowsLen; j++) {
						height = this._getMaxSubRowSize(i, j);
						_rowSizeListSub[i *  rowsLen + j] = height;
						h += height;
					}
					_rowSizeList[i] = h;
				}
				this._is_variable_bodyrowsize = true;
			}
			else {
				for (i = chk_srow; i < rowcount; i++) {
					if (keep) {
						if (_rowSizeList[i] >= 0) {
							continue;
						}
					}

					h = 0;
					for (j = 0; j < rowsLen; j++) {
						height = rows[j].size;
						_rowSizeListSub[i *  rowsLen + j] = height;
						h += height;
					}
					_rowSizeList[i] = h;
				}

				if (!keep) {
					this._is_variable_bodyrowsize = false;
				}
			}
		}

		this._updateRowSizeExtend();
	};

	_pGrid._updateRowSizeExtendEx = function (rows, rowSizeList, rowSizeListSub, row, isbody) {
		if (this.extendsizetype != "row" && this.extendsizetype != "both") {
			if (!rows) {
				return;
			}

			var max = [];
			var rowsLen = rows.length;
			var i, j;

			for (j = 0; j < rowsLen; j++) {
				max[j] = 0;
			}

			var rowSizeListSubLen = rowSizeListSub.length;

			if (row != undefined) {
				for (i = 0; i < rowsLen; i++) {
					max[i] = rowSizeListSub[row *  rowsLen + i];
				}
			}
			else {
				for (i = 0; i < rowSizeListSubLen; ) {
					for (j = 0; j < rowsLen; j++) {
						max[j] = Math.max(max[j], rowSizeListSub[i]);
						i++;
					}
				}
			}
			for (i = 0; i < rowSizeListSubLen; ) {
				for (j = 0; j < rowsLen; j++) {
					rowSizeListSub[i] = max[j];
					i++;
				}
			}
			var height = 0;

			for (j = 0; j < rowsLen; j++) {
				height += max[j];
			}

			var rowSizeListLen = rowSizeList.length;

			for (i = 0; i < rowSizeListLen; i++) {
				rowSizeList[i] = height;
			}
		}

		if (isbody) {
			this._resetFixSize();
		}
	};

	_pGrid._updateRowSizeExtend = function () {
		if (!this._binddataset || !this._curFormat) {
			return;
		}
		if (this._headAutoSize) {
			this._updateRowSizeExtendEx(this._curFormat._headrows, this._rowHeadList, this._rowHeadListSub);
		}
		if (this._summAutoSize) {
			this._updateRowSizeExtendEx(this._curFormat._summrows, this._rowSummList, this._rowSummListSub);
		}
		if (this._bodyAutoSize) {
			this._updateRowSizeExtendEx(this._curFormat._bodyrows, this._rowSizeList, this._rowSizeListSub, undefined, true);
		}
	};

	_pGrid._isChangeBodyColSizeList = function (columnid, cols, row) {
		if (this.autosizingtype != "both" && this.autosizingtype != "col") {
			return false;
		}

		var format = this._curFormat;
		if (!this._binddataset || !format) {
			return false;
		}

		var cells = format._bodycells;
		var colinfo, col, size, j = 0;
		var retn = false;
		var displayType;

		for (var i = 0, n = cells.length; i < n; i++) {
			if (cells[i].text._bindexpr == columnid) {
				displayType = cells[i]._getDisplayTypeValue(row);

				if (displayType == "checkboxcontrol") {
					continue;
				}

				col = cells[i]._col;
				colinfo = format._cols[col];
				size = this._getMaxColDataSizeBand(col);

				if (colinfo.size != size) {
					format._setColSize(col, size);
					cols[j++] = col;
					retn = true;
				}
			}
		}
		return retn;
	};

	_pGrid._isChangeBodyRowSizeList = function (rowposition) {
		if (this._rowSizeEx == false && this.autosizingtype != "both" && this.autosizingtype != "row") {
			return false;
		}

		if (!this._binddataset || !this._curFormat) {
			return false;
		}

		var row = rowposition;
		var rows = this._curFormat._bodyrows;
		var rowsLen;
		var oldsize;
		var newsize;
		var j;

		if (rows && this._bodyAutoSize == true) {
			rowsLen = rows.length;
			for (j = 0; j < rowsLen; j++) {
				var index = (row *  rows.length) + j;
				oldsize = this._rowSizeListSub[index];
				newsize = this._getMaxSubRowSize(row, j);

				if (oldsize != newsize) {
					return true;
				}
			}
		}

		rows = this._curFormat._headrows;

		if (rows && this._headAutoSize == true) {
			rowsLen = rows.length;

			for (j = 0; j < rowsLen; j++) {
				oldsize = this._rowHeadListSub[j];
				newsize = this._getMaxSubRowSize(-1, j);

				if (oldsize != newsize) {
					return true;
				}
			}
		}

		rows = this._curFormat._summrows;

		if (rows && this._summAutoSize == true) {
			rowsLen = rows.length;

			for (j = 0; j < rowsLen; j++) {
				oldsize = this._rowSummListSub[j];
				newsize = this._getMaxSubRowSize(-2, j);

				if (oldsize != newsize) {
					return true;
				}
			}
		}
		return false;
	};

	_pGrid._updateBodyRowSizeList = function (rowposition) {
		var change = false;
		if (this._rowSizeEx == false || this._bodyAutoSize == false) {
			return false;
		}

		if (!this._binddataset || !this._curFormat || !this._curFormat._bodyrows || this._curFormat._bodyrows.length == 0) {
			return false;
		}

		var row = rowposition;
		var rows = this._curFormat._bodyrows;
		var rowsLen = rows.length;

		for (var j = 0; j < rowsLen; j++) {
			var index = (row *  rows.length) + j;
			var oldsize = this._rowSizeListSub[index];
			var newsize = this._getMaxSubRowSize(row, j);

			if (oldsize != newsize) {
				this._rowSizeListSub[index] = newsize;
				this._rowSizeList[row] += (newsize - oldsize);
				change = true;
			}
		}
		if (change == true) {
			this._updateRowSizeExtend();
		}
		return change;
	};

	_pGrid._getGridRowCount = function (isOnlyScreen) {
		if (isOnlyScreen && this._bodyrowheight === 0) {
			return 0;
		}

		var rowcount = 0;
		if (this._hasTree) {
			if (this._treeIndexes) {
				rowcount = this._treeIndexes.length;
			}
		}
		else {
			rowcount = this._rowcount;
		}
		return rowcount;
	};

	_pGrid._resetDisplayInfo = function (reset_bandsize) {
		this.pagerowcount = 0;
		this._pagerowcnt = 0;
		this._disprowcnt = 0;

		var format = this._curFormat;

		if (!format) {
			return;
		}

		var bodysize = this._getBodyClientSize();
		var bodyHeight = bodysize[1];
		var rowcount = this._getGridRowCount();
		var _vpos;

		this._bodyrowheight = format._body_height;

		if (this._bodyrowheight > 0) {
			if (this._is_variable_bodyrowsize == false || rowcount == 0) {
				var bodyRowHeight = this._bodyrowheight;
				this.pagerowcount = Math.floor(bodyHeight / bodyRowHeight);
				this._pagerowcnt = Math.ceil((bodyHeight + (bodyRowHeight - 0.1)) / bodyRowHeight);
			}
			else {
				_vpos = (this._vscrollmng) ? this._vscrollmng._pos : 0;
				var vlimit = this._control_element.vscroll_limit;

				if (_vpos < 0) {
					_vpos = 0;
				}
				else if (_vpos > vlimit) {
					_vpos = vlimit;
				}

				var s, i, toprowpos = this._getScreenTopRowPos(_vpos);
				var remain;

				s = i = toprowpos[0];
				remain = toprowpos[1];

				var row = this._getDataRow(i);
				var h = 0 - (this._rowSizeList[row] - remain);

				for (; i < rowcount; i++) {
					row = this._getDataRow(i);
					h += this._rowSizeList[row];

					this._pagerowcnt++;

					if (h >= bodyHeight) {
						break;
					}

					this.pagerowcount++;
				}

				if (i == rowcount && h < bodyHeight) {
					var end = (this._fixed_endrow >= 0) ? this._fixed_endrow : -1;
					for (i = s - 1; i > end; i--) {
						row = this._getDataRow(i);
						h += this._rowSizeList[row];

						this._pagerowcnt++;

						if (h >= bodyHeight) {
							break;
						}

						this.pagerowcount++;
					}
				}

				while (h < bodyHeight) {
					h += this._bodyrowheight;
					this._pagerowcnt++;

					if (h >= bodyHeight) {
						break;
					}

					this.pagerowcount++;
				}

				if (this._pagerowcnt == 0 && toprowpos[1] >= bodyHeight) {
					this._pagerowcnt = this.pagerowcount = 1;
				}
			}
			this._disprowcnt = this._pagerowcnt;
		}
	};

	_pGrid._createTempCell = function (cellidx, rowidx, parent_cellinfo) {
		var cellinfos = this._getCellinfos(rowidx);
		if (!cellinfos) {
			return;
		}

		var bandid = this._getBandId(rowidx);
		var gridrow = this._getGridRow(rowidx);

		var band_control = this._style_tempband[bandid];
		if (!band_control) {
			band_control = this._style_tempband[bandid] = new nexacro.Component(bandid, 0, -10, 0, 0, null, null, null, null, null, null, this);
			band_control._skip_mobile_tabfocus = true;
			band_control._is_subcontrol = true;
			band_control._type_name = nexacro._GridBandControl.prototype._type_name;
			band_control.createComponent(true);

			band_control._org_on_destroy_contents = band_control.on_destroy_contents;
			band_control.on_destroy_contents = function () {
				this._org_on_destroy_contents();

				this._stylerow.destroy();
				this._stylerow = null;
			};
		}

		if (this._is_created && !band_control._is_created) {
			band_control.on_created();
		}

		var row_control = band_control._stylerow;
		if (!row_control) {
			row_control = band_control._stylerow = new nexacro._GridRowControl(band_control, 0, -10, 0, 0, gridrow, true);
			row_control._style_evecells = [];
			row_control._style_oddcells = [];
			row_control.createComponent(true);

			if (this._is_created) {
				row_control.on_created();
			}

			row_control._org_on_destroy_contents = row_control.on_destroy_contents;
			row_control.on_destroy_contents = function () {
				this._org_on_destroy_contents();
				var i, n;

				for (i = 0, n = this._style_evecells.length; i < n; i++) {
					if (this._style_evecells[i]) {
						this._style_evecells[i].destroy();
						this._style_evecells[i] = null;
					}
				}

				for (i = 0, n = this._style_oddcells.length; i < n; i++) {
					if (this._style_oddcells[i]) {
						this._style_oddcells[i].destroy();
						this._style_oddcells[i] = null;
					}
				}

				this._style_evecells = null;
				this._style_oddcells = null;
			};
		}
		else if (row_control._rowidx != gridrow) {
			if (this._is_created && !row_control._is_created) {
				row_control.on_created();
			}

			row_control._changeRow(gridrow);
			row_control._updateAll();
		}

		var cell_control_idx = parent_cellinfo ? parent_cellinfo._cellidx : cellidx;
		var cell_control = (gridrow % 2) ? row_control._style_oddcells[cell_control_idx] : row_control._style_evecells[cell_control_idx];
		if (!cell_control) {
			cell_control = new nexacro._GridCellControl("tempcell", 0, -10, 0, 0, null, null, row_control, cellinfos[cell_control_idx], gridrow, cell_control_idx);
			cell_control.createComponent(true);
			(gridrow % 2) ? row_control._style_oddcells[cell_control_idx] = cell_control : row_control._style_evecells[cell_control_idx] = cell_control;
		}

		var subcell_control = cell_control.subcells[cell_control_idx];
		if (!subcell_control) {
			if (parent_cellinfo) {
				subcell_control = new nexacro._GridSubCellControl("tempcell_sub", 0, -10, 0, 0, null, null, cell_control, cellinfos[cell_control_idx], gridrow, cell_control_idx);
				subcell_control.parentcell = cell_control;
				subcell_control.createComponent(true);

				cell_control.subcells[cell_control_idx] = subcell_control;
			}
		}
	};

	_pGrid._getTempCell = function (cellidx, rowidx, parent_cellinfo, autosizing, prop) {
		var bandid = this._getBandId(rowidx);
		var gridrow = this._getGridRow(rowidx);

		var band_control = this._style_tempband[bandid];
		if (band_control) {
			var row_control = band_control._stylerow;
			if (row_control) {
				var cell_control_idx = parent_cellinfo ? parent_cellinfo._cellidx : cellidx;
				var cell_control = (gridrow % 2) ? row_control._style_oddcells[cell_control_idx] : row_control._style_evecells[cell_control_idx];

				if (autosizing) {
					cell_control._updateAllEx(prop);
				}
				else {
					cell_control._updateAll();
				}

				if (parent_cellinfo) {
					var subcell_control = cell_control.subcells[cell_control_idx];
					return {
						cell : cell_control, 
						subcell : subcell_control
					};
				}
				else {
					return {
						cell : cell_control, 
						subcell : null
					};
				}
			}
		}

		return {
			cell : null, 
			subcell : null
		};
	};

	_pGrid._getCellinfos = function (rowidx) {
		if (rowidx >= 0) {
			return this._curFormat._bodycells;
		}
		if (rowidx == -1) {
			return this._curFormat._headcells;
		}
		if (rowidx == -2) {
			return this._curFormat._summcells;
		}
	};

	_pGrid._getBandId = function (rowidx) {
		if (rowidx >= 0) {
			return "body";
		}
		if (rowidx == -1) {
			return "head";
		}
		if (rowidx == -2) {
			return "summary";
		}
	};

	_pGrid._getCellStyleInfo = function (cellidx, prop, datarow, selected, parent_cellinfo, autosizing, bexport) {
		var cellinfos = parent_cellinfo ? parent_cellinfo._subcells : this._getCellinfos(datarow);
		if (!cellinfos) {
			return null;
		}

		var use_flush = true;
		if (this._flush_cell_oldrow == datarow && this._flush_cell_oldcell == cellidx) {
			use_flush = false;
		}
		else if (this._flush_cell_oldrow != datarow && this._flush_cell_oldcell == cellidx) {
			if (this._flush_cell_oldrow >= 0 && datarow >= 0) {
				if (cellinfos[cellidx].cssclass._bindtype < 2) {
					use_flush = false;
				}
			}
		}

		this._createTempCell(cellidx, datarow, parent_cellinfo);

		var cells = this._getTempCell(cellidx, datarow, parent_cellinfo, autosizing, prop);
		var cell = cells.cell;
		var subcell = cells.subcell;
		var target_cell = subcell ? subcell : cell;

		cell ? cell._changeUserStatus("selected", !!selected) : 0;
		subcell ? subcell._changeUserStatus("selected", !!selected) : 0;

		var obj = undefined;
		var objs, props;

		if (nexacro._isArray(prop)) {
			objs = {
			};
			props = prop;
		}

		var i = 0;
		var flush = false;

		while (true) {
			var passadd = false;

			if (props) {
				prop = props[i++];
			}

			obj = cellinfos[cellidx]._getStyleCache(prop, datarow, selected);

			if (!obj) {
				if (!flush) {
					if (prop == "background" || prop == "cursor" || prop == "align" || prop == "textDecoration") {
						if (this._is_created) {
							if (!cell._is_created) {
								cell.on_created();
							}

							if (subcell && !subcell._is_created) {
								subcell.on_created();
							}
						}
						else {
							passadd = true;
						}

						if (use_flush) {
							target_cell._control_element._flushCommand();
							this._flush_cell_oldrow = datarow;
							this._flush_cell_oldcell = cellidx;
						}

						flush = true;
					}
				}

				if (prop == "background") {
					obj = target_cell._control_element._getComputedStyleBackgroundColor(true, bexport);
				}
				else if (prop == "cursor") {
					obj = target_cell._control_element._getComputedStyle("cursor", true);
				}
				else if (prop == "align") {
					var is_subComp = target_cell._subComp;
					var align2;

					if (is_subComp) {
						align2 = is_subComp._getCurrentStyleAlign(true);
					}
					else {
						align2 = target_cell._getCurrentStyleAlign(true);
					}
					obj = align2.textAlign + "," + align2.verticalAlign;
				}
				else if (prop == "font" || prop == "color" || prop == "wordSpacing" || prop == "letterSpacing") {
					var nstyle = cellinfos[cellidx][prop];

					if (nstyle && nstyle instanceof nexacro.BindableValue) {
						nstyle = nstyle._value;
					}

					obj = nstyle || target_cell._getCurrentStyleInheritValue(prop, "enabled");
				}
				else if (prop == "border") {
					if (cellinfos[cellidx]._getSuppress(datarow) > 0) {
						passadd = true;
					}
					obj = target_cell._getCurrentStyleBorder();
				}
				else if (prop == "textDecoration") {
					var nstyle2 = cellinfos[cellidx][prop];

					if (nstyle2 && nstyle2 instanceof nexacro.BindableValue) {
						nstyle2 = nstyle2._value;
					}

					obj = nstyle2 || target_cell._getCSSStyleValue(prop, "enabled");

					if (!obj) {
						var text_elem = target_cell._text_elem;
						if (text_elem) {
							obj = text_elem._getComputedStyle("text-decoration", true);
						}
					}
				}
				else if (prop == "checkboxicon") {
					var checkbox = target_cell._subComp;
					obj = checkbox._getCurrentStyleInheritValue("icon", "enabled");
				}
				else if (prop == "checkboxsize") {
					var checkbox2 = target_cell._subComp;
					obj = checkbox2._on_getFitSize();
				}
				else if (prop == "controldisplaysize") {
					var retnsize = [0, 0];
					var control = target_cell._subComp;
					if (!control) {
						return retnsize;
					}

					var padding = control._getCSSStyleValue("padding", "enabled");
					var border = control._getCSSStyleValue("border", "enabled");


					if (padding) {
						retnsize[0] += padding.left + padding.right;
						retnsize[1] += padding.top + padding.bottom;
					}
					if (border) {
						retnsize[0] += border.left._width + border.right._width;
						retnsize[1] += border.top._width + border.bottom._width;
					}
					obj = retnsize;
				}
				else if (prop == "treestatusicon") {
					var tree2 = target_cell._subComp;

					if (tree2._img_ctrl) {
						obj = tree2._img_ctrl._getCurrentStyleInheritValue("icon", "enabled");
					}
				}
				else if (prop == "treebuttonicon") {
					var tree3 = target_cell._subComp;

					if (tree3._btnimg_ctrl) {
						obj = tree3._btnimg_ctrl._getCurrentStyleInheritValue("icon", "enabled");
					}
				}
				else if (prop == "treecheckboxicon") {
					var tree4 = target_cell._subComp;

					if (tree4._chk_ctrl) {
						obj = tree4._chk_ctrl._getCurrentStyleInheritValue("icon", "enabled");
					}
				}
				else if (prop == "treecheckboxsize") {
					var tree5 = target_cell._subComp;

					if (tree5._chk_ctrl) {
						obj = tree5._chk_ctrl._on_getFitSize();
					}
				}
				else {
					var nstyle3 = cellinfos[cellidx][prop];

					if (nstyle3 && nstyle3 instanceof nexacro.BindableValue) {
						nstyle3 = nstyle3._value;
					}

					obj = nstyle3 || target_cell._getCSSStyleValue(prop, "enabled");
				}

				var setobj = obj;

				if (obj && nexacro._isObject(obj) && !nexacro._isArray(obj)) {
					if (obj && obj._bindtype > 0) {
						setobj = "bindexpr";
					}
					else {
						setobj = obj.value;
					}

					obj = obj.value;
				}

				var cssclass = cellinfos[cellidx].cssclass;

				if (prop == "font") {
					if (cssclass && cssclass._bindtype > 0 && !cellinfos[cellidx].font) {
						setobj = "bindexpr";
					}

					if (!selected) {
						cellinfos[cellidx]._curfont = setobj;
					}
					else {
						cellinfos[cellidx]._curselfont = setobj;
					}
				}
				else if (prop == "border") {
					if (cssclass && cssclass._bindtype > 0 && !cellinfos[cellidx].border) {
						setobj = "bindexpr";
					}

					cellinfos[cellidx]._curborder = setobj;
				}
				else if (prop == "padding") {
					if (cssclass && cssclass._bindtype > 0 && !cellinfos[cellidx].padding) {
						setobj = "bindexpr";
					}

					cellinfos[cellidx]._curpadding = setobj;
				}

				if (!passadd) {
					if (obj) {
						cellinfos[cellidx]._setStyleCache(prop, datarow, selected, obj);
					}
				}
			}
			else {
			}

			if (props) {
				objs[prop] = obj;

				if (i < props.length) {
					continue;
				}

				return objs;
			}

			break;
		}
		return obj;
	};

	_pGrid._getMaxColSize = function (cells, colidx, row, parentcol, maxbyte, parent_cellinfo) {
		var max = 0;
		var cellsLen = cells.length;
		var subcells;
		var format = this._curFormat;
		var col, colspan;

		for (var i = 0; i < cellsLen; i++) {
			col = cells[i]._col;
			colspan = cells[i]._colspan;

			if (col <= colidx && col + colspan > colidx) {
				subcells = cells[i]._subcells;

				if (subcells.length > 0) {
					var subsize = this._getMaxColSize(subcells, colidx - col, row, colidx, maxbyte, cells[i]);
					max = Math.max(max, subsize);
				}
				else {
					if (colspan > 1) {
						if (col + colspan - 1 != colidx) {
							continue;
						}
					}

					if (!parentcol) {
						parentcol = 0;
					}

					var treesize = 0;

					if (this._hasTree) {
						treesize = this._getDepthWidth(row, cells[i]);
					}

					if (treesize < 0) {
						return -1;
					}

					var autosizecol = cells[i]._getAttrValue(cells[i].autosizecol, row);
					var formatsize = format._cols[colidx + parentcol].orgsize;
					var size;
					var j;

					if (autosizecol == "none") {
						size = formatsize;
					}
					else {
						var displayType = cells[i]._getDisplayTypeValue(row);
						if (displayType == "checkboxcontrol") {
							var controlSize = cells[i]._getCheckboxsize(row);

							if (controlSize == undefined) {
								controlSize = this._getCellStyleInfo(cells[i]._cellidx, "checkboxsize", row, false, parent_cellinfo, true);
								controlSize = controlSize[0];
							}

							size = controlSize + 6;
						}
						else {
							var text = cells[i]._getVirtualMergeInfo(row + 2) ? "" : cells[i]._getDisplayText(row);
							if (text && maxbyte && colspan == 1 && !this._hasTree) {
								var re_newline = /\r\n|\n|\r/;
								var lines = text.split(re_newline);
								var lcnt = lines.length;
								var nbyte, max_byte = 0, max_len = 0;

								for (j = 0; j < lcnt; j++) {
									nbyte = this._getByteLength_UTF8(lines[j]);
									max_len = Math.max(max_len, lines[j].length);
									max_byte = Math.max(max_byte, nbyte);
								}

								if (maxbyte.max > max_byte && maxbyte.len > max_len) {
									continue;
								}

								maxbyte.len = max_len;
								maxbyte.max = max_byte;
							}

							size = this._getCellRowTextSize(cells[i], row, text);
							size = size[0];
						}

						var padd = cells[i]._curpadding, bord = cells[i]._curborder;

						if (padd === "bindexpr" || padd === undefined) {
							padd = this._getCellStyleInfo(i, "padding", row, undefined, undefined, true);
						}

						if (bord === "bindexpr" || bord === undefined) {
							bord = this._getCellStyleInfo(i, "border", row, undefined, undefined, true);
						}

						if (padd) {
							padd = nexacro.PaddingObject(padd);
							size += padd.left + padd.right;
						}
						if (bord) {
							bord = nexacro.BorderObject(bord);
							size += bord.right._width;
						}

						size += treesize;

						if (autosizecol == "limitmin") {
							if (size < formatsize) {
								size = formatsize;
							}
						}
						else if (autosizecol == "limitmax") {
							if (size > formatsize) {
								size = formatsize;
							}
						}

						if (colspan > 1) {
							var t_colsize = 0;
							var s = col, e = col + colspan - 1;

							for (j = s; j < e; j++) {
								t_colsize += format._cols[j + parentcol].size;
							}
							size -= t_colsize;
						}
						size += this._getDisplaytypeControlSize(true, displayType, cells[i], parent_cellinfo, row);
					}
					max = Math.max(max, size);
				}
			}
		}

		return max;
	};

	_pGrid._getTextSizeCache = function (font) {
		var ret;
		if (!this._arrtextsizeCache) {
			this._arrtextsizeCache = {
			};
		}

		if (this._arrtextsizeCache[font.value]) {
			ret = this._arrtextsizeCache[font.value];
		}
		else {
			ret = nexacro._getTextSize("A", font);
			this._arrtextsizeCache[font.value] = ret;
		}
		return ret;
	};

	_pGrid._getCellRowTextSize = function (cellinfo, rowidx, text, parent_cellinfo, only_normal, merge_width) {
		var font = cellinfo._curfont, select_font = cellinfo._curselfont;
		var word = cellinfo._getWordwrap(rowidx);
		var size = [], size1, size2;

		if (!word) {
			word = this._getCellStyleInfo(cellinfo._cellidx, "wordWrap", rowidx, undefined, parent_cellinfo, true);
		}

		if (font === undefined) {
			font = this._getCellStyleInfo(cellinfo._cellidx, "font", rowidx, undefined, parent_cellinfo, true);
			font = nexacro.FontObject(font);
			size1 = this._getTextSizeCache(font);

			if (cellinfo._curfont !== "bindexpr") {
				cellinfo._cur1font_size = size1;
			}
		}
		else {
			if (font === "bindexpr") {
				font = this._getCellStyleInfo(cellinfo._cellidx, "font", rowidx, undefined, parent_cellinfo, true);
				font = nexacro.FontObject(font);
				size1 = this._getTextSizeCache(font);
			}
			else {
				font = nexacro.FontObject(font);
				if (!(size1 = cellinfo._cur1font_size)) {
					size1 = this._getTextSizeCache(font);
					cellinfo._cur1font_size = size1;
				}
			}
		}

		if (select_font === undefined) {
			select_font = this._getCellStyleInfo(cellinfo._cellidx, "font", rowidx, true, parent_cellinfo, true);
			select_font = nexacro.FontObject(select_font);
			size2 = this._getTextSizeCache(select_font);

			if (cellinfo._curselfont !== "bindexpr") {
				cellinfo._cur1selectfont_size = size2;
			}
		}
		else {
			if (select_font === "bindexpr") {
				select_font = this._getCellStyleInfo(cellinfo._cellidx, "font", rowidx, true, parent_cellinfo, true);
				select_font = nexacro.FontObject(select_font);
				size2 = this._getTextSizeCache(select_font);
			}
			else {
				select_font = nexacro.FontObject(select_font);
				if (!(size2 = cellinfo._cur1selectfont_size)) {
					size2 = this._getTextSizeCache(select_font);
					cellinfo._cur1selectfont_size = size2;
				}
			}
		}

		var default_height;

		if (!text) {
			if (size1[0] <= size2[0]) {
				size = [].concat(size2);
			}
			else {
				size = [].concat(size1);
			}

			size[0] = 1;
			size[1] = Math.ceil(size[1]);
			return size;
		}
		else {
			if (size1[0] <= size2[0]) {
				font = select_font;
				default_height = size2[1];
			}
			else {
				default_height = size1[1];
			}
		}

		var displayType = "normal";

		if (!only_normal) {
			displayType = cellinfo._getDisplayTypeValue(rowidx);
		}

		if (displayType == "imagecontrol") {
			var str = "row" + rowidx;
			var tempWidthsize = cellinfo._imgWidthTemp[str];
			var tempHeightsize = cellinfo._imgHeightTemp[str];
			var url;

			if (tempWidthsize > 0) {
				size[0] = tempWidthsize;
				size[1] = tempHeightsize;
			}
			else {
				url = nexacro._getURIValue(text);
				url = nexacro._getImageLocation(url, this._getRefFormBaseUrl());

				var imgsize = nexacro._getImageSize(url, this._on_sizeloading, this, this._getRefFormBaseUrl(), text);

				if (imgsize) {
					size[0] = imgsize.width;
					size[1] = imgsize.height;
				}
				else {
					size[0] = 1;
					size[1] = default_height;
				}
			}
			size[0] = Math.ceil(size[0]);
			size[1] = Math.ceil(size[1]);
			return size;
		}
		else {
			var usewordwrap = true;
			var usedecorate = (displayType == "decoratetext") ? true : false;
			var ctrl_width = 0;

			if (this.autosizingtype == "col" || this.autosizingtype == "both") {
				usewordwrap = false;
			}

			var style = this._getCellStyleInfo(cellinfo._cellidx, ["wordSpacing", "letterSpacing"], rowidx, undefined, parent_cellinfo, true);
			var wordspacing = style.wordSpacing;
			var letterspacing = style.letterSpacing;
			var expandshow = cellinfo._getAttrValue(cellinfo.expandshow, rowidx);

			if (expandshow == "show") {
				ctrl_width += cellinfo._getAttrValue(cellinfo.expandsize, rowidx);
			}

			if (letterspacing) {
				letterspacing = nexacro.CSSValueObject(letterspacing);
			}

			if (wordspacing) {
				wordspacing = nexacro.CSSValueObject(wordspacing);
			}

			var padd;
			if (usewordwrap && (this._autoSizeRowProc || this._rowSizeEx) && word != null && word != "none" && word != false && word != "false") {
				var width;
				if (merge_width != undefined) {
					width = merge_width;
					padd = this._getCellStyleInfo(cellinfo._cellidx, "padding", rowidx, undefined, parent_cellinfo, true);
					if (padd) {
						padd = nexacro.PaddingObject(padd);
						width -= (padd.left + padd.right);
					}
				}
				else {
					var cols = this._curFormat._cols;
					var colidx = (parent_cellinfo ? parent_cellinfo._col : 0) + cellinfo._col;

					style = this._getCellStyleInfo(cellinfo._cellidx, ["padding", "border", "align"], rowidx, undefined, parent_cellinfo, true);

					padd = style.padding;
					var bord = style.border;
					var select_bord = this._getCellStyleInfo(cellinfo._cellidx, "border", rowidx, true, parent_cellinfo, true);

					width = cols[colidx + cellinfo._colspan - 1].right - cols[colidx].left;

					if (bord) {
						bord = nexacro.BorderObject(bord);
					}

					if (bord && select_bord) {
						select_bord = nexacro.BorderObject(select_bord);
						bord = (bord.right._width < select_bord.right._width) ? select_bord : bord;
					}
					if (padd) {
						padd = nexacro.PaddingObject(padd);
						width -= (padd.left + padd.right);
					}

					if (bord) {
						width -= bord.right._width;
					}
				}
				width -= this._getDisplaytypeControlSize(true, displayType, cellinfo, parent_cellinfo, rowidx);

				var halign, valign;

				if (style.align) {
					var cellalign = style.align.split(",");
					halign = cellalign[0];
					valign = cellalign[1];
				}

				width -= ctrl_width;
				size = nexacro._getTextSize(text, font, true, width, word, wordspacing, letterspacing, usedecorate, halign, valign);
			}
			else {
				size = nexacro._getTextSize(text, font, true, undefined, undefined, wordspacing, letterspacing, usedecorate);
			}

			size[0] += ctrl_width;

			if (size[1] < default_height) {
				size[1] = default_height;
			}

			size[0] = Math.ceil(size[0]);
			size[1] = Math.ceil(size[1]);
			return size;
		}
	};

	_pGrid._getMaxSubRowSize = function (rowidx, subrowidx, cells, parentrow, parent_cellinfo) {
		var format = this._curFormat;
		var bandrows;

		if (rowidx == -2) {
			if (!cells) {
				cells = this._curFormat._summcells;
			}

			bandrows = format._summrows;
		}
		else if (rowidx == -1) {
			if (!cells) {
				cells = this._curFormat._headcells;
			}

			bandrows = format._headrows;
		}
		else {
			if (!cells) {
				cells = this._curFormat._bodycells;
			}

			bandrows = format._bodyrows;
		}

		if (!this._autoSizeRowProc && this.autosizingtype != "row" && this.autosizingtype != "both") {
			return bandrows[subrowidx].size;
		}

		var max = 0;
		var cellsLen = cells.length;
		var _row, _rowspan, subcells;

		for (var i = 0; i < cellsLen; i++) {
			_row = cells[i]._row;
			_rowspan = cells[i]._rowspan;
			subcells = cells[i]._subcells;

			if (_row == subrowidx || (subcells.length > 0 && _row <= subrowidx && (_row + _rowspan) > subrowidx)) {
				var maxrow = 0;

				if (subcells.length > 0) {
					maxrow = this._getMaxSubRowSize(rowidx, subrowidx - _row, subcells, _row, cells[i]);
					max = Math.max(max, maxrow);
				}
				else {
					if (!parentrow) {
						parentrow = 0;
					}

					var autosizerow = cells[i]._getAttrValue(cells[i].autosizerow, rowidx);
					var formatsize = bandrows[subrowidx + parentrow].size;
					var size;

					if (autosizerow == "none") {
						size = formatsize;
					}
					else {
						var displayType = cells[i]._getDisplayTypeValue(rowidx);
						if (displayType == "checkboxcontrol") {
							var controlSize = cells[i]._getCheckboxsize(rowidx);

							if (controlSize == undefined) {
								controlSize = this._getCellStyleInfo(cells[i]._cellidx, "checkboxsize", rowidx, false, parent_cellinfo, true);
								controlSize = controlSize[1];
							}

							size = controlSize + 6;
						}
						else {
							var text = cells[i]._getVirtualMergeInfo(rowidx + 2) ? "" : cells[i]._getDisplayText(rowidx);
							var s = this._getCellRowTextSize(cells[i], rowidx, text, parent_cellinfo);
							size = s[1];

							var padd = cells[i]._curpadding, bord = cells[i]._curborder;

							if (padd === "bindexpr" || padd === undefined) {
								padd = this._getCellStyleInfo(i, "padding", rowidx, undefined, parent_cellinfo, true);
							}

							if (bord === "bindexpr" || bord === undefined) {
								bord = this._getCellStyleInfo(i, "border", rowidx, undefined, parent_cellinfo, true);
							}

							if (padd) {
								padd = nexacro.PaddingObject(padd);
								size += padd.top + padd.bottom;
							}
							if (bord) {
								bord = new nexacro.BorderObject(bord);
								size += bord.bottom._width;
							}
						}
						size += this._getDisplaytypeControlSize(false, displayType, cells[i], parent_cellinfo, rowidx);

						if (autosizerow == "limitmin") {
							if (size < formatsize) {
								size = formatsize;
							}
						}
						else if (autosizerow == "limitmax") {
							if (size > formatsize) {
								size = formatsize;
							}
						}
					}
					max = Math.max(max, size);
				}
			}
		}
		return max;
	};

	_pGrid._getDisplaytypeControlSize = function (b_col, displaytype, cellinfo, parent_cellinfo, rowidx) {
		if (displaytype.indexOf("control") < 0) {
			return 0;
		}

		var controlSize = this._getCellStyleInfo(cellinfo._cellidx, "controldisplaysize", rowidx, false, parent_cellinfo, true);

		if (b_col == true) {
			controlSize = controlSize[0];
			return controlSize;
		}
		else {
			controlSize = controlSize[1];
			return controlSize;
		}
	};

	_pGrid._getSubRowSizeList = function (row) {
		var format = this._curFormat;
		var rows = format._bodyrows;
		var rowsLen = rows.length;
		var sizes = [], j = 0;

		for (var i = 0; i < rowsLen; i++) {
			sizes[j++] = this._rowSizeListSub[row *  rowsLen + i];
		}

		return sizes;
	};

	_pGrid._makeCssRefInfoCtrl = function (ctrl) {
		ctrl._refcssobj = this;
		ctrl._refcssid = "#" + ctrl.id;
		return this;
	};

	_pGrid._addFuncQueue = function (work, pthis, func, args_arr) {
		var info = {
			work : work, 
			pthis : pthis, 
			func : func, 
			args : args_arr
		};
		this._func_queue.push(info);
	};

	_pGrid._exeFuncQueue = function (work) {
		var arr = this._func_queue;

		for (var i = 0; i < arr.length; i++) {
			if (arr[i].work == work) {
				arr[i].func.call(arr[i].pthis, arr[i].args);
				this._func_queue.splice(i, 1);
				i--;
			}
		}
	};

	_pGrid._addRefreshContents = function (workname, band, check) {
		if (band) {
			var arr = this._recreate_contents_proc;

			if (check) {
				for (var i = 0, n = arr.length; i < n; i++) {
					if (arr[i].workname == workname) {
						return false;
					}
				}
			}
			var add = {
				workname : workname, 
				band : band
			};
			arr.push(add);

			return true;
		}
	};

	_pGrid._execRefreshContents = function (workname, bclearcache, noupdatesupp) {
		var arr = this._recreate_contents_proc;

		for (var i = 0; i < arr.length; i++) {
			if (arr[i].workname == workname) {
				arr[i].band._recreate_contents(false, false, false, noupdatesupp);
				this._recreate_contents_proc.splice(i, 1);
				i--;
			}
		}
	};

	_pGrid._applyColSizing = function (movepos, idx, only_size) {
		if (!this.enableredraw) {
			return;
		}

		var control_elem = this.getElement();
		var format = this._curFormat;

		if (control_elem && format && idx >= 0) {
			var band = this._headBand;
			var rows = band._get_rows();
			var cellitem = rows[0]._cells[idx];
			var cellinfo = cellitem._refinfo;

			var colidx = cellinfo._col + (cellinfo._colspan - 1);

			if (cellinfo._area != "right") {
				var prevright = format._cols[colidx].left;
				var currright = format._cols[colidx].right + movepos;

				if (prevright > currright) {
					var next_col = format._cols[colidx + 1];
					if ((next_col && next_col._area == "right") || colidx == format._cols.length - 1) {
						movepos = prevright - format._cols[colidx].right + 7;
					}
					else {
						movepos = prevright - format._cols[colidx].right + 1;
					}
				}
			}
			else {
				var nextleft = format._cols[colidx].right;
				var currleft = format._cols[colidx].left + movepos;

				if (nextleft < currleft) {
					movepos = nextleft - format._cols[colidx].left - 1;
				}

				movepos = 0 - movepos;
			}

			var oldval = format._cols[colidx].size;
			var change = format._adjustColSizing(colidx, movepos);
			var newval = format._cols[colidx].size;

			if (change) {
				if (this.enableredraw) {
					this._updateColSize(colidx);
				}
				else {
					if (!this._enable_redraw_history.updatecolsize) {
						this._enable_redraw_history.updatecolsize = [];
					}

					this._enable_redraw_history.updatecolsize.push(colidx);
				}

				if (!only_size) {
					this._isUserChangeColSize = true;
					this._addFuncQueue("colsizing", this, this.on_fire_oncolresized, [colidx, -9, newval, oldval, colidx]);
				}
			}
		}
	};

	_pGrid._applyRowSizing = function (movepos, idx) {
		if (this.enableredraw == false) {
			return;
		}

		var control_elem = this.getElement();
		var format = this._curFormat;

		if (format && control_elem && idx >= 0) {
			var range = this._resizerRowRange[idx];
			var bandstr = range.area;
			var row = this._getDataRow(range.row);
			var subrow = range.cellinfo._row + range.cellinfo._rowspan - 1;

			this._applyRowSizing2(movepos, bandstr, row, subrow);
		}
	};

	_pGrid._applyRowSizing2 = function (movepos, bandstr, row, subrow, only_size) {
		if (this.enableredraw == false) {
			return;
		}

		var control_elem = this.getElement();
		var formatidx, oldval, newval;
		var format = this._curFormat;
		var size;
		var redraw;

		if (format && control_elem) {
			var change = false;

			if (bandstr == "head") {
				oldval = this._rowHeadListSub[subrow];
				size = oldval + movepos;
				size = Math.max(size, 5);
				size = Math.min(size, this._getClientHeight() - 5);
				newval = size;

				redraw = this.enableredraw;
				this.enableredraw = false;
				this.setRealRowSize(-1, size, subrow, true);
				this.enableredraw = redraw;
				formatidx = subrow;

				if (movepos) {
					this._resizeBand();

					if (!only_size) {
						this._addRefreshContents("rowsizing", this._headBand);
					}
					else {
						this._headBand._recreate_contents(false, false, false);
					}

					change = true;
				}
			}
			else if (bandstr == "body") {
				oldval = this._rowSizeListSub[row *  format._bodyrows.length + subrow];
				size = oldval + movepos;

				var gap, remain;

				if (row == this._rowcount - 1) {
					remain = 7;
				}
				else {
					remain = 1;
				}

				gap = size - remain;

				if (gap < 0) {
					size = remain;
					movepos -= gap;
				}

				newval = size;

				if (this._getFixRowCnt() > row) {
					this._fixed_height += movepos;
					this._fixedrow_height += movepos;
				}

				redraw = this.enableredraw;
				this.enableredraw = false;
				this.setRealRowSize(row, size, subrow, true);
				this.enableredraw = redraw;
				formatidx = subrow + ((format._headrows) ? format._headrows.length : 0);

				if (movepos) {
					if (this.extendsizetype != "row" && this.extendsizetype != "both") {
						if (!only_size) {
							this._addRefreshContents("rowsizing", this._bodyBand);
						}
						else {
							this._bodyBand._recreate_contents(false, false, false);
						}
					}
					else {
						this._updateRowSize(row, subrow);
					}
					change = true;
				}
			}
			else if (bandstr == "summ") {
				oldval = this._rowSummListSub[subrow];

				if (this.summarytype == "top" || this.summarytype == "lefttop") {
					size = oldval + movepos;
				}
				else {
					size = oldval - movepos;
				}

				size = Math.max(size, 5);
				size = Math.min(size, this._getClientHeight() - 5);
				newval = size;

				redraw = this.enableredraw;
				this.enableredraw = false;
				this.setRealRowSize(-2, size, subrow, true);
				this.enableredraw = redraw;
				formatidx = subrow + ((format._headrows) ? format._headrows.length : 0) + ((format._bodyrows) ? format._bodyrows.length : 0);

				if (movepos) {
					this._resizeBand();

					if (!only_size) {
						this._addRefreshContents("rowsizing", this._summBand);
					}
					else {
						this._summBand._recreate_contents(false, false, false);
					}

					change = true;
				}
			}

			if (change && !only_size) {
				this._addFuncQueue("rowsizing", this, this.on_fire_onrowresized, [formatidx, row, newval, oldval, subrow]);
			}
		}
	};

	_pGrid._updateColSize = function (col) {
		if (this._after_recreate) {
			return;
		}

		var reset_bandsize = false;
		if (this.autosizingtype == "row" || this.autosizingtype == "both") {
			this._resetRowSizeList();
			this._resizeBand(true);

			reset_bandsize = true;
		}

		this._autofitcol_rate = [];
		this._applyAutofittype(true);



		if (this._headBand) {
			this._headBand._matrix._adjustColsDisplay(true, true);
			this._headBand._matrix._adjustRowsDisplay(reset_bandsize);
		}

		if (this._summBand) {
			this._summBand._matrix._adjustColsDisplay(true, true);
			this._summBand._matrix._adjustRowsDisplay(reset_bandsize);
		}

		if (this._bodyBand) {
			var _vpos = this._getScrollTop();

			if (_vpos < 0) {
				_vpos = 0;
			}

			this._last_scroll_top = _vpos;
			this._toprowpos = this._getScreenTopRowPos(_vpos);
			this._bottomrowpos = this._getScreenBottomRowPos(_vpos);

			this._bodyBand._matrix._adjustColsDisplay(true, true);
			this._bodyBand._matrix._adjustRowsDisplay(reset_bandsize);

			this._bodyBand._update_rows = this._bodyBand._matrix._adjustScrollRows(_vpos, true);
			this._bodyBand._on_refresh_rows(false, true);
			this._adjustOverlayControls(true);
		}
		this._resetScrollMax();
	};

	_pGrid._updateRowSize = function (row, subrow, no_refresh_band) {
		if (this.extendsizetype != "row" && this.extendsizetype != "both") {
			return;
		}

		var format = this._curFormat;
		var rowctrl;
		var updatesize;
		var rowsize;
		var cells;
		var i, j, k, n;
		var subrowsize;
		var _row, _rowspan;

		if (row == -1) {
			if (!this._headBand) {
				return false;
			}

			rowctrl = this._headBand._get_rows()[0];
			rowsize = this._rowHeadList[0];
			updatesize = 0;

			rowctrl.set_height(rowsize);
			rowctrl._init(format);

			cells = rowctrl._cells;
			for (j = 0, n = cells.length; j < n; j++) {
				_row = cells[j]._refinfo._row;
				_rowspan = cells[j]._refinfo._rowspan;
				subrowsize = 0;

				if (_row <= subrow && subrow < _row + _rowspan) {
					for (k = _row; k < _row + _rowspan; k++) {
						subrowsize += this._rowHeadListSub[k];
					}
					updatesize = subrowsize - cells[j]._height;
					cells[j].set_height(subrowsize);
				}
				else if (_row > subrow) {
					cells[j].set_top(cells[j]._top + updatesize);
				}
			}

			this._resizeBand();

			if (this._bodyBand && !no_refresh_band) {
				this._bodyBand._matrix._adjustRowsDisplay();
				this._bodyBand._matrix._adjustColsDisplay();
				this._bodyBand._on_refresh_rows(false, false);
			}
		}
		else if (row == -2) {
			if (!this._summBand) {
				return false;
			}

			rowctrl = this._summBand._get_rows()[0];
			rowsize = this._rowSummList[0];
			updatesize = 0;

			rowctrl.set_height(rowsize);
			rowctrl._init(format);

			cells = rowctrl._cells;
			for (j = 0, n = cells.length; j < n; j++) {
				_row = cells[j]._refinfo._row;
				_rowspan = cells[j]._refinfo._rowspan;
				subrowsize = 0;

				if (_row <= subrow && subrow < _row + _rowspan) {
					for (k = _row; k < _row + _rowspan; k++) {
						subrowsize += this._rowSummListSub[k];
					}
					updatesize = subrowsize - cells[j]._height;
					cells[j].set_height(subrowsize);
				}
				else if (_row > subrow) {
					cells[j].set_top(cells[j]._top + updatesize);
				}
			}

			this._resizeBand();

			if (this._bodyBand && !no_refresh_band) {
				this._bodyBand._matrix._adjustRowsDisplay();
				this._bodyBand._matrix._adjustColsDisplay();
				this._bodyBand._on_refresh_rows(false, false);
			}
		}
		else if (row >= 0) {
			if (!this._bodyBand) {
				return false;
			}

			var rows = this._bodyBand._get_rows();

			for (i = 0, n = rows.length; i < n; i++) {
				if (rows[i]._rowidx == row) {
					rowctrl = rows[i];
					break;
				}
			}

			if (!rowctrl) {
				return false;
			}

			rowctrl._init(format);

			if (this._fixed_height) {
				this._bodyBand._control_element._setFixArea(this._fixed_height);
			}

			var datarow = this._getDataRow(row);
			rowsize = this._rowSizeList[datarow];
			var rowslen = this._curFormat._bodyrows.length;
			updatesize = 0;

			rowctrl.set_height(rowsize);

			cells = rowctrl._cells;
			for (j = 0, n = cells.length; j < n; j++) {
				_row = cells[j]._refinfo._row;
				_rowspan = cells[j]._refinfo._rowspan;
				subrowsize = 0;

				if (_row <= subrow && subrow < _row + _rowspan) {
					for (k = _row; k < _row + _rowspan; k++) {
						subrowsize += this._rowSizeListSub[datarow *  rowslen + k];
					}
					updatesize = subrowsize - cells[j]._height;
					cells[j].set_height(subrowsize);
				}
				else if (_row > subrow) {
					cells[j].set_top(cells[j]._top + updatesize);
				}
			}

			var _vpos = this._getScrollTop();

			if (_vpos < 0) {
				_vpos = 0;
			}

			if (!no_refresh_band) {
				this._last_scroll_top = _vpos;
				this._toprowpos = this._getScreenTopRowPos(_vpos);
				this._bottomrowpos = this._getScreenBottomRowPos(_vpos);

				this._bodyBand._matrix._adjustRowsDisplay(true);
				this._bodyBand._matrix._adjustColsDisplay();

				this._bodyBand._update_rows = this._bodyBand._matrix._adjustScrollRows(_vpos, true);
				this._bodyBand._on_refresh_rows(false, false);
			}
		}
		else {
			return false;
		}

		this._adjustOverlayControls(true);
		return true;
	};

	_pGrid._applyResizer = function () {
		if (!this._is_created) {
			return;
		}

		var curborder = this._border || this._getCSSStyleValue("border", this._status);
		var lborder_w = (curborder) ? curborder.left._width : 0;
		var tborder_w = (curborder) ? curborder.top._width : 0;
		var resizer_colctrl = this._resizer_colctrl;
		var resizer_rowctrl = this._resizer_rowctrl;
		var rows, cellitem, cellborder, cellinfo, cellpos, i;
		var resizermark_arr;
		var resizermark_range = {
		};
		var mark_idx;
		var cellcnt;
		var left, top, width, height;
		var band;
		var j;

		if (this.cellsizingtype == "col" || this.cellsizingtype == "both") {
			band = this._headBand;

			if (band == null) {
				return;
			}

			rows = band._get_rows();

			if (rows.length == 0) {
				return;
			}

			cellcnt = rows[0]._cells.length;
			resizermark_arr = this._resizerColRange = [];
			mark_idx = 0;



			if (!resizer_colctrl) {
				resizer_colctrl = new nexacro._GridResizerControl("resizertrack", 0, 0, 0, 0, null, null, this);
			}

			resizer_colctrl._setDirection("horizon");
			resizer_colctrl._setTracksize(this._getClientHeight());
			resizer_colctrl._setCallbackFn(this._applyColSizing);
			if (!resizer_colctrl._is_created) {
				resizer_colctrl.createComponent();
			}
			this._resizer_colctrl = resizer_colctrl;

			for (j = 0; j < cellcnt; j++) {
				cellitem = rows[0]._cells[j];

				if (!cellitem) {
					break;
				}

				cellinfo = cellitem._refinfo;
				cellpos = cellitem._setPositionInGrid(null, true, true);
				height = cellpos.height;
				cellborder = cellitem._refinfo._border || cellitem._getCSSStyleValue("border", cellitem._stauts);

				if (cellinfo._area == "left" || cellinfo._area == "body") {
					width = cellborder ? cellborder.right._width : 0;
					left = cellpos.left + cellitem._adjust_width - width - 4;
				}
				else {
					width = cellborder ? cellborder.left._width : 0;
					left = cellpos.left - 2;
				}

				resizermark_range = {
					left : left + lborder_w, 
					top : cellpos.top + tborder_w, 
					right : left + width + lborder_w + 6, 
					bottom : cellpos.top + height + tborder_w, 
					index : cellitem._cellidx, 
					area : cellinfo._area
				};

				switch (this.cellsizebandtype) {
					case "body":
						if (cellinfo._area == "body") {
							resizermark_arr[mark_idx++] = resizermark_range;
						}
						break;
					case "allband":
					case "nohead":
						resizermark_arr[mark_idx++] = resizermark_range;
						break;
					case "noleft":
					case "nohead,noleft":
						if (cellinfo._area != "left") {
							resizermark_arr[mark_idx++] = resizermark_range;
						}
						break;
				}
			}
		}
		else {
			if (resizer_colctrl) {
				resizer_colctrl.destroy();
				this._resizer_colctrl = null;
				this._resizerColRange = [];
			}
		}

		if (this.cellsizingtype == "row" || this.cellsizingtype == "both") {
			var head = this._headBand;
			var body = this._bodyBand;
			var summ = this._summBand;
			var cell_len;

			if (!head && !body && !summ) {
				return;
			}

			resizermark_arr = this._resizerRowRange = [];
			mark_idx = 0;

			if (resizer_rowctrl) {
				resizer_rowctrl.destroy();
			}

			resizer_rowctrl = new nexacro._GridResizerControl("resizertrack", 0, 0, 0, 0, null, null, this);
			resizer_rowctrl._setDirection("vertical");
			resizer_rowctrl._setTracksize(this._getClientWidth());
			resizer_rowctrl._setCallbackFn(this._applyRowSizing);
			resizer_rowctrl.createComponent();
			this._resizer_rowctrl = resizer_rowctrl;

			while (head) {
				if (this.cellsizebandtype == "body" || this.cellsizebandtype == "nohead" || this.cellsizebandtype == "nohead,noleft") {
					break;
				}

				rows = head._get_rows();

				if (!rows.length) {
					break;
				}

				cell_len = rows[0]._cells.length;

				for (i = 0; i < cell_len; i++) {
					cellitem = rows[0]._cells[i];
					cellinfo = cellitem._refinfo;

					cellpos = cellitem._setPositionInGrid(null, true, true);

					width = cellitem._adjust_width;
					cellborder = cellitem._refinfo._border || cellitem._getCSSStyleValue("border", cellitem._status);

					height = cellborder ? cellborder.bottom._width : 0;
					top = cellpos.top + cellitem._adjust_height - height - 4;

					resizermark_range = {
						left : cellpos.left + lborder_w, 
						top : top + tborder_w, 
						right : cellpos.left + width + lborder_w, 
						bottom : top + height + 6 + tborder_w, 
						index : mark_idx, 
						area : "head", 
						row : cellitem._rowidx, 
						cellinfo : cellinfo
					};
					resizermark_arr[mark_idx++] = resizermark_range;
				}
				break;
			}

			if (body) {
				rows = body._get_rows();
				var rows_len = rows.length;
				cell_len = rows_len > 0 ? rows[0]._cells.length : 0;

				for (i = 0; i < rows_len; i++) {
					for (j = 0; j < cell_len; j++) {
						cellitem = rows[i]._cells[j];
						cellinfo = cellitem._refinfo;

						cellpos = cellitem._setPositionInGrid(null, true, true);

						width = cellitem._adjust_width;
						cellborder = cellitem._refinfo._border || cellitem._getCSSStyleValue("border", cellitem._status);

						height = cellborder ? cellborder.bottom._width : 0;
						top = cellpos.top + cellitem._adjust_height - height - 4;

						resizermark_range = {
							left : cellpos.left + lborder_w, 
							top : top + tborder_w, 
							right : cellpos.left + width + lborder_w, 
							bottom : top + height + 6 + tborder_w, 
							index : mark_idx, 
							area : "body", 
							row : cellitem._rowidx, 
							cellinfo : cellinfo
						};
						resizermark_arr[mark_idx++] = resizermark_range;
					}
				}
			}

			while (summ) {
				if (this.cellsizebandtype == "body") {
					break;
				}

				rows = summ._get_rows();

				if (!rows.length) {
					break;
				}

				cell_len = rows[0]._cells.length;

				for (i = 0; i < cell_len; i++) {
					cellitem = rows[0]._cells[i];
					cellinfo = cellitem._refinfo;
					cellpos = cellitem._setPositionInGrid(null, true, true);
					width = cellitem._adjust_width;
					cellborder = cellitem._refinfo._border || cellitem._getCSSStyleValue("border", cellitem._status);

					if (this.summarytype == "top" || this.summarytype == "lefttop") {
						height = cellborder ? cellborder.bottom._width : 0;
						top = cellpos.top + cellitem._adjust_height - height - 4;
					}
					else {
						height = cellborder ? cellborder.top._width : 0;
						top = cellpos.top - 2;
					}

					resizermark_range = {
						left : cellpos.left + lborder_w, 
						top : top + tborder_w, 
						right : cellpos.left + width + lborder_w, 
						bottom : top + height + 6 + tborder_w, 
						index : mark_idx, 
						area : "summ", 
						row : cellitem._rowidx, 
						cellinfo : cellinfo
					};
					resizermark_arr[mark_idx++] = resizermark_range;
				}
				break;
			}
		}
		else {
			if (resizer_rowctrl) {
				resizer_rowctrl.destroy();
				this._resizer_rowctrl = null;
				this._resizerRowRange = [];
			}
		}
	};

	_pGrid._destroyResizer = function () {
		var resizer_colctrl = this._resizer_colctrl;
		if (resizer_colctrl) {
			resizer_colctrl.destroy();
			this._resizer_colctrl = null;
		}

		var resizer_rowctrl = this._resizer_rowctrl;
		if (resizer_rowctrl) {
			resizer_rowctrl.destroy();
			this._resizer_rowctrl = null;
		}
	};

	_pGrid._isAreaSelect = function () {
		if (this.selecttype == "area" || this.selecttype == "multiarea") {
			return true;
		}

		return false;
	};

	_pGrid._isSelectRowType = function () {
		if (this.selecttype == "row" || this.selecttype == "multirow") {
			return true;
		}

		return false;
	};

	_pGrid._isMultiSelect = function () {
		if (this.selecttype == "multirow" || this.selecttype == "multicell" || this.selecttype == "multitreecell" || this.selecttype == "multiarea") {
			return true;
		}

		return false;
	};

	_pGrid._setColSize = function (nPivotIndex, nColIndex, nSize, bBandIndex, bRedraw, autosize, noAdjust) {
		var format = this._curFormat;

		var leftcnt = this._getColFixCnt("left");
		var bodycnt = this._getColFixCnt("body");
		var rightcnt = this._getColFixCnt("right");
		var _cols = format._cols;
		var _colsLen = _cols.length;

		var areatype = "body";

		if (typeof (nPivotIndex) != "string") {
			if (nPivotIndex == -1) {
				areatype = "left";
			}
			else if (nPivotIndex == -2) {
				areatype = "right";
			}
		}
		else {
			areatype = nPivotIndex;
		}

		if (bBandIndex == true || nPivotIndex >= -2) {
			if (areatype == "left") {
				if (nColIndex >= leftcnt) {
					return false;
				}
			}
			if (areatype == "body" && nColIndex >= 0) {
				if (nColIndex >= bodycnt) {
					return false;
				}

				nColIndex += leftcnt;
			}
			else if (areatype == "right") {
				if (nColIndex >= rightcnt) {
					return false;
				}

				nColIndex += leftcnt;
				nColIndex += bodycnt;
			}
		}

		var bChange = false;
		if (nColIndex == -1) {
			var change;
			for (var i = 0; i < _colsLen; i++) {
				if (autosize) {
					if (_cols[i]._area == "left" && this._AutoSizeLcol == false) {
						continue;
					}

					if (_cols[i]._area == "right" && this._AutoSizeRcol == false) {
						continue;
					}
				}

				change = format.setFormatColProperty(i, "size", nSize);

				if (change) {
					bChange = change;
					this._autofitcol_rate = [];

					if (bRedraw) {
						this._recreate_contents_all(true, false);
					}
				}
			}
		}
		else {
			while (true) {
				if (autosize) {
					if (_cols[nColIndex]._area == "left" && this._AutoSizeLcol == false) {
						break;
					}

					if (_cols[nColIndex]._area == "right" && this._AutoSizeRcol == false) {
						break;
					}
				}
				if (bChange = format._setColSize(nColIndex, nSize, noAdjust)) {
					if (bRedraw) {
						if (this.enableredraw) {
							this._updateColSize(nColIndex);
						}
						else {
							if (!this._enable_redraw_history.updatecolsize) {
								this._enable_redraw_history.updatecolsize = [];
							}

							this._enable_redraw_history.updatecolsize.push(nColIndex);
						}
					}
				}
				break;
			}
		}

		return bChange;
	};

	_pGrid._getLastRowBand = function () {
		var format = this._curFormat;
		var band = "body";

		if (this.summarytype == "top" || this.summarytype == "lefttop") {
			if (format._headrows && format._headrows.length) {
				band = "head";
			}

			if (format._summrows && format._summrows.length) {
				band = "summ";
			}

			if (format._bodyrows && format._bodyrows.length) {
				band = "body";
			}
		}
		else {
			if (format._headrows && format._headrows.length) {
				band = "head";
			}

			if (format._bodyrows && format._bodyrows.length) {
				band = "body";
			}

			if (format._summrows && format._summrows.length) {
				band = "summ";
			}
		}
		return band;
	};

	_pGrid._getDispRowCnt = function () {
		if (this._bodyBand) {
			return this._bodyBand._get_rows().length;
		}

		return 0;
	};

	_pGrid._getScreenBottomRowPos = function (vpos, b_force) {
		if (!this._is_use_suppress && !this._is_performance_scroll && !b_force) {
			return -2;
		}

		var band = this._bodyBand;
		var scrolltop = (vpos != null) ? vpos : this._getScrollTop();
		var row = -1;
		var height = 0;
		var cnt = this._getGridRowCount();
		var bandh = this._getAvailableRect(band).height;

		for (var i = 0; i < cnt; i++) {
			if (i <= this._fixed_endrow) {
				continue;
			}

			height += this._getRowSize(i);

			if (height >= scrolltop + bandh) {
				row = i;
				break;
			}
		}
		return row;
	};

	_pGrid._getScreenBottomRowPosEx = function (vpos) {
		if (!this._is_use_suppress && !this._is_performance_scroll) {
			return -1;
		}

		var band = this._bodyBand;
		var scrolltop = (vpos != null) ? vpos : this._getScrollTop();
		var row = -1, over = 0;
		var height = 0;
		var cnt = this._getGridRowCount();
		var bandh = this._getAvailableRect(band).height;

		for (var i = 0; i < cnt; i++) {
			if (i <= this._fixed_endrow) {
				continue;
			}

			height += this._getRowSize(i);

			if (height <= scrolltop + bandh) {
				row = i;
			}
			else {
				over++;
			}
		}
		return [row, over];
	};

	_pGrid._getScreenTopRowPos = function (vpos) {
		var band = this._bodyBand;
		var scrolltop = (vpos != null) ? vpos : this._getScrollTop();
		var row = 0;
		var height = 0;
		var cnt = this._getGridRowCount();
		var remain = 0;
		var bset = false;

		for (var i = 0; i < cnt; i++) {
			if (i <= this._fixed_endrow) {
				continue;
			}

			if (height > scrolltop) {
				row = i - 1;
				remain = height - scrolltop;
				bset = true;
				break;
			}
			height += this._getRowSize(i);
		}

		if (!bset) {
			if (band._getClientHeight() < height) {
				if (height > scrolltop) {
					row = i - 1;
					remain = height - scrolltop;
				}
			}
			else {
				row = this._getFixRowCnt();
			}
		}
		return [row, remain];
	};

	_pGrid._isRemainAreaScroll = function () {
		var band = this._bodyBand;
		var rows = band._get_rows();

		if (rows.length == 0) {
			return false;
		}

		var scrolltop = this._getScrollTop();
		var height = 0;
		var rows_len = rows.length;
		var lastrow = rows[rows_len - 1];
		var lastrowidx = this._getGridRowCount() - 1;

		if (lastrow._rowidx != lastrowidx) {
			return false;
		}

		var bodyheight = this._getBodyClientSize()[1];
		var lasttoprow = 0;

		for (var i = rows.length - 1; i >= 0; i--) {
			lasttoprow = rows[i]._rowidx;
			height += this._getRowSize(lasttoprow);

			if (height >= bodyheight) {
				break;
			}
		}

		scrolltop -= rows[0]._adjust_top;

		for (i = 0; i < rows_len; i++) {
			if (height == scrolltop) {
				return false;
			}
			else if (height > scrolltop) {
				return (lasttoprow == rows[i]._rowidx - 1);
			}
			height += this._getRowSize(rows[i]._rowidx);
		}
		return false;
	};

	_pGrid._getScollMaxLeft = function () {
		if (this._control_element) {
			return this._control_element.hscroll_limit;
		}

		return 0;
	};

	_pGrid._getScrollLeft = function () {
		if (this._control_element) {
			return this._control_element.scroll_left;
		}

		return 0;
	};

	_pGrid._getScrollTop = function () {
		if (this._control_element) {
			return this._control_element.scroll_top;
		}

		return 0;
	};

	_pGrid._getDataRow = function (rowidx) {
		if (rowidx >= this._rowcount) {
			return -9;
		}

		if (this._hasTree && rowidx >= 0) {
			rowidx = this._treeIndexes[rowidx];
			if (rowidx == undefined) {
				rowidx = -9;
			}
		}
		return rowidx;
	};

	_pGrid._getGridRow = function (datarow) {
		if (this._hasTree && datarow >= 0) {
			var _treeKeys = this._treeKeys;
			var row = _treeKeys.indexOf(datarow);

			if (row != undefined) {
				return row;
			}
			return -9;
		}
		return datarow;
	};

	_pGrid._refreshCol = function (nColIdx, clearCurstyle, strBand) {
		if (!this.enableredraw) {
			this._enable_redraw_history.refreshall = true;
			return;
		}

		if (this._after_recreate) {
			return;
		}

		if (!this.getElement()) {
			return;
		}

		var band = this._headBand;
		var cells;
		var cellsLen;
		var i, j, nn;
		var cell;

		if (band && (!strBand || strBand == "head")) {
			cells = band._get_rows()[0];
			cellsLen = cells.length;

			for (i = 0; i < cellsLen; i++) {
				cell = cells[i];
				if (cell && cell._refinfo._col == nColIdx) {
					cell._updateAll();
				}
			}
		}
		band = this._summBand;
		if (band && (!strBand || (strBand == "summ" || strBand == "summary"))) {
			cells = band._get_rows()[0];
			cellsLen = cells.length;

			for (i = 0; i < cellsLen; i++) {
				cell = cells[i];
				if (cell && cell._refinfo._col == nColIdx) {
					cell._updateAll();
				}
			}
		}
		band = this._bodyBand;
		var rows = band._get_rows();
		if (band && rows.length && (!strBand || strBand == "body")) {
			cells = rows[0]._cells;
			cellsLen = cells.length;

			for (i = 0; i < cellsLen; i++) {
				cell = cells[i];
				if (cell && cell._refinfo._col == nColIdx) {
					for (j = 0, nn = this._getDispRowCnt(); j < nn; j++) {
						this._refreshCell("body", cell._cellidx, j);
					}
				}
			}
		}
	};

	_pGrid._refreshCell = function (strBand, nCellIdx, nDisplayRowIdx, styleprop, nSubCellIdx, for_select) {
		if (!this.enableredraw) {
			this._enable_redraw_history.refreshall = true;
			return;
		}

		if (this._after_recreate) {
			return;
		}

		var cell, band, subcellinfo, cellinfo;

		strBand = strBand.toLowerCase();

		if (strBand == "head") {
			band = this._headBand;
			if (band) {
				cell = band._get_rows()[0]._cells[nCellIdx];
				if (cell) {
					if (nSubCellIdx >= 0) {
						subcellinfo = cell._refinfo._subcells[nSubCellIdx];
						if (styleprop && subcellinfo && cell.subcells[nSubCellIdx]["set_" + styleprop]) {
							cell.subcells[nSubCellIdx]["set_" + styleprop](subcellinfo._getAttrValue(subcellinfo[styleprop], this._currentDSrow));
						}
					}
					else {
						cellinfo = cell._refinfo;
						if (styleprop && cell["set_" + styleprop]) {
							cell["set_" + styleprop](cellinfo._getAttrValue(cellinfo[styleprop], this._currentDSrow));
						}
					}

					cell._updateAll();
				}
			}
		}
		else if (strBand == "summ" || strBand == "summary") {
			band = this._summBand;
			if (band) {
				cell = band._get_rows()[0]._cells[nCellIdx];
				if (cell) {
					if (nSubCellIdx >= 0) {
						subcellinfo = cell._refinfo._subcells[nSubCellIdx];
						if (styleprop && subcellinfo && cell.subcells[nSubCellIdx]["set_" + styleprop]) {
							cell.subcells[nSubCellIdx]["set_" + styleprop](subcellinfo._getAttrValue(subcellinfo[styleprop], this._currentDSrow));
						}
					}
					else {
						cellinfo = cell._refinfo;
						if (styleprop && cell["set_" + styleprop]) {
							cell["set_" + styleprop](cellinfo._getAttrValue(cellinfo[styleprop], this._currentDSrow));
						}
					}
					cell._updateAll();
				}
			}
		}
		else {
			if (nDisplayRowIdx >= 0) {
				this._refreshBodyCell(nCellIdx, nDisplayRowIdx, for_select, styleprop, nSubCellIdx);
			}
			else {
				for (var i = 0, n = this._getDispRowCnt(); i < n; i++) {
					this._refreshBodyCell(nCellIdx, i, for_select, styleprop, nSubCellIdx);
				}
			}
		}
	};

	_pGrid._isEnable = function () {
		this._enable = nexacro.Component.prototype._isEnable.call(this);
		return this._enable;
	};

	_pGrid._getMaxColDataSizeBand = function (nColIndex, chk_srow) {
		var totalmax = -1;
		var format = this._curFormat;
		var cells;
		var cellsLen;
		var colcells;
		var size;
		var maxbyte;
		var bfont, bselfont, bborder, bpadding;
		var cellinfo, prevcellinfo, subcells;
		var i, j, nn;
		var max;

		if (this._bodyAutoSize) {
			max = -1;

			if (this._binddataset) {
				var rowcount = this._getGridRowCount();

				if (rowcount > 0 && format._bodycells) {
					if (!this._preloadTreeImage()) {
						return -1;
					}

					if (!this._preloadImage()) {
						return -1;
					}

					cells = format._bodycells;
					cellsLen = cells.length;
					colcells = [];
					maxbyte = {
						max : -1, 
						len : -1
					};

					for (i = 0; i < cellsLen; i++) {
						cellinfo = cells[i];

						if (cellinfo._col <= nColIndex && (cellinfo._col + cellinfo._colspan) > nColIndex) {
							if (cellinfo != prevcellinfo) {
								colcells.push(cellinfo);
							}

							prevcellinfo = cellinfo;

							if (cellinfo._subcells.length) {
								subcells = cellinfo._subcells;

								for (j = 0, nn = subcells.length; j < nn; j++) {
									if (cellinfo._col + subcells[j]._col <= nColIndex && (cellinfo._col + subcells[j]._col + subcells._colspan) > nColIndex) {
										cellinfo = subcells[j];
										break;
									}
								}
							}

							if (maxbyte) {
								if (cellinfo._curfont === undefined) {
									this._getCellStyleInfo(cellinfo._cellidx, "font", 0, false, undefined, true);
								}
								if (cellinfo._curselfont === undefined) {
									this._getCellStyleInfo(cellinfo._cellidx, "font", 0, true, undefined, true);
								}
								if (cellinfo._curborder === undefined) {
									this._getCellStyleInfo(cellinfo._cellidx, "border", 0, false, undefined, true);
								}
								if (cellinfo._curpadding === undefined) {
									this._getCellStyleInfo(cellinfo._cellidx, "padding", 0, undefined, undefined, true);
								}

								if (cellinfo._curfont === "bindexpr" || cellinfo._curselfont === "bindexpr" || cellinfo._curborder === "bindexpr" || cellinfo._curpadding === "bindexpr") {
									maxbyte = null;
									continue;
								}
								else if (bfont !== undefined) {
									if ((bfont != cellinfo._curfont) || (bselfont != cellinfo._curselfont) || (bborder != cellinfo._curborder) || (bpadding != cellinfo._curpadding)) {
										maxbyte = null;
										continue;
									}
								}

								bfont = cellinfo._curfont;
								bselfont = cellinfo._curselfont;
								bborder = cellinfo._curborder;
								bpadding = cellinfo._curpadding;
							}
						}
					}

					for (j = 0; j < rowcount; j++) {
						var datarow = this._getDataRow(j);

						if (chk_srow >= 0 && j < chk_srow) {
							max = format._cols[nColIndex].size;
							continue;
						}

						size = this._getMaxColSize(colcells, nColIndex, datarow, null, maxbyte);

						if (size < 0) {
							return -1;
						}

						max = Math.max(max, size);
					}
				}
			}
			totalmax = Math.max(totalmax, max);
		}
		if (this._headAutoSize && format._headcells) {
			cells = format._headcells;
			cellsLen = cells.length;
			colcells = [];

			for (i = 0; i < cellsLen; i++) {
				cellinfo = cells[i];
				if (cellinfo._col <= nColIndex && (cellinfo._col + cellinfo._colspan) > nColIndex) {
					colcells.push(cellinfo);
				}
			}

			max = this._getMaxColSize(colcells, nColIndex, -1);
			totalmax = Math.max(totalmax, max);
		}

		if (this._summAutoSize && format._summcells) {
			cells = format._summcells;
			cellsLen = cells.length;
			colcells = [];

			for (i = 0; i < cellsLen; i++) {
				cellinfo = cells[i];
				if (cellinfo._col <= nColIndex && (cellinfo._col + cellinfo._colspan) > nColIndex) {
					colcells.push(cellinfo);
				}
			}

			max = this._getMaxColSize(colcells, nColIndex, -2);
			totalmax = Math.max(totalmax, max);
		}
		return totalmax;
	};

	_pGrid._on_treeloadImagetemp = function (url, imgW, imgH) {
	};

	_pGrid._img_preload_cnt = 0;
	_pGrid._hasTree = false;
	_pGrid._treeIndexes = null;
	_pGrid._treeKeys = null;
	_pGrid._treeStates = null;
	_pGrid._treeChecked = null;
	_pGrid._treeCellinfo = null;
	_pGrid._hasSameNextNode = null;
	_pGrid._maxdepth = 0;
	_pGrid._rootlevel = 99;
	_pGrid._treeInitStatus = {
		"collapse,null" : 0, 
		"expand,null" : 1, 
		"collapse,all" : 2, 
		"expand,all" : 3
	};
	_pGrid._currentCellEditor = null;
	_pGrid._currentCellCell = -1;
	_pGrid._currentCellRow = -1;
	_pGrid._showEditing = false;
	_pGrid._beforeEditRowIdx = -1;
	_pGrid._beforeEditCellIdx = -1;
	_pGrid._onceTime_focus = false;
	_pGrid._set_focus_dir = -1;
	_pGrid._showEditorFocus = false;

	_pGrid._on_treeloadImage = function (url, imgW, imgH) {
		var tree_load = this._tree_load_all;
		tree_load[url] = true;

		var key, load = true;

		this._img_preload_cnt--;

		for (key in tree_load) {
			if (tree_load.hasOwnProperty(key)) {
				if (tree_load[key].isload == false) {
					load = false;
					break;
				}
			}
		}

		if (load) {
			if (this._is_created && this._img_preload_cnt == 0) {
				this._recreate_contents_all(true);
			}
		}
		else {
			if (this._is_created) {
				if (this._resetColSizeList()) {
					this._bodyBand._matrix._adjustColsDisplay(true);
				}
			}
		}
	};

	_pGrid._on_sizeloading = function (url, imgW, imgH) {
		var image_load = this._image_load_all;
		image_load[url] = true;

		var key, load = true;

		this._img_preload_cnt--;

		for (key in image_load) {
			if (image_load.hasOwnProperty(key)) {
				if (image_load[key].isload == false) {
					load = false;
					break;
				}
			}
		}

		if (load) {
			if (this._is_created && this._img_preload_cnt == 0) {
				this._recreate_contents_all(true);
			}
		}
		else {
			if (this._is_created) {
				if (this._resetColSizeList()) {
					this._bodyBand._matrix._adjustColsDisplay(true);
				}
			}
		}
	};

	_pGrid._preloadTreeImage = function () {
		if (this._tree_load_all != null) {
			return true;
		}

		if (!this._binddataset) {
			return true;
		}

		var rowcount = this._binddataset.getRowCount();
		var cellinfos = this._curFormat._bodycells;
		var state, displayType, cellinfo, prop;
		var image;
		var orgsrc;
		this._tree_load_all = {
		};

		for (var i = 0; i < rowcount; i++) {
			for (var j = 0, nn = cellinfos.length; j < nn; j++) {
				cellinfo = cellinfos[j];
				displayType = cellinfo._getDisplaytype(i);

				if (displayType != "treeitemcontrol") {
					continue;
				}

				state = this._treeStates[i];

				if (state == 0) {
					prop = "treecollapseimage";
				}
				else if (state == 1) {
					prop = "treeexpandimage";
				}
				else if (state == 2) {
					prop = "treeitemimage";
				}

				image = cellinfo._query_status_treecontrol(i, prop);
				if (image) {
					orgsrc = image;
					if (image.substring(0, 4).toLowerCase() == "url(") {
						image = image.substring(5, image.length - 2);
					}

					image = nexacro._getImageLocation(image, this._getRefFormBaseUrl());
					this._tree_load_all[image] = {
						"isload" : false, 
						"orgsrc" : orgsrc
					};
				}

				prop = "";
				if (state == 0) {
					prop += "treeopenbuttonimage";
				}
				else if (state == 1) {
					prop += "treeclosebuttonimage";
				}

				if (prop) {
					image = cellinfo._query_status_treecontrol(i, prop);
					if (image) {
						orgsrc = image;
						if (image.substring(0, 4).toLowerCase() == "url(") {
							image = image.substring(5, image.length - 2);
						}

						image = nexacro._getImageLocation(image, this._getRefFormBaseUrl());

						this._tree_load_all[image] = {
							"isload" : false, 
							"orgsrc" : orgsrc
						};
					}
				}
			}
		}

		var key, load = true, size;

		for (key in this._tree_load_all) {
			if (this._tree_load_all.hasOwnProperty(key)) {
				size = nexacro._getImageSize(key, this._on_treeloadImage, this, this._getRefFormBaseUrl(), this._tree_load_all[key].orgsrc);

				if (!size) {
					load = false;
					this._img_preload_cnt++;
				}
				else {
					this._tree_load_all[key].isload = true;
				}
			}
		}

		return load;
	};

	_pGrid._preloadImage = function () {
		if (this._image_load_all != null) {
			return true;
		}

		if (!this._binddataset) {
			return true;
		}

		var rowcount = this._binddataset.getRowCount();
		var cellinfos = this._curFormat._bodycells;
		var displayType, cellinfo;

		if (!cellinfos) {
			return true;
		}

		this._image_load_all = {
		};

		for (var i = 0; i < rowcount; i++) {
			for (var j = 0, nn = cellinfos.length; j < nn; j++) {
				cellinfo = cellinfos[j];
				displayType = cellinfo._getDisplaytype(i);

				var image;
				var orgsrc;
				if (displayType == "imagecontrol") {
					image = cellinfo._getDisplayText_text(i);
				}
				else if (displayType == "checkboxcontrol") {
					image = this._getCellStyleInfo(j, "checkboxicon", i);
				}

				if (image) {
					orgsrc = image;
					if (image.substring(0, 4).toLowerCase() == "url(") {
						image = image.substring(5, image.length - 2);
					}

					image = nexacro._getImageLocation(image, this._getRefFormBaseUrl());
					this._image_load_all[image] = {
						"isload" : false, 
						"orgsrc" : orgsrc
					};
				}

				var subcells = cellinfo._subcells;
				var subcellinfo;

				for (var k = 0, nnn = subcells.length; k < nnn; k++) {
					subcellinfo = subcells[k];
					displayType = subcellinfo._getDisplaytype(i);

					if (displayType == "imagecontrol") {
						image = subcellinfo._getDisplayText_text(i);
					}
					else if (displayType == "checkboxcontrol") {
						image = this._getCellStyleInfo(k, "checkboxicon", i, cellinfo);
					}

					if (image) {
						orgsrc = image;
						if (image.substring(0, 4).toLowerCase() == "url(") {
							image = image.substring(5, image.length - 2);
						}

						image = nexacro._getImageLocation(image, this._getRefFormBaseUrl());
						this._image_load_all[image] = {
							"isload" : false, 
							"orgsrc" : orgsrc
						};
					}
				}
			}
		}

		var key, load = true, size;

		for (key in this._image_load_all) {
			if (this._image_load_all.hasOwnProperty(key)) {
				size = nexacro._getImageSize(key, this._on_sizeloading, this, this._getRefFormBaseUrl(), this._image_load_all[key].orgsrc);

				if (size) {
					this._image_load_all[key].isload = true;
				}
				else {
					load = false;
					this._img_preload_cnt++;
				}
			}
		}
		return load;
	};

	_pGrid._getDepthWidth = function (datarow, cellinfo) {
		var displayType = cellinfo._getDisplaytype(datarow);

		if (displayType != "treeitemcontrol") {
			return 0;
		}

		var start = cellinfo._getTreeStartLevel(datarow);
		var level = cellinfo._getTreeLevel(datarow);
		var state = this._treeStates[datarow];
		var gap = 22;
		var defaultsize = 9;
		var imagewidth = 14;
		var buttonwidth = 14;
		var checkwidth;
		var prop;

		if (state == 0) {
			prop = "treecollapseimage";
		}
		else if (state == 1) {
			prop = "treeexpandimage";
		}
		else if (state == 2) {
			prop = "treeitemimage";
		}

		var image = cellinfo._query_status_treecontrol(datarow, prop);
		var size;
		var orgVal = undefined;
		if (image) {
			orgVal = image;
			if (image.substring(0, 4).toLowerCase() == "url(") {
				image = image.substring(5, image.length - 2);
			}

			image = nexacro._getImageLocation(image, this._getRefFormBaseUrl());
			size = nexacro._getImageSize(image, this._on_treeloadImagetemp, this, this._getRefFormBaseUrl(), orgVal);

			if (size) {
				imagewidth = size.width;
			}
		}

		prop = "";
		if (state == 0) {
			prop += "treeopenbuttonimage";
		}
		else if (state == 1) {
			prop += "treeclosebuttonimage";
		}

		if (prop) {
			image = cellinfo._query_status_treecontrol(datarow, prop);
			if (image) {
				orgVal = image;
				if (image.substring(0, 4).toLowerCase() == "url(") {
					image = image.substring(5, image.length - 2);
				}

				image = nexacro._getImageLocation(image, this._getRefFormBaseUrl());
				size = nexacro._getImageSize(image, this._on_treeloadImagetemp, this, this._getRefFormBaseUrl(), orgVal);
				if (size) {
					buttonwidth = size.width;
				}
			}
		}

		level -= start;

		if (level < 0) {
			level = -1;
		}

		var offset = (level *  gap) + defaultsize;
		var line_button_gap_width = 0;
		var btn_visible = ((state == 0 || state == 1) && this.treeusebutton == "use");

		var buttonLeft = offset - (buttonwidth / 2);

		if (buttonLeft < 0) {
			buttonLeft = offset - (defaultsize / 2);
		}

		if (!this.treeuseline) {
			buttonLeft -= ((buttonwidth / 2) *  level);
		}

		if (btn_visible) {
			line_button_gap_width = buttonwidth;
			offset = buttonLeft + buttonwidth;
		}
		else {
			if (!this.treeuseline) {
				offset = buttonLeft + buttonwidth;
			}
		}

		if (this.treeuseline) {
			offset += (buttonwidth - (line_button_gap_width / 2));
		}
		else {
			offset += 1;
		}

		if (this.treeusecheckbox == true) {
			checkwidth = cellinfo._getCheckboxsize(datarow);

			if (checkwidth == undefined) {
				checkwidth = this._getCellStyleInfo(cellinfo._cellidx, "treecheckboxsize", datarow, false);
				checkwidth = checkwidth[0];
			}
			offset += checkwidth;
		}

		if (this.treeuseimage == true) {
			offset += imagewidth;
			offset += 6;
		}
		else {
			offset += 4;
		}

		return offset;
	};

	_pGrid._isPassPrevCell = function (area, cells, type, idx) {
		var rowcnt = area.endsubrow.length;
		var b_subrow = area.begsubrow;
		var e_subrow = area.endsubrow;
		var b_col = area.begcol;
		var e_col = area.endcol;
		var cellcnt = cells.length;
		var i, j, n;

		if (type == "next" || type == "prev") {
			for (i = 0; i < rowcnt; i++) {
				for (j = 0; j < cellcnt; j++) {
					if (b_subrow[i] <= cells[j]._row && e_subrow[i] >= cells[j]._row) {
						if (cells[j]._colspan > 1) {
							if (type == "next" && cells[j]._col < idx && idx < cells[j]._col + cells[j]._colspan) {
								return true;
							}
							else if (type == "prev" && cells[j]._col <= idx && idx < cells[j]._col + cells[j]._colspan - 1) {
								return true;
							}
						}
					}
				}
			}
		}
		else {
			for (i = 0, n = cells.length; i < n; i++) {
				if (b_col <= cells[i]._col && e_col >= cells[i]._col) {
					if (cells[i]._rowspan > 1) {
						if (type == "down" && cells[i]._row < idx && idx < cells[i]._row + cells[i]._rowspan) {
							return true;
						}
						else if (type == "up" && cells[i]._row <= idx && idx < cells[i]._row + cells[i]._rowspan - 1) {
							return true;
						}
					}
				}
			}
		}
		return false;
	};

	_pGrid._getAreaMoveCell = function (type, afterIdx, row) {
		var selectinfo = this._selectinfo;

		if (selectinfo.area.length == 0) {
			return true;
		}

		var area = selectinfo.area[selectinfo.area.length - 1];
		var cells = this._curFormat._bodycells;

		if (type == "next") {
			if (selectinfo.ctrlpoint.col < afterIdx) {
				if (area.endcol >= afterIdx) {
					return false;
				}
			}
			else {
				if (this._isPassPrevCell(area, cells, type, afterIdx)) {
					return false;
				}
			}
		}
		else if (type == "prev") {
			if (selectinfo.ctrlpoint.col > afterIdx) {
				if (area.begcol <= afterIdx) {
					return false;
				}
			}
			else {
				if (this._isPassPrevCell(area, cells, type, afterIdx)) {
					return false;
				}
			}
		}
		else if (type == "down") {
			if (selectinfo.ctrlpoint.row < row || (selectinfo.ctrlpoint.row == row && selectinfo.ctrlpoint.subrow < afterIdx)) {
				if (area.endsubrow.length == (row - selectinfo.ctrlpoint.row + 1)) {
					if (area.endsubrow[area.endsubrow.length - 1] >= afterIdx) {
						return false;
					}
				}
			}
			else {
				if (this._isPassPrevCell(area, cells, type, afterIdx)) {
					return false;
				}
			}
		}
		else if (type == "up") {
			if (selectinfo.ctrlpoint.row > row || (selectinfo.ctrlpoint.row == row && selectinfo.ctrlpoint.subrow > afterIdx)) {
				if (area.begsubrow.length == (selectinfo.ctrlpoint.row - row + 1)) {
					if (area.begsubrow[0] <= afterIdx) {
						return false;
					}
				}
			}
			else {
				if (this._isPassPrevCell(area, cells, type, afterIdx)) {
					return false;
				}
			}
		}
		return true;
	};

	_pGrid._moveToCell = function (type, editable, colmove, area, lastcol, showcell) {
		if (!this._curFormat || !this._curFormat._bodycells) {
			return false;
		}

		var retn = false;
		var beforeCell, beforeCol, beforeRow, beforeSubrow, beforePvt;
		var afterCell, afterCol, afterRow, afterSubrow;
		var afterPvt = -9;

		beforeCell = this._beforebodycellpos = this._selectinfo.curcell;
		beforeCol = this._beforebodycolpos = this._selectinfo.curcol;
		beforeRow = this._beforebodyrowpos = this._selectinfo.curdsrow;
		beforeSubrow = this._beforebodysubrowpos = this._selectinfo.cursubrow;

		if (this._tempmergeeditor) {
			while (true) {
				if (this.__moveToCell(type, editable, colmove, area, lastcol, showcell)) {
					retn = true;
					afterCell = this._selectinfo.curcell;
					afterCol = this._selectinfo.curcol;
					afterRow = this._selectinfo.curdsrow;
					afterSubrow = this._selectinfo.cursubrow;

					var cell = this._getCurrentBodyCell(afterRow, afterCell);

					if (cell._virtualmerge) {
						continue;
					}
				}
				break;
			}
		}
		else {
			retn = this.__moveToCell(type, editable, colmove, area, lastcol, showcell);
			afterCell = this._selectinfo.curcell;
			afterCol = this._selectinfo.curcol;
			afterRow = this._selectinfo.curdsrow;
			afterSubrow = this._selectinfo.cursubrow;
		}

		if (!retn) {
			return false;
		}

		var evt_name;
		this._iskey_movetocell = false;

		if (this._keydown_elem) {
			this._iskey_movetocell = true;
			evt_name = "keydown";
		}

		this._hideEditor(undefined, undefined, this._need_confirm_control_value);
		var change = this._ChangeSelect(afterCell, afterCol, afterRow, afterSubrow, afterPvt, false, beforeCell, beforeCol, beforeRow, beforeSubrow, beforePvt, "body", evt_name);

		if (!this._keydown_elem) {
			nexacro._OnceCallbackTimer.callonce(this, function () {
				this._moveCellAfterFocus();
			});
		}
		else {
			if (change == false) {
				if (this.autoenter == "select") {
					nexacro._OnceCallbackTimer.callonce(this, function () {
						this._showEditor();
					});
				}
			}
		}
		return true;
	};

	_pGrid.__moveToCell = function (type, editable, colmove, area, lastcol, showcell) {
		if (this._selectinfo.curdsrow < 0 && !editable) {
			if (this.rowcount > 0 && (type == "next" || type == "down")) {
				return this._moveToPosCell(0, 0);
			}

			return false;
		}

		var format = this._curFormat;
		var beforeCell, beforeCol, beforeRow, beforeSubrow, beforePvt;
		var afterCell, afterCol, afterRow, afterSubrow;
		var afterPvt = -9;
		var cellarr;
		var bodycells = format._bodycells;
		var bodycells_len = bodycells.length;
		var i;
		var _treeKeys;
		var row;
		var rowcount;
		var prevcell, prevcol, prevsubrow;
		var selectedrowspan;
		var newsubrow;
		var cellinfo;
		var editType;
		var obj;


		if (type == "next") {
			if (editable) {
				cellarr = this._getLastEditableCell();
				if (cellarr.row == null || (cellarr.row <= this._selectinfo.curdsrow && cellarr.cell == this._selectinfo.curcell)) {
					this._hideEditor();

					if (this._setdataobj && this._setdataobj.succ == false) {
						beforeCell = this._beforebodycellpos = this._selectinfo.curcell;
						beforeCol = this._beforebodycolpos = this._selectinfo.curcol;
						beforeRow = this._beforebodyrowpos = this._selectinfo.curdsrow;
						beforeSubrow = this._beforebodysubrowpos = this._selectinfo.cursubrow;


						this._setSelectedInfo(beforeCell, beforeCol, beforeRow, beforeSubrow, beforePvt);
						this._iskey_movetocell = true;
						this._setdataobj = null;

						if (this.autoenter == "select") {
							this._showEditor();
						}

						return true;
					}
					return false;
				}
			}

			while (true) {
				rowcount = this.rowcount;
				if (this._selectinfo.currow >= (rowcount - 1) && this._selectinfo.curcell >= (format._bodycells.length - 1)) {
					return false;
				}

				if (this._selectinfo.curcell >= bodycells.length - 1) {
					if (colmove) {
						return false;
					}
					while (true) {
						afterCell = 0;
						afterCol = 0;
						afterRow = this._selectinfo.curdsrow + 1;
						afterSubrow = 0;

						this._setSelectedInfo(afterCell, afterCol, afterRow, afterSubrow, afterPvt);

						if (this._hasTree) {
							_treeKeys = this._treeKeys;
							row = _treeKeys.indexOf(afterRow);

							if (row != undefined) {
								break;
							}

							continue;
						}
						break;
					}
				}
				else {
					if (colmove) {
						afterCell = this._selectinfo.curcell;
						afterCol = bodycells[this._selectinfo.curcell]._col + bodycells[this._selectinfo.curcell]._colspan;
						afterRow = this._selectinfo.curdsrow;
						afterSubrow = this._selectinfo.cursubrow;

						for (i = 0; i < bodycells_len; i++) {
							if (bodycells[i]._col == afterCol && (bodycells[i]._row <= this._selectinfo.cursubrow && this._selectinfo.cursubrow < (bodycells[i]._row + bodycells[i]._rowspan))) {
								if (!area || area == bodycells[i]._area) {
									afterCell = i;
									afterSubrow = bodycells[i]._row;
									break;
								}
							}
						}

						if (afterCell == this._selectinfo.curcell) {
							return false;
						}
					}
					else {
						afterCell = this._selectinfo.curcell + 1;
						afterCol = bodycells[afterCell]._col;
						afterRow = this._selectinfo.curdsrow;
						afterSubrow = bodycells[afterCell]._row;
					}

					if (lastcol != undefined && lastcol < afterCol) {
						return false;
					}

					this._setSelectedInfo(afterCell, afterCol, afterRow, afterSubrow, afterPvt);

					if (format._cols[afterCol].size <= 0) {
						continue;
					}

					if (this._isAreaSelect()) {
						if (!this._getAreaMoveCell(type, afterCol, afterRow)) {
							continue;
						}
					}
				}

				if (editable) {
					if (this._hasTree) {
						_treeKeys = this._treeKeys;
						row = _treeKeys.indexOf(afterRow);

						if (row != undefined) {
							break;
						}

						continue;
					}

					cellinfo = bodycells[afterCell];
					editType = cellinfo._getEdittype(afterRow);

					if (editType == "" || editType == "none") {
						continue;
					}
				}

				if (showcell && afterRow >= 0) {
					obj = this._getCurrentBodyCell(afterRow, afterCell);
					if (obj) {
						obj._showfull(obj);
					}
				}
				break;
			}
		}
		else if (type == "prev") {
			while (true) {
				if (this._selectinfo.curcell <= 0) {
					if (colmove || this._selectinfo.currow <= 0) {
						this._hideEditor();

						if (this._setdataobj && this._setdataobj.succ == false) {
							beforeCell = this._beforebodycellpos = this._selectinfo.curcell;
							beforeCol = this._beforebodycolpos = this._selectinfo.curcol;
							beforeRow = this._beforebodyrowpos = this._selectinfo.curdsrow;
							beforeSubrow = this._beforebodysubrowpos = this._selectinfo.cursubrow;


							this._setSelectedInfo(beforeCell, beforeCol, beforeRow, beforeSubrow, beforePvt);
							this._iskey_movetocell = true;
							this._setdataobj = null;

							if (this.autoenter == "select") {
								this._showEditor();
							}

							return true;
						}

						return false;
					}

					while (true) {
						afterCell = format._bodycells.length - 1;
						afterCol = bodycells[afterCell]._col;
						afterRow = this._selectinfo.curdsrow - 1;
						afterSubrow = bodycells[afterCell]._row;

						this._setSelectedInfo(afterCell, afterCol, afterRow, afterSubrow, afterPvt);
						if (this._hasTree) {
							_treeKeys = this._treeKeys;
							row = _treeKeys.indexOf(afterRow);

							if (row != undefined) {
								break;
							}

							continue;
						}

						break;
					}
				}
				else {
					var newcol;
					if (colmove) {
						afterCell = this._selectinfo.curcell;
						newcol = afterCol = this._selectinfo.curcol - 1;
						afterRow = this._selectinfo.curdsrow;
						afterSubrow = this._selectinfo.cursubrow;

						for (i = 0; i < bodycells_len; i++) {
							if ((bodycells[i]._col <= afterCol && afterCol < bodycells[i]._col + bodycells[i]._colspan) && (bodycells[i]._row <= this._selectinfo.cursubrow && this._selectinfo.cursubrow < (bodycells[i]._row + bodycells[i]._rowspan))) {
								if (!area || area == bodycells[i]._area) {
									afterCol = bodycells[i]._col;
									afterCell = i;
									afterSubrow = bodycells[i]._row;
									break;
								}
							}
						}
						if (afterCell == this._selectinfo.curcell) {
							return false;
						}
					}
					else {
						afterCell = this._selectinfo.curcell - 1;
						newcol = afterCol = bodycells[afterCell]._col;
						afterRow = this._selectinfo.curdsrow;
						afterSubrow = bodycells[afterCell]._row;
					}

					if (lastcol != undefined && lastcol > afterCol) {
						return false;
					}

					this._setSelectedInfo(afterCell, afterCol, afterRow, afterSubrow, afterPvt);

					if (format._cols[afterCol].size <= 0) {
						continue;
					}

					if (this._isAreaSelect()) {
						if (!this._getAreaMoveCell(type, newcol, afterRow)) {
							continue;
						}
					}
				}

				if (editable) {
					if (this._hasTree) {
						_treeKeys = this._treeKeys;
						row = _treeKeys.indexOf(afterRow);

						if (row != undefined) {
							break;
						}

						continue;
					}

					cellinfo = bodycells[afterCell];
					editType = cellinfo._getEdittype(afterRow);

					if (editType == "" || editType == "none") {
						continue;
					}
				}

				if (showcell && afterRow >= 0) {
					obj = this._getCurrentBodyCell(afterRow, afterCell);
					if (obj) {
						obj._showfull(obj);
					}
				}

				break;
			}
		}
		else if (type == "up") {
			prevcell = -1;
			prevcol = -1;
			prevsubrow = -1;

			while (true) {
				if (this._isSelectRowType()) {
					if (this._selectinfo.curdsrow == 0) {
						return false;
					}

					afterCell = this._selectinfo.curcell;
					afterCol = this._selectinfo.curcol;
					afterRow = this._selectinfo.curdsrow - 1;
					afterSubrow = this._selectinfo.cursubrow;
				}
				else {
					if (this._selectinfo.curdsrow == 0 && this._selectinfo.cursubrow == 0) {
						return false;
					}

					if (this._fixed_startrow >= this._selectinfo.curdsrow) {
						return false;
					}


					if (this._selectinfo.cursubrow == 0) {
						for (i = bodycells_len - 1; i >= 0; i--) {
							if (bodycells[i]._col <= this._selectinfo.curcol && this._selectinfo.curcol < (bodycells[i]._col + bodycells[i]._colspan)) {
								prevcell = bodycells[i]._cellidx;
								prevcol = bodycells[i]._col;
								prevsubrow = bodycells[i]._row;
								newsubrow = prevsubrow + bodycells[i]._rowspan - 1;
								break;
							}
						}
						afterCol = prevcol;
						afterCell = prevcell;
						afterRow = this._selectinfo.curdsrow - 1;
						afterSubrow = prevsubrow;
					}
					else {
						for (i = this._selectinfo.curcell - 1; i >= 0; i--) {
							if (bodycells[i]._col <= this._selectinfo.curcol && this._selectinfo.curcol < (bodycells[i]._col + bodycells[i]._colspan) && 
								bodycells[i]._row <= (this._selectinfo.cursubrow - 1) && (this._selectinfo.cursubrow - 1) < (bodycells[i]._row + bodycells[i]._rowspan)) {
								prevcell = bodycells[i]._cellidx;
								prevcol = bodycells[i]._col;
								prevsubrow = bodycells[i]._row;
								newsubrow = prevsubrow + bodycells[i]._rowspan - 1;
								break;
							}
						}

						afterCol = prevcol;
						afterCell = prevcell;
						afterRow = this._selectinfo.curdsrow;
						afterSubrow = prevsubrow;
					}
				}

				this._setSelectedInfo(afterCell, afterCol, afterRow, afterSubrow, afterPvt);

				if (this._hasTree) {
					_treeKeys = this._treeKeys;
					row = _treeKeys.indexOf(afterRow);

					if (row != undefined) {
						break;
					}

					continue;
				}

				if (this._isAreaSelect()) {
					if (!this._getAreaMoveCell(type, newsubrow, afterRow)) {
						continue;
					}
				}

				break;
			}
		}
		else if (type == "down") {
			rowcount = this._getGridRowCount();
			var curr = this._dsRowToDispRow(this._selectinfo.curdsrow);
			var lastsubrow = format._bodyrows.length - 1;
			var nextcell = -1, nextcol = -1, nextsubrow = -1;

			while (true) {
				if (this._isSelectRowType()) {
					if (rowcount - 1 <= curr) {
						return false;
					}

					afterCell = this._selectinfo.curcell;
					afterCol = this._selectinfo.curcol;
					afterRow = this._selectinfo.curdsrow + 1;
					afterSubrow = this._selectinfo.cursubrow;
				}
				else {
					selectedrowspan = bodycells[this._selectinfo.curcell]._rowspan;

					if (rowcount - 1 <= curr && (this._selectinfo.cursubrow + selectedrowspan) - 1 == lastsubrow) {
						if (this._vscrollmng) {
							this._vscrollmng.setPos(this._vscrollmng.max);
						}

						return false;
					}

					if ((this._selectinfo.cursubrow + selectedrowspan - 1) == lastsubrow) {
						for (i = 0; i < bodycells_len; i++) {
							if (bodycells[i]._col <= this._selectinfo.curcol && this._selectinfo.curcol < (bodycells[i]._col + bodycells[i]._colspan)) {
								nextcell = bodycells[i]._cellidx;
								nextcol = bodycells[i]._col;
								nextsubrow = bodycells[i]._row;
								break;
							}
						}
						afterCol = nextcol;
						afterCell = nextcell;
						afterRow = this._selectinfo.curdsrow + 1;
						afterSubrow = nextsubrow;
					}
					else {
						for (i = this._selectinfo.curcell + 1; i < bodycells_len; i++) {
							if (bodycells[i]._col <= this._selectinfo.curcol && this._selectinfo.curcol < (bodycells[i]._col + bodycells[i]._colspan) && (bodycells[i]._row == this._selectinfo.cursubrow + (selectedrowspan - 1) + 1)) {
								nextcell = bodycells[i]._cellidx;
								nextcol = bodycells[i]._col;
								nextsubrow = bodycells[i]._row;
								break;
							}
						}

						afterCol = nextcol;
						afterCell = nextcell;
						afterRow = this._selectinfo.curdsrow;
						afterSubrow = nextsubrow;
					}
				}

				this._setSelectedInfo(afterCell, afterCol, afterRow, afterSubrow, afterPvt);

				if (this._hasTree) {
					_treeKeys = this._treeKeys;
					row = _treeKeys.indexOf(afterRow);

					if (row != undefined) {
						break;
					}

					continue;
				}

				if (this._isAreaSelect()) {
					if (!this._getAreaMoveCell(type, afterSubrow, afterRow)) {
						continue;
					}
				}

				break;
			}
		}



		return true;
	};

	_pGrid._moveCellAfterFocus = function () {
		var retn = true;

		if (this.autoenter == "select") {
			if (nexacro._Browser == "IE" || nexacro._Browser == "Opera" || (nexacro._Browser == "Edge" && nexacro._BrowserType == "Edge")) {
				this._onceTime_focus = true;
			}

			if (this._currentBand == "body" && !this._showEditor()) {
				if (this._is_data_enter_apply) {
					this._is_data_enter_apply = false;
					this._hideEditor();
				}
				else {
					this._showEditor();
				}

				retn = false;
			}
			this._onceTime_focus = false;
		}
		return retn;
	};

	_pGrid._setTree = function (v, no_recreate) {
		v = nexacro._toBoolean(v);

		if (this._hasTree != v) {
			this._hasTree = v;

			if (v == true) {
				this._setFixedRow(-1, true);
				this._initTreeStates();
			}
			else {
				this._clearTreeStates();
			}
			if (!no_recreate) {
				this._recreate_contents_all(false, false, true);
			}
		}
	};

	_pGrid._setTreeCellinfo = function (v, no_recreate) {
		if (this._treeCellinfo != v) {
			this._treeCellinfo = v;
			this._setTree(true, no_recreate);
		}
	};

	_pGrid._removeTreeCellinfo = function (v, no_recreate) {
		if (this._treeCellinfo == v) {
			this._treeCellinfo = null;
			this._setTree(false, no_recreate);
		}
	};

	_pGrid._initTreeStates = function (keepstate, recheck_leaf) {
		if (this._hasTree && this._binddataset) {
			this._treeIndexes = this._createTreeIndexes();
			this._treeStates = this._createTreeStates(keepstate, undefined, recheck_leaf);
			this._treeChecked = this._createTreeChecked();
			this._createTreeHasChild();
			this._applyTreeStates();
			this._createTreeKeys();

			if (this._treeIndexes.length > 0) {
				this.rowcount = this._treeIndexes.length;
			}
			else {
				this.rowcount = 0;
			}
		}
	};

	_pGrid._createTreeHasChild = function () {
		var rowcount = this._rowcount;
		var cellinfo = this._treeCellinfo;

		if (this._hasSameNextNode) {
			delete this._hasSameNextNode;
		}

		this._hasSameNextNode = new Array(rowcount);

		for (var i = rowcount - 1; i >= 0; i--) {
			var lvl = cellinfo._getTreeLevel(i);
			this._maxdepth = Math.max(lvl, this._maxdepth);
			this._rootlevel = Math.min(lvl, this._rootlevel);

			if (this._hasSameNextNode[i] == undefined) {
				var val = [];
				val[0] = lvl;
				val[1] = false;
				this._hasSameNextNode[i] = val;

				for (var j = i - 1; j >= 0; j--) {
					var lvl2 = cellinfo._getTreeLevel(j);
					if (lvl == lvl2) {
						val = [];
						val[0] = lvl;
						val[1] = true;
						this._hasSameNextNode[j] = val;
					}
					else if (lvl > lvl2) {
						break;
					}
				}
			}
		}

		this._rootlevel = Math.max(cellinfo._getTreeStartLevel(0), this._rootlevel);
	};

	_pGrid._createTreeKeys = function () {
		if (this._binddataset == null) {
			return;
		}

		var rowcount = this._binddataset.rowcount;
		var keys;

		if (this._treeKeys) {
			this._treeKeys.clear();
			keys = this._treeKeys;
		}
		else {
			keys = this._treeKeys = new nexacro.Collection();
		}

		for (var i = 0; i < rowcount; i++) {
			keys.setItem(this._treeIndexes[i], i);
		}
	};

	_pGrid._createTreeIndexes = function () {
		if (this._binddataset == null) {
			return [];
		}

		var rowcount = this._binddataset.rowcount;
		var indexes = new Array(rowcount);

		for (var i = 0; i < rowcount; i++) {
			indexes[i] = i;
		}

		return indexes;
	};

	_pGrid._getTreeDefaultStatus = function () {
		var initstatus = this._treeInitStatus[this.treeinitstatus];

		if (initstatus == null) {
			initstatus = 0;
		}

		var defaultstatus;

		if (initstatus == 0 || initstatus == 1) {
			defaultstatus = (initstatus == 0) ? 0 : 1;
		}
		else if (initstatus == 2 || initstatus == 3) {
			defaultstatus = (initstatus == 2) ? 0 : 1;
		}

		return defaultstatus;
	};

	_pGrid._createTreeStates = function (keepstate, ignoreDS, recheck_leaf) {
		if (this._binddataset == null) {
			return [];
		}

		var dataset = this._binddataset;
		var rowcount = dataset.rowcount;
		var states = new Array(rowcount);
		var cellinfo = this._treeCellinfo;
		var initstatus = this._treeInitStatus[this.treeinitstatus];
		var state = null;
		var level;
		var prelevel;
		var prestate;

		if (initstatus == null) {
			initstatus = 0;
		}

		var oldstates = this._treeStates;
		var i;
		var defaultstatus;

		if (keepstate && oldstates.length == rowcount) {
			for (i = 0; i < rowcount; i++) {
				if (cellinfo.treestate._bindtype == 0) {
					states[i] = oldstates[i];
				}
			}
		}


		if (initstatus == 0 || initstatus == 1) {
			defaultstatus = (initstatus == 0) ? 0 : 1;
			prelevel = -1;

			for (i = 0; i < rowcount; i++) {
				if (!ignoreDS) {
					state = cellinfo._getTreeState(i);
				}

				if (states[i] == undefined || (recheck_leaf && states[i] == 2)) {
					if (nexacro._isNull(state) || state === "") {
						states[i] = defaultstatus;
					}
					else if (nexacro._isString(state)) {
						states[i] = Number(state);
					}
					else {
						states[i] = state;
					}
				}

				level = cellinfo._getTreeLevel(i);

				if (nexacro._isNull(prestate) || prestate === "" || cellinfo.treestate._bindtype == 0) {
					if (prelevel >= level) {
						states[i - 1] = 2;
					}
					else if (states[i - 1] >= 2) {
						states[i - 1] = defaultstatus;
					}
				}
				prelevel = level;
				prestate = state;
			}

			if (cellinfo.treestate._bindtype == 0 || nexacro._isNull(state)) {
				states[rowcount - 1] = 2;
			}
		}
		else if (initstatus == 2 || initstatus == 3) {
			defaultstatus = (initstatus == 2) ? 0 : 1;
			prelevel = -1;

			for (i = 0; i < rowcount; i++) {
				if (states[i] == undefined || (recheck_leaf && states[i] == 2)) {
					states[i] = defaultstatus;
				}

				level = cellinfo._getTreeLevel(i);
				if (prelevel >= level) {
					states[i - 1] = 2;
				}
				prelevel = level;
			}

			if (rowcount > 0) {
				states[rowcount - 1] = 2;
			}
		}

		if (this._org_treeStates.length == 0) {
			this._org_treeStates = this._org_treeStates.concat(states);
		}

		return states;
	};

	_pGrid._createTreeChecked = function () {
		if (this._binddataset == null) {
			return [];
		}

		var rowcount = this._binddataset.rowcount;
		var checked = new Array(rowcount);
		var cellinfo = this._treeCellinfo;
		var v = null;

		for (var i = 0; i < rowcount; i++) {
			v = cellinfo._getTreeCheck(i);

			if (v && (v > 0 || v.length)) {
				checked[i] = parseInt(v, 10);
			}
			else {
				checked[i] = 0;
			}
		}

		return checked;
	};

	_pGrid._updateTreeStates = function (row, add_row) {
		if (this._hasTree && this._binddataset) {
			if (row >= 0) {
				var states = this._treeStates;
				if (add_row) {
					states.splice(row, 0, 2);
				}
				else {
					states.splice(row, 1);

					var cellinfo = this._treeCellinfo;
					var level = cellinfo._getTreeLevel(row);
					var pre_level = cellinfo._getTreeLevel(row - 1);

					if (level == pre_level) {
						states[row - 1] = 2;
					}
				}
				this._treeStates = states;
			}

			this._treeIndexes = this._createTreeIndexes();
			this._treeChecked = this._createTreeChecked();
			this._createTreeHasChild();
			this._applyTreeStates();
			this._createTreeKeys();

			if (this._treeIndexes.length > 0) {
				this.rowcount = this._treeIndexes.length;
			}
			else {
				this.rowcount = 0;
			}
		}
	};

	_pGrid._applyTreeStates = function () {
		var indexes = this._treeIndexes;
		var states = this._treeStates;
		var rowcount = indexes.length;
		var cellinfo = this._treeCellinfo;
		var v = indexes.slice(0, indexes.length);
		var prelevel = -1;
		var level = -1;
		var offset = 0;

		for (var i = 0; i < rowcount; i++) {
			offset++;
			if (states[i] == 0) {
				prelevel = cellinfo._getTreeLevel(v[i]);

				for (var j = i + 1; j < rowcount; j++) {
					level = cellinfo._getTreeLevel(v[j]);
					if (level > prelevel) {
						i++;
						indexes.splice(offset, 1);
					}
					else {
						break;
					}
				}
			}
		}
	};

	_pGrid._clearTreeStates = function () {
		this._treeIndexes = null;
		this._treeStates = null;
		this._treeChecked = null;

		if (this._hasTree) {
			this.rowcount = 0;
		}

		if (this._treeKeys) {
			this._treeKeys.destroy();
			this._treeKeys = null;
		}
	};

	_pGrid._getTreeRowPosition = function (v) {
		if (v < 0 || !this._hasTree) {
			return v;
		}

		var indexes = this._treeIndexes;
		var max = indexes.length - 1;

		for (var i = max; i >= 0; i--) {
			if (indexes[i] == v) {
				return i;
			}
			else if (indexes[i] < v) {
				break;
			}
		}
		return -1;
	};

	_pGrid._getBindTextCellInfo = function (columnid) {
		var format = this._curFormat;
		var bind = true;

		if (!format) {
			return null;
		}

		var retn = [];
		var cellinfo;
		var i;

		if (columnid) {
			if (format._headcells) {
				var _headcells = format._headcells;
				var _headcellsLen = _headcells.length;

				for (i = 0; i < _headcellsLen; i++) {
					cellinfo = _headcells[i];
					if (cellinfo.text._bindexpr == columnid) {
						retn.push(cellinfo);
					}
				}
			}
			if (format._bodycells) {
				var _bodycells = format._bodycells;
				var _bodycellsLen = _bodycells.length;

				for (i = 0; i < _bodycellsLen; i++) {
					cellinfo = _bodycells[i];
					if (cellinfo.text._bindexpr == columnid) {
						retn.push(cellinfo);
					}
				}
			}
			if (format._summcells) {
				var _summcells = format._summcells;
				var _summcellsLen = _summcells.length;

				for (i = 0; i < _summcellsLen; i++) {
					cellinfo = _summcells[i];
					if (cellinfo.text._bindexpr == columnid) {
						retn.push(cellinfo);
					}
				}
			}
		}
		if (retn.length == 0 && format._bodycells) {
			retn = format._bodycells;
			bind = false;
		}
		return [retn, bind];
	};

	_pGrid._isTreeStateChanged = function (e, dsEventOccured) {
		var changed = false;

		if (this._hasTree) {
			var rowidx = this._getTreeRowPosition(e.row);

			var colid = e.columnid;
			var cellinfo = this._treeCellinfo;

			if (colid == cellinfo.treecheck._bindexpr) {
				this._setTreeChecked(rowidx, e.newvalue);
			}

			if (dsEventOccured == false) {
				if (colid == cellinfo.treestate._bindexpr) {
					this._setTreeState(rowidx, e.newvalue);
					changed = true;
				}

				var dfstatus = this._getTreeDefaultStatus();
				var initstatus = this._treeInitStatus[this.treeinitstatus];

				if (colid == cellinfo.treelevel._bindexpr) {
					var cur_level, cur_state, hasChild;
					var states = this._treeStates;

					var level = cellinfo._getTreeLevel(e.row);

					var setchange = false;
					if (initstatus == 0 || initstatus == 1) {
						if (cellinfo.treestate._bindtype != 0) {
							setchange = true;
						}
					}


					for (var i = e.row - 1; i >= 0; i--) {
						cur_level = cellinfo._getTreeLevel(i);
						cur_state = cellinfo._getTreeState(i);

						if (cur_level < level) {
							if (states[i] >= 2) {
								states[i] = dfstatus;
							}

							break;
						}
						else if (cur_level > level) {
							hasChild = true;
						}
						else {
							if (!hasChild) {
								if (((nexacro._isNull(cur_state) || cur_state === "") && setchange) || !setchange) {
									states[i] = 2;
								}
							}

							break;
						}
					}

					if (states[e.row] >= 2) {
						if (this._rowcount > 0 && e.row < this._rowcount - 1) {
							cur_level = cellinfo._getTreeLevel(e.row + 1);
							if (cur_level > level) {
								states[e.row] = dfstatus;
							}
						}
					}

					changed = true;
				}
			}
		}
		return changed;
	};

	_pGrid._setTreeState = function (rowidx, v, redraw, prop_set) {
		v = parseInt(v, 10);

		if (isFinite(v)) {
			var dsrowidx = this._treeIndexes[rowidx];
			var state = this._treeStates[dsrowidx];
			var retn = 0;

			if (v != state) {
				if (v == 2) {
					if (redraw) {
						this._refreshBodyRow(rowidx - this._getBodyBegRowPos(rowidx));
					}
					return 1;
				}
				else if ((retn = this._toggleTreeState(rowidx, redraw, v, prop_set)) > 0) {
					return retn;
				}
			}
		}
		return 0;
	};

	_pGrid._getOrgTreeStates = function (rowidx) {
		var states;

		if (this._org_treeStates.length) {
			states = this._org_treeStates;
		}
		else {
			states = this._createTreeStates(false, true);
		}

		if (states[rowidx] == 2) {
			return 2;
		}
		else {
			return this._treeStates[rowidx];
		}
	};

	_pGrid._treeStateKeyAction = function (rowidx, v) {
		var dsrowidx = this._treeIndexes[rowidx];
		var state = this._treeStates[dsrowidx];

		if (state < 2 && state != v) {
			return this._toggleTreeState(rowidx, true);
		}

		return 0;
	};

	_pGrid._callback_treetoggle = function (rowidx, collapse) {
		var change = this._bodyBand._matrix._adjustTreeDisplay(rowidx, collapse);

		var cellobj = this._getCurrentBodyCell(-1, -1);
		if (cellobj) {
			cellobj._apply_setfocus();
		}

		if (change) {
			if (this._headBand) {
				this._headBand._matrix._adjustColsDisplay(true);
			}
			if (this._summBand) {
				this._summBand._matrix._adjustColsDisplay(true);
			}
		}
	};

	_pGrid._supphorztype = 0;
	_pGrid.set_suppresshorzcell = function (v) {
		switch (v) {
			case "none":
				this._supphorztype = 0;
				break;
			case "left":
				this._supphorztype = 1;
				break;
			case "right":
				this._supphorztype = 2;
				break;
			case "leftright":
				this._supphorztype = 3;
				break;
			default:
				return;
		}

		if (v != this.suppresshorzcell) {
			this.suppresshorzcell = v;
			this.on_apply_suppresshorzcell();
		}
	};

	_pGrid.on_apply_suppresshorzcell = function () {
		this._refreshAll();
	};

	_pGrid.set_treeasynctoggle = function (v) {
		if (v != null && this.treeasynctoggle != v) {
			v = nexacro._toBoolean(v);
			this.treeasynctoggle = v;
		}
	};

	_pGrid._toggleTreeState = function (rowidx, redraw, v, prop_set) {
		var dsrowidx = this._treeIndexes[rowidx];

		if (this.treeasynctoggle) {
			if (this._treetogglecell) {
				return;
			}

			this._treetogglecell = this._getCurrentBodyCell(dsrowidx, this._treeCellinfo._cellidx);

			if (redraw) {
				this._setGlobalCursor("wait", this._treetogglecell);
			}
		}

		var state;

		if (prop_set) {
			state = this._getOrgTreeStates(dsrowidx);
		}
		else {
			state = this._treeStates[dsrowidx];
		}

		var collapse = false;
		var retn;

		if (state == 0) {
			if (this.on_fire_cantreestatuschange(rowidx, dsrowidx, 1) !== false) {
				retn = this._expandTreeState(rowidx);
				this.on_fire_ontreestatuschanged(rowidx, dsrowidx, 1);
			}
		}
		else if (state == 1) {
			if (this.on_fire_cantreestatuschange(rowidx, dsrowidx, 0) !== false) {
				collapse = true;
				retn = this._collapseTreeState(rowidx);
				this.on_fire_ontreestatuschanged(rowidx, dsrowidx, 0);
			}
		}
		else if (state == 2) {
			if (prop_set) {
				if (prop_set == "null_value") {
					this._treeStates[dsrowidx] = v;
				}
				else {
					this._treeStates[dsrowidx] = 2;
				}
			}
			else {
				if (this.on_fire_cantreestatuschange(rowidx, dsrowidx, 0) !== false) {
					retn = 1;
					if (v != undefined) {
						this._treeStates[dsrowidx] = v;
					}
					else {
						this._treeStates[dsrowidx] = 2;
					}
					this.on_fire_ontreestatuschanged(rowidx, dsrowidx, 0);
				}
			}
		}

		if (redraw) {
			if (retn == 2) {
				if (this._bodyBand) {
					if (this.enableredraw) {
						if (this.treeasynctoggle) {
							var pthis = this;
							nexacro._OnceCallbackTimer.callonce(this, function () {
								pthis._callback_treetoggle(rowidx, collapse);
								pthis._setGlobalCursor(null, this._treetogglecell);
								pthis._treetogglecell = null;
							}, 50);
						}
						else {
							this._callback_treetoggle(rowidx, collapse);
						}
					}
					else {
						this._enable_redraw_history.recreate_body = true;
					}
				}
			}
			else if (retn == 1) {
				this._refreshBodyRow(rowidx - this._getBodyBegRowPos(rowidx));

				if (this.treeasynctoggle) {
					if (this._treetogglecell) {
						this._setGlobalCursor(null, this._treetogglecell);
						this._treetogglecell = null;
					}
				}
			}
		}
		else {
			if (this.treeasynctoggle) {
				if (this._treetogglecell) {
					this._setGlobalCursor(null, this._treetogglecell);
					this._treetogglecell = null;
				}
			}
		}

		return retn;
	};

	_pGrid._collapseTreeState = function (rowidx) {
		var indexes = this._treeIndexes;
		var states = this._treeStates;
		var rowcount = indexes.length;
		var dsrowidx = indexes[rowidx];
		var cellinfo = this._treeCellinfo;

		if (states[dsrowidx] == 1) {
			states[dsrowidx] = 0;
		}
		else {
			return 0;
		}

		var level = cellinfo._getTreeLevel(dsrowidx);

		if (nexacro._enableaccessibility) {
			var cellobj = this._getAccessibilityCurrentCell();
			if (cellobj) {
				if (nexacro._OS == "Android" && nexacro._Browser != "Runtime") {
					cellobj._setAccessibilityStatLive(true);
				}
				cellobj._setAccessibilityStatExpanded(false);
			}
		}

		var lvl = -1;
		var count = 0;

		for (var i = rowidx + 1; i < rowcount; i++) {
			lvl = cellinfo._getTreeLevel(indexes[i]);

			if (lvl > level) {
				count++;
			}
			else {
				break;
			}
		}

		if (count > 0) {
			indexes.splice(rowidx + 1, count);
			this._createTreeKeys();
			this.rowcount = indexes.length;
			return 2;
		}

		return 1;
	};

	_pGrid._expandTreeState = function (rowidx) {
		var indexes = this._treeIndexes;
		var states = this._treeStates;
		var rowcount = states.length;
		var dsrowidx = indexes[rowidx];
		var cellinfo = this._treeCellinfo;

		if (states[dsrowidx] == 0) {
			states[dsrowidx] = 1;
		}
		else {
			return 0;
		}

		var level = cellinfo._getTreeLevel(dsrowidx);

		if (nexacro._enableaccessibility) {
			var cellobj = this._getAccessibilityCurrentCell();
			if (cellobj) {
				if (nexacro._OS == "Android" && nexacro._Browser != "Runtime") {
					cellobj._setAccessibilityStatLive(true);
				}
				cellobj._setAccessibilityStatExpanded(true);
			}
		}

		var lvl = -1;
		var count = 0;
		var parentidx = dsrowidx;
		var parents = [dsrowidx];
		var preidx = -1;
		var prelevel = -1;
		var close = false;
		var depth;
		var curent_plv = -1;

		for (var i = dsrowidx + 1; i < rowcount; i++) {
			lvl = cellinfo._getTreeLevel(i);

			if (lvl > level) {
				if (preidx < 0) {
					if ((depth = (lvl - level)) > 1) {
						for (var j = 0; j < depth - 1; j++) {
							parents.push(preidx);
							curent_plv = -1;
						}
					}
				}
				else {
					prelevel = cellinfo._getTreeLevel(preidx);
					if (lvl > prelevel) {
						if (close == true) {
							continue;
						}

						parentidx = preidx;
						if ((depth = (lvl - prelevel)) > 1) {
							for (var jj = 0; jj < depth - 1; jj++) {
								parents.push(preidx);
								curent_plv = prelevel;
							}
						}
						else {
							parents.push(preidx);
							curent_plv = prelevel;
						}
					}
					else if (lvl < prelevel) {
						var n = prelevel - lvl;
						var splice = true;
						if (parents[parents.length - 1] >= 0) {
							if (curent_plv < lvl) {
								splice = false;
							}
						}
						if (splice) {
							parents.splice(parents.length - n, n);
						}

						parentidx = parents[parents.length - 1];
					}
					close = false;
				}

				if (states[parentidx] > 0) {
					indexes.splice(rowidx + 1 + count, 0, i);
					count++;
				}
				else {
					close = true;
				}
				preidx = i;
			}
			else {
				break;
			}
		}
		this._createTreeKeys();

		if (count > 0) {
			this.rowcount = this._treeIndexes.length;
			return 2;
		}

		return 1;
	};

	_pGrid._setTreeChecked = function (rowidx, v) {
		v = parseInt(v, 10);

		if (isFinite(v)) {
			var dsrowidx = this._treeIndexes[rowidx];
			var checked = this._treeChecked[dsrowidx];

			if (v == checked) {
				return false;
			}
			else {
				return (this._toggleTreeChecked(rowidx));
			}
		}

		return false;
	};

	_pGrid._toggleTreeChecked = function (rowidx) {
		var dsrowidx = this._treeIndexes[rowidx];
		var checked = this._treeChecked[dsrowidx];
		var v = (checked == 0) ? 1 : 0;
		this._treeChecked[dsrowidx] = v;
		return true;
	};

	_pGrid._getCurrentBodyCell = function (ridx, cidx) {
		var band = this._bodyBand;
		if (band) {
			if (ridx < 0) {
				ridx = this._selectinfo.curdsrow;
			}
			if (cidx < 0) {
				cidx = this._selectinfo.curcell;
			}

			var row = band._get_row(ridx);

			if (row) {
				return row._cells[cidx];
			}
		}
		return null;
	};

	_pGrid._getCurrentHeadCell = function (cidx, noccheck) {
		var band = this._headBand;
		if (band && (noccheck || this._currentDSrow == -1)) {
			if (cidx < 0) {
				cidx = this.currentcell;
			}

			var row = band._get_rows()[0];

			if (row) {
				return row._cells[cidx];
			}
		}
		return null;
	};

	_pGrid._getCurrentSummCell = function (cidx, noccheck) {
		var band = this._summBand;
		if (band && (noccheck || this._currentDSrow == -2)) {
			if (cidx < 0) {
				cidx = this.currentcell;
			}

			var row = band._get_rows()[0];

			if (row) {
				return row._cells[cidx];
			}
		}
		return null;
	};

	_pGrid._isFocused = function () {
		var owner_frame = this._getOwnerFrame();
		var is_activate = owner_frame._activate;
		var ismodal = false;
		var modalframe = this._getWindow()._getLastModalFrame();

		if (modalframe && !modalframe._contains(this)) {
			ismodal = true;
		}

		if (is_activate == false || ismodal) {
			return false;
		}

		var lastfocus = this._find_lastFocused();

		if (lastfocus instanceof nexacro.Div) {
			lastfocus = lastfocus._getLastFocused();
		}

		if (lastfocus != this) {
			return false;
		}

		return true;
	};

	_pGrid._showEditor = function (focus_cellobj) {
		var win = this._getRootWindow();
		var is_active_layer = win._isActiveLayerComponent(this);
		if (!is_active_layer) {
			return;
		}

		if (this._hide_applydata) {
			return true;
		}

		if (nexacro._toBoolean(this.readonly) == true) {
			return false;
		}

		if (!this._isFocused()) {
			return false;
		}

		var cellobj = focus_cellobj;

		if (!cellobj) {
			cellobj = this._getCurrentBodyCell(-1, -1);
		}

		if (!cellobj) {
			return false;
		}

		var startrow = this._getBodyBegRowPos(cellobj._rowidx);
		var endrow = this._endrowpos;
		var currow = this._selectinfo.currow;
		var curcell = this._selectinfo.curcell;

		if (startrow > currow || endrow < currow) {
			return false;
		}
		else {
			if (this._beforeEditRowIdx != currow || this._beforeEditCellIdx != curcell) {
				if (cellobj._virtualmerge) {
					this._showEditorMergeCell(cellobj, true, true);
				}
				else if (cellobj._hasEditor()) {
					cellobj._showEditor(true, true);
					this._beforeEditRowIdx = this._selectinfo.curdsrow;
					this._beforeEditCellIdx = this._selectinfo.curcell;
					this._showEditing = true;
				}
				else {
					cellobj._setFocus(false);
					cellobj._setSubControlFocus(true);
				}
			}
		}

		return true;
	};
	_pGrid._applyMultiContainerScrollPos = function () {
		this._notifyParentDisplayOn();
	};
	_pGrid._notifyParentDisplayOn = function () {
		if (this._control_element) {
			this._absolutelyResetScrollPos(true);
			this._control_element.setElementHScrollPos(this._control_element.scroll_left);
			this._control_element.setElementVScrollPos(this._control_element.scroll_top);
			this._absolutelyResetScrollPos(false);
		}
	};
	_pGrid._setdataobj = null;
	_pGrid._hideEditor = function (noApplyDataset, grid_killfocus, need_confirm_control_value) {
		if (this._FocuedCell && this._FocuedCell._is_alive) {
			this._FocuedCell._setSubControlFocus(false);
		}
		if (!this._currentCellEditor || this._hide_applydata) {
			return false;
		}

		var editComp = this._currentCellEditor;
		var setdataobj = null;

		if (!noApplyDataset && editComp._is_alive) {
			this._hide_applydata = true;

			if (need_confirm_control_value) {
				editComp._confirmValue();
			}

			setdataobj = {
				succ : false
			};
			setdataobj.succ = editComp._setDataset(true);
			if (setdataobj.succ && editComp._cellobj) {
				editComp._cellobj._updateAll();
			}

			editComp = this._currentCellEditor;

			this._hide_applydata = false;
		}

		if (this._binddataset.enableevent == false) {
			this._refreshAll();
		}

		this._currentCellEditor = null;

		if (editComp._is_alive) {
			var cellobj = editComp._cellobj;

			cellobj._setDisplayText();

			if (cellobj._is_mergetemp) {
				this._hideEditorMergeCell();
			}
			else {
				cellobj._hideEditor();
			}

			if (this._keydown_elem && !grid_killfocus) {
				cellobj._setFocus(false);
			}
		}

		this._showEditing = false;
		this._setdataobj = setdataobj;

		this._beforeEditCellIdx = -1;
		this._beforeEditRowIdx = -1;
		this._currentCellCell = -1;
		this._currentCellRow = -1;

		return true;
	};

	_pGrid._setFocus = function (bResetScroll, dir, block_inner_focus) {
		if (nexacro._enableaccessibility) {
			this._currentBand = "grid";
			this._accept_arrow = true;
			this._removeAccessibilityCurrentFocus();

			if (dir == 2) {
				if (!this.accessibilityenable) {
					this._setAccessibilityBandFocus("next", true, false);
				}
			}
			else if (dir == 3) {
				this._setAccessibilityBandFocus("prev", true);
			}
		}

		return nexacro.Component.prototype._setFocus.call(this, bResetScroll, dir, block_inner_focus);
	};

	_pGrid._evtvalue = function (obj, postvalue, is_inputeditor) {
		var val = "";

		if (is_inputeditor) {
			if (obj && obj._child_editor) {
				obj = obj._child_editor;
			}
		}

		if (obj && obj.value) {
			val = obj.value;
		}
		else if (postvalue) {
			val = postvalue;
		}

		return val;
	};

	_pGrid._getAvailableRect = function (comp) {
		var rect = {
			left : 0, 
			top : 0, 
			right : 0, 
			bottom : 0, 
			width : 0, 
			height : 0
		};
		rect.left = comp._getClientLeft();
		rect.top = comp._getClientTop();
		rect.right = comp._getClientLeft() + comp._getClientWidth();
		rect.bottom = comp._getClientTop() + comp._getClientHeight();
		rect.width = comp._getClientWidth();
		rect.height = comp._getClientHeight();
		return rect;
	};

	_pGrid._getPosRect = function (comp) {
		var rect = {
			left : comp._adjust_left, 
			top : comp._adjust_top, 
			right : comp.getOffsetRight(), 
			bottom : comp.getOffsetBottom(), 
			width : comp._adjust_width, 
			height : comp._adjust_height
		};
		return rect;
	};

	_pGrid._closePopup = function () {
		var edit = this._currentCellEditor;
		if (edit && edit._popupcontrol) {
			edit._closePopup();
		}
	};

	_pGrid._getTreeStats = function (rowidx) {
		return this._treeStates[rowidx];
	};

	_pGrid._getTreeCheck = function (rowidx) {
		return this._treeChecked[rowidx];
	};

	_pGrid._initVirtualMerge = function () {
		var i, j;
		var virtualmerge_cellinfos;
		var virtualmerge_arr = this._virtual_mergecell_arr;

		if (this.first_cellinfo) {
			this.first_cellinfo._initVirtualMergeInfo();
			this.first_cellinfo = null;
		}

		for (i = 0; i < virtualmerge_arr.length; i++) {
			virtualmerge_cellinfos = virtualmerge_arr[i].cellinfos;
			for (j = 0; j < virtualmerge_cellinfos.length; j++) {
				virtualmerge_cellinfos[j]._initVirtualMergeInfo();
				virtualmerge_cellinfos[j] = null;
			}
			virtualmerge_arr[i] = null;
		}

		this._virtual_mergecell_arr = [];
	};

	_pGrid._setVirtualMerge = function (scol, srow, ssubrow, ecol, erow, esubrow, release) {
		var format = this._curFormat;
		var cellinfos;
		var subrowcnt;
		var band;

		if (scol > ecol || scol < 0 || ecol < 0) {
			return false;
		}

		if (!format._cols.length || !format._cols[scol] || !format._cols[ecol]) {
			return false;
		}

		if (format._cols[scol]._area != format._cols[ecol]._area) {
			return false;
		}

		if (this.suppresshorzcell != "none" && (format._cols[scol]._area == "left" || format._cols[scol]._area == "right")) {
			return false;
		}

		if (srow == -1 || erow == -1) {
			if (srow != erow) {
				return false;
			}

			if (!format._headrows) {
				return false;
			}

			cellinfos = format._headcells;
			subrowcnt = format._headrows.length;
			band = "head";

			if (esubrow < ssubrow) {
				return false;
			}
		}
		else if (srow == -2 || erow == -2) {
			if (srow != erow) {
				return false;
			}

			if (!format._summrows) {
				return false;
			}

			cellinfos = format._summcells;
			subrowcnt = format._summrows.length;
			band = "summ";

			if (esubrow < ssubrow) {
				return false;
			}
		}
		else {
			if (srow < 0 || erow < 0) {
				return false;
			}

			if (srow > erow) {
				return false;
			}

			if (!format._bodyrows) {
				return false;
			}

			cellinfos = format._bodycells;
			subrowcnt = format._bodyrows.length;
			band = "body";
		}

		if (ssubrow == undefined) {
			ssubrow = 0;
		}
		if (esubrow == undefined) {
			esubrow = subrowcnt - 1;
		}

		if (subrowcnt <= ssubrow || subrowcnt <= esubrow) {
			return false;
		}

		var col1, colspan, col2;
		var row1, rowspan, row2;
		var target_cellinfos = [];
		var cell = null, first_cellinfo = null;
		var cellsrow, cheksrow, cellerow, chekerow;

		for (var i = 0, n = cellinfos.length; i < n; i++) {
			cell = cellinfos[i];
			col1 = cell._col;
			colspan = cell._colspan;
			col2 = col1 + colspan - 1;
			row1 = cell._row;
			rowspan = cell._rowspan;
			row2 = row1 + rowspan - 1;

			if ((scol <= col1 && ecol >= col1) || (scol <= col2 && ecol >= col2) || (col1 <= scol && col2 >= scol) || (col1 <= ecol && col2 >= ecol)) {
				if (srow >= 0) {
					cellsrow = srow *  subrowcnt + row1;
					cheksrow = srow *  subrowcnt + ssubrow;
					cellerow = erow *  subrowcnt + row2;
					chekerow = erow *  subrowcnt + esubrow;
				}
				else {
					cellsrow = row1;
					cheksrow = ssubrow;
					cellerow = row2;
					chekerow = esubrow;
				}

				if ((cheksrow <= cellsrow && chekerow >= cellsrow) || (cheksrow <= cellerow && chekerow >= cellerow) || (cellsrow <= cheksrow && cellerow >= cheksrow) || (cellsrow <= chekerow && cellerow >= chekerow)) {
					if (cell.suppress != 0) {
						return false;
					}

					var change = false;

					if (!first_cellinfo && row1 == ssubrow) {
						first_cellinfo = cell;
					}

					if (cell._colspan > 1) {
						var cellecol = cell._col + cell._colspan - 1;
						if (cell._col < scol) {
							change = true;
							scol = cell._col;
						}
						if (cellecol > ecol) {
							change = true;
							ecol = cellecol;
						}
					}

					if (cell._rowspan > 1) {
						if (cellsrow < cheksrow) {
							change = true;
							ssubrow = cell._row;
						}
						if (cellerow > chekerow) {
							change = true;
							esubrow = cell._row + cell._rowspan - 1;
						}
					}

					if (change == true) {
						target_cellinfos = [];
						i = -1;
					}
					else {
						target_cellinfos.push(cell);
					}
				}
			}
		}

		var virtual_mergecell = {
			start_column : scol, 
			start_row : srow, 
			start_subrow : ssubrow, 
			end_column : ecol, 
			end_row : erow, 
			end_subrow : esubrow, 
			cellinfos : target_cellinfos, 
			first_cellinfo : first_cellinfo
		};
		var virtual_arr = this._virtual_mergecell_arr;
		var virtual_arr_len = virtual_arr.length;


		var fail_idxs = [];
		var j, k;

		for (i = 0; i < virtual_arr_len; i++) {
			if (this._checkInclude(virtual_arr[i], subrowcnt, scol, srow, ssubrow)) {
				fail_idxs.push(i);
			}
			else if (this._checkInclude(virtual_arr[i], subrowcnt, scol, erow, esubrow)) {
				fail_idxs.push(i);
			}
			else if (this._checkInclude(virtual_arr[i], subrowcnt, ecol, srow, ssubrow)) {
				fail_idxs.push(i);
			}
			else if (this._checkInclude(virtual_arr[i], subrowcnt, ecol, erow, esubrow)) {
				fail_idxs.push(i);
			}

			else if (this._checkInclude(virtual_mergecell, subrowcnt, virtual_arr[i].start_column, virtual_arr[i].start_row, virtual_arr[i].start_subrow)) {
				fail_idxs.push(i);
			}
			else if (this._checkInclude(virtual_mergecell, subrowcnt, virtual_arr[i].start_column, virtual_arr[i].end_row, virtual_arr[i].end_subrow)) {
				fail_idxs.push(i);
			}
			else if (this._checkInclude(virtual_mergecell, subrowcnt, virtual_arr[i].end_column, virtual_arr[i].start_row, virtual_arr[i].start_subrow)) {
				fail_idxs.push(i);
			}
			else if (this._checkInclude(virtual_mergecell, subrowcnt, virtual_arr[i].end_column, virtual_arr[i].end_row, virtual_arr[i].end_subrow)) {
				fail_idxs.push(i);
			}
		}

		if (fail_idxs.length == 0) {
			if (release) {
				return false;
			}

			virtual_arr.push(virtual_mergecell);

			for (i = 0, n = target_cellinfos.length; i < n; i++) {
				for (j = srow; j <= erow; j++) {
					this._checkVirtualMerge(target_cellinfos[i], j);
				}

				this._refreshCell(band, target_cellinfos[i]._cellidx, -1);
			}
			this._updateMergeData(virtual_arr.length - 1);
		}
		else {
			if (!release) {
				return false;
			}

			var nn;
			for (i = 0, n = fail_idxs.length; i < n; i++) {
				var idx = fail_idxs[i];
				var release_virtual = virtual_arr.splice(idx - i, 1)[0];
				var release_cellinfos = this._getVirtualMergeCellInfos(cellinfos, release_virtual.start_column, release_virtual.end_column, release_virtual.start_row, release_virtual.end_row, release_virtual.start_subrow, release_virtual.end_subrow, subrowcnt);

				for (j = 0, nn = release_cellinfos.length; j < nn; j++) {
					for (k = release_virtual.start_row; k <= release_virtual.end_row; k++) {
						release_cellinfos[j]._setVirtualMergeInfo(k + 2, undefined);
					}

					this._refreshCell(band, release_cellinfos[j]._cellidx, -1);
				}

				for (j = 0, nn = target_cellinfos.length; j < nn; j++) {
					for (k = srow; k <= erow; k++) {
						target_cellinfos[j]._setVirtualMergeInfo(k + 2, undefined);
					}

					this._refreshCell(band, target_cellinfos[j]._cellidx, -1);
				}
			}
		}
		this._adjustOverlayControls(true);

		if (this.autosizingtype != "none") {
			this._recreate_contents_all(true);
		}
		else {
			this._autosizeMergeCell();
		}

		return true;
	};

	_pGrid._autosizeMergeCell = function () {
		if (this._is_autosizemerge) {
			return;
		}

		var infos = this._virtual_mergecell_arr;

		if (!infos || !infos.length) {
			return;
		}

		var format = this._curFormat;
		var cols = format._cols;

		if (!cols && !cols.length) {
			return;
		}

		var i, j;
		var info;
		var total;
		var cellinfo, row, text, width;
		var size;
		var padd, bord;
		var pwidth, bwidth;
		var pheight, bheight;

		this._is_autosizemerge = true;
		if (this.autosizingtype == "both" || this.autosizingtype == "col") {
			for (i = 0; i < infos.length; i++) {
				info = infos[i];
				total = 0;

				for (j = info.start_column; j <= info.end_column; j++) {
					total += cols[j].size;
				}

				cellinfo = info.first_cellinfo;
				row = info.start_row;
				text = cellinfo._getDisplayText(row);

				padd = cellinfo._curpadding;
				bord = cellinfo._curborder;

				if (padd === "bindexpr" || padd === undefined) {
					padd = this._getCellStyleInfo(cellinfo._cellidx, "padding", row);
				}

				if (bord === "bindexpr" || bord === undefined) {
					bord = this._getCellStyleInfo(cellinfo._cellidx, "border", row);
				}

				pwidth = 0;
				bwidth = 0;

				if (padd) {
					padd = new nexacro._PaddingObject(padd);
					pwidth = (padd.left + padd.right);
				}
				if (bord) {
					bord = new nexacro._BorderObject(bord);
					bwidth = (bord.left._width + bord.right._width);
				}

				if (this._overlay_controls[i]) {
					width = this._overlay_controls[i]._adjust_width;
				}
				else {
					width = format._getColSizeRange(info.start_column, info.end_column) - bwidth;
				}

				size = this._getCellRowTextSize(cellinfo, row, text, null, true, width);

				size[0] += pwidth;
				size[0] += bwidth;

				if (size[0] > total) {
					this._applyColSizing(size[0] - total, info.end_column, true);
				}
			}
		}
		else if (this.autosizingtype == "both" || this.autosizingtype == "row") {
			var start_row, start_subrow, end_row, end_subrow, formatrows, rowsizessub;
			var bandstr;

			for (i = 0; i < infos.length; i++) {
				info = infos[i];
				total = 0;
				start_row = info.start_row;
				end_row = info.end_row;
				start_subrow = info.start_subrow;
				end_subrow = info.end_subrow;

				if (start_row == -1) {
					formatrows = format._headrows;
					rowsizessub = this._rowHeadListSub;
					bandstr = "head";
				}
				else if (start_row == -2) {
					formatrows = format._summrows;
					rowsizessub = this._rowSummListSub;
					bandstr = "summ";
				}
				else {
					formatrows = format._bodyrows;
					rowsizessub = this._rowSizeListSub;
					bandstr = "body";
				}

				for (j = start_row; j <= end_row; j++) {
					for (var k = 0, n = formatrows.length; k < n; k++) {
						if (j == start_row && k < start_subrow) {
							continue;
						}
						else if (j == end_row && k > end_subrow) {
							break;
						}

						total += rowsizessub[j *  formatrows.length + k];
					}
				}

				cellinfo = info.first_cellinfo;
				var autosizerow = cellinfo._getAttrValue(cellinfo.autosizerow, row);
				var formatsize = formatrows[start_subrow + cellinfo._row].size;
				row = info.start_row;
				text = cellinfo._getDisplayText(row);

				padd = cellinfo._curpadding;
				bord = cellinfo._curborder;

				if (padd === "bindexpr" || padd === undefined) {
					padd = this._getCellStyleInfo(cellinfo._cellidx, "padding", row);
				}

				if (bord === "bindexpr" || bord === undefined) {
					bord = this._getCellStyleInfo(cellinfo._cellidx, "border", row);
				}

				pheight = 0;
				bwidth = 0;
				bheight = 0;

				if (padd) {
					padd = new nexacro._PaddingObject(padd);
					pheight = (padd.top + padd.bottom);
				}
				if (bord) {
					bord = new nexacro._BorderObject(bord);
					bwidth = (bord.left._width + bord.right._width);
					bheight = (bord.top._width + bord.bottom._width);
				}

				if (this._overlay_controls[i]) {
					width = this._overlay_controls[i]._adjust_width;
				}
				else {
					width = format._getColSizeRange(info.start_column, info.end_column) - bwidth;
				}

				size = this._getCellRowTextSize(cellinfo, row, text, null, true, width);

				size[1] += pheight;
				size[1] += bheight;

				if (autosizerow == "limitmin") {
					if (size[1] < formatsize) {
						size[1] = formatsize;
					}
				}
				else if (autosizerow == "limitmax") {
					if (size[1] > formatsize) {
						size[1] = formatsize;
					}
				}

				if (size[1] > total) {
					this._applyRowSizing2(size[1] - total, bandstr, info.end_row, info.end_subrow, true);
				}
			}
		}
		this._is_autosizemerge = false;
	};

	_pGrid._showEditorMergeCell = function (cellobj, focus, showfull) {
		var info = cellobj._virtualmerge;
		var band, bandid, overlay = this._overlay_controls[info.overlayidx];
		var cellinfos, bandc;

		if (info.targetrow >= 0) {
			bandid = "body";
			cellinfos = this._curFormat._bodycells;
			bandc = this._bodyBand;
		}
		else if (info.targetrow == -1) {
			bandid = "head";
			cellinfos = this._curFormat._headcells;
			bandc = this._headBand;
		}
		else if (info.targetrow == -2) {
			bandid = "summary";
			cellinfos = this._curFormat._summcells;
			bandc = this._summBand;
		}

		if (!cellinfos) {
			return;
		}

		var cellinfo = cellinfos[info.targetcell];

		if (!cellinfo._hasEditor(info.targetrow)) {
			return;
		}

		var area = this._curFormat._cols[cellinfo._col]._area;
		var l = overlay._control_element.left;
		var t = overlay._control_element.top;
		var w = overlay._getClientWidth();
		var h = overlay._getClientHeight();

		band = this._tempmergeeditor = new nexacro._OverlayControl(l, t, w, h, null, null, this, overlay._org_left, overlay._org_top, overlay._org_width, overlay._org_height, true, bandid, true, (area == "left"), (bandid == "head" || bandid == "summary"));
		band._type_name = nexacro._GridBandControl.prototype._type_name;
		band.id = bandid;
		band._refinfo = bandc._refinfo;
		band.set_background("transparent");
		band.set_border("0px none");

		this._tempmergeeditor._overlayidx = info.overlayidx;

		var rowc = band._ctrl = new nexacro._GridRowControl(band, 0, 0, overlay._org_width, overlay._org_height, info.targetrow, true);

		band.createComponent();

		var cell = new nexacro._GridCellControl("tempcell", 0, 0, overlay._org_width, overlay._org_height, null, null, rowc, cellinfo, info.targetrow, info.targetcell);
		cell._is_mergetemp = true;
		cell.createComponent();
		cell._updateAll();

		cell.set_background("transparent");
		cell.set_border("0px none");

		rowc._tempcell = cell;

		this._tempmergeeditor.setControlElemPosition(l, t, w, h);

		cell._showEditor(focus, showfull);
		this._beforeEditRowIdx = info.targetrow;
		this._beforeEditCellIdx = info.targetcell;

		overlay.set_visible(false);
		this._showEditing = true;
	};

	_pGrid._hideEditorMergeCell = function (after_hideeditor) {
		if (!this._tempmergeeditor) {
			return;
		}

		var after = false;

		if (!after_hideeditor && this._isDownActionKeyMouse()) {
			after = true;
		}

		this._after_hideeditor = null;

		if (!after) {
			var band = (after_hideeditor) ? after_hideeditor : this._tempmergeeditor;
			var cell = band._ctrl._tempcell;
			var dataset = this._binddataset;
			var cellinfo = cell._refinfo;
			var oldval, newval;

			if (cellinfo.text._bindexpr) {
				oldval = dataset.getColumn(cellinfo.text._bindexpr, cell._getDataRow());
				cell._hideEditor();
				newval = dataset.getColumn(cellinfo.text._bindexpr, cell._getDataRow());
			}
			else {
				cell._hideEditor();
			}

			var info = cell._virtualmerge;
			var overlay = this._overlay_controls[info.overlayidx];

			overlay.set_visible(true);

			band._refinfo = null;

			cell.destroy();
			band._ctrl._tempcell = null;
			band.destroy();

			if (this._tempmergeeditor == after_hideeditor || band == this._tempmergeeditor) {
				this._showEditing = false;
				this._tempmergeeditor = null;
			}

			this._updateMergeData(info.overlayidx);

			if (oldval != newval) {
				this._autosizeMergeCell();
			}

			cell = this._getCurrentBodyCell(-1, -1);

			if (cell) {
				cell.setFocus(false);
			}

			this._after_hideeditor = null;
		}
		else {
			this._after_hideeditor = this._tempmergeeditor;
		}
	};

	_pGrid._updateMergeData = function (overlayidx) {
		var merge_info = this._virtual_mergecell_arr[overlayidx];
		var start_row = merge_info.start_row;
		var end_row = merge_info.end_row;
		var start_subrow = merge_info.start_subrow;
		var end_subrow = merge_info.end_subrow;
		var start_col = merge_info.start_column;
		var end_col = merge_info.end_column;
		var subrow_start, subrow_end;
		var cellinfos = this._curFormat._bodycells;
		var columnid;
		var dataset = this._binddataset;
		var cnt = 0, v;

		for (var k = start_row; k <= end_row; k++) {
			subrow_start = 0;
			subrow_end = this._curFormat._bodyrows.length - 1;

			if (k == end_row && end_subrow != undefined) {
				subrow_end = end_subrow;
			}

			if (k == start_row && start_subrow != undefined) {
				subrow_start = start_subrow;
			}

			var apply = true;
			for (var l = 0, n = cellinfos.length; l < n; l++) {
				if (k == start_row && cellinfos[l]._row < subrow_start) {
					continue;
				}
				else if (k == end_row && cellinfos[l]._row > subrow_end) {
					break;
				}

				if (columnid = cellinfos[l].text._bindexpr) {
					if (cellinfos[l]._col >= start_col && cellinfos[l]._col <= end_col) {
						if (!apply) {
							return;
						}

						if (cnt++) {
							dataset.setColumn(k, columnid, v);
						}
						else {
							if (cellinfos[l].text._bindtype == 1) {
								v = dataset.getColumn(k, columnid);
							}
							else {
								apply = false;
							}
						}
					}
				}
			}
		}
	};

	_pGrid._adjustOverlayControls = function (is_create, only) {
		if (!this.enableredraw) {
			return;
		}

		if (is_create) {
			this._destroyOverlayControls();
			this._destroySelectionControls();
		}

		this._applySelection();

		var format = this._curFormat;
		if (!format) {
			return;
		}

		if (!this._hasVirtualMergeCell()) {
			return;
		}

		var i, j, k, l, n;
		var left = 0, top = 0, width = 0, height = 0;
		var start_column, end_column, start_row, end_row, subrow_start, subrow_end, start_subrow, end_subrow, first_cellinfo;
		var style_cells = [];

		var cellobj = null;
		var cellinfo = null;

		var virtual_mergecell;
		var virtual_mergecell_arr = this._virtual_mergecell_arr;

		var overlay_control;
		var overlay_controls = this._overlay_controls;
		var overlay_index = 0;

		for (i = 0, n = virtual_mergecell_arr.length; i < n; i++) {
			virtual_mergecell = virtual_mergecell_arr[i];

			start_row = virtual_mergecell.start_row;
			end_row = virtual_mergecell.end_row;
			start_column = virtual_mergecell.start_column;
			end_column = virtual_mergecell.end_column;
			start_subrow = virtual_mergecell.start_subrow;
			end_subrow = virtual_mergecell.end_subrow;
			first_cellinfo = virtual_mergecell.first_cellinfo;

			if (only) {
				if (only == "head" && start_row != -1) {
					continue;
				}
				else if (only == "summ" && start_row != -2) {
					continue;
				}
			}

			if (start_row == -1) {
				start_row = end_row = 0;
				subrow_start = (start_subrow >= 0) ? start_subrow : 0;
				subrow_end = (end_subrow >= 0) ? end_subrow : format._headrows.length - 1;

				for (j = start_column; j <= end_column; j++) {
					l = 0;
					while (true) {
						cellobj = this._getCurrentHeadCell(l++, true);

						if (!cellobj || cellobj._refinfo._row > subrow_end) {
							break;
						}
						else if (cellobj._refinfo._row < subrow_start) {
							continue;
						}

						cellinfo = cellobj._refinfo;

						if (cellinfo._col == j) {
							style_cells.push(cellobj);
						}
					}
				}
			}
			else if (start_row == -2) {
				start_row = end_row = 0;
				subrow_start = (start_subrow >= 0) ? start_subrow : 0;
				subrow_end = (end_subrow >= 0) ? end_subrow : format._summrows.length - 1;

				for (j = start_column; j <= end_column; j++) {
					l = 0;
					while (true) {
						cellobj = this._getCurrentSummCell(l++, true);

						if (!cellobj || cellobj._refinfo._row > subrow_end) {
							break;
						}
						else if (cellobj._refinfo._row < subrow_start) {
							continue;
						}

						cellinfo = cellobj._refinfo;

						if (cellinfo._col == j) {
							style_cells.push(cellobj);
						}
					}
				}
			}
			else {
				if (!format._bodyrows) {
					return;
				}

				for (j = start_column; j <= end_column; j++) {
					for (k = start_row; k <= end_row; k++) {
						subrow_start = 0;
						subrow_end = format._bodyrows.length - 1;

						if (k == end_row && end_subrow != undefined) {
							subrow_end = end_subrow;
						}

						if (k == start_row && start_subrow != undefined) {
							subrow_start = start_subrow;
						}

						l = 0;
						while (true) {
							cellobj = this._getCurrentBodyCell(k, l++);

							if (!cellobj) {
								break;
							}

							if (k == start_row && cellobj._refinfo._row < subrow_start) {
								continue;
							}
							else if (k == end_row && cellobj._refinfo._row > subrow_end) {
								break;
							}

							cellinfo = cellobj._refinfo;

							if (cellinfo._col == j) {
								style_cells.push(cellobj);
							}
						}
					}
				}
			}

			if (style_cells.length > 0) {
				start_row = virtual_mergecell.start_row;

				var org_spos = {
				};
				var org_epos = {
				};
				var s_pos = style_cells[0]._setPositionInGrid(undefined, undefined, true, org_spos);
				var e_pos = style_cells[style_cells.length - 1]._setPositionInGrid(undefined, undefined, true, org_epos);
				var org_width, org_height, org_top;

				org_width = org_epos.right - org_spos.left;

				left = s_pos.left;
				top = s_pos.top;
				width = (e_pos.right > left) ? e_pos.right - left : 0;
				height = (e_pos.bottom > top) ? e_pos.bottom - top : 0;

				overlay_control = overlay_controls[overlay_index];

				var is_create_ctrl = false;

				if (!overlay_control) {
					if (start_row < 0) {
						org_top = org_spos.top;
						org_height = org_epos.bottom - org_spos.top;
					}
					else {
						org_height = this._getBodyRowsSize(start_row, end_row, start_subrow, end_subrow);
						org_top = this._bodyBand._matrix._getBodyRowTopPos(start_row);

						if (start_subrow > 0) {
							org_top += this._rowSizeListSub[start_row *  format._bodyrows.length + start_subrow];
						}
					}

					var area = this._curFormat._cols[first_cellinfo._col]._area;
					overlay_control = new nexacro._OverlayControl(left, top, width, height, null, null, this, org_spos.left, org_top, org_width, org_height, undefined, undefined, undefined, (area == "left"), (start_row < 0));
					overlay_control.createComponent();
					overlay_controls[overlay_index] = overlay_control;
					is_create_ctrl = true;
				}

				this._setOverlayControlProperty(overlay_control, left, top, width, height, style_cells, start_row, first_cellinfo, is_create_ctrl, (start_row <= this._fixed_endrow));

				if (this._tempmergeeditor && this._tempmergeeditor._overlayidx == overlay_index) {
					this._tempmergeeditor.setControlElemPosition(left, top, width, height);
				}
			}
			else {
				if (overlay_controls[overlay_index]) {
					overlay_controls[overlay_index].set_top(this._adjust_height);
				}

				if (this._tempmergeeditor && this._tempmergeeditor._overlayidx == overlay_index) {
					this._tempmergeeditor.set_top(this._adjust_height);
				}
			}

			style_cells = [];
			overlay_index++;
		}
	};

	_pGrid._destroyOverlayControls = function () {
		var overlay_controls = this._overlay_controls;
		if (overlay_controls.length) {
			for (var i = 0, n = overlay_controls.length; i < n; i++) {
				if (overlay_controls[i]) {
					overlay_controls[i].destroy();
				}
			}
		}
		this._overlay_controls = [];
	};

	_pGrid._getVirtualMergeCellInfos = function (cellinfos, scol, ecol, srow, erow, ssubrow, esubrow, subrowcnt) {
		var target_cellinfos = [];
		var cellsrow, cheksrow, cellerow, chekerow;
		var col1, col2, colspan, row1, row2, rowspan;

		for (var i = 0, n = cellinfos.length; i < n; i++) {
			col1 = cellinfos[i]._col;
			colspan = cellinfos[i]._colspan;
			col2 = col1 + colspan - 1;
			row1 = cellinfos[i]._row;
			rowspan = cellinfos[i]._rowspan;
			row2 = row1 + rowspan - 1;

			if ((scol <= col1 && ecol >= col1) || (scol <= col2 && ecol >= col2) || (col1 <= scol && col2 >= scol) || (col1 <= ecol && col2 >= ecol)) {
				if (srow >= 0) {
					cellsrow = srow *  subrowcnt + row1;
					cheksrow = srow *  subrowcnt + ssubrow;
					cellerow = erow *  subrowcnt + row2;
					chekerow = erow *  subrowcnt + esubrow;
				}
				else {
					cellsrow = row1;
					cheksrow = ssubrow;
					cellerow = row2;
					chekerow = esubrow;
				}

				if ((cheksrow <= cellsrow && chekerow >= cellsrow) || (cheksrow <= cellerow && chekerow >= cellerow) || (cellsrow <= cheksrow && cellerow >= cheksrow) || (cellsrow <= chekerow && cellerow >= chekerow)) {
					target_cellinfos.push(cellinfos[i]);
				}
			}
		}
		return target_cellinfos;
	};

	_pGrid._getVirtualMergeCellObjs = function (virtual_mergecell) {
		var band;
		var cellobjs = [];
		var format = this._curFormat;
		var subrowcnt;

		if (virtual_mergecell.start_row == -1) {
			band = this._headBand;
			subrowcnt = format._headrows.length;
		}
		else if (virtual_mergecell.start_row == -2) {
			band = this._summBand;
			subrowcnt = format._summrows.length;
		}
		else if (virtual_mergecell.start_row >= 0) {
			band = this._bodyBand;
			subrowcnt = format._bodyrows.length;
		}

		if (!band) {
			return cellobjs;
		}

		var rows = band._get_rows();
		var cells;
		var scol = virtual_mergecell.start_column;
		var ecol = virtual_mergecell.end_column;
		var srow = virtual_mergecell.start_row;
		var erow = virtual_mergecell.end_row;
		var ssubrow = virtual_mergecell.start_subrow;
		var esubrow = virtual_mergecell.end_subrow;
		var datarow;
		var cellsrow, cheksrow, cellerow, chekerow;
		var cellinfo;

		for (var i = 0, n = rows.length; i < n; i++) {
			datarow = this._getDataRow(rows[i]._rowidx);

			if (datarow >= srow && datarow <= erow) {
				cells = rows[i]._cells;

				for (var j = 0, nn = cells.length; j < nn; j++) {
					cellinfo = cells[j]._refinfo;

					if (cellinfo._col >= scol && cellinfo._col <= ecol) {
						if (ssubrow == undefined) {
							cellobjs.push(cells[j]);
						}
						else {
							if (srow >= 0) {
								cellsrow = datarow *  subrowcnt + cellinfo._row;
								cheksrow = srow *  subrowcnt + ssubrow;
								cellerow = datarow *  subrowcnt + cellinfo._row + cellinfo._rowspan - 1;
								chekerow = erow *  subrowcnt + esubrow;
							}
							else {
								cellsrow = cellinfo._row;
								cheksrow = ssubrow;
								cellerow = cellinfo._row + cellinfo._rowspan - 1;
								chekerow = esubrow;
							}

							if ((cheksrow <= cellsrow && chekerow >= cellsrow) || (cheksrow <= cellerow && chekerow >= cellerow) || (cellsrow <= cheksrow && cellerow >= cheksrow) || (cellsrow <= chekerow && cellerow >= chekerow)) {
								cellobjs.push(cells[j]);
							}
						}
					}
				}
			}
		}
		return cellobjs;
	};

	_pGrid._setOverlayControlProperty = function (control, left, top, width, height, style_cells, target_datarow, target_cellinfo, is_create_ctrl, change_size) {
		if (!control) {
			return;
		}

		control.setControlElemPosition(left, top, width, height, change_size, (this.autofittype == "col" || this.autofittype == "both" || this.autofittype == "allboth" || this.autofittype == "col,allrow"));

		var datarow = target_datarow;
		var cellinfo = target_cellinfo;

		var celldisplaytype = cellinfo._getDisplaytype(datarow);
		var cellstyle = this._getCellStyleInfo(cellinfo._cellidx, ["font", "color", "letterSpacing", "wordSpacing", "textDecoration", "padding", "cursor", "wordWrap", "align"], datarow, false);

		var celltext = cellinfo._getDisplayText(datarow);
		var cellalign = cellstyle.align.split(",");

		if (celldisplaytype == "imagecontrol") {
			control.set_text(celltext);
		}
		else {
			if (celltext && celltext.indexOf("\r") != -1) {
				celltext = celltext.replace(/\r/g, "");
			}

			control.set_text(celltext);

			if (celldisplaytype == "decoratetext") {
				control.set_usedecorate(true);
			}
			else {
				control.set_usedecorate(false);
			}

			control.set_wordWrap(cellinfo._getWordwrap(datarow));
		}

		control.set_tooltiptext(cellinfo._getTooltipText(datarow));

		control.set_font(cellstyle.font);
		control.set_letterSpacing(cellstyle.letterSpacing);
		control.set_wordSpacing(cellstyle.wordSpacing);
		control.set_textDecoration(cellstyle.textDecoration);
		control.set_color(cellstyle.color);
		control.set_cursor(cellstyle.cursor);
		control.set_padding(cellstyle.padding);
		control.set_wordWrap(cellstyle.wordWrap);
		control.set_textAlign(cellalign[0]);
		control.set_verticalAlign(cellalign[1]);
	};

	_pGrid._checkInclude = function (virtual, subrowcnt, col, row, subrow) {
		if (virtual.start_column <= col && virtual.end_column >= col) {
			if (virtual.start_row <= row && virtual.end_row >= row) {
				if (subrow == undefined || virtual.start_subrow == undefined) {
					return true;
				}
				else {
					if (virtual.start_row < row && virtual.end_row > row) {
						return true;
					}

					if (virtual.start_row == virtual.end_row) {
						if (virtual.start_subrow <= subrow && virtual.end_subrow >= subrow) {
							return true;
						}
					}
					else {
						if (virtual.start_row == row) {
							if (virtual.start_subrow <= subrow && subrowcnt > subrow) {
								return true;
							}
						}

						if (virtual.end_row == row) {
							if (0 <= subrow && virtual.end_subrow >= subrow) {
								return true;
							}
						}
					}
				}
			}
		}
		return false;
	};

	_pGrid._checkVirtualMerge = function (cellinfo, row) {
		if (cellinfo._getVirtualMergeInfo(row + 2)) {
			return cellinfo._getVirtualMergeInfo(row + 2);
		}

		var virtual_arr = this._virtual_mergecell_arr;
		var virtual_arr_len = virtual_arr.length;
		var subrowcnt;
		var format = this._curFormat;
		var band;

		if (row == -1) {
			subrowcnt = (format._headrows) ? format._headrows.length : 0;
			band = "head";
		}
		else if (row == -2) {
			subrowcnt = (format._summrows) ? format._summrows.length : 0;
			band = "summ";
		}
		else if (row >= 0) {
			subrowcnt = (format._bodyrows) ? format._bodyrows.length : 0;
			band = "body";
		}

		if (!subrowcnt) {
			return null;
		}

		if (virtual_arr_len == 0) {
			return null;
		}

		var scol = cellinfo._col, ecol = cellinfo._col + cellinfo._colspan - 1, ssubrow = cellinfo._row, esubrow = cellinfo._row + cellinfo._rowspan - 1, area = cellinfo._area;

		for (var i = 0; i < virtual_arr_len; i++) {
			if (this._checkInclude(virtual_arr[i], subrowcnt, scol, row, ssubrow)) {
				if (this._checkInclude(virtual_arr[i], subrowcnt, ecol, row, ssubrow)) {
					if (this._checkInclude(virtual_arr[i], subrowcnt, scol, row, esubrow)) {
						if (this._checkInclude(virtual_arr[i], subrowcnt, ecol, row, esubrow)) {
							var retn = "";

							if (area != "right") {
								if (ecol < virtual_arr[i].end_column) {
									retn += "right";
								}
							}
							else {
								if (scol > virtual_arr[i].start_column) {
									retn += "left";
								}
							}

							if (band != "summ") {
								if (row < virtual_arr[i].end_row) {
									retn += "bottom";
								}
								else if (row == virtual_arr[i].end_row) {
									if (virtual_arr[i].end_subrow == undefined && esubrow < subrowcnt - 1) {
										retn += "bottom";
									}
									else if (esubrow < virtual_arr[i].end_subrow) {
										retn += "bottom";
									}
								}
							}
							else {
								if (row > virtual_arr[i].start_row) {
									retn += "top";
								}
								else if (row == virtual_arr[i].start_row) {
									if (virtual_arr[i].start_subrow == undefined && ssubrow > 0) {
										retn += "top";
									}
									else if (ssubrow > virtual_arr[i].start_subrow) {
										retn += "top";
									}
								}
							}

							retn += "virtual";
							retn = {
								"remove" : retn, 
								"targetrow" : virtual_arr[i].start_row, 
								"targetcell" : virtual_arr[i].first_cellinfo._cellidx, 
								"overlayidx" : i
							};

							cellinfo._setVirtualMergeInfo(row + 2, retn);

							return retn;
						}
					}
				}
			}
		}
		return null;
	};

	_pGrid._hasVirtualMergeCell = function () {
		var virtualmerge_arr = this._virtual_mergecell_arr;
		if (virtualmerge_arr && virtualmerge_arr.length > 0) {
			return true;
		}
		else {
			return false;
		}
	};


	_pGrid._applySelection = function () {
		if (!this._is_created || (nexacro._Browser == "IE" && nexacro._BrowserVersion < 11)) {
			return;
		}
		if (!this.showselection) {
			this._destroySelectionControls();
			return;
		}

		var parentband = this._bodyBand;
		if (!parentband || !parentband._is_created) {
			return;
		}

		var showrows = [];
		var scells = this._getSelectedCellsforRowRange(showrows);
		if (!scells) {
			this._destroySelectionControls();
			return;
		}

		var scellslen = scells.length;
		var selinfo = this._selectinfo;
		var format = this._curFormat;

		if (selinfo.area.length < this._selections.length) {
			this._destroySelectionControls();
		}

		var border = parentband._getCurrentStyleBorder();
		var bandleftborder = border ? border.left._width : 0;
		var bandtopborder = border ? border.top._width : 0;

		for (var i = 0; i < scellslen; i++) {
			var bshow = (showrows[i][0] == 0 && showrows[i][1] == 0) || (showrows[i][0] == -1 && showrows[i][1] == -1) ? false : true;
			var showendrowborder = true;

			var begcell = scells[i].begcell;
			var endcell = scells[i].endcell;
			var begrect = begcell._getPositionInBand();
			var endrect = endcell._getPositionInBand();

			if (endrect.right < format.leftWidth && endcell._refinfo._area == "body") {
				endrect.right = format.leftWidth;
			}

			if (begcell.parent._fixed && !endcell.parent._fixed) {
				if (showrows[i][1] == 0 || (showrows[i][1] == 1 && endrect.bottom < this._fixed_height)) {
					showendrowborder = false;
					endrect.bottom = this._fixed_height;
				}
			}

			var rightpos = this._getClientWidth() - format.rightWidth;
			if (rightpos < begrect.left && begcell._refinfo._area == "body") {
				begrect.left = rightpos;
			}

			var width = endrect.right - begrect.left;
			var height = endrect.bottom - begrect.top;

			if (this._selections[i]) {
				this._selections[i].move(begrect.left - bandleftborder, begrect.top - bandtopborder, width, height);
			}
			else {
				if (!this._isMultiSelected()) {
					this._destroySelectionControls();
				}

				var selection = new nexacro._GridSelectionControl(begrect.left - bandleftborder, begrect.top - bandtopborder, width, height, null, null, parentband);
				selection.set_border(parentband.selectborder);
				selection.createComponent();

				this._selections[i] = selection;
			}

			if (!bshow) {
				this._selections[i].move(begrect.left - bandleftborder, begrect.top + this._getClientHeight() - bandtopborder, width, height);
				continue;
			}

			var l, t, r, b;
			l = t = r = b = false;

			if (begrect.orgl < begrect.left || begrect.orgl < 0 || !width) {
				l = true;
			}
			if (showrows[i][0] != 1 || (begrect.orgt < 0 || begrect.orgt < begrect.top)) {
				t = true;
			}
			if ((endrect.right < endrect.orgr && 0 <= endrect.orgr) || !width) {
				r = true;
			}
			if (showendrowborder && (showrows[i][1] != 1 || (endrect.bottom < endrect.orgb))) {
				b = true;
			}

			this._selections[i]._control_element.setElementBorderNone(l, t, r, b);
		}
	};

	_pGrid._destroySelectionControls = function () {
		var sels = this._selections;
		if (sels.length) {
			for (var i = 0, n = sels.length; i < n; i++) {
				if (sels[i]) {
					sels[i].destroy();
				}
			}
		}
		this._selections = [];
	};

	_pGrid._getSelectedCellsforRowRange = function (showrows) {
		var selinfo = this._selectinfo;
		var band = this._bodyBand;
		var begrow, endrow, currow = null, begcell = null, endcell = null, rtn = [], curcell;
		var rows = band._matrix._getAllRows();
		if (!rows || rows.length == 0) {
			return null;
		}

		var showrow;
		var toprowpos;
		var dstoprowpos;
		var bottomrowpos;
		var dsbottomrowpos;
		var dsbegrowidx;
		var dscurrowidx;
		var dsrowidx;
		var cellarea;
		var arealen;
		var begrowclen;
		var cell;
		var dsendrowidx;
		var endrowclen;
		var i, j, k;
		var format = this._curFormat;

		if (this.selecttype == "row") {
			showrow = [1, 1];

			dscurrowidx = this.getDatasetRow(selinfo.currow);
			toprowpos = this._toprowpos[0];
			dstoprowpos = this.getDatasetRow(toprowpos);
			bottomrowpos = this._getScreenBottomRowPos(this._getScrollTop(), true);
			dsbottomrowpos = this.getDatasetRow(bottomrowpos);

			if ((dstoprowpos <= dscurrowidx && (dsbottomrowpos == -1 || dscurrowidx <= dsbottomrowpos)) || dscurrowidx <= this._fixed_endrow) {
				currow = band._get_row(dscurrowidx);
			}
			else {
				showrow[0] = -1;
				showrow[1] = -1;

				currow = band._get_row(dstoprowpos);
			}

			if (!currow) {
				return null;
			}
			begcell = currow._cells[0];
			endcell = currow._cells[currow._cells.length - 1];

			if ((endcell._refinfo._col + endcell._refinfo._colspan - 1) != (format._cols.length - 1)) {
				var currowcells = currow._cells;
				for (var i = 1; i < currowcells.length; i++) {
					if ((currowcells[i]._refinfo._col + currowcells[i]._refinfo._colspan - 1) == (format._cols.length - 1)) {
						endcell = currowcells[i];
					}
				}
			}

			showrows.push(showrow);
			rtn.push({
				begcell : begcell, 
				endcell : endcell
			});
		}
		else if (this.selecttype == "multirow") {
			cellarea = selinfo.area;
			arealen = cellarea.length;

			for (i = 0; i < arealen; i++) {
				showrow = [1, 1];

				dsbegrowidx = cellarea[i].begrow;
				toprowpos = this._toprowpos[0];
				dstoprowpos = this.getDatasetRow(toprowpos);
				bottomrowpos = this._getScreenBottomRowPos(this._getScrollTop(), true);
				dsbottomrowpos = this.getDatasetRow(bottomrowpos);

				if ((dstoprowpos <= dsbegrowidx && (dsbottomrowpos == -1 || dsbegrowidx <= dsbottomrowpos)) || dsbegrowidx <= this._fixed_endrow) {
					begrow = band._get_row(dsbegrowidx);
					if (!begrow) {
						return null;
					}
					begcell = begrow._cells[0];
				}
				else {
					if (dstoprowpos <= dsbegrowidx) {
						showrow[0] = -1;
					}
					else {
						showrow[0] = 0;
					}

					begrow = band._get_row(dstoprowpos);
					if (!begrow) {
						return null;
					}
					begcell = begrow._cells[0];
				}

				dsendrowidx = cellarea[i].endrow;

				if ((dstoprowpos <= dsendrowidx && (dsbottomrowpos == -1 || dsendrowidx <= dsbottomrowpos)) || dsendrowidx <= this._fixed_endrow) {
					endrow = band._get_row(dsendrowidx);
				}
				else {
					if (dsbottomrowpos <= dsendrowidx) {
						showrow[1] = -1;
					}
					else {
						showrow[1] = 0;
					}

					endrow = band._get_row(dsbottomrowpos);
				}

				if (!endrow) {
					return null;
				}
				endcell = endrow._cells[endrow._cells.length - 1];

				if ((endcell._refinfo._col + endcell._refinfo._colspan - 1) != (format._cols.length - 1)) {
					var endrowcells = endrow._cells;
					for (var j = 1; j < endrowcells.length; j++) {
						if ((endrowcells[j]._refinfo._col + endrowcells[j]._refinfo._colspan - 1) == (format._cols.length - 1)) {
							endcell = endrowcells[j];
						}
					}
				}

				showrows.push(showrow);
				rtn.push({
					begcell : begcell, 
					endcell : endcell
				});
			}
		}
		else if (this.selecttype == "cell") {
			showrow = [1, 1];
			dsrowidx = this.getDatasetRow(selinfo.currow);
			toprowpos = this._toprowpos[0];
			dstoprowpos = this.getDatasetRow(toprowpos);
			bottomrowpos = this._getScreenBottomRowPos(this._getScrollTop(), true);
			dsbottomrowpos = this.getDatasetRow(bottomrowpos);

			if ((dstoprowpos <= dsrowidx && (dsbottomrowpos == -1 || dsrowidx <= dsbottomrowpos)) || dsrowidx <= this._fixed_endrow) {
				currow = band._get_row(dsrowidx);
				if (!currow) {
					return null;
				}
				curcell = currow._cells[selinfo.curcell];
			}
			else {
				showrow[0] = -1;
				showrow[1] = -1;

				currow = band._get_row(dstoprowpos);
				if (!currow) {
					return null;
				}
				curcell = currow._cells[selinfo.curcell];
			}
			showrows.push(showrow);
			rtn.push({
				begcell : curcell, 
				endcell : curcell
			});
		}
		else if (this.selecttype == "area" || this.selecttype == "multiarea") {
			cellarea = selinfo.area;
			arealen = cellarea.length;

			for (i = 0; i < arealen; i++) {
				showrow = [1, 1];

				dsbegrowidx = cellarea[i].begrow;
				toprowpos = this._toprowpos[0];
				dstoprowpos = this.getDatasetRow(toprowpos);
				bottomrowpos = this._getScreenBottomRowPos(this._getScrollTop(), true);
				dsbottomrowpos = this.getDatasetRow(bottomrowpos);

				if ((dstoprowpos <= dsbegrowidx && (dsbottomrowpos == -1 || dsbegrowidx <= dsbottomrowpos)) || dsbegrowidx <= this._fixed_endrow) {
					begrow = band._get_row(dsbegrowidx);
					if (!begrow) {
						return null;
					}
					begrowclen = begrow._cells.length;

					for (j = 0; j < begrowclen; j++) {
						cell = begrow._cells[j];
						if (cell._refinfo._col == cellarea[i].begcol) {
							if (cell._refinfo._row == cellarea[i].begsubrow[0]) {
								begcell = cell;
								break;
							}
						}
					}
				}
				else {
					if (dstoprowpos <= dsbegrowidx) {
						showrow[0] = -1;
					}
					else {
						showrow[0] = 0;
					}

					begrow = band._get_row(dstoprowpos);
					if (!begrow) {
						return null;
					}

					begrowclen = begrow._cells.length;

					for (j = 0; j < begrowclen; j++) {
						cell = begrow._cells[j];
						if (cell._refinfo._col == cellarea[i].begcol) {
							begcell = cell;
							break;
						}
					}
				}

				dsendrowidx = cellarea[i].endrow;
				if ((dstoprowpos <= dsendrowidx && (dsbottomrowpos == -1 || dsendrowidx <= dsbottomrowpos)) || dsendrowidx <= this._fixed_endrow) {
					endrow = band._get_row(dsendrowidx);
					if (!endrow) {
						return null;
					}
					endrowclen = endrow._cells.length;

					for (k = endrowclen - 1; 0 <= k; k--) {
						cell = endrow._cells[k];
						if ((cell._refinfo._col + cell._refinfo._colspan - 1) == cellarea[i].endcol) {
							if ((cell._refinfo._row + cell._refinfo._rowspan - 1) == cellarea[i].endsubrow[cellarea[i].endsubrow.length - 1]) {
								endcell = cell;
								break;
							}
						}
					}
				}
				else {
					if (dsbottomrowpos <= dsendrowidx) {
						showrow[1] = -1;
					}
					else {
						showrow[1] = 0;
					}

					endrow = band._get_row(dsbottomrowpos);
					if (!endrow) {
						return null;
					}

					endrowclen = endrow._cells.length;

					for (k = endrowclen - 1; 0 <= k; k--) {
						if (endrow._cells[k]._refinfo._col == cellarea[i].endcol) {
							cell = endrow._cells[k];
							endcell = cell;
							break;
						}
					}
				}
				showrows.push(showrow);
				rtn.push({
					begcell : begcell, 
					endcell : endcell
				});
			}
		}
		return rtn;
	};


	_pGrid._moveToAccessibilityCell = function (type, tabstop, extcomp, colmove) {
		var retn;
		if (this._is_band_focus && !tabstop) {
			retn = true;
			if (type == "prev" || type == "up") {
				retn = this._setAccessibilityBandFocus(type);
			}
			else {
				if (type == "next" || (type == "down" && this._currentBand == "head")) {
					this.currentcell = this.currentsubrow = this.currentcol = 0;
				}

				if (!this._moveToPosAccessibilityCell(this.currentrow, this.currentcell)) {
					retn = this._setAccessibilityBandFocus(type);
				}
			}
			return retn;
		}

		var editcell;

		if (this._currentBand == "grid") {
			if (type == "prev" || type == "next" || type == "down") {
				if (tabstop) {
					if (type == "next") {
						if (this._bodyBand && this._bodyBand._get_rows().length > 0) {
							editcell = this._getFirstEditableCell();

							if (editcell && editcell.row !== null) {
								this._showEditorFocus = true;
								if (this.vscrollbar && this.vscrollbar.visible) {
									this.vscrollbar.set_pos(0);
								}

								this._currentBand = "body";
								this._moveToPosAccessibilityCell(editcell.row, editcell.cell);
								this._showEditorFocus = false;
								return true;
							}
						}
					}
					return false;
				}
				return this._setAccessibilityBandFocus(type, true);
			}
			else {
				this._accept_arrow = false;
				return false;
			}
		}

		var band;
		retn = true;

		var cellobj = null;
		var cellinfo;
		var accessibility_enable = false;
		this._is_band_focus = false;
		this._beforegridrowpos = this.currentrow;
		this._beforegridcolpos = this.currentcol;
		var curRow;
		var curCol;
		var cellidx;
		var row, col;

		if (this._currentBand == "body") {
			this._is_first_bodycell = false;

			while (true) {
				if (tabstop) {
					retn = this._moveToCell(type, true, colmove, undefined, undefined, true);
				}
				else {
					retn = this._moveToCell(type, false, colmove, undefined, undefined, true);
				}

				if (retn) {
					if (this._showEditing) {
						this._hideEditor();
					}
					cellobj = this._getAccessibilityCurrentCell();
					if (cellobj) {
						if (tabstop) {
							cellobj._setFocus(false);
							break;
						}
						else {
							cellinfo = cellobj._refinfo;
							var datarow = this._getDataRow(cellobj._rowidx);
							var display_type = cellinfo._getDisplaytype(datarow);

							accessibility_enable = cellobj.accessibilityenable;
							if (accessibility_enable) {
								if (this.autoenter == "select") {
									this._showEditor();
								}
								else {
									if (cellobj._subComp && display_type != "treeitemcontrol") {
										cellobj._subComp._setFocus(false);
									}
									else {
										cellobj._setFocus(false);
									}
								}
								break;
							}
						}
					}
				}
				else {
					if (!tabstop) {
						retn = this._setAccessibilityBandFocus(type);
					}
					break;
				}
			}
			return retn;
		}
		if (tabstop) {
			if (this._currentBand == "head") {
				if (this._bodyBand._get_rows().length > 0) {
					this._currentBand = "body";
					editcell = this._getFirstEditableCell();

					if (editcell.row !== null) {
						this._is_first_bodycell = true;
						this._moveToPosAccessibilityCell(editcell.row, editcell.cell);
					}
					return true;
				}
			}
			return false;
		}

		if (type == "next") {
			while (true) {
				this.currentcell++;
				cellobj = this._getAccessibilityCurrentCell();
				if (cellobj) {
					if (cellobj.width <= 0) {
						continue;
					}
					else {
						accessibility_enable = cellobj.accessibilityenable;
						if (!accessibility_enable) {
							continue;
						}

						cellinfo = cellobj._refinfo;
						this.currentsubrow = cellinfo._row;
						this.currentcol = cellinfo._col;
						this.currentrow = cellobj._rowidx;
						this.currentDSrow = cellobj._getDataRow();

						cellobj._showfull();
						cellobj._setFocus(false);
					}
				}
				else {
					this.currentcell--;
					retn = this._setAccessibilityBandFocus(type);
				}
				break;
			}
		}
		else if (type == "prev") {
			while (true) {
				this.currentcell--;
				cellobj = this._getAccessibilityCurrentCell();
				if (cellobj) {
					if (cellobj.width <= 0) {
						continue;
					}
					else {
						accessibility_enable = cellobj.accessibilityenable;
						if (!accessibility_enable) {
							continue;
						}

						cellinfo = cellobj._refinfo;
						this.currentsubrow = cellinfo._row;
						this.currentcol = cellinfo._col;
						this.currentrow = cellobj._rowidx;
						this.currentDSrow = cellobj._getDataRow();

						cellobj._showfull();
						cellobj._setFocus(false);
					}
				}
				else {
					this.currentcell++;
					retn = this._setAccessibilityBandFocus(type);
				}
				break;
			}
		}
		else if (type == "up") {
			if (this._currentBand == "head") {
				band = this._headBand;
			}
			else {
				band = this._summBand;
			}

			if (band) {
				cellobj = this._getAccessibilityCurrentCell();

				if (cellobj) {
					cellinfo = cellobj._refinfo;
					curRow = cellinfo._row;
					curCol = cellinfo._col;
					cellidx = this.currentcell;

					while (true) {
						this.currentcell--;
						cellobj = this._getAccessibilityCurrentCell();
						if (cellobj) {
							row = cellobj._refinfo._row;
							col = cellobj._refinfo._col;

							if (col == curCol && row == curRow - 1) {
								accessibility_enable = cellobj.accessibilityenable;
								if (!accessibility_enable) {
									continue;
								}

								this.currentsubrow = row;
								this.currentcol = col;
								this.currentrow = cellobj._rowidx;
								this.currentDSrow = cellobj._getDataRow();

								cellobj._setFocus(false);
								break;
							}
						}
						else {
							if (this.currentcell <= 0) {
								this.currentcol = curCol;
								this.currentcell = cellidx;
								retn = this._setAccessibilityBandFocus(type);
								break;
							}
						}
					}
				}
			}
		}
		else if (type == "down") {
			cellobj = this._getAccessibilityCurrentCell();

			if (cellobj) {
				cellinfo = cellobj._refinfo;
				curRow = cellinfo._row;
				curCol = cellinfo._col;
				cellidx = this.currentcell;

				while (true) {
					this.currentcell++;
					cellobj = this._getAccessibilityCurrentCell();
					if (cellobj) {
						row = cellobj._refinfo._row;
						col = cellobj._refinfo._col;

						if (col == curCol && row == curRow + 1) {
							this.currentsubrow = row;
							this.currentcol = col;
							this.currentrow = cellobj._rowidx;
							this.currentDSrow = cellobj._getDataRow();

							cellobj._setFocus(false);
							break;
						}
					}
					else {
						this.currentcell = cellidx;
						retn = this._setAccessibilityBandFocus(type);
						break;
					}
				}
			}
		}
		return retn;
	};

	_pGrid._setAccessibilityBandFocus = function (type, extcomp, hotkey) {
		var retn = true, band = null, curBand = this._currentBand;
		var bandrows;
		var accessibility_enable;

		if (type == "next") {
			if (curBand == "grid") {
				if (this._headBand) {
					band = this._headBand;
					this._currentBand = "head";
					this._currentDSrow = this.currentrow = -1;
				}
				else if (this._bodyBand && this.body && this.summarytype != "top" && this.summarytype != "lefttop") {
					band = this._bodyBand;
					this._currentBand = "body";
					this._currentDSrow = this.currentrow = 0;
				}
				else if (this._summBand) {
					band = this._summBand;
					this._currentBand = "summary";
					this._currentDSrow = this.currentrow = -2;
				}
				else {
					this._accept_arrow = false;
					retn = false;
				}
			}
			else {
				if (curBand == "head") {
					if (this._bodyBand && this.summarytype != "top" && this.summarytype != "lefttop") {
						this._is_first_bodycell = true;
						band = this._bodyBand;
						this._currentBand = "body";
						this._currentDSrow = this.currentrow = 0;
					}
					else if (this._summBand) {
						band = this._summBand;
						this._currentBand = "summary";
						this._currentDSrow = this.currentrow = -2;
					}
				}
				else if (curBand == "body") {
					if (this._summBand && this.summarytype != "top" && this.summarytype != "lefttop") {
						this._hideEditor();
						band = this._summBand;
						this._currentBand = "summary";
						this._currentDSrow = this.currentrow = -2;
					}
				}
				else if (curBand == "summary" && (this.summarytype == "top" || this.summarytype == "lefttop")) {
					if (this._bodyBand) {
						this._is_first_bodycell = true;
						band = this._bodyBand;
						this._currentBand = "body";
						this._currentDSrow = this.currentrow = 0;
					}
				}
			}

			if (band) {
				if (hotkey) {
					this.currentsubrow = 0;
					this._moveToPosAccessibilityCell(this.currentrow, this.currentcell);
				}
				else {
					accessibility_enable = band.accessibilityenable;
					if (!(nexacro._accessibilitytype == 4 || nexacro._accessibilitytype == 5) && (!this._is_band_focus && (accessibility_enable || (band._isBody && this.rowcount <= 0)))) {
						if (extcomp) {
							this.currentcell = this.currentsubrow = this.currentcol = 0;
						}
						this._moveToAccessibilityBand(false);
					}
					else {
						if (curBand == "grid" && extcomp && !this.accessibilityenable) {
							this._first_focus = true;
						}
						this.currentcell = this.currentsubrow = this.currentcol = 0;
						this._moveToPosAccessibilityCell(this.currentrow, this.currentcell);
					}
				}
			}
		}
		else if (type == "prev") {
			if (curBand == "grid") {
				if (extcomp || hotkey) {
					if (this._summBand && this.summarytype != "top" && this.summarytype != "lefttop") {
						band = this._summBand;
						this._currentBand = "summary";

						bandrows = band._get_rows();

						if (bandrows.length) {
							this._currentDSrow = this.currentrow = -2;
							this.currentsubrow = band._get_rows()[0]._format_rows.length - 1;
						}
					}
					else if (this._bodyBand && this.body) {
						band = this._bodyBand;
						this._currentBand = "body";

						bandrows = band._get_rows();

						if (bandrows.length) {
							this._currentDSrow = this.currentrow = this.rowcount - 1;
							this.currentsubrow = bandrows[0]._format_rows.length - 1;
						}
					}
					else if (this._headBand) {
						band = this._headBand;
						this._currentBand = "head";

						bandrows = band._get_rows();

						if (bandrows.length) {
							this._currentDSrow = this.currentrow = -1;
							this.currentsubrow = bandrows[0]._format_rows.length - 1;
						}
					}
					else {
						retn = false;
					}
				}
				else {
					retn = false;
				}
			}
			else {
				if (curBand == "summary") {
					accessibility_enable = this._summBand.accessibilityenable;
					if (!this._is_band_focus && accessibility_enable) {
						this._moveToAccessibilityBand(false);
					}
					else {
						if (this._bodyBand && this.summarytype != "top" && this.summarytype != "lefttop") {
							this._is_first_bodycell = true;
							band = this._bodyBand;
							this._currentBand = "body";
							this.currentrow = this._currentDSrow = this.rowcount - 1;
						}
						else if (this._headBand) {
							band = this._headBand;
							this._currentBand = "head";
							this._currentDSrow = this.currentrow = -1;
						}
					}
				}
				else if (curBand == "body") {
					accessibility_enable = this._bodyBand.accessibilityenable;
					if (!this._is_band_focus && accessibility_enable) {
						this._hideEditor();
						this._moveToAccessibilityBand(false);
					}
					else {
						if (this._summBand && (this.summarytype == "top" || this.summarytype == "lefttop")) {
							this._hideEditor();
							band = this._summBand;
							this._currentBand = "summary";
							this._currentDSrow = this.currentrow = -2;
							this.currentsubrow = this._curFormat._summrows.length - 1;
						}
						else if (this._headBand) {
							this._hideEditor();
							band = this._headBand;
							this._currentBand = "head";
							this._currentDSrow = this.currentrow = -1;
							this.currentsubrow = this._curFormat._headrows.length - 1;
						}
					}
				}
			}

			if (band) {
				if (band._isBody && this.rowcount <= 0) {
					this._removeAccessibilityCurrentFocus();
					band._setFocus(false);
					this.currentcol = this._curFormat._cols.length - 1;
					this.currentcell = -1;
				}
				else {
					if (!hotkey) {
						this.currentcol = this._curFormat._cols.length - 1;
						this.currentcell = this._getAccessibilityLastCellIndex() - 1;
					}
					this._moveToPosAccessibilityCell(this.currentrow, this.currentcell);
				}
			}
		}
		else if (type == "up") {
			if (curBand == "summary") {
				accessibility_enable = this._summBand.accessibilityenable;
				if (!this._is_band_focus && accessibility_enable) {
					this._moveToAccessibilityBand(false);
				}
				else {
					if (this._bodyBand && this.summarytype != "top" && this.summarytype != "lefttop") {
						band = this._bodyBand;
						this._currentBand = "body";
						this._currentDSrow = this.currentrow = this.rowcount - 1;
						this.currentsubrow = 0;
					}
					else if (this._headBand) {
						band = this._headBand;
						this._currentBand = "head";
						this._currentDSrow = this.currentrow = -1;
						this.currentsubrow = this._curFormat._headrows.length - 1;
					}
					else {
						curBand = "grid";
					}
				}
			}
			else if (curBand == "body") {
				accessibility_enable = this._bodyBand.accessibilityenable;
				if (!this._is_band_focus && accessibility_enable) {
					this._hideEditor();
					this._moveToAccessibilityBand(false);
				}
				else {
					if (this._summBand && (this.summarytype == "top" || this.summarytype == "lefttop")) {
						this._hideEditor();
						band = this._summBand;
						this._currentBand = "summary";
						this._currentDSrow = this.currentrow = -2;
						this.currentsubrow = this._curFormat._summrows.length - 1;
					}
					else if (this._headBand) {
						this._hideEditor();
						band = this._headBand;
						this._currentBand = "head";
						this._currentDSrow = this.currentrow = -1;
						this.currentsubrow = this._curFormat._headrows.length - 1;
					}
					else {
						curBand = "grid";
					}
				}
			}
			else if (curBand == "head" && this.currentcell <= 0) {
				accessibility_enable = this._headBand.accessibilityenable;
				if (!this._is_band_focus && accessibility_enable) {
					this._moveToAccessibilityBand(false);
				}
				else {
					curBand = "grid";
				}
			}

			if (band) {
				this._moveToPosAccessibilityCell(this.currentrow, this.currentcell);
			}
			else if (curBand == "grid") {
				this._is_band_focus = false;
				this._currentBand = curBand;

				if (this.accessibilityenable) {
					this._moveToAccessibilityBand(true);
				}
				else {
					retn = this._moveToAccessibilityCell(type);
				}
			}
		}
		else if (type == "down") {
			if (curBand == "grid") {
				retn = this._setAccessibilityBandFocus("next", true);
			}
			else {
				if (curBand == "head") {
					if (this._bodyBand && this.summarytype != "top" && this.summarytype != "lefttop") {
						this._is_first_bodycell = true;
						band = this._bodyBand;
						this._currentBand = "body";
						this._currentDSrow = this.currentrow = 0;
					}
					else if (this._summBand) {
						band = this._summBand;
						this._currentBand = "summary";
						this._currentDSrow = this.currentrow = -2;
					}
				}
				else if (curBand == "body" && this.summarytype != "top" && this.summarytype != "lefttop") {
					if (this._summBand) {
						this._hideEditor();
						band = this._summBand;
						this._currentBand = "summary";
						this._currentDSrow = this.currentrow = -2;
					}
					else if (this._bodyBand && this.rowcount <= 0) {
						this._hideEditor();
						this._accept_arrow = false;
						retn = false;
					}
				}
				else if (curBand == "summary" && (this.summarytype == "top" || this.summarytype == "lefttop")) {
					if (this._bodyBand) {
						this._is_first_bodycell = true;
						band = this._bodyBand;
						this._currentBand = "body";
						this._currentDSrow = this.currentrow = 0;
					}
				}

				if (band) {
					accessibility_enable = band.accessibilityenable;
					if (!this._is_band_focus && (accessibility_enable || (this.rowcount <= 0 && band._isBody))) {
						this._moveToAccessibilityBand(false);
					}
					else {
						this.currentsubrow = 0;
						this._moveToPosAccessibilityCell(this.currentrow, this.currentcell);
					}
				}
				else if (this.currentcell >= this._getAccessibilityLastCellIndex() - 1) {
					this._accept_arrow = false;
					retn = false;
				}
			}
		}
		return retn;
	};

	_pGrid._getAccessibilityCurrentCell = function (ridx, cidx) {
		var cellobj = null;

		if (ridx === undefined || cidx === undefined) {
			ridx = -1;
			cidx = -1;
		}
		else if (cidx < 0) {
			cidx = this._getAccessibilityCellIndex();
		}

		if (this._currentBand == "body") {
			cellobj = this._getCurrentBodyCell(ridx, cidx);
		}
		else {
			if (this._currentBand == "head") {
				cellobj = this._getCurrentHeadCell(cidx);
			}
			else {
				cellobj = this._getCurrentSummCell(cidx);
			}
		}
		return cellobj;
	};

	_pGrid._getAccessibilityLastCellIndex = function () {
		var cellidx = -1;
		if (this._currentBand == "head" && this._curFormat._headcells) {
			cellidx = this._curFormat._headcells.length;
		}
		else if (this._currentBand == "body" && this._curFormat._bodycells) {
			cellidx = this._curFormat._bodycells.length;
		}
		else if (this._currentBand == "summary" && this._curFormat._summcells) {
			cellidx = this._curFormat._summcells.length;
		}
		return cellidx;
	};

	_pGrid._removeAccessibilityCurrentFocus = function (togrid) {
		var win = this._getWindow();
		if (togrid) {
			win._removeFromCurrentFocusPath(this, true);
		}
		else {
			if (this._currentBand == "body") {
				win._removeFromCurrentFocusPath(this._bodyBand, true);
			}
			else if (this._currentBand == "head") {
				win._removeFromCurrentFocusPath(this._headBand, true);
			}
			else if (this._currentBand == "summary") {
				win._removeFromCurrentFocusPath(this._summBand, true);
			}
		}
	};

	_pGrid._moveToAccessibilityBand = function (togrid) {
		this._removeAccessibilityCurrentFocus(togrid);

		if (!togrid) {
			this._is_band_focus = true;
			var curBand = this._currentBand;
			if (curBand == "head") {
				this._headBand._setFocus(false);
			}
			else if (curBand == "body") {
				this._bodyBand._setFocus(false);
			}
			else if (curBand == "summary") {
				this._summBand._setFocus(false);
			}
		}
		else {
			this._setFocus(false);
		}
	};

	_pGrid._moveToPosAccessibilityCell = function (rowidx, cellidx) {
		var retn = false, cellobj = null;
		var cellinfo;

		rowidx = this._getDataRow(rowidx);
		cellidx = this._getAccessibilityCellIndex(cellidx);

		if (this._currentBand == "body" && this._bodyBand._get_rows().length > 0) {
			this._hideEditor();
			cellobj = this._getAccessibilityCurrentCell();
			if (cellobj) {
				cellinfo = cellobj._refinfo;
				if (cellinfo._row != rowidx || cellinfo._cellidx != cellidx) {
					cellobj._changeStatus("focused", false);
				}
			}
			this._moveToPosCell(rowidx, cellidx);
		}

		cellobj = this._getAccessibilityCurrentCell(rowidx, cellidx);

		if (cellobj) {
			cellinfo = cellobj._refinfo;

			retn = true;
			cellobj._showfull();
			if (this._currentBand != "body" || this.autoenter != "select" || !this._showEditing) {
				if (cellobj._subComp && cellinfo._getDisplaytype(rowidx) != "treeitemcontrol") {
					cellobj._subComp._setFocus(false);
				}
				else {
					cellobj._setFocus(false);
				}
			}
			else {
				this._showEditor();
			}
			this.currentcol = cellinfo._col;
		}
		this._is_band_focus = this._is_first_focus = false;
		return retn;
	};

	_pGrid._getAccessibilityCellIndex = function (cellidx) {
		var band = null;
		if (this._currentBand == "body") {
			band = this._bodyBand;
		}
		else if (this._currentBand == "head") {
			band = this._headBand;
		}
		else if (this._currentBand == "summary") {
			band = this._summBand;
		}

		if (band) {
			var row = band._get_row(this._getDataRow(this.currentrow));
			if (row) {
				var cells = row._cells, cellinfo = null;
				for (var i = 0, n = cells.length; i < n; i++) {
					cellinfo = cells[i]._refinfo;
					if (cellinfo._col <= this.currentcol && this.currentcol <= (cellinfo._col + cellinfo._colspan - 1)) {
						if (this.currentsubrow == 0) {
							return cells[i]._cellidx;
						}
						else {
							if (cellinfo._row == this.currentsubrow) {
								return cells[i]._cellidx;
							}
						}
					}
				}
			}
		}
		return (cellidx >= 0) ? cellidx : null;
	};

	_pGrid._on_useInnerDsCells = function () {
		this._refreshAll();
	};

	_pGrid.blinkCell = function (row, cell_columns, keepsec, blinkcnt) {
		if (keepsec === undefined || keepsec === null || keepsec === "") {
			return;
		}

		if (blinkcnt === undefined || blinkcnt === null || blinkcnt === "") {
			return;
		}

		keepsec = +keepsec;
		blinkcnt = +blinkcnt;

		if (keepsec < 0 || blinkcnt < 0) {
			return;
		}

		if (!this._blinktask) {
			this._blinktask = {
			};
		}

		if (!this._blinktasklist) {
			this._blinktasklist = {
			};
		}

		var cnt = blinkcnt *  2;
		var sec = keepsec / cnt;

		var i, n, cellinfo, bindcellinfos, blinktask;
		var cellinfos = [];
		var is_blinkinfos = false;

		cell_columns = nexacro._isString(cell_columns) ? cell_columns.split(",") : [cell_columns];
		for (i = 0, n = cell_columns.length; i < n; i++) {
			if (typeof (cell_columns[i]) == "string") {
				bindcellinfos = this._getBindTextCellInfo(cell_columns[i].trim());
				if (bindcellinfos[1]) {
					cellinfos = cellinfos.concat(bindcellinfos[0]);
				}
			}
			else {
				cellinfos = [this._curFormat._bodycells[cell_columns]];
			}

			if (cellinfos.length) {
				is_blinkinfos = true;
			}
		}

		if (is_blinkinfos) {
			var blink_cancel = keepsec === 0 || blinkcnt === 0;
			if (blink_cancel) {
				for (i = 0, n = cellinfos.length; i < n; i++) {
					cellinfo = cellinfos[i];
					cellinfo._blinked_status[row] = false;

					var cell = this._getCurrentBodyCell(row, cellinfo._cellidx);
					if (cell) {
						cell._changeUserStatus("blinked", false);
					}

					delete this._blinktasklist[row + "_" + cellinfo._cellidx];
				}
			}
			else {
				var callback = function (id) {
					var row, cell, task;
					var is_taskempty = true;
					for (i in this._blinktasklist) {
						if (this._blinktasklist.hasOwnProperty(i)) {
							task = this._blinktasklist[i];
							row = i.split("_")[0];
							if (task.taskid == id && task.cnt > 0) {
								is_taskempty = false;
								task.blinkstatus = !task.blinkstatus;
								task.cellinfo._blinked_status[row] = task.blinkstatus;

								cell = this._getCurrentBodyCell(row, task.cellinfo._cellidx);
								if (cell) {
									cell._changeUserStatus("blinked", task.blinkstatus);
								}

								if ((task.cnt -= 1) == 0) {
									is_taskempty = true;
									this._blinktasklist[i] = undefined;
									delete this._blinktasklist[i];
								}
							}
						}
					}

					if (is_taskempty) {
						this._blinktask[id].destroy();
						this._blinktask[id] = undefined;
						delete this._blinktask[id];
					}
				};

				blinktask = new nexacro._CallbackTimer(this, callback, sec);
				this._blinktask[blinktask.id] = blinktask;

				for (i = 0, n = cellinfos.length; i < n; i++) {
					cellinfo = cellinfos[i];
					this._blinktasklist[row + "_" + cellinfo._cellidx] = {
						"taskid" : blinktask.id, 
						"cellinfo" : cellinfo, 
						"cnt" : cnt, 
						"blinkstatus" : false
					};
				}

				blinktask.start();
			}
		}
	};

	_pGrid.blinkCellByInterval = function (row, cell_columns, interval, blinkcnt) {
		if (interval === undefined || interval === null || interval === "") {
			return;
		}

		if (blinkcnt === undefined || blinkcnt === null || blinkcnt === "") {
			return;
		}

		interval = +interval;
		blinkcnt = +blinkcnt;

		if (interval < 0 || blinkcnt < 0) {
			return;
		}

		if (!this._blinktasklist) {
			this._blinktasklist = {
			};
		}

		var KEEP_SECOND = 500;
		var cnt = blinkcnt *  2;

		var i, n, cellinfo, bindcellinfos;
		var cellinfos = [];
		var blinktask;
		var is_blinkinfos = false;
		var cell;

		cell_columns = nexacro._isString(cell_columns) ? cell_columns.split(",") : [cell_columns];
		for (i = 0, n = cell_columns.length; i < n; i++) {
			if (typeof (cell_columns[i]) == "string") {
				bindcellinfos = this._getBindTextCellInfo(cell_columns[i].trim());
				if (bindcellinfos[1]) {
					cellinfos = cellinfos.concat(bindcellinfos[0]);
				}
			}
			else {
				cellinfos = [this._curFormat._bodycells[cell_columns]];
			}

			if (cellinfos.length) {
				is_blinkinfos = true;
			}
		}

		if (is_blinkinfos) {
			var blink_cancel = interval === 0 || blinkcnt === 0;
			if (blink_cancel) {
				for (i = 0, n = cellinfos.length; i < n; i++) {
					cellinfo = cellinfos[i];
					cellinfo._blinked_status[row] = false;
					cell = this._getCurrentBodyCell(row, cellinfo._cellidx);
					if (cell) {
						cell._changeUserStatus("blinked", false);
					}
					delete this._blinktasklist[row + "_" + cellinfo._cellidx];
				}
			}
			else {
				var callback = function (id) {
					var row, cell, task;

					for (i in this._blinktasklist) {
						if (this._blinktasklist.hasOwnProperty(i)) {
							task = this._blinktasklist[i];
							row = i.split("_")[0];
							if (task.taskid == id && task.cnt > 0) {
								task.cnt--;

								task.blinkstatus = !task.blinkstatus;
								task.cellinfo._blinked_status[row] = task.blinkstatus;

								cell = this._getCurrentBodyCell(row, task.cellinfo._cellidx);
								if (cell) {
									cell._changeUserStatus("blinked", task.blinkstatus);
								}

								if (task.cnt > 0) {
									blinktask = nexacro._OnceCallbackTimer.callonce(this, callback, task.cnt % 2 == 0 ? task.interval : KEEP_SECOND);
									task.taskid = blinktask.id;
								}
								else {
									this._blinktasklist[i] = undefined;
									delete this._blinktasklist[i];
								}
							}
						}
					}
				};

				blinktask = nexacro._OnceCallbackTimer.callonce(this, callback, KEEP_SECOND);

				for (i = 0, n = cellinfos.length; i < n; i++) {
					cellinfo = cellinfos[i];
					this._blinktasklist[row + "_" + cellinfo._cellidx] = {
						"taskid" : blinktask.id, 
						"cellinfo" : cellinfo, 
						"cnt" : cnt, 
						"interval" : interval, 
						"blinkstatus" : false
					};
				}
			}
		}
	};

	_pGrid._start_perftime = null;
	_pGrid._end_perftime = null;
	_pGrid._startScrollTimeCheck = function () {
		this._start_perftime = this._fn_CheckTime();
	};

	_pGrid._endScrollTimeCheck = function () {
		this._end_perftime = this._fn_CheckTime();
		var result = this._fn_diffTime(this._start_perftime, this._end_perftime, "ss") + "초";

		this._start_perftime = null;
		this._end_perftime = null;

		return result;
	};

	_pGrid._fn_CheckTime = function () {
		function fn_Right (strString, nSize) {
			var nStart = String(strString).length;
			var nEnd = Number(nStart) - Number(nSize);
			var rtnVal = strString.substring(nStart, nEnd);

			return rtnVal;
		}

		var objDate = new Date();
		var strTime = fn_Right("0" + objDate.getHours(), 2);
		strTime += fn_Right("0" + objDate.getMinutes(), 2);
		strTime += fn_Right("0" + objDate.getSeconds(), 2);
		strTime += fn_Right("0" + objDate.getMilliseconds(), 3);

		return strTime;
	};

	_pGrid._fn_diffTime = function (sStartTime, sEndTime, sType) {
		sStartTime = "" + sStartTime;
		sEndTime = "" + sEndTime;
		var nFrom_HH = nexacro.toNumber(sStartTime.substring(0, 2));
		var nFrom_mm = nexacro.toNumber(sStartTime.substring(2, 4));
		var nFrom_ss = nexacro.toNumber(sStartTime.substring(4, 6));
		var nFrom_ms = nexacro.toNumber(sStartTime.substring(6, 9));

		var nTo_HH = nexacro.toNumber(sEndTime.substring(0, 2));
		var nTo_mm = nexacro.toNumber(sEndTime.substring(2, 4));
		var nTo_ss = nexacro.toNumber(sEndTime.substring(4, 6));
		var nTo_ms = nexacro.toNumber(sEndTime.substring(6, 9));

		var nFromTotal_ss = (nFrom_HH *  3600) + (nFrom_mm *  60) + nFrom_ss + (nFrom_ms / 1000);
		var nToTotal_ss = (nTo_HH *  3600) + (nTo_mm *  60) + nTo_ss + (nTo_ms / 1000);

		if (sType == "HH") {
			return (Math.floor((nToTotal_ss - nFromTotal_ss) / 3600));
		}
		else if (sType == "mm") {
			return (Math.floor((nToTotal_ss - nFromTotal_ss) / 60));
		}
		else if (sType == "ss") {
			return nexacro.round((nToTotal_ss - nFromTotal_ss), 3);
		}
	};

	delete _pGrid;
}
