<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<%@ include file="/WEB-INF/views/include/inc_head.jsp"%>
<link rel="stylesheet" href="../../../resources/css/sub.css">
<!-- 하이알피 서브페이지 CSS -->
<body>
	<%@ include file="/WEB-INF/views/include/inc_header.jsp"%>
	<div id="conts">
		<aside id="snb">
			<h1>근태관리</h1>
<title>현재 시간</title>
<span id="result"></span>
<ul>
	<li>출근시간</li>
	<li>퇴근시간</li>
	<li>주간 누적 근무시간</li>
	<button class="finished mt-20" type="button" onclick="startBtn();">출근하기</button>
	<button class="finished mt-20" type="button" onclick="endBtn();">퇴근하기</button>
	<select class="mt-20" name="" id="">
		<option value="">업무</option>
		<option value="">업무 종료</option>
		<option value="">외근</option>
		<option value="">출장</option>
		<option value="">반차</option>
	</select>
</ul>
<ul>
	<li><div style="font-weight: bold;">근태관리</div>
		<ul>
			<li><a href="/time/timeListView.hirp">출/퇴근 내역</a></li>
			<li><a href="/time/vacation.hirp">연차 내역</a></li>
		</ul>
	</li>
</ul><br>
<ul>
	<li><div style="font-weight: bold;">근태조정</div>
		<ul>
			<li><a href="/time/modify.hirp">근태 조정 신청</a></li>
		</ul>
	</li>
</ul>
		</aside>
		<article id="sub" class="">
			<%@ include file="/WEB-INF/views/include/inc_nav_right.jsp"%>
			<h1 class="basic-border-bottom">출/퇴근 내역</h1>

			<div class="row mt-20 no-space">
				<!-- <h4 class="col-12 mb-20">여백 필요 없을 경우</h4> -->
				<div class="col basic-border">
					<div>이번주 누적</div>
				</div>
				<div class="col basic-border">
					<div>이번주 초과</div>
				</div>
				<div class="col basic-border">
					<div>이번주 잔여</div>
				</div>
				<div class="col basic-border">
					<div>이번달 누적</div>
				</div>
				<div class="col basic-border">
					<div>이번달 연장</div>
				</div>
			</div>
		</article>
	</div>

	<script>
		// 지금 시간
			var date = new Date();
			var year = date.getFullYear();
			var month = ('0' + (date.getMonth() + 1)).slice(-2);
			var day = ('0' + date.getDate()).slice(-2);
			var week = new Array('일', '월', '화', '수', '목', '금', '토');
			var hours = ('0' + date.getHours()).slice(-2);
			var minutes = ('0' + date.getMinutes()).slice(-2);
			var seconds = ('0' + date.getSeconds()).slice(-2);
			var dateString = year + '-' + month + '-' + day + '('+ week[date.getDay()] + ')';
			var timeString = hours + ':' + minutes + ':' + seconds;
		function printClock() {
			document.getElementById("result").innerHTML = dateString + '<br/>'+ timeString;
			setInterval(printClock, 1000); // 1초마다 바뀌게 해주는 것
		}
		
		// 켜지자마자 실행할것들
        $(function(){
        	printClock();
        })
		
		// 출근시간
		function startBtn() {
			var emplId = "${sessionScope.emplId }"; // 세션에 담은것 갖고오게해줌
			$.ajax({
				url: "/time/timeStart.hirp",
		        type: "POST",
		        data: {
					"emplId" : emplId
		            },
		       		success: function(){
		        	alert("출근시간 등록에 성공했습니다.");
		            },
		        	error: function(){  alert("출근시간 등록에 실패했습니다.");}
		        });
			}
		
     	// 퇴근시간
		function endBtn() {
			var timeEnd = timeString;
			var emplId = "${sessionScope.emplId }"; // 세션에 담은것 갖고오게해줌
			$.ajax({
		            url: "/time/timeEnd.hirp",
		            type: "POST",
		            data: {
						"timeEnd" : timeEnd,
						"emplId" : emplId
		            },
		            success: function(){
		                alert("퇴근시간 등록에 성공했습니다.");
		            },
		            error: function(){  alert("퇴근시간 등록에 실패했습니다.");}
		        });
			}
	</script>
</body>
</html>