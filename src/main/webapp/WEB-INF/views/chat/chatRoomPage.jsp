<%@page import="java.util.Date"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>채팅</title>
</head>
<body>
	<%@ include file="/WEB-INF/views/chat/chatHeader.jsp" %>
	<div id="conts">
        <article id="sub" class="">
        	
        	<h1 class="chat-h1 basic-border-bottom">채팅</h1>

            <div id="" class="subConts">
            	<!-- 오늘 날짜 -->
	            <jsp:useBean id="now" class="java.util.Date" />
<%-- 	            <fmt:formatDate value="${now}" pattern="yyyy-MM-dd HH:mm:ss" var="today" /> --%>
				<fmt:formatDate value="${now}" pattern="yyyy-MM-dd" var="today" />
				<!-- 어제 날짜 -->
				<c:set var="yesterday" value="<%=new Date(new Date().getTime() - 60*60*24*1000*1)%>"/>
				<fmt:formatDate value="${yesterday}" pattern="yyyy-MM-dd" var="yesterday"/>
				
			    <!-- 검색창 -->
			    <div class="row mt-20 t-c basic-border-bottom padding-bottom">
				    <input type="text" name="emplSearchKeyword" style="width:70%" placeholder="채팅방 이름 검색">
					<button class="point" type="button" onclick="">검색</button>
			    </div>
			    <!-- 직원 목록 -->
			    <c:set var="count" value="0" />
			    <div id="chatList">
			    	
			    	<c:forEach items="${chatroomList }" var="chat">
				     	<c:set var="count" value="${count+1}" />
					    <!-- 직원명 div  -->
					    <!-- 여기 count로 해놨는데 사실은 roomid로 해야할 듯. -->
					    <div class="chat-row mt-10 basic-border-bottom padding-bottom-10" onclick="">
					    	<!-- 사진 추가할 거면 추가하기 -->
<!-- 						    <div class="mr-20 ml-20" style="width:30px;"> -->
<!-- 				      		    <button class="btn--profile" type="button"> -->
<%-- 				      		    	<img src="../resources/uploadFiles/${empl.emplProfile }" alt="profile"> --%>
<%-- 				      		    	<c:if test="${empl.emplProfile eq null}"> --%>
<!-- 								        <img src="../resources/images/img_no_profile.png" alt="profile"> -->
<%-- 				      		    	</c:if> --%>
<%-- 				      		    	<c:if test="${empl.emplProfile ne null}"> --%>
<%-- 								        <img src="../resources/uploadFiles/${empl.emplProfile }" alt="profile"> --%>
<%-- 				      		    	</c:if> --%>
<!-- 							    </button> -->
<!-- 						    </div> -->
						    <div class="ml-20 pos-rel" style="width:100%;">
						    	<h4 class="mb-20 inline-block">${chat.chatroomName}</h4>
						    	<div class="chatting-time">
						    		<!-- 날짜별로 시간 다르게 나오게 하기 -->
							    	<c:if test="${fn:substring(chat.message.msgSenddate, 0, 10) eq today}">
							    		<c:if test="${fn:substring(chat.message.msgSenddate, 11, 13) < 12}">
									    	오전 ${fn:substring(chat.message.msgSenddate, 11, 13)}:${fn:substring(chat.message.msgSenddate, 14, 16)}
							    		</c:if>
							    		<c:if test="${fn:substring(chat.message.msgSenddate, 11, 13) >= 12}">
									    	오후 ${fn:substring(chat.message.msgSenddate, 11, 13) - 12}:${fn:substring(chat.message.msgSenddate, 14, 16)}
							    		</c:if>
							    	</c:if>
							    	<c:if test="${fn:substring(chat.message.msgSenddate, 0, 10) ne today}">
								    	<c:if test="${fn:substring(chat.message.msgSenddate, 0, 10) eq yesterday}">
								    		어제
							    		</c:if>
							    		<c:if test="${fn:substring(chat.message.msgSenddate, 0, 10) ne yesterday}">
								    		${fn:substring(chat.message.msgSenddate, 0, 10)}
							    		</c:if>
							    	</c:if>
							    </div>
						    	<div class="" style="text-overflow:ellipsis; overflow:hidden; width:90%">
						    		<nobr>
						    			${chat.message.msgContents}
						    		</nobr>
						    	</div>
						    </div>
		            	</div>
		            	<!-- 직원명 div 끝 -->
			    	</c:forEach>
			    
			    </div>
        	</div> 
        </article>
    </div>
</body>
</html>