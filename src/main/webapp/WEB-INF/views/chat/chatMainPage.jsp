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
	<div id="conts" class="pos-rel">
        <article id="sub">
        	
        	<h1 class="chat-h1 basic-border-bottom mt-20">직원</h1>

            <div id="" class="subConts">
            	<!-- 내정보 -->
            	<div class="chat-row mt-10 basic-border-bottom padding-bottom-10">
			    	<c:forEach items="${emplList }" var="empl">
			    		<c:if test="${empl.emplId eq sessionScope.emplId }"> <!-- 나일 때 -->
						    <div class="chat-row mt-10  padding-bottom-10" onclick="chatWindow(${count});">
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
		            	<!-- 직원명 div 끝 -->
	            	</c:forEach>
            	</div>
			    <!-- 검색창 -->
			    <div class="row mt-20 t-c  padding-bottom-10">
				    <input type="text" name="emplSearchKeyword" style="width:70%" placeholder="부서명 또는 사원명 검색">
					<button class="point" type="button" onKeypress="javascript:if(event.keyCode==13) {emplSearch();}" onclick="emplSearch();">검색</button>
			    </div>
			    <!-- 직원 목록 -->
			    <c:set var="count" value="0" />
			    <div id="emplList">
				    <c:forEach items="${emplList }" var="empl">
				    	<c:if test="${empl.emplId ne sessionScope.emplId }"> <!-- 내가 아닐 때 -->
					     	<c:set var="count" value="${count+1}" />
					     	<input type="hidden" value=${count } name="roomId">
						    <!-- 직원명 div  -->
						    <!-- 여기 count로 해놨는데 사실은 roomid로 해야할 듯. -->
						    <div class="chat-row mt-10  padding-bottom-10" onclick="chatWindow(${count});">
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

			<section class="modal--chatSelect shadow">
				<h3>대화상대 선택 <span>3</span></h3>
				<!-- 검색창 -->
				<div class="modal--chatSelect__srch row mt-10 t-c padding-bottom-10">
					<input type="text" name="emplSearchKeyword" placeholder="부서명 또는 사원명 검색">
					<button class="point" type="button" onKeypress="javascript:if(event.keyCode==13) {emplSearch();}" onclick="emplSearch();">검색</button>
				</div>
				<div class="modal--chatSelect__emplList">
				    <c:forEach items="${emplList }" var="empl">
				    	<c:if test="${empl.emplId ne sessionScope.emplId }"> <!-- 내가 아닐 때 -->
					     	<c:set var="count" value="${count+1}" />
					     	<input type="hidden" value=${count } name="roomId">
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
									<input type="checkbox" id="${empl.emplId }">
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
        </article>
    </div>
    <script>
    	//채팅창 열기
		function chatWindow(count){ //원래는 roomId
			window.open('/chat.hirp?chatroomNo='+count,'chattingRoom'+count,'width=400,height=600,location=no,status=no,scrollbars=no');
		}
    	
		//직원 목록에서 검색 (ajax)
		function emplSearch(){
			var emplSearchKeyword = $("[name='emplSearchKeyword']").val(); //검색창에 입력한 값
			console.log(emplSearchKeyword);
			
			$.ajax({
				url:"/searchEmplList.hirp",
				type:"post",
				data:{"emplSearchKeyword" : emplSearchKeyword},
				success: function(eList){
					console.log("성공");
	    			console.log(eList);
	    			var count = eList.length;
	    			var myId = "${sessionScope.emplId}";
	    			console.log("아이디 : " + myId);
	    			
	    			var $emplDiv = $("#emplList");
	    			$emplDiv.html("");//기존 내용 있으면 비우기
	    			
	    			for(var i=0; i<count; i++){
	    				if(eList[i].emplId != myId){ //내가 아닌 데이터만 가져오기
		    				var countUp = "<c:set var='count' value='"+i+"' />" //원래는 여기 roomId 들어가야 할 듯.
		    				var emplOneDiv = "<div class='chat-row mt-10  padding-bottom-10' onclick='chatWindow("+i+")'>"
												  +  "<div class='mr-20 ml-20' style='width:30px;'>"
									      		  +  "<button class='btn--profile' type='button'>";
							var profile = "";
							if(eList[i].emplProfile == null) { //사진 null값 체크해서 다르게 넣어줌.
								emplOneDiv += "<img src='../resources/images/img_no_profile.png' alt='profile'>";
							} else {
								emplOneDiv += "<img src='../resources/uploadFiles/"+eList[i].emplProfile+"' alt='profile'>";
							}
							
							
							emplOneDiv +=	"</button>"
											+    "</div>"
											+    "<div class='ml-20'>"
											    +	eList[i].deptName+" "+eList[i].emplName+" "+eList[i].positionName
											+    "</div>"
							            +	"</div>";
		    				
							$emplDiv.append(countUp);
							$emplDiv.append(emplOneDiv);
	    				}
					}
	    		},
	    		error: function(){ //왜 정렬이 가운데로 안되는지 모르겠군
	    			console.log("실패");
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
				$(".modal--chatSelect").show();
			});

			$(".modal--chatSelect .btns-wrap button.cancel").on("click", function(){
				$(".modal--chatSelect").hide();
			});
		});
	  </script>
</body>
</html>