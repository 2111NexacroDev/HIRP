/*
Daum Editor Licence Information

++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Daum Editor
Developed by : Frontend Tech. Team
Powered by : Daum Communications Corp.
License: GNU LGPL (Lesser General Public Licence)
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

This library is free software;
This source code and the demo application is distributed under the GNU Lesser
General Public License.
You can redistribute it and/or modify it under the this License;

See the GNU Lesser General Public License for more details.
http://www.gnu.org/licenses/lgpl.html
[KO] http://korea.gnu.org/people/chsong/copyleft/lgpl.ko.html

For further information visit:
	https://github.com/daumcorp/DaumEditor
Do you have any questions?
	https://github.com/daumcorp/DaumEditor/issues

다음오픈에디터의 라이선스는 GNU LGPL(Lesser General Public License) 으로
오픈되어 있는 소스이므로 저작권료 없이 사용이 가능하며, 목적에 맞게 수정하여 사용할 수 있으십니다.
또한 LGPL에는 수정한 부분의 소스공개를 권장하고 있으나, 강제 사항은 아니므로 공개하지 않으셔도 무방합니다.
다만 사용하시는 소스 상단 부분에 다음오픈에디터를 사용하셨음을 명시해 주시길 권장 드리며,
꾸준한 업데이트를 할 예정이니 종종 방문 하셔서 버그가 수정 되고 기능이 추가된 버전들을 다운로드 받아 사용해 주세요.

라이센스 : GNU LGPL(Lesser General Public License)
홈페이지 : https://github.com/daumcorp/DaumEditor/
구 홈페이지 : http://code.google.com/p/daumopeneditor/
*/
/**
 * Daum Editor의 표설정기능 일부수정 적용
 */
 
if ( !window.RichTextEditor ) 
{
	window.RichTextEditor = {};
}

