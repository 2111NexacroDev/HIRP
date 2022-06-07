<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<%@ include file="/WEB-INF/views/approval/approvalCommonPage.jsp" %>

<h1 class="basic-border-bottom">${apprListTitle }</h1>
<div id="guide" class="subConts">
<!-- 여백 필요 없을 경우 클래스에 padding-0 추가,필요 없으면 지울 것 -->
		 <h2 class="square-tit mt-40">기본 문서 양식</h2>
		<div class="container" id="groupContainer"  style="width: 1000px; height:200px;  margin-top:20px;">
		<ul class="apprFormListUl">
		 
	        <c:forEach var="formList" items="${formList }">
	        <c:url var="adminfDetail" value="/approvalAdminForm/detail.hirp?formNo=${formList.formNo }">
	        </c:url>
	        <li><a href="${adminfDetail }">${formList.formTitle}</a></li>
	        </c:forEach>
        </ul>
        </div>
        
         <h2 class="square-tit mt-40">나의 문서 양식</h2>
		<div class="container" id="groupContainer"  style="width: 1000px; height:200px;  margin-top:20px;">
		<ul class="apprFormListUl">
		 
	        <c:forEach var="myApprForm" items="${myApprForm }">
	        <c:url var="fDetailView" value="/approvalForm/detailView.hirp?formNo=${myApprForm.formNo }">
	        </c:url>
	        <li><a href="${fDetailView }">${myApprForm.formTitle}</a></li>
	        </c:forEach>
        </ul>
        </div>
  </div>
</body>
</html>