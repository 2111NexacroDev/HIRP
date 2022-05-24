package com.highfive.hirp.employee.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
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
	// 파라미터 맞는지 체크해야함
	public NexacroResult empUpdate(
			 @ParamDataSet(name="in_emp") 		DataSet inEmp
			 ,@ParamVariable(name="employee") 	Employee employee) {
		NexacroResult result = new NexacroResult(); 
		int modifyResult = eAService.modifyEmployeeInfo(employee);
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
			@RequestParam("emplSearchKeyword") String emplSearchKeyword){
		System.out.println("직원 검색" + emplSearchKeyword); //값 잘 넘어옴

		List<Employee> emplList = eAService.selectSearchEmplList(emplSearchKeyword);
//		System.out.println(emplList);
		if(!emplList.isEmpty()) {
			Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
			return gson.toJson(emplList);
		}
		return "";
	}
}
