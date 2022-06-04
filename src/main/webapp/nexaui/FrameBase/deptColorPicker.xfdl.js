(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("deptColorPicker");
            this.set_titletext("New Form");
            if (Form == this.constructor)
            {
                this._setFormPosition(250,190);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize

            
            // UI Components Initialize
            obj = new Button("btn_submit","40","130","80","30",null,null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_text("저장");
            obj.set_letterSpacing("0px");
            obj.set_cssclass("save");
            this.addChild(obj.name, obj);

            obj = new Button("btn_cancel","130","130","80","30",null,null,null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_text("취소");
            obj.set_letterSpacing("0px");
            obj.set_cssclass("cancel");
            this.addChild(obj.name, obj);

            obj = new Static("st_deptcolor2","40","45","157","30",null,null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_text("부서 색상");
            this.addChild(obj.name, obj);

            obj = new Static("static_dept01","30","10","166","41",null,null,null,null,null,null,this);
            obj.set_taborder("3");
            obj.set_text("색상 선택");
            obj.set_font("normal 500 14pt/normal \"Noto Sans KR\"");
            this.addChild(obj.name, obj);

            obj = new Button("btn_colorchart01","41","79","15","15",null,null,null,null,null,null,this);
            obj.set_taborder("4");
            obj.set_background("#FFD8D8");
            this.addChild(obj.name, obj);

            obj = new Button("btn_colorchart02","55","79","15","15",null,null,null,null,null,null,this);
            obj.set_taborder("5");
            obj.set_background("#FAE0D4");
            this.addChild(obj.name, obj);

            obj = new Button("btn_colorchart03","69","79","15","15",null,null,null,null,null,null,this);
            obj.set_taborder("6");
            obj.set_background("#FAECC5");
            this.addChild(obj.name, obj);

            obj = new Button("btn_colorchart04","83","79","15","15",null,null,null,null,null,null,this);
            obj.set_taborder("7");
            obj.set_background("#FAF4C0");
            this.addChild(obj.name, obj);

            obj = new Button("btn_colorchart05","97","79","15","15",null,null,null,null,null,null,this);
            obj.set_taborder("8");
            obj.set_background("#E4F7BA");
            this.addChild(obj.name, obj);

            obj = new Button("btn_colorchart06","111","79","15","15",null,null,null,null,null,null,this);
            obj.set_taborder("9");
            obj.set_background("#CEFBC9");
            this.addChild(obj.name, obj);

            obj = new Button("btn_colorchart07","125","79","15","15",null,null,null,null,null,null,this);
            obj.set_taborder("10");
            obj.set_background("#D4F4FA");
            this.addChild(obj.name, obj);

            obj = new Button("btn_colorchart08","139","79","15","15",null,null,null,null,null,null,this);
            obj.set_taborder("11");
            obj.set_background("#D9E5FF");
            this.addChild(obj.name, obj);

            obj = new Button("btn_colorchart09","153","79","15","15",null,null,null,null,null,null,this);
            obj.set_taborder("12");
            obj.set_background("#DAD9FF");
            this.addChild(obj.name, obj);

            obj = new Button("btn_colorchart10","167","79","15","15",null,null,null,null,null,null,this);
            obj.set_taborder("13");
            obj.set_background("#E8D9FF");
            this.addChild(obj.name, obj);

            obj = new Button("btn_colorchart11","181","79","15","15",null,null,null,null,null,null,this);
            obj.set_taborder("14");
            obj.set_background("#FFD9FA");
            this.addChild(obj.name, obj);

            obj = new Button("btn_colorchart12","195","79","15","15",null,null,null,null,null,null,this);
            obj.set_taborder("15");
            obj.set_background("#FFD9EC");
            this.addChild(obj.name, obj);

            obj = new Button("btn_colorchart13","41","93","15","15",null,null,null,null,null,null,this);
            obj.set_taborder("16");
            obj.set_background("#FFA7A7");
            this.addChild(obj.name, obj);

            obj = new Button("btn_colorchart14","55","93","15","15",null,null,null,null,null,null,this);
            obj.set_taborder("17");
            obj.set_background("#FFC19E");
            this.addChild(obj.name, obj);

            obj = new Button("btn_colorchart15","69","93","15","15",null,null,null,null,null,null,this);
            obj.set_taborder("18");
            obj.set_background("#FFE08C");
            this.addChild(obj.name, obj);

            obj = new Button("btn_colorchart16","83","93","15","15",null,null,null,null,null,null,this);
            obj.set_taborder("19");
            obj.set_background("#FAED7D");
            this.addChild(obj.name, obj);

            obj = new Button("btn_colorchart17","97","93","15","15",null,null,null,null,null,null,this);
            obj.set_taborder("20");
            obj.set_background("#CEF279");
            this.addChild(obj.name, obj);

            obj = new Button("btn_colorchart18","111","93","15","15",null,null,null,null,null,null,this);
            obj.set_taborder("21");
            obj.set_background("#B7F0B1");
            this.addChild(obj.name, obj);

            obj = new Button("btn_colorchart19","125","93","15","15",null,null,null,null,null,null,this);
            obj.set_taborder("22");
            obj.set_background("#B2EBF4");
            this.addChild(obj.name, obj);

            obj = new Button("btn_colorchart20","139","93","15","15",null,null,null,null,null,null,this);
            obj.set_taborder("23");
            obj.set_background("#B2CCFF");
            this.addChild(obj.name, obj);

            obj = new Button("btn_colorchart21","153","93","15","15",null,null,null,null,null,null,this);
            obj.set_taborder("24");
            obj.set_background("#B5B2FF");
            this.addChild(obj.name, obj);

            obj = new Button("btn_colorchart22","167","93","15","15",null,null,null,null,null,null,this);
            obj.set_taborder("25");
            obj.set_background("#D1B2FF");
            this.addChild(obj.name, obj);

            obj = new Button("btn_colorchart23","181","93","15","15",null,null,null,null,null,null,this);
            obj.set_taborder("26");
            obj.set_background("#FFB2F5");
            this.addChild(obj.name, obj);

            obj = new Button("btn_colorchart24","195","93","15","15",null,null,null,null,null,null,this);
            obj.set_taborder("27");
            obj.set_background("#FFB2D9");
            this.addChild(obj.name, obj);
            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",250,190,this,function(p){});
            this.addLayout(obj.name, obj);
            
            // BindItem Information
            obj = new BindItem("item0","st_deptcolor2","text","ds_dept","deptColor");
            this.addChild(obj.name, obj);
            obj.bind();
            
            // TriggerItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script

        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.btn_submit.addEventHandler("onclick",this.btn_submit_onclick,this);
            this.btn_cancel.addEventHandler("onclick",this.btn_cancel_onclick,this);
            this.static_dept01.addEventHandler("onclick",this.static_dept01_onclick,this);
        };
        this.loadIncludeScript("deptColorPicker.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
