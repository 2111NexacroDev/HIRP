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
				    <input type="text" name="chatroomSearchKeyword" style="width:70%" placeholder="채팅방 또는 참여자 이름 검색">
					<button class="point" type="button" onclick="chatroomSearch()">검색</button>
			    </div>
			    <!-- 직원 목록 -->
			    <c:set var="count" value="0" />
			    <div id="chatList">
			    	<c:forEach items="${chatroomList }" var="chat">
				     	<c:set var="count" value="${count+1}" />
					    <!-- 채팅방 div  -->
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
		            	<!-- 채팅방 div 끝 -->
			    	</c:forEach>
			    
			    </div>
        	</div> 
        </article>
    </div>
    
    <script>

		//채팅 목록에서 검색 (ajax)
		function chatroomSearch(){
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
	    			console.log(cList[i].message.msgSenddate)
	    				var countUp = "<c:set var='count' value='"+i+"' />";//원래는 여기 roomId 들어가야 할 듯.
						var chatroomOneDiv =   '<div class="chat-row mt-10 basic-border-bottom padding-bottom-10" onclick="">'
							   + '<div class="ml-20 pos-rel" style="width:100%;">'
							    	+ '<h4 class="mb-20 inline-block">'+cList[i].chatroomName+'</h4>'
							    	+ '<div class="chatting-time">'
// 						if(cList[i].message.msgSenddate = ) //여기 위에 today yesterday 가져온 걸로 수정하기
// 								    	+ '<c:if test="${fn:substring("'+cList[i].message.msgSenddate+'", 0, 10) eq today}">'
// 								    		+ '<c:if test="${fn:substring('+cList[i].message.msgSenddate+', 11, 13) < 12}">'
// 										    	+ '오전 ${fn:substring('+cList[i].message.msgSenddate+', 11, 13)}:${fn:substring('+cList[i].message.msgSenddate+', 14, 16)}'
// 								    		+ '</c:if>'
// 								    		+'<c:if test="${fn:substring('+cList[i].message.msgSenddate+', 11, 13) >= 12}">'
// 										    	+'오후 ${fn:substring('+cList[i].message.msgSenddate+', 11, 13) - 12}:${fn:substring('+cList[i].message.msgSenddate+', 14, 16)}'
// 								    		+'</c:if>'
// 								    	+'</c:if>'
// 								    	+'<c:if test="${fn:substring('+cList[i].message.msgSenddate+', 0, 10) ne today}">'
// 									    	+'<c:if test="${fn:substring('+cList[i].message.msgSenddate+', 0, 10) eq yesterday}">'
// 									    		+'어제'
// 								    		+'</c:if>'
// 								    		+'<c:if test="${fn:substring('+cList[i].message.msgSenddate+', 0, 10) ne yesterday}">'
// 									    		+'${fn:substring('+cList[i].message.msgSenddate+', 0, 10)}'
// 								    		+'</c:if>'
// 								    	+'</c:if>'
								    +'</div>'
							    	+'<div class="" style="text-overflow:ellipsis; overflow:hidden; width:90%">'
							    		+'<nobr>'
							    			+cList[i].message.msgContents
							    		+'</nobr>'
							    	+'</div></div></div>';
							    	
				    	$chatDiv.append(countUp);
						$chatDiv.append(chatroomOneDiv);
			            	
// 	    				var countUp = "<c:set var='count' value='"+i+"' />" //원래는 여기 roomId 들어가야 할 듯.
// 	    				var emplOneDiv = "<div class='chat-row mt-10  padding-bottom-10' onclick='chatWindow("+i+")'>"
// 											  +  "<div class='mr-20 ml-20' style='width:30px;'>"
// 								      		  +  "<button class='btn--profile' type='button'>";
// 						var profile = "";
// 						if(eList[i].emplProfile == null) { //사진 null값 체크해서 다르게 넣어줌.
// 							emplOneDiv += "<img src='../resources/images/img_no_profile.png' alt='profile'>";
// 						} else {
// 							emplOneDiv += "<img src='../resources/uploadFiles/"+eList[i].emplProfile+"' alt='profile'>";
// 						}
						
						
// 						emplOneDiv +=		"</button>"
// 										+    "</div>"
// 										+    "<div class='ml-20'>"
// 										    +	eList[i].deptName+" "+eList[i].emplName+" "+eList[i].positionName
// 										+    "</div>"
// 						            +	"</div>";
	    				
// 	//	        			var $tr = $("<tr onclick='emplTrClick(this);'>");
// 	//	        			var $tdDept = $("<td>").html(eList[i].deptName);
// 	//	        			var $tdPosition = $("<td>").html(eList[i].positionName);
// 	//	        			var $tdName = $("<td>").html(eList[i].emplName);
// 						$emplDiv.append(countUp);
// 						$emplDiv.append(emplOneDiv);
						
// 	//						var hiddenDeptCode = "<input type='hidden' name='deptCode' value="+eList[i].deptCode+">"
// 	//						var hiddenPositionCode = "<input type='hidden' name='positionCode' value="+eList[i].positionCode+">"
// 	//						var hiddenEmplId = "<input type='hidden' name='emplId' value="+eList[i].emplId+">"
// 	//						$tableBody.append(hiddenDeptCode);
// 	//						$tableBody.append(hiddenPositionCode);
// 	//						$tableBody.append(hiddenEmplId);
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