/***************************************************
	RichTextEditor.Table
***************************************************/
if ( !RichTextEditor.Table ) 
{
	RichTextEditor.Table = function()
	{
       	this.doc = arguments[0];
		this.container = arguments[1];
		this.editor = arguments[2];
		this.selection = arguments[3];		
		var userConfig = arguments[4];
		
		this.config = {
			selectedColor: "#ceefff", // 마우스드래그에 의해 선택되어지는 셀 색상
			borderRange: "all", // 표 테두리 유형 기본값
			borderColor: "#2462af", // 표 선 색상 기본값
			borderHeight: 1, // 표 선 크기 기본값
			borderType: "solid" // 표 선 유형 기본값
		};

		RichTextEditor.Lib.object.copyProperties(this.config, userConfig);

		this.editorWin = this.editor.contentWindow;
		this.editorDoc = this.editor.contentDocument || this.editorWin.document;
		this.editorBody = this.editorDoc.body;

		this.colDragger;
		this.rowDragger;
		this.isDragging;

		this.minWidth = 20;
		this.w3cBoxModelWorks;

		this.currentTable;
		this.currentTD;
		this.currentLeftTD;
		this.currentRightTD;
		this.currentLeftTDWidth;
		this.currentRightTDWidth;
		this.currentTDHeight;
		this.currentTableWidth;
		this.currentPointX;
		this.currentPointY;

		this.currentNode;
		this.currentDragger;

		this.movingX;
		this.movingY;

		this.leftTdArray;
		this.rightTdArray;
		this.topTdArray;

		this.leftWidthArr;
		this.rightWidthArr;
		this.topHeightArr;

		this.posiX;
		this.posiY;
		this.firedEvent;

		this.edgeType = {
			top: "EDGE_TOP",
			bottom: "EDGE_BOTTOM",
			left: "EDGE_LEFT",
			right: "EDGE_RIGHT",
			none: "NONE"
		};

		this.currentEdgeType = this.edgeType.none;

		this.borderProperty = {
			range: this.config.borderRange,
			color: this.config.borderColor,
			height: this.config.borderHeight,
			type: this.config.borderType
		};

		this.tableSelector = new RichTextEditor.Table.Selector(this.editor, this.config, this.selection);
		this.tableMerge = new RichTextEditor.Table.Merge(this.editor, this.config);
		this.tableInsert = new RichTextEditor.Table.Insert(this.editor, this.config);
		this.tableDelete = new RichTextEditor.Table.Delete(this.editor, this.config);
		this.tableBorder = new RichTextEditor.Table.Border(this.editor, this.config);

		this.checkW3cBoxModel();
		this.initDragger();	
	};
	
	var proto = RichTextEditor.Table.prototype;

	// zoo - http://quirksmode.org/css/user-interface/boxsizing.html
	proto.checkW3cBoxModel = function ()
	{
		var div = this.editorDoc.createElement("div");
		this.editorBody.appendChild(div);
		div.style.width = div.style.paddingLeft = "1px";
		this.w3cBoxModelWorks = div.offsetWidth === 2;
		this.editorBody.removeChild(div);
	};

    proto.initDragger = function ()
	{
		var colDraggerHtml = '<div class="tx-table-col-resize-dragger" style="position:absolute; overflow:hidden; top: 0px; left: 0px; width: 3px; height: 100%; cursor:col-resize;"></div>',
			rowDraggerHtml = '<div class="tx-table-row-resize-dragger" style="position:absolute; overflow:hidden; top: 0px; left: 0px; width: 100%; height: 3px; cursor:row-resize;"></div>',
			editorContainer = this.container,
			tmpNode,
			pThis = this;

		tmpNode = this.doc.createElement('div');
		tmpNode.innerHTML = colDraggerHtml;
		this.colDragger = tmpNode.firstChild;
		RichTextEditor.DomUtil.insertFirst(editorContainer, this.colDragger);
		RichTextEditor.Util.hide(this.colDragger);

		tmpNode = this.doc.createElement('div');
		tmpNode.innerHTML = rowDraggerHtml;
		this.rowDragger = tmpNode.firstChild;
		RichTextEditor.DomUtil.insertFirst(editorContainer, this.rowDragger);
		RichTextEditor.Util.hide(this.rowDragger);

		this.resetDragger();

		RichTextEditor.Util.addEvent(this.doc.body, "mouseup", function (evt)
		{
			pThis.initElement(evt);
			pThis.mouseUpHandler();
		});
		RichTextEditor.Util.addEvent(this.editorBody, "mousemove", function (evt)
		{
			pThis.initElement(evt);
			pThis.mouseMoveHandler();
		});
		RichTextEditor.Util.addEvent(this.editorBody, "mouseup", function (evt)
		{
			pThis.initElement(evt);
			pThis.mouseUpHandler();
		});
		RichTextEditor.Util.addEvent(this.colDragger, "mousedown", function (evt)
		{
			pThis.initElement(evt);
			pThis.mouseDownHandler();
		});
		RichTextEditor.Util.addEvent(this.rowDragger, "mousedown", function (evt)
		{
			pThis.initElement(evt);
			pThis.mouseDownHandler();
		});
	};

	proto.resetDragger = function ()
	{
		this.isDragging = false;
		this.currentNode = null;
		this.currentDragger = null;

		this.currentTable = this.currentTD = null;
		this.currentLeftTD = this.currentRightTD = null;

		this.rightTdArray = this.leftTdArray = this.topTdArray = null;
		this.leftWidthArr = this.rightWidthArr = this.topHeightArr = null;

		this.movingX = this.movingY = 0;
		this.currentTableWidth = this.currentPointX = this.currentPointY = 0;
		this.currentLeftTDWidth = this.currentRightTDWidth = this.currentTDHeight = 0;
	};

	proto.initElement = function (evt)
	{
		this.firedEvent = evt;
		this.posiX = this.posX(evt);
		this.posiY = this.posY(evt);
	};

	proto.posX = function (e)
	{
		var posx = 0;
		e = e || this.editorWin.event;
		if (e.pageX)
		{
			posx = e.pageX;
		}
		else if (e.clientX)
		{
			posx = e.clientX + this.editorBody.scrollLeft + this.editorDoc.documentElement.scrollLeft;
		}
		return posx;
	};

	proto.posY = function (e)
	{
		var posy = 0;
		e = e || this.editorWin.event;
		if (e.pageY)
		{
			posy = e.pageY;
		}
		else if (e.clientY)
		{
			posy = e.clientY + this.editorBody.scrollTop + this.editorDoc.documentElement.scrollTop;
		}
		return posy;
	};

	proto.mouseDownHandler = function ()
	{
		this.currentTable = RichTextEditor.DomUtil.find(this.currentNode, "table");
		if (this.currentTable == null)
		{
			return null;
		}

		this.isDragging = true;
		this.currentTableWidth = this.currentTable.offsetWidth;

		if (this.currentEdgeType != this.edgeType.none)
		{
			RichTextEditor.Util.stop(this.firedEvent);
			this.showDragger();
		}

		switch (this.currentEdgeType)
		{
			case this.edgeType.left:
				this.makeTDArrForLeftEdge();
				this.startResizeCol();
				break;
			case this.edgeType.right:
				this.makeTDArrForRightEdge();
				this.startResizeCol();
				break;
			case this.edgeType.top:
				this.makeTDArrForTopEdge();
				this.startResizeRow();
				break;
			case this.edgeType.bottom:
				this.makeTDArrForBottomEdge();
				this.startResizeRow();
				break;
		}
	};

	proto.mouseUpHandler = function ()
	{
		switch (this.currentEdgeType)
		{
			case this.edgeType.left:
			case this.edgeType.right:
				this.stopResizeCol();
				break;
			case this.edgeType.top:
			case this.edgeType.bottom:
				this.stopResizeRow();
				break;
		}
	};

	proto.mouseMoveHandler = function ()
	{
		if (this.isDragging)
		{
			this.currentDragger = this.getDragger();
			this.moveDraggingAction();
		}
		else
		{
			this.moveUnDraggingAction();
		}
	};

	proto.makeTDArrForLeftEdge = function ()
	{
		var indexer = new RichTextEditor.TableUtil.Indexer(this.currentTable);
		var curBoundery = indexer.getBoundary(this.currentNode);

		if (curBoundery.left > 0)
		{
			this.leftTdArray = indexer.getTdArrHasRight(curBoundery.left - 1);
			this.rightTdArray = indexer.getTdArrHasLeft(curBoundery.left);
		}
	};

	proto.makeTDArrForRightEdge = function ()
	{
		var indexer = new RichTextEditor.TableUtil.Indexer(this.currentTable);
		var curBoundery = indexer.getBoundary(this.currentNode);
		var colSize = indexer.getColSize();

		this.leftTdArray = indexer.getTdArrHasRight(curBoundery.right);

		if (curBoundery.right < colSize - 1)
		{
			this.rightTdArray = indexer.getTdArrHasLeft(curBoundery.right + 1);
		}
	};

	proto.makeTDArrForTopEdge = function ()
	{
		var indexer = new RichTextEditor.TableUtil.Indexer(this.currentTable);
		var curBoundery = indexer.getBoundary(this.currentNode);

		this.topTdArray = indexer.getTdArrHasBottom(curBoundery.top - 1);
	};

	proto.makeTDArrForBottomEdge = function ()
	{
		var indexer = new RichTextEditor.TableUtil.Indexer(this.currentTable);
		var curBoundery = indexer.getBoundary(this.currentNode);

		this.topTdArray = indexer.getTdArrHasTop(curBoundery.bottom);
	};

	proto.startResizeCol = function ()
	{
		this.isDragging = true;
		this.leftWidthArr = [];
		this.rightWidthArr = [];
		var i = 0;

		if (this.leftTdArray)
		{
			for (i = 0; i < this.leftTdArray.length; i++)
			{
				this.leftWidthArr.push(this.leftTdArray[i].offsetWidth);
			}
			this.currentLeftTDWidth = RichTextEditor.Lib.array.min(this.leftWidthArr);
			for (i = 0; i < this.leftTdArray.length; i++)
			{
				if (this.currentLeftTDWidth == this.leftWidthArr[i])
				{
					this.currentLeftTD = this.leftTdArray[i];
					break;
				}
			}
		}
		if (this.rightTdArray)
		{
			for (i = 0; i < this.rightTdArray.length; i++)
			{
				this.rightWidthArr.push(this.rightTdArray[i].offsetWidth);
			}
			this.currentRightTDWidth = RichTextEditor.Lib.array.min(this.rightWidthArr);
			for (i = 0; i < this.rightTdArray.length; i++)
			{
				if (this.currentRightTDWidth == this.rightWidthArr[i])
				{
					this.currentRightTD = this.rightTdArray[i];
					break;
				}
			}
		}
		this.currentPointX = RichTextEditor.Util.getCoordsTarget(this.currentDragger).left;
	};

	proto.startResizeRow = function ()
	{
		this.isDragging = true;
		this.currentTDHeight = this.currentNode.offsetHeight;
		this.topHeightArr = [];

		if (this.topTdArray)
		{
			var i;
			for (i = 0; i < this.topTdArray.length; i++)
			{
				this.topHeightArr.push(parseInt(this.topTdArray[i].offsetHeight));
			}
			this.currentTDHeight = RichTextEditor.Lib.array.min(this.topHeightArr);
			for (i = 0; i < this.topTdArray.length; i++)
			{
				if (this.currentTDHeight == this.topHeightArr[i])
				{
					this.currentTD = this.topTdArray[i];
				}
			}
		}
		this.currentPointY = RichTextEditor.Util.getCoordsTarget(this.currentDragger).top;
	};

	proto.showDragger = function ()
	{		
		if (this.tableSelector.isDuringSelection())
		{
			this.currentEdgeType = this.edgeType.none;
		}

		switch (this.currentEdgeType)
		{
			case this.edgeType.left:
			case this.edgeType.right:
				RichTextEditor.Util.hide(this.rowDragger);
				RichTextEditor.Util.show(this.colDragger);
				this.makeColDragger(this.colDragger);
				this.currentDragger = this.colDragger;
				break;
			case this.edgeType.top:
			case this.edgeType.bottom:
				RichTextEditor.Util.hide(this.colDragger);
				RichTextEditor.Util.show(this.rowDragger);
				this.makeRowDragger(this.rowDragger);
				this.currentDragger = this.rowDragger;
				break;
			case this.edgeType.none:
				RichTextEditor.Util.hide(this.colDragger);
				RichTextEditor.Util.hide(this.rowDragger);
				break;
		}
	};

	proto.makeColDragger = function (dragger)
	{
		if (dragger == null) return;

		var left;
		if (this.isDragging)
		{
			left = RichTextEditor.Util.getCoordsTarget(dragger).left;

			RichTextEditor.Util.setStyle(dragger,
			{
				"width": "4px",
				"top": RichTextEditor.Util.toPx(this.editor.offsetTop),
				"height": RichTextEditor.Util.toPx(this.editor.offsetHeight),
				"border": "1px dotted #81aFFC",
				"background": "",
				"left": RichTextEditor.Util.toPx(left)
			});
			RichTextEditor.Util.setOpacity(dragger, 1);
		}
		else
		{
			left = Math.round(this.posiX) + this.editor.offsetLeft - RichTextEditor.DomUtil.getScrollLeft(this.editorDoc);

			RichTextEditor.Util.setStyle(dragger,
			{
				"width": "4px",
				"top": RichTextEditor.Util.toPx(this.editor.offsetTop),
				"height": RichTextEditor.Util.toPx(this.editor.offsetHeight),
				"border": "",
				"background": "blue",
				"left": RichTextEditor.Util.toPx(left)
			});
			RichTextEditor.Util.setOpacity(dragger, 0);
		}
	};

	proto.makeRowDragger = function (dragger)
	{
		if (dragger == null) return;

		var top = null;
		if (this.isDragging)
		{
			top = RichTextEditor.Util.getCoordsTarget(dragger).top;

			RichTextEditor.Util.setStyle(dragger,
			{
				"left": RichTextEditor.Util.toPx(this.editor.offsetLeft),
				"width": RichTextEditor.Util.toPx(this.editor.offsetWidth),
				"height": "4px",
				"border": "1px dotted #81aFFC",
				"background": "",
				"top": RichTextEditor.Util.toPx(top)
			});
			RichTextEditor.Util.setOpacity(dragger, 1);

		}
		else
		{
			top = Math.round(this.posiY) + this.editor.offsetTop - RichTextEditor.DomUtil.getScrollTop(this.editorDoc);

			RichTextEditor.Util.setStyle(dragger,
			{
				"left": RichTextEditor.Util.toPx(this.editor.offsetLeft),
				"width": RichTextEditor.Util.toPx(this.editor.offsetWidth),
				"height": "4px",
				"border": "",
				"background": "blue",
				"top": RichTextEditor.Util.toPx(top)
			});
			RichTextEditor.Util.setOpacity(dragger, 0);
		}
	};

	proto.getDragger = function ()
	{
		var dragger = null;
		switch (this.currentEdgeType)
		{
			case this.edgeType.left:
			case this.edgeType.right:
				dragger = this.colDragger;
				break;
			case this.edgeType.top:
			case this.edgeType.bottom:
				dragger = this.rowDragger;
				break;
		}
		return dragger;
	};

	proto.moveDraggingAction = function ()
	{
		switch (this.currentEdgeType)
		{
			case this.edgeType.left:
			case this.edgeType.right:
				this.moveCalcResizeCol();
				break;
			case this.edgeType.top:
			case this.edgeType.bottom:
				this.moveCalcResizeRow();
				break;
		}
	};

	proto.moveUnDraggingAction = function ()
	{
		var td = RichTextEditor.DomUtil.find(RichTextEditor.Util.elementByEvent(this.firedEvent), "td");

		if (td)
		{
			this.currentNode = td;
			this.currentEdgeType = this.getEdgeType(this.currentNode);
			this.showDragger();
		}
		else
		{
			this.currentEdgeType = this.edgeType.none;
			this.showDragger();
		}
	};

	proto.getEdgeType = function (node)
	{
		var rect,
			currentEdgeType = this.edgeType.none;

		//HISTORY. 아래 코드는 jQuery 1.6.4 에서 훔쳐옴..
		//버그 재현 코드
		//	<TABLE><TBODY><TR><TD style="BORDER-TOP: #ff8b16 50px solid">
		//	여기에 테이블 삽입.
		//	</TD></TR></TBODY></TABLE>
		if ("getBoundingClientRect" in document.documentElement)
		{
			try
			{
				var doc = node.ownerDocument,
					docElem = doc.documentElement,
					body = doc.body;
				var box = node.getBoundingClientRect(),
					win = doc.defaultView || doc.parentWindow,
					clientTop = docElem.clientTop || body.clientTop || 0,
					clientLeft = docElem.clientLeft || body.clientLeft || 0,
					scrollTop = win.pageYOffset || this.w3cBoxModelWorks && docElem.scrollTop || body.scrollTop,
					scrollLeft = win.pageXOffset || this.w3cBoxModelWorks && docElem.scrollLeft || body.scrollLeft,
					top = box.top + scrollTop - clientTop,
					left = box.left + scrollLeft - clientLeft;
				rect = {
					top: top,
					left: left,
					bottom: top + node.offsetHeight,
					right: left + node.offsetWidth
				};
			}
			catch (e)
			{
				rect = null;
			}
		}

		//기존 코드는 fallback.
		if (!rect)
		{
			rect = RichTextEditor.Util.getCoordsTarget(node);
		}
		if ((this.posiX - rect.left) < 5 && node.cellIndex != 0)
		{
			currentEdgeType = this.edgeType.left;
		}
		else if ((rect.right - 5) < this.posiX)
		{
			currentEdgeType = this.edgeType.right;
		}
		else if ((this.posiY - rect.top) < 5 && node.parentNode.rowIndex != 0)
		{
			currentEdgeType = this.edgeType.top;
		}
		else if ((rect.bottom - 5) < this.posiY)
		{
			currentEdgeType = this.edgeType.bottom;
		}

		return currentEdgeType;
	};

	proto.moveCalcResizeCol = function ()
	{
		if (this.isDragging)
		{
			var distX = parseInt(this.posiX - RichTextEditor.DomUtil.getScrollLeft(this.editorDoc) - this.currentPointX),
				left;

			if (this.currentLeftTD && this.currentRightTD)
			{
				left = this.calcMiddleCol(this.currentLeftTD, distX);
			}

			if (this.currentLeftTD && this.currentRightTD == null)
			{
				left = this.calcLeft(this.currentLeftTD, distX)
			}

			if (this.currentLeftTD == null && this.currentRightTD)
			{
				left = this.calcRight(this.currentRightTD, distX);
			}
			
			if (left)
			{
				RichTextEditor.Util.setStyle(this.currentDragger,
				{
					"left": RichTextEditor.Util.toPx(Math.round(left))
				});
			}
		}
	};

	proto.calcMiddleCol = function (currentLeftTD, distX)
	{
		var bothWidth = this.currentLeftTDWidth + this.currentRightTDWidth,
			movingLeftWidth = this.currentLeftTDWidth + distX,
			movingRightWidth = this.currentRightTDWidth - distX,
			tdRect = RichTextEditor.Util.getCoordsTarget(currentLeftTD),
			left;

		if (movingLeftWidth >= this.minWidth && movingRightWidth >= this.minWidth)
		{
			left = this.posiX + this.editor.offsetLeft - RichTextEditor.DomUtil.getScrollLeft(this.editorDoc);
		}
		else if (movingLeftWidth <= this.minWidth)
		{
			movingLeftWidth = this.minWidth;
			movingRightWidth = bothWidth - movingLeftWidth;
			left = tdRect.left + this.editor.offsetLeft - RichTextEditor.DomUtil.getScrollLeft(this.editorDoc) + movingLeftWidth;
		}
		else if (movingRightWidth <= this.minWidth)
		{
			movingRightWidth = this.minWidth;
			movingLeftWidth = bothWidth - movingRightWidth;
			left = tdRect.left + this.editor.offsetLeft - RichTextEditor.DomUtil.getScrollLeft(this.editorDoc) + movingLeftWidth;
		}

		this.movingX = movingLeftWidth - this.currentLeftTDWidth + this.editor.offsetLeft;
		return left;
	};

	proto.calcLeft = function (currentLeftTD, distX)
	{

		var movingLeftWidth = this.currentLeftTDWidth + distX,
			tdRect = RichTextEditor.Util.getCoordsTarget(currentLeftTD),
			left;

		if (movingLeftWidth < this.minWidth)
		{
			movingLeftWidth = this.minWidth;
		}

		left = tdRect.left + this.editor.offsetLeft - RichTextEditor.DomUtil.getScrollLeft(this.editorDoc) + movingLeftWidth;
		this.movingX = movingLeftWidth - this.currentLeftTDWidth + this.editor.offsetLeft;
		return left;
	};

	proto.calcRight = function (currentRightTD, distX)
	{
		var movingRightWidth = this.currentRightTDWidth - distX,
			tdRect = RichTextEditor.Util.getCoordsTarget(currentRightTD),
			left;

		if (movingRightWidth < this.minWidth)
		{
			movingRightWidth = this.minWidth;
		}

		left = tdRect.left - this.editor.offsetLeft + movingRightWidth;
		this.movingX = this.currentRightTDWidth - movingRightWidth - this.editor.offsetLeft;
		return left;
	};

	proto.moveCalcResizeRow = function ()
	{
		if (this.isDragging)
		{
			var distY = this.posiY - RichTextEditor.DomUtil.getScrollTop(this.editorDoc) - this.currentPointY,
				movingHeight = this.currentTDHeight + parseInt(distY) + this.editor.offsetTop,
				tdRect = RichTextEditor.Util.getCoordsTarget(this.currentTD),
				top = null;

			if (movingHeight < 0)
			{
				movingHeight = 0;
				top = tdRect.top + movingHeight - RichTextEditor.DomUtil.getScrollTop(this.editorDoc);
			}
			else
			{
				top = this.posiY - RichTextEditor.DomUtil.getScrollTop(this.editorDoc);
			}

			if (top)
			{
				RichTextEditor.Util.setStyle(this.currentDragger,
				{
					"top": RichTextEditor.Util.toPx(Math.round(top))
				});
			}
			this.movingY = movingHeight - this.currentTDHeight;
		}
	};

	proto.stopResizeCol = function ()
	{
		this.resizeWidth();
		this.resetDragger();
		this.moveUnDraggingAction();
		
		this._editor.history.saveHistory();
	};

	proto.resizeWidth = function ()
	{
		var i;
		if (this.leftTdArray)
		{
			for (i = 0; i < this.leftTdArray.length; i++)
			{
				this.leftTdArray[i].style.width = this.leftWidthArr[i] + this.movingX;
			}
		}
		if (this.rightTdArray)
		{
			for (i = 0; i < this.rightTdArray.length; i++)
			{
				this.rightTdArray[i].style.width = this.rightWidthArr[i] - this.movingX;
			}
		}
		if (this.leftTdArray && this.rightTdArray == null)
		{
			this.resizeTableWidth();
		}
	};

	proto.resizeTableWidth = function ()
	{
		var movingWidth = 0;
		if (this.currentTableWidth)
		{
			movingWidth = parseInt(this.currentTableWidth) + this.movingX;
			this.currentTable.width = movingWidth;
			this.currentTable.style.width = RichTextEditor.Util.toPx(movingWidth);
		}
	};

	proto.stopResizeRow = function ()
	{
		this.resizeHeight();
		this.resetDragger();
		this.moveUnDraggingAction();
		
		this._editor.history.saveHistory();
	};

	proto.resizeHeight = function ()
	{
		if (this.topTdArray)
		{
			for (var i = 0; i < this.topTdArray.length; i++)
			{
				var height = this.topHeightArr[i] + this.movingY;
				if (height < 0)
				{
					height = 20;
				}
				
				if ( RichTextEditor.Browser == "IE" && RichTextEditor.BrowserVersion < 11 )
				{
					//height -= parseInt(this.topTdArray[i].style.paddingTop, 10) + parseInt(this.topTdArray[i].style.paddingBottom, 10);
				}
				
				this.topTdArray[i].style.height = RichTextEditor.Util.toPx(height);
			}
		}
	};

	proto.setBackgroundColor = function ()
	{
		var pThis = this,
			color = arguments[0];
		
		this.execute(function ()
		{
			var style, tdArr, 
				i, len;
			
			style = {
				"backgroundColor": color
			};
			tdArr = pThis.getTdArr();
			len = tdArr.length;
			for (i = 0; i < len; i += 1)
			{
				RichTextEditor.Util.setStyle(tdArr[i], style);
			}
			pThis.tableSelector.reset();
		});
	};
	
	proto.setVerticalAlign = function ()
	{
		var pThis = this,
			align = arguments[0];
		
		this.execute(function ()
		{
			var style, tdArr, 
				i, len;
			
			style = {
				"verticalAlign": align
			};
			tdArr = pThis.getTdArr();
			len = tdArr.length;
			for (i = 0; i < len; i += 1)
			{
				RichTextEditor.Util.setStyle(tdArr[i], style);
			}
			pThis.tableSelector.reset();
		});
	};	

	proto.isSelectedTd = function ()
	{
		return this.tableSelector.getSelected().isValid();
	};
        
	/**
	 * 선택한 cell 들의 array.
	 */
	proto.getTdArr = function ()
	{
		return this.tableSelector.getSelectedTdArr();
	};

	proto.merge = function ()
	{
		var pThis = this;
		this.execute(function ()
		{
			pThis.tableMerge.merge(pThis.tableSelector);
		}, true);
	};

	proto.resetMerge = function ()
	{
		var pThis = this;
		this.execute(function ()
		{
			pThis.tableMerge.resetMerge(pThis.tableSelector);
		});
	};

	proto.insertRowAbove = function ()
	{
		var pThis = this;
		this.execute(function ()
		{
			pThis.tableInsert.insertRowAbove(pThis.tableSelector);
		});
	};

	proto.insertRowBelow = function ()
	{
		var pThis = this;
		this.execute(function ()
		{
			pThis.tableInsert.insertRowBelow(pThis.tableSelector);
		});
	};

	proto.insertColLeft = function ()
	{
		var pThis = this;
		this.execute(function ()
		{
			pThis.tableInsert.insertColLeft(pThis.tableSelector);
		});
	};

	proto.insertColRight = function ()
	{
		var pThis = this;
		this.execute(function ()
		{
			pThis.tableInsert.insertColRight(pThis.tableSelector);
		});
	};

	proto.deleteRow = function ()
	{
		var pThis = this;
		this.execute(function ()
		{
			pThis.tableDelete.deleteRow(pThis.tableSelector);
		});
	};

	proto.deleteCol = function ()
	{
		var pThis = this;
		this.execute(function ()
		{
			pThis.tableDelete.deleteCol(pThis.tableSelector);
		});
	};

	proto.setBorderColor = function ()
	{
		var color = arguments[0];
		this.borderProperty.color = color;

		if (this.borderProperty.range == 'none')
		{
			this.setNoBorder();
		}
		else
		{
			this.applyBorder();
		}
	};

	proto.setBorderHeight = function ()
	{
		var height = arguments[0];
		this.borderProperty.height = height;

		if (this.borderProperty.range == 'none')
		{
			this.setNoBorder();
		}
		else
		{
			this.applyBorder();
		}
	};

	proto.setBorderType = function (type)
	{
		this.borderProperty.type = type;
	};

	proto.setBorderRange = function ()
	{
		var value = arguments[0].split(","),
			outlineType = value[0],
			type = value[1];

		this.borderProperty.range = outlineType;	
		this.borderProperty.type = type;

		if (outlineType == 'none')
		{
			this.setNoBorder();
		}
		else
		{
			this.applyBorder();
		}
	};

	proto.setNoBorder = function ()
	{
		var pThis = this;
		return this.execute(function ()
		{
			pThis.tableBorder.setTableSelect(pThis.tableSelector);
			pThis.tableBorder.setBorderRange("all");
			pThis.tableBorder.changeBorderColor(pThis.getTdArr(), "");
			pThis.tableBorder.changeBorderHeight(pThis.getTdArr(), "0");
			pThis.tableBorder.changeBorderType(pThis.getTdArr(), "none");
		});
	};

	proto.applyBorder = function ()
	{
		var pThis = this;
		return this.execute(function ()
		{
			pThis.tableBorder.setTableSelect(pThis.tableSelector);
			pThis.tableBorder.setBorderRange(pThis.borderProperty.range);
			pThis.tableBorder.changeBorderColor(pThis.getTdArr(), pThis.borderProperty.color);
			pThis.tableBorder.changeBorderHeight(pThis.getTdArr(), pThis.borderProperty.height);
			pThis.tableBorder.changeBorderType(pThis.getTdArr(), pThis.borderProperty.type);
		});
	};

	proto.execute = function (fn, noCaretSelect)
	{
		if (!noCaretSelect)
		{
			this.selectCellByCaret();
		}

		if (this.isSelectedTd())
		{
			fn();
			this._editor.history.saveHistory();
		}
		else
		{
			alert("테이블을 선택하신 후 사용가능합니다.");
			return false;
		}
	};

	proto.selectCellByCaret = function ()
	{
		var node, td;
		if (this.isSelectedTd() === false)
		{
			node = this.selection.getNode();
			td = RichTextEditor.TableUtil.getClosestByTagNames(["td", "th"], node);
			if (td)
			{
				this.tableSelector.selectByTd(td, td);
			}
		}
	};
	
	proto = null;
	
}	// end - if ( !RichTextEditor.Table ) 

