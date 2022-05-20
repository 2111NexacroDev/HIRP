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

if (!nexacro.CellInfo) {
	nexacro.CellInfo = function (id, parent, view, type, idx) {
		this.parent = parent;
		this.id = this.name = id;
		this._type = type;
		this._view = view;
		this._cellidx = idx;
		this._col = 0;
		this._colspan = 0;
		this._row = 0;
		this._rowspan = 0;
		this._area = "";
		this._endcol = false;
		this._subcells = [];
		this._isSubCell = false;
		this._maskstringtypeobj = new nexacro._EditMaskTypeString();
		this._masknumbertypeobj = new nexacro._GridMaskTypeNumber();
		this._key_direction = null;
		this._blinked_status = [];

		this._allocatePropertys(this._property_map);
	};

	var _pCellInfo = nexacro._createPrototype(nexacro.Object, nexacro.CellInfo);
	nexacro.CellInfo.prototype = _pCellInfo;
	_pCellInfo._type_name = "CellInfo";

	nexacro._CELLINFO_PMAP_PROPNAME = 0;
	nexacro._CELLINFO_PMAP_CTRLPROPNAME = 1;
	nexacro._CELLINFO_PMAP_EXPRBIND = 2;
	nexacro._CELLINFO_PMAP_DEFTVALUE = 3;
	nexacro._CELLINFO_PMAP_STYLE = 4;
	nexacro._CELLINFO_PMAP_VALTYPE = 5;
	nexacro._CELLINFO_PMAP_ENUMVAL = 6;

	_pCellInfo._property_map = [];
	_pCellInfo._property_map_cell = [["cssclass", null, true, "", true], ["displaytype", null, true, "normal", false], ["edittype", null, true, "none", false], ["tooltiptype", null, false, "default", false], ["tooltiptext", null, true, undefined, false], ["autosizecol", null, false, "default", false, 2, ["none", "limitmin", "limitmax", "default"]], ["autosizerow", null, false, "default", false, 2, ["none", "limitmin", "limitmax", "default"]], ["displayexpdec", null, true, -1, false, 0], ["locale", null, true, "", false], ["text", null, true, null, false], ["expr", null, true, null, false], ["subsumtext", null, true, null, false], ["controlautosizingtype", null, true, "both", false, 2, ["none", "width", "height", "both"]], ["checkboxsize", null, true, -1, false, 0], ["rtl", "rtl", true, undefined, false], ["accessibilityaction", "accessibilityaction", false, null, false], ["accessibilitydesclevel", "accessibilitydesclevel", false, "all", false], ["accessibilitydescription", "accessibilitydescription", false, null, false], ["accessibilityenable", "accessibilityenable", true, true, false, 1], ["accessibilitylabel", "accessibilitylabel", true, null, false], ["accessibilityrole", "accessibilityrole", false, "gridcell", false], ["color", "color", false, null, true], ["font", "font", false, null, true], ["wordSpacing", "wordSpacing", false, null, true], ["letterSpacing", "letterSpacing", false, null, true], ["textDecoration", "textDecoration", false, null, true], ["wordWrap", null, true, null, true], ["borderRadius", "borderRadius", false, null, true], ["border", "border", false, null, true], ["background", "background", false, null, true], ["edge", "edge", false, null, true], ["cursor", "cursor", false, null, true], ["opacity", "opacity", false, null, true], ["boxShadow", "boxShadow", false, null, true], ["padding", "padding", false, null, true], ["textAlign", "textAlign", false, null, true], ["verticalAlign", "verticalAlign", false, null, true]
	];

	_pCellInfo._property_map_checkbox = [["checkboxtruevalue", "truevalue", true, null, false], ["checkboxfalsevalue", "falsevalue", true, null, false]
	];

	_pCellInfo._property_map_edit = [["editmaxlength", null, true, -1, false, 0], ["editautoselect", "autoselect", true, false, false], ["editautoskip", "autoskip", true, false, false], ["editimemode", "imemode", true, "none", false, 2, ["none", "alpha", "alpha,full", "hangul", "hangul,full", "katakana", "katakana,full", "hiragana", "direct"]], ["edituseime", "useime", true, "global", false, 2, ["global", "local", "local,keep", "none"]], ["editinputfilter", "inputfilter", true, "none", false], ["editinputmode", "inputmode", true, "normal", false], ["editinputtype", "inputtype", true, "normal", false], ["editimeaction", "imeaction", true, "none", false, 2, ["none", "done", "go", "search", "send", "next", "previous"]]
	];

	_pCellInfo._property_map_maskedit = [["maskeditautoselect", "autoselect", true, false, false], ["maskeditlimitbymask", "limitbymask", true, "decimal", false, 2, ["none", "integer", "decimal", "both"]], ["maskeditformat", "format", true, "", false], ["maskeditmaskchar", "maskchar", false, "_", false], ["maskeditclipmode", "clipmode", true, "includespace", false, 2, ["includespace", "excludespace"]], ["maskeditautoskip", "autoskip", true, false, false], ["maskedittrimtype", "trimtype", true, "none", false, 2, ["none", "left", "right", "both"]], ["maskeditpostfixtext", "postfixtext", true, "", false], ["maskedittype", "type", true, "number", false, 2, ["number", "string"]], ["maskeditimeaction", "imeaction", true, "none", false, 2, ["none", "done", "go", "search", "send", "next", "previous"]]
	];

	_pCellInfo._property_map_textarea = [["textareaacceptsenter", null, true, false, false], ["textareaacceptstab", null, true, false, false], ["textareamaxlength", null, true, -1, false, 0], ["textareaautoselect", "autoselect", true, false, false], ["textareaimemode", "imemode", true, "none", false, 2, ["none", "alpha", "alpha,full", "hangul", "hangul,full", "katakana", "katakana,full", "hiragana", "direct"]], ["textareainputfilter", "inputfilter", true, "none", false], ["textareainputmode", "inputmode", true, "normal", false], ["textareainputtype", "inputtype", true, "normal", false], ["textareascrollbarsize", null, true, undefined, false, 0], ["textareascrollbartype", null, true, "auto", false], ["textareascrolltype", null, true, "both", false, 2, ["none", "both", "horizontal", "vertical"]], ["textareaautoskip", "autoskip", true, false, false], ["textareauseime", "useime", true, "global", false, 2, ["global", "local", "local,keep", "none"]]
	];

	_pCellInfo._property_map_combo = [["combocodecol", "codecolumn", true, "", false], ["combodatacol", "datacolumn", true, "", false], ["combodataset", "innerdataset", true, "", false], ["combodisplaynulltext", null, true, "", false], ["combodisplaynulltype", null, true, "none", false, 2, ["none", "nulltext"]], ["combodisplayrowcount", "displayrowcount", true, undefined, false, 0], ["combotype", "type", true, "dropdown", false, 2, ["dropdown", "search", "filter", "filterlike", "caseisearch", "caseifilter", "caseifilterlike"]], ["comboitemheight", "itemheight", true, undefined, false, 0], ["combopopuptype", null, true, "", false, 2, ["normal", "center", "system", "none"]], ["comboscrollbarsize", null, true, undefined, false, 0], ["combobuttonsize", null, true, undefined, false], ["comboautoselect", "autoselect", true, false, false], ["comboimemode", "imemode", true, "none", false, 2, ["none", "alpha", "alpha,full", "hangul", "hangul,full", "katakana", "katakana,full", "hiragana", "direct"]], ["combopopupsize", null, true, undefined, false]
	];

	_pCellInfo._property_map_calendar = [["calendardataset", "innerdataset", true, "", false], ["calendardisplaynulltext", null, true, "", false], ["calendardisplaynulltype", null, true, "default", false, 2, ["default", "none", "nulltext", "nullmask"]], ["calendardisplayinvalidtext", null, true, "invalid value", false], ["calendardisplayinvalidtype", null, true, "default", false, 2, ["default", "none", "invalidtext"]], ["calendarbackgroundcol", "backgroundcolumn", true, "", false], ["calendarbordercol", "bordercolumn", true, "", false], ["calendardatecol", "datecolumn", true, "", false], ["calendartextcolorcol", "textcolorcolumn", true, "", false], ["calendardaysize", "daysize", true, undefined, false], ["calendarheadformat", "headformat", true, "yyyy.MM", false], ["calendardateformat", null, true, "yyyy-MM-dd ddd", false], ["calendareditformat", null, true, "yyyy-MM-dd", false], ["calendarweekformat", "weekformat", true, undefined, false], ["calendarpopupsize", null, true, undefined, false], ["calendarpopuptype", null, true, undefined, false, 2, ["normal", "center", "system", "none"]], ["calendarbuttonsize", null, true, undefined, false], ["calendarheadheight", "headheight", true, undefined, false, 0], ["calendarshowmonthspin", "showmonthspin", true, false, false, 1], ["calendarshowyearspin", "showyearspin", true, false, false, 1], ["calendartype", "type", true, "normal", false], ["calendarusetrailingday", "usetrailingday", true, false, false], ["calendarautoselect", "autoselect", true, false, false]
	];

	_pCellInfo._property_map_progressbar = [["progressbarblockgap", "blockgap", true, undefined, false], ["progressbarblocksize", "blocksize", true, undefined, false], ["progressbardirection", "direction", true, "forward", false], ["progressbarsmooth", "smooth", true, false, false]
	];

	_pCellInfo._property_map_image = [["imagestretch", "stretch", true, "none", false, 2, ["none", "fit", "fixaspectratio"]]
	];

	_pCellInfo._property_map_tree = [["treecheck", null, true, "", false], ["treecollapseimage", null, true, "", false], ["treeexpandimage", null, true, "", false], ["treeitemimage", null, true, "", false], ["treelevel", null, true, "", false], ["treestartlevel", null, true, 0, false, 0], ["treestate", null, true, "", false]
	];

	_pCellInfo._property_map_expand = [["expandchar", null, true, "", false], ["expandimage", null, true, "", false], ["expandshow", null, true, "hide", false, 2, ["hide", "show"]], ["expandsize", null, true, 16, false, 0]
	];

	_pCellInfo._property_map = _pCellInfo._property_map.concat(_pCellInfo._property_map_cell);
	_pCellInfo._property_map = _pCellInfo._property_map.concat(_pCellInfo._property_map_checkbox);
	_pCellInfo._property_map = _pCellInfo._property_map.concat(_pCellInfo._property_map_edit);
	_pCellInfo._property_map = _pCellInfo._property_map.concat(_pCellInfo._property_map_maskedit);
	_pCellInfo._property_map = _pCellInfo._property_map.concat(_pCellInfo._property_map_textarea);
	_pCellInfo._property_map = _pCellInfo._property_map.concat(_pCellInfo._property_map_combo);
	_pCellInfo._property_map = _pCellInfo._property_map.concat(_pCellInfo._property_map_calendar);
	_pCellInfo._property_map = _pCellInfo._property_map.concat(_pCellInfo._property_map_progressbar);
	_pCellInfo._property_map = _pCellInfo._property_map.concat(_pCellInfo._property_map_image);
	_pCellInfo._property_map = _pCellInfo._property_map.concat(_pCellInfo._property_map_tree);
	_pCellInfo._property_map = _pCellInfo._property_map.concat(_pCellInfo._property_map_expand);

	_pCellInfo._setCellChildControlProperty = function (prefix, ctrl, datarow) {
		var _property_map = this["_property_map_" + prefix];
		var v, prop, ctrlprop;

		for (var i = 0, n = _property_map.length; i < n; i++) {
			ctrlprop = _property_map[i][nexacro._CELLINFO_PMAP_CTRLPROPNAME];
			if (ctrlprop != null) {
				prop = _property_map[i][nexacro._CELLINFO_PMAP_PROPNAME];
				v = this._getAttrValue(this[prop], datarow);
				ctrl["set_" + ctrlprop](v);
			}
		}
	};

	_pCellInfo._setCellControlProperty = function (cellcontrol, datarow) {
		var _property_map = this._property_map_cell;
		var v, prop, ctrlprop;

		for (var i = 0, n = _property_map.length; i < n; i++) {
			ctrlprop = _property_map[i][nexacro._CELLINFO_PMAP_CTRLPROPNAME];
			if (ctrlprop != null) {
				prop = _property_map[i][nexacro._CELLINFO_PMAP_PROPNAME];
				v = this._getAttrValue(this[prop], datarow);
				cellcontrol["set_" + ctrlprop](v);
			}
		}
	};

	_pCellInfo._setCellControlPropertyForAutosize = function (cellcontrol, datarow, prop) {
		var v, ctrlprop;

		if (nexacro._isArray(prop)) {
			for (var i = 0; i < prop.length; i++) {
				ctrlprop = prop[i];

				switch (ctrlprop) {
					case "font":
					case "wordSpacing":
					case "letterSpacing":
					case "border":
					case "padding":
					case "wordWrap":
						break;
					default:
						continue;
				}
				v = this._getAttrValue(this[ctrlprop], datarow);
				cellcontrol["set_" + ctrlprop](v);
			}
		}
		else {
			switch (prop) {
				case "font":
				case "wordSpacing":
				case "letterSpacing":
				case "border":
				case "padding":
				case "wordWrap":
					break;
				default:
					return;
			}
			v = this._getAttrValue(this[prop], datarow);
			cellcontrol["set_" + prop](v);
		}
	};


	_pCellInfo._use_displaytype_controls = ["buttoncontrol", "checkboxcontrol", "imagecontrol", "treeitemcontrol", "combocontrol", "calendarcontrol", "editcontrol", "maskeditcontrol", "textareacontrol", "progressbarcontrol"
	];

	_pCellInfo._chkExistSubControl = function (displaytype) {
		var usecontrols = this._use_displaytype_controls;

		for (var i = 0, n = usecontrols.length; i < n; i++) {
			if (usecontrols[i] == displaytype) {
				return displaytype;
			}
		}
		return "";
	};

	_pCellInfo._getDefaultPropVal = function (propname) {
		var _property_map = this._property_map;
		var prop, deft;

		for (var i = 0, n = _property_map.length; i < n; i++) {
			prop = _property_map[i][nexacro._CELLINFO_PMAP_PROPNAME];
			deft = _property_map[i][nexacro._CELLINFO_PMAP_DEFTVALUE];

			if (prop == propname) {
				return deft;
			}
		}
		return undefined;
	};

	_pCellInfo._allocatePropertys = function (_property_map) {
		var prop, bind, deft;
		for (var i = 0; i < _property_map.length; i++) {
			prop = _property_map[i][nexacro._CELLINFO_PMAP_PROPNAME];
			bind = _property_map[i][nexacro._CELLINFO_PMAP_EXPRBIND];
			deft = _property_map[i][nexacro._CELLINFO_PMAP_DEFTVALUE];

			if (bind) {
				this[prop] = new nexacro.BindableValue(deft);
			}
			else {
				this[prop] = deft;
			}
		}
	};

	nexacro._makeCellInfoPropertySetter = function (ptype_val, _property_map) {
		var prop, bind, str, type, styl, eval_str = "";
		function enumjoin (arr) {
			var str = "\"" + arr[0] + "\"";
			for (var i = 1; i < arr.length; i++) {
				str += ",\"" + arr[i] + "\"";
			}
			return str;
		}

		for (var i = 0; i < _property_map.length; i++) {
			prop = _property_map[i][nexacro._CELLINFO_PMAP_PROPNAME];
			bind = _property_map[i][nexacro._CELLINFO_PMAP_EXPRBIND];
			type = _property_map[i][nexacro._CELLINFO_PMAP_VALTYPE];
			styl = _property_map[i][nexacro._CELLINFO_PMAP_STYLE];

			if (bind) {
				str = "$PTYPE$.set_$ATTR$ = function (v)\n";
				str += "{\n";
				str += "    if (v != this.$ATTR$._value)\n";
				str += "    {\n";

				if (type == 0) {
					str += "        this.$ATTR$._set_intval(v);\n";
				}
				else if (type == 2) {
					str += "        this.$ATTR$._set_enumval(v, [" + enumjoin(_property_map[i][nexacro._CELLINFO_PMAP_ENUMVAL]) + "]);\n";
				}
				else {
					str += "        this.$ATTR$._set(v);\n";
				}

				str += "        this._afterProcBindTypeProp();\n";

				if (styl) {
					str += "        this._changedStyle(\"" + prop + "\");\n";
				}

				str += "    }\n";
				str += "};\n\n";
			}
			else {
				str = "$PTYPE$.set_$ATTR$ = function (v)\n";
				str += "{\n";

				if (type == 2) {
					str += "    var val = this.$ATTR$;\n";
					str += "    switch (v)\n";
					str += "    {\n";

					var arr = _property_map[i][nexacro._CELLINFO_PMAP_ENUMVAL];
					for (var j = 0; j < arr.length; j++) {
						str += "        case \"" + arr[j] + "\":\n";
					}
					str += "            val = v;\n";
					str += "    }\n";
					str += "    if (val != this.$ATTR$)\n";
				}
				else {
					str += "    if (v != this.$ATTR$)\n";
				}

				str += "    {\n";
				str += "        this.$ATTR$ = v;\n";

				if (styl) {
					str += "        this._changedStyle(\"" + prop + "\");\n";
				}

				str += "    }\n";
				str += "};\n\n";
			}
			str = str.replace(/\$PTYPE\$/g, ptype_val).replace(/\$ATTR\$/g, prop);
			eval_str += str;
		}
		eval(eval_str);
	};

	nexacro._makeCellInfoPropertySetter("_pCellInfo", _pCellInfo._property_map);

	nexacro._makePropertyDesignSetter = function (ptype_val, _property_map) {
		var prop;
		var str = "";

		for (var i = 0; i < _property_map.length; i++) {
			prop = _property_map[i][nexacro._CELLINFO_PMAP_PROPNAME];

			str += "$PTYPE$.design_set_" + prop + " = function (v)\n";
			str += "{\n";
			str += "        try\n";
			str += "        {\n";
			str += "            this._refinfo.set_" + prop + "(v);\n";
			str += "            this._updateAll();\n";
			str += "            this._apply_normalproperty(\"" + prop + "\", v);\n";
			str += "        }\n";
			str += "        catch(e)\n";
			str += "        {\n";
			str += "           if (e.obj)\n";
			str += "           {\n";
			str += "               trace(e.message);\n";
			str += "           }\n";
			str += "           else\n";
			str += "           {\n";
			str += "               var msg = nexacro._getExceptionMessage(e);\n";
			str += "               trace(msg);\n";
			str += "           }\n";
			str += "        }\n";
			str += "};\n\n";

			str += "$PTYPE$.design_get_" + prop + " = function ()\n";
			str += "{\n";
			str += "        var prop = this._refinfo." + prop + ";\n";
			str += "        if (prop)\n";
			str += "        {\n";
			str += "            if (nexacro._isNumber(prop) || prop._bindtype == undefined)\n";
			str += "                return prop;\n";
			str += "            else\n";
			str += "                return prop._value;\n";
			str += "        }\n";
			str += "        return prop;\n";
			str += "};\n\n";
		}
		str = str.replace(/\$PTYPE\$/g, ptype_val);

		eval(str);
	};

	_pCellInfo._addPropertyMap = function (ptype_val, _property_map_add, is_add_design_setter) {
		this._property_map = this._property_map.concat(_property_map_add);
		nexacro._makeCellInfoPropertySetter(ptype_val, _property_map_add);

		if (is_add_design_setter) {
			nexacro._makePropertyDesignSetter(ptype_val, _property_map_add);
		}
	};

	_pCellInfo.set_id = function (id) {
		this.id = this.name = id;
	};

	_pCellInfo.set_name = function (name) {
	};

	_pCellInfo.set_displaytype = function (v) {
		if (v != this.displaytype) {
			var oldVal = this.displaytype._value;
			this.displaytype._set(v);
			this._afterProcBindTypeProp();

			if (this._view) {
				if (oldVal == "treeitemcontrol") {
					this._view._removeTreeCellinfo(this);
				}
				if (v == "treeitemcontrol") {
					this._view._setTreeCellinfo(this);
				}
			}
		}
	};

	_pCellInfo.set_maskeditmaskchar = function (v) {
		if (!v) {
			v = "_";
		}
		var val = v.toString().charAt(0);
		if (val != this.maskeditmaskchar) {
			this.maskeditmaskchar = val;
			this._afterProcBindTypeProp();
		}
	};

	_pCellInfo.set_cssclass = function (v) {
		if (v != this.cssclass._value) {
			this.cssclass._set(v);
			this._afterProcBindTypeProp();
		}
	};

	_pCellInfo.set_expr = function (v) {
		if (v != this.expr._value) {
			var str;
			if (typeof v !== 'string') {
				str = v.toString();
			}
			else {
				str = v;
			}

			var tag = str.substr(0, 4).toUpperCase();
			if (tag != "" && tag != "EXPR") {
				v = "EXPR:" + v;
			}
			this.expr._set(v);
			this._afterProcBindTypeProp();
		}
	};


	_pCellInfo.destroy = function () {
		this.parent = null;
		var i;
		var n = this._subcells.length;

		for (i = 0; i < n; i++) {
			this._subcells[i].destroy();
		}
		this._subcells = null;
		this._maskstringtypeobj = null;
		this._masknumbertypeobj = null;

		var _property_map = this._property_map;
		var prop;

		for (i = 0; i < _property_map.length; i++) {
			prop = _property_map[i][nexacro._CELLINFO_PMAP_PROPNAME];
			this[prop] = null;
		}
		this._property_map = null;
		this._key_direction = null;
		this._blinked_status = null;
	};

	_pCellInfo._getBindDataset = function () {
		if (this._view) {
			return this._view._getBindDataSet ? this._view._getBindDataSet() : this._view._binddataset;
		}

		return null;
	};
	_pCellInfo._getExprCacheFn = function (ctx) {
		if (this._view) {
			return this._view._getExprFuncByCtx ? this._view._getExprFuncByCtx(ctx) : this._view._exprcache[ctx];
		}
	};
	_pCellInfo._setExprCacheFn = function (ctx, func) {
		if (this._view) {
			return this._view._setExprFuncByCtx ? this._view._setExprFuncByCtx(ctx, func) : this._view._exprcache[ctx] = func;
		}
	};

	_pCellInfo._getValue = function (rowidx, nowritable) {
		if (nowritable) {
			if (this.expr._value != "" && this.expr._value != null) {
				return this._getAttrValue(this.expr, rowidx);
			}
		}

		return this._getAttrValue(this.text, rowidx);
	};

	_pCellInfo._setValue = function (rowidx, v) {
		this._setAttrValue(this.text, rowidx, v);
	};

	_pCellInfo._getDisplaytype = function (rowidx) {
		var dt = this.displaytype;
		var d = this._getAttrValue(dt, rowidx);
		if (d === undefined) {
			d = "normal";
		}
		if (d == "normal") {
			var t = this.text;
			if (t._bindtype == 1) {
				var dataset = this._getBindDataset();
				if (!dataset) {
					return "text";
				}
				var colid = t._bindexpr;
				var coltype = dataset._getColumnType(colid);

				switch (coltype) {
					case 1:
					case 9:
						return "text";
					case 2:
					case 3:
					case 4:
						return "number";
					case 5:
						return "date";
					case 6:
						return "time";
					case 7:
						return "datetime";
					default:
						return "none";
				}
			}
			else {
				return "text";
			}
		}
		return d;
	};

	_pCellInfo._getEdittype = function (rowidx) {
		var dt = this.edittype;
		var d = this._getAttrValue(dt, rowidx);

		if (d == "normal") {
			var t = this.text;
			if (t._bindtype == 1) {
				var dataset = this._getBindDataset();
				if (!dataset) {
					return "text";
				}
				var colid = t._bindexpr;
				var colinfo = dataset._getColumnType(colid);
				if (!colinfo) {
					return "text";
				}

				var coltype = colinfo;

				switch (coltype) {
					case 1:
					case 2:
					case 3:
					case 4:
					case 9:
						return "text";
					case 5:
					case 6:
					case 7:
						return "date";
					case 8:
						return "none";
				}
			}
			else {
				return "text";
			}
		}
		return d;
	};

	_pCellInfo._getWordwrap = function (rowidx) {
		var wordwrap = this._getAttrValue(this.wordWrap, rowidx);
		return wordwrap;
	};

	_pCellInfo._getAttrValue = function (attr, rowidx) {
		if (attr == undefined) {
			return undefined;
		}

		if (attr._bindtype == undefined) {
			return attr;
		}
		else if (attr._bindtype == 0) {
			return attr._value;
		}
		else {
			var dataset = this._getBindDataset();
			if (dataset == null) {
				return undefined;
			}

			if (attr._bindtype == 1) {
				return dataset.getColumn(rowidx, attr._bindexpr);
			}
			else {
				var bindexpr = attr._bindexpr;
				var val = attr._value;
				var reg_exps = /BIND\s*:/i;
				var tag = reg_exps.exec(val);
				var s = -1;
				if (tag && tag.index >= 0) {
					s = tag.index;
				}
				if (s >= 0) {
					bindexpr = bindexpr.substring(s, bindexpr.length);
					bindexpr = dataset.getColumn(rowidx, bindexpr);
				}

				var exprfn = this._getExprCacheFn(bindexpr);
				if (exprfn == null) {
					exprfn = dataset._createExprFunc(bindexpr);
					this._setExprCacheFn(bindexpr, exprfn);
				}
				if ((typeof exprfn) == "function") {
					dataset.__getParsedRow(dataset._viewRecords[rowidx]);
					this.col = this._col;
					this.row = this._row;
					return exprfn.call(this, rowidx, rowidx, this._view, dataset, dataset._viewRecords, dataset._viewRecords[rowidx], []);
				}
			}
		}

		return undefined;
	};

	_pCellInfo._setAttrValue = function (attr, rowidx, v) {
		if (attr._bindtype == 1) {
			var dataset = this._getBindDataset();
			if (dataset) {
				dataset.setColumn(rowidx, attr._bindexpr, v);
			}
		}
	};

	_pCellInfo._getDefaultTextAlign = function (displayType, rowidx) {
		var align;

		switch (displayType) {
			case "normal":
				displayType = this._getDisplaytype(rowidx);
				if (displayType == "number") {
					align = "right";
				}
				else if (displayType == "date" || displayType == "time" || displayType == "datetime") {
					align = "center";
				}
				else {
					align = "left";
				}
				break;
			case "mask":
				var type = this._getAttrValue(this.maskedittype, rowidx);
				if (type == "number") {
					align = "right";
				}
				else {
					align = "left";
				}
				break;
			case "number":
			case "exponent":
			case "currency":
				align = "right";
				break;
			default:
				align = "center";
				break;
		}
		return align;
	};

	_pCellInfo._getCheckboxsize = function (rowidx) {
		var val = this._getAttrValue(this.checkboxsize, rowidx);

		if ((val === "" || val < 0) && this._view) {
			val = this._view.cellcheckboxsize;
		}

		return val;
	};

	_pCellInfo._getControlButtonsize = function (rowidx, control) {
		var val = this._getAttrValue(this[control + "buttonsize"], rowidx);

		if (val == null && this._view) {
			val = this._view["cell" + control + "buttonsize"];
		}

		return val;
	};

	_pCellInfo._getControlScrollbarsize = function (rowidx, control) {
		var val = this._getAttrValue(this[control + "scrollbarsize"], rowidx);

		if (val == null || val < 0) {
			if (this._view) {
				val = this._view["cell" + control + "scrollbarsize"];
			}
		}
		else {
			val = parseInt(val, 10);
		}

		if (val == null || val < 0) {
			val = undefined;
		}

		return val;
	};

	_pCellInfo._getControlPopuptype = function (rowidx, control) {
		var val = this._getAttrValue(this[control + "popuptype"], rowidx);

		if (!val && this._view) {
			val = this._view["cell" + control + "popuptype"];
		}

		return val;
	};

	_pCellInfo._getControlPopupsize = function (rowidx, control) {
		var val = this._getAttrValue(this[control + "popupsize"], rowidx);

		if (!val && this._view) {
			val = this._view["cell" + control + "popupsize"];
		}

		return val;
	};

	_pCellInfo._afterProcBindTypeProp = function () {
	};
	_pCellInfo._changedStyle = function (prop) {
	};

	_pCellInfo._getTooltipText = function (rowidx) {
		var text = this._getAttrValue(this.tooltiptext, rowidx);
		return text;
	};

	_pCellInfo._getTreeCheck = function (rowidx) {
		return this._getAttrValue(this.treecheck, rowidx);
	};

	_pCellInfo._getTreeCollapseImage = function (rowidx) {
		return this._getAttrValue(this.treecollapseimage, rowidx);
	};

	_pCellInfo._getTreeExpandImage = function (rowidx) {
		return this._getAttrValue(this.treeexpandimage, rowidx);
	};

	_pCellInfo._getTreeItemImage = function (rowidx) {
		return this._getAttrValue(this.treeitemimage, rowidx);
	};

	_pCellInfo._getTreeLevel = function (rowidx) {
		var v = this._getAttrValue(this.treelevel, rowidx);
		v = parseInt(v) | 0;
		return v;
	};

	_pCellInfo._getTreeStartLevel = function (rowidx) {
		var v = this._getAttrValue(this.treestartlevel, rowidx);
		v = parseInt(v) | 0;
		return v;
	};

	_pCellInfo._getTreeState = function (rowidx) {
		return this._getAttrValue(this.treestate, rowidx);
	};

	_pCellInfo._setTreeCheck = function (rowidx, v) {
		return this._setTreeBindValue(this.treecheck, rowidx, v);
	};

	_pCellInfo._setTreeCollapseImage = function (rowidx, v) {
		return this._setTreeBindValue(this.treecollapseimage, rowidx, v);
	};

	_pCellInfo._setTreeExpandImage = function (rowidx, v) {
		return this._setTreeBindValue(this.treeexpandimage, rowidx, v);
	};

	_pCellInfo._setTreeItemImage = function (rowidx, v) {
		return this._setTreeBindValue(this.treeitemimage, rowidx, v);
	};

	_pCellInfo._setTreeLevel = function (rowidx, v) {
		return this._setTreeBindValue(this.treelevel, rowidx, v);
	};

	_pCellInfo._setTreeStartLevel = function (rowidx, v) {
		return this._setTreeBindValue(this.treestartlevel, rowidx, v);
	};

	_pCellInfo._setTreeState = function (rowidx, v) {
		return this._setTreeBindValue(this.treestate, rowidx, v);
	};

	_pCellInfo._setTreeBindValue = function (attr, rowidx, v) {
		if (attr._bindtype == 1) {
			var dataset = this._getBindDataset();
			if (dataset) {
				dataset._treeBindChanged = true;
				dataset.setColumn(rowidx, v);
			}
		}
	};

	_pCellInfo._getLocale = function (rowidx) {
		var locale = this._getAttrValue(this.locale, rowidx);
		if (!locale && this._view) {
			locale = this._view._getLocale();
		}

		return locale;
	};
	_pCellInfo._getDisplayTypeValue = function (rowidx) {
		var dt = this.displaytype;
		var d = this._getAttrValue(dt, rowidx);
		if (d === undefined) {
			d = "normal";
		}
		return d;
	};
	_pCellInfo._getDisplayText = function (rowidx) {
		var dataset = this._getBindDataset();
		if (dataset && this.subsumtext._value !== null && this.subsumtext._value !== undefined && dataset.getRowType(rowidx) == 16) {
			var val = this._getAttrValue(this.subsumtext, rowidx);
			return nexacro._toString(val);
		}

		var d = this._getDisplayTypeValue(rowidx);

		if (d == "normal") {
			var t = this.text;
			if (t._bindtype == 1) {
				if (!dataset) {
					return "";
				}
				var colid = t._bindexpr;
				var coltype = dataset._getColumnType(colid);

				switch (coltype) {
					case 1:
					case 9:
						return this._getDisplayText_text(rowidx);
					case 2:
					case 3:
					case 4:
						return this._getDisplayText_number(rowidx);
					case 5:
						return this._getDisplayText_date(rowidx, 0);
					case 6:
						return this._getDisplayText_date(rowidx, 1);
					case 7:
						return this._getDisplayText_date(rowidx, 2);
					default:
						return "";
				}
			}
		}
		else {
			if (d == "mask" || d == "maskeditcontrol") {
				var type = this._getAttrValue(this.maskedittype, rowidx);

				if (type == "number") {
					return this._getDisplayText_masknumber(rowidx);
				}
				else {
					return this._getDisplayText_maskstring(rowidx);
				}
			}
			else if (d == "number") {
				return this._getDisplayText_number(rowidx);
			}
			else if (d == "currency") {
				return this._getDisplayText_currency(rowidx);
			}
			else if (d == "date") {
				return this._getDisplayText_date(rowidx);
			}
			else if (d == "calendarcontrol") {
				return this._getDisplayText_date(rowidx, null, true);
			}
			else if (d == "combotext") {
				return this._getDisplayText_combo(rowidx);
			}
			else if (d == "combocontrol") {
				return this._getDisplayText_combo(rowidx, true);
			}
			else if (d == "none") {
				return "";
			}
		}

		return this._getDisplayText_text(rowidx);
	};

	_pCellInfo._getTextValueForDisp = function (rowidx) {
		if (this.expr._value != "" && this.expr._value != null) {
			return this._getAttrValue(this.expr, rowidx);
		}

		return this._getAttrValue(this.text, rowidx);
	};

	_pCellInfo._getDisplayText_text = function (rowidx) {
		var v = this._getTextValueForDisp(rowidx);

		if (v != null) {
			if (typeof v !== 'string') {
				v = v.toString();
			}
		}

		return v;
	};

	_pCellInfo._getDisplayText_maskstring = function (rowidx) {
		var v = this._getTextValueForDisp(rowidx);
		var mask = this._getAttrValue(this.maskeditformat, rowidx);

		if (v != null) {
			if (typeof v !== 'string') {
				v = v.toString();
			}
		}

		if (mask && mask.length) {
			var maskobj = this._maskstringtypeobj;
			var maskchar = this._getAttrValue(this.maskeditmaskchar, rowidx);
			var locale = this._getLocale(rowidx);
			var maskeditpostfixtext = this._getAttrValue(this.maskeditpostfixtext, rowidx);

			maskobj.setLocale(locale);
			maskobj.setMask(mask);
			maskobj.setMaskChar(maskchar);
			maskobj.setPostfixtext(maskeditpostfixtext);
			v = maskobj.applyMask(v);
		}
		return v;
	};

	_pCellInfo._getDisplayText_masknumber = function (rowidx) {
		var v = this._getTextValueForDisp(rowidx);
		var mask = this._getAttrValue(this.maskeditformat, rowidx);

		if (mask && mask.length) {
			var locale = this._getLocale(rowidx);
			var maskobj = this._masknumbertypeobj;
			var limittype = this._getAttrValue(this.maskeditlimitbymask, rowidx);
			var maskeditpostfixtext = this._getAttrValue(this.maskeditpostfixtext, rowidx);

			if (mask === ".") {
				maskobj.setUseGrouping(true);
			}

			maskobj.setLimitType(limittype);
			maskobj.setLocale(locale);
			maskobj.setMask(mask);
			maskobj.setPostfixtext(maskeditpostfixtext);
			v = maskobj.applyMask(v);
		}
		else {
			v = nexacro._toString(v);
		}
		return v;
	};

	_pCellInfo._getDisplayText_number = function (rowidx) {
		var v = this._getTextValueForDisp(rowidx);
		var limittype = this._getAttrValue(this.maskeditlimitbymask, rowidx);
		var locale = this._getLocale(rowidx);
		var maskobj = this._masknumbertypeobj;

		maskobj.setUseGrouping(true);
		maskobj.setLimitType(limittype);
		maskobj.setLocale(locale);
		maskobj.setMask("");
		v = maskobj.applyMask(v);

		return v;
	};

	_pCellInfo._getDisplayText_currency = function (rowidx) {
		var v = this._getTextValueForDisp(rowidx);
		var locale = this._getLocale(rowidx);

		if (!isNaN(v)) {
			var nexanum = new nexacro.Number(v);
			v = nexanum.toLocaleCurrencyString(locale);
		}

		return v;
	};

	_pCellInfo._getDisplayText_date = function (rowidx, colType, is_control) {
		var v = this._getTextValueForDisp(rowidx);
		var date = undefined;
		var nullmask = false;
		var is_date_empty = false;
		var dateformatmask;

		switch (colType) {
			case 0:
				dateformatmask = "yyyy-MM-dd";
				break;
			case 1:
				dateformatmask = "hh:mm:ss";
				break;
			case 2:
				dateformatmask = "yyyy-MM-dd hh:mm:ss";
				break;
			default:
				dateformatmask = this._getAttrValue(this.calendardateformat, rowidx);
				break;
		}

		v = (v) ? v : "";

		if (v.constructor == Date) {
			date = v;
		}
		else {
			var strVal;
			var calendardisplayinvalidtype;
			var calendardisplaynulltype;
			if (typeof v !== 'string') {
				strVal = v.toString();
			}
			else {
				strVal = v;
			}
			if (strVal.search(/\S/) > -1) {
				if (colType == undefined) {
					var editformatmask = this._getAttrValue(this.calendareditformat, rowidx);

					if (editformatmask && editformatmask.length) {
						if (editformatmask == "LONGDATE" || editformatmask == "SHORTDATE") {
							colType = 2;
						}
						else {
							var maskobj = new nexacro._EditMaskTypeDate();
							maskobj.setDateMask(editformatmask);
							maskobj.setEditMask(editformatmask);

							colType = maskobj.getEditFormatType();
						}
					}
					else {
						if (strVal.length == 8) {
							colType = 0;
						}
						else if (strVal.length == 6 || strVal.length == 9) {
							colType = 1;
						}
						else {
							colType = 2;
						}
					}
				}
				date = this.__parseDate(strVal, colType);

				if (date && (date._isInvalidDate ? date._isInvalidDate() : isNaN(date.valueOf()))) {
					calendardisplayinvalidtype = this._getAttrValue(this.calendardisplayinvalidtype, rowidx);
					if ((calendardisplayinvalidtype == "invalidtext" || calendardisplayinvalidtype == "default") && !is_control) {
						return this._getAttrValue(this.calendardisplayinvalidtext, rowidx);
					}

					return strVal;
				}
			}
			else {
				calendardisplaynulltype = this._getAttrValue(this.calendardisplaynulltype, rowidx);
				if (calendardisplaynulltype == "nulltext" && !is_control) {
					return this._getAttrValue(this.calendardisplaynulltext, rowidx);
				}
				else if (calendardisplaynulltype == "nullmask" && !is_control) {
					nullmask = true;
				}
				else if (calendardisplaynulltype == "default") {
				}
				else {
					return "";
				}
			}
		}

		if (date == null) {
			is_date_empty = true;
			date = new nexacro.Date();
			date.setFullYear(0);
			date.setMonth(0);
			date.setDate(1);
		}

		var dateStr;
		var locale = this._getLocale(rowidx);
		var locale_info = nexacro.Locale.getLocaleInfo(locale);
		var format;

		if (dateformatmask == "SHORTDATE" || dateformatmask == "LONGDATE") {
			if (dateformatmask == "SHORTDATE") {
				format = locale_info.shortdate_format;
			}
			else {
				format = locale_info.longdate_format;
			}

			if (format == "") {
				format = nexacro.Locale._default_shortdate_format;
			}

			var b_ltr_mark = ((this._view && !this._view._isRtl()) && locale_info.direction == "rtl") ? true : false;

			dateStr = date.getLocaleFormatString(locale, format, b_ltr_mark);
		}
		else {
			var yyyy = date.getFullYear();
			if (yyyy == 0) {
				yyyy = "0000";
			}
			else {
				yyyy = yyyy.toString().padLeft(4, "0");
			}

			var MM = date.getMonth() + 1;
			var MMMM = locale_info.month_names_long[date.getMonth()];
			MM = (MM < 10 ? "0" : "") + MM;

			var dddd = locale_info.weekday_names_long[date.getDay()];
			var ddd = locale_info.weekday_names_short[date.getDay()];
			var dd = date.getDate();

			dd = (dd < 10 ? "0" : "") + dd;

			var yy = date.getYear() % 100;
			yy = (yy < 10 ? "0" : "") + yy;

			var M = +MM;
			var d = +dd;

			var hour = date.getHours();
			hour = (hour < 10 ? "0" : "") + hour;
			var h = +hour;

			var minute = date.getMinutes();
			minute = (minute < 10 ? "0" : "") + minute;
			var mn = +minute;

			var second = date.getSeconds();
			second = (second < 10 ? "0" : "") + second;

			var s = +second;

			var millisecond = date.getMilliseconds();
			millisecond = (millisecond < 10 ? "00" : millisecond < 100 ? "0" : "") + millisecond;

			if (is_date_empty) {
				hour = h = "00";
				minute = mn = "00";
				second = s = "00";
				millisecond = "000";
			}

			format = dateformatmask;

			if (format == null || format.length == 0 || !format.match(/[yMdHhms]/)) {
				format = "yyyy-MM-dd ddd";
			}

			if (nullmask) {
				var maskchar1 = "_";
				var maskchar2 = maskchar1 + maskchar1;
				var maskchar3 = maskchar2 + maskchar1;
				var maskchar4 = maskchar3 + maskchar1;


				dateStr = format.replace("yyyy", maskchar4);
				dateStr = dateStr.replace("MMMM", "lunari");
				dateStr = dateStr.replace("MM", maskchar2);
				dateStr = dateStr.replace("ddd", "week");
				dateStr = dateStr.replace("dd", maskchar2);

				dateStr = dateStr.replace("yy", maskchar2);
				dateStr = dateStr.replace("M", maskchar1);
				dateStr = dateStr.replace("d", maskchar1);
				dateStr = dateStr.replace("tt", maskchar2);
				dateStr = dateStr.replace("HH", maskchar2);
				dateStr = dateStr.replace("hh", maskchar2);
				dateStr = dateStr.replace("H", maskchar1);
				dateStr = dateStr.replace("h", maskchar1);
				dateStr = dateStr.replace("mm", maskchar2);
				dateStr = dateStr.replace("m", maskchar1);
				dateStr = dateStr.replace("sss", maskchar3);
				dateStr = dateStr.replace("ss", maskchar2);
				dateStr = dateStr.replace("s", maskchar1);
				dateStr = dateStr.replace("lunari", maskchar4);
				dateStr = dateStr.replace("week", maskchar3);
			}
			else {
				var hh = hour;
				var tt = "오전";
				if (hour > 12 && hour < 25) {
					hh = hour < 22 ? "0" + (hour - 12) : hour - 12;
					tt = "오후";
				}

				dateStr = format.replace("tt", tt);
				dateStr = dateStr.replace("HH", hour);
				dateStr = dateStr.replace("hh", hh);
				dateStr = dateStr.replace("H", h);
				dateStr = dateStr.replace("h", h);
				dateStr = dateStr.replace("mm", minute);
				dateStr = dateStr.replace("m", mn);
				dateStr = dateStr.replace("sss", millisecond);
				dateStr = dateStr.replace("ss", second);
				dateStr = dateStr.replace("s", s);

				dateStr = dateStr.replace("dddd", "weekL");
				dateStr = dateStr.replace("ddd", "week");
				dateStr = dateStr.replace("yyyy", yyyy);
				dateStr = dateStr.replace("MMMM", "lunari");
				dateStr = dateStr.replace("MM", MM);
				dateStr = dateStr.replace("dd", dd);
				dateStr = dateStr.replace("yy", yy);
				dateStr = dateStr.replace("M", M);
				dateStr = dateStr.replace("d", d);
				dateStr = dateStr.replace("lunari", MMMM);
				dateStr = dateStr.replace("weekL", dddd);
				dateStr = dateStr.replace("week", ddd);
			}
		}

		return dateStr;
	};

	_pCellInfo.__parseDate = function (v, formattype) {
		var dateobj;
		var maskobj = new nexacro._EditMaskTypeDate();
		if (/[^0-9]/.test(v)) {
			dateobj = new Date(v);
		}
		else {
			dateobj = maskobj.convertToDateObject(v, formattype);
		}

		if (dateobj) {
			if (isNaN(dateobj.valueOf())) {
				return dateobj;
			}

			switch (formattype) {
				case 0:
					dateobj = new nexacro.Date(dateobj.getFullYear(), dateobj.getMonth(), dateobj.getDate());
					break;
				case 1:
					dateobj = new nexacro.Date(dateobj.getFullYear(), dateobj.getMonth(), dateobj.getDate(), dateobj.getHours(), dateobj.getMinutes(), dateobj.getSeconds(), dateobj.getMilliseconds());
					dateobj._timeonly = true;
					break;
				case 2:
					dateobj = new nexacro.Date(dateobj.getFullYear(), dateobj.getMonth(), dateobj.getDate(), dateobj.getHours(), dateobj.getMinutes(), dateobj.getSeconds(), dateobj.getMilliseconds());
					break;
				default:
					break;
			}
		}

		return dateobj;
	};

	_pCellInfo._getDisplayText_combo = function (rowidx, is_control) {
		var combodataset = this._getAttrValue(this.combodataset, rowidx);
		var combocodecol = this._getAttrValue(this.combocodecol, rowidx);
		var combodatacol = this._getAttrValue(this.combodatacol, rowidx);
		if (combodataset && combodataset.length && combocodecol && combocodecol.length && combodatacol && combodatacol.length) {
			var ds = this._findDataset(combodataset);
			if (ds) {
				var v = this._getTextValueForDisp(rowidx);
				var text = ds.lookupNF(combocodecol, v, combodatacol);
				if (text) {
					if (typeof text !== 'string') {
						return text.toString();
					}
					else {
						return text;
					}
				}
			}
		}

		if (this.combodisplaynulltype._value == "nulltext" && !is_control) {
			return this._getAttrValue(this.combodisplaynulltext, rowidx);
		}

		return "";
	};

	_pCellInfo._findDataset = function (combodataset) {
		var view = this._view;
		if (view) {
			return view._findDataset(combodataset);
		}

		return null;
	};

	_pCellInfo._loadXmlElement = function (cellElem, subcell_override_info, is_sub) {
		var col = cellElem.getAttribute("col"), row = cellElem.getAttribute("row"), colspan = cellElem.getAttribute("colspan"), rowspan = cellElem.getAttribute("rowspan");

		this._col = (col == null ? 0 : parseInt(col));
		this._row = (row == null ? 0 : parseInt(row));
		this._colspan = (colspan == null ? 1 : parseInt(colspan));
		this._rowspan = (rowspan == null ? 1 : parseInt(rowspan));

		var _property_map = this._property_map;
		var prop, attrval;
		var i;
		var n = _property_map.length;

		for (i = 0; i < n; i++) {
			prop = _property_map[i][nexacro._CELLINFO_PMAP_PROPNAME];
			attrval = cellElem.getAttribute(prop);

			this._loadingxml = true;
			if (attrval !== null && attrval !== undefined) {
				this["set_" + prop](attrval);
			}
			this._loadingxml = false;
		}

		if (!is_sub) {
			var subcells = cellElem.getElementsByTagName("Cell"), subinfo, subcellElem;

			if (!subcell_override_info) {
				subcell_override_info = nexacro.CellInfo;
			}

			for (i = 0, n = subcells.length; i < n; i++) {
				subcellElem = subcells[i];
				subinfo = new subcell_override_info((this._type + this._cellidx + "_sub" + i), this.parent, this._view, this._type, i);
				subinfo._loadXmlElement(subcellElem, true);
				subinfo._isSubCell = true;
				this._subcells[i] = subinfo;
			}
		}
	};

	_pCellInfo._getXmlString = function () {
		var strContents = "";

		if (this._isSubCell) {
			strContents += "    ";
		}

		strContents += "<Cell col=\"" + this._col;
		strContents += "\" row=\"" + this._row;

		if (this._colspan > 1) {
			strContents += "\" colspan=\"" + this._colspan;
		}
		if (this._rowspan > 1) {
			strContents += "\" rowspan=\"" + this._rowspan;
		}

		var _property_map = this._property_map;
		var prop, bind, deft;
		var i;
		var n = _property_map.length;

		for (i = 0; i < n; i++) {
			prop = _property_map[i][nexacro._CELLINFO_PMAP_PROPNAME];
			bind = _property_map[i][nexacro._CELLINFO_PMAP_EXPRBIND];
			deft = _property_map[i][nexacro._CELLINFO_PMAP_DEFTVALUE];

			if (bind) {
				if (this[prop]._value != deft) {
					strContents += "\" " + prop + "=\"" + (typeof (this[prop]._value) == "string" ? nexacro._encodeXml(this[prop]._value) : this[prop]._value);
				}
			}
			else {
				if (this[prop] != deft) {
					strContents += "\" " + prop + "=\"" + (typeof (this[prop]) == "string" ? nexacro._encodeXml(this[prop]) : this[prop]);
				}
			}
		}

		var subcells = this._subcells;

		if (subcells.length > 0) {
			strContents += "\">\n";

			for (i = 0, n = subcells.length; i < n; i++) {
				strContents += subcells[i]._getXmlString(true);
			}

			strContents += "</Cell>\n";
		}
		else {
			strContents += "\"/>\n";
		}

		return strContents;
	};

	_pCellInfo._hasEditor = function (datarow) {
		var editType = this._getEdittype(datarow);

		switch (editType) {
			case "none":
				return false;
			case "normal":
			case "text":
			case "combo":
			case "date":
			case "mask":
			case "textarea":
			case "button":
			case "readonly":
				return true;
		}
		return false;
	};

	delete _pCellInfo;
}

