<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>채팅 정보</title>
<%@ include file="/WEB-INF/views/include/inc_head.jsp" %>
<link rel="stylesheet" href="../../../resources/css/chat.css">
</head>
<body>
	<div id="conts" class="pos-rel">
        <article id="sub" class="padding-20" style="padding-bottom:10px;">
        	<div class="t-c">
        		<h2 class="mb-10 padding-top">${chatroom.chatroomName }</h2>
        		<h3 style="font-weight:normal; color: #8C8C8C">${fn:length(chatRoomJoinList)}명</h3>
        	</div>
        	<!-- 버튼 div -->
        	<div class="t-c mt-20 mb-20 basic-border-bottom" style="padding-bottom:30px;">
	        	<div class="t-c" style="display:inline-block">
	        		<button class="btn--profile" type="button">
	      		    	<i class="fa-solid fa-pen"></i>
				    </button>
				    <div>
				    	편집
				    </div>
			    </div>
			    <div class="t-c ml-20" style="display:inline-block">
	        		<button class="btn--profile" type="button">
	      		    	<i class="fa-solid fa-plus"></i>
				    </button>
				    <div>
				    	직원초대
				    </div>
			    </div>
			    <div class="t-c ml-20" style="display:inline-block">
	        		<button class="btn--profile" type="button">
	      		    	<i class="fa-solid fa-arrow-right-from-bracket"></i>
				    </button>
				    <div>
				    	나가기
				    </div>
			    </div>
        	</div>
        	<!-- 참가자 리스트 -->
        	<div class=" padding-left padding-right" style="overflow:scroll; margin: auto; height:300px">
        		<c:forEach items="${chatRoomJoinList }" var="chatJoin">
<%-- 			    	<c:if test="${empl.emplId ne sessionScope.emplId }"> <!-- 내가 아닐 때 --> --%>
					    <!-- 직원명 div  -->
					    <!-- 여기 count로 해놨는데 사실은 roomid로 해야할 듯. -->
					    <div class="chat-row mt-10  padding-bottom-10">
						    <div class="mr-20" style="width:30px;">
				      		    <button class="btn--profile" type="button">
				      		    	<c:if test="${chatJoin.emplProfile eq null}">
								        <img src="../resources/images/img_no_profile.png" alt="profile">
				      		    	</c:if>
				      		    	<c:if test="${chatJoin.emplProfile ne null}">
								        <img src="../resources/uploadFiles/${chatJoin.emplProfile }" alt="profile">
				      		    	</c:if>
							    </button>
						    </div>
						    <div class="ml-20">
						    	${chatJoin.deptName } ${chatJoin.emplName } ${chatJoin.positionName }
						    </div>
		            	</div>
		            	<!-- 직원명 div 끝 -->
<%-- 	            	</c:if> --%>
            	</c:forEach>
        	</div>
        </article>
    </div>
</body>
</html>