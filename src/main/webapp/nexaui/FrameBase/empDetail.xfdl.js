(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("empDetail");
            this.set_titletext("New Form");
            this.set_scrolltype("none");
            if (Form == this.constructor)
            {
                this._setFormPosition(1280,720);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds_empl", this);
            obj._setContents("<ColumnInfo><Column id=\"emplId\" type=\"STRING\" size=\"20\"/><Column id=\"deptCode\" type=\"STRING\" size=\"20\"/><Column id=\"positionCode\" type=\"STRING\" size=\"20\"/><Column id=\"emplName\" type=\"STRING\" size=\"20\"/><Column id=\"startDate\" type=\"DATE\" size=\"256\"/><Column id=\"email\" type=\"STRING\" size=\"50\"/><Column id=\"directNo\" type=\"STRING\" size=\"20\"/><Column id=\"phoneNo\" type=\"STRING\" size=\"20\"/><Column id=\"recruitCategory\" type=\"STRING\" size=\"20\"/><Column id=\"salaryCategory\" type=\"STRING\" size=\"20\"/><Column id=\"referrer\" type=\"STRING\" size=\"20\"/><Column id=\"isStatus\" type=\"STRING\" size=\"20\"/><Column id=\"birthday\" type=\"DATE\" size=\"256\"/><Column id=\"gender\" type=\"STRING\" size=\"10\"/><Column id=\"isMarriage\" type=\"STRING\" size=\"1\"/><Column id=\"isDisability\" type=\"STRING\" size=\"1\"/><Column id=\"isVeterans\" type=\"STRING\" size=\"1\"/><Column id=\"endDate\" type=\"DATE\" size=\"256\"/><Column id=\"endReason\" type=\"STRING\" size=\"20\"/><Column id=\"emplProfile\" type=\"STRING\" size=\"1000\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_dept", this);
            obj._setContents("<ColumnInfo><Column id=\"deptCode\" type=\"STRING\" size=\"20\"/><Column id=\"deptName\" type=\"STRING\" size=\"30\"/><Column id=\"deptSecondname\" type=\"STRING\" size=\"50\"/><Column id=\"deptColor\" type=\"STRING\" size=\"50\"/><Column id=\"deptMaster\" type=\"STRING\" size=\"20\"/><Column id=\"deptHiredate\" type=\"DATE\" size=\"20\"/><Column id=\"deptUppercode\" type=\"STRING\" size=\"20\"/><Column id=\"deptLevel\" type=\"INT\" size=\"20\"/></ColumnInfo><Rows><Row><Col id=\"deptCode\">10</Col><Col id=\"deptName\">하이그룹</Col><Col id=\"deptSecondname\">HIGRP</Col><Col id=\"deptColor\">#FFD8D8</Col><Col id=\"deptMaster\">id1</Col><Col id=\"deptHiredate\">20220426</Col><Col id=\"deptUppercode\">NULL</Col><Col id=\"deptLevel\">0</Col></Row><Row><Col id=\"deptCode\">1010</Col><Col id=\"deptName\">경영관리팀</Col><Col id=\"deptSecondname\">BM</Col><Col id=\"deptColor\">#FAE0D4</Col><Col id=\"deptMaster\">id2</Col><Col id=\"deptHiredate\">20220426</Col><Col id=\"deptUppercode\">10</Col><Col id=\"deptLevel\">1</Col></Row><Row><Col id=\"deptCode\">1020</Col><Col id=\"deptName\">영업팀</Col><Col id=\"deptSecondname\">SALES</Col><Col id=\"deptColor\">#FAECC5</Col><Col id=\"deptMaster\">id3</Col><Col id=\"deptHiredate\">20220426</Col><Col id=\"deptUppercode\">10</Col><Col id=\"deptLevel\">1</Col></Row><Row><Col id=\"deptCode\">102010</Col><Col id=\"deptName\">국내영업팀</Col><Col id=\"deptSecondname\">DS</Col><Col id=\"deptColor\">#FFFED7</Col><Col id=\"deptMaster\">ID4</Col><Col id=\"deptHiredate\">20220426</Col><Col id=\"deptUppercode\">1020</Col><Col id=\"deptLevel\">2</Col></Row><Row><Col id=\"deptCode\">102020</Col><Col id=\"deptName\">해외영업팀</Col><Col id=\"deptSecondname\">OS</Col><Col id=\"deptColor\">#FFFED7</Col><Col id=\"deptMaster\">ID5</Col><Col id=\"deptHiredate\">20220426</Col><Col id=\"deptUppercode\">1020</Col><Col id=\"deptLevel\">2</Col></Row><Row><Col id=\"deptCode\">102030</Col><Col id=\"deptName\">영업관리팀</Col><Col id=\"deptSecondname\">SM</Col><Col id=\"deptColor\">#FFFED7</Col><Col id=\"deptMaster\">ID6</Col><Col id=\"deptHiredate\">20220426</Col><Col id=\"deptUppercode\">1020</Col><Col id=\"deptLevel\">2</Col></Row><Row><Col id=\"deptCode\">1030</Col><Col id=\"deptName\">상품기획팀</Col><Col id=\"deptSecondname\">SOP</Col><Col id=\"deptColor\">#FAF4C0</Col><Col id=\"deptMaster\">ID7</Col><Col id=\"deptHiredate\">20220426</Col><Col id=\"deptUppercode\">10</Col><Col id=\"deptLevel\">1</Col></Row><Row><Col id=\"deptCode\">1040</Col><Col id=\"deptLevel\">1</Col><Col id=\"deptName\">구매팀</Col><Col id=\"deptSecondname\">PCD</Col><Col id=\"deptColor\">#E4F7BA</Col><Col id=\"deptMaster\">ID8</Col><Col id=\"deptHiredate\">20220426</Col><Col id=\"deptUppercode\">10</Col></Row><Row><Col id=\"deptCode\">1050</Col><Col id=\"deptLevel\">1</Col><Col id=\"deptName\">물류팀</Col><Col id=\"deptSecondname\">DTB</Col><Col id=\"deptColor\">#CEFBC9</Col><Col id=\"deptMaster\">ID9</Col><Col id=\"deptHiredate\">20220426</Col><Col id=\"deptUppercode\">10</Col></Row><Row><Col id=\"deptCode\">1060</Col><Col id=\"deptLevel\">1</Col><Col id=\"deptName\">품질팀</Col><Col id=\"deptSecondname\">QA</Col><Col id=\"deptColor\">#D4F4FA</Col><Col id=\"deptMaster\">ID10</Col><Col id=\"deptHiredate\">20220426</Col><Col id=\"deptUppercode\">10</Col></Row><Row><Col id=\"deptCode\">1070</Col><Col id=\"deptLevel\">1</Col><Col id=\"deptName\">생산팀</Col><Col id=\"deptSecondname\">PROD</Col><Col id=\"deptColor\">#D9E5FF</Col><Col id=\"deptMaster\">ID11</Col><Col id=\"deptHiredate\">20220426</Col><Col id=\"deptUppercode\">10</Col></Row><Row><Col id=\"deptCode\">107010</Col><Col id=\"deptLevel\">2</Col><Col id=\"deptName\">생산공정팀</Col><Col id=\"deptSecondname\">PRODP</Col><Col id=\"deptColor\">#EBF7FF</Col><Col id=\"deptMaster\">ID12</Col><Col id=\"deptHiredate\">20220426</Col><Col id=\"deptUppercode\">1070</Col></Row><Row><Col id=\"deptCode\">107020</Col><Col id=\"deptLevel\">2</Col><Col id=\"deptName\">생산관리팀</Col><Col id=\"deptSecondname\">PRODM</Col><Col id=\"deptColor\">#EBF7FF</Col><Col id=\"deptMaster\">ID13</Col><Col id=\"deptHiredate\">20220426</Col><Col id=\"deptUppercode\">1070</Col></Row><Row><Col id=\"deptCode\">107030</Col><Col id=\"deptLevel\">2</Col><Col id=\"deptName\">생산외주팀</Col><Col id=\"deptSecondname\">PRODOS</Col><Col id=\"deptColor\">#EBF7FF</Col><Col id=\"deptMaster\">ID14</Col><Col id=\"deptHiredate\">20220426</Col><Col id=\"deptUppercode\">1070</Col></Row><Row><Col id=\"deptCode\">1080</Col><Col id=\"deptLevel\">1</Col><Col id=\"deptName\">제조팀</Col><Col id=\"deptSecondname\">MFT</Col><Col id=\"deptColor\">#DAD9FF</Col><Col id=\"deptMaster\">ID15</Col><Col id=\"deptHiredate\">20220426</Col><Col id=\"deptUppercode\">10</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_cert", this);
            obj._setContents("<ColumnInfo><Column id=\"certCategory\" type=\"STRING\" size=\"100\"/><Column id=\"certName\" type=\"STRING\" size=\"100\"/><Column id=\"certEnrollNo\" type=\"STRING\" size=\"100\"/><Column id=\"certLevel\" type=\"STRING\" size=\"100\"/><Column id=\"certInst\" type=\"STRING\" size=\"100\"/><Column id=\"certStartDate\" type=\"DATE\" size=\"256\"/><Column id=\"certEndDate\" type=\"DATE\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_jobRole", this);
            obj._setContents("<ColumnInfo><Column id=\"jobRoleDivision\" type=\"STRING\" size=\"100\"/><Column id=\"jobRoleTitle\" type=\"STRING\" size=\"100\"/><Column id=\"jobRoleStartDate\" type=\"DATE\" size=\"256\"/><Column id=\"jobRoleEndDate\" type=\"DATE\" size=\"256\"/><Column id=\"jobRoleConts\" type=\"STRING\" size=\"100\"/><Column id=\"jobRoleEtc\" type=\"STRING\" size=\"100\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_lang", this);
            obj._setContents("<ColumnInfo><Column id=\"langCategory\" type=\"STRING\" size=\"100\"/><Column id=\"langName\" type=\"STRING\" size=\"300\"/><Column id=\"langTestDate\" type=\"DATE\" size=\"256\"/><Column id=\"langInst\" type=\"STRING\" size=\"100\"/><Column id=\"langScore\" type=\"INT\" size=\"256\"/><Column id=\"langGrade\" type=\"STRING\" size=\"100\"/><Column id=\"langEtc\" type=\"STRING\" size=\"300\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_military", this);
            obj._setContents("<ColumnInfo><Column id=\"militaryGrade\" type=\"STRING\" size=\"100\"/><Column id=\"militaryCode\" type=\"STRING\" size=\"100\"/><Column id=\"isMilitaryEnd\" type=\"STRING\" size=\"1\"/><Column id=\"militaryStartDate\" type=\"DATE\" size=\"256\"/><Column id=\"militaryEndDate\" type=\"DATE\" size=\"256\"/><Column id=\"militaryEtc\" type=\"STRING\" size=\"1000\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_status", this);
            obj._setContents("<ColumnInfo><Column id=\"statusCode\" type=\"STRING\" size=\"20\"/><Column id=\"statusName\" type=\"STRING\" size=\"20\"/></ColumnInfo><Rows><Row><Col id=\"statusCode\">임시</Col><Col id=\"statusName\">임시</Col></Row><Row><Col id=\"statusCode\">재직중</Col><Col id=\"statusName\">재직중</Col></Row><Row><Col id=\"statusCode\">휴직중</Col><Col id=\"statusName\">휴직중</Col></Row><Row><Col id=\"statusCode\">퇴사</Col><Col id=\"statusName\">퇴사</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_career", this);
            obj._setContents("<ColumnInfo><Column id=\"careerStartDate\" type=\"DATE\" size=\"256\"/><Column id=\"careerEndDate\" type=\"DATE\" size=\"256\"/><Column id=\"careerPlace\" type=\"STRING\" size=\"100\"/><Column id=\"careerRank\" type=\"STRING\" size=\"100\"/><Column id=\"careerJobRole\" type=\"STRING\" size=\"100\"/><Column id=\"careerPeriod\" type=\"DATE\" size=\"256\"/><Column id=\"careerEndReason\" type=\"STRING\" size=\"100\"/><Column id=\"careerEtc\" type=\"STRING\" size=\"100\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_pos", this);
            obj._setContents("<ColumnInfo><Column id=\"positionCode\" type=\"STRING\" size=\"20\"/><Column id=\"positionName\" type=\"STRING\" size=\"30\"/><Column id=\"positionUseMember\" type=\"INT\" size=\"256\"/><Column id=\"positionSequence\" type=\"INT\" size=\"256\"/><Column id=\"positionLevel\" type=\"INT\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Div("Div00","0","0","200",null,null,"0",null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_background("#ffffff");
            obj.set_border("0px none, 1px solid #dddddd, 0px none, 0px none");
            obj.set_font("12px/normal \"Noto Sans KR\"");
            this.addChild(obj.name, obj);

            obj = new Static("Static00_00","200","0",null,"60","0",null,null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_text("사원 상세 정보 조회");
            obj.set_padding("16px 20px");
            obj.set_font("bold 22px/normal \"Noto Sans KR\"");
            obj.set_letterSpacing("-1px");
            obj.set_border("0px none, 0px none, 1px solid #dddddd");
            this.addChild(obj.name, obj);

            obj = new Static("Static00","0","0","200","60",null,null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_text("사원관리");
            obj.set_padding("16x 24px");
            obj.set_font("bold 22px/normal \"Noto Sans KR\"");
            obj.set_letterSpacing("-1px");
            this.addChild(obj.name, obj);

            obj = new Grid("Grid00","220","81",null,"189","20",null,null,null,null,null,this);
            obj.set_taborder("3");
            obj.set_binddataset("ds_empl");
            obj.set_autofittype("col");
            obj.set_cellsizingtype("none");
            obj.set_autosizingtype("none");
            obj.set_cssclass("detailTable");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"139\"/><Column size=\"114\"/><Column size=\"175\"/><Column size=\"116\"/><Column size=\"182\"/></Columns><Rows><Row size=\"32\" band=\"head\"/><Row size=\"39\"/><Row size=\"39\"/><Row size=\"38\"/><Row size=\"39\"/></Rows><Band id=\"head\"><Cell colspan=\"5\" text=\"사원 정보 상세\" color=\"#333333\" border=\"1px solid #cccccc,0px none\" font=\"500 14px/normal &quot;Noto Sans KR&quot;\" background=\"#f9f9f9\"/></Band><Band id=\"body\"><Cell rowspan=\"4\" text=\"expr:imgURL::profile\" displaytype=\"imagecontrol\"/><Cell col=\"1\" text=\"이름\" textAlign=\"center\" font=\"bold 12px/normal &quot;Gulim&quot;\"/><Cell col=\"2\" text=\"bind:emplName\" padding=\"0px 20px\" edittype=\"text\"/><Cell col=\"3\" text=\"소속부서\" textAlign=\"center\" font=\"bold 12px/normal &quot;Gulim&quot;\"/><Cell col=\"4\" text=\"bind:deptCode\" displaytype=\"combotext\" edittype=\"combo\" combodataset=\"ds_dept\" combocodecol=\"deptCode\" combodatacol=\"deptName\" padding=\"0px 20px\"/><Cell row=\"1\" col=\"1\" text=\"직위/직책\" textAlign=\"center\" font=\"bold 12px/normal &quot;Gulim&quot;\"/><Cell row=\"1\" col=\"2\" text=\"bind:positionCode\" displaytype=\"combotext\" edittype=\"combo\" padding=\"0px 20px\" combodataset=\"ds_pos\" combodatacol=\"positionName\" combocodecol=\"positionCode\"/><Cell row=\"1\" col=\"3\" text=\"직통번호\" textAlign=\"center\" font=\"bold 12px/normal &quot;Gulim&quot;\"/><Cell row=\"1\" col=\"4\" text=\"bind:directNo\" padding=\"0px 20px\" edittype=\"text\"/><Cell row=\"2\" col=\"1\" text=\"이메일\" textAlign=\"center\" font=\"bold 12px/normal &quot;Gulim&quot;\"/><Cell row=\"2\" col=\"2\" text=\"bind:email\" padding=\"0px 20px\" edittype=\"text\"/><Cell row=\"2\" col=\"3\" text=\"휴대전화번호\" textAlign=\"center\" font=\"bold 12px/normal &quot;Gulim&quot;\"/><Cell row=\"2\" col=\"4\" text=\"bind:phoneNo\" padding=\"0px 20px\" edittype=\"text\"/><Cell row=\"3\" col=\"1\" text=\"입사일\" textAlign=\"center\" font=\"bold 12px/normal &quot;Gulim&quot;\"/><Cell row=\"3\" col=\"2\" text=\"bind:startDate\" padding=\"0px 20px\"/><Cell row=\"3\" col=\"3\" text=\"상태\" textAlign=\"center\" font=\"bold 12px/normal &quot;Gulim&quot;\"/><Cell row=\"3\" col=\"4\" text=\"bind:isStatus\" padding=\"0px 20px\" edittype=\"combo\" combodataset=\"ds_status\" combodatacol=\"statusName\" combodisplaynulltext=\"재직 상태\" combocodecol=\"statusCode\" combodisplaynulltype=\"nulltext\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new Tab("Tab00","200","310",null,"240","0",null,null,null,null,null,this);
            obj.set_taborder("4");
            obj.set_tabindex("0");
            this.addChild(obj.name, obj);

            obj = new Tabpage("Tabpage1",this.Tab00);
            obj.set_text("기본");
            this.Tab00.addChild(obj.name, obj);

            obj = new Grid("Grid00","20","12",null,"128","20",null,null,null,null,null,this.Tab00.Tabpage1.form);
            obj.set_taborder("0");
            obj.set_binddataset("ds_empl");
            obj.set_cssclass("detailTable");
            obj.set_autofittype("col");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/></Columns><Rows><Row size=\"0\" band=\"head\"/><Row size=\"42\"/><Row size=\"42\"/><Row size=\"42\"/></Rows><Band id=\"head\"><Cell colspan=\"4\" text=\"기본정보\" color=\"#333333\" border=\"1px solid #dbdee2\"/><Cell col=\"4\"/><Cell col=\"5\"/><Cell col=\"6\"/><Cell col=\"7\"/></Band><Band id=\"body\"><Cell text=\"사원아이디\" textAlign=\"center\" background=\"#f9f9f9\"/><Cell col=\"1\" text=\"bind:emplId\" padding=\"0px 10px\"/><Cell col=\"2\" text=\"채용구분\" textAlign=\"center\" background=\"#f9f9f9\"/><Cell col=\"3\" text=\"bind:recruitCategory\" padding=\"0px 10px\"/><Cell col=\"4\" textAlign=\"center\" background=\"#f9f9f9\" text=\"급여구분\"/><Cell col=\"5\" text=\"bind:salaryCategory\" padding=\"0px 10px\"/><Cell col=\"6\" textAlign=\"center\" background=\"#f9f9f9\" text=\"추천자\"/><Cell col=\"7\" text=\"bind:referrer\" padding=\"0px 10px\"/><Cell row=\"1\" textAlign=\"center\" background=\"#f9f9f9\" text=\"생년월일\"/><Cell row=\"1\" col=\"1\" text=\"bind:birthday\" padding=\"0px 10px\" displaytype=\"normal\"/><Cell row=\"1\" col=\"2\" textAlign=\"center\" background=\"#f9f9f9\" text=\"성별\"/><Cell row=\"1\" col=\"3\" text=\"bind:gender\" padding=\"0px 10px\"/><Cell row=\"1\" col=\"4\" textAlign=\"center\" background=\"#f9f9f9\" text=\"결혼여부\"/><Cell row=\"1\" col=\"5\" text=\"bind:isMarriage\" padding=\"0px 10px\"/><Cell row=\"1\" col=\"6\" textAlign=\"center\" background=\"#f9f9f9\" text=\"장애여부\"/><Cell row=\"1\" col=\"7\" text=\"bind:isDisability\" padding=\"0px 10px\"/><Cell row=\"2\" textAlign=\"center\" background=\"#f9f9f9\" text=\"보훈여부\"/><Cell row=\"2\" col=\"1\" text=\"bind:isVeterans\" padding=\"0px 10px\"/><Cell row=\"2\" col=\"2\" textAlign=\"center\" background=\"#f9f9f9\" text=\"퇴사일\"/><Cell row=\"2\" col=\"3\" text=\"bind:endDate\" padding=\"0px 10px\"/><Cell row=\"2\" col=\"4\" textAlign=\"center\" background=\"#f9f9f9\" text=\"퇴직사유\"/><Cell row=\"2\" col=\"5\" text=\"bind:endReason\" padding=\"0px 10px\"/><Cell row=\"2\" col=\"6\" textAlign=\"center\" background=\"#f9f9f9\"/><Cell row=\"2\" col=\"7\" padding=\"0px 10px\"/></Band></Format></Formats>");
            this.Tab00.Tabpage1.addChild(obj.name, obj);

            obj = new Button("btnResign","20","155","56","20",null,null,null,null,null,null,this.Tab00.Tabpage1.form);
            obj.set_taborder("1");
            obj.set_text("퇴직처리");
            obj.set_border("0px none, 0px none, 1px solid #c10000");
            obj.set_color("#c10000");
            obj.set_font("12px/normal \"Noto Sans KR\"");
            this.Tab00.Tabpage1.addChild(obj.name, obj);

            obj = new Tabpage("Tabpage2",this.Tab00);
            obj.set_text("직무/담당");
            this.Tab00.addChild(obj.name, obj);

            obj = new Grid("Grid00","20","12",null,"170","20",null,null,null,null,null,this.Tab00.Tabpage2.form);
            obj.set_taborder("0");
            obj.set_binddataset("ds_jobRole");
            obj.set_autofittype("col");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/></Columns><Rows><Row size=\"30\" band=\"head\"/><Row size=\"30\"/></Rows><Band id=\"head\"><Cell text=\"NO\" color=\"#333333\" border=\"1px solid #dbdee2\" background=\"#f9f9f9\"/><Cell col=\"1\" text=\"직군\" color=\"#333333\" border=\"1px solid #dbdee2\" background=\"#f9f9f9\"/><Cell col=\"2\" text=\"직무\" color=\"#333333\" border=\"1px solid #dbdee2\" background=\"#f9f9f9\"/><Cell col=\"3\" text=\"직무시작일\" color=\"#333333\" border=\"1px solid #dbdee2\" background=\"#f9f9f9\"/><Cell col=\"4\" text=\"직무종료일\" color=\"#333333\" border=\"1px solid #dbdee2\" background=\"#f9f9f9\"/><Cell col=\"5\" text=\"담당업무\" color=\"#333333\" border=\"1px solid #dbdee2\" background=\"#f9f9f9\"/><Cell col=\"6\" text=\"비고\" color=\"#333333\" border=\"1px solid #dbdee2\" background=\"#f9f9f9\"/></Band><Band id=\"body\"><Cell text=\"expr:currow+1\"/><Cell col=\"1\" text=\"bind:jobRoleDivision\"/><Cell col=\"2\" text=\"bind:jobRoleTitle\"/><Cell col=\"3\" text=\"bind:jobRoleStartDate\"/><Cell col=\"4\" text=\"bind:jobRoleEndDate\"/><Cell col=\"5\" text=\"bind:jobRoleConts\"/><Cell col=\"6\" text=\"bind:jobRoleEtc\"/></Band></Format></Formats>");
            this.Tab00.Tabpage2.addChild(obj.name, obj);

            obj = new Tabpage("Tabpage3",this.Tab00);
            obj.set_text("경력");
            this.Tab00.addChild(obj.name, obj);

            obj = new Grid("Grid00","20","12",null,"170","20",null,null,null,null,null,this.Tab00.Tabpage3.form);
            obj.set_taborder("0");
            obj.set_binddataset("ds_career");
            obj.set_autofittype("col");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/></Columns><Rows><Row size=\"30\" band=\"head\"/><Row size=\"30\"/></Rows><Band id=\"head\"><Cell color=\"#333333\" text=\"NO\" border=\"1px solid #dbdee2\" background=\"#f9f9f9\"/><Cell col=\"1\" text=\"경력시작일\" color=\"#333333\" border=\"1px solid #dbdee2\" background=\"#f9f9f9\"/><Cell col=\"2\" text=\"경력종료일\" color=\"#333333\" border=\"1px solid #dbdee2\" background=\"#f9f9f9\"/><Cell col=\"3\" text=\"근무처\" color=\"#333333\" border=\"1px solid #dbdee2\" background=\"#f9f9f9\"/><Cell col=\"4\" text=\"직위\" color=\"#333333\" border=\"1px solid #dbdee2\" background=\"#f9f9f9\"/><Cell col=\"5\" text=\"담당업무\" color=\"#333333\" border=\"1px solid #dbdee2\" background=\"#f9f9f9\"/><Cell col=\"6\" text=\"근속기간\" color=\"#333333\" border=\"1px solid #dbdee2\" background=\"#f9f9f9\"/><Cell col=\"7\" text=\"퇴사사유\" color=\"#333333\" border=\"1px solid #dbdee2\" background=\"#f9f9f9\"/><Cell col=\"8\" text=\"비고\" color=\"#333333\" border=\"1px solid #dbdee2\" background=\"#f9f9f9\"/></Band><Band id=\"body\"><Cell text=\"expr:currow+1\"/><Cell col=\"1\" text=\"bind:careerStartDate\" edittype=\"date\"/><Cell col=\"2\" text=\"bind:careerEndDate\" edittype=\"date\"/><Cell col=\"3\" text=\"bind:careerPlace\"/><Cell col=\"4\" text=\"bind:careerRank\"/><Cell col=\"5\" text=\"bind:careerJobRole\"/><Cell col=\"6\" text=\"bind:careerPeriod\"/><Cell col=\"7\" text=\"bind:careerEndReason\"/><Cell col=\"8\" text=\"bind:careerEtc\"/></Band></Format></Formats>");
            this.Tab00.Tabpage3.addChild(obj.name, obj);

            obj = new Tabpage("Tabpage4",this.Tab00);
            obj.set_text("자격");
            this.Tab00.addChild(obj.name, obj);

            obj = new Grid("Grid00","20","12",null,"170","20",null,null,null,null,null,this.Tab00.Tabpage4.form);
            obj.set_taborder("0");
            obj.set_binddataset("ds_cert");
            obj.set_autofittype("col");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/></Columns><Rows><Row size=\"30\" band=\"head\"/><Row size=\"30\"/></Rows><Band id=\"head\"><Cell text=\"NO\" color=\"#333333\" border=\"1px solid #dbdee2\" background=\"#f9f9f9\"/><Cell col=\"1\" text=\"구분\" color=\"#333333\" border=\"1px solid #dbdee2\" background=\"#f9f9f9\"/><Cell col=\"2\" text=\"자격명\" color=\"#333333\" border=\"1px solid #dbdee2\" background=\"#f9f9f9\"/><Cell col=\"3\" text=\"자격증번호\" color=\"#333333\" border=\"1px solid #dbdee2\" background=\"#f9f9f9\"/><Cell col=\"4\" text=\"자격등급\" color=\"#333333\" border=\"1px solid #dbdee2\" background=\"#f9f9f9\"/><Cell col=\"5\" text=\"기관명\" color=\"#333333\" border=\"1px solid #dbdee2\" background=\"#f9f9f9\"/><Cell col=\"6\" text=\"취득일\" color=\"#333333\" border=\"1px solid #dbdee2\" background=\"#f9f9f9\"/><Cell col=\"7\" text=\"만료일\" color=\"#333333\" border=\"1px solid #dbdee2\" background=\"#f9f9f9\"/></Band><Band id=\"body\"><Cell text=\"expr:currow+1\"/><Cell col=\"1\" text=\"bind:certCategory\"/><Cell col=\"2\" text=\"bind:certName\"/><Cell col=\"3\" text=\"bind:certEnrollNo\"/><Cell col=\"4\" text=\"bind:certLevel\"/><Cell col=\"5\" text=\"bind:certInst\"/><Cell col=\"6\" text=\"bind:certStartDate\" edittype=\"date\"/><Cell col=\"7\" text=\"bind:certEndDate\" edittype=\"date\"/></Band></Format></Formats>");
            this.Tab00.Tabpage4.addChild(obj.name, obj);

            obj = new Tabpage("Tabpage5",this.Tab00);
            obj.set_text("어학");
            this.Tab00.addChild(obj.name, obj);

            obj = new Grid("Grid00","20","12",null,"170","20",null,null,null,null,null,this.Tab00.Tabpage5.form);
            obj.set_taborder("0");
            obj.set_binddataset("ds_lang");
            obj.set_autofittype("col");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/></Columns><Rows><Row size=\"30\" band=\"head\"/><Row size=\"30\"/></Rows><Band id=\"head\"><Cell text=\"NO\" color=\"#333333\" background=\"#f9f9f9\" border=\"1px solid #dbdee2\"/><Cell col=\"1\" color=\"#333333\" border=\"1px solid #dbdee2\" background=\"#f9f9f9\" text=\"구분\"/><Cell col=\"2\" text=\"어학명\" color=\"#333333\" border=\"1px solid #dbdee2\" background=\"#f9f9f9\"/><Cell col=\"3\" text=\"평가일\" color=\"#333333\" border=\"1px solid #dbdee2\" background=\"#f9f9f9\"/><Cell col=\"4\" text=\"평가기관\" color=\"#333333\" border=\"1px solid #dbdee2\" background=\"#f9f9f9\"/><Cell col=\"5\" text=\"점수\" color=\"#333333\" border=\"1px solid #dbdee2\" background=\"#f9f9f9\"/><Cell col=\"6\" text=\"등급\" color=\"#333333\" border=\"1px solid #dbdee2\" background=\"#f9f9f9\"/><Cell col=\"7\" text=\"비고\" color=\"#333333\" border=\"1px solid #dbdee2\" background=\"#f9f9f9\"/></Band><Band id=\"body\"><Cell text=\"expr:currow+1\"/><Cell col=\"1\" text=\"bind:langCategory\"/><Cell col=\"2\" text=\"bind:langName\"/><Cell col=\"3\" text=\"bind:langTestDate\" displaytype=\"date\"/><Cell col=\"4\" text=\"bind:langInst\"/><Cell col=\"5\" text=\"bind:langScore\"/><Cell col=\"6\" text=\"bind:langGrade\"/><Cell col=\"7\" text=\"bind:langEtc\"/></Band></Format></Formats>");
            this.Tab00.Tabpage5.addChild(obj.name, obj);

            obj = new Tabpage("Tabpage6",this.Tab00);
            obj.set_text("병역");
            this.Tab00.addChild(obj.name, obj);

            obj = new Grid("Grid00","20","12",null,"170","20",null,null,null,null,null,this.Tab00.Tabpage6.form);
            obj.set_taborder("0");
            obj.set_binddataset("ds_military");
            obj.set_autofittype("col");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/></Columns><Rows><Row size=\"30\" band=\"head\"/><Row size=\"30\"/></Rows><Band id=\"head\"><Cell text=\"NO\" color=\"#333333\" border=\"1px solid #dbdee2\" background=\"#f9f9f9\"/><Cell col=\"1\" text=\"계급\" color=\"#333333\" background=\"#f9f9f9\" border=\"1px solid #dbdee2\"/><Cell col=\"2\" text=\"군번\" color=\"#333333\" background=\"#f9f9f9\" border=\"1px solid #dbdee2\"/><Cell col=\"3\" text=\"전역구분\" color=\"#333333\" background=\"#f9f9f9\" border=\"1px solid #dbdee2\"/><Cell col=\"4\" text=\"입대일\" color=\"#333333\" background=\"#f9f9f9\" border=\"1px solid #dbdee2\"/><Cell col=\"5\" text=\"제대일\" color=\"#333333\" background=\"#f9f9f9\" border=\"1px solid #dbdee2\"/><Cell col=\"6\" text=\"비고\" color=\"#333333\" background=\"#f9f9f9\" border=\"1px solid #dbdee2\"/></Band><Band id=\"body\"><Cell text=\"expr:currow+1\"/><Cell col=\"1\" text=\"bind:militaryGrade\"/><Cell col=\"2\" text=\"bind:militaryCode\"/><Cell col=\"3\" text=\"bind:isMilitaryEnd\"/><Cell col=\"4\" text=\"bind:militaryStartDate\" displaytype=\"date\"/><Cell col=\"5\" text=\"bind:militaryEndDate\" displaytype=\"date\"/><Cell col=\"6\" text=\"bind:militaryEtc\"/></Band></Format></Formats>");
            this.Tab00.Tabpage6.addChild(obj.name, obj);

            obj = new Button("btn_save","600","560","120","32",null,null,null,null,null,null,this);
            obj.set_taborder("5");
            obj.set_text("저장");
            obj.set_cssclass("point");
            obj.set_font("14px/normal \"Noto Sans KR\"");
            this.addChild(obj.name, obj);

            obj = new Button("btn_cancel","730","560","120","32",null,null,null,null,null,null,this);
            obj.set_taborder("6");
            obj.set_text("취소");
            obj.set_cssclass("basic");
            obj.set_font("14px/normal \"Noto Sans KR\"");
            this.addChild(obj.name, obj);

            obj = new Static("link_emplLsit","24","85","200","20",null,null,null,null,null,null,this);
            obj.set_taborder("7");
            obj.set_text("사원 조회");
            obj.set_font("normal 14px/normal \"Noto Sans KR\"");
            obj.set_padding("0px");
            this.addChild(obj.name, obj);

            obj = new Static("link_addEmpl","24","120","106","20",null,null,null,null,null,null,this);
            obj.set_taborder("8");
            obj.set_text("사원 추가/승인");
            obj.set_font("14px/normal \"Noto Sans KR\"");
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
        this.registerScript("empDetail.xfdl", function() {
        this.ds_empl_onload = function(obj,e)
        {
        	this.transaction(
        		"tr_empl_select"// 1.ID
        		,"HirpURL::admin/empDetail.hirp"// 2.URL
        		,"" // 3.InDs : F->S jsp(I,U,D)
        		,"ds_empl=out_empl ds_jobRole=out_jobRole ds_lang=out_lang ds_cert=out_cert ds_military=out_military" // 4.OutDs : S->F jsp(SELECT)
        		,"emplId="+selectedEmplId // 5.InVar : F->S(var)
        		,"fn_callback_tran" // 6.callback function(transaction 완료시 호출되는 함수)
        	);
        };

        this.fn_callback_tran = function(id, nErrorCode, sErrorMsg)
        {
        	if(id=="tr_empl_select")
        	{
        		if(nErrorCode < 0)
        		{
        			this.alert("사원 상세 조회 실패 : " + sErrorMsg);
        			return;
        		}
        		this.alert("사원 상세 조회 성공");
        	}
        	else if(id=="tr_resign")
        	{
        		if(nErrorCode < 0)
        		{
        			this.alert("퇴직 처리 실패 : " + sErrorMsg);
        			return;
        		}
        		this.alert("퇴직 처리되었습니다.");
        		this.go("FrameBase::emplList.xfdl");
        	}
        }

        this.link_emplLsit_onclick = function(obj,e)
        {
        	this.go("FrameBase::emplList.xfdl");
        };

        this.link_addEmpl_onclick = function(obj,e)
        {
        	this.go("FrameBase::emplApproval.xfdl");
        };

        this.btnResign_onclick = function(obj,e)
        {
        	this.transaction(
        		"tr_resign"// 1.ID
        		,"HirpURL::admin/resignEmpl.hirp"// 2.URL
        		,"" // 3.InDs : F->S jsp(I,U,D)
        		,"" // 4.OutDs : S->F jsp(SELECT)
        		,"emplId="+selectedEmplId // 5.InVar : F->S(var)
        		,"fn_callback_tran" // 6.callback function(transaction 완료시 호출되는 함수)
        	);
        };

        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.Static00_00.addEventHandler("onclick",this.Static00_onclick,this);
            this.Static00.addEventHandler("onclick",this.Static00_onclick,this);
            this.Tab00.addEventHandler("onchanged",this.Tab00_onchanged,this);
            this.Tab00.Tabpage1.form.btnResign.addEventHandler("onclick",this.btnResign_onclick,this);
            this.link_emplLsit.addEventHandler("onclick",this.link_emplLsit_onclick,this);
            this.link_addEmpl.addEventHandler("onclick",this.link_addEmpl_onclick,this);
            this.ds_empl.addEventHandler("onload",this.ds_empl_onload,this);
            this.ds_dept.addEventHandler("canrowposchange",this.ds_dept_canrowposchange,this);
        };
        this.loadIncludeScript("empDetail.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
