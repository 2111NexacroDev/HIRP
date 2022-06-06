(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("Form_home");
            this.set_titletext("home");
            if (Form == this.constructor)
            {
                this._setFormPosition(1080,720);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize

            
            // UI Components Initialize
            obj = new ImageViewer("ImageViewer00","280","70",null,"353","320",null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_background("url(\'theme::hirpTheme/bg_admin_home_hirp.png\') repeat center center/100%");
            obj.set_border("0px none");
            this.addChild(obj.name, obj);

            obj = new Button("Button00","280","400","230","42",null,null,null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_text("관리자");
            obj.set_font("normal 300 16px/normal \"Noto Sans KR\"");
            obj.set_borderRadius("4px");
            obj.set_cssclass("point");
            obj.set_cursor("pointer");
            this.addChild(obj.name, obj);

            obj = new Button("Button00_00","530","400","230","42",null,null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_text("사용자");
            obj.set_font("normal 300 16px/normal \"Noto Sans KR\"");
            obj.set_borderRadius("4px");
            obj.set_cssclass("point");
            obj.set_cursor("pointer");
            this.addChild(obj.name, obj);
            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","Desktop_screen",1080,720,this,function(p){});
            this.addLayout(obj.name, obj);
            
            // BindItem Information

            
            // TriggerItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.registerScript("form_home.xfdl", function() {

        this.Button00_onclick = function(obj,e)
        {
        	alert("관리자님, 환영합니다! \n관리 기능은 왼쪽 메뉴를 이용하시면 됩니다!");
        };

        this.Button00_00_onclick = function(obj,e)
        {
        	location.href="/home.hirp";
        };
        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.Button00.addEventHandler("onclick",this.Button00_onclick,this);
            this.Button00_00.addEventHandler("onclick",this.Button00_00_onclick,this);
        };
        this.loadIncludeScript("form_home.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
