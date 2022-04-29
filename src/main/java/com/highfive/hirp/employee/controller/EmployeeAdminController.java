package com.highfive.hirp.employee.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.highfive.hirp.dept.domain.Dept;
import com.highfive.hirp.dept.service.DeptService;
import com.highfive.hirp.employee.domain.Employee;
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
		// 쿼리문 퇴사일 NULL인 사람만 조회할 것
		
		// out_empl, out_dept, out_pos
		//List<Dept> dList = dService.selectAllDept();
		//List<Position> pList = pService.selectAllPosition();
		List<Employee> empList = eAService.printAllEmployee();
		if(!empList.isEmpty()) {
			nErrorCode = 0;
			strErrorMsg = "SUCC";
			//result.addDataSet("out_dept", dList);
			//result.addDataSet("out_pos", pList);
			result.addDataSet("out_empl", empList);
		}else {
			nErrorCode = -1;
			strErrorMsg = "Fail";
		}
		result.addVariable("ErrorCode", nErrorCode);
		result.addVariable("ErrorMsg", strErrorMsg);
		return result;
	}
	
	// 퇴사자 조회
	public NexacroResult retireeListView() {
		NexacroResult result = new NexacroResult(); 
		List<Employee> retireeList = eAService.printAllRetiree();
		return result;
	}
	
	// 사원 검색 (와이어프레임엔 없음)
	public NexacroResult empSearchListView(
			@ParamDataSet(name="searchList") 		DataSet search) { //이거 매개변수 맞는지 체크해야함
		List<Employee> searchList = eAService.printSearchEmployee(search);
		NexacroResult result = new NexacroResult(); 
		return result;
	}
	
	// 사원 정보 상세 조회
	public NexacroResult empDetailView() {
		NexacroResult result = new NexacroResult(); 
		Employee employee = eAService.printEmployeeInfo();
		return result;
	}
	
	// 임시회원 리스트 조회(융경 쪽에서 데이터 받아야함)
	public NexacroResult tempEmpListView() {
		NexacroResult result = new NexacroResult(); 
		List<Employee> tempEmpList = eAService.printAllTempEmployee();
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
	public NexacroResult empResign(
			@ParamVariable(name="empNo") int empNo) {
		NexacroResult result = new NexacroResult(); 
		int resignResult = eAService.resignEmployee(empNo);
		return result;
	}
	
	// 사원 가입 승인
	public NexacroResult signUpTempEmp(
			@ParamVariable(name="empNo") int empNo) {
		NexacroResult result = new NexacroResult(); 
		int modifyLevelResult = eAService.modifyLevelEmployee(empNo);
		return result;
	}
}
