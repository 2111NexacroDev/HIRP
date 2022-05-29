package com.highfive.hirp.employee.controller;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.highfive.hirp.dept.domain.Dept;
import com.highfive.hirp.dept.service.DeptService;
import com.highfive.hirp.employee.domain.Career;
import com.highfive.hirp.employee.domain.Certification;
import com.highfive.hirp.employee.domain.Employee;
import com.highfive.hirp.employee.domain.JobRole;
import com.highfive.hirp.employee.domain.Language;
import com.highfive.hirp.employee.domain.Military;
import com.highfive.hirp.employee.service.EmployeeAdminService;
import com.highfive.hirp.position.domain.Position;
import com.highfive.hirp.position.service.PositionService;
import com.nexacro.uiadapter17.spring.core.annotation.ParamDataSet;
import com.nexacro.uiadapter17.spring.core.annotation.ParamVariable;
import com.nexacro.uiadapter17.spring.core.data.NexacroResult;
import com.nexacro17.xapi.data.DataSet;
import com.nexacro17.xapi.data.DataTypes;

@Controller
public class EmployeeAdminController {
	@Autowired
	private DeptService dService;
	
	@Autowired
	private PositionService pService;
	
	@Autowired
	private EmployeeAdminService eAService;
	
	// 재직자 조회
	@RequestMapping(value="/admin/emplinfo.hirp", method=RequestMethod.GET)
	public NexacroResult empListView() {
		int 	nErrorCode = 0;
		String  strErrorMsg = "START";
		NexacroResult result = new NexacroResult(); 
		
		// 부서 조회
		List<Dept> dList = dService.selectAllDept();
		
		// 직급 조회
		List<Position> pList = pService.selectAllPosition();
		
		// 재직자 조회
		List<Employee> empList = eAService.printAllEmployee();
		
		// 퇴사자 조회
		List<Employee> retireeList = eAService.printAllRetiree();
		
		if(!empList.isEmpty() && !retireeList.isEmpty() && !dList.isEmpty() && !pList.isEmpty()) {
			nErrorCode = 0;
			strErrorMsg = "SUCC";
			result.addDataSet("out_dept", dList);
			result.addDataSet("out_pos", pList);
			result.addDataSet("out_empl", empList);
			result.addDataSet("out_retiree", retireeList);
		}else {
			nErrorCode = -1;
			strErrorMsg = "Fail";
		}
		result.addVariable("ErrorCode", nErrorCode);
		result.addVariable("ErrorMsg", strErrorMsg);
		return result;
	}
	
	// 사원 정보 상세 조회
	@RequestMapping(value="/admin/empDetail.hirp", method=RequestMethod.POST)
	public NexacroResult empDetailView(
			@ParamVariable(name="emplId") String emplId) {
		int 	nErrorCode = 0;
		String  strErrorMsg = "START";
		NexacroResult result = new NexacroResult(); 
		
		// 부서 조회
		List<Dept> dList = dService.selectAllDept();
		
		// 직급 조회
		List<Position> pList = pService.selectAllPosition();
		
		// 직원 정보 조회
		Employee employee = eAService.printEmployeeInfo(emplId);
		List<JobRole> jList = eAService.selectAllJobById(emplId);
		List<Career> caList = eAService.selectAllCareerById(emplId);
		List<Language> lList = eAService.selectAllLanguageById(emplId);
		List<Certification> cList = eAService.selectAllCertById(emplId);
		List<Military> mList = eAService.selectAllMilitaryById(emplId);
		
		if(employee != null && !dList.isEmpty() && !pList.isEmpty()) {
			nErrorCode = 0;
			strErrorMsg = "SUCC";
			
			result.addDataSet("out_dept", dList);
			result.addDataSet("out_pos", pList);
			result.addDataSet("out_empl", employee);
			result.addDataSet("out_empl_top", employee);
			
			if(!jList.isEmpty()) {result.addDataSet("out_jobRole", jList);}
			if(!caList.isEmpty()) {result.addDataSet("out_career", caList);}
			if(!lList.isEmpty()) {result.addDataSet("out_lang", lList);}
			if(!cList.isEmpty()) {result.addDataSet("out_cert", cList);}
			if(!mList.isEmpty()) {result.addDataSet("out_military", mList);}
		}else {
			nErrorCode = -1;
			strErrorMsg = "Fail";
		}
		result.addVariable("ErrorCode", nErrorCode);
		result.addVariable("ErrorMsg", strErrorMsg);
		return result;
	}
	
