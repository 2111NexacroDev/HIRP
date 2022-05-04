<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<%@ include file="/WEB-INF/views/include/inc_head.jsp"%>
<link rel="stylesheet" href="../../../resources/css/sub.css">
<!-- 하이알피 서브페이지 CSS -->
<head>
<meta charset="UTF-8">
<title>근태관리 - 연차 내역</title>
<style>
	#ex {
		font-weight: bold;
	}
</style>
</head>
<body>
	<%@ include file="/WEB-INF/views/include/inc_header.jsp"%>

	<div id="conts">
		<aside id="snb">
			<h1>근태관리</h1>
			<ul>
				<li><div style="font-weight:bold;">근태관리</div>
					<ul>
						<li><a href="/time/list.hirp">출/퇴근 내역</a></li>
						<li><a href="/time/vacation.hirp">연차 내역</a></li>
					</ul>
				</li>
			</ul>
			<br>
			<ul>
				<li><div style="font-weight:bold;">근태조정</div>
					<ul>
						<li><a href="/time/modify.hirp">근태 조정 신청</a></li>
					</ul>
				</li>
			</ul>
		</aside>
		<article id="sub" class="">
			<%@ include file="/WEB-INF/views/include/inc_nav_right.jsp"%>
			<h1 class="basic-border-bottom">연차 내역</h1>
		</article>
	</div>
</body>
</html>