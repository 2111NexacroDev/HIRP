<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<%@ include file="/WEB-INF/views/include/inc_head.jsp"%>
<link rel="stylesheet" href="../../../resources/css/sub.css">
<link rel="stylesheet" href="../../../resources/css/employee.css">
<body>
	<%@ include file="/WEB-INF/views/include/inc_header.jsp"%>

	<div id="conts">
		<aside id="snb">
			<h1>마이페이지</h1>

			<ul class="no-icon">
				<li><a href="/employee/mypageView1.hirp">내 정보 수정</a></li>
				<li><a href="#">알림 설정</a></li>
			</ul>
		</aside>

		<article id="sub">
			<%@ include file="/WEB-INF/views/include/inc_nav_right.jsp"%>
			<h1 class="basic-border-bottom">내 정보 수정</h1>
			<div id="mypage" class="subConts mypage-prev align--middle">
				<form class="shadow" action="/employee/mypageOk.hirp" method="post">
					<div class="t-c">
						<p class="fz-0 t-c">
							<img src="../../../resources/images/icons/icon_lock.png" alt="비밀번호 입력">
							Ui 아이콘  제작자: rizky adhitya pradana - Flaticon
						</p>
						<p class="mt-20">
							<strong>${sessionScope.emplName}</strong>님의 개인정보로 이동하기 위해서는 <br>
							인증 절차가 필요합니다. 
							비밀번호를 정확하게 입력해 주세요.
						</p>

						<div class="mt-20">
							<label class="fz-0" for="emplPw">비밀번호</label><br> 
							<input name="emplPw" type="password" placeholder="비밀번호를 입력해주세요.">
						</div>

						<button class="finished" type="submit" disabled>다음</button>
					</div>
				</form>
			</div>
		</article>
	</div>

	<script>
		$('input[name="emplPw"]').on('keydown', function(){
			$('button[type="submit"]').attr("disabled", false).removeClass('finished').addClass('point');
		});		 
	</script>
</body>
</html>