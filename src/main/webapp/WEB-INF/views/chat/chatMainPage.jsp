<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<body>
	<%@ include file="/WEB-INF/views/chat/chatHeader.jsp" %>
	<div id="conts" class="pos-rel">
        <article id="sub">
        	
        	<h1 class="chat-h1 basic-border-bottom mt-20">직원</h1>

            <div id="" class="subConts">
            	<!-- 내정보 -->
            	<div class="chat-row mt-10 basic-border-bottom padding-bottom-10">
			    	<c:forEach items="${emplList }" var="empl">
			    		<c:if test="${empl.emplId eq sessionScope.emplId }"> <!-- 나일 때 -->
						    <div class="chat-row mt-10  padding-bottom-10" onclick="">
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
			    		</c:if>
	            	</c:forEach>
	            	<!-- 직원명 div 끝 -->
            	</div>
			    <!-- 검색창 -->
			    <div class="row mt-20 t-c  padding-bottom-10">
				    <input type="text" name="emplSearchKeyword" style="width:70%" placeholder="부서명 또는 사원명 검색">
					<button class="point" type="button" onKeypress="javascript:if(event.keyCode==13) {emplSearch();}" onclick="emplSearch(this);">검색</button>
			    </div>
			    <!-- 직원 목록 -->
			    <div id="emplList">
				    <c:forEach items="${emplList }" var="empl">
				    	<c:if test="${empl.emplId ne sessionScope.emplId }"> <!-- 내가 아닐 때 -->
						    <!-- 직원명 div  -->
						    <!-- 여기 count로 해놨는데 사실은 roomid로 해야할 듯. -->
						    <div class="chat-row mt-10  padding-bottom-10" ondblclick="addPersonalChatroom('${empl.emplId}');">
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
		            	</c:if>
	            	</c:forEach>
			    </div>
			    <!-- 직원 목록 끝 -->
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
    	//개인 채팅방 추가
    	function addPersonalChatroom(selectId){ // 개인 채팅하고 싶은 상대 아이디
    		console.log(selectId);
    		$.ajax({
				url: "/chat/addPersonChatroom.hirp",
				type: "post",
				data: { "joinchatId" : selectId },
				success: function(data){
					//기존 채팅방 있으면 기존 채팅방 번호 넘겨주고,
					//기존 채팅방 없으면 새로 만든 채팅방 번호 넘겨줌
					//타입은 string으로 넘어옴
					console.log("ajax 성공");
					console.log(data);
					
					chatWindow(data);
				},
				error: function(){
					console.log("ajax 실패");
				}
			});
    	}
    	
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
    	
    	//채팅창 열기
		function chatWindow(chatroomNo){ //원래는 roomId
			window.open('/chat.hirp?chatroomNo='+chatroomNo,'chattingRoom'+chatroomNo,'width=400,height=600, left=410, location=no,status=no,scrollbars=no');
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
	    					var countUp = "";
	    					var emplOneDiv = "";
	    					
							if(emplDivId == 'emplList'){ //직원 리스트 검색일 때
			    				countUp = "<c:set var='count' value='"+i+"' />" //원래는 여기 roomId 들어가야 할 듯.
			    				emplOneDiv = "<div class='chat-row mt-10  padding-bottom-10' ondblclick='chatWindow("+i+")'>"
													  +  "<div class='mr-20 ml-20' style='width:30px;'>"
										      		  +  "<button class='btn--profile' type='button'>";
								if(eList[i].emplProfile == null) { //사진 null값 체크해서 다르게 넣어줌.
									emplOneDiv += "<img src='../resources/images/img_no_profile.png' alt='profile'>";
								} else {
									emplOneDiv += "<img src='../resources/uploadFiles/"+eList[i].emplProfile+"' alt='profile'>";
								}
								
								emplOneDiv +=	"</button>"
										+    "</div>";
								emplOneDiv +=	"<div class='ml-20'>"
												    +	eList[i].deptName+" "+eList[i].emplName+" "+eList[i].positionName
											+    "</div>"
							            +	"</div>";
							} else { //모달창 내부 검색일 때
								countUp = "<c:set var='count' value='"+i+"' />" //원래는 여기 roomId 들어가야 할 듯.
			    				emplOneDiv = "<div class='chat-row mt-10  padding-bottom-10'>"
													  +  "<div class='mr-20 ml-20' style='width:30px;'>"
										      		  +  "<button class='btn--profile' type='button'>";
								if(eList[i].emplProfile == null) { //사진 null값 체크해서 다르게 넣어줌.
									emplOneDiv += "<img src='../resources/images/img_no_profile.png' alt='profile'>";
								} else {
									emplOneDiv += "<img src='../resources/uploadFiles/"+eList[i].emplProfile+"' alt='profile'>";
								}
								
								emplOneDiv +=	"</button>"
										+    "</div>";
										
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
	  </script>
</body>
</html>