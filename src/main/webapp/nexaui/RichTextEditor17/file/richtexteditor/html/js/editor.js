if ( !window.RichTextEditor ) 
{
	window.RichTextEditor = {};
}

if ( !RichTextEditor.Editor ) 
{	
	RichTextEditor.Editor = function()
	{
		this.doc = document;
		this.docBody = this.doc.body;
		
		var userConfig = arguments[0] || {};
		this.config = {
			container: "__rich_text_editor_div__",	// 에디트 영역의 div id
			iframe: "__rich_text_editor_frame__"	// 에디트 영역의 iframe id
		};

		RichTextEditor.Lib.object.copyProperties(this.config, userConfig);

		this.notifier = arguments[1] || function (){};
		
		this.history = new RichTextEditor.History(this);
		
		this.container = null;
		this.editor = null;
		this.editorWin = null;
		this.editorDoc = null;
		this.editorBody = null;

		this.createNodes();	
	};

	var proto = RichTextEditor.Editor.prototype;
	
	proto.createNodes = function ()
	{
		var config = this.config,
			id, pThis = this,
			docBody = this.docBody;

		this.container = RichTextEditor.Util.createEle(this.doc, "div",
			{
				"id": config.container
			},
			{
				"display": "block",
				"width": "100%",
				"height": "100%",
				"border": "0px none #b5b5b5"
			}
		);
		RichTextEditor.DomUtil.append(docBody, this.container);

		this.editor = RichTextEditor.Util.createEle(this.doc, "iframe",
		{
			"id": config.iframe,
			"name": config.iframe
		},
		{
			"width": "100%",
			"height": "100%",
			"margin": "0px",
			"border": "0px"
		});
		this.editor.setAttribute("allowtransparency", "true"); //IE에서 제공되는 비표준 속성, 자바스크립트로 속성 부여
		this.editor.setAttribute("frameBorder", "0");

		RichTextEditor.Util.addEvent(this.editor, "load", function (evt)
		{
			pThis.onLoad(evt);
		});

		RichTextEditor.DomUtil.append(this.container, this.editor);
	};
	
	proto.onLoad = function (evt)
	{
		this.editorWin = this.editor.contentWindow;
		this.editorDoc = this.editor.contentDocument || this.editorWin.document;		
		this.editorBody = this.editorDoc.body;		
		this.selection = new RichTextEditor.Selection(this.editor);
		
		this.editable = false;
		
		this.setEditable();
		
		RichTextEditor.Util.applyCSSText(this.editorDoc, this.config.decoStyle);
		
		var linkStyles = this.config.linkStyle;
		for (var i=0,len=linkStyles.length; i<len; i++)
		{
			RichTextEditor.Util.addLinkStyle(linkStyles[i], this.editorDoc);
		}

		var addLinkStyles = this.config.linkStyle;

		this.checkMousedown = false;
		this.exceptionConfig();
		this.bindEvents();
		
		this.selectedContents = "";
		
		this.setContent("");
		
		var pThis = this;
		window.setTimeout(function(){pThis.notifier.call(pThis, "onLoad");}, 0);
	};

	proto.exceptionConfig = function ()
	{
		// zoo - 옵션 처리?
		if (this.editorBody.spellcheck)
		{
			this.editorBody.spellcheck = false;
		}

		// table row/column insert/delete 기능 여부
		if (RichTextEditor.Browser == "Gecko")
		{
			this.editorDoc.execCommand("enableInlineTableEditing", false, false);
		}
	};

	proto.notifyEvent = function (evt)
	{
		this.notifier.call(this, "notifyEvent", evt);
	};

	proto.bindEvents = function ()
	{
		var pThis = this;

		RichTextEditor.Util.addEvent(this.editorDoc, "mousedown", function (evt)
		{
			pThis.onMouseDown(evt);
		});
		RichTextEditor.Util.addEvent(this.editorDoc, "mouseup", function (evt)
		{
			pThis.onMouseUp(evt);
		});
		RichTextEditor.Util.addEvent(this.editorBody, "keydown", function (evt)
		{
			pThis.onKeyDown(evt);
		});
		RichTextEditor.Util.addEvent(this.editorBody, "keyup", function (evt)
		{
			pThis.onKeyUp(evt);
		});
	};

	proto.onMouseDown = function (evt)
	{
		if (RichTextEditor.Browser == "Safari")
		{
			this.checkMousedown = true;
		}

		var ele = RichTextEditor.Util.elementByEvent(evt);
		this.notifyEvent(evt);
		
		this.history.saveHistoryIfEdited();
	};

	proto.onMouseUp = function (evt)
	{
		// editorBody 영역위에 오픈되어 있는 별도의 창 close시 mouseup 이벤트 발생 방지
		// (이미지 업로드창의 이미지파일선택 창 close시)
		if (RichTextEditor.Browser == "Safari" && this.checkMousedown == false)
		{
			return;
		}
		this.checkMousedown = false;

		var ele = RichTextEditor.Util.elementByEvent(evt),
			ahref = RichTextEditor.DomUtil.find(ele, "a");
		// console.log(">>>>>>>> onMouseUp ahref:" + ahref + ",ele:" + ele);

		if (!RichTextEditor.Lib.isEmpty(ahref))
		{
			evt._ahref = ahref;
		}
		else
		{
			evt._ahref = null;
		}
		this.notifyEvent(evt);
	};

	proto.onKeyDown = function (evt)
	{		
		this.notifyEvent(evt);
		
		if ( this.history )
		{			
			var ctrl = evt.ctrlKey || (evt.keyCode === 17);
			if ( ctrl )
			{
				// Undo (Ctrl + Z)
				if ( evt.keyCode == 90 )
				{
					RichTextEditor.Util.stop(evt);
					this.history.undoHandler();
				}
				// ReDo (Ctrl + Y)
				else if ( evt.keyCode == 89 )
				{
					RichTextEditor.Util.stop(evt);
					this.history.redoHandler();
				}
			}
		}
	};

	proto.onKeyUp = function (evt)
	{
		// safari(window) browser toolbar영역에 마우스클릭시 keyup 이벤트 발생
		// (keycode=229) -> queryCommandState 값을 구하기 위해 예외 처리
		if (RichTextEditor.Browser == "Safari" && evt.keyCode == 229)
		{
			return;
		}

		this.notifyEvent(evt);
		
		this.history.saveHistoryByKeyEvent(evt);
	};

	/**
	 * edit 영역을 편집 가능한 상태로 변경한다.
	 */
	proto.setEditable = function ()
	{
		if ('contentEditable' in this.editorBody)
		{
			this.editorBody.contentEditable = true;
			this.toggleEditable();
		}
		else if ('designMode' in this.editorDoc)
		{
			this.editorDoc.designMode = "On";
			this.toggleEditable();
		}
	};

	/**
	 * editable 설정
	 */
	proto.toggleEditable = function ()
	{
		this.editable = (this.editable === true) ? false : true;
	};

	/**
	 * body style 설정
	 */
	proto.setBodyStyle = function (style, body)
	{
		if (RichTextEditor.Lib.isEmpty(style))
		{
			style = this.config.style;
		}

		RichTextEditor.Util.setStyle(body || this.editorBody, style);
	};

	/**
	 * 컨텐츠 설정
	 */
	proto.setContent = function (content)
	{
		this.editorBody.innerHTML = content;
	};

	proto.getContent = function ()
	{
		return this.editorBody.innerHTML;
	};
	
	proto.getTextContent = function ()
	{
		var content;
		if ("textContent" in this.editorBody)
		{
			content = this.editorBody.textContent;
		}
		else
		{
			content = this.editorBody.innerText;
		}

		return content;
	};
	
	/**
	 * 포커스 설정
	 */
	proto.focusEditor = function ()
	{
		this.editorBody.focus();
	};
	
	proto.blurEditor = function ()
	{   
		this.editorBody.blur();
	};	
	
	proto.setCaretToTop = function ()
	{
		this.editorBody.focus();
		var sel = this.selection.getSelection();
		if (this.editorBody.firstChild)
		{
			//sel.collapseToStart();
			sel.collapse(this.editorBody.firstChild, 0);
			this.editorBody.scrollTop = 0;
		}
	};
	
	proto.saveSelection = function ()
	{
		this.selectedContents = "";
		var sel = this.selection.getSelection();

		if (this.editorWin.getSelection)
		{
			if (sel.getRangeAt && sel.rangeCount)
			{
				this.selectedContents = sel.getRangeAt(0);
			}
		}
		else
		{
			if (sel.createRange)
			{
				this.selectedContents = sel.createRange();
			}
		}
	};
	
	proto.restoreSelection = function ()
	{
		if (this.selectedContents)
		{
			if (this.editorWin.getSelection)
			{
				var sel = this.selection.getSelection();
				sel.removeAllRanges();
				sel.addRange(this.selectedContents);
			}
			else
			{
				if (this.selectedContents.select)
				{
					this.selectedContents.select();
				}
			}
		}
	};

	/**
	 *	command의 현재값 리턴
	 */
	proto.queryCommandValue = function (cmdID)
	{
		if (this.editorDoc && this.editable && this.queryCommandEnabled(cmdID))
		{
			return this.editorDoc.queryCommandValue(cmdID);
		}
	};

	/**
	 *	command의 현재 상태  리턴
	 */
	proto.queryCommandState = function (cmdID)
	{
		if (this.editorDoc && this.editable && this.queryCommandEnabled(cmdID))
		{
			return this.editorDoc.queryCommandState(cmdID);
		}

		return false;
	};

	/**
	 *	command의 실행 가능여부 리턴
	 */
	proto.queryCommandEnabled = function (cmdID)
	{
		if (this.editorDoc && this.editable)
		{
			return this.editorDoc.queryCommandEnabled(cmdID);
		}
		return false;
	}

	proto.pasteHtmlAtCaret = function (html, bSelect)
	{
		if (RichTextEditor.Lib.isEmpty(html))
		{
			return;
		}

		var sel = this.selection.getSelection(),
			range;

		if (this.editorWin.getSelection)
		{
			if (sel.getRangeAt && sel.rangeCount)
			{
				range = sel.getRangeAt(0);
				range.deleteContents();

				var ele = RichTextEditor.Util.createEle(this.editorDoc, "div"),
					fragment = this.editorDoc.createDocumentFragment(),
					node, firstNode, lastNode;

				ele.innerHTML = html;
				while (node = ele.firstChild)
				{
					lastNode = fragment.appendChild(node);
				}

				firstNode = fragment.firstChild;
				range.insertNode(fragment);

				if (lastNode)
				{
					range = range.cloneRange();
					range.setStartAfter(lastNode);
					if (bSelect)
					{
						range.setStartBefore(firstNode);
					}
					else
					{
						range.collapse(true);
					}
					sel.removeAllRanges();
					sel.addRange(range);
				}
			}
		}
		else
		{
			var originalRange,
				type = sel.type.toLowerCase();

			if (type === "control")
			{
				var node = this.selection.getControl();
				if (node)
				{
					if (node && node.tagName && node.tagName.toLowerCase() == "img")
					{
						RichTextEditor.DomUtil.remove(node);
					}
				}
			}
			else
			{
				originalRange = sel.createRange();
				originalRange.collapse(true);
			}

			sel.createRange().pasteHTML(html);

			if (bSelect && !RichTextEditor.Lib.isEmpty(originalRange))
			{
				range = sel.createRange();
				range.setEndPoint("StartToStart", originalRange);
				range.select();
			}
		}
	
		this.history.saveHistory();
	};
	
	proto = null;
	
	// browser 정보
	var urlParams = {};
	(function () {
		var match,
		pl     = /\+/g,
		search = /([^&=]+)=?([^&]*)/g,
		decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
		query  = window.location.search.substring(1);
		while (match = search.exec(query)) { urlParams[decode(match[1])] = decode(match[2]); }
	})();
	
	var browser = urlParams["Browser"];
	var browserVersion = urlParams["BrowserVersion"];
	var browserType = urlParams["BrowserType"];
	
	// 런타임의 경우...
	if ( browser == "Runtime" )
	{
		if (navigator.appVersion.indexOf('MSIE') > -1)
		{
			browser = "IE";
			if (document.documentMode)
			{
				browserVersion = document.documentMode;
				browserType = browser + browserVersion;
			}
			else
			{
				var compatMode = document.compatMode;
				if (compatMode && compatMode.toLowerCase() == "backcompat")
				{
					if (/MSIE\s+7(.+)[;]/.test(navigator.appVersion))
					{
						browserVersion = 7;
						browserType = "IE7";
					}
					else if (/MSIE\s+6(.+)[;]/.test(navigator.appVersion))
					{
						browserVersion = 6;
						browserType = "IE6";
					}
					else if (/MSIE\s+5(.+)[;]/.test(navigator.appVersion))
					{
						browserVersion = 5;
						browserType = "IE6";
					}
				}
			}
		}
		else if (navigator.userAgent.match(/Trident\/.*rv\:(.+?)[\);]/)) // IE 11 이상
		{
			browser = "IE";
			if (document.documentMode)
			{
				browserVersion = document.documentMode;
				browserType = browser + browserVersion;
			}
			else
			{
				browserVersion = parseInt(RegExp.$1) | 0;
			}
		}
	}
	
	RichTextEditor.Browser = browser;
	RichTextEditor.BrowserVersion = browserVersion;
	RichTextEditor.BrowserType = browserType;
	
	RichTextEditor.EMPTY_PARAGRAPH_HTML = "<p>" + (browser == "IE" && browserVersion < 11 ? "&nbsp;" : "<br>") + "</p>";
}
