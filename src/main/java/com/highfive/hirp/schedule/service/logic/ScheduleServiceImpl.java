package com.highfive.hirp.schedule.service.logic;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.highfive.hirp.common.Search;
import com.highfive.hirp.schedule.domain.Schedule;
import com.highfive.hirp.schedule.service.ScheduleService;
import com.highfive.hirp.schedule.store.ScheduleStore;

@Service
public class ScheduleServiceImpl implements ScheduleService {
	@Autowired
	private SqlSession sqlSession;
	
	@Autowired
	private ScheduleStore sStore;

	@Override
	public List<Schedule> printAllSchedule() {
		List<Schedule> sList = sStore.selectAllSchedule(sqlSession);
		return sList;
	}
	
	@Override
	public List<Schedule> printSearchSchedule(Search search) {
		List<Schedule> searchList = sStore.selectSearchSchedule(sqlSession, search);
		return searchList;
	}

	@Override
	public int registerSchedule(Schedule schedule) {
		int result = sStore.insertSchedule(sqlSession, schedule);
		return result;
	}
	
	@Override
	public int registerScheduleToSub(Schedule schedule) {
		int result = sStore.insertScheduleToSub(sqlSession, schedule);
		return result;
	}

	@Override
	public int modifySchedule(Schedule schedule) {
		int result = sStore.updateSchedule(sqlSession, schedule);
		return result;
	}

	@Override
	public int removeSchedule(int scheduleNo) {
		int result = sStore.deleteSchedule(sqlSession, scheduleNo);
		return 0;
	}
}
