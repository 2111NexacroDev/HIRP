if ( !window.RichTextEditor ) 
{
	window.RichTextEditor = {};
}

if ( !RichTextEditor.Lib ) 
{
	RichTextEditor.Lib = {
		_toString: (Object.prototype.toString),
	
        /**
         * string 여부
         */		
		isString: function(value) 
		{
			return typeof value === 'string';
		},	
		
        /**
         * Array 여부
         */		
		isArray: Array.isArray ? function(value) {
			return Array.isArray(value);
		} :
		function(value) 
		{
			return RichTextEditor.Lib._toString.call( value ) === '[object Array]';
		},
		
        /**
         * Object 여부
         */			
		isObject: function(value)
		{
			if ( value === null || value === undefined ) return false;
			
			return typeof value == "object" && 
				   'constructor' in value &&
				   value.constructor === Object;
		},		
        /**
         * empty 여부
         */		
		isEmpty: function(value)
		{
			// null, undefined ==> true
			if ( value == null ) return true;
			
			// String, Array ==> length == 0
			if ( RichTextEditor.Lib.isString(value) || RichTextEditor.Lib.isArray(value) )
			{
				return value.length == 0 ? true : false;
			}
			else if ( RichTextEditor.Lib.isObject(value) )
			{
				for (var p in value) 
				{
					if ( value.hasOwnProperty(p) )
					{
						return false;
					}
				}
				return true;
			}
			
			return false;
		},	
		
        /**
         * Function 여부
         */		
		isFunction: function(value)
		{
			return RichTextEditor.Lib._toString._toString.call( value ) === '[object Function]';
		},
		
		/***************************************************
			RichTextEditor.Lib.string
		***************************************************/
		string : {
			/**
			 * string.camelize
			 */			
			camelize: function(str)
			{
				return str.replace(/-(.)/g, function(all, chr) {
					return chr.toUpperCase();
				});
			},
			/**
			 * string.capitalize
			 */				
			capitalize: function(str)
			{
				if ( !str ) alert("[capitalize] str is null!");
				return str.replace(/\b[a-z]/g, function(match) {
					return match.toUpperCase();
				});
			}
		},
		
		/***************************************************
			RichTextEditor.Lib.array
		***************************************************/
		array : {
			/**
			 * array.indexOf
			 */			
			indexOf: function(array, item, from, strict) 
			{
				var len = array.length;
				if ( from == null ) from = 0;;
				strict == !!strict;
				from = (from < 0) ? Math.ceil(from) : Math.floor(from);
				if (from < 0)
				{
					from += len;
				}
				
				if (strict)
				{
					for (; from < len; from++) 
					{
						if ( array[from] === item)
						{
							return from;
						}
					}
				}
				else
				{
					for (; from < len; from++) 
					{
						if ( array[from] == item)
						{
							return from;
						}
					}
				}
				
				return -1;
			},		
			/**
			 * array.contains
			 */			
			contains: function(array, item, strict) 
			{
				if (RichTextEditor.Lib.array.indexOf(array, item, null, strict) === -1) 
				{
					return false;
				}
				else
				{
					return true;
				}
			},
			/**
			 * array.Each
			 */				
			Each: function(array, func, scope, reverse) 
			{
				var i, len = array.length;

				if (reverse !== true) 
				{
					for (i = 0; i < len; i++) 
					{
						if (func.call(scope || array[i], array[i], i, array) === false) 
						{
							return i;
						}
					}
				}
				else 
				{
					for (i = len - 1; i > -1; i--) 
					{
						if (func.call(scope || array[i], array[i], i, array) === false) 
						{
							return i;
						}
					}
				}

				return true;
			},
			/**
			 * array.forEach
			 */				
			forEach: function(array, func, scope) 
			{
				var i, len = array.length;

				for (i = 0; i < len; i++) 
				{
					func.call(scope, array[i], i, array);
				}
			},	
			/**
			 * array.min
			 */				
			min: function(array) 
			{
				return Math.min.apply(Math, array);
			},
			/**
			 * array.clone
			 */			
			clone: function(array) 
			{
				return array.slice(0);
			},
			/**
			 * array.removeAt
			 */				
			removeAt: function(array, index) 
			{
				array.splice(index, 1);
			},			
			/**
			 * array.difference
			 */					
			difference: function(arr, arr1) 
			{
				var clone = RichTextEditor.Lib.array.clone(arr),
					cln = clone.length,
					i, j, arrLen;

				for (i = 0,arrLen = arr1.length; i < arrLen; i++) 
				{
					for (j = 0; j < cln; j++) 
					{
						if (clone[j] === arr1[i]) 
						{
							RichTextEditor.Lib.array.removeAt(clone, j);
							j--;
							cln--;
						}
					}
				}

				return clone;
			},			
			/**
			 * array.clean
			 */				
			clean: function(array) 
			{
				var results = [], i = 0,
					len = array.length, item;

				for (; i < len; i++) 
				{
					item = array[i];

					if (!RichTextEditor.Lib.isEmpty(item)) 
					{
						results.push(item);
					}
				}

				return results;
			}			
		}, // end of RichTextEditor.Lib.array
		
		/***************************************************
			RichTextEditor.Lib.object
		***************************************************/		
		object : {
			/**
			 * object.copyProperties
			 */			
			copyProperties: function(tarobject, srcobject)
			{
				if (tarobject && srcobject) 
				{
					var p, value;
					
					for (p in srcobject)
					{
						if (srcobject.hasOwnProperty(p))
						{
							value = srcobject[p];
							tarobject[p] = value;
						}
					}
				}
			}
		}	// end of RichTextEditor.Lib.object
		
	};	
}	// end if ( !RichTextEditor.Lib ) 

