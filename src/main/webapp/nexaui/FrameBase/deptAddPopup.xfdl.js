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

            obj = new Button("btn_colorchart","174","221","15","15",null,null,null,null,null,null,this);
            obj.set_taborder("8");
            obj.set_background("#FFD8D8");
            this.addChild(obj.name, obj);

            obj = new Button("btn_colorchart00","188","221","15","15",null,null,null,null,null,null,this);
            obj.set_taborder("9");
            obj.set_background("#FAE0D4");
            this.addChild(obj.name, obj);

            obj = new Button("btn_colorchart01","202","221","15","15",null,null,null,null,null,null,this);
            obj.set_taborder("10");
            obj.set_background("#FAECC5");
            this.addChild(obj.name, obj);

            obj = new Button("btn_colorchart02","216","221","15","15",null,null,null,null,null,null,this);
            obj.set_taborder("11");
            obj.set_background("#FAF4C0");
            this.addChild(obj.name, obj);

            obj = new Button("btn_colorchart03","230","221","15","15",null,null,null,null,null,null,this);
            obj.set_taborder("12");
            obj.set_background("#E4F7BA");
            this.addChild(obj.name, obj);

            obj = new Button("btn_colorchart04","244","221","15","15",null,null,null,null,null,null,this);
            obj.set_taborder("13");
            obj.set_background("#CEFBC9");
            this.addChild(obj.name, obj);

            obj = new Button("btn_colorchart05","258","221","15","15",null,null,null,null,null,null,this);
            obj.set_taborder("14");
            obj.set_background("#D4F4FA");
            this.addChild(obj.name, obj);

            obj = new Button("btn_colorchart06","272","221","15","15",null,null,null,null,null,null,this);
            obj.set_taborder("15");
            obj.set_background("#D9E5FF");
            this.addChild(obj.name, obj);

            obj = new Button("btn_colorchart07","286","221","15","15",null,null,null,null,null,null,this);
            obj.set_taborder("16");
            obj.set_background("#DAD9FF");
            this.addChild(obj.name, obj);

            obj = new Button("btn_colorchart08","300","221","15","15",null,null,null,null,null,null,this);
            obj.set_taborder("17");
            obj.set_background("#E8D9FF");
            this.addChild(obj.name, obj);

            obj = new Button("btn_colorchart09","314","221","15","15",null,null,null,null,null,null,this);
            obj.set_taborder("18");
            obj.set_background("#FFD9FA");
            this.addChild(obj.name, obj);

            obj = new Button("btn_colorchart10","328","221","15","15",null,null,null,null,null,null,this);
            obj.set_taborder("19");
            obj.set_background("#FFD9EC");
            this.addChild(obj.name, obj);

            obj = new Button("btn_colorchart11","174","235","15","15",null,null,null,null,null,null,this);
            obj.set_taborder("20");
            obj.set_background("#FFA7A7");
            this.addChild(obj.name, obj);

            obj = new Button("btn_colorchart00_00","188","235","15","15",null,null,null,null,null,null,this);
            obj.set_taborder("21");
            obj.set_background("#FFC19E");
            this.addChild(obj.name, obj);

            obj = new Button("btn_colorchart01_00","202","235","15","15",null,null,null,null,null,null,this);
            obj.set_taborder("22");
            obj.set_background("#FFE08C");
            this.addChild(obj.name, obj);

            obj = new Button("btn_colorchart02_00","216","235","15","15",null,null,null,null,null,null,this);
            obj.set_taborder("23");
            obj.set_background("#FAED7D");
            this.addChild(obj.name, obj);

            obj = new Button("btn_colorchart03_00","230","235","15","15",null,null,null,null,null,null,this);
            obj.set_taborder("24");
            obj.set_background("#CEF279");
            this.addChild(obj.name, obj);

            obj = new Button("btn_colorchart04_00","244","235","15","15",null,null,null,null,null,null,this);
            obj.set_taborder("25");
            obj.set_background("#B7F0B1");
            this.addChild(obj.name, obj);

            obj = new Button("btn_colorchart05_00","258","235","15","15",null,null,null,null,null,null,this);
            obj.set_taborder("26");
            obj.set_background("#B2EBF4");
            this.addChild(obj.name, obj);

            obj = new Button("btn_colorchart06_00","272","235","15","15",null,null,null,null,null,null,this);
            obj.set_taborder("27");
            obj.set_background("#B2CCFF");
            this.addChild(obj.name, obj);

            obj = new Button("btn_colorchart07_00","286","235","15","15",null,null,null,null,null,null,this);
            obj.set_taborder("28");
            obj.set_background("#B5B2FF");
            this.addChild(obj.name, obj);

            obj = new Button("btn_colorchart08_00","300","235","15","15",null,null,null,null,null,null,this);
            obj.set_taborder("29");
            obj.set_background("#D1B2FF");
            this.addChild(obj.name, obj);

            obj = new Button("btn_colorchart09_00","314","235","15","15",null,null,null,null,null,null,this);
            obj.set_taborder("30");
            obj.set_background("#FFB2F5");
            this.addChild(obj.name, obj);

            obj = new Button("btn_colorchart10_00","328","235","15","15",null,null,null,null,null,null,this);
            obj.set_taborder("31");
            obj.set_background("#FFB2D9");
            this.addChild(obj.name, obj);

            obj = new Button("btn_submit","165","280","80","30",null,null,null,null,null,null,this);
            obj.set_taborder("32");
            obj.set_text("저장");
            obj.set_letterSpacing("0px");
            obj.set_cssclass("save");
            this.addChild(obj.name, obj);

            obj = new Button("btn_cancel","255","280","80","30",null,null,null,null,null,null,this);
            obj.set_taborder("33");
            obj.set_text("취소");
            obj.set_letterSpacing("0px");
            obj.set_cssclass("cancel");
            this.addChild(obj.name, obj);

            obj = new Static("static_msg","174","95","216","30",null,null,null,null,null,null,this);
            obj.set_taborder("34");
            obj.set_border("0px none,0px none,1px black");
            obj.set_font("normal 7pt/normal \"KR\"");
            obj.set_color("#ff1414");
            this.addChild(obj.name, obj);

            obj = new MaskEdit("medt_deptcode","174","120","216","30",null,null,null,null,null,null,this);
            obj.set_taborder("35");
            obj.set_textAlign("left");
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
        		//deptRtn[3] = "색상";
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

        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
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
