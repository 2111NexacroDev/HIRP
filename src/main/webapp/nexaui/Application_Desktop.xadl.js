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
            var frame0 = new HFrameSet("HFrameSet00",null,null,null,null,null,null,this);
            frame0.set_separatesize("200,*");
            this.addChild(frame0.name, frame0);
            this.frame=frame0;

            var frame1 = new ChildFrame("LeftFrame",null,null,null,null,null,null,"FrameBase::Form_Left.xfdl",frame0);
            frame1.set_showtitlebar("false");
            frame1.set_showstatusbar("false");
            frame1.set_showtitleicon("false");
            frame0.addChild(frame1.name, frame1);
            frame1.set_formurl("FrameBase::Form_Left.xfdl");


            var frame2 = new FrameSet("WorkFrame",null,null,null,null,null,null,frame0);
            frame0.addChild(frame2.name, frame2);
        };
        
        this.on_initEvent = function()
        {

        };
        
        // script Compiler

        this.checkLicense("");
        
        this.loadPreloadList();

        this.loadIncludeScript("Application_Desktop.xadl");
    };
}
)();
=======
(function(){return function(){this.on_loadAppVariables=function(){var _a=null;_a=new Dataset("gds_menu",this);_a._setContents("<ColumnInfo><Column id=\"MENU_ID\" type=\"STRING\" size=\"256\"/><Column id=\"MENU_NAME\" type=\"STRING\" size=\"256\"/><Column id=\"MENU_LEVEL\" type=\"STRING\" size=\"256\"/><Column id=\"FORM_URL\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"MENU_ID\">10</Col><Col id=\"MENU_NAME\">홈</Col><Col id=\"MENU_LEVEL\">0</Col><Col id=\"FORM_URL\">FrameBase::form_home.xfdl</Col></Row><Row><Col id=\"MENU_ID\">20</Col><Col id=\"MENU_NAME\">사원관리</Col><Col id=\"MENU_LEVEL\">0</Col><Col id=\"FORM_URL\">FrameBase::emplList.xfdl</Col></Row><Row><Col id=\"MENU_ID\">30</Col><Col id=\"MENU_NAME\">부서관리</Col><Col id=\"MENU_LEVEL\">0</Col><Col id=\"FORM_URL\">FrameBase::deptManage.xfdl</Col></Row><Row><Col id=\"MENU_ID\">40</Col><Col id=\"MENU_NAME\">직급관리</Col><Col id=\"MENU_LEVEL\">0</Col></Row><Row><Col id=\"MENU_ID\">50</Col><Col id=\"MENU_NAME\">근태관리</Col><Col id=\"MENU_LEVEL\">0</Col><Col id=\"FORM_URL\">FrameBase::timeView.xfdl</Col></Row></Rows>");this._addDataset(_a.name,_a);_a=null;};this.on_initApplication=function(){this.set_id("Application_Desktop");this.set_screenid("Desktop_screen");if(this._is_attach_childframe){return;}var _a=this.createMainFrame("mainframe","0","0","1280","720",null,null,this);_a.set_showtitlebar("true");_a.set_showstatusbar("true");_a.set_titletext("LeftFrame");_a.on_createBodyFrame=this.mainframe_createBodyFrame;};this.loadPreloadList=function(){};this.mainframe_createBodyFrame=function(){var _a=new HFrameSet("HFrameSet00",null,null,null,null,null,null,this);_a.set_separatesize("200,*");this.addChild(_a.name,_a);this.frame=_a;var _b=new ChildFrame("LeftFrame",null,null,null,null,null,null,"FrameBase::Form_Left.xfdl",_a);_b.set_showtitlebar("false");_b.set_showstatusbar("false");_b.set_showtitleicon("false");_a.addChild(_b.name,_b);_b.set_formurl("FrameBase::Form_Left.xfdl");var _c=new FrameSet("WorkFrame",null,null,null,null,null,null,_a);_a.addChild(_c.name,_c);};this.on_initEvent=function(){};this.checkLicense("");this.loadPreloadList();this.loadIncludeScript("Application_Desktop.xadl");};})();
>>>>>>> refs/remotes/origin/main