if ( !RichTextEditor.Util ) 
{
	RichTextEditor.Util = {
		
        /**
         * element 생성
         */
        createEle: function (doc, ele, attr, style, cls)
        {
            if (typeof (ele) == "string")
            {
                var doc = doc || document,
                	ele = doc.createElement(ele);
                	
                if ( attr )
                {
                    this.setAttributes(ele, attr);
                }
                if ( style )
                {
                    this.setStyle(ele, style);
                }
                if ( cls )
                {
                    this.addClassName(ele, cls);
                }
            }
            return ele;
        },

        /**
         * element 속성 설정
         */
        setAttributes: function (ele, prop)
        {
            for (var nm in prop)
            {
                ele[nm] = prop[nm];
                //ele.setAttribute(nm, prop[nm]);
            }
            return ele;
        },

        /**
         * 주어진 element와 관련된 CSS 클래스명을 표시하는 Element.ClassNames 객체를 반환
         */
        classNames: function (ele)
        {
            return ele.className.split(' ');
        },
        /**
         * 요소가 class명중에 하나로 주어진 class명을 가진다면 true를 반환
         */
        hasClassName: function (ele, cls)
        {
            return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
        },

        /**
         * 주어진 class명을 요소의 class명으로 추가
         */
        addClassName: function (ele, cls)
        {
            if (!this.hasClassName(ele, cls))
            {
                if ( ele.className )
                {
                    ele.className += " ";
                }
                ele.className += cls;
            }

            return ele;
        },
        
        /**
         * 요소의 class명으로 부터 주어진 class명을 제거
         */
        removeClassName: function (ele, className)
        {
            var classNames = ele.className.split(/\s+/);
            var tempClassNames = RichTextEditor.Lib.array.difference(classNames, className.split());
            tempClassNames = RichTextEditor.Lib.array.clean(tempClassNames);
            ele.className = tempClassNames.join(' ');
        },
        /**
         * style.display를 'block'로 셋팅하여 각각의 요소를 보여준다.
         */
        show: function (ele)
        {
            this.elementById(ele).style.display = 'block';
            return ele;
        },
        /**
         * style.display를 'none'로 셋팅하여 각각의 요소를 숨긴다.
         */
        hide: function (ele)
        {
            this.elementById(ele).style.display = 'none';
            return ele;
        },
        /**
         * 이벤트의 target 또는 srcElement 를 반환
         */
        elementByEvent: function (event)
        {
            var ele = event.target || event.srcElement;
            return ele;
        },

        elementById: function (ele, doc)
        {
            var doc = doc || document;
            if (typeof ele == 'string')
            {
                ele = doc.getElementById(ele);
            }
            return ele;
        },
		
        /**
         * 요소의 최상위 요소까지의 offset position 을 더한 값을 리턴한다.
         */
        cumulativeOffset: function (ele)
        {
            var valueT = 0,
                valueL = 0;
            do {
                valueT += ele.offsetTop || 0;
                valueL += ele.offsetLeft || 0;
                ele = ele.offsetParent;
            } while (ele);
            return [valueL, valueT];
        },
        /**
         * 요소의 최상위 요소까지의 offset position 을 더한 값을 리턴한다.
         * 상위 요소가 body이거나 position이 relative 또는 absolute 인 경우 계산을 중지한다.
         */
        positionedOffset: function (ele)
        {
            var valueT = 0,
                valueL = 0;
            do {
                valueT += ele.offsetTop || 0;
                valueL += ele.offsetLeft || 0;
                ele = ele.offsetParent;
                if (ele)
                {
                    if (ele.tagName == 'BODY')
                        break;
                    var p = this.getStyle(ele, 'position');
                    if (p == 'relative' || p == 'absolute')
                        break;
                }
            } while (ele);
            return [valueL, valueT];
        },
        /**
         * 문자열에 px 를 붙여서 반환한다.
         */
        toPx: function (val)
        {
            var str;
            if (!RichTextEditor.Lib.isString(val))
            {
                str = val.toString();
            }
            else
            {
                str = val;
            }

            if (str.indexOf("px") > -1)
            {
                return str + "";
            }
            else
            {
                return str + "px";
            }
        },
        /**
         * 픽셀값으로 사용 가능한 문자열인지 boolean 으로 반환 ( 공백 허용안함 )
         */
        isPx: function (str)
        {
            if (this.trim(str) == "")
            {
                return false;
            }
            else if (str.indexOf("px") != -1)
            {
                str = this.parsePx(str);
            }
            return !isNaN(str);
        },
        /**
         * 문자열에 px 가 있으면 잘라내고 반환한다.
         */
        parsePx: function (str)
        {
            if (str == null || str.length == 0)
                return 0;
            else if (str.indexOf("px") > -1)
                return str.substring(0, str.indexOf("px")).toNumber();
            else
                return str.toNumber();
        },
        
        trim: function(str) 
		{
			return str.replace(/(^\s*)|(\s*$)/g, "");
		},

        /**
         * 인자로 넘겨 받은 Element의 style 속성값을 리턴한다.
         */
        getStyle: function (ele, style)
        {
            ele = this.elementById(ele);
            style = (style == 'float' || style == 'cssFloat') ? 'styleFloat' : RichTextEditor.Lib.string.camelize(style);
            var value = ele.style[style];
            if (!value && ele.currentStyle)
                value = ele.currentStyle[style];
            if (style == 'opacity')
            {
                if (value = (this.getStyle(ele, 'filter') || '').match(/alpha\(opacity=(.*)\)/))
                    if (value[1])
                        return parseFloat(value[1]) / 100;
                return 1.0;
            }
            if (value == 'auto')
            {
                if ((style == 'width' || style == 'height') && (this.getStyle(ele, 'display') != 'none'))
                {
                    return ele['offset' + RichTextEditor.Lib.string.capitalize(style)] + 'px';
                }
                return null;
            }
            return value;
        },
        /**
         * 요소의 style 속성을 셋팅한다.
         */
        setStyle: function (ele, styles, camelized)
        {
            ele = this.elementById(ele);
            var elementStyle = ele.style;
            for (var property in styles)
            {
                if (styles.hasOwnProperty(property))
                {
                    if (property === 'opacity')
                    {
                        this.setOpacity(ele, styles[property]);
                    }
                    else
                    {
                        elementStyle[(property === 'float' || property === 'cssFloat') ? (elementStyle.styleFloat === undefined ? 'cssFloat' : 'styleFloat') : (camelized ? property : RichTextEditor.Lib.string.camelize(property))] = styles[property];
                    }
                }
            }
            return ele;
        },
        /**
         * 요소의 opacity style 속성을 셋팅한다.
         */
        setOpacity: function (ele, value)
        {
            ele = this.elementById(ele);
            // ele.style.opacity = (value == 1 || value === '') ? '' : (value < 0.00001) ? 0 : value;
            //return ele;

            var filter = this.getStyle(ele, 'filter'),
                style = ele.style;

            style.opacity = (value == 1 || value === '') ? '' : (value < 0.00001) ? 0 : value;

            if (value == 1 || value === '')
            {
                style.filter = filter.replace(/alpha\([^\)]*\)/gi, '');
                return ele;
            }
            else if (value < 0.00001)
                value = 0;

            style.filter = filter.replace(/alpha\([^\)]*\)/gi, '') +
                'alpha(opacity=' +
                (value * 100) +
                ')';

            return ele;
        },

        applyCSSText: function (targetDoc, cssText)
        {
            var styleElement = targetDoc.createElement("style");
            styleElement.setAttribute("type", "text/css");

            if (styleElement.styleSheet)
            {
                styleElement.styleSheet.cssText = cssText;
            }
            else
            {
                styleElement.textContent = cssText;
            }

            var head;
            if (RichTextEditor.Browser == "IE" && RichTextEditor.BrowserVersion < 9)
            {
                head = targetDoc.getElementsByTagName('head')[0];
            }
            else
            {
                head = targetDoc.head;
            }

            head.appendChild(styleElement);
        },

        addLinkStyle: function (styleHref, doc)
        {
            var doc = doc || document,
            	style = doc.createElement('link');

            style.rel = 'stylesheet';
            style.type = 'text/css';
            style.href = styleHref;

            doc.getElementsByTagName('head')[0].appendChild(style);
        },

        /**
         * 요소의 최상위 요소까지의 offset position 을 더한 값을 리턴한다.
         * 상위 요소가 body이거나 position이 relative 또는 absolute 인 경우 계산을 중지한다.
         * left, top, right, bottom 값을 리턴한다.
         */
        getCoords: function (e, useOffset)
        {
            var uo = useOffset || false;
            var w = e.offsetWidth;
            var h = e.offsetHeight;
            var coords = {
                "left": 0,
                "top": 0,
                "right": 0,
                "bottom": 0
            };
            var p;
            while (e)
            {
                coords.left += e.offsetLeft || 0;
                coords.top += e.offsetTop || 0;
                e = e.offsetParent;
                if (uo)
                {
                    if (e)
                    {
                        if (e.tagName == "BODY")
                        {
                            break;
                        }
                        p = this.getStyle(e, "position");
                        if (p !== "static")
                        {
                            break;
                        }
                    }
                }
            }
            coords.right = coords.left + w;
            coords.bottom = coords.top + h;
            return coords;
        },
        getCoordsTarget: function (element)
        {
            return this.getCoords(element, true);
        },
        /**
         * 이벤트 핸들러 함수 추가
         */
        addEvent: function (ele, eventName, handler, capture)
        {
            ele = this.elementById(ele);

            //			if (!this.eventList) 
            //				this.eventList = [];

            if (ele.addEventListener)
            {
                ele.addEventListener(eventName, handler, capture || false);
            }
            else // If IE old version event model is used
            {
                ele.attachEvent("on" + eventName, handler)
            }
            //this.eventList.push([ele, eventName, handler, capture || false]);

            return ele;
        },

        /**
         * 이벤트 핸들러 함수 삭제
         */
        removeEvent: function (ele, eventName, handler, capture)
        {
            ele = this.elementById(ele);

            if (ele.removeEventListener)
            {
                ele.removeEventListener(eventName, handler, capture || false);
            }
            else // If IE old version event model is used
            {
                ele.detachEvent("on" + eventName, handler)
            }
            return ele;
        },

        stop: function (event)
        {
            if (event.preventDefault)
            {
                event.preventDefault();
                event.stopPropagation();
            }
            else
            {
                event.returnValue = false;
                event.cancelBubble = true;
            }
        }
	}
	
} // end if ( !RichTextEditor.Util ) 

