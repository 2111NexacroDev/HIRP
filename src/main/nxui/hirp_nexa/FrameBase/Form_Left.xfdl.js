(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("Form_Left");
            this.set_titletext("Form_Left");
            this.set_background("#404040");
            if (Form == this.constructor)
            {
                this._setFormPosition(200,720);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize

            
            // UI Components Initialize
            obj = new Button("logo_admin","5","10",null,"151","5",null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_background("url(\'theme::default/images/logo_hirp_admin.png\') no-repeat center center");
            obj.set_border("0px none");
            obj.set_text("");
            this.addChild(obj.name, obj);

            obj = new Grid("gnb_admin","5","170",null,null,"5","10",null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_autofittype("col");
            obj.set_binddataset("gds_menu");
            obj.set_treeinitstatus("expand,all");
            obj.set_border("0px none");
            obj.set_background("transparent");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"80\"/></Columns><Rows><Row size=\"40\"/></Rows><Band id=\"body\"><Cell text=\"bind:MENU_NAME\" displaytype=\"text\" edittype=\"tree\" treelevel=\"bind:MENU_LEVEL\" font=\"normal 14px/normal &quot;Noto Sans KR&quot;\" textAlign=\"left\" border=\"0px none\" color=\"#ffffff\" letterSpacing=\"-0.5px\" padding=\"0px 0px 0px 50px\" borderRadius=\"4px\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new ImageViewer("ImageViewer00","5","170","40","40",null,null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_background("url(\'theme://00_icon_home.png\') repeat center top");
            obj.set_border("0px none");
            this.addChild(obj.name, obj);

            obj = new ImageViewer("ImageViewer00_00","5","210","40","40",null,null,null,null,null,null,this);
            obj.set_taborder("3");
            obj.set_background("url(\'theme://btn_empl.png\') repeat right");
            obj.set_border("0px none");
            this.addChild(obj.name, obj);

            obj = new ImageViewer("ImageViewer00_00_00","5","250","40","40",null,null,null,null,null,null,this);
            obj.set_taborder("4");
            obj.set_background("url(\'theme://10_icon_org.png\') repeat center top");
            obj.set_border("0px none");
            this.addChild(obj.name, obj);

            obj = new ImageViewer("ImageViewer00_00_00_00","5","290","40","40",null,null,null,null,null,null,this);
            obj.set_taborder("5");
            obj.set_background("url(\'theme://btn_dept.png\') repeat center top");
            obj.set_border("0px none");
            this.addChild(obj.name, obj);

            obj = new ImageViewer("ImageViewer00_00_00_00_00","5","329","40","40",null,null,null,null,null,null,this);
            obj.set_taborder("6");
            obj.set_background("url(\'theme://06_icon_doc.png\') repeat center top");
            obj.set_border("0px none");
            this.addChild(obj.name, obj);

            obj = new ImageViewer("ImageViewer00_00_00_00_00_00","5","370","40","40",null,null,null,null,null,null,this);
            obj.set_taborder("7");
            obj.set_background("url(\'theme://08_icon_att.png\') repeat center top");
            obj.set_border("0px none");
            this.addChild(obj.name, obj);
            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","Desktop_screen",200,720,this,function(p){});
            this.addLayout(obj.name, obj);
            
            // BindItem Information

            
            // TriggerItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.registerScript("Form_Left.xfdl", function() {

        this.Button00_onclick = function(obj,e)
        {

        };
        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.ImageViewer00.addEventHandler("onclick",this.ImageViewer00_onclick,this);
            this.ImageViewer00_00.addEventHandler("onclick",this.ImageViewer00_onclick,this);
            this.ImageViewer00_00_00.addEventHandler("onclick",this.ImageViewer00_onclick,this);
            this.ImageViewer00_00_00_00.addEventHandler("onclick",this.ImageViewer00_onclick,this);
            this.ImageViewer00_00_00_00_00.addEventHandler("onclick",this.ImageViewer00_onclick,this);
            this.ImageViewer00_00_00_00_00_00.addEventHandler("onclick",this.ImageViewer00_onclick,this);
        };
        this.loadIncludeScript("Form_Left.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
