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
				    <input type="text" name="emplSearchKeyword" style="width:70%" placeholder="부서명 또는 사원명 검색">
					<button class="point" type="button" onKeypress="javascript:if(event.keyCode==13) {emplSearch();}" onclick="emplSearch();">검색</button>
			    </div>
			    <!-- 직원 목록 -->
			    <c:set var="count" value="0" />
			    <div id="emplList">
				    <c:forEach items="${emplList }" var="empl">
				     	<c:set var="count" value="${count+1}" />
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
	            	</c:forEach>
			    
			    </div>
        	</div> 
        </article>
    </div>
    <script>
    	//채팅창 열기
		function chatWindow(count){ //원래는 roomId
			window.open('/chat.hirp','chattingRoom'+count,'width=400,height=600,location=no,status=no,scrollbars=no');
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
	    			
	    			var $emplDiv = $("#emplList");
	    			$emplDiv.html("");//기존 내용 있으면 비우기
	    			
	    			for(var i=0; i<count; i++){
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
						
						
						emplOneDiv +=		"</button>"
										+    "</div>"
										+    "<div class='ml-20'>"
										    +	eList[i].deptName+" "+eList[i].emplName+" "+eList[i].positionName
										+    "</div>"
						            +	"</div>";
	    				
// 	        			var $tr = $("<tr onclick='emplTrClick(this);'>");
// 	        			var $tdDept = $("<td>").html(eList[i].deptName);
// 	        			var $tdPosition = $("<td>").html(eList[i].positionName);
// 	        			var $tdName = $("<td>").html(eList[i].emplName);
						$emplDiv.append(countUp);
						$emplDiv.append(emplOneDiv);
						
// 						var hiddenDeptCode = "<input type='hidden' name='deptCode' value="+eList[i].deptCode+">"
// 						var hiddenPositionCode = "<input type='hidden' name='positionCode' value="+eList[i].positionCode+">"
// 						var hiddenEmplId = "<input type='hidden' name='emplId' value="+eList[i].emplId+">"
// 						$tableBody.append(hiddenDeptCode);
// 						$tableBody.append(hiddenPositionCode);
// 						$tableBody.append(hiddenEmplId);
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
	
	  </script>
</body>
</html>