(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("emplList");
            this.set_titletext("New Form");
            if (Form == this.constructor)
            {
                this._setFormPosition(1280,720);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize

            
            // UI Components Initialize
            obj = new Div("Div00","0","0","200","100%",null,null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_background("#ffffff");
            obj.set_border("0px none, 1px solid #dddddd, 0px none, 0px none");
            obj.set_font("12px/normal \"Noto Sans KR\"");
            this.addChild(obj.name, obj);

            obj = new Static("Static00","0","0","200","60",null,null,null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_text("사원관리");
            obj.set_padding("16x 24px");
            obj.set_font("bold 22px/normal \"Noto Sans KR\"");
            obj.set_letterSpacing("-1px");
            this.addChild(obj.name, obj);

            obj = new Static("Static00_00","200","0","1080","60",null,null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_text("사원관리");
            obj.set_padding("16px 20px");
            obj.set_font("bold 22px/normal \"Noto Sans KR\"");
            obj.set_letterSpacing("-1px");
            obj.set_border("0px none, 0px none, 1px solid #dddddd");
            this.addChild(obj.name, obj);

            obj = new Static("Static01","200","60","1080","60",null,null,null,null,null,null,this);
            obj.set_taborder("3");
            obj.set_text("재직자 목록");
            obj.set_font("bold 16px/normal \"Noto Sans KR\"");
            obj.set_padding("16px 20px");
            this.addChild(obj.name, obj);

            obj = new Grid("Grid00",null,"121","1080","269","0",null,null,null,null,null,this);
            obj.set_taborder("4");
            obj._setContents("");
            this.addChild(obj.name, obj);

            obj = new Static("Static01_00","200","400","1080","60",null,null,null,null,null,null,this);
            obj.set_taborder("5");
            obj.set_text("퇴사자 목록");
            obj.set_font("bold 16px/normal \"Noto Sans KR\"");
            obj.set_padding("16px 20px");
            this.addChild(obj.name, obj);

            obj = new Grid("Grid00_00",null,null,"1080","260","0","0",null,null,null,null,this);
            obj.set_taborder("6");
            obj._setContents("");
            this.addChild(obj.name, obj);
            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",1280,720,this,function(p){});
            obj.set_mobileorientation("landscape");
            this.addLayout(obj.name, obj);
            
            // BindItem Information

            
            // TriggerItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script

        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.Static00.addEventHandler("onclick",this.Static00_onclick,this);
            this.Static00_00.addEventHandler("onclick",this.Static00_onclick,this);
            this.Static01.addEventHandler("onclick",this.Static01_onclick,this);
            this.Static01_00.addEventHandler("onclick",this.Static01_onclick,this);
        };
        this.loadIncludeScript("emplList.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