if ( !RichTextEditor.Selection ) 
{
	RichTextEditor.Selection = function()
	{
		var editor = arguments[0];
		this.editorWin = editor.contentWindow || window;
		this.editorDoc = (editor.contentDocument || this.editorWin.document) || document;
		this.editorBody = this.editorDoc.body || document.body;	
	};
	
	var proto = RichTextEditor.Selection.prototype;
  
	/**
	 * selection object 리턴
	 */
	proto.getSelection = function ()
	{
		if (this.editorWin.getSelection)
		{
			return this.editorWin.getSelection();
		}
		else
		{
			return this.editorDoc.selection;
		}
	};

	/**
	 * range object 생성
	 */
	proto.createRange = function ()
	{
		if (this.editorWin.getSelection)
		{
			return this.editorDoc.createRange();
		}
		else
		{
			return this.getSelection().createRange();
		}
	};

	/**
	 * text range 생성
	 */
	proto.createTextRange = function ()
	{
		if (this.editorWin.getSelection)
		{
			return this.editorDoc.createRange();
		}
		else
		{
			return this.editorBody.createTextRange();
		}
	};

	/**
	 * range object 리턴
	 */
	proto.getRange = function (collapse)
	{
		if (this.editorWin.getSelection)
		{
			var sel = this.getSelection();

			if (sel && sel.rangeCount > 0)
			{
				if (RichTextEditor.Lib.isEmpty(collapse))
				{
					if (sel.rangeCount == 1)
					{
						return sel.getRangeAt(0);
					}
					else
					{
						return this.mergeRange(sel);
					}
				}
				else
				{
					var range = sel.getRangeAt(0);
					range.collapse(collapse);
					return range;
				}
			}
			else
			{
				return this.editorDoc.createRange();
			}
		}
		else
		{
			var sel = this.getSelection(),
				range,
				type = sel.type.toLowerCase();

			if (type == "none")
			{
				return sel.createRange() ? sel.createRange() : function ()
				{
					range = this.editorBody.createTextRange();
					range.collapse(true);
					range.select();
					return range;
				}();
			}

			if (RichTextEditor.Lib.isEmpty(collapse))
			{
				return sel.createRange();
			}
			else
			{
				if (type === "text")
				{
					range = sel.createRange();
					range.collapse(collapse);
					range.select();
					return sel.createRange();
				}
				else
				{
					if (type === "control")
					{
						sel.empty();
					}
					return sel.createRange();
				}
			}
		}
	};

	/**
	 * 선택된 영역의 노드 리턴
	 */
	proto.getNode = function ()
	{
		if (this.editorWin.getSelection)
		{
			var range = this.getRange();
			if (range)
			{
				var startContainer = range.startContainer;
				if (startContainer.nodeType == 1)
				{
					//return startContainer.childNodes[range.startOffset];

					if (RichTextEditor.DomUtil.isBody(startContainer))
					{
						return startContainer;
					}
					else
					{
						if (startContainer.childElementCount == range.startOffset)
						{
							return startContainer.childNodes[range.startOffset - 1];
						}
						else
						{
							return startContainer.childNodes[range.startOffset];
						}
					}
				}
				else
				{
					return startContainer.parentNode;
				}
			}
			else
			{
				return null;
			}
		}
		else
		{
			var sel = this.getSelection(),
				type = sel.type.toLowerCase(),
				range;

			if (type === "control")
			{
				return sel.createRange().item(0);
			}
			else
			{
				return sel.createRange().parentElement();
			}
		}
	};

	proto.mergeRange = function (sel)
	{
		try
		{
			var ranges = [];
			for (var i = 0, length = sel.rangeCount; i < length; i++)
			{
				ranges.push(sel.getRangeAt(i));
			}
			sel.removeAllRanges();

			var startNode = ranges[0].startContainer.childNodes[ranges[0].startOffset];
			var endNode = ranges[length - 1].endContainer.childNodes[ranges[length - 1].endOffset - 1];

			var range = this.editorDoc.createRange();
			try
			{
				range.setStart(startNode, 0);
			}
			catch (e)
			{
				range.collapse(true);
			}

			try
			{
				range.setEnd(endNode, endNode.childNodes.length);
			}
			catch (e)
			{}

			sel.addRange(range);
			return sel.getRangeAt(0);
		}
		catch (e)
		{
			return sel.getRangeAt(0);
		}
	};

	/**
	 * 선택된 영역의 컨트롤 노드 여부 반환
	 */
	proto.hasControl = function ()
	{
		if (this.editorWin.getSelection)
		{
			return (this.getControl() != null);
		}
		else
		{
			var sel = this.getSelection(),
				type = sel.type.toLowerCase();

			//trace("------------type:" + type);
			if (type === "control")
			{
				return true;
			}
			else
			{
				return false;
			}
		}
	};

	/**
	 * 선택된 영역의 컨트롤 노드를 리턴
	 */
	proto.getControl = function ()
	{
		if (this.editorWin.getSelection)
		{
			var selection = this.getSelection(),
				node;

			if (selection.isCollapsed)
			{
				return null;
			}

			if (RichTextEditor.Util.isElement(selection.anchorNode))
			{
				node = selection.anchorNode.childNodes[selection.anchorOffset];
				//console.log("===================node:" + node + ",nodeType:" +node.nodeType + ",tagName:" + node.tagName.toLowerCase());
				return node;
			}

			return null;
		}
		else
		{
			var selection = this.getSelection(),
				type = selection.type.toLowerCase();

			if (type === "control")
			{
				var node = selection.createRange().item(0);
				return node;
			}
			else
			{
				return null;
			}
		}
	};

	/**
	 * 컨트롤 노드 선택 처리
	 */
	proto.selectControl = function (node, collapse)
	{
		if (this.editorWin.getSelection)
		{
			var range = this.createRange();
			range.selectNode(node);
			if (!RichTextEditor.Lib.isEmpty(collapse))
			{
				range.collapse(collapse)
			}

			var selection = this.getSelection();
			selection.removeAllRanges();
			selection.addRange(range);
		}
		else
		{
			var range = this.editorBody.createControlRange();
			range.add(node);
			if (!RichTextEditor.Lib.isEmpty(collapse))
			{
				range.collapse(collapse)
			}

			range.select();
		}
	};
        
	proto.selectControlContents = function (node)
	{
		if (this.editorWin.getSelection)
		{
			var range = this.createRange();
			range.selectNodeContents(node);
			
			var sel = this.getSelection();
			sel.removeAllRanges();
			sel.addRange(range);
		}
		else
		{
			var range = this.editorBody.createTextRange();
			range.moveToElementText(node);
			range.select();
		}
	};

	/**
	 * 선택 영역 collapse 처리
	 */
	proto.collapse = function (toStart)
	{
		if (this.editorWin.getSelection)
		{
			var selection = this.getSelection();
			if (selection && selection.rangeCount > 0)
			{
				var range = selection.getRangeAt(0);
				range.collapse(toStart);
			}
		}
		else
		{
			var selection = this.getSelection(),
				type = selection.type.toLowerCase();

			if (type === "text")
			{
				var range = selection.createRange();
				range.collapse(toStart);
				range.select();
				return selection.createRange();
			}
			else
			{
				if (type === "control")
				{
					selection.empty();
				}
				return selection.createRange();
			}
		}
	};

	/**
	 * 선택 영역의 collapse 여부
	 */
	proto.isCollapsed = function ()
	{
		if (this.editorWin.getSelection)
		{
			var selection = this.getSelection();
			return (selection && selection.isCollapsed);
		}
		else
		{
			var selection = this.getSelection(),
				type = selection.type.toLowerCase();

			if (type === "none")
			{
				return true;
			}
			else if (type === "control")
			{
				return true;
			}
			else if (type === "text")
			{
				var range = selection.createRange();
				return range.compareEndPoints('StartToEnd', range) == 0;
			}
			else
			{
				return true;
			}
		}
	};
		
	proto.transTextRange = function (range, node, offset, toStart)
	{
		var pntRng = this.createTextRange();
		var pntNode = util.createEle(document, "span");

		RichTextEditor.DomUtil.insertAt(pntNode, node);
		pntRng.moveToElementText(pntNode);
		RichTextEditor.DomUtil.remove(pntNode);

		pntRng.collapse(true);
		pntRng.moveStart('character', offset);

		if (toStart)
		{
			range.setEndPoint('StartToStart', pntRng);
		}
		else
		{
			range.setEndPoint('EndToEnd', pntRng);
		}

		return range;
	};

	/**
	 * range의 시작위치 지정
	 */
	proto.setStart = function (range, node, offset)
	{
		if (this.editorWin.getSelection)
		{
			try
			{
				range.setStart(node, offset);
			}
			catch (e)
			{
				range.collapse(true);
				range.setStart(node, offset);
			}
		}
		else
		{
			try
			{
				this.transTextRange(range, node, offset, true);
			}
			catch (e)
			{
				console.log(e);
			}
			return range;
		}
	};

	/**
	 * range의 끝위치 지정
	 */
	proto.setEnd = function (range, node, offset)
	{
		if (this.editorWin.getSelection)
		{
			try
			{
				range.setEnd(node, offset);
			}
			catch (e)
			{
				range.collapse(false);
				range.setEnd(node, offset);
			}
		}
		else
		{
			try
			{
				this.transTextRange(range, node, offset, false);
			}
			catch (e)
			{
				console.log(e)
			}
			return range;
		}
	};

	/**
	 * range 선택
	 */
	proto.selectRange = function (range)
	{
		if (this.editorWin.getSelection)
		{
			var select = this.getSelection();
			select.removeAllRanges();
			select.addRange(range);
		}
		else
		{
			range.select();
		}
	};

	proto.removeSelection = function ()
	{
		if (this.editorWin.getSelection)
		{
			var select = this.getSelection();
			select.removeAllRanges();
		}
		else
		{
			if (editorDoc.selection.createRange)
			{
				var range = this.editorDoc.selection.createRange();
				this.editorDoc.selection.empty();
			}
		}
	};

	/**
	 * selection text 리턴
	 */
	proto.getSelectionText = function ()
	{
		var selText = "",
			selection = this.getSelection();

		if (this.editorWin.getSelection)
		{
			if (selection.rangeCount)
			{
				if (RichTextEditor.Browser == "IE")
				{
					var range = selection.getRangeAt(0),
						cloneCnts = range.cloneContents();

					selText = this.getChildNodesText(cloneCnts);
				}
				else
				{
					selText = selection.toString();
				}
			}
		}
		else
		{
			if (selection.type == "Text")
			{
				selText = selection.createRange().text;
			}
		}

		return selText;
	};

	proto.getChildNodesText = function (container)
	{
		var child,
			selText = "";

		for (var i = 0, len = container.childNodes.length; i < len; i++)
		{
			child = container.childNodes[i];
			//trace("child.nodeName:" + child.nodeName);

			if (child.nodeType == 3)
			{
				selText += child.data;
				//trace("		data:" + child.data);
			}
			else if (child.nodeType == 1)
			{
				if (RichTextEditor.DomUtil.isBR(child))
				{
					selText += "\r\n";
					//trace("		\r\n");
				}
				else if (RichTextEditor.DomUtil.isPre(child) && child.id == RichTextEditor.Highlight.syntaxHighlightId)
				{
					// ie9에서 newline 생략됨, 11은 테스트해봐야함
					if (RichTextEditor.BrowserVersion > 9)
					{
						selText += child.innerText;
						//trace("	Pre innerText:" + child.innerText);
					}
					else
					{
						selText += this.getChildNodesText(child);
					}
				}
				else if (RichTextEditor.DomUtil.isParagraph(child))
				{
					selText += child.innerText;
					selText += "\r\n";
					selText += "\r\n";
					//trace("		P innerText:" + child.innerText);
				}
				else
				{
					selText += child.textContent;
					//trace("		textContent:" + child.textContent);
				}
			}
			//trace("selText:" + selText);
		}

		return selText;
	};
	
	proto = null;
} // end if ( !RichTextEditor.Selection ) 

