package com.highfive.hirp.dept.domain;

import java.sql.Date;

public class Dept {
	private String deptCode;
	private String deptName;
	private String deptSecondname;
	private String deptColor;
	private String deptMaster;
	private String deptHiredate;
	private String deptUppercode;
	private int deptLevel;
	
	public Dept() {}

	public Dept(String deptCode, String deptName, String deptSecondname, String deptColor, String deptMaster,
			String deptHiredate, String deptUppercode, int deptLevel) {
		super();
		this.deptCode = deptCode;
		this.deptName = deptName;
		this.deptSecondname = deptSecondname;
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

	public String getDeptSecondname() {
		return deptSecondname;
	}

	public void setDeptSecondname(String deptSecondname) {
		this.deptSecondname = deptSecondname;
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

	public String getDeptHiredate() {
		return deptHiredate;
	}

	public void setDeptHiredate(String deptHiredate) {
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
		return "Dept [deptCode=" + deptCode + ", deptName=" + deptName + ", deptSecondname=" + deptSecondname
				+ ", deptColor=" + deptColor + ", deptMaster=" + deptMaster + ", deptHiredate=" + deptHiredate
				+ ", deptUppercode=" + deptUppercode + ", deptLevel=" + deptLevel + "]";
	}
	
	
}
