package com.highfive.hirp.alarm.store.logic;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.highfive.hirp.alarm.domain.Alarm;
import com.highfive.hirp.alarm.domain.AlarmCode;
import com.highfive.hirp.alarm.domain.AlarmSetting;
import com.highfive.hirp.alarm.store.AlarmStore;

@Repository
public class AlarmStoreLogic implements AlarmStore{

	@Override
	public AlarmSetting selectAlarmSetting(SqlSession sqlSession, String emplId) {
		AlarmSetting alarmSetting = sqlSession.selectOne("AlarmMapper.selectAlarmSetting", emplId);
		return alarmSetting;
	}

	@Override
	public int insertAlarmSetting(SqlSession sqlSession, String emplId) {
		int result = sqlSession.insert("AlarmMapper.insertAlarmSetting", emplId);
		return result;
	}

	@Override
	public int updateAlarmSetting(SqlSession sqlSession, AlarmSetting alarmSetting) {
		int result = sqlSession.update("AlarmMapper.updateAlarmSetting", alarmSetting);
		return result;
	}

	//알림
	@Override
	public List<Alarm> selectAllAlarm(SqlSession sqlSession, String emplId) {
		List<Alarm> allAlarmList = sqlSession.selectList("AlarmMapper.selectAllAlarm", emplId);
		return allAlarmList;
	}

	@Override
	public List<Alarm> selectUnreadAlarm(SqlSession sqlSession, AlarmSetting alarmSetting) {
		List<Alarm> unreadAlarmList = sqlSession.selectList("AlarmMapper.selectUnreadAlarm", alarmSetting);
		return unreadAlarmList;
	}

	@Override
	public List<Alarm> selectAlarmByCode(SqlSession sqlSession, AlarmCode alarmCode) {
		List<Alarm> codeAlarmList = sqlSession.selectList("AlarmMapper.selectAlarmByCode", alarmCode);
		return codeAlarmList;
	}

	@Override
	public int insertAlarm(SqlSession sqlSession, Alarm alarm) {
		int result = sqlSession.insert("AlarmMapper.insertAlarm", alarm);
		return result;
	}

	@Override
	public int updateReadAlarm(SqlSession sqlSession, String emplId) {
		int result = sqlSession.insert("AlarmMapper.updateReadAlarm", emplId);
		return result;
	}

	@Override
	public int deleteAllAlarm(SqlSession sqlSession, String emplId) {
		int result = sqlSession.delete("AlarmMapper.deleteAllAlarm", emplId);
		return result;
	}

	@Override
	public int deleteAlarmByNo(SqlSession sqlSession, String alarmNo) {
		int result = sqlSession.delete("AlarmMapper.deleteAlarmByNo", alarmNo);
		return result;
	}

	
}
