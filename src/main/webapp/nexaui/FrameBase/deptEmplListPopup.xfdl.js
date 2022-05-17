(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("deptEmplListPopup");
            this.set_titletext("New Form");
            if (Form == this.constructor)
            {
                this._setFormPosition(290,500);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds_empl", this);
            obj._setContents("<ColumnInfo><Column id=\"emplId\" type=\"STRING\" size=\"256\"/><Column id=\"divisionCode\" type=\"STRING\" size=\"256\"/><Column id=\"positionCode\" type=\"STRING\" size=\"256\"/><Column id=\"emplName\" type=\"STRING\" size=\"256\"/><Column id=\"startDate\" type=\"DATE\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"emplId\">id1</Col><Col id=\"divisionCode\">10</Col><Col id=\"positionCode\">10</Col><Col id=\"emplName\">아무개</Col></Row><Row><Col id=\"emplId\">id4</Col><Col id=\"divisionCode\">1030</Col><Col id=\"positionCode\">10</Col><Col id=\"emplName\">일용자</Col></Row></Rows>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Grid("Grid00","35","100","205","320",null,null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_binddataset("ds_empl");
            obj.set_autofittype("col");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"96\"/><Column size=\"100\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell text=\"부서코드\"/><Cell col=\"1\" text=\"사원이름\"/></Band><Band id=\"body\"><Cell text=\"bind:divisionCode\"/><Cell col=\"1\" text=\"bind:emplName\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new Static("static_dept01","30","19","166","41",null,null,null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_text("부서장 지정");
            obj.set_font("normal 500 12pt/normal \"Noto Sans KR\"");
            this.addChild(obj.name, obj);

            obj = new Button("btn_submit","50","440","80","30",null,null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_text("저장");
            obj.set_letterSpacing("0px");
            obj.set_cssclass("save");
            this.addChild(obj.name, obj);

            obj = new Button("btn_cancel","140","440","80","30",null,null,null,null,null,null,this);
            obj.set_taborder("3");
            obj.set_text("취소");
            obj.set_letterSpacing("0px");
            obj.set_cssclass("cancel");
            this.addChild(obj.name, obj);

            obj = new Edit("edt_search","35","65","170","30",null,null,null,null,null,null,this);
            obj.set_taborder("4");
            this.addChild(obj.name, obj);

            obj = new Button("btn_search","211","65","30","30",null,null,null,null,null,null,this);
            obj.set_taborder("5");
            obj.set_cssclass("search");
            this.addChild(obj.name, obj);
            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",290,500,this,function(p){});
            obj.set_mobileorientation("landscape");
            this.addLayout(obj.name, obj);
            
            // BindItem Information

            
            // TriggerItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.registerScript("deptEmplListPopup.xfdl", function() {
        //취소 버튼
        this.btn_cancel_onclick = function(obj,e)
        {
        	this.close("cancel");
        };

        //저장 버튼
        this.btn_submit_onclick = function(obj,e)
        {
        	var emplRtn = "";
        	emplRtn += this.ds_empl.getColumn(this.ds_empl.rowposition, "emplId");
        	//저장 누르면 선택한 사원의 id값 넘겨줌
        	this.close(emplRtn);
        };

        //onload
        this.deptEmplListPopup_onload = function(obj,e)
        {
        	trace("팝업:" + this.parent.deptcode);
        	var paramDeptCode = this.parent.deptcode; //파라미터로 받은 deptCode
        	var paramEmpl = this.parent.ds_empl;	//파라미터로 받은 ds_empl
        	this.ds_empl.copyData(paramEmpl);	//받아온 ds_empl 데이터를 popup ds_empl로 복사
            this.Grid00.set_binddataset("ds_empl");	//받아온 ds_empl 바인딩
        	//부서가 같은 사원만 필터링
        	this.ds_empl.filter("divisionCode == '"+ paramDeptCode + "'");
        };

        //검색 버튼
        //일단은 이름 검색하면 나오는데,
        //우리 부서 + 이름 이렇게 할지 말지 고민중
        this.btn_search_onclick = function(obj,e)
        {
        	var searchVal = this.edt_search.text;
        	trace(searchVal);
        	this.ds_empl.filter("emplName.indexOf('" + searchVal + "') > -1 ");
        };

        //부모 페이지에서 보낸 파라미터 가져오는 코드
        // this.form_onload = function(obj:nexacro.Form,e:nexacro.LoadEventInfo)
        // {
        //     var strParam1 = this.parent.param1;
        //     var strParam2 = this.parent.param2;
        //     var objParam  = this.parent.param3;
        //
        //     this.Edit00.set_value(strParam1);
        //     this.Edit01.set_value(strParam2);
        //
        //     this.ds_child.copyData(objParam);
        //     this.Grid00.set_binddataset("ds_child");
        //     this.Grid00.createFormat();
        // };



        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload",this.deptEmplListPopup_onload,this);
            this.static_dept01.addEventHandler("onclick",this.static_dept01_onclick,this);
            this.btn_submit.addEventHandler("onclick",this.btn_submit_onclick,this);
            this.btn_cancel.addEventHandler("onclick",this.btn_cancel_onclick,this);
            this.edt_search.addEventHandler("onchanged",this.edt_search_onchanged,this);
            this.btn_search.addEventHandler("onclick",this.btn_search_onclick,this);
        };
        this.loadIncludeScript("deptEmplListPopup.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
