(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("emplApproval");
            this.set_titletext("New Form");
            this.set_scrolltype("none");
            if (Form == this.constructor)
            {
                this._setFormPosition(1280,720);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds_temp", this);
            obj._setContents("<ColumnInfo><Column id=\"emplName\" type=\"STRING\" size=\"20\"/><Column id=\"deptCode\" type=\"STRING\" size=\"20\"/><Column id=\"positionCode\" type=\"STRING\" size=\"20\"/><Column id=\"phoneNo\" type=\"STRING\" size=\"20\"/><Column id=\"detail\" type=\"STRING\" size=\"256\"/><Column id=\"emplId\" type=\"STRING\" size=\"20\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_dept", this);
            obj._setContents("<ColumnInfo><Column id=\"deptCode\" type=\"STRING\" size=\"20\"/><Column id=\"deptName\" type=\"STRING\" size=\"30\"/><Column id=\"deptSecondname\" type=\"STRING\" size=\"50\"/><Column id=\"deptColor\" type=\"STRING\" size=\"50\"/><Column id=\"deptMaster\" type=\"STRING\" size=\"20\"/><Column id=\"deptHiredate\" type=\"DATE\" size=\"20\"/><Column id=\"deptUppercode\" type=\"STRING\" size=\"20\"/><Column id=\"deptLevel\" type=\"INT\" size=\"20\"/></ColumnInfo><Rows><Row><Col id=\"deptCode\">10</Col><Col id=\"deptName\">하이그룹</Col><Col id=\"deptSecondname\">HIGRP</Col><Col id=\"deptColor\">#FFD8D8</Col><Col id=\"deptMaster\">id1</Col><Col id=\"deptHiredate\">20220426</Col><Col id=\"deptUppercode\">NULL</Col><Col id=\"deptLevel\">0</Col></Row><Row><Col id=\"deptCode\">1010</Col><Col id=\"deptName\">경영관리팀</Col><Col id=\"deptSecondname\">BM</Col><Col id=\"deptColor\">#FAE0D4</Col><Col id=\"deptMaster\">id2</Col><Col id=\"deptHiredate\">20220426</Col><Col id=\"deptUppercode\">10</Col><Col id=\"deptLevel\">1</Col></Row><Row><Col id=\"deptCode\">1020</Col><Col id=\"deptName\">영업팀</Col><Col id=\"deptSecondname\">SALES</Col><Col id=\"deptColor\">#FAECC5</Col><Col id=\"deptMaster\">id3</Col><Col id=\"deptHiredate\">20220426</Col><Col id=\"deptUppercode\">10</Col><Col id=\"deptLevel\">1</Col></Row><Row><Col id=\"deptCode\">102010</Col><Col id=\"deptName\">국내영업팀</Col><Col id=\"deptSecondname\">DS</Col><Col id=\"deptColor\">#FFFED7</Col><Col id=\"deptMaster\">ID4</Col><Col id=\"deptHiredate\">20220426</Col><Col id=\"deptUppercode\">1020</Col><Col id=\"deptLevel\">2</Col></Row><Row><Col id=\"deptCode\">102020</Col><Col id=\"deptName\">해외영업팀</Col><Col id=\"deptSecondname\">OS</Col><Col id=\"deptColor\">#FFFED7</Col><Col id=\"deptMaster\">ID5</Col><Col id=\"deptHiredate\">20220426</Col><Col id=\"deptUppercode\">1020</Col><Col id=\"deptLevel\">2</Col></Row><Row><Col id=\"deptCode\">102030</Col><Col id=\"deptName\">영업관리팀</Col><Col id=\"deptSecondname\">SM</Col><Col id=\"deptColor\">#FFFED7</Col><Col id=\"deptMaster\">ID6</Col><Col id=\"deptHiredate\">20220426</Col><Col id=\"deptUppercode\">1020</Col><Col id=\"deptLevel\">2</Col></Row><Row><Col id=\"deptCode\">1030</Col><Col id=\"deptName\">상품기획팀</Col><Col id=\"deptSecondname\">SOP</Col><Col id=\"deptColor\">#FAF4C0</Col><Col id=\"deptMaster\">ID7</Col><Col id=\"deptHiredate\">20220426</Col><Col id=\"deptUppercode\">10</Col><Col id=\"deptLevel\">1</Col></Row><Row><Col id=\"deptCode\">1040</Col><Col id=\"deptLevel\">1</Col><Col id=\"deptName\">구매팀</Col><Col id=\"deptSecondname\">PCD</Col><Col id=\"deptColor\">#E4F7BA</Col><Col id=\"deptMaster\">ID8</Col><Col id=\"deptHiredate\">20220426</Col><Col id=\"deptUppercode\">10</Col></Row><Row><Col id=\"deptCode\">1050</Col><Col id=\"deptLevel\">1</Col><Col id=\"deptName\">물류팀</Col><Col id=\"deptSecondname\">DTB</Col><Col id=\"deptColor\">#CEFBC9</Col><Col id=\"deptMaster\">ID9</Col><Col id=\"deptHiredate\">20220426</Col><Col id=\"deptUppercode\">10</Col></Row><Row><Col id=\"deptCode\">1060</Col><Col id=\"deptLevel\">1</Col><Col id=\"deptName\">품질팀</Col><Col id=\"deptSecondname\">QA</Col><Col id=\"deptColor\">#D4F4FA</Col><Col id=\"deptMaster\">ID10</Col><Col id=\"deptHiredate\">20220426</Col><Col id=\"deptUppercode\">10</Col></Row><Row><Col id=\"deptCode\">1070</Col><Col id=\"deptLevel\">1</Col><Col id=\"deptName\">생산팀</Col><Col id=\"deptSecondname\">PROD</Col><Col id=\"deptColor\">#D9E5FF</Col><Col id=\"deptMaster\">ID11</Col><Col id=\"deptHiredate\">20220426</Col><Col id=\"deptUppercode\">10</Col></Row><Row><Col id=\"deptCode\">107010</Col><Col id=\"deptLevel\">2</Col><Col id=\"deptName\">생산공정팀</Col><Col id=\"deptSecondname\">PRODP</Col><Col id=\"deptColor\">#EBF7FF</Col><Col id=\"deptMaster\">ID12</Col><Col id=\"deptHiredate\">20220426</Col><Col id=\"deptUppercode\">1070</Col></Row><Row><Col id=\"deptCode\">107020</Col><Col id=\"deptLevel\">2</Col><Col id=\"deptName\">생산관리팀</Col><Col id=\"deptSecondname\">PRODM</Col><Col id=\"deptColor\">#EBF7FF</Col><Col id=\"deptMaster\">ID13</Col><Col id=\"deptHiredate\">20220426</Col><Col id=\"deptUppercode\">1070</Col></Row><Row><Col id=\"deptCode\">107030</Col><Col id=\"deptLevel\">2</Col><Col id=\"deptName\">생산외주팀</Col><Col id=\"deptSecondname\">PRODOS</Col><Col id=\"deptColor\">#EBF7FF</Col><Col id=\"deptMaster\">ID14</Col><Col id=\"deptHiredate\">20220426</Col><Col id=\"deptUppercode\">1070</Col></Row><Row><Col id=\"deptCode\">1080</Col><Col id=\"deptLevel\">1</Col><Col id=\"deptName\">제조팀</Col><Col id=\"deptSecondname\">MFT</Col><Col id=\"deptColor\">#DAD9FF</Col><Col id=\"deptMaster\">ID15</Col><Col id=\"deptHiredate\">20220426</Col><Col id=\"deptUppercode\">10</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_pos", this);
            obj._setContents("<ColumnInfo><Column id=\"positionCode\" type=\"STRING\" size=\"20\"/><Column id=\"positionName\" type=\"STRING\" size=\"30\"/><Column id=\"positionUseMember\" type=\"INT\" size=\"256\"/><Column id=\"positionSequence\" type=\"INT\" size=\"256\"/><Column id=\"positionLevel\" type=\"INT\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Div("Div00","0","0","200","100.00%",null,null,null,null,null,null,this);
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
            obj.set_text("사원 추가");
            obj.set_padding("16px 20px");
            obj.set_font("bold 22px/normal \"Noto Sans KR\"");
            obj.set_letterSpacing("-1px");
            obj.set_border("0px none, 0px none, 1px solid #dddddd");
            this.addChild(obj.name, obj);

            obj = new Static("Static01","200","60","1080","50",null,null,null,null,null,null,this);
            obj.set_taborder("3");
            obj.set_text("가입승인 대기열");
            obj.set_font("bold 16px/normal \"Noto Sans KR\"");
            obj.set_padding("16px 20px 10px 20px");
            this.addChild(obj.name, obj);

            obj = new Grid("Grid00","220","106",null,"344","20",null,null,null,null,null,this);
            obj.set_taborder("4");
            obj.set_binddataset("ds_temp");
            obj.set_autofittype("col");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"0\"/><Column size=\"80\"/></Columns><Rows><Row size=\"36\" band=\"head\"/><Row size=\"36\"/></Rows><Band id=\"head\"><Cell text=\"사원명\" color=\"#333333\" border=\"0px none,0px none,1px solid #cccccc\"/><Cell col=\"1\" text=\"소속부서\" color=\"#333333\" border=\"0px none,0px none,1px solid #cccccc\"/><Cell col=\"2\" text=\"직급\" color=\"#333333\" border=\"0px none,0px none,1px solid #cccccc\"/><Cell col=\"3\" text=\"휴대전화번호\" color=\"#333333\" border=\"0px none,0px none,1px solid #cccccc\"/><Cell col=\"4\" text=\"상세보기\" color=\"#333333\" border=\"0px none,0px none,1px solid #cccccc\"/><Cell col=\"5\" text=\"emplId\" color=\"#333333\" border=\"0px none,0px none,1px solid #cccccc\"/><Cell col=\"6\" text=\"가입승인\" color=\"#333333\" border=\"0px none,0px none,1px solid #cccccc\"/></Band><Band id=\"body\"><Cell text=\"bind:emplName\" border=\"0px none,0px none,1px solid #cccccc\" textAlign=\"center\"/><Cell col=\"1\" text=\"bind:deptCode\" border=\"0px none,0px none,1px solid #cccccc\" textAlign=\"center\" displaytype=\"combotext\" edittype=\"combo\" combodataset=\"ds_dept\" combodatacol=\"deptName\" combocodecol=\"deptCode\"/><Cell col=\"2\" text=\"bind:positionCode\" border=\"0px none,0px none,1px solid #cccccc\" textAlign=\"center\" combodataset=\"ds_pos\" combodatacol=\"positionName\" combocodecol=\"positionCode\" displaytype=\"combotext\" edittype=\"combo\"/><Cell col=\"3\" text=\"bind:phoneNo\" border=\"0px none,0px none,1px solid #cccccc\" textAlign=\"center\"/><Cell col=\"4\" text=\"보기/수정\" border=\"0px none,0px none,1px solid #cccccc\" displaytype=\"buttoncontrol\" padding=\"6px 26px\" textAlign=\"center\"/><Cell col=\"5\" text=\"bind:emplId\" border=\"0px none,0px none,1px solid #cccccc\" textAlign=\"center\"/><Cell col=\"6\" text=\"승인\" border=\"0px none,0px none,1px solid #cccccc\" displaytype=\"buttoncontrol\" padding=\"6px 26px\" textAlign=\"center\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new Static("link_emplLsit","24","85","200","20",null,null,null,null,null,null,this);
            obj.set_taborder("5");
            obj.set_text("사원 조회");
            obj.set_font("normal 14px/normal \"Noto Sans KR\"");
            obj.set_padding("0px");
            this.addChild(obj.name, obj);

            obj = new Static("link_addEmpl","24","120","106","20",null,null,null,null,null,null,this);
            obj.set_taborder("6");
            obj.set_text("사원 추가/승인");
            obj.set_font("bold 14px/normal \"Noto Sans KR\"");
            obj.set_padding("0px");
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
        this.registerScript("emplApproval.xfdl", function() {
        // 메뉴이동 함수
        this.link_emplLsit_onclick = function(obj,e)
        {
        	this.go("FrameBase::emplList.xfdl");
        };

        this.link_addEmpl_onclick = function(obj,e)
        {
        	this.go("FrameBase::emplApproval.xfdl");
        };

        // 임시회원 조회
        this.ds_empl_onload = function(obj,e)
        {
        	this.transaction(
        		"tr_select"// 1.ID
        		,"HirpURL::admin/tempEmplList.hirp"// 2.URL
        		,"" // 3.InDs : F->S jsp(I,U,D)
        		,"ds_temp=out_temp ds_dept=out_dept ds_pos=out_pos" // 4.OutDs : S->F jsp(SELECT)
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

        // 회원 상세 정보 페이지 로드
        this.empl_detail_oncellclick = function(obj,e)
        {
        	selectedEmplId = this.Grid00.getCellText(e.row, 5);
        	if(e.col == 4) {
        		this.go("FrameBase::empDetail.xfdl");
        	}
        	else if(e.col == 6) {
        		this.transaction(
        			"tr_update"// 1.ID
        			,"HirpURL::admin/emplLevelUp.hirp"// 2.URL
        			,"" // 3.InDs : F->S jsp(I,U,D)
        			,"" // 4.OutDs : S->F jsp(SELECT)
        			,"emplId="+selectedEmplId // 5.InVar : F->S(var)
        			,"fn_callback_tran" // 6.callback function(transaction 완료시 호출되는 함수)
        		);
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
            this.link_emplLsit.addEventHandler("onclick",this.link_emplLsit_onclick,this);
            this.link_addEmpl.addEventHandler("onclick",this.link_addEmpl_onclick,this);
            this.ds_temp.addEventHandler("onload",this.ds_empl_onload,this);
            this.ds_dept.addEventHandler("canrowposchange",this.ds_dept_canrowposchange,this);
        };
        this.loadIncludeScript("emplApproval.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