/***************************************************
	RichTextEditor.Table.Border
***************************************************/
if ( !RichTextEditor.Table.Border ) 
{
	RichTextEditor.Table.Border = function()
	{
		this.editor = arguments[0];
		this.config = arguments[1];

		this.editorWin = this.editor.contentWindow;
		this.editorDoc = this.editor.contentDocument || this.editorWin.document;
		this.editorBody = this.editorDoc.body;

		this.borderRange = this.config.borderRange;
		this.borderColor = this.config.borderColor;
		this.tableSelect = null;
		this.selectedBoundary = null;	
	}
	
	var proto = RichTextEditor.Table.Border.prototype;
	
	proto.setBorderRange = function (value)
	{
		this.borderRange = value;
	};
	
	proto.setTableSelect = function (tableSelect)
	{
		this.tableSelect = tableSelect;
		this.selectedBoundary = tableSelect.getSelected();
	};
	
	proto.changeTopBorderStyle = function (tdArr, styleType, value)
	{
		var style = {};
		var boundary = this.selectedBoundary;
		var borderStyle, tdArray;
		var indexer = this.tableSelect.getIndexer();
		var tempBoundary;

		if (boundary.top == 0)
		{
			borderStyle = "borderTop" + styleType;
			tempBoundary = new RichTextEditor.TableUtil.Boundary(
			{
				"top": boundary.top,
				"bottom": boundary.top,
				"left": boundary.left,
				"right": boundary.right
			});
		}
		else
		{
			borderStyle = "borderBottom" + styleType;
			tempBoundary = new RichTextEditor.TableUtil.Boundary(
			{
				"top": boundary.top - 1,
				"bottom": boundary.top - 1,
				"left": boundary.left,
				"right": boundary.right
			});
		}

		tdArray = indexer.getTdArr(tempBoundary);
		style[borderStyle] = value;
		
		for (var i = 0; i < tdArray.length; i++)
		{
			RichTextEditor.Util.setStyle(tdArray[i], style);
		}
	};
	
	proto.changeBottomBorderStyle = function (tdArr, styleType, value)
	{
		var style = {};
		var boundary = this.selectedBoundary;
		var borderStyle, tdArray, tempBoundary;
		var indexer = this.tableSelect.getIndexer();

		borderStyle = "borderBottom" + styleType;
		tempBoundary = new RichTextEditor.TableUtil.Boundary(
		{
			"top": boundary.bottom,
			"bottom": boundary.bottom,
			"left": boundary.left,
			"right": boundary.right
		});

		tdArray = indexer.getTdArr(tempBoundary);
		style[borderStyle] = value;
		
		for (var i = 0; i < tdArray.length; i++)
		{
			RichTextEditor.Util.setStyle(tdArray[i], style);
		}		
	};
	
	proto.changeLeftBorderStyle = function (tdArr, styleType, value)
	{
		var style = {};
		var boundary = this.selectedBoundary;
		var borderStyle, tdArray;
		var indexer = this.tableSelect.getIndexer();
		var tempBoundary;

		if (boundary.left == 0)
		{
			borderStyle = "borderLeft" + styleType;
			tempBoundary = new RichTextEditor.TableUtil.Boundary(
			{
				"top": boundary.top,
				"bottom": boundary.bottom,
				"left": boundary.left,
				"right": boundary.left
			});
		}
		else
		{
			borderStyle = "borderRight" + styleType;
			tempBoundary = new RichTextEditor.TableUtil.Boundary(
			{
				"top": boundary.top,
				"bottom": boundary.bottom,
				"left": boundary.left - 1,
				"right": boundary.left - 1
			});
		}

		tdArray = indexer.getTdArr(tempBoundary);
		style[borderStyle] = value;

		for (var i = 0; i < tdArray.length; i++)
		{
			RichTextEditor.Util.setStyle(tdArray[i], style);
		}
	};
	
	proto.changeRightBorderStyle = function (tdArr, styleType, value)
	{
		var style = {};
		var boundary = this.selectedBoundary;
		var borderStyle, tdArray;
		var indexer = this.tableSelect.getIndexer();
		var tempBoundary;

		borderStyle = "borderRight" + styleType;
		tempBoundary = new RichTextEditor.TableUtil.Boundary(
		{
			"top": boundary.top,
			"bottom": boundary.bottom,
			"left": boundary.right,
			"right": boundary.right
		});

		tdArray = indexer.getTdArr(tempBoundary);
		style[borderStyle] = value;

		for (var i = 0; i < tdArray.length; i++)
		{
			RichTextEditor.Util.setStyle(tdArray[i], style);
		}
	};
	
	proto.changeInBorderStyle = function (tdArr, styleType, value)
	{
		var colStyle = {};
		var rowStyle = {};
		var boundary = this.selectedBoundary;
		var colTdArray, rowTdArray, colBorderStyle, rowBorderStyle;
		var colBoundary, rowBoundary;
		var indexer = this.tableSelect.getIndexer();

		colBorderStyle = "borderBottom" + styleType;
		colBoundary = new RichTextEditor.TableUtil.Boundary(
		{
			"top": boundary.top,
			"bottom": boundary.bottom - 1,
			"left": boundary.left,
			"right": boundary.right
		});
		colTdArray = indexer.getTdArr(colBoundary);
		colStyle[colBorderStyle] = value;

		for (var i = 0; i < colTdArray.length; i++)
		{
			RichTextEditor.Util.setStyle(colTdArray[i], colStyle);
		}

		rowBorderStyle = "borderRight" + styleType;
		rowBoundary = new RichTextEditor.TableUtil.Boundary(
		{
			"top": boundary.top,
			"bottom": boundary.bottom,
			"left": boundary.left,
			"right": boundary.right - 1
		});
		rowTdArray = indexer.getTdArr(rowBoundary);
		rowStyle[rowBorderStyle] = value;

		for (var i = 0; i < rowTdArray.length; i++)
		{
			RichTextEditor.Util.setStyle(rowTdArray[i], rowStyle);
		}
	};
	
	proto.changeOutBorderStyle = function (tdArr, styleType, value)
	{
		this.changeTopBorderStyle(tdArr, styleType, value);
		this.changeBottomBorderStyle(tdArr, styleType, value);
		this.changeLeftBorderStyle(tdArr, styleType, value);
		this.changeRightBorderStyle(tdArr, styleType, value);
	};
	
	proto.changeBorderStyle = function (tdArr, styleType, value)
	{
		var borderRange = this.borderRange;
		switch (borderRange)
		{
		case "top":
			this.changeTopBorderStyle(tdArr, styleType, value);
			break;
		case "bottom":
			this.changeBottomBorderStyle(tdArr, styleType, value);
			break;
		case "left":
			this.changeLeftBorderStyle(tdArr, styleType, value);
			break;
		case "right":
			this.changeRightBorderStyle(tdArr, styleType, value);
			break;
		case "in":
			this.changeInBorderStyle(tdArr, styleType, value);
			break;
		case "out":
			this.changeOutBorderStyle(tdArr, styleType, value);
			break;
		case "all":
			this.changeInBorderStyle(tdArr, styleType, value);
			this.changeOutBorderStyle(tdArr, styleType, value);
			break;
		case "none":
			this.changeInBorderStyle(tdArr, styleType, value);
			this.changeOutBorderStyle(tdArr, styleType, value);
			break;
		default:
			break;
		}
	};
	
	proto.changeBorderColor = function (tdArr, value)
	{
		if (value != null)
		{
			this.borderColor = value;
		}		
		this.changeBorderStyle(tdArr, "Color", this.borderColor);
	};
	
	proto.changeBorderType = function (tdArr, value)
	{
		this.changeBorderStyle(tdArr, "Style", value);
		this.changeBorderColor(tdArr);
	};
	
	proto.changeBorderHeight = function (tdArr, value)
	{
		var width = RichTextEditor.Util.toPx(value);
		this.changeBorderStyle(tdArr, "Width", width);
		this.changeBorderColor(tdArr);
	};
	
	proto = null;
	
}	// end - if ( !RichTextEditor.Table.Border ) 

