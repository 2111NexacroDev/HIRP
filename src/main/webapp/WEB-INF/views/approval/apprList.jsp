<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<%@ include file="/WEB-INF/views/approval/approvalCommonPage.jsp" %>

<h1 class="basic-border-bottom">${apprListTitle }</h1>
<div id="guide" class="subConts">
<!-- 여백 필요 없을 경우 클래스에 padding-0 추가,필요 없으면 지울 것 -->

	

<table class="table--basic mt-20">
                    <thead>
                        <tr>
							<th>작성일</th>
                        	<th>결재양식</th>
							<th>제목</th>
							<c:if test="${apprListTitle eq'결재문서함'}">
							<th>기안자</th>
							</c:if>
							<c:if test="${apprListTitle ne'결재문서함'}">
							<th>결재상태</th>
							</c:if>
						</tr>
                    </thead>
                    <tbody>
                    <c:if test="${empty aList }">
                    <tr>
                    	<td colspan="4" class="t-c"> 문서함이 비어있습니다. </td>
                    </tr>
                    </c:if>
                    <c:if test="${not empty aList }">
                    <c:forEach var="approval" items="${aList }">
                        <tr>
                        	<c:url var="aDetail" value="/appr/detail.hirp">
								<c:param name="apprNo" value="${approval.apprNo }"></c:param>
							</c:url>
							
							<c:url var="proceedAppr" value="/proceed/appr.hirp">
								<c:param name="apprNo" value="${approval.apprNo }"></c:param>
							</c:url>
							
							<c:url var="tempDetail" value="/tempAppr/detail.hirp">
								<c:param name="apprNo" value="${approval.apprNo }"></c:param>
							</c:url>
							
								<td>${approval.writeDate }</td>
                        		<td>${approval.formNo }</td>
							<c:if test="${apprListTitle eq '임시저장함' }">
								<td><a href="${tempDetail }">${approval.apprTitle }</a></td>
							</c:if>
							<c:if test="${apprListTitle eq '결재문서함'}">
								<td><a href="${proceedAppr}">${approval.apprTitle }</a></td>
							</c:if>
							<c:if test="${apprListTitle ne '결재문서함' && apprListTitle ne '임시저장함' }">
								<td><a href="${aDetail }">${approval.apprTitle }</a></td>
							</c:if>
							<c:if test="${apprListTitle eq'결재문서함'}">
								<td>${approval.emplId }</td>
							</c:if>
							<c:if test="${apprListTitle eq'임시저장함'}">
								<td><button class="basic mt-20" type="button">임시저장</button></td>
							</c:if>
							<c:if test="${apprListTitle ne'결재문서함' && apprListTitle ne'임시저장함'}">
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
							
							</c:if>
                        </tr>
                        </tbody>
                        </c:forEach>
                    </c:if>    
				</table>

</body>
</html>