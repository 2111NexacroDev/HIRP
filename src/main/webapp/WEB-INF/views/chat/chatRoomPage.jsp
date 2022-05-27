<%@page import="java.util.Date"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>	<!-- jstl core -->
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %> <!-- jstl 함수 -->
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %> <!-- jstl fmt -->

<!DOCTYPE html>
<html>
<body>
	<%@ include file="/WEB-INF/views/chat/chatHeader.jsp" %>
	<div id="conts">
        <article id="sub" class="">
        	
        	<h1 class="chat-h1 basic-border-bottom mt-20">채팅</h1>

            <div id="" class="subConts">
            	<input type="hidden" value="${chatroomNo }"> <!-- 채팅방 추가 후에 chatroomNo 넘어오는지 확인 -->
            	<!-- 오늘 날짜 -->
	            <jsp:useBean id="now" class="java.util.Date" />
<%-- 	            <fmt:formatDate value="${now}" pattern="yyyy-MM-dd HH:mm:ss" var="today" /> --%>
				<fmt:formatDate value="${now}" pattern="yyyy-MM-dd" var="today" />
				<!-- 어제 날짜 -->
				<c:set var="yesterday" value="<%=new Date(new Date().getTime() - 60*60*24*1000*1)%>"/>
				<fmt:formatDate value="${yesterday}" pattern="yyyy-MM-dd" var="yesterday"/>
				
			    <!-- 검색창 -->
			    <div class="row mt-20 t-c padding-bottom">
				    <input type="text" name="chatroomSearchKeyword" style="width:70%" placeholder="채팅방 또는 참여자 이름 검색">
					<button class="point" type="button" onclick="chSearch();">검색</button>
			    </div>
			    <!-- 채팅 목록 -->
			    <c:set var="count" value="0" />
			    <div id="chatList">
			    	<c:forEach items="${chatroomList }" var="chat">
				     	<c:set var="count" value="${count+1}" />
					    <!-- 채팅방 div  -->
					    <!-- 여기 count로 해놨는데 사실은 roomid로 해야할 듯. -->
					    <div class="chat-row mt-10 basic-border-bottom padding-bottom-10" ondblclick="chatWindow(${chat.chatroomNo });">
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
						    	<h3 class="mb-20 inline-block">${chat.chatroomName}</h3>
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
		            	<!-- 채팅방 div 끝 -->
			    	</c:forEach>
			    </div>
			    <!-- 직원 목록 div 끝 -->
			    <!-- 채팅방 추가 floating 버튼 -->
				<button type="button" class="point chat-floating_Btn" onclick="openModal(this);"><i class="fa-solid fa-plus"></i></button>

        	</div> 
        </article>
    </div>
    
    <script>
//     	console.log("${chatroomNo}" == ""); //비어있을 때 true
    	
    	if("${chatroomNo}" != ""){
			window.onload = function(){
				chatWindow("${chatroomNo}"); //새로 만든 채팅방 열기 (열어서 메세지 보내야 목록에 뜸)
		    }
    	}
	  	//채팅창 열기
		function chatWindow(chatroomNo){ //원래는 roomId
			window.open('/chat.hirp?chatroomNo='+chatroomNo,'chattingRoom'+chatroomNo,'width=400,height=600,location=no,status=no,scrollbars=no');
		}
		//채팅 목록에서 검색 (ajax)
		function chSearch(){
			var chatroomSearchKeyword = $("[name='chatroomSearchKeyword']").val(); //검색창에 입력한 값
			console.log(chatroomSearchKeyword);
			$.ajax({
				url:"/searchChatroomList.hirp",
				type:"post",
				data:{"chatroomSearchKeyword" : chatroomSearchKeyword},
				success: function(cList){
					console.log("성공");
	    			console.log(cList);
	    			var count = cList.length;
	    			
	    			var today = '<c:out value="${today}"/>';
	    			console.log(today);
	    			var yesterday = '<c:out value="${yesterday}"/>';
	    			console.log(yesterday);
	    			
	    			var $chatDiv = $("#chatList");
	    			$chatDiv.html("");//기존 내용 있으면 비우기
					
	    			for(var i=0; i<count; i++){
		    			console.log(cList[i].message.msgSenddate);
	    				var countUp = "<c:set var='count' value='"+i+"' />";//원래는 여기 roomId 들어가야 할 듯.
						var chatroomOneDiv =   "<div class='chat-row mt-10 basic-border-bottom padding-bottom-10' onclick=''>"
							   + "<div class='ml-20 pos-rel' style='width:100%;'>"
							    	+ "<h3 class='mb-20 inline-block'>"+cList[i].chatroomName+"</h3>"
							    	+ "<div class='chatting-time'>";
							    	
						console.log("출력 : "+cList[i].message.msgSenddate.substring(0, 10));
						
						if(cList[i].message.msgSenddate.substring(0, 10) == today ){
							if(cList[i].message.msgSenddate.substring(11, 13) < 12) {
								chatroomOneDiv += "오전 "+ cList[i].message.msgSenddate.substring(11, 13) + ":" + cList[i].message.msgSenddate.substring(14, 16);
							} else {
								chatroomOneDiv += "오후 "+ cList[i].message.msgSenddate.substring(11, 13) - 12 + ":" + cList[i].message.msgSenddate.substring(14, 16);
							}
						} else {
							if(cList[i].message.msgSenddate.substring(0, 10) == yesterday) {
								chatroomOneDiv += "어제";
							} else {
								chatroomOneDiv += cList[i].message.msgSenddate.substring(0, 10)
							}
						}
						chatroomOneDiv += "</div>"
									    	+"<div class='' style='text-overflow:ellipsis; overflow:hidden; width:90%'>"
									    		+"<nobr>"
									    			+cList[i].message.msgContents
									    		+"</nobr>"
									    	+"</div></div></div>";
						    	
			    	$chatDiv.append(countUp);
					$chatDiv.append(chatroomOneDiv);
			            	
					}
	    			
	    		},
	    		error: function(){ //왜 정렬이 가운데로 안되는지 모르겠군
	    			console.log("실패");
	//					var $tableBody = $("#emplTable tbody");
	//	    			$tableBody.html("");//기존 내용 있으면 비우기
	//	    			var $tr = $("<tr>");
	//	    			var $text = $("<div class='t-c' style='align:center;'>").html("검색 결과가 없습니다."); //이거 td 안 합쳐짐.
	//					$tr.append($text);
	//					$tableBody.append($tr);
	    		}
			});
		}
    </script>
</body>
</html>