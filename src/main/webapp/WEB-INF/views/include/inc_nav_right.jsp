<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<nav id="nav--right">
    <c:if test="${sessionScope.emplId eq 'admin'}"><a class="a--adminLink" href="/admin.hirp">관리자 페이지로</a></c:if>
    <button class="btn--chat" type="button" 
    	onclick="window.open('/chatMain.hirp','chatting','width=400,height=600,location=no,status=no,scrollbars=no');"></button>
    <button class="btn--alarm" type="button">
        <span id="newAlarm"></span>
    </button>
    <button class="btn--star" type="button"></button>
    <button class="btn--profile" type="button">
        <c:if test="${sessionScope.emplProfile ne null}">
            <img src="../../../resources/uploadFiles/${sessionScope.emplProfile }" alt="프로필사진">
        </c:if>
        <c:if test="${sessionScope.emplProfile eq null}">
            <img src="../../../resources/images/img_no_profile.png" alt="프로필사진">
        </c:if>
    </button>

    <section class="nav--right__info">
        <ul>
            <li><a href="/employee/mypageView1.hirp">내 정보 보기</a></li>
            <li><a href="/alarm/settingPage.hirp">알림 설정</a></li>
            <li><a href="/employee/logout.hirp">로그아웃</a></li>
        </ul>
    </section>
    
    <section class="nav--right__alarm">
    	<!-- 알림 리스트 -->
    	<div style="text-align:right;">
    		<button type="button" class="noneBackground  padding-10" onclick="readAllAlarm();">모두 읽음</button>
    	</div>
    	<div id="alarmList" style="max-height:300px; overflow:scroll;">
	        <div class="mt-20">
	        	<div class="mb-10">
		        	[일정 알림] '권진실 과장 생일' 일정 알림입니다.
	        	</div>
	        	<span class="mr-10 colorGrey">3시간 전</span>
	        	<span class="colorGrey">관리자</span>
	        </div>
    	</div>
        <a class="mt-10 mb-10 t-c colorBlue" href="/alarm/allAlarm.hirp">전체 알림 보기</a>
    </section>
</nav>

<script>
	//현재 시간
	var today = new Date();
	var year = today.getFullYear();
	var month = ('0' + (today.getMonth() + 1)).slice(-2);
	var day = ('0' + today.getDate()).slice(-2);
	var week = ['일', '월', '화', '수', '목', '금', '토'];
	var dayOfWeek = week[new Date(today).getDay()]; //요일
	var dateString = year + '-' + month  + '-' + day;
	
	var hours = ('0' + today.getHours()).slice(-2); 
	var minutes = ('0' + today.getMinutes()).slice(-2);
	var seconds = ('0' + today.getSeconds()).slice(-2); 
	var timeString = "";

    $(function(){        
        if($('.form--srch').length > 0) {
            $('.a--adminLink').hide();
        }
    });
    
    $(document).ready(function() {
    	selectNewAlarm(); //화면 열 때 한번 불러와서 데이터 있으면 N으로 넣어주기
    });
    
    //알림 버튼 클릭 시
    $('.btn--alarm').on('click', function () {
    	selectNewAlarm();
//     	readAllAlarm(); //읽음 처리
    });
    
    function selectNewAlarm(){
//     	alert("알림");
    	$.ajax({
			url:"/alarm/printUnreadAlarm.hirp",
			type:"post",
			data:{},
			success: function(aList){
// 				alert("알림 조회 성공");
				var aCount = aList.length; //data 길이
				var $alarmListDiv = $("#alarmList");
				$alarmListDiv.html("");
				console.log(aList);
				console.log(aCount);
				console.log($alarmListDiv);
				
				for(var i = 0 ; i < aCount; i++){
					//data의 date (ex:2022-06-06)
					var alarmDate = aList[i].alarmDate.substr(0, 4) +  "-" + aList[i].alarmDate.substr(5, 2) + "-" + aList[i].alarmDate.substr(8, 2);
					
					var $alarmDiv = "<div class='mt-20'>"
				        	+ "<div class='mb-10'>"
					        	+ aList[i].alarmContents
				        	+ "</div>";
				        	
		        	$alarmDiv += "<span class='mr-10 colorGrey'>"
		        	
		        	if(dateString == alarmDate) { //오늘 뜬 알림일 때
		        		$alarmDiv += (hours - aList[i].alarmDate.substring(11, 13)*1) + "시간 전";
		        	} else { //오늘 뜬 알림이 아닐 때
		        		$alarmDiv += aList[i].alarmDate.substr(5, 2) + "-" + aList[i].alarmDate.substr(8, 2) + " " 
		        			+ aList[i].alarmDate.substring(11, 13) + ":" + aList[i].alarmDate.substring(14, 16);
		        		//ex : 06-06 10:41
		        	}
		        	
	        		$alarmDiv += "</span>"
					        	+ "<span class='colorGrey'>"
					        		+ aList[i].deptName +" "+ aList[i].emplName +" " + aList[i].positionName
					        	+"</span>"
					        + "</div>";
				    
				    $alarmListDiv.append($alarmDiv);
				}
				
				$("#newAlarm").html(aCount);
			},
    		error: function(){
//     			alert("알림 조회 실패");
    			var $alarmListDiv = $("#alarmList");
				$alarmListDiv.html("");
				var $alarmDiv = "<div class='mt-20 padding-20 t-c'>"
						        	+ "새로운 알림이 없습니다."
						        + "</div>";
				$alarmListDiv.append($alarmDiv);
    		}
		});
    }
    
    function readAllAlarm(){
//     	alert("알림");
    	$.ajax({
			url:"/alarm/readAllAlarm.hirp",
			type:"post",
			data:{},
			success: function(aList){
// 				alert("알림 읽음 처리 성공");
				$("#newAlarm").html(""); //읽으면 알림에 표시 안 뜨게
				var $alarmListDiv = $("#alarmList");
				$alarmListDiv.html("");
				var $alarmDiv = "<div class='mt-20 padding-20 t-c'>"
						        	+ "새로운 알림이 없습니다."
						        + "</div>";
				$alarmListDiv.append($alarmDiv);
			},
    		error: function(){
//     			alert("알림 읽음 처리 실패");
    		}
		});
    }

</script>