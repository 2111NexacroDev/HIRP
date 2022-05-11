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
	public List<Schedule> printAllCompanySchedule() {
		List<Schedule> sList = sStore.selectAllCompanySchedule(sqlSession);
		return sList;
	}

	@Override
	public List<Schedule> printAllTeamSchedule(String loginUser) {
		List<Schedule> sList = sStore.selectAllTeamSchedule(sqlSession, loginUser);
		return sList;
	}

	@Override
	public List<Schedule> printAllPersonalSchedule(String loginUser) {
		List<Schedule> sList = sStore.selectAllSchedule(sqlSession, loginUser);
		return sList;
	}
	
	@Override
	public List<Schedule> printSearchSchedule(Search search) {
		List<Schedule> searchList = sStore.selectSearchSchedule(sqlSession, search);
		return searchList;
	}
	
	@Override
	public int registerCompanySchedule(Schedule schedule) {
		int result = sStore.insertCompanySchedule(sqlSession, schedule);
		return result;
	}
	
	@Override
	public int registerTeamSchedule(Schedule schedule) {
		int result = sStore.insertTeamSchedule(sqlSession, schedule);
		return result;
	}
	
	@Override
	public int registerScheduleToSub(Schedule schedule) {
		int result = sStore.insertScheduleToSub(sqlSession, schedule);
		return result;
	}
	
	@Override
	public int registerPersonalSchedule(Schedule schedule) {
		int result = sStore.insertPersonalSchedule(sqlSession, schedule);
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
		return result;
	}

	@Override
	public int removeCompanySchedule(int scheduleNo) {
		int result = sStore.deleteCompanySchedule(sqlSession, scheduleNo);
		return result;
	}
}
