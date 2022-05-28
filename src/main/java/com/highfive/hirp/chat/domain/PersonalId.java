package com.highfive.hirp.chat.domain;

public class PersonalId {
	private String myId;
	private String personId;
	
	public PersonalId(String myId, String personId) {
		super();
		this.myId = myId;
		this.personId = personId;
	}
	public String getMyId() {
		return myId;
	}
	public void setMyId(String myId) {
		this.myId = myId;
	}
	public String getPersonId() {
		return personId;
	}
	public void setPersonId(String personId) {
		this.personId = personId;
	}
	
	@Override
	public String toString() {
		return "PersonalId [myId=" + myId + ", personId=" + personId + "]";
	}
}
