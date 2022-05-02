package com.highfive.hirp.alarm.service.logic;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.highfive.hirp.alarm.domain.Alarm;
import com.highfive.hirp.alarm.domain.AlarmCode;
import com.highfive.hirp.alarm.domain.AlarmSetting;
import com.highfive.hirp.alarm.service.AlarmService;
import com.highfive.hirp.alarm.store.AlarmStore;

@Service
public class AlarmServiceImpl implements AlarmService{
	@Autowired
	private SqlSession sqlSession;
	
	@Autowired
	private AlarmStore aStore;

	//알림 설정
	@Override
	public AlarmSetting selectAlarmSetting(String emplId) {
		AlarmSetting alarmSetting = aStore.selectAlarmSetting(sqlSession, emplId);
		return alarmSetting;
	}

	@Override
	public int insertAlarmSetting(String emplId) {
		int result = aStore.insertAlarmSetting(sqlSession, emplId);
		return result;
	}

	@Override
	public int updateAlarmSetting(AlarmSetting alarmSetting) {
		int result = aStore.updateAlarmSetting(sqlSession, alarmSetting);
		return result;
	}


	//알림
	@Override
	public List<Alarm> selectAllAlarm(String emplId) {
		List<Alarm> alarmList = aStore.selectAllAlarm(sqlSession, emplId);
		return alarmList;
	}

	@Override
	public List<Alarm> selectUnreadAlarm(AlarmSetting alarmSetting) {
		List<Alarm> unreadAlarmList = aStore.selectUnreadAlarm(sqlSession, alarmSetting);
		return unreadAlarmList;
	}

	@Override
	public List<Alarm> selectAlarmByCode(String emplId, String code) {
		AlarmCode alarmCode = new AlarmCode(emplId, code);
		List<Alarm> codeAlarmList = aStore.selectAlarmByCode(sqlSession, alarmCode);
		return codeAlarmList;
	}

	@Override
	public int insertAlarm(Alarm alarm) {
		int result = aStore.insertAlarm(sqlSession, alarm);
		return result;
	}

	@Override
	public int updateReadAlarm(String emplId) {
		int result = aStore.updateReadAlarm(sqlSession, emplId);
		return result;
	}

	@Override
	public int deleteAllAlarm(String emplId) {
		int result = aStore.deleteAllAlarm(sqlSession, emplId);
		return result;
	}

	@Override
	public int deleteAlarmByNo(String alarmNo) {
		int result = aStore.deleteAlarmByNo(sqlSession, alarmNo);
		return result;
	}


}
