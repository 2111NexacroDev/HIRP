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

if (!nexacro.Point) {
	nexacro.Point = function (x, y) {
		if (x instanceof nexacro.Point) {
			this.x = x.x;
			this.y = x.y;
		}
		else if (x instanceof Array) {
			this.x = (x[0]);
			this.y = (x[1]);
		}
		else {
			if (x != undefined) {
				this.x = x;
			}

			if (y != undefined) {
				this.y = y;
			}
			else {
				if (x != undefined) {
					this.y = this.x;
				}
			}
		}
	};

	var _pPoint = nexacro._createPrototype(nexacro.Object, nexacro.Point);
	nexacro.Point.prototype = _pPoint;
	_pPoint._type_name = "Point";
	_pPoint.x = 0;
	_pPoint.y = 0;

	nexacro.Point.min = function (pt0, pt1) {
		if (pt0 instanceof nexacro.Point && arguments.length == 4) {
			return new nexacro.Point(Math.min(arguments[0], arguments[1]), Math.min(arguments[2], arguments[3]));
		}
		else {
			return new nexacro.Point(Math.min(pt0.x, pt1.x), Math.min(pt0.y, pt1.y));
		}
	};

	nexacro.Point.max = function (pt0, pt1) {
		if (pt0 instanceof nexacro.Point && arguments.length == 4) {
			return new nexacro.Point(Math.max(arguments[0], arguments[2]), Math.max(arguments[1], arguments[3]));
		}
		else {
			return new nexacro.Point(Math.max(pt0.x, pt1.x), Math.max(pt0.y, pt1.y));
		}
	};

	_pPoint.set_x = function (v) {
		this.x = v;
	};

	_pPoint.set_y = function (v) {
		this.y = v;
	};

	_pPoint.set = function (x, y) {
		if (this.x != x || this.y != y) {
			this.x = x;
			this.y = y;
		}
		return this;
	};

	_pPoint.copy = function (pt) {
		if (pt instanceof nexacro.Point) {
			this.x = pt.x;
			this.y = pt.y;
		}
		else {
			this.x = arguments[0];
			this.y = arguments[1];
		}
	};

	_pPoint.clone = function () {
		return new nexacro.Point(this.x, this.y);
	};

	_pPoint.equals = function (pt) {
		if (pt instanceof nexacro.Point) {
			return (this.x == pt.x && this.y == pt.y);
		}
		else if (pt instanceof Array) {
			return (this.x == pt[0] && this.y == pt[1]);
		}
		else {
			return (this.x == arguments[0] && this.y == arguments[1]);
		}
	};

	_pPoint.translate = function (x, y) {
		this.x += (x);
		this.y += (y);
	};

	_pPoint.roundedEquals = function (pt) {
		return (Math.round(this.x) == Math.round(pt.x) && Math.round(this.y) == Math.round(pt.y));
	};

	_pPoint.add = function (pt) {
		if (pt instanceof nexacro.Point) {
			return new nexacro.Point(this.x + pt.x, this.y + pt.y);
		}
		else {
			if (arguments.length == 1) {
				return new nexacro.Point(this.x + arguments[0], this.y + arguments[0]);
			}
			else {
				return new nexacro.Point(this.x + arguments[0], this.y + arguments[1]);
			}
		}
	};

	_pPoint.subtract = function (pt) {
		if (pt instanceof nexacro.Point) {
			return new nexacro.Point(this.x - pt.x, this.y - pt.y);
		}
		else {
			if (arguments.length == 1) {
				return new nexacro.Point(this.x - arguments[0], this.y - arguments[0]);
			}
			else {
				return new nexacro.Point(this.x - arguments[0], this.y - arguments[1]);
			}
		}
	};

	_pPoint.multiply = function (pt) {
		if (pt instanceof nexacro.Point) {
			return new nexacro.Point(this.x *  pt.x, this.y *  pt.y);
		}
		else {
			if (arguments.length == 1) {
				return new nexacro.Point(this.x *  arguments[0], this.y *  arguments[0]);
			}
			else {
				return new nexacro.Point(this.x *  arguments[0], this.y *  arguments[1]);
			}
		}
	};

	_pPoint.divide = function (pt) {
		if (pt instanceof nexacro.Point) {
			return new nexacro.Point(this.x / pt.x, this.y / pt.y);
		}
		else {
			if (arguments.length == 1) {
				return new nexacro.Point(this.x / arguments[0], this.y / arguments[0]);
			}
			else {
				return new nexacro.Point(this.x / arguments[0], this.y / arguments[1]);
			}
		}
	};

	_pPoint.modulo = function (pt) {
		if (pt instanceof nexacro.Point) {
			return new nexacro.Point(this.x % pt.x, this.y % pt.y);
		}
		else {
			if (arguments.length == 1) {
				return new nexacro.Point(this.x % arguments[0], this.y % arguments[0]);
			}
			else {
				return new nexacro.Point(this.x % arguments[0], this.y % arguments[1]);
			}
		}
	};

	_pPoint.negate = function () {
		return new nexacro.Point(-this.x, -this.y);
	};

	_pPoint.getDistance = function (pt, squared) {
		var x, y, d;
		if (pt instanceof nexacro.Point) {
			x = pt.x - this.x;
			y = pt.y - this.y;
			d = x *  x + y *  y;
			return squared ? d : Math.sqrt(d);
		}
		else {
			x = (arguments[0]) - this.x;
			y = (arguments[1]) - this.y;
			d = x *  x + y *  y;
			return arguments[2] ? d : Math.sqrt(d);
		}
	};

	_pPoint.isZero = function () {
		return (this.x === 0 && this.y === 0);
	};

	_pPoint.isNaN = function () {
		return isNaN(this.x) || isNaN(this.y);
	};





	_pPoint.getDirectedAngle = function (pt) {
		if (!(pt instanceof nexacro.Point)) {
			pt = new nexacro.Point(arguments[0], arguments[1]);
		}
		return Math.atan2(this.cross(pt), this.dot(pt)) *  180 / Math.PI;
	};

	_pPoint.getLength = function () {
		return Math.sqrt(this.x *  this.x + this.y *  this.y);
	};


	_pPoint.rotate = function (angle, center) {
		if (angle === 0) {
			return this.clone();
		}

		angle = angle *  Math.PI / 180;
		var pt = center ? this.subtract(center) : this;
		var s = Math.sin(angle);
		var c = Math.cos(angle);
		pt = new nexacro.Point(pt.x *  c - pt.y *  s, pt.y *  c + pt.x *  s);
		return center ? pt.add(center) : pt;
	};


	_pPoint.dot = function (pt) {
		if (pt instanceof nexacro.Point) {
			return this.x *  pt.x + this.y *  pt.y;
		}
		else {
			return this.x *  (arguments[0]) + this.y *  (arguments[1]);
		}
	};

	_pPoint.cross = function (pt) {
		if (pt instanceof nexacro.Point) {
			return this.x *  pt.y - this.y *  pt.x;
		}
		else {
			return this.x *  (arguments[1]) - this.y *  (arguments[0]);
		}
	};

	_pPoint.project = function (pt) {
		if (!(pt instanceof nexacro.Point)) {
			pt = new nexacro.Point(arguments[0], arguments[1]);
		}

		if (pt.isZero()) {
			return new nexacro.Point();
		}
		else {
			var scale = this.dot(pt) / pt.dot(pt);
			return new nexacro.Point(pt.x *  scale, pt.y *  scale);
		}
	};

	_pPoint.round = function () {
		return new nexacro.Point(Math.round(this.x), Math.round(this.y));
	};

	_pPoint.ceil = function () {
		return new nexacro.Point(Math.ceil(this.x), Math.ceil(this.y));
	};

	_pPoint.floor = function () {
		return new nexacro.Point(Math.floor(this.x), Math.floor(this.y));
	};

	_pPoint.abs = function () {
		return new nexacro.Point(Math.abs(this.x), Math.abs(this.y));
	};

	_pPoint.lerp = function (pt, t) {
		if (pt instanceof nexacro.Point) {
			return new nexacro.Point(this.x + (pt.x - this.x) *  t, this.y + (pt.y - this.y) *  t);
		}
		else {
			t = arguments[2];
			return new nexacro.Point(this.x + (arguments[0] - this.x) *  t, this.y + (arguments[1] - this.y) *  t);
		}
	};

	_pPoint.add = function (pt) {
		if (pt instanceof nexacro.Point) {
			return new nexacro.Point(this.x + pt.x, this.y + pt.y);
		}
		else {
			if (arguments.length == 1) {
				return new nexacro.Point(this.x + arguments[0], this.y + arguments[0]);
			}
			else {
				return new nexacro.Point(this.x + arguments[0], this.y + arguments[1]);
			}
		}
	};

	_pPoint.subtract = function (pt) {
		if (pt instanceof nexacro.Point) {
			return new nexacro.Point(this.x - pt.x, this.y - pt.y);
		}
		else {
			if (arguments.length == 1) {
				return new nexacro.Point(this.x - arguments[0], this.y - arguments[0]);
			}
			else {
				return new nexacro.Point(this.x - arguments[0], this.y - arguments[1]);
			}
		}
	};

	_pPoint.multiply = function (pt) {
		if (pt instanceof nexacro.Point) {
			return new nexacro.Point(this.x *  pt.x, this.y *  pt.y);
		}
		else {
			if (arguments.length == 1) {
				return new nexacro.Point(this.x *  arguments[0], this.y *  arguments[0]);
			}
			else {
				return new nexacro.Point(this.x *  arguments[0], this.y *  arguments[1]);
			}
		}
	};

	_pPoint.divide = function (pt) {
		if (pt instanceof nexacro.Point) {
			return new nexacro.Point(this.x / pt.x, this.y / pt.y);
		}
		else {
			if (arguments.length == 1) {
				return new nexacro.Point(this.x / arguments[0], this.y / arguments[0]);
			}
			else {
				return new nexacro.Point(this.x / arguments[0], this.y / arguments[1]);
			}
		}
	};

	_pPoint.modulo = function (pt) {
		if (pt instanceof nexacro.Point) {
			return new nexacro.Point(this.x % pt.x, this.y % pt.y);
		}
		else {
			if (arguments.length == 1) {
				return new nexacro.Point(this.x % arguments[0], this.y % arguments[0]);
			}
			else {
				return new nexacro.Point(this.x % arguments[0], this.y % arguments[1]);
			}
		}
	};

	_pPoint.negate = function () {
		return new nexacro.Point(-this.x, -this.y);
	};

	delete _pPoint;
}

if (!nexacro.Offset) {
	nexacro.Offset = function (x, y) {
		if (x != undefined) {
			this.x = x;
		}
		if (y != undefined) {
			this.y = y;
		}
	};

	var _pOffset = nexacro.Offset.prototype;
	_pOffset.x = 0;
	_pOffset.y = 0;

	_pOffset.copy = function () {
		return new nexacro.Offset(this.x, this.y);
	};

	_pOffset.copyFrom = function (p) {
		this.x = p.x;
		this.y = p.y;
	};

	_pOffset.equals = function (offset) {
		if (!(offset instanceof nexacro.Offset)) {
			throw new Error('offset must be an instance of nexacro.Offset');
		}
		return (this.x == offset.x && this.y == offset.y);
	};

	_pOffset.round = function (to) {
		var v = +to;
		if (!(v != v)) {
			var factor = Math.pow(10, to);
			this.x = Math.round(this.x *  factor) / factor;
			this.y = Math.round(this.y *  factor) / factor;
		}
		else {
			this.x = Math.round(this.x);
			this.y = Math.round(this.y);
		}
	};

	_pOffset.isZero = function () {
		return (this.x === 0 && this.y === 0);
	};


	delete _pOffset;
}

