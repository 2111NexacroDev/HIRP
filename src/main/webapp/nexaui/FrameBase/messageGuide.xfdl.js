(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("messageGuide");
            this.set_titletext("New Form");
            if (Form == this.constructor)
            {
                this._setFormPosition(420,180);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize

            
            // UI Components Initialize
            obj = new Static("static_dept01_00","20","52",null,"41","20",null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_text("관리 기능은 왼쪽 메뉴를 이용하시면 됩니다!");
            obj.set_font("normal 500 14px/normal \"Noto Sans KR\"");
            obj.set_textAlign("center");
            this.addChild(obj.name, obj);

            obj = new Static("static_dept01","20","29",null,"41","20",null,null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_text("관리자님, 환영합니다!");
            obj.set_font("normal 500 14px/normal \"Noto Sans KR\"");
            obj.set_textAlign("center");
            this.addChild(obj.name, obj);

            obj = new Button("Button00","150","105","120","30",null,null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_text("확인");
            obj.set_cssclass("point");
            obj.set_borderRadius("4px");
            obj.set_font("normal 14px/normal \"Noto Sans KR\"");
            obj.set_cursor("pointer");
            this.addChild(obj.name, obj);
            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",420,180,this,function(p){});
            obj.set_mobileorientation("landscape");
            this.addLayout(obj.name, obj);
            
            // BindItem Information

            
            // TriggerItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.registerScript("messageGuide.xfdl", function() {

        this.Button00_onclick = function(obj,e)
        {
        	this.close();
        };

        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.static_dept01_00.addEventHandler("onclick",this.static_dept01_onclick,this);
            this.static_dept01.addEventHandler("onclick",this.static_dept01_onclick,this);
            this.Button00.addEventHandler("onclick",this.Button00_onclick,this);
        };
        this.loadIncludeScript("messageGuide.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
