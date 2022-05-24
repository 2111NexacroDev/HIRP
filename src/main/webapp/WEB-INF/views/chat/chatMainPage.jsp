<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<!-- <link rel="stylesheet" href="../../../resources/css/common.css"> -->
<!-- <link rel="stylesheet" href="../../../resources/css/chat.css"> -->
<meta charset="UTF-8">
<title>채팅</title>
</head>
<body>
	<%@ include file="/WEB-INF/views/chat/chatHeader.jsp" %>
	<div id="conts">
        <article id="sub" class="">
        	
        	<h1 class="chat-h1 basic-border-bottom">직원</h1>

            <div id="" class="subConts">
            	<!-- 내정보 -->
            	<div class="chat-row mt-10 basic-border-bottom padding-bottom">
				    <div class="mr-20 ml-20" style="width:30px;">
		      		    <button class="btn--profile" s type="button">
					        <img src="../resources/images/profile.jpg" alt="profile">
					        <!-- 유저마다 다른 사진 출력돼야함 -->
					    </button>
				    </div>
				    <div class="ml-20">
				    	개발융합팀 이민선 대리
				    </div>
            	</div>
			    <!-- 검색창 -->
			    <div class="row mt-20 t-c  padding-bottom-10">
				    <input type="text" name="emplSearchKeyword" size="25" placeholder="부서명 또는 사원명 검색">
					<button class="point" type="button" onclick="emplSearch();">검색</button>
			    </div>
			    <!-- 직원 목록 -->
			    <c:set var="count" value="0" />
			    <c:forEach items="${emplList }" var="empl">
			     	<c:set var="count" value="${count+1}" />
				    <!-- 직원명 div  -->
				    <!-- 여기 count로 해놨는데 사실은 roomid로 해야할 듯. -->
				    <div class="chat-row mt-10  padding-bottom-10" onclick="window.open('/chat.hirp','chattingRoom${count}','width=400,height=600,location=no,status=no,scrollbars=no');">
					    <div class="mr-20 ml-20" style="width:30px;">
			      		    <button class="btn--profile" type="button">
			      		    	<c:if test="${empl.emplProfile eq null}">
							        <img src="../resources/images/img_no_profile.png" alt="profile">
			      		    	</c:if>
			      		    	<c:if test="${empl.emplProfile ne null}">
							        <img src="../resources/uploadFiles/${empl.emplProfile }" alt="profile">
			      		    	</c:if>
						    </button>
					    </div>
					    <div class="ml-20">
					    	${empl.deptName } ${empl.emplName } ${empl.positionName }
					    </div>
	            	</div>
	            	<!-- 직원명 div 끝 -->
            	</c:forEach>
        	</div>
        </article>
    </div>
</body>
</html>