package com.highfive.hirp.time.user.service.logic;

import java.util.List;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.highfive.hirp.common.PageInfo;
import com.highfive.hirp.group.store.GroupStore;
import com.highfive.hirp.time.user.domain.Time;
import com.highfive.hirp.time.user.domain.TimeModify;
import com.highfive.hirp.time.user.domain.Vacation;
import com.highfive.hirp.time.user.service.TimeService;
import com.highfive.hirp.time.user.store.TimeStore;

@Service
public class TimeServiceImpl implements TimeService{

	@Autowired
	private SqlSession sqlSession; // 얘때문에 (sqlSession)가능
	
	@Autowired
	private TimeStore tStore;

	// 사용자 출근 등록
	@Override
	public int timeStart(Time time) {
		int result = tStore.insertWorkStart(sqlSession, time);
		return result;
	}

	// 사용자 퇴근 등록
	@Override
	public int timeEnd(Time time) {
		int result = tStore.updateWorkEnd(sqlSession, time);
		return result;
	}

	// 사용자 출퇴근 내역 화면
	@Override
	public Time selectTime(String emplId) {
		Time selectTime = tStore.selectTime(sqlSession, emplId);
		if ( selectTime == null) {
			Time defaultTime = new Time();
			defaultTime.setTimeEnd("미퇴근");
			defaultTime.setTimeStart("미출근");
			return defaultTime;
		}
		return selectTime;
	}
	
	// 사용자 출퇴근 내역 조회
	@Override
	public List<Time> selectWorkView(String emplId) {
		List<Time> time = tStore.selectWorkView(sqlSession, emplId);
		return time;
	}

	// 사용자 연차 내역 조회
	@Override
	public List<Vacation> selectTimeView(String emplId) {
		List<Vacation> vacation = tStore.selectTimeView(sqlSession, emplId);
		return vacation;
	}

	// 사용자 근태 조정 조회
	@Override
	public List<TimeModify> selectModifyView(String emplId) {
		List<TimeModify> modify = tStore.selectModifyView(sqlSession, emplId);
		return modify;
	}

//	// 사용자 근태 조정 신청
//	@Override
//	public int updateTimeModify(TimeModify timeModify) {
//		int result = tStore.updateTimeModify(sqlSession, timeModify);
//		return result;
//	}
}