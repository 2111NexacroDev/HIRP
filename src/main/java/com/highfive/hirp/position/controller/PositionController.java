package com.highfive.hirp.position.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.highfive.hirp.position.domain.Position;
import com.highfive.hirp.position.service.PositionService;
import com.nexacro.uiadapter17.spring.core.annotation.ParamDataSet;
import com.nexacro.uiadapter17.spring.core.data.NexacroResult;
import com.nexacro17.xapi.data.DataSet;

@Controller
public class PositionController {
	@Autowired
	private PositionService pService;
	
	// 직급 목록 페이지
	@RequestMapping(value="/admin/positionInfo.hirp", method=RequestMethod.GET)
	public NexacroResult positionListView() {
		int nErrorCode = 0;
		String strErrorMsg = "START";
		NexacroResult result = new NexacroResult();
		List<Position> pList = pService.selectAllPosition();
		if(!pList.isEmpty()) {
			nErrorCode = 0;
			strErrorMsg = "SUCC";
			result.addDataSet("in_position", pList);
		}else {
			nErrorCode = -1;
			strErrorMsg = "Fail";
		}
		result.addVariable("ErrorCode", nErrorCode);
		result.addVariable("ErrorMsg", strErrorMsg);
		return result;
	}
	
	// 직급 추가
	@RequestMapping(value="/admin/positionInsert.hirp", method=RequestMethod.POST)
	public NexacroResult insertPosition(@ParamDataSet(name="in_position") DataSet inPosition) throws Exception {
		int nErrorCode = 0;
		String strErrorMsg = "START";
		NexacroResult result = new NexacroResult();
		
		int iResult = 0;
		
		String positionCode = dsGet(inPosition, 0, "positionCode");
		String positionName = dsGet(inPosition, 0, "positionName");
		
		Position position = new Position(
				positionCode
				, positionName);
		
		iResult = pService.insertPosition(position);
		
		if(iResult < 0) {
			nErrorCode = -1;
			strErrorMsg = "FAIL";
		}else {
			nErrorCode = 0;
			strErrorMsg = "SUCC";
		}
		
		result.addVariable("ErrorCode", nErrorCode);
		result.addVariable("ErrorMsg", strErrorMsg);
		return result;
	}
	
	// 직급 수정
	@RequestMapping(value="/admin/positionUpdate.hirp", method=RequestMethod.POST)
	public NexacroResult updatePositon(@ParamDataSet(name="in_position") DataSet inPosition) throws Exception {
		int nErrorCode = 0;
		String strErrorMsg = "START";
		NexacroResult result = new NexacroResult();
		
		int uResult = 0;
		
		String positionCode = dsGet(inPosition, 0, "positionCode");
		String positionName = dsGet(inPosition, 0, "positionName");
		
		Position position = new Position(
				positionCode
				, positionName);
		
		uResult = pService.updatePosition(position);
		
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
	
	// 직급 삭제
	@RequestMapping(value="/admin/positionDelete.hirp", method=RequestMethod.POST)
	public NexacroResult deletePosition(@ParamDataSet(name="in_position") DataSet inPosition) {
		int nErrorCode = 0;
		String strErrorMsg = "START";
		NexacroResult result = new NexacroResult();
		int i;
		int dResult = 0;
		
		for(i = 0; i < inPosition.getRemovedRowCount(); i++) {
			String positionCode = inPosition.getRemovedData(i, "positionCode").toString();
			dResult = pService.deletePosition(positionCode);
		}
		
		if(dResult < 0) {
			nErrorCode = -1;
			strErrorMsg = "FAIL";
		}else {
			nErrorCode = 0;
			strErrorMsg = "SUCC";
		}
		
		result.addVariable("ErrorCode", nErrorCode);
		result.addVariable("ErrorMsg", strErrorMsg);
		
		return result;
	}
	
	public String dsGet(DataSet ds, int rowno, String colid) throws Exception {
	    String value;
	    value = ds.getString(rowno, colid);
	    if( value == null )
	        return "";
	    else
	        return value;
	} 
}
