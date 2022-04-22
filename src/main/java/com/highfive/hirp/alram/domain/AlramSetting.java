package com.highfive.hirp.alram.domain;

public class AlramSetting {
	private String emplId;
	private String alramMail;
	private String alramNoticeboard;
	private String alramFreeboard;
	private String alramAnonymousboard;
	private String alramDeptboard;
	private String alramAllschedule;
	private String alramTeamschedule;
	private String alramPersonalschedule;
	private String alramPayarrive;
	private String alramPaycancle;
	private String alramPaycompanion;
	private String alramPaycomplete;
	private String alramSurvey;
	
	public AlramSetting() {}

	public AlramSetting(String emplId, String alramMail, String alramNoticeboard, String alramFreeboard,
			String alramAnonymousboard, String alramDeptboard, String alramAllschedule, String alramTeamschedule,
			String alramPersonalschedule, String alramPayarrive, String alramPaycancle, String alramPaycompanion,
			String alramPaycomplete, String alramSurvey) {
		super();
		this.emplId = emplId;
		this.alramMail = alramMail;
		this.alramNoticeboard = alramNoticeboard;
		this.alramFreeboard = alramFreeboard;
		this.alramAnonymousboard = alramAnonymousboard;
		this.alramDeptboard = alramDeptboard;
		this.alramAllschedule = alramAllschedule;
		this.alramTeamschedule = alramTeamschedule;
		this.alramPersonalschedule = alramPersonalschedule;
		this.alramPayarrive = alramPayarrive;
		this.alramPaycancle = alramPaycancle;
		this.alramPaycompanion = alramPaycompanion;
		this.alramPaycomplete = alramPaycomplete;
		this.alramSurvey = alramSurvey;
	}

	public String getEmplId() {
		return emplId;
	}

	public void setEmplId(String emplId) {
		this.emplId = emplId;
	}

	public String getAlramMail() {
		return alramMail;
	}

	public void setAlramMail(String alramMail) {
		this.alramMail = alramMail;
	}

	public String getAlramNoticeboard() {
		return alramNoticeboard;
	}

	public void setAlramNoticeboard(String alramNoticeboard) {
		this.alramNoticeboard = alramNoticeboard;
	}

	public String getAlramFreeboard() {
		return alramFreeboard;
	}

	public void setAlramFreeboard(String alramFreeboard) {
		this.alramFreeboard = alramFreeboard;
	}

	public String getAlramAnonymousboard() {
		return alramAnonymousboard;
	}

	public void setAlramAnonymousboard(String alramAnonymousboard) {
		this.alramAnonymousboard = alramAnonymousboard;
	}

	public String getAlramDeptboard() {
		return alramDeptboard;
	}

	public void setAlramDeptboard(String alramDeptboard) {
		this.alramDeptboard = alramDeptboard;
	}

	public String getAlramAllschedule() {
		return alramAllschedule;
	}

	public void setAlramAllschedule(String alramAllschedule) {
		this.alramAllschedule = alramAllschedule;
	}

	public String getAlramTeamschedule() {
		return alramTeamschedule;
	}

	public void setAlramTeamschedule(String alramTeamschedule) {
		this.alramTeamschedule = alramTeamschedule;
	}

	public String getAlramPersonalschedule() {
		return alramPersonalschedule;
	}

	public void setAlramPersonalschedule(String alramPersonalschedule) {
		this.alramPersonalschedule = alramPersonalschedule;
	}

	public String getAlramPayarrive() {
		return alramPayarrive;
	}

	public void setAlramPayarrive(String alramPayarrive) {
		this.alramPayarrive = alramPayarrive;
	}

	public String getAlramPaycancle() {
		return alramPaycancle;
	}

	public void setAlramPaycancle(String alramPaycancle) {
		this.alramPaycancle = alramPaycancle;
	}

	public String getAlramPaycompanion() {
		return alramPaycompanion;
	}

	public void setAlramPaycompanion(String alramPaycompanion) {
		this.alramPaycompanion = alramPaycompanion;
	}

	public String getAlramPaycomplete() {
		return alramPaycomplete;
	}

	public void setAlramPaycomplete(String alramPaycomplete) {
		this.alramPaycomplete = alramPaycomplete;
	}

	public String getAlramSurvey() {
		return alramSurvey;
	}

	public void setAlramSurvey(String alramSurvey) {
		this.alramSurvey = alramSurvey;
	}

	@Override
	public String toString() {
		return "AlramSetting [emplId=" + emplId + ", alramMail=" + alramMail + ", alramNoticeboard=" + alramNoticeboard
				+ ", alramFreeboard=" + alramFreeboard + ", alramAnonymousboard=" + alramAnonymousboard
				+ ", alramDeptboard=" + alramDeptboard + ", alramAllschedule=" + alramAllschedule
				+ ", alramTeamschedule=" + alramTeamschedule + ", alramPersonalschedule=" + alramPersonalschedule
				+ ", alramPayarrive=" + alramPayarrive + ", alramPaycancle=" + alramPaycancle + ", alramPaycompanion="
				+ alramPaycompanion + ", alramPaycomplete=" + alramPaycomplete + ", alramSurvey=" + alramSurvey + "]";
	}
	
	
}