/***************************************************
	RichTextEditor.Table.Delete
***************************************************/
if ( !RichTextEditor.Table.Delete ) 
{
	RichTextEditor.Table.Delete = function()
	{
		this.editor = arguments[0];
		this.config = arguments[1];

		this.editorWin = this.editor.contentWindow;
		this.editorDoc = this.editor.contentDocument || this.editorWin.document;
		this.editorBody = this.editorDoc.body;
	}
	
	var proto = RichTextEditor.Table.Delete.prototype;
	
	proto.deleteRow = function (tableSelector)
	{
		var boundary;
		boundary = tableSelector.getSelected();

		if (boundary.isValid())
		{
			this.deleteRowOneByOne(tableSelector);
			tableSelector.reset();
			this.deleteEmptyTableByTableSelector(tableSelector);
		}
	};
	
	proto.deleteRowOneByOne = function (tableSelector)
	{
		var deleteStartIndex, count, boundary, indexer;

		boundary = tableSelector.getSelected();
		deleteStartIndex = boundary.top;
		count = boundary.bottom - boundary.top + 1;

		while (0 < count)
		{
			tableSelector.reloadIndexer();
			indexer = tableSelector.getIndexer();
			this.deleteRowByIndex(indexer, deleteStartIndex);
			count -= 1;
		}
		if (deleteStartIndex === 0)
		{
			this.drawTopBorder(tableSelector);
		}

		// 행 삭제후 포커스를 잃어버리는 경우 발생
		if (RichTextEditor.Browser == "IE")
		{
			window.focus();
		}
	};
	
	proto.drawTopBorder = function (tableSelector)
	{
		var indexer, tdArr, len, i, td;

		tableSelector.reloadIndexer();
		indexer = tableSelector.getIndexer();
		tdArr = indexer.getTdArrHasTop(0);
		len = tdArr.length;

		for (i = 0; i < len; i += 1)
		{
			td = tdArr[i];
			if (td.style.borderTop === "" && td.style.borderBottom !== "")
			{
				td.style.borderTop = td.style.borderBottom;
			}
		}
	};
	
	proto.deleteRowByIndex = function (indexer, index)
	{
		var tdArr, hasTopTdArr, len, tr;

		tdArr = this.getTdArrByRowIndex(indexer, index);
		hasTopTdArr = this.getTdArrByHasTop(indexer, index);
		len = tdArr.length;

		if (0 < len)
		{
			tr = RichTextEditor.DomUtil.parent(tdArr[0]);
			this.deleteTdInDeleteRow(tdArr, hasTopTdArr, tr, indexer);
			RichTextEditor.DomUtil.remove(tr);
		}
	};
	
	proto.getTdArrByRowIndex = function (indexer, index)
	{
		return indexer.getTdArr(new RichTextEditor.TableUtil.Boundary(
		{
			top: index,
			right: indexer.getColSize() - 1,
			bottom: index,
			left: 0
		}));
	};
	
	proto.getTdArrByHasTop = function (indexer, index)
	{
		return indexer.getTdArrHasTop(index);
	};
	
	proto.deleteTdInDeleteRow = function (tdArr, hasTopTdArr, tr, indexer)
	{
		var len, i, td;
		len = tdArr.length;

		for (i = 0; i < len; i += 1)
		{
			td = tdArr[i];

			if (1 < td.rowSpan)
			{
				td.rowSpan -= 1;
				this.reduceHeightAsRow(td, tr);
				if (RichTextEditor.Lib.array.contains(hasTopTdArr, td))
				{
					this.shiftRowOfTd(td, indexer);
				}
			}
			else
			{
				RichTextEditor.DomUtil.remove(td);
			}
		}
	};
	
	proto.reduceHeightAsRow = function (td, tr)
	{
		var styleHeight, newHeight;

		if (td.style.height)
		{
			styleHeight = parseInt(td.style.height, 10);
			newHeight = styleHeight - tr.offsetHeight;
			if (0 < newHeight)
			{
				RichTextEditor.Util.setStyle(td,
				{
					'height': newHeight + "px"
				});
			}
		}
	};
	
	proto.shiftRowOfTd = function (td, indexer)
	{
		var tr, trForInsert, tdForInsert;

		tr = RichTextEditor.DomUtil.parent(td);
		trForInsert = RichTextEditor.DomUtil.next(tr, "tr");
		tdForInsert = this.getTdForInsert(td, trForInsert, indexer);

		if (tdForInsert)
		{
			RichTextEditor.DomUtil.insertAt(td, tdForInsert);
		}
		else
		{
			RichTextEditor.DomUtil.append(trForInsert, td);
		}
	};
	
	proto.getTdForInsert = function (td, trForInsert, indexer)
	{
		var currentBoundary, colForInsert, cells, len, i, cell, cellBoundary;

		currentBoundary = indexer.getBoundary(td);
		colForInsert = currentBoundary.left;
		cells = trForInsert.cells;
		len = cells.length;

		for (i = 0; i < len; i += 1)
		{
			cell = cells[i];
			cellBoundary = indexer.getBoundary(cell);
			if (colForInsert <= cellBoundary.left)
			{
				return cell;
			}
		}
		return null;
	};
	
	proto.deleteEmptyTableByTableSelector = function (tableSelector)
	{
		var indexer, table,
			rows, cols;

		indexer = tableSelector.getIndexer();
		table = indexer.table;

		rows = indexer.getRowSize();
		cols = indexer.getColSize();

		//if (table.rows.length === 0)	// zoo - 마지막 열삭제시 table 삭제 처리 추가
		if (rows === 0 || cols === 0)
		{
			RichTextEditor.DomUtil.remove(table);
		}
	};
	
	proto.deleteCol = function (tableSelector)
	{
		var boundary;
		boundary = tableSelector.getSelected();

		if (boundary.isValid())
		{
			this.deleteColOneByOne(tableSelector);
			tableSelector.reset();
			this.deleteEmptyTableByTableSelector(tableSelector);
		}
	};
	
	proto.deleteColOneByOne = function (tableSelector)
	{
		var deleteStartIndex, count, boundary, indexer;

		boundary = tableSelector.getSelected();
		deleteStartIndex = boundary.left;
		count = boundary.right - boundary.left + 1;

		while (0 < count)
		{
			tableSelector.reloadIndexer();
			indexer = tableSelector.getIndexer();
			this.deleteColByIndex(indexer, deleteStartIndex);
			count -= 1;
		}
		if (deleteStartIndex === 0)
		{
			this.drawLeftBorder(tableSelector);
		}

		// 행 삭제후 포커스를 잃어버리는 경우 발생
		if (RichTextEditor.Browser == "IE")
		{
			window.focus();
		}
	};
	
	proto.drawLeftBorder = function (tableSelector)
	{
		var indexer, tdArr, len, i, td;

		tableSelector.reloadIndexer();
		indexer = tableSelector.getIndexer();
		tdArr = indexer.getTdArrHasLeft(0);
		len = tdArr.length;

		for (i = 0; i < len; i += 1)
		{
			td = tdArr[i];
			if (td.style.borderLeft === "" && td.style.borderRight !== "")
			{
				td.style.borderLeft = td.style.borderRight;
			}
		}
	};
	
	proto.deleteColByIndex = function (indexer, index)
	{
		var tdArr, len, i, td;

		tdArr = this.getTdArrByColIndex(indexer, index);
		len = tdArr.length;

		for (i = 0; i < len; i += 1)
		{
			td = tdArr[i];
			if (1 < td.colSpan)
			{
				td.colSpan -= 1;
			}
			else
			{
				RichTextEditor.DomUtil.remove(td);
			}
		}
	};
	
	proto.getTdArrByColIndex = function (indexer, index)
	{
		return indexer.getTdArr(new RichTextEditor.TableUtil.Boundary(
		{
			top: 0,
			right: index,
			bottom: indexer.getRowSize() - 1,
			left: index
		}));
	};
	
	proto = null;
	
}	// end - if ( !RichTextEditor.Table.Delete ) 

