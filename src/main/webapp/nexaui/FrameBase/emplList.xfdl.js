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
            this.set_scrolltype("none");
            if (Form == this.constructor)
            {
                this._setFormPosition(1280,720);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds_empl", this);
            obj._setContents("<ColumnInfo><Column id=\"emplName\" type=\"STRING\" size=\"20\"/><Column id=\"deptCode\" type=\"STRING\" size=\"20\"/><Column id=\"positionCode\" type=\"STRING\" size=\"20\"/><Column id=\"directNo\" type=\"STRING\" size=\"20\"/><Column id=\"detail\" type=\"STRING\" size=\"256\"/><Column id=\"emplId\" type=\"STRING\" size=\"20\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_retiree", this);
            obj._setContents("<ColumnInfo><Column id=\"emplName\" type=\"STRING\" size=\"256\"/><Column id=\"deptCode\" type=\"STRING\" size=\"256\"/><Column id=\"positionCode\" type=\"STRING\" size=\"256\"/><Column id=\"phoneNo\" type=\"STRING\" size=\"256\"/><Column id=\"detail\" type=\"STRING\" size=\"256\"/><Column id=\"emplId\" type=\"STRING\" size=\"20\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_dept", this);
            obj._setContents("<ColumnInfo><Column id=\"deptCode\" type=\"STRING\" size=\"20\"/><Column id=\"deptName\" type=\"STRING\" size=\"30\"/><Column id=\"deptSecondname\" type=\"STRING\" size=\"50\"/><Column id=\"deptColor\" type=\"STRING\" size=\"50\"/><Column id=\"deptMaster\" type=\"STRING\" size=\"20\"/><Column id=\"deptHiredate\" type=\"DATE\" size=\"20\"/><Column id=\"deptUppercode\" type=\"STRING\" size=\"20\"/><Column id=\"deptLevel\" type=\"INT\" size=\"20\"/></ColumnInfo><Rows><Row><Col id=\"deptCode\">10</Col><Col id=\"deptName\">하이그룹</Col><Col id=\"deptSecondname\">HIGRP</Col><Col id=\"deptColor\">#FFD8D8</Col><Col id=\"deptMaster\">id1</Col><Col id=\"deptHiredate\">20220426</Col><Col id=\"deptUppercode\">NULL</Col><Col id=\"deptLevel\">0</Col></Row><Row><Col id=\"deptCode\">1010</Col><Col id=\"deptName\">경영관리팀</Col><Col id=\"deptSecondname\">BM</Col><Col id=\"deptColor\">#FAE0D4</Col><Col id=\"deptMaster\">id2</Col><Col id=\"deptHiredate\">20220426</Col><Col id=\"deptUppercode\">10</Col><Col id=\"deptLevel\">1</Col></Row><Row><Col id=\"deptCode\">1020</Col><Col id=\"deptName\">영업팀</Col><Col id=\"deptSecondname\">SALES</Col><Col id=\"deptColor\">#FAECC5</Col><Col id=\"deptMaster\">id3</Col><Col id=\"deptHiredate\">20220426</Col><Col id=\"deptUppercode\">10</Col><Col id=\"deptLevel\">1</Col></Row><Row><Col id=\"deptCode\">102010</Col><Col id=\"deptName\">국내영업팀</Col><Col id=\"deptSecondname\">DS</Col><Col id=\"deptColor\">#FFFED7</Col><Col id=\"deptMaster\">ID4</Col><Col id=\"deptHiredate\">20220426</Col><Col id=\"deptUppercode\">1020</Col><Col id=\"deptLevel\">2</Col></Row><Row><Col id=\"deptCode\">102020</Col><Col id=\"deptName\">해외영업팀</Col><Col id=\"deptSecondname\">OS</Col><Col id=\"deptColor\">#FFFED7</Col><Col id=\"deptMaster\">ID5</Col><Col id=\"deptHiredate\">20220426</Col><Col id=\"deptUppercode\">1020</Col><Col id=\"deptLevel\">2</Col></Row><Row><Col id=\"deptCode\">102030</Col><Col id=\"deptName\">영업관리팀</Col><Col id=\"deptSecondname\">SM</Col><Col id=\"deptColor\">#FFFED7</Col><Col id=\"deptMaster\">ID6</Col><Col id=\"deptHiredate\">20220426</Col><Col id=\"deptUppercode\">1020</Col><Col id=\"deptLevel\">2</Col></Row><Row><Col id=\"deptCode\">1030</Col><Col id=\"deptName\">상품기획팀</Col><Col id=\"deptSecondname\">SOP</Col><Col id=\"deptColor\">#FAF4C0</Col><Col id=\"deptMaster\">ID7</Col><Col id=\"deptHiredate\">20220426</Col><Col id=\"deptUppercode\">10</Col><Col id=\"deptLevel\">1</Col></Row><Row><Col id=\"deptCode\">1040</Col><Col id=\"deptLevel\">1</Col><Col id=\"deptName\">구매팀</Col><Col id=\"deptSecondname\">PCD</Col><Col id=\"deptColor\">#E4F7BA</Col><Col id=\"deptMaster\">ID8</Col><Col id=\"deptHiredate\">20220426</Col><Col id=\"deptUppercode\">10</Col></Row><Row><Col id=\"deptCode\">1050</Col><Col id=\"deptLevel\">1</Col><Col id=\"deptName\">물류팀</Col><Col id=\"deptSecondname\">DTB</Col><Col id=\"deptColor\">#CEFBC9</Col><Col id=\"deptMaster\">ID9</Col><Col id=\"deptHiredate\">20220426</Col><Col id=\"deptUppercode\">10</Col></Row><Row><Col id=\"deptCode\">1060</Col><Col id=\"deptLevel\">1</Col><Col id=\"deptName\">품질팀</Col><Col id=\"deptSecondname\">QA</Col><Col id=\"deptColor\">#D4F4FA</Col><Col id=\"deptMaster\">ID10</Col><Col id=\"deptHiredate\">20220426</Col><Col id=\"deptUppercode\">10</Col></Row><Row><Col id=\"deptCode\">1070</Col><Col id=\"deptLevel\">1</Col><Col id=\"deptName\">생산팀</Col><Col id=\"deptSecondname\">PROD</Col><Col id=\"deptColor\">#D9E5FF</Col><Col id=\"deptMaster\">ID11</Col><Col id=\"deptHiredate\">20220426</Col><Col id=\"deptUppercode\">10</Col></Row><Row><Col id=\"deptCode\">107010</Col><Col id=\"deptLevel\">2</Col><Col id=\"deptName\">생산공정팀</Col><Col id=\"deptSecondname\">PRODP</Col><Col id=\"deptColor\">#EBF7FF</Col><Col id=\"deptMaster\">ID12</Col><Col id=\"deptHiredate\">20220426</Col><Col id=\"deptUppercode\">1070</Col></Row><Row><Col id=\"deptCode\">107020</Col><Col id=\"deptLevel\">2</Col><Col id=\"deptName\">생산관리팀</Col><Col id=\"deptSecondname\">PRODM</Col><Col id=\"deptColor\">#EBF7FF</Col><Col id=\"deptMaster\">ID13</Col><Col id=\"deptHiredate\">20220426</Col><Col id=\"deptUppercode\">1070</Col></Row><Row><Col id=\"deptCode\">107030</Col><Col id=\"deptLevel\">2</Col><Col id=\"deptName\">생산외주팀</Col><Col id=\"deptSecondname\">PRODOS</Col><Col id=\"deptColor\">#EBF7FF</Col><Col id=\"deptMaster\">ID14</Col><Col id=\"deptHiredate\">20220426</Col><Col id=\"deptUppercode\">1070</Col></Row><Row><Col id=\"deptCode\">1080</Col><Col id=\"deptLevel\">1</Col><Col id=\"deptName\">제조팀</Col><Col id=\"deptSecondname\">MFT</Col><Col id=\"deptColor\">#DAD9FF</Col><Col id=\"deptMaster\">ID15</Col><Col id=\"deptHiredate\">20220426</Col><Col id=\"deptUppercode\">10</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_pos", this);
            obj._setContents("<ColumnInfo><Column id=\"positionCode\" type=\"STRING\" size=\"20\"/><Column id=\"positionName\" type=\"STRING\" size=\"30\"/><Column id=\"positionUseMember\" type=\"INT\" size=\"256\"/><Column id=\"positionSequence\" type=\"INT\" size=\"256\"/><Column id=\"positionLevel\" type=\"INT\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);
            
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

            obj = new Static("Static00_00","200","0",null,"60","0",null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_text("사원 목록 조회");
            obj.set_padding("16px 20px");
            obj.set_font("bold 22px/normal \"Noto Sans KR\"");
            obj.set_letterSpacing("-1px");
            obj.set_border("0px none, 0px none, 1px solid #dddddd");
            this.addChild(obj.name, obj);

            obj = new Static("Static01","200","60","1080","50",null,null,null,null,null,null,this);
            obj.set_taborder("3");
            obj.set_text("재직자 목록");
            obj.set_font("bold 16px/normal \"Noto Sans KR\"");
            obj.set_padding("16px 20px 10px 20px");
            this.addChild(obj.name, obj);

            obj = new Grid("Grid00","220","106",null,"240","20",null,null,null,null,null,this);
            obj.set_taborder("4");
            obj.set_binddataset("ds_empl");
            obj.set_autofittype("col");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"100\"/><Column size=\"100\"/><Column size=\"100\"/><Column size=\"100\"/><Column size=\"90\"/><Column size=\"0\"/></Columns><Rows><Row size=\"32\" band=\"head\"/><Row size=\"35\"/></Rows><Band id=\"head\"><Cell text=\"이름\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #cccccc\" color=\"#333333\"/><Cell col=\"1\" text=\"부서\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #cccccc\" color=\"#333333\"/><Cell col=\"2\" text=\"직급\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #cccccc\" color=\"#333333\"/><Cell col=\"3\" text=\"직통번호\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #cccccc\" color=\"#333333\"/><Cell col=\"4\" text=\"상세정보\" background=\"#ffffff\" border=\"0px none, 0px none, 1px solid #cccccc\" color=\"#333333\"/><Cell col=\"5\" text=\"사원ID\" color=\"#333333\"/></Band><Band id=\"body\"><Cell text=\"bind:emplName\" padding=\"8px 16px\" textAlign=\"center\" border=\"0px none, 0px none, 1px solid #cccccc\"/><Cell col=\"1\" text=\"bind:deptCode\" padding=\"8px 16px\" textAlign=\"center\" border=\"0px none, 0px none, 1px solid #cccccc\" cssclass=\"deptCode\" displaytype=\"combotext\" edittype=\"combo\" font=\"normal 12px/normal &quot;Noto Sans KR&quot;\" combodataset=\"ds_dept\" combodatacol=\"deptName\" combocodecol=\"deptCode\"/><Cell col=\"2\" text=\"bind:positionCode\" padding=\"8px 16px\" textAlign=\"center\" border=\"0px none, 0px none, 1px solid #cccccc\" displaytype=\"combotext\" edittype=\"combo\" combodataset=\"ds_pos\" combodatacol=\"positionName\" combocodecol=\"positionCode\"/><Cell col=\"3\" text=\"bind:directNo\" padding=\"8px 16px\" textAlign=\"center\" border=\"0px none, 0px none, 1px solid #cccccc\"/><Cell col=\"4\" textAlign=\"center\" border=\"0px none, 0px none, 1px solid #cccccc\" displaytype=\"buttoncontrol\" text=\"조회/수정\" edittype=\"button\" cssclass=\"basic\" padding=\"6px 20px\"/><Cell col=\"5\" text=\"bind:emplId\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new Static("Static01_00","200","386","1080","40",null,null,null,null,null,null,this);
            obj.set_taborder("5");
            obj.set_text("퇴사자 목록");
            obj.set_font("bold 16px/normal \"Noto Sans KR\"");
            obj.set_padding("16px 20px 10px 20px");
            this.addChild(obj.name, obj);

            obj = new Grid("Grid00_00","220","432",null,"240","20",null,null,null,null,null,this);
            obj.set_taborder("6");
            obj.set_binddataset("ds_retiree");
            obj.set_autofittype("col");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"100\"/><Column size=\"100\"/><Column size=\"100\"/><Column size=\"100\"/><Column size=\"90\"/><Column size=\"0\"/></Columns><Rows><Row size=\"32\" band=\"head\"/><Row size=\"35\"/></Rows><Band id=\"head\"><Cell text=\"이름\" color=\"#333333\" border=\"0px none,0px none,1px solid #cccccc\"/><Cell col=\"1\" text=\"부서\" color=\"#333333\" border=\"0px none,0px none,1px solid #cccccc\"/><Cell col=\"2\" text=\"직급\" color=\"#333333\" border=\"0px none,0px none,1px solid #cccccc\"/><Cell col=\"3\" text=\"연락처\" color=\"#333333\" border=\"0px none,0px none,1px solid #cccccc\"/><Cell col=\"4\" text=\"상세정보\" color=\"#333333\" border=\"1px solid #cccccc,0px none,1px solid #cccccc,1px solid #cccccc\"/><Cell col=\"5\" text=\"사원아이디\"/></Band><Band id=\"body\"><Cell text=\"bind:emplName\" textAlign=\"center\" border=\"1px solid #cccccc,0px none\"/><Cell col=\"1\" text=\"bind:deptCode\" textAlign=\"center\" displaytype=\"combotext\" edittype=\"combo\" combodataset=\"ds_dept\" combodatacol=\"deptName\" combocodecol=\"deptCode\" border=\"1px solid #cccccc,0px none\"/><Cell col=\"2\" text=\"bind:positionCode\" textAlign=\"center\" border=\"1px solid #cccccc,0px none\" displaytype=\"combotext\" edittype=\"combo\" combodataset=\"ds_pos\" combodatacol=\"positionName\" combocodecol=\"positionCode\"/><Cell col=\"3\" text=\"bind:phoneNo\" textAlign=\"center\" border=\"1px solid #cccccc,0px none\"/><Cell col=\"4\" textAlign=\"center\" text=\"조회/수정\" displaytype=\"buttoncontrol\" edittype=\"button\" border=\"1px solid #cccccc,0px none,1px solid #cccccc,1px solid #dbdee2\" borderRadius=\"0px none\" padding=\"6px 20px\"/><Cell col=\"5\" text=\"bind:emplId\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new Edit("edt_search",null,"70","162","30","20",null,null,null,null,null,this);
            obj.set_taborder("7");
            obj.set_displaynulltext("재직자 이름 검색");
            this.addChild(obj.name, obj);

            obj = new Button("btn_search_empl",null,"70","28","28","21",null,null,null,null,null,this);
            obj.set_taborder("8");
            obj.set_cssclass("search");
            obj.set_text("");
            this.addChild(obj.name, obj);

            obj = new Static("link_emplLsit","24","85","200","20",null,null,null,null,null,null,this);
            obj.set_taborder("9");
            obj.set_text("사원 조회");
            obj.set_font("bold 14px/normal \"Noto Sans KR\"");
            obj.set_padding("0px");
            this.addChild(obj.name, obj);

            obj = new Static("link_addEmpl","24","120","106","20",null,null,null,null,null,null,this);
            obj.set_taborder("10");
            obj.set_text("사원 추가/승인");
            obj.set_font("14px/normal \"Noto Sans KR\"");
            obj.set_padding("0px");
            this.addChild(obj.name, obj);

            obj = new Edit("edt_search_retiree",null,"395","162","30","21",null,null,null,null,null,this);
            obj.set_taborder("12");
            obj.set_displaynulltext("퇴사자 이름 검색");
            this.addChild(obj.name, obj);

            obj = new Button("btn_search_retiree",null,"395","28","28","22",null,null,null,null,null,this);
            obj.set_taborder("11");
            obj.set_cssclass("search");
            obj.set_text("");
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
        this.registerScript("emplList.xfdl", function() {
        // 메뉴 이동 함수
        this.link_emplLsit_onclick = function(obj,e)
        {
        	this.go("FrameBase::emplList.xfdl");
        };

        // 메뉴 이동 함수2
        this.link_addEmpl_onclick = function(obj,e)
        {
        	this.go("FrameBase::emplApproval.xfdl");
        };

        // 재직자 및 퇴직자 조회
        this.ds_empl_onload = function(obj,e)
        {
        	this.transaction(
        		"tr_select"// 1.ID
        		,"HirpURL::admin/emplinfo.hirp"// 2.URL
        		,"" // 3.InDs : F->S jsp(I,U,D)
        		,"ds_empl=out_empl ds_retiree=out_retiree ds_dept=out_dept ds_pos=out_pos" // 4.OutDs : S->F jsp(SELECT)
        		,"" // 5.InVar : F->S(var)
        		,"fn_callback_tran" // 6.callback function(transaction 완료시 호출되는 함수)
        	);
        };

        // 결과 체크 콜백 함수
        this.fn_callback_tran = function(id, nErrorCode, sErrorMsg)
        {
        	if(id=="tr_select")
        	{
        		if(nErrorCode < 0)
        		{
        			this.alert("사원 조회 실패 : " + sErrorMsg);
        			return;
        		}
        		this.alert("사원 조회 성공");
        	}
        }

        // 재직자 검색(돋보기 버튼 클릭 시)
        this.btn_search_empl_onclick = function(obj,e)
        {
        	var searchVal = this.edt_search.value;
        	this.ds_empl.filter("emplName.indexOf('" + searchVal + "') > -1 ");
        };

        // 재직자 검색(돋보기 버튼 클릭 시)
        this.btn_search_retiree_onclick = function(obj,e)
        {
        	var searchVal = this.edt_search_retiree.value;
        	this.ds_retiree.filter("emplName.indexOf('" + searchVal + "') > -1 ");
        };

        // 페이지 로드용 emplId 전역 변수 지정
        this.selectedEmplId;

        // 회원(재직자)별 상세 정보 페이지 로드
        this.empl_detail_oncellclick = function(obj,e)
        {
        	selectedEmplId = this.Grid00.getCellText(e.row, 5);
        	if(e.col == 4) {
        		this.go("FrameBase::empDetail.xfdl");
        	}
        };

        // 회원(퇴사자)별 상세 정보 페이지 로드
        this.retiree_detail_oncellclick = function(obj,e)
        {
        	selectedEmplId = this.Grid00_00.getCellText(e.row, 5);
        	if(e.col == 4) {
        		this.go("FrameBase::empDetail.xfdl");
        	}
        };


        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.Static00.addEventHandler("onclick",this.Static00_onclick,this);
            this.Static00_00.addEventHandler("onclick",this.Static00_onclick,this);
            this.Static01.addEventHandler("onclick",this.Static01_onclick,this);
            this.Grid00.addEventHandler("oncellclick",this.empl_detail_oncellclick,this);
            this.Static01_00.addEventHandler("onclick",this.Static01_onclick,this);
            this.Grid00_00.addEventHandler("oncellclick",this.retiree_detail_oncellclick,this);
            this.edt_search.addEventHandler("onchanged",this.edt_search_onchanged,this);
            this.btn_search_empl.addEventHandler("onclick",this.btn_search_empl_onclick,this);
            this.link_emplLsit.addEventHandler("onclick",this.link_emplLsit_onclick,this);
            this.link_addEmpl.addEventHandler("onclick",this.link_addEmpl_onclick,this);
            this.edt_search_retiree.addEventHandler("onchanged",this.edt_search_onchanged,this);
            this.btn_search_retiree.addEventHandler("onclick",this.btn_search_retiree_onclick,this);
            this.ds_empl.addEventHandler("onload",this.ds_empl_onload,this);
            this.ds_dept.addEventHandler("canrowposchange",this.ds_dept_canrowposchange,this);
        };
        this.loadIncludeScript("emplList.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
