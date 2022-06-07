package com.highfive.hirp.common;

public class Search {

	private String searchCondition;
	private String searchValue;
	private String emplId;
	
	public Search() {}

	public Search(String searchCondition, String searchValue, String emplId) {
		super();
		this.searchCondition = searchCondition;
		this.searchValue = searchValue;
		this.emplId = emplId;
	}

	public String getSearchCondition() {
		return searchCondition;
	}

	public void setSearchCondition(String searchCondition) {
		this.searchCondition = searchCondition;
	}

	public String getSearchValue() {
		return searchValue;
	}

	public void setSearchValue(String searchValue) {
		this.searchValue = searchValue;
	}

	public String getEmplId() {
		return emplId;
	}

	public void setEmplId(String emplId) {
		this.emplId = emplId;
	}

	@Override
	public String toString() {
		return "Search [searchCondition=" + searchCondition + ", searchValue=" + searchValue + ", emplId=" + emplId
				+ "]";
	}

}