if (!nexacro.Region) {
	nexacro.Region = function (t, r, b, l) {
		var me = this;
		me.top = t;
		me.right = r;
		me.bottom = b;
		me.left = l;
		me[0] = l;
		me[1] = t;
	};
	var _pRegion = nexacro.Region.prototype;

	_pRegion.contains = function (region) {
		var me = this;
		return (region.left >= me.left && region.right <= me.right
			 && region.top >= me.top && region.bottom <= me.bottom);
	};

	_pRegion.intersect = function (region) {
		var me = this, t = Math.max(me.top, region.top), r = Math.min(me.right, region.right), b = Math.min(me.bottom, region.bottom), l = Math.max(me.left, region.left);

		if (b > t && r > l) {
			return new nexacro.Region(t, r, b, l);
		}
		else {
			return false;
		}
	};

	_pRegion.union = function (region) {
		var me = this, t = Math.min(me.top, region.top), r = Math.max(me.right, region.right), b = Math.max(me.bottom, region.bottom), l = Math.min(me.left, region.left);

		return new nexacro.Region(t, r, b, l);
	};

	_pRegion.constrainTo = function (region) {
		var me = this;
		me.top = this.constrain(me.top, region.top, region.bottom);
		me.bottom = this.constrain(me.bottom, region.top, region.bottom);
		me.left = this.constrain(me.left, region.left, region.right);
		me.right = this.constrain(me.right, region.left, region.right);
		return me;
	};

	_pRegion.constrain = function (num, minV, maxV) {
		num = parseFloat(num);
		var v = +minV;
		if (!(v != v)) {
			num = Math.max(num, minV);
		}

		v = +maxV;
		if (!(v != v)) {
			num = Math.min(num, maxV);
		}
		return num;
	};

	_pRegion.adjust = function (t, r, b, l) {
		var me = this;
		me.top += t;
		me.left += l;
		me.right += r;
		me.bottom += b;
		return me;
	};

	_pRegion.getOutOfBoundOffset = function (axis, p) {
		if (!(axis instanceof nexacro.Offset)) {
			if (axis == 'x') {
				return this.getOutOfBoundOffsetX(p);
			}
			else {
				return this.getOutOfBoundOffsetY(p);
			}
		}
		else {
			p = axis;
			var d = new nexacro.Offset();
			d.x = this.getOutOfBoundOffsetX(p.x);
			d.y = this.getOutOfBoundOffsetY(p.y);
			return d;
		}
	};

	_pRegion.getOutOfBoundOffsetX = function (p) {
		if (p <= this.left) {
			return this.left - p;
		}
		else if (p >= this.right) {
			return this.right - p;
		}
		return 0;
	};

	_pRegion.getOutOfBoundOffsetY = function (p) {
		if (p <= this.top) {
			return this.top - p;
		}
		else if (p >= this.bottom) {
			return this.bottom - p;
		}
		return 0;
	};
	_pRegion.isOutOfBound = function (axis, p) {
		if (!(axis instanceof nexacro.Offset)) {
			if (axis == 'x') {
				return this.isOutOfBoundX(p);
			}
			else {
				return this.isOutOfBoundY(p);
			}
		}
		else {
			p = axis;
			return (this.isOutOfBoundX(p.x) || this.isOutOfBoundY(p.y));
		}
	};

	_pRegion.isOutOfBoundX = function (p) {
		return (p < this.left || p > this.right);
	};

	_pRegion.isOutOfBoundY = function (p) {
		return (p < this.top || p > this.bottom);
	};

	_pRegion.restrict = function (axis, p, factor) {
		if (axis instanceof nexacro.Offset) {
			var newP;
			factor = p;
			p = axis;
			if (p.copy) {
				newP = p.copy();
			}
			else {
				newP = {
					x : p.x, 
					y : p.y
				};
			}
			newP.x = this.restrictX(p.x, factor);
			newP.y = this.restrictY(p.y, factor);
			return newP;
		}
		else {
			if (axis == 'x') {
				return this.restrictX(p, factor);
			}
			else {
				return this.restrictY(p, factor);
			}
		}
	};
	_pRegion.restrictX = function (p, factor) {
		if (!factor) {
			factor = 1;
		}

		if (p <= this.left) {
			p -= (p - this.left) *  factor;
		}
		else if (p >= this.right) {
			p -= (p - this.right) *  factor;
		}
		return p;
	};

	_pRegion.restrictY = function (p, factor) {
		if (!factor) {
			factor = 1;
		}
		if (p <= this.top) {
			p -= (p - this.top) *  factor;
		}
		else if (p >= this.bottom) {
			p -= (p - this.bottom) *  factor;
		}
		return p;
	};

	_pRegion.getSize = function () {
		return {
			width : this.right - this.left, 
			height : this.bottom - this.top
		};
	};

	_pRegion.copy = function () {
		return new nexacro.Region(this.top, this.right, this.bottom, this.left);
	};

	_pRegion.translateBy = function (offset) {
		this.left += offset.x;
		this.right += offset.x;
		this.top += offset.y;
		this.bottom += offset.y;
	};

	_pRegion.round = function () {
		this.top = Math.round(this.top);
		this.right = Math.round(this.right);
		this.bottom = Math.round(this.bottom);
		this.left = Math.round(this.left);
		return this;
	};

	_pRegion.equals = function (region) {
		return (this.top == region.top && this.right == region.right
			 && this.bottom == region.bottom && this.left == region.left);
	};

	delete _pRegion;
}

if (!nexacro.Rect) {
	nexacro.Rect = function (left, top, width, height) {
		(left != null) ? this.left = left : left = this.left = 0;
		(top != null) ? this.top = top : top = this.top = 0;
		(width != null) ? this.width = width : width = this.width = 0;
		(height != null) ? this.height = height : height = this.height = 0;

		this.left = Math.floor(this.left);
		var x = left - this.left;

		this.top = Math.floor(this.top);
		var y = top - this.top;

		this.width = Math.ceil(this.width + x);
		this.height = Math.ceil(this.height + y);

		this.right = this.left + this.width;
		this.bottom = this.top + this.height;
	};

	var _pRect = nexacro._createPrototype(nexacro.Object, nexacro.Rect);
	nexacro.Rect.prototype = _pRect;
	_pRect._type_name = "Rect";
	_pRect.left = 0;
	_pRect.top = 0;
	_pRect.width = 0;
	_pRect.height = 0;

	_pRect.clear = function () {
		this.left = this.top = 0;
		this.width = this.height = 0;
		this.right = this.bottom = 0;
	};

	_pRect.copy = function (rc) {
		this.left = rc.left;
		this.top = rc.top;

		this.width = rc.width;
		this.height = rc.height;

		this.right = rc.right;
		this.bottom = rc.bottom;
	};

	_pRect.set = function (left, top, width, height) {
		if (left != this.left || top != this.top || width != this.width || height != this.height) {
			this.left = Math.floor(left);
			var x = left - this.left;

			this.top = Math.floor(top);
			var y = top - this.top;

			this.width = Math.ceil(width + x);
			this.height = Math.ceil(height + y);

			this.right = this.left + this.width;
			this.bottom = this.top + this.height;
		}
		return this;
	};

	_pRect.clone = function () {
		return new nexacro.Rect(this.left, this.top, this.width, this.height);
	};

	_pRect.isSameSize = function (rc) {
		return (this.width == rc.width) && (this.height == rc.height);
	};

	_pRect.set_left = function (left) {
		this.left = Math.floor(left);
		var x = left - this.left;

		this.width = Math.ceil(this.width + x);
	};

	_pRect.set_top = function (top) {
		this.top = Math.floor(top);
		var y = top - this.top;

		this.height = Math.ceil(this.height + y);
	};

	_pRect.set_width = function (width) {
		this.width = Math.ceil(width);
		this.right = this.left + this.width;
	};

	_pRect.set_height = function (height) {
		this.height = Math.ceil(height);
		this.bottom = this.top + this.height;
	};

	_pRect.getRight = function () {
		return this.left + this.width;
	};

	_pRect.getBottom = function () {
		return this.top + this.height;
	};

	_pRect.getCenterX = function () {
		return this.left + this.width *  0.5;
	};

	_pRect.setCenterX = function (v) {
		var left = v - this.width *  0.5;
		this.left = Math.floor(left);
		var x = left - this.left;

		this.width = Math.ceil(this.width + x);
		this.right = this.left + this.width;
	};

	_pRect.getCenterY = function () {
		return this.top + this.height *  0.5;
	};

	_pRect.setCenterY = function (v) {
		var top = v - this.height *  0.5;
		this.top = Math.floor(top);
		var y = top - this.top;

		this.height = Math.ceil(this.height + y);
		this.bottom = this.top + this.height;
	};

	_pRect.getCenterPoint = function () {
		return new nexacro.Point(this.getCenterX(), this.getCenterY());
	};

	_pRect.setCenterPoint = function (pt) {
		if (pt instanceof nexacro.Point) {
			this.setCenterX(pt.x);
			this.setCenterY(pt.y);
		}
		else {
			this.setCenterX(arguments[0]);
			this.setCenterY(arguments[1]);
		}

		return this;
	};

	_pRect.isEmpty = function () {
		return this.width == 0 || this.height == 0;
	};

	_pRect.equals = function (rc) {
		return (this.left == rc.left) && (this.top == rc.top) && (this.width == rc.width) && (this.height == rc.height);
	};

	_pRect.containsPoint = function (pt) {
		var x, y;
		if (pt instanceof nexacro.Point) {
			x = pt.x;
			y = pt.y;
		}
		else {
			x = arguments[0];
			y = arguments[1];
		}

		return x >= this.left && y >= this.top && x <= this.left + this.width && y <= this.top + this.height;
	};

	_pRect.containsRect = function (rc) {
		var left, top, width, height;
		if (rc instanceof nexacro.Rect) {
			left = rc.left;
			top = rc.top;
			width = rc.width;
			height = rc.height;
		}
		else {
			left = arguments[0];
			top = arguments[1];
			width = arguments[2];
			height = arguments[3];
		}

		return left >= this.left && top >= this.top && left + width <= this.left + this.width && top + height <= this.top + this.height;
	};

	_pRect.intersectRect = function (rc) {
		if (rc instanceof nexacro.Rect) {
			return rc.left + rc.width > this.left && rc.top + rc.height > this.top && rc.left < this.left + this.width && rc.top < this.top + this.height;
		}
		else {
			var left = arguments[0], top = arguments[1];
			var width = arguments[2], height = arguments[3];
			return left + width > this.left && top + height > this.top && left < this.left + this.width && top < this.top + this.height;
		}
	};


	_pRect.intersect = function (rc) {
		var x1, y1, x2, y2;
		if (rc instanceof nexacro.Rect) {
			x1 = Math.max(this.left, rc.left);
			y1 = Math.max(this.top, rc.top);
			x2 = Math.min(this.left + this.width, rc.left + rc.width);
			y2 = Math.min(this.top + this.height, rc.top + rc.height);
		}
		else {
			var left = arguments[0], top = arguments[1];
			var width = arguments[2], height = arguments[3];
			x1 = Math.max(this.left, left);
			y1 = Math.max(this.top, top);
			x2 = Math.min(this.left + this.width, left + width);
			y2 = Math.min(this.top + this.height, top + height);
		}
		return new nexacro.Rect(x1, y1, x2 - x1, y2 - y1);
	};

	_pRect.union = function (rc) {
		var x1, y1, x2, y2;
		if (rc instanceof nexacro.Rect) {
			x1 = Math.min(this.left, rc.left);
			y1 = Math.min(this.top, rc.top);
			x2 = Math.max(this.left + this.width, rc.left + rc.width);
			y2 = Math.max(this.top + this.height, rc.top + rc.height);
		}
		else {
			var left = arguments[0], top = arguments[1];
			var width = arguments[2], height = arguments[3];
			x1 = Math.min(this.left, left);
			y1 = Math.min(this.top, top);
			x2 = Math.max(this.left + this.width, left + width);
			y2 = Math.max(this.top + this.height, top + height);
		}

		return new nexacro.Rect(x1, y1, x2 - x1, y2 - y1);
	};

	_pRect.includePoint = function (pt) {
		var x1, y1, x2, y2, x, y;
		if (pt instanceof nexacro.Point) {
			x = pt.x;
			y = pt.y;
			x1 = Math.min(this.x, x);
			y1 = Math.min(this.y, y);
			x2 = Math.max(this.x + this.width, x);
			y2 = Math.max(this.y + this.height, y);
		}
		else {
			x = arguments[0];
			y = arguments[1];
			x1 = Math.min(this.x, x);
			y1 = Math.min(this.y, y);
			x2 = Math.max(this.x + this.width, x);
			y2 = Math.max(this.y + this.height, y);
		}
		return new nexacro.Rect(x1, y1, x2 - x1, y2 - y1);
	};

	_pRect.expand = function (hor, ver) {
		if (ver === undefined) {
			ver = hor;
		}
		return new nexacro.Rect(this.left - hor, this.top - ver, this.width + hor *  2, this.height + ver *  2);
	};

	_pRect.scale = function (hor, ver) {
		return this.expand(this.width *  hor - this.width, this.height *  (ver === undefined ? hor : ver) - this.height);
	};

	_pRect = null;
}

