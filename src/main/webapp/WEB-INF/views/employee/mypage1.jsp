<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<%@ include file="/WEB-INF/views/include/inc_head.jsp"%>
<!-- 하이알피 서브페이지 CSS -->
<link rel="stylesheet" href="../../../resources/css/sub.css">
<link rel="stylesheet" href="../../../resources/css/mypage.css">
<body>
	<%@ include file="/WEB-INF/views/include/inc_header.jsp"%>
	<div id="conts">
		<aside id="snb">
			<h1>기본정보</h1>
		</aside>
		<article id="sub" class="">
			<%@ include file="/WEB-INF/views/include/inc_nav_right.jsp"%>
			<h1 class="basic-border-bottom"></h1>
			<div id="mypage" class="subConts align--middle">
				<form action="/employee/mypage.hirp" method="post" enctype="multipart/form-data">
					<label>일용자님의 마이페이지로 이동을 하기 위해서는 인증 절차가<br>필요합니다. 비밀번호를 정확하게 입력해 주세요.</label><br><br><br>
					<label>비밀번호</label><br>
					<div id="guide" class="subConts">
						<input name="emplPw" type="password" placeholder="비밀번호를 입력해 주세요.">
					</div>
					<button class="finished mt-20" type="button" onclick="location.href='/employee/findPwdView2.hirp'";>다음</button>
				</form>
			</div>
		</article>
	</div>
</body>
</html>