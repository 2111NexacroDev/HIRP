/**
 * Daum Editor의 Trex.I.History 일부수정 적용
 */
 
/*
 알려진 문제들
 -
 덜 중요한 문제들
 - layout에 여러 개의 이미지를 한꺼번에 올린 경우에,  saveHistory 하지 않음
 - table resize 를 한 후에 saveHistory 하지 않음 / modified+마우스클릭 조합일 때, saveHistory를 하는 로직으로 인해 saveHistory가 될 수 있는 경우가 있음, but 완벽하지 않음
 - backspace / delete 든 여러 번 눌렀을 때에 한 번만 saveHistory하고 싶다.
 */
 
if ( !RichTextEditor.History ) 
{
	RichTextEditor.__KEY = {
		ENTER: '13',
		DELETE: '46',
		SPACE: '32',
		BACKSPACE: '8',
		TAB: '9',
		PASTE: '86', //+ ctrl
		CUT: '88' //+ ctrl
	},	

	Object.extend = function(destination, source) {
		for (var property in source) {
			destination[property] = source[property];
		}
		return destination;
	};
	
	/**
	 * @fileoverview default history class for redo/undo
	 *
	 * @author iamdanielkim
	 */
	(function(){
		function keepMaxLength(list, maxLength) {
			while (list.length >= maxLength) {
				list.shift();
			}
		}

		var MAX_UNDO_COUNT = 1000;
		var _FALSE = false, _TRUE = true, _NULL = null;

		RichTextEditor.History = function(editor)
		{
			this.maxUndoCount = MAX_UNDO_COUNT;
			this.editor = editor;
			this.undoMementoList = _NULL;
			this.redoMementoList = _NULL;
			this.currentMemento = _NULL;
			this.contentModified = _FALSE;
			
			this.setupHistory();
		}
		
		RichTextEditor.History.prototype = {
		
			setupHistory: function() {
				this.initHistory({ content: RichTextEditor.EMPTY_PARAGRAPH_HTML, scrollTop: 0 });
			},
			canUndo: function() {
				return this.undoMementoList.length > 0;
			},
			canRedo: function() {
				return this.redoMementoList.length > 0;
			},
			setCurrentMemento: function(memento) {
				this.currentMemento = memento;
			},
			undoHandler: function() {
				var self = this;
				self.saveHistoryIfEdited();
				if (!self.canUndo()) {
					return;
				}

				var undoMemento = self.undoMementoList.pop();
				undoMemento.undo();
				self.redoMementoList.push(undoMemento);

				self.setCurrentMemento(undoMemento);
			},
			redoHandler: function() {
				var self = this;
				self.saveHistoryIfEdited();
				if (!self.canRedo()) {
					return;
				}

				var redoMemento = self.redoMementoList.pop();
				redoMemento.redo();
				self.undoMementoList.push(redoMemento);

				self.setCurrentMemento(redoMemento);
			},
			initHistory: function(data) {
				var self = this;
				self.undoMementoList = [];
				self.redoMementoList = [];

				var newMemento = new RichTextEditor.Memento();
				var initialData = Object.extend({ content: RichTextEditor.EMPTY_PARAGRAPH_HTML, scrollTop: 0 }, data);
				newMemento.addUndoData(initialData);
				newMemento.addHandler(self.getTextHandler());
				self.setCurrentMemento(newMemento);
			},
			saveHistory: function(before, after, handler) {				
				var self = this;
				
				var undoMementoList = self.undoMementoList;
				var currentMemento = self.currentMemento;

				self.redoMementoList = [];

				if (arguments.length == 3) {
					currentMemento.addUndoRedData(before, after, handler);
				}
				var textData = self.getTextData();
				currentMemento.addRedoData(textData);
				keepMaxLength(undoMementoList, self.maxUndoCount);
				undoMementoList.push(currentMemento);

				var newMemento = new RichTextEditor.Memento();
				newMemento.addHandler(self.getTextHandler());
				newMemento.addUndoData(textData);
				self.setCurrentMemento(newMemento);

				self.contentModified = _FALSE;
			},
			injectHistory: function(before, after, handler) {				
				if (!this.canUndo()) {
					return;
				}
				var undoMementoList = this.undoMementoList;
				var lastMemento = undoMementoList[undoMementoList.length - 1];
				lastMemento.addUndoRedData(before, after, handler);
			},
			saveHistoryIfEdited: function() {
				if (this.contentModified) {
					this.saveHistory();
				}
			},
			saveHistoryByKeyEvent: function(event) {		
				var key = {
					code: event.keyCode,
					ctrl: event.ctrlKey || (event.keyCode === 17),
					alt: event.altKey || (event.keyCode === 18),
					shift: event.shiftKey || (event.keyCode === 16)
				};

				if (key.code == 229) {                // ignore mouse click in ff.
					return;
				}

				var self = this;
				if (key.code == RichTextEditor.__KEY.ENTER || key.code == RichTextEditor.__KEY.SPACE || key.code == RichTextEditor.__KEY.TAB) {
					self.saveHistoryIfEdited();
				} else if (key.code == RichTextEditor.__KEY.DELETE || key.code == RichTextEditor.__KEY.BACKSPACE) {
					self.saveHistory();
				} else if ((key.code == RichTextEditor.__KEY.PASTE || key.code == RichTextEditor.__KEY.CUT) && key.ctrl) {
					self.saveHistory();
				} else if (((key.code > 32 && key.code < 41) && key.shift) || (key.code == 65 && key.ctrl)) {   // shift + arrow,  home, end,  etc..  / select all
					self.saveHistoryIfEdited();
				} else if (key.ctrl || key.alt || (key.shift && key.code == 16)) {
					// content isn't modified
				} else {
					self.contentModified = _TRUE;
				}
			},
			getTextHandler: function() {
				var editor = this.editor;
				var self = this;
				return function(data) {
					editor.setContent(data.content);

					var DEFAULT_RESRORE_RANGE = {start: 0, end: 0};
					var range = data.range || DEFAULT_RESRORE_RANGE;
					self.restoreRange(range);

					if ( RichTextEditor.Browser == "IE" ) {
						// #FTDUEDTR-1122
						setTimeout(function() {
							RichTextEditor.DomUtil.setScrollTop(editor.editorDoc, data.scrollTop);
						}, 0);
					}
				}
			},
			getTextData:function() {
				return {
					content: this.editor.getContent(),
					scrollTop: RichTextEditor.DomUtil.getScrollTop(this.editor.editorDoc),
					range: this.getRangeData()
				};
			}
		};
		
		if ( RichTextEditor.Browser == "IE" )
		{
			RichTextEditor.History.prototype.getRangeData = function() {
				var doc = this.editor.editorDoc;
				var containerEl = doc.body;
				//refactory 필요.
				try{
					var selectedTextRange = doc.selection.createRange();
				}catch(e){
					return {
						start:0,
						end:0
					}
				}
				var preSelectionTextRange = doc.body.createTextRange();
				preSelectionTextRange.moveToElementText(containerEl);
				try {
					preSelectionTextRange.setEndPoint("EndToStart", selectedTextRange);
					var start = preSelectionTextRange.text.length;

					return {
						start: start,
						end: start + selectedTextRange.text.length
					}
				}catch(e){

				}

				var onepoint = preSelectionTextRange.text.length;
				return {
					start: onepoint,
					end: onepoint
				}
			};
			
			RichTextEditor.History.prototype.restoreRange = function(savedSel) {
				var doc = this.editor.editorDoc;
				var containerEl = doc.body;
				var textRange = doc.body.createTextRange();
				textRange.moveToElementText(containerEl);
				textRange.collapse(true);
				textRange.moveEnd("character", savedSel.end);
				textRange.moveStart("character", savedSel.start);
				textRange.select();
			};
		}
		else
		{
			RichTextEditor.History.prototype.getRangeData = function() {
				var sel = this.editor.selection.getSelection();
				var rangeCount = sel.rangeCount;
				var start, end;

				if (rangeCount) {
					var range = sel.getRangeAt(0);
					var preSelectionRange = range.cloneRange();
					preSelectionRange.selectNodeContents(this.editor.editorBody);
					preSelectionRange.setEnd(range.startContainer, range.startOffset);
					start = preSelectionRange.toString().length;
					end = start + range.toString().length;
				} else {
					start = 0;
					end = 0;
				}

				return {
					start: start,
					end: end
				};
			};
			
			RichTextEditor.History.prototype.restoreRange = function(savedSel){
				var containerEl = this.editor.editorBody;
				var charIndex = 0, range = this.editor.editorDoc.createRange();
				range.setStart(containerEl, 0);
				range.collapse(true);
				var nodeStack = [containerEl], node, foundStart = false, stop = false;

				while (!stop && (node = nodeStack.pop())) {
					if (node.nodeType == 3) {
						var nextCharIndex = charIndex + node.length;
						if (!foundStart && savedSel.start >= charIndex && savedSel.start <= nextCharIndex) {
							range.setStart(node, savedSel.start - charIndex);
							foundStart = true;
						}
						if (foundStart && savedSel.end >= charIndex && savedSel.end <= nextCharIndex) {
							range.setEnd(node, savedSel.end - charIndex);
							stop = true;
						}
						charIndex = nextCharIndex;
					} else {
						var i = node.childNodes.length;
						while (i--) {
							nodeStack.push(node.childNodes[i]);
						}
					}
				}

				var sel = this.editor.selection.getSelection();
				sel.removeAllRanges();
				sel.addRange(range);
			};
		}		
		
		RichTextEditor.Memento = function()
		{
			this.before = {};
			this.after = {};
			this.handlers = [];
		}
		
		RichTextEditor.Memento.prototype = {
		
			addUndoRedData: function(before, after, handler) {
				Object.extend(this.before, before);
				Object.extend(this.after, after);
				this.handlers.push(handler);
			},
			addHandler: function(handler) {
				this.handlers.push(handler);
			},
			addUndoData: function(data) {
				Object.extend(this.before, data);
			},
			addRedoData: function(data) {
				Object.extend(this.after, data);
			},
			undo: function() {
				var self = this;
				RichTextEditor.Lib.array.Each(self.handlers, function(handler) {
					handler(self.before);
				});
			},
			redo: function() {
				var self = this;
				RichTextEditor.Lib.array.Each(self.handlers, function(handler) {
					handler(self.after);
				});				
			}
		};

	})();
}
