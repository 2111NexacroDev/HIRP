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
		List<Employee> eList = eAService.printAllEmployeeWithName();
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
	
	
	//부서 추가
	@RequestMapping(value="/admin/deptInsert.hirp", method=RequestMethod.POST)
	public NexacroResult insertDept(
			@ParamDataSet(name="in_dept") 	DataSet inDept) throws Exception {
		int 	nErrorCode = 0;
		String  strErrorMsg = "START";
		NexacroResult result = new NexacroResult();
		
		int 	i;
		int iResult = 0;

		
		for(i = 0; i < inDept.getRowCount(); i++) {
			String deptCode 	 = dsGet(inDept, i, "deptCode");
			String deptName = dsGet(inDept, i, "deptName");
			String deptSecondname 	 = dsGet(inDept, i, "deptSecondname");
			String deptColor 	 = dsGet(inDept, i, "deptColor");
			String deptMaster 	 = dsGet(inDept, i, "deptMaster");
			String deptHiredate = dsGet(inDept, i, "deptHiredate");
			String deptUppercode 	 = dsGet(inDept, i, "deptUppercode");
			int deptLevel 	 = dsGet(inDept, i, "deptLevel") != "" ?
					Integer.parseInt(dsGet(inDept, i, "deptLevel")) : 0;
			
			Dept dept = new Dept(
					deptCode
					, 	deptName
					, 	deptSecondname
					, 	deptColor
					, 	deptMaster
					, 	deptHiredate
					, 	deptUppercode
					, 	deptLevel);
			
			int rowType = inDept.getRowType(i);
			if( rowType == DataSet.ROW_TYPE_INSERTED) {
				iResult += dService.insertDept(dept);
			}
		}
		
		if(iResult < 0) {
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

		int 	nErrorCode = 0;
		String  strErrorMsg = "START";
		NexacroResult result = new NexacroResult();
		
		int 	i;
		int dResult = 0;
		if(inDept == null) {
			System.out.println("saveDept");
			System.out.println(inDept);
		}
		
		// DELETE
		// 삭제했던 로우가 있으면 for문으로 반복해서 삭제
		for(i = 0; i < inDept.getRemovedRowCount(); i++) {
			String deptCode = inDept.getRemovedData(i,  "deptCode").toString();
			System.out.println("delete:" + deptCode);
			dResult = dService.deleteDept(deptCode);
		}
		
		if(dResult < 0) {
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
	
	//부서 정보 수정
	@RequestMapping(value="/admin/deptSave.hirp", method=RequestMethod.POST)
	public NexacroResult updateDept(
			 @ParamDataSet(name="in_dept") 	DataSet inDept) throws Exception {
		int 	nErrorCode = 0;
		String  strErrorMsg = "START";
		NexacroResult result = new NexacroResult();
		
		int 	i;
		int uResult = 0;

		// UPDATE
		// RowType에 따라서 UPDATE
		for(i = 0; i < inDept.getRowCount(); i++) {
			
			String deptCode 	 = dsGet(inDept, i, "deptCode");
			String deptName = dsGet(inDept, i, "deptName");
			String deptSecondname 	 = dsGet(inDept, i, "deptSecondname");
			String deptColor 	 = dsGet(inDept, i, "deptColor");
			String deptMaster 	 = dsGet(inDept, i, "deptMaster");
			String deptHiredate = dsGet(inDept, i, "deptHiredate");
			String deptUppercode 	 = dsGet(inDept, i, "deptUppercode");
			int deptLevel 	 = dsGet(inDept, i, "deptLevel") != "" ?
					Integer.parseInt(dsGet(inDept, i, "deptLevel")) : 0;
			
			Dept dept = new Dept(
					deptCode
					, 	deptName
					, 	deptSecondname
					, 	deptColor
					, 	deptMaster
					, 	deptHiredate
					, 	deptUppercode
					, 	deptLevel);
			
			
			int rowType = inDept.getRowType(i);
			if( rowType == DataSet.ROW_TYPE_UPDATED) {
				String orgDeptCode = inDept.getSavedData(i, "deptCode").toString();
				System.out.println("orgDeptCode: " + orgDeptCode);
				dept.setDeptCode(orgDeptCode);
				uResult += dService.updateDept(dept);
			}
		}
		
		if(uResult < 0) {
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
	
	//저장 버튼 누르면 db에 전부 저장 가능
	//부서 정보 수정 저장
//	@RequestMapping(value="/admin/deptSave.hirp", method=RequestMethod.POST)
//	public NexacroResult updateDept(
//			 @ParamDataSet(name="in_dept") 	DataSet inDept) throws Exception {
//		int 	nErrorCode = 0;
//		String  strErrorMsg = "START";
//		NexacroResult result = new NexacroResult();
//		
//		int 	i;
//		int iResult = 0;
//		int uResult = 0;
//
//		
//		// DELETE
//		// 삭제했던 로우가 있으면 for문으로 반복해서 삭제
//		for(i = 0; i < inDept.getRemovedRowCount(); i++) {
//			String deptCode = inDept.getRemovedData(i,  "deptCode").toString();
//			System.out.println("delete:" + deptCode);
//			dService.deleteDept(deptCode);
//		}
//		
//		
//		
//		// INSERT, UPDATE
//		// RowType에 따라서 INSERT OR UPDATE
//		for(i = 0; i < inDept.getRowCount(); i++) {
//			
//			String deptCode 	 = dsGet(inDept, i, "deptCode");
//			String deptName = dsGet(inDept, i, "deptName");
//			String deptSecondname 	 = dsGet(inDept, i, "deptSecondname");
//			String deptColor 	 = dsGet(inDept, i, "deptColor");
//			String deptMaster 	 = dsGet(inDept, i, "deptMaster");
//			String deptHiredate = dsGet(inDept, i, "deptHiredate");
//			String deptUppercode 	 = dsGet(inDept, i, "deptUppercode");
//			int deptLevel 	 = dsGet(inDept, i, "deptLevel") != "" ?
//					Integer.parseInt(dsGet(inDept, i, "deptLevel")) : 0;
//			
//			Dept dept = new Dept(
//					deptCode
//					, 	deptName
//					, 	deptSecondname
//					, 	deptColor
//					, 	deptMaster
//					, 	deptHiredate
//					, 	deptUppercode
//					, 	deptLevel);
//			
//			
//			int rowType = inDept.getRowType(i);
//			if( rowType == DataSet.ROW_TYPE_INSERTED) {
//				iResult += dService.insertDept(dept);
//			}else if( rowType == DataSet.ROW_TYPE_UPDATED) {
//				String orgDeptCode = inDept.getSavedData(i, "deptCode").toString();
//				System.out.println("orgDeptCode: " + orgDeptCode);
//				dept.setDeptCode(orgDeptCode);
//				uResult += dService.updateDept(dept);
//			}
//		}
//		
//		if(iResult < 0 && uResult < 0) {
//			nErrorCode 	= -1;
//			strErrorMsg = "FAIL";
//		} else {
//			nErrorCode 	= 0;
//			strErrorMsg = "SUCC";
//		}
//		
//		result.addVariable("ErrorCode", nErrorCode);
//		result.addVariable("ErrorMsg", strErrorMsg);
//		
//		return result;
//	}
	
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
