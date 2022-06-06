(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("frm_emp");
            this.set_titletext("New Form");
            this.set_border("0px");
            this.set_font("normal bold 10pt/normal \"Arial\"");
            if (Form == this.constructor)
            {
                this._setFormPosition(800,600);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds_stdInfo", this);
            obj._setContents("<ColumnInfo><Column id=\"departmentName\" type=\"STRING\" size=\"256\"/><Column id=\"studentNo\" type=\"STRING\" size=\"256\"/><Column id=\"studentName\" type=\"STRING\" size=\"256\"/><Column id=\"studentGrade\" type=\"STRING\" size=\"256\"/><Column id=\"studentBirth\" type=\"STRING\" size=\"256\"/><Column id=\"studentAddress\" type=\"STRING\" size=\"256\"/><Column id=\"studentPhonenumber\" type=\"STRING\" size=\"256\"/><Column id=\"studentEmail\" type=\"STRING\" size=\"256\"/><Column id=\"studentState\" type=\"STRING\" size=\"256\"/><Column id=\"professorName\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Button("btn_pwUpdate","610","25","95","30",null,null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_text("비밀번호 변경");
            this.addChild(obj.name, obj);

            obj = new Button("btn_save","725","25","50","30",null,null,null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_text("저장");
            this.addChild(obj.name, obj);

            obj = new Edit("Edit00","114","78","110","20",null,null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_textAlign("center");
            obj.set_readonly("true");
            obj.set_borderRadius("7px / 7px");
            this.addChild(obj.name, obj);

            obj = new Edit("Edit00_00","114","138","110","20",null,null,null,null,null,null,this);
            obj.set_taborder("3");
            obj.set_textAlign("center");
            obj.set_readonly("true");
            obj.set_borderRadius("7px / 7px");
            this.addChild(obj.name, obj);

            obj = new Edit("Edit00_00_00","114","108","110","20",null,null,null,null,null,null,this);
            obj.set_taborder("4");
            obj.set_textAlign("center");
            obj.set_readonly("true");
            obj.set_borderRadius("7px / 7px");
            this.addChild(obj.name, obj);

            obj = new Edit("Edit00_00_00_00","354","78","110","20",null,null,null,null,null,null,this);
            obj.set_taborder("5");
            obj.set_textAlign("center");
            obj.set_readonly("true");
            obj.set_borderRadius("7px / 7px");
            this.addChild(obj.name, obj);

            obj = new Edit("Edit00_00_00_00_00","354","108","110","20",null,null,null,null,null,null,this);
            obj.set_taborder("6");
            obj.set_textAlign("center");
            obj.set_readonly("true");
            obj.set_borderRadius("7px / 7px");
            this.addChild(obj.name, obj);

            obj = new Edit("Edit00_00_00_00_00_00","585","87","200","20",null,null,null,null,null,null,this);
            obj.set_taborder("7");
            obj.set_textAlign("center");
            obj.set_borderRadius("7px / 7px");
            this.addChild(obj.name, obj);

            obj = new Edit("Edit00_00_00_00_00_00_00","354","138","110","20",null,null,null,null,null,null,this);
            obj.set_taborder("8");
            obj.set_textAlign("center");
            obj.set_borderRadius("7px / 7px");
            this.addChild(obj.name, obj);

            obj = new Edit("Edit00_00_00_00_00_00_00_00","585","124","200","20",null,null,null,null,null,null,this);
            obj.set_taborder("9");
            obj.set_textAlign("center");
            obj.set_borderRadius("7px / 7px");
            this.addChild(obj.name, obj);

            obj = new PopupDiv("PopupDiv00","915","3","325","169",null,null,null,null,null,null,this);
            obj.set_text("PopupDiv00");
            obj.set_visible("false");
            obj.getSetter("positionstep").set("0");
            obj.set_background("white");
            this.addChild(obj.name, obj);

            obj = new Button("btn_OK","110","120","104","33",null,null,null,null,null,null,this.PopupDiv00.form);
            obj.set_taborder("0");
            obj.set_text("OK");
            this.PopupDiv00.addChild(obj.name, obj);

            obj = new Static("Static00","53","20","219","27",null,null,null,null,null,null,this.PopupDiv00.form);
            obj.set_taborder("1");
            obj.set_text("현재 비밀번호를 입력해주세요");
            obj.set_textAlign("center");
            obj.set_font("normal bold 10pt/normal \"Arial\"");
            this.PopupDiv00.addChild(obj.name, obj);

            obj = new Edit("pwd","50","57","218","40",null,null,null,null,null,null,this.PopupDiv00.form);
            obj.set_taborder("2");
            obj.set_password("true");
            obj.set_borderRadius("7px / 7px");
            this.PopupDiv00.addChild(obj.name, obj);

            obj = new PopupDiv("PopupDiv01","895","200","325","339",null,null,null,null,null,null,this);
            obj.set_text("PopupDiv00");
            obj.set_visible("false");
            obj.getSetter("positionstep").set("0");
            obj.set_background("white");
            this.addChild(obj.name, obj);

            obj = new Button("btn_OK2","105","280","104","33",null,null,null,null,null,null,this.PopupDiv01.form);
            obj.set_taborder("0");
            obj.set_text("OK");
            this.PopupDiv01.addChild(obj.name, obj);

            obj = new Static("Static00","53","17","209","27",null,null,null,null,null,null,this.PopupDiv01.form);
            obj.set_taborder("1");
            obj.set_text("변경할 비밀번호를 입력해주세요");
            obj.set_textAlign("center");
            obj.set_font("normal bold 10pt/normal \"Arial\"");
            this.PopupDiv01.addChild(obj.name, obj);

            obj = new Edit("rePwd1","55","64","218","40",null,null,null,null,null,null,this.PopupDiv01.form);
            obj.set_taborder("2");
            obj.set_password("true");
            obj.set_borderRadius("7px / 7px");
            this.PopupDiv01.addChild(obj.name, obj);

            obj = new Static("Static00_00","34","130","247","27",null,null,null,null,null,null,this.PopupDiv01.form);
            obj.set_taborder("3");
            obj.set_text("변경할 비밀번호를 한번더 입력해주세요");
            obj.set_textAlign("center");
            obj.set_font("normal bold 10pt/normal \"Arial\"");
            this.PopupDiv01.addChild(obj.name, obj);

            obj = new Edit("rePwd2","55","179","218","40",null,null,null,null,null,null,this.PopupDiv01.form);
            obj.set_taborder("4");
            obj.set_password("true");
            obj.set_borderRadius("7px / 7px");
            this.PopupDiv01.addChild(obj.name, obj);

            obj = new Static("pwdSame","34","233","260","27",null,null,null,null,null,null,this.PopupDiv01.form);
            obj.set_taborder("5");
            obj.set_text("변경할 비밀번호가 서로 일치 하지 않습니다");
            obj.set_color("white");
            obj.set_textAlign("center");
            obj.set_font("normal bold 10pt/normal \"Arial\"");
            this.PopupDiv01.addChild(obj.name, obj);

            obj = new Div("Div01","18","18","5","25",null,null,null,null,null,null,this);
            obj.set_taborder("13");
            obj.set_text("");
            obj.set_background("rgb(0, 74, 38)");
            this.addChild(obj.name, obj);

            obj = new Static("Static00_02","40","15","219","30",null,null,null,null,null,null,this);
            obj.set_taborder("14");
            obj.set_text("학생 기초 정보");
            this.addChild(obj.name, obj);

            obj = new Div("Div00","0","70","100","100",null,null,null,null,null,null,this);
            obj.set_taborder("15");
            obj.set_text("");
            obj.set_background("rgb(231, 232, 226)");
            this.addChild(obj.name, obj);

            obj = new Static("Static00","24","6","50","20",null,null,null,null,null,null,this.Div00.form);
            obj.set_taborder("0");
            obj.set_text("학과");
            obj.set_textAlign("center");
            obj.set_font("normal bold 10pt/normal \"Arial\"");
            this.Div00.addChild(obj.name, obj);

            obj = new Static("Static00_00","24","36","50","20",null,null,null,null,null,null,this.Div00.form);
            obj.set_taborder("1");
            obj.set_text("학번");
            obj.set_textAlign("center");
            obj.set_font("normal bold 10pt/normal \"Arial\"");
            this.Div00.addChild(obj.name, obj);

            obj = new Static("Static00_00_00","24","66","50","20",null,null,null,null,null,null,this.Div00.form);
            obj.set_taborder("2");
            obj.set_text("이름");
            obj.set_textAlign("center");
            obj.set_font("normal bold 10pt/normal \"Arial\"");
            this.Div00.addChild(obj.name, obj);

            obj = new Div("Div02","240","70","100","100",null,null,null,null,null,null,this);
            obj.set_taborder("12");
            obj.set_text("");
            obj.set_background("rgb(231, 232, 226)");
            this.addChild(obj.name, obj);

            obj = new Static("Static00","24","6","50","20",null,null,null,null,null,null,this.Div02.form);
            obj.set_taborder("0");
            obj.set_text("학년");
            obj.set_textAlign("center");
            obj.set_font("normal bold 10pt/normal \"Arial\"");
            this.Div02.addChild(obj.name, obj);

            obj = new Static("Static00_00","14","66","70","20",null,null,null,null,null,null,this.Div02.form);
            obj.set_taborder("1");
            obj.set_text("전화번호");
            obj.set_textAlign("center");
            obj.set_font("normal bold 10pt/normal \"Arial\"");
            this.Div02.addChild(obj.name, obj);

            obj = new Static("Static00_00_00","14","36","70","20",null,null,null,null,null,null,this.Div02.form);
            obj.set_taborder("2");
            obj.set_text("생년월일");
            obj.set_textAlign("center");
            obj.set_font("normal bold 10pt/normal \"Arial\"");
            this.Div02.addChild(obj.name, obj);

            obj = new Div("Div04","480","70","100","100",null,null,null,null,null,null,this);
            obj.set_taborder("11");
            obj.set_text("");
            obj.set_background("rgb(231, 232, 226)");
            this.addChild(obj.name, obj);

            obj = new Static("Static00","25","17","50","20",null,null,null,null,null,null,this.Div04.form);
            obj.set_taborder("0");
            obj.set_text("주소");
            obj.set_textAlign("center");
            obj.set_font("normal bold 10pt/normal \"Arial\"");
            this.Div04.addChild(obj.name, obj);

            obj = new Static("Static00_00","25","53","50","20",null,null,null,null,null,null,this.Div04.form);
            obj.set_taborder("1");
            obj.set_text("이메일");
            obj.set_textAlign("center");
            obj.set_font("normal bold 10pt/normal \"Arial\"");
            this.Div04.addChild(obj.name, obj);

            obj = new Div("Div03","0","65","800","5",null,null,null,null,null,null,this);
            obj.set_taborder("16");
            obj.set_text("");
            obj.set_background("rgba(16, 65, 44, 0.2)");
            obj.set_border("0");
            obj.set_color("transparent");
            this.addChild(obj.name, obj);
            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",800,600,this,function(p){});
            this.addLayout(obj.name, obj);
            
            // BindItem Information
            obj = new BindItem("item0","Edit00","value","ds_stdInfo","departmentName");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item1","Edit00_00","value","ds_stdInfo","studentNo");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item2","Edit00_00_00","value","ds_stdInfo","studentName");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item3","Edit00_00_00_00","value","ds_stdInfo","studentGrade");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item4","Edit00_00_00_00_00","value","ds_stdInfo","studentBirth");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item5","Edit00_00_00_00_00_00","value","ds_stdInfo","studentAddress");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item6","Edit00_00_00_00_00_00_00","value","ds_stdInfo","studentPhonenumber");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item7","Edit00_00_00_00_00_00_00_00","value","ds_stdInfo","studentEmail");
            this.addChild(obj.name, obj);
            obj.bind();
            
            // TriggerItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.registerScript("std_info.xfdl", function() {
        /********************************************************************
            created:	  2022/02/18
            filename: 	C:\KH_edu17.1\Work\frm_emp.xfdl
            file path:	C:\KH_edu17.1\Work
            file base: 	frm_emp
            file ext:	  xfdl
            author:

            purpose:
        *********************************************************************/

        this.fn_callback = function(id, sRtn)
        {

        }

        this.out_var ="";
        this.fn_callback_tran = function(id, nErrorCode, sErrorMsg)
        {

        	if(id == "std_info")
        	{
        		if(nErrorCode < 0)
        		{
        			this.alert("코드 조회 실패 : " + sErrorMsg);
        			return;
        		}
        	}

        	if(id == "pwd_same")
        	{
        		if(nErrorCode > 0) {
        			this.PopupDiv01.trackPopupByComponent(this.btn_pwUpdate, -300, 150);
        			return;
        		} else {
        			this.alert("비밀번호가 일치하지 않습니다");
        			return;
        		}
        	}

        	if(id == "pwd_change")
        	{
        		if(nErrorCode > 0) {
        			this.PopupDiv01.closePopup();
        			return;
        		} else {
        			this.alert("비밀번호 변경 실패");
        			return;
        		}
        	}
        }

        this.frm_emp_onload = function(obj,e)
        {
        //학생정보
        	this.transaction(
        		"std_info"// 1.ID
        		,"CmURL::student/stdInfo.kh"// 2.URL
        		,"" // 3.InDs : F->S jsp(I,U,D)
        		,"ds_stdInfo=out_stdInfo" // 4.OutDs : S->F jsp(SELECT)
        		,"" // 5.InVar : F->S(var)
        		,"fn_callback_tran" // 6.callback function(transaction 완료시 호출되는 함수)
        	);
        // 교수 정보
        // 	this.transaction(
        // 		"prf_info"// 1.ID
        // 		,"CmURL::professor/prfInfo.kh"// 2.URL
        // 		,"" // 3.InDs : F->S jsp(I,U,D)
        // 		,"ds_stdInfo=out_prfInfo" // 4.OutDs : S->F jsp(SELECT)
        // 		,"" // 5.InVar : F->S(var)
        // 		,"fn_callback_tran" // 6.callback function(transaction 완료시 호출되는 함수)
        // 	);
        // 관리자 학생 정보
        // this.transaction(
        // 		"mag_info"// 1.ID
        // 		,"CmURL::manager/stdInfo.kh"// 2.URL
        // 		,"" // 3.InDs : F->S jsp(I,U,D)
        // 		,"ds_stdInfo=out_stdAllInfo" // 4.OutDs : S->F jsp(SELECT)
        // 		,"" // 5.InVar : F->S(var)
        // 		,"fn_callback_tran" // 6.callback function(transaction 완료시 호출되는 함수)
        // 	);

        // 관리자 교수 정보
        // this.transaction(
        // 		"mag_info"// 1.ID
        // 		,"CmURL::manager/prfInfo.kh"// 2.URL
        // 		,"" // 3.InDs : F->S jsp(I,U,D)
        // 		,"ds_stdInfo=out_prfAllInfo" // 4.OutDs : S->F jsp(SELECT)
        // 		,"" // 5.InVar : F->S(var)
        // 		,"fn_callback_tran" // 6.callback function(transaction 완료시 호출되는 함수)
        // 	);
        // 관리자 관리자 정보
        // this.transaction(
        // 		"mag_info"// 1.ID
        // 		,"CmURL::manager/magInfo.kh"// 2.URL
        // 		,"" // 3.InDs : F->S jsp(I,U,D)
        // 		,"ds_stdInfo=out_magAllInfo" // 4.OutDs : S->F jsp(SELECT)
        // 		,"" // 5.InVar : F->S(var)
        // 		,"fn_callback_tran" // 6.callback function(transaction 완료시 호출되는 함수)
        // 	);
        };

        this.btn_save_onclick = function(obj,e)
        {
        	this.transaction(
        		"std_update"// 1.ID
        		,"CmURL::student/stdUpdate.kh"// 2.URL
        		,"in_std=ds_stdInfo:U" // 3.InDs : F->S jsp(I,U,D)
        		,"" // 4.OutDs : S->F jsp(SELECT)
        		,""// 5.InVar : F->S(var)
        		,"fn_callback_tran" // 6.callback function(transaction 완료시 호출되는 함수)
        	);

        };

        this.btn_pwUpdate_onclick = function(obj,e)
        {
        	this.PopupDiv00.trackPopupByComponent(obj, -300, 150);
        };

        // 비밀번호가 일치하는지 확인
        this.PopupDiv00_btn_OK_onclick = function(obj,e)
        {
        	var pwd = this.PopupDiv00.form.pwd.text;
        	if(pwd != "") {
        		this.transaction(
        			"pwd_same"// 1.ID
        			,"CmURL::login/pwdSame.kh"// 2.URL
        			,"" // 3.InDs : F->S jsp(I,U,D)
        			,"" // 4.OutDs : S->F jsp(SELECT)
        			,"in_pwd="+pwd// 5.InVar : F->S(var)
        			,"fn_callback_tran" // 6.callback function(transaction 완료시 호출되는 함수)
        		);
        	} else {
        		this.alert("현재 비밀번호가 빈칸 입니다.");
        	}
        };

        this.PopupDiv01_btn_OK2_onclick = function(obj,e)
        {
        	var rePwd1 = this.PopupDiv01.form.rePwd1.text;
        	var rePwd2 = this.PopupDiv01.form.rePwd2.text;

        	// 변경할 비밀번호 일치 여부
        	if(rePwd1 != rePwd2) {
        		this.PopupDiv01.form.pwdSame.set_color("red");
        	} else {
        		this.PopupDiv01.form.pwdSame.set_color("white");
        		// 비밀번호 변경
        		this.transaction(
        			"pwd_change"// 1.ID
        			,"CmURL::login/pwdChange.kh"// 2.URL
        			,"" // 3.InDs : F->S jsp(I,U,D)
        			,"" // 4.OutDs : S->F jsp(SELECT)
        			,"in_pwd="+rePwd1// 5.InVar : F->S(var)
        			,"fn_callback_tran" // 6.callback function(transaction 완료시 호출되는 함수)
        		);
        	}
        };






        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload",this.frm_emp_onload,this);
            this.btn_pwUpdate.addEventHandler("onclick",this.btn_pwUpdate_onclick,this);
            this.btn_save.addEventHandler("onclick",this.btn_save_onclick,this);
            this.PopupDiv00.form.btn_OK.addEventHandler("onclick",this.PopupDiv00_btn_OK_onclick,this);
            this.PopupDiv01.form.btn_OK2.addEventHandler("onclick",this.PopupDiv01_btn_OK2_onclick,this);
            this.PopupDiv01.form.pwdSame.addEventHandler("onclick",this.PopupDiv01_pwdSame_onclick,this);
            this.Div00.form.Static00.addEventHandler("onclick",this.Div00_Static00_onclick,this);
            this.Div00.form.Static00_00.addEventHandler("onclick",this.Div00_Static00_onclick,this);
            this.Div00.form.Static00_00_00.addEventHandler("onclick",this.Div00_Static00_onclick,this);
            this.Div02.form.Static00_00_00.addEventHandler("onclick",this.Div02_Static00_00_00_onclick,this);
        };
        this.loadIncludeScript("std_info.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
