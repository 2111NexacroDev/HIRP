/*
Copyright (C) 2014 by Marijn Haverbeke <marijnh@gmail.com> and others

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

/**
 * Website: http://codemirror.net/
 * CodeMirror 일부 기능 수정 적용
 */
if ( !window.RichTextEditor ) 
{
	window.RichTextEditor = {};
}

if ( !RichTextEditor.Highlight ) 
{
	RichTextEditor.Highlight = function()
	{
		this.editor = arguments[0];
		this.selection = arguments[1];
		this.parser = arguments[2];

		this.editorWin = this.editor.contentWindow;
		this.editorDoc = this.editor.contentDocument || this.editorWin.document;
		this.editorBody = this.editorDoc.body;

		this.stopIteration = {
			toString: function ()
			{
				return "stopIteration"
			}
		};
		this.indentUnit = 2;
		this.syntaxHighlightId = "__eco_pre_syntax_highlight__";

		RichTextEditor.Lib.array.forEach(
			this.parser,
			function (name, index)
			{
				if (name.toUpperCase() == "JAVASCRIPT")
				{
					this.tokenizeJavaScript = RichTextEditor.Highlight.TokenizeJavaScript.init(this);
					this.parserJavascript = RichTextEditor.Highlight.ParseJavaScript.init(this) || {};
					RichTextEditor.Util.addLinkStyle('./css/jscolors.css', this.editorDoc);
				}
				else if (name.toUpperCase() == "JAVA")
				{
					this.tokenizeJava = RichTextEditor.Highlight.TokenizeJava.init(this);
					this.parserJava = RichTextEditor.Highlight.ParseJava.init(this) || {};
					RichTextEditor.Util.addLinkStyle('./css/javacolors.css', this.editorDoc);
				}
				else if (name.toUpperCase() == "XML/HTML")
				{
					this.parserXml = RichTextEditor.Highlight.ParseXml.init(this) || {};
					RichTextEditor.Util.addLinkStyle('./css/xmlcolors.css', this.editorDoc);
				}
			},
			this
		);

		var pThis = this;
		RichTextEditor.Util.addEvent(this.editorBody, "paste", function (evt)
		{
			pThis.onPaste(evt);
		});		
	};	
       
	var proto = RichTextEditor.Highlight.prototype;

	proto.isHighlightAncestor = function (child)
	{
		while (child)
		{
			if (RichTextEditor.DomUtil.isPre(child) && child.id == this.syntaxHighlightId)
			{
				return child;
			}
			child = child.parentNode;
		}
		return null;
	};

	proto.onPaste = function (evt)
	{
		var child = evt.target || evt.srcElement,
			highlight = this.isHighlightAncestor(child),
			parserId, text;

		if (highlight)
		{
			parserId = highlight._editorParserId;
			
			try
			{
				var clipboardData = evt.clipboardData || this.editorWin.clipboardData;
				if (clipboardData)
				{
					text = clipboardData.getData('Text');
				}
			}
			catch (e)
			{}

			if (text !== null)
			{
				this.highlightText(text, parserId);
				RichTextEditor.Util.stop(evt);
			}
		}
	};

	proto.selectionNode = function (range, start)
	{
		range.collapse(start);

		function nodeAfter(node)
		{
			var found = null;
			while (!found && node)
			{
				found = node.nextSibling;
				node = node.parentNode;
			}
			return nodeAtStartOf(found);
		}

		function nodeAtStartOf(node)
		{
			while (node && node.firstChild) node = node.firstChild;
			return {
				node: node,
				offset: 0
			};
		}

		var containing = range.parentElement();
		if (!RichTextEditor.DomUtil.isAncestor(this.editorBody, containing))
		{
			return null;
		}
		if (!containing.firstChild)
		{
			return nodeAtStartOf(containing);
		}

		var working = range.duplicate();
		working.moveToElementText(containing);
		working.collapse(true);

		for (var cur = containing.firstChild; cur; cur = cur.nextSibling)
		{
			if (cur.nodeType == 3)
			{
				var size = cur.nodeValue.length;
				working.move("character", size);
			}
			else
			{
				working.moveToElementText(cur);
				working.collapse(false);
			}

			var dir = range.compareEndPoints("StartToStart", working);
			if (dir == 0)
			{
				return nodeAfter(cur);
			}
			if (dir == 1)
			{
				continue;
			}
			if (cur.nodeType != 3)
			{
				return nodeAtStartOf(cur);
			}

			working.setEndPoint("StartToEnd", range);
			return {
				node: cur,
				offset: size - working.text.length
			};
		}
		return nodeAfter(containing);
	};

	proto.getInnerNode = function (node, offset)
	{
		while (node.nodeType != 3 && !RichTextEditor.DomUtil.isBR(node))
		{
			var newNode = node.childNodes[offset] || node.nextSibling,
				offset = 0;

			while (!newNode && node.parentNode)
			{
				node = node.parentNode;
				newNode = node.nextSibling;
			}

			node = newNode;
			if (!newNode) 
			{
				break;
			}
		}

		return {
			node: node,
			offset: offset
		};
	};

	proto.getSelectionNode = function ()
	{
		var selection = this.selection.getSelection(),
			range,
			startNode,
			endNode,
			curSelection = {};

		if (!selection || selection.rangeCount == 0)
		{
			return curSelection;
		}

		if (this.editorWin.getSelection)
		{
			range = selection.getRangeAt(0);
			startNode = this.getInnerNode(range.startContainer, range.startOffset);
			endNode = this.getInnerNode(range.endContainer, range.endOffset);
		}
		else
		{
			if (selection.createRange)
			{
				range = selection.createRange();
			}
			else
			{
				range = selection.createTextRange();
			}

			startNode = this.selectionNode(range, true);
			endNode = this.selectionNode(range, false);
		}

		if (!startNode || !endNode)
		{
			return;
		}

		return curSelection = {
			start: startNode,
			end: endNode
		};
	};

	proto.__removeHighlight = function ()
	{
		var curSelection = this.getSelectionNode(),
			startNode = curSelection.start.node,
			endNode = curSelection.end.node,
			highlightNode;

		highlightNode = this.isHighlightAncestor(startNode);
		RichTextEditor.DomUtil.remove(highlightNode);

		highlightNode = this.isHighlightAncestor(endNode);
		RichTextEditor.DomUtil.remove(highlightNode);
	};

	proto.highlightText = function (string, parserId)
	{
		if (RichTextEditor.Lib.isEmpty(string))
		{
			return "";
		}

		var editorParser,
			parserId = parserId || "";

		if (parserId.toUpperCase() == "JAVASCRIPT")
		{
			editorParser = this.parserJavascript;
		}
		else if (parserId.toUpperCase() == "JAVA")
		{
			editorParser = this.parserJava;
		}
		else if (parserId.toUpperCase() == "XML/HTML")
		{
			editorParser = this.parserXml;
		}
		else
		{
			editorParser = this.parserJavascript;
		}

		var parser,
			line = [],
			outerHtml = "";

		parser = editorParser.make(this.stringStream(this.normaliseString(string)));
		
		outerHtml = '<pre id="';
		outerHtml += this.syntaxHighlightId;
		outerHtml += '"';
		outerHtml += '>';

		try
		{
			while (true)
			{
				var token = parser.next();
				//console.log(token);
				
				if (token.value == "\n")
				{
					//callback(line);
					//outerHtml += callback(line);

					RichTextEditor.Lib.array.forEach(
						line,
						function (obj, index)
						{
							outerHtml += obj.outerHTML;
						},
						this
					);
					outerHtml += RichTextEditor.EMPTY_PARAGRAPH_HTML;
					line = [];
				}
				else
				{
					var span = RichTextEditor.Util.createEle(this.editorDoc, "span");
					span.className = token.style;
					span.appendChild(this.editorDoc.createTextNode(token.value));

					line.push(span);
				}
			}
		}
		catch (e)
		{
			if (e != this.stopIteration) 
			{
				throw e;
			}
		}

		if (line.length)
		{
			RichTextEditor.Lib.array.forEach(
				line,
				function (obj, index)
				{
					outerHtml += obj.outerHTML;
				},
				this
			);
		}

		outerHtml += '</pre>';
		outerHtml += RichTextEditor.EMPTY_PARAGRAPH_HTML;

		this.pasteHtmlAtCaret(outerHtml, false, parserId);
	};

	proto.pasteHtmlAtCaret = function (html, bSelect, parserId)
	{
		if (RichTextEditor.Lib.isEmpty(html))
		{
			return;
		}

		var selection = this.selection.getSelection(),
			range;

		if (this.editorWin.getSelection)
		{
			if (selection.getRangeAt && selection.rangeCount)
			{
				range = selection.getRangeAt(0);
				range.deleteContents();
				
				var ele = RichTextEditor.Util.createEle(this.editorDoc, "div"),
					fragment = this.editorDoc.createDocumentFragment(),
					node, firstNode, lastNode;

				ele.innerHTML = html;

				var highlightNode = this.isHighlightAncestor(range.commonAncestorContainer)
				if (highlightNode)
				{
					ele.innerHTML = ele.firstElementChild.innerHTML;
					highlightNode._editorParserId = parserId || "javascript";
				}

				while (node = ele.firstChild)
				{
					//console.log(node);
					if (RichTextEditor.DomUtil.isPre(node) && node.id == this.syntaxHighlightId)
					{
						node._editorParserId = parserId || "javascript";
					}

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
					selection.removeAllRanges();
					selection.addRange(range);
					
					if (lastNode.id == this.syntaxHighlightId)
					{
						this.selection.selectControl(lastNode.lastChild, false);
					}
				}
			}
		}
		else
		{
			// zoo - ie8이하 미지원. TODO : 기능 추가 검토
		}
	};
        
	proto.makePartSpan = function (value)
	{
		if (RichTextEditor.Lib.isEmpty(value)) return;
		
		var text = value;
		if (value.nodeType == 3) 
		{
			text = value.nodeValue;
		}
		else 
		{
			value = this.editorDoc.createTextNode(text);
		}
	
		var span = RichTextEditor.Util.createEle(this.editorDoc, "span");
		span.appendChild(value);
		span.currentText = text;
		
		return span;
	};
		
	proto.makePartBr = function (evt)
	{
		var range = this.selection.getRange();
		if (range)
		{
			if (this.editorWin && this.editorWin.getSelection)
			{
				var node, 
					highlightNode,
					ele, 
					fragment;
				
				ele = RichTextEditor.Util.createEle(this.editorDoc, "div");
				fragment = this.editorDoc.createDocumentFragment();
				fragment.appendChild(ele);
				node = fragment.firstChild;
				
				range.deleteContents();
				range.insertNode(fragment);
				
				//console.log(node);
				if (!RichTextEditor.Lib.isEmpty(node))
				{
					highlightNode = this.isHighlightAncestor(node);
					if (!RichTextEditor.Lib.isEmpty(highlightNode))
					{
						if (evt) 
						{
							RichTextEditor.Util.stop(evt);
						}
						
						this.webkitLastLineHack(highlightNode);
						
						range.deleteContents();
						node = RichTextEditor.Util.createEle(this.editorDoc, "br");
						range.insertNode(node);
						
						this.selection.selectControl(node, false);
					}
					else
					{
						range.deleteContents();
					}
				}
				else
				{
					range.deleteContents();
				}
			}
			else	// zoo - Highlight ie8이하 미지원. TODO : 기능 추가 검토
			{
				range.pasteHTML(RichTextEditor.EMPTY_PARAGRAPH_HTML);
				range.collapse(false);
				range.select();
				
				if (evt) 
				{
					RichTextEditor.Util.stop(evt);
				}
			}
		}
	};
		
	proto.webkitLastLineHack = function (container)
	{	
		if (RichTextEditor.BrowserType == "WebKit")
		{
			var last = container.lastElementChild;
			//console.log(last);
			if (!last || !last.hackBR)
			{
				var br = RichTextEditor.Util.createEle(this.editorDoc, "br");
				br.hackBR = true;
				//container.appendChild(br);
				last = RichTextEditor.DomUtil.append(container, br);
			}
			
			return last;
		}
	};

	proto.normaliseString = function (string)
	{
		var tab = "";
		var pThis = this;

		for (var i = 0; i < this.indentUnit; i++) 
		{
			tab += " ";
		}

		string = string.replace(/\t/g, tab).replace(/\u00a0/g, " ").replace(/\r\n?/g, "\n");
		var pos = 0,
			parts = [],
			lines = string.split("\n");
		
		for (var line = 0; line < lines.length; line++)
		{
			if (line != 0) 
			{
				parts.push("\n");
			}
			parts.push(lines[line]);
		}

		return {
			next: function ()
			{
				if (pos < parts.length) 
				{
					return parts[pos++];
				}
				else 
				{
					throw pThis.stopIteration;
				}
			}
		};
	};

	/* String streams are the things fed to parsers (which can feed them
	 * to a tokenizer if they want). They provide peek and next methods
	 * for looking at the current character (next 'consumes' this
	 * character, peek does not), and a get method for retrieving all the
	 * text that was consumed since the last time get was called.
	 *
	 * An easy mistake to make is to let a stopIteration exception finish
	 * the token stream while there are still characters pending in the
	 * string stream (hitting the end of the buffer while parsing a
	 * token). To make it easier to detect such errors, the stringstreams
	 * throw an exception when this happens.
	 */
	// Make a stringstream stream out of an iterator that returns strings.
	// This is applied to the result of traverseDOM (see codemirror.js),
	// and the resulting stream is fed to the parser.
	proto.stringStream = function (source)
	{
		// String that's currently being iterated over.
		var current = "";
		// Position in that string.
		var pos = 0;
		// Accumulator for strings that have been iterated over but not
		// get()-ed yet.
		var accum = "";
		// Make sure there are more characters ready, or throw
		// stopIteration.

		var pThis = this;

		function ensureChars()
		{
			while (pos == current.length)
			{
				accum += current;
				current = ""; // In case source.next() throws
				pos = 0;
				try
				{
					current = source.next();
				}
				catch (e)
				{
					if (e != pThis.stopIteration) 
					{
						throw e;
					}
					else 
					{
						return false;
					}
				}
			}
			return true;
		}

		return {
			// peek: -> character
			// Return the next character in the stream.
			peek: function ()
			{
				if (!ensureChars()) 
				{
					return null;
				}
				return current.charAt(pos);
			},
			// next: -> character
			// Get the next character, throw stopIteration if at end, check
			// for unused content.
			next: function ()
			{
				if (!ensureChars())
				{
					if (accum.length > 0)
					{
						throw "End of stringstream reached without emptying buffer ('" + accum + "').";
					}
					else
					{
						throw pThis.stopIteration;
					}
				}
				return current.charAt(pos++);
			},
			// get(): -> string
			// Return the characters iterated over since the last call to
			// .get().
			get: function ()
			{
				var temp = accum;
				accum = "";
				if (pos > 0)
				{
					temp += current.slice(0, pos);
					current = current.slice(pos);
					pos = 0;
				}
				return temp;
			},
			// Push a string back into the stream.
			push: function (str)
			{
				current = current.slice(0, pos) + str + current.slice(pos);
			},
			lookAhead: function (str, consume, skipSpaces, caseInsensitive)
			{
				function cased(str)
				{
					return caseInsensitive ? str.toLowerCase() : str;
				}
				str = cased(str);
				var found = false;

				var _accum = accum,
					_pos = pos;
				
				if (skipSpaces) 
				{
					this.nextWhileMatches(/[\s\u00a0]/);
				}

				while (true)
				{
					var end = pos + str.length,
						left = current.length - pos;

					if (end <= current.length)
					{
						found = str == cased(current.slice(pos, end));
						pos = end;
						break;
					}
					else if (str.slice(0, left) == cased(current.slice(pos)))
					{
						accum += current;
						current = "";
						try
						{
							current = source.next();
						}
						catch (e)
						{
							if (e != pThis.stopIteration) 
							{
								throw e;
							}
							break;
						}
						pos = 0;
						str = str.slice(left);
					}
					else
					{
						break;
					}
				}

				if (!(found && consume))
				{
					current = accum.slice(_accum.length) + current;
					pos = _pos;
					accum = _accum;
				}

				return found;
			},
			// Wont't match past end of line.
			lookAheadRegex: function (regex, consume)
			{
				if (regex.source.charAt(0) != "^")
				{
					throw new Error("Regexps passed to lookAheadRegex must start with ^");
				}

				// Fetch the rest of the line
				while (current.indexOf("\n", pos) == -1)
				{
					try
					{
						current += source.next();
					}
					catch (e)
					{
						if (e != pThis.stopIteration) 
						{
							throw e;
						}
						break;
					}
				}
				var matched = current.slice(pos).match(regex);
				if (matched && consume) 
				{
					pos += matched[0].length;
				}
				return matched;
			},

			// Utils built on top of the above
			// more: -> boolean
			// Produce true if the stream isn't empty.
			more: function ()
			{
				return this.peek() !== null;
			},
			applies: function (test)
			{
				var next = this.peek();
				return (next !== null && test(next));
			},
			nextWhile: function (test)
			{
				var next;
				while ((next = this.peek()) !== null && test(next))
				{
					this.next();
				}
			},
			matches: function (re)
			{
				var next = this.peek();
				return (next !== null && re.test(next));
			},
			nextWhileMatches: function (re)
			{
				var next;
				while ((next = this.peek()) !== null && re.test(next))
				{
					this.next();
				}
			},
			equals: function (ch)
			{
				return ch === this.peek();
			},
			endOfLine: function ()
			{
				var next = this.peek();
				return next == null || next == "\n";
			}
		};
	};

	// A framework for simple tokenizers. Takes care of newlines and
	// white-space, and of getting the text from the source stream into
	// the token object. A state is a function of two arguments -- a
	// string stream and a setState function. The second can be used to
	// change the tokenizer's state, and can be ignored for stateless
	// tokenizers. This function should advance the stream over a token
	// and return a string or object containing information about the next
	// token, or null to pass and have the (new) state be called to finish
	// the token. When a string is given, it is wrapped in a {style, type}
	// object. In the resulting object, the characters consumed are stored
	// under the content property. Any whitespace following them is also
	// automatically consumed, and added to the value property. (Thus,
	// content is the actual meaningful part of the token, while value
	// contains all the text it spans.)
	proto.tokenizer = function (source, state)
	{
		// Newlines are always a separate token.
		function isWhiteSpace(ch)
		{
			// The messy regexp is because IE's regexp matcher is of the
			// opinion that non-breaking spaces are no whitespace.
			return ch != "\n" && /^[\s\u00a0]*$/.test(ch);
		}

		var pThis = this;
		var tokenizer = {
			state: state,

			take: function (type)
			{
				if (typeof (type) == "string")
				{
					type = {
						style: type,
						type: type
					};
				}

				type.content = (type.content || "") + source.get();
				if (!/\n$/.test(type.content))
				{
					source.nextWhile(isWhiteSpace);
				}
				type.value = type.content + source.get();
				return type;
			},

			next: function ()
			{
				if (!source.more()) 
				{
					throw pThis.stopIteration;
				}

				var type;
				if (source.equals("\n"))
				{
					source.next();
					return this.take("whitespace");
				}

				if (source.applies(isWhiteSpace))
				{
					type = "whitespace";
				}
				else
				{
					while (!type)
					{
						type = this.state(source, function (s)
							{
								tokenizer.state = s;
							}
						);
					}
				}

				return this.take(type);
			}
		};
		return tokenizer;
	};
	
	proto = null;
	
}	// end - if ( !RichTextEditor.Highlight )