	// 임시회원 리스트 조회
	@RequestMapping(value="/admin/tempEmplList.hirp", method=RequestMethod.GET)
	public NexacroResult tempEmpListView() {
		int 	nErrorCode = 0;
		String  strErrorMsg = "START";
		NexacroResult result = new NexacroResult(); 
		
		// 부서 조회
		List<Dept> dList = dService.selectAllDept();
		
		// 직급 조회
		List<Position> pList = pService.selectAllPosition();
		
		// 임시회원 조회
		List<Employee> tempEmpList = eAService.printAllTempEmployee();
		
		if(!tempEmpList.isEmpty() && !dList.isEmpty() && !pList.isEmpty()) {
			nErrorCode = 0;
			strErrorMsg = "SUCC";
			result.addDataSet("out_dept", dList);
			result.addDataSet("out_pos", pList);
			result.addDataSet("out_temp", tempEmpList);
		}else {
			nErrorCode = -1;
			strErrorMsg = "Fail";
		}
		result.addVariable("ErrorCode", nErrorCode);
		result.addVariable("ErrorMsg", strErrorMsg);
		return result;		
	}
	
	// 사원 기본 정보 수정
	@RequestMapping(value="/admin/empModifyInfo.hirp", method=RequestMethod.POST)
	public NexacroResult empUpdateBasic(
			@ParamDataSet(name="in_empl") 		DataSet in_empl
			,@ParamDataSet(name="in_empl_top") 	DataSet in_empl_top
			,@ParamVariable(name="emplId") 		String 	emplId) throws Exception {
		int 	nErrorCode = 0;
		String  strErrorMsg = "START";
		NexacroResult result = new NexacroResult();
		String sOrgEmpId = emplId.toString();
		
		Employee employee = new Employee();
		employee.setEmplId(sOrgEmpId);
		employee.setEmplName(dsGet(in_empl_top, 0, "emplName"));
		employee.setDeptCode(dsGet(in_empl_top, 0, "deptCode"));
		employee.setPositionCode(dsGet(in_empl_top, 0, "positionCode"));
		employee.setDirectNo(dsGet(in_empl_top, 0, "directNo"));
		employee.setEmail(dsGet(in_empl_top, 0, "email"));
		employee.setPhoneNo(dsGet(in_empl_top, 0, "phoneNo"));
		employee.setIsStatus(dsGet(in_empl_top, 0, "isStatus"));
		employee.setRecruitCategory(dsGet(in_empl, 0, "recruitCategory"));
		employee.setSalaryCategory(dsGet(in_empl, 0, "salaryCategory"));
		employee.setReferrer(dsGet(in_empl, 0, "referrer"));
		employee.setBirthday(dsGet(in_empl, 0, "birthday").split(" ")[0]);
		employee.setGender(dsGet(in_empl, 0, "gender"));
		employee.setIsMarriage(dsGet(in_empl, 0, "isMarriage"));
		employee.setIsDisability(dsGet(in_empl, 0, "isDisability"));
		employee.setIsVeterans(dsGet(in_empl, 0, "isVeterans"));
		employee.setEndDate(dsGet(in_empl, 0, "endDate").split(" ")[0]);
		employee.setEndReason(dsGet(in_empl, 0, "endReason"));
		
		int uResult = eAService.modifyEmployeeInfo(employee);
		if(uResult < 0) {
			nErrorCode = -1;
			strErrorMsg = "FAIL";
		}else {
			nErrorCode 	= 0;
			strErrorMsg = "SUCC";
		}
		result.addVariable("ErrorCode", nErrorCode);
		result.addVariable("ErrorMsg", strErrorMsg);
		return result;
	}
	