if ( !RichTextEditor.DomUtil ) 
{
    RichTextEditor.DomUtil = {
	
        search: function (args, searchFunction, defaultValue)
        {
            var context = (args.length == 1) ? document : args[0];
            var pattern = args[args.length - 1];

            var invalidArgument = (!pattern || !context || !context.nodeType ||
                typeof pattern != "string");
            if (invalidArgument)
            {
                return defaultValue;
            }

            var translator = this.translate(pattern);
            return searchFunction(context, translator.getExpression());
        },
        /**
         * css selector 로 요소를 찾아서 반환하는데 인자 node의 상위에 있는 요소를 찾는다.
         */
        find: function ()
        {
            return this.search(arguments, dFindy, null);
        },
        /**
         * css selector 로 요소를 찾아서 반환하는데 인자 node의 하위에 있는 요소를 찾는다.
         */
        collect: function ()
        {
            return this.search(arguments, dGetty, null);
        },
        /**
         * css selector로 요소를 찾아서 반환하는데 인자 node의 하위에 있는 요소를 찾고 모든 요소를 배열에 담아서 반환한다.
         */
        collectAll: function ()
        {
            return this.search(arguments, dGetties, []);
        },
        __TRANSLATOR_CACHES:
        {}, //for caching	
        translate: function (pattern)
        {
            if (!this.__TRANSLATOR_CACHES[pattern])
            {
                this.__TRANSLATOR_CACHES[pattern] = new RichTextEditor.Translator(pattern);
            }
            return this.__TRANSLATOR_CACHES[pattern];
        },
        /**
         * element요소의 left, top, width, height 값을 계산하여 반환한다.
         */
        getPosition: function (ele, cumulative)
        {
            if (!ele)
            {
                return {
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0
                };
            }
            cumulative = !!cumulative;
            ele = RichTextEditor.Util.elementById(ele);
            var pos = (cumulative) ? RichTextEditor.Util.cumulativeOffset(ele) : RichTextEditor.Util.positionedOffset(ele);
            var dim;
            var display = ele.style.display;
            if (display != 'none' && display != null)
            { //Safari bug
                dim = {
                    width: ele.offsetWidth,
                    height: ele.offsetHeight
                };
            }
            else
            {
                var els = ele.style;
                var originalVisibility = els.visibility;
                var originalPosition = els.position;
                var originalDisplay = els.display;
                els.visibility = 'hidden';
                els.position = 'absolute';
                els.display = 'block';
                var originalWidth = ele.clientWidth;
                var originalHeight = ele.clientHeight;
                els.display = originalDisplay;
                els.position = originalPosition;
                els.visibility = originalVisibility;
                dim = {
                    width: originalWidth,
                    height: originalHeight
                };
            }
            return {
                x: pos[0],
                y: pos[1],
                width: dim.width,
                height: dim.height
            };
        },
        /**
         * node 요소의 width값을 반환한다.
         * inline style이 px값으로 유효하지 않으면 offset으로 대체한다.
         */
        getWidth: function (node)
        {
            var width = node.style["width"];
            if (RichTextEditor.Util.isPx(width))
            {
                return RichTextEditor.Util.parsePx(width);
            }
            return node.offsetWidth;
        },
        /**
         * node 요소 스타일속성의 width 값을 세팅한다.
         */
        setWidth: function (node, width)
        {
            RichTextEditor.Util.setStyle(node,
            {
                'width': width
            });
        },
        /**
         * node 요소의 height값을 반환한다.
         * inline style이 px값으로 유효하지 않으면 offset으로 대체한다.
         */
        getHeight: function (node)
        {
            var height = node.style["height"];
            if (RichTextEditor.Util.isPx(height))
            {
                return RichTextEditor.Util.parsePx(height);
            }
            return node.offsetHeight;
        },
        /**
         * node 요소 스타일속성의 height 값을 세팅한다.
         */
        setHeight: function (node, height)
        {
            RichTextEditor.Util.setStyle(node,
            {
                'height': height
            });
        },
        /**
         * HTMLElement면 true 리턴
         */
        isElement: function (node)
        {
            return node && node.nodeType == 1;
        },
        /**
         * body면 true 리턴
         */
        isBody: function (node)
        {
            return this.isElement(node) && node.tagName == "BODY";
        },

        isBR: function (node)
        {
            var nn = node.nodeName;
            return nn == "BR" || nn == "br";
        },

        isPre: function (node)
        {
            var nn = node.nodeName;
            return nn == "PRE" || nn == "pre";
        },

        isParagraph: function (node)
        {
            var nn = node.nodeName;
            return nn == "P" || nn == "p";
        },

        isSpan: function (node)
        {
            var nn = node.nodeName;
            return nn == "SPAN" || nn == "span";
        },

        /**
         * node를 포함하고 있는 body 반환
         */
        getBody: function (node)
        {
            if (!node || !node.parentNode)
            {
                return null;
            }

            var pnode = node.parentNode;
            while (pnode)
            {
                if (this.isBody(pnode))
                {
                    return pnode;
                }
                pnode = pnode.parentNode;
            }
            return null;
        },

        /**
         * node가 textNode이면 공백을 제거한 nodeValue의 내용이 존재하면 true를 반환한다.
         */
        hasContent: function (node, ignoreZWNBS)
        {
            if (!node || node.nodeType != 3)
            {
                return true;
            }

            var _text = this.removeMeaninglessSpace(node.nodeValue);
            if (ignoreZWNBS)
            {
                _text = _text.replace(/\ufeff/g, "");
            }
            return (_text != "");
        },
        /**
         * 주어진 스트링에서 의미없는 스페이스를 제거하는 함수.
         */
        removeMeaninglessSpace: function (str)
        {
            /* /\s/ == /[\f\n\r\t\v\u2028\u2029\u00a0]/ */
            return str.replace(/(^[\f\n\r\t\v\u2028\u2029]*)|([\f\n\r\t\v\u2028\u2029]*$)/g, "");
        },
        /**
         * parent요소의 첫번째 자식노드로 child를 삽입한다.
         */
        insertFirst: function (parent, child)
        {
            if (!parent || !child)
            {
                return;
            }
            if (parent.firstChild)
            {
                parent.insertBefore(child, parent.firstChild);
            }
            else
            {
                parent.appendChild(child);
            }
            return child;
        },
        /**
         * target 요소 전 위치에 source 요소를 삽입한고 source 요소를 반환한다.
         */
        insertAt: function (source, target)
        {
            if (!source || !target)
            {
                return;
            }
            target.parentNode.insertBefore(source, target);
            return source;
        },
        /**
         * target 요소 다음 위치에 source 요소를 삽입한고 source 요소를 반환한다.
         */
        insertNext: function (source, target)
        {
            if (!source || !target)
            {
                return;
            }
            var nextSibling = target.nextSibling;
            if (nextSibling)
            {
                nextSibling.parentNode.insertBefore(source, nextSibling);
            }
            else
            {
                target.parentNode.appendChild(source);
            }
            return source;
        },
        /**
         * parent 요소에 child 요소를 붙인 후 child 요소를 반환한다.
         */
        append: function (parent, child)
        {
            if (!parent || !child)
            {
                return;
            }
            parent.appendChild(child);
            return child;
        },

        /**
         * node 를 제거한다.
         */
        remove: function (node)
        {
            if (!node)
            {
                return;
            }
            if (node.parentNode)
            {
                node.parentNode.removeChild(node);
            }
            node = null;
        },
        /**
         * node의 nextSibling 요소 중 pattern에 맞는 요소를 찾아서 반환한다.
         */
        next: function (node, pattern)
        {
            if (!node || !node.nextSibling)
            {
                return null;
            }
            var filter = this.findNodePattern(pattern);
            var _node = node.nextSibling;
            while (_node)
            {
                if (this.hasContent(_node))
                {
                    if (filter.test(_node))
                    {
                        break;
                    }
                }
                _node = _node.nextSibling;
            }
            return _node;
        },
        /**
         * node의 parent node를 반환한다.
         */
        parent: function (node)
        {
            if (!node || !node.parentNode)
            {
                return null;
            }
            return node.parentNode;
        },
        nodePatternCache:
        {},
        findNodePattern: function (pattern)
        {
            pattern = pattern || "#element,#text";

            if (this.nodePatternCache[pattern])
            {
                return this.nodePatternCache[pattern];
            }
            var filter = new RichTextEditor.NodePattern(pattern);
            this.nodePatternCache[pattern] = filter;
            return filter;
        },
        /**
         * 수직 스크롤 위치값을 반환한다.
         */
        getScrollTop: function (doc)
        {
            if (!doc)
            {
                return 0;
            }
            return (doc.documentElement.scrollTop || doc.body.scrollTop);
        },
        /**
         * 수직 스크롤 값을 셋팅한다.
         */
        setScrollTop: function (doc, scrollTop)
        {
            if (!doc)
            {
                return;
            }
            if (doc.documentElement.scrollTop)
            {
                doc.documentElement.scrollTop = scrollTop;
            }
            else
            {
                doc.body.scrollTop = scrollTop;
            }
        },
        /**
         * 수평 스크롤 위치값을 반환한다.
         */
        getScrollLeft: function (doc)
        {
            if (!doc)
            {
                return 0;
            }
            return (doc.documentElement.scrollLeft || doc.body.scrollLeft);
        },
        /**
         * 수평 스크롤 값을 셋팅한다.
         */
        setScrollLeft: function (doc, scrollLeft)
        {
            if (!doc)
            {
                return;
            }
            if (doc.documentElement.scrollLeft)
            {
                doc.documentElement.scrollLeft = scrollLeft;
            }
            else
            {
                doc.body.scrollLeft = scrollLeft;
            }
        },

        isAncestor: function (node, child)
        {
            while (child = child.parentNode)
            {
                if (node == child)
                    return true;
            }
            return false;
        }
        
    };
} // end if ( !RichTextEditor.DomUtil )

