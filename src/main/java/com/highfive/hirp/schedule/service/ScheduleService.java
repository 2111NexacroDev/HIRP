package com.highfive.hirp.schedule.service;

import java.util.List;

import com.highfive.hirp.common.Search;
import com.highfive.hirp.schedule.domain.Schedule;

public interface ScheduleService {
	public List<Schedule> printAllSchedule();
	public List<Schedule> printSearchSchedule(Search search);
	public int registerSchedule(Schedule schedule);
	public int registerScheduleToSub(Schedule schedule);
	public int modifySchedule(Schedule schedule);
	public int removeSchedule(int scheduleNo);
}
