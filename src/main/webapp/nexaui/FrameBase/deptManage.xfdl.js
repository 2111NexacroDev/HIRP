(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("deptManage");
            if (Form == this.constructor)
            {
                this._setFormPosition(1080,720);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds_dept", this);
            obj._setContents("<ColumnInfo><Column id=\"deptCode\" type=\"STRING\" size=\"20\"/><Column id=\"deptName\" type=\"STRING\" size=\"30\"/><Column id=\"deptSecondname\" type=\"STRING\" size=\"50\"/><Column id=\"deptColor\" type=\"STRING\" size=\"50\"/><Column id=\"deptMaster\" type=\"STRING\" size=\"20\"/><Column id=\"deptHiredate\" type=\"DATE\" size=\"20\"/><Column id=\"deptUppercode\" type=\"STRING\" size=\"20\"/><Column id=\"deptLevel\" type=\"INT\" size=\"20\"/></ColumnInfo><Rows><Row><Col id=\"deptCode\">10</Col><Col id=\"deptName\">하이그룹</Col><Col id=\"deptSecondname\">HIGRP</Col><Col id=\"deptColor\">#FFD8D8</Col><Col id=\"deptMaster\">id1</Col><Col id=\"deptHiredate\">20220426</Col><Col id=\"deptUppercode\">NULL</Col><Col id=\"deptLevel\">0</Col></Row><Row><Col id=\"deptCode\">1010</Col><Col id=\"deptName\">경영관리팀</Col><Col id=\"deptSecondname\">BM</Col><Col id=\"deptColor\">#FAE0D4</Col><Col id=\"deptMaster\">id2</Col><Col id=\"deptHiredate\">20220426</Col><Col id=\"deptUppercode\">10</Col><Col id=\"deptLevel\">1</Col></Row><Row><Col id=\"deptCode\">1020</Col><Col id=\"deptName\">영업팀</Col><Col id=\"deptSecondname\">SALES</Col><Col id=\"deptColor\">#FAECC5</Col><Col id=\"deptMaster\">id3</Col><Col id=\"deptHiredate\">20220426</Col><Col id=\"deptUppercode\">10</Col><Col id=\"deptLevel\">1</Col></Row><Row><Col id=\"deptCode\">1030</Col><Col id=\"deptName\">상품기획팀</Col><Col id=\"deptSecondname\">SOP</Col><Col id=\"deptColor\">#FAF4C0</Col><Col id=\"deptMaster\">ID7</Col><Col id=\"deptHiredate\">20220426</Col><Col id=\"deptUppercode\">10</Col><Col id=\"deptLevel\">1</Col></Row><Row><Col id=\"deptCode\">1040</Col><Col id=\"deptLevel\">1</Col><Col id=\"deptName\">구매팀</Col><Col id=\"deptSecondname\">PCD</Col><Col id=\"deptColor\">#E4F7BA</Col><Col id=\"deptMaster\">ID8</Col><Col id=\"deptHiredate\">20220426</Col><Col id=\"deptUppercode\">10</Col></Row><Row><Col id=\"deptCode\">1050</Col><Col id=\"deptLevel\">1</Col><Col id=\"deptName\">물류팀</Col><Col id=\"deptSecondname\">DTB</Col><Col id=\"deptColor\">#CEFBC9</Col><Col id=\"deptMaster\">ID9</Col><Col id=\"deptHiredate\">20220426</Col><Col id=\"deptUppercode\">10</Col></Row><Row><Col id=\"deptCode\">1060</Col><Col id=\"deptLevel\">1</Col><Col id=\"deptName\">품질팀</Col><Col id=\"deptSecondname\">QA</Col><Col id=\"deptColor\">#D4F4FA</Col><Col id=\"deptMaster\">ID10</Col><Col id=\"deptHiredate\">20220426</Col><Col id=\"deptUppercode\">10</Col></Row><Row><Col id=\"deptCode\">1070</Col><Col id=\"deptLevel\">1</Col><Col id=\"deptName\">생산팀</Col><Col id=\"deptSecondname\">PROD</Col><Col id=\"deptColor\">#D9E5FF</Col><Col id=\"deptMaster\">ID11</Col><Col id=\"deptHiredate\">20220426</Col><Col id=\"deptUppercode\">10</Col></Row><Row><Col id=\"deptCode\">107010</Col><Col id=\"deptLevel\">2</Col><Col id=\"deptName\">생산공정팀</Col><Col id=\"deptSecondname\">PRODP</Col><Col id=\"deptColor\">#EBF7FF</Col><Col id=\"deptMaster\">ID12</Col><Col id=\"deptHiredate\">20220426</Col><Col id=\"deptUppercode\">1070</Col></Row><Row><Col id=\"deptCode\">107020</Col><Col id=\"deptLevel\">2</Col><Col id=\"deptName\">생산관리팀</Col><Col id=\"deptSecondname\">PRODM</Col><Col id=\"deptColor\">#EBF7FF</Col><Col id=\"deptMaster\">ID13</Col><Col id=\"deptHiredate\">20220426</Col><Col id=\"deptUppercode\">1070</Col></Row><Row><Col id=\"deptCode\">107030</Col><Col id=\"deptLevel\">2</Col><Col id=\"deptName\">생산외주팀</Col><Col id=\"deptSecondname\">PRODOS</Col><Col id=\"deptColor\">#EBF7FF</Col><Col id=\"deptMaster\">ID14</Col><Col id=\"deptHiredate\">20220426</Col><Col id=\"deptUppercode\">1070</Col></Row><Row><Col id=\"deptCode\">1080</Col><Col id=\"deptLevel\">1</Col><Col id=\"deptName\">제조팀</Col><Col id=\"deptSecondname\">MFT</Col><Col id=\"deptColor\">#DAD9FF</Col><Col id=\"deptMaster\">ID15</Col><Col id=\"deptHiredate\">20220426</Col><Col id=\"deptUppercode\">10</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_color", this);
            obj._setContents("<ColumnInfo><Column id=\"COLOR_ID\" type=\"STRING\" size=\"256\"/><Column id=\"COLOR_VAL\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"COLOR_ID\">1</Col><Col id=\"COLOR_VAL\">#FFD8D8</Col></Row><Row><Col id=\"COLOR_ID\">2</Col><Col id=\"COLOR_VAL\">#FAE0D4</Col></Row><Row><Col id=\"COLOR_ID\">3</Col><Col id=\"COLOR_VAL\">#FAECC5</Col></Row><Row><Col id=\"COLOR_ID\">4</Col><Col id=\"COLOR_VAL\">#FAF4C0</Col></Row><Row><Col id=\"COLOR_ID\">5</Col><Col id=\"COLOR_VAL\">#E4F7BA</Col></Row><Row><Col id=\"COLOR_ID\">6</Col><Col id=\"COLOR_VAL\">#CEFBC9</Col></Row><Row><Col id=\"COLOR_ID\">7</Col><Col id=\"COLOR_VAL\">#D4F4FA</Col></Row><Row><Col id=\"COLOR_ID\">8</Col><Col id=\"COLOR_VAL\">#D9E5FF</Col></Row><Row><Col id=\"COLOR_ID\">9</Col><Col id=\"COLOR_VAL\">#DAD9FF</Col></Row><Row><Col id=\"COLOR_ID\">10</Col><Col id=\"COLOR_VAL\">#E8D9FF</Col></Row><Row><Col id=\"COLOR_ID\">11</Col><Col id=\"COLOR_VAL\">#FFD9FA</Col></Row><Row><Col id=\"COLOR_ID\">12</Col><Col id=\"COLOR_VAL\">#FFD9EC</Col></Row><Row><Col id=\"COLOR_ID\">13</Col><Col id=\"COLOR_VAL\">#FFA7A7</Col></Row><Row><Col id=\"COLOR_ID\">14</Col><Col id=\"COLOR_VAL\">#FFC19E</Col></Row><Row><Col id=\"COLOR_ID\">15</Col><Col id=\"COLOR_VAL\">#FFE08C</Col></Row><Row><Col id=\"COLOR_ID\">16</Col><Col id=\"COLOR_VAL\">#FAED7D</Col></Row><Row><Col id=\"COLOR_ID\">17</Col><Col id=\"COLOR_VAL\">#CEF279</Col></Row><Row><Col id=\"COLOR_ID\">18</Col><Col id=\"COLOR_VAL\">#B7F0B1</Col></Row><Row><Col id=\"COLOR_ID\">19</Col><Col id=\"COLOR_VAL\">#B2EBF4</Col></Row><Row><Col id=\"COLOR_ID\">20</Col><Col id=\"COLOR_VAL\">#B2CCFF</Col></Row><Row><Col id=\"COLOR_ID\">21</Col><Col id=\"COLOR_VAL\">#B5B2FF</Col></Row><Row><Col id=\"COLOR_ID\">22</Col><Col id=\"COLOR_VAL\">#D1B2FF</Col></Row><Row><Col id=\"COLOR_ID\">23</Col><Col id=\"COLOR_VAL\">#FFB2F5</Col></Row><Row><Col id=\"COLOR_ID\">24</Col><Col id=\"COLOR_VAL\">#FFB2D9</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_empl", this);
            obj._setContents("<ColumnInfo><Column id=\"emplId\" type=\"STRING\" size=\"256\"/><Column id=\"divisionCode\" type=\"STRING\" size=\"256\"/><Column id=\"positionCode\" type=\"STRING\" size=\"256\"/><Column id=\"emplPw\" type=\"STRING\" size=\"256\"/><Column id=\"emplName\" type=\"STRING\" size=\"256\"/><Column id=\"startDate\" type=\"DATE\" size=\"256\"/><Column id=\"email\" type=\"STRING\" size=\"256\"/><Column id=\"directNo\" type=\"STRING\" size=\"256\"/><Column id=\"phoneNo\" type=\"STRING\" size=\"256\"/><Column id=\"recruitCategory\" type=\"STRING\" size=\"256\"/><Column id=\"salaryCategory\" type=\"STRING\" size=\"256\"/><Column id=\"referrer\" type=\"STRING\" size=\"256\"/><Column id=\"isStatus\" type=\"STRING\" size=\"256\"/><Column id=\"birthday\" type=\"STRING\" size=\"256\"/><Column id=\"gender\" type=\"STRING\" size=\"256\"/><Column id=\"isMarriage\" type=\"STRING\" size=\"256\"/><Column id=\"isDisability\" type=\"STRING\" size=\"256\"/><Column id=\"isVeterans\" type=\"STRING\" size=\"256\"/><Column id=\"endDate\" type=\"DATE\" size=\"256\"/><Column id=\"endReason\" type=\"STRING\" size=\"256\"/><Column id=\"profile\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"emplId\">ID1</Col><Col id=\"divisionCode\">10</Col><Col id=\"positionCode\">10</Col><Col id=\"emplPw\">아무개</Col></Row><Row><Col id=\"emplId\">ID2</Col><Col id=\"divisionCode\">1010</Col><Col id=\"positionCode\">10</Col><Col id=\"emplPw\">홍길동</Col></Row><Row><Col id=\"emplId\">ID3</Col><Col id=\"divisionCode\">1020</Col><Col id=\"positionCode\">10</Col><Col id=\"emplPw\">박보검</Col></Row><Row><Col id=\"emplId\">ID4</Col><Col id=\"divisionCode\">1030</Col><Col id=\"positionCode\">10</Col><Col id=\"emplPw\">일용자</Col></Row></Rows>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Div("Div00_00","0","0","230","100.00%",null,null,null,null,null,null,this);
            obj.set_taborder("36");
            obj.set_background("#ffffff");
            obj.set_border("0px none, 1px solid #dddddd, 0px none, 0px none");
            obj.set_font("12px/normal \"Noto Sans KR\"");
            obj.set_text("");
            this.addChild(obj.name, obj);

            obj = new Grid("grid_deptList","15","200","200",null,null,"100",null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_binddataset("ds_dept");
            obj.set_autofittype("col");
            obj.set_treeinitstatus("expand,all");
            obj.set_treeusecheckbox("false");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"80\"/></Columns><Rows><Row size=\"24\"/></Rows><Band id=\"body\"><Cell text=\"bind:deptName\" treelevel=\"bind:deptLevel\" displaytype=\"treeitemcontrol\" edittype=\"tree\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new Static("static_dept01","20","15","166","41",null,null,null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_text("부서 관리");
            obj.set_font("normal 500 15pt/normal \"Noto Sans KR\"");
            this.addChild(obj.name, obj);

            obj = new Static("static_dept02","20","56","166","41",null,null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_text("조직도");
            obj.set_font("normal 500 12pt/normal \"Noto Sans KR\"");
            this.addChild(obj.name, obj);

            obj = new Static("static_dept03","27","121","50","30",null,null,null,null,null,null,this);
            obj.set_taborder("3");
            obj.set_text("부서");
            obj.set_font("normal 10pt/normal \"Noto Sans KR\"");
            this.addChild(obj.name, obj);

            obj = new Button("btn_deptAdd","160","127","15","15",null,null,null,null,null,null,this);
            obj.set_taborder("4");
            obj.set_cssclass("add_icon");
            this.addChild(obj.name, obj);

            obj = new Button("btn_delete","190","127","15","15",null,null,null,null,null,null,this);
            obj.set_taborder("5");
            obj.set_cssclass("delete_icon");
            this.addChild(obj.name, obj);

            obj = new Edit("edt_search","23","155","162","30",null,null,null,null,null,null,this);
            obj.set_taborder("6");
            this.addChild(obj.name, obj);

            obj = new Button("btn_search","185","155","30","30",null,null,null,null,null,null,this);
            obj.set_taborder("7");
            obj.set_cssclass("search");
            this.addChild(obj.name, obj);

            obj = new Static("static_deptName","280","40","157","37",null,null,null,null,null,null,this);
            obj.set_taborder("8");
            obj.set_text("부서이름");
            obj.set_font("normal 500 15pt/normal \"Noto Sans KR\"");
            this.addChild(obj.name, obj);

            obj = new Static("static_deptInfo","280","100","157","30",null,null,null,null,null,null,this);
            obj.set_taborder("9");
            obj.set_text("부서 정보");
            obj.set_border("0px none,0px none,1px black");
            this.addChild(obj.name, obj);

            obj = new Static("st_deptcolor","280","275","157","30",null,null,null,null,null,null,this);
            obj.set_taborder("10");
            obj.set_text("부서 색상");
            this.addChild(obj.name, obj);

            obj = new Static("st_deptmaster","280","320","157","30",null,null,null,null,null,null,this);
            obj.set_taborder("11");
            obj.set_text("부서장");
            this.addChild(obj.name, obj);

            obj = new Static("st_depthiredate","280","365","157","30",null,null,null,null,null,null,this);
            obj.set_taborder("12");
            obj.set_text("생성일");
            this.addChild(obj.name, obj);

            obj = new Static("st_upperdept","280","410","157","30",null,null,null,null,null,null,this);
            obj.set_taborder("13");
            obj.set_text("상위 부서");
            this.addChild(obj.name, obj);

            obj = new Static("st_lowerdept","280","455","157","30",null,null,null,null,null,null,this);
            obj.set_taborder("14");
            obj.set_text("하위 부서");
            this.addChild(obj.name, obj);

            obj = new Static("st_deptname","280","185","157","30",null,null,null,null,null,null,this);
            obj.set_taborder("15");
            obj.set_text("부서명");
            this.addChild(obj.name, obj);

            obj = new Static("st_deptcode","280","140","157","30",null,null,null,null,null,null,this);
            obj.set_taborder("16");
            obj.set_text("부서코드");
            this.addChild(obj.name, obj);

            obj = new Static("st_deptsecond","280","230","157","30",null,null,null,null,null,null,this);
            obj.set_taborder("17");
            obj.set_text("부서약어");
            this.addChild(obj.name, obj);

            obj = new Button("btn_edit_deptname","560","185","30","30",null,null,null,null,null,null,this);
            obj.set_taborder("18");
            obj.set_cssclass("edit_icon");
            this.addChild(obj.name, obj);

            obj = new Static("st_deptcolor2","403","275","157","30",null,null,null,null,null,null,this);
            obj.set_taborder("19");
            obj.set_text("부서 색상");
            this.addChild(obj.name, obj);

            obj = new Static("st_deptmaster2","403","320","157","30",null,null,null,null,null,null,this);
            obj.set_taborder("20");
            obj.set_text("부서장");
            this.addChild(obj.name, obj);

            obj = new Static("st_deptname2","403","185","157","30",null,null,null,null,null,null,this);
            obj.set_taborder("21");
            obj.set_text("부서명");
            this.addChild(obj.name, obj);

            obj = new Static("st_deptcode2","404","140","157","30",null,null,null,null,null,null,this);
            obj.set_taborder("22");
            obj.set_text("부서코드");
            this.addChild(obj.name, obj);

            obj = new Static("st_deptsecond2","403","230","157","30",null,null,null,null,null,null,this);
            obj.set_taborder("23");
            obj.set_text("부서약어");
            this.addChild(obj.name, obj);

            obj = new Button("btn_edit_deptsecond","560","230","30","30",null,null,null,null,null,null,this);
            obj.set_taborder("24");
            obj.set_cssclass("edit_icon");
            this.addChild(obj.name, obj);

            obj = new Button("btn_edit_deptcolor","560","275","30","30",null,null,null,null,null,null,this);
            obj.set_taborder("25");
            obj.set_cssclass("edit_icon");
            this.addChild(obj.name, obj);

            obj = new Button("btn_edit_deptmaster","560","320","30","30",null,null,null,null,null,null,this);
            obj.set_taborder("26");
            obj.set_cssclass("edit_icon");
            this.addChild(obj.name, obj);

            obj = new Div("Div00","278","130","60","2",null,null,null,null,null,null,this);
            obj.set_taborder("27");
            obj.set_background("#b7b7b7");
            this.addChild(obj.name, obj);

            obj = new Div("Div02","20","190","190","2",null,null,null,null,null,null,this);
            obj.set_taborder("28");
            obj.set_background("#b7b7b7");
            this.addChild(obj.name, obj);

            obj = new Button("btn_upper","403","415","70","20",null,null,null,null,null,null,this);
            obj.set_taborder("29");
            obj.set_text("상위 부서명");
            obj.set_font("normal 8pt/normal \"Noto Sans KR\"");
            obj.set_cssclass("deptButton");
            this.addChild(obj.name, obj);

            obj = new Button("btn_submit","560","575","80","30",null,null,null,null,null,null,this);
            obj.set_taborder("30");
            obj.set_text("저장");
            obj.set_letterSpacing("0px");
            obj.set_cssclass("save");
            this.addChild(obj.name, obj);

            obj = new Button("btn_cancel","650","575","80","30",null,null,null,null,null,null,this);
            obj.set_taborder("31");
            obj.set_text("취소");
            obj.set_letterSpacing("0px");
            obj.set_cssclass("cancel");
            this.addChild(obj.name, obj);

            obj = new Edit("edt_deptname","394","185","133","30",null,null,null,null,null,null,this);
            obj.set_taborder("32");
            obj.set_visible("false");
            this.addChild(obj.name, obj);

            obj = new Button("btn_colorchartfromds","470","283","15","15",null,null,null,null,null,null,this);
            obj.set_taborder("33");
            obj.set_background("");
            this.addChild(obj.name, obj);

            obj = new Edit("edt_deptsecond","394","230","133","30",null,null,null,null,null,null,this);
            obj.set_taborder("34");
            obj.set_visible("false");
            this.addChild(obj.name, obj);

            obj = new MaskEdit("MaskEdit00","393","365","158","30",null,null,null,null,null,null,this);
            obj.set_taborder("35");
            obj.set_readonly("true");
            obj.set_background("transparent");
            obj.set_border("0px none");
            obj.set_type("string");
            obj.set_font("normal 10pt/normal \"Noto Sans KR\"");
            obj.set_format("@@@@@@@@");
            this.addChild(obj.name, obj);
            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",1080,720,this,function(p){});
            obj.set_mobileorientation("landscape");
            this.addLayout(obj.name, obj);
            
            // BindItem Information
            obj = new BindItem("item0","st_deptname2","text","ds_dept","deptName");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item1","st_deptcode2","text","ds_dept","deptCode");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item2","st_deptsecond2","text","ds_dept","deptSecondname");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item3","st_deptcolor2","text","ds_dept","deptColor");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item7","static_deptName","text","ds_dept","deptName");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item9","btn_colorchartfromds","background","ds_dept","deptColor");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item6","MaskEdit00","value","ds_dept","deptHiredate");
            this.addChild(obj.name, obj);
            obj.bind();
            
            // TriggerItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.registerScript("deptManage.xfdl", function() {
        //오늘 날짜
        var objDate = new nexacro.Date();
        var yy = objDate.getYear().toString().substr(2, 2);
        var mm = (objDate.getMonth()+1).toString().padLeft(2, "0");
        var dd = objDate.getDate().toString().padLeft(2, "0");
        var today = yy + "/"+mm+"/"+dd;

        //load 되었을 때
        this.deptManage_onload = function(obj,e)
        {
        //COLOR 가져오는 거 테스트 해봤음.
        //BINDING 하는 곳에서 BACKGROUND에 DEPT_COLOR 바인딩해서 해결.
        // trace(this.ds_dept.getColumn(this, "DEPT_COLOR"));
        // trace(this.btn_colorchartfromds.background);
        // this.btn_colorchartfromds.set_background(this.ds_dept.getColumn(this, "DEPT_COLOR"));

        //onload 했을 땐 상위부서가 없음 (최상위 그룹이라서)

        	this.st_upperdept.set_visible("false");
        	this.btn_upper.set_visible("false");
        	this.st_lowerdept.set_visible("false");

        	//load 되었을 때 DB에서 empl도 select 해오기
        	this.transaction(
        		"dept_select"// 1.ID
        		,"HirpURL::admin/deptInfo.hirp"// 2.URL
        		,"" // 3.InDs : F->S jsp(I,U,D)
        		,"ds_empl=out_empl ds_dept=out_dept" // 4.OutDs : S->F jsp(SELECT)
        		,"" // 5.InVar : F->S(var)
        		,"fn_callback_tran" // 6.callback function(transaction 완료시 호출되는 함수)
        	);

        	//load 되었을 때 master 아이디값과 같은 이름 set 해주기
        	var masterId = this.ds_dept.getColumn(this.ds_dept.rowposition, "deptMaster");
        	var masterName = this.ds_empl.lookup( "emplId", masterId, "emplName" );
        	trace("mastername:" + masterName);
        	this.st_deptmaster2.set_text(masterName);

        }

        var lowerCount = 0; //하위 부서 개수

        //ds_dept rowposition이 변경될 때
        //상위, 하위 부서 보였다 안보였다 하게 함.
        this.ds_dept_canrowposchange = function(obj,e)
        {
        	//하위 부서 버튼이 존재할 때 삭제함.
        	for(var i=0; i<lowerCount; i++)
        	{
        		var objBtn = this.components["btn_lower" + i];
        		objBtn.destroy(); //만들어진 버튼 삭제
        	}
        	//삭제 되고 나면 0으로 초기화
        	lowerCount = 0;

        	//master 아이디값과 같은 이름 set 해주기
        	var masterId = this.ds_dept.getColumn(e.newrow, "deptMaster");
        	trace("masterId cellpos:" + masterId);
        	var masterName = this.ds_empl.lookup("emplId", masterId, "emplName");
        	trace("mastername cellpos:" + masterName);
        	this.st_deptmaster2.set_text(masterName);


        	//상위부서 이름 가져오기
        	var upperCode = this.ds_dept.getColumn(e.newrow, "deptUppercode");
        	//trace("상위부서 코드:" + upperCode);
        	var myCode = this.ds_dept.getColumn(e.newrow, "deptCode");
        	trace(upperCode);
        	if(upperCode == null) {
        		//상위부서가 null일 때 상위, 하위부서 항목 visible false
        		this.st_upperdept.set_visible("false");
        		this.btn_upper.set_visible("false");
        		this.st_lowerdept.set_visible("false");
        	} else {
        		var upperRow = this.ds_dept.findRow("deptCode", upperCode);
        		trace("upperRow:" + upperRow); //상위부서 row num
        		//상위부서가 있을 때 상위부서 항목 visible true
        		this.st_upperdept.set_visible("true");
        		this.btn_upper.set_visible("true");
        		this.btn_upper.set_text(this.ds_dept.getColumn(upperRow, "deptName"));

        		//하위부서가 있을 때 if문 처리하기
        		var lowerCodeList = [];
        		var rowCount = this.ds_dept.rowcount;
        		for(var i = 0; i < rowCount ; i++) {
        			if(this.ds_dept.getColumn(i, "deptUppercode") == myCode){ //내 코드가 누군가의 상위부서 코드일 때
        				lowerCodeList[lowerCount] = this.ds_dept.getColumn(i, "deptCode"); //그 누군가의 부서 코드를 저장
        				lowerCount += 1;
        			}
        		}
        		trace("rowCount:" + rowCount);	//총 row 갯수
        		trace("lowerCount:" + lowerCount); //하위부서 갯수

        		if(lowerCount > 0) {
        			//하위부서가 존재할 때
        			this.st_lowerdept.set_visible("true");
        			//하위부서 갯수만큼 버튼 추가
        			var nX = 403;
        			var nY = 460;
        			for(var i=0; i < lowerCount ; i++)
        			{
        				var objBtn = new Button("btn_lower" + i, nX, nY, 70, 20);
        				this.addChild("btn_lower" + i, objBtn);
        				var name = this.ds_dept.lookup( "deptCode", lowerCodeList[i], "deptName" );
        				objBtn.set_text(name); //코드가 같은 부서의 이름
        				objBtn.set_cssclass("deptButton");
        				objBtn.setEventHandler("onclick", this.btn_lower_onclick, this);
        				objBtn.show();
        				nX += 80;
        			}

        		} else {
        			//하위부서가 존재하지 않을 때
        			this.st_lowerdept.set_visible("false");
        		}

        	}
        };


        //하위 부서 버튼을 클릭하면
        this.btn_lower_onclick = function(obj, e)
        {
        	trace("선택한 버튼 : " + obj.text);
        	var rowNum = this.ds_dept.findRow("deptName", obj.text);
        	this.ds_dept.set_rowposition(rowNum);
        }





        //부서 추가 팝업창 띄우기
        //부서 추가창에서 부서 정보로 추가해야함.
        this.btn_deptAdd_onclick = function(obj,e)
        {
        	var nLeft = system.clientToScreenX(this, 10);
            var nTop  = system.clientToScreenY(this, 10);

        	//ChildFrame.init(strName, nLeft, nTop, nWidth, nHeight [, nRight, nBottom [,strUrl]] )
        	var objChild = new ChildFrame("popDeptAdd", "absolute", nLeft, nTop, 300, 400);
        	objChild.set_formurl("FrameBase::deptAddPopup.xfdl");
        	objChild.set_openalign("center middle");
        	objChild.set_dragmovetype("all");
        	objChild.showModal(this.getOwnerFrame(), {"ds_color" : this.ds_color}, this, "fn_addCallback");
        };

        //추가 팝업 닫히면서 부서 추가 -- 색상 제외하고 완료
        this.fn_addCallback = function(id, rtn) {
        	trace(rtn);
        	//추가를 누르면 rtn이 값을 담은 string을 반환한다.
        	var nRow = this.ds_dept.rowposition;
        	if(rtn != "cancel"){
        		var sVal = rtn.split(":");
        		trace("deptname: " + sVal[0] + " deptcode: " + sVal[1] + " deptsecond: " + sVal[2] + " deptcolor: " + sVal[3]);
         		this.ds_dept.insertRow(nRow+1); //선택한 cell의 다음 위치에 삽입
        		this.ds_dept.setColumn(nRow+1,"deptCode",sVal[1]);
        		this.ds_dept.setColumn(nRow+1,"deptName",sVal[0]);
        		this.ds_dept.setColumn(nRow+1,"deptSecondname",sVal[2]);
        		this.ds_dept.setColumn(nRow+1,"deptColor",sVal[3]);

        		this.ds_dept.setColumn(nRow+1,"deptHiredate", today );
        		this.ds_dept.setColumn(nRow+1,"deptUppercode", this.ds_dept.getColumn(nRow, "deptCode"));
        		this.ds_dept.setColumn(nRow+1,"deptLevel", this.ds_dept.getColumn(nRow, "deptLevel") + 1);
        	}
        	//취소를 누르면 rtn이 cancel


        	//추가
        	this.transaction(
        		"dept_add"// 1.ID
        		,"HirpURL::admin/deptInsert.hirp"// 2.URL
        		,"in_dept=ds_dept:U" // 3.InDs : F->S jsp(I,U,D)
        		,"" // 4.OutDs : S->F jsp(SELECT)
        		,"" // 5.InVar : F->S(var)
        		,"fn_callback_tran" // 6.callback function(transaction 완료시 호출되는 함수)
        	);

        }

        //부서 삭제 팝업창 띄우기 -- 일단 ds에서 삭제 완료
        this.btn_delete_onclick = function(obj,e)
        {
        	var nLeft = system.clientToScreenX(this, 10);
            var nTop  = system.clientToScreenY(this, 10);

        	//ChildFrame.init(strName, nLeft, nTop, nWidth, nHeight [, nRight, nBottom [,strUrl]] )
        	var objChild = new ChildFrame("popDeptDelete", "absolute", nLeft, nTop, 300, 400);
        	objChild.set_formurl("FrameBase::deptDeletePopup.xfdl");
        	objChild.set_openalign("center middle");
        	objChild.set_dragmovetype("all");
        	objChild.showModal(this.getOwnerFrame(), {}, this, "fn_deleteCallback");
        };

        //삭제 팝업 닫히면서 삭제
        this.fn_deleteCallback = function(id, rtn){
        	trace(rtn);
        	//삭제를 누를 땐 rtn이 delete
        	if(rtn == "delete") {
        		this.ds_dept.deleteRow(this.ds_dept.rowposition);
        		//여기서 서버 연결해주어야 하나?

        		//삭제
        		this.transaction(
        			"dept_delete"// 1.ID
        			,"HirpURL::admin/deptDelete.hirp"// 2.URL
        			,"in_dept=ds_dept:U" // 3.InDs : F->S jsp(I,U,D)
        			,"" // 4.OutDs : S->F jsp(SELECT)
        			,"" // 5.InVar : F->S(var)
        			,"fn_callback_tran" // 6.callback function(transaction 완료시 호출되는 함수)
        		);
        	}
        	//취소를 누르면 rtn이 cancel


        }


        //검색 기능 (like) -- 완료
        this.btn_search_onclick = function(obj,e)
        {
        	var searchVal = this.edt_search.text;
        	trace(searchVal);
        	this.ds_dept.filter("deptName.indexOf('" + searchVal + "') > -1 ");
        };


        //저장 버튼
        this.btn_submit_onclick = function(obj,e)
        {
        	//edit에 있는 값을 ds에 저장
        	var nRow = this.ds_dept.rowposition;
        	var nName = this.edt_deptname.value;
        	var nSecond = this.edt_deptsecond.value;
        	var nMaster = this.st_deptmaster2.text; //master name 값

        	//trace(nName, nSecond);
        	if(nName != null){
        		trace(nName);
        		this.ds_dept.setColumn(nRow, "deptName", nName);
        	}
        	if(nSecond != null){
        		trace(nSecond);
        		this.ds_dept.setColumn(nRow, "deptSecondname", nSecond);
        	}

        	//master 아이디값과 같은 이름 set 해주기
        	var masterId = this.ds_empl.lookup("emplName", nMaster, "emplId");
         	trace("dept save master id:" + masterId);
         	this.ds_dept.setColumn(nRow, "deptMaster", masterId);

        	//color chart
        	//color값 편집중 일 때 (수정 버튼이 안 보일 때)
        	if(this.btn_edit_deptcolor.visible == false) {
        		//선택한 color값 가져오기
        		for(var i=0; i<this.ds_color.rowcount; i++)
        		{
        			var objBtn = this.components["btn_color" + i];
        			var bStatus = objBtn.getSelectStatus();

        			if(bStatus){ //status가 true일 때
        				trace("저장된 컬러:" + objBtn.background);
        				this.ds_dept.setColumn(nRow, "deptColor", objBtn.background);
        			}
        			objBtn.destroy(); //만들어진 버튼 삭제
        		}
        	}

        	//edit창 안 보이게 하기
        	this.edt_deptname.set_visible("false");
        	this.edt_deptsecond.set_visible("false");
        	//수정 버튼 보이게 하기
        	this.btn_edit_deptname.set_visible("true");
        	this.btn_edit_deptsecond.set_visible("true");
        	this.btn_edit_deptcolor.set_visible("true");

        	//저장
        	this.transaction(
        		"dept_save"// 1.ID
        		,"HirpURL::admin/deptSave.hirp"// 2.URL
        		,"in_dept=ds_dept:U" // 3.InDs : F->S jsp(I,U,D)
        		,"" // 4.OutDs : S->F jsp(SELECT)
        		,"" // 5.InVar : F->S(var)
        		,"fn_callback_tran" // 6.callback function(transaction 완료시 호출되는 함수)
        	);



        };

        //취소 버튼
        this.btn_cancel_onclick = function(obj,e)
        {
        	// edit 안에 있는 값 원래 ds에 있는 값으로 돌려놓기
        	var nRow = this.ds_dept.rowposition;
        	this.edt_deptname.set_value(this.ds_dept.getColumn(this.ds_dept.rowposition, "deptName"));
        	this.edt_deptsecond.set_value(this.ds_dept.getColumn(this.ds_dept.rowposition, "deptSecondname"));

        	//master 아이디값과 같은 이름 set 해주기
        	var masterId = this.ds_dept.getColumn(this.ds_dept.rowposition, "deptMaster");
        	trace("dept cancel master Id:" + masterId);
        	var masterName = this.ds_empl.lookup("emplId", masterId, "emplName");
        	trace("dept cancel master name:" + masterName);
        	this.st_deptmaster2.set_text(masterName);

        	this.edt_deptname.set_visible("false");
        	this.edt_deptsecond.set_visible("false");

        	//color chart
        	for(var i=0; i<this.ds_color.rowcount; i++)
        	{
        		var objBtn = this.components["btn_color" + i];
        		objBtn.destroy(); //만들어진 버튼 삭제
        	}

        	//수정 버튼 보이게 하기
        	this.btn_edit_deptname.set_visible("true");
        	this.btn_edit_deptsecond.set_visible("true");
        	this.btn_edit_deptcolor.set_visible("true");
        };


        //dept name 수정 버튼
        this.btn_edit_deptname_onclick = function(obj,e)
        {
        	//edit
        	this.edt_deptname.set_value(this.ds_dept.getColumn(this.ds_dept.rowposition, "deptName"));

        	this.edt_deptname.set_visible("true");
        	obj.set_visible("false");
        };

        //dept second name 수정 버튼
        this.btn_edit_deptsecond_onclick = function(obj,e)
        {
        	this.edt_deptsecond.set_value(this.ds_dept.getColumn(this.ds_dept.rowposition, "deptSecondname"));
        	this.edt_deptsecond.set_visible("true");
        	obj.set_visible("false");
        };

        //dept color 수정 버튼
        this.btn_edit_deptcolor_onclick = function(obj,e)
        {
        	obj.set_visible("false"); //수정 버튼 안 보이게 처리
        	var nX = 394;
        	var nY = 275;
        	for(var i=0; i<this.ds_color.rowcount; i++)
        	{
        		var objBtn = new Button("btn_color" + i, nX, nY, 15, 15);
        		this.addChild("btn_color" + i, objBtn);
        		objBtn.set_background(this.ds_color.getColumn(i, "COLOR_VAL"));
        		objBtn.setEventHandler("onclick", this.btn_color_onclick, this);
        		objBtn.show();
        		nX += 14;
        		if(i ==  11){
        			nX = 394;
        			nY += 14;
        		}
        	}
        };

        this.btn_color_onclick = function(obj, e)
        {
        	for(var i=0; i<this.ds_color.rowcount; i++)
        	{
        		var objBtn = this.components["btn_color" + i];
        		var bStatus = objBtn.getSelectStatus();

        		if(bStatus){ //status가 true 인 친구를 false로 바꿔줌.
        			objBtn.setSelectStatus(false);
        			objBtn.set_border("");
        			break;
        		}
        	}
        	obj.setSelectStatus(true);
        	obj.set_border("2px solid red");

        	trace("컬러: " + obj.background);
        }



        //dept Master 수정 버튼
        //dept master 선택창 띄우기
        this.btn_edit_deptmaster_onclick = function(obj,e)
        {
        	var nLeft = system.clientToScreenX(this, 10);
            var nTop  = system.clientToScreenY(this, 10);

        	//ChildFrame.init(strName, nLeft, nTop, nWidth, nHeight [, nRight, nBottom [,strUrl]] )
        	var objChild = new ChildFrame("popDeptDelete", "absolute", nLeft, nTop, 300, 400);
        	objChild.set_formurl("FrameBase::deptEmplListPopup.xfdl");
        	objChild.set_openalign("center middle");
        	objChild.set_dragmovetype("all");

        	var nRow = this.ds_dept.rowposition;
        	//현재 선택된 deptcode 넘겨줌
        	var deptCode = this.ds_dept.getColumn(nRow, "deptCode");
        	objChild.showModal(this.getOwnerFrame(), {"deptcode":deptCode, "ds_empl":this.ds_empl}, this, "fn_deptMasterEditCallback");
        };

        //부서장 수정 팝업 리턴
        this.fn_deptMasterEditCallback = function(id, rtn){
        	trace(rtn);
        	//저장 버튼 누르면 master 아이디 가져와서 deptMaster에 집어넣기
        	if(rtn != "cancel"){
        		//id값 가져옴
        		//임시로 static에 넣고 저장할 때 ds에 추가 되도록 (취소 누르면 원래 ds에 있는 값 출력)

        		//master 아이디값과 같은 이름 set 해주기
        		var name = this.ds_empl.lookup("emplId", rtn, "emplName");
        		trace("master update name:" + name);
        		this.st_deptmaster2.set_text(name);
        	}
        	//취소 버튼 누르면 cancel

        }

        //상위 부서 버튼
        this.btn_upper_onclick = function(obj,e)
        {
        	//상위부서 버튼 클릭 시 상위부서 정보 조회
        	var upperRow = this.ds_dept.findRow("deptName", this.btn_upper.text);
        	trace("상위부서 : " + this.btn_upper.text);
        	this.ds_dept.set_rowposition(upperRow);

        };


        //트랜잭션 callback 함수
        this.fn_callback_tran = function(id, nErrorCode, sErrorMsg)
        {
        	if(id=="dept_select")
        	{
        		if(nErrorCode < 0)
        		{
        			this.alert("부서 조회 실패 : " + sErrorMsg);
        			return;
        		}
        		this.alert("부서 조회 성공 : " + this.ds_dept.getRowCount() + "건");
        		this.alert("사원 조회 성공 : " + this.ds_empl.getRowCount() + "건");
        	}

        	if(id=="dept_add")
        	{
        		if(nErrorCode < 0)
        		{
        			this.alert("부서 추가 실패 : " + sErrorMsg);
        			return;
        		}
        		this.alert("부서 추가 성공 : " + this.ds_dept.getRowCount() + "건");
        	}

        	if(id=="dept_delete")
        	{
        		if(nErrorCode < 0)
        		{
        			this.alert("부서 삭제 실패 : " + sErrorMsg);
        			return;
        		}
        		this.alert("부서 삭제 성공 : " + this.ds_dept.getRowCount() + "건");
        	}

        	if(id=="dept_save")
        	{
        		if(nErrorCode < 0)
        		{
        			this.alert("부서 저장 실패 : " + sErrorMsg);
        			return;
        		}
        		this.alert("부서 저장 성공 : " + this.ds_dept.getRowCount() + "건");
        	}
        }

        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload",this.deptManage_onload,this);
            this.grid_deptList.addEventHandler("oncellclick",this.grid_deptList_oncellclick,this);
            this.btn_deptAdd.addEventHandler("onclick",this.btn_deptAdd_onclick,this);
            this.btn_delete.addEventHandler("onclick",this.btn_delete_onclick,this);
            this.edt_search.addEventHandler("onchanged",this.edt_search_onchanged,this);
            this.btn_search.addEventHandler("onclick",this.btn_search_onclick,this);
            this.btn_edit_deptname.addEventHandler("onclick",this.btn_edit_deptname_onclick,this);
            this.btn_edit_deptsecond.addEventHandler("onclick",this.btn_edit_deptsecond_onclick,this);
            this.btn_edit_deptcolor.addEventHandler("onclick",this.btn_edit_deptcolor_onclick,this);
            this.btn_edit_deptmaster.addEventHandler("onclick",this.btn_edit_deptmaster_onclick,this);
            this.btn_upper.addEventHandler("onclick",this.btn_upper_onclick,this);
            this.btn_submit.addEventHandler("onclick",this.btn_submit_onclick,this);
            this.btn_cancel.addEventHandler("onclick",this.btn_cancel_onclick,this);
            this.MaskEdit00.addEventHandler("onchanged",this.MaskEdit00_onchanged,this);
            this.ds_dept.addEventHandler("canrowposchange",this.ds_dept_canrowposchange,this);
        };
        this.loadIncludeScript("deptManage.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
