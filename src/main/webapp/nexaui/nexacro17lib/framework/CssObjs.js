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


if (!nexacro._bInitCssObjects) {
	"use strict";

	var _process = true;
	nexacro._bInitCssObjects = true;

	nexacro._CSSValueObject = function (v) {
		var val = v.trim();
		if (val) {
			this.value = val;
			var pos = val.search(/px|pt|cm|em|%/i);
			if (pos < 0) {
				return null;
			}
			this._unit = val.substr(pos).toLowerCase();
			var size = (+val.substring(0, pos));
			if (size != size) {
				return null;
			}
			this._sysvalue = size;
		}
	};

	var _pCSSValueObject = nexacro._createPrototype(nexacro.Object, nexacro._CSSValueObject);
	nexacro._CSSValueObject.prototype = _pCSSValueObject;
	_pCSSValueObject._type_name = "CSSValueObject";

	_pCSSValueObject.value = "";
	_pCSSValueObject._value = 0;
	_pCSSValueObject._unit = "";

	_pCSSValueObject.valueOf = function () {
		return this.value;
	};
	_pCSSValueObject.toString = function () {
		return this.value;
	};

	nexacro._CSSValueObject_caches = {
	};
	nexacro.CSSValueObject = function (val) {
		var obj = nexacro._CSSValueObject_caches[val];
		if (obj) {
			return obj;
		}
		obj = new nexacro._CSSValueObject(val);
		nexacro._CSSValueObject_caches[val] = obj;

		return obj;
	};


	nexacro._ColorObject = function (v) {
		if (v && (typeof (v) == "string")) {
			var val = v.trim();
			if (val) {
				this.value = val;
				this._sysvalue = nexacro._getSupportedWebColor(val);
			}
		}
	};

	var _pColorObject = nexacro._createPrototype(nexacro.Object, nexacro._ColorObject);
	nexacro._ColorObject.prototype = _pColorObject;
	_pColorObject._type_name = "ColorObject";

	_pColorObject.value = "";
	_pColorObject._sysvalue = "";

	_pColorObject.valueOf = function () {
		return this.value;
	};
	_pColorObject.toString = function () {
		return this.value;
	};

	nexacro._ColorObject_caches = {
	};
	nexacro.ColorObject = function (val) {
		var obj = nexacro._ColorObject_caches[val];
		if (obj) {
			return obj;
		}
		obj = new nexacro._ColorObject(val);
		nexacro._ColorObject_caches[val] = obj;
		return obj;
	};


	nexacro._FontObject = function (v) {
		if (v && (typeof (v) == "string")) {
			var val = v.trim();
			if (val) {
				this.value = val;
				this._sysvalue = val;

				var parts = val.split(/\s+/);
				var cnt = parts.length;

				if (cnt > 0) {
					var pos = -1;
					var part;
					while (part = parts.shift()) {
						pos = part.search(/px|pt|cm|em|%/i);
						if (pos > -1) {
							break;
						}
					}
					if (pos < 0) {
						return null;
					}

					var unit = part.substr(pos, 2);

					if (unit.charAt(1) == " " || unit.charAt(1) == "/") {
						unit = unit.substring(0, 1);
					}

					this._unit = unit.toLowerCase();

					var spos = part.lastIndexOf(' ', pos);
					var size = (+part.substring(spos + 1, pos));
					if (size != size) {
						return null;
					}
					this._size = size;

					pos = part.indexOf("/") + 1;
					if (pos > 0) {
						var line = part.substring(pos, part.length);
						var lpos = line.search(/px|pt|cm|em|%/i);
						if (lpos < 0) {
							return null;
						}

						var height = +line.substring(0, lpos);
						if (height != height) {
							return null;
						}

						this._lineheight = height;
						this._lineunit = line.substring(lpos, line.length);
					}
				}
			}
		}
	};

	var _pFontObject = nexacro._createPrototype(nexacro.Object, nexacro._FontObject);
	nexacro._FontObject.prototype = _pFontObject;
	_pFontObject._type_name = "FontObject";

	_pFontObject.value = "";
	_pFontObject._sysvalue = "";
	_pFontObject._size = "";
	_pFontObject._unit = "";
	_pFontObject._lineheight = "";
	_pFontObject._lineunit = "";

	_pFontObject.valueOf = function () {
		return this.value;
	};
	_pFontObject.toString = function () {
		return this.value;
	};
	_pFontObject._parseInfo = function (val) {
		var tempval = val;
		var _index = tempval.indexOf('"');
		if (_index >= 0) {
			var parse_val = "";
			for (var i = 0; i < tempval.length; i++) {
				var c = tempval.charAt(i);
				if (i > _index && c == " ") {
					c = "#";
				}

				parse_val += c;
			}

			tempval = parse_val;
		}

		var parts = tempval.split(/\s+/);
		var part;
		var faces = [], size = 0;
		var webfont_style = true;
		var types = [];
		var i, n;

		for (i = 0, n = parts.length; i < n && webfont_style; i++) {
			part = parts[i];
			switch (part) {
				case "bold":
					this._bold = true;
					types.push(part);
					break;
				case "italic":
					this._italic = true;
					types.push(part);
					break;
				case "underline":
					this._underline = true;
					types.push(part);
					break;
				case "strikeout":
					this._strikeout = true;
					types.push(part);
					break;
				case "antialias":
					this._antialias = true;
					types.push(part);
					break;
				case "normal":
					this._normal = true;
					types.push(part);
					break;
				default:
					{

						var intpart = parseInt(part);
						if (intpart != intpart) {
							if (size == 0) {
								webfont_style = false;
							}
							else {
								part = part.replace(/#/gi, " ");
								faces.push(part);
							}
						}
						else {
							var pos;
							if ((pos = part.indexOf("/")) >= 0) {
								pos++;
								var line = part.substring(pos, part.length);
								var lpos = line.search(/px|pt|cm|em|%/i);
								if (lpos >= 0) {
									this.lineheight = parseInt(line);
								}
							}
							size = intpart;
						}
					}
					break;
			}
		}

		if (webfont_style) {
			this.face = (faces.length > 0) ? faces.join(" ") : this._default_face;
			this.size = (size > 0) ? size : this._default_size;
		}
		else {
			parts = val.split(',');
			if (parts.length >= 2) {
				this.face = parts[0];
				types = [];

				this.size = (parseInt(parts[1]) | 0);
				if (parts[2]) {
					var parts0 = parts[2].split(/\s+/);

					for (i = 0, n = parts0.length; i < n; i++) {
						part = parts0[i];
						switch (part) {
							case "bold":
								this._bold = true;
								types.push(part);
								break;
							case "italic":
								this._italic = true;
								types.push(part);
								break;
							case "underline":
								this._underline = true;
								types.push(part);
								break;
							case "strikeout":
								this._strikeout = true;
								types.push(part);
								break;
							case "antialias":
								this._antialias = true;
								types.push(part);
								break;
							case "normal":
								this._normal = true;
								types.push(part);
								break;
						}
					}
				}
			}
		}
		this.type = types.join(",");
	};

	nexacro._FontObject_caches = {
	};
	nexacro.FontObject = function (val) {
		var obj = nexacro._FontObject_caches[val];
		if (obj) {
			return obj;
		}
		obj = new nexacro._FontObject(val);
		nexacro._FontObject_caches[val] = obj;

		return obj;
	};

	nexacro._TextDecorationObject = function (v) {
		if (v && (typeof (v) == "string")) {
			var val = v.trim();
			if (val) {
				this.value = val;
			}
		}
	};

	var _pTextDecorationObject = nexacro._createPrototype(nexacro.Object, nexacro._TextDecorationObject);
	nexacro._TextDecorationObject.prototype = _pTextDecorationObject;
	_pTextDecorationObject._type_name = "TextDecorationObject";

	_pTextDecorationObject.value = "";

	_pTextDecorationObject.valueOf = function () {
		return this.value;
	};
	_pTextDecorationObject.toString = function () {
		return this.value;
	};

	nexacro._TextDecorationObject_caches = {
	};
	nexacro.TextDecorationObject = function (val) {
		var obj = nexacro._TextDecorationObject_caches[val];
		if (obj) {
			return obj;
		}
		obj = new nexacro._TextDecorationObject(val);
		nexacro._TextDecorationObject_caches[val] = obj;
		return obj;
	};


	nexacro._BorderLineObject = function (v) {
		if (v && (typeof (v) == "string")) {
			var val = v.trim();
			if (val && val.indexOf("none") < 0 && val.indexOf("hidden") < 0) {
				this.style = "solid";
				this.value = val;
				this._width = 0;

				var parts = [];
				var cur_idx = 0;
				var next_idx = -1;

				var color_start_idx = -1;
				var color_end_idx = -1;

				var part;

				while (true) {
					color_start_idx = this._findColor(val, cur_idx);
					next_idx = val.indexOf(" ", cur_idx);

					if (color_start_idx > 0 && color_start_idx < next_idx) {
						color_end_idx = val.indexOf(")", color_start_idx);
						next_idx = val.indexOf(" ", color_end_idx);
					}

					if (next_idx > 0) {
						part = val.slice(cur_idx, next_idx);
						cur_idx = next_idx + 1;
					}
					else {
						part = val.slice(cur_idx);
						cur_idx = val.length + 1;
					}

					parts[parts.length] = part.trim();

					if (cur_idx >= val.length) {
						break;
					}
				}


				var cnt = parts.length;
				for (var i = 0; i < cnt; i++) {
					var str = parts[i];

					switch (str) {
						case "thin":
							if (this.style != "none") {
								this.width = str;
								this._width = 1;
							}
							break;
						case "medium":
							if (this.style != "none") {
								this.width = str;
								this._width = 3;
							}
							break;
						case "thick":
							if (this.style != "none") {
								this.width = str;
								this._width = 5;
							}
							break;
						case "solid":
						case "double":
						case "dotted":
						case "dashed":
						case "groove":
						case "ridge":
						case "inset":
						case "outset":
						case "hidden":
							this.style = str;
							break;
						default:
							if (str.charAt(0) >= '0' && str.charAt(0) <= '9') {
								var wv = parseInt(str);
								if (wv == 0) {
									this.value = "none";
									this.width = "";
									this._width = 0;
									this.style = "none";
									this.color = "";
									return;
								}
								this.width = wv + "px";
								this._width = wv;
							}
							else {
								if (!this.color) {
									this.color = nexacro.ColorObject(str);
								}
							}
							break;
					}
				}
			}
		}
	};

	var _pBorderLineObject = nexacro._createPrototype(nexacro.Object, nexacro._BorderLineObject);
	nexacro._BorderLineObject.prototype = _pBorderLineObject;
	_pBorderLineObject._type_name = "BorderLineObject";

	_pBorderLineObject.value = "none";
	_pBorderLineObject.width = "";
	_pBorderLineObject._width = 0;
	_pBorderLineObject.style = "none";
	_pBorderLineObject.color = "";
	_pBorderLineObject.rtlvalue = "none";

	_pBorderLineObject.valueOf = function () {
		return this.value;
	};
	_pBorderLineObject.toString = function () {
		return this.value;
	};

	_pBorderLineObject._findColor = function (str, idx) {
		if (!str) {
			return -1;
		}

		str = str.toLowerCase();

		var values = ["rgb", "rgba", "hsl", "hsla"];
		var len = values.length;
		var n = -1;
		for (var i = 0; i < len; i++) {
			n = str.indexOf(values[i], idx);
			if (n >= 0) {
				return n;
			}
		}

		return -1;
	};

	nexacro._BorderLineObject_caches = {
	};
	nexacro.BorderLineObject = function (val) {
		var obj = nexacro._BorderLineObject_caches[val];
		if (obj) {
			return obj;
		}
		obj = new nexacro._BorderLineObject(val);
		nexacro._BorderLineObject_caches[val] = obj;
		return obj;
	};


	nexacro._BorderRadiusObject = function (v) {
		if (v && (typeof (v) == "string")) {
			var val = v.trim();
			if (val) {
				this.value = val;

				var arr1 = val.split('/');
				var arr2;
				if (arr1.length == 1) {
					arr2 = arr1[0].split(' ');
					var arrtemp = [];
					switch (arr2.length) {
						case 4:
							arrtemp[0] = arr2[1];
							arrtemp[1] = arr2[0];
							arrtemp[2] = arr2[3];
							arrtemp[3] = arr2[2];
							break;
						case 3:
							arrtemp[0] = arr2[1];
							arrtemp[1] = arr2[0];
							arrtemp[2] = arr2[1];
							arrtemp[3] = arr2[2];
							break;
						case 2:
							arrtemp[0] = arr2[1];
							arrtemp[1] = arr2[0];
							break;
						default:
							arrtemp[0] = arr2[0];
							break;
					}
					this.rtlvalue = arrtemp.join(' ');
				}
				else if (arr1.length == 2) {
					arr2 = arr1[0].trim().split(' ');
					var arrtemp1 = [];
					switch (arr2.length) {
						case 4:
							arrtemp1[0] = arr2[1];
							arrtemp1[1] = arr2[0];
							arrtemp1[2] = arr2[3];
							arrtemp1[3] = arr2[2];
							break;
						case 3:
							arrtemp1[0] = arr2[1];
							arrtemp1[1] = arr2[0];
							arrtemp1[2] = arr2[1];
							arrtemp1[3] = arr2[2];
							break;
						case 2:
							arrtemp1[0] = arr2[1];
							arrtemp1[1] = arr2[0];
							break;
						default:
							arrtemp1[0] = arr2[0];
							break;
					}

					arr2 = arr1[1].trim().split(' ');
					var arrtemp2 = [];
					switch (arr2.length) {
						case 4:
							arrtemp2[0] = arr2[1];
							arrtemp2[1] = arr2[0];
							arrtemp2[2] = arr2[3];
							arrtemp2[3] = arr2[2];
							break;
						case 3:
							arrtemp2[0] = arr2[1];
							arrtemp2[1] = arr2[0];
							arrtemp2[2] = arr2[1];
							arrtemp2[3] = arr2[2];
							break;
						case 2:
							arrtemp2[0] = arr2[1];
							arrtemp2[1] = arr2[0];
							break;
						default:
							arrtemp2[0] = arr2[0];
							break;
					}
					this.rtlvalue = arrtemp1.join(' ') + " / " + arrtemp2.join(' ');
				}
			}
		}
	};

	var _pBorderRadiusObject = nexacro._createPrototype(nexacro.Object, nexacro._BorderRadiusObject);
	nexacro._BorderRadiusObject.prototype = _pBorderRadiusObject;
	_pBorderRadiusObject._type_name = "BorderRadiusObject";

	_pBorderRadiusObject.value = "";

	_pBorderRadiusObject.valueOf = function () {
		return this.value;
	};
	_pBorderRadiusObject.toString = function () {
		return this.value;
	};

	nexacro._BorderRadiusObject_caches = {
	};
	nexacro.BorderRadiusObject = function (val) {
		var obj = nexacro._BorderRadiusObject_caches[val];
		if (obj) {
			return obj;
		}
		obj = new nexacro._BorderRadiusObject(val);
		nexacro._BorderRadiusObject_caches[val] = obj;
		return obj;
	};


	nexacro._BorderObject = function (v) {
		if (v && (typeof (v) == "string") && v != "none") {
			var val = v.trim();
			if (val) {
				this.value = val;
				this.rtlvalue = val;
				var parts = [];
				var cur_idx = 0;
				var next_idx = -1;

				var color_start_idx = -1;
				var color_end_idx = -1;

				var part;


				while (true) {
					color_start_idx = this._findColor(val, cur_idx);
					next_idx = val.indexOf(",", cur_idx);

					if (color_start_idx > 0 && color_start_idx < next_idx) {
						color_end_idx = val.indexOf(")", color_start_idx);
						next_idx = val.indexOf(",", color_end_idx);
					}

					if (next_idx > 0) {
						part = val.slice(cur_idx, next_idx);
						cur_idx = next_idx + 1;
					}
					else {
						part = val.slice(cur_idx);
						cur_idx = val.length + 1;
					}

					parts[parts.length] = part.trim();

					if (cur_idx >= val.length) {
						break;
					}
				}

				var cnt = parts.length;
				switch (cnt) {
					case 1:
						this._single = true;
						this.top = this.right = this.bottom = this.left = nexacro.BorderLineObject(parts[0]);
						break;
					case 2:
						this._single = false;
						this.top = this.bottom = nexacro.BorderLineObject(parts[0]);
						this.left = this.right = nexacro.BorderLineObject(parts[1]);
						break;
					case 3:
						this._single = false;
						this.top = nexacro.BorderLineObject(parts[0]);
						this.left = this.right = nexacro.BorderLineObject(parts[1]);
						this.bottom = nexacro.BorderLineObject(parts[2]);
						break;
					case 4:
						this._single = false;
						this.top = nexacro.BorderLineObject(parts[0]);
						this.right = nexacro.BorderLineObject(parts[1]);
						this.bottom = nexacro.BorderLineObject(parts[2]);
						this.left = nexacro.BorderLineObject(parts[3]);

						var top = this.top;
						var right = this.right;
						var left = this.left;
						var bottom = this.bottom;

						if (top == "none") {
							top = "0px none";
						}
						if (right == "none") {
							right = "0px none";
						}
						if (left == "none") {
							left = "0px none";
						}
						if (bottom == "none") {
							bottom = "0px none";
						}

						this.rtlvalue = top + ", " + left + ", " + bottom + ", " + right;
						break;
				}
			}
		}
	};

	var _pBorderObject = nexacro._createPrototype(nexacro.Object, nexacro._BorderObject);
	nexacro._BorderObject.prototype = _pBorderObject;
	_pBorderObject._type_name = "BorderObject";

	_pBorderObject.value = "none";
	_pBorderObject.rtlvalue = "none";
	_pBorderObject._single = true;
	_pBorderObject.left = null;
	_pBorderObject.top = null;
	_pBorderObject.right = null;
	_pBorderObject.bottom = null;

	_pBorderObject.valueOf = function () {
		return this.value;
	};
	_pBorderObject.toString = function () {
		return this.value;
	};

	_pBorderObject._getBorderWidth = function () {
		return (this.left ? this.left._width : 0) + (this.right ? this.right._width : 0);
	};
	_pBorderObject._getBorderHeight = function () {
		return (this.top ? this.top._width : 0) + (this.bottom ? this.bottom._width : 0);
	};

	_pBorderObject._getBorderLeftWidth = function () {
		return (this.left ? this.left._width : 0);
	};
	_pBorderObject._getBorderTopWidth = function () {
		return (this.top ? this.top._width : 0);
	};


	_pBorderObject._findColor = function (str, idx) {
		if (!str) {
			return -1;
		}

		str = str.toLowerCase();

		var values = ["rgb", "rgba", "hsl", "hsla"];
		var len = values.length;
		var n = -1;
		var ret = -1;
		for (var i = 0; i < len; i++) {
			n = str.indexOf(values[i], idx);
			if (n >= 0) {
				if (ret >= 0) {
					ret = n < ret ? n : ret;
				}
				else {
					ret = n;
				}
			}
		}

		return ret;
	};

	_pBorderObject._createRTLValue = function () {
		if (!this.rtlvalue) {
			if (this.left.value != this.right.value) {
			}
		}
	};

	nexacro._BorderObject_caches = {
	};
	nexacro.BorderObject = function (val) {
		var obj = nexacro._BorderObject_caches[val];
		if (obj) {
			return obj;
		}
		obj = new nexacro._BorderObject(val);
		nexacro._BorderObject_caches[val] = obj;
		return obj;
	};


	nexacro._BKGradientObject = function (v) {
		if (v && (typeof (v) == "string")) {
			var val = v.trim();
			if (val) {
				this.value = val;
				this._sysvalue = nexacro._getSupportedWebGradient(val);

				if (this._sysvalue) {
					this._sysrtlvalue = this._sysvalue;
					if (this._sysvalue.indexOf("left") >= 0) {
						this._sysrtlvalue = this._sysvalue.replace("left", "right");
					}
					if (this._sysvalue.indexOf("right") >= 0) {
						this._sysrtlvalue = this._sysvalue.replace("right", "left");
					}
				}
			}
		}
	};

	var _pBKGradientObject = nexacro._createPrototype(nexacro.Object, nexacro._BKGradientObject);
	nexacro._BKGradientObject.prototype = _pBKGradientObject;
	_pBKGradientObject._type_name = "BKGradientObject";

	_pBKGradientObject.value = "";
	_pBKGradientObject._sysvalue = "";
	_pBKGradientObject.style = "";
	_pBKGradientObject.color_stops = [];
	_pBKGradientObject.point = {
		startX : 0, 
		startY : 0, 
		endX : 0, 
		endY : 100
	};

	_pBKGradientObject.valueOf = function () {
		return this.value;
	};
	_pBKGradientObject.toString = function () {
		return this.value;
	};

	_pBKGradientObject._parseInfo = function (val) {
		if (val.indexOf("linear-gradient") >= 0) {
			this.style = "linear";

			var idx = val.indexOf("(");
			var gradientVal = val.substring(idx + 1, val.length - 1);
			var angle = "";

			if (gradientVal.substring(0, 2) == "to") {
				idx = gradientVal.indexOf(",");
				angle = gradientVal.substring(0, idx).trim();
				gradientVal = gradientVal.substring(idx + 1).trim();
			}

			var regExps = /\s*((?:\#(?:[A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})|(?:rgb)\(\s*(?:[0-9]{1,3}\s*,\s*){2}[0-9]{1,3}\s*\)|(?:rgba)\(\s*(?:[0-9]{1,3}\s*,\s*){3}(0|0\.\d+|1)\s*\)|[_A-Za-z-][_A-Za-z0-9-]*))(?:\s+((?:[+-]?\d*\.?\d+)(?:%|[a-z]+)?))?(?:\s*,\s*\s*)?/gi;
			this.color_stops = [];

			var colorstopObj;
			var colorStops = regExps.exec(gradientVal);
			while (colorStops !== null) {
				colorstopObj = {
					color : colorStops[1]
				};

				if (!!colorStops[2]) {
					colorstopObj.percents = parseFloat(colorStops[2]) / 100;
				}
				this.color_stops.push(colorstopObj);

				colorStops = regExps.exec(gradientVal);
			}

			this.point = {
				startX : 0, 
				startY : 0, 
				endX : 0, 
				endY : 100
			};
			if (angle) {
				var angle1, angle2;
				var angleList = angle.split(" ");

				angle1 = angleList[1];
				angle2 = angleList[2];

				if (angle1 == "right") {
					if (angle2 == "bottom") {
						this.point = {
							startX : 0, 
							startY : 0, 
							endX : 100, 
							endY : 100
						};
					}
					else if (angle2 == "top") {
						this.point = {
							startX : 0, 
							startY : 100, 
							endX : 100, 
							endY : 0
						};
					}
					else {
						this.point = {
							startX : 0, 
							startY : 0, 
							endX : 100, 
							endY : 0
						};
					}
				}
				else if (angle1 == "left") {
					if (angle2 == "bottom") {
						this.point = {
							startX : 100, 
							startY : 0, 
							endX : 0, 
							endY : 100
						};
					}
					else if (angle2 == "top") {
						this.point = {
							startX : 100, 
							startY : 100, 
							endX : 0, 
							endY : 0
						};
					}
					else {
						this.point = {
							startX : 100, 
							startY : 0, 
							endX : 0, 
							endY : 0
						};
					}
				}
				else if (angle1 == "bottom") {
					this.point = {
						startX : 0, 
						startY : 0, 
						endX : 0, 
						endY : 100
					};
				}
				else if (angle1 == "top") {
					this.point = {
						startX : 0, 
						startY : 100, 
						endX : 0, 
						endY : 0
					};
				}
			}

			var sPercents = 0;
			var ePercents = 0;
			var cnt = 0;
			var colorstopLen = this.color_stops.length;
			var i;

			for (i = 0; i < colorstopLen; i++) {
				var obj = this.color_stops[i];
				if (!obj.percents) {
					if (i == 0) {
						obj.percents = 0;
					}
					else if (i == colorstopLen - 1) {
						obj.percents = 1;
					}
					else {
						obj.percents = -1;
					}
				}

				var midPercents = 0;
				if (obj.percents > 0) {
					ePercents = obj.percents;
					midPercents = (ePercents - sPercents) / cnt;
					for (var j = 1; j < cnt; j++) {
						this.color_stops[i - j].percents = (ePercents - (midPercents *  j));
					}

					sPercents = ePercents;
					cnt = 0;
				}
				cnt++;
			}
		}
		else if (val.indexOf("radial-gradient") >= 0) {
			this.style = "radial";
		}
	};

	nexacro._BKGradientObject_caches = {
	};
	nexacro.BKGradientObject = function (val) {
		var obj = nexacro._BKGradientObject_caches[val];
		if (obj) {
			return obj;
		}
		obj = new nexacro._BKGradientObject(val);
		nexacro._BKGradientObject_caches[val] = obj;
		return obj;
	};




	nexacro._BackgroundObject = function (v, target) {
		if (v && (typeof (v) == "string")) {
			var val = v.trim();
			if (val) {
				this.value = val;
				this.rtlvalue = val;

				if (val == "none") {
					this.url = "none";
					return;
				}



				var props = val.split(/\s+/);
				var cnt = props.length;

				var bLoadColor = true;
				var bLoadImage = true;
				var bLoadGradient = true;
				var bLoadRepeat = true;
				var bLoadPos = true;
				var bLoadOrigin = true;
				var bLoadClip = true;
				var bLoadSize = true;
				for (var i = 0; i < cnt; i++) {
					var part = props[i];
					if (bLoadImage && part.substring(0, 3).toLowerCase() == "url") {
						bLoadImage = false;
						var urlstr = part;

						if (part.indexOf(")") < 0) {
							for (i++; i < cnt; i++) {
								urlstr += " " + props[i];
								if (props[i].indexOf(")") >= 0) {
									break;
								}
							}
						}

						var url = /'.+'|".+"/.exec(urlstr);
						if (!url) {
							url = /(.+)/.exec(urlstr)[0];
							url = url.substring(4, url.length - 1).trim();
						}
						else {
							url = url[0];
							url = url.replace(/\'|\"/g, '');
						}

						this.url = url;
						this._sysbaseurl = target ? target._getRefFormBaseUrl() : nexacro._project_absolutepath;
						this._sysurl = url.length > 0 ? nexacro._getSupportedImageUrl(url, this._sysbaseurl) : "";
						this._sysrtlurl = this._sysurl;

						continue;
					}


					if (bLoadRepeat && this._load_repeat(part)) {
						bLoadRepeat = false;
						continue;
					}
					else if (bLoadPos && this._load_pos(part)) {
						bLoadPos = false;
						if (i < (cnt - 1)) {
							var temp = i + 1;
							part = props[temp];
							if (this._load_pos2(part)) {
								i++;
							}
						}
						continue;
					}
					else if (bLoadSize && part.search(/\//g) > -1) {
						if (part.length == 1) {
							i++;
							part = props[i];
						}
						else {
							part = part.substr(1);
						}

						if (bLoadSize && this._load_size(part)) {
							bLoadSize = false;
							if (i < (cnt - 1)) {
								var temp = i + 1;
								part = props[temp];
								if (this._load_size(part, true)) {
									i++;
								}
							}
						}
						continue;
					}
					var grstr, lcnt, rcnt;
					if (bLoadGradient && (part.substring(0, 15).toLowerCase() == "linear-gradient")) {
						bLoadPos = false;
						bLoadColor = false;
						bLoadImage = false;
						bLoadGradient = false;
						grstr = part;
						lcnt = nexacro.getMatchedCount(grstr, '(');
						rcnt = nexacro.getMatchedCount(grstr, ')');
						if ((lcnt == 0) || (lcnt != rcnt)) {
							for (i++; i < cnt; i++) {
								var gpart = props[i];
								if (bLoadOrigin && this._load_origin(gpart)) {
									bLoadOrigin = false;
									continue;
								}
								else if (bLoadClip && this._load_clip(gpart)) {
									bLoadClip = false;
									continue;
								}
								else if (bLoadRepeat && this._load_repeat(gpart)) {
									bLoadRepeat = false;
									continue;
								}
								grstr += " " + gpart;
								lcnt = nexacro.getMatchedCount(grstr, '(');
								rcnt = nexacro.getMatchedCount(grstr, ')');
								if ((lcnt > 0) && (lcnt == rcnt)) {
									break;
								}
							}
						}
						this.gradient = nexacro.BKGradientObject(grstr);
						continue;
					}

					if (bLoadOrigin && this._load_origin(part)) {
						bLoadOrigin = false;
						continue;
					}
					else if (bLoadClip && this._load_clip(part)) {
						bLoadClip = false;
						continue;
					}

					if (bLoadColor) {
						if (part) {
							bLoadColor = false;
							grstr = part;
							lcnt = nexacro.getMatchedCount(grstr, '(');
							rcnt = nexacro.getMatchedCount(grstr, ')');
							if (lcnt != rcnt) {
								for (i++; i < cnt; i++) {
									grstr += " " + props[i];
									lcnt = nexacro.getMatchedCount(grstr, '(');
									rcnt = nexacro.getMatchedCount(grstr, ')');
									if (lcnt == rcnt) {
										break;
									}
								}
							}
							this.color = nexacro.ColorObject(grstr);
							continue;
						}
					}
				}
				this.rtlvalue = "";
				if (this.gradient) {
					this.rtlvalue += this.gradient._sysrtlvalue + " ";
				}
				else {
					if (this.url) {
						this.rtlvalue += 'URL(\"' + this.url + '\")' + " ";
						if (this.repeat) {
							this.rtlvalue += this.repeat + " ";
						}
						this.rtlvalue += this.rtlpos_x + " " + this.pos_y + " ";
					}
					if (this.color) {
						this.rtlvalue += this.color + " ";
					}
				}
			}
		}
	};

	var _pBackgroundObject = nexacro._createPrototype(nexacro.Object, nexacro._BackgroundObject);
	nexacro._BackgroundObject.prototype = _pBackgroundObject;
	_pBackgroundObject._type_name = "BackgroundObject";

	_pBackgroundObject.value = "";
	_pBackgroundObject.rtlvalue = "";
	_pBackgroundObject.color = "";
	_pBackgroundObject.gradient = null;
	_pBackgroundObject.url = "";
	_pBackgroundObject.repeat = "repeat";
	_pBackgroundObject.pos_x = "left";
	_pBackgroundObject.rtlpos_x = "right";
	_pBackgroundObject.pos_y = "top";
	_pBackgroundObject.origin = "";
	_pBackgroundObject.clip = "";
	_pBackgroundObject.size = "";
	_pBackgroundObject._sysurl = "";
	_pBackgroundObject._sysrtlurl = "";
	_pBackgroundObject._sysbaseurl = "";

	_pBackgroundObject.valueOf = function () {
		return this.value;
	};
	_pBackgroundObject.toString = function () {
		return this.value;
	};

	_pBackgroundObject._load_repeat = function (str) {
		if (str == "no-repeat" || str == "repeat" || str == "repeat-x" || str == "repeat-y") {
			this.repeat = str;
			return true;
		}
		return false;
	};

	_pBackgroundObject._load_pos = function (str) {
		if (str == "left") {
			this.pos_x = str;
			this.rtlpos_x = "right";
			return true;
		}
		else if (str == "right") {
			this.pos_x = str;
			this.rtlpos_x = "left";
			return true;
		}
		else if (str == "center") {
			this.pos_x = str;
			this.rtlpos_x = str;
			return true;
		}
		else if (str == "top" || str == "bottom") {
			this.pos_y = str;
			return false;
		}
		else if (str.search(/px|pt|cm|em|%/i) > 0) {
			var except_list = ["lemonchiffon"
			];

			var except_cnt = except_list.length;

			for (var i = 0; i < except_cnt; i++) {
				if (str == except_list[0]) {
					return false;
				}
			}

			this.pos_x = str;
			return true;
		}
		return false;
	};
	_pBackgroundObject._load_pos2 = function (str) {
		if (str == "left") {
			if (!this.pos_x) {
				this.pos_x = str;
				this.rtlpos_x = "right";
			}
			return true;
		}
		else if (str == "right") {
			if (!this.pos_x) {
				this.pos_x = str;
				this.rtlpos_x = "left";
			}
			return true;
		}
		else if ((str == "top" || str == "bottom" || str == "center") || str.search(/px|pt|cm|em|%/i) > 0) {
			this.pos_y = str;
			return true;
		}
		return false;
	};

	_pBackgroundObject._load_origin = function (str) {
		if (str == "padding-box" || str == "border-box") {
			this.origin = str;
			return true;
		}
		return false;
	};

	_pBackgroundObject._load_clip = function (str) {
		if (str == "padding-box" || str == "border-box") {
			this.clip = str;
			return true;
		}
		return false;
	};

	_pBackgroundObject._load_size = function (str, is_subval) {
		if (is_subval && str.search(/px|%/i) > 0) {
			this.size += " " + str;
			return true;
		}
		else if (str == "auto" || str == "cover" || str == "contain" || str.search(/px|%/i) > 0) {
			this.size = str;
			return true;
		}
		return false;
	};

	nexacro._BackgroundObject_caches = {
	};
	nexacro.BackgroundObject = function (val, target) {
		var obj = nexacro._BackgroundObject_caches[val];
		if (obj) {
			return obj;
		}
		obj = new nexacro._BackgroundObject(val, target);
		nexacro._BackgroundObject_caches[val] = obj;
		return obj;
	};


	nexacro._EdgeImageObject = function (v, target) {
		if (v && (typeof (v) == "string")) {
			var val = v.trim();
			if (val) {
				this.value = val;
				var parts = val.split(/\s+/);
				var cnt = parts.length;

				var part = parts[0];
				if (part.substring(0, 3).toLowerCase() == "url") {
					var image_url;
					var ch = part.charAt(4);
					if (ch == '\'' || ch == '\"') {
						image_url = part.substring(5, part.lastIndexOf(ch));
					}
					else {
						image_url = part.substring(4, part.length - 1);
					}
					this.url = image_url;
					this._sysbaseurl = target ? target._getRefFormBaseUrl() : nexacro._project_absolutepath;
					this._sysurl = nexacro._getSupportedImageUrl(image_url, this._sysbaseurl);
				}

				if (cnt >= 2) {
					part = parseInt(parts[1]);
					var edge = +(part);
					if (edge == edge) {
						this.edge_x = edge;

						part = parseInt(parts[2]);
						edge = +(part);
						if (edge == edge) {
							this.edge_y = edge;
						}
					}
				}
			}
		}
	};

	var _pEdgeImageObject = nexacro._createPrototype(nexacro.Object, nexacro._EdgeImageObject);
	nexacro._EdgeImageObject.prototype = _pEdgeImageObject;
	_pEdgeImageObject._type_name = "EdgeImageObject";

	_pEdgeImageObject.value = "";
	_pEdgeImageObject.url = "";
	_pEdgeImageObject.edge_x = 0;
	_pEdgeImageObject.edge_y = 0;
	_pEdgeImageObject._sysurl = "";

	_pEdgeImageObject.valueOf = function () {
		return this.value;
	};
	_pEdgeImageObject.toString = function () {
		return this.value;
	};

	nexacro._EdgeImageObject_caches = {
	};
	nexacro.EdgeImageObject = function (val, target) {
		var obj = nexacro._EdgeImageObject_caches[val];
		if (obj) {
			return obj;
		}
		obj = new nexacro._EdgeImageObject(val, target);
		nexacro._EdgeImageObject_caches[val] = obj;
		return obj;
	};


	nexacro._MarginObject = function (v) {
		if (v && (typeof (v) == "string")) {
			var val = v.trim();
			if (val) {
				this.value = val;

				var parts = val.split(/\s+/);
				var cnt = parts.length;
				switch (cnt) {
					case 1:
						this.left = this.top = this.right = this.bottom = parseInt(parts[0]);
						break;
					case 2:
						this.top = this.bottom = parseInt(parts[0]);
						this.left = this.right = parseInt(parts[1]);
						break;
					case 3:
						this.top = parseInt(parts[0]);
						this.left = this.right = parseInt(parts[1]);
						this.bottom = parseInt(parts[2]);
						break;
					case 4:
						this.top = parseInt(parts[0]);
						this.right = parseInt(parts[1]);
						this.bottom = parseInt(parts[2]);
						this.left = parseInt(parts[3]);
						break;
				}
			}
		}
	};

	var _pMarginObject = nexacro._createPrototype(nexacro.Object, nexacro._MarginObject);
	nexacro._MarginObject.prototype = _pMarginObject;
	_pMarginObject._type_name = "MarginObject";

	_pMarginObject.value = "";
	_pMarginObject.left = 0;
	_pMarginObject.top = 0;
	_pMarginObject.right = 0;
	_pMarginObject.bottom = 0;

	_pMarginObject.valueOf = function () {
		return this.value;
	};
	_pMarginObject.toString = function () {
		return this.value;
	};

	nexacro._MarginObject_caches = {
	};
	nexacro.MarginObject = function (val) {
		var obj = nexacro._MarginObject_caches[val];
		if (obj) {
			return obj;
		}
		obj = new nexacro._MarginObject(val);
		nexacro._MarginObject_caches[val] = obj;
		return obj;
	};


	nexacro._PaddingObject = function (v) {
		if (v && (typeof (v) == "string")) {
			var val = v.trim();
			if (val) {
				this.value = val;

				var parts = val.split(/\s+/);
				var cnt = parts.length;

				for (var i = 0; i < cnt; i++) {
					var part = parts[i];
					if (part.search(/px|pt|cm|em|%/i) < 0) {
						parts[i] = "0";
					}
				}

				var tv, rv, bv, lv;
				switch (cnt) {
					case 1:
						{

							tv = parseInt(parts[0]);
							this.left = this.top = this.right = this.bottom = (tv >= 0 ? tv : 0);
						}
						break;
					case 2:
						{

							tv = parseInt(parts[0]);
							rv = parseInt(parts[1]);
							this.top = this.bottom = (tv >= 0 ? tv : 0);
							this.left = this.right = (rv >= 0 ? rv : 0);
						}
						break;
					case 3:
						{

							tv = parseInt(parts[0]);
							rv = parseInt(parts[1]);
							bv = parseInt(parts[2]);
							this.top = (tv >= 0 ? tv : 0);
							this.left = this.right = (rv >= 0 ? rv : 0);
							this.bottom = (bv >= 0 ? bv : 0);
						}
						break;
					case 4:
						{

							tv = parseInt(parts[0]);
							rv = parseInt(parts[1]);
							bv = parseInt(parts[2]);
							lv = parseInt(parts[3]);
							this.top = (tv >= 0 ? tv : 0);
							this.right = (rv >= 0 ? rv : 0);
							this.bottom = (bv >= 0 ? bv : 0);
							this.left = (lv >= 0 ? lv : 0);

							this.rtlvalue = parts[0] + " " + parts[3] + " " + parts[2] + " " + parts[1];
						}
						break;
				}
			}
		}
	};

	var _pPaddingObject = nexacro._createPrototype(nexacro.Object, nexacro._PaddingObject);
	nexacro._PaddingObject.prototype = _pPaddingObject;
	_pPaddingObject._type_name = "PaddingObject";

	_pPaddingObject.value = "";
	_pPaddingObject.left = 0;
	_pPaddingObject.top = 0;
	_pPaddingObject.right = 0;
	_pPaddingObject.bottom = 0;

	_pPaddingObject.valueOf = function () {
		return this.value;
	};
	_pPaddingObject.toString = function () {
		return this.value;
	};

	nexacro._PaddingObject_caches = {
	};
	nexacro.PaddingObject = function (val) {
		var obj = nexacro._PaddingObject_caches[val];
		if (obj) {
			return obj;
		}
		obj = new nexacro._PaddingObject(val);
		nexacro._PaddingObject_caches[val] = obj;
		return obj;
	};


	nexacro._AlignObject = function (v) {
		if (v && (typeof (v) == "string")) {
			var val = v.trim();
			if (val) {
				this.value = val;

				var valarr = val.split(/\s+/);
				for (var i = 0, n = valarr.length; i < n; i++) {
					var tok = valarr[i];
					switch (tok) {
						case "left":
						case "center":
						case "right":
							this.halign = tok;
							break;
						case "top":
						case "middle":
						case "bottom":
							this.valign = tok;
							break;
					}
				}
			}
		}
	};

	var _pAlignObject = nexacro._createPrototype(nexacro.Object, nexacro._AlignObject);
	nexacro._AlignObject.prototype = _pAlignObject;
	_pAlignObject._type_name = "AlignObject";

	_pAlignObject.value = "";
	_pAlignObject.halign = "";
	_pAlignObject.valign = "";

	_pAlignObject.valueOf = function () {
		return this.value;
	};
	_pAlignObject.toString = function () {
		return this.value;
	};

	nexacro._AlignObject_caches = {
	};
	nexacro.AlignObject = function (val) {
		var obj = nexacro._AlignObject_caches[val];
		if (obj) {
			return obj;
		}
		obj = new nexacro._AlignObject(val);
		nexacro._AlignObject_caches[val] = obj;
		return obj;
	};


	nexacro._CursorObject = function (v) {
		if (v && (typeof (v) == "string")) {
			var val = v.trim();
			if (val) {
				this.value = val;
				this._sysvalue = nexacro._getSupportedWebCursor(val);
			}
		}
	};

	var _pCursorObject = nexacro._createPrototype(nexacro.Object, nexacro._CursorObject);
	nexacro._CursorObject.prototype = _pCursorObject;
	_pCursorObject._type_name = "CursorObject";

	_pCursorObject.value = "auto";
	_pCursorObject._sysvalue = "default";

	_pCursorObject.valueOf = function () {
		return this.value;
	};
	_pCursorObject.toString = function () {
		return this.value;
	};

	nexacro._CursorObject_caches = {
	};
	nexacro.CursorObject = function (val) {
		var obj = nexacro._CursorObject_caches[val];
		if (obj) {
			return obj;
		}
		obj = new nexacro._CursorObject(val);
		nexacro._CursorObject_caches[val] = obj;
		return obj;
	};


	nexacro._OpacityObject = function (v) {
		if (v) {
			this.value = v;
			this._sysvalue = v;
		}
	};

	var _pOpacityObject = nexacro._createPrototype(nexacro.Object, nexacro._OpacityObject);
	nexacro._OpacityObject.prototype = _pOpacityObject;
	_pOpacityObject._type_name = "Opacity";

	_pOpacityObject.value = 1;
	_pOpacityObject._sysvalue = 1;

	_pOpacityObject.valueOf = function () {
		return this.value;
	};
	_pOpacityObject.toString = function () {
		return this.value;
	};

	nexacro._OpacityObject_caches = {
	};
	nexacro.OpacityObject = function (val) {
		var obj = nexacro._OpacityObject_caches[val];
		if (obj) {
			return obj;
		}
		obj = new nexacro._OpacityObject(val);
		nexacro._OpacityObject_caches[val] = obj;
		return obj;
	};


	nexacro._ShadowObject = function (v) {
		if (v && (typeof (v) == "string")) {
			var val = v.trim();
			if (val) {
				this.value = val;
				var arr = val.split(' ');
				arr[0] = parseInt(arr[0]) *  -1 + "px";
				this.rtlvalue = arr.join(' ');
			}
		}
	};

	var _pShadowObject = nexacro._createPrototype(nexacro.Object, nexacro._ShadowObject);
	nexacro._ShadowObject.prototype = _pShadowObject;
	_pShadowObject._type_name = "ShadowObject";

	_pShadowObject.value = "";
	_pShadowObject.rtlvalue = "";

	_pShadowObject.valueOf = function () {
		return this.value;
	};
	_pShadowObject.toString = function () {
		return this.value;
	};

	nexacro._ShadowObject_caches = {
	};
	nexacro.ShadowObject = function (val) {
		var obj = nexacro._ShadowObject_caches[val];
		if (obj) {
			return obj;
		}
		obj = new nexacro._ShadowObject(val);
		nexacro._ShadowObject_caches[val] = obj;
		return obj;
	};

	nexacro._UrlObject = function (v, target) {
		if (v && (typeof (v) == "string")) {
			var val = v.trim();
			if (val) {
				this.value = val;
				if (val.substring(0, 3).toLowerCase() == "url") {
					var url;
					var ch = val.charAt(4);
					if (ch == '\'' || ch == '\"') {
						url = val.substring(5, val.lastIndexOf(ch));
					}
					else {
						url = val.substring(4, val.length - 1);
					}
					this.url = url;
					this._sysbaseurl = target ? target._getRefFormBaseUrl() : nexacro._project_absolutepath;
					this._sysurl = nexacro._getSupportedImageUrl(url, this._sysbaseurl);
				}
				else {
					this.url = val;
					this._sysbaseurl = target ? target._getRefFormBaseUrl() : nexacro._project_absolutepath;
					this._sysurl = nexacro._getSupportedImageUrl(val, this._sysbaseurl);
				}
			}
		}
	};

	var _pUrlObject = nexacro._createPrototype(nexacro.Object, nexacro._UrlObject);
	nexacro._UrlObject.prototype = _pUrlObject;
	_pUrlObject._type_name = "UrlObject";

	_pUrlObject.value = "";
	_pUrlObject.url = "";
	_pUrlObject._sysurl = "";
	_pUrlObject._sysbaseurl = "";

	_pUrlObject.rtlvalue = "";
	_pUrlObject.rtlurl = "";
	_pUrlObject._sysrtlurl = "";
	_pUrlObject._sysbasertlurl = "";

	_pUrlObject.valueOf = function () {
		return this.value;
	};

	_pUrlObject.toString = function () {
		return this.value;
	};

	nexacro._UrlObject_caches = {
	};
	nexacro.UrlObject = function (val, target) {
		var obj = nexacro._UrlObject_caches[val];
		if (obj) {
			return obj;
		}
		obj = new nexacro._UrlObject(val, target);
		nexacro._UrlObject_caches[val] = obj;
		return obj;
	};

	nexacro._TransitionEffectObject = function (v, target) {
		if (v && (typeof (v) == "string")) {
			var val = v.trim();
			if (val) {
				this.value = val;

				var valarr = val.split(/\s+/);
				for (var i = 0, n = valarr.length; i < n; i++) {
					var tok = valarr[i];
					switch (i) {
						case 0:
							this.type = tok;
							break;
						case 1:
							this.duration = tok;
							break;
						case 2:
							this.easing = tok;
							break;
						case 3:
							this.direction = tok;
							break;
					}
				}
			}
		}
	};

	var _pTransitionEffectObject = nexacro._createPrototype(nexacro.Object, nexacro._TransitionEffectObject);
	nexacro._TransitionEffectObject.prototype = _pTransitionEffectObject;
	_pTransitionEffectObject._type_name = "TransitionEffectObject";

	_pTransitionEffectObject.value = "";
	_pTransitionEffectObject.type = "";
	_pTransitionEffectObject.duration = 0;
	_pTransitionEffectObject.easing = "";
	_pTransitionEffectObject.direction = "";

	_pTransitionEffectObject.valueOf = function () {
		return this.value;
	};

	_pTransitionEffectObject.toString = function () {
		return this.value;
	};

	nexacro._TransitionEffectObject_caches = {
	};
	nexacro.TransitionEffectObject = function (val, target) {
		var obj = nexacro._TransitionEffectObject_caches[val];
		if (obj) {
			return obj;
		}
		obj = new nexacro._TransitionEffectObject(val, target);
		nexacro._TransitionEffectObject_caches[val] = obj;
		return obj;
	};
}


if (_process) {
	delete _process;
	delete _pColorObject;
	delete _pFontObject;
	delete _pTextDecorationObject;
	delete _pBorderLineObject;
	delete _pBorderObject;
	delete _pBorderRadiusObject;
	delete _pMarginObject;
	delete _pPaddingObject;
	delete _pAlignObject;
	delete _pCursorObject;
	delete _pOpacityObject;
	delete _pShadowObject;
	delete _pUrlObject;
	delete _pTransitionEffectObject;
}
