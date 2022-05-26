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
            this.set_dragscrolltype("none");
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
            obj._setContents("<ColumnInfo><Column id=\"certCategory\" type=\"STRING\" size=\"100\"/><Column id=\"certName\" type=\"STRING\" size=\"100\"/><Column id=\"certEnrollNo\" type=\"STRING\" size=\"100\"/><Column id=\"certLevel\" type=\"STRING\" size=\"100\"/><Column id=\"certInst\" type=\"STRING\" size=\"100\"/><Column id=\"certStartDate\" type=\"DATE\" size=\"256\"/><Column id=\"certEndDate\" type=\"DATE\" size=\"256\"/><Column id=\"certNo\" type=\"INT\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_jobRole", this);
            obj._setContents("<ColumnInfo><Column id=\"jobRoleDivision\" type=\"STRING\" size=\"100\"/><Column id=\"jobRoleTitle\" type=\"STRING\" size=\"100\"/><Column id=\"jobRoleStartDate\" type=\"DATE\" size=\"256\"/><Column id=\"jobRoleEndDate\" type=\"DATE\" size=\"256\"/><Column id=\"jobRoleConts\" type=\"STRING\" size=\"100\"/><Column id=\"jobRoleEtc\" type=\"STRING\" size=\"100\"/><Column id=\"jobRoleNo\" type=\"INT\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_lang", this);
            obj._setContents("<ColumnInfo><Column id=\"langCategory\" type=\"STRING\" size=\"100\"/><Column id=\"langName\" type=\"STRING\" size=\"300\"/><Column id=\"langTestDate\" type=\"DATE\" size=\"256\"/><Column id=\"langInst\" type=\"STRING\" size=\"100\"/><Column id=\"langScore\" type=\"INT\" size=\"256\"/><Column id=\"langGrade\" type=\"STRING\" size=\"100\"/><Column id=\"langEtc\" type=\"STRING\" size=\"300\"/><Column id=\"langNo\" type=\"INT\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_military", this);
            obj._setContents("<ColumnInfo><Column id=\"militaryGrade\" type=\"STRING\" size=\"100\"/><Column id=\"militaryCode\" type=\"STRING\" size=\"100\"/><Column id=\"isMilitaryEnd\" type=\"STRING\" size=\"1\"/><Column id=\"militaryStartDate\" type=\"DATE\" size=\"256\"/><Column id=\"militaryEndDate\" type=\"DATE\" size=\"256\"/><Column id=\"militaryEtc\" type=\"STRING\" size=\"1000\"/><Column id=\"militaryNo\" type=\"INT\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_status", this);
            obj._setContents("<ColumnInfo><Column id=\"statusCode\" type=\"STRING\" size=\"20\"/><Column id=\"statusName\" type=\"STRING\" size=\"20\"/></ColumnInfo><Rows><Row><Col id=\"statusCode\">임시</Col><Col id=\"statusName\">임시</Col></Row><Row><Col id=\"statusCode\">재직</Col><Col id=\"statusName\">재직</Col></Row><Row><Col id=\"statusCode\">휴직</Col><Col id=\"statusName\">휴직</Col></Row><Row><Col id=\"statusCode\">퇴사</Col><Col id=\"statusName\">퇴사</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_career", this);
            obj._setContents("<ColumnInfo><Column id=\"careerStartDate\" type=\"DATE\" size=\"256\"/><Column id=\"careerEndDate\" type=\"DATE\" size=\"256\"/><Column id=\"careerPlace\" type=\"STRING\" size=\"100\"/><Column id=\"careerRank\" type=\"STRING\" size=\"100\"/><Column id=\"careerJobRole\" type=\"STRING\" size=\"100\"/><Column id=\"careerPeriod\" type=\"STRING\" size=\"256\"/><Column id=\"careerEndReason\" type=\"STRING\" size=\"100\"/><Column id=\"careerEtc\" type=\"STRING\" size=\"100\"/><Column id=\"careerNo\" type=\"INT\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_pos", this);
            obj._setContents("<ColumnInfo><Column id=\"positionCode\" type=\"STRING\" size=\"20\"/><Column id=\"positionName\" type=\"STRING\" size=\"30\"/><Column id=\"positionUseMember\" type=\"INT\" size=\"256\"/><Column id=\"positionSequence\" type=\"INT\" size=\"256\"/><Column id=\"positionLevel\" type=\"INT\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_ny", this);
            obj._setContents("<ColumnInfo><Column id=\"code\" type=\"STRING\" size=\"256\"/><Column id=\"value\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"code\">N</Col><Col id=\"value\">N</Col></Row><Row><Col id=\"code\">Y</Col><Col id=\"value\">Y</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_gender", this);
            obj._setContents("<ColumnInfo><Column id=\"code\" type=\"STRING\" size=\"256\"/><Column id=\"value\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"code\">남성</Col><Col id=\"value\">남성</Col></Row><Row><Col id=\"code\">여성</Col><Col id=\"value\">여성</Col></Row><Row><Col id=\"code\">기타</Col><Col id=\"value\">기타</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_recruit", this);
            obj._setContents("<ColumnInfo><Column id=\"code\" type=\"STRING\" size=\"256\"/><Column id=\"value\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"code\">신입</Col><Col id=\"value\">신입</Col></Row><Row><Col id=\"code\">경력</Col><Col id=\"value\">경력</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_salary", this);
            obj._setContents("<ColumnInfo><Column id=\"code\" type=\"STRING\" size=\"256\"/><Column id=\"value\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"code\">연봉</Col><Col id=\"value\">연봉</Col></Row><Row><Col id=\"code\">월급</Col><Col id=\"value\">월급</Col></Row><Row><Col id=\"code\">일급</Col><Col id=\"value\">일급</Col></Row><Row><Col id=\"code\">시급</Col><Col id=\"value\">시급</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_empl_top", this);
            obj._setContents("<ColumnInfo><Column id=\"emplId\" type=\"STRING\" size=\"20\"/><Column id=\"deptCode\" type=\"STRING\" size=\"20\"/><Column id=\"positionCode\" type=\"STRING\" size=\"20\"/><Column id=\"emplName\" type=\"STRING\" size=\"20\"/><Column id=\"startDate\" type=\"DATE\" size=\"256\"/><Column id=\"email\" type=\"STRING\" size=\"50\"/><Column id=\"directNo\" type=\"STRING\" size=\"20\"/><Column id=\"phoneNo\" type=\"STRING\" size=\"20\"/><Column id=\"recruitCategory\" type=\"STRING\" size=\"20\"/><Column id=\"salaryCategory\" type=\"STRING\" size=\"20\"/><Column id=\"referrer\" type=\"STRING\" size=\"20\"/><Column id=\"isStatus\" type=\"STRING\" size=\"20\"/><Column id=\"birthday\" type=\"DATE\" size=\"256\"/><Column id=\"gender\" type=\"STRING\" size=\"10\"/><Column id=\"isMarriage\" type=\"STRING\" size=\"1\"/><Column id=\"isDisability\" type=\"STRING\" size=\"1\"/><Column id=\"isVeterans\" type=\"STRING\" size=\"1\"/><Column id=\"endDate\" type=\"DATE\" size=\"256\"/><Column id=\"endReason\" type=\"STRING\" size=\"20\"/><Column id=\"emplProfile\" type=\"STRING\" size=\"1000\"/></ColumnInfo>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Div("Div00","0","0","200","100.00%",null,null,null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_background("#ffffff");
            obj.set_border("0px none, 1px solid #dddddd, 0px none, 0px none");
            obj.set_font("12px/normal \"Noto Sans KR\"");
            this.addChild(obj.name, obj);

            obj = new Static("Static00_00","200","0",null,"60","0",null,null,null,null,null,this);
            obj.set_taborder("0");
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
            obj.set_binddataset("ds_empl_top");
            obj.set_autofittype("col");
            obj.set_cellsizingtype("none");
            obj.set_autosizingtype("none");
            obj.set_cssclass("detailTable no_bg");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"139\"/><Column size=\"114\"/><Column size=\"175\"/><Column size=\"116\"/><Column size=\"182\"/></Columns><Rows><Row size=\"32\" band=\"head\"/><Row size=\"39\"/><Row size=\"39\"/><Row size=\"38\"/><Row size=\"39\"/></Rows><Band id=\"head\"><Cell colspan=\"5\" text=\"사원 정보 상세\" color=\"#333333\" border=\"1px solid #cccccc,0px none\" font=\"500 14px/normal &quot;Noto Sans KR&quot;\" background=\"#f9f9f9\"/></Band><Band id=\"body\"><Cell rowspan=\"4\" displaytype=\"imagecontrol\" imagestretch=\"fixaspectratio\" text=\"expr:&quot;HirpURL::/resources/uploadFiles/&quot; + emplProfile\"/><Cell col=\"1\" text=\"이름\" textAlign=\"center\" font=\"bold 12px/normal &quot;Gulim&quot;\"/><Cell col=\"2\" text=\"bind:emplName\" padding=\"0px 20px\" edittype=\"text\"/><Cell col=\"3\" text=\"소속부서\" textAlign=\"center\" font=\"bold 12px/normal &quot;Gulim&quot;\"/><Cell col=\"4\" text=\"bind:deptCode\" displaytype=\"combotext\" edittype=\"combo\" combodataset=\"ds_dept\" combocodecol=\"deptCode\" combodatacol=\"deptName\" padding=\"0px 20px\" combodisplaynulltype=\"nulltext\" combodisplaynulltext=\"소속부서 선택\"/><Cell row=\"1\" col=\"1\" text=\"직위/직책\" textAlign=\"center\" font=\"bold 12px/normal &quot;Gulim&quot;\"/><Cell row=\"1\" col=\"2\" text=\"bind:positionCode\" displaytype=\"combotext\" edittype=\"combo\" padding=\"0px 20px\" combodataset=\"ds_pos\" combodatacol=\"positionName\" combocodecol=\"positionCode\" combodisplaynulltype=\"nulltext\" combodisplaynulltext=\"직위 선택\"/><Cell row=\"1\" col=\"3\" text=\"직통번호\" textAlign=\"center\" font=\"bold 12px/normal &quot;Gulim&quot;\"/><Cell row=\"1\" col=\"4\" text=\"bind:directNo\" padding=\"0px 20px\" edittype=\"text\" combodisplaynulltext=\"직통번호 입력\" combodisplaynulltype=\"nulltext\"/><Cell row=\"2\" col=\"1\" text=\"이메일\" textAlign=\"center\" font=\"bold 12px/normal &quot;Gulim&quot;\"/><Cell row=\"2\" col=\"2\" text=\"bind:email\" padding=\"0px 20px\" edittype=\"text\" combodisplaynulltype=\"nulltext\" combodisplaynulltext=\"이메일 입력\"/><Cell row=\"2\" col=\"3\" text=\"휴대전화번호\" textAlign=\"center\" font=\"bold 12px/normal &quot;Gulim&quot;\"/><Cell row=\"2\" col=\"4\" text=\"bind:phoneNo\" padding=\"0px 20px\" edittype=\"text\" combodisplaynulltext=\"휴대전화번호 입력\" combodisplaynulltype=\"nulltext\"/><Cell row=\"3\" col=\"1\" text=\"입사일\" textAlign=\"center\" font=\"bold 12px/normal &quot;Gulim&quot;\"/><Cell row=\"3\" col=\"2\" text=\"bind:startDate\" padding=\"0px 20px\" displaytype=\"date\" calendardateformat=\"yyyy-MM-dd\"/><Cell row=\"3\" col=\"3\" text=\"상태\" textAlign=\"center\" font=\"bold 12px/normal &quot;Gulim&quot;\"/><Cell row=\"3\" col=\"4\" text=\"bind:isStatus\" padding=\"0px 20px\" edittype=\"combo\" combodataset=\"ds_status\" combodatacol=\"statusName\" combodisplaynulltext=\"재직 상태\" combocodecol=\"statusCode\" combodisplaynulltype=\"nulltext\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new Tab("Tab00","200","310",null,"338","0",null,null,null,null,null,this);
            obj.set_taborder("4");
            obj.set_tabindex("0");
            this.addChild(obj.name, obj);

            obj = new Tabpage("Tabpage1",this.Tab00);
            obj.set_text("기본");
            this.Tab00.addChild(obj.name, obj);

            obj = new Grid("Grid00","20","12",null,"128","20",null,null,null,null,null,this.Tab00.Tabpage1.form);
            obj.set_taborder("0");
            obj.set_binddataset("ds_empl");
            obj.set_cssclass("detailTable no_bg");
            obj.set_autofittype("col");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/></Columns><Rows><Row size=\"0\" band=\"head\"/><Row size=\"42\"/><Row size=\"42\"/><Row size=\"42\"/></Rows><Band id=\"head\"><Cell colspan=\"4\" text=\"기본정보\" color=\"#333333\" border=\"1px solid #dbdee2\"/><Cell col=\"4\"/><Cell col=\"5\"/><Cell col=\"6\"/><Cell col=\"7\"/></Band><Band id=\"body\"><Cell text=\"사원아이디\" textAlign=\"center\" background=\"#f9f9f9\"/><Cell col=\"1\" text=\"bind:emplId\" padding=\"0px 10px\"/><Cell col=\"2\" text=\"채용구분\" textAlign=\"center\" background=\"#f9f9f9\"/><Cell col=\"3\" text=\"bind:recruitCategory\" padding=\"0px 10px\" displaytype=\"combotext\" edittype=\"combo\" combodataset=\"ds_recruit\" combocodecol=\"code\" combodatacol=\"value\" combodisplaynulltype=\"nulltext\" combodisplaynulltext=\"채용구분 선택\"/><Cell col=\"4\" textAlign=\"center\" background=\"#f9f9f9\" text=\"급여구분\"/><Cell col=\"5\" text=\"bind:salaryCategory\" padding=\"0px 10px\" displaytype=\"combotext\" edittype=\"combo\" combodataset=\"ds_salary\" combodatacol=\"value\" combocodecol=\"code\" combodisplaynulltext=\"급여구분 선택\" combodisplaynulltype=\"nulltext\"/><Cell col=\"6\" textAlign=\"center\" background=\"#f9f9f9\" text=\"추천자\"/><Cell col=\"7\" text=\"bind:referrer\" padding=\"0px 10px\" displaytype=\"normal\" edittype=\"text\"/><Cell row=\"1\" textAlign=\"center\" background=\"#f9f9f9\" text=\"생년월일\"/><Cell row=\"1\" col=\"1\" text=\"bind:birthday\" padding=\"0px 10px\" displaytype=\"date\" edittype=\"date\" calendardateformat=\"yyyy-MM-dd\"/><Cell row=\"1\" col=\"2\" textAlign=\"center\" background=\"#f9f9f9\" text=\"성별\"/><Cell row=\"1\" col=\"3\" text=\"bind:gender\" padding=\"0px 10px\" edittype=\"combo\" combodataset=\"ds_gender\" combocodecol=\"code\" combodatacol=\"value\"/><Cell row=\"1\" col=\"4\" textAlign=\"center\" background=\"#f9f9f9\" text=\"결혼여부\"/><Cell row=\"1\" col=\"5\" text=\"bind:isMarriage\" padding=\"0px 10px\" edittype=\"combo\" combodataset=\"ds_ny\" combocodecol=\"code\" combodatacol=\"value\" combodisplaynulltext=\"결혼여부 선택\" combodisplaynulltype=\"nulltext\"/><Cell row=\"1\" col=\"6\" textAlign=\"center\" background=\"#f9f9f9\" text=\"장애여부\"/><Cell row=\"1\" col=\"7\" text=\"bind:isDisability\" padding=\"0px 10px\" edittype=\"combo\" combodataset=\"ds_ny\" combocodecol=\"code\" combodatacol=\"value\" combodisplaynulltext=\"장애여부 선택\" combodisplaynulltype=\"nulltext\"/><Cell row=\"2\" textAlign=\"center\" background=\"#f9f9f9\" text=\"보훈여부\"/><Cell row=\"2\" col=\"1\" text=\"bind:isVeterans\" padding=\"0px 10px\" edittype=\"combo\" combodataset=\"ds_ny\" combocodecol=\"code\" combodatacol=\"value\" combodisplaynulltext=\"보훈여부 선택\" combodisplaynulltype=\"nulltext\"/><Cell row=\"2\" col=\"2\" textAlign=\"center\" background=\"#f9f9f9\" text=\"퇴사일\"/><Cell row=\"2\" col=\"3\" text=\"bind:endDate\" padding=\"0px 10px\" displaytype=\"date\" edittype=\"date\" calendardateformat=\"yyyy-MM-dd\" calendardisplaynulltext=\"일자 선택\" maskeditformat=\"####-##-##\" calendardisplaynulltype=\"nulltext\"/><Cell row=\"2\" col=\"4\" textAlign=\"center\" background=\"#f9f9f9\" text=\"퇴직사유\"/><Cell row=\"2\" col=\"5\" text=\"bind:endReason\" padding=\"0px 10px\" displaytype=\"normal\" edittype=\"text\"/><Cell row=\"2\" col=\"6\" textAlign=\"center\" background=\"#f9f9f9\"/><Cell row=\"2\" col=\"7\" padding=\"0px 10px\"/></Band></Format></Formats>");
            this.Tab00.Tabpage1.addChild(obj.name, obj);

            obj = new Button("btnResign","20","155","50","20",null,null,null,null,null,null,this.Tab00.Tabpage1.form);
            obj.set_taborder("1");
            obj.set_text("퇴직처리");
            obj.set_border("0px none, 0px none, 1px solid #c10000");
            obj.set_color("#c10000");
            obj.set_font("12px/normal \"Noto Sans KR\"");
            this.Tab00.Tabpage1.addChild(obj.name, obj);

            obj = new Static("Static00",null,"149","680","32","20",null,null,null,null,null,this.Tab00.Tabpage1.form);
            obj.set_taborder("2");
            obj.set_text("※ 셀을 더블 클릭하시면 정보를 수정하실 수 있습니다. 입력을 완료하신 후에는 반드시 각 페이지의 저장 버튼을 눌러주세요!");
            obj.set_textAlign("right");
            obj.set_font("normal 12px/normal Noto Sans KR");
            this.Tab00.Tabpage1.addChild(obj.name, obj);

            obj = new Button("btn_save","370","240",null,"36","370",null,null,null,null,null,this.Tab00.Tabpage1.form);
            obj.set_taborder("3");
            obj.set_text("저장");
            obj.set_cssclass("point");
            obj.set_font("normal 14px/normal \"Arial\"");
            this.Tab00.Tabpage1.addChild(obj.name, obj);

            obj = new Tabpage("Tabpage2",this.Tab00);
            obj.set_text("직무/담당");
            this.Tab00.addChild(obj.name, obj);

            obj = new Grid("Grid00","20","12",null,"170","20",null,null,null,null,null,this.Tab00.Tabpage2.form);
            obj.set_taborder("0");
            obj.set_binddataset("ds_jobRole");
            obj.set_autofittype("col");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"0\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/></Columns><Rows><Row size=\"30\" band=\"head\"/><Row size=\"30\"/></Rows><Band id=\"head\"><Cell text=\"직무번호\"/><Cell col=\"1\" text=\"NO\" color=\"#333333\" border=\"1px solid #dbdee2\" background=\"#f9f9f9\"/><Cell col=\"2\" text=\"직군\" color=\"#333333\" border=\"1px solid #dbdee2\" background=\"#f9f9f9\"/><Cell col=\"3\" text=\"직무\" color=\"#333333\" border=\"1px solid #dbdee2\" background=\"#f9f9f9\"/><Cell col=\"4\" text=\"직무시작일\" color=\"#333333\" border=\"1px solid #dbdee2\" background=\"#f9f9f9\"/><Cell col=\"5\" text=\"직무종료일\" color=\"#333333\" border=\"1px solid #dbdee2\" background=\"#f9f9f9\"/><Cell col=\"6\" text=\"담당업무\" color=\"#333333\" border=\"1px solid #dbdee2\" background=\"#f9f9f9\"/><Cell col=\"7\" text=\"비고\" color=\"#333333\" border=\"1px solid #dbdee2\" background=\"#f9f9f9\"/></Band><Band id=\"body\"><Cell text=\"bind:jobRoleNo\"/><Cell col=\"1\" text=\"expr:currow+1\" textAlign=\"center\"/><Cell col=\"2\" text=\"bind:jobRoleDivision\" textAlign=\"center\" edittype=\"text\"/><Cell col=\"3\" text=\"bind:jobRoleTitle\" textAlign=\"center\" edittype=\"text\"/><Cell col=\"4\" text=\"bind:jobRoleStartDate\" textAlign=\"center\" displaytype=\"date\" edittype=\"date\" calendardateformat=\"yyyy-MM-dd\" calendardisplaynulltype=\"nulltext\" calendardisplaynulltext=\"일자 선택\"/><Cell col=\"5\" text=\"bind:jobRoleEndDate\" textAlign=\"center\" displaytype=\"date\" edittype=\"date\" calendardateformat=\"yyyy-MM-dd\" calendardisplaynulltype=\"nulltext\" calendardisplaynulltext=\"일자 선택\"/><Cell col=\"6\" text=\"bind:jobRoleConts\" textAlign=\"center\" edittype=\"text\"/><Cell col=\"7\" text=\"bind:jobRoleEtc\" textAlign=\"center\" edittype=\"text\"/></Band></Format></Formats>");
            this.Tab00.Tabpage2.addChild(obj.name, obj);

            obj = new Button("btn_minus",null,"192","50","26","20",null,null,null,null,null,this.Tab00.Tabpage2.form);
            obj.set_taborder("1");
            obj.set_text("삭제");
            obj.set_border("1px solid #999999");
            this.Tab00.Tabpage2.addChild(obj.name, obj);

            obj = new Button("btn_plus",null,"192","50","26","76",null,null,null,null,null,this.Tab00.Tabpage2.form);
            obj.set_taborder("2");
            obj.set_text("추가");
            obj.set_border("1px solid #999999");
            this.Tab00.Tabpage2.addChild(obj.name, obj);

            obj = new Button("btn_save","370","240",null,"36","370",null,null,null,null,null,this.Tab00.Tabpage2.form);
            obj.set_taborder("3");
            obj.set_text("저장");
            obj.set_cssclass("point");
            obj.set_font("normal 14px/normal \"Arial\"");
            this.Tab00.Tabpage2.addChild(obj.name, obj);

            obj = new Tabpage("Tabpage3",this.Tab00);
            obj.set_text("경력");
            this.Tab00.addChild(obj.name, obj);

            obj = new Grid("Grid00","20","12",null,"170","20",null,null,null,null,null,this.Tab00.Tabpage3.form);
            obj.set_taborder("0");
            obj.set_binddataset("ds_career");
            obj.set_autofittype("col");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"0\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/></Columns><Rows><Row size=\"30\" band=\"head\"/><Row size=\"30\"/></Rows><Band id=\"head\"><Cell text=\"경력번호\"/><Cell col=\"1\" color=\"#333333\" text=\"NO\" border=\"1px solid #dbdee2\" background=\"#f9f9f9\"/><Cell col=\"2\" text=\"경력시작일\" color=\"#333333\" border=\"1px solid #dbdee2\" background=\"#f9f9f9\"/><Cell col=\"3\" text=\"경력종료일\" color=\"#333333\" border=\"1px solid #dbdee2\" background=\"#f9f9f9\"/><Cell col=\"4\" text=\"근무처\" color=\"#333333\" border=\"1px solid #dbdee2\" background=\"#f9f9f9\"/><Cell col=\"5\" text=\"직위\" color=\"#333333\" border=\"1px solid #dbdee2\" background=\"#f9f9f9\"/><Cell col=\"6\" text=\"담당업무\" color=\"#333333\" border=\"1px solid #dbdee2\" background=\"#f9f9f9\"/><Cell col=\"7\" text=\"근속기간\" color=\"#333333\" border=\"1px solid #dbdee2\" background=\"#f9f9f9\"/><Cell col=\"8\" text=\"퇴사사유\" color=\"#333333\" border=\"1px solid #dbdee2\" background=\"#f9f9f9\"/><Cell col=\"9\" text=\"비고\" color=\"#333333\" border=\"1px solid #dbdee2\" background=\"#f9f9f9\"/></Band><Band id=\"body\"><Cell text=\"bind:careerNo\"/><Cell col=\"1\" text=\"expr:currow+1\" textAlign=\"center\"/><Cell col=\"2\" text=\"bind:careerStartDate\" edittype=\"date\" textAlign=\"center\" calendardateformat=\"yyyy-MM-dd\" displaytype=\"date\" calendardisplaynulltype=\"nulltext\" calendardisplaynulltext=\"일자 선택\"/><Cell col=\"3\" text=\"bind:careerEndDate\" edittype=\"date\" textAlign=\"center\" calendardateformat=\"yyyy-MM-dd\" displaytype=\"date\" calendardisplaynulltype=\"nulltext\" calendardisplaynulltext=\"일자 선택\"/><Cell col=\"4\" text=\"bind:careerPlace\" textAlign=\"center\" edittype=\"text\"/><Cell col=\"5\" text=\"bind:careerRank\" textAlign=\"center\" edittype=\"text\"/><Cell col=\"6\" text=\"bind:careerJobRole\" textAlign=\"center\" edittype=\"text\"/><Cell col=\"7\" text=\"bind:careerPeriod\" textAlign=\"center\" edittype=\"text\"/><Cell col=\"8\" text=\"bind:careerEndReason\" textAlign=\"center\" edittype=\"text\"/><Cell col=\"9\" text=\"bind:careerEtc\" textAlign=\"center\" edittype=\"text\"/></Band></Format></Formats>");
            this.Tab00.Tabpage3.addChild(obj.name, obj);

            obj = new Button("btn_plus",null,"192","50","26","76",null,null,null,null,null,this.Tab00.Tabpage3.form);
            obj.set_taborder("1");
            obj.set_text("추가");
            obj.set_border("1px solid #999999");
            this.Tab00.Tabpage3.addChild(obj.name, obj);

            obj = new Button("btn_minus",null,"192","50","26","20",null,null,null,null,null,this.Tab00.Tabpage3.form);
            obj.set_taborder("2");
            obj.set_text("삭제");
            obj.set_border("1px solid #999999");
            this.Tab00.Tabpage3.addChild(obj.name, obj);

            obj = new Button("btn_save","370","240",null,"36","370",null,null,null,null,null,this.Tab00.Tabpage3.form);
            obj.set_taborder("3");
            obj.set_text("저장");
            obj.set_cssclass("point");
            obj.set_font("normal 14px/normal \"Arial\"");
            this.Tab00.Tabpage3.addChild(obj.name, obj);

            obj = new Tabpage("Tabpage4",this.Tab00);
            obj.set_text("자격");
            this.Tab00.addChild(obj.name, obj);

            obj = new Grid("Grid00","20","12",null,"170","20",null,null,null,null,null,this.Tab00.Tabpage4.form);
            obj.set_taborder("0");
            obj.set_binddataset("ds_cert");
            obj.set_autofittype("col");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"0\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/></Columns><Rows><Row size=\"30\" band=\"head\"/><Row size=\"30\"/></Rows><Band id=\"head\"><Cell text=\"자격번호\"/><Cell col=\"1\" text=\"NO\" color=\"#333333\" border=\"1px solid #dbdee2\" background=\"#f9f9f9\"/><Cell col=\"2\" text=\"구분\" color=\"#333333\" border=\"1px solid #dbdee2\" background=\"#f9f9f9\"/><Cell col=\"3\" text=\"자격명\" color=\"#333333\" border=\"1px solid #dbdee2\" background=\"#f9f9f9\"/><Cell col=\"4\" text=\"자격증번호\" color=\"#333333\" border=\"1px solid #dbdee2\" background=\"#f9f9f9\"/><Cell col=\"5\" text=\"자격등급\" color=\"#333333\" border=\"1px solid #dbdee2\" background=\"#f9f9f9\"/><Cell col=\"6\" text=\"기관명\" color=\"#333333\" border=\"1px solid #dbdee2\" background=\"#f9f9f9\"/><Cell col=\"7\" text=\"취득일\" color=\"#333333\" border=\"1px solid #dbdee2\" background=\"#f9f9f9\"/><Cell col=\"8\" text=\"만료일\" color=\"#333333\" border=\"1px solid #dbdee2\" background=\"#f9f9f9\"/></Band><Band id=\"body\"><Cell text=\"bind:certNo\"/><Cell col=\"1\" text=\"expr:currow+1\" textAlign=\"center\"/><Cell col=\"2\" text=\"bind:certCategory\" textAlign=\"center\" edittype=\"text\"/><Cell col=\"3\" text=\"bind:certName\" textAlign=\"center\" edittype=\"text\"/><Cell col=\"4\" text=\"bind:certEnrollNo\" textAlign=\"center\" edittype=\"text\"/><Cell col=\"5\" text=\"bind:certLevel\" textAlign=\"center\" edittype=\"text\"/><Cell col=\"6\" text=\"bind:certInst\" textAlign=\"center\" edittype=\"text\"/><Cell col=\"7\" text=\"bind:certStartDate\" edittype=\"date\" textAlign=\"center\" displaytype=\"date\" calendardateformat=\"yyyy-MM-dd\" calendardisplaynulltype=\"nulltext\" calendardisplaynulltext=\"일자 선택\"/><Cell col=\"8\" text=\"bind:certEndDate\" edittype=\"date\" textAlign=\"center\" displaytype=\"date\" calendardateformat=\"yyyy-MM-dd\" calendardisplaynulltype=\"nulltext\" calendardisplaynulltext=\"일자 선택\"/></Band></Format></Formats>");
            this.Tab00.Tabpage4.addChild(obj.name, obj);

            obj = new Button("btn_plus",null,"192","50","26","76",null,null,null,null,null,this.Tab00.Tabpage4.form);
            obj.set_taborder("1");
            obj.set_text("추가");
            obj.set_border("1px solid #999999");
            this.Tab00.Tabpage4.addChild(obj.name, obj);

            obj = new Button("btn_minus",null,"192","50","26","20",null,null,null,null,null,this.Tab00.Tabpage4.form);
            obj.set_taborder("2");
            obj.set_text("삭제");
            obj.set_border("1px solid #999999");
            this.Tab00.Tabpage4.addChild(obj.name, obj);

            obj = new Button("btn_save","370","240",null,"36","370",null,null,null,null,null,this.Tab00.Tabpage4.form);
            obj.set_taborder("3");
            obj.set_text("저장");
            obj.set_cssclass("point");
            obj.set_font("normal 14px/normal \"Arial\"");
            this.Tab00.Tabpage4.addChild(obj.name, obj);

            obj = new Tabpage("Tabpage5",this.Tab00);
            obj.set_text("어학");
            this.Tab00.addChild(obj.name, obj);

            obj = new Grid("Grid00","20","12",null,"170","20",null,null,null,null,null,this.Tab00.Tabpage5.form);
            obj.set_taborder("0");
            obj.set_binddataset("ds_lang");
            obj.set_autofittype("col");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"0\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/></Columns><Rows><Row size=\"30\" band=\"head\"/><Row size=\"30\"/></Rows><Band id=\"head\"><Cell text=\"어학번호\"/><Cell col=\"1\" text=\"NO\" color=\"#333333\" background=\"#f9f9f9\" border=\"1px solid #dbdee2\"/><Cell col=\"2\" color=\"#333333\" border=\"1px solid #dbdee2\" background=\"#f9f9f9\" text=\"구분\"/><Cell col=\"3\" text=\"어학명\" color=\"#333333\" border=\"1px solid #dbdee2\" background=\"#f9f9f9\"/><Cell col=\"4\" text=\"평가일\" color=\"#333333\" border=\"1px solid #dbdee2\" background=\"#f9f9f9\"/><Cell col=\"5\" text=\"평가기관\" color=\"#333333\" border=\"1px solid #dbdee2\" background=\"#f9f9f9\"/><Cell col=\"6\" text=\"점수\" color=\"#333333\" border=\"1px solid #dbdee2\" background=\"#f9f9f9\"/><Cell col=\"7\" text=\"등급\" color=\"#333333\" border=\"1px solid #dbdee2\" background=\"#f9f9f9\"/><Cell col=\"8\" text=\"비고\" color=\"#333333\" border=\"1px solid #dbdee2\" background=\"#f9f9f9\"/></Band><Band id=\"body\"><Cell text=\"bind:langNo\"/><Cell col=\"1\" text=\"expr:currow+1\" textAlign=\"center\"/><Cell col=\"2\" text=\"bind:langCategory\" textAlign=\"center\" edittype=\"text\"/><Cell col=\"3\" text=\"bind:langName\" textAlign=\"center\" edittype=\"text\"/><Cell col=\"4\" text=\"bind:langTestDate\" displaytype=\"date\" textAlign=\"center\" edittype=\"date\" calendardateformat=\"yyyy-MM-dd\" calendardisplaynulltype=\"nulltext\" calendardisplaynulltext=\"일자 선택\"/><Cell col=\"5\" text=\"bind:langInst\" textAlign=\"center\" edittype=\"text\"/><Cell col=\"6\" text=\"bind:langScore\" textAlign=\"center\" edittype=\"text\"/><Cell col=\"7\" text=\"bind:langGrade\" textAlign=\"center\" edittype=\"text\"/><Cell col=\"8\" text=\"bind:langEtc\" textAlign=\"center\" edittype=\"text\"/></Band></Format></Formats>");
            this.Tab00.Tabpage5.addChild(obj.name, obj);

            obj = new Button("btn_plus",null,"192","50","26","76",null,null,null,null,null,this.Tab00.Tabpage5.form);
            obj.set_taborder("1");
            obj.set_text("추가");
            obj.set_border("1px solid #999999");
            this.Tab00.Tabpage5.addChild(obj.name, obj);

            obj = new Button("btn_minus",null,"192","50","26","20",null,null,null,null,null,this.Tab00.Tabpage5.form);
            obj.set_taborder("2");
            obj.set_text("삭제");
            obj.set_border("1px solid #999999");
            this.Tab00.Tabpage5.addChild(obj.name, obj);

            obj = new Button("btn_save","370","240",null,"36","370",null,null,null,null,null,this.Tab00.Tabpage5.form);
            obj.set_taborder("3");
            obj.set_text("저장");
            obj.set_cssclass("point");
            obj.set_font("normal 14px/normal \"Arial\"");
            this.Tab00.Tabpage5.addChild(obj.name, obj);

            obj = new Tabpage("Tabpage6",this.Tab00);
            obj.set_text("병역");
            this.Tab00.addChild(obj.name, obj);

            obj = new Grid("Grid00","20","12",null,"170","20",null,null,null,null,null,this.Tab00.Tabpage6.form);
            obj.set_taborder("0");
            obj.set_binddataset("ds_military");
            obj.set_autofittype("col");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"0\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/></Columns><Rows><Row size=\"30\" band=\"head\"/><Row size=\"30\"/></Rows><Band id=\"head\"><Cell text=\"병역번호\"/><Cell col=\"1\" text=\"NO\" color=\"#333333\" border=\"1px solid #dbdee2\" background=\"#f9f9f9\"/><Cell col=\"2\" text=\"계급\" color=\"#333333\" background=\"#f9f9f9\" border=\"1px solid #dbdee2\"/><Cell col=\"3\" text=\"군번\" color=\"#333333\" background=\"#f9f9f9\" border=\"1px solid #dbdee2\"/><Cell col=\"4\" text=\"전역구분\" color=\"#333333\" background=\"#f9f9f9\" border=\"1px solid #dbdee2\"/><Cell col=\"5\" text=\"입대일\" color=\"#333333\" background=\"#f9f9f9\" border=\"1px solid #dbdee2\"/><Cell col=\"6\" text=\"제대일\" color=\"#333333\" background=\"#f9f9f9\" border=\"1px solid #dbdee2\"/><Cell col=\"7\" text=\"비고\" color=\"#333333\" background=\"#f9f9f9\" border=\"1px solid #dbdee2\"/></Band><Band id=\"body\"><Cell text=\"bind:militaryNo\"/><Cell col=\"1\" text=\"expr:currow+1\" textAlign=\"center\"/><Cell col=\"2\" text=\"bind:militaryGrade\" textAlign=\"center\" edittype=\"text\"/><Cell col=\"3\" text=\"bind:militaryCode\" textAlign=\"center\" edittype=\"text\"/><Cell col=\"4\" text=\"bind:isMilitaryEnd\" textAlign=\"center\" edittype=\"text\"/><Cell col=\"5\" text=\"bind:militaryStartDate\" displaytype=\"date\" textAlign=\"center\" edittype=\"date\" calendardateformat=\"yyyy-MM-dd\" calendardisplaynulltype=\"nulltext\" calendardisplaynulltext=\"일자 선택\"/><Cell col=\"6\" text=\"bind:militaryEndDate\" displaytype=\"date\" textAlign=\"center\" edittype=\"date\" calendardateformat=\"yyyy-MM-dd\" calendardisplaynulltype=\"nulltext\" calendardisplaynulltext=\"일자 선택\"/><Cell col=\"7\" text=\"bind:militaryEtc\" textAlign=\"center\" edittype=\"text\"/></Band></Format></Formats>");
            this.Tab00.Tabpage6.addChild(obj.name, obj);

            obj = new Button("btn_plus",null,"192","50","26","76",null,null,null,null,null,this.Tab00.Tabpage6.form);
            obj.set_taborder("1");
            obj.set_text("추가");
            obj.set_border("1px solid #999999");
            this.Tab00.Tabpage6.addChild(obj.name, obj);

            obj = new Button("btn_minus",null,"192","50","26","20",null,null,null,null,null,this.Tab00.Tabpage6.form);
            obj.set_taborder("2");
            obj.set_text("삭제");
            obj.set_border("1px solid #999999");
            this.Tab00.Tabpage6.addChild(obj.name, obj);

            obj = new Button("btn_save","370","240",null,"36","370",null,null,null,null,null,this.Tab00.Tabpage6.form);
            obj.set_taborder("3");
            obj.set_text("저장");
            obj.set_cssclass("point");
            obj.set_font("normal 14px/normal \"Arial\"");
            this.Tab00.Tabpage6.addChild(obj.name, obj);

            obj = new Static("link_emplLsit","24","85","200","20",null,null,null,null,null,null,this);
            obj.set_taborder("5");
            obj.set_text("사원 조회");
            obj.set_font("normal normal 14px/normal \"Noto Sans KR\"");
            obj.set_padding("0px");
            obj.set_cursor("pointer");
            this.addChild(obj.name, obj);

            obj = new Static("link_addEmpl","24","120","106","20",null,null,null,null,null,null,this);
            obj.set_taborder("6");
            obj.set_text("사원 추가/승인");
            obj.set_font("normal normal 14px/normal \"Noto Sans KR\"");
            obj.set_padding("0px");
            obj.set_cursor("pointer");
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
         		,"ds_empl=out_empl ds_empl_top=out_empl_top ds_jobRole=out_jobRole ds_career=out_career ds_lang=out_lang ds_cert=out_cert ds_military=out_military ds_dept=out_dept ds_pos=out_pos" // 4.OutDs : S->F jsp(SELECT)
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
        	else if(id=="tr_empl_modify")
        	{
        		if(nErrorCode < 0)
        		{
        			this.alert("저장 실패 : " + sErrorMsg);
        			return;
        		}
        		this.alert("저장되었습니다.");
        	}
        	else if(id=="tr_remove_role")
        	{
        		if(nErrorCode < 0)
        		{
        			this.alert("삭제 실패");
        			return;
        		}
        		this.alert("삭제 성공");
        	}
        	else if(id=="tr_remove_career")
        	{
        		if(nErrorCode < 0)
        		{
        			this.alert("삭제 실패");
        			return;
        		}
        		this.alert("삭제 성공");
        	}
        	else if(id=="tr_remove_cert")
        	{
        		if(nErrorCode < 0)
        		{
        			this.alert("삭제 실패");
        			return;
        		}
        		this.alert("삭제 성공");
        	}
        	else if(id=="tr_remove_lang")
        	{
        		if(nErrorCode < 0)
        		{
        			this.alert("삭제 실패");
        			return;
        		}
        		this.alert("삭제 성공");
        	}
        	else if(id=="tr_remove_military")
        	{
        		if(nErrorCode < 0)
        		{
        			this.alert("삭제 실패");
        			return;
        		}
        		this.alert("삭제 성공");
        	}
        	else if(id=="tr_empl_modify_Info")
        	{
        		if(nErrorCode < 0)
        		{
        			this.alert("수정 실패");
        			return;
        		}
        		this.alert("수정 성공");
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

        // 데이터 추가, 제거 코드
        // 리팩토링 필요
        this.Tab00_Tabpage2_btn_plus_onclick = function(obj,e)
        {
        	this.ds_jobRole.addRow();
        };
        this.Tab00_Tabpage2_btn_minus_onclick = function(obj,e)
        {
        	if(this.ds_jobRole.rowcount >= 1)
        	{
        		var result = this.confirm("정말로 삭제하시겠습니까?" , "삭제", "취소");
        		var infoNo = this.Tab00.Tabpage2.form.Grid00.getCellText(this.ds_jobRole.rowposition, 0);

         		if(result == true) {
         			this.ds_jobRole.deleteRow(this.ds_jobRole.rowposition);
         			this.transaction(
         				"tr_remove_role"// 1.ID
         				,"HirpURL::admin/removeJobRole.hirp"// 2.URL
         				,"" // 3.InDs : F->S jsp(I,U,D)
         				,"" // 4.OutDs : S->F jsp(SELECT)
         				,"emplId="+selectedEmplId+" infoNo="+infoNo // 5.InVar : F->S(var)
         				,"fn_callback_tran" // 6.callback function(transaction 완료시 호출되는 함수)
         			);
         		}
        	}
        	else {
        		this.alert("삭제할 행이 없습니다.");
        	}
        };

        this.Tab00_Tabpage3_btn_plus_onclick = function(obj,e)
        {
        	this.ds_career.addRow();
        };
        this.Tab00_Tabpage3_btn_minus_onclick = function(obj,e)
        {
        	if(this.ds_career.rowcount >= 1)
        	{
        		var result = this.confirm("정말로 삭제하시겠습니까?" , "삭제", "취소");
        		var infoNo = this.Tab00.Tabpage3.form.Grid00.getCellText(this.ds_career.rowposition, 0);

        		if(result == true) {
        			this.ds_career.deleteRow(this.ds_career.rowposition);
         			this.transaction(
         				"tr_remove_career"// 1.ID
         				,"HirpURL::admin/removeCareer.hirp"// 2.URL
         				,"" // 3.InDs : F->S jsp(I,U,D)
         				,"" // 4.OutDs : S->F jsp(SELECT)
         				,"emplId="+selectedEmplId+" infoNo="+infoNo // 5.InVar : F->S(var)
         				,"fn_callback_tran" // 6.callback function(transaction 완료시 호출되는 함수)
         			);
        		}
        	}
        	else {
        		this.alert("삭제할 행이 없습니다.");
        	}
        };

        this.Tab00_Tabpage4_btn_plus_onclick = function(obj,e)
        {
        	this.ds_cert.addRow();
        };
        this.Tab00_Tabpage4_btn_minus_onclick = function(obj,e)
        {
        	if(this.ds_cert.rowcount >= 1)
        	{
        		var result = this.confirm("정말로 삭제하시겠습니까?" , "삭제", "취소");
        		var infoNo = this.Tab00.Tabpage4.form.Grid00.getCellText(this.ds_cert.rowposition, 0);

        		if(result == true) {
        			this.ds_cert.deleteRow(this.ds_cert.rowposition);
         			this.transaction(
         				"tr_remove_cert"// 1.ID
         				,"HirpURL::admin/removeCert.hirp"// 2.URL
         				,"" // 3.InDs : F->S jsp(I,U,D)
         				,"" // 4.OutDs : S->F jsp(SELECT)
         				,"emplId="+selectedEmplId+" infoNo="+infoNo // 5.InVar : F->S(var)
         				,"fn_callback_tran" // 6.callback function(transaction 완료시 호출되는 함수)
         			);
        		}
        	}
        	else {
        		this.alert("삭제할 행이 없습니다.");
        	}
        };

        this.Tab00_Tabpage5_btn_plus_onclick = function(obj,e)
        {
        	this.ds_lang.addRow();
        };
        this.Tab00_Tabpage5_btn_minus_onclick = function(obj,e)
        {
        	if(this.ds_lang.rowcount >= 1)
        	{
        		var result = this.confirm("정말로 삭제하시겠습니까?" , "삭제", "취소");
        		var infoNo = this.Tab00.Tabpage5.form.Grid00.getCellText(this.ds_lang.rowposition, 0);

        		if(result == true) {
        			this.ds_lang.deleteRow(this.ds_lang.rowposition);
         			this.transaction(
         				"tr_remove_lang"// 1.ID
         				,"HirpURL::admin/removeLang.hirp"// 2.URL
         				,"" // 3.InDs : F->S jsp(I,U,D)
         				,"" // 4.OutDs : S->F jsp(SELECT)
         				,"emplId="+selectedEmplId+" infoNo="+infoNo // 5.InVar : F->S(var)
         				,"fn_callback_tran" // 6.callback function(transaction 완료시 호출되는 함수)
         			);
        		}
        	}
        	else {
        		this.alert("삭제할 행이 없습니다.");
        	}
        };

        this.Tab00_Tabpage6_btn_plus_onclick = function(obj,e)
        {
        	this.ds_military.addRow();
        };
        this.Tab00_Tabpage6_btn_minus_onclick = function(obj,e)
        {
        	if(this.ds_military.rowcount >= 1)
        	{
        		var result = this.confirm("정말로 삭제하시겠습니까?" , "삭제", "취소");
        		var infoNo = this.Tab00.Tabpage6.form.Grid00.getCellText(this.ds_military.rowposition, 0);

        		if(result == true) {
        			this.ds_military.deleteRow(this.ds_military.rowposition);
         			this.transaction(
         				"tr_remove_military"// 1.ID
         				,"HirpURL::admin/removeMilitary.hirp"// 2.URL
         				,"" // 3.InDs : F->S jsp(I,U,D)
         				,"" // 4.OutDs : S->F jsp(SELECT)
         				,"emplId="+selectedEmplId+" infoNo="+infoNo // 5.InVar : F->S(var)
         				,"fn_callback_tran" // 6.callback function(transaction 완료시 호출되는 함수)
         			);
        		}
        	}
        	else {
        		this.alert("삭제할 행이 없습니다.");
        	}
        };

        // 기본정보 저장
        this.Tab00_Tabpage1_btn_save_onclick = function(obj,e)
        {
        	this.transaction(
         		"tr_empl_modify_Info"// 1.ID
         		,"HirpURL::admin/empChangeInfo.hirp"// 2.URL
         		,"in_empl=ds_empl in_empl_top=ds_empl_top:U" // 3.InDs : F->S jsp(I,U,D)
         		,"" // 4.OutDs : S->F jsp(SELECT)
         		,"emplId="+selectedEmplId // 5.InVar : F->S(var)
         		,"fn_callback_tran" // 6.callback function(transaction 완료시 호출되는 함수)
         	);
        };

        // 직무 목록 저장
        this.Tab00_Tabpage2_btn_save_onclick = function(obj,e)
        {
        	this.transaction(
         		"tr_empl_modify_JobRole"// 1.ID
         		,"HirpURL::admin/empChangeJobRole.hirp"// 2.URL
         		,"in_jobRole=ds_jobRole:U" // 3.InDs : F->S jsp(I,U,D)
         		,"" // 4.OutDs : S->F jsp(SELECT)
         		,"emplId="+selectedEmplId // 5.InVar : F->S(var)
         		,"fn_callback_tran" // 6.callback function(transaction 완료시 호출되는 함수)
         	);
        };

        // 경력 목록 저장
        this.Tab00_Tabpage3_btn_save_onclick = function(obj,e)
        {
        	this.transaction(
         		"tr_empl_modify_Career"// 1.ID
         		,"HirpURL::admin/empChangeCareer.hirp"// 2.URL
         		,"in_career=ds_career:U" // 3.InDs : F->S jsp(I,U,D)
         		,"" // 4.OutDs : S->F jsp(SELECT)
         		,"emplId="+selectedEmplId // 5.InVar : F->S(var)
         		,"fn_callback_tran" // 6.callback function(transaction 완료시 호출되는 함수)
         	);
        };

        // 자격 목록 저장
        this.Tab00_Tabpage4_btn_save_onclick = function(obj,e)
        {
        	this.transaction(
         		"tr_empl_modify_Cert"// 1.ID
         		,"HirpURL::admin/empChangeCert.hirp"// 2.URL
         		,"in_cert=ds_cert:U" // 3.InDs : F->S jsp(I,U,D)
         		,"" // 4.OutDs : S->F jsp(SELECT)
         		,"emplId="+selectedEmplId // 5.InVar : F->S(var)
         		,"fn_callback_tran" // 6.callback function(transaction 완료시 호출되는 함수)
         	);
        };

        // 어학 목록 저장
        this.Tab00_Tabpage5_btn_save_onclick = function(obj,e)
        {
        	this.transaction(
         		"tr_empl_modify_Lang"// 1.ID
         		,"HirpURL::admin/empChangeLang.hirp"// 2.URL
         		,"in_lang=ds_lang:U" // 3.InDs : F->S jsp(I,U,D)
         		,"" // 4.OutDs : S->F jsp(SELECT)
         		,"emplId="+selectedEmplId // 5.InVar : F->S(var)
         		,"fn_callback_tran" // 6.callback function(transaction 완료시 호출되는 함수)
         	);
        };

        // 병역 목록 저장
        this.Tab00_Tabpage6_btn_save_onclick = function(obj,e)
        {
        	this.transaction(
         		"tr_empl_modify_Military"// 1.ID
         		,"HirpURL::admin/empChangeMilitary.hirp"// 2.URL
         		,"in_military=ds_military:U" // 3.InDs : F->S jsp(I,U,D)
         		,"" // 4.OutDs : S->F jsp(SELECT)
         		,"emplId="+selectedEmplId // 5.InVar : F->S(var)
         		,"fn_callback_tran" // 6.callback function(transaction 완료시 호출되는 함수)
         	);
        };

        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload",this.empDetail_onload,this);
            this.Static00_00.addEventHandler("onclick",this.Static00_onclick,this);
            this.Static00.addEventHandler("onclick",this.Static00_onclick,this);
            this.Grid00.addEventHandler("oncellclick",this.Grid00_oncellclick,this);
            this.Tab00.addEventHandler("onchanged",this.Tab00_onchanged,this);
            this.Tab00.Tabpage1.form.btnResign.addEventHandler("onclick",this.btnResign_onclick,this);
            this.Tab00.Tabpage1.form.Static00.addEventHandler("onclick",this.Tab00_Tabpage1_Static00_onclick,this);
            this.Tab00.Tabpage1.form.btn_save.addEventHandler("onclick",this.Tab00_Tabpage1_btn_save_onclick,this);
            this.Tab00.Tabpage2.form.btn_minus.addEventHandler("onclick",this.Tab00_Tabpage2_btn_minus_onclick,this);
            this.Tab00.Tabpage2.form.btn_plus.addEventHandler("onclick",this.Tab00_Tabpage2_btn_plus_onclick,this);
            this.Tab00.Tabpage2.form.btn_save.addEventHandler("onclick",this.Tab00_Tabpage2_btn_save_onclick,this);
            this.Tab00.Tabpage3.form.btn_plus.addEventHandler("onclick",this.Tab00_Tabpage3_btn_plus_onclick,this);
            this.Tab00.Tabpage3.form.btn_minus.addEventHandler("onclick",this.Tab00_Tabpage3_btn_minus_onclick,this);
            this.Tab00.Tabpage3.form.btn_save.addEventHandler("onclick",this.Tab00_Tabpage3_btn_save_onclick,this);
            this.Tab00.Tabpage4.form.btn_plus.addEventHandler("onclick",this.Tab00_Tabpage4_btn_plus_onclick,this);
            this.Tab00.Tabpage4.form.btn_minus.addEventHandler("onclick",this.Tab00_Tabpage4_btn_minus_onclick,this);
            this.Tab00.Tabpage4.form.btn_save.addEventHandler("onclick",this.Tab00_Tabpage4_btn_save_onclick,this);
            this.Tab00.Tabpage5.form.btn_plus.addEventHandler("onclick",this.Tab00_Tabpage5_btn_plus_onclick,this);
            this.Tab00.Tabpage5.form.btn_minus.addEventHandler("onclick",this.Tab00_Tabpage5_btn_minus_onclick,this);
            this.Tab00.Tabpage5.form.btn_save.addEventHandler("onclick",this.Tab00_Tabpage5_btn_save_onclick,this);
            this.Tab00.Tabpage6.form.btn_plus.addEventHandler("onclick",this.Tab00_Tabpage6_btn_plus_onclick,this);
            this.Tab00.Tabpage6.form.btn_minus.addEventHandler("onclick",this.Tab00_Tabpage6_btn_minus_onclick,this);
            this.Tab00.Tabpage6.form.btn_save.addEventHandler("onclick",this.Tab00_Tabpage6_btn_save_onclick,this);
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