	// 사원 부가 정보 추가/수정
	@RequestMapping(value="/admin/empChange{param}.hirp", method=RequestMethod.POST)
	public NexacroResult empModifyDetail(
			 @PathVariable(name="param") 		String infoCategory
			,@ParamDataSet(name="in_data") 		DataSet in_data
			,@ParamVariable(name="emplId") 		String 	emplId) throws Exception {
		int 	nErrorCode = 0;
		String  strErrorMsg = "START";
		NexacroResult result = new NexacroResult();
		String sOrgEmpId = emplId.toString();
		
		if(infoCategory.equals("Top")) {
			Employee employee = new Employee();
			employee.setEmplId(sOrgEmpId);
			employee.setEmplName(dsGet(in_data, 0, "emplName"));
			employee.setDeptCode(dsGet(in_data, 0, "deptCode"));
			employee.setPositionCode(dsGet(in_data, 0, "positionCode"));
			employee.setDirectNo(dsGet(in_data, 0, "directNo"));
			employee.setEmail(dsGet(in_data, 0, "email"));
			employee.setPhoneNo(dsGet(in_data, 0, "phoneNo"));
			employee.setIsStatus(dsGet(in_data, 0, "isStatus"));
			int topResult = eAService.modifyTopInfo(employee);			
			if(topResult < 0) {
				nErrorCode = -1;
				strErrorMsg = "FAIL";
			}else {
				nErrorCode 	= 0;
				strErrorMsg = "SUCC";
			}	
		}
		else if(infoCategory.equals("JobRole")) {
			int iResult = 0;
			int uResult = 0;
			int 	i;
			for(i = 0; i < in_data.getRowCount(); i++) {
				int rowType = in_data.getRowType(i);
				JobRole jobRole = new JobRole();
				jobRole.setEmplId(sOrgEmpId);
				jobRole.setJobRoleDivision(dsGet(in_data, i, "jobRoleDivision"));
				jobRole.setJobRoleTitle(dsGet(in_data, i, "jobRoleTitle"));
				jobRole.setJobRoleStartDate(dsGet(in_data, i, "jobRoleStartDate").split(" ")[0]);
				jobRole.setJobRoleEndDate(dsGet(in_data, i, "jobRoleEndDate").split(" ")[0]);
				jobRole.setJobRoleConts(dsGet(in_data, i, "jobRoleConts"));
				jobRole.setJobRoleEtc(dsGet(in_data, i, "jobRoleEtc"));
				if(rowType == DataSet.ROW_TYPE_INSERTED) {
					iResult += eAService.registerJobRole(jobRole);
				}else if(rowType == DataSet.ROW_TYPE_UPDATED) {
					int roleNo = Integer.parseInt(dsGet(in_data, i, "jobRoleNo"));
					jobRole.setJobRoleNo(roleNo);
					uResult += eAService.modifyJobRole(jobRole);
				}
			}
			if(iResult < 0 && uResult < 0) {
				nErrorCode = -1;
				strErrorMsg = "FAIL";
			}else {
				nErrorCode 	= 0;
				strErrorMsg = "SUCC";
			}			
		} else if(infoCategory.equals("Career")) {
			int iResult = 0;
			int uResult = 0;
			int 	i;
			for(i = 0; i < in_data.getRowCount(); i++) {
				int rowType = in_data.getRowType(i);
				Career career = new Career();
				career.setEmplId(sOrgEmpId);
				career.setCareerStartDate(dsGet(in_data, i, "careerStartDate").split(" ")[0]);
				career.setCareerEndDate(dsGet(in_data, i, "careerEndDate").split(" ")[0]);
				career.setCareerPlace(dsGet(in_data, i, "careerPlace"));
				career.setCareerRank(dsGet(in_data, i, "careerRank"));
				career.setCareerJobRole(dsGet(in_data, i, "careerJobRole"));
				career.setCareerPeriod(dsGet(in_data, i, "careerPeriod"));
				career.setCareerEndReason(dsGet(in_data, i, "careerEndReason"));
				career.setCareerEtc(dsGet(in_data, i, "careerEtc"));
				if(rowType == DataSet.ROW_TYPE_INSERTED) {
					System.out.println("커리어"+career);
					iResult += eAService.registerCareer(career);
				}else if(rowType == DataSet.ROW_TYPE_UPDATED) {
					int careerNo = Integer.parseInt(dsGet(in_data, i, "careerNo"));
					career.setCareerNo(careerNo);
					System.out.println("커리어"+career);
					uResult += eAService.modifyCareer(career);
				}
			}

			if(iResult < 0 && uResult < 0) {
				nErrorCode = -1;
				strErrorMsg = "FAIL";
			}else {
				nErrorCode 	= 0;
				strErrorMsg = "SUCC";
			}				
		} else if(infoCategory.equals("Cert")) {
			int iResult = 0;
			int uResult = 0;
			int 	i;
			for(i = 0; i < in_data.getRowCount(); i++) {
				int rowType = in_data.getRowType(i);
				Certification cert = new Certification();
				cert.setEmplId(sOrgEmpId);
				cert.setCertCategory(dsGet(in_data, i, "certCategory"));
				cert.setCertName(dsGet(in_data, i, "certName"));
				cert.setCertEnrollNo(dsGet(in_data, i, "certEnrollNo"));
				cert.setCertLevel(dsGet(in_data, i, "certLevel"));
				cert.setCertInst(dsGet(in_data, i, "certInst"));
				cert.setCertStartDate(dsGet(in_data, i, "certStartDate").split(" ")[0]);
				cert.setCertEndDate(dsGet(in_data, i, "certEndDate").split(" ")[0]);
				if(rowType == DataSet.ROW_TYPE_INSERTED) {
					iResult += eAService.registerCert(cert);
				}else if(rowType == DataSet.ROW_TYPE_UPDATED) {
					int certNo = Integer.parseInt(dsGet(in_data, i, "certNo"));
					cert.setCertNo(certNo);
					uResult += eAService.modifyCert(cert);
				}
			}
			
			if(iResult < 0 && uResult < 0) {
				nErrorCode = -1;
				strErrorMsg = "FAIL";
			}else {
				nErrorCode 	= 0;
				strErrorMsg = "SUCC";
			}	
		} else if(infoCategory.equals("Lang")) {
			int iResult = 0;
			int uResult = 0;
			int 	i;
			for(i = 0; i < in_data.getRowCount(); i++) {
				int rowType = in_data.getRowType(i);
				Language lang = new Language();
				int langScore 		 = dsGet(in_data, i, "langScore") != "" 
						? Integer.parseInt(dsGet(in_data, i, "langScore")) : 0;
				lang.setEmplId(sOrgEmpId);
				lang.setLangCategory(dsGet(in_data, i, "langCategory"));
				lang.setLangName(dsGet(in_data, i, "langName"));
				lang.setLangTestDate(dsGet(in_data, i, "langTestDate").split(" ")[0]);
				lang.setLangInst(dsGet(in_data, i, "langInst"));
				lang.setLangScore(langScore);
				lang.setLangGrade(dsGet(in_data, i, "langGrade"));
				lang.setLangEtc(dsGet(in_data, i, "langEtc"));
				if(rowType == DataSet.ROW_TYPE_INSERTED) {
					iResult += eAService.registerLang(lang);
				}else if(rowType == DataSet.ROW_TYPE_UPDATED) {
					int langNo = Integer.parseInt(dsGet(in_data, i, "langNo"));
					lang.setLangNo(langNo);
					uResult += eAService.modifyLang(lang);
				}
			}
			if(iResult < 0 && uResult < 0) {
				nErrorCode = -1;
				strErrorMsg = "FAIL";
			}else {
				nErrorCode 	= 0;
				strErrorMsg = "SUCC";
			}				
		} else if(infoCategory.equals("Military")) {
			int iResult = 0;
			int uResult = 0;
			int 	i;
			for(i = 0; i < in_data.getRowCount(); i++) {
				int rowType = in_data.getRowType(i);
				Military military = new Military();
				military.setEmplId(sOrgEmpId);
				military.setMilitaryGrade(dsGet(in_data, i, "militaryGrade"));
				military.setMilitaryCode(dsGet(in_data, i, "militaryCode"));
				military.setIsMilitaryEnd(dsGet(in_data, i, "isMilitaryEnd"));
				military.setMilitaryStartDate(dsGet(in_data, i, "militaryStartDate").split(" ")[0]);
				military.setMilitaryEndDate(dsGet(in_data, i, "militaryEndDate").split(" ")[0]);
				military.setMilitaryEtc(dsGet(in_data, i, "militaryEtc"));
				if(rowType == DataSet.ROW_TYPE_INSERTED) {
					iResult += eAService.registerMilitary(military);
				}else if(rowType == DataSet.ROW_TYPE_UPDATED) {
					int militaryNo = Integer.parseInt(dsGet(in_data, i, "militaryNo"));
					military.setMilitaryNo(militaryNo);
					uResult += eAService.modifyMilitary(military);
				}
			}
			if(iResult < 0 && uResult < 0) {
				nErrorCode = -1;
				strErrorMsg = "FAIL";
			}else {
				nErrorCode 	= 0;
				strErrorMsg = "SUCC";
			}				
		} else {
			System.out.println("파라미터 없음");
		}
		result.addVariable("ErrorCode", nErrorCode);
		result.addVariable("ErrorMsg", strErrorMsg);
		return result;
	}
	
