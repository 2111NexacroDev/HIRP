package com.highfive.hirp.alarm.domain;

public class AlarmSetting {
	private String emplId;
	private String alarmMail;
	private String alarmNoticeboard;
	private String alarmFreeboard;
	private String alarmAnonymousboard;
	private String alarmDeptboard;
	private String alarmAllschedule;
	private String alarmTeamschedule;
	private String alarmPersonalschedule;
	private String alarmPayarrive;
	private String alarmPaycancle;
	private String alarmPaycompanion;
	private String alarmPaycomplete;
	private String alarmSurvey;
	
	public AlarmSetting() {}

	public AlarmSetting(String emplId, String alarmMail, String alarmNoticeboard, String alarmFreeboard,
			String alarmAnonymousboard, String alarmDeptboard, String alarmAllschedule, String alarmTeamschedule,
			String alarmPersonalschedule, String alarmPayarrive, String alarmPaycancle, String alarmPaycompanion,
			String alarmPaycomplete, String alarmSurvey) {
		super();
		this.emplId = emplId;
		this.alarmMail = alarmMail;
		this.alarmNoticeboard = alarmNoticeboard;
		this.alarmFreeboard = alarmFreeboard;
		this.alarmAnonymousboard = alarmAnonymousboard;
		this.alarmDeptboard = alarmDeptboard;
		this.alarmAllschedule = alarmAllschedule;
		this.alarmTeamschedule = alarmTeamschedule;
		this.alarmPersonalschedule = alarmPersonalschedule;
		this.alarmPayarrive = alarmPayarrive;
		this.alarmPaycancle = alarmPaycancle;
		this.alarmPaycompanion = alarmPaycompanion;
		this.alarmPaycomplete = alarmPaycomplete;
		this.alarmSurvey = alarmSurvey;
	}

	public String getEmplId() {
		return emplId;
	}

	public void setEmplId(String emplId) {
		this.emplId = emplId;
	}

	public String getalarmMail() {
		return alarmMail;
	}

	public void setalarmMail(String alarmMail) {
		this.alarmMail = alarmMail;
	}

	public String getalarmNoticeboard() {
		return alarmNoticeboard;
	}

	public void setalarmNoticeboard(String alarmNoticeboard) {
		this.alarmNoticeboard = alarmNoticeboard;
	}

	public String getalarmFreeboard() {
		return alarmFreeboard;
	}

	public void setalarmFreeboard(String alarmFreeboard) {
		this.alarmFreeboard = alarmFreeboard;
	}

	public String getalarmAnonymousboard() {
		return alarmAnonymousboard;
	}

	public void setalarmAnonymousboard(String alarmAnonymousboard) {
		this.alarmAnonymousboard = alarmAnonymousboard;
	}

	public String getalarmDeptboard() {
		return alarmDeptboard;
	}

	public void setalarmDeptboard(String alarmDeptboard) {
		this.alarmDeptboard = alarmDeptboard;
	}

	public String getalarmAllschedule() {
		return alarmAllschedule;
	}

	public void setalarmAllschedule(String alarmAllschedule) {
		this.alarmAllschedule = alarmAllschedule;
	}

	public String getalarmTeamschedule() {
		return alarmTeamschedule;
	}

	public void setalarmTeamschedule(String alarmTeamschedule) {
		this.alarmTeamschedule = alarmTeamschedule;
	}

	public String getalarmPersonalschedule() {
		return alarmPersonalschedule;
	}

	public void setalarmPersonalschedule(String alarmPersonalschedule) {
		this.alarmPersonalschedule = alarmPersonalschedule;
	}

	public String getalarmPayarrive() {
		return alarmPayarrive;
	}

	public void setalarmPayarrive(String alarmPayarrive) {
		this.alarmPayarrive = alarmPayarrive;
	}

	public String getalarmPaycancle() {
		return alarmPaycancle;
	}

	public void setalarmPaycancle(String alarmPaycancle) {
		this.alarmPaycancle = alarmPaycancle;
	}

	public String getalarmPaycompanion() {
		return alarmPaycompanion;
	}

	public void setalarmPaycompanion(String alarmPaycompanion) {
		this.alarmPaycompanion = alarmPaycompanion;
	}

	public String getalarmPaycomplete() {
		return alarmPaycomplete;
	}

	public void setalarmPaycomplete(String alarmPaycomplete) {
		this.alarmPaycomplete = alarmPaycomplete;
	}

	public String getalarmSurvey() {
		return alarmSurvey;
	}

	public void setalarmSurvey(String alarmSurvey) {
		this.alarmSurvey = alarmSurvey;
	}

	@Override
	public String toString() {
		return "alarmSetting [emplId=" + emplId + ", alarmMail=" + alarmMail + ", alarmNoticeboard=" + alarmNoticeboard
				+ ", alarmFreeboard=" + alarmFreeboard + ", alarmAnonymousboard=" + alarmAnonymousboard
				+ ", alarmDeptboard=" + alarmDeptboard + ", alarmAllschedule=" + alarmAllschedule
				+ ", alarmTeamschedule=" + alarmTeamschedule + ", alarmPersonalschedule=" + alarmPersonalschedule
				+ ", alarmPayarrive=" + alarmPayarrive + ", alarmPaycancle=" + alarmPaycancle + ", alarmPaycompanion="
				+ alarmPaycompanion + ", alarmPaycomplete=" + alarmPaycomplete + ", alarmSurvey=" + alarmSurvey + "]";
	}
	
	
}
