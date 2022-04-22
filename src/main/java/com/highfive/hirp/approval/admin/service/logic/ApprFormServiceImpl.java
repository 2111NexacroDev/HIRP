package com.highfive.hirp.approval.admin.service.logic;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.highfive.hirp.approval.admin.domain.ApprForm;
import com.highfive.hirp.approval.admin.service.ApprFormService;
import com.highfive.hirp.approval.admin.store.ApprFormStore;

@Service
public class ApprFormServiceImpl implements ApprFormService{

	@Autowired
	private ApprFormStore aStore;
	
	@Autowired
	private SqlSession sqlSession;
	
	@Override
	public List<ApprForm> printAllForm() {
		List<ApprForm> aList = aStore.selectAllForm(sqlSession);
		return aList;
	}

	@Override
	public ApprForm printOneForm() {
		ApprForm form = aStore.selectOneForm(sqlSession);
		return form;
	}

	@Override
	public int registerForm(ApprForm form) {
		int result = aStore.insertForm(sqlSession,form);
		return result;
	}

	@Override
	public int modifyForm(ApprForm form) {
		int result = aStore.updateForm(sqlSession,form);
		return result;
	}

	@Override
	public int removeForm(int formNo) {
		int result = aStore.deleteForm(sqlSession,formNo);
		return result;
	}

}