/***************************************************
	RichTextEditor.Table.Insert
***************************************************/
if ( !RichTextEditor.Table.Insert ) 
{
	RichTextEditor.Table.Insert = function()
	{
		this.editor = arguments[0];
		this.config = arguments[1];

		this.editorWin = this.editor.contentWindow;
		this.editorDoc = this.editor.contentDocument || this.editorWin.document;
		this.editorBody = this.editorDoc.body;

		this.colDirection = {
			left: "left",
			right: "right"
		};
	}
	
	var proto = RichTextEditor.Table.Insert.prototype;
	
	proto.insertRowAbove = function (tableSelector)
	{
		var boundary, indexer;

		tableSelector.reloadIndexer();
		boundary = tableSelector.getSelected();

		if (boundary.isValid())
		{		
			indexer = tableSelector.getIndexer();
			this.insertRowAboveByBoundary(boundary, indexer);
			tableSelector.reset();
		}
	};
	
	proto.insertRowAboveByBoundary = function (boundary, indexer)
	{
		var table, rowCount, insertIndex, tdArrAtBoundaryLine, tdArrForClone;

		table = indexer.table;
		rowCount = boundary.bottom - boundary.top + 1;
		insertIndex = boundary.top;
		
		var b = new RichTextEditor.TableUtil.Boundary(
		{
			top: boundary.top,
			right: indexer.getColSize() - 1,
			bottom: boundary.top,
			left: 0
		});
		
		tdArrAtBoundaryLine = indexer.getTdArr(new RichTextEditor.TableUtil.Boundary(
		{
			top: boundary.top,
			right: indexer.getColSize() - 1,
			bottom: boundary.top,
			left: 0
		}));

		tdArrForClone = indexer.getTdArrHasTop(boundary.top);
		this.addRow(table, rowCount, insertIndex, tdArrAtBoundaryLine, tdArrForClone);
	};
	
	proto.addRow = function (table, rowCount, insertIndex, tdArrAtBoundaryLine, tdArrForClone)
	{
		var fn, i, tr_closure;

		fn = function (td)
		{
			var newTd;
			if (RichTextEditor.Lib.array.contains(tdArrForClone, td))
			{
				newTd = RichTextEditor.TableUtil.cloneNodeForEmptyTd(td);
				RichTextEditor.TableUtil.splitHeightByRowSpan(newTd);
				newTd.rowSpan = 1;
				tr_closure.appendChild(newTd); //tr_closure is closure variable.
			}
			else
			{
				td.rowSpan += 1;
			}
		};

		for (i = 0; i < rowCount; i += 1)
		{
			tr_closure = table.insertRow(insertIndex);
			RichTextEditor.Lib.array.Each(tdArrAtBoundaryLine, fn);
		}
	};
	
	proto.insertRowBelow = function (tableSelector)
	{
		var boundary, indexer;

		tableSelector.reloadIndexer();
		boundary = tableSelector.getSelected();

		if (boundary.isValid())
		{
			indexer = tableSelector.getIndexer();
			this.insertRowBelowByBoundary(boundary, indexer);
			tableSelector.reset();
		}
	};
	
	proto.insertRowBelowByBoundary = function (boundary, indexer)
	{
		var table, rowCount, insertIndex, tdArrAtBoundaryLine, tdArrForClone;

		table = indexer.table;
		rowCount = boundary.bottom - boundary.top + 1;
		insertIndex = boundary.bottom + 1;

		tdArrAtBoundaryLine = indexer.getTdArr(new RichTextEditor.TableUtil.Boundary(
		{
			top: boundary.bottom,
			right: indexer.getColSize() - 1,
			bottom: boundary.bottom,
			left: 0
		}));

		tdArrForClone = indexer.getTdArrHasBottom(boundary.bottom);
		this.addRow(table, rowCount, insertIndex, tdArrAtBoundaryLine, tdArrForClone);
	};
	
	proto.insertColLeft = function (tableSelector)
	{
		var boundary, indexer;

		tableSelector.reloadIndexer();
		boundary = tableSelector.getSelected();

		if (boundary.isValid())
		{
			indexer = tableSelector.getIndexer();
			this.insertColLeftByBoundary(boundary, indexer);
			tableSelector.reset();
		}
	};
	
	proto.insertColLeftByBoundary = function (boundary, indexer)
	{
		var colCount, tdArrAtBoundaryLine, tdArrForClone;
		colCount = boundary.right - boundary.left + 1;

		tdArrAtBoundaryLine = indexer.getTdArr(new RichTextEditor.TableUtil.Boundary(
		{
			top: 0,
			right: boundary.left,
			bottom: indexer.getRowSize() - 1,
			left: boundary.left
		}));

		tdArrForClone = indexer.getTdArrHasLeft(boundary.left);
		this.addCol(colCount, tdArrAtBoundaryLine, tdArrForClone, this.colDirection.left);
	};
	
	proto.addCol = function (colCount, tdArrAtBoundaryLine, tdArrForClone, direction)
	{
		var self, fn, i;
		self = this;

		fn = function (td)
		{
			var newTd;
			if (RichTextEditor.Lib.array.contains(tdArrForClone, td))
			{
				newTd = RichTextEditor.TableUtil.cloneNodeForEmptyTd(td);
				RichTextEditor.TableUtil.splitWidthByColSpan(newTd);
				newTd.colSpan = 1;
				if (direction === self.colDirection.left)
				{
					RichTextEditor.DomUtil.insertAt(newTd, td);
				}
				else
				{
					RichTextEditor.DomUtil.insertNext(newTd, td);
				}
			}
			else
			{
				td.colSpan += 1;
			}
		};

		for (i = 0; i < colCount; i += 1)
		{
			RichTextEditor.Lib.array.Each(tdArrAtBoundaryLine, fn);
		}
	};
	
	proto.insertColRight = function (tableSelector)
	{
		var boundary, indexer;

		tableSelector.reloadIndexer();
		boundary = tableSelector.getSelected();

		if (boundary.isValid())
		{
			indexer = tableSelector.getIndexer();
			this.insertColRightByBoundary(boundary, indexer);
			tableSelector.reset();
		}
	};
	
	proto.insertColRightByBoundary = function (boundary, indexer)
	{
		var colCount, tdArrAtBoundaryLine, tdArrForClone;
		colCount = boundary.right - boundary.left + 1;

		tdArrAtBoundaryLine = indexer.getTdArr(new RichTextEditor.TableUtil.Boundary(
		{
			top: 0,
			right: boundary.right,
			bottom: indexer.getRowSize() - 1,
			left: boundary.right
		}));

		tdArrForClone = indexer.getTdArrHasRight(boundary.right);
		this.addCol(colCount, tdArrAtBoundaryLine, tdArrForClone, this.colDirection.right);
	};
	
	proto = null;
	
}	// end - if ( !RichTextEditor.Table.Insert ) 