(function ()
{
    var __TRANSLATIONS = {
        '%body': ['body'],
        '%text': ['#text', 'br'],
        '%element': ['#element'],
        '%control': ['img', 'object', 'hr', 'table', 'button', 'iframe'], //['input','select','textarea','label','br'],
        '%inline': ['span', 'font', 'u', 'i', 'b', 'em', 'strong', 'big', 'small', 'a', 'sub', 'sup', 'span'], //['tt','dfn','code','samp','kbd','var','cite','abbr','acronym','img','object','br','script','map','q','bdo','input','select','textarea','label','button'],
        '%block': ['p', 'div', 'ul', 'ol', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'pre', 'dl', 'hr', 'table', 'button'], //['noscript','blockquote','form','fieldset','address'], !button
        '%paragraph': ['p', 'li', 'dd', 'dt', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'td', 'th', 'div', 'caption'], //!button
        '%wrapper': ['div', 'ul', 'ol', 'dl', 'pre', 'xmp', 'table', 'button'],
        '%innergroup': ['li', 'dd', 'dt', 'td', 'th'],
        '%outergroup': ['ul', 'ol', 'dl', 'tr', 'tbody', 'thead', 'tfoot', 'table'],
        '%tablegroup': ['td', 'th', 'tr', 'tbody', 'thead', 'tfoot', 'table'],
        '%listgroup': ['li', 'ul', 'ol'],
        '%datagroup': ['dd', 'dt', 'dl'],
        '%listhead': ['ul', 'ol']
    };

    var __TRANSLATIONS_MAP = {}; //for caching
    for (var _ptrn in __TRANSLATIONS)
    {
        __TRANSLATIONS_MAP[_ptrn] = {};
        if (__TRANSLATIONS[_ptrn])
        {
            RichTextEditor.Lib.array.Each(__TRANSLATIONS[_ptrn], function (tag)
            {
                __TRANSLATIONS_MAP[_ptrn][tag] = true;
            });
        }
    }

    function createMap(patterns)
    {
        var _map = {};
        var _patterns = patterns.split(",");
        RichTextEditor.Lib.array.Each(_patterns, function (pattern)
        {
            if (__TRANSLATIONS_MAP[pattern])
            {
                for (var _part in __TRANSLATIONS_MAP[pattern])
                {
                    _map[_part] = true;
                }
            }
            else
            {
                _map[pattern] = true;
            }
        });
        return _map;
    }

    if ( !RichTextEditor.Translator )
    {
		RichTextEditor.Translator = function()
		{
			this.patterns = arguments[0];
			this.map = createMap(arguments[0]);		
		};
		
		var proto = RichTextEditor.Translator.prototype;
		
		proto.hasParts = function ()
		{
			return (this.patterns.length > 0);
		};
		
		proto.include = function (partPtrn)
		{
			var _partMap = createMap(partPtrn);
			for (var _part in _partMap)
			{
				if (this.map[_part])
				{
					return true;
				}
			}
			return false;
		};
		
		proto.memberOf = function (wholePtrn)
		{
			var _wholeMap = createMap(wholePtrn);
			for (var _part in this.map)
			{
				if (_wholeMap[_part])
				{
					return true;
				}
			}
			return false;
		};
		
		proto.extract = function (wholePtrn)
		{
			var _wholeMap = createMap(wholePtrn);
			var _matches = [];
			for (var _part in this.map)
			{
				if (_wholeMap[_part])
				{
					_matches.push(_part);
				}
			}
			return RichTextEditor.DomUtil.translate(_matches.join(","));
		};
		
		proto.getExpression = function ()
		{
			if (!this.exprs)
			{
				var _exprs = [];
				for (var _part in this.map)
				{
					_exprs.push(_part);
				}
				this.exprs = _exprs.join(",");
			}
			return this.exprs;
		};
		
		proto = null;

    } // end if ( !RichTextEditor.Translator )
	
})();

