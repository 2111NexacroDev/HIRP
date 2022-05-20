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

if (nexacro._Browser == "Runtime") {
	if (!nexacro._init_deviceobjs_api) {
		nexacro._init_deviceobjs_api = true;

		nexacro._setIconWidget = function (strWidgetId, strWidgetIconPath) {
			var widgetFrame = nexacro._popupframes.get_item(strWidgetId);
			if (widgetFrame && widgetFrame.widget) {
				if (widgetFrame.titlebar != null) {
					widgetFrame.set_icon(strWidgetIconPath);
				}
				else {
					if (strWidgetIconPath) {
						widgetFrame.set_icon(strWidgetIconPath);
						widgetFrame.on_update_style_icon();

						var val = widgetFrame.icon ? widgetFrame.icon._value : "";
						val = nexacro._getURIValue(val);
						val = nexacro._getImageLocation(val, "");
						var result = nexacro._getImageSize(val, function () {
							var attachedWindow = widgetFrame._getWindow();
							nexacro._setWindowHandleIcon(attachedWindow.handle, val);
						}, this);

						if (result != null) {
							var attachedWindow = widgetFrame._getWindow();
							nexacro._setWindowHandleIcon(attachedWindow.handle, val);
						}
					}
				}
			}
		};

		nexacro._setTopmostWidget = function (strWidgetId, bWidgetTopmost) {
			var widgetFrame = nexacro._popupframes.get_item(strWidgetId);
			if (widgetFrame && widgetFrame.widget) {
				var attachedWindow = widgetFrame._getWindow();
				nexacro.__setWindowHandleTopmost(attachedWindow.handle, bWidgetTopmost);
			}
		};
	}
}
