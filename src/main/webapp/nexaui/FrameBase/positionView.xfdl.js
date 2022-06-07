(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("Form_Work");
            this.set_titletext("Form_Work");
            if (Form == this.constructor)
            {
                this._setFormPosition(1280,720);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds_position", this);
            obj._setContents("<ColumnInfo><Column id=\"positionSequence\" type=\"STRING\" size=\"256\"/><Column id=\"positionName\" type=\"STRING\" size=\"256\"/><Column id=\"positionCode\" type=\"STRING\" size=\"256\"/><Column id=\"positionUseManager\" type=\"STRING\" size=\"256\"/><Column id=\"positionLevel\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_positionAdd", this);
            obj._setContents("<ColumnInfo><Column id=\"positionCode\" type=\"STRING\" size=\"256\"/><Column id=\"positionName\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Button("btn_Add",null,"80","80","30","220",null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_text("추가");
            this.addChild(obj.name, obj);

            obj = new Button("btn_Update",null,"80","80","30","120",null,null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_text("수정");
            this.addChild(obj.name, obj);

            obj = new Button("btn_Delete",null,"80","80","30","20",null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_text("삭제");
            this.addChild(obj.name, obj);

            obj = new Grid("Grid00","20","120",null,"580","20",null,null,null,null,null,this);
            obj.set_taborder("3");
            obj.set_binddataset("ds_position");
            obj.set_autofittype("col");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"51\"/><Column size=\"188\"/><Column size=\"80\"/><Column size=\"80\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell text=\"positionSequence\" color=\"black\" displaytype=\"checkboxcontrol\" edittype=\"checkbox\"/><Cell col=\"1\" text=\"명칭\" color=\"black\"/><Cell col=\"2\" text=\"코드\" color=\"black\"/><Cell col=\"3\" text=\"사용멤버\" color=\"black\"/></Band><Band id=\"body\"><Cell text=\"bind:positionSequence\" displaytype=\"checkboxcontrol\" edittype=\"checkbox\"/><Cell col=\"1\" text=\"bind:positionName\"/><Cell col=\"2\" text=\"bind:positionCode\"/><Cell col=\"3\" text=\"bind:positionUseManager\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new Static("Static00_00","0","0",null,"60","0",null,null,null,null,null,this);
            obj.set_taborder("4");
            obj.set_text("직급 목록");
            obj.set_padding("16px 20px");
            obj.set_font("bold 22px/normal \"Noto Sans KR\"");
            obj.set_letterSpacing("-1px");
            obj.set_border("0px none, 0px none, 1px solid #dddddd");
            this.addChild(obj.name, obj);

            obj = new PopupDiv("PositionAdd","1320","0","500","300",null,null,null,null,null,null,this);
            obj.set_text("PopupDiv00");
            obj.set_visible("false");
            obj.set_background("white");
            obj.set_border("1px solid black");
            this.addChild(obj.name, obj);

            obj = new Static("Static00","20","20","100","30",null,null,null,null,null,null,this.PositionAdd.form);
            obj.set_taborder("0");
            obj.set_text("직급추가");
            obj.set_font("bold 18px/normal \"Gulim\"");
            this.PositionAdd.addChild(obj.name, obj);

            obj = new Static("Static01","20","80","60","30",null,null,null,null,null,null,this.PositionAdd.form);
            obj.set_taborder("1");
            obj.set_text("코드");
            obj.set_font("16px/normal \"Gulim\"");
            this.PositionAdd.addChild(obj.name, obj);

            obj = new Static("Static02","20","120","60","30",null,null,null,null,null,null,this.PositionAdd.form);
            obj.set_taborder("2");
            obj.set_text("명칭");
            obj.set_font("16px/normal \"Gulim\"");
            this.PositionAdd.addChild(obj.name, obj);

            obj = new Edit("Edit_code","100","90","140","20",null,null,null,null,null,null,this.PositionAdd.form);
            obj.set_taborder("3");
            this.PositionAdd.addChild(obj.name, obj);

            obj = new Edit("Edit_position","100","130","140","20",null,null,null,null,null,null,this.PositionAdd.form);
            obj.set_taborder("4");
            this.PositionAdd.addChild(obj.name, obj);

            obj = new Button("btn_Save","170","250","70","30",null,null,null,null,null,null,this.PositionAdd.form);
            obj.set_taborder("5");
            obj.set_text("저장");
            this.PositionAdd.addChild(obj.name, obj);

            obj = new Button("btn_Cancel","260","250","70","30",null,null,null,null,null,null,this.PositionAdd.form);
            obj.set_taborder("6");
            obj.set_text("취소");
            this.PositionAdd.addChild(obj.name, obj);

            obj = new PopupDiv("PositionAdd","1320","0","500","300",null,null,null,null,null,null,this.PositionAdd.form);
            obj.set_text("PopupDiv00");
            obj.set_visible("false");
            obj.set_background("white");
            this.PositionAdd.addChild(obj.name, obj);

            obj = new Static("Static00","20","20","100","30",null,null,null,null,null,null,this.PositionAdd.form.PositionAdd.form);
            obj.set_taborder("0");
            obj.set_text("직급추가");
            obj.set_font("bold 18px/normal \"Gulim\"");
            this.PositionAdd.form.PositionAdd.addChild(obj.name, obj);

            obj = new Static("Static01","20","80","60","30",null,null,null,null,null,null,this.PositionAdd.form.PositionAdd.form);
            obj.set_taborder("1");
            obj.set_text("코드");
            obj.set_font("16px/normal \"Gulim\"");
            this.PositionAdd.form.PositionAdd.addChild(obj.name, obj);

            obj = new Static("Static02","20","120","60","30",null,null,null,null,null,null,this.PositionAdd.form.PositionAdd.form);
            obj.set_taborder("2");
            obj.set_text("명칭");
            obj.set_font("16px/normal \"Gulim\"");
            this.PositionAdd.form.PositionAdd.addChild(obj.name, obj);

            obj = new Edit("Edit_code","100","90","140","20",null,null,null,null,null,null,this.PositionAdd.form.PositionAdd.form);
            obj.set_taborder("3");
            this.PositionAdd.form.PositionAdd.addChild(obj.name, obj);

            obj = new Edit("Edit_position","100","130","140","20",null,null,null,null,null,null,this.PositionAdd.form.PositionAdd.form);
            obj.set_taborder("4");
            this.PositionAdd.form.PositionAdd.addChild(obj.name, obj);

            obj = new Button("btn_Save","170","250","70","30",null,null,null,null,null,null,this.PositionAdd.form.PositionAdd.form);
            obj.set_taborder("5");
            obj.set_text("저장");
            this.PositionAdd.form.PositionAdd.addChild(obj.name, obj);

            obj = new Button("btn_Cancel","260","250","70","30",null,null,null,null,null,null,this.PositionAdd.form.PositionAdd.form);
            obj.set_taborder("6");
            obj.set_text("취소");
            this.PositionAdd.form.PositionAdd.addChild(obj.name, obj);

            obj = new PopupDiv("PositionAdd00","1330","10","500","300",null,null,null,null,null,null,this.PositionAdd.form);
            obj.set_text("PopupDiv00");
            obj.set_visible("false");
            obj.set_background("white");
            this.PositionAdd.addChild(obj.name, obj);

            obj = new Static("Static00","20","20","100","30",null,null,null,null,null,null,this.PositionAdd.form.PositionAdd00.form);
            obj.set_taborder("0");
            obj.set_text("직급추가");
            obj.set_font("bold 18px/normal \"Gulim\"");
            this.PositionAdd.form.PositionAdd00.addChild(obj.name, obj);

            obj = new Static("Static01","20","80","60","30",null,null,null,null,null,null,this.PositionAdd.form.PositionAdd00.form);
            obj.set_taborder("1");
            obj.set_text("코드");
            obj.set_font("16px/normal \"Gulim\"");
            this.PositionAdd.form.PositionAdd00.addChild(obj.name, obj);

            obj = new Static("Static02","20","120","60","30",null,null,null,null,null,null,this.PositionAdd.form.PositionAdd00.form);
            obj.set_taborder("2");
            obj.set_text("명칭");
            obj.set_font("16px/normal \"Gulim\"");
            this.PositionAdd.form.PositionAdd00.addChild(obj.name, obj);

            obj = new Edit("Edit_code","100","90","140","20",null,null,null,null,null,null,this.PositionAdd.form.PositionAdd00.form);
            obj.set_taborder("3");
            this.PositionAdd.form.PositionAdd00.addChild(obj.name, obj);

            obj = new Edit("Edit_position","100","130","140","20",null,null,null,null,null,null,this.PositionAdd.form.PositionAdd00.form);
            obj.set_taborder("4");
            this.PositionAdd.form.PositionAdd00.addChild(obj.name, obj);

            obj = new Button("btn_Save","170","250","70","30",null,null,null,null,null,null,this.PositionAdd.form.PositionAdd00.form);
            obj.set_taborder("5");
            obj.set_text("저장");
            this.PositionAdd.form.PositionAdd00.addChild(obj.name, obj);

            obj = new Button("btn_Cancel","260","250","70","30",null,null,null,null,null,null,this.PositionAdd.form.PositionAdd00.form);
            obj.set_taborder("6");
            obj.set_text("취소");
            this.PositionAdd.form.PositionAdd00.addChild(obj.name, obj);

            obj = new PopupDiv("PositionAdd","1320","0","500","300",null,null,null,null,null,null,this.PositionAdd.form.PositionAdd00.form);
            obj.set_text("PopupDiv00");
            obj.set_visible("false");
            obj.set_background("white");
            this.PositionAdd.form.PositionAdd00.addChild(obj.name, obj);

            obj = new Static("Static00","20","20","100","30",null,null,null,null,null,null,this.PositionAdd.form.PositionAdd00.form.PositionAdd.form);
            obj.set_taborder("0");
            obj.set_text("직급추가");
            obj.set_font("bold 18px/normal \"Gulim\"");
            this.PositionAdd.form.PositionAdd00.form.PositionAdd.addChild(obj.name, obj);

            obj = new Static("Static01","20","80","60","30",null,null,null,null,null,null,this.PositionAdd.form.PositionAdd00.form.PositionAdd.form);
            obj.set_taborder("1");
            obj.set_text("코드");
            obj.set_font("16px/normal \"Gulim\"");
            this.PositionAdd.form.PositionAdd00.form.PositionAdd.addChild(obj.name, obj);

            obj = new Static("Static02","20","120","60","30",null,null,null,null,null,null,this.PositionAdd.form.PositionAdd00.form.PositionAdd.form);
            obj.set_taborder("2");
            obj.set_text("명칭");
            obj.set_font("16px/normal \"Gulim\"");
            this.PositionAdd.form.PositionAdd00.form.PositionAdd.addChild(obj.name, obj);

            obj = new Edit("Edit_code","100","90","140","20",null,null,null,null,null,null,this.PositionAdd.form.PositionAdd00.form.PositionAdd.form);
            obj.set_taborder("3");
            this.PositionAdd.form.PositionAdd00.form.PositionAdd.addChild(obj.name, obj);

            obj = new Edit("Edit_position","100","130","140","20",null,null,null,null,null,null,this.PositionAdd.form.PositionAdd00.form.PositionAdd.form);
            obj.set_taborder("4");
            this.PositionAdd.form.PositionAdd00.form.PositionAdd.addChild(obj.name, obj);

            obj = new Button("btn_Save","170","250","70","30",null,null,null,null,null,null,this.PositionAdd.form.PositionAdd00.form.PositionAdd.form);
            obj.set_taborder("5");
            obj.set_text("저장");
            this.PositionAdd.form.PositionAdd00.form.PositionAdd.addChild(obj.name, obj);

            obj = new Button("btn_Cancel","260","250","70","30",null,null,null,null,null,null,this.PositionAdd.form.PositionAdd00.form.PositionAdd.form);
            obj.set_taborder("6");
            obj.set_text("취소");
            this.PositionAdd.form.PositionAdd00.form.PositionAdd.addChild(obj.name, obj);

            obj = new PopupDiv("PositionDelete","1845","0","500","300",null,null,null,null,null,null,this);
            obj.set_text("PopupDiv00");
            obj.set_visible("false");
            obj.set_background("white");
            obj.set_border("1px solid black");
            this.addChild(obj.name, obj);

            obj = new Static("Static00","20","80","380","40",null,null,null,null,null,null,this.PositionDelete.form);
            obj.set_taborder("0");
            obj.set_text("선택한 항목을 삭제하시겠습니까?");
            obj.set_font("bold 18px/normal \"Gulim\"");
            this.PositionDelete.addChild(obj.name, obj);

            obj = new Static("Static01","20","130","270","30",null,null,null,null,null,null,this.PositionDelete.form);
            obj.set_taborder("1");
            obj.set_text("항목을 삭제하면 복구되지 않습니다.");
            obj.set_font("14px/normal \"Gulim\"");
            this.PositionDelete.addChild(obj.name, obj);

            obj = new Button("btn_Position_Delete","170","250","70","30",null,null,null,null,null,null,this.PositionDelete.form);
            obj.set_taborder("2");
            obj.set_text("삭제");
            this.PositionDelete.addChild(obj.name, obj);

            obj = new Button("btn_Cancel","260","250","70","30",null,null,null,null,null,null,this.PositionDelete.form);
            obj.set_taborder("3");
            obj.set_text("취소");
            this.PositionDelete.addChild(obj.name, obj);

            obj = new PopupDiv("PositionUpdate","1320","340","500","300",null,null,null,null,null,null,this);
            obj.set_text("PopupDiv00");
            obj.set_visible("false");
            obj.set_background("white");
            obj.set_border("1px solid black");
            this.addChild(obj.name, obj);

            obj = new Static("Static00","20","20","100","30",null,null,null,null,null,null,this.PositionUpdate.form);
            obj.set_taborder("0");
            obj.set_text("직급수정");
            obj.set_font("bold 18px/normal \"Gulim\"");
            this.PositionUpdate.addChild(obj.name, obj);

            obj = new Static("Static01","20","80","60","30",null,null,null,null,null,null,this.PositionUpdate.form);
            obj.set_taborder("1");
            obj.set_text("코드");
            obj.set_font("16px/normal \"Gulim\"");
            this.PositionUpdate.addChild(obj.name, obj);

            obj = new Static("Static02","20","120","60","30",null,null,null,null,null,null,this.PositionUpdate.form);
            obj.set_taborder("2");
            obj.set_text("명칭");
            obj.set_font("16px/normal \"Gulim\"");
            this.PositionUpdate.addChild(obj.name, obj);

            obj = new Edit("Edit_code","100","90","140","20",null,null,null,null,null,null,this.PositionUpdate.form);
            obj.set_taborder("3");
            this.PositionUpdate.addChild(obj.name, obj);

            obj = new Edit("Edit_position","100","130","140","20",null,null,null,null,null,null,this.PositionUpdate.form);
            obj.set_taborder("4");
            this.PositionUpdate.addChild(obj.name, obj);

            obj = new Button("btn_UpdateSave","170","250","70","30",null,null,null,null,null,null,this.PositionUpdate.form);
            obj.set_taborder("5");
            obj.set_text("저장");
            this.PositionUpdate.addChild(obj.name, obj);

            obj = new Button("btn_Cancel","260","250","70","30",null,null,null,null,null,null,this.PositionUpdate.form);
            obj.set_taborder("6");
            obj.set_text("취소");
            this.PositionUpdate.addChild(obj.name, obj);
            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","Desktop_screen",1280,720,this,function(p){});
            this.addLayout(obj.name, obj);
            
            // BindItem Information
            obj = new BindItem("item0","PositionUpdate.form.Edit_code","value","ds_position","positionCode");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item1","PositionUpdate.form.Edit_position","value","ds_position","positionName");
            this.addChild(obj.name, obj);
            obj.bind();
            
            // TriggerItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.registerScript("positionView.xfdl", function() {
        // 결과 체크 콜백 함수
        this.fn_callback_tran = function(id, nErrorCode, sErrorMsg)
        {
        	if(id=="position_select")
        	{
        		if(nErrorCode < 0)
        		{
        			this.alert("직급 목록 조회 실패 : " + sErrorMsg);
        			return;
        		}
        	}
        	if(id=="position_Delete")
        	{
        		if(nErrorCode < 0)
        		{
        			this.alert("직급 삭제 실패 : " + sErrorMsg);
        			return;
        		}
        		this.alert("직급 삭제 성공");
        	}
        }

        this.btn_Add_onclick = function(obj,e)
        {
        	this.PositionAdd.trackPopupByComponent(obj, -500, 150);
        };

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
        		"position_add"// 1.ID
        		,"HirpURL::admin/positionInsert.hirp"// 2.URL
        		,"in_dept=ds_dept:U" // 3.InDs : F->S jsp(I,U,D)
        		,"" // 4.OutDs : S->F jsp(SELECT)
        		,"" // 5.InVar : F->S(var)
        		,"fn_callback_tran" // 6.callback function(transaction 완료시 호출되는 함수)
        	);

        }

        this.btn_Update_onclick = function(obj,e)
        {
        	this.PositionUpdate.trackPopupByComponent(obj, -600, 150);
        };

        this.btn_Delete_onclick = function(obj,e)
        {
        	this.PositionDelete.trackPopupByComponent(obj, -700, 150);
        };

        this.Grid00_onheadclick = function(obj,e)
        {
        	if(obj.getCellProperty("head", e.cell, "displaytype")=="checkboxcontrol")
           {
              // 1-> 0 -> 1
              var nVal = obj.getCellText(-1, e.cell);
              nVal = (nVal=="1"?"0":"1");

              //Head
              obj.setCellProperty("head", e.cell, "text", nVal);

              //Body
              var objDs = obj.getBindDataset();
              for(var i=0; i<objDs.rowcount; i++)
              {
                 objDs.setColumn(i, "선택", nVal);
              }
           }
        };

        this.Form_Work_onload = function(obj,e)
        {
        	this.transaction(
        		"position_select"// 1.ID
        		,"HirpURL::admin/positionInfo.hirp"// 2.URL
        		,"" // 3.InDs : F->S jsp(I,U,D)
        		,"ds_position=in_position" // 4.OutDs : S->F jsp(SELECT)
        		,"" // 5.InVar : F->S(var)
        		,"fn_callback_tran" // 6.callback function(transaction 완료시 호출되는 함수)
        	);
        };

        this.PositionAdd_btn_save_onclick = function(obj,e)
        {
        	var editCode = this.PositionAdd.form.Edit_code.text;
        	var editPosition = this.PositionAdd.form.Edit_position.text;
        	this.ds_positionAdd.setColumn(0, 0, editCode);
        	this.ds_positionAdd.setColumn(0, 1, editPosition);
        	this.transaction(
        		"position_add"// 1.ID
        		,"HirpURL::admin/positionInsert.hirp"// 2.URL
        		,"in_position=ds_positionAdd:I" // 3.InDs : F->S jsp(I,U,D)
        		,"" // 4.OutDs : S->F jsp(SELECT)
        		,"" // 5.InVar : F->S(var)
        		,"fn_callback_tran" // 6.callback function(transaction 완료시 호출되는 함수)
        	);
        };

        this.PositionAdd_btn_cancel_onclick = function(obj,e)
        {
        	this.PositionAdd.closePopup();
        };

        this.PositionDelete_btn_Position_Delete_onclick = function(obj,e)
        {
        	var arrChk = this.ds_position.extractRows("positionSequence=='1'");
        	this.ds_position.deleteMultiRows(arrChk);
        	this.transaction(
        		"position_Delete"// 1.ID
        		,"HirpURL::admin/positionDelete.hirp"// 2.URL
        		,"in_position=ds_position:U" // 3.InDs : F->S jsp(I,U,D)
        		,"" // 4.OutDs : S->F jsp(SELECT)
        		,"" // 5.InVar : F->S(var)
        		,"fn_callback_tran" // 6.callback function(transaction 완료시 호출되는 함수)
        	);
        };

        // 직급 수정
        this.PositionUpdate_btn_UpdateSave_onclick = function(obj,e)
        {
        	var editCode = this.PositionUpdate.form.Edit_code.text;
        	var editPosition = this.PositionUpdate.form.Edit_position.text;
        	this.ds_positionUpdate.setColumn(0, 0, editCode);
        	this.ds_positionUpdate.setColumn(0, 1, editPosition);
        	this.ds_positionUpdate.getColumn(this.ds_position.rowposition, "positionSequence");
        	trace(this.ds_positionUpdate.getColumn(this.ds_position.rowposition, "positionSequence"));
        	this.transaction(
        		"position_Update"// 1.ID
        		,"HirpURL::admin/positionUpdate.hirp"// 2.URL
        		,"in_position=ds_positionUpdate:U" // 3.InDs : F->S jsp(I,U,D)
        		,"" // 4.OutDs : S->F jsp(SELECT)
        		,"" // 5.InVar : F->S(var)
        		,"fn_callback_tran" // 6.callback function(transaction 완료시 호출되는 함수)
        	);
        };

        this.PositionDelete_btn_Cancel_onclick = function(obj,e)
        {
        	this.PositionDelete.closePopup();
        };

        this.PositionUpdate_btn_Cancel_onclick = function(obj,e)
        {
        	this.PositionUpdate.closePopup();
        };

        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload",this.Form_Work_onload,this);
            this.btn_Add.addEventHandler("onclick",this.btn_Add_onclick,this);
            this.btn_Update.addEventHandler("onclick",this.btn_Update_onclick,this);
            this.btn_Delete.addEventHandler("onclick",this.btn_Delete_onclick,this);
            this.Grid00.addEventHandler("onheadclick",this.Grid00_onheadclick,this);
            this.Static00_00.addEventHandler("onclick",this.Static00_onclick,this);
            this.PositionAdd.form.Static00.addEventHandler("onclick",this.PopupDiv00_Static00_onclick,this);
            this.PositionAdd.form.Edit_code.addEventHandler("onchanged",this.PositionAdd_Edit_code_onchanged,this);
            this.PositionAdd.form.Edit_position.addEventHandler("onchanged",this.PositionAdd_Edit_position_onchanged,this);
            this.PositionAdd.form.btn_Save.addEventHandler("onclick",this.PositionAdd_btn_save_onclick,this);
            this.PositionAdd.form.btn_Cancel.addEventHandler("onclick",this.PositionAdd_btn_cancel_onclick,this);
            this.PositionAdd.form.PositionAdd.form.Static00.addEventHandler("onclick",this.PopupDiv00_Static00_onclick,this);
            this.PositionAdd.form.PositionAdd.form.Edit_code.addEventHandler("onchanged",this.PositionAdd_Edit_code_onchanged,this);
            this.PositionAdd.form.PositionAdd.form.Edit_position.addEventHandler("onchanged",this.PositionAdd_Edit_position_onchanged,this);
            this.PositionAdd.form.PositionAdd.form.btn_Save.addEventHandler("onclick",this.PositionAdd_btn_save_onclick,this);
            this.PositionAdd.form.PositionAdd.form.btn_Cancel.addEventHandler("onclick",this.PositionAdd_btn_cancel_onclick,this);
            this.PositionAdd.form.PositionAdd00.form.Static00.addEventHandler("onclick",this.PopupDiv00_Static00_onclick,this);
            this.PositionAdd.form.PositionAdd00.form.Edit_code.addEventHandler("onchanged",this.PositionAdd_Edit_code_onchanged,this);
            this.PositionAdd.form.PositionAdd00.form.Edit_position.addEventHandler("onchanged",this.PositionAdd_Edit_position_onchanged,this);
            this.PositionAdd.form.PositionAdd00.form.btn_Save.addEventHandler("onclick",this.PositionAdd_btn_save_onclick,this);
            this.PositionAdd.form.PositionAdd00.form.btn_Cancel.addEventHandler("onclick",this.PositionAdd_btn_cancel_onclick,this);
            this.PositionAdd.form.PositionAdd00.form.PositionAdd.form.Static00.addEventHandler("onclick",this.PopupDiv00_Static00_onclick,this);
            this.PositionAdd.form.PositionAdd00.form.PositionAdd.form.Edit_code.addEventHandler("onchanged",this.PositionAdd_Edit_code_onchanged,this);
            this.PositionAdd.form.PositionAdd00.form.PositionAdd.form.Edit_position.addEventHandler("onchanged",this.PositionAdd_Edit_position_onchanged,this);
            this.PositionAdd.form.PositionAdd00.form.PositionAdd.form.btn_Save.addEventHandler("onclick",this.PositionAdd_btn_save_onclick,this);
            this.PositionAdd.form.PositionAdd00.form.PositionAdd.form.btn_Cancel.addEventHandler("onclick",this.PositionAdd_btn_cancel_onclick,this);
            this.PositionDelete.form.btn_Position_Delete.addEventHandler("onclick",this.PositionDelete_btn_Position_Delete_onclick,this);
            this.PositionDelete.form.btn_Cancel.addEventHandler("onclick",this.PositionDelete_btn_Cancel_onclick,this);
            this.PositionUpdate.form.Static00.addEventHandler("onclick",this.PopupDiv00_Static00_onclick,this);
            this.PositionUpdate.form.Edit_code.addEventHandler("onchanged",this.PositionAdd_Edit_code_onchanged,this);
            this.PositionUpdate.form.Edit_position.addEventHandler("onchanged",this.PositionAdd_Edit_position_onchanged,this);
            this.PositionUpdate.form.btn_UpdateSave.addEventHandler("onclick",this.PositionUpdate_btn_UpdateSave_onclick,this);
            this.PositionUpdate.form.btn_Cancel.addEventHandler("onclick",this.PositionUpdate_btn_Cancel_onclick,this);
        };
        this.loadIncludeScript("positionView.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    }; 
}
)();