if ( !RichTextEditor.NodePattern )
{
	RichTextEditor.NodePattern = function()
	{
		this.pattern = arguments[0];
		this.translator = RichTextEditor.DomUtil.translate(this.pattern);
		this.hasClassPattern = this.pattern.indexOf(".") >= 0;
		this.hasIdPattern = this.pattern.indexOf("#") >= 0;
		this.matchesText = this.translator.include("#text");
		this.matchesElement = this.translator.include("#element");	
	};
	
	var proto = RichTextEditor.NodePattern.prototype;
	
	proto.test = function (node)
	{
		var nodeType = node.nodeType;
		var translatorMap = this.translator.map;
		if (nodeType == 1)
		{
			if (this.matchesElement)
			{
				return true;
			}
			var tagName = node.tagName.toLowerCase();

			// early matching for performance
			if (translatorMap[tagName])
			{
				return true;
			}

			var checkPattern = [];
			if (this.hasClassPattern && node.className)
			{
				node.className.split(/\s/).each(function (className)
				{
					checkPattern.push("." + className);
					checkPattern.push(tagName + "." + className);
				});
			}
			if (this.hasIdPattern && node.id)
			{
				var id = node.id;
				checkPattern.push("#" + id);
				checkPattern.push(tagName + "#" + id);
			}
			for (var i = 0; i < checkPattern.length; i++)
			{
				if (translatorMap[checkPattern[i]])
				{
					return true;
				}
			}
			return false;
		}
		else if (nodeType == 3)
		{
			return this.matchesText;
		}
	};
	proto = null;
	
} // end if ( !RichTextEditor.NodePattern )

/**
 * DomGetty - Very Very Simple Dom Selector Engine
 * - id : #
 * - class : .
 * - tag : tagname
 */
