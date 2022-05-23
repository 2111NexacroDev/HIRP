<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
<%@ include file="/WEB-INF/views/approval/approvalCommonPage.jsp" %>
<h1 class="basic-border-bottom">결재문서함</h1>
<div id="guide" class="subConts">
<!-- 여백 필요 없을 경우 클래스에 padding-0 추가,필요 없으면 지울 것 -->
<table class="table--basic mt-20">
                    <thead>
                        <tr>
                        	<th>결재양식</th>
							<th>제목</th>
							<th>작성자</th>
							<th>작성일</th>
						</tr>
                    </thead>
                    <c:forEach var="approval" items="${aList }">
                    <tbody>
                        <tr>
                        	<c:url var="aDetail" value="/appr/detail.hirp">
								<c:param name="apprNo" value="${approval.apprNo }"></c:param>
							</c:url>
                        	<td>${approval.formNo }</td>
							<td><a href="${aDetail }">${approval.apprTitle }</a></td>
							<td>${approval.emplId }</td>
							<td>${approval.writeDate }</td>
                        </tr>
                        </tbody>
                        </c:forEach>
				</table>
</body>
</html>