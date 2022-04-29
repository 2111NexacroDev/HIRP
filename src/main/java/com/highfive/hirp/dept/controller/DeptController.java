package com.highfive.hirp.dept.controller;

import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.highfive.hirp.dept.domain.Dept;
import com.highfive.hirp.dept.service.DeptService;
import com.highfive.hirp.employee.domain.Employee;
import com.highfive.hirp.employee.service.EmployeeAdminService;
import com.nexacro.uiadapter17.spring.core.annotation.ParamDataSet;
import com.nexacro.uiadapter17.spring.core.annotation.ParamVariable;
import com.nexacro.uiadapter17.spring.core.data.NexacroResult;
import com.nexacro17.xapi.data.DataSet;

@Controller
public class DeptController {
	@Autowired
	private DeptService dService;
	
	@Autowired
	private EmployeeAdminService eAService;
	
	//부서 관리 페이지 이동
	public NexacroResult deptMainPage() {
		
		NexacroResult result = new NexacroResult();
		return result;
	}
	
	//부서, 직원 전체 list 조회
	@RequestMapping(value="/admin/deptInfo.hirp", method=RequestMethod.GET)
	public NexacroResult selectDeptList() {
		// ErrorCode, ErrorMsg, Dataset 선언
		int 	nErrorCode = 0;
		String  strErrorMsg = "START";
		NexacroResult result = new NexacroResult();
		// out_dept, out_pos
		List<Dept> dList = dService.selectAllDept();
		List<Employee> eList = eAService.printAllEmployee();
		if(!dList.isEmpty() && !eList.isEmpty()) {
			nErrorCode = 0;
			strErrorMsg = "SUCC";
			result.addDataSet("out_dept", dList);
			result.addDataSet("out_empl", eList);
		}else {
			nErrorCode = -1;
			strErrorMsg = "Fail";
		}
		result.addVariable("ErrorCode", nErrorCode);
		result.addVariable("ErrorMsg", strErrorMsg);
		return result;
	}
	
	//부서 이름 검색 //넥사에서 해결
//	public NexacroResult selectDeptSearch(
//			@ParamVariable(name="in_searchName") String searchName) {
//		
//		NexacroResult result = new NexacroResult();
//		return result;
//	}
	
	//부서 추가
	public NexacroResult insertDept(
			@ParamDataSet(name="in_dept") DataSet dept) {
		
		NexacroResult result = new NexacroResult();
		return result;
	}
	//부서정보 수정
//	public NexacroResult updateDept(
//			@ParamDataSet(name="in_dept") DataSet dept) {
//		
//		NexacroResult result = new NexacroResult();
//		return result;
//	}
	
	//부서 삭제
	@RequestMapping(value="/admin/deptDelete.hirp", method=RequestMethod.POST)
	public NexacroResult deleteDept(
			 @ParamDataSet(name="in_dept") 	DataSet inDept) {

		NexacroResult result = new NexacroResult();
		
		return result;
	}
	
	
	//저장 버튼 누르면 db에 저장되도록 하는 거
	//왜 자꾸 null값이래.......
	//부서 정보 수정 저장
	@RequestMapping(value="/admin/deptSave.hirp", method=RequestMethod.POST)
	public NexacroResult updateDept(
			 @ParamDataSet(name="in_dept") 	DataSet inDept) throws Exception {
		int 	nErrorCode = 0;
		String  strErrorMsg = "START";
		NexacroResult result = new NexacroResult();
		
		int 	i;
		int iResult = 0;
		int uResult = 0;
		if(inDept == null) {
			System.out.println("saveDept");
			System.out.println(inDept);
		}
		
		// DELETE
		// 삭제했던 로우가 있으면 for문으로 반복해서 삭제
		for(i = 0; i < inDept.getRemovedRowCount(); i++) {
			String deptCode = inDept.getRemovedData(i,  "DEPT_CODE").toString();
			System.out.println("delete:" + deptCode);
			dService.deleteDept(deptCode);
		}
		
		String deptCode 	 = dsGet(inDept, i, "DEPT_CODE");
		String deptName = dsGet(inDept, i, "DEPT_NAME");
		String deptSecondname 	 = dsGet(inDept, i, "DEPT_SECONDNAME");
		String deptColor 	 = dsGet(inDept, i, "DEPT_COLOR");
		String deptMaster 	 = dsGet(inDept, i, "DEPT_MASTER");
		String deptHiredate = dsGet(inDept, i, "DEPT_HIREDATE");
		String deptUppercode 	 = dsGet(inDept, i, "DEPT_UPPERCODE");
		int deptLevel 	 = dsGet(inDept, i, "DEPT_LEVEL") != "" ?
				Integer.parseInt(dsGet(inDept, i, "DEPT_LEVEL")) : 0;
		
		Dept dept = new Dept(
				deptCode
				, 	deptName
				, 	deptSecondname
				, 	deptColor
				, 	deptMaster
				, 	deptHiredate
				, 	deptUppercode
				, 	deptLevel);
		
		// INSERT, UPDATE
		// RowType에 따라서 INSERT OR UPDATE
		for(i = 0; i < inDept.getRowCount(); i++) {
			int rowType = inDept.getRowType(i);
			if( rowType == DataSet.ROW_TYPE_INSERTED) {
				iResult += dService.insertDept(dept);
			}else if( rowType == DataSet.ROW_TYPE_UPDATED) {
				String orgDeptCode = inDept.getSavedData(i, "DEPT_CODE").toString();
				System.out.println("orgDeptCode: " + orgDeptCode);
				dept.setDeptCode(orgDeptCode);
				uResult += dService.updateDept(dept);
			}
		}
		
		if(iResult < 0 && uResult < 0) {
			nErrorCode 	= -1;
			strErrorMsg = "FAIL";
		} else {
			nErrorCode 	= 0;
			strErrorMsg = "SUCC";
		}
		
		result.addVariable("ErrorCode", nErrorCode);
		result.addVariable("ErrorMsg", strErrorMsg);
		
		return result;
	}
	
	// Dataset value
	public String dsGet(DataSet ds, int rowno, String colid) throws Exception
	{
	    String value;
	    value = ds.getString(rowno, colid);
	    if( value == null )
	        return "";
	    else
	        return value;
	} 
	
}