(function ()
{
    var m, el, els;
    var filters = {
        '#': function (cnxt, expr)
        {
            if ((m = /(\S*)#(\S+)/.exec(expr)) !== null)
            {
                var tag = m[1];
                var id = m[2];
                if (!cnxt.getElementById)
                { //ie
                    cnxt = cnxt.ownerDocument;
                }
                if (el = cnxt.getElementById(id))
                {
                    if (tag.length < 1 || el.nodeName.toLowerCase() == tag)
                    {
                        return [el];
                    }
                }
            }
            return [];
        },
        '.': function (cnxt, expr)
        {
            if ((m = /(\S*)\.(\S+)/.exec(expr)) !== null)
            {
                var tag = ((m[1] === "") ? "*" : m[1]);
                var klass = m[2];
                if ((els = cnxt.getElementsByTagName(tag)).length > 0)
                {
                    var results = [];
                    for (var i = 0; i < els.length; i++)
                    {
                        var el = els[i];
                        if ((new RegExp("(^| )" + klass + "($| )")).test(el.className))
                        {
                            results.push(el);
                        }
                    }
                    return results;
                }
            }
            return [];
        },
        '*': function (cnxt, expr)
        {
            if ((els = cnxt.getElementsByTagName(expr)).length > 0)
            {
                var results = [];
                for (var i = 0; i < els.length; i++)
                {
                    results.push(els[i]);
                }
                return results;
            }
            return [];
        }
    };

    var match = function (cnxt, expr)
    {
        if (cnxt.length < 1)
        {
            return [];
        }
        var fltr;
        if ((f = /(\.|#)/.exec(expr)) !== null)
        {
            if (filters[f[1]])
            {
                fltr = f[1];
            }
        }
        fltr = fltr || "*";
        var results = [];
        for (var i = 0; i < cnxt.length; i++)
        {
            results = results.concat(filters[fltr](cnxt[i], expr));
        }
        return results;
    };

    var collect = function (cnxt, expr)
    {
        var els = [cnxt];
        var exprs = expr.split(" ");
        for (var j = 0; j < exprs.length; j++)
        {
            els = match(els, exprs[j]);
        }
        return els;
    };

    var DomGetty = function (context, selector, all)
    {
        all = !!all;
        if (context.nodeType !== 1 && context.nodeType !== 9)
        {
            return (all ? [] : null);
        }
        if (!selector || typeof selector !== "string")
        {
            return (all ? [] : null);
        }

        var els;
        var mathes = [];
        var exprs = selector.split(",");
        for (var i = 0; i < exprs.length; i++)
        {
            els = collect(context, exprs[i]);
            if (els && els.length > 0)
            {
                mathes = mathes.concat(els);
                if (!all)
                {
                    break;
                }
            }
        }
        if (all)
        {
            return mathes;
        }
        else
        {
            return mathes[0];
        }
    };

    /**
     * Get Element By Css Selector
     * dGetty(element, selector) or dGetty(selector)
     */
    window.dGetty = function ()
    {
        var args = arguments;
        if (args.length == 1)
        {
            if (typeof (args[0]) === "string")
            {
                return DomGetty(document, args[0]);
            }
        }
        else if (args.length == 2)
        {
            if (args[0].nodeType && typeof (args[1]) === "string")
            {
                return DomGetty(args[0], args[1]);
            }
        }
        return null;
    };

    /**
     * Get Element List By Css Selector
     * dGetties(element, selector) or dGetties(selector)
     */
    window.dGetties = function ()
    {
        var args = arguments;
        if (args.length == 1)
        {
            if (typeof (args[0]) === "string")
            {
                return DomGetty(document, args[0], true);
            }
        }
        else if (args.length == 2)
        {
            if (args[0].nodeType && typeof (args[1]) === "string")
            {
                return DomGetty(args[0], args[1], true);
            }
        }
        return [];
    };

})();

/**
 * DomFindy - Very Very Simple Dom Selector Engine, But find ancestor
 */
(function ()
{
    var m, el, els;
    var filters = {
        '#': function (cnxt, expr) // id
            {
                if ((m = /(\S*)#(\S+)/.exec(expr)) !== null)
                {
                    var tag = ((m[1] === "") ? "*" : m[1]);
                    var id = m[2];
                    var _node = cnxt;
                    while (_node)
                    {
                        if (_node.nodeName.toLowerCase() == "body")
                        {
                            break;
                        }
                        if (tag == "*" || _node.nodeName.toLowerCase() == tag)
                        {
                            if (_node.id == id)
                            {
                                return _node;
                            }
                        }
                        _node = _node.parentNode;
                    }
                }
                return null;
            },
        '.': function (cnxt, expr) // class
            {
                if ((m = /(\S*)\.(\S+)/.exec(expr)) !== null)
                {
                    var tag = ((m[1] === "") ? "*" : m[1]);
                    var klass = m[2];
                    var _node = cnxt;
                    while (_node)
                    {
                        if (_node.nodeName.toLowerCase() == "body")
                        {
                            break;
                        }
                        if (tag == "*" || _node.nodeName.toLowerCase() == tag)
                        {
                            //if (_node.className.indexOf(klass) > -1) {
                            if (_node.className && _node.className.indexOf(klass) > -1)
                            {
                                return _node;
                            }
                        }
                        _node = _node.parentNode;
                    }
                }
                return null;
            },
        '*': function (cnxt, expr) // tagname
            {
                var _node = cnxt;
                var map = {};
                var exprs = expr.split(",");
                for (var i = 0, len = exprs.length; i < len; i++)
                {
                    map[exprs[i]] = true;
                }
                while (_node)
                {
                    if (_node.nodeName.toLowerCase() == "body")
                    {
                        break;
                    }
                    if (map[_node.nodeName.toLowerCase()])
                    {
                        return _node;
                    }
                    _node = _node.parentNode;
                }
                return null;
            }
    };

    var find = function (cnxt, expr)
    {
        var fltr;
        if ((f = /(\.|#|:\w+)/.exec(expr)) !== null)
        {
            if (filters[f[1]])
            {
                fltr = f[1];
            }
        }
        fltr = fltr || "*";
        var result = null;
        if ((result = filters[fltr](cnxt, expr)) != null)
        {
            return result;
        }
        return null;
    };

    var DomFindy = function (context, selector)
    {
        if (!selector || typeof selector !== "string")
        {
            return null;
        }

        var els = context;
        var exprs = selector.split(" ");
        for (var i = 0, len = exprs.length; i < len; i++)
        {
            if ((els = find(els, exprs[i])) == null)
            {
                return null;
            }
        }
        return els;
    };

    /**
     * Find Ancestor Element By Css Selector
     * dFindy(element, selector) or dFindy(selector)
     */
    window.dFindy = function ()
    {
        var args = arguments;
        if (args.length == 1)
        {
            throw new Error("need more arguments");
        }
        else if (args.length == 2)
        {
            if (args[0].nodeType && typeof (args[1]) === "string")
            {
                return DomFindy(args[0], args[1]);
            }
        }
        return null;
    };
})();

if ( !RichTextEditor.TableUtil )
{

    RichTextEditor.TableUtil = {
	
        getClosestByTagNames: function (tagNames, el)
        {
            var tagName;
            if (el && typeof el.tagName === "string")
            {
                tagName = el.tagName.toLowerCase();
                if (tagName !== "body")
                {
                    if (RichTextEditor.Lib.array.contains(tagNames, tagName))
                    {
                        return el;
                    }
                    else
                    {
                        return arguments.callee(tagNames, el.parentNode);
                    }
                }
            }
            return null;
        },
        splitWidthByColSpan: function (td)
        {
            var styleWidth;
            if (1 < td.colSpan && td.style.width)
            {
                styleWidth = parseInt(td.style.width, 10);
                RichTextEditor.Util.setStyle(td,
                {
                    'width': Math.floor(styleWidth / td.colSpan) + "px"
                });
            }
        },
        splitHeightByRowSpan: function (td)
        {
            var styleHeight;
            if (1 < td.rowSpan && td.style.height)
            {
                styleHeight = parseInt(td.style.height, 10);
                RichTextEditor.Util.setStyle(td,
                {
                    'height': Math.floor(styleHeight / td.rowSpan) + "px"
                });
            }
        },
        cloneNodeForEmptyTd: function (node)
        {
            var newNode;
            newNode = node.cloneNode(false);
            this.emptyTd(newNode);
            return newNode;
        },
        emptyTd: function (node)
        {
            //node.innerHTML = "";
            node.innerHTML = RichTextEditor.EMPTY_PARAGRAPH_HTML;
        },
        getTableIndexerFromTd: function (td)
        {
            var currentTable;
            currentTable = this.getClosestByTagNames(["table"], td);
            return new RichTextEditor.TableUtil.Indexer(currentTable);
        }

    };
	
} // end if ( !RichTextEditor.TableUtil )


if ( !RichTextEditor.TableUtil.Boundary )
{
	RichTextEditor.TableUtil.Boundary = function()
	{
		this.top = -1;
		this.left = -1;
		this.bottom = -1;
		this.right = -1;
		
		if (arguments[0])
		{
			this.set(arguments[0]);			
		}
	};
	
	var proto = RichTextEditor.TableUtil.Boundary.prototype;

    proto.set = function (indexs)
	{
		if ("top" in indexs)
		{
			this.setTop(indexs.top);
		}
		if ("left" in indexs)
		{
			this.setLeft(indexs.left);
		}
		if ("bottom" in indexs)
		{
			this.setBottom(indexs.bottom);
		}
		if ("right" in indexs)
		{
			this.setRight(indexs.right);
		}
	};
	
	proto.setTop = function(value)
	{
		this.top = value;
	};
	
	proto.setLeft = function(value)
	{
		this.left = value;
	};
	
	proto.setBottom = function(value)
	{
		this.bottom = value;
	};
	
	proto.setRight = function(value)
	{
		this.right = value;
	};
	
	proto.isValid = function ()
	{
		if (this.top === -1)
		{
			return false;
		}
		if (this.left === -1)
		{
			return false;
		}
		if (this.bottom === -1)
		{
			return false;
		}
		if (this.right === -1)
		{
			return false;
		}
		return true;
	};
	
	proto.addBoundary = function (rowIndex, colIndex)
	{
		var changedStart, changedEnd;
		changedStart = this.addStartBoundary(rowIndex, colIndex);
		changedEnd = this.addEndBoundary(rowIndex, colIndex);
		return changedStart || changedEnd;
	};
	
	proto.merge = function (boundary)
	{
		var changedStart, changedEnd;
		changedStart = this.addStartBoundary(boundary.top, boundary.left);
		changedEnd = this.addEndBoundary(boundary.bottom, boundary.right);
		return changedStart || changedEnd;
	};
		
	proto.addStartBoundary = function (rowIndex, colIndex)
	{
		var changed;
		changed = false;
		if (this.top === -1 || rowIndex < this.top)
		{
			this.top = rowIndex;
			changed = true;
		}
		if (this.left === -1 || colIndex < this.left)
		{
			this.left = colIndex;
			changed = true;
		}
		return changed;
	};
	
	proto.addEndBoundary = function (rowIndex, colIndex)
	{
		var changed;
		changed = false;
		if (this.bottom === -1 || this.bottom < rowIndex)
		{
			this.bottom = rowIndex;
			changed = true;
		}
		if (this.right === -1 || this.right < colIndex)
		{
			this.right = colIndex;
			changed = true;
		}
		return changed;
	};
	
	proto = null;
	
} // end if ( !RichTextEditor.TableUtil.Boundary )

if ( !RichTextEditor.TableUtil.Indexer )
{
	RichTextEditor.TableUtil.Indexer = function()
	{
		this.indexData = null;
		this.table = null;

		this.resetIndex();
		this.setTable(arguments[0]);
		this.makeIndex();	
	};
	
	var proto = RichTextEditor.TableUtil.Indexer.prototype;
	
	proto.resetIndex = function ()
	{
		this.indexData = [];
	};
	
	proto.setTable = function (table)
	{
		this.table = table;
	};
		
	/**
	 * rowSpan 과 colSpan 을 펼친 형태의 array 에 table cell 들을 매칭시킨다.
	 */
	proto.makeIndex = function ()
	{
		var rows, rowLen, rowIndex, row, cells, cellLen, colIndex, cell;
		rows = this.table.rows;
		rowLen = rows.length;
		for (rowIndex = 0; rowIndex < rowLen; rowIndex += 1)
		{
			row = rows[rowIndex];
			cells = row.cells;
			cellLen = cells.length;
			for (colIndex = 0; colIndex < cellLen; colIndex += 1)
			{
				cell = cells[colIndex];
				this.addCellIndex(rowIndex, cell);
			}
		}
	};
	
	/**
	 * 만들고 있는 indexData 에 해당 cell 에 대한 index 를 추가한다.
	 */
	proto.addCellIndex = function (rowIndex, cell)
	{
		var viewIndexOfCell, row, rowSpan, calculatedRowIndex, col, colSpan;
		viewIndexOfCell = this.getNextCellIndex(this.indexData[rowIndex]);
		rowSpan = cell.rowSpan;
		for (row = 0; row < rowSpan; row += 1)
		{
			calculatedRowIndex = rowIndex + row;
			if (!this.indexData[calculatedRowIndex])
			{
				this.indexData[calculatedRowIndex] = [];
			}
			colSpan = cell.colSpan;
			for (col = 0; col < colSpan; col += 1)
			{
				this.indexData[calculatedRowIndex][viewIndexOfCell + col] = cell;
			}
		}
	};
	
	/**
	 * arr 를 순환하면서 처음으로 만난 빈 요소의 index 를 반환한다.
	 * arr 가 없으면 0 을 반환, 빈 요소가 없으면 length 를 반환한다.
	 */
	proto.getNextCellIndex = function (arr)
	{
		var i, len;
		if (!arr)
		{
			return 0;
		}
		len = arr.length;
		for (i = 0; i < len; i += 1)
		{
			if (!arr[i])
			{
				break;
			}
		}
		return i;
	};
	
	/**
	 * td 에 해당하는 boundary 를 구한다.
	 */
	proto.getBoundary = function (td)
	{
		var result, rows, rowLen, rowIndex, cells, cellLen, colIndex;
		result = new RichTextEditor.TableUtil.Boundary();
		rows = this.indexData;
		rowLen = rows.length;
		for (rowIndex = 0; rowIndex < rowLen; rowIndex += 1)
		{
			cells = rows[rowIndex];
			if (cells)
			{
				cellLen = cells.length;
				for (colIndex = 0; colIndex < cellLen; colIndex += 1)
				{
					if (cells[colIndex] === td)
					{
						result.addBoundary(rowIndex, colIndex);
					}
				}
			}
		}
		return result;
	};
	
	proto.addBoundary = function (rowIndex, colIndex)
	{
		var changedStart, changedEnd;
		changedStart = this.addStartBoundary(rowIndex, colIndex);
		changedEnd = this.addEndBoundary(rowIndex, colIndex);
		return changedStart || changedEnd;
	};
	
	proto.merge = function (boundary)
	{
		var changedStart, changedEnd;
		changedStart = this.addStartBoundary(boundary.top, boundary.left);
		changedEnd = this.addEndBoundary(boundary.bottom, boundary.right);
		return changedStart || changedEnd;
	};
	
	proto.addStartBoundary = function (rowIndex, colIndex)
	{
		var changed;
		changed = false;
		if (this.top === -1 || rowIndex < this.top)
		{
			this.top = rowIndex;
			changed = true;
		}
		if (this.left === -1 || colIndex < this.left)
		{
			this.left = colIndex;
			changed = true;
		}
		return changed;
	};
	
	proto.addEndBoundary = function (rowIndex, colIndex)
	{
		var changed;
		changed = false;
		if (this.bottom === -1 || this.bottom < rowIndex)
		{
			this.bottom = rowIndex;
			changed = true;
		}
		if (this.right === -1 || this.right < colIndex)
		{
			this.right = colIndex;
			changed = true;
		}
		return changed;
	};
	
	/**
	 * Boundary 에 포함되는 td 들을 가져온다.
	 */
	proto.getTdArr = function (boundary)
	{
		var result, rowIndex, cells, colIndex;
		result = [];
		rowIndex = boundary.top;
		while (rowIndex <= boundary.bottom)
		{			
			cells = this.indexData[rowIndex];
			colIndex = boundary.left;
			while (colIndex <= boundary.right)
			{
				if (RichTextEditor.Lib.array.contains(result, cells[colIndex]) === false)
				{
					result.push(cells[colIndex]);
				}
				colIndex += 1;
			}
			rowIndex += 1;
		}
		return result;
	};
	
	/**
	 * 인덱스 갱신(테이블이 변경되었을 때).
	 */
	proto.reload = function ()
	{
		this.resetIndex();
		this.makeIndex();
	};
	
    proto.getRowSize = function ()
	{
		return this.indexData.length;
	};
	
	proto.getColSize = function ()
	{
		if (0 < this.indexData.length)
		{
			return this.indexData[0].length;
		}
		return 0;
	};
	
	/**
	 * rowIndex 와 colIndex 에 매칭되는 td 를 가져온다.
	 */
	proto.getTd = function (rowIndex, colIndex)
	{
		if (this.indexData[rowIndex])
		{
			if (this.indexData[rowIndex][colIndex])
			{
				return this.indexData[rowIndex][colIndex];
			}
		}
		return null;
	};
	
	/**
	 * 해당하는 row index 를 top 으로 가지는 cell 들을 가져온다.
	 */
	proto.getTdArrHasTop = function (index)
	{
		var result, currentCell, adjoiningCell, len, i;
		result = [];
		len = this.getColSize();
		for (i = 0; i < len; i += 1)
		{
			currentCell = this.getTd(index, i);
			adjoiningCell = this.getTd(index - 1, i);
			this.uniquePushWhenDifferent(result, currentCell, adjoiningCell);
		}
		return result;
	};
	
	/**
	 * 해당하는 row index 를 bottom 으로 가지는 cell 들을 가져온다.
	 */
	proto.getTdArrHasBottom = function (index)
	{
		var result, currentCell, adjoiningCell, len, i;
		result = [];
		len = this.getColSize();
		for (i = 0; i < len; i += 1)
		{
			currentCell = this.getTd(index, i);
			adjoiningCell = this.getTd(index + 1, i);
			this.uniquePushWhenDifferent(result, currentCell, adjoiningCell);
		}
		return result;
	};
	
	/**
	 * 해당하는 row index 를 left 로 가지는 cell 들을 가져온다.
	 */
	proto.getTdArrHasLeft = function (index)
	{
		var result, currentCell, adjoiningCell, len, i;
		result = [];
		len = this.getRowSize();
		for (i = 0; i < len; i += 1)
		{
			currentCell = this.getTd(i, index);
			adjoiningCell = this.getTd(i, index - 1);
			this.uniquePushWhenDifferent(result, currentCell, adjoiningCell);
		}
		return result;
	};
	
	/**
	 * 해당하는 row index 를 right 로 가지는 cell 들을 가져온다.
	 */
	proto.getTdArrHasRight = function (index)
	{
		var result, currentCell, adjoiningCell, len, i;
		result = [];
		len = this.getRowSize();
		for (i = 0; i < len; i += 1)
		{
			currentCell = this.getTd(i, index);
			adjoiningCell = this.getTd(i, index + 1);
			this.uniquePushWhenDifferent(result, currentCell, adjoiningCell);
		}
		return result;
	};
	/**
	 * currentCell 과 adjoiningCell 이 다르면 currentCell 를 tdArr 에 중복없이 push 한다.
	 */
	proto.uniquePushWhenDifferent = function (tdArr, currentCell, adjoiningCell)
	{
		if (currentCell !== adjoiningCell)
		{
			if (RichTextEditor.Lib.array.contains(tdArr, currentCell) === false)
			{
				tdArr.push(currentCell);
			}
		}
	};
	
	proto = null;
}