if (!nexacro.Decimal) {
	nexacro.Decimal = function (v1, v2) {
		if (!(this instanceof nexacro.Decimal)) {
			return new nexacro.Decimal(v1, v2);
		}

		this.hi = 0.0;
		this.lo = 0.0;
		if (v2 == null) {
			if (typeof v1 == "boolean") {
				if (v1) {
					this.hi = 1;
				}
				else {
					this.hi = 0;
				}
			}
			else if (typeof v1 == "number") {
				if (nexacro._getDatatypeRule() != "1.0") {
					if (!isFinite(v1)) {
						this.hi = v1;
						this.lo = 0;
					}
					else {
						this._parse(v1.toString());
					}
				}
				else {
					this._parse(v1.toString());
				}
			}
			else if (typeof v1 == 'object' && v1._type_name == "Decimal") {
				this.hi = v1.hi;
				this.lo = v1.lo;
			}
			else if (v1 != null) {
				if (nexacro._getDatatypeRule() != "1.0" && isNaN(+v1)) {
					this.hi = Number.NaN;
					this.lo = 0;
				}
				else {
					this._parse(v1);
				}
			}
		}
		else {
			this.hi = (v1 - 0.0);
			this.lo = (v2 - 0.0);
		}

		return this;
	};

	nexacro.Decimal.prototype._type_name = "Decimal";

	nexacro.Decimal._fraction_10 = [1e0, 1e1, 1e2, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13, 1e14, 1e15, 1e16, 1e17, 1e18, 1e19, 1e20, 1e21, 1e22, 1e23, 1e24, 1e25, 1e26, 1e27, 1e28, 1e29, 1e30, 1e31, 1e32, 1e33, 1e34, 1e35, 1e36, 1e37, 1e38, 1e39, 1e40, 1e41, 1e42, 1e43, 1e44, 1e45, 1e46, 1e47, 1e48, 1e49, 1e50, 1e51, 1e52, 1e53, 1e54, 1e55, 1e56, 1e57, 1e58, 1e59, 1e60, 1e61, 1e62, 1e63, 1e64, 1e65, 1e66, 1e67, 1e68, 1e69, 1e70, 1e71, 1e72, 1e73, 1e74, 1e75, 1e76, 1e77, 1e78, 1e79, 1e80, 1e81, 1e82, 1e83, 1e84, 1e85, 1e86, 1e87, 1e88, 1e89, 1e90, 1e91, 1e92, 1e93, 1e94, 1e95, 1e96, 1e97, 1e98, 1e99, 1e100, 1e101, 1e102, 1e103, 1e104, 1e105, 1e106, 1e107, 1e108, 1e109, 1e110, 1e111, 1e112, 1e113, 1e114, 1e115, 1e116, 1e117, 1e118, 1e119, 1e120, 1e121, 1e122, 1e123, 1e124, 1e125, 1e126, 1e127, 1e128, 1e129, 1e130, 1e131, 1e132, 1e133, 1e134, 1e135, 1e136, 1e137, 1e138, 1e139, 1e140, 1e141, 1e142, 1e143, 1e144, 1e145, 1e146, 1e147, 1e148, 1e149, 1e150, 1e151, 1e152, 1e153, 1e154, 1e155, 1e156, 1e157, 1e158, 1e159, 1e160, 1e161, 1e162, 1e163, 1e164, 1e165, 1e166, 1e167, 1e168, 1e169, 1e170, 1e171, 1e172, 1e173, 1e174, 1e175, 1e176, 1e177, 1e178, 1e179, 1e180, 1e181, 1e182, 1e183, 1e184, 1e185, 1e186, 1e187, 1e188, 1e189, 1e190, 1e191, 1e192, 1e193, 1e194, 1e195, 1e196, 1e197, 1e198, 1e199, 1e200, 1e201, 1e202, 1e203, 1e204, 1e205, 1e206, 1e207, 1e208, 1e209, 1e210, 1e211, 1e212, 1e213, 1e214, 1e215, 1e216, 1e217, 1e218, 1e219, 1e220, 1e221, 1e222, 1e223, 1e224, 1e225, 1e226, 1e227, 1e228, 1e229, 1e230, 1e231, 1e232, 1e233, 1e234, 1e235, 1e236, 1e237, 1e238, 1e239, 1e240, 1e241, 1e242, 1e243, 1e244, 1e245, 1e246, 1e247, 1e248, 1e249, 1e250, 1e251, 1e252, 1e253, 1e254, 1e255, 1e256, 1e257, 1e258, 1e259, 1e260, 1e261, 1e262, 1e263, 1e264, 1e265, 1e266, 1e267, 1e268, 1e269, 1e270, 1e271, 1e272, 1e273, 1e274, 1e275, 1e276, 1e277, 1e278, 1e279, 1e280, 1e281, 1e282, 1e283, 1e284, 1e285, 1e286, 1e287, 1e288, 1e289, 1e290, 1e291, 1e292, 1e293, 1e294, 1e295, 1e296, 1e297, 1e298, 1e299, 1e300, 1e301, 1e302, 1e303, 1e304, 1e305, 1e306, 1e307, 1e308
	];
	nexacro.Decimal._fraction_10_n = [1e0, 1e-1, 1e-2, 1e-3, 1e-4, 1e-5, 1e-6, 1e-7, 1e-8, 1e-9, 1e-10, 1e-11, 1e-12, 1e-13, 1e-14, 1e-15, 1e-16, 1e-17, 1e-18, 1e-19, 1e-20, 1e-21, 1e-22, 1e-23, 1e-24, 1e-25, 1e-26, 1e-27, 1e-28, 1e-29, 1e-30, 1e-31, 1e-32, 1e-33, 1e-34, 1e-35, 1e-36, 1e-37, 1e-38, 1e-39, 1e-40, 1e-41, 1e-42, 1e-43, 1e-44, 1e-45, 1e-46, 1e-47, 1e-48, 1e-49, 1e-50, 1e-51, 1e-52, 1e-53, 1e-54, 1e-55, 1e-56, 1e-57, 1e-58, 1e-59, 1e-60, 1e-61, 1e-62, 1e-63, 1e-64, 1e-65, 1e-66, 1e-67, 1e-68, 1e-69, 1e-70, 1e-71, 1e-72, 1e-73, 1e-74, 1e-75, 1e-76, 1e-77, 1e-78, 1e-79, 1e-80, 1e-81, 1e-82, 1e-83, 1e-84, 1e-85, 1e-86, 1e-87, 1e-88, 1e-89, 1e-90, 1e-91, 1e-92, 1e-93, 1e-94, 1e-95, 1e-96, 1e-97, 1e-98, 1e-99, 1e-100, 1e-101, 1e-102, 1e-103, 1e-104, 1e-105, 1e-106, 1e-107, 1e-108, 1e-109, 1e-110, 1e-111, 1e-112, 1e-113, 1e-114, 1e-115, 1e-116, 1e-117, 1e-118, 1e-119, 1e-120, 1e-121, 1e-122, 1e-123, 1e-124, 1e-125, 1e-126, 1e-127, 1e-128, 1e-129, 1e-130, 1e-131, 1e-132, 1e-133, 1e-134, 1e-135, 1e-136, 1e-137, 1e-138, 1e-139, 1e-140, 1e-141, 1e-142, 1e-143, 1e-144, 1e-145, 1e-146, 1e-147, 1e-148, 1e-149, 1e-150, 1e-151, 1e-152, 1e-153, 1e-154, 1e-155, 1e-156, 1e-157, 1e-158, 1e-159, 1e-160, 1e-161, 1e-162, 1e-163, 1e-164, 1e-165, 1e-166, 1e-167, 1e-168, 1e-169, 1e-170, 1e-171, 1e-172, 1e-173, 1e-174, 1e-175, 1e-176, 1e-177, 1e-178, 1e-179, 1e-180, 1e-181, 1e-182, 1e-183, 1e-184, 1e-185, 1e-186, 1e-187, 1e-188, 1e-189, 1e-190, 1e-191, 1e-192, 1e-193, 1e-194, 1e-195, 1e-196, 1e-197, 1e-198, 1e-199, 1e-200, 1e-201, 1e-202, 1e-203, 1e-204, 1e-205, 1e-206, 1e-207, 1e-208, 1e-209, 1e-210, 1e-211, 1e-212, 1e-213, 1e-214, 1e-215, 1e-216, 1e-217, 1e-218, 1e-219, 1e-220, 1e-221, 1e-222, 1e-223, 1e-224, 1e-225, 1e-226, 1e-227, 1e-228, 1e-229, 1e-230, 1e-231, 1e-232, 1e-233, 1e-234, 1e-235, 1e-236, 1e-237, 1e-238, 1e-239, 1e-240, 1e-241, 1e-242, 1e-243, 1e-244, 1e-245, 1e-246, 1e-247, 1e-248, 1e-249, 1e-250, 1e-251, 1e-252, 1e-253, 1e-254, 1e-255, 1e-256, 1e-257, 1e-258, 1e-259, 1e-260, 1e-261, 1e-262, 1e-263, 1e-264, 1e-265, 1e-266, 1e-267, 1e-268, 1e-269, 1e-270, 1e-271, 1e-272, 1e-273, 1e-274, 1e-275, 1e-276, 1e-277, 1e-278, 1e-279, 1e-280, 1e-281, 1e-282, 1e-283, 1e-284, 1e-285, 1e-286, 1e-287, 1e-288, 1e-289, 1e-290, 1e-291, 1e-292, 1e-293, 1e-294, 1e-295, 1e-296, 1e-297, 1e-298, 1e-299, 1e-300, 1e-301, 1e-302, 1e-303, 1e-304, 1e-305, 1e-306, 1e-307, 1e-308
	];
	nexacro.Decimal._QD_SPLITTER = 134217729.0;
	nexacro.Decimal._QD_SPLIT_THRESH = 6.69692879491417e+299;
	nexacro.Decimal._zero_strs = ['', '0', '00', '000', '0000', '00000', '000000', '0000000', '00000000'];
	nexacro.Decimal._opt_precision = 19;

	nexacro.Decimal._getPow = function (n, dec) {
		if (n == 0) {
			dec.setDouble(1.0);
			return;
		}

		var s = new nexacro.Decimal();
		s.setDouble(1.0);
		dec.setDouble(10.0);

		var N = Math.abs(n) | 0;
		if (N > 1) {
			while (N > 0) {
				if ((N % 2) | 0 == 1) {
					s.mulDecimal(dec);
				}

				N = (N / 2) | 0;
				if (N > 0) {
					dec.sqr();
				}
			}
		}
		else {
			s.setDouble(10.0);
		}

		if (n < 0) {
			dec.setDouble(1.0);
			dec.divDecimal(s);
		}
		else {
			dec.setDecimal(s);
		}

		return;
	};

	var _pDecimal = nexacro.Decimal.prototype;

	_pDecimal._parse = function (numstr) {
		this.hi = 0;
		this.lo = 0;

		var pos = 0;

		if (!numstr) {
			return;
		}

		var len = numstr.length;

		var ch;
		while (pos < len) {
			ch = numstr.charAt(pos);
			if (ch != ' ' && ch != '\t') {
				break;
			}
			pos++;
		}

		if (pos >= len) {
			this.hi = Number.NaN;
			return;
		}

		var sign = 0;
		ch = numstr.charAt(pos);
		if (ch == '-') {
			sign = 1;
			pos++;
		}
		else if (ch == '+') {
			pos++;
		}

		var ipos = pos;
		var fpos = pos;
		while (fpos < len) {
			ch = numstr.charAt(fpos);
			if (ch < '0' || ch > '9') {
				break;
			}
			fpos++;
		}

		var digits;
		var frac_offset = 0;

		var tpos = ipos;
		while (tpos < fpos) {
			pos = tpos;
			tpos += 9;
			if (tpos > fpos) {
				tpos = fpos;
			}

			while (pos < tpos) {
				ch = numstr.charAt(pos++);
				this.mulDouble(10.0);
				this.addDouble((ch - '0') | 0);
			}
		}

		var epos, dfrac = 0;
		ch = numstr.charAt(fpos);
		if (ch == '.') {
			fpos++;
			pos = fpos;

			epos = numstr.search(/0+$/g);
			while (pos < len) {
				ch = numstr.charAt(pos);
				if (ch < '0' || ch > '9') {
					break;
				}
				pos++;
			}
			if (epos < 0 || pos < epos) {
				epos = pos;
			}

			tpos = fpos;
			while (tpos < epos) {
				pos = tpos;
				tpos += 9;
				if (tpos > epos) {
					tpos = epos;
					frac_offset = tpos - pos;
				}
				else {
					frac_offset = 9;
				}

				while (pos < tpos) {
					ch = numstr.charAt(pos++);
					this.mulDouble(10.0);
					this.addDouble((ch - '0') | 0);
				}
				dfrac += frac_offset;
			}
		}
		else {
			epos = fpos;
		}

		var negf;
		ch = numstr.charAt(epos);
		digits = 0;
		if (ch == 'e' || ch == 'E') {
			epos++;
			ch = numstr.charAt(epos);
			if (ch == '-') {
				negf = 1;
				epos++;
			}
			else if (ch == '+') {
				negf = 0;
				epos++;
			}
			else {
				negf = 0;
			}

			pos = epos;
			while (pos < len) {
				ch = numstr.charAt(pos);
				if (ch < '0' || ch > '9') {
					break;
				}
				pos++;
			}
			len = pos + 1;
			if (len > numstr.length) {
				len = numstr.length;
			}

			pos = epos;

			while (pos < len) {
				digits *= 10;
				ch = numstr.charAt(pos++);
				digits += (ch - '0');
			}

			if (digits >= 308) {
				if (negf) {
					this.hi = 0.0;
					this.lo = 0.0;
				}
				else {
					this.hi = (sign ? -Infinity : Infinity);
					this.lo = 0.0;
				}
				return;
			}
			if (negf) {
				digits = -digits;
			}
		}

		var scale = new nexacro.Decimal();
		if (dfrac > 0) {
			digits -= dfrac;
		}

		if (digits != 0) {
			nexacro.Decimal._getPow(digits, scale);
			this.mulDecimal(scale);
		}

		if (this.hi == Infinity) {
			this.lo = 0.0;
		}

		if (sign) {
			this.hi = -this.hi;
			this.lo = -this.lo;
		}
	};

	_pDecimal.setDouble = function (hi) {
		if (typeof hi != 'number') {
			throw new TypeError("Invalid arguments type!");
		}

		this.hi = hi;
		this.lo = 0.0;
	};

	_pDecimal.setDecimal = function (dec) {
		if (!(dec instanceof nexacro.Decimal)) {
			throw new TypeError("Invalid arguments type!");
		}

		this.hi = dec.hi;
		this.lo = dec.lo;
	};

	_pDecimal.setString = function (numstr) {
		if (typeof numstr != 'string') {
			throw new TypeError("Invalid arguments type!");
		}

		this._parse(numstr);
	};

	_pDecimal.isZero = function () {
		return (this.hi == 0.0 && this.lo == 0.0);
	};
	_pDecimal.isEqual = function (dec) {
		if (!(dec instanceof nexacro.Decimal)) {
			throw new TypeError("Invalid arguments type!");
		}

		return (this.hi == dec.hi && this.lo == dec.lo);
	};
	_pDecimal.isInfinity = function () {
		return (this.hi == Infinity || this.hi == -Infinity);
	};
	_pDecimal.isNaN = function () {
		return (this.hi != this.hi);
	};
	_pDecimal.isNaNOrInf = function () {
		return (this.hi == Infinity || this.hi == -Infinity || this.hi != this.hi);
	};
	_pDecimal.isNegative = function () {
		return this.hi < 0.0 || (this.hi == 0.0 && this.lo < 0.0);
	};

	_pDecimal.addDouble = function (dval) {
		var H, S, s, e;

		if (nexacro._getDatatypeRule() != "1.0") {
			if (this.isInfinity() || !isFinite(dval)) {
				this.hi += dval;
				this.lo = 0.0;

				return;
			}
		}

		S = this.hi + dval;
		e = S - this.hi;
		s = S - e;
		s = (dval - e) + (this.hi - s);
		e = s + this.lo;
		H = S + e;
		e = e + (S - H);

		this.hi = H + e;
		this.lo = e + (H - this.hi);
	};

	_pDecimal.addDecimal = function (dec) {
		var H, h, T, t, S, s, e, f;

		if (nexacro._getDatatypeRule() != "1.0") {
			if (this.isInfinity() || dec.isInfinity()) {
				this.hi += dec.hi;
				this.lo = 0.0;

				return;
			}
		}

		S = this.hi + dec.hi;
		T = this.lo + dec.lo;
		e = S - this.hi;
		f = T - this.lo;
		s = S - e;
		t = T - f;
		s = (dec.hi - e) + (this.hi - s);
		t = (dec.lo - f) + (this.lo - t);
		e = s + T;
		H = S + e;
		h = e + (S - H);
		e = t + h;

		this.hi = H + e;
		this.lo = e + (H - this.hi);
	};

	_pDecimal.subDouble = function (dval) {
		var H, S, s, e;

		if (nexacro._getDatatypeRule() != "1.0") {
			if (this.isInfinity() || !isFinite(dval)) {
				this.hi -= dval;
				this.lo = 0.0;

				return;
			}
		}

		S = this.hi - dval;
		e = S - this.hi;
		s = S - e;
		s = (-dval - e) + (this.hi - s);
		e = s + this.lo;
		H = S + e;
		e = e + (S - H);

		this.hi = H + e;
		this.lo = e + (H - this.hi);
	};

	_pDecimal.subDecimal = function (dec) {
		var H, h, T, t, S, s, e, f;
		if (nexacro._getDatatypeRule() != "1.0") {
			if (this.isInfinity() || dec.isInfinity()) {
				this.hi -= dec.hi;
				this.lo = 0.0;

				return;
			}
		}

		S = this.hi - dec.hi;
		T = this.lo - dec.lo;
		e = S - this.hi;
		f = T - this.lo;
		s = S - e;
		t = T - f;
		s = (-dec.hi - e) + (this.hi - s);
		t = (-dec.lo - f) + (this.lo - t);
		e = s + T;
		H = S + e;
		h = e + (S - H);
		e = t + h;

		this.hi = H + e;
		this.lo = e + (H - this.hi);
	};

	_pDecimal.mulDouble = function (dval) {
		var hx, tx, hy, ty, C, c;
		var hi;

		if (nexacro._getDatatypeRule() != "1.0") {
			if (this.isInfinity() || !isFinite(dval)) {
				this.hi *= dval;
				this.lo = 0.0;

				return;
			}
		}

		hi = this.hi;
		if (hi > nexacro.Decimal._QD_SPLIT_THRESH || hi < -nexacro.Decimal._QD_SPLIT_THRESH) {
			hi *= 3.7252902984619140625e-09;
			C = nexacro.Decimal._QD_SPLITTER *  hi;
			hx = C - hi;
			hx = C - hx;
			tx = hi - hx;
			hx = hx *  268435456.0;
			tx = tx *  268435456.0;
		}
		else {
			C = nexacro.Decimal._QD_SPLITTER *  hi;
			hx = C - hi;
			hx = C - hx;
			tx = hi - hx;
		}

		hi = dval;
		if (hi > nexacro.Decimal._QD_SPLIT_THRESH || hi < -nexacro.Decimal._QD_SPLIT_THRESH) {
			hi *= 3.7252902984619140625e-09;
			c = nexacro.Decimal._QD_SPLITTER *  hi;
			hy = c - hi;
			hy = c - hy;
			ty = hi - hy;
			hy = hy *  268435456.0;
			ty = ty *  268435456.0;
		}
		else {
			c = nexacro.Decimal._QD_SPLITTER *  hi;
			hy = c - hi;
			hy = c - hy;
			ty = hi - hy;
		}

		C = this.hi *  dval;
		c = hx *  hy;
		if ((c == Infinity || c == -Infinity) && C != Infinity && C != -Infinity) {
			var tC = C *  3.7252902984619140625e-09;
			var tc = hx *  3.7252902984619140625e-09 *  hy;
			c = ((((tc - tC) *  268435456.0 + hx *  ty) + tx *  hy) + tx *  ty) + (this.lo *  dval);
		}
		else {
			c = ((((c - C) + hx *  ty) + tx *  hy) + tx *  ty) + (this.lo *  dval);
		}

		this.hi = C + c;
		hx = C - this.hi;
		this.lo = c + hx;
	};

	_pDecimal.mulDecimal = function (dec) {
		var hx, tx, hy, ty, C, c;
		var hi;

		if (nexacro._getDatatypeRule() != "1.0") {
			if (this.isInfinity() || dec.isInfinity()) {
				this.hi *= dec.hi;
				this.lo = 0.0;

				return;
			}
		}

		hi = this.hi;
		if (hi > nexacro.Decimal._QD_SPLIT_THRESH || hi < -nexacro.Decimal._QD_SPLIT_THRESH) {
			hi *= 3.7252902984619140625e-09;
			C = nexacro.Decimal._QD_SPLITTER *  hi;
			hx = C - hi;
			hx = C - hx;
			tx = hi - hx;
			hx = hx *  268435456.0;
			tx = tx *  268435456.0;
		}
		else {
			C = nexacro.Decimal._QD_SPLITTER *  hi;
			hx = C - hi;
			hx = C - hx;
			tx = hi - hx;
		}

		hi = dec.hi;
		if (hi > nexacro.Decimal._QD_SPLIT_THRESH || hi < -nexacro.Decimal._QD_SPLIT_THRESH) {
			hi *= 3.7252902984619140625e-09;
			c = nexacro.Decimal._QD_SPLITTER *  hi;
			hy = c - hi;
			hy = c - hy;
			ty = hi - hy;
			hy = hy *  268435456.0;
			ty = ty *  268435456.0;
		}
		else {
			c = nexacro.Decimal._QD_SPLITTER *  hi;
			hy = c - hi;
			hy = c - hy;
			ty = hi - hy;
		}

		C = this.hi *  dec.hi;
		c = hx *  hy;
		if ((c == Infinity || c == -Infinity) && C != Infinity && C != -Infinity) {
			var tC = C *  3.7252902984619140625e-09;
			var tc = hx *  3.7252902984619140625e-09 *  hy;
			c = ((((tc - tC) *  268435456.0 + hx *  ty) + tx *  hy) + tx *  ty) + (this.hi *  dec.lo + this.lo *  dec.hi);
		}
		else {
			c = ((((c - C) + hx *  ty) + tx *  hy) + tx *  ty) + (this.hi *  dec.lo + this.lo *  dec.hi);
		}

		this.hi = C + c;
		hx = C - this.hi;
		this.lo = c + hx;
	};

	_pDecimal.divDouble = function (dval) {
		var q1, q2, p1, p2, s, e, h1, l1, h2, l2;

		if (nexacro._getDatatypeRule() != "1.0") {
			if (this.isInfinity() || !isFinite(dval)) {
				this.hi /= dval;
				this.lo = 0.0;

				return;
			}
		}
		q1 = this.hi / dval;
		p1 = q1 *  dval;

		var temp, tempe;
		if (q1 > nexacro.Decimal._QD_SPLIT_THRESH || q1 < -nexacro.Decimal._QD_SPLIT_THRESH) {
			q1 *= 3.7252902984619140625e-09;
			temp = nexacro.Decimal._QD_SPLITTER *  q1;
			h1 = temp - (temp - q1);
			l1 = q1 - h1;
			h1 *= 268435456.0;
			l1 *= 268435456.0;
		}
		else {
			temp = nexacro.Decimal._QD_SPLITTER *  q1;
			h1 = temp - (temp - q1);
			l1 = q1 - h1;
		}

		q2 = dval;
		if (q2 > nexacro.Decimal._QD_SPLIT_THRESH || q2 < -nexacro.Decimal._QD_SPLIT_THRESH) {
			q2 *= 3.7252902984619140625e-09;
			temp = nexacro.Decimal._QD_SPLITTER *  q2;
			h2 = temp - (temp - q2);
			l2 = q2 - h2;
			h2 *= 268435456.0;
			l2 *= 268435456.0;
		}
		else {
			temp = nexacro.Decimal._QD_SPLITTER *  q2;
			h2 = temp - (temp - q2);
			l2 = q2 - h2;
		}
		p2 = ((h1 *  h2 - p1) + h1 *  l2 + l1 *  h2) + l1 *  l2;

		s = this.hi - p1;
		tempe = s - this.hi;
		e = (this.hi - (s - tempe)) - (p1 + tempe) + this.lo - p2;

		q2 = (s + e) / dval;

		this.hi = q1 + q2;
		this.lo = q2 - (this.hi - q1);
	};

	_pDecimal.divDecimal = function (dec) {
		var C, c, tc;

		if (nexacro._getDatatypeRule() != "1.0") {
			if (this.isInfinity() || dec.isInfinity()) {
				this.hi /= dec.hi;
				this.lo = 0.0;

				return;
			}
		}

		var r = new nexacro.Decimal(this);

		C = this.hi / dec.hi;
		var rx = new nexacro.Decimal(C, 0.0);
		rx.mulDecimal(dec);
		r.subDecimal(rx);

		c = r.hi / dec.hi;
		var ry = new nexacro.Decimal(c, 0.0);
		ry.mulDecimal(dec);
		r.subDecimal(ry);

		tc = r.hi / dec.hi;

		this.hi = C + c;
		this.lo = c - (this.hi - C);
		this.addDouble(tc);
	};

	_pDecimal.modDouble = function (dval) {
		if (nexacro._getDatatypeRule() != "1.0") {
			if (this.isInfinity() || !isFinite(dval)) {
				this.hi %= dval;
				this.lo = 0.0;

				return;
			}
		}

		var r = new nexacro.Decimal(this);
		r.divDouble(dval);
		r.floor();
		r.mulDouble(dval);
		this.subDecimal(r);
	};

	_pDecimal.modDecimal = function (dec) {
		if (nexacro._getDatatypeRule() != "1.0") {
			if (this.isInfinity() || dec.isInfinity()) {
				this.hi %= dec.hi;
				this.lo = 0.0;

				return;
			}
		}

		var r = new nexacro.Decimal(this);
		r.divDecimal(dec);
		r.floor();
		r.mulDecimal(dec);
		this.subDecimal(r);
	};

	_pDecimal.sqr = function () {
		var p1, p2;
		var hi = this.hi, lo = this.lo;
		var temp, ht, lt;

		if (nexacro._getDatatypeRule() != "1.0") {
			if (this.isInfinity()) {
				this.hi = hi *  hi;
				this.lo = 0.0;

				return;
			}
		}

		p1 = hi *  hi;
		if (hi > nexacro.Decimal._QD_SPLIT_THRESH || hi < -nexacro.Decimal._QD_SPLIT_THRESH) {
			hi *= 3.7252902984619140625e-09;
			temp = nexacro.Decimal._QD_SPLITTER *  hi;
			ht = temp - (temp - hi);
			lt = hi - ht;
			hi = ht *  268435456.0;
			lo = lt *  268435456.0;
		}
		else {
			temp = nexacro.Decimal._QD_SPLITTER *  hi;
			hi = temp - (temp - hi);
			lo = this.hi - hi;
		}

		p2 = ((hi *  hi - p1) + 2.0 *  hi *  lo) + lo *  lo;
		p2 += 2.0 *  this.hi *  this.lo;
		p2 += this.lo *  this.lo;

		this.hi = p1 + p2;
		this.lo = p2 - (this.hi - p1);
	};

	_pDecimal.abs = function () {
		if (this.isNegative()) {
			var s1 = -this.hi;
			var s2 = -this.lo;

			this.hi = s1 + s2;
			this.lo = s2 - (this.hi - s1);
		}
		return this;
	};

	_pDecimal.floor = function () {
		var fhi = Math.floor(this.hi);
		if (fhi == this.hi) {
			this.lo = Math.floor(this.lo);
		}
		else {
			this.hi = fhi;
			this.lo = 0.0;
		}
		return this;
	};
	_pDecimal.ceil = function () {
		var fhi = Math.ceil(this.hi);
		if (fhi == this.hi) {
			this.lo = Math.ceil(this.lo);
		}
		else {
			this.hi = fhi;
			this.lo = 0.0;
		}
		return this;
	};
	_pDecimal.round = function () {
		this.addDouble(0.5);
		return this.floor();
	};
	_pDecimal.trunc = function () {
		if (this.hi > 0.0) {
			return this.floor();
		}
		else {
			return this.ceil();
		}
	};

	_pDecimal.toString = function () {
		if (this.isZero()) {
			return "0";
		}

		if (this.isNaN()) {
			return "NaN";
		}

		if (this.isInfinity()) {
			return this.hi + "";
		}

		var _cvt = this._getCVT();
		if (_cvt.dec >= -5 && _cvt.dec <= 24) {
			return this._toStandardStr(_cvt);
		}

		return this._toScientificStr(_cvt);
	};

	_pDecimal.valueOf = function () {
		return this.hi + this.lo;
	};

	_pDecimal._getCVT = function () {
		var sign = 0;
		var y = new nexacro.Decimal(this);

		if (this.hi < 0.0 || this.hi == 0.0 && this.lo < 0.0) {
			sign = 1;
			y.abs();
		}


		var dAbs = Math.abs(y.hi);
		var exp = Math.floor(Math.log(dAbs) *  Math.LOG10E) | 0;

		var scale = new nexacro.Decimal();
		if (exp < -300) {
			nexacro.Decimal._getPow(300, scale);
			y.mulDecimal(scale);

			nexacro.Decimal._getPow(exp + 300, scale);
			y.divDecimal(scale);
		}
		else if (exp > 300) {
			y.hi *= Math.pow(2, -53);
			y.lo *= Math.pow(2, -53);
			nexacro.Decimal._getPow(exp, scale);
			y.divDecimal(scale);
			y.hi *= Math.pow(2, 53);
			y.lo *= Math.pow(2, 53);
		}
		else {
			nexacro.Decimal._getPow(exp, scale);
			y.divDecimal(scale);
		}


		if ((y.hi > 10.0 || (y.hi == 10.0 && y.lo >= 0.0))) {
			y.divDouble(10.0);
			exp++;
		}
		else if ((y.hi < 1.0 || (y.hi == 1.0 && y.lo < 0.0))) {
			y.mulDouble(10.0);
			exp--;
		}

		var pos = 0, digit, buf = [];

		while (pos < 32) {
			digit = y.hi | 0;

			y.subDouble(digit);
			y.mulDouble(10.0);
			buf[pos++] = digit;
		}

		var len = buf.length;


		for (var i = len - 1; i > 0; i--) {
			if (buf[i] < 0) {
				buf[i - 1]--;
				buf[i] += 10;
			}
			else if (buf[i] > 9) {
				buf[i - 1]++;
				buf[i] -= 10;
			}
		}

		if (exp < -5 || exp > 24) {
			var precision = nexacro.Decimal._opt_precision;
			if (len > precision) {
				len = buf.length = precision;
			}
		}

		if (buf[len - 1] >= 5) {
			buf[len - 2]++;
			buf[len - 1] = 0;

			i = len - 2;
			while (i > 0 && buf[i] > 9) {
				buf[i] -= 10;
				buf[--i]++;
			}
		}

		len = buf.length;


		if (buf[0] > 9) {
			exp++;
			for (i = len - 1; i >= 2; i--) {
				buf[i] = buf[i - 1];
			}

			buf[0] = 1;
			buf[1] = 0;
		}

		pos = buf.length - 1;
		while (pos > 0 && buf[pos - 1] == 0) {
			--pos;
		}

		var _cvt_info = {
		};
		_cvt_info.dec = exp + 1;
		_cvt_info.exp = exp;
		_cvt_info.sign = sign;
		_cvt_info.pos = pos;
		_cvt_info.buf = buf.join('').substr(0, pos);
		return _cvt_info;
	};

	_pDecimal._toScientificStr = function (cvt) {
		var str = '', digits = 0;
		var _cvt = cvt;
		if (_cvt == null || _cvt.pos == 0) {
			return '0';
		}

		digits = _cvt.pos;
		if (_cvt.sign) {
			str = '-';
		}

		str += _cvt.buf.charAt(0);
		if (digits > 1) {
			str += '.';
			str += _cvt.buf.substring(1);
		}

		var exp = _cvt.exp;
		if (exp != 0) {
			str += ((exp > 0) ? 'e+' : 'e');
			str += exp;
		}

		return str;
	};

	_pDecimal._toStandardStr = function (cvt) {
		var str = '', digits = 0, dec = 0;
		var _cvt = cvt;
		if (_cvt == null || _cvt.pos == 0) {
			return '0';
		}

		if (_cvt.sign) {
			str = '-';
		}

		dec = _cvt.dec;
		digits = _cvt.pos;
		var buf = _cvt.buf;
		if (dec <= 0) {
			str += '0.';
			for (var i = dec; i < 0; i++) {
				str += '0';
			}
			str += buf;
		}
		else if (digits > dec) {
			str += buf.substring(0, dec);
			str += '.';
			str += buf.substring(dec);
		}
		else {
			str += buf;
			if ((dec - digits) > 0) {
				for (var j = 0; j < (dec - digits); j++) {
					str += '0';
				}
			}
		}
		return str;
	};

	_pDecimal.toFixed = function (fractionDigits) {
		var decimal_point = ".";
		var thousands_sep = ",";
		var grouping = 0;
		var positive_sign = "";
		var negative_sign = "-";
		var isNegative = this.isNegative();

		var locale_string = this._getFormattedStringValue(this, decimal_point, thousands_sep, grouping, fractionDigits, true);

		if (isNegative) {
			locale_string = negative_sign + locale_string;
		}
		else {
			locale_string = positive_sign + locale_string;
		}

		return locale_string;
	};

	_pDecimal.toExponential = function () {
	};

	_pDecimal.toPrecision = function () {
	};

	_pDecimal.toLocaleString = function (locale) {
		var locale_info = nexacro.Locale.getLocaleInfo(locale);
		var decimal_point = locale_info.decimal_point;
		var thousands_sep = locale_info.thousands_sep;
		var grouping = locale_info.grouping;
		var positive_sign = locale_info.positive_sign;
		var negative_sign = locale_info.negative_sign;
		var isNegative = this.isNegative();

		var locale_string = this._getFormattedStringValue(this, decimal_point, thousands_sep, grouping, 3);


		if (isNegative) {
			locale_string = negative_sign + locale_string;
		}
		else {
			locale_string = positive_sign + locale_string;
		}

		return locale_string;
	};

	_pDecimal.toLocaleCurrencyString = function (locale) {
		var locale_info = nexacro.Locale.getLocaleInfo(locale);
		var mon_decimal_point = locale_info.mon_decimal_point;
		var mon_thousands_sep = locale_info.mon_thousands_sep;
		var currency_symbol = locale_info.currency_symbol.trim();
		var mon_grouping = locale_info.mon_grouping;
		var int_frac_digits = locale_info.int_frac_digits;
		var positive_sign = locale_info.positive_sign;
		var negative_sign = locale_info.negative_sign;
		var p_cs_precedes = locale_info.p_cs_precedes;
		var p_sep_by_space = locale_info.p_sep_by_space;
		var n_cs_precedes = locale_info.n_cs_precedes;
		var n_sep_by_space = locale_info.n_sep_by_space;
		var p_sign_position = locale_info.p_sign_posn;
		var n_sign_position = locale_info.n_sign_posn;
		var mon_n_sign_position = locale_info.mon_n_sign_posn;
		if (mon_n_sign_position != undefined) {
			n_sign_position = mon_n_sign_position;
		}

		var space_char = "\u0020";
		var isNegative = this.isNegative();

		var locale_string = this._getFormattedStringValue(this, mon_decimal_point, mon_thousands_sep, mon_grouping, int_frac_digits, true);

		if (isNegative) {
			if (n_cs_precedes) {
				switch (n_sign_position) {
					case 0:
						{

							switch (n_sep_by_space) {
								case 0:
								case 2:
									{

										locale_string = "(" + currency_symbol + locale_string + ")";
									}
									break;
								case 1:
									{

										locale_string = "(" + currency_symbol + space_char + locale_string + ")";
									}
									break;
							}
						}
						break;
					case 1:
					case 3:
						{

							switch (n_sep_by_space) {
								case 0:
									{

										locale_string = negative_sign + currency_symbol + locale_string;
									}
									break;
								case 1:
									{

										locale_string = negative_sign + currency_symbol + space_char + locale_string;
									}
									break;
								case 2:
									{

										locale_string = negative_sign + space_char + currency_symbol + locale_string;
									}
									break;
							}
						}
						break;
					case 2:
						{

							switch (n_sep_by_space) {
								case 0:
									{

										locale_string = currency_symbol + locale_string + negative_sign;
									}
									break;
								case 1:
									{

										locale_string = currency_symbol + space_char + locale_string + negative_sign;
									}
									break;
								case 2:
									{

										locale_string = currency_symbol + locale_string + space_char + negative_sign;
									}
									break;
							}
						}
						break;
					case 4:
						{

							switch (n_sep_by_space) {
								case 0:
									{

										locale_string = currency_symbol + negative_sign + locale_string;
									}
									break;
								case 1:
									{

										locale_string = currency_symbol + negative_sign + space_char + locale_string;
									}
									break;
								case 2:
									{

										locale_string = currency_symbol + space_char + negative_sign + locale_string;
									}
									break;
							}
						}
						break;
				}
			}
			else {
				switch (n_sign_position) {
					case 0:
						{

							switch (n_sep_by_space) {
								case 0:
									{

										locale_string = "(" + locale_string + currency_symbol + ")";
									}
									break;
								case 1:
								case 2:
									{

										locale_string = "(" + locale_string + space_char + currency_symbol + ")";
									}
									break;
							}
						}
						break;
					case 1:
						{

							switch (n_sep_by_space) {
								case 0:
									{

										locale_string = negative_sign + locale_string + currency_symbol;
									}
									break;
								case 1:
								case 2:
									{

										locale_string = negative_sign + locale_string + space_char + currency_symbol;
									}
									break;
							}
						}
						break;
					case 2:
					case 4:
						{

							switch (n_sep_by_space) {
								case 0:
									{

										locale_string = locale_string + currency_symbol + negative_sign;
									}
									break;
								case 1:
									{

										locale_string = locale_string + space_char + currency_symbol + negative_sign;
									}
									break;
								case 2:
									{

										locale_string = locale_string + currency_symbol + space_char + negative_sign;
									}
									break;
							}
						}
						break;
					case 3:
						{

							switch (n_sep_by_space) {
								case 0:
									{

										locale_string = locale_string + negative_sign + currency_symbol;
									}
									break;
								case 1:
									{

										locale_string = locale_string + space_char + negative_sign + currency_symbol;
									}
									break;
								case 2:
									{

										locale_string = locale_string + negative_sign + space_char + currency_symbol;
									}
									break;
							}
						}
						break;
				}
			}
		}
		else {
			if (p_cs_precedes) {
				switch (p_sign_position) {
					case 0:
						{

							switch (p_sep_by_space) {
								case 0:
								case 2:
									{

										locale_string = "(" + currency_symbol + locale_string + ")";
									}
									break;
								case 1:
									{

										locale_string = "(" + currency_symbol + space_char + locale_string + ")";
									}
									break;
							}
						}
						break;
					case 1:
					case 3:
						{

							switch (p_sep_by_space) {
								case 0:
									{

										locale_string = positive_sign + currency_symbol + locale_string;
									}
									break;
								case 1:
									{

										locale_string = positive_sign + currency_symbol + space_char + locale_string;
									}
									break;
								case 2:
									{

										locale_string = positive_sign + space_char + currency_symbol + locale_string;
									}
									break;
							}
						}
						break;
					case 2:
						{

							switch (p_sep_by_space) {
								case 0:
									{

										locale_string = currency_symbol + locale_string + positive_sign;
									}
									break;
								case 1:
									{

										locale_string = currency_symbol + space_char + locale_string + positive_sign;
									}
									break;
								case 2:
									{

										locale_string = currency_symbol + locale_string + space_char + positive_sign;
									}
									break;
							}
						}
						break;
					case 4:
						{

							switch (p_sep_by_space) {
								case 0:
									{

										locale_string = currency_symbol + positive_sign + locale_string;
									}
									break;
								case 1:
									{

										locale_string = currency_symbol + positive_sign + space_char + locale_string;
									}
									break;
								case 2:
									{

										locale_string = currency_symbol + space_char + positive_sign + locale_string;
									}
									break;
							}
						}
						break;
				}
			}
			else {
				switch (p_sign_position) {
					case 0:
						{

							switch (p_sep_by_space) {
								case 0:
									{

										locale_string = "(" + locale_string + currency_symbol + ")";
									}
									break;
								case 1:
								case 2:
									{

										locale_string = "(" + locale_string + space_char + currency_symbol + ")";
									}
									break;
							}
						}
						break;
					case 1:
						{

							switch (p_sep_by_space) {
								case 0:
									{

										locale_string = positive_sign + locale_string + currency_symbol;
									}
									break;
								case 1:
								case 2:
									{

										locale_string = positive_sign + locale_string + space_char + currency_symbol;
									}
									break;
							}
						}
						break;
					case 2:
					case 4:
						{

							switch (p_sep_by_space) {
								case 0:
									{

										locale_string = locale_string + currency_symbol + positive_sign;
									}
									break;
								case 1:
									{

										locale_string = locale_string + space_char + currency_symbol + positive_sign;
									}
									break;
								case 2:
									{

										locale_string = locale_string + currency_symbol + space_char + positive_sign;
									}
									break;
							}
						}
						break;
					case 3:
						{

							switch (p_sep_by_space) {
								case 0:
									{

										locale_string = locale_string + positive_sign + currency_symbol;
									}
									break;
								case 1:
									{

										locale_string = locale_string + space_char + positive_sign + currency_symbol;
									}
									break;
								case 2:
									{

										locale_string = locale_string + positive_sign + space_char + currency_symbol;
									}
									break;
							}
						}
						break;
				}
			}
		}

		return locale_string;
	};

	_pDecimal.toFixedLocaleString = function (locale, fractionDigits) {
		var locale_info = nexacro.Locale.getLocaleInfo(locale);
		var decimal_point = locale_info.decimal_point;
		var thousands_sep = locale_info.thousands_sep;
		var grouping = locale_info.grouping;
		var positive_sign = locale_info.positive_sign;
		var negative_sign = locale_info.negative_sign;
		var isNegative = this.isNegative();

		var locale_string = this._getFormattedStringValue(this, decimal_point, thousands_sep, grouping, fractionDigits, true);

		if (isNegative) {
			locale_string = negative_sign + locale_string;
		}
		else {
			locale_string = positive_sign + locale_string;
		}

		return locale_string;
	};

	_pDecimal._getFormattedStringValue = function (value, decimal_point, thousands_sep, grouping, frac_digits, use_fraction_digits) {
		var hi = this.hi;
		var lo = this.lo;
		var value_string = value.abs().toString().split(".");
		var integer_string = value_string[0];
		var decimal_string = value_string[1];

		if (!decimal_string) {
			decimal_string = "";
		}

		var locale_string = "";
		var grouping_value;

		if (!decimal_point) {
			decimal_point = ".";
		}

		if (!thousands_sep) {
			thousands_sep = ",";
		}

		if (grouping && grouping.length > 0) {
			grouping_value = grouping[0];
		}

		if (grouping_value <= 0) {
			grouping_value = 3;
		}

		if (integer_string.length >= grouping_value && grouping_value > 0) {
			if (integer_string.length == grouping_value) {
				locale_string = integer_string.substr(integer_string.length - grouping_value, grouping_value) + locale_string;
			}
			else {
				locale_string = thousands_sep + integer_string.substr(integer_string.length - grouping_value, grouping_value) + locale_string;
			}
			integer_string = integer_string.slice(0, integer_string.length - grouping_value);
		}

		if (grouping.length > 1) {
			grouping_value = grouping[1];
		}

		if (grouping_value <= 0) {
			grouping_value = 3;
		}

		while (integer_string.length > grouping_value && grouping_value > 0) {
			locale_string = thousands_sep + integer_string.substr(integer_string.length - grouping_value, grouping_value) + locale_string;
			integer_string = integer_string.slice(0, integer_string.length - grouping_value);
		}

		locale_string = integer_string + locale_string;

		if (use_fraction_digits) {
			var i = decimal_string.length;
			var fraction_string = "";
			while (i < frac_digits) {
				fraction_string = fraction_string + "0";
				i++;
			}

			decimal_string = decimal_string + fraction_string;
			decimal_string = decimal_string.slice(0, frac_digits);
		}

		if (decimal_string) {
			locale_string = locale_string + decimal_point + decimal_string;
		}

		this.hi = hi;
		this.lo = lo;
		return locale_string;
	};

	_pDecimal.clone = function () {
		var obj = new nexacro.Decimal();
		obj.hi = this.hi;
		obj.lo = this.lo;

		return obj;
	};

	nexacro.Decimal.MAX_VALUE = new nexacro.Decimal(1.79769313486231570815e+308, 9.97920154767359795037e+291);

	delete _pDecimal;
}

