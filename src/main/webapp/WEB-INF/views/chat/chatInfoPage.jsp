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
	        		<button id="editChatroom" class="btn--profile mb-10" type="button">
	      		    	<i class="fa-solid fa-pen"></i>
				    </button>
				    <div>
				    	편집
				    </div>
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
			    </div>
			    <div class="t-c ml-20" style="display:inline-block">
	        		<button id="addEmpl" class="btn--profile mb-10" type="button">
	      		    	<i class="fa-solid fa-plus"></i>
				    </button>
				    <div>
				    	직원초대
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
							<div class="modal--chatSelect__emplList" style="text-align: left;">
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
										    	<c:set var="doneChatJoinLoop" value="false"/>
										    	<c:forEach items="${chatRoomJoinList }" var="chatJoin" varStatus="chatJoinStatus">
										    		<c:if test="${not doneChatJoinLoop}">
												    	<c:if test="${empl.emplId eq chatJoin.joinchatId}"> <!-- 참가자일 때 -->
												    		<input type="checkbox" id="${empl.emplId }" name="alreadyJoinchatId" value="${empl.emplId }" checked="checked" disabled="disabled">
												    		<c:set var="doneChatJoinLoop" value="true"/>
												    	</c:if>
												    	<c:if test="${chatJoinStatus.last && empl.emplId ne chatJoin.joinchatId}"> <!-- 아닐 때 -->
															<input type="checkbox" id="${empl.emplId }" name="joinchatId" value="${empl.emplId }">
														</c:if>
													</c:if>
								            	</c:forEach>
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
						
						<!-- 채팅 참가자 추가 모달창 끝-->
		        	
		        	</form>
				    
			    </div>
			    <div class="t-c ml-20" style="display:inline-block">
	        		<button class="btn--profile mb-10" type="button" onclick="exitChatRoom(${chatroom.chatroomNo});">
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
    <script>
		//채팅창 닫기
		function exitChatPage(chatroomNo){
			console.log(chatroomNo);
			//채팅방 정보창 닫기
			window.close('', 'chattingRoomInfo'+chatroomNo);
			//채팅방 닫기
			var chattingPage = window.open('/chat.hirp?chatroomNo='+chatroomNo,'chattingRoom'+chatroomNo,'width=400,height=600, left=410, location=no,status=no,scrollbars=no');
			chattingPage.close();
		}
		
		//채팅방 나가기
		function exitChatRoom(chatroomNo) {
			$.ajax({
				url : "/deleteChatRoomJoin.hirp",
				type : "post",
				data : {"chatroomNo" : chatroomNo},
				success : function(data){
					exitChatPage(chatroomNo);
				},
				error : function(data){
					alert("채팅방 나가기 실패");
				}
			});
		}
		
		$(function(){
			$("#addEmpl").on("click", function(){
				$("#chatEmplListModal").show();
			});

			$("#chatEmplListModal .btns-wrap button.cancel").on("click", function(){
				$("#chatEmplListModal").hide();
			});
			
			$("#editChatroom").on("click", function(){
				$("#chatNameModal").show();
			});
			
			$("#chatNameModal .btns-wrap button.cancel").on("click", function(){
				$("#chatNameModal").hide();
			});

		});
    </script>
</body>
</html>