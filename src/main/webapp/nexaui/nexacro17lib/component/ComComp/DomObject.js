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


if (!nexacro.DomParser) {
	nexacro.DomParseErrorEventInfo = function (obj, id, level, line, column, message, description) {
		this.id = this.eventid = id || "onerror";
		this.fromobject = this.fromreferenceobject = obj;

		this.level = level;
		this.line = line;
		this.column = column;
		this.message = message;
		this.description = description;
	};
	var _pDomParseErrorEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.DomParseErrorEventInfo);
	nexacro.DomParseErrorEventInfo.prototype = _pDomParseErrorEventInfo;

	_pDomParseErrorEventInfo._type_name = "DomParseErrorEventInfo";

	delete _pDomParseErrorEventInfo;

	nexacro.DomParser = function (id, parent) {
		nexacro._EventSinkObject.call(this, id, parent);
	};

	var _pDomParser = nexacro._createPrototype(nexacro._EventSinkObject, nexacro.DomParser);
	nexacro.DomParser.prototype = _pDomParser;

	_pDomParser._type_name = "DomParser";
	_pDomParser._event_list = {
		"onerror" : 1
	};

	_pDomParser.parseFromString = function (strText, strMineType) {
		if (!strMineType || strMineType == "text/xml") {
			var xmlDoc = nexacro._parseXMLDocument(strText);
			if (xmlDoc) {
				var error = nexacro._getParserError(xmlDoc);
				if (error) {
					this.on_fire_onparseerror("error", error.line, error.column, error.message, error.desc);
					return null;
				}
			}

			return xmlDoc;
		}

		return null;
	};

	_pDomParser.on_fire_onparseerror = function (level, line, column, message, description) {
		if (this.onerror && this.onerror._has_handlers) {
			var evt = new nexacro.DomParseErrorEventInfo(this, "onerror", level, line, column, message, description);
			return this.onerror._fireEvent(this, evt);
		}
		return false;
	};

	delete _pDomParser;

	nexacro.XmlSerializer = function (id, parent) {
		this.id = this.name = id;
		this.parent = parent;
	};

	var _pXmlSerializer = nexacro._createPrototype(nexacro.Object, nexacro.XmlSerializer);
	nexacro.XmlSerializer.prototype = _pXmlSerializer;

	_pXmlSerializer.serializeToString = function (xmldoc) {
		return nexacro._documentToXml(xmldoc);
	};

	delete _pXmlSerializer;
}