if (!nexacro._CellControl) {
	nexacro._CellControl = function (id, left, top, width, height, right, bottom, parent, refinfo, cellidx, view, rowidx) {
		nexacro.Component.call(this, id, left, top, width, height, right, bottom, null, null, null, null, parent);

		var add_event_list = ["onexpandup", "onexpanddown", "oninput", "ondropdown", "oncloseup"];

		this._view = view;
		this._rowidx = (rowidx != undefined) ? rowidx : -9;
		this.tabstop = false;
		this._cellidx = cellidx;
		this._refinfo = refinfo ? refinfo : this._makeCellInfo(id, null, view, id, cellidx);
		this.subcells = [];
		this.parentcell = (parent instanceof nexacro._CellControl) ? parent : null;
		this.selected = false;
		this.accessibilityrole = "gridcell";
		this._subComp = null;
		this._text_elem = null;
		this._curDisplayType = "";
		this._expand_width = 0;
		this._expandCtrl = null;
		this._isSubCell = (this.parentcell) ? true : false;
		this._fakecell = false;
		this._hideInner = false;
		this._is_real_upelem = null;
		this._editor = null;
		this._client_mode = "";
		this._disp_show = true;
		this._writable = false;

		this._cellExpandObj = "_CellExpandControl";
		this._cellButtonObj = "_CellButtonControl";
		this._cellCheckBoxObj = "_CellCheckboxControl";
		this._cellImageObj = "_CellImageControl";
		this._cellComboObj = "_CellComboControl";
		this._cellCalendarObj = "_CellCalendarControl";
		this._cellEditObj = "_CellEditControl";
		this._cellTextAreaObj = "_CellTextAreaControl";
		this._cellProgressBarObj = "_CellProgressBarControl";
		this._cellMaskEditObj = "_CellMaskEditControl";
		this._cellTreeObj = "_CellTreeControl";

		for (var i = 0, n = add_event_list.length; i < n; i++) {
			this._event_list[add_event_list[i]] = 1;
		}
	};

	var _pCellControl = nexacro._createPrototype(nexacro.Component, nexacro._CellControl);
	nexacro._CellControl.prototype = _pCellControl;

	_pCellControl._type_name = "CellControl";
	_pCellControl._is_subcontrol = true;
	_pCellControl._is_tablecell = true;
	_pCellControl._is_simple_control = true;
	_pCellControl._use_selected_status = true;
	_pCellControl._use_readonly_status = true;
	_pCellControl._is_use_auto_selected_status = true;
	_pCellControl._avail_left = 0;
	_pCellControl._avail_top = 0;
	_pCellControl._avail_width = 0;
	_pCellControl._avail_height = 0;

	_pCellControl.init = function (id, left, top, width, height, right, bottom, refinfo, cellidx, view, rowidx) {
		nexacro.Component.prototype.init.call(this, id, left, top, width, height, right, bottom, null, null, null, null);

		var info = this._refinfo;
		info.id = refinfo.name = id;
		info._view = view;
		info._type = "";
		info._cellidx = cellidx;
	};

	_pCellControl._changeCell = function (target_cell) {
		var refinfo = this._refinfo;
		var cellidx = this._cellidx;
		this._refinfo = target_cell._refinfo;
		this._cellidx = target_cell._cellidx;
		target_cell._refinfo = refinfo;
		target_cell._cellidx = cellidx;

		var l = this._adjust_left;
		var t = this._adjust_top;
		var w = this._adjust_width;
		var h = this._adjust_height;

		this.move(target_cell._adjust_left, target_cell._adjust_top, target_cell._adjust_width, target_cell._adjust_height);
		target_cell.move(l, t, w, h);
	};

	_pCellControl._makeCellInfo = function (id, parent, view, type, idx) {
		return new nexacro.CellInfo(id, parent, view, type, idx);
	};

	_pCellControl._apply_normalproperty = function (prop, val) {
	};

	_pCellControl._getDisplaytype = function () {
		var datarow = this._getDataRow();
		return this._refinfo._getDisplaytype(datarow);
	};

	_pCellControl._getCurrentStyleAlign = function (noflush) {
		var align = {
			textAlign : "center", 
			verticalAlign : "middle"
		};

		if (this._text_elem) {
			align = this._text_elem._getComputedStyleAlign(noflush);
		}

		return align;
	};

	_pCellControl.on_create_contents = function () {
		this._disp_show = this._updateDisplayer();
	};

	_pCellControl.on_created_contents = function (win) {
		var control_elem = this._control_element;
		if (control_elem) {
			if (control_elem.setInnerHTML && this._view._use_innerhtml && !this.parent._is_nc_control) {
				this._is_create_commandstr = true;
				var str = this.on_create_contents_command();
				control_elem.setInnerHTML(str);
				this.on_attach_contents_handle(win);
				this._is_created = true;
			}
			else {
				var subcells = this.subcells;
				var subcells_len = subcells.length;

				if (subcells_len == 0) {
					var sub_ctrl = this._subComp;

					if (sub_ctrl) {
						sub_ctrl.on_created(win);
					}
				}

				var text_elem = this._text_elem;

				if (text_elem) {
					text_elem.create(win);
				}

				var expand_ctrl = this._expandCtrl;

				if (expand_ctrl) {
					expand_ctrl.on_created();
				}

				for (var i = 0; i < subcells_len; i++) {
					subcells[i].on_created();
				}
			}

			if (nexacro._enableaccessibility && this._view && !this._view._accept_focus) {
				var accessibility = this.accessibility;

				if (accessibility) {
					this._view._accept_focus = true;
				}
			}

			if (!this._adjust_width || !this._adjust_height) {
				this._setDisplay(false);
			}
		}
	};

	_pCellControl._on_changeStatus = function (status, value) {
		this._status_changing = true;
		nexacro.Component.prototype._on_changeStatus.call(this, status, value);
		this._status_changing = false;
	};

	_pCellControl.on_changeStatus = function (changestatus, value, applystatus, currentstatus, currentuserstatus) {
		if (this._isSubCell) {
			return currentstatus;
		}

		return nexacro.Component.prototype.on_changeStatus.call(this, changestatus, value, applystatus, currentstatus, currentuserstatus);
	};

	_pCellControl.on_create_contents_command = function (area) {
		var str = "";
		var control_elem = this._control_element;
		if (control_elem) {
			var subcells = this.subcells;
			var subcells_len = subcells.length;

			if (subcells_len == 0) {
				var sub_ctrl = this._subComp;

				if (sub_ctrl) {
					str += sub_ctrl.createCommand();
				}
			}
			else {
				for (var i = 0; i < subcells_len; i++) {
					str += subcells[i].createCommand();
				}
			}

			var text_elem = this._text_elem;

			if (text_elem) {
				str += text_elem.createCommand();
			}

			var expand_ctrl = this._expandCtrl;

			if (expand_ctrl) {
				str += expand_ctrl.createCommand();
			}
		}
		return str;
	};

	_pCellControl.on_attach_contents_handle = function (win) {
		var subcells = this.subcells;
		var subcells_len = subcells.length;

		for (var i = 0; i < subcells_len; i++) {
			subcells[i].attachHandle(win);
		}

		var sub_ctrl = this._subComp;
		if (sub_ctrl) {
			sub_ctrl.attachHandle(win);
		}

		var expand_ctrl = this._expandCtrl;
		if (expand_ctrl) {
			expand_ctrl.attachHandle(win);
		}

		var text_elem = this._text_elem;
		if (text_elem) {
			text_elem.attachHandle(win);
		}

		if (nexacro._enableaccessibility && this._view && !this._view._accept_focus) {
			var accessibility = this.accessibility;
			if (accessibility) {
				this._view._accept_focus = true;
			}
		}

		if (!this._adjust_width || !this._adjust_height) {
			this._setDisplay(false);
		}
	};

	_pCellControl.destroyComponent = function () {
		nexacro.Component.prototype.destroyComponent.call(this);

		if (this._text_elem) {
			this._text_elem.destroy();
			this._text_elem = null;
		}
		this._refinfo = this._view = this.parentcell = this._band = this._is_real_upelem = null;
	};

	_pCellControl.on_destroy_contents = function () {
		this._destroyDisplayer();

		if (this._expandCtrl) {
			this._expandCtrl.destroy();
			this._expandCtrl = null;
		}

		var subcells = this.subcells;
		var subcells_len = subcells.length;
		var i;

		if (this.id == "tempcell") {
			for (i = 0; i < subcells_len; i++) {
				if (subcells[i]) {
					subcells[i].destroy();
				}
			}
		}
		else {
			for (i = 0; i < subcells_len; i++) {
				subcells[i].destroy();
			}
		}

		this.subcells = null;

		if (this._tempdestroyeditor) {
			this._tempdestroyeditor.destroy();
			this._tempdestroyeditor = null;
		}
		if (this._editor) {
			this._editor.destroy();
			this._editor = null;
		}
		if (this._tempdestroyeditor_list) {
			for (i = 0; i < this._tempdestroyeditor_list.length; i++) {
				this._tempdestroyeditor_list[i].destroy();
			}
			this._tempdestroyeditor_list = null;
		}
	};

	_pCellControl._makeEventInfoBase = function (evt_id) {
		var cellobj = this;
		var subcellobj = null;

		if (cellobj.parentcell) {
			subcellobj = cellobj;
			cellobj = cellobj.parentcell;
		}

		var obj = {
			cell : -1, 
			col : -1, 
			row : -9, 
			subrow : -1, 
			mergecell : -1, 
			mergecol : -1, 
			mergerow : -1, 
			pivotindex : -9, 
			eventid : "", 
			id : ""
		};

		if (evt_id) {
			obj.eventid = obj.id = evt_id;
		}

		obj.cell = cellobj._cellidx;
		obj.col = cellobj._refinfo._col;
		obj.row = cellobj._getDataRow();
		obj.subrow = cellobj._refinfo._row;

		if (subcellobj) {
			obj.mergecell = subcellobj._cellidx;
			obj.mergecol = subcellobj._refinfo._col;
			obj.mergerow = subcellobj._refinfo._row;
		}
		return obj;
	};

	_pCellControl.on_fire_onexpandup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		if (this.onexpandup && this.onexpandup._has_handlers) {
			var evt = this._makeEventInfoBase("onexpandup");
			evt.button = button;
			evt.altkey = alt_key;
			evt.ctrlkey = ctrl_key;
			evt.shiftkey = shift_key;
			evt.metakey = meta_key;
			evt.screenX = screenX;
			evt.screenY = screenY;
			evt.canvasX = canvasX;
			evt.canvasY = canvasY;
			evt.clientX = clientX;
			evt.clientY = clientY;
			evt.fromobject = from_comp;
			evt.fromreferenceobject = from_refer_comp;
			return this.onexpandup._fireEvent(this, evt);
		}
		return false;
	};

	_pCellControl.on_fire_onexpanddown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		if (this.onexpandup && this.onexpandup._has_handlers) {
			var evt = this._makeEventInfoBase("onexpanddown");
			evt.button = button;
			evt.altkey = alt_key;
			evt.ctrlkey = ctrl_key;
			evt.shiftkey = shift_key;
			evt.metakey = meta_key;
			evt.screenX = screenX;
			evt.screenY = screenY;
			evt.canvasX = canvasX;
			evt.canvasY = canvasY;
			evt.clientX = clientX;
			evt.clientY = clientY;
			evt.fromobject = from_comp;
			evt.fromreferenceobject = from_refer_comp;
			return this.onexpandup._fireEvent(this, evt);
		}
		return false;
	};

	_pCellControl.on_fire_oninput = function () {
		if (this.oninput && this.oninput._has_handlers) {
			var evt = this._makeEventInfoBase("oninput");
			return this.oninput._fireEvent(this, evt);
		}
		return true;
	};

	_pCellControl.on_fire_ondropdown = function (obj) {
		if (this.ondropdown && this.ondropdown._has_handlers) {
			var evt = this._makeEventInfoBase("ondropdown");
			evt.value = this.__evtvalue(obj);
			return this.ondropdown._fireCheckEvent(this, evt);
		}
		return true;
	};

	_pCellControl.on_fire_oncloseup = function (obj, pretext, posttext, prevalue, postvalue) {
		if (this.oncloseup && this.oncloseup._has_handlers) {
			var evt = this._makeEventInfoBase("oncloseup");
			evt.value = this.__evtvalue(obj, postvalue);
			return this.oncloseup._fireEvent(this, evt);
		}
		return true;
	};

	_pCellControl.on_fire_onclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key, clickitem) {
		if (this.onclick && this.onclick._has_handlers) {
			var subcomp = from_refer_comp;

			while (subcomp && subcomp instanceof nexacro.Component) {
				if (subcomp instanceof nexacro._CellControl) {
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

			if (this._subComp == from_comp) {
				var padding = this._getCurrentStylePadding();

				if (padding) {
					canvasX += padding.left;
					canvasY += padding.top;
					clientX += padding.left;
					clientY += padding.top;
				}
			}

			canvasX += this._adjust_left;
			canvasY += this._adjust_top;
			clientX += this._adjust_left;
			clientY += this._adjust_top;

			var evt = this._makeEventInfoBase("onclick");
			evt.button = button;
			evt.altkey = alt_key;
			evt.ctrlkey = ctrl_key;
			evt.shiftkey = shift_key;
			evt.metakey = meta_key;
			evt.screenx = screenX;
			evt.screeny = screenY;
			evt.canvasx = canvasX;
			evt.canvasy = canvasY;
			evt.clientx = clientX;
			evt.clienty = clientY;
			evt.fromobject = from_comp;
			evt.fromreferenceobject = from_refer_comp;
			evt.clickitem = clickitem || "";
			return this.onclick._fireEvent(this, evt);
		}
		return false;
	};

	_pCellControl.on_fire_ondblclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key, clickitem) {
		nexacro._fireBeforeDblclick(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);

		if (this.ondblclick && this.ondblclick._has_handlers) {
			var subcomp = from_refer_comp;

			while (subcomp && subcomp instanceof nexacro.Component) {
				if (subcomp instanceof nexacro._CellControl) {
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

			if (this._subComp == from_comp) {
				var padding = this._getCurrentStylePadding();

				if (padding) {
					canvasX += padding.left;
					canvasY += padding.top;
					clientX += padding.left;
					clientY += padding.top;
				}
			}

			canvasX += this._adjust_left;
			canvasY += this._adjust_top;
			clientX += this._adjust_left;
			clientY += this._adjust_top;

			var evt = this._makeEventInfoBase("ondblclick");
			evt.button = button;
			evt.altkey = alt_key;
			evt.ctrlkey = ctrl_key;
			evt.shiftkey = shift_key;
			evt.metakey = meta_key;
			evt.screenx = screenX;
			evt.screeny = screenY;
			evt.canvasx = canvasX;
			evt.canvasy = canvasY;
			evt.clientx = clientX;
			evt.clienty = clientY;
			evt.fromobject = from_comp;
			evt.fromreferenceobject = from_refer_comp;
			evt.clickitem = clickitem || "";
			return this.ondblclick._fireEvent(this, evt);
		}
		return false;
	};

	_pCellControl._common_fire_lbuttonup = function (touchinfos, changedtouchinfos, button, altKey, ctrlKey, shiftKey, screenX, screenY, canvasX, canvasY, clientX, clientY, obj, from_refer_comp, from_elem, metaKey) {
		var window = this._getWindow();
		var elem = window._cur_ldown_elem;

		var comp = window.findComponent(elem, 0, 0)[0];
		var up_comp = window.findComponent(from_elem, 0, 0)[0];

		if (elem != from_elem) {
			while (comp) {
				if (comp instanceof nexacro._CellControl) {
					break;
				}

				comp = comp.parent;
			}

			while (up_comp) {
				if (up_comp instanceof nexacro._CellControl) {
					break;
				}

				up_comp = up_comp.parent;
			}

			if (comp == up_comp) {
				var clickitem = "";
				if (this._editor) {
					clickitem = "control";
				}

				this.on_fire_onclick(button, altKey, ctrlKey, shiftKey, screenX, screenY, canvasX, canvasY, clientX, clientY, obj, from_refer_comp, metaKey, clickitem);
			}
		}
	};

	_pCellControl.on_fire_user_ontouchend = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		this._common_fire_lbuttonup(touchinfos, changedtouchinfos, "", false, false, false, -1, -1, -1, -1, -1, -1, from_comp, from_refer_comp, null);
		return nexacro.Component.prototype.on_fire_user_ontouchend.call(this, touchinfos, changedtouchinfos, from_comp, from_refer_comp);
	};

	_pCellControl.on_fire_user_onlbuttonup = function (button, altKey, ctrlKey, shiftKey, screenX, screenY, canvasX, canvasY, clientX, clientY, obj, refer_comp, from_elem, metaKey) {
		this._common_fire_lbuttonup(null, null, button, altKey, ctrlKey, shiftKey, screenX, screenY, canvasX, canvasY, clientX, clientY, obj, refer_comp, from_elem, metaKey);
		return nexacro.Component.prototype.on_fire_user_onlbuttonup.call(this, button, altKey, ctrlKey, shiftKey, screenX, screenY, canvasX, canvasY, clientX, clientY, obj, refer_comp, from_elem, metaKey);
	};

	_pCellControl._on_imeaction = function (elem, keycode, alt_key, ctrl_key, shift_key, meta_key) {
		if (!this._is_alive) {
			return;
		}

		if (this.visible && this._isEnable() && this.enableevent) {
			this.on_fire_onimeaction(keycode, alt_key, ctrl_key, shift_key, this, this, meta_key);
			var pThis = this._getFromComponent(this);
			if (pThis && (!pThis.oncellimeaction || (pThis.oncellimeaction && !pThis.oncellimeaction.defaultprevented))) {
				this.on_imeaction_default_action(elem, keycode, alt_key, ctrl_key, shift_key, meta_key);
			}
		}
	};

	_pCellControl.on_imeaction_default_action = function (elem, keycode, alt_key, ctrl_key, shift_key, meta_key) {
		if (this._subComp) {
			if (this._subComp.imeaction == "next") {
				var root_comp = this._getRootComponent(this);
				var next_comp = this._getForm().getNextComponent(root_comp, true);
				if (next_comp) {
					next_comp.setFocus();
				}
			}
			else if (this._subComp.imeaction == "previous") {
				var root_comp = this._getRootComponent(this);
				var prev_comp = this._getForm().getPrevComponent(root_comp, true);
				if (prev_comp) {
					if (prev_comp instanceof Array) {
						prev_comp = prev_comp[0];
					}

					prev_comp.setFocus();
				}
			}
		}
	};

	_pCellControl.on_fire_onimeaction = function (key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp, meta_key) {
		return this._view.on_fire_onimeaction(this, key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp, meta_key);
	};

	_pCellControl.__evtvalue = function (obj, postvalue) {
		var val = "";

		if (obj && obj.value) {
			val = obj.value;
		}
		else if (postvalue) {
			val = postvalue;
		}

		return val;
	};

	_pCellControl._destroyDisplayer = function (b_async) {
		if (this._subComp) {
			if (b_async) {
				var subcomp = this._subComp;
				nexacro._OnceCallbackTimer.callonce(this, function () {
					if (subcomp) {
						subcomp.destroy();
					}
				});
				subcomp.set_visible(false);
				this._subComp = null;
			}
			else {
				this._subComp.destroy();
				this._subComp = null;
			}
		}
	};

	_pCellControl._getBindDataset = function () {
		return this._view ? (this._view._getBindDataSet ? this._view._getBindDataSet() : this._view._binddataset) : null;
	};

	_pCellControl._applyEditorDataset = function (async, prevalue) {
		if (!this._editor || !this._writable) {
			return;
		}

		var dataset = this._getBindDataset();
		if (dataset) {
			var datarow = this._getDataRow();
			var colid = this._refinfo.text._bindexpr;
			var value = this._editor._getValueData();
			var view = this._view;

			if (this._refinfo.text._bindtype == 1) {
				view._is_async_recreate = async;
				view._dsEventOccured = true;

				var fail = {
					status : ""
				};
				dataset.setColumn(datarow, colid, value, fail);

				if (fail.status == "cancolumnchange") {
					this._editor.set_value(prevalue);
				}
				view._is_async_recreate = false;
				view._dsEventOccured = false;
			}
		}
	};

	_pCellControl._getDataRow = function () {
		return this._rowidx;
	};

	_pCellControl._isFakeCell = function () {
		var datarow = this._getDataRow();
		var dataset = this._getBindDataset();
		var rowcount = (dataset) ? dataset.rowcount : 0;

		if (rowcount <= datarow || datarow < -2) {
			return true;
		}

		return false;
	};

	_pCellControl.on_change_containerRect = function (width, height) {
		this._updateAvailableArea();
	};

	_pCellControl.on_getIDCSSSelector = function () {
		if (this._isSubCell) {
			return "subcell";
		}

		return "cell";
	};

	_pCellControl._getClassCSSSelector = function () {
		var cssarr = nexacro.Component.prototype._getClassCSSSelector.call(this);

		if (this._rowidx >= 0 && this._rowidx % 2) {
			if (!cssarr) {
				cssarr = [];
			}

			cssarr.push("oddcell");
		}

		return cssarr;
	};

	_pCellControl._getElementClassCSSSelector = function () {
		var cssarr = this._getClassCSSSelector(this);

		if (cssarr) {
			cssarr.push("dummy");
			cssarr.push("dummy");
			cssarr.push("dummy");
		}

		return cssarr;
	};

	_pCellControl._apply_setfocus = function (evt_name, self_flag) {
		if (self_flag || nexacro._enableaccessibility) {
			nexacro.Component.prototype._apply_setfocus.call(this, evt_name);
		}
	};

	_pCellControl.on_apply_prop_tooltip = function () {
		var datarow = this._getDataRow();

		this.tooltiptext = this._refinfo._getTooltipText(datarow);
		this.tooltiptype = this._refinfo.tooltiptype;

		nexacro.Component.prototype.on_apply_prop_tooltip.call(this);
	};

	_pCellControl.on_fire_onsize = function (width, height) {
		if (width && height) {
			this._setDisplay(true);
		}

		var retn = nexacro.Component.prototype.on_fire_onsize.call(this, width, height);

		if (!width || !height) {
			this._setDisplay(false);
		}

		return retn;
	};

	_pCellControl._setDisplay = function (v) {
		if (this._control_element) {
			this._control_element.setElementDisplay((v) ? "" : "none");
		}
	};

	_pCellControl.on_apply_text = function () {
		var text_elem = this._text_elem;

		if (text_elem) {
			var cellinfo = this._refinfo;
			var datarow = this._getDataRow();
			var displaytype = cellinfo._getDisplayTypeValue(datarow);

			var strtext = nexacro._toString(this._displaytext);

			if (displaytype == "decoratetext") {
				text_elem.setElementDecorateText(strtext);
			}
			else {
				if (text_elem.decoration != "") {
					text_elem.decoration = "";
					text_elem.text = null;
				}

				if (!text_elem.text && strtext) {
					text_elem.setElementText(strtext);
					if (this._expandCtrl && this._expandCtrl._is_created) {
						this._control_element.bringToFrontElement(this._expandCtrl._control_element);
					}
				}
				else {
					text_elem.setElementText(strtext);
				}
			}
		}
	};

	_pCellControl.on_apply_wordWrap = function () {
		var text_elem = this._text_elem;

		if (text_elem) {
			var datarow = this._getDataRow();
			var wordwrap = this._refinfo._getWordwrap(datarow);
			text_elem.setElementWordWrap(wordwrap);
		}
	};

	_pCellControl.on_apply_textAlign = function (halign) {
		var text_elem = this._text_elem;

		if (text_elem) {
			text_elem.setElementTextAlign(halign);
		}

		if (this._subComp) {
			if (this._subComp._setAlign) {
				this._subComp._setAlign(halign, this.verticalAlign);
			}
			else {
				this._subComp.set_textAlign(halign);
			}
		}
	};

	_pCellControl.on_apply_verticalAlign = function (valign) {
		var text_elem = this._text_elem;

		if (text_elem) {
			text_elem.setElementVerticalAlign(valign);
		}

		if (this._subComp) {
			if (this._subComp._setAlign) {
				this._subComp._setAlign(this.textAlign, valign);
			}
			else {
				this._subComp.set_verticalAlign(valign);
			}
		}
	};

	_pCellControl._needToggle = function () {
		var datarow = this._getDataRow();
		var cellinfo = this._refinfo;
		var displaytype = cellinfo._getDisplaytype(datarow);
		var edittype = cellinfo._getEdittype(datarow);

		if (edittype != "checkbox") {
			return;
		}

		if (displaytype == "checkboxcontrol") {
			if (this._subComp) {
				this._subComp._toggleCheck();
			}
		}
		else {
			var view = this._view;
			var v = cellinfo._getValue(datarow);
			v = nexacro._toBoolean(v);
			v = (v) ? 0 : 1;

			if (cellinfo.text._bindtype == 1) {
				var dataset = this._getBindDataset();
				view._dsEventOccured = true;

				dataset.setColumn(datarow, cellinfo.text._bindexpr, v);

				if (nexacro._enableaccessibility) {
					this._setAccessibilityStatChecked(nexacro._toBoolean(v));
				}

				view._dsEventOccured = false;
			}
		}
	};

	_pCellControl.on_apply_checkboxAlign = function (halign, valign) {
		var controlSizeW = this._subComp._adjust_width;
		var controlSizeH = this._subComp._adjust_height;
		var clientrect = this._getAvailableRect();
		var x = clientrect.left, y = clientrect.top;
		var w = clientrect.width, h = clientrect.height;

		switch (halign) {
			case "left":
				break;
			case "right":
				x += (w - controlSizeW);
				break;
			default:
				x += ((w - controlSizeW) / 2);
				break;
		}
		switch (valign) {
			case "top":
				break;
			case "bottom":
				y += (h - controlSizeH);
				break;
			default:
				y += ((h - controlSizeH) / 2);
				break;
		}
		this._subComp.move(x, y, this._subComp._adjust_width, this._subComp._adjust_height);
	};

	_pCellControl.on_apply_textDecoration = function (textDecoration) {
		var cellinfo = this._refinfo;

		if (!textDecoration && cellinfo.textDecoration) {
			if (this.textDecoration != cellinfo.textDecoration) {
				this.textDecoration = cellinfo.textDecoration;
				textDecoration = nexacro.TextDecorationObject(this.textDecoration);
				this._textdecoration = textDecoration;
			}
			else {
				textDecoration = this._textdecoration;
			}
		}

		if (this._text_elem) {
			this._text_elem.setElementTextDecoration(textDecoration);
		}
		else if (this._subComp) {
			this._subComp.set_textDecoration(this.textDecoration);
		}
	};

	_pCellControl._hideInnerElement = function () {
		var subcells = this.subcells;

		for (var i = 0, n = subcells.length; i < n; i++) {
			subcells[i].set_visible(false);
		}

		if (this._subComp) {
			this._subComp.set_visible(false);
		}
		else if (this._text_elem) {
			this._text_elem.setElementVisible(false);
		}

		this._hideInner = true;
		this.__showExpand(false);

		if (this._curDisplayType == "treeitemcontrol") {
			this._subComp._treeline_visible(false);
		}
	};

	_pCellControl._isShowEditor = function () {
		if (this._editor) {
			return this._editor.visible;
		}

		return false;
	};

	_pCellControl._isEnterDownable = function () {
		var cellinfo = this._refinfo;
		var datarow = this._getDataRow();
		var edittype = cellinfo._getEdittype(datarow);

		if (this._curDisplayType == "checkboxcontrol" && edittype == "checkbox") {
			return true;
		}
		else if (edittype == "button") {
			return false;
		}
		else if (this._isShowEditor()) {
			return true;
		}

		return false;
	};

	_pCellControl._showInnerElement = function () {
		var subcells = this.subcells;

		for (var i = 0, n = subcells.length; i < n; i++) {
			subcells[i].set_visible(true);
		}

		if (this._isShowEditor() == false) {
			if (this._subComp) {
				this._subComp.set_visible(true);
			}
			else if (this._text_elem) {
				this._text_elem.setElementVisible(true);
			}
		}
		this._hideInner = false;
		this.__showExpand(true);

		if (this._curDisplayType == "treeitemcontrol") {
			this._subComp._treeline_visible(true);
		}
	};

	_pCellControl.__showExpand = function (flag) {
		if (!this._expandCtrl) {
			return;
		}

		if (this._fakecell) {
			this._expandCtrl.set_visible(false);
			return;
		}

		var cellinfo = this._refinfo;
		var datarow = this._getDataRow();
		var expandshow = cellinfo._getAttrValue(cellinfo.expandshow, datarow);

		if (expandshow == "show") {
			if (flag == false) {
				this._expandCtrl.set_visible(this.selected);
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

	_pCellControl._createDisplayer = function (displayType) {
		var view = this._view;
		var cellinfo = this._refinfo;

		switch (displayType) {
			case "buttoncontrol":
				this._createButtonDisplayer();
				break;
			case "checkboxcontrol":
				this._createCheckboxDisplayer();
				break;
			case "imagecontrol":
				this._createImageDisplayer();
				break;
			case "treeitemcontrol":
				this._createTreeDisplayer();
				if (view) {
					view._treeCellinfo = cellinfo;
				}
				break;
			case "combocontrol":
				this._createComboDisplayer();
				break;
			case "calendarcontrol":
				this._createCalendarDisplayer();
				break;
			case "maskeditcontrol":
				this._createMaskEditDisplayer();
				break;
			case "textareacontrol":
				this._createTextAreaDisplayer();
				break;
			case "progressbarcontrol":
				this._createBarDisplayer();
				break;
			case "editcontrol":
				this._createEditDisplayer();
				break;
			default:
				this._createTextDisplayer();
				break;
		}

		if (this._subComp) {
			this._subComp.on_changeUserStatus = function (changestatus, value, applyuserstatus, currentstatus, currentuserstatus) {
				if (this._displaymode) {
					if (changestatus == "nulltext" && value) {
						return changestatus;
					}
					else {
						return applyuserstatus;
					}
				}
				return applyuserstatus;
			};
		}

		this._curDisplayType = displayType;
		this.on_apply_textAlign(cellinfo.textAlign);
		this.on_apply_verticalAlign(cellinfo.verticalAlign);
	};

	_pCellControl._isChangeDisplayer = function (displayType) {
		var view = this._view;
		var cur_disptype = this._curDisplayType;

		if ((displayType != cur_disptype) || (view && view._changeDisplayer)) {
			return true;
		}

		return false;
	};

	_pCellControl._updateDisplayer = function () {
		var show = true;
		var view = this._view;
		var cellinfo = this._refinfo;
		var datarow = this._getDataRow();
		var displayType = cellinfo._getDisplayTypeValue(datarow);
		if (displayType === undefined) {
			displayType = "normal";
		}
		if (cellinfo.displaytype._bindtype > 0 && displayType === "treeitemcontrol") {
			if (!view._hasTree && view._setTreeCellinfo) {
				view._setTreeCellinfo(cellinfo, (this.id == "tempcell"));
				view._useexprtree = true;
			}
		}
		var expandshow = cellinfo._getAttrValue(cellinfo.expandshow, datarow);
		var expandsize = cellinfo._getAttrValue(cellinfo.expandsize, datarow);
		if (expandsize !== 0 && !expandsize) {
			expandsize = 16;
		}

		if (expandshow == "show") {
			if (!this._expandCtrl) {
				this._createExpandDisplayer();
			}
			else {
				if (this._expand_width != expandsize) {
					this._expandCtrl.destroy();
					this._expandCtrl = null;
					this._createExpandDisplayer();
				}
			}
			this._changeClientmode("expand");
		}
		else {
			if (this._expandCtrl) {
				this._expand_width = 0;
				this._expandCtrl.destroy();
				this._expandCtrl = null;

				this._changeClientmode("text");
			}
		}

		if (this._isChangeDisplayer(displayType)) {
			if (this._curDisplayType != "") {
				this._destroyDisplayer(view ? view._lbuttondown_proc : null);
			}

			this._createDisplayer(displayType);

			if (view._lbuttondown_proc) {
				var window = this._getWindow();

				if (window._cur_ldown_elem && window._cur_ldown_elem.parent == null && this.parent != null) {
					window._cur_ldown_elem = this;
				}
			}

			var def_align = cellinfo._getDefaultTextAlign(displayType, datarow);
			var textelem = this._text_elem;

			if (textelem) {
				textelem.setElementTextAlignByClassCSSSelector(def_align);
			}

			if (this._is_created && this._subComp && !this._subComp._is_created) {
				this._subComp.on_created();
			}

			this._updateEditor();
		}
		else {
			this.on_apply_wordWrap();
		}

		var fake = this._isFakeCell();

		if (fake && view) {
			if (view.fillareatype == "datarow") {
				if (!this._isDisplayDataType(displayType)) {
					if (displayType != "date") {
						show = false;
						if (fake != this._fakecell || view._resetfillarea) {
							this._hideInnerElement();
							this._fakecell = fake;
						}
					}
				}
			}
			else if (view.fillareatype == "linerow") {
				show = false;
				if (fake != this._fakecell || view._resetfillarea) {
					this._hideInnerElement();
					this._fakecell = fake;
				}
			}
			else if (view.fillareatype == "controlrow") {
				if (this._isDisplayDataType(displayType)) {
					show = false;
					if (fake != this._fakecell || view._resetfillarea) {
						this._hideInnerElement();
						this._fakecell = fake;
					}
				}
			}
		}
		else {
			if (fake != this._fakecell) {
				this._showInnerElement();
				this._fakecell = fake;
			}
		}
		return show;
	};

	_pCellControl._isUpdateArea = function () {
		return true;
	};

	_pCellControl.set_select = function (v, no_apply) {
		if (this.selected != v) {
			this.selected = v;

			if (!no_apply) {
				this.on_apply_select(v);
			}
		}
	};

	_pCellControl.on_apply_select = function (select) {
		this._updateAll();
	};


	_pCellControl._isSelectedColor = function () {
		var useselcolor = this._view ? this._view.useselcolor : false;
		return (this.selected && ((useselcolor == undefined) ? true : useselcolor));
	};

	_pCellControl._getRemoveLine = function () {
		var remove_l, remove_t, remove_r, remove_b;

		if (this._isSubCell) {
			remove_l = true;
			remove_t = true;
			remove_r = true;
			remove_b = true;
		}
		else {
			remove_l = true;
			remove_t = true;
			remove_r = false;
			remove_b = false;
		}

		return [remove_l, remove_t, remove_r, remove_b];
	};

	_pCellControl.__update = function (status, onlycontents, nochk_updatearea) {
		if (!this._is_alive) {
			return false;
		}

		var cellinfo = this._refinfo;

		if (!cellinfo._property_map) {
			return false;
		}

		var view = this._view;
		var evenodd_change = false;

		if (this.parent._rowidx >= 0) {
			if (this._rowidx != this.parent._rowidx) {
				var oldrowidx = this._rowidx;
				this._rowidx = this.parent._rowidx;
				if ((this._rowidx % 2) != (oldrowidx % 2)) {
					evenodd_change = true;
				}

				this._updateEditor();
			}
		}

		var datarow = this._getDataRow();

		var cssname = cellinfo._getAttrValue(cellinfo.cssclass, datarow);

		if (this.cssclass != cssname) {
			this.set_cssclass(cssname);
		}
		else {
			if (evenodd_change) {
				this.on_apply_cssclass();
			}
		}

		cellinfo._setCellControlProperty(this, datarow);

		var control_elem = this._control_element;
		if (control_elem) {
			if (!nochk_updatearea && this._isUpdateArea() == false) {
				return false;
			}

			var readonly = view ? !!view.readonly : false;

			if (this._is_use_auto_selected_status) {
				this._changeUserStatus("selected", this._isSelectedColor());
			}

			if (cellinfo._blinked_status[datarow]) {
				this._changeUserStatus("blinked", true);
			}
			else {
				this._changeUserStatus("blinked", false);
			}

			this._changeStatus("readonly", readonly);

			this._disp_show = this._updateDisplayer();

			if (!onlycontents && status) {
				this._changeStatus(status, true);
			}

			this._displaytext = this._getDisplayText();
			this.on_apply_text();
			this.on_apply_textDecoration();

			var subComp = this._subComp;
			if (subComp) {
				subComp._updateAll(true, readonly);
			}

			if (this._expandCtrl) {
				this._expandCtrl._updateAll(true, readonly);
			}

			this.on_apply_prop_tooltip();

			if (nexacro._enableaccessibility) {
				this.on_apply_accessibility();
			}
		}
		return true;
	};

	_pCellControl._updateAll = function (status, onlycontents, nochk_updatearea) {
		if (this.__update(status, onlycontents, nochk_updatearea)) {
			var control_elem = this._control_element;
			if (control_elem) {
				var remove_line = this._getRemoveLine();
				var remove_l, remove_t, remove_r, remove_b;

				remove_l = remove_line[0];
				remove_t = remove_line[1];
				remove_r = remove_line[2];
				remove_b = remove_line[3];

				if (this.subcells.length > 0) {
					for (var i = 0, n = this.subcells.length; i < n; i++) {
						this.subcells[i]._updateAll();
					}
				}
				else {
					if (this._disp_show && this._hideInner) {
						this._showInnerElement();
					}
				}

				if (!onlycontents) {
					this._control_element.setElementBorderNone(remove_l, remove_t, remove_r, remove_b);
				}

				if (control_elem._mode == "text") {
					this._changeClientmode("text");
				}
			}
		}
	};

	_pCellControl.on_apply_border = function (border) {
		nexacro.Component.prototype.on_apply_border.call(this, border);
		var control_elem = this._control_element;

		if (control_elem) {
			control_elem._refreshBorderNone();
		}
	};

	_pCellControl._updateAllEx = function (prop) {
		if (!this._is_alive) {
			return false;
		}

		var cellinfo = this._refinfo;
		var view = this._view;
		var evenodd_change = false;

		if (this.parent._rowidx >= 0) {
			if (this._rowidx != this.parent._rowidx) {
				var oldrowidx = this._rowidx;
				this._rowidx = this.parent._rowidx;
				if ((this._rowidx % 2) != (oldrowidx % 2)) {
					evenodd_change = true;
				}
			}
		}

		var datarow = this._getDataRow();

		var cssname = cellinfo._getAttrValue(cellinfo.cssclass, datarow);

		if (this.cssclass != cssname) {
			this.set_cssclass(cssname);
		}
		else {
			if (evenodd_change) {
				this.on_apply_cssclass();
			}
		}

		cellinfo._setCellControlPropertyForAutosize(this, datarow, prop);

		var control_elem = this._control_element;
		if (control_elem) {
			var readonly = view ? !!view.readonly : false;

			if (this._is_use_auto_selected_status) {
				this._changeUserStatus("selected", this._isSelectedColor());
			}

			this._changeStatus("readonly", readonly);
			this._disp_show = this._updateDisplayer();

			this._displaytext = this._getDisplayText();
			this.on_apply_text();
			this.on_apply_textDecoration();

			var subComp = this._subComp;
			if (subComp) {
				subComp._updateAll(true, readonly);
			}

			if (this._expandCtrl) {
				this._expandCtrl._updateAll(true, readonly);
			}

			var remove_line = this._getRemoveLine();
			var remove_l, remove_t, remove_r, remove_b;

			remove_l = remove_line[0];
			remove_t = remove_line[1];
			remove_r = remove_line[2];
			remove_b = remove_line[3];



			this._control_element.setElementBorderNone(remove_l, remove_t, remove_r, remove_b);
		}
		return true;
	};

	_pCellControl.on_apply_accessibility = function () {
		nexacro.Component.prototype.on_apply_accessibility.call(this);

		if (this._subComp) {
			this._subComp.on_apply_accessibility();
		}
	};

	_pCellControl.on_apply_prop_cssclass = function () {
		if (this._editor) {
			this._editor.on_apply_cssclass();
		}

		if (this._subComp) {
			this._subComp.on_apply_cssclass();
		}

		if (this._expandCtrl) {
			this._expandCtrl.on_apply_cssclass();
		}
	};

	_pCellControl.on_apply_cursor = function (cursor) {
		nexacro.Component.prototype.on_apply_cursor.call(this, cursor);

		if (this._subComp) {
			this._subComp.set_cursor(cursor);
		}
	};

	_pCellControl._getAvailableRect = function () {
		var rect = {
			left : 0, 
			top : 0, 
			right : 0, 
			bottom : 0, 
			width : 0, 
			height : 0
		};
		rect.left = this._getClientLeft();
		rect.top = this._getClientTop();
		rect.right = this._getClientLeft() + this._getClientWidth();
		rect.bottom = this._getClientTop() + this._getClientHeight();
		rect.width = this._getClientWidth();
		rect.height = this._getClientHeight();

		var expand_ctrl = this._expandCtrl;

		if (expand_ctrl && expand_ctrl.visible) {
			rect.width -= expand_ctrl.width;
			rect.right -= expand_ctrl.width;
		}

		return rect;
	};

	_pCellControl._changeClientmode = function (mode) {
		var control_elem = this._control_element;
		if (control_elem) {
			var padding = this._getCurrentStylePadding();

			if (this._refinfo._subcells.length) {
				mode = "normal";
			}
			else if (mode == "expand") {
				if (this._client_mode != "normal") {
					mode = "expandtext";
				}
				else {
					mode = "normal";
				}
			}
			else if (mode == "text") {
				if (this._expandCtrl) {
					mode = "expandtext";
				}
				else {
					if (padding) {
						mode = (padding.right > 0 || padding.bottom > 0) ? "expandtext" : "text";
					}
				}
			}

			if (mode == "text" || mode == "expandtext") {
				if (!this._text_elem) {
					this._text_elem = new nexacro.TextBoxElement(control_elem, "text");
				}
			}
			else {
				if (this._text_elem) {
					this._text_elem.destroy();
					this._text_elem = null;
				}
			}

			this._updateAvailableArea(true);
			this._client_mode = mode;
		}
	};

	_pCellControl._createExpandDisplayer = function () {
		var control_elem = this._control_element;
		if (control_elem) {
			var cellinfo = this._refinfo;
			var datarow = this._getDataRow();
			var border = this._getCurrentStyleBorder();
			var padding = this._getCurrentStylePadding();

			this._expand_width = cellinfo._getAttrValue(cellinfo.expandsize, datarow);

			var l = this._adjust_width - this._expand_width - ((border) ? border.right._width : 0) - ((padding) ? padding.right : 0);
			var t = this._getClientTop();
			var r = l + this._expand_width;
			var b = t + this._getClientHeight();

			if (l < 0) {
				l = this._getClientLeft();
				r = l + this._getClientWidth();
			}

			var expCtrl = this._expandCtrl = new nexacro[this._cellExpandObj](this, l, t, r, b);
			expCtrl.createComponent();
		}
	};

	_pCellControl._createTextDisplayer = function () {
		var control_elem = this._control_element;
		if (control_elem) {
			this._changeClientmode("text");

			var text_elem = this._text_elem;
			if (text_elem) {
				if (!this._is_created) {
					this._displaytext = this._getDisplayText();
					this.on_apply_text();
				}
				else {
					text_elem.create(this._getWindow());
				}
				this.on_apply_textDecoration();
				this.on_apply_wordWrap();
			}
		}
	};

	_pCellControl._createButtonDisplayer = function () {
		var control_elem = this._control_element;
		if (control_elem) {
			var rect = this._getControlRect();
			this._changeClientmode("normal");
			var controlComp = new nexacro[this._cellButtonObj]("cellbutton", rect.left, rect.top, rect.width, rect.height, this, true);
			controlComp.createComponent(true);
			var datarow = this._getDataRow();
			var wordwrap = this._refinfo._getWordwrap(datarow);
			controlComp.set_wordWrap(wordwrap);

			this._subComp = controlComp;
		}
	};

	_pCellControl._createCheckboxDisplayer = function () {
		var control_elem = this._control_element;
		if (control_elem) {
			this._changeClientmode("normal");
			var controlComp = new nexacro[this._cellCheckBoxObj]("cellcheckbox", 0, 0, 0, 0, this, true);
			controlComp.createComponent(true);
			controlComp._skip_mobile_tabfocus = true;
			this._subComp = controlComp;
		}
	};

	_pCellControl._createImageDisplayer = function () {
		var control_elem = this._control_element;
		if (control_elem) {
			var rect = this._getControlRect();
			this._changeClientmode("normal");
			var controlComp = new nexacro[this._cellImageObj]("cellimage", rect.left, rect.top, rect.width, rect.height, this);
			controlComp.createComponent(true);

			this._subComp = controlComp;
		}
	};

	_pCellControl._createComboDisplayer = function () {
		var control_elem = this._control_element;
		if (control_elem) {
			var rect = this._getControlRect();
			this._changeClientmode("normal");
			var controlComp = new nexacro[this._cellComboObj]("cellcombo", rect.left, rect.top, rect.width, rect.height, this, true);
			controlComp.createComponent(true);
			controlComp.comboedit._input_element._isUseDelCaret = true;

			this._subComp = controlComp;
		}
	};

	_pCellControl._createCalendarDisplayer = function () {
		var control_elem = this._control_element;
		if (control_elem) {
			var rect = this._getControlRect();
			this._changeClientmode("normal");
			var controlComp = this._subComp = new nexacro[this._cellCalendarObj]("cellcalendar", rect.left, rect.top, rect.width, rect.height, this, true);
			controlComp.createComponent(true);
			controlComp.calendaredit._input_element._isUseDelCaret = true;

			this._subComp = controlComp;
		}
	};

	_pCellControl._createEditDisplayer = function () {
		var control_elem = this._control_element;
		if (control_elem) {
			var rect = this._getControlRect();
			this._changeClientmode("normal");
			var controlComp = this._subComp = new nexacro[this._cellEditObj]("celledit", rect.left, rect.top, rect.width, rect.height, this, true);
			controlComp.createComponent(true);
			controlComp._input_element._isUseDelCaret = true;

			this._subComp = controlComp;
		}
	};

	_pCellControl._createMaskEditDisplayer = function () {
		var control_elem = this._control_element;
		if (control_elem) {
			var rect = this._getControlRect();
			this._changeClientmode("normal");
			var controlComp = this._subComp = new nexacro[this._cellMaskEditObj]("cellmaskedit", rect.left, rect.top, rect.width, rect.height, this, true, true);
			controlComp.createComponent(true);
			controlComp._input_element._isUseDelCaret = true;

			this._subComp = controlComp;
		}
	};


	_pCellControl._createTextAreaDisplayer = function () {
		var control_elem = this._control_element;
		if (control_elem) {
			var rect = this._getControlRect();
			this._changeClientmode("normal");
			var controlComp = this._subComp = new nexacro[this._cellTextAreaObj]("celltextarea", rect.left, rect.top, rect.width, rect.height, this, true);
			controlComp.createComponent(true);
			controlComp._input_element._isUseDelCaret = true;
			var datarow = this._getDataRow();
			var wordwrap = this._refinfo._getWordwrap(datarow);
			controlComp.set_wordWrap(wordwrap);

			this._subComp = controlComp;
		}
	};

	_pCellControl._createBarDisplayer = function () {
		var control_elem = this._control_element;
		if (control_elem) {
			var rect = this._getControlRect();
			this._changeClientmode("normal");
			var controlComp = this._subComp = new nexacro[this._cellProgressBarObj]("cellprogressbar", rect.left, rect.top, rect.width, rect.height, this, true);
			controlComp.createComponent(true);

			this._subComp = controlComp;
		}
	};

	_pCellControl._createTreeDisplayer = function (doc, target) {
		var control_elem = this._control_element;
		if (control_elem) {
			var rect = this._getControlRect();
			var left = rect.left;
			var top = rect.top;
			var width = rect.width;
			var height = rect.height;

			this._changeClientmode("normal");
			var controlComp = this._subComp = new nexacro[this._cellTreeObj]("celltreeitem", left, top, width, height, null, null, this);
			controlComp.createComponent(true);
			this._subComp = controlComp;
		}
	};

	_pCellControl._updateAvailableArea = function (force) {
		var rc = this._getAvailableRect();
		var subcomp = this._subComp;

		var l = rc.left;
		var t = rc.top;
		var w = rc.width;
		var h = rc.height;

		if (!force) {
			if (this._avail_left == l && this._avail_top == t && this._avail_width == w && this._avail_height == h) {
				return false;
			}
		}

		if (subcomp) {
			if (this._curDisplayType == "checkboxcontrol") {
				this.on_apply_checkboxAlign("center", "middle");
			}
			else {
				var ctrlrc = this._getControlRect();
				subcomp.move(ctrlrc.left, ctrlrc.top, ctrlrc.width, ctrlrc.height);
			}
		}

		if (this._text_elem) {
			this._text_elem.setElementPosition(l, t);
			this._text_elem.setElementSize(w, h);
		}

		if (this._editor && this._isConditionEditor()) {
			this._editor.move(l, t, w, h);
		}

		var expand_ctrl = this._expandCtrl;

		if (expand_ctrl) {
			var left = this._getClientWidth() + this._getClientLeft() - this._expand_width;
			var top = rc.top;
			var width = this._expand_width;
			var height = rc.height;

			if (left < 0) {
				left = rc.left;
				width = this._getClientWidth();
			}

			expand_ctrl.move(left, top, width, height);
		}

		this._avail_left = rc.left;
		this._avail_top = rc.top;
		this._avail_width = rc.width;
		this._avail_height = rc.height;

		return true;
	};

	_pCellControl._isEnable = function () {
		if (this._view && this._view._enable !== undefined) {
			return this._view._enable;
		}

		if (this.parent && this.parent._isEnable) {
			return this.parent._isEnable();
		}

		return true;
	};

	_pCellControl._getDisplayText = function () {
		if (this._refinfo) {
			var datarow = this._getDataRow();
			return this._refinfo._getDisplayText(datarow);
		}
		return "";
	};

	_pCellControl._isDisplayDataType = function (displayType) {
		if (displayType == "number" || displayType == "exponent" || displayType == "currency" || 
			displayType == "normal" || displayType == "text" || displayType == "decoratetext" || displayType == "mask" || displayType == "combotext" || displayType == "date") {
			return true;
		}

		return false;
	};

	_pCellControl._updateEditor = function () {
		var text_elem = this._text_elem;
		var editComp = this._editor;

		if (editComp) {
			if (this._isConditionEditor()) {
				if (text_elem) {
					text_elem.setElementVisible(false);
				}
				if (this._subComp) {
					this._subComp.set_visible(false);
				}

				var rect = this._getControlRect();
				editComp.move(rect.left, rect.top, rect.width, rect.height);
			}
			else {
				if (text_elem) {
					text_elem.setElementVisible(true);
				}
				if (this._subComp) {
					this._subComp.set_visible(true);
				}

				editComp.move(-10, -10, 0, 0);
			}
		}
	};

	_pCellControl._isConditionEditor = function () {
		return true;
	};

	_pCellControl._getAutoEnter = function () {
		return this._view.autoenter;
	};
	_pCellControl._getAutoUpdateType = function () {
		return this._view.autoupdatetype;
	};

	_pCellControl._showEditor = function () {
		if (this._isShowEditor()) {
			return;
		}

		var text_elem = this._text_elem;
		var editComp;
		var view = this._view;

		if (text_elem) {
			text_elem.setElementVisible(false);
		}
		if (this._subComp) {
			this._subComp._changeStatus("mouseover", false);

			if (nexacro._isTouchInteraction) {
				nexacro._OnceCallbackTimer.callonce(this, function () {
					this._subComp.set_visible(false);
				});
			}
			else {
				this._subComp.set_visible(false);
			}
		}
		editComp = this._createEditor();
		editComp._EditUpdateAll();
		editComp.set_visible(true);

		editComp._setFocus(false);
		if (editComp.setCaretPos && !editComp.autoselect) {
			editComp.setCaretPos(0);
		}
		else if (editComp.comboedit && editComp.comboedit.setCaretPos) {
			editComp.comboedit.setCaretPos(0);
		}

		if (nexacro._isTouchInteraction || (view && view.selectchangetype == "up")) {
			editComp._setFocus(false);
		}

		if (view && view.autoenter == "select" && view._lbuttondown_proc) {
			editComp._user_push = true;
			editComp._changeStatus("focused", true);
			editComp._is_pushed_area = true;
			editComp._is_push = true;
		}
		else {
			editComp._changeStatus("focused", true);
		}
		this._editor = editComp;
	};

	_pCellControl._hideEditor = function () {
		var text = this._text_elem;

		if (!this._hideInner) {
			if (text) {
				text.setElementVisible(true);
			}

			if (this._subComp) {
				this._subComp.set_visible(true);
			}
		}

		var value;
		if (this._editor) {
			value = this._editor._getValueData();
			this._destroyEditor();
		}
		return value;
	};

	_pCellControl._hasEditor = function () {
		return this._refinfo._hasEditor(this._getDataRow());
	};

	_pCellControl._destroyEditor = function () {
		var bPreventFocus = false;
		var win = this._getWindow();
		if (win) {
			bPreventFocus = !(win._indexOfCurrentFocusPaths(this) > -1);
		}

		if (this._editor) {
			if (this._tempdestroyeditor) {
				if (!this._tempdestroyeditor_list) {
					this._tempdestroyeditor_list = [];
				}

				this._tempdestroyeditor_list.push(this._tempdestroyeditor);

				nexacro._OnceCallbackTimer.callonce(this, function () {
					var tempeditor = this._tempdestroyeditor_list.pop();
					tempeditor.destroy();
				});
			}

			var editComp = this._tempdestroyeditor = this._editor;
			editComp.set_visible(false);
			if (nexacro._Browser == "IE" || (nexacro._Browser == "Edge" && nexacro._BrowserType == "Edge")) {
				var control_elem = editComp.getElement();
				if (control_elem) {
					control_elem.setElementDisplay("none");
				}
			}

			if (nexacro._Browser == "Safari") {
				nexacro._OnceCallbackTimer.callonce(editComp, function () {
					editComp.set_visible(false);
				});
			}
			else {
				if (this._control_element && !bPreventFocus) {
					this._control_element.setElementFocus();
				}
			}

			this._editor = null;
		}
		else if (this._tempdestroyeditor && nexacro._Browser == "Runtime" && nexacro._OS == "Windows") {
			var editComp = this._tempdestroyeditor;
			editComp.set_visible(false);

			this._tempdestroyeditor.destroy();
			this._tempdestroyeditor = null;
		}
	};

	_pCellControl._getFormatSize = function () {
		return null;
	};

	_pCellControl._getControlRect = function () {
		var rect = this._getAvailableRect();
		var fomatsize = this._getFormatSize();
		var cellinfo = this._refinfo;
		var controlautosizingtype = cellinfo._getAttrValue(cellinfo.controlautosizingtype, this._getDataRow());

		if (fomatsize != null) {
			var left = rect.left, top = rect.top;
			var width, height, right, bottom;

			var border = this._getCurrentStyleBorder();
			var padding = this._getCurrentStylePadding();
			var fixwidth = fomatsize[0] - (border ? border.left._width + border.right._width : 0) - (padding ? padding.left + padding.right : 0);
			var fixheight = fomatsize[1] - (border ? border.top._width + border.bottom._width : 0) - (padding ? padding.top + padding.bottom : 0);

			if (controlautosizingtype == "none") {
				width = fixwidth;

				if (width < rect.width) {
					left += (rect.width - width) / 2;
				}

				right = left + width;

				height = fixheight;

				if (height < rect.height) {
					top += (rect.height - height) / 2;
				}

				bottom = top + height;

				rect.left = left;
				rect.top = top;
				rect.width = width;
				rect.height = height;
				rect.right = right;
				rect.bottom = bottom;
			}
			else if (controlautosizingtype == "width") {
				height = fixheight;

				if (height < rect.height) {
					top += (rect.height - height) / 2;
				}

				bottom = top + height;

				rect.top = top;
				rect.height = height;
				rect.bottom = bottom;
			}
			else if (controlautosizingtype == "height") {
				width = fixwidth;

				if (width < rect.width) {
					left += (rect.width - width) / 2;
				}

				right = left + width;

				rect.left = left;
				rect.width = width;
				rect.right = right;
			}
		}

		return rect;
	};

	_pCellControl._createidx = 0;
	_pCellControl._createEditor = function () {
		var cellinfo = this._refinfo;
		var datarow = this._getDataRow();
		var editType = cellinfo._getEdittype(datarow);

		var creator = this["_createEditor_" + editType];

		if (creator == null) {
			creator = this._createEditor_text;
		}

		this._destroyEditor();

		this._editor = creator.call(this);
		this._editor._update_datarow = this._getDataRow();

		this._createidx++;

		return this._editor;
	};

	_pCellControl._createEditor_text = function () {
		var datarow = this._getDataRow();
		var rect = this._getControlRect();
		var cellinfo = this._refinfo;
		var cEdit = new nexacro[this._cellEditObj]("celledit" + this._createidx, rect.left, rect.top, rect.width, rect.height, this);
		var v = cellinfo._getValue(datarow);
		var editmaxlength = cellinfo._getAttrValue(cellinfo.editmaxlength, datarow);
		var dataset = this._getBindDataset();

		if (editmaxlength == 0) {
			editmaxlength = dataset ? dataset._getColumnSize(cellinfo.text._bindtype == 1 ? cellinfo.text._bindexpr : 0) : 0;
		}

		cEdit.set_maxlength(editmaxlength);
		cEdit.set_value(v);

		cEdit.createComponent();

		this._writable = true;

		return cEdit;
	};

	_pCellControl._createEditor_mask = function () {
		var rect = this._getControlRect();
		var cellinfo = this._refinfo;
		var cMaskEdit = new nexacro[this._cellMaskEditObj]("cellmaskedit" + this._createidx, rect.left, rect.top, rect.width, rect.height, this);
		var datarow = this._getDataRow();
		var value = cellinfo._getValue(datarow);
		var locale = cellinfo._getLocale(datarow);
		var mask = cellinfo._getAttrValue(cellinfo.maskeditformat, datarow);
		var type = cellinfo._getAttrValue(cellinfo.maskedittype, datarow);

		cMaskEdit.set_type(type);
		if (mask) {
			cMaskEdit.set_format(mask);
		}

		cMaskEdit.set_locale(locale);
		cMaskEdit.set_value(value);

		cMaskEdit.createComponent();

		this._writable = true;

		return cMaskEdit;
	};

	_pCellControl._createEditor_combo = function () {
		var rect = this._getControlRect();
		var cCombo = new nexacro[this._cellComboObj]("cellcombo" + this._createidx, rect.left, rect.top, rect.width, rect.height, this);
		cCombo.createComponent();
		cCombo._child_editor = cCombo.comboedit;

		this._writable = true;

		return cCombo;
	};

	_pCellControl._createEditor_date = function () {
		var datarow = this._getDataRow();
		var rect = this._getControlRect();
		var cellinfo = this._refinfo;
		var cCalendar = new nexacro[this._cellCalendarObj]("cellcalendar" + this._createidx, rect.left, rect.top, rect.width, rect.height, this);
		var v = cellinfo._getValue(datarow);
		var calendarpopuptype = cellinfo._getAttrValue(cellinfo.calendarpopuptype, datarow);
		var calendardateformat = cellinfo._getAttrValue(cellinfo.calendardateformat, datarow);
		var calendareditformat = cellinfo._getAttrValue(cellinfo.calendareditformat, datarow);
		var locale = cellinfo._getLocale(datarow);

		if (this._displaymode == true && !v) {
			v = cellinfo._getDisplayText(datarow);
		}

		cCalendar.createComponent();
		cCalendar._child_editor = cCalendar.calendaredit;
		cCalendar._is_value_changed = false;

		if (!calendardateformat) {
			calendardateformat = nexacro.Calendar.prototype.dateformat;
		}
		if (!calendareditformat) {
			calendareditformat = nexacro.Calendar.prototype.editformat;
		}
		cCalendar.set_popuptype(calendarpopuptype);
		cCalendar.set_dateformat(calendardateformat);
		cCalendar.set_editformat(calendareditformat);
		cCalendar.set_locale(locale);
		cCalendar.set_value(v);

		cCalendar._recalcLayout();

		this._writable = true;

		return cCalendar;
	};

	_pCellControl._createEditor_textarea = function (readonly) {
		var datarow = this._getDataRow();
		var rect = this._getControlRect();
		var cellinfo = this._refinfo;
		var cTextArea = new nexacro[this._cellTextAreaObj]("celltextarea" + this._createidx, rect.left, rect.top, rect.width, rect.height, this);
		var v;

		if (cTextArea._displaymode == true || readonly) {
			v = cellinfo._getDisplayText(datarow);
		}
		else {
			v = cellinfo._getValue(datarow);
		}

		var wordwrap = cellinfo._getWordwrap(datarow);
		var textareamaxlength = cellinfo._getAttrValue(cellinfo.textareamaxlength, datarow);
		var dataset = this._getBindDataset();
		var textareabartype = cellinfo._getAttrValue(cellinfo.textareascrollbartype, datarow);
		var textareascrolltype = cellinfo._getAttrValue(cellinfo.textareascrolltype, datarow);

		if (textareamaxlength == 0) {
			textareamaxlength = dataset ? dataset._getColumnSize(cellinfo._col) : 0;
		}

		cTextArea.set_maxlength(textareamaxlength);
		cTextArea.set_wordWrap(wordwrap);
		cTextArea.set_value(v);
		cTextArea.set_scrollbartype(textareabartype);
		cTextArea.set_scrolltype(textareascrolltype);

		cTextArea.createComponent();

		if (readonly) {
			cTextArea.set_readonly(true);
		}

		this._writable = !readonly;

		return cTextArea;
	};

	_pCellControl._createEditor_readonly = function () {
		return this._createEditor_textarea(true);
	};

	_pCellControl._createEditor_button = function () {
		var rect = this._getControlRect();
		var cButton = new nexacro[this._cellButtonObj]("cellbutton" + this._createidx, rect.left, rect.top, rect.width, rect.height, this);
		cButton.createComponent();

		if (nexacro._Browser == "IE" || (nexacro._Browser == "Edge" && nexacro._BrowserType == "Edge")) {
			if (!nexacro._enableaccessibility) {
				nexacro._OnceCallbackTimer.callonce(this, function () {
					cButton._control_element.setElementFocus();
				}, 0);
			}
		}

		this._writable = false;

		return cButton;
	};
	_pCellControl._setSubControlFocus = function (bfocus) {
		var cellobj = this;
		var subcomp = this._subComp;
		var view = this._view;
		if (cellobj._refinfo._getEdittype(cellobj._getDataRow()) == "checkbox" && (subcomp && subcomp._is_alive)) {
			if (bfocus) {
				if (nexacro._isTouchInteraction || (view.selectchangetype && view.selectchangetype == "up")) {
					subcomp._apply_setfocus("touch");
				}

				subcomp._changeStatus("focused", true);
				if (nexacro._enableaccessibility) {
					subcomp._setFocus(false);
				}

				if (view) {
					view._FocuedCell = cellobj;
				}
			}
			else {
				subcomp._changeStatus("focused", false);

				if (view) {
					view._FocuedCell = null;
				}
			}
		}
	};

	_pCellControl._getAccessibilityLabel = function (is_no_make) {
		var label = nexacro.Component.prototype._getAccessibilityLabel.call(this);

		if (!label && this.subcells.length > 0) {
			var subcells = this.subcells;
			var subcell_text;

			for (var i = 0, n = subcells.length; i < n; i++) {
				if (subcell_text = subcells[i]._getDisplayText()) {
					if (label) {
						label = label + " " + subcell_text;
					}
					else {
						label = subcell_text;
					}
				}
			}
		}

		if ((nexacro._accessibilitytype == 4 || nexacro._accessibilitytype == 5) && !is_no_make) {
			var tmp_label = this._getAccessibilityMakeAddLabel();
			label = tmp_label + " " + label;
		}

		return label;
	};

	_pCellControl._isEditable = function () {
		if (this._editor) {
			return (this._editor.visible && this._editor._adjust_width > 0);
		}

		return false;
	};

	_pCellControl._setAccessibilityStatFocus = function () {
		if (nexacro._accessibilitytype == 4 || nexacro._accessibilitytype == 5) {
			return;
		}
		var acclabel = this._refinfo._getAttrValue(this._refinfo.accessibilitylabel, this._getDataRow());
		this.set_accessibilitylabel(acclabel);
		this.on_apply_accessibility();

		this.on_apply_prop_accessibilitydescription();
		this.on_apply_prop_accessibilityaction();
		var tmp_label = "";

		tmp_label = this._getAccessibilityMakeAddLabel() + " " + this._getCellAccessibilityLabel();
		this._setAccessibilityStatSelected(this.selected);
		tmp_label = tmp_label.trim();

		this._setAccessibilityLabel(tmp_label);
		if (this._editor && this._editor.visible && this._editor._adjust_width > 0) {
			this._editor._setAccessibilityStatFocus();
		}
		else if (this._subComp && this._curDisplayType != "treeitemcontrol") {
			this._subComp._setAccessibilityStatFocus();
		}
		else {
			nexacro.Component.prototype._setAccessibilityStatFocus.call(this);
		}
	};

	_pCellControl._getCellAccessibilityLabel = function () {
		var tmpLabel = "";


		tmpLabel = this._getAccessibilityLabel();


		if (this._subComp) {
			var subComp = this._subComp;
			var displayType = this._curDisplayType;

			if (displayType == "checkboxcontrol") {
				this._setAccessibilityStatChecked(subComp.isChecked());
			}
			else if (displayType == "treeitemcontrol") {
				var datarow = this._getDataRow();
				var cellinfo = this._refinfo;
				var state = this._getTreeStatus();
				var level = cellinfo._getTreeLevel(datarow);
				var startlevel = cellinfo._getTreeStartLevel(datarow);

				switch (state) {
					case 0:
						this._setAccessibilityStatExpanded(false);
						break;
					case 1:
						this._setAccessibilityStatExpanded(true);
						break;
					default:
						this._setAccessibilityStatExpanded(undefined);
				}
				this._setAccessibilityInfoLevel(level - startlevel + 1);
			}
		}
		return tmpLabel;
	};

	_pCellControl._getTreeStatus = function () {
	};

	_pCellControl.__getAccessibilityMakeAddLabelMiddleClass = function () {
		return "";
	};

	_pCellControl._getAccessibilityMakeAddLabel = function () {
		var tmpLabel = "", view = this._view;

		var desclevel = this._getDescLevel();
		if (desclevel == "none" || desclevel == "child") {
			return "";
		}

		if (view._is_first_focus && view._control_element) {
			tmpLabel = view._getAccessibilityLabel();
		}


		tmpLabel += this.__getAccessibilityMakeAddLabelMiddleClass();
		return tmpLabel;
	};

	_pCellControl._getAccessibilityRoleParentType = function () {
	};

	_pCellControl._getAccessibilityRole = function () {
		var role = this.accessibilityrole;

		if (role == "gridcell") {
			var _role = this._getAccessibilityRoleParentType();

			if (_role) {
				role = _role;
			}

			if (this._curDisplayType == "treeitemcontrol") {
				role = "treeitem";
			}
			else if (this._subComp) {
				role = this._subComp._getAccessibilityRole();
			}
		}
		return role;
	};

	_pCellControl.on_get_accessibility_label = function () {
		var usedecoratetext = false;
		if (this._refinfo) {
			var dt = this._refinfo.displaytype;
			if (dt == "checkboxcontrol") {
				return "";
			}

			usedecoratetext = (dt == "decoratetext" ? true : false);
		}


		var label = this._getDisplayText();
		if (usedecoratetext) {
			return nexacro._getDisplayTextfromDecorateText(label);
		}
		return label;
	};


	_pCellControl._setAccessibilityNotifyEvent = function (direction) {
		var label = this._getCellAccessibilityLabel();
		label = label.trim();
		this._setAccessibilityLabel(label);
		return nexacro.Component.prototype._setAccessibilityNotifyEvent.call(this, (direction && direction > 0) ? 0 : 1);
	};

	_pCellControl._getComputedStyleWithProp = function (prop) {
		var obj;

		if (prop == "background") {
			obj = this._control_element._getComputedStyleBackgroundColor();
		}
		else if (prop == "textAlign" || prop == "verticalAlign") {
			var align = this._getCurrentStyleAlign();
			obj = align[prop];
		}
		else if (prop == "font" || prop == "color" || prop == "wordSpacing" || prop == "letterSpacing") {
			obj = this._getCurrentStyleInheritValue(prop, "enabled");
		}
		else if (prop == "border") {
			obj = this._getCurrentStyleBorder();
		}
		else if (prop == "textDecoration" || prop == "borderRadius" || prop == "cursor" || prop == "opacity") {
			if (prop == "textDecoration") {
				prop = "-nexa-text-decoration";
			}
			if (prop == "borderRadius") {
				prop = "border-radius";
			}

			obj = nexacro._getStyleProperty(this, prop);
		}
		else {
			obj = this._getCSSStyleValue(prop, "enabled");
		}

		return obj;
	};

	_pCellControl._getComputedStyle = function (is_subcomp) {
		var ctrl_cs = {
			"styles" : {
			}, 
			"subcomp" : {
				"styles" : null
			}
		};
		var properties = this._computed_prop_list;
		var prop;

		for (var i = 0, n = properties.length; i < n; i++) {
			prop = properties[i];
			ctrl_cs.styles[prop] = this._getComputedStyleWithProp(prop);
		}

		if (is_subcomp && this._subComp) {
			ctrl_cs.subcomp = this._subComp._getComputedStyle();
		}

		return ctrl_cs;
	};

	_pCellControl._setComputedStyle = function (ctrl_cs) {
		var properties = this._computed_prop_list;
		var subcomp = this._subComp;

		for (var i = 0; i < properties.length; i++) {
			var prop_name = properties[i];
			var func_name = "set_" + prop_name;

			if (ctrl_cs.styles) {
				var val = ctrl_cs.styles[prop_name];
				val = val && val.value ? val.value : val;

				if (this[func_name]) {
					this[func_name].call(this, val);
				}
			}
		}

		if (subcomp) {
			subcomp._setComputedStyle(ctrl_cs.subcomp);
		}
	};

	_pCellControl.on_apply_padding = function (padding) {
		var control_elem = this._control_element;
		if (control_elem) {
			this._updateAvailableArea();
		}
	};

	_pCellControl.on_apply_prop_enable = function (v) {
		if (v == null) {
			v = this._isEnable();
		}

		nexacro.Component.prototype.on_apply_prop_enable.call(this, v);

		if (this._subComp) {
			this._subComp._setEnable(v);
		}

		var subcells = this.subcells;
		var subcells_len = subcells ? subcells.length : 0;

		for (var i = 0; i < subcells_len; i++) {
			subcells[i]._setEnable(v);
		}
	};

	_pCellControl.on_apply_prop_rtl = function () {
		if (this._is_created) {
			return;
		}

		var v = this.rtl = this._refinfo._getAttrValue(this._refinfo.rtl, this._getDataRow());
		this._rtl = nexacro._isBoolean(v) ? nexacro._toBoolean(v) : undefined;

		nexacro.Component.prototype.on_apply_prop_rtl.call(this);

		if (this._subComp) {
			this._subComp.set_rtl(this.rtl);
		}
	};
	_pCellControl._getPositionInRootComponent = nexacro._emptyFn;

	nexacro._CellExpandControl = function (parent, left, top, right, bottom, controlmode) {
		nexacro.Button.call(this, "cellexpandbutton", left, top, right - left, bottom - top, null, null, null, null, null, null, parent);


		this._controlmode = (controlmode) ? true : false;
		this._view = parent._view;
		this._cellobj = parent;
		this._cellinfo = parent._refinfo;
		this._setControl();
	};

	var _pCellExpand = nexacro._createPrototype(nexacro.Button, nexacro._CellExpandControl);
	nexacro._CellExpandControl.prototype = _pCellExpand;
	_pCellExpand._is_subcontrol = true;

	_pCellExpand.on_destroy_contents = function () {
		nexacro.Button.prototype.on_destroy_contents.call(this);
		this._view = null;
		this._cellobj = null;
		this._cellinfo = null;
	};

	_pCellExpand._isEnable = function () {
		if (this._view && this._view._enable !== undefined) {
			return this._view._enable;
		}

		if (this.parent && this.parent._isEnable) {
			return this.parent._isEnable();
		}

		return true;
	};

	_pCellExpand._updateAll = function (onlycontents, breadonly) {
		this._cellinfo = this.parent._refinfo;

		var control_elem = this._control_element;
		if (control_elem) {
			if (breadonly !== undefined) {
				if (this.on_apply_readonly) {
					this.on_apply_readonly(breadonly);
				}
				else {
					this._changeStatus("readonly", breadonly);
				}
			}
			var datarow = this._cellobj._getDataRow();

			if (!onlycontents) {
				this._apply_status(this._oldstatus, this._status, this._olduserstatus, this._userstatus);
			}

			if (this._cellinfo) {
				var icon = this._cellinfo._getAttrValue(this._cellinfo.expandimage, datarow);

				if (icon) {
					this.set_icon(icon);
				}

				var text = this._cellinfo._getAttrValue(this._cellinfo.expandchar, datarow);
				this.set_text(text);
			}
		}
	};

	_pCellExpand._setAlign = function (halign, valign) {
		var elem = this._text_elem;

		if (elem) {
			if (halign) {
				this.set_textAlign(halign);
			}
			if (valign) {
				this.set_verticalAlign(valign);
			}
		}
	};

	_pCellExpand.on_fire_ondblclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		return this._cellobj.on_fire_ondblclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key, "expandbutton");
	};

	_pCellExpand.on_fire_onclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		return this._cellobj.on_fire_onclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key, "expandbutton");
	};

	_pCellExpand._setAccessibilityStatFocus = function () {
		var cellobj = this._cellobj;
		this._control_element.setElementAccessibilityLabel(cellobj._getAccessibilityLabel());
		this._control_element.setElementAccessibilityAction(cellobj.accessibilityaction);
		this._control_element.setElementAccessibilityDescription(cellobj.accessibilitydescription);
		this._control_element.setElementAccessibilityParentLabel(cellobj._getAccessibilityMakeAddLabel().trim());

		nexacro.Button.prototype._setAccessibilityStatFocus.call(this);
	};

	_pCellExpand.on_get_accessibility_description = function () {
		if (this._cellobj) {
			var tooltiptext = this._cellobj.tooltiptext;
			return nexacro._isNull(tooltiptext) ? "" : tooltiptext;
		}
		return "";
	};

	_pCellExpand.on_get_accessibility_label = function () {
		return this.text;
	};

	nexacro._CellButtonControl = function (id, left, top, width, height, parent, displaymode, controlmode) {
		nexacro.Button.call(this, id, left, top, width, height, null, null, null, null, null, null, parent);

		this.tabstop = false;
		this._clickevt_able = true;
		this._displaymode = (displaymode) ? true : false;
		this._controlmode = (controlmode) ? true : false;
		this._view = parent._view;
		this._cellinfo = parent._refinfo;
		this._cellobj = parent;
		this._setControl();
	};

	var _pCellButton = nexacro._createPrototype(nexacro.Button, nexacro._CellButtonControl);
	nexacro._CellButtonControl.prototype = _pCellButton;
	_pCellButton._is_subcontrol = true;

	_pCellButton.on_getIDCSSSelector = function () {
		return "cellbutton";
	};

	_pCellButton.on_destroy_contents = function () {
		nexacro.Button.prototype.on_destroy_contents.call(this);
		this._view = null;
		this._cellinfo = null;
		this._cellobj = null;
	};

	_pCellButton._apply_setfocus = function (evt_name) {
		if (!this._displaymode || nexacro._enableaccessibility) {
			nexacro.Button.prototype._apply_setfocus.call(this, evt_name);
		}
	};

	_pCellButton._isEnable = function () {
		if (this._view && this._view._enable !== undefined) {
			return this._view._enable;
		}

		if (this.parent && this.parent._isEnable) {
			return this.parent._isEnable();
		}

		return true;
	};

	_pCellButton.on_fire_onclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		nexacro.Button.prototype.on_fire_onclick.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);
		this._cellobj.on_fire_onclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key, "control");
		return true;
	};

	_pCellButton.on_fire_ondblclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		nexacro.Button.prototype.on_fire_ondblclick.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);
		this._cellobj.on_fire_ondblclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key, "control");
		return true;
	};

	_pCellButton._EditUpdateAll = function () {
		if (this._control_element) {
			this._updateAll();

			var datarow = this._cellobj._getDataRow();
			var wordwrap = this._cellinfo._getWordwrap(datarow);
			this.set_wordWrap(wordwrap);
		}
	};

	_pCellButton._setProperty = function (onlycontrolprop) {
		var cellinfo = this._cellinfo;
		var cellobj = this._cellobj;
		var datarow = cellobj._getDataRow();

		if (onlycontrolprop) {
			return;
		}

		var v;
		if (this._displaymode == true) {
			v = cellinfo._getDisplayText(datarow);
		}
		else {
			v = cellinfo._getValue(datarow, !this._writable);
		}

		if (v != null) {
			this.set_text(v);
		}
		else {
			this.set_text("");
		}
	};

	_pCellButton._getValueData = function () {
	};

	_pCellButton._updateAll = function (onlycontents, breadonly) {
		this._cellinfo = this.parent._refinfo;

		if (breadonly !== undefined) {
			if (this.on_apply_readonly) {
				this.on_apply_readonly(breadonly);
			}
			else {
				this._changeStatus("readonly", breadonly);
			}
		}
		if (!onlycontents) {
			this._apply_status(this._oldstatus, this._status, this._olduserstatus, this._userstatus);
		}

		this._setProperty();
	};

	_pCellButton._setAccessibilityStatFocus = function () {
		var cellobj = this._cellobj;
		this._control_element.setElementAccessibilityLabel(cellobj._getAccessibilityLabel());
		this._control_element.setElementAccessibilityAction(cellobj.accessibilityaction);
		this._control_element.setElementAccessibilityDescription(cellobj.accessibilitydescription);
		this._control_element.setElementAccessibilityParentLabel(cellobj._getAccessibilityMakeAddLabel().trim());

		nexacro.Component.prototype._setAccessibilityStatFocus.call(this);
	};

	_pCellButton.on_get_accessibility_description = function () {
		if (this._cellobj) {
			var tooltiptext = this._cellobj.tooltiptext;
			return nexacro._isNull(tooltiptext) ? "" : tooltiptext;
		}
		return "";
	};

	_pCellButton.on_get_accessibility_label = function () {
		return this.text;
	};

	_pCellButton._getAccessibilityRole = function () {
		return this._cellobj ? this._cellobj.accessibilityrole : this.accessibilityrole ? this.accessibilityrole : "none";
	};

	_pCellButton._getComputedStyle = function () {
		if (!nexacro._getComputedStyleProperties) {
			return;
		}

		var properties = this._computed_prop_list;
		properties = properties.toString();

		var ctrl_cs = {
			"styles" : null
		};

		var str = nexacro._getComputedStyleProperties(this._control_element, properties, null, true);
		eval("ctrl_cs.styles = " + str);

		return ctrl_cs;
	};

	_pCellButton._setComputedStyle = function (ctrl_cs) {
		var properties = this._computed_prop_list;
		for (var i = 0; i < properties.length; i++) {
			var prop_name = properties[i];
			var func_name = "set_" + prop_name;

			if (ctrl_cs.styles) {
				if (this[func_name]) {
					this[func_name].call(this, ctrl_cs.styles[prop_name]);
				}
			}
		}
	};

	_pCellButton._getCurrentStyleAlign = function (noflush) {
		return this._cellobj._getCurrentStyleAlign(noflush);
	};

	nexacro._CellProgressBarControl = function (id, left, top, width, height, parent, controlmode) {
		nexacro.ProgressBar.call(this, id, left, top, width, height, null, null, null, null, null, null, parent);

		this.tabstop = false;
		this.max = 100;
		this.min = 0;
		this.step = 1;
		this._controlmode = (controlmode) ? true : false;
		this._view = parent._view;
		this._cellinfo = parent._refinfo;
		this._cellobj = parent;
		this._setControl();
	};
	var _pCellBar = nexacro._CellProgressBarControl.prototype = nexacro._createPrototype(nexacro.ProgressBar, nexacro._CellProgressBarControl);
	_pCellBar._is_subcontrol = true;

	_pCellBar._apply_dblclick_event = function () {
		var items = this._progressbaritems;

		if (items) {
			for (var i = 0; i < items.length; i++) {
				items[i].on_fire_ondblclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
					nexacro._ProgressBarItemControl.prototype.on_fire_ondblclick.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);

					this.parent.on_fire_ondblclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, this, from_refer_comp, meta_key, "control");
					return true;
				};
			}
		}

		if (this.progressstartcap) {
			this.progressstartcap.on_fire_ondblclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
				nexacro._Icon.prototype.on_fire_ondblclick.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);

				this.parent.on_fire_ondblclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, this, from_refer_comp, meta_key, "control");
				return true;
			};
		}
		if (this.progressendcap) {
			this.progressendcap.on_fire_ondblclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
				nexacro._Icon.prototype.on_fire_ondblclick.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);

				this.parent.on_fire_ondblclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, this, from_refer_comp, meta_key, "control");
				return true;
			};
		}
		if (this._progressbartext) {
			this._progressbartext.on_fire_ondblclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
				nexacro.Static.prototype.on_fire_ondblclick.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);

				this.parent.on_fire_ondblclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, this, from_refer_comp, meta_key, "control");
				return true;
			};
		}
	};

	_pCellBar.set_pos = function (v) {
		nexacro.ProgressBar.prototype.set_pos.call(this, v);
		this._apply_dblclick_event();
	};

	_pCellBar.on_destroy_contents = function () {
		nexacro.ProgressBar.prototype.on_destroy_contents.call(this);
		this._view = null;
		this._cellinfo = null;
		this._cellobj = null;
	};

	_pCellBar.set_text = function (v) {
		var retn = nexacro.Component.prototype.set_text.call(this, v);
		var pos = parseInt(this._displaytext);

		pos = isNaN(pos) ? 0 : pos;

		this.set_pos(pos);
		return retn;
	};

	_pCellBar._isEnable = function () {
		if (this._view && this._view._enable !== undefined) {
			return this._view._enable;
		}

		if (this.parent && this.parent._isEnable) {
			return this.parent._isEnable();
		}

		return true;
	};

	_pCellBar.on_fire_onclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		return this._cellobj.on_fire_onclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key, "control");
	};

	_pCellBar.on_fire_ondblclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		return this._cellobj.on_fire_ondblclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key, "control");
	};

	_pCellBar._getDisplayText = function () {
		if (this.parent) {
			return this.parent._getDisplayText();
		}

		return "";
	};

	_pCellBar._updateAll = function (onlycontents, breadonly) {
		this._cellinfo = this.parent._refinfo;

		if (breadonly !== undefined) {
			if (this.on_apply_readonly) {
				this.on_apply_readonly(breadonly);
			}
			else {
				this._changeStatus("readonly", breadonly);
			}
		}
		if (!onlycontents) {
			this._apply_status(this._oldstatus, this._status, this._olduserstatus, this._userstatus);
		}

		this._setProperty();
	};

	_pCellBar._setProperty = function (onlycontrolprop) {
		var cellinfo = this._cellinfo;
		var cellobj = this._cellobj;
		var datarow = cellobj._getDataRow();

		cellinfo._setCellChildControlProperty("progressbar", this, datarow);

		if (onlycontrolprop) {
			return;
		}

		var v = cellinfo._getDisplayText(datarow);

		if (v != null) {
			this.set_text(v);
		}
		else {
			this.set_text("");
		}
	};

	_pCellBar._setAccessibilityStatFocus = function () {
		var cellobj = this._cellobj;
		this._control_element.setElementAccessibilityLabel(cellobj._getAccessibilityLabel());
		this._control_element.setElementAccessibilityAction(cellobj.accessibilityaction);
		this._control_element.setElementAccessibilityDescription(cellobj.accessibilitydescription);
		this._control_element.setElementAccessibilityParentLabel(cellobj._getAccessibilityMakeAddLabel().trim());

		nexacro.Component.prototype._setAccessibilityStatFocus.call(this);
	};

	_pCellBar.on_get_accessibility_description = function () {
		if (this._cellobj) {
			var tooltiptext = this._cellobj.tooltiptext;
			return nexacro._isNull(tooltiptext) ? "" : tooltiptext;
		}
		return "";
	};

	_pCellBar._getComputedStyle = function () {
		if (!nexacro._getComputedStyleProperties) {
			return;
		}

		var properties = this._computed_prop_list;
		properties = properties.toString();

		var ctrl_cs = {
			"styles" : null, 
			"progressbaritem" : {
				styles : null
			}, 
			"progressbartext" : {
				styles : null
			}, 
			"progressstartcap" : {
				styles : null
			}, 
			"progressendcap" : {
				styles : null
			}
		};

		var str = nexacro._getComputedStyleProperties(this._control_element, properties, null, true);
		eval("ctrl_cs.styles = " + str);

		if (this.progressbaritem) {
			str = nexacro._getComputedStyleProperties(this.progressbaritem._control_element, properties, null, true);
			eval("ctrl_cs.progressbaritem.styles = " + str);
		}
		if (this.progressbartext) {
			str = nexacro._getComputedStyleProperties(this.progressbartext._control_element, properties, null, true);
			eval("ctrl_cs.progressbartext.styles = " + str);
		}
		if (this.progressstartcap) {
			str = nexacro._getComputedStyleProperties(this.progressstartcap._control_element, properties, null, true);
			eval("ctrl_cs.progressstartcap.styles = " + str);
		}
		if (this.progressendcap) {
			str = nexacro._getComputedStyleProperties(this.progressendcap._control_element, properties, null, true);
			eval("ctrl_cs.progressendcap.styles = " + str);
		}
		return ctrl_cs;
	};

	_pCellBar._setComputedStyle = function (ctrl_cs) {
		var properties = this._computed_prop_list;
		var progressbaritem = this.progressbaritem;
		var progressbartext = this.progressbartext;
		var progressstartcap = this.progressstartcap;
		var progressendcap = this.progressendcap;

		for (var i = 0; i < properties.length; i++) {
			var prop_name = properties[i];
			var func_name = "set_" + prop_name;

			if (ctrl_cs.styles) {
				if (this[func_name]) {
					this[func_name].call(this, ctrl_cs.styles[prop_name]);
				}
			}

			if (progressbaritem) {
				if (ctrl_cs.progressbaritem.styles) {
					if (progressbaritem[func_name]) {
						progressbaritem[func_name].call(progressbaritem, ctrl_cs.progressbaritem.styles[prop_name]);
					}
				}
			}
			if (progressbartext) {
				if (ctrl_cs.progressbartext.styles) {
					if (progressbartext[func_name]) {
						progressbartext[func_name].call(progressbartext, ctrl_cs.progressbartext.styles[prop_name]);
					}
				}
			}
			if (progressstartcap) {
				if (ctrl_cs.progressstartcap.styles) {
					if (progressstartcap[func_name]) {
						progressstartcap[func_name].call(progressstartcap, ctrl_cs.progressstartcap.styles[prop_name]);
					}
				}
			}
			if (progressendcap) {
				if (ctrl_cs.progressendcap.styles) {
					if (progressendcap[func_name]) {
						progressendcap[func_name].call(progressendcap, ctrl_cs.progressendcap.styles[prop_name]);
					}
				}
			}
		}
	};

	_pCellBar._getCurrentStyleAlign = function (noflush) {
		return this._cellobj._getCurrentStyleAlign(noflush);
	};

	nexacro._CellEditControl = function (id, left, top, width, height, parent, displaymode, controlmode) {
		nexacro.Edit.call(this, id, left, top, width, height, null, null, null, null, null, null, parent, displaymode);

		this.tabstop = false;

		if (displaymode) {
			this._displaymode = true;
			this.readonly = true;
		}
		else {
			this._displaymode = false;
		}

		this._controlmode = (controlmode) ? true : false;
		this._view = parent._view;
		this._cellinfo = parent._refinfo;
		this._cellobj = parent;

		this._setControl();
	};

	var _pCellEdit = nexacro._createPrototype(nexacro.Edit, nexacro._CellEditControl);
	nexacro._CellEditControl.prototype = _pCellEdit;
	_pCellEdit._is_subcontrol = true;

	_pCellEdit.on_getIDCSSSelector = function () {
		return "celledit";
	};

	_pCellEdit.on_destroy_contents = function () {
		nexacro.Edit.prototype.on_destroy_contents.call(this);
		this._view = null;
		this._cellinfo = null;
		this._cellobj = null;
	};

	_pCellEdit._apply_setfocus = function (evt_name, self_flag, callback) {
		if (this._view._onceTime_focus && !callback) {
			nexacro._OnceCallbackTimer.callonce(this, function () {
				var _win = this._getWindow();
				if (!_win || !_win._isActiveLayerComponent(this)) {
					return;
				}

				this._apply_setfocus(evt_name, self_flag, true);
			}, 0);
			return;
		}
		return nexacro.Edit.prototype._apply_setfocus.call(this, evt_name, self_flag);
	};

	_pCellEdit.setOnlyElementFocus = function () {
		if (this._input_element) {
			this._input_element._applyElementFocus();
		}
	};

	_pCellEdit.on_fire_oninput = function () {
		nexacro.Edit.prototype.on_fire_oninput.call(this);
		return this._cellobj.on_fire_oninput();
	};

	_pCellEdit.on_fire_onimeaction = function (key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp, meta_key) {
		nexacro.Edit.prototype.on_fire_onimeaction.call(this, key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp, meta_key);
		return this._cellobj.on_fire_onimeaction(key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp, meta_key);
	};

	_pCellEdit.on_fire_onclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key, clickitem) {
		nexacro.Edit.prototype.on_fire_onclick.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);
		this._cellobj.on_fire_onclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key, "control");
		return true;
	};

	_pCellEdit.on_fire_ondblclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		if (this._displaymode) {
			this.setSelect(0, 0);
		}

		nexacro.Edit.prototype.on_fire_ondblclick.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);
		this._cellobj.on_fire_ondblclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key, "control");
		return true;
	};

	_pCellEdit.on_getBindableProperties = function () {
		if (!this._displaymode) {
			return "value";
		}
	};

	_pCellEdit._isEnable = function () {
		if (this._view && this._view._enable !== undefined) {
			return this._view._enable;
		}

		if (this.parent && this.parent._isEnable) {
			return this.parent._isEnable();
		}

		return true;
	};

	_pCellEdit._updateAll = function (onlycontents, breadonly) {
		this._cellinfo = this.parent._refinfo;

		if (breadonly !== undefined) {
			if (this.on_apply_readonly) {
				this.on_apply_readonly(breadonly);
			}
			else {
				this._changeStatus("readonly", breadonly);
			}
		}
		if (!onlycontents) {
			this._apply_status(this._oldstatus, this._status, this._olduserstatus, this._userstatus);
		}

		this._setProperty();
	};

	_pCellEdit._setProperty = function (onlycontrolprop) {
		var cellinfo = this._cellinfo;
		var cellobj = this._cellobj;
		var datarow = cellobj._getDataRow();

		cellinfo._setCellChildControlProperty("edit", this, datarow);

		if (this._view) {
			this.set_usesoftkeyboard(this._view.usesoftkeyboard);
		}

		if (onlycontrolprop) {
			return;
		}

		var v;
		if (this._displaymode == true) {
			v = cellinfo._getDisplayText(datarow);
		}
		else {
			v = cellinfo._getValue(datarow);
		}

		this.set_value(v);
	};

	_pCellEdit._setEditingValue = function (value) {
		return this.set_value(value);
	};

	_pCellEdit._EditUpdateAll = function () {
		this._updateAll();
	};

	_pCellEdit._getEditingText = function () {
		return this.text;
	};

	_pCellEdit._getEditingValue = function () {
		return this.value;
	};

	_pCellEdit._getValueData = function () {
		return this.value;
	};

	_pCellEdit._setAccessibilityStatFocus = function () {
		var cellobj = this._cellobj;
		if (cellobj) {
			var label = "";
			label = (label = cellobj._getLinkedLabel(cellobj.accessibilitylabel)) ? label : "";
			this._control_element.setElementAccessibilityLabel(label);
			this._control_element.setElementAccessibilityAction(cellobj.accessibilityaction);
			this._control_element.setElementAccessibilityDescription(cellobj.accessibilitydescription);
			this._control_element.setElementAccessibilityParentLabel(cellobj._getAccessibilityMakeAddLabel().trim());
		}
		nexacro.Component.prototype._setAccessibilityStatFocus.call(this);
	};

	_pCellEdit.on_get_accessibility_description = function () {
		if (this._cellobj) {
			var tooltiptext = this._cellobj.tooltiptext;
			return nexacro._isNull(tooltiptext) ? "" : tooltiptext;
		}
		return "";
	};

	_pCellEdit._getComputedStyle = function () {
		if (!nexacro._getComputedStyleProperties) {
			return;
		}

		var properties = this._computed_prop_list;
		properties = properties.toString();

		var ctrl_cs = {
			"styles" : null
		};

		var str = nexacro._getComputedStyleProperties(this._control_element, properties, null, true);
		eval("ctrl_cs.styles = " + str);

		return ctrl_cs;
	};

	_pCellEdit._setComputedStyle = function (ctrl_cs) {
		var properties = this._computed_prop_list;
		for (var i = 0; i < properties.length; i++) {
			var prop_name = properties[i];
			var func_name = "set_" + prop_name;

			if (ctrl_cs.styles) {
				if (this[func_name]) {
					this[func_name].call(this, ctrl_cs.styles[prop_name]);
				}
			}
		}
	};

	_pCellEdit._getCurrentStyleAlign = function (noflush) {
		var align = {
			textAlign : "center", 
			verticalAlign : "middle"
		};

		if (this._input_element) {
			align = this._input_element._getComputedStyleAlign(noflush);
		}

		return align;
	};

	nexacro._CellTextAreaControl = function (id, left, top, width, height, parent, displaymode, controlmode) {
		nexacro.TextArea.call(this, id, left, top, width, height, null, null, null, null, null, null, parent, displaymode);
		this.tabstop = false;

		if (displaymode) {
			this._displaymode = true;
			this.readonly = true;
		}
		else {
			this._displaymode = false;
		}

		this._controlmode = (controlmode) ? true : false;
		this._view = parent._view;
		this._cellinfo = parent._refinfo;
		this._cellobj = parent;

		this._setControl();
	};

	var _pCellTextArea = nexacro._createPrototype(nexacro.TextArea, nexacro._CellTextAreaControl);
	nexacro._CellTextAreaControl.prototype = _pCellTextArea;
	_pCellTextArea._is_subcontrol = true;

	_pCellTextArea.on_getIDCSSSelector = function () {
		return "celltextarea";
	};

	_pCellTextArea.on_destroy_contents = function () {
		nexacro.TextArea.prototype.on_destroy_contents.call(this);
		this._view = null;
		this._cellinfo = null;
		this._cellobj = null;
	};

	_pCellTextArea._apply_setfocus = function (evt_name, self_flag, callback) {
		if (this._view._onceTime_focus && !callback) {
			nexacro._OnceCallbackTimer.callonce(this, function () {
				var _win = this._getWindow();
				if (!_win || !_win._isActiveLayerComponent(this)) {
					return;
				}

				this._apply_setfocus(evt_name, self_flag, true);
			}, 0);
			return;
		}
		return nexacro.TextArea.prototype._apply_setfocus.call(this, evt_name, self_flag);
	};

	_pCellTextArea.setOnlyElementFocus = _pCellEdit.setOnlyElementFocus;

	_pCellTextArea.on_fire_oninput = function () {
		nexacro.TextArea.prototype.on_fire_oninput.call(this);
		return this._cellobj.on_fire_oninput();
	};

	_pCellTextArea.on_fire_onclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key, clickitem) {
		nexacro.TextArea.prototype.on_fire_onclick.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);
		this._cellobj.on_fire_onclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key, "control");
		return true;
	};

	_pCellTextArea.on_fire_ondblclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		if (this._displaymode) {
			this.setSelect(0, 0);
		}

		nexacro.TextArea.prototype.on_fire_ondblclick.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);
		this._cellobj.on_fire_ondblclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key, "control");
		return true;
	};

	_pCellTextArea.on_keydown_basic_action = function (keycode, alt_key, ctrl_key, shift_key, refer_comp, meta_key) {
		nexacro.TextArea.prototype.on_keydown_basic_action.call(this, keycode, alt_key, ctrl_key, shift_key, refer_comp, meta_key);

		var cellinfo = this._cellinfo;
		var cellobj = this._cellobj;
		var datarow = cellobj._getDataRow();
		var acceptsenter = cellinfo._getAttrValue(cellinfo.textareaacceptsenter, datarow);
		acceptsenter = nexacro._toBoolean(acceptsenter);

		if (keycode == nexacro.Event.KEY_ENTER) {
			if ((acceptsenter && (!ctrl_key && !alt_key)) || (!acceptsenter && (ctrl_key || alt_key))) {
				var input_elem = this._input_element;
				var pos = this.getCaretPos();
				var text = this.text;
				var chars = text.split("");

				chars.splice(pos, 0, "\n");
				var newValue = chars.join("");
				var newPos = pos + "\n".length;

				if (input_elem && (this.maxlength == 0 || newValue.length <= this.maxlength)) {
					nexacro._OnceCallbackTimer.callonce(this, function () {
						input_elem.updateElementText(newValue, newPos);

						if (this.scrollbartype == "none" && (this.scrolltype == "both" || this.scrolltype == "vertical")) {
							var textsize = nexacro._getTextSize("A", this._getCurrentStyleInheritValue("font"), false, undefined, "none", this._getCurrentStyleInheritValue("wordSpacing"), this._getCurrentStyleInheritValue("letterSpacing"));

							var caretline = this._getCaretLine();
							var control_elem = this.getElement();
							var clientheight = control_elem.getClientHeight();

							var scroll_pos = (textsize[1] *  caretline) - clientheight;
							if (scroll_pos > 0) {
								input_elem.setElementVScrollPos(scroll_pos);
								var adjust_scrollpos = scroll_pos + (textsize[1] - (scroll_pos % textsize[1]));
								input_elem.setElementVScrollPos(adjust_scrollpos);
							}
						}
					}, 0);
					input_elem.stopSysEvent();
				}
			}
		}
	};

	_pCellTextArea.on_getBindableProperties = function () {
		if (!this._displaymode) {
			return "value";
		}
	};

	_pCellTextArea._isEnable = _pCellEdit._isEnable;

	_pCellTextArea._updateAll = function (onlycontents, breadonly) {
		this._cellinfo = this.parent._refinfo;

		if (breadonly !== undefined) {
			if (this.on_apply_readonly) {
				this.on_apply_readonly(breadonly);
			}
			else {
				this._changeStatus("readonly", breadonly);
			}
		}
		if (!onlycontents) {
			this._apply_status(this._oldstatus, this._status, this._olduserstatus, this._userstatus);
		}

		this._setProperty();
	};

	_pCellTextArea._setProperty = function (onlycontrolprop) {
		var cellinfo = this._cellinfo;
		var cellobj = this._cellobj;
		var datarow = cellobj._getDataRow();
		var v;

		if (!onlycontrolprop) {
			if (this._displaymode == true || this.readonly) {
				v = cellinfo._getDisplayText(datarow);
			}
			else {
				v = cellinfo._getValue(datarow);
			}

			this.set_value(v);
		}

		cellinfo._setCellChildControlProperty("textarea", this, datarow);

		if (this._displaymode == true) {
			this.set_scrollbartype("none");
		}
		else {
			v = cellinfo._getAttrValue(cellinfo.textareascrollbartype, datarow);

			if (v != null) {
				this.set_scrollbartype(v);
			}
			else {
				this.set_scrollbartype("none");
			}
		}

		v = cellinfo._getAttrValue(cellinfo.textareascrolltype, datarow);

		if (v != null) {
			this.set_scrolltype(v);
		}
		else {
			this.set_scrolltype("none");
		}

		v = cellinfo._getControlScrollbarsize(datarow, "textarea");
		if (v != null) {
			this.set_scrollbarsize(v);
		}

		if (this._view) {
			this.set_usesoftkeyboard(this._view.usesoftkeyboard);
		}
	};

	_pCellTextArea._setEditingValue = function (value) {
		return this.set_value(value);
	};

	_pCellTextArea._EditUpdateAll = function () {
		if (this._control_element) {
			var datarow = this._cellobj._getDataRow();

			this._updateAll();

			var wordwrap = this._cellinfo._getWordwrap(datarow);
			this.set_wordWrap(wordwrap);
		}
	};

	_pCellTextArea._getEditingText = function () {
		return this.text;
	};

	_pCellTextArea._getEditingValue = function () {
		return this.value;
	};

	_pCellTextArea._getValueData = function () {
		return this.value;
	};

	_pCellTextArea._setAccessibilityStatFocus = function () {
		var cellobj = this._cellobj;
		if (cellobj) {
			var label = "";
			label = (label = cellobj._getLinkedLabel(cellobj.accessibilitylabel)) ? label : "";
			this._control_element.setElementAccessibilityLabel(label);
			this._control_element.setElementAccessibilityAction(cellobj.accessibilityaction);
			this._control_element.setElementAccessibilityDescription(cellobj.accessibilitydescription);
			this._control_element.setElementAccessibilityParentLabel(cellobj._getAccessibilityMakeAddLabel().trim());
		}
		nexacro.Component.prototype._setAccessibilityStatFocus.call(this);
	};

	_pCellTextArea.on_get_accessibility_description = function () {
		if (this._cellobj) {
			var tooltiptext = this._cellobj.tooltiptext;
			return nexacro._isNull(tooltiptext) ? "" : tooltiptext;
		}
		return "";
	};

	_pCellTextArea._getComputedStyle = function () {
		if (!nexacro._getComputedStyleProperties) {
			return;
		}

		var properties = this._computed_prop_list;
		properties = properties.toString();

		var ctrl_cs = {
			"styles" : null, 
			"hscrollbar" : {
				styles : null, 
				"decbutton" : {
					styles : null
				}, 
				"incbutton" : {
					styles : null
				}, 
				"trackbar" : {
					styles : null
				}
			}, 
			"vscrollbar" : {
				styles : null, 
				"decbutton" : {
					styles : null
				}, 
				"incbutton" : {
					styles : null
				}, 
				"trackbar" : {
					styles : null
				}
			}
		};

		var str = nexacro._getComputedStyleProperties(this._control_element, properties, null, true);
		eval("ctrl_cs.styles = " + str);

		if (this.hscrollbar) {
			str = nexacro._getComputedStyleProperties(this.hscrollbar._control_element, properties, null, true);
			eval("ctrl_cs.hscrollbar.styles = " + str);

			str = nexacro._getComputedStyleProperties(this.hscrollbar.decbutton._control_element, properties, null, true);
			eval("ctrl_cs.hscrollbar.decbutton.styles = " + str);

			str = nexacro._getComputedStyleProperties(this.hscrollbar.incbutton._control_element, properties, null, true);
			eval("ctrl_cs.hscrollbar.incbutton.styles = " + str);

			str = nexacro._getComputedStyleProperties(this.hscrollbar.trackbar._control_element, properties, null, true);
			eval("ctrl_cs.hscrollbar.trackbar.styles = " + str);
		}
		if (this.vscrollbar) {
			str = nexacro._getComputedStyleProperties(this.vscrollbar._control_element, properties, null, true);
			eval("ctrl_cs.vscrollbar.styles = " + str);

			str = nexacro._getComputedStyleProperties(this.vscrollbar.decbutton._control_element, properties, null, true);
			eval("ctrl_cs.vscrollbar.decbutton.styles = " + str);

			str = nexacro._getComputedStyleProperties(this.vscrollbar.incbutton._control_element, properties, null, true);
			eval("ctrl_cs.vscrollbar.incbutton.styles = " + str);

			str = nexacro._getComputedStyleProperties(this.vscrollbar.trackbar._control_element, properties, null, true);
			eval("ctrl_cs.vscrollbar.trackbar.styles = " + str);
		}
		return ctrl_cs;
	};

	_pCellTextArea._setComputedStyle = function (ctrl_cs) {
		var properties = this._computed_prop_list;
		var hscrollbar = this.hscrollbar;
		var vscrollbar = this.vscrollbar;

		for (var i = 0; i < properties.length; i++) {
			var prop_name = properties[i];
			var func_name = "set_" + prop_name;

			if (ctrl_cs.styles) {
				if (this[func_name]) {
					this[func_name].call(this, ctrl_cs.styles[prop_name]);
				}
			}

			if (hscrollbar) {
				if (ctrl_cs.hscrollbar.styles) {
					if (hscrollbar[func_name]) {
						hscrollbar[func_name].call(hscrollbar, ctrl_cs.hscrollbar.styles[prop_name]);
					}
				}
				if (ctrl_cs.hscrollbar.decbutton.styles) {
					if (hscrollbar.decbutton[func_name]) {
						hscrollbar.decbutton[func_name].call(hscrollbar.decbutton, ctrl_cs.hscrollbar.decbutton.styles[prop_name]);
					}
				}
				if (ctrl_cs.hscrollbar.incbutton.styles) {
					if (hscrollbar.incbutton[func_name]) {
						hscrollbar.incbutton[func_name].call(hscrollbar.incbutton, ctrl_cs.hscrollbar.incbutton.styles[prop_name]);
					}
				}
				if (ctrl_cs.hscrollbar.trackbar.styles) {
					if (hscrollbar.trackbar[func_name]) {
						hscrollbar.trackbar[func_name].call(hscrollbar.trackbar, ctrl_cs.hscrollbar.trackbar.styles[prop_name]);
					}
				}
			}

			if (vscrollbar) {
				if (ctrl_cs.vscrollbar.styles) {
					if (vscrollbar[func_name]) {
						vscrollbar[func_name].call(vscrollbar, ctrl_cs.vscrollbar.styles[prop_name]);
					}
				}
				if (ctrl_cs.vscrollbar.decbutton.styles) {
					if (vscrollbar.decbutton[func_name]) {
						vscrollbar.decbutton[func_name].call(vscrollbar.decbutton, ctrl_cs.vscrollbar.decbutton.styles[prop_name]);
					}
				}
				if (ctrl_cs.vscrollbar.incbutton.styles) {
					if (vscrollbar.incbutton[func_name]) {
						vscrollbar.incbutton[func_name].call(vscrollbar.incbutton, ctrl_cs.vscrollbar.incbutton.styles[prop_name]);
					}
				}
				if (ctrl_cs.vscrollbar.trackbar.styles) {
					if (vscrollbar.trackbar[func_name]) {
						vscrollbar.trackbar[func_name].call(vscrollbar.trackbar, ctrl_cs.vscrollbar.trackbar.styles[prop_name]);
					}
				}
			}
		}
	};

	_pCellTextArea._getCurrentStyleAlign = function (noflush) {
		var align = {
			textAlign : "center", 
			verticalAlign : "middle"
		};

		if (this._input_element) {
			align = this._input_element._getComputedStyleAlign(noflush);
		}

		return align;
	};

	nexacro._CellMaskEditControl = function (id, left, top, width, height, parent, displaymode, controlmode) {
		nexacro.MaskEdit.call(this, id, left, top, width, height, null, null, null, null, null, null, parent, displaymode);

		this._displaymode = (displaymode) ? true : false;
		this.tabstop = false;
		this._controlmode = (controlmode) ? true : false;
		this._view = parent._view;
		this._cellinfo = parent._refinfo;
		this._cellobj = parent;

		this._setControl();
	};

	var _pCellMaskEdit = nexacro._createPrototype(nexacro.MaskEdit, nexacro._CellMaskEditControl);
	nexacro._CellMaskEditControl.prototype = _pCellMaskEdit;
	_pCellMaskEdit._is_subcontrol = true;

	_pCellMaskEdit.on_getIDCSSSelector = function () {
		return "cellmaskedit";
	};

	_pCellMaskEdit.on_destroy_contents = function () {
		nexacro.MaskEdit.prototype.on_destroy_contents.call(this);
		this._view = null;
		this._cellinfo = null;
		this._cellobj = null;
	};

	_pCellMaskEdit._apply_setfocus = function (evt_name, self_flag, callback) {
		if (this._view._onceTime_focus && !callback) {
			nexacro._OnceCallbackTimer.callonce(this, function () {
				var _win = this._getWindow();
				if (!_win || !_win._isActiveLayerComponent(this)) {
					return;
				}

				this._apply_setfocus(evt_name, self_flag, true);
			}, 0);
			return;
		}
		return nexacro.MaskEdit.prototype._apply_setfocus.call(this, evt_name, self_flag);
	};

	_pCellMaskEdit.setOnlyElementFocus = _pCellEdit.setOnlyElementFocus;


	_pCellMaskEdit.on_fire_oninput = function () {
		nexacro.MaskEdit.prototype.on_fire_oninput.call(this);
		return this._cellobj.on_fire_oninput();
	};

	_pCellMaskEdit.on_fire_onimeaction = function (key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp, meta_key) {
		nexacro.MaskEdit.prototype.on_fire_onimeaction.call(this, key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp, meta_key);
		return this._cellobj.on_fire_onimeaction(key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp, meta_key);
	};

	_pCellMaskEdit.on_fire_onclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key, clickitem) {
		nexacro.MaskEdit.prototype.on_fire_onclick.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);
		this._cellobj.on_fire_onclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key, "control");
		return true;
	};

	_pCellMaskEdit.on_fire_ondblclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		if (this._displaymode) {
			this.setSelect(0, 0);
		}

		nexacro.MaskEdit.prototype.on_fire_ondblclick.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);
		this._cellobj.on_fire_ondblclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key, "control");
		return true;
	};

	_pCellMaskEdit._isEnable = _pCellEdit._isEnable;

	_pCellMaskEdit._updateAll = function (onlycontents, breadonly) {
		this._cellinfo = this.parent._refinfo;

		if (breadonly !== undefined) {
			if (this.on_apply_readonly) {
				this.on_apply_readonly(breadonly);
			}
			else {
				this._changeStatus("readonly", breadonly);
			}
		}
		if (!onlycontents) {
			this._apply_status(this._oldstatus, this._status, this._olduserstatus, this._userstatus);
		}

		this._setProperty();
	};

	_pCellMaskEdit._setProperty = function (onlycontrolprop) {
		var cellinfo = this._cellinfo;
		var cellobj = this._cellobj;
		var datarow = cellobj._getDataRow();
		var dataset = cellinfo._getBindDataset();

		cellinfo._setCellChildControlProperty("maskedit", this, datarow);

		if (!onlycontrolprop) {
			var v;
			if (dataset && cellinfo.subsumtext._value != "" && dataset.getRowType(datarow) == 16) {
				v = cellinfo._getAttrValue(cellinfo.subsumtext, datarow);
			}
			else {
				v = cellinfo._getValue(datarow, true);
			}

			this.set_value(v);
		}

		if (this._view) {
			this.set_usesoftkeyboard(this._view.usesoftkeyboard);
		}
	};

	_pCellMaskEdit._setEditingValue = function (value) {
		return this.set_value(value);
	};

	_pCellMaskEdit._EditUpdateAll = function () {
		this._updateAll();
	};

	_pCellMaskEdit._getEditingText = function () {
		return this.text;
	};

	_pCellMaskEdit._getEditingValue = function () {
		return this.value;
	};

	_pCellMaskEdit._getValueData = function () {
		return this.value;
	};

	_pCellMaskEdit._setAccessibilityStatFocus = function () {
		var cellobj = this._cellobj;
		if (cellobj) {
			var label = "";
			label = (label = cellobj._getLinkedLabel(cellobj.accessibilitylabel)) ? label : "";
			this._control_element.setElementAccessibilityLabel(label);
			this._control_element.setElementAccessibilityAction(cellobj.accessibilityaction);
			this._control_element.setElementAccessibilityDescription(cellobj.accessibilitydescription);
			this._control_element.setElementAccessibilityParentLabel(cellobj._getAccessibilityMakeAddLabel().trim());
		}
		nexacro.Component.prototype._setAccessibilityStatFocus.call(this);
	};

	_pCellMaskEdit.on_get_accessibility_description = function () {
		if (this._cellobj) {
			var tooltiptext = this._cellobj.tooltiptext;
			return nexacro._isNull(tooltiptext) ? "" : tooltiptext;
		}
		return "";
	};

	_pCellMaskEdit._getComputedStyle = function () {
		if (!nexacro._getComputedStyleProperties) {
			return;
		}

		var properties = this._computed_prop_list;
		properties = properties.toString();

		var ctrl_cs = {
			"styles" : null
		};

		var str = nexacro._getComputedStyleProperties(this._control_element, properties, null, true);
		eval("ctrl_cs.styles = " + str);

		return ctrl_cs;
	};

	_pCellMaskEdit._setComputedStyle = function (ctrl_cs) {
		var properties = this._computed_prop_list;
		for (var i = 0; i < properties.length; i++) {
			var prop_name = properties[i];
			var func_name = "set_" + prop_name;

			if (ctrl_cs.styles) {
				if (this[func_name]) {
					this[func_name].call(this, ctrl_cs.styles[prop_name]);
				}
			}
		}
	};

	_pCellMaskEdit._getCurrentStyleAlign = function (noflush) {
		var align = {
			textAlign : "center", 
			verticalAlign : "middle"
		};

		if (this._input_element) {
			align = this._input_element._getComputedStyleAlign(noflush);
		}

		return align;
	};
	nexacro._CellCalendarPopupControl = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent) {
		nexacro._CalendarPopupControl.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);
	};

	var _pCellCalendarPopupControl = nexacro._createPrototype(nexacro._CalendarPopupControl, nexacro._CellCalendarPopupControl);
	nexacro._CellCalendarPopupControl.prototype = _pCellCalendarPopupControl;



	_pCellCalendarPopupControl._is_subcontrol = true;

	_pCellCalendarPopupControl._getPopupParentPos = function () {
		var calendar = this.parent;
		var rect;
		var bandrect;
		if (calendar.parent._getPositionInRootComponent) {
			var ret = calendar.parent._getPositionInRootComponent(calendar);
			rect = ret[0];
			bandrect = ret[1];
			var calendar_size = [rect.width, rect.height];
			var calendar_elem_pos = nexacro._getElementPositionInFrame(calendar.getElement(), true);
			var xgap = 0;
			var ygap = 0;
			if (0 > bandrect.orgl) {
				xgap = Math.abs(bandrect.orgl);
			}
			if (0 > bandrect.orgt) {
				ygap = Math.abs(bandrect.orgt);
			}


			return {
				"x" : calendar_elem_pos.x, 
				"y" : calendar_elem_pos.y, 
				"width" : calendar_size[0], 
				"height" : calendar_size[1], 
				"xgap" : xgap, 
				"ygap" : ygap
			};
		}
		else {
			return nexacro._CalendarPopupControl.prototype._getPopupParentPos.call(this);
		}
	};
	nexacro._CellCalendarControl = function (id, left, top, width, height, parent, displaymode, controlmode) {
		nexacro.Calendar.call(this, id, left, top, width, height, null, null, null, null, null, null, parent, displaymode);

		this.tabstop = false;
		this.ondropdown = "grid";
		this.readonly = this._displaymode = (displaymode) ? true : false;
		this._controlmode = (controlmode) ? true : false;
		this._view = parent._view;
		this._cellinfo = parent._refinfo;
		this._cellobj = parent;
		this._setControl();
	};

	var _pCellCalendar = nexacro._createPrototype(nexacro.Calendar, nexacro._CellCalendarControl);
	nexacro._CellCalendarControl.prototype = _pCellCalendar;
	_pCellCalendar._is_subcontrol = true;

	_pCellCalendar.on_getIDCSSSelector = function () {
		return "cellcalendar";
	};

	_pCellCalendar.on_create_contents = function () {
		nexacro.Calendar.prototype.on_create_contents.call(this);

		if (this._displaymode) {
			if (this.calendaredit) {
				this.calendaredit.on_fire_ondblclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
					nexacro._CalendarEditControl.prototype.on_fire_ondblclick.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);

					this.parent.on_fire_ondblclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, this, from_refer_comp, meta_key, "control");
					return true;
				};
			}

			if (this.dropbutton) {
				this.dropbutton.on_fire_ondblclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
					nexacro._CalendarDropButtonControl.prototype.on_fire_ondblclick.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);

					this.parent.on_fire_ondblclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, this, from_refer_comp, meta_key, "control");
					return true;
				};
			}
		}
	};

	_pCellCalendar.on_destroy_contents = function () {
		nexacro.Calendar.prototype.on_destroy_contents.call(this);
		this._child_editor = null;
		this._view = null;
		this._cellinfo = null;
		this._cellobj = null;
	};

	_pCellCalendar._apply_setfocus = function (evt_name) {
		if (!this._displaymode || nexacro._enableaccessibility) {
			return nexacro.Calendar.prototype._apply_setfocus.call(this, evt_name);
		}
	};

	_pCellCalendar.setOnlyElementFocus = function () {
		if (this.calendaredit && this.calendaredit._input_element) {
			this.calendaredit._input_element._applyElementFocus();
		}
	};

	_pCellCalendar._getPopupSizeArr = function () {
		if (this.type != "monthonly") {
			return nexacro.Calendar.prototype._getPopupSizeArr.call(this);
		}

		var size = this.popupsize;
		if (!size) {
			size = this.getOffsetWidth() + " " + this.getOffsetHeight();
		}

		size = size.split(/\s+/);

		var width = +size[0];
		var height = size[1] ? +size[1] : width;

		return {
			width : width, 
			height : height
		};
	};

	_pCellCalendar._confirmValue = function () {
		if (this.readonly) {
			return;
		}

		var calendaredit = this.calendaredit;
		var datepicker = this.datepicker;

		switch (this.type) {
			case "normal":
				if (this._isPopupVisible()) {
					var e = {
						keycode : 13
					};
					datepicker._changeDate(calendaredit, e);
					datepicker.on_fire_ondayclick(datepicker._value);
				}
				else {
					if (this.value != calendaredit.value) {
						this._on_value_change(this.value, calendaredit.value);
					}
					else if (this.text != calendaredit.text) {
						this._setValue(this.value);
					}
				}
				this._setZeroCaret();
				break;
			case "spin":
				if (this.value != calendaredit.value) {
					this._on_value_change(this.value, calendaredit.value);
				}
				else if (this.text != calendaredit.text) {
					this._setValue(this.value);
				}
				this._setZeroCaret();
				break;
			default:
				break;
		}
	};

	_pCellCalendar._setValueCtrl = function (fire_event, post_text, post_value) {
		this._currentformat = "editformat";
		var edit = this.calendaredit;

		if (edit && edit.value != undefined) {
			var pre_value = this.value;
			var pre_text = this.text;
			var cur_value, cur_text;

			if (post_text != undefined) {
				cur_value = post_value;
				cur_text = edit.text;
			}
			else {
				cur_value = edit.value;
				cur_text = edit.text;
			}

			if (pre_value != cur_value.trim()) {
				if (fire_event) {
					if (!this._on_value_change(pre_value, cur_value)) {
						cur_value = pre_value;
					}
				}

				this._setValue(cur_value);
				edit._setValue(cur_value);
				this._default_value = this.value;
				this._default_text = this.text;
			}
		}
	};

	_pCellCalendar._on_value_change = function (prevalue, postvalue) {
		this._is_value_changed = true;
		return nexacro.Calendar.prototype._on_value_change.call(this, prevalue, postvalue);
	};

	_pCellCalendar._createPopupControl = function () {
		var popupcontrol = this._popupcontrol;
		if (!popupcontrol) {
			popupcontrol = this._popupcontrol = new nexacro._CellCalendarPopupControl("calendarpopup", 0, 0, 0, 0, null, null, null, null, null, null, this);
			popupcontrol.createComponent(true);
		}
	};

	_pCellCalendar.on_fire_oninput = function () {
		nexacro.Calendar.prototype.on_fire_oninput.call(this);
		return this._cellobj.on_fire_oninput();
	};

	_pCellCalendar.on_fire_oncloseup = function (obj, pretext, posttext, prevalue, postvalue, isselect) {
		this._cellobj.on_fire_oncloseup(obj, pretext, posttext, prevalue, postvalue, isselect);
	};

	_pCellCalendar.on_fire_ondropdown = function (obj) {
		return this._cellobj.on_fire_ondropdown(obj);
	};

	_pCellCalendar.on_fire_sys_onkeydown = function (keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp, meta_key) {
		var ret = nexacro.Calendar.prototype.on_fire_sys_onkeydown.call(this, keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp, meta_key);

		if (this._view) {
			if (this._isPopupVisible()) {
				this._view._is_editor_keyaction = false;
			}
			else {
				this._view._is_editor_keyaction = true;
			}
		}

		return ret;
	};

	_pCellCalendar.on_fire_onclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key, clickitem) {
		nexacro.Calendar.prototype.on_fire_onclick.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);
		this._cellobj.on_fire_onclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, this, from_refer_comp, meta_key, "control");
		return true;
	};

	_pCellCalendar.on_fire_ondblclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		if (this._displaymode) {
			this.setSelect(0, 0);
		}

		nexacro.Calendar.prototype.on_fire_ondblclick.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);
		this._cellobj.on_fire_ondblclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, this, from_refer_comp, meta_key, "control");
		return true;
	};

	_pCellCalendar._on_edit_oneditclick = function (obj, e) {
		nexacro.Calendar.prototype._on_edit_oneditclick.call(this, obj, e);

		if (this._displaymode) {
			return this._cellobj.on_fire_onclick(e.button, e.altkey, e.ctrlkey, e.shiftkey, e.screenx, e.screeny, e.canvasx, e.canvasy, e.clientx, e.clienty, e.fromobject, e.fromreferenceobject, e.metakey, "control");
		}
	};
	_pCellCalendar._on_edit_onkeydown = function (obj, e) {
		if (!this._displaymode && this.visible) {
			return nexacro.Calendar.prototype._on_edit_onkeydown.call(this, obj, e);
		}
		else {
			return false;
		}
	};
	_pCellCalendar._on_drop_onclick = function (obj, e) {
		nexacro.Calendar.prototype._on_drop_onclick.call(this, obj, e);

		if (this._displaymode) {
			return this._cellobj.on_fire_onclick(e.button, e.altkey, e.ctrlkey, e.shiftkey, e.screenx, e.screeny, e.canvasx, e.canvasy, e.clientx, e.clienty, e.fromobject, e.fromreferenceobject, e.metakey, "control");
		}
	};

	_pCellCalendar.on_fire_onchanged = function (obj, pre_text, pre_value, post_text, post_value) {
		if (!obj._displaymode) {
			var update = this._cellobj._getAutoUpdateType();
			if (update == "dateselect" || update == "itemselect") {
				this._cellobj._applyEditorDataset(true, pre_value);
			}
			return (nexacro.Calendar.prototype.on_fire_onchanged.call(this, obj, pre_text, pre_value, post_text, post_value));
		}
	};

	_pCellCalendar.on_getBindableProperties = function () {
		if (!this._displaymode) {
			return "value";
		}
	};

	_pCellCalendar._isEnable = function () {
		if (this._view && this._view._enable !== undefined) {
			return this._view._enable;
		}

		if (this.parent && this.parent._isEnable) {
			return this.parent._isEnable();
		}

		return true;
	};

	_pCellCalendar._getDisplayText = function () {
		if (this.parent) {
			return this.parent._getDisplayText();
		}

		return "";
	};

	_pCellCalendar._updateAll = function (onlycontents, breadonly) {
		this._cellinfo = this.parent._refinfo;

		if (breadonly !== undefined) {
			if (this.on_apply_readonly) {
				if (this._is_created) {
					this.on_apply_readonly(breadonly);
				}
			}
			else {
				this._changeStatus("readonly", breadonly);
			}
		}
		if (!onlycontents) {
			this._apply_status(this._oldstatus, this._status, this._olduserstatus, this._userstatus);
		}

		this._setProperty();
	};

	_pCellCalendar._setProperty = function (onlycontrolprop) {
		var cellinfo = this._cellinfo;
		var cellobj = this._cellobj;
		var view = this._view;
		var datarow = cellobj._getDataRow();
		var dataset = cellinfo._getBindDataset();

		var calendardateformat = cellinfo._getAttrValue(cellinfo.calendardateformat, datarow);
		if (!calendardateformat) {
			calendardateformat = nexacro.Calendar.prototype.dateformat;
		}

		this.set_dateformat(calendardateformat);

		var calendareditformat = cellinfo._getAttrValue(cellinfo.calendareditformat, datarow);

		if (!calendareditformat) {
			calendareditformat = nexacro.Calendar.prototype.editformat;
		}

		this.set_editformat(calendareditformat);

		var locale = cellinfo._getLocale(datarow);
		this.set_locale(locale);

		if (view) {
			this.set_usesoftkeyboard(view.usesoftkeyboard);
		}

		var org_v;
		if (dataset && cellinfo.subsumtext._value != "" && dataset.getRowType(datarow) == 16) {
			org_v = cellinfo._getAttrValue(cellinfo.subsumtext, datarow);
		}
		else {
			org_v = cellinfo._getValue(datarow, true);
		}

		var v = org_v;

		if (!onlycontrolprop) {
			if (this._displaymode == true && !v) {
				var maskobj = this._masktypeobj;
				v = cellinfo._getDisplayText(datarow);
				v = maskobj.removeMask(v.split(''));
				v = maskobj.changeNormalizeValue(v);
			}
			this.set_value(v);
		}

		var buttonsize = cellinfo._getControlButtonsize(datarow, "calendar");
		this.set_buttonsize(buttonsize);
		var popuptype = cellinfo._getControlPopuptype(datarow, "calendar");
		if (popuptype) {
			this.set_popuptype(popuptype);
		}

		if (this._displaymode == true) {
			if (nexacro._isNull(org_v)) {
				var calendardisplaynulltype = cellinfo._getAttrValue(cellinfo.calendardisplaynulltype, datarow);
				if (calendardisplaynulltype != "default") {
					if (!onlycontrolprop) {
						this.set_value(org_v);
					}

					if (calendardisplaynulltype == "nulltext") {
						v = cellinfo._getAttrValue(cellinfo.calendardisplaynulltext, datarow);
						if (v != null) {
							this.set_displaynulltext(v);
						}
					}
					else if (calendardisplaynulltype == "nullmask") {
						this.set_displaynulltext("");
					}
					else {
						this.set_displaynulltext("");
						this.set_dateformat("");
					}
				}
			}
			else {
				if (this._isInvalidValue(org_v)) {
					var calendardisplayinvalidtype = cellinfo._getAttrValue(cellinfo.calendardisplayinvalidtype, datarow);

					if (!onlycontrolprop) {
						this.set_value(org_v);
					}

					this.set_dateformat("");
					this.set_displayinvalidtext("");

					if (calendardisplayinvalidtype == "invalidtext" || calendardisplayinvalidtype == "default") {
						v = cellinfo._getAttrValue(cellinfo.calendardisplayinvalidtext, datarow);
						if (v != null) {
							this.set_displayinvalidtext(v);
						}
					}
					else {
						this.set_displayinvalidtext(org_v);
					}
				}
			}
		}

		var calendarpopupsize = cellinfo._getControlPopupsize(datarow, "calendar");
		if (calendarpopupsize) {
			this.set_popupsize(calendarpopupsize);
		}

		cellinfo._setCellChildControlProperty("calendar", this, datarow);
	};

	_pCellCalendar._setEditingValue = function (value) {
		return this.calendaredit.set_value(value);
	};


	_pCellCalendar._EditUpdateAll = function () {
		this._updateAll();
	};

	_pCellCalendar._getEditingText = function () {
		return this.calendaredit.text;
	};

	_pCellCalendar._getEditingValue = function () {
		return this.calendaredit.value;
	};

	_pCellCalendar._getValueData = function () {
		this._setValueCtrl(true);
		return this.value;
	};

	_pCellCalendar._getDlgCode = function (keycode, altKey, ctrlKey, shiftKey) {
		var _want_arrows = this._want_arrows;
		this._is_first_focus = false;
		return {
			want_tab : (this._view ? this._view._acceptstab : false), 
			want_return : false, 
			want_escape : false, 
			want_chars : false, 
			want_arrows : _want_arrows
		};
	};

	_pCellCalendar._getChildren = function () {
		return [this.calendaredit, this.dropbutton];
	};

	_pCellCalendar._setAccessibilityStatFocus = function () {
		var label = "";
		var cellobj = this._cellobj;
		var addlabel = cellobj._getAccessibilityMakeAddLabel();
		var tmp_label = cellobj._getAccessibilityLabel();
		tmp_label = (tmp_label != cellobj._displaytext) ? tmp_label : "";
		label = addlabel + " " + tmp_label;
		label = label.trim();
		this.calendaredit._control_element.setElementAccessibilityLabel(label);

		nexacro.Component.prototype._setAccessibilityStatFocus.call(this);
	};

	_pCellCalendar.on_get_accessibility_description = function () {
		if (this._cellobj) {
			var tooltiptext = this._cellobj.tooltiptext;
			return nexacro._isNull(tooltiptext) ? "" : tooltiptext;
		}
		return "";
	};

	_pCellCalendar._on_dataset_onvaluechanged = function (obj, e) {
		if (!this._displaymode) {
			nexacro.Calendar.prototype._on_dataset_onvaluechanged.call(this, obj, e);
		}
	};

	_pCellCalendar._on_dataset_onrowsetchanged = function (obj, e) {
		if (!this._displaymode) {
			nexacro.Calendar.prototype._on_dataset_onrowsetchanged.call(this, obj, e);
		}
	};

	_pCellCalendar._getComputedStyle = function () {
		if (!nexacro._getComputedStyleProperties) {
			return;
		}

		var properties = this._computed_prop_list;
		properties = properties.toString();

		var ctrl_cs = {
			"styles" : null, 
			"calendaredit" : {
				styles : null
			}, 
			"dropbutton" : {
				styles : null
			}, 
			"calendarspinupbutton" : {
				styles : null
			}, 
			"calendarspindownbutton" : {
				styles : null
			}
		};

		var str = nexacro._getComputedStyleProperties(this._control_element, properties, null, true);
		eval("ctrl_cs.styles = " + str);

		if (this.calendaredit) {
			str = nexacro._getComputedStyleProperties(this.calendaredit._control_element, properties, null, true);
			eval("ctrl_cs.calendaredit.styles = " + str);
		}
		if (this.dropbutton) {
			str = nexacro._getComputedStyleProperties(this.dropbutton._control_element, properties, null, true);
			eval("ctrl_cs.dropbutton.styles = " + str);
		}
		if (this.calendarspinupbutton) {
			str = nexacro._getComputedStyleProperties(this.calendarspinupbutton._control_element, properties, null, true);
			eval("ctrl_cs.calendarspinupbutton.styles = " + str);
		}
		if (this.calendarspindownbutton) {
			str = nexacro._getComputedStyleProperties(this.calendarspindownbutton._control_element, properties, null, true);
			eval("ctrl_cs.calendarspindownbutton.styles = " + str);
		}

		return ctrl_cs;
	};

	_pCellCalendar._setComputedStyle = function (ctrl_cs) {
		var properties = this._computed_prop_list;
		var calendaredit = this.calendaredit;
		var dropbutton = this.dropbutton;
		var calendarspinupbutton = this.calendarspinupbutton;
		var calendarspindownbutton = this.calendarspindownbutton;

		for (var i = 0; i < properties.length; i++) {
			var prop_name = properties[i];
			var func_name = "set_" + prop_name;

			if (ctrl_cs.styles) {
				if (this[func_name]) {
					this[func_name].call(this, ctrl_cs.styles[prop_name]);
				}
			}

			if (calendaredit) {
				if (ctrl_cs.calendaredit.styles) {
					if (calendaredit[func_name]) {
						calendaredit[func_name].call(calendaredit, ctrl_cs.calendaredit.styles[prop_name]);
					}
				}
			}
			if (dropbutton) {
				if (ctrl_cs.dropbutton.styles) {
					if (dropbutton[func_name]) {
						dropbutton[func_name].call(dropbutton, ctrl_cs.dropbutton.styles[prop_name]);
					}
				}
			}
			if (calendarspinupbutton) {
				if (ctrl_cs.calendarspinupbutton.styles) {
					if (calendarspinupbutton[func_name]) {
						calendarspinupbutton[func_name].call(calendarspinupbutton, ctrl_cs.calendarspinupbutton.styles[prop_name]);
					}
				}
			}
			if (calendarspindownbutton) {
				if (ctrl_cs.calendarspindownbutton.styles) {
					if (calendarspindownbutton[func_name]) {
						calendarspindownbutton[func_name].call(calendarspindownbutton, ctrl_cs.calendarspindownbutton.styles[prop_name]);
					}
				}
			}
		}
	};

	_pCellCalendar._getCurrentStyleAlign = function (noflush) {
		var align = {
			textAlign : "center", 
			verticalAlign : "middle"
		};
		var calendaredit = this.calendaredit;

		if (calendaredit && calendaredit._input_element) {
			align = calendaredit._input_element._getComputedStyleAlign(noflush);
		}

		return align;
	};

	_pCellCalendar._setAccessibilityInputLabel = nexacro._emptyFn;

	_pCellCalendar.on_apply_readonly = function (readonly) {
		nexacro.Calendar.prototype.on_apply_readonly.call(this, this._view.readonly);
	};

	_pCellCalendar._isReadOnly = function () {
		return this._view.readonly;
	};

	nexacro._CellComboPopupControl = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent) {
		nexacro._ComboPopupControl.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);
	};

	var _pCellComboPopupControl = nexacro._createPrototype(nexacro._ComboPopupControl, nexacro._CellComboPopupControl);
	nexacro._CellComboPopupControl.prototype = _pCellComboPopupControl;



	_pCellComboPopupControl._is_subcontrol = true;

	_pCellComboPopupControl._getPopupParentPos = function () {
		var combo = this.parent;

		var rect;
		var bandrect;
		if (combo.parent._getPositionInRootComponent) {
			var ret = combo.parent._getPositionInRootComponent(combo);
			rect = ret[0];
			bandrect = ret[1];

			var combo_size = [rect.width, rect.height];
			var combo_elem_pos = nexacro._getElementPositionInFrame(combo.getElement(), true);
			var xgap = 0;
			var ygap = 0;
			if (0 > bandrect.orgl) {
				xgap = Math.abs(bandrect.orgl);
			}
			if (0 > bandrect.orgt) {
				ygap = Math.abs(bandrect.orgt);
			}


			return {
				"x" : combo_elem_pos.x, 
				"y" : combo_elem_pos.y, 
				"width" : combo_size[0], 
				"height" : combo_size[1], 
				"xgap" : xgap, 
				"ygap" : ygap
			};
		}
		else {
			return nexacro._ComboPopupControl.prototype._getPopupParentPos.call(this);
		}
	};
	nexacro._CellComboControl = function (id, left, top, width, height, parent, displaymode, controlmode) {
		nexacro.Combo.call(this, id, left, top, width, height, null, null, null, null, null, null, parent, displaymode);
		this.tabstop = false;

		if (displaymode) {
			this._displaymode = true;
			this.readonly = true;
		}
		else {
			this._displaymode = false;
		}

		this._controlmode = (controlmode) ? true : false;
		this._view = parent._view;
		this._cellinfo = parent._refinfo;
		this._cellobj = parent;
		this._setControl();
	};

	var _pCellCombo = nexacro._createPrototype(nexacro.Combo, nexacro._CellComboControl);
	nexacro._CellComboControl.prototype = _pCellCombo;
	_pCellCombo._is_subcontrol = true;

	_pCellCombo.on_getIDCSSSelector = function () {
		return "cellcombo";
	};

	_pCellCombo.on_create_contents = function () {
		nexacro.Combo.prototype.on_create_contents.call(this);

		if (this._displaymode) {
			this.comboedit.on_fire_ondblclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
				nexacro._ComboEditControl.prototype.on_fire_ondblclick.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);

				this.parent.on_fire_ondblclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, this, from_refer_comp, meta_key, "control");
				return true;
			};
			this.dropbutton.on_fire_ondblclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
				nexacro._ComboButtonControl.prototype.on_fire_ondblclick.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);

				this.parent.on_fire_ondblclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, this, from_refer_comp, meta_key, "control");
				return true;
			};
		}
	};

	_pCellCombo.setOnlyElementFocus = function () {
		if (this.comboedit && this.comboedit._input_element) {
			this.comboedit._input_element._applyElementFocus();
		}
	};

	_pCellCombo.on_destroy_contents = function () {
		nexacro.Combo.prototype.on_destroy_contents.call(this);
		this._child_editor = null;
		this._view = null;
		this._cellinfo = null;
		this._cellobj = null;
	};

	_pCellCombo._apply_setfocus = function (evt_name) {
		if (!this._displaymode || nexacro._enableaccessibility) {
			return nexacro.Combo.prototype._apply_setfocus.call(this, evt_name);
		}
	};

	_pCellCombo.on_fire_oncloseup = function (obj, beforeIndex, beforeText, beforeValue, afterIndex, afterText, afterValue, isSelect) {
		nexacro.Combo.prototype.on_fire_oncloseup.call(this, obj, beforeIndex, beforeText, beforeValue, afterIndex, afterText, afterValue, isSelect);
		this._cellobj.on_fire_oncloseup(obj, beforeText, afterText, beforeValue, afterValue, isSelect);
	};

	_pCellCombo.on_fire_user_onkeydown = function (keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp, meta_key) {
		var view = this._view;
		if (view) {
			if (keycode == nexacro.Event.KEY_DOWN || keycode == nexacro.Event.KEY_UP
				 || (keycode == nexacro.Event.KEY_DOWN && alt_key)) {
				view._is_editor_keyaction = false;
			}
		}

		nexacro.Combo.prototype.on_fire_user_onkeydown.call(this, keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp, meta_key);

		if (!this._displaymode) {
			return this._cellobj.on_fire_user_onkeydown(keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp, meta_key);
		}
	};

	_pCellCombo.on_fire_sys_onmousewheel = function (wheelDeltaX, wheelDeltaY, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, comp, refer_comp, meta_key) {
		if (!this._displaymode) {
			return nexacro.Combo.prototype.on_fire_sys_onmousewheel.call(this, wheelDeltaX, wheelDeltaY, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, comp, refer_comp, meta_key);
		}
	};

	_pCellCombo.on_fire_ondropdown = function (obj) {
		return this._cellobj.on_fire_ondropdown(obj);
	};

	_pCellCombo.on_fire_onclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		nexacro.Combo.prototype.on_fire_onclick.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);
		this._cellobj.on_fire_onclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, this, from_refer_comp, meta_key, "control");
		return true;
	};

	_pCellCombo.on_fire_ondblclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		if (this._displaymode) {
			this.setSelect(0, 0);
		}

		nexacro.Combo.prototype.on_fire_ondblclick.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key);
		this._cellobj.on_fire_ondblclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, this, from_refer_comp, meta_key, "control");
		return true;
	};

	_pCellCombo._on_edit_oneditclick = function (obj, e) {
		nexacro.Combo.prototype._on_edit_oneditclick.call(this, obj, e);

		if (this._displaymode) {
			return this._cellobj.on_fire_onclick(e.button, e.altkey, e.ctrlkey, e.shiftkey, e.screenx, e.screeny, e.canvasx, e.canvasy, e.clientx, e.clienty, e.fromobject, e.fromreferenceobject, e.metakey, "control");
		}
	};
	_pCellCombo._on_edit_onkeydown = function (obj, e) {
		if (!this._displaymode && this.visible) {
			return nexacro.Combo.prototype._on_edit_onkeydown.call(this, obj, e);
		}
		else {
			return false;
		}
	};
	_pCellCombo._on_drop_onclick = function (obj, e) {
		nexacro.Combo.prototype._on_drop_onclick.call(this, obj, e);

		if (this._displaymode) {
			return this._cellobj.on_fire_onclick(e.button, e.altkey, e.ctrlkey, e.shiftkey, e.screenx, e.screeny, e.canvasx, e.canvasy, e.clientx, e.clienty, e.fromobject, e.fromreferenceobject, e.metakey, "control");
		}
	};

	_pCellCombo.on_fire_oninput = function () {
		nexacro.Combo.prototype.on_fire_oninput.call(this);
		return this._cellobj.on_fire_oninput();
	};

	_pCellCombo.on_lbuttondown_basic_action = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp, meta_key) {
		var retn = nexacro.Component.prototype.on_lbuttondown_basic_action.call(this, elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp, meta_key);
		if (this._isPopupVisible() && this == refer_comp) {
			this._closePopup();
		}

		return retn;
	};

	_pCellCombo.on_fire_onitemchanged = function (obj, preindex, pretext, prevalue, postindex, posttext, postvalue) {
		if (!obj._displaymode) {
			var update = this._cellobj._getAutoUpdateType();
			if (update == "comboselect" || update == "itemselect") {
				this._cellobj._applyEditorDataset(true, prevalue);
			}
			return (nexacro.Combo.prototype.on_fire_onitemchanged.call(this, obj, preindex, pretext, prevalue, postindex, posttext, postvalue));
		}
	};

	_pCellCombo.on_getBindableProperties = function () {
		if (!this._displaymode) {
			return "value";
		}
	};

	_pCellCombo._isEnable = function () {
		if (this._view && this._view._enable !== undefined) {
			return this._view._enable;
		}

		if (this.parent && this.parent._isEnable) {
			return this.parent._isEnable();
		}

		return true;
	};

	_pCellCombo._updateAll = function (onlycontents, breadonly) {
		this._cellinfo = this.parent._refinfo;

		if (breadonly !== undefined) {
			if (this.on_apply_readonly) {
				if (this._is_created) {
					this.on_apply_readonly(breadonly);
				}
			}
			else {
				this._changeStatus("readonly", breadonly);
			}
		}
		if (!onlycontents) {
			this._apply_status(this._oldstatus, this._status, this._olduserstatus, this._userstatus);
		}

		this._setProperty();
	};

	_pCellCombo._confirmValue = function () {
		if (this.readonly) {
			return;
		}

		var combolist = this.combolist;
		var ds = this._selectDataset();
		var pre_value = this._default_value;
		var pre_text = this._default_text;
		var pre_index = this._default_index;

		var cur_value = this.value;
		var cur_text = this.text;
		var cur_index = this.index;
		var rawidx, curobj;

		if (this._isPopupVisible()) {
			curobj = combolist._get_rowobj_status("mouseover", "status") || combolist._get_rowobj_status("selected", "userstatus");
			if (curobj) {
				cur_index = curobj.index;
			}
		}

		if (cur_index >= 0) {
			if (this.type == "filter" || this.type == "filterlike" || this.type == "caseifilter" || this.type == "caseifilterlike") {
				rawidx = this._getRawIndex(ds, cur_index);
				rawidx = (rawidx == -1) ? cur_index : rawidx;
				ds.set_filterstr("");
			}
			else {
				rawidx = cur_index;
			}
		}
		else {
			rawidx = cur_index;
		}

		if (this.index != rawidx) {
			cur_value = this._getItemValue(rawidx);
			cur_text = this._getItemText(rawidx);
			cur_index = rawidx;

			if (!this._on_value_change(pre_index, pre_text, pre_value, cur_index, cur_text, cur_value)) {
				this._setEditValue(this.text);
				cur_value = pre_value;
				cur_text = pre_text;
				cur_index = pre_index;
			}
		}

		this._setDefaultProps(cur_index, cur_value, cur_text);
	};

	_pCellCombo._setProperty = function (onlycontrolprop) {
		var cellinfo = this._cellinfo, cellobj = this._cellobj;

		var datarow = cellobj._getDataRow();

		var buttonsize = cellinfo._getControlButtonsize(datarow, "combo");
		this.set_buttonsize(buttonsize);
		var popuptype = cellinfo._getControlPopuptype(datarow, "combo");
		if (popuptype) {
			this.set_popuptype(popuptype);
		}
		var scrollsize = cellinfo._getControlScrollbarsize(datarow, "combo");
		if (scrollsize != null) {
			this.set_scrollbarsize(scrollsize);
		}
		var popupsize = cellinfo._getControlPopupsize(datarow, "combo");
		if (popupsize) {
			this.set_popupsize(popupsize);
		}

		var v;

		v = cellinfo._getAttrValue(cellinfo.combodisplaynulltype, datarow);
		if (v == "nulltext") {
			v = cellinfo._getAttrValue(cellinfo.combodisplaynulltext, datarow);
			if (v != null) {
				this.set_displaynulltext(v);
			}
		}
		else {
			this.set_displaynulltext("");
		}

		cellinfo._setCellChildControlProperty("combo", this, datarow);

		if (!onlycontrolprop) {
			v = cellinfo._getValue(datarow);
			this.set_value(v);
		}

		if (this._view) {
			this.set_usesoftkeyboard(this._view.usesoftkeyboard);
		}
	};

	_pCellCombo._setEditingValue = function (value) {
		return this.comboedit.set_value(value);
	};

	_pCellCombo.on_apply_text = function (text) {
		if (this._displaymode == true) {
			if (!nexacro._isNull(this.value)) {
				var cellinfo = this._cellinfo, cellobj = this._cellobj;

				var datarow = cellobj._getDataRow();

				var v = cellinfo._getAttrValue(cellinfo.combodisplaynulltype, datarow);
				if (v == "nulltext") {
					if (this.index < 0) {
						this._setEditValue(undefined);
					}
					else {
						this._setEditValue(text);
					}
				}
			}
			else {
				if (this.displaynulltext || text == "") {
					this._setEditValue(undefined);
				}
				else {
					this._setEditValue(text);
				}
			}
		}
		else {
			return nexacro.Combo.prototype.on_apply_text.call(this, text);
		}
	};

	_pCellCombo._EditUpdateAll = function () {
		this._updateAll();
	};

	_pCellCombo._getEditingText = function () {
		return this.comboedit.text;
	};

	_pCellCombo._getEditingValue = function () {
		return this.comboedit.value;
	};

	_pCellCombo._getValueData = function () {
		return this.value;
	};

	_pCellCombo._getDlgCode = function (keycode, altKey, ctrlKey, shiftKey) {
		var _want_arrows = this._want_arrows;
		this._is_first_focus = false;
		return {
			want_tab : (this._view ? this._view._acceptstab : false), 
			want_return : false, 
			want_escape : false, 
			want_chars : false, 
			want_arrows : _want_arrows
		};
	};

	_pCellCombo._getChildren = function () {
		return [this.comboedit, this.dropbutton];
	};

	_pCellCombo._setAccessibilityStatFocus = function () {
		var label = "";
		var cellobj = this._cellobj;
		var addlabel = cellobj._getAccessibilityMakeAddLabel();
		var tmp_label = cellobj._getAccessibilityLabel();
		tmp_label = (tmp_label != cellobj._displaytext) ? tmp_label : "";
		label = addlabel + " " + tmp_label;
		label = label.trim();
		this.comboedit._control_element.setElementAccessibilityLabel(label);

		nexacro.Combo.prototype._setAccessibilityStatFocus.call(this);
	};

	_pCellCombo.on_get_accessibility_description = function () {
		if (this._cellobj) {
			var tooltiptext = this._cellobj.tooltiptext;
			return nexacro._isNull(tooltiptext) ? "" : tooltiptext;
		}
		return "";
	};

	_pCellCombo._on_dataset_onvaluechanged = function (obj, e) {
		if (!this._displaymode) {
			nexacro.Combo.prototype._on_dataset_onvaluechanged.call(this, obj, e);
		}
	};

	_pCellCombo._on_dataset_onrowsetchanged = function (obj, e) {
		if (!this._displaymode) {
			nexacro.Combo.prototype._on_dataset_onrowsetchanged.call(this, obj, e);
		}
	};

	_pCellCombo._getComputedStyle = function () {
		if (!nexacro._getComputedStyleProperties) {
			return;
		}

		var properties = this._computed_prop_list;
		properties = properties.toString();

		var ctrl_cs = {
			"styles" : null, 
			"comboedit" : {
				styles : null
			}, 
			"dropbutton" : {
				styles : null
			}
		};

		var str = nexacro._getComputedStyleProperties(this._control_element, properties, null, true);
		eval("ctrl_cs.styles = " + str);

		if (this.comboedit) {
			str = nexacro._getComputedStyleProperties(this.comboedit._control_element, properties, null, true);
			eval("ctrl_cs.comboedit.styles = " + str);
		}
		if (this.dropbutton) {
			str = nexacro._getComputedStyleProperties(this.dropbutton._control_element, properties, null, true);
			eval("ctrl_cs.dropbutton.styles = " + str);
		}
		return ctrl_cs;
	};

	_pCellCombo._setComputedStyle = function (ctrl_cs) {
		var properties = this._computed_prop_list;
		var comboedit = this.comboedit;
		var dropbutton = this.dropbutton;

		for (var i = 0; i < properties.length; i++) {
			var prop_name = properties[i];
			var func_name = "set_" + prop_name;

			if (ctrl_cs.styles) {
				if (this[func_name]) {
					this[func_name].call(this, ctrl_cs.styles[prop_name]);
				}
			}

			if (comboedit) {
				if (ctrl_cs.comboedit.styles) {
					if (comboedit[func_name]) {
						comboedit[func_name].call(comboedit, ctrl_cs.comboedit.styles[prop_name]);
					}
				}
			}
			if (dropbutton) {
				if (ctrl_cs.dropbutton.styles) {
					if (dropbutton[func_name]) {
						dropbutton[func_name].call(dropbutton, ctrl_cs.dropbutton.styles[prop_name]);
					}
				}
			}
		}
	};

	_pCellCombo._getCurrentStyleAlign = function (noflush) {
		var align = {
			textAlign : "center", 
			verticalAlign : "middle"
		};
		var comboedit = this.comboedit;

		if (comboedit && comboedit._input_element) {
			align = this.comboedit._input_element._getComputedStyleAlign(noflush);
		}

		return align;
	};

	_pCellCombo._setAccessibilityInputLabel = nexacro._emptyFn;

	_pCellCombo._isReadOnly = function () {
		return this._view.readonly;
	};

	_pCellCombo._createPopupControl = function () {
		var popupcontrol = this._popupcontrol;
		if (!popupcontrol) {
			popupcontrol = this._popupcontrol = new nexacro._CellComboPopupControl("combopopup", 0, 0, 0, 0, null, null, null, null, null, null, this);
			popupcontrol._setType(this.popuptype);

			popupcontrol.createComponent(true);
		}
	};
	nexacro._CellCheckboxControlBase = function (id, left, top, width, height, parent) {
		nexacro.CheckBox.call(this, id, left, top, width, height, null, null, null, null, null, null, parent);
		this.tabstop = false;
		this._is_usetextbox = false;

		var wnd = parent;
		while (wnd) {
			if (wnd._refinfo) {
				this._cellobj = wnd;
				this._cellinfo = wnd._refinfo;
				this._view = wnd._view;
				break;
			}
			wnd = wnd.parent;
		}
		this.checked = false;
		this._setControl();
	};

	var _pCellCheckboxBase = nexacro._createPrototype(nexacro.CheckBox, nexacro._CellCheckboxControlBase);
	nexacro._CellCheckboxControlBase.prototype = _pCellCheckboxBase;
	_pCellCheckboxBase._is_subcontrol = true;

	_pCellCheckboxBase._apply_setfocus = function (evt_name, callback) {
	};

	_pCellCheckboxBase.on_create_contents = function () {
		this._adjustAlign();
		nexacro.CheckBox.prototype.on_create_contents.call(this);
	};

	_pCellCheckboxBase.on_destroy_contents = function () {
		nexacro.CheckBox.prototype.on_destroy_contents.call(this);
		this._view = null;
		this._cellinfo = null;
		this._cellobj = null;
	};

	_pCellCheckboxBase.on_fire_onclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		return this.parent.on_fire_onclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key, "control");
	};

	_pCellCheckboxBase.on_fire_ondblclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		return this.parent.on_fire_ondblclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key, "control");
	};

	_pCellCheckboxBase._isEnable = function () {
		if (this._view && this._view._enable !== undefined) {
			return this._view._enable;
		}

		if (this.parent && this.parent._isEnable) {
			return this.parent._isEnable();
		}

		return true;
	};
	_pCellCheckboxBase._on_icon_onload = function (url, width, height) {
		nexacro._IconText.prototype._on_icon_onload.call(this, url, width, height);

		this._adjustAlign(undefined, undefined, width, height);
	};
	_pCellCheckboxBase._adjustAlign = function (halign, valign, w, h) {
		var prect = this._cellobj._getAvailableRect();
		var left = prect.left;
		var top = prect.top;
		var right = prect.right;
		var bottom = prect.bottom;
		var width = prect.width;
		var height = prect.height;
		var datarow = this._cellobj._getDataRow();
		var controlSize = this._cellinfo._getCheckboxsize(datarow);

		if (controlSize < 0 || controlSize == undefined) {
			var size = this._on_getFitSize(w, h);
			controlSize = size[1];
		}

		if (!halign) {
			halign = "center";
		}
		if (!valign) {
			valign = "middle";
		}

		if (halign == "center") {
			left += ((width - controlSize) / 2);
		}
		else if (halign == "right") {
			left = right - controlSize;
		}

		if (valign == "middle") {
			top += ((height - controlSize) / 2);
		}
		else if (valign == "bottom") {
			top = bottom - controlSize;
		}

		this.move(left, top, controlSize, controlSize);
	};

	_pCellCheckboxBase._updateAll = function (onlycontents, breadonly) {
		this._cellinfo = this.parent._refinfo;

		if (breadonly !== undefined) {
			if (this.on_apply_readonly) {
				this.on_apply_readonly(breadonly);
			}
			else {
				this._changeStatus("readonly", breadonly);
			}
		}
		if (!onlycontents) {
			this._apply_status(this._oldstatus, this._status, this._olduserstatus, this._userstatus);
		}

		this._adjustAlign();
		this._setProperty();
	};

	_pCellCheckboxBase._getCheckValue = function () {
		var cellinfo = this._cellinfo;
		var cellobj = this._cellobj;
		var datarow = cellobj._getDataRow();
		var v = cellinfo._getTextValueForDisp(datarow);

		return v;
	};

	_pCellCheckboxBase._setProperty = function (onlycontrolprop) {
		var cellinfo = this._cellinfo, cellobj = this._cellobj;

		var datarow = cellobj._getDataRow();
		cellinfo._setCellChildControlProperty("checkbox", this, datarow);

		if (onlycontrolprop) {
			return;
		}

		var v = this._getCheckValue();

		if (!nexacro._isNull(this.falsevalue) && !nexacro._isNull(this.truevalue) && this.truevalue != v) {
			v = this.falsevalue;
		}

		this.value = false;
		this.set_value(v);
		this.checked = this._isChecked(v);
		this._cellobj._setAccessibilityStatChecked(this.checked);
	};

	_pCellCheckboxBase.set_value = function (v) {
		v = this._changeValue(v);
		this._setValue(v);
		this.on_apply_value();
	};

	_pCellCheckboxBase._setAccessibilityStatFocus = function () {
		var cellobj = this._cellobj;
		this._control_element.setElementAccessibilityLabel(cellobj._getAccessibilityLabel());
		this._control_element.setElementAccessibilityAction(cellobj.accessibilityaction);
		this._control_element.setElementAccessibilityDescription(cellobj.accessibilitydescription);
		this._control_element.setElementAccessibilityParentLabel(cellobj._getAccessibilityMakeAddLabel().trim());

		this._setAccessibilityStatChecked(this.isChecked());
		cellobj._setAccessibilityStatChecked(this.isChecked());
		nexacro.Component.prototype._setAccessibilityStatFocus.call(this);
	};

	_pCellCheckboxBase.on_get_accessibility_description = function () {
		if (this._cellobj) {
			var tooltiptext = this._cellobj.tooltiptext;
			return nexacro._isNull(tooltiptext) ? "" : tooltiptext;
		}
		return "";
	};

	_pCellCheckboxBase.on_get_accessibility_label = function () {
		return "";
	};

	_pCellCheckboxBase._getComputedStyle = function () {
		var ctrl_cs = {
			"styles" : null
		};
		return ctrl_cs;
	};

	_pCellCheckboxBase._setComputedStyle = function (ctrl_cs) {
	};

	_pCellCheckboxBase._getCurrentStyleAlign = function (noflush) {
		return this._cellobj._getCurrentStyleAlign(noflush);
	};

	_pCellCheckboxBase._on_getFitSize = function (w, h) {
		var control_elem = this.getElement();
		if (control_elem) {
			var total_w = 0;
			var total_h = 0;

			var border = this._getCurrentStyleBorder();
			if (border) {
				total_w += border._getBorderWidth();
				total_h += border._getBorderHeight();
			}

			var icon = this._icon || this._getCSSStyleValue("icon");
			if (icon) {
				var icon_pos = this.iconPosition || this._getCSSStyleValue("iconPosition");
				var icon_size;
				if (w !== undefined && h !== undefined) {
					icon_size = {
						width : w, 
						height : h
					};
				}
				else {
					icon_size = nexacro._getImageSize(icon.url, this._on_icon_onload, this, this._view ? this._view._getRefFormBaseUrl() : undefined, icon.value) || {
						width : 0, 
						height : 0
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
			}

			return [total_w, total_h];
		}

		return [this._adjust_width, this._adjust_height];
	};

	nexacro._CellCheckboxControl = function (id, left, top, width, height, parent, controlmode) {
		nexacro._CellCheckboxControlBase.call(this, id, left, top, width, height, parent);
		this._controlmode = (controlmode) ? true : false;
	};

	var _pCellCheckbox = nexacro._createPrototype(nexacro._CellCheckboxControlBase, nexacro._CellCheckboxControl);
	nexacro._CellCheckboxControl.prototype = _pCellCheckbox;

	_pCellCheckbox.on_fire_onclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		if (!this._is_alive) {
			return;
		}

		if (this._cellobj._isFakeCell()) {
			return false;
		}

		if (this._view && this._view.selectchangetype != "down") {
			if (nexacro._toBoolean(this._view.readonly) == false) {
				this._toggleCheck();
			}
		}

		return this._cellobj.on_fire_onclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key, "control");
	};

	_pCellCheckbox.on_fire_ondblclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		if (this._cellobj._isFakeCell()) {
			return false;
		}

		return this._cellobj.on_fire_ondblclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key, "control");
	};

	_pCellCheckbox._toggleCheck = function () {
		var cellobj = this._cellobj;
		var cellinfo = this._cellinfo;
		var view = this._view;
		var datarow = cellobj._getDataRow();
		var editType = cellinfo._getEdittype(datarow);

		if (view && (editType == "checkboxcontrol" || editType == "checkbox")) {
			var v = this._isChecked(this.value);

			if (v) {
				v = nexacro._isNull(this.falsevalue) ? 0 : this.falsevalue;
			}
			else {
				v = nexacro._isNull(this.truevalue) ? 1 : this.truevalue;
			}

			if (cellinfo.text._bindtype == 1) {
				view._dsEventOccured = true;
				var dataset = cellobj._getBindDataset();
				if (dataset && dataset.setColumn(datarow, cellinfo.text._bindexpr, v)) {
					v = cellinfo._getTextValueForDisp(datarow);
					this.set_value(v);
				}
				view._dsEventOccured = false;
			}
		}
	};

	_pCellCheckbox._getDisplayText = function () {
		if (this.parent) {
			return this.parent._getDisplayText();
		}

		return "";
	};

	_pCellCheckbox._getCurrentStyleAlign = function (noflush) {
		return this._cellobj._getCurrentStyleAlign(noflush);
	};

	nexacro._CellImageControl = function (id, left, top, width, height, parent) {
		nexacro._ImageAreaControl.call(this, id, left, top, width, height, null, null, null, null, null, null, parent);

		this.tabstop = false;
		this.imagewidth = 0;
		this.imageheight = 0;
		this._view = parent._view;
		this._cellinfo = parent._refinfo;
		this._cellobj = parent;
		this._img_elem = null;
		this._img_type = "url";
		this.accessibilityrole = "image";
	};

	var _pCellImage = nexacro._createPrototype(nexacro._ImageAreaControl, nexacro._CellImageControl);
	nexacro._CellImageControl.prototype = _pCellImage;

	_pCellImage.on_destroy_contents = function () {
		nexacro._ImageAreaControl.prototype.on_destroy_contents.call(this);
		this._view = null;
		this._cellinfo = null;
		this._cellobj = null;
	};

	_pCellImage.on_apply_text = function () {
		this.set_image(this._getDisplayText());
	};

	_pCellImage.on_fire_onclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		return this.parent.on_fire_onclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key, "cellimage");
	};

	_pCellImage.on_fire_user_ontouchstart = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		return this.parent.on_fire_user_ontouchstart(touchinfos, changedtouchinfos, this, from_refer_comp);
	};

	_pCellImage.on_fire_ondblclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
		return this.parent.on_fire_ondblclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, this, from_refer_comp, meta_key, "cellimage");
	};

	_pCellImage.on_fire_onsize = function (width, height) {
		if (this._complete) {
			this.__apply_text();
		}
		return nexacro._ImageAreaControl.prototype.on_fire_onsize.call(this, width, height);
	};

	_pCellImage._isEnable = function () {
		if (this._view && this._view._enable !== undefined) {
			return this._view._enable;
		}

		if (this.parent && this.parent._isEnable) {
			return this.parent._isEnable();
		}

		return true;
	};

	_pCellImage._getDisplayText = function () {
		if (this.parent) {
			return this.parent._getDisplayText();
		}

		return "";
	};

	_pCellImage._updateAll = function (onlycontents, breadonly) {
		this._cellinfo = this.parent._refinfo;

		if (breadonly !== undefined) {
			if (this.on_apply_readonly) {
				this.on_apply_readonly(breadonly);
			}
			else {
				this._changeStatus("readonly", breadonly);
			}
		}
		if (!onlycontents) {
			this._apply_status(this._oldstatus, this._status, this._olduserstatus, this._userstatus);
		}

		this._setProperty();
	};

	_pCellImage._setProperty = function (onlycontrolprop) {
		var cellinfo = this._cellinfo;
		var cellobj = this._cellobj;
		var datarow = cellobj._getDataRow();

		if (!onlycontrolprop) {
			this.on_apply_text();
		}

		cellinfo._setCellChildControlProperty("image", this, datarow);
	};

	_pCellImage._adjustAlign = function (halign, valign) {
		if (!halign) {
			halign = "center";
		}
		if (!valign) {
			valign = "middle";
		}

		this.set_imagealign(halign + " " + valign);
		this._updateElementPositions();
	};

	_pCellImage._setAccessibilityStatFocus = function () {
		var cellobj = this._cellobj;
		this._control_element.setElementAccessibilityLabel(cellobj._getAccessibilityLabel());
		this._control_element.setElementAccessibilityAction(cellobj.accessibilityaction);
		this._control_element.setElementAccessibilityDescription(cellobj.accessibilitydescription);
		this._control_element.setElementAccessibilityParentLabel(cellobj._getAccessibilityMakeAddLabel().trim());

		nexacro.Component.prototype._setAccessibilityStatFocus.call(this);
	};

	_pCellImage.on_get_accessibility_description = function () {
		if (this._cellobj) {
			var tooltiptext = this._cellobj.tooltiptext;
			return nexacro._isNull(tooltiptext) ? "" : tooltiptext;
		}
		return "";
	};

	_pCellImage.on_get_accessibility_label = function () {
		return this.text;
	};

	_pCellImage._getComputedStyle = function () {
		var ctrl_cs = {
			"styles" : null
		};
		return ctrl_cs;
	};

	_pCellImage._setComputedStyle = function (ctrl_cs) {
	};

	_pCellImage._getCurrentStyleAlign = function (noflush) {
		return this._cellobj._getCurrentStyleAlign(noflush);
	};

	nexacro._CellTreeControl = function (id, left, top, width, height, right, bottom, parent) {
		nexacro.Component.call(this, id, left, top, width, height, right, bottom, null, null, null, null, parent);
		this.tabstop = false;
		this._view = parent._view;
		this._cellinfo = parent._refinfo;
		this._cellobj = parent;
		this._leftline_ctrls = [];
		this._btnimg_ctrl = null;
		this._chk_ctrl = null;
		this._img_ctrl = null;
		this._text_ctrl = null;
		this._displaytext = "";
		this._upline_ctrl = null;
		this._downline_ctrl = null;
		this._clicktarget = null;
		this._checkboxObj = "_CellCheckboxControlBase";
	};

	var _pCellTree = nexacro._createPrototype(nexacro.Component, nexacro._CellTreeControl);
	nexacro._CellTreeControl.prototype = _pCellTree;
	_pCellTree._is_subcontrol = true;
	_pCellTree._type_name = "CellTreeItemControl";

	_pCellTree._apply_setfocus = function (evt_name) {
	};

	_pCellTree.on_create_contents = function () {
		this._createLines(true);
		this._createCheckbox(true);
		this._createImage(true);
		this._createButton(true);
		this._createText(true);
	};

	_pCellTree._createLines = function (bCreateOnly) {
		if (!this._view || !this._view.treeuseline) {
			return;
		}

		if (!this._rightline_ctrl) {
			this._rightline_ctrl = new nexacro._CellTreeLineControl("treerightline", 0, 0, 0, 0, null, null, this.parent);
			this._childctrl_setevent(this._rightline_ctrl);
			this._rightline_ctrl.createComponent(bCreateOnly);
		}
		if (!this._upline_ctrl) {
			this._upline_ctrl = new nexacro._CellTreeLineControl("treeupline", 0, 0, 0, 0, null, null, this.parent);
			this._childctrl_setevent(this._upline_ctrl);
			this._upline_ctrl.createComponent(bCreateOnly);
		}
		if (!this._downline_ctrl) {
			this._downline_ctrl = new nexacro._CellTreeLineControl("treedownline", 0, 0, 0, 0, null, null, this.parent);
			this._childctrl_setevent(this._downline_ctrl);
			this._downline_ctrl.createComponent(bCreateOnly);
		}
	};

	_pCellTree._createCheckbox = function (bCreateOnly) {
		if (!this._view && !this._view.treeusecheckbox) {
			return;
		}

		if (!this._chk_ctrl) {
			this._chk_ctrl = new nexacro[this._checkboxObj]("treeitemcheckbox", 0, 0, 0, 0, this);
			this._childctrl_setevent(this._chk_ctrl);
			this._chk_ctrl._getCheckValue = function () {
				var cellinfo = this._cellinfo;
				var cellobj = this._cellobj;
				var datarow = cellobj._getDataRow();

				if (cellinfo.treecheck._bindtype > 0) {
					return cellinfo._getAttrValue(cellinfo.treecheck, datarow);
				}
				else {
					return this._view._treeChecked[datarow];
				}
			};
			if (nexacro._enableaccessibility) {
				this._chk_ctrl.accessibilityenable = false;
			}
			this._chk_ctrl.createComponent(bCreateOnly);
		}
	};

	_pCellTree._createImage = function (bCreateOnly) {
		if (!this._view || !this._view.treeuseimage) {
			return;
		}

		if (!this._img_ctrl) {
			this._img_ctrl = new nexacro._TreeItemIconControl("treeitemimage", 0, 0, 0, 0, null, null, this);
			this._childctrl_setevent(this._img_ctrl);

			if (nexacro._enableaccessibility) {
				this._img_ctrl.accessibilityenable = false;
			}

			this._img_ctrl.createComponent(bCreateOnly);
		}
	};

	_pCellTree._createButton = function (bCreateOnly) {
		this._btnimg_ctrl = new nexacro._TreeItemIconControl("treeitembutton", 0, 0, 0, 0, null, null, this);
		this._childctrl_setevent(this._btnimg_ctrl);

		if (nexacro._enableaccessibility) {
			this._btnimg_ctrl.accessibilityenable = false;
		}

		this._btnimg_ctrl.createComponent(bCreateOnly);
	};

	_pCellTree._createText = function (bCreateOnly) {
		this._text_ctrl = new nexacro._TreeItemTextControl("treeitemtext", 0, 0, 0, 0, null, null, null, null, null, null, this);
		this._text_ctrl._setControl();
		this._childctrl_setevent(this._text_ctrl);
		this._text_ctrl.createComponent(bCreateOnly);
	};

	_pCellTree._childctrl_setevent = function (obj) {
		obj.on_fire_onclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
			var clickitem = this.id;

			if (clickitem == "treeitemtext" || clickitem == "treeitemimage") {
				clickitem = "";
			}

			return this.parent.on_fire_onclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key, clickitem);
		};

		obj.on_fire_ondblclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key) {
			var clickitem = this.id;

			if (clickitem == "treeitemtext" || clickitem == "treeitemimage") {
				clickitem = "";
			}

			return this.parent.on_fire_ondblclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key, clickitem);
		};

		obj._on_last_lbuttonup = function () {
			return this.parent._on_last_lbuttonup();
		};
	};

	_pCellTree.on_created_contents = function (win) {
		var leftlines = this._leftline_ctrls;

		for (var i = 0, n = leftlines.length; i < n; i++) {
			leftlines[i].on_created(win);
		}

		if (this._rightline_ctrl) {
			this._rightline_ctrl.on_created(win);
		}

		if (this._upline_ctrl) {
			this._upline_ctrl.on_created(win);
		}

		if (this._downline_ctrl) {
			this._downline_ctrl.on_created(win);
		}

		if (this._btnimg_ctrl) {
			this._btnimg_ctrl.on_created(win);
		}

		if (this._chk_ctrl) {
			this._chk_ctrl.on_created(win);
		}

		if (this._img_ctrl) {
			this._img_ctrl.on_created(win);
		}

		if (this._text_ctrl) {
			this._text_ctrl.on_created(win);
		}

		this._is_created = true;
	};

	_pCellTree.on_attach_contents_handle = _pCellTree.on_created_contents;

	_pCellTree.on_destroy_contents = function () {
		var leftlines = this._leftline_ctrls;

		for (var i = 0, n = leftlines.length; i < n; i++) {
			leftlines[i].destroy();
		}

		this._leftline_ctrls = null;

		if (this._rightline_ctrl) {
			this._rightline_ctrl.destroy();
			this._rightline_ctrl = null;
		}
		if (this._upline_ctrl) {
			this._upline_ctrl.destroy();
			this._upline_ctrl = null;
		}
		if (this._downline_ctrl) {
			this._downline_ctrl.destroy();
			this._downline_ctrl = null;
		}
		if (this._btnimg_ctrl) {
			this._btnimg_ctrl.destroy();
			this._btnimg_ctrl = null;
		}
		if (this._chk_ctrl) {
			this._chk_ctrl.destroy();
			this._chk_ctrl = null;
		}
		if (this._img_ctrl) {
			this._img_ctrl.destroy();
			this._img_ctrl = null;
		}
		if (this._text_ctrl) {
			this._text_ctrl.destroy();
			this._text_ctrl = null;
		}

		this._clicktarget = null;
		this._view = null;
		this._cellinfo = null;
		this._cellobj = null;
	};

	_pCellTree.on_apply_text = function () {
		var text_ctrl = this._text_ctrl;

		if (text_ctrl) {
			text_ctrl.set_text(this._displaytext);
		}
	};

	_pCellTree.on_fire_ondblclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key, clickitem) {
		return this._cellobj.on_fire_ondblclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key, clickitem);
	};

	_pCellTree.on_fire_onclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key, clickitem) {
		return this._cellobj.on_fire_onclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, meta_key, clickitem);
	};

	_pCellTree._isEditTypeTree = function () {
		var cellobj = this._cellobj;
		var cellinfo = this._cellinfo;
		var datarow = cellobj._getDataRow();
		var editType = cellinfo._getEdittype(datarow);

		return (editType == "tree");
	};

	_pCellTree._getLineHeight = function () {
		var height = this.parent._adjust_height;
		var border = this.parent._getCurrentStyleBorder();
		var bordbottom = (border) ? border.bottom._width : 0;
		return height - bordbottom;
	};

	_pCellTree._isEnable = function () {
		if (this._view && this._view._enable !== undefined) {
			return this._view._enable;
		}

		if (this.parent && this.parent._isEnable) {
			return this.parent._isEnable();
		}

		return true;
	};

	_pCellTree._load_image = function (img_ctrl, image) {
		var val = (image) ? image.toString() : null;

		if (this._control_element && val) {
			if (val != "none") {
				val = nexacro._getURIValue(val);
				val = nexacro._getImageLocation(val, this._getRefFormBaseUrl());
				img_ctrl._load_url = val;

				var size = nexacro._getImageSize(val, this._on_loadImage, this, this._getRefFormBaseUrl(), image.value);

				if (size) {
					this._on_loadImage(val, size.width, size.height);
				}
			}
		}
	};

	_pCellTree._on_loadImage = function (url, imgW, imgH) {
		var adjust = false;
		var width, height;
		if (this._btnimg_ctrl && this._btnimg_ctrl._load_url == url) {
			width = this._btnimg_ctrl._adjust_width;
			height = this._btnimg_ctrl._adjust_height;

			if (width != imgW || height != imgH) {
				adjust = true;
				this._btnimg_ctrl.move(this._btnimg_ctrl._adjust_left, this._btnimg_ctrl._adjust_top, imgW, imgH);
			}
		}

		if (this._img_ctrl && this._img_ctrl._load_url == url) {
			width = this._img_ctrl._adjust_width;
			height = this._img_ctrl._adjust_height;

			if (width != imgW || height != imgH) {
				adjust = true;
				this._img_ctrl.move(this._img_ctrl._adjust_left, this._img_ctrl._adjust_top, imgW, imgH);
			}
		}

		if (adjust) {
			this._adjustSubCompAlign(this._lvl);
		}
	};

	_pCellTree._changeTreeStatus = function (changestatus, value) {
		this._userstatus = changestatus;

		if (this._img_ctrl) {
			this._img_ctrl._changeUserStatus(changestatus, value);
		}

		if (changestatus != "leaf" && this._btnimg_ctrl) {
			this._btnimg_ctrl._changeUserStatus(changestatus, value);
		}
	};

	_pCellTree._buttonUpdate = function (state) {
		var view = this._view;
		if (view && view.treeusebutton != this._treeusebutton) {
			if (view.treeusebutton == "use") {
				this._btnimg_ctrl.set_visible(true);
			}
			else {
				this._btnimg_ctrl.set_visible(false);
			}

			this._treeusebutton = view.treeusebutton;
		}

		var val;

		if (state == 2 || state == 3 || state == -1) {
			val = this._btnimg_ctrl._getCSSStyleValue("icon", "expand");

			this._load_image(this._btnimg_ctrl, val);
			this._btnimg_ctrl.set_visible(false);
			this._btnimg_ctrl._tmpw = this._btnimg_ctrl.width;
			this._btnimg_ctrl._tmph = this._btnimg_ctrl.height;
			this._btnimg_ctrl.move(this._btnimg_ctrl._adjust_left, this._btnimg_ctrl._adjust_top, 0, 0);
		}
		else {
			val = this._btnimg_ctrl._getCSSStyleValue("icon", this._userstatus);
			this._load_image(this._btnimg_ctrl, val);
		}
	};

	_pCellTree._checkUpdate = function (check) {
		var view = this._view;
		if (view && view.treeusecheckbox != this._treeusecheckbox) {
			if (this._chk_ctrl) {
				this._chk_ctrl.set_visible(view.treeusecheckbox);
			}
			else {
				this._createCheckbox();
			}

			this._treeusecheckbox = view.treeusecheckbox;
		}

		if (view) {
			this._chk_ctrl._changeStatus("readonly", view.readonly);
		}

		if (this._chk_ctrl) {
			this._chk_ctrl.set_value(check);
			this._chk_ctrl._adjustAlign();
		}
	};

	_pCellTree._imageUpdate = function (state) {
		var view = this._view;
		if (view && view.treeuseimage != this._treeuseimage) {
			if (this._img_ctrl) {
				this._img_ctrl.set_visible(view.treeuseimage);
			}
			else {
				this._createImage();
			}

			this._treeuseimage = view.treeuseimage;
		}

		if (this._img_ctrl) {
			var val = this._img_ctrl._getCSSStyleValue("icon", this._userstatus);

			this._load_image(this._img_ctrl, val);

			if (val && val != "none") {
				this._img_ctrl.set_visible(view ? view.treeuseimage : true);
			}
			else {
				this._img_ctrl.set_visible(false);
			}
		}

		this._adjustSubCompAlign(this._lvl);
	};

	_pCellTree._lineUpdate = function (rowidx, level) {
		var view = this._view;

		if (view && view.treeuseline != this._treeuseline) {
			this._createLines();

			if (this._rightline_ctrl) {
				this._rightline_ctrl.set_visible(view.treeuseline);
			}

			if (this._upline_ctrl) {
				this._upline_ctrl.set_visible(view.treeuseline);
			}

			if (this._downline_ctrl) {
				this._downline_ctrl.set_visible(view.treeuseline);
			}

			this._treeuseline = view.treeuseline;
		}

		var startlevel = this._cellinfo._getTreeStartLevel(rowidx);
		var bExistNextNode = (view && view._hasSameNextNode[rowidx]) ? view._hasSameNextNode[rowidx][1] : false;
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

	_pCellTree._createLeftLine = function (rowidx) {
		var view = this._view;
		var i;

		if (!view || !view.treeuseline) {
			var n = this._leftline_ctrls.length;
			for (i = 0; i < n; i++) {
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

		while (view._rootlevel < parentlevel) {
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

	_pCellTree._toggleItem = function (bHide, state) {
		var view = this._view;

		if (!view || bHide) {
			if (this._btnimg_ctrl) {
				this._btnimg_ctrl.set_visible(false);
			}
			if (this._rightline_ctrl) {
				this._rightline_ctrl.set_visible(false);
			}
			if (this._upline_ctrl) {
				this._upline_ctrl.set_visible(false);
			}
			if (this._downline_ctrl) {
				this._downline_ctrl.set_visible(false);
			}
			if (this._chk_ctrl) {
				this._chk_ctrl.set_visible(false);
			}
			if (this._img_ctrl) {
				this._img_ctrl.set_visible(false);
			}
			if (this._text_ctrl) {
				this._text_ctrl.set_visible(false);
			}
		}
		else {
			if (view.treeusebutton == "use") {
				this._btnimg_ctrl.set_visible(true);
			}
			else {
				this._btnimg_ctrl.set_visible(false);
			}

			if (state == 2 || state == 3 || state == -1) {
				this._btnimg_ctrl.set_visible(false);
				this._btnimg_ctrl.move(this._btnimg_ctrl._adjust_left, this._btnimg_ctrl._adjust_top, 0, 0);
			}

			if (this._rightline_ctrl) {
				this._rightline_ctrl.set_visible(view.treeuseline);
			}
			if (this._upline_ctrl) {
				this._upline_ctrl.set_visible(view.treeuseline);
			}
			if (this._downline_ctrl) {
				this._downline_ctrl.set_visible(view.treeuseline);
			}
			if (this._chk_ctrl) {
				this._chk_ctrl.set_visible(view.treeusecheckbox);
			}
			if (this._img_ctrl) {
				this._img_ctrl.set_visible(view.treeuseimage);
			}
			if (this._text_ctrl) {
				this._text_ctrl.set_visible(true);
			}
		}
	};

	_pCellTree.on_apply_prop_tooltip = function () {
		var datarow = this._cellobj._getDataRow();

		this.tooltiptext = this._cellinfo._getTooltipText(datarow);
		this.tooltiptype = this._cellinfo.tooltiptype;

		nexacro.Component.prototype.on_apply_prop_tooltip.call(this);
	};

	_pCellTree._treeline_visible = function (v) {
		var i;
		var n = this._leftline_ctrls.length;
		if (v) {
			for (i = 0; i < n; i++) {
				this._leftline_ctrls[i]._control_element.setElementVisible(this._leftline_ctrls[i].visible);
			}

			if (this._rightline_ctrl) {
				this._rightline_ctrl._control_element.setElementVisible(this._rightline_ctrl.visible);
			}
			if (this._upline_ctrl) {
				this._upline_ctrl._control_element.setElementVisible(this._upline_ctrl.visible);
			}
			if (this._downline_ctrl) {
				this._downline_ctrl._control_element.setElementVisible(this._downline_ctrl.visible);
			}
		}
		else {
			for (i = 0; i < n; i++) {
				this._leftline_ctrls[i]._control_element.setElementVisible(false);
			}

			if (this._rightline_ctrl) {
				this._rightline_ctrl._control_element.setElementVisible(false);
			}
			if (this._upline_ctrl) {
				this._upline_ctrl._control_element.setElementVisible(false);
			}
			if (this._downline_ctrl) {
				this._downline_ctrl._control_element.setElementVisible(false);
			}
		}
	};

	_pCellTree.on_apply_prop_cssclass = function () {
		if (this._chk_ctrl) {
			this._chk_ctrl.on_apply_cssclass();
		}
		if (this._img_ctrl) {
			this._img_ctrl.on_apply_cssclass();
		}
		if (this._text_ctrl) {
			this._text_ctrl.on_apply_cssclass();
		}
		if (this._btnimg_ctrl) {
			this._btnimg_ctrl.on_apply_cssclass();
		}
	};

	_pCellTree.on_apply_prop_enable = function (v) {
		if (this._chk_ctrl) {
			this._chk_ctrl._apply_status(this._oldstatus, this._status, this._olduserstatus, this._userstatus);
		}
		if (this._img_ctrl) {
			this._img_ctrl._apply_status(this._oldstatus, this._status, this._olduserstatus, this._userstatus);
		}
		if (this._text_ctrl) {
			this._text_ctrl._apply_status(this._oldstatus, this._status, this._olduserstatus, this._userstatus);
		}
		if (this._btnimg_ctrl) {
			this._btnimg_ctrl._apply_status(this._oldstatus, this._status, this._olduserstatus, this._userstatus);
		}
	};

	_pCellTree.on_apply_prop_rtl = function () {
		nexacro.Component.prototype.on_apply_prop_rtl.call(this);

		if (this._chk_ctrl) {
			this._chk_ctrl.set_rtl(this.rtl);
		}
		if (this._img_ctrl) {
			this._img_ctrl.set_rtl(this.rtl);
		}
		if (this._text_ctrl) {
			this._text_ctrl.set_rtl(this.rtl);
		}
		if (this._btnimg_ctrl) {
			this._btnimg_ctrl.set_rtl(this.rtl);
		}
	};

	_pCellTree._updateAll = function (onlycontents, breadonly) {
		this._cellinfo = this.parent._refinfo;

		if (this._control_element) {
			if (breadonly !== undefined) {
				if (this.on_apply_readonly) {
					this.on_apply_readonly(breadonly);
				}
				else {
					this._changeStatus("readonly", breadonly);
				}
			}
			var view = this._view;
			var cellobj = this._cellobj;
			var rowidx = cellobj._getDataRow();
			var stats = 1;
			var check = 0;
			var level = 0;

			if (view && !cellobj._isFakeCell()) {
				stats = view._getTreeStats(rowidx);
				check = view._getTreeCheck(rowidx);
				level = view._getTreeLevel ? view._getTreeLevel(rowidx) : this._cellinfo._getTreeLevel(rowidx);
			}

			if (rowidx == null || rowidx == -9) {
				this._toggleItem(true, stats);
				return;
			}
			else {
				this._toggleItem(false, stats);
			}

			if (!onlycontents) {
				this._apply_status(cellobj._oldstatus, cellobj._status, cellobj._olduserstatus, cellobj._userstatus);
			}

			this._lvl = level;

			if (stats == 0) {
				this._changeTreeStatus("collapse", true);
			}
			else if (stats == 1) {
				this._changeTreeStatus("expand", true);
			}
			else if (stats >= 2) {
				this._changeTreeStatus("leaf", true);
			}

			this._buttonUpdate(stats);
			this._lineUpdate(rowidx, level);
			this._checkUpdate(check);
			this._imageUpdate(stats);

			var txt = this.parent._getDisplayText();
			if (this._displaytext != txt) {
				this._text_ctrl.set_text(txt);
				this._displaytext = txt;
			}

			this.on_apply_prop_tooltip();
			this._adjustSubCompAlign(level);
		}
	};

	_pCellTree._getCurrentStyleAlign = function (noflush) {
		var align = {
			textAlign : "center", 
			verticalAlign : "middle"
		};

		if (this._text_ctrl && this._text_ctrl._cell_elem) {
			align = this._text_ctrl._cell_elem._getComputedStyleAlign(noflush);
		}

		return align;
	};

	_pCellTree._adjustSubCompAlign = function (level) {
		var cellobj = this.parent;
		var cellinfo = this._cellinfo;
		var rect = cellobj._getControlRect();

		var width = rect.width;
		var height = rect.height;
		var datarow = cellobj._getDataRow();
		var start = cellinfo._getTreeStartLevel(datarow);
		var defaultsize = 9;
		var gap = 16;
		var parentlevel = level - 1;

		level -= start;

		if (level < 0) {
			level = 0;
		}

		var line_adjust_top = cellobj._adjust_top;
		var padding = cellobj._getCurrentStylePadding();
		var line_adjust_left = ((padding) ? padding.left : 0);
		var parentheight = this._getLineHeight();
		var offset = (level *  gap) + defaultsize;
		var lineleft = offset;
		var linetop = line_adjust_top;
		var linewidth = 0;
		var halfheight = (parentheight / 2);
		var lineheight = halfheight;
		var left_lines = this._leftline_ctrls;
		var left_lines_len = left_lines.length;
		var j = 0;
		var elem;

		for (var i = 0; j < left_lines_len; i++) {
			if (parentlevel == left_lines[j]._depth) {
				elem = left_lines[j++]._control_element;
				elem.setElementPosition(offset - (gap *  (i + 1)) + line_adjust_left, linetop);
			}

			if (parentlevel-- < 0) {
				break;
			}
		}

		var line_button_gap_width = 0;
		var line_button_gap_height = 0;

		if (this._btnimg_ctrl) {
			var buttonWidth = this._btnimg_ctrl.width;

			if (buttonWidth <= 0 && this._btnimg_ctrl._tmpw) {
				buttonWidth = this._btnimg_ctrl._tmpw;
			}

			var buttonHeight = this._btnimg_ctrl.height;

			if (buttonHeight <= 0 && this._btnimg_ctrl._tmph) {
				buttonHeight = this._btnimg_ctrl._tmph;
			}

			var buttonLeft = offset - (buttonWidth / 2);

			if (buttonLeft < 0) {
				buttonLeft = offset - (defaultsize / 2);
			}

			if (!this._rightline_ctrl || !this._rightline_ctrl.visible) {
				buttonLeft -= ((buttonWidth / 2) *  level);
			}

			var buttonTop = ((height - buttonHeight) / 2);



			if (this._btnimg_ctrl.visible) {
				lineheight = ((parentheight - buttonHeight) / 2);
				line_button_gap_width = buttonWidth;
				line_button_gap_height = buttonHeight;
				offset = buttonLeft + buttonWidth;
			}
			else {
				if (!this._view.treeuseline) {
					offset = buttonLeft + buttonWidth;
				}
			}


			linewidth = buttonWidth;
			this._btnimg_ctrl.move(buttonLeft, buttonTop, buttonWidth, buttonHeight);
		}
		else {
			linewidth = defaultsize;
		}

		if (this._rightline_ctrl && this._rightline_ctrl.visible) {
			this._rightline_ctrl.move(offset + line_adjust_left, linetop, linewidth - (line_button_gap_width / 2), halfheight);
			offset = this._rightline_ctrl.left + this._rightline_ctrl.width - line_adjust_left;
		}
		else {
			offset += 1;
		}

		if (this._upline_ctrl && this._upline_ctrl.visible) {
			this._upline_ctrl.move(lineleft + line_adjust_left, linetop, linewidth, lineheight);
		}

		if (this._downline_ctrl && this._downline_ctrl.visible) {
			linetop = line_adjust_top + lineheight + line_button_gap_height;

			var b = lineheight + linetop;
			var pb = parentheight + line_adjust_top;

			if (b > pb) {
				lineheight = pb - linetop;
			}

			this._downline_ctrl.move(lineleft + line_adjust_left, linetop, linewidth, lineheight);
		}

		if (this._chk_ctrl && this._chk_ctrl.visible) {
			var checkWidth = this._chk_ctrl.width;
			var checkHeight = this._chk_ctrl.height;
			var checkLeft = offset;
			var checkTop = ((height - checkHeight) / 2);

			offset += checkWidth;
			this._chk_ctrl.move(checkLeft, checkTop, checkWidth, checkHeight);
		}

		if (this._img_ctrl && this._img_ctrl.visible) {
			offset += 1;

			var imageWidth = this._img_ctrl._adjust_width;
			var imageHeight = this._img_ctrl._adjust_height;
			var imageLeft = null;
			var imageTop = null;

			if (imageWidth > 0 && imageHeight > 0) {
				imageLeft = offset;
				imageTop = ((height - imageHeight) / 2);

				offset += imageWidth;
			}
			else {
			}

			this._img_ctrl.move(imageLeft, imageTop, imageWidth, imageHeight);

			offset += 5;
		}
		else {
			offset += 4;
		}

		if (this._text_ctrl) {
			this._text_ctrl.move(offset, 0, width - offset, height);
		}
	};

	_pCellTree._setAlign = function (halign, valign) {
		if (halign) {
			this._text_ctrl.set_textAlign(halign);
		}
		if (valign) {
			this._text_ctrl.set_verticalAlign(valign);
		}
	};

	if (nexacro._Browser == "Runtime") {
		_pCellTree.on_change_containerRect = function (width, height) {
			if (this._lvl || this._isRtl()) {
				this._adjustSubCompAlign(this._lvl);
			}
		};
	}
	else {
		_pCellTree.on_change_containerRect = function (width, height) {
			if (this._lvl) {
				this._adjustSubCompAlign(this._lvl);
			}
		};
	}

	_pCellTree._setAccessibilityStatFocus = function (evt_name) {
		var cellobj = this._cellobj;
		var label = cellobj._getCellAccessibilityLabel();
		label = label.trim();
		this._setAccessibilityLabel(label);

		var datarow = cellobj._getDataRow();
		var level = this._cellinfo._getTreeLevel(datarow);
		var startlevel = this._cellinfo._getTreeStartLevel(datarow);

		if (cellobj._getTreeStatus() == 0) {
			if (this._text_ctrl) {
				this._text_ctrl._setAccessibilityStatExpanded(false);
			}
		}
		else {
			if (this._text_ctrl) {
				this._text_ctrl._setAccessibilityStatExpanded(true);
			}
		}

		this._setAccessibilityInfoLevel(level - startlevel + 1);
		nexacro.Component.prototype._setAccessibilityStatFocus.call(this, evt_name);
	};

	_pCellTree.on_get_accessibility_description = function () {
		if (this._cellobj) {
			var tooltiptext = this._cellobj.tooltiptext;
			return nexacro._isNull(tooltiptext) ? "" : tooltiptext;
		}
		return "";
	};

	_pCellTree._getComputedStyle = function () {
		var ctrl_cs = {
			"styles" : null
		};

		return ctrl_cs;
	};

	_pCellTree._setComputedStyle = function (ctrl_cs) {
	};

	nexacro._TreeItemIconControl = function (id, left, top, width, height, right, bottom, parent) {
		nexacro._Icon.call(this, id, left, top, width, height, right, bottom, null, null, null, null, parent);
	};

	var _pTreeItemIcon = nexacro._createPrototype(nexacro._Icon, nexacro._TreeItemIconControl);
	nexacro._TreeItemIconControl.prototype = _pTreeItemIcon;
	_pTreeItemIcon._is_subcontrol = true;
	_pTreeItemIcon._type_name = "TreeItemIconControl";

	_pTreeItemIcon.on_changeUserStatus = function (changestatus, value, applyuserstatus, currentstatus, currentuserstatus) {
		return changestatus;
	};
	nexacro._TreeItemTextControl = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent) {
		nexacro.Static.call(this, id, left, top, width, height, right, bottom, null, null, null, null, parent);
	};
	var _pTreeItemTextControl = nexacro._createPrototype(nexacro.Static, nexacro._TreeItemTextControl);
	nexacro._TreeItemTextControl.prototype = _pTreeItemTextControl;

	nexacro._CellTreeLineControl = function (id, left, top, width, height, right, bottom, parent) {
		nexacro.Component.call(this, id, left, top, width, height, right, bottom, null, null, null, null, parent);

		this.tabstop = false;
		this._is_simple_control = true;
		this._is_nc_control = true;
		this._view = parent._view;
		this._depth = -1;
		this._showleft = false;
		this._showbottom = false;
	};

	var _pCellTreeLine = nexacro._createPrototype(nexacro.Component, nexacro._CellTreeLineControl);
	nexacro._CellTreeLineControl.prototype = _pCellTreeLine;
	_pCellTreeLine._is_subcontrol = true;
	_pCellTreeLine._type_name = "CellTreeLineControl";

	_pCellTreeLine.on_destroy_contents = function () {
		this._view = null;
	};

	_pCellTreeLine._isEnable = function () {
		if (this._view && this._view._enable !== undefined) {
			return this._view._enable;
		}

		if (this.parent && this.parent._isEnable) {
			return this.parent._isEnable();
		}

		return true;
	};

	_pCellTreeLine._set_line = function (left, bottom) {
		var control_elem = this._control_element;
		if (control_elem) {
			this._showleft = left;
			this._showbottom = bottom;
			this._apply_status(this._oldstatus, this._status, this._olduserstatus, this._userstatus);
		}
	};

	_pCellTreeLine._on_apply_status = function (oldstatus, status, olduserstatus, userstatus, apply, status_param, value_param, applycssstatus, applycssuserstatus) {
		nexacro.Component.prototype._on_apply_status.call(this, oldstatus, status, olduserstatus, userstatus, apply, status_param, value_param, applycssstatus, applycssuserstatus);

		var remove_l = false, remove_t = false, remove_r = false, remove_b = false;

		if (this.id == "treerightline") {
			remove_l = true;
			remove_r = true;
			remove_t = true;
		}
		else if (this.id == "treeleftline" || this.id == "treeupline" || "treedownline") {
			remove_r = true;
			remove_t = true;
			remove_b = true;
		}

		if (!this._showbottom) {
			remove_b = true;
		}
		if (!this._showleft) {
			remove_l = true;
		}

		this._control_element.setElementBorderNone(remove_l, remove_t, remove_r, remove_b);
	};

	_pCellTreeLine.on_getIDCSSSelector = function () {
		return "celltreeline";
	};

	delete _pCellControl;
	delete _pSubCellControl;
	delete _pCellExpand;
	delete _pCellButton;
	delete _pCellBar;
	delete _pCellEdit;
	delete _pCellTextArea;
	delete _pCellMaskEdit;
	delete _pCellCalendar;
	delete _pCellCombo;
	delete _pCellCheckboxBase;
	delete _pCellCheckbox;
	delete _pCellImage;
	delete _pCellTree;
	delete _pTreeItemIcon;
	delete _pTreeItemTextControl;
	delete _pCellTreeLine;
}