/***************************************************
	RichTextEditor.Table.Merge
***************************************************/
if ( !RichTextEditor.Table.Merge ) 
{
	RichTextEditor.Table.Merge = function()
	{
		this.editor = arguments[0];
		this.config = arguments[1];

		this.editorWin = this.editor.contentWindow;
		this.editorDoc = this.editor.contentDocument || this.editorWin.document;
		this.editorBody = this.editorDoc.body;	
	}
	
	var proto = RichTextEditor.Table.Merge.prototype;
	
	proto.merge = function (tableSelector)
	{
		var tdArr, td, selectedSize;

		tableSelector.reloadIndexer();
		tdArr = tableSelector.getSelectedTdArr();

		if (1 < tdArr.length)
		{
			selectedSize = tableSelector.getSizeOfSelected();
			td = tdArr[0];

			this.deleteCellForMerge(tdArr);
			this.extendCellForMerge(td, tableSelector, selectedSize);

			tableSelector.reset();
			tableSelector.selectByTd(td, td);
		}
		else
		{
			alert("두개 이상의 셀을 선택해주세요.");
		}
	};
	
	proto.deleteCellForMerge = function (tdArr)
	{
		var data, trimedData, i, len;

		data = tdArr[0].innerHTML;
		len = tdArr.length;

		for (i = 1; i < len; i += 1)
		{
			trimedData = RichTextEditor.Util.trim(data.replace(/\ufeff/g, ""));
			if (trimedData === "" || trimedData === "&nbsp;")
			{
				data = tdArr[i].innerHTML;
			}
			RichTextEditor.DomUtil.remove(tdArr[i]);
		}
		tdArr[0].innerHTML = data;
	};
	
	proto.extendCellForMerge = function (td, tableSelector, selectedSize)
	{
		var selectedBoundary;

		selectedBoundary = tableSelector.getSelected();
		td.colSpan = selectedBoundary.right - selectedBoundary.left + 1;
		td.rowSpan = selectedBoundary.bottom - selectedBoundary.top + 1;

		if (td.style.width)
		{
			RichTextEditor.DomUtil.setWidth(td, selectedSize.width + "px");
		}
		if (td.style.height)
		{
			RichTextEditor.DomUtil.setHeight(td, selectedSize.height + "px");
		}
	};
	
	proto.resetMerge = function (tableSelector)
	{
		var colResult, rowResult;

		tableSelector.reloadIndexer();
		colResult = this.splitCol(tableSelector);

		tableSelector.reloadIndexer();
		rowResult = this.splitRow(tableSelector);

		if (colResult === false && rowResult === false)
		{
			alert("이미 합쳐진 셀만 분할 가능합니다.");
		}
		else
		{
			tableSelector.reloadIndexer();
		}
	};
	
	proto.splitCol = function (tableSelector)
	{
		var changed, tdArr, td, i, len, splitTdResult;

		changed = false;
		tdArr = tableSelector.getSelectedTdArr();
		len = tdArr.length;

		if (0 < len)
		{
			for (i = 0; i < len; i += 1)
			{
				td = tdArr[i];
				splitTdResult = this.splitTdByColSpan(td);
				changed = changed || splitTdResult;
			}
		}
		return changed;
	};
	
	proto.splitRow = function (tableSelector)
	{
		var changed, tdArr, td, i, len, splitTdResult;

		changed = false;
		tdArr = tableSelector.getSelectedTdArr();
		len = tdArr.length;

		if (0 < len)
		{
			for (i = 0; i < len; i += 1)
			{
				td = tdArr[i];
				splitTdResult = this.splitTdByRowSpan(td);
				changed = changed || splitTdResult;
			}
		}
		return changed;
	};
	
	proto.splitTdByColSpan = function (td)
	{
		var newTdCount, newTd, changed;

		newTdCount = td.colSpan - 1;
		changed = 0 < newTdCount;
		RichTextEditor.TableUtil.splitWidthByColSpan(td);
		td.colSpan = 1;

		while (0 < newTdCount)
		{
			newTd = RichTextEditor.TableUtil.cloneNodeForEmptyTd(td);
			RichTextEditor.DomUtil.insertNext(newTd, td);
			newTdCount -= 1;
		}
		return changed;
	};
	
	proto.splitTdByRowSpan = function (td)
	{
		var changed, newTdCount;

		newTdCount = td.rowSpan - 1;
		changed = 0 < newTdCount;
		RichTextEditor.TableUtil.splitHeightByRowSpan(td);

		while (0 < newTdCount)
		{
			this.splitTdOneByOne(td);
			newTdCount -= 1;
		}
		return changed;
	};
	
	proto.splitTdOneByOne = function (td)
	{
		var trForInsert, tdForInsert, newTd;

		trForInsert = this.getTrForInsert(td);
		tdForInsert = this.getTdForInsert(td, trForInsert);
		newTd = RichTextEditor.TableUtil.cloneNodeForEmptyTd(td);
		newTd.rowSpan = 1;
		td.rowSpan -= 1;

		if (tdForInsert)
		{
			RichTextEditor.DomUtil.insertAt(newTd, tdForInsert);
		}
		else
		{
			RichTextEditor.DomUtil.append(trForInsert, newTd);
		}
	};
	
	proto.getTrForInsert = function (td)
	{
		var i, len, trForInsert;

		trForInsert = RichTextEditor.DomUtil.parent(td);
		len = td.rowSpan - 1;

		for (i = 0; i < len; i += 1)
		{
			trForInsert = RichTextEditor.DomUtil.next(trForInsert, "tr");
		}
		return trForInsert;
	};
	
	proto.getTdForInsert = function (td, trForInsert)
	{
		var tableIndexer, currentBoundary, colForInsert, cells, len, i, cell, cellBoundary;

		tableIndexer = RichTextEditor.TableUtil.getTableIndexerFromTd(td);
		currentBoundary = tableIndexer.getBoundary(td);
		colForInsert = currentBoundary.left;
		cells = trForInsert.cells;
		len = cells.length;

		for (i = 0; i < len; i += 1)
		{
			cell = cells[i];
			cellBoundary = tableIndexer.getBoundary(cell);
			if (colForInsert <= cellBoundary.left)
			{
				return cell;
			}
		}
		return null;
	};
	
	proto = null;
	
}	// end - if ( !RichTextEditor.Table.Merge ) 

