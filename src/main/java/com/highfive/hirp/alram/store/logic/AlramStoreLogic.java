package com.highfive.hirp.alram.store.logic;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.highfive.hirp.alram.domain.Alram;
import com.highfive.hirp.alram.domain.AlramCode;
import com.highfive.hirp.alram.domain.AlramSetting;
import com.highfive.hirp.alram.store.AlramStore;

@Repository
public class AlramStoreLogic implements AlramStore{

	@Override
	public AlramSetting selectAlramSetting(SqlSession sqlSession, String emplId) {
		AlramSetting alramSetting = sqlSession.selectOne("AlramMapper.selectAlramSetting", emplId);
		return alramSetting;
	}

	@Override
	public int insertAlramSetting(SqlSession sqlSession, String emplId) {
		int result = sqlSession.insert("AlramMapper.insertAlramSetting", emplId);
		return result;
	}

	@Override
	public int updateAlramSetting(SqlSession sqlSession, AlramSetting alramSetting) {
		int result = sqlSession.update("AlramMapper.updateAlramSetting", alramSetting);
		return result;
	}

	@Override
	public List<Alram> selectAllAlram(SqlSession sqlSession, String emplId) {
		List<Alram> allAlramList = sqlSession.selectList("AlramMapper.selectAllAlram", emplId);
		return allAlramList;
	}

	@Override
	public List<Alram> selectUnreadAlram(SqlSession sqlSession, AlramSetting alramSetting) {
		List<Alram> unreadAlramList = sqlSession.selectList("AlramMapper.selectUnreadAlram", alramSetting);
		return unreadAlramList;
	}

	@Override
	public List<Alram> selectAlramByCode(SqlSession sqlSession, AlramCode alramCode) {
		List<Alram> codeAlramList = sqlSession.selectList("AlramMapper.selectAlramByCode", alramCode);
		return codeAlramList;
	}

	@Override
	public int insertAlram(SqlSession sqlSession, Alram alram) {
		int result = sqlSession.insert("AlramMapper.insertAlram", alram);
		return result;
	}

	@Override
	public int updateReadAlram(SqlSession sqlSession, String emplId) {
		int result = sqlSession.insert("AlramMapper.updateReadAlram", emplId);
		return result;
	}

	@Override
	public int deleteAllAlram(SqlSession sqlSession, String emplId) {
		int result = sqlSession.delete("AlramMapper.deleteAllAlram", emplId);
		return result;
	}

	@Override
	public int deleteAlramByNo(SqlSession sqlSession, String alramNo) {
		int result = sqlSession.delete("AlramMapper.deleteAlramByNo", alramNo);
		return result;
	}

	
}
