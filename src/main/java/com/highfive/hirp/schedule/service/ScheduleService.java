package com.highfive.hirp.schedule.service;

import java.util.List;

import com.highfive.hirp.common.Search;
import com.highfive.hirp.schedule.domain.Schedule;

public interface ScheduleService {
	public List<Schedule> printSearchSchedule(Search search);
	public List<Schedule> printAllCompanySchedule();
	public List<Schedule> printAllTeamSchedule(String loginUser);
	public List<Schedule> printAllPersonalSchedule(String loginUser);
	
	public int registerCompanySchedule(Schedule schedule);
	public int registerSchedule(Schedule schedule);
	public int registerScheduleToSub(Schedule schedule);
	
	public int modifySchedule(Schedule schedule);
	public int modifyCompanySchedule(Schedule schedule);
	
	public int removeSchedule(int scheduleNo);
	public int removeCompanySchedule(int scheduleNo);
}