	// ResultSet ==> Dataset
	public DataSet RsToDs(ResultSet rs, String dsID) throws Exception
	{
		int i;
		int iColCnt;
		String sColName;
		String sColType;;
		int ColType = 0; 
		int ColSize = 255; 
		
		DataSet ds = new DataSet(dsID);
		ResultSetMetaData rsmd = rs.getMetaData();

		iColCnt = rsmd.getColumnCount();
		for( i = 1 ; i <= iColCnt ; i++ )
		{
			sColName = rsmd.getColumnName(i).toUpperCase();		
			sColType = rsmd.getColumnTypeName(i);

			ColType = DataTypes.STRING;
			if(sColType.equals("INTEGER"))	ColType = DataTypes.INT;
			if(sColType.equals("DECIMAL"))	ColType = DataTypes.DECIMAL;
			
			ds.addColumn(sColName, ColType, ColSize);		
		}
		while(rs.next())
		{
			int row = ds.newRow();
			for( i = 1 ; i <= iColCnt ; i++ )
			{
				sColName = rsmd.getColumnName(i).toUpperCase();
				ds.set(row, sColName, rsGet(rs, sColName));
			}
		}

	  return ds;
	}
	
	// ResultSet value
	public String rsGet(ResultSet rs, String id) throws Exception {
		if( rs.getString(id) == null ){
			return "";
		} 
		else {
			return rs.getString(id);
		}
	}	
	
