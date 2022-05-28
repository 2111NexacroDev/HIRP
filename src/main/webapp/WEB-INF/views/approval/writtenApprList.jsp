<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<%@ include file="/WEB-INF/views/approval/approvalCommonPage.jsp" %>

<h1 class="basic-border-bottom">상신문서함</h1>
<div id="guide" class="subConts">
<!-- 여백 필요 없을 경우 클래스에 padding-0 추가,필요 없으면 지울 것 -->
<table class="table--basic mt-20">
                    <thead>
                        <tr>
							<th>작성일</th>
                        	<th>결재양식</th>
							<th>제목</th>
							<th>결재상태</th>
						</tr>
                    </thead>
                    <c:forEach var="approval" items="${aList }">
                    <tbody>
                        <tr>
                        	<c:url var="aDetail" value="/appr/detail.hirp">
								<c:param name="apprNo" value="${approval.apprNo }"></c:param>
							</c:url>
								<td>${approval.writeDate }</td>
                        		<td>${approval.formNo }</td>
								<td><a href="${aDetail }">${approval.apprTitle }</a></td>
							<c:if test="${approval.apprStatus eq '대기'}">
								<td><button class="basic mt-20" type="button">대기</button></td>
							</c:if>
							<c:if test="${approval.apprStatus eq '진행'}">
								<td><button class="ongoing mt-20" type="button">진행중</button></td>
							</c:if>
							<c:if test="${approval.apprStatus eq '완료'}">
								<td><button class="finished mt-20" type="button">완료</button></td>
							</c:if>
							<c:if test="${approval.apprStatus eq '반려'}">
								<td><button class="emergency mt-20" type="button">반려</button></td>
							</c:if>
                        </tr>
                        </tbody>
                        </c:forEach>
				</table>
</body>
</html>