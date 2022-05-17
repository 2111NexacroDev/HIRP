<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<%@ include file="/WEB-INF/views/include/inc_head.jsp"%>
<!-- 하이알피 서브페이지 CSS -->
<link rel="stylesheet" href="../../../resources/css/sub.css">
<head>
<meta charset="UTF-8">
<title>마이페이지1</title>
</head>
<body>
	<form action="/employee/mypageOk.hirp" method="post">
		<%@ include file="/WEB-INF/views/include/inc_header.jsp"%>
		<div id="conts">
			<aside id="snb">
				<h1>기본정보</h1>
			</aside>
			<article id="sub" class="">
				<%@ include file="/WEB-INF/views/include/inc_nav_right.jsp"%>
				<h1 class="basic-border-bottom">개인정보 수정</h1>
				<div id="mypage" class="subConts align--middle">
					<!-- subConts 여기 하나만. 정렬 안할거면 align--middle 지우기 -->
					<div>
						<label>""님의 마이페이지로 이동을 하기 위해서는 인증 절차가<br>필요합니다. 비밀번호를
							정확하게 입력해 주세요.
						</label><br>
						<div class="mt-20">
							<label>비밀번호</label><br> <input name="emplPw" type="password"
								placeholder="비밀번호를 입력해 주세요.">
						</div>

						<button class="finished mt-20" type="submit">다음</button>
					</div>
				</div>
			</article>
		</div>
	</form>
</body>
</html>