package com.highfive.hirp.favority.domain;

public class Favority {
	private int favorityNo;
	private String pageName;
	private String pageUrl;
	private String emplId;
	
	public Favority () {}

	public Favority(int favorityNo, String pageName, String pageUrl, String emplId) {
		super();
		this.favorityNo = favorityNo;
		this.pageName = pageName;
		this.pageUrl = pageUrl;
		this.emplId = emplId;
	}

	public int getFavorityNo() {
		return favorityNo;
	}

	public void setFavorityNo(int favorityNo) {
		this.favorityNo = favorityNo;
	}

	public String getPageName() {
		return pageName;
	}

	public void setPageName(String pageName) {
		this.pageName = pageName;
	}

	public String getPageUrl() {
		return pageUrl;
	}

	public void setPageUrl(String pageUrl) {
		this.pageUrl = pageUrl;
	}

	public String getEmplId() {
		return emplId;
	}

	public void setEmplId(String emplId) {
		this.emplId = emplId;
	}

	@Override
	public String toString() {
		return "Favority [favorityNo=" + favorityNo + ", pageName=" + pageName + ", pageUrl=" + pageUrl + ", emplId="
				+ emplId + "]";
	}
	
}
