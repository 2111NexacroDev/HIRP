<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<style>
.approvalLine-btn{
float : right;
background-color : white;
border : solid 1px lightgray;
border-radius: 10px;
margin-top : 10px;
margin-left : 10px;
width : 100px;
height : 35px;
}
</style>
</head>
<body>
<%@ include file="/WEB-INF/views/approval/approvalCommonPage.jsp" %>
            <h1 class="basic-border-bottom">전자결재 홈</h1>

            <div id="guide" class="subConts">
                <!-- 여백 필요 없을 경우 클래스에 padding-0 추가, 
            	필요 없으면 지울 것 -->

			<div class="row">
               <c:forEach var="aList" items="${aList}" >
                 <!-- 박스 시작 -->
                <div class="col-3 basic-border bor-round padding-0 mr-20 mb-20">
		            		<div class="padding-20">
			            		<!-- 버튼은 둘 중 하나만 출력 -->
								<button class="emergency" type="button" style="cursor:default;">대기</button>
								<h2 class="mt-10">${aList.apprTitle}</h2>
								
								<div class="row mt-10">
			                        <div class="col-4">
										<p class="color-grey">결재양식</p>
			                        </div>
			                        <div class="">
			                            <p class="">${aList.formNo}</p>
			                        </div>
			                    </div>
								
								<div class="row mt-10">
			                        <div class="col-4">
										<p class="color-grey">기안자</p>
			                        </div>
			                        <div class="">
			                            <p class="">${aList.emplId}</p>
			                        </div>
			                    </div>
			                    <div class="row mt-10">
			                        <div class="col-4">
										<p class="color-grey">기안일</p>
			                        </div>
			                        <div class="">
			                            <p class="">${aList.writeDate}</p>
			                        </div>
			                       
			                    </div>
		            		</div>
		                	
		                	<div class="t-c padding-0 basic-border-top" onclick="location.href='#'">
		                		<button class="noneBackground padding-20" style="width:95%" onclick="location.href='/appr/detail.hirp?apprNo=${aList.apprNo}'">결재하기</button>
		                	</div>
		                </div>
		                <!-- 박스 끝 -->
               		</c:forEach>
            </div>
               
               

                <h2 class="square-tit mt-40">결재 진행중인 문서</h2>
                <table class="table--basic mt-20">
                    <colgroup>
                        <col style="width:20%;">
                        <col style="width:15%;">
                        <col style="width:55%;">
                        <col style="width:10%;">
                    </colgroup>
                    <thead>
                         <tr>
							<th>기안일</th>
							<th>결재양식</th>
							<th>제목</th>
							<th>결재상태</th>
						</tr>
                    </thead>
                    <tbody>
                    <c:if test="${empty ingList }">
                    <tr>
                    	<td colspan="4" class="t-c"> 진행중인 문서가 없습니다. </td>
                    </tr>
                    </c:if>
                    <c:if test="${not empty ingList }">
                    <c:forEach var="ingList" items="${ingList}" >
                    		<tr>
                    		<c:url var="proceedAppr" value="/proceed/appr.hirp">
								<c:param name="apprNo" value="${ingList.apprNo }"></c:param>
							</c:url>
							<td>${ingList.writeDate }</td>
                        	<td>${ingList.formNo }</td>
                        	<td><a href="${proceedAppr}">${ingList.apprTitle }</a></td>
                        	<td><button class="ongoing mt-20" type="button">진행중</button></td>
                    	</tr>
                    </c:forEach>
                    </c:if>
                    </tbody>
                </table>

				<h2 class="square-tit mt-40">결재 완료 문서</h2>
               <table class="table--basic mt-20">
                    <colgroup>
                        <col style="width:20%;">
                        <col style="width:15%;">
                        <col style="width:55%;">
                        <col style="width:10%;">
                    </colgroup>
                    <thead>
                         <tr>
							<th>기안일</th>
							<th>결재양식</th>
							<th>제목</th>
							<th>결재상태</th>
						</tr>
                    </thead>
                    <tbody>
                    <c:if test="${empty cList }">
                    <tr>
                    	<td colspan="4" class="t-c"> 완료된 문서가 없습니다. </td>
                    </tr>
                    </c:if>
                    <c:if test="${not empty cList }">
                    <c:forEach var="cList" items="${cList}" >
                    		<tr>
                    		<c:url var="aDetail" value="/appr/detail.hirp">
								<c:param name="apprNo" value="${cList.apprNo }"></c:param>
							</c:url>
							<td>${cList.writeDate }</td>
                        	<td>${cList.formNo }</td>
                        	<td><a href="${aDetail}">${cList.apprTitle }</a></td>
                        	<td><button class="finished mt-20" type="button">완료</button></td>
                    	</tr>
                    </c:forEach>
                    </c:if>
                    </tbody>
                </table>
               
              
        </article>
    </div>

</body>

</html>