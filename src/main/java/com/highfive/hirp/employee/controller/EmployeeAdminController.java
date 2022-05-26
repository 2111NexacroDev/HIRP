package com.highfive.hirp.employee.controller;

import java.sql.Date;
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
	
	// 사원 정보 수정
	@RequestMapping(value="/admin/empChange{param}.hirp", method=RequestMethod.POST)
	public NexacroResult empUpdate(
			 @PathVariable(name="param") String infoCategory
			,@ParamDataSet(name="in_empl") 		DataSet in_empl
			,@ParamVariable(name="emplId") 		String 	emplId) throws Exception {
		int 	nErrorCode = 0;
		String  strErrorMsg = "START";
		NexacroResult result = new NexacroResult();
		
		if(infoCategory.equals("Info")) {
			Employee employee = new Employee();
			String sOrgEmpId = emplId.toString();
			employee.setEmplId(sOrgEmpId);
			employee.setBirthday(dsGet(in_empl, 0, "birthday"));
			int uResult = eAService.modifyEmployeeInfo(employee);
			if(uResult < 0) {
				nErrorCode = -1;
				strErrorMsg = "FAIL";
			}else {
				nErrorCode 	= 0;
				strErrorMsg = "SUCC";
			}		
		} else if(infoCategory.equals("JobRole")) {
			// INSERT, UPDATE
			// RowType에 따라서 INSERT OR UPDATE
			int iResult = 0;
			int uResult = 0;
			int 	i;
//			for(i = 0; i < in_empl.getRowCount(); i++) {
//				int rowType = in_empl.getRowType(i);
//				Employee employee = new Employee();
//				if( rowType == DataSet.ROW_TYPE_INSERTED) {
//					iResult += eAService.registerEmployee(employee);
//				}else if( rowType == DataSet.ROW_TYPE_UPDATED) {
//					String sOrgEmpId = in_empl.getSavedData(i, "emplId").toString();
//					employee.setEmplId(sOrgEmpId);
//					uResult += eAService.modifyEmployeeInfo(employee);
//				}
//			}
//			if(iResult < 0 && uResult < 0) {
//				nErrorCode = -1;
//				strErrorMsg = "FAIL";
//			}else {
//				nErrorCode 	= 0;
//				strErrorMsg = "SUCC";
//			}			
		} else if(infoCategory.equals("Career")) {
			
		} else if(infoCategory.equals("Cert")) {
			
		} else if(infoCategory.equals("Lang")) {
			
		} else if(infoCategory.equals("Military")) {
			
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
			@ParamVariable(name="emplId") String emplId) {
		int 	nErrorCode = 0;
		String  strErrorMsg = "START";
		String tempId = emplId;
		NexacroResult result = new NexacroResult(); 
		int modifyLevelResult = eAService.modifyLevelEmployee(tempId);		
		
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
		if(!emplList.isEmpty()) {
			Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
			return gson.toJson(emplList);
		}
		return "";
	}
}
