<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<%@ include file="/WEB-INF/views/include/inc_head.jsp"%>
<link rel="stylesheet" href="../../../resources/css/sub.css">
<!-- 하이알피 서브페이지 CSS -->
<style>
	#ex {
		font-weight: bold;
	}
</style>
</head>
<body>
	<%@ include file="/WEB-INF/views/include/inc_header.jsp"%>
	<div id="conts">
		<aside id="snb" class="snb--time">
			<h1>근태관리</h1>
			<h3 class="mt-20">현재 시간</h3>
			<h4 id="result"></h4>
			<ul class="no-margin">
				<li>
					<dl>
						<dt>출근시간</dt>
						<dd id="timeStart" class="ml-10">
							<c:if test="${empty time}">미출근 수정</c:if>
							<c:if test="${not empty time}">${time.timeStart }</c:if>                                            
						</dd>
					</dl>
				</li>
				<li>
					<dl>
						<dt>퇴근시간</dt>
						<dd id="timeEnd" class="ml-10">
							<c:if test="${time.timeEnd eq null}">미퇴근</c:if>
							<c:if test="${time.timeEnd ne null}">${time.timeEnd }</c:if>           
						</dd>
					</dl>
				</li>
				<li>
					<div class="btns-wrap">
						<button class="finished" type="button" onclick="startBtn();">출근하기</button>
						<button class="finished" type="button" onclick="endBtn();">퇴근하기</button>
					</div>
					<select class="mt-10" name="" id="">
						<option value="">업무</option>
						<option value="">업무 종료</option>
						<option value="">외근</option>
						<option value="">출장</option>
						<option value="">반차</option>
					</select>
				</li>
			</ul>
			<ul>
				<li>
					<a href="#none">근태관리</a>
					<ul>
						<li><a href="/time/time.hirp">출/퇴근 내역</a></li>
						<li><a href="/time/vacation.hirp">연차 내역</a></li>
					</ul>
				</li>
				<li>
					<a href="#none">근태조정</a>
					<ul>
						<li class="on"><a href="/time/modify.hirp">근태 조정 신청 내역</a></li>
					</ul>
				</li>
			</ul>
		</aside>
		<article id="sub" class="">
			<%@ include file="/WEB-INF/views/include/inc_nav_right.jsp"%>
			<h1 class="basic-border-bottom">근태 조정 신청 내역</h1>
			
			<div id="timeList" class="subConts padding-0 mt-40">
				<h2 class="square-tit">근태 조정 신청 내역</h2>
				<table class="table--basic mt-20">
					<thead>
						<tr>
							<th>근태조정번호</th>
							<th>근태번호</th>
							<th>부서</th>
							<th>아이디</th>
							<th>이름</th>
							<th>제목</th>
							<th>출근시간</th>
							<th>퇴근시간</th>
							<th>변경사유</th>
							<th>조정일자</th>
							<th>조정전</th>
							<th>조정후</th>
						</tr>
					</thead>
					<c:forEach var="timeModify" items="${tList }" >
						<tbody>
							<tr>				
								<td>${timeModify.timemNo }</td>
								<td>${timeModify.timeNo }</td>
								<td>${timeModify.timemDepartment }</td>
								<td>${timeModify.emplId }</td>
								<td>${timeModify.timemName }</td>
								<td>${timeModify.timemTitle }</td>
								<td>${timeModify.timemStart }</td>
								<td>${timeModify.timemEnd }</td>
								<td>${timeModify.timemContent }</td>
								<td>${timeModify.timemDate }</td>
								<td>${timeModify.timemBefore }</td>
								<td>${timeModify.timemAfter }</td>
							</tr>
						</tbody>
					</c:forEach>
				</table>
			</div>
		</article>
	</div>
	
	<script>
	// 지금 시간
	function printClock() {
		var date = new Date();
		var year = date.getFullYear();
		var month = ('0' + (date.getMonth() + 1)).slice(-2);
		var day = ('0' + date.getDate()).slice(-2);
		var week = new Array('일', '월', '화', '수', '목', '금', '토');
		var hours = ('0' + date.getHours()).slice(-2);
		var minutes = ('0' + date.getMinutes()).slice(-2);
		var seconds = ('0' + date.getSeconds()).slice(-2);
		var dateString = year + '-' + month + '-' + day + '('
				+ week[date.getDay()] + ')';
		var timeString = hours + ':' + minutes + ':' + seconds;
		document.getElementById("result").innerHTML = dateString + '<br/>' + '<span>' + timeString + '</span>';
			setInterval(printClock, 1000); // 1초마다 바뀌게 해주는 것
	}

	// 켜지자마자 실행할것들
	$(function() {
		printClock();
	})

	// 출근시간
	function startBtn() {
		var emplId = "${sessionScope.emplId }"; // 세션에 담은것 갖고오게해줌
		$.ajax({
			url : "/time/timeStart.hirp",
			type : "POST",
			data : {
				"emplId" : emplId
			},
			success : function() {
				alert("출근시간 등록에 성공했습니다.");
                location.reload();
			},
			error : function() {
				alert("출근시간 등록에 실패했습니다.");
			}
		});
	}

	// 퇴근시간
	function endBtn() {
		var timeEnd = timeString;
		var emplId = "${sessionScope.emplId }"; // 세션에 담은것 갖고오게해줌
		$.ajax({
			url : "/time/timeEnd.hirp",
			type : "POST",
			data : {
				"timeEnd" : timeEnd,
				"emplId" : emplId
			},
			success : function() {
				alert("퇴근시간 등록에 성공했습니다.");				
				location.reload();
			},
			error : function() {
				alert("퇴근시간 등록에 실패했습니다.");
			}
		});
	}
	</script>
</body>
</html>