if (!nexacro.Number) {
	nexacro.Number = function (v) {
		this.value = new Number(v);
	};

	var _pNumber = nexacro._createPrototype(nexacro.Object, nexacro.Number);
	nexacro.Number.prototype = _pNumber;

	_pNumber.toString = function () {
		return this.value.toString();
	};

	_pNumber.valueOf = function () {
		return this.value;
	};

	_pNumber.isNegative = function () {
		return this.value < 0;
	};

	_pNumber._getFormattedStringValue = function (value, decimal_point, thousands_sep, grouping, frac_digits, use_fraction_digits) {
		var value_string = Math.abs(value).toString().split(".");

		var integer_string = value_string[0];
		var decimal_string = value_string[1];

		if (!decimal_string) {
			decimal_string = "";
		}

		var locale_string = "";
		var grouping_value;

		if (!decimal_point) {
			decimal_point = ".";
		}

		if (!thousands_sep) {
			thousands_sep = ",";
		}

		if (grouping && grouping.length > 0) {
			grouping_value = grouping[0];
		}

		if (grouping_value <= 0) {
			grouping_value = 3;
		}

		if (integer_string.length > grouping_value && grouping_value > 0) {
			locale_string = thousands_sep + integer_string.substr(integer_string.length - grouping_value, grouping_value) + locale_string;
			integer_string = integer_string.slice(0, integer_string.length - grouping_value);
		}

		if (grouping.length > 1) {
			grouping_value = grouping[1];
		}

		if (grouping_value <= 0) {
			grouping_value = 3;
		}

		while (integer_string.length > grouping_value && grouping_value > 0) {
			locale_string = thousands_sep + integer_string.substr(integer_string.length - grouping_value, grouping_value) + locale_string;
			integer_string = integer_string.slice(0, integer_string.length - grouping_value);
		}

		locale_string = integer_string + locale_string;

		if (use_fraction_digits) {
			var i = decimal_string.length;
			var fraction_string = "";
			while (i < frac_digits) {
				fraction_string = fraction_string + "0";
				i++;
			}

			decimal_string = decimal_string + fraction_string;
			decimal_string = decimal_string.slice(0, frac_digits);
		}

		if (decimal_string) {
			locale_string = locale_string + decimal_point + decimal_string;
		}

		return locale_string;
	};

	_pNumber.toLocaleString = function (locale) {
		var locale_info = nexacro.Locale.getLocaleInfo(locale);
		var decimal_point = locale_info.decimal_point;
		var thousands_sep = locale_info.thousands_sep;
		var grouping = locale_info.grouping;
		var positive_sign = locale_info.positive_sign;
		var negative_sign = locale_info.negative_sign;
		var isNegative = this.isNegative();

		var locale_string = this._getFormattedStringValue(this.value, decimal_point, thousands_sep, grouping, 3);


		if (isNegative) {
			locale_string = negative_sign + locale_string;
		}
		else {
			locale_string = positive_sign + locale_string;
		}

		return locale_string;
	};

	_pNumber.toLocaleCurrencyString = function (locale) {
		var locale_info = nexacro.Locale.getLocaleInfo(locale);
		var mon_decimal_point = locale_info.mon_decimal_point;
		var mon_thousands_sep = locale_info.mon_thousands_sep;
		var currency_symbol = locale_info.currency_symbol.trim();
		var mon_grouping = locale_info.mon_grouping;
		var int_frac_digits = locale_info.int_frac_digits;
		var positive_sign = locale_info.positive_sign;
		var negative_sign = locale_info.negative_sign;
		var p_cs_precedes = locale_info.p_cs_precedes;
		var p_sep_by_space = locale_info.p_sep_by_space;
		var n_cs_precedes = locale_info.n_cs_precedes;
		var n_sep_by_space = locale_info.n_sep_by_space;
		var p_sign_position = locale_info.p_sign_posn;
		var n_sign_position = locale_info.n_sign_posn;
		var mon_n_sign_position = locale_info.mon_n_sign_posn;
		if (mon_n_sign_position != undefined) {
			n_sign_position = mon_n_sign_position;
		}

		var space_char = "\u0020";
		var isNegative = this.isNegative();

		var locale_string = this._getFormattedStringValue(this.value, mon_decimal_point, mon_thousands_sep, mon_grouping, int_frac_digits, true);

		if (isNegative) {
			if (n_cs_precedes) {
				switch (n_sign_position) {
					case 0:
						{

							switch (n_sep_by_space) {
								case 0:
								case 2:
									{

										locale_string = "(" + currency_symbol + locale_string + ")";
									}
									break;
								case 1:
									{

										locale_string = "(" + currency_symbol + space_char + locale_string + ")";
									}
									break;
							}
						}
						break;
					case 1:
					case 3:
						{

							switch (n_sep_by_space) {
								case 0:
									{

										locale_string = negative_sign + currency_symbol + locale_string;
									}
									break;
								case 1:
									{

										locale_string = negative_sign + currency_symbol + space_char + locale_string;
									}
									break;
								case 2:
									{

										locale_string = negative_sign + space_char + currency_symbol + locale_string;
									}
									break;
							}
						}
						break;
					case 2:
						{

							switch (n_sep_by_space) {
								case 0:
									{

										locale_string = currency_symbol + locale_string + negative_sign;
									}
									break;
								case 1:
									{

										locale_string = currency_symbol + space_char + locale_string + negative_sign;
									}
									break;
								case 2:
									{

										locale_string = currency_symbol + locale_string + space_char + negative_sign;
									}
									break;
							}
						}
						break;
					case 4:
						{

							switch (n_sep_by_space) {
								case 0:
									{

										locale_string = currency_symbol + negative_sign + locale_string;
									}
									break;
								case 1:
									{

										locale_string = currency_symbol + negative_sign + space_char + locale_string;
									}
									break;
								case 2:
									{

										locale_string = currency_symbol + space_char + negative_sign + locale_string;
									}
									break;
							}
						}
						break;
				}
			}
			else {
				switch (n_sign_position) {
					case 0:
						{

							switch (n_sep_by_space) {
								case 0:
									{

										locale_string = "(" + locale_string + currency_symbol + ")";
									}
									break;
								case 1:
								case 2:
									{

										locale_string = "(" + locale_string + space_char + currency_symbol + ")";
									}
									break;
							}
						}
						break;
					case 1:
						{

							switch (n_sep_by_space) {
								case 0:
									{

										locale_string = negative_sign + locale_string + currency_symbol;
									}
									break;
								case 1:
								case 2:
									{

										locale_string = negative_sign + locale_string + space_char + currency_symbol;
									}
									break;
							}
						}
						break;
					case 2:
					case 4:
						{

							switch (n_sep_by_space) {
								case 0:
									{

										locale_string = locale_string + currency_symbol + negative_sign;
									}
									break;
								case 1:
									{

										locale_string = locale_string + space_char + currency_symbol + negative_sign;
									}
									break;
								case 2:
									{

										locale_string = locale_string + currency_symbol + space_char + negative_sign;
									}
									break;
							}
						}
						break;
					case 3:
						{

							switch (n_sep_by_space) {
								case 0:
									{

										locale_string = locale_string + negative_sign + currency_symbol;
									}
									break;
								case 1:
									{

										locale_string = locale_string + space_char + negative_sign + currency_symbol;
									}
									break;
								case 2:
									{

										locale_string = locale_string + negative_sign + space_char + currency_symbol;
									}
									break;
							}
						}
						break;
				}
			}
		}
		else {
			if (p_cs_precedes) {
				switch (p_sign_position) {
					case 0:
						{

							switch (p_sep_by_space) {
								case 0:
								case 2:
									{

										locale_string = "(" + currency_symbol + locale_string + ")";
									}
									break;
								case 1:
									{

										locale_string = "(" + currency_symbol + space_char + locale_string + ")";
									}
									break;
							}
						}
						break;
					case 1:
					case 3:
						{

							switch (p_sep_by_space) {
								case 0:
									{

										locale_string = positive_sign + currency_symbol + locale_string;
									}
									break;
								case 1:
									{

										locale_string = positive_sign + currency_symbol + space_char + locale_string;
									}
									break;
								case 2:
									{

										locale_string = positive_sign + space_char + currency_symbol + locale_string;
									}
									break;
							}
						}
						break;
					case 2:
						{

							switch (p_sep_by_space) {
								case 0:
									{

										locale_string = currency_symbol + locale_string + positive_sign;
									}
									break;
								case 1:
									{

										locale_string = currency_symbol + space_char + locale_string + positive_sign;
									}
									break;
								case 2:
									{

										locale_string = currency_symbol + locale_string + space_char + positive_sign;
									}
									break;
							}
						}
						break;
					case 4:
						{

							switch (p_sep_by_space) {
								case 0:
									{

										locale_string = currency_symbol + positive_sign + locale_string;
									}
									break;
								case 1:
									{

										locale_string = currency_symbol + positive_sign + space_char + locale_string;
									}
									break;
								case 2:
									{

										locale_string = currency_symbol + space_char + positive_sign + locale_string;
									}
									break;
							}
						}
						break;
				}
			}
			else {
				switch (p_sign_position) {
					case 0:
						{

							switch (p_sep_by_space) {
								case 0:
									{

										locale_string = "(" + locale_string + currency_symbol + ")";
									}
									break;
								case 1:
								case 2:
									{

										locale_string = "(" + locale_string + space_char + currency_symbol + ")";
									}
									break;
							}
						}
						break;
					case 1:
						{

							switch (p_sep_by_space) {
								case 0:
									{

										locale_string = positive_sign + locale_string + currency_symbol;
									}
									break;
								case 1:
								case 2:
									{

										locale_string = positive_sign + locale_string + space_char + currency_symbol;
									}
									break;
							}
						}
						break;
					case 2:
					case 4:
						{

							switch (p_sep_by_space) {
								case 0:
									{

										locale_string = locale_string + currency_symbol + positive_sign;
									}
									break;
								case 1:
									{

										locale_string = locale_string + space_char + currency_symbol + positive_sign;
									}
									break;
								case 2:
									{

										locale_string = locale_string + currency_symbol + space_char + positive_sign;
									}
									break;
							}
						}
						break;
					case 3:
						{

							switch (p_sep_by_space) {
								case 0:
									{

										locale_string = locale_string + positive_sign + currency_symbol;
									}
									break;
								case 1:
									{

										locale_string = locale_string + space_char + positive_sign + currency_symbol;
									}
									break;
								case 2:
									{

										locale_string = locale_string + positive_sign + space_char + currency_symbol;
									}
									break;
							}
						}
						break;
				}
			}
		}

		return locale_string;
	};

	_pNumber.toFixed = function (fractionDigits) {
		var decimal_point = ".";
		var thousands_sep = ",";
		var grouping = 0;
		var positive_sign = "";
		var negative_sign = "-";
		var isNegative = this.isNegative();

		var locale_string = this._getFormattedStringValue(this.value, decimal_point, thousands_sep, grouping, fractionDigits, true);

		if (isNegative) {
			locale_string = negative_sign + locale_string;
		}
		else {
			locale_string = positive_sign + locale_string;
		}

		return locale_string;
	};

	_pNumber.toFixedLocaleString = function (locale, fractionDigits) {
		var locale_info = nexacro.Locale.getLocaleInfo(locale);
		var decimal_point = locale_info.decimal_point;
		var thousands_sep = locale_info.thousands_sep;
		var grouping = locale_info.grouping;
		var positive_sign = locale_info.positive_sign;
		var negative_sign = locale_info.negative_sign;
		var isNegative = this.isNegative();

		var locale_string = this._getFormattedStringValue(this.value, decimal_point, thousands_sep, grouping, fractionDigits, true);

		if (isNegative) {
			locale_string = negative_sign + locale_string;
		}
		else {
			locale_string = positive_sign + locale_string;
		}

		return locale_string;
	};

	_pNumber.toPrecesion = function () {
	};

	_pNumber.toExponential = function () {
	};

	delete _pNumber;
}

