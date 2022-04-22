package com.highfive.hirp.dept.domain;

import java.sql.Date;

public class Dept {
	private String deptCode;
	private String deptName;
	private String deptColor;
	private String deptMaster;
	private Date deptHiredate;
	private String deptUppercode;
	private int deptLevel;
	
	public Dept() {}
	public Dept(String deptCode, String deptName, String deptColor, String deptMaster, Date deptHiredate,
			String deptUppercode, int deptLevel) {
		super();
		this.deptCode = deptCode;
		this.deptName = deptName;
		this.deptColor = deptColor;
		this.deptMaster = deptMaster;
		this.deptHiredate = deptHiredate;
		this.deptUppercode = deptUppercode;
		this.deptLevel = deptLevel;
	}
	public String getDeptCode() {
		return deptCode;
	}
	public void setDeptCode(String deptCode) {
		this.deptCode = deptCode;
	}
	public String getDeptName() {
		return deptName;
	}
	public void setDeptName(String deptName) {
		this.deptName = deptName;
	}
	public String getDeptColor() {
		return deptColor;
	}
	public void setDeptColor(String deptColor) {
		this.deptColor = deptColor;
	}
	public String getDeptMaster() {
		return deptMaster;
	}
	public void setDeptMaster(String deptMaster) {
		this.deptMaster = deptMaster;
	}
	public Date getDeptHiredate() {
		return deptHiredate;
	}
	public void setDeptHiredate(Date deptHiredate) {
		this.deptHiredate = deptHiredate;
	}
	public String getDeptUppercode() {
		return deptUppercode;
	}
	public void setDeptUppercode(String deptUppercode) {
		this.deptUppercode = deptUppercode;
	}
	public int getDeptLevel() {
		return deptLevel;
	}
	public void setDeptLevel(int deptLevel) {
		this.deptLevel = deptLevel;
	}
	@Override
	public String toString() {
		return "Dept [deptCode=" + deptCode + ", deptName=" + deptName + ", deptColor=" + deptColor + ", deptMaster="
				+ deptMaster + ", deptHiredate=" + deptHiredate + ", deptUppercode=" + deptUppercode + ", deptLevel="
				+ deptLevel + "]";
	}
	
	
}
