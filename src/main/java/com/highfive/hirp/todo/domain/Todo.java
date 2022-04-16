package com.highfive.hirp.todo.domain;

import java.sql.Date;

public class Todo {
	private int todoNo;
	private String emplId;
	private Date todoDate;
	private String todoConts;
	private String isFinished;

	public Todo() {
	}

	public Todo(int todoNo, String emplId, Date todoDate, String todoConts, String isFinished) {
		super();
		this.todoNo = todoNo;
		this.emplId = emplId;
		this.todoDate = todoDate;
		this.todoConts = todoConts;
		this.isFinished = isFinished;
	}

	public int getTodoNo() {
		return todoNo;
	}

	public void setTodoNo(int todoNo) {
		this.todoNo = todoNo;
	}

	public String getEmplId() {
		return emplId;
	}

	public void setEmplId(String emplId) {
		this.emplId = emplId;
	}

	public Date getTodoDate() {
		return todoDate;
	}

	public void setTodoDate(Date todoDate) {
		this.todoDate = todoDate;
	}

	public String getTodoConts() {
		return todoConts;
	}

	public void setTodoConts(String todoConts) {
		this.todoConts = todoConts;
	}

	public String getIsFinished() {
		return isFinished;
	}

	public void setIsFinished(String isFinished) {
		this.isFinished = isFinished;
	}

	@Override
	public String toString() {
		return "Todo [todoNo=" + todoNo + ", emplId=" + emplId + ", todoDate=" + todoDate + ", todoConts=" + todoConts
				+ ", isFinished=" + isFinished + "]";
	}
}
