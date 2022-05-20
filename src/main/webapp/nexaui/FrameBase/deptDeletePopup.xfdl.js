(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("deptDeletePopup");
            this.set_titletext("New Form");
            if (Form == this.constructor)
            {
                this._setFormPosition(500,250);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize

            
            // UI Components Initialize
            obj = new Static("static_dept01","59","29","166","41",null,null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_text("부서 삭제");
            obj.set_font("normal 500 14pt/normal \"Noto Sans KR\"");
            this.addChild(obj.name, obj);

            obj = new Static("static_deptInfo01_00","103","75","307","30",null,null,null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_text("부서를 삭제하면 하위 부서도 함께 삭제됩니다. ");
            obj.set_border("0px none,0px none,1px black");
            this.addChild(obj.name, obj);

            obj = new Button("btn_submit","165","180","80","30",null,null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_text("삭제");
            obj.set_letterSpacing("0px");
            obj.set_cssclass("delete");
            this.addChild(obj.name, obj);

            obj = new Button("btn_cancel","255","180","80","30",null,null,null,null,null,null,this);
            obj.set_taborder("3");
            obj.set_text("취소");
            obj.set_letterSpacing("0px");
            obj.set_cssclass("cancel");
            this.addChild(obj.name, obj);

            obj = new Static("static_deptInfo01_00_00","103","95","307","30",null,null,null,null,null,null,this);
            obj.set_taborder("4");
            obj.set_text("삭제된 이후 부서 데이터는 복구할 수 없습니다.");
            obj.set_border("0px none,0px none,1px black");
            this.addChild(obj.name, obj);

            obj = new Static("static_deptInfo01_00_00_00","103","115","307","30",null,null,null,null,null,null,this);
            obj.set_taborder("5");
            obj.set_text("부서를 삭제하시겠습니까?");
            obj.set_border("0px none,0px none,1px black");
            this.addChild(obj.name, obj);
            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",500,250,this,function(p){});
            obj.set_mobileorientation("landscape");
            this.addLayout(obj.name, obj);
            
            // BindItem Information

            
            // TriggerItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.registerScript("deptDeletePopup.xfdl", function() {

        //취소 버튼
        this.btn_cancel_onclick = function(obj,e)
        {
        	this.close("cancel");
        };

        //삭제 버튼
        this.btn_submit_onclick = function(obj,e)
        {
        	this.close("delete");
        };

        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.static_dept01.addEventHandler("onclick",this.static_dept01_onclick,this);
            this.btn_submit.addEventHandler("onclick",this.btn_submit_onclick,this);
            this.btn_cancel.addEventHandler("onclick",this.btn_cancel_onclick,this);
        };
        this.loadIncludeScript("deptDeletePopup.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
