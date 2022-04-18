package com.highfive.hirp.alram.service.logic;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.highfive.hirp.alram.domain.Alram;
import com.highfive.hirp.alram.domain.AlramCode;
import com.highfive.hirp.alram.domain.AlramSetting;
import com.highfive.hirp.alram.service.AlramService;
import com.highfive.hirp.alram.store.AlramStore;

@Service
public class AlramServiceImpl implements AlramService{
	@Autowired
	private SqlSession sqlSession;
	
	@Autowired
	private AlramStore aStore;

	//알림 설정
	@Override
	public AlramSetting selectAlramSetting(String emplId) {
		AlramSetting alramSetting = aStore.selectAlramSetting(sqlSession, emplId);
		return alramSetting;
	}

	@Override
	public int insertAlramSetting(String emplId) {
		int result = aStore.insertAlramSetting(sqlSession, emplId);
		return result;
	}

	@Override
	public int updateAlramSetting(AlramSetting alramSetting) {
		int result = aStore.updateAlramSetting(sqlSession, alramSetting);
		return result;
	}


	//알림
	@Override
	public List<Alram> selectAllAlram(String emplId) {
		List<Alram> alramList = aStore.selectAllAlram(sqlSession, emplId);
		return alramList;
	}

	@Override
	public List<Alram> selectUnreadAlram(AlramSetting alramSetting) {
		List<Alram> unreadAlramList = aStore.selectUnreadAlram(sqlSession, alramSetting);
		return unreadAlramList;
	}

	@Override
	public List<Alram> selectAlramByCode(AlramCode alramCode) {
		List<Alram> codeAlramList = aStore.selectAlramByCode(sqlSession, alramCode);
		return codeAlramList;
	}

	@Override
	public int insertAlram(Alram alram) {
		int result = aStore.insertAlram(sqlSession, alram);
		return result;
	}

	@Override
	public int updateReadAlram(String emplId) {
		int result = aStore.updateReadAlram(sqlSession, emplId);
		return result;
	}

	@Override
	public int deleteAllAlram(String emplId) {
		int result = aStore.deleteAllAlram(sqlSession, emplId);
		return result;
	}

	@Override
	public int deleteAlramByNo(String alramNo) {
		int result = aStore.deleteAlramByNo(sqlSession, alramNo);
		return result;
	}


}