/***************************************************
	RichTextEditor.Table.Selector
***************************************************/
if ( !RichTextEditor.Table.Selector ) 
{
	RichTextEditor.Table.Selector = function()
	{
		this.editor = arguments[0];
		this.config = arguments[1];
		this.selection = arguments[2];

		this.editorWin = this.editor.contentWindow;
		this.editorDoc = this.editor.contentDocument || this.editorWin.document;
		this.editorBody = this.editorDoc.body;

		this.selectedClassName = "tx_table_selected_cell";
		this.selectedCssText = "{background:" + this.config.selectedColor + " !important}";

		this.isDragging = false;
		this.currentTable = null;
		this.currentTd = null;
		this.paintedTdArr = [];
		this.startCellBoundary = new RichTextEditor.TableUtil.Boundary();
		this.endCellBoundary = this.startCellBoundary;
		this.selectedBoundary = new RichTextEditor.TableUtil.Boundary();
		this.tableIndexer = null;
		this.createdRange = null;

		this.applyCss();
		this.bindEvents();	
	}
	
	var proto = RichTextEditor.Table.Selector.prototype;
	
	proto.applyCss = function ()
	{
		RichTextEditor.Util.applyCSSText(this.editorDoc, "." + this.selectedClassName + this.selectedCssText);
	};
	
	proto.bindEvents = function ()
	{
		var pThis = this;

		RichTextEditor.Util.addEvent(this.editorDoc, "mousedown", function (evt)
		{
			pThis.onMouseDown(evt);
		});
		RichTextEditor.Util.addEvent(this.editorDoc, "mousemove", function (evt)
		{
			pThis.onMouseMove(evt);
		});		
		RichTextEditor.Util.addEvent(this.editorWin, "mouseup", function (evt)
		{
			pThis.onMouseUp(evt);
		});
		RichTextEditor.Util.addEvent(this.editorBody, "keydown", function (evt)
		{
			if (pThis.isDragging)
			{
				RichTextEditor.Util.stop(evt);
				pThis.reset();
			}
			else
			{
				pThis.onKeyDown(evt);
			}
		});
		RichTextEditor.Util.addEvent(this.editorBody, "keyup", function (evt)
		{
			if (pThis.isDragging)
			{
				RichTextEditor.Util.stop(evt);
				pThis.reset();
			}
		});
	};
	
	proto.onMouseDown = function (evt)
	{
		var ele = RichTextEditor.Util.elementByEvent(evt);
		var td, isTxInfo;
		this.reset();

		td = RichTextEditor.TableUtil.getClosestByTagNames(["td", "th"], ele);

		if (td)
		{
			this.selectStart(td);
			this.turnOnDragging();
		}
	};
	
	proto.onMouseMove = function (evt)
	{
		var ele = RichTextEditor.Util.elementByEvent(evt);
		var td, table, notSelected;
		
		if (this.isDragging)
		{
			td = RichTextEditor.TableUtil.getClosestByTagNames(["td", "th"], ele);
			if (td)
			{
				table = RichTextEditor.TableUtil.getClosestByTagNames(["table"], td);
				if (table === this.currentTable && td !== this.currentTd)
				{
					this.selectEnd(td);
					this.applySelected();
					this.selection.removeSelection();
				}
			}
			else
			{
				notSelected = (this.endCellBoundary === this.startCellBoundary);
				if (this.currentTd && notSelected)
				{
					this.selectEnd(this.currentTd);
					this.applySelected();
					this.selection.removeSelection();
				}
			}
		}
	};
	
	proto.onMouseUp = function (evt)
	{
		if (this.isDragging)
		{
			this.turnOffDragging();
		}
	};
	
	proto.onKeyDown = function (evt)
	{
		var ctrlKey = evt.ctrlKey,
			keyCode = evt.keyCode,
			selectedTdArr, len, i;

		if (ctrlKey === false)
		{
			if (keyCode === 46) // delete key
			{
				selectedTdArr = this.getSelectedTdArr();
				len = selectedTdArr.length;

				for (i = 0; i < len; i += 1)
				{
					RichTextEditor.TableUtil.emptyTd(selectedTdArr[i]);
				}
			}
			this.reset();
		}
	};

	proto.reset = function ()
	{
		this.clearSelected();
		this.resetBoundary();
		this.resetDragging();
		this.reloadIndexer();
	};
	
	proto.clearSelected = function ()
	{
		var tdArr;
		tdArr = RichTextEditor.DomUtil.collectAll(this.editorDoc, "." + this.selectedClassName); // zoo
		this.removeClassName(tdArr);
		this.paintedTdArr = [];
	};
	
	proto.resetBoundary = function ()
	{
		this.startCellBoundary = new RichTextEditor.TableUtil.Boundary();
		this.endCellBoundary = this.startCellBoundary;
		this.selectedBoundary = new RichTextEditor.TableUtil.Boundary();
	};
	
	proto.resetDragging = function ()
	{
		this.isDragging = false;
		this.currentTable = null;
		this.currentTd = null;
	};
	
	proto.reloadIndexer = function ()
	{
		if (this.tableIndexer)
		{
			this.tableIndexer.reload();
		}
	};
	
	proto.selectStart = function (td)
	{
		this.currentTable = RichTextEditor.TableUtil.getClosestByTagNames(["table"], td);
		this.tableIndexer = new RichTextEditor.TableUtil.Indexer(this.currentTable);
		this.startCellBoundary = this.tableIndexer.getBoundary(td);


		this.endCellBoundary = this.startCellBoundary;
		this.currentTd = td;
	};
	
	proto.selectEnd = function (td)
	{
		this.endCellBoundary = this.tableIndexer.getBoundary(td);
		this.currentTd = td;
	};
	
	proto.applySelected = function ()
	{
		this.calculateSelectedBoundary();
		this.extendSelectedBoundary();
		this.paint();
	};
	
	proto.calculateSelectedBoundary = function ()
	{
		this.selectedBoundary = new RichTextEditor.TableUtil.Boundary();
		this.selectedBoundary.merge(this.startCellBoundary);
		this.selectedBoundary.merge(this.endCellBoundary);
	};
	
	proto.extendSelectedBoundary = function ()
	{
		var needExtend;
		needExtend = this.selectedBoundary.isValid();
		while (needExtend)
		{
			needExtend = this.oneTimeExtendBoundary();
		}
	};
	
	proto.oneTimeExtendBoundary = function ()
	{
		var selectedTdArr, i, len, extendedBoundary, wasExtended;
		selectedTdArr = this.tableIndexer.getTdArr(this.selectedBoundary);
		len = selectedTdArr.length;
		for (i = 0; i < len; i += 1)
		{
			extendedBoundary = this.tableIndexer.getBoundary(selectedTdArr[i]);
			wasExtended = this.selectedBoundary.merge(extendedBoundary);
			if (wasExtended)
			{
				return true;
			}
		}
		return false;
	};
	
	proto.paint = function ()
	{
		var tdArrToSelect, tdArrToUnselect;
		tdArrToSelect = this.tableIndexer.getTdArr(this.selectedBoundary);
		tdArrToUnselect = RichTextEditor.Lib.array.difference(this.paintedTdArr, tdArrToSelect);

		this.paintSelected(tdArrToSelect);
		this.eraseSelected(tdArrToUnselect);
	};
	
	proto.paintSelected = function (tdArr)
	{
		var pThis = this;
		this.paintedTdArr = [];
		RichTextEditor.Lib.array.Each(tdArr, function (td)
		{
			RichTextEditor.Util.addClassName(td, pThis.selectedClassName);
			pThis.paintedTdArr.push(td);
		});
	};
	
	proto.eraseSelected = function (tdArr)
	{
		this.removeClassName(tdArr);
		this.paintedTdArr = RichTextEditor.Lib.array.difference(this.paintedTdArr, tdArr);
	};
	
	proto.removeClassName = function (tdArr)
	{
		var pThis = this;
		RichTextEditor.Lib.array.Each(tdArr, function (td)
		{
			var removeAttrResult;
			RichTextEditor.Util.removeClassName(td, pThis.selectedClassName);
			if (td.className === "")
			{
				removeAttrResult = td.removeAttribute("class");
				if (removeAttrResult === false) //for IE6, IE7
				{
					td.removeAttribute("className");
				}
			}
		});
	};
	
	proto.turnOnDragging = function ()
	{
		this.isDragging = true;
	};
	
	proto.turnOffDragging = function ()
	{
		this.isDragging = false;
	};
	
	proto.getSelectedTdArr = function ()
	{
		if (this.selectedBoundary.isValid())
		{
			return this.tableIndexer.getTdArr(this.selectedBoundary);
		}
		return [];
	};
	
	proto.getSizeOfSelected = function ()
	{
		var selectedTdArr, firstTd, lastTd, firstTdPosition, lastTdPosition;
		selectedTdArr = this.getSelectedTdArr();

		if (0 < selectedTdArr.length)
		{
			firstTd = selectedTdArr[0];
			lastTd = selectedTdArr[selectedTdArr.length - 1];
			firstTdPosition = RichTextEditor.DomUtil.getPosition(firstTd);
			lastTdPosition = RichTextEditor.DomUtil.getPosition(lastTd);

			return {
				width: lastTdPosition.x + lastTdPosition.width - firstTdPosition.x,
				height: lastTdPosition.y + lastTdPosition.height - firstTdPosition.y
			};
		}
		return {
			width: 0,
			height: 0
		};
	};
	
	proto.selectByTd = function (startTd, endTd)
	{
		this.selectStart(startTd);
		this.selectEnd(endTd);
		this.applySelected();
	};
	
	proto.getSelected = function ()
	{
		return this.selectedBoundary;
	};
	
	proto.getIndexer = function ()
	{
		return this.tableIndexer;
	};
	
	proto.isDuringSelection = function ()
	{
		return this.isDragging;
	};
	
	proto = null;
	
}	// end - if ( !RichTextEditor.Table.Selector ) 
