package com.highfive.hirp.employee.domain;

import java.sql.Date;

public class Employee { // db와 같게 소문자로 만들어줘야함
	private String emplId;
	private String deptCode;
	private String positionCode;
	private String emplPw;
	private String emplName;
	private Date startDate;
	private String email;
	private String directNo;
	private String phoneNo;
	private String recruitCategory;
	private String salaryCategory;
	private String referrer;
	private String isStatus;
	private String birthday;
	private String gender;
	private String isMarriage;
	private String isDisability;
	private String isVeterans;
	private Date endDate;
	private String endReason;
	private String emplProfile;
	private Certification certification;
	private JobRole jobRole;
	private Language language;
	private Military military;
	private Career career;
	//회원 정보 이름으로 가져오기
	private String deptName;
	private String positionName;

	public Employee() {}

	public Employee(String emplId, String deptCode, String positionCode, String emplPw, String emplName, Date startDate,
			String email, String directNo, String phoneNo, String recruitCategory, String salaryCategory,
			String referrer, String isStatus, String birthday, String gender, String isMarriage, String isDisability,
			String isVeterans, Date endDate, String endReason, String emplProfile, Certification certification,
			JobRole jobRole, Language language, Military military) {
		super();
		this.emplId = emplId;
		this.deptCode = deptCode;
		this.positionCode = positionCode;
		this.emplPw = emplPw;
		this.emplName = emplName;
		this.startDate = startDate;
		this.email = email;
		this.directNo = directNo;
		this.phoneNo = phoneNo;
		this.recruitCategory = recruitCategory;
		this.salaryCategory = salaryCategory;
		this.referrer = referrer;
		this.isStatus = isStatus;
		this.birthday = birthday;
		this.gender = gender;
		this.isMarriage = isMarriage;
		this.isDisability = isDisability;
		this.isVeterans = isVeterans;
		this.endDate = endDate;
		this.endReason = endReason;
		this.emplProfile = emplProfile;
		this.certification = certification;
		this.jobRole = jobRole;
		this.language = language;
		this.military = military;
	}

	public String getEmplId() {
		return emplId;
	}

	public void setEmplId(String emplId) {
		this.emplId = emplId;
	}

	public String getDeptCode() {
		return deptCode;
	}

	public void setDeptCode(String deptCode) {
		this.deptCode = deptCode;
	}

	public String getPositionCode() {
		return positionCode;
	}

	public void setPositionCode(String positionCode) {
		this.positionCode = positionCode;
	}

	public String getEmplPw() {
		return emplPw;
	}

	public void setEmplPw(String emplPw) {
		this.emplPw = emplPw;
	}

	public String getEmplName() {
		return emplName;
	}

	public void setEmplName(String emplName) {
		this.emplName = emplName;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getDirectNo() {
		return directNo;
	}

	public void setDirectNo(String directNo) {
		this.directNo = directNo;
	}

	public String getPhoneNo() {
		return phoneNo;
	}

	public void setPhoneNo(String phoneNo) {
		this.phoneNo = phoneNo;
	}

	public String getRecruitCategory() {
		return recruitCategory;
	}

	public void setRecruitCategory(String recruitCategory) {
		this.recruitCategory = recruitCategory;
	}

	public String getSalaryCategory() {
		return salaryCategory;
	}

	public void setSalaryCategory(String salaryCategory) {
		this.salaryCategory = salaryCategory;
	}

	public String getReferrer() {
		return referrer;
	}

	public void setReferrer(String referrer) {
		this.referrer = referrer;
	}

	public String getIsStatus() {
		return isStatus;
	}

	public void setIsStatus(String isStatus) {
		this.isStatus = isStatus;
	}

	public String getBirthday() {
		return birthday;
	}

	public void setBirthday(String birthday) {
		this.birthday = birthday;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getIsMarriage() {
		return isMarriage;
	}

	public void setIsMarriage(String isMarriage) {
		this.isMarriage = isMarriage;
	}

	public String getIsDisability() {
		return isDisability;
	}

	public void setIsDisability(String isDisability) {
		this.isDisability = isDisability;
	}

	public String getIsVeterans() {
		return isVeterans;
	}

	public void setIsVeterans(String isVeterans) {
		this.isVeterans = isVeterans;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	public String getEndReason() {
		return endReason;
	}

	public void setEndReason(String endReason) {
		this.endReason = endReason;
	}

	public String getEmplProfile() {
		return emplProfile;
	}

	public void setEmplProfile(String emplProfile) {
		this.emplProfile = emplProfile;
	}

	public Certification getCertification() {
		return certification;
	}

	public void setCertification(Certification certification) {
		this.certification = certification;
	}

	public JobRole getJobRole() {
		return jobRole;
	}

	public void setJobRole(JobRole jobRole) {
		this.jobRole = jobRole;
	}

	public Language getLanguage() {
		return language;
	}

	public void setLanguage(Language language) {
		this.language = language;
	}

	public Military getMilitary() {
		return military;
	}

	public void setMilitary(Military military) {
		this.military = military;
	}

	public String getDeptName() {
		return deptName;
	}

	public void setDeptName(String deptName) {
		this.deptName = deptName;
	}

	public String getPositionName() {
		return positionName;
	}

	public void setPositionName(String positionName) {
		this.positionName = positionName;
	}

	@Override
	public String toString() {
		return "Employee [emplId=" + emplId + ", deptCode=" + deptCode + ", positionCode=" + positionCode + ", emplPw="
				+ emplPw + ", emplName=" + emplName + ", startDate=" + startDate + ", email=" + email + ", directNo="
				+ directNo + ", phoneNo=" + phoneNo + ", recruitCategory=" + recruitCategory + ", salaryCategory="
				+ salaryCategory + ", referrer=" + referrer + ", isStatus=" + isStatus + ", birthday=" + birthday
				+ ", gender=" + gender + ", isMarriage=" + isMarriage + ", isDisability=" + isDisability
				+ ", isVeterans=" + isVeterans + ", endDate=" + endDate + ", endReason=" + endReason + ", emplProfile="
				+ emplProfile + ", certification=" + certification + ", jobRole=" + jobRole + ", language=" + language
				+ ", military=" + military + "]";
	}
}