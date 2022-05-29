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
						    	<h3 class="mb-20 inline-block">
						    		${chat.chatroomName} 
						    		<c:if test="${chat.chatroomType eq 'G'}">
							    		(${chat.joinCount })
						    		</c:if>
						    	</h3>
						    	<div class="chatting-time">
						    		<!-- 날짜별로 시간 다르게 나오게 하기 -->
							    	<c:if test="${fn:substring(chat.message.msgSenddate, 0, 10) eq today}">
							    		<c:if test="${fn:substring(chat.message.msgSenddate, 11, 13) < 12}">
									    	오전 ${fn:substring(chat.message.msgSenddate, 11, 13)}:${fn:substring(chat.message.msgSenddate, 14, 16)}
							    		</c:if>
							    		<c:if test="${fn:substring(chat.message.msgSenddate, 11, 13) eq 12}"> <!-- 12시 ~~분 일 때 -->
									    	오후 ${fn:substring(chat.message.msgSenddate, 11, 13)}:${fn:substring(chat.message.msgSenddate, 14, 16)}
							    		</c:if>
							    		<c:if test="${fn:substring(chat.message.msgSenddate, 11, 13) > 12}">
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
				<button type="button" class="point chat-floating_Btn"><i class="fa-solid fa-plus"></i></button>
        	</div> 
        	<form id="addChatroomForm" action="/chat/addChatroom.hirp" method="get">
				<!-- 채팅방 추가 모달창 -->
				<section id="chatEmplListModal" class="modal--chatSelect shadow">
					<h3>대화상대 선택 <span></span></h3>
					<!-- 검색창 -->
					<div class="modal--chatSelect__srch row mt-10 t-c padding-bottom-10">
						<input type="text" name="emplSearchKeyword" placeholder="부서명 또는 사원명 검색">
						<button class="point" type="button" onKeypress="javascript:if(event.keyCode==13) {emplSearch(this);}" onclick="emplSearch(this);">검색</button>
					</div>
					<div class="modal--chatSelect__emplList">
					    <c:forEach items="${emplList }" var="empl">
					    	<c:if test="${empl.emplId ne sessionScope.emplId }"> <!-- 내가 아닐 때 -->
							    <!-- 직원명 div  -->
							    <!-- 여기 count로 해놨는데 사실은 roomid로 해야할 듯. -->
							    <div class="chat-row mt-10  padding-bottom-10">
								    <div class="mr-20" style="width:30px;">
						      		    <button class="btn--profile" type="button">
						      		    	<c:if test="${empl.emplProfile eq null}">
										        <img src="../resources/images/img_no_profile.png" alt="profile">
						      		    	</c:if>
						      		    	<c:if test="${empl.emplProfile ne null}">
										        <img src="../resources/uploadFiles/${empl.emplProfile }" alt="profile">
						      		    	</c:if>
									    </button>
								    </div>
								    <div class="modal--chatSelect__empList__checkbox-wrap pos-rel ml-20">
								    	<label for="${empl.emplId }">${empl.deptName } ${empl.emplName } ${empl.positionName }</label>
										<input type="checkbox" id="${empl.emplId }" name="joinchatId" value="${empl.emplId }">
										<!-- joinchatId checked된 값 알아서 넘겨줌 -->
								    </div>
				            	</div>
				            	<!-- 직원명 div 끝 -->
			            	</c:if>
		            	</c:forEach>
					</div>
					<div class="btns-wrap">
						<button class="point" type="button">확인</button>
						<button class="cancel" type="button">취소</button>
					</div>
				</section>
				
				<section id="chatNameModal" class="modal--chatSelect shadow t-c">
					<div style="width: 90%; position: absolute; top: 50%; margin-top: -80px;">
						<h3 style="text-align:left"> 채팅방 이름 입력 </h3>
						<input style="width: 95%;" type="text" name="chatroomName" placeholder="채팅방 이름 입력">
					</div>
					<div class="btns-wrap">
						<button class="point" type="button" onclick="addChatroom();">확인</button>
						<button class="cancel" type="button">취소</button>
					</div>
				</section>
				<!-- 채팅방 추가 모달창 끝-->
        	
        	</form>
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
			window.open('/chat.hirp?chatroomNo='+chatroomNo,'chattingRoom'+chatroomNo,'width=400,height=600,left=410,location=no,status=no,scrollbars=no');
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
							    	+ "<h3 class='mb-20 inline-block'>"+cList[i].chatroomName;
						
						if(cList[i].chatroomType == 'G'){
							chatroomOneDiv += " (" + cList[i].joinCount + ")";
						}
							    	
						chatroomOneDiv += "</h3>"
							    	+ "<div class='chatting-time'>";
							    	
						console.log("출력 : "+cList[i].message.msgSenddate.substring(0, 10));
						
						if(cList[i].message.msgSenddate.substring(0, 10) == today ){
							if(cList[i].message.msgSenddate.substring(11, 13) < 12) {
								chatroomOneDiv += "오전 "+ cList[i].message.msgSenddate.substring(11, 13) + ":" + cList[i].message.msgSenddate.substring(14, 16);
							} else {
								if(cList[i].message.msgSenddate.substring(11, 13) == '12'){ //12시 ~~분일 때
									chatroomOneDiv += "오후 "+ cList[i].message.msgSenddate.substring(11, 13) + ":" + cList[i].message.msgSenddate.substring(14, 16);
								} else {
									chatroomOneDiv += "오후 "+ (cList[i].message.msgSenddate.substring(11, 13)*1 - 12) + ":" + cList[i].message.msgSenddate.substring(14, 16);
								}
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
		//직원 목록에서 검색 (ajax)
		function emplSearch(obj){ //버튼 클릭 시 동작
			console.log(obj);
			console.log($(obj).prev()); //검색창 input
			console.log($(obj).parent().next()); //id empllist 또는 모달창 empllist div
			console.log($(obj).parent().next()[0]); //div의 아이디값 가져오기
// 			console.log($("#emplList"));
			var searchVal = $(obj).prev().val(); //검색한 내용
			var $emplListDiv = $(obj).parent().next(); //id empllist 또는 모달창 empllist div
			var emplDivId = $emplListDiv[0].id; //div의 아이디값 가져오기
			console.log(searchVal);
			console.log(emplDivId);
			if(emplDivId == 'emplList'){
				console.log("모달 아님");
			} else {
				console.log("모달임");
			}
			
			$.ajax({
				url:"/searchEmplList.hirp",
				type:"post",
				data:{"emplSearchKeyword" : searchVal},
				success: function(eList){
					console.log("성공");
	    			console.log(eList);
	    			var count = eList.length;
	    			var myId = "${sessionScope.emplId}";
	    			console.log("아이디 : " + myId);
	    			
// 	    			var $emplDiv = $("#emplList");
	    			$emplListDiv.html("");//기존 내용 있으면 비우기
	    			
	    			//list가 null값이면 아무 데이터도 안나옴. controller에서 empty 체크 안함.
	    			for(var i=0; i<count; i++){
	    				if(eList[i].emplId != myId){ //내가 아닌 데이터만 가져오기
		    				var countUp = "<c:set var='count' value='"+i+"' />" //원래는 여기 roomId 들어가야 할 듯.
		    				var emplOneDiv = "<div class='chat-row mt-10  padding-bottom-10'>"
												  +  "<div class='mr-20 ml-20' style='width:30px;'>"
									      		  +  "<button class='btn--profile' type='button'>";
							var profile = "";
							if(eList[i].emplProfile == null) { //사진 null값 체크해서 다르게 넣어줌.
								emplOneDiv += "<img src='../resources/images/img_no_profile.png' alt='profile'>";
							} else {
								emplOneDiv += "<img src='../resources/uploadFiles/"+eList[i].emplProfile+"' alt='profile'>";
							}
							
							emplOneDiv +=	"</button>"
									+    "</div>";
									
							if(emplDivId == 'emplList'){ //직원 리스트 검색일 때
								emplOneDiv +=	"<div class='ml-20'>"
												    +	eList[i].deptName+" "+eList[i].emplName+" "+eList[i].positionName
											+    "</div>"
							            +	"</div>";
							} else { //모달창 내부 검색일 때
								emplOneDiv += "<div class='modal--chatSelect__empList__checkbox-wrap pos-rel ml-20'>"
										    	+ "<label for=" + eList[i].emplId + ">"
										    		+ eList[i].deptName+" "+eList[i].emplName+" "+eList[i].positionName
										    	+ "</label>"
												+ "<input type='checkbox' id="+eList[i].emplId+">"
										    + "</div>"
										+	"</div>";
							}
							
							$emplListDiv.append(countUp);
							$emplListDiv.append(emplOneDiv);
							
	    				}
					}
	    			if(emplDivId == 'emplList'){
	    				console.log("모달 아님");
	    			} else {
	    				console.log("모달임");
	    			}
	    		},
	    		error: function(){
	    			console.log("실패");
// 	    			console.log(searchVal);
// 					var $tableBody = $("#emplTable tbody");
// 	    			$tableBody.html("");//기존 내용 있으면 비우기
// 	    			var $tr = $("<tr>");
// 	    			var $text = $("<div class='t-c' style='align:center;'>").html("검색 결과가 없습니다."); //이거 td 안 합쳐짐.
// 					$tr.append($text);
// 					$tableBody.append($tr);
	    		}
			});
		}
		
		$(function(){
			$(".chat-floating_Btn").on("click", function(){
				$("#chatEmplListModal").show();
			});

			$("#chatEmplListModal .btns-wrap button.cancel").on("click", function(){
				$("#chatEmplListModal").hide();
			});
			
			$("#chatEmplListModal .btns-wrap .point").on("click", function(){
				$("#chatNameModal").show();
			});
			
			$("#chatNameModal .btns-wrap button.cancel").on("click", function(){
				$("#chatNameModal").hide();
			});

		});
		
    	//그룹 채팅방 추가
    	function addChatroom(){
    		var checkList = $("input[name='joinchatId']:checked"); //체크된 input 찾기
    		console.log(checkList);
    		console.log(checkList.length);
    		console.log(checkList[1]); //~번째 input 찾기
//     		$(checkList[1]).attr("name", "chatRoomJoinList[1].joinchatId");
    		for(var i = 0; i < checkList.length; i++){
    			$(checkList[i]).attr("name", "chatRoomJoinList["+i+"].joinchatId");
    		}
    		$("#addChatroomForm").submit();
    	}
    	
    	
    </script>
</body>
</html>