if (!nexacro.BindableValue) {
	nexacro.BindableValue = function (def) {
		this._bindtype = 0;
		this._default = def;
		this._value = def;
	};
	var _pBindableValue = nexacro._createPrototype(nexacro.Object, nexacro.BindableValue);
	nexacro.BindableValue.prototype = _pBindableValue;
	_pBindableValue._type_name = "BindableValue";

	_pBindableValue.valueOf = function () {
		return this._value;
	};
	_pBindableValue.toString = function () {
		return this._value + "";
	};
	_pBindableValue._setBindExpr = function (v) {
		var str = v.toString().trim();

		this._bindtype = 0;

		var reg_exps = /BIND\s*\(/i;
		var tag = reg_exps.exec(str);

		if (tag && tag.index == 0) {
			this._bindtype = 1;
			str = str.replace(/BIND\s*\(\s*/i, "BIND:");
			str = str.substr(0, str.length - 1);
		}
		else {
			reg_exps = /BIND\s*:/i;
			tag = reg_exps.exec(str);

			if (tag && tag.index == 0) {
				this._bindtype = 1;
				str = str.replace(/BIND\s*\:\s*/i, "BIND:");
			}
		}

		if (!tag) {
			reg_exps = /EXPR\s*\(/i;
			tag = reg_exps.exec(str);

			if (tag && tag.index == 0) {
				this._bindtype = 2;
				str = str.replace(/EXPR\s*\(\s*/i, "EXPR:");
				str = str.substr(0, str.length - 1);
			}
			else {
				reg_exps = /EXPR\s*:/i;
				tag = reg_exps.exec(str);

				if (tag && tag.index == 0) {
					this._bindtype = 2;
					str = str.replace(/EXPR\s*\:\s*/i, "EXPR:");
				}
			}
		}

		if (tag) {
			str = str.trim();
			this._bindexpr = str.substr(5);
			this._value = v;

			return true;
		}

		return false;
	};

	_pBindableValue._set = function (v) {
		if (v != this._value) {
			if (v === null || v === undefined || v === "") {
				this._value = v;
				this._bindtype = 0;
			}
			else {
				if (this._setBindExpr(v) == false) {
					this._value = v;
				}
			}
		}
	};
	_pBindableValue._set_intval = function (v) {
		if (v != this._value) {
			if (v === null || v === undefined || v === "") {
				this._value = v;
				this._bindtype = 0;
			}
			else {
				if (this._setBindExpr(v) == false) {
					this._value = (v | 0);
				}
			}
		}
	};

	_pBindableValue._set_enumval = function (v, enumvals) {
		if (v != this._value) {
			if (v === null || v === undefined || v === "") {
				this._value = this._default;
				this._bindtype = 0;
			}
			else {
				if (this._setBindExpr(v) == false) {
					var len = enumvals.length;
					for (var i = 0; i < len; i++) {
						if (v == enumvals[i]) {
							this._value = v;
							return;
						}
					}
					this._value = this._default;
				}
			}
		}
	};
}


if (!nexacro.Image) {
	nexacro.Image = function (target) {
		if (target) {
			this._target = target;
		}

		this._event_list = {
			"onload" : 1, 
			"onerror" : 1
		};
	};

	var _pImageObject = nexacro._createPrototype(nexacro._EventSinkObject, nexacro.Image);
	nexacro.Image.prototype = _pImageObject;
	_pImageObject._type_name = "Image";

	_pImageObject.height = 0;
	_pImageObject.width = 0;
	_pImageObject.src = "";
	_pImageObject._base64str = "";
	_pImageObject.handle = null;

	_pImageObject.setBase64String = function (v) {
		if (typeof v != "string") {
			return;
		}
		if (v === "") {
			this._base64str = v;
		}
		else {
			var format = nexacro._transImageBase64StringFormat(v, true);
			if (format) {
				this._base64str = format.alldata;
			}
		}
	};

	_pImageObject.getBase64String = function () {
		return this._base64str;
	};

	_pImageObject.set_src = function (v) {
		if (this.src != v) {
			this.src = v;
			this.handle = nexacro._getImageObject(v, this.on_load, this);
		}
	};

	_pImageObject.on_load = function (imageurl, width, height, handle, errstatus, fireerrorcode, returncode, locationurl) {
		this.width = width;
		this.height = height;

		if (errstatus && errstatus < 0) {
			var errormsg;
			if (fireerrorcode) {
				errormsg = nexacro._GetSystemErrorMsg(this, fireerrorcode);
			}

			this.on_fire_onerror(this, fireerrorcode, errormsg, returncode, imageurl, locationurl);
		}
		else {
			if (handle) {
				this.handle = handle;
			}
			this.on_fire_onload(this, imageurl);
		}
	};

	_pImageObject.on_fire_onload = function (obj, url) {
		if (this.onload && this.onload._has_handlers) {
			var evt = new nexacro.LoadEventInfo(obj, "onload", url);
			this.onload._fireEvent(obj, evt);
		}
	};

	_pImageObject.on_fire_onerror = function (obj, errorcode, errormsg, statuscode, requesturi, locationuri) {
		if (this.onerror && this.onerror._has_handlers) {
			var evt = new nexacro.ErrorEventInfo(obj, "onerror", errorcode, errormsg, this, statuscode, requesturi, locationuri);
			this.onerror._fireEvent(this, evt);
		}
	};
	delete _pImageObject;
}

if (!nexacro._HotKey) {
	nexacro._HotKey = function (value) {
		this._load(value);
	};

	var __pHotKey = nexacro._createPrototype(nexacro.Object, nexacro._HotKey);
	nexacro._HotKey.prototype = __pHotKey;

	__pHotKey._modifierkey = 0;
	__pHotKey._keycode = 0;
	__pHotKey._is_registered = false;

	__pHotKey._type_name = "HotKey";

	__pHotKey._keytable = {
		"BACK" : 0x08, 
		"TAB" : 0x09, 
		"RETURN" : 0x0d, 
		"PAUSE" : 0x13, 
		"CAPITAL" : 0x14, 
		"ESCAPE" : 0x1b, 
		"SPACE" : 0x20, 
		"PRIOR" : 0x21, 
		"NEXT" : 0x22, 
		"END" : 0x23, 
		"HOME" : 0x24, 
		"LEFT" : 0x25, 
		"UP" : 0x26, 
		"RIGHT" : 0x27, 
		"DOWN" : 0x28, 
		"INSERT" : 0x2d, 
		"DELETE" : 0x2e, 
		"NUMPAD0" : 0x60, 
		"NUMPAD1" : 0x61, 
		"NUMPAD2" : 0x62, 
		"NUMPAD3" : 0x63, 
		"NUMPAD4" : 0x64, 
		"NUMPAD5" : 0x65, 
		"NUMPAD6" : 0x66, 
		"NUMPAD7" : 0x67, 
		"NUMPAD8" : 0x68, 
		"NUMPAD9" : 0x69, 
		"MULTIPLY" : 0x6a, 
		"ADD" : 0x6b, 
		"SEPARATOR" : 0x6c, 
		"SUBTRACT" : 0x6d, 
		"DECIMAL" : 0x6e, 
		"DIVIDE" : 0x6f, 
		"F1" : 0x70, 
		"F2" : 0x71, 
		"F3" : 0x72, 
		"F4" : 0x73, 
		"F5" : 0x74, 
		"F6" : 0x75, 
		"F7" : 0x76, 
		"F8" : 0x77, 
		"F9" : 0x78, 
		"F10" : 0x79, 
		"F11" : 0x7a, 
		"F12" : 0x7b, 
		"NUMLOCK" : 0x90, 
		"SCROLL" : 0x91
	};

	__pHotKey._clear = function () {
		this._modifierkey = 0;
		this._keycode = 0;
	};
	__pHotKey._load = function (value) {
		this._clear();
		if (value) {
			var ar = value.split("+");
			for (var i = 0; i < ar.length - 1; i++) {
				var token = ar[i].toUpperCase().trim();
				if (token == "CTRL" || token == "CONTROL") {
					this._modifierkey += 0x01;
				}
				if (token == "ALT") {
					this._modifierkey += 0x02;
				}
				if (token == "SHIFT") {
					this._modifierkey += 0x04;
				}
			}
			var keycode_str = ar[ar.length - 1].toUpperCase().trim();
			var keycode = this._convToKeyCode(keycode_str);
			if (keycode < 0) {
				this._clear();
				return;
			}

			this._keycode = keycode;
		}
	};
	__pHotKey._isEmpty = function () {
		if (this._keycode === 0) {
			return true;
		}
		return false;
	};
	__pHotKey._convToKeyCode = function (value) {
		var ret = -1;
		if (!value) {
			return ret;
		}

		if (value.length == 1) {
			if ((value >= 'A' && value <= 'Z') || (value >= '0' && value <= '9')) {
				ret = value.charCodeAt(0);
			}
			else if (value >= 'a' && value <= 'z') {
				ret = value.toUpperCase().charCodeAt(0);
			}
		}
		else {
			if (this._keytable[value]) {
				ret = this._keytable[value];
			}
		}

		return ret;
	};
	__pHotKey._convToKeyString = function (value) {
		var ret = -1;
		if (!value) {
			return ret;
		}

		if ((value >= 65 && value <= 90) || (value >= 48 && value <= 57)) {
			ret = String.fromCharCode(value);
		}
		else {
			for (var keystr in this._keytable) {
				if (value == this._keytable[keystr]) {
					ret = keystr;
					break;
				}
			}
		}

		return ret;
	};
	__pHotKey._toString = function () {
		var ret = "";
		if ((this._modifierkey & 0x01) == 0x01) {
			ret += "CTRL";
		}
		if ((this._modifierkey & 0x02) == 0x02) {
			if (ret.length !== 0) {
				ret += "+";
			}
			ret += "ALT";
		}
		if ((this._modifierkey & 0x04) == 0x04) {
			if (ret.length !== 0) {
				ret += "+";
			}
			ret += "SHIFT";
		}
		if (ret.length !== 0) {
			ret += "+";
		}
		ret += this._convToKeyString(this._keycode);

		return ret;
	};

	delete __pHotKey;
}
