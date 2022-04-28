(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("RichTextEditorColorPicker");
            this.set_titletext("Color 선택");
            this.getSetter("classname").set("OColorDialog");
            this.getSetter("inheritanceid").set("");
            this.getSetter("position").set("absolute");
            this.getSetter("style").set("background:transparent;");
            if (Form == this.constructor)
            {
                this._setFormPosition(527,344);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize

            
            // UI Components Initialize
            obj = new Static("Static10","0","0","527","344",null,null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_background("#e4e5e9");
            obj.set_border("1px solid #748ba6");
            this.addChild(obj.name, obj);

            obj = new Static("Static00","17","10","122","15",null,null,null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_text("Basic Color");
            obj.set_color("##34495e");
            obj.set_font("9px Verdana, malgun gothic");
            this.addChild(obj.name, obj);

            obj = new Button("selectColorBoder11","244","212","16","48",null,null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_icon("url(\'imagerc::richtexteditor/btn_clrAdd.png\')");
            obj.set_border("0px none");
            obj.set_background("transparent");
            this.addChild(obj.name, obj);

            obj = new Static("b11","15","26","27","27",null,null,null,null,null,null,this);
            obj.set_taborder("3");
            obj.set_background("url(\'imagerc::richtexteditor/sta_clrBox.png\') #ffffff");
            this.addChild(obj.name, obj);

            obj = new Static("b21","15","53","27","27",null,null,null,null,null,null,this);
            obj.set_taborder("4");
            obj.set_background("url(\'imagerc::richtexteditor/sta_clrBox.png\') #ffffff");
            this.addChild(obj.name, obj);

            obj = new Static("b31","15","80","27","27",null,null,null,null,null,null,this);
            obj.set_taborder("5");
            obj.set_background("url(\'imagerc::richtexteditor/sta_clrBox.png\') #ffffff");
            this.addChild(obj.name, obj);

            obj = new Static("b41","15","107","27","27",null,null,null,null,null,null,this);
            obj.set_taborder("6");
            obj.set_background("url(\'imagerc::richtexteditor/sta_clrBox.png\') #ffffff");
            this.addChild(obj.name, obj);

            obj = new Static("b51","15","134","27","27",null,null,null,null,null,null,this);
            obj.set_taborder("7");
            obj.set_background("url(\'imagerc::richtexteditor/sta_clrBox.png\') #ffffff");
            this.addChild(obj.name, obj);

            obj = new Static("b61","15","161","27","27",null,null,null,null,null,null,this);
            obj.set_taborder("8");
            obj.set_background("url(\'imagerc::richtexteditor/sta_clrBox.png\') #ffffff");
            this.addChild(obj.name, obj);

            obj = new Static("b12","44","26","27","27",null,null,null,null,null,null,this);
            obj.set_taborder("9");
            obj.set_background("url(\'imagerc::richtexteditor/sta_clrBox.png\') #ffffff");
            this.addChild(obj.name, obj);

            obj = new Static("b13","73","26","27","27",null,null,null,null,null,null,this);
            obj.set_taborder("10");
            obj.set_background("url(\'imagerc::richtexteditor/sta_clrBox.png\') #ffffff");
            this.addChild(obj.name, obj);

            obj = new Static("b14","102","26","27","27",null,null,null,null,null,null,this);
            obj.set_taborder("11");
            obj.set_background("url(\'imagerc::richtexteditor/sta_clrBox.png\') #ffffff");
            this.addChild(obj.name, obj);

            obj = new Static("b15","131","26","27","27",null,null,null,null,null,null,this);
            obj.set_taborder("12");
            obj.set_background("url(\'imagerc::richtexteditor/sta_clrBox.png\') #ffffff");
            this.addChild(obj.name, obj);

            obj = new Static("b16","160","26","27","27",null,null,null,null,null,null,this);
            obj.set_taborder("13");
            obj.set_background("url(\'imagerc::richtexteditor/sta_clrBox.png\') #ffffff");
            this.addChild(obj.name, obj);

            obj = new Static("b17","189","26","27","27",null,null,null,null,null,null,this);
            obj.set_taborder("14");
            obj.set_background("url(\'imagerc::richtexteditor/sta_clrBox.png\') #ffffff");
            this.addChild(obj.name, obj);

            obj = new Static("b18","218","26","27","27",null,null,null,null,null,null,this);
            obj.set_taborder("15");
            obj.set_background("url(\'imagerc::richtexteditor/sta_clrBox.png\') #ffffff");
            this.addChild(obj.name, obj);

            obj = new Button("btnCancel","189","308","71","25",null,null,null,null,null,null,this);
            obj.set_taborder("16");
            obj.set_text("Cancel");
            obj.set_cssclass("WF_btn_Pnt");
            obj.set_border("1px solid #748ba6");
            obj.set_borderRadius("3px");
            obj.set_color("#34495e");
            obj.set_font("9px Verdana, malgun gothic");
            this.addChild(obj.name, obj);

            obj = new Button("btnApply","263","308","71","25",null,null,null,null,null,null,this);
            obj.set_taborder("17");
            obj.set_text("OK");
            obj.set_cssclass("WF_btn_Pnt");
            obj.set_border("1px solid #748ba6");
            obj.set_borderRadius("3px");
            obj.set_color("#34495e");
            obj.set_font("9px Verdana, malgun gothic");
            this.addChild(obj.name, obj);

            obj = new Static("b22","44","53","27","27",null,null,null,null,null,null,this);
            obj.set_taborder("18");
            obj.set_background("url(\'imagerc::richtexteditor/sta_clrBox.png\') #ffffff");
            this.addChild(obj.name, obj);

            obj = new Static("b32","44","80","27","27",null,null,null,null,null,null,this);
            obj.set_taborder("19");
            obj.set_background("url(\'imagerc::richtexteditor/sta_clrBox.png\') #ffffff");
            this.addChild(obj.name, obj);

            obj = new Static("b42","44","107","27","27",null,null,null,null,null,null,this);
            obj.set_taborder("20");
            obj.set_background("url(\'imagerc::richtexteditor/sta_clrBox.png\') #ffffff");
            this.addChild(obj.name, obj);

            obj = new Static("b52","44","134","27","27",null,null,null,null,null,null,this);
            obj.set_taborder("21");
            obj.set_background("url(\'imagerc::richtexteditor/sta_clrBox.png\') #ffffff");
            this.addChild(obj.name, obj);

            obj = new Static("b62","44","161","27","27",null,null,null,null,null,null,this);
            obj.set_taborder("22");
            obj.set_background("url(\'imagerc::richtexteditor/sta_clrBox.png\') #ffffff");
            this.addChild(obj.name, obj);

            obj = new Static("b23","73","53","27","27",null,null,null,null,null,null,this);
            obj.set_taborder("23");
            obj.set_background("url(\'imagerc::richtexteditor/sta_clrBox.png\') #ffffff");
            this.addChild(obj.name, obj);

            obj = new Static("b33","73","80","27","27",null,null,null,null,null,null,this);
            obj.set_taborder("24");
            obj.set_background("url(\'imagerc::richtexteditor/sta_clrBox.png\') #ffffff");
            this.addChild(obj.name, obj);

            obj = new Static("b43","73","107","27","27",null,null,null,null,null,null,this);
            obj.set_taborder("25");
            obj.set_background("url(\'imagerc::richtexteditor/sta_clrBox.png\') #ffffff");
            this.addChild(obj.name, obj);

            obj = new Static("b53","73","134","27","27",null,null,null,null,null,null,this);
            obj.set_taborder("26");
            obj.set_background("url(\'imagerc::richtexteditor/sta_clrBox.png\') #ffffff");
            this.addChild(obj.name, obj);

            obj = new Static("b63","73","161","27","27",null,null,null,null,null,null,this);
            obj.set_taborder("27");
            obj.set_background("url(\'imagerc::richtexteditor/sta_clrBox.png\') #ffffff");
            this.addChild(obj.name, obj);

            obj = new Static("b24","102","53","27","27",null,null,null,null,null,null,this);
            obj.set_taborder("28");
            obj.set_background("url(\'imagerc::richtexteditor/sta_clrBox.png\') #ffffff");
            this.addChild(obj.name, obj);

            obj = new Static("b34","102","80","27","27",null,null,null,null,null,null,this);
            obj.set_taborder("29");
            obj.set_background("url(\'imagerc::richtexteditor/sta_clrBox.png\') #ffffff");
            this.addChild(obj.name, obj);

            obj = new Static("b44","102","107","27","27",null,null,null,null,null,null,this);
            obj.set_taborder("30");
            obj.set_background("url(\'imagerc::richtexteditor/sta_clrBox.png\') #ffffff");
            this.addChild(obj.name, obj);

            obj = new Static("b54","102","134","27","27",null,null,null,null,null,null,this);
            obj.set_taborder("31");
            obj.set_background("url(\'imagerc::richtexteditor/sta_clrBox.png\') #ffffff");
            this.addChild(obj.name, obj);

            obj = new Static("b64","102","161","27","27",null,null,null,null,null,null,this);
            obj.set_taborder("32");
            obj.set_background("url(\'imagerc::richtexteditor/sta_clrBox.png\') #ffffff");
            this.addChild(obj.name, obj);

            obj = new Static("b25","131","53","27","27",null,null,null,null,null,null,this);
            obj.set_taborder("33");
            obj.set_background("url(\'imagerc::richtexteditor/sta_clrBox.png\') #ffffff");
            this.addChild(obj.name, obj);

            obj = new Static("b35","131","80","27","27",null,null,null,null,null,null,this);
            obj.set_taborder("34");
            obj.set_background("url(\'imagerc::richtexteditor/sta_clrBox.png\') #ffffff");
            this.addChild(obj.name, obj);

            obj = new Static("b45","131","107","27","27",null,null,null,null,null,null,this);
            obj.set_taborder("35");
            obj.set_background("url(\'imagerc::richtexteditor/sta_clrBox.png\') #ffffff");
            this.addChild(obj.name, obj);

            obj = new Static("b55","131","134","27","27",null,null,null,null,null,null,this);
            obj.set_taborder("36");
            obj.set_background("url(\'imagerc::richtexteditor/sta_clrBox.png\') #ffffff");
            this.addChild(obj.name, obj);

            obj = new Static("b65","131","161","27","27",null,null,null,null,null,null,this);
            obj.set_taborder("37");
            obj.set_background("url(\'imagerc::richtexteditor/sta_clrBox.png\') #ffffff");
            this.addChild(obj.name, obj);

            obj = new Static("b26","160","53","27","27",null,null,null,null,null,null,this);
            obj.set_taborder("38");
            obj.set_background("url(\'imagerc::richtexteditor/sta_clrBox.png\') #ffffff");
            this.addChild(obj.name, obj);

            obj = new Static("b36","160","80","27","27",null,null,null,null,null,null,this);
            obj.set_taborder("39");
            obj.set_background("url(\'imagerc::richtexteditor/sta_clrBox.png\') #ffffff");
            this.addChild(obj.name, obj);

            obj = new Static("b46","160","107","27","27",null,null,null,null,null,null,this);
            obj.set_taborder("40");
            obj.set_background("url(\'imagerc::richtexteditor/sta_clrBox.png\') #ffffff");
            this.addChild(obj.name, obj);

            obj = new Static("b56","160","134","27","27",null,null,null,null,null,null,this);
            obj.set_taborder("41");
            obj.set_background("url(\'imagerc::richtexteditor/sta_clrBox.png\') #ffffff");
            this.addChild(obj.name, obj);

            obj = new Static("b66","160","161","27","27",null,null,null,null,null,null,this);
            obj.set_taborder("42");
            obj.set_background("url(\'imagerc::richtexteditor/sta_clrBox.png\') #ffffff");
            this.addChild(obj.name, obj);

            obj = new Static("b27","189","53","27","27",null,null,null,null,null,null,this);
            obj.set_taborder("43");
            obj.set_background("url(\'imagerc::richtexteditor/sta_clrBox.png\') #ffffff");
            this.addChild(obj.name, obj);

            obj = new Static("b37","189","80","27","27",null,null,null,null,null,null,this);
            obj.set_taborder("44");
            obj.set_background("url(\'imagerc::richtexteditor/sta_clrBox.png\') #ffffff");
            this.addChild(obj.name, obj);

            obj = new Static("b47","189","107","27","27",null,null,null,null,null,null,this);
            obj.set_taborder("45");
            obj.set_background("url(\'imagerc::richtexteditor/sta_clrBox.png\') #ffffff");
            this.addChild(obj.name, obj);

            obj = new Static("b57","189","134","27","27",null,null,null,null,null,null,this);
            obj.set_taborder("46");
            obj.set_background("url(\'imagerc::richtexteditor/sta_clrBox.png\') #ffffff");
            this.addChild(obj.name, obj);

            obj = new Static("b67","189","161","27","27",null,null,null,null,null,null,this);
            obj.set_taborder("47");
            obj.set_background("url(\'imagerc::richtexteditor/sta_clrBox.png\') #ffffff");
            this.addChild(obj.name, obj);

            obj = new Static("b28","218","53","27","27",null,null,null,null,null,null,this);
            obj.set_taborder("48");
            obj.set_background("url(\'imagerc::richtexteditor/sta_clrBox.png\') #ffffff");
            this.addChild(obj.name, obj);

            obj = new Static("b38","218","80","27","27",null,null,null,null,null,null,this);
            obj.set_taborder("49");
            obj.set_background("url(\'imagerc::richtexteditor/sta_clrBox.png\') #ffffff");
            this.addChild(obj.name, obj);

            obj = new Static("b48","218","107","27","27",null,null,null,null,null,null,this);
            obj.set_taborder("50");
            obj.set_background("url(\'imagerc::richtexteditor/sta_clrBox.png\') #ffffff");
            this.addChild(obj.name, obj);

            obj = new Static("b58","218","134","27","27",null,null,null,null,null,null,this);
            obj.set_taborder("51");
            obj.set_background("url(\'imagerc::richtexteditor/sta_clrBox.png\') #ffffff");
            this.addChild(obj.name, obj);

            obj = new Static("b68","218","161","27","27",null,null,null,null,null,null,this);
            obj.set_taborder("52");
            obj.set_background("url(\'imagerc::richtexteditor/sta_clrBox.png\') #ffffff");
            this.addChild(obj.name, obj);

            obj = new ImageViewer("colorImage","260","29","221","172",null,null,null,null,null,null,this);
            obj.set_taborder("53");
            obj.set_tabstop("false");
            obj.set_image("url(\'imagerc::richtexteditor/colorDialog.JPG\')");
            obj.set_stretch("fit");
            this.addChild(obj.name, obj);

            obj = new Static("lightnessBar","492","29","13","171",null,null,null,null,null,null,this);
            obj.set_taborder("54");
            obj.set_background("linear-gradient(white,black)");
            this.addChild(obj.name, obj);

            obj = new Static("previewColor","260","211","72","48",null,null,null,null,null,null,this);
            obj.set_taborder("55");
            obj.set_background("red");
            this.addChild(obj.name, obj);

            obj = new Static("Static03","344","236","32","23",null,null,null,null,null,null,this);
            obj.set_taborder("57");
            obj.set_text("Set");
            obj.set_color("#34495e");
            obj.set_font("9px Verdana, malgun gothic");
            this.addChild(obj.name, obj);

            obj = new Static("Static04","344","261","32","23",null,null,null,null,null,null,this);
            obj.set_taborder("58");
            obj.set_text("Lum");
            obj.set_color("#34495e");
            obj.set_font("9px Verdana, malgun gothic");
            this.addChild(obj.name, obj);

            obj = new Static("Static02","344","211","36","23",null,null,null,null,null,null,this);
            obj.set_taborder("59");
            obj.set_text("Hue");
            obj.set_color("#34495e");
            obj.set_font("9px Verdana, malgun gothic");
            this.addChild(obj.name, obj);

            obj = new Static("Static05","423","236","48","23",null,null,null,null,null,null,this);
            obj.set_taborder("60");
            obj.set_text("Green");
            obj.set_color("#34495e");
            obj.set_font("9px Verdana, malgun gothic");
            this.addChild(obj.name, obj);

            obj = new Static("Static06","423","261","32","23",null,null,null,null,null,null,this);
            obj.set_taborder("61");
            obj.set_text("Blue");
            obj.set_color("#34495e");
            obj.set_font("9px Verdana, malgun gothic");
            this.addChild(obj.name, obj);

            obj = new Static("Static07","423","211","32","23",null,null,null,null,null,null,this);
            obj.set_taborder("62");
            obj.set_text("Red");
            obj.set_color("#34495e");
            obj.set_font("9px Verdana, malgun gothic");
            this.addChild(obj.name, obj);

            obj = new Static("Static08","17","191","168","15",null,null,null,null,null,null,this);
            obj.set_taborder("63");
            obj.set_text("Custom Add Color");
            obj.set_font("9px Verdana, malgun gothic");
            obj.set_color("##34495e");
            this.addChild(obj.name, obj);

            obj = new Static("u0","15","209","27","27",null,null,null,null,null,null,this);
            obj.set_taborder("64");
            obj.set_background("url(\'imagerc::richtexteditor/sta_clrBox.png\') #ffffff");
            this.addChild(obj.name, obj);

            obj = new Static("u2","44","209","27","27",null,null,null,null,null,null,this);
            obj.set_taborder("65");
            obj.set_background("url(\'imagerc::richtexteditor/sta_clrBox.png\') #ffffff");
            this.addChild(obj.name, obj);

            obj = new Static("u4","73","209","27","27",null,null,null,null,null,null,this);
            obj.set_taborder("66");
            obj.set_background("url(\'imagerc::richtexteditor/sta_clrBox.png\') #ffffff");
            this.addChild(obj.name, obj);

            obj = new Static("u6","102","209","27","27",null,null,null,null,null,null,this);
            obj.set_taborder("67");
            obj.set_background("url(\'imagerc::richtexteditor/sta_clrBox.png\') #ffffff");
            this.addChild(obj.name, obj);

            obj = new Static("u8","131","209","27","27",null,null,null,null,null,null,this);
            obj.set_taborder("68");
            obj.set_background("url(\'imagerc::richtexteditor/sta_clrBox.png\') #ffffff");
            this.addChild(obj.name, obj);

            obj = new Static("u10","160","209","27","27",null,null,null,null,null,null,this);
            obj.set_taborder("69");
            obj.set_background("url(\'imagerc::richtexteditor/sta_clrBox.png\') #ffffff");
            this.addChild(obj.name, obj);

            obj = new Static("u12","189","209","27","27",null,null,null,null,null,null,this);
            obj.set_taborder("70");
            obj.set_background("url(\'imagerc::richtexteditor/sta_clrBox.png\') #ffffff");
            this.addChild(obj.name, obj);

            obj = new Static("u14","218","209","27","27",null,null,null,null,null,null,this);
            obj.set_taborder("71");
            obj.set_background("url(\'imagerc::richtexteditor/sta_clrBox.png\') #ffffff");
            this.addChild(obj.name, obj);

            obj = new Static("u1","15","236","27","27",null,null,null,null,null,null,this);
            obj.set_taborder("72");
            obj.set_background("url(\'imagerc::richtexteditor/sta_clrBox.png\') #ffffff");
            this.addChild(obj.name, obj);

            obj = new Static("u3","44","236","27","27",null,null,null,null,null,null,this);
            obj.set_taborder("73");
            obj.set_background("url(\'imagerc::richtexteditor/sta_clrBox.png\') #ffffff");
            this.addChild(obj.name, obj);

            obj = new Static("u5","73","236","27","27",null,null,null,null,null,null,this);
            obj.set_taborder("74");
            obj.set_background("url(\'imagerc::richtexteditor/sta_clrBox.png\') #ffffff");
            this.addChild(obj.name, obj);

            obj = new Static("u7","102","236","27","27",null,null,null,null,null,null,this);
            obj.set_taborder("75");
            obj.set_background("url(\'imagerc::richtexteditor/sta_clrBox.png\') #ffffff");
            this.addChild(obj.name, obj);

            obj = new Static("u9","131","236","27","27",null,null,null,null,null,null,this);
            obj.set_taborder("76");
            obj.set_background("url(\'imagerc::richtexteditor/sta_clrBox.png\') #ffffff");
            this.addChild(obj.name, obj);

            obj = new Static("u11","160","236","27","27",null,null,null,null,null,null,this);
            obj.set_taborder("77");
            obj.set_background("url(\'imagerc::richtexteditor/sta_clrBox.png\') #ffffff");
            this.addChild(obj.name, obj);

            obj = new Static("u13","189","236","27","27",null,null,null,null,null,null,this);
            obj.set_taborder("78");
            obj.set_background("url(\'imagerc::richtexteditor/sta_clrBox.png\') #ffffff");
            this.addChild(obj.name, obj);

            obj = new Static("u15","218","236","27","27",null,null,null,null,null,null,this);
            obj.set_taborder("79");
            obj.set_background("url(\'imagerc::richtexteditor/sta_clrBox.png\') #ffffff");
            this.addChild(obj.name, obj);

            obj = new Button("btnAddUserColor","260","263","72","21",null,null,null,null,null,null,this);
            obj.set_taborder("80");
            obj.set_text("Add");
            obj.set_border("1px solid #748ba6");
            obj.set_color("#34495e");
            obj.set_borderRadius("3px");
            obj.set_font("9px Verdana, malgun gothic");
            this.addChild(obj.name, obj);

            obj = new ImageViewer("selectPointer","267","14","19","19",null,null,null,null,null,null,this);
            obj.getSetter("transparenthittest").set("true");
            obj.set_taborder("82");
            obj.set_tabstop("false");
            obj.set_image("url(\'imagerc::richtexteditor/select.GIF\')");
            obj.set_border("0px none");
            obj.set_background("transparent");
            this.addChild(obj.name, obj);

            obj = new ImageViewer("slider","505","45","9","15",null,null,null,null,null,null,this);
            obj.set_taborder("83");
            obj.set_tabstop("false");
            obj.set_image("url(\'imagerc::richtexteditor/left_arrow.png\')");
            obj.set_background("transparent");
            obj.set_border("0px none");
            this.addChild(obj.name, obj);

            obj = new Static("Static09","0","297","526","1",null,null,null,null,null,null,this);
            obj.set_taborder("84");
            obj.set_cssclass("WF_sta_lineDiv");
            this.addChild(obj.name, obj);

            obj = new Edit("ed_r","465","211","40","23",null,null,null,null,null,null,this);
            obj.set_taborder("85");
            obj.getSetter("ontextchanged").set("onChangeRgbValue");
            obj.set_autoselect("true");
            obj.set_border("1px solid #748ba6");
            obj.set_color("#34495e");
            obj.set_font("9px Verdana, malgun gothic");
            this.addChild(obj.name, obj);

            obj = new Edit("ed_g","465","236","40","23",null,null,null,null,null,null,this);
            obj.set_taborder("86");
            obj.getSetter("ontextchanged").set("onChangeRgbValue");
            obj.set_autoselect("true");
            obj.set_border("1px solid #748ba6");
            obj.set_color("#34495e");
            obj.set_font("9px Verdana, malgun gothic");
            this.addChild(obj.name, obj);

            obj = new Edit("ed_b","465","261","40","23",null,null,null,null,null,null,this);
            obj.set_taborder("87");
            obj.getSetter("ontextchanged").set("onChangeRgbValue");
            obj.set_autoselect("true");
            obj.set_border("1px solid #748ba6");
            obj.set_color("#34495e");
            obj.set_font("9px Verdana, malgun gothic");
            this.addChild(obj.name, obj);

            obj = new Edit("ed_h","374","211","40","23",null,null,null,null,null,null,this);
            obj.set_taborder("88");
            obj.getSetter("ontextchanged").set("onChangeHslValue");
            obj.set_autoselect("true");
            obj.set_border("1px solid #748ba6");
            obj.set_color("#34495e");
            obj.set_font("9px Verdana, malgun gothic");
            this.addChild(obj.name, obj);

            obj = new Edit("ed_s","374","236","40","23",null,null,null,null,null,null,this);
            obj.set_taborder("89");
            obj.getSetter("ontextchanged").set("onChangeHslValue");
            obj.set_autoselect("true");
            obj.set_border("1px solid #748ba6");
            obj.set_color("#34495e");
            obj.set_font("9px Verdana, malgun gothic");
            this.addChild(obj.name, obj);

            obj = new Edit("ed_v","374","261","40","23",null,null,null,null,null,null,this);
            obj.set_taborder("90");
            obj.getSetter("ontextchanged").set("onChangeHslValue");
            obj.set_autoselect("true");
            obj.set_border("1px solid #748ba6");
            obj.set_color("#34495e");
            obj.set_font("9px Verdana, malgun gothic");
            this.addChild(obj.name, obj);

            obj = new Button("selectColorBoder","120","1","27","27",null,null,null,null,null,null,this);
            obj.set_taborder("91");
            obj.set_background("url(\'imagerc::richtexteditor/sta_clrBox_O.png\')");
            obj.set_border("0px solid #999999");
            this.addChild(obj.name, obj);
            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",this._adjust_width,this._adjust_height,this,function(p){});
            this.addLayout(obj.name, obj);
            
            // BindItem Information

            
            // TriggerItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.addIncludeScript("richtexteditor_colorpicker.xfdl","lib::lib_base.xjs");
        this.addIncludeScript("richtexteditor_colorpicker.xfdl","lib::lib_color.xjs");
        this.registerScript("richtexteditor_colorpicker.xfdl", function() {
        this.executeIncludeScript("lib::lib_base.xjs"); /*include "lib::lib_base.xjs"*/;
        this.executeIncludeScript("lib::lib_color.xjs"); /*include "lib::lib_color.xjs"*/;

        /**
         * 기본색상(48개)을 선택할 수 있는 Color Picker.
         * Hue의 범위는 0 ~ 240도.
         */

        this.initColor = '#000000'; //default color

        //HSL과 RGB값을 가진 Color객체
        this.colorValue = {R:0, G:0, B:0, A:255, H:0, S:0, V:0};
        //팝업호출시 전달받은 색상
        this.receiveColor = "#000000";
        //선택한 "사용자 색"관련 컴포넌트
        this.userColorComponent = this.u0;

        //selectPointer 폭
        this.selectPointerWidth;
        //selectPointer 높이
        this.selectPointerHeight;

        //명도선택판 높이
        this.lightnessBarHeight;
        //명도선택판 Top Position
        this.lightnessBarTop;
        //명도선택판 Bottom Position
        this.lightnessBarBottom;

        //slider 높이
        this.sliderHeight;

        this.fixSize = 19;

        //pointer의 상하좌우 이동 가능범위 설정
        this.pointerHalfWidth = parseInt(this.selectPointer.width / 2);
        this.pointerHalfHeight = parseInt(this.selectPointer.height / 2);
        this.paletteLeft = parseInt(this.colorImage.left);
        this.paletteTop  = parseInt(this.colorImage.top);

        this.minLeft   = this.paletteLeft - this.pointerHalfWidth;
        this.minTop    = this.paletteTop  - this.pointerHalfHeight;
        this.minRight  = this.paletteLeft + parseInt(this.colorImage.width)  - this.pointerHalfWidth;
        this.minBottom = this.paletteTop  + parseInt(this.colorImage.height) - this.pointerHalfHeight;

        //slider의 상하이동 가능범위 설정
        this.lightBarTop = parseInt(this.lightnessBar.top);
        this.sliderHalfHeight = parseInt(this.slider.height/2);
        this.allowSliderMinTop = (this.lightBarTop - this.sliderHalfHeight);
        this.allowSliderMaxTop = ((this.lightBarTop + parseInt(this.lightnessBar.height))
                                    - this.sliderHalfHeight);

        this.bDrag = false;
        this.targetComp;
        this.offsetX;
        this.offsetY;

        this.ColorPickerPopup_onload = function(obj, e)
        {
        	this.selectPointerWidth = 20;
        	this.selectPointerHeight = 20;

        	this.lightnessBarHeight = this.lightnessBar.height;
        	this.lightnessBarTop = this.lightnessBar.top;
        	this.lightnessBarBottom = this.lightnessBar.bottom;

        	this.sliderHeight = 10;

        	this.loadColor(this.initColor);


        	// 명도조절 slider dragging 처리 설정
        	var draggingFunc = {
        		'start': this.onPointerDragStart,
        		'dragging': this.onPointerDragging,
        		'end': this.onPointerDragEnd
        	};

        	this.gfnMakeDraggable(this.selectPointer, draggingFunc, this);


        	// 명도조절 slider dragging 처리 설정
        	var draggingFunc2 = {
        		'start': this.onSliderDragStart,
        		'dragging': this.onSliderDragging,
        		'end': this.onSliderDragEnd
        	};

        	this.gfnMakeDraggable(this.slider, draggingFunc2, this);
        }

        this.gfnMakeDraggable = function(comp, draggingFunc, scope)
        {
        	comp.addEventHandler("onlbuttondown", draggingFunc.start, scope);
        	comp.addEventHandler("onlbuttonup", draggingFunc.end, scope);
        	scope.addEventHandler("onmousemove", draggingFunc.dragging, scope);
        }

        /*========================================================================
        	Function Area
        ========================================================================*/

        this.loadColor = function(value)
        {
        	//기본색
        	var basicColors= this.basicColors;
        	var horizontalLen = basicColors[0].length; //8
        	var verticalLen   = basicColors.length; //6
        	var i = j = 0;
        	var row, col, color, currentItem;

        	//전달받은 색상이 "기본 색"일 때 이에 해당하는 컴포넌트(검정색이 default).
        	var matchComponent = this.b61;

        	this.receiveColor = value.toLowerCase();

        	//"기본 색"관련 컴포넌트에 배경색 설정
        	var compList = this.components;

        	for(var i=0; i<verticalLen; i++)
        	{
        		row = i+1;

        		for(var j=0; j<horizontalLen; j++)
        		{
        			col = j+1;
        			color = basicColors[i][j];

        			currentItem = compList["b"+row+col];

        			if( color == this.receiveColor )
        			{
        				matchComponent = currentItem;
        			}

        			color += " url('imagerc::richtexteditor/sta_clrBox.png')";
        			currentItem.set_background(color);

        		}
        	}


        	//"사용자 지정 색" 존재시 배경색 설정
        	var compList = this.components;

        	for( i = 0 ; i < 16 ; i++ )
        	{

        		var userColor = nexacro.getPrivateProfile("u" + i);

        		if(userColor)
        		{
        			var pureUserColor = userColor.substr(0,7);
        			if( pureUserColor == this.receiveColor )
        			{
        				matchComponent = compList["u"+i];
        			}

        			userColor = userColor + " url('imagerc::richtexteditor/sta_clrBox.png')";
        			compList["u"+i].set_background(userColor);

        		}

        	}


         	//색선택 표시용 테두리 설정
         	this.setSelectColorBorder(matchComponent);

         	//colorValue 설정
         	this.setColor(this.receiveColor);

        	this.setValue();

         	this.onChangeRGB();

        	this.setPreview();

         	this.setLightnessBar();
        }

        // drag 가 발생될 때 처리할 루틴을 정의한 함수
        this.onPointerDragStart = function(obj, e)
        {
        	this.bDrag = true;
        	this.targetComp = obj;
        	this.offsetX = e.clientx;
        	this.offsetY = e.clienty;
        }

        // dragging 시 처리할 루틴을 정의한 함수
        this.onPointerDragging = function(obj, e)
        {
        	if(this.bDrag==true)
        	{
        		var targetComp = this.targetComp;
        		var nextX = e.clientx - this.offsetX;
        		var nextY = e.clienty - this.offsetY;

        		//상하좌우이동 가능범위 체크
        		if(nextX <= this.minRight && nextX >= this.minLeft)
        		{
        		   if(nextY <= this.minBottom && nextY >= this.minTop)
        		   {
        				targetComp.move(nextX, nextY);

        				this.onChangeHueSat();
        		   }
        	   }
        	}
        }


        // drag 가 종료될 때 처리할 루틴을 정의한 함수
        this.onPointerDragEnd = function(comp){
        	this.bDrag = false;
        }


        // drag 가 발생될 때 처리할 루틴을 정의한 함수
        this.onSliderDragStart = function(obj, e){
        	this.bDrag = true;
        	this.targetComp = obj;
        	this.offsetX = e.clientx;
        	this.offsetY = e.clienty;
        }


        // dragging 시 처리할 루틴을 정의한 함수
        this.onSliderDragging = function(obj, e)
        {
        	if(this.bDrag==true)
        	{
        		var targetComp = this.targetComp;
        	   var nextY = e.clienty - this.offsetY;

        	   //상하이동 가능범위 체크
        	   if(nextY <= this.allowSliderMaxTop && nextY >= this.allowSliderMinTop)
        	   {
        			var x = targetComp.getOffsetLeft();  //X축 고정

        			targetComp.move(x, nextY);

        			this.onChangeLightnessBar();
        		}
        	}
        }

        // drag 가 종료될 때 처리할 루틴을 정의한 함수
        this.onSliderDragEnd = function(comp)
        {
        	this.bDrag = false;
        }


        /**
         * color를 헥사문자열값으로 반환.
         * @example
         *   getHexColor(); //return "#FF0000"
         */
        this.getHexColor = function()
        {
        	return this.gfnColorRgbToHex(this.colorValue.R, this.colorValue.G, this.colorValue.B);
        }


        this.checkRgbaValue = function(r,g,b,a)
        {
        	var len = arguments.length;

        	if(len < 3) return false;
        	var i = 0,
        	    value;
        	for( ; i < len; i++)
        	{
        		value = arguments[i];
        		if(value < 0 || value > 255) return false;
        	}

        	return true;
        }

        /**
         * this.colorValue 설정
         * @param {string | number} firstValue Color 값 문자열 또는 Red 값 ( 0 ~ 255 ).
         * @param {number=} green Green 값.( 0 ~ 255 )의 입력범위를 가집니다.
         * @param {number=} blue Blue 값.( 0 ~ 255 )의 입력범위를 가집니다.
         * @param {number=} alpha Alpha 값.( 0 ~ 255 ) 의 입력범위를 가집니다.
         * @example
         *   this.setColor("#FF0000");
         *   this.setColor(255,0,0);
         */
        this.setColor = function(firstValue,green,blue,alpha)
        {
        	var color = {r: 0, g: 0, b: 0};
        	color.setColor = function(r,g,b){
        		this.r = r;
        		this.g = g;
        		this.b = b;
        	};

        	var ret;

        	if( typeof(firstValue) == "string" && this.gfnIsEmpty(green))
        	{
        		ret = this.gfnColorHexToRgb(firstValue);

        		if(ret)
        		{
        			color.setColor(ret[0], ret[1], ret[2], ret[3]);
        			ret = true;
        		}
        	}
        	else
        	{
        		if( alpha == null )
        		{
        			color.setColor(firstValue,green,blue);
        			ret = this.checkRgbaValue(firstValue,green,blue);

        		}
        		else
        		{
        			color.setColor(firstValue,green,blue,alpha);
        			ret = this.checkRgbaValue(firstValue,green,blue,alpha);
        		}
        	}

        	if( ret == true )
        	{
        		this.colorValue.R = color.r;
        		this.colorValue.G = color.g;
        		this.colorValue.B = color.b;

        		var hsv = this.gfnCalorRgbToHsl(color.r, color.g, color.b);

        		this.colorValue.H = hsv[0];
        		this.colorValue.S = hsv[1];
        		this.colorValue.V = hsv[2];

        	}
        	else
        	{
        		this.colorValue.R = 255;
        		this.colorValue.G = 255;
        		this.colorValue.B = 255;

        		var hsv = this.gfnCalorRgbToHsl(color.r, color.g, color.b);
        		this.colorValue.H = hsv[0];
        		this.colorValue.S = hsv[1];
        		this.colorValue.V = hsv[2];
        	}


        	return ret;
        }

        /**
         * HSL,RGB표시용 컴포넌트 값설정.
         * colorValue의 값을 사용한다.
         */
        this.setValue = function()
        {
        	this.ed_h.set_value(this.colorValue.H);
        	this.ed_v.set_value(this.colorValue.V);
        	this.ed_s.set_value(this.colorValue.S);

        	this.ed_r.set_value(this.colorValue.R);
        	this.ed_g.set_value(this.colorValue.G);
        	this.ed_b.set_value(this.colorValue.B);
        }


        //RGB와 연관된 컴포넌트의 값을 업데이트합니다.
        this.setRgbValue = function()
        {
        	this.ed_r.set_value( this.colorValue.R );
        	this.ed_g.set_value( this.colorValue.G);
        	this.ed_b.set_value( this.colorValue.B);
        }

        this.setHslValue = function()
        {
        	this.ed_h.set_value( this.colorValue.H);
        	this.ed_v.set_value( this.colorValue.V);
        	this.ed_s.set_value( this.colorValue.S);
        }


        /**
         * 미리보기 컴포넌트의 배경색을 설정합니다.
         */
        this.setPreview = function()
        {
            var hexColor = this.getHexColor();

        	//알파값이 적용되지 않아 제거함.
            var removeAlpha = hexColor.substr(0, hexColor.length);

            this.previewColor.set_background(removeAlpha);

        }


        /**
         * 명도선택판 배경색을 설정합니다.
         */
        this.setLightnessBar = function()
        {
        	var hexColor;

        	if(this.colorValue.V < 1)
        	{
        		var rgb = this.gfnColorHslToRgb(this.colorValue.H,this.colorValue.S, 120);
        		hexColor = this.gfnColorRgbToHex(rgb[0],rgb[1],rgb[2]);
        	}
        	else
        	{
        		hexColor = this.getHexColor();
        	}


        	//알파값이 적용되지 않아 제거함.
            var removeAlpha = hexColor.substr(0, hexColor.length - 2);


        	this.lightnessBar.set_background("linear-gradient(white, "+removeAlpha+",black )");
        }





        /**
         * "기본 색" 및 "사용자 지정 색" 컴포넌트를 대상으로
         * selectColorBoder를 이동시켜 선택된 컴포넌트를 표시한다.
         * @param {component} xComp 테두리가 위치할 컴포넌트 객체.
         */
        this.setSelectColorBorder = function(xComp)
        {
        	this.selectColorBoder.move(xComp.left, xComp.top);
        }

        /**
         * RGB값 변경시 처리함수.
         * SelectPointer와 Slider를 color에 맞게 이동시킨다.
         */
        this.onChangeRGB = function()
        {
        	this.moveSelectPointer();
        	this.moveSlider();
        }


        //명도선택판에서 선택된 명도로
        //관련된 정보를 업데이트합니다.
        this.onChangeLightnessBar = function()
        {
        	var sliderTop = nexacro.toNumber(this.slider.top);
        	var lightnessBarTop = nexacro.toNumber(this.lightnessBar.top);
        	var adjustTop = sliderTop + (this.sliderHeight/2);
        	var topGap  = adjustTop - this.lightnessBarTop;

        	var lightRate = nexacro.round((240 * 1)/174, 2); //명도배율. 1일때
        	var light = 240 - nexacro.round(topGap * lightRate);

        	this.ed_v.set_value(light);

         	var rgb = this.gfnColorHslToRgb(nexacro.toNumber(this.ed_h.value), nexacro.toNumber(this.ed_s.value), light);

        	this.setColor(rgb[0], rgb[1], rgb[2]);
        	this.setPreview();
        	this.setRgbValue();

        }

        //색상,채도,명도 입력시 처리
        this.onChangeHslValue = function(obj)
        {
        	var value = obj.value;
        	if(this.gfnIsEmpty(value)) return;

        	this.setValidate(obj);

        	var h = parseInt(this.ed_h.value);
        	var s = parseInt(this.ed_s.value);
        	var l = parseInt(this.ed_v.value);

        	var rgb = this.gfnColorHslToRgb(h,s,l);
        	this.setColor(rgb[0], rgb[1], rgb[2]);
        	this.setPreview();
        	this.setLightnessBar();

        	this.setRgbValue();
        	this.moveSlider();
        	this.moveSelectPointer();
        }

        //R,G,B 입력시 처리
        this.onChangeRgbValue = function(obj)
        {
        	var value = obj.value;
        	if(this.gfnIsEmpty(value)) return;

        	this.setValidate(obj);

        	var r = parseInt(this.ed_r.value);
        	var g = parseInt(this.ed_g.value);
        	var b = parseInt(this.ed_b.value);

        	this.setColor(r, g, b);
         	this.setPreview();
         	this.setLightnessBar();

         	this.setHslValue();
         	this.moveSlider();
         	this.moveSelectPointer();
        }


        this.setValidate = function(obj)
        {
        	var max_val;

        	if( obj === this.ed_h || obj === this.ed_s || obj === this.ed_v )
        	{
        		max_val = 240;
        	}

        	if( obj === this.ed_r || obj === this.ed_g || obj === this.ed_b )
        	{
        		max_val = 255;
        	}

        	if( obj.value > max_val )
        	{
        		obj.set_value(max_val);
        		obj.setCaretPos(-1); //입력 Caret을 마지막으로 이동
        	}
        }


        //색채선택판에서 선택된 색으로
        //관련된 정보를 업데이트합니다.
        this.onChangeHueSat = function()
        {
        	var pointerLeft = this.selectPointer.left;
        	var pointerTop = this.selectPointer.top;
        	var colorImageLeft = this.colorImage.left;
        	var colorImageTop = this.colorImage.top;

        	var adjustLeft = pointerLeft + (this.selectPointerWidth/2);
        	var adjustTop  = pointerTop  + (this.selectPointerHeight/2);

        	var leftGap = adjustLeft - colorImageLeft;
        	var topGap  = adjustTop - colorImageTop;

        	var hue = sat = 0;
        	var hueRate = nexacro.round((240 * 1)/208, 2); //색상배율. 1일때.
        	var satRate = nexacro.round((240 * 1)/174, 2); //채도배율. 1일때

        	hue = nexacro.round(leftGap * hueRate);
        	sat = 240 - nexacro.round(topGap * satRate);

        	light = nexacro.toNumber(this.ed_v.value);

        	var rgb = this.gfnColorHslToRgb(hue,sat,light);

        	this.ed_h.set_value(hue);
        	this.ed_v.set_value(light);
        	this.ed_s.set_value(sat);
        	this.ed_r.set_value(rgb[0]);
        	this.ed_g.set_value(rgb[1]);
        	this.ed_b.set_value(rgb[2]);

        	this.setColor(rgb[0], rgb[1], rgb[2]);
        	this.setPreview();
        	this.setLightnessBar();

        }



        /**
         * selectPointer 이동.
         * left position은 색상(hue)과 연동.
         * top position은 채도(saturation)와 연동.
         */
        this.moveSelectPointer = function()
        {
        	//var left = top = 0;	// IE8 디버그 모드에서 비정상 작동
        	var left = 0,
        		top = 0;
        	var hue = this.colorValue.H;
        	var sat = this.colorValue.S;

        	if(hue < 1)
        	{
        		left = nexacro.toNumber(this.colorImage.left);

        	}
        	else if(hue <= 240 )
        	{
        		var rate = nexacro.round((208 * 1)/240, 2); //색상이 1일 때 배율.
        		left = nexacro.round(rate * hue);
        		left += nexacro.toNumber(this.colorImage.left);
        		left -= (this.selectPointerWidth/2);
        	}
        	else
        	{
        		left = nexacro.toNumber(this.colorImage.left) + nexacro.toNumber(this.colorImage.width);
        		left -= (this.selectPointerWidth/2);
        	}

        	if(sat < 1)
        	{
        		top = nexacro.toNumber(this.colorImage.top) + nexacro.toNumber(this.colorImage.height);
        		top -= ((this.selectPointerWidth/2)+3);
        	}
        	else if(sat <= 240 )
        	{

        		var rate = nexacro.round((174 * 1)/240, 2); //채도가 1일 때 배율.
        		top = nexacro.round(rate * sat);


        		top = nexacro.toNumber(this.colorImage.top) + nexacro.toNumber(this.colorImage.height) - top;
        		top -= ((this.selectPointerWidth/2) -3) ;

        	}
        	else
        	{
        		top = nexacro.toNumber(this.colorImage.top);
        		top -= (this.selectPointerWidth/2);
        	}


        	this.selectPointer.move(left, top);

        }


        /**
         * slider 이동.
         * top position은 명도와 연동.
         */
        this.moveSlider = function()
        {
        	var left, top;
        	var lightness = this.colorValue.V;

        	left = nexacro.toNumber(this.slider.left);
        	var lightBar = this.lightnessBar;

        	if(lightness < 1)
        	{
        		top = nexacro.toNumber(lightBar.top) + nexacro.toNumber(lightBar.height) - (this.sliderHeight/2);
        	}
        	else if(lightness <= 240)
        	{
        		var rate = nexacro.round((174 * 1)/240, 2); //명도가 1일때 배율.
        		top = nexacro.round(rate * lightness);
        		top = nexacro.toNumber(lightBar.top) + nexacro.toNumber(lightBar.height) - top;
        		top -= (this.sliderHeight/2);
        	}
        	else
        	{
        		top = nexacro.toNumber(lightBar.top) + (this.sliderHeight/2);
        	}

        	top -=2;
        	this.slider.move(left, top);
        }


        //기본색 클릭시 이벤트 처리
        this.basicColor_onclick = function(obj,  e)
        {
        	this.setSelectColorBorder(obj);
        	this.setColor(obj._background.color.value);
        	this.setValue();
        	this.onChangeRGB();

        	this.setPreview();
        	this.setLightnessBar();
        }

        this.btnApply_onclick = function(obj,  e)
        {
        	var selcolor = this.previewColor._background.color.value.toString().substr(0,7);

        	this.parent.parent.setColor(selcolor);
        }

        this.btnCancel_onclick = function(obj,  e)
        {
        	this.parent.hideDiv();
        }


        //색채선택판 마우스클릭 이벤트
        this.colorImage_onclick = function(obj,  e)
        {
        	this.selectPointer.move(nexacro.toNumber(obj.left) + e.clientx - nexacro.round(nexacro.toNumber(this.fixSize)/2)
        	                         , nexacro.toNumber(obj.top) + e.clienty - nexacro.round(nexacro.toNumber(this.fixSize)/2));

        	this.onChangeHueSat();
        }

        //명도선택판 마우스클릭 이벤트
        this.lightnessBar_onclick = function(obj,  e)
        {
        	this.slider.move(nexacro.toNumber(this.slider.left)
        	                   , nexacro.toNumber(obj.top) + e.clienty - nexacro.round(15/2));

        	this.onChangeLightnessBar();
        }


        this.btnAddUserColor_onclick = function(obj,  e)
        {
        	var bg = this.previewColor.background;
        	bg = String(bg).toLowerCase();
        	bg = bg + " url('imagerc::richtexteditor/sta_clrBox.png')";

        	var currentUc = this.userColorComponent;
        	var componentName = currentUc.name;
        	currentUc.set_background(bg);

        	var id = parseInt(componentName.substr(1))+1;
        	id = (id%16);

        	nexacro.setPrivateProfile(componentName, bg);

        	this.userColorComponent = this.components["u"+((parseInt(componentName.substr(1))+1)%16)];

        }

        //"사용자 지정 색" 클릭시 이벤트 처리
        this.userColor_onclick = function(obj,  e)
        {
        	this.userColorComponent = obj;

        	this.setSelectColorBorder(obj);

        	this.setColor(obj._background.color.value);

        	this.setValue();
         	this.setPreview();
         	this.setLightnessBar();

         	//selectPointer 이동
         	this.moveSelectPointer();
        }
        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onmousemove",this.ColorPickerPopup_onmousemove,this);
            this.addEventHandler("onload",this.ColorPickerPopup_onload,this);
            this.b11.addEventHandler("onclick",this.basicColor_onclick,this);
            this.b21.addEventHandler("onclick",this.basicColor_onclick,this);
            this.b31.addEventHandler("onclick",this.basicColor_onclick,this);
            this.b41.addEventHandler("onclick",this.basicColor_onclick,this);
            this.b51.addEventHandler("onclick",this.basicColor_onclick,this);
            this.b61.addEventHandler("onclick",this.basicColor_onclick,this);
            this.b12.addEventHandler("onclick",this.basicColor_onclick,this);
            this.b13.addEventHandler("onclick",this.basicColor_onclick,this);
            this.b14.addEventHandler("onclick",this.basicColor_onclick,this);
            this.b15.addEventHandler("onclick",this.basicColor_onclick,this);
            this.b16.addEventHandler("onclick",this.basicColor_onclick,this);
            this.b17.addEventHandler("onclick",this.basicColor_onclick,this);
            this.b18.addEventHandler("onclick",this.basicColor_onclick,this);
            this.btnCancel.addEventHandler("onclick",this.btnCancel_onclick,this);
            this.btnApply.addEventHandler("onclick",this.btnApply_onclick,this);
            this.b22.addEventHandler("onclick",this.basicColor_onclick,this);
            this.b32.addEventHandler("onclick",this.basicColor_onclick,this);
            this.b42.addEventHandler("onclick",this.basicColor_onclick,this);
            this.b52.addEventHandler("onclick",this.basicColor_onclick,this);
            this.b62.addEventHandler("onclick",this.basicColor_onclick,this);
            this.b23.addEventHandler("onclick",this.basicColor_onclick,this);
            this.b33.addEventHandler("onclick",this.basicColor_onclick,this);
            this.b43.addEventHandler("onclick",this.basicColor_onclick,this);
            this.b53.addEventHandler("onclick",this.basicColor_onclick,this);
            this.b63.addEventHandler("onclick",this.basicColor_onclick,this);
            this.b24.addEventHandler("onclick",this.basicColor_onclick,this);
            this.b34.addEventHandler("onclick",this.basicColor_onclick,this);
            this.b44.addEventHandler("onclick",this.basicColor_onclick,this);
            this.b54.addEventHandler("onclick",this.basicColor_onclick,this);
            this.b64.addEventHandler("onclick",this.basicColor_onclick,this);
            this.b25.addEventHandler("onclick",this.basicColor_onclick,this);
            this.b35.addEventHandler("onclick",this.basicColor_onclick,this);
            this.b45.addEventHandler("onclick",this.basicColor_onclick,this);
            this.b55.addEventHandler("onclick",this.basicColor_onclick,this);
            this.b65.addEventHandler("onclick",this.basicColor_onclick,this);
            this.b26.addEventHandler("onclick",this.basicColor_onclick,this);
            this.b36.addEventHandler("onclick",this.basicColor_onclick,this);
            this.b46.addEventHandler("onclick",this.basicColor_onclick,this);
            this.b56.addEventHandler("onclick",this.basicColor_onclick,this);
            this.b66.addEventHandler("onclick",this.basicColor_onclick,this);
            this.b27.addEventHandler("onclick",this.basicColor_onclick,this);
            this.b37.addEventHandler("onclick",this.basicColor_onclick,this);
            this.b47.addEventHandler("onclick",this.basicColor_onclick,this);
            this.b57.addEventHandler("onclick",this.basicColor_onclick,this);
            this.b67.addEventHandler("onclick",this.basicColor_onclick,this);
            this.b28.addEventHandler("onclick",this.basicColor_onclick,this);
            this.b38.addEventHandler("onclick",this.basicColor_onclick,this);
            this.b48.addEventHandler("onclick",this.basicColor_onclick,this);
            this.b58.addEventHandler("onclick",this.basicColor_onclick,this);
            this.b68.addEventHandler("onclick",this.basicColor_onclick,this);
            this.colorImage.addEventHandler("onclick",this.colorImage_onclick,this);
            this.colorImage.addEventHandler("ondragmove",this.colorImage_ondragmove,this);
            this.colorImage.addEventHandler("ondrag",this.colorImage_ondrag,this);
            this.lightnessBar.addEventHandler("onclick",this.lightnessBar_onclick,this);
            this.u0.addEventHandler("onclick",this.userColor_onclick,this);
            this.u2.addEventHandler("onclick",this.userColor_onclick,this);
            this.u4.addEventHandler("onclick",this.userColor_onclick,this);
            this.u6.addEventHandler("onclick",this.userColor_onclick,this);
            this.u8.addEventHandler("onclick",this.userColor_onclick,this);
            this.u10.addEventHandler("onclick",this.userColor_onclick,this);
            this.u12.addEventHandler("onclick",this.userColor_onclick,this);
            this.u14.addEventHandler("onclick",this.userColor_onclick,this);
            this.u1.addEventHandler("onclick",this.userColor_onclick,this);
            this.u3.addEventHandler("onclick",this.userColor_onclick,this);
            this.u5.addEventHandler("onclick",this.userColor_onclick,this);
            this.u7.addEventHandler("onclick",this.userColor_onclick,this);
            this.u9.addEventHandler("onclick",this.userColor_onclick,this);
            this.u11.addEventHandler("onclick",this.userColor_onclick,this);
            this.u13.addEventHandler("onclick",this.userColor_onclick,this);
            this.u15.addEventHandler("onclick",this.userColor_onclick,this);
            this.btnAddUserColor.addEventHandler("onclick",this.btnAddUserColor_onclick,this);
            this.slider.addEventHandler("onmousemove",this.slider_onmousemove,this);
            this.slider.addEventHandler("onlbuttonup",this.slider_onlbuttonup,this);
        };
        this.loadIncludeScript("richtexteditor_colorpicker.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
