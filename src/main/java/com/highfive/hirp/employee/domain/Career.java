package com.highfive.hirp.employee.domain;

public class Career {
	private int careerNo;
	private String emplId;
	private String careerStartDate;
	private String careerEndDate;
	private String careerPlace;
	private String careerRank;
	private String careerJobRole;
	private String careerPeriod;
	private String careerEndReason;
	private String careerEtc;
	
	public Career() {}

	public Career(int careerNo, String emplId, String careerStartDate, String careerEndDate, String careerPlace,
			String careerRank, String careerJobRole, String careerPeriod, String careerEndReason, String careerEtc) {
		super();
		this.careerNo = careerNo;
		this.emplId = emplId;
		this.careerStartDate = careerStartDate;
		this.careerEndDate = careerEndDate;
		this.careerPlace = careerPlace;
		this.careerRank = careerRank;
		this.careerJobRole = careerJobRole;
		this.careerPeriod = careerPeriod;
		this.careerEndReason = careerEndReason;
		this.careerEtc = careerEtc;
	}

	public int getCareerNo() {
		return careerNo;
	}

	public void setCareerNo(int careerNo) {
		this.careerNo = careerNo;
	}

	public String getEmplId() {
		return emplId;
	}

	public void setEmplId(String emplId) {
		this.emplId = emplId;
	}

	public String getCareerStartDate() {
		return careerStartDate;
	}

	public void setCareerStartDate(String careerStartDate) {
		this.careerStartDate = careerStartDate;
	}

	public String getCareerEndDate() {
		return careerEndDate;
	}

	public void setCareerEndDate(String careerEndDate) {
		this.careerEndDate = careerEndDate;
	}

	public String getCareerPlace() {
		return careerPlace;
	}

	public void setCareerPlace(String careerPlace) {
		this.careerPlace = careerPlace;
	}

	public String getCareerRank() {
		return careerRank;
	}

	public void setCareerRank(String careerRank) {
		this.careerRank = careerRank;
	}

	public String getCareerJobRole() {
		return careerJobRole;
	}

	public void setCareerJobRole(String careerJobRole) {
		this.careerJobRole = careerJobRole;
	}

	public String getCareerPeriod() {
		return careerPeriod;
	}

	public void setCareerPeriod(String careerPeriod) {
		this.careerPeriod = careerPeriod;
	}

	public String getCareerEndReason() {
		return careerEndReason;
	}

	public void setCareerEndReason(String careerEndReason) {
		this.careerEndReason = careerEndReason;
	}

	public String getCareerEtc() {
		return careerEtc;
	}

	public void setCareerEtc(String careerEtc) {
		this.careerEtc = careerEtc;
	}

	@Override
	public String toString() {
		return "Career [careerNo=" + careerNo + ", emplId=" + emplId + ", careerStartDate=" + careerStartDate
				+ ", careerEndDate=" + careerEndDate + ", careerPlace=" + careerPlace + ", careerRank=" + careerRank
				+ ", careerJobRole=" + careerJobRole + ", careerPeriod=" + careerPeriod + ", careerEndReason="
				+ careerEndReason + ", careerEtc=" + careerEtc + "]";
	}
}