	// Dataset value
	public String dsGet(DataSet ds, int rowno, String colid) throws Exception {
	    String value;
	    value = ds.getString(rowno, colid);
	    if( value == null )
	        return "";
	    else
	        return value;
	} 
	
	// 사원 정보 삭제
	@RequestMapping(value="/admin/remove{param}.hirp", method=RequestMethod.POST)
	public NexacroResult removeInfoDate(
			@PathVariable(name="param") String infoCategory
			, @ParamVariable(name="infoNo") int infoNo) {
		int 	nErrorCode = 0;
		String  strErrorMsg = "START";
		NexacroResult result = new NexacroResult();
		
		int removeResult;
		
		if(infoCategory.equals("JobRole")) {
			removeResult = eAService.removeInfoAboutJob(infoNo);					
		} else if(infoCategory.equals("Career")) {
			removeResult = eAService.removeInfoAboutCareer(infoNo);
		} else if(infoCategory.equals("Lang")) {
			removeResult = eAService.removeInfoAboutLang(infoNo);
		} else if(infoCategory.equals("Cert")) {
			removeResult = eAService.removeInfoAboutCert(infoNo);
		} else {
			removeResult = eAService.removeInfoAboutMilitary(infoNo);
		}
		
		if(removeResult > 0) {
			nErrorCode = 0;
			strErrorMsg = "SUCC";
		} else {
			nErrorCode = -1;
			strErrorMsg = "Fail";
		}
		result.addVariable("ErrorCode", nErrorCode);
		result.addVariable("ErrorMsg", strErrorMsg);
		return result;	
	}
	
	// 사원 퇴직 처리
	@RequestMapping(value="/admin/resignEmpl.hirp", method=RequestMethod.POST)
	public NexacroResult empResign(
			@ParamVariable(name="emplId") String emplId) {
		int 	nErrorCode = 0;
		String  strErrorMsg = "START";
		String tempId = emplId;
		NexacroResult result = new NexacroResult(); 
		int resignResult = eAService.resignEmployee(tempId);
		
		if(resignResult > 0) {
			nErrorCode = 0;
			strErrorMsg = "SUCC";
		} else {
			nErrorCode = -1;
			strErrorMsg = "Fail";
		}
		result.addVariable("ErrorCode", nErrorCode);
		result.addVariable("ErrorMsg", strErrorMsg);
		return result;	
	}
	
	// 사원 가입 승인
	@RequestMapping(value="/admin/emplLevelUp.hirp", method=RequestMethod.POST)
	public NexacroResult signUpTempEmp(
			@ParamVariable(name="emplId") String emplId,
			@ParamVariable(name="deptCode") String deptCode,
			@ParamVariable(name="positionCode") String positionCode) {
		int 	nErrorCode = 0;
		String  strErrorMsg = "START";
		String tempId = emplId;
		NexacroResult result = new NexacroResult(); 
		
		Employee employee = new Employee();
		employee.setEmplId(tempId);
		employee.setDeptCode(deptCode);
		employee.setPositionCode(positionCode);
		int modifyLevelResult = eAService.modifyLevelEmployee(employee);		
		
		if(modifyLevelResult > 0) {
			nErrorCode = 0;
			strErrorMsg = "SUCC";
		} else {
			nErrorCode = -1;
			strErrorMsg = "Fail";
		}
		result.addVariable("ErrorCode", nErrorCode);
		result.addVariable("ErrorMsg", strErrorMsg);
		return result;	
	}
	
	//직원 검색
	@ResponseBody
	@RequestMapping(value="/searchEmplList.hirp", method=RequestMethod.POST, produces="application/json;charset=utf-8")
	public String searchEmplList(
			Model model
			,@RequestParam("emplSearchKeyword") String emplSearchKeyword){
		System.out.println("직원 검색" + emplSearchKeyword); //값 잘 넘어옴

		List<Employee> emplList = eAService.selectSearchEmplList(emplSearchKeyword);
		model.addAttribute("emplList", emplList);
		System.out.println("직원 검색 결과 " + emplList);
//		if(!emplList.isEmpty()) {
		Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		return gson.toJson(emplList);
//		}
//		return "";
	}
}
