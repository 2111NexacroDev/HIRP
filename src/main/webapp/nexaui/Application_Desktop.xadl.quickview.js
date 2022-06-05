<<<<<<< HEAD
(function()
{
    return function()
    {
        this.on_loadAppVariables = function()
        {		
            var obj = null;
            
			// global dataobject
		
            // global dataset
            obj = new Dataset("gds_menu", this);
            obj._setContents("<ColumnInfo><Column id=\"MENU_ID\" type=\"STRING\" size=\"256\"/><Column id=\"MENU_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"MENU_LEVEL\" type=\"STRING\" size=\"256\"/><Column id=\"FORM_URL\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"MENU_ID\">10</Col><Col id=\"MENU_NAME\">홈</Col><Col id=\"MENU_LEVEL\">0</Col><Col id=\"FORM_URL\">FrameBase::form_home.xfdl</Col></Row><Row><Col id=\"MENU_ID\">20</Col><Col id=\"MENU_NAME\">사원관리</Col><Col id=\"MENU_LEVEL\">0</Col><Col id=\"FORM_URL\">FrameBase::emplList.xfdl</Col></Row><Row><Col id=\"MENU_ID\">30</Col><Col id=\"MENU_NAME\">부서관리</Col><Col id=\"MENU_LEVEL\">0</Col><Col id=\"FORM_URL\">FrameBase::deptManage.xfdl</Col></Row><Row><Col id=\"MENU_ID\">40</Col><Col id=\"MENU_NAME\">직급관리</Col><Col id=\"MENU_LEVEL\">0</Col><Col id=\"FORM_URL\">FrameBase::positionView.xfdl</Col></Row><Row><Col id=\"MENU_ID\">50</Col><Col id=\"MENU_NAME\">근태관리</Col><Col id=\"MENU_LEVEL\">0</Col><Col id=\"FORM_URL\">FrameBase::timeView.xfdl</Col></Row></Rows>");
            this._addDataset(obj.name, obj);
            
            // global variable

            
            obj = null;
        };
        
        // property, event, createMainFrame
        this.on_initApplication = function()
        {
            // properties
            this.set_id("Application_Desktop");
            this.set_screenid("Desktop_screen");

            if (this._is_attach_childframe)
            	return;
            
            // frame
            var mainframe = this.createMainFrame("mainframe","0","0","1280","720",null,null,this);
            mainframe.set_showtitlebar("true");
            mainframe.set_showstatusbar("true");
            mainframe.set_titletext("LeftFrame");
            mainframe.on_createBodyFrame = this.mainframe_createBodyFrame;
            // tray

        };
        
        this.loadPreloadList = function()
        {

        };
        
        this.mainframe_createBodyFrame = function()
        {
            var obj = new ChildFrame("QuickViewFrame", null, null, null, null, null, null, "", this);
            
            obj.set_showtitlebar("false");
            obj.set_showstatusbar("false");
            obj.set_border("0px none");
			
            this.addChild(obj.name, obj);
            obj.set_formurl(nexacro._quickview_formurl);
            this.frame = obj;
            
            obj = null;
        };
        
        this.on_initEvent = function()
        {
        };
		// script Compiler

		this.checkLicense("");
        
        this.loadPreloadList();

    };
}
)();
=======
(function(){return function(){this.on_loadAppVariables=function(){var _a=null;_a=new Dataset("gds_menu",this);_a._setContents("<ColumnInfo><Column id=\"MENU_ID\" type=\"STRING\" size=\"256\"/><Column id=\"MENU_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"MENU_LEVEL\" type=\"STRING\" size=\"256\"/><Column id=\"FORM_URL\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"MENU_ID\">10</Col><Col id=\"MENU_NAME\">홈</Col><Col id=\"MENU_LEVEL\">0</Col><Col id=\"FORM_URL\">FrameBase::form_home.xfdl</Col></Row><Row><Col id=\"MENU_ID\">20</Col><Col id=\"MENU_NAME\">사원관리</Col><Col id=\"MENU_LEVEL\">0</Col><Col id=\"FORM_URL\">FrameBase::emplList.xfdl</Col></Row><Row><Col id=\"MENU_ID\">30</Col><Col id=\"MENU_NAME\">부서관리</Col><Col id=\"MENU_LEVEL\">0</Col><Col id=\"FORM_URL\">FrameBase::deptManage.xfdl</Col></Row><Row><Col id=\"MENU_ID\">40</Col><Col id=\"MENU_NAME\">직급관리</Col><Col id=\"MENU_LEVEL\">0</Col></Row><Row><Col id=\"MENU_ID\">50</Col><Col id=\"MENU_NAME\">근태관리</Col><Col id=\"MENU_LEVEL\">0</Col><Col id=\"FORM_URL\">FrameBase::timeView.xfdl</Col></Row></Rows>");this._addDataset(_a.name,_a);_a=null;};this.on_initApplication=function(){this.set_id("Application_Desktop");this.set_screenid("Desktop_screen");if(this._is_attach_childframe){return;}var _a=this.createMainFrame("mainframe","0","0","1280","720",null,null,this);_a.set_showtitlebar("true");_a.set_showstatusbar("true");_a.set_titletext("LeftFrame");_a.on_createBodyFrame=this.mainframe_createBodyFrame;};this.loadPreloadList=function(){};this.mainframe_createBodyFrame=function(){var _a=new ChildFrame("QuickViewFrame",null,null,null,null,null,null,"",this);_a.set_showtitlebar("false");_a.set_showstatusbar("false");_a.set_border("0px none");this.addChild(_a.name,_a);_a.set_formurl(nexacro._quickview_formurl);this.frame=_a;_a=null;};this.on_initEvent=function(){};this.checkLicense("");this.loadPreloadList();};})();
>>>>>>> refs/remotes/origin/main
