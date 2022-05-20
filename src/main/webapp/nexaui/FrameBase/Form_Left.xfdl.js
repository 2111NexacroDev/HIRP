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
            obj.set_cssclass("gnb");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"80\"/></Columns><Rows><Row size=\"40\"/></Rows><Band id=\"body\"><Cell text=\"bind:MENU_NAME\" displaytype=\"text\" edittype=\"tree\" treelevel=\"bind:MENU_LEVEL\" font=\"normal 14px/normal &quot;Noto Sans KR&quot;\" textAlign=\"left\" border=\"0px none\" letterSpacing=\"-0.5px\" padding=\"0px 0px 0px 50px\" borderRadius=\"4px\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new ImageViewer("ImageViewer00","5","170","40","40",null,null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_background("url(\'theme::hirpTheme/00_icon_home.png\') repeat center top");
            obj.set_border("0px none");
            this.addChild(obj.name, obj);

            obj = new ImageViewer("ImageViewer00_00","5","210","40","40",null,null,null,null,null,null,this);
            obj.set_taborder("3");
            obj.set_background("url(\'theme::hirpTheme/btn_empl.png\') repeat right");
            obj.set_border("0px none");
            this.addChild(obj.name, obj);

            obj = new ImageViewer("ImageViewer00_00_00","5","250","40","40",null,null,null,null,null,null,this);
            obj.set_taborder("4");
            obj.set_background("url(\'theme::hirpTheme/btn_dept.png\') repeat center top");
            obj.set_border("0px none");
            this.addChild(obj.name, obj);

            obj = new ImageViewer("ImageViewer00_00_00_00","5","290","40","40",null,null,null,null,null,null,this);
            obj.set_taborder("5");
            obj.set_background("url(\'theme::hirpTheme/10_icon_org.png\') repeat center top");
            obj.set_border("0px none");
            this.addChild(obj.name, obj);

            obj = new ImageViewer("ImageViewer00_00_00_00_00","5","329","40","40",null,null,null,null,null,null,this);
            obj.set_taborder("6");
            obj.set_background("url(\'theme::hirpTheme/06_icon_doc.png\') repeat center top");
            obj.set_border("0px none");
            this.addChild(obj.name, obj);

            obj = new ImageViewer("ImageViewer00_00_00_00_00_00","5","370","40","40",null,null,null,null,null,null,this);
            obj.set_taborder("7");
            obj.set_background("url(\'theme::hirpTheme/08_icon_att.png\') repeat center top");
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

        this.gnb_admin_oncellclick = function(obj,e)
        {
        	this.fn_openForm(obj, e);
        };


        //클릭하면 form을 열어주는 함수
        //this.fn_openForm = function(paramRow) {
        this.fn_openForm = function(obj, e) {
        	//FORM_URL gds_menu

        	//var objApp = nexacro.getApplication();
        	//var sMenuId = objApp.gds_menu.getColumn(paramRow, "MENU_ID");
        	//var sMenuNM = objApp.gds_menu.getColumn(paramRow, "MENU_NAME");
        	//var sFormUrl = objApp.gds_menu.getColumn(paramRow, "FORM_URL");

        	var objDs = obj.getBindDataset();
        	var sMenuId = objDs.getColumn(e.row, "MENU_ID");
        	var sMenuNM = objDs.getColumn(e.row, "MENU_NAME");
        	var sFormUrl = objDs.getColumn(e.row, "FORM_URL");
        	trace("form-left : sMenuId :"+sMenuId);
        	trace("form-left : sMenuNM :"+sMenuNM);
        	trace("form-left : sFormUrl :"+sFormUrl);

        	if(sFormUrl.length <= 0) return;

        	var objApp = nexacro.getApplication();

        	var sWorkFramePath = objApp.mainframe.HFrameSet00.WorkFrame;

        	//이미 열린 화면은 다시 열리지 않는다. 이미 열린 파일이 선택됐을 때 포커스 되도록 하는 것
        	var arrObj = sWorkFramePath.all; //열려있는 모든 화면 리스트

        	//화면 이름이랑 메뉴아이디랑 같으면 메뉴 focus 바꿔주는 것.
        	for(var i = 0 ; i < arrObj.length; i++) {
        		trace("form-left : arrObj["+i+"].name  :"+arrObj[i].name );
        		if(arrObj[i].name == sMenuId) {	//화면 이름이랑 메뉴 아이디랑 같으면
        			arrObj[i].setFocus();
        			trace("form-left : focus "+arrObj[i].name );
        			return;
        // 			arrObj[i].form.close();
        // 			trace("form-left : close "+arrObj[i].name );
        		}
        	}

        	var objChildFrame = new ChildFrame(sMenuId, 0, 0, 1080, 720);
        	sWorkFramePath.addChild(sMenuId, objChildFrame);


        	//파라미터 넘겨주기
        	var oParam = {
        					MENU_ID : sMenuId,
        					MENU_NAME : sMenuNM,
        					FORM_URL : sFormUrl,
        				}

        	objChildFrame.openParam = oParam;


        	objChildFrame.set_showtitlebar(false);
        /*	objChildFrame.set_formurl("FrameBase::deptManage.xfdl");*/
        	objChildFrame.set_formurl(sFormUrl);
        	objChildFrame.show();

        	//mdi에 파라미터로 oParam 넘기기
        	/*objApp.mainframe.HFrameSet00.WorkFrame.form.fn_addTab(oParam);*/
        }

        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.gnb_admin.addEventHandler("oncellclick",this.gnb_admin_oncellclick,this);
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
