(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("timeModify");
            this.set_titletext("New Form");
            this.set_scrolltype("none");
            if (Form == this.constructor)
            {
                this._setFormPosition(1280,720);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("timeModify", this);
            obj._setContents("<ColumnInfo><Column id=\"timemNo\" type=\"INT\" size=\"256\"/><Column id=\"timeNo\" type=\"INT\" size=\"256\"/><Column id=\"timemDepartment\" type=\"STRING\" size=\"100\"/><Column id=\"emplId\" type=\"STRING\" size=\"20\"/><Column id=\"timemName\" type=\"STRING\" size=\"20\"/><Column id=\"timemTitle\" type=\"STRING\" size=\"100\"/><Column id=\"timemStart\" type=\"DATE\" size=\"256\"/><Column id=\"timemEnd\" type=\"DATE\" size=\"256\"/><Column id=\"timemContent\" type=\"STRING\" size=\"1000\"/><Column id=\"timemDate\" type=\"DATE\" size=\"256\"/><Column id=\"timemBefore\" type=\"STRING\" size=\"100\"/><Column id=\"timemAfter\" type=\"STRING\" size=\"100\"/></ColumnInfo>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Div("Div00","0","4","200","99.31%",null,null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_background("#ffffff");
            obj.set_border("0px none, 1px solid #dddddd, 0px none, 0px none");
            obj.set_font("12px/normal \"Noto Sans KR\"");
            obj.set_text("");
            this.addChild(obj.name, obj);

            obj = new Static("Static00","0","0","200","60",null,null,null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_text("관리자 근태관리");
            obj.set_padding("16x 24px");
            obj.set_font("bold 22px/normal \"Noto Sans KR\"");
            obj.set_letterSpacing("-1px");
            this.addChild(obj.name, obj);

            obj = new Static("link_emplLsit","19","76","200","20",null,null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_text("전사 근태관리");
            obj.set_font("bold 16px/normal \"Noto Sans KR\"");
            obj.set_padding("0px");
            this.addChild(obj.name, obj);

            obj = new Grid("Grid00","220","106",null,"568","20",null,null,null,null,null,this);
            obj.set_taborder("3");
            obj.set_binddataset("timeModify");
            obj.set_autofittype("col");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell text=\"근태조정번호\" border=\"0px none, 0px none, 1px solid #cccccc\" color=\"black\"/><Cell col=\"1\" text=\"근태번호\" border=\"0px none, 0px none, 1px solid #cccccc\" color=\"black\"/><Cell col=\"2\" text=\"부서\" border=\"0px none, 0px none, 1px solid #cccccc\" color=\"black\"/><Cell col=\"3\" text=\"아이디\" border=\"0px none, 0px none, 1px solid #cccccc\" color=\"black\"/><Cell col=\"4\" text=\"이름\" border=\"0px none, 0px none, 1px solid #cccccc\" color=\"black\"/><Cell col=\"5\" text=\"제목\" border=\"0px none, 0px none, 1px solid #cccccc\" color=\"black\"/><Cell col=\"6\" text=\"출근시간\" border=\"0px none, 0px none, 1px solid #cccccc\" color=\"black\"/><Cell col=\"7\" text=\"퇴근시간\" border=\"0px none, 0px none, 1px solid #cccccc\" color=\"black\"/><Cell col=\"8\" text=\"변경사유\" border=\"0px none, 0px none, 1px solid #cccccc\" color=\"black\"/><Cell col=\"9\" text=\"조정일자\" border=\"0px none, 0px none, 1px solid #cccccc\" color=\"black\"/><Cell col=\"10\" text=\"조정전\" border=\"0px none, 0px none, 1px solid #cccccc\" color=\"black\"/><Cell col=\"11\" text=\"조정후\" border=\"0px none, 0px none, 1px solid #cccccc\" color=\"black\"/></Band><Band id=\"body\"><Cell text=\"bind:timemNo\"/><Cell col=\"1\" text=\"bind:timeNo\"/><Cell col=\"2\" text=\"bind:timemDepartment\"/><Cell col=\"3\" text=\"bind:emplId\"/><Cell col=\"4\" text=\"bind:timemName\"/><Cell col=\"5\" text=\"bind:timemTitle\"/><Cell col=\"6\" text=\"bind:timemStart\"/><Cell col=\"7\" text=\"bind:timemEnd\"/><Cell col=\"8\" text=\"bind:timemContent\"/><Cell col=\"9\" text=\"bind:timemDate\" displaytype=\"none\"/><Cell col=\"10\" text=\"bind:timemBefore\"/><Cell col=\"11\" text=\"bind:timemAfter\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new Static("link_addEmpl00","29","105","136","18",null,null,null,null,null,null,this);
            obj.set_taborder("4");
            obj.set_text("출/퇴근 내역 조회");
            obj.set_font("14px/normal \"Noto Sans KR\"");
            obj.set_padding("0px");
            obj.set_cursor("pointer");
            this.addChild(obj.name, obj);

            obj = new Static("link_addEmpl00_00","29","127","136","18",null,null,null,null,null,null,this);
            obj.set_taborder("5");
            obj.set_text("연차 신청 내역 조회");
            obj.set_font("14px/normal \"Noto Sans KR\"");
            obj.set_padding("0px");
            obj.set_cursor("pointer");
            this.addChild(obj.name, obj);

            obj = new Static("link_emplLsit00","19","176","200","20",null,null,null,null,null,null,this);
            obj.set_taborder("6");
            obj.set_text("전사 근태관리");
            obj.set_font("bold 16px/normal \"Noto Sans KR\"");
            obj.set_padding("0px");
            this.addChild(obj.name, obj);

            obj = new Static("link_addEmpl00_01","29","205","171","18",null,null,null,null,null,null,this);
            obj.set_taborder("7");
            obj.set_text("근태 조정 신청 내역 조회");
            obj.set_font("bold 14px/normal \"Noto Sans KR\"");
            obj.set_padding("0px");
            obj.set_cursor("pointer");
            this.addChild(obj.name, obj);

            obj = new Static("Static00_00","200","0",null,"60","0",null,null,null,null,null,this);
            obj.set_taborder("8");
            obj.set_text("전사 근태관리");
            obj.set_padding("16px 20px");
            obj.set_font("bold 22px/normal \"Noto Sans KR\"");
            obj.set_letterSpacing("-1px");
            obj.set_border("0px none, 0px none, 1px solid #dddddd");
            this.addChild(obj.name, obj);

            obj = new Static("Static01","200","60","1080","50",null,null,null,null,null,null,this);
            obj.set_taborder("9");
            obj.set_text("근태 조정 신청 내역 조회");
            obj.set_font("bold 16px/normal \"Noto Sans KR\"");
            obj.set_padding("16px 20px 10px 20px");
            this.addChild(obj.name, obj);
            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",1280,720,this,function(p){});
            this.addLayout(obj.name, obj);
            
            // BindItem Information

            
            // TriggerItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.registerScript("timeModify.xfdl", function() {

        // 근태 조정 신청 내역 조회
        this.timeModify_onload = function(obj,e)
        {
        	this.transaction(
        		"tr_select"// 1.ID
        		,"HirpURL::admin/timeModifyView.hirp"// 2.URL
        		,"" // 3.InDs : F->S jsp(I,U,D) 보내는것
        		,"timeModify=outTimeView" // 4.OutDs : S->F jsp(SELECT) 받는것(넥사크로에있는데이터셋이름=이클립스에있는것)
        		,"" // 5.InVar : F->S(var) 파라미터 보내야할 때, 몽땅불러올 땐 필요없음
        		,"fn_callback_tran" // 6.callback function(transaction 완료시 호출되는 함수)
        	);
        };

        // 결과 체크 콜백 함수
        this.fn_callback_tran = function(id, nErrorCode, sErrorMsg)
        {
        	if(id=="tr_select") // 위에 아이디와 맞춰주기
        	{
        		if(nErrorCode < 0) // 실패 나오면 -1
        		{
        			this.alert("조정 내용 조회 실패 : " + sErrorMsg);
        			return;
        		}
        		this.alert("조정 내용 조회 성공");
        	}
        }

        // 메뉴 이동
        this.link_addEmpl00_onclick = function(obj,e)
        {
        	this.go("FrameBase::timeView.xfdl");
        };

        this.link_addEmpl00_00_onclick = function(obj,e)
        {
        	this.go("FrameBase::timeVacation.xfdl");
        };

        this.link_addEmpl00_01_onclick = function(obj,e)
        {
        	this.go("FrameBase::timeModify.xfdl");
        };
        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.Static00.addEventHandler("onclick",this.Static00_onclick,this);
            this.link_emplLsit.addEventHandler("onclick",this.link_emplLsit_onclick,this);
            this.link_addEmpl00.addEventHandler("onclick",this.link_addEmpl00_onclick,this);
            this.link_addEmpl00_00.addEventHandler("onclick",this.link_addEmpl00_00_onclick,this);
            this.link_emplLsit00.addEventHandler("onclick",this.link_emplLsit_onclick,this);
            this.link_addEmpl00_01.addEventHandler("onclick",this.link_addEmpl00_01_onclick,this);
            this.Static00_00.addEventHandler("onclick",this.Static00_onclick,this);
            this.Static01.addEventHandler("onclick",this.Static01_onclick,this);
            this.timeModify.addEventHandler("onload",this.timeModify_onload,this);
        };
        this.loadIncludeScript("timeModify.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
