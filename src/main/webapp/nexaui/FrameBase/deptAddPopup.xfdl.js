(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("deptAddPopup");
            this.set_titletext("New Form");
            if (Form == this.constructor)
            {
                this._setFormPosition(500,350);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds_color", this);
            obj._setContents("<ColumnInfo><Column id=\"COLOR_ID\" type=\"STRING\" size=\"256\"/><Column id=\"COLOR_VAL\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Static("static_dept01","59","19","166","41",null,null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_text("부서 추가");
            obj.set_font("normal 500 14pt/normal \"Noto Sans KR\"");
            this.addChild(obj.name, obj);

            obj = new Static("static_deptInfo","100","70","53","30",null,null,null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_text("부서명");
            obj.set_border("0px none,0px none,1px black");
            this.addChild(obj.name, obj);

            obj = new Static("static_deptInfo00","93","120","67","30",null,null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_text("부서코드");
            obj.set_border("0px none,0px none,1px black");
            this.addChild(obj.name, obj);

            obj = new Static("static_deptInfo01","93","170","67","30",null,null,null,null,null,null,this);
            obj.set_taborder("3");
            obj.set_text("부서약어");
            obj.set_border("0px none,0px none,1px black");
            this.addChild(obj.name, obj);

            obj = new Static("static_deptInfo01_00","93","220","67","30",null,null,null,null,null,null,this);
            obj.set_taborder("4");
            obj.set_text("부서색상");
            obj.set_border("0px none,0px none,1px black");
            this.addChild(obj.name, obj);

            obj = new Static("static_deptInfo02","93","70","10","30",null,null,null,null,null,null,this);
            obj.set_taborder("5");
            obj.set_text("*");
            obj.set_border("0px none,0px none,1px black");
            obj.set_color("#ff2323");
            this.addChild(obj.name, obj);

            obj = new Edit("edt_deptname","174","70","216","30",null,null,null,null,null,null,this);
            obj.set_taborder("6");
            this.addChild(obj.name, obj);

            obj = new Edit("edt_deptsecond","174","170","216","30",null,null,null,null,null,null,this);
            obj.set_taborder("7");
            this.addChild(obj.name, obj);

            obj = new Button("btn_submit","165","280","80","30",null,null,null,null,null,null,this);
            obj.set_taborder("8");
            obj.set_text("저장");
            obj.set_letterSpacing("0px");
            obj.set_cssclass("save");
            this.addChild(obj.name, obj);

            obj = new Button("btn_cancel","255","280","80","30",null,null,null,null,null,null,this);
            obj.set_taborder("9");
            obj.set_text("취소");
            obj.set_letterSpacing("0px");
            obj.set_cssclass("cancel");
            this.addChild(obj.name, obj);

            obj = new Static("static_msg","174","95","216","30",null,null,null,null,null,null,this);
            obj.set_taborder("10");
            obj.set_border("0px none,0px none,1px black");
            obj.set_font("normal 7pt/normal \"KR\"");
            obj.set_color("#ff1414");
            this.addChild(obj.name, obj);

            obj = new MaskEdit("medt_deptcode","174","120","216","30",null,null,null,null,null,null,this);
            obj.set_taborder("11");
            obj.set_textAlign("left");
            this.addChild(obj.name, obj);

            obj = new Button("btn_colorchart01","174","221","15","15",null,null,null,null,null,null,this);
            obj.set_taborder("12");
            obj.set_background("#FFD8D8");
            this.addChild(obj.name, obj);

            obj = new Button("btn_colorchart02","188","221","15","15",null,null,null,null,null,null,this);
            obj.set_taborder("13");
            obj.set_background("#FAE0D4");
            this.addChild(obj.name, obj);

            obj = new Button("btn_colorchart03","202","221","15","15",null,null,null,null,null,null,this);
            obj.set_taborder("14");
            obj.set_background("#FAECC5");
            this.addChild(obj.name, obj);

            obj = new Button("btn_colorchart04","216","221","15","15",null,null,null,null,null,null,this);
            obj.set_taborder("15");
            obj.set_background("#FAF4C0");
            this.addChild(obj.name, obj);

            obj = new Button("btn_colorchart05","230","221","15","15",null,null,null,null,null,null,this);
            obj.set_taborder("16");
            obj.set_background("#E4F7BA");
            this.addChild(obj.name, obj);

            obj = new Button("btn_colorchart06","244","221","15","15",null,null,null,null,null,null,this);
            obj.set_taborder("17");
            obj.set_background("#CEFBC9");
            this.addChild(obj.name, obj);

            obj = new Button("btn_colorchart07","258","221","15","15",null,null,null,null,null,null,this);
            obj.set_taborder("18");
            obj.set_background("#D4F4FA");
            this.addChild(obj.name, obj);

            obj = new Button("btn_colorchart08","272","221","15","15",null,null,null,null,null,null,this);
            obj.set_taborder("19");
            obj.set_background("#D9E5FF");
            this.addChild(obj.name, obj);

            obj = new Button("btn_colorchart09","286","221","15","15",null,null,null,null,null,null,this);
            obj.set_taborder("20");
            obj.set_background("#DAD9FF");
            this.addChild(obj.name, obj);

            obj = new Button("btn_colorchart10","300","221","15","15",null,null,null,null,null,null,this);
            obj.set_taborder("21");
            obj.set_background("#E8D9FF");
            this.addChild(obj.name, obj);

            obj = new Button("btn_colorchart11","314","221","15","15",null,null,null,null,null,null,this);
            obj.set_taborder("22");
            obj.set_background("#FFD9FA");
            this.addChild(obj.name, obj);

            obj = new Button("btn_colorchart12","328","221","15","15",null,null,null,null,null,null,this);
            obj.set_taborder("23");
            obj.set_background("#FFD9EC");
            this.addChild(obj.name, obj);

            obj = new Button("btn_colorchart13","174","235","15","15",null,null,null,null,null,null,this);
            obj.set_taborder("24");
            obj.set_background("#FFA7A7");
            this.addChild(obj.name, obj);

            obj = new Button("btn_colorchart14","188","235","15","15",null,null,null,null,null,null,this);
            obj.set_taborder("25");
            obj.set_background("#FFC19E");
            this.addChild(obj.name, obj);

            obj = new Button("btn_colorchart15","202","235","15","15",null,null,null,null,null,null,this);
            obj.set_taborder("26");
            obj.set_background("#FFE08C");
            this.addChild(obj.name, obj);

            obj = new Button("btn_colorchart16","216","235","15","15",null,null,null,null,null,null,this);
            obj.set_taborder("27");
            obj.set_background("#FAED7D");
            this.addChild(obj.name, obj);

            obj = new Button("btn_colorchart17","230","235","15","15",null,null,null,null,null,null,this);
            obj.set_taborder("28");
            obj.set_background("#CEF279");
            this.addChild(obj.name, obj);

            obj = new Button("btn_colorchart18","244","235","15","15",null,null,null,null,null,null,this);
            obj.set_taborder("29");
            obj.set_background("#B7F0B1");
            this.addChild(obj.name, obj);

            obj = new Button("btn_colorchart19","258","235","15","15",null,null,null,null,null,null,this);
            obj.set_taborder("30");
            obj.set_background("#B2EBF4");
            this.addChild(obj.name, obj);

            obj = new Button("btn_colorchart20","272","235","15","15",null,null,null,null,null,null,this);
            obj.set_taborder("31");
            obj.set_background("#B2CCFF");
            this.addChild(obj.name, obj);

            obj = new Button("btn_colorchart21","286","235","15","15",null,null,null,null,null,null,this);
            obj.set_taborder("32");
            obj.set_background("#B5B2FF");
            this.addChild(obj.name, obj);

            obj = new Button("btn_colorchart22","300","235","15","15",null,null,null,null,null,null,this);
            obj.set_taborder("33");
            obj.set_background("#D1B2FF");
            this.addChild(obj.name, obj);

            obj = new Button("btn_colorchart23","314","235","15","15",null,null,null,null,null,null,this);
            obj.set_taborder("34");
            obj.set_background("#FFB2F5");
            this.addChild(obj.name, obj);

            obj = new Button("btn_colorchart24","328","235","15","15",null,null,null,null,null,null,this);
            obj.set_taborder("35");
            obj.set_background("#FFB2D9");
            this.addChild(obj.name, obj);
            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",500,350,this,function(p){});
            obj.set_mobileorientation("landscape");
            this.addLayout(obj.name, obj);
            
            // BindItem Information

            
            // TriggerItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.registerScript("deptAddPopup.xfdl", function() {
        //부서코드는 숫자로만 입력되도록 maskedit으로 작성하였음.
        //type number, textalign left


        //취소 버튼
        this.btn_cancel_onclick = function(obj,e)
        {
        	this.close("cancel");
        };


        //저장 버튼
        this.btn_submit_onclick = function(obj,e)
        {
        	var deptRtn = "";
        	var deptname = this.edt_deptname.value;
        	var deptcolor = "";

        	for(var i=0; i<this.ds_color.rowcount; i++)
        	{
        		var objBtn = this.components["btn_color" + i];
        		var bStatus = objBtn.getSelectStatus();

        		if(bStatus){ //status가 true일 때
        			trace("저장된 컬러:" + objBtn.background);
        			deptcolor = objBtn.background;
        		}
        	}


        	//deptname이 비어있을 때
        	if(deptname == null ||  deptname.length == 0) {
        		this.static_msg.set_text("부서 이름을 입력하세요");
        		this.edt_deptname.setFocus();
        		return;
        	} else {
        // 		trace(this.edt_deptname.value);
        // 		trace(this.medt_deptcode.value);
        // 		trace(this.edt_deptsecond.value);
        		deptRtn += this.edt_deptname.value;
        		deptRtn += ":" + this.medt_deptcode.value;
        		deptRtn += ":" + this.edt_deptsecond.value;
        		deptRtn += ":" + deptcolor;
        	}

        	//저장 버튼 누르면 정보 넘겨주기
        	//반환값 배열로 넘겨주려고 했더니 잘 안돼서 string으로 바꿈.
        	this.close(deptRtn);
        };

        //deptname 칸에 텍스트 입력 시 msg ""로 지정
        this.edt_deptname_oninput = function(obj,e)
        {
        	this.static_msg.set_text("");
        };


        //load 됐을 때 color chart 생성
        this.deptAddPopup_onload = function(obj,e)
        {

        	var paramColor = this.parent.ds_color;	//파라미터로 받은 ds_color
        	this.ds_color.copyData(paramColor);	//받아온 ds_color 데이터를 popup ds_color로 복사

        	var nX = 174;
        	var nY = 221;
        	for(var i=0; i<this.ds_color.rowcount; i++)
        	{
        		var objBtn = new Button("btn_color" + i, nX, nY, 15, 15);
        		this.addChild("btn_color" + i, objBtn);
        		objBtn.set_background(this.ds_color.getColumn(i, "COLOR_VAL"));
        		objBtn.setEventHandler("onclick", this.btn_color_onclick, this);
        		objBtn.show();
        		nX += 14;
        		if(i ==  11){
        			nX = 174;
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

        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload",this.deptAddPopup_onload,this);
            this.static_dept01.addEventHandler("onclick",this.static_dept01_onclick,this);
            this.edt_deptname.addEventHandler("oninput",this.edt_deptname_oninput,this);
            this.btn_submit.addEventHandler("onclick",this.btn_submit_onclick,this);
            this.btn_cancel.addEventHandler("onclick",this.btn_cancel_onclick,this);
        };
        this.loadIncludeScript("deptAddPopup.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
