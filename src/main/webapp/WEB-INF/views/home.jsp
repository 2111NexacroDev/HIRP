<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<%@ include file="/WEB-INF/views/include/inc_head.jsp" %>
<link rel="stylesheet" href="../../resources/css/main.css"><!-- 메인페이지 CSS -->
<script src="../../resources/js/main.js"></script>

<!-- 로그인 안했을 경우 -->
<c:if test="${empty sessionScope }">
	<script>location.href="/";</script>
</c:if>

<body class="bg--gray">
    <%@ include file="/WEB-INF/views/include/inc_header.jsp" %>

    <div id="conts">
        <article id="main">
            <%@ include file="/WEB-INF/views/include/inc_nav_right.jsp" %>

            <h1 class="basic-border-bottom">
                <strong>${sessionScope.emplId }</strong>님, 환영합니다!&#128521;
            </h1>

            <div class="row">
                <div>
                    <!-- 컬럼1 -->
                    <section>
                        <figure class="figure--profile">
                            <img src="../resources/images/profile.jpg" alt="profile">
                            <!-- 유저마다 다른 사진 출력돼야함 -->
                        </figure>
                        <h2 class="t-c">ㅇㅇㅇ</h2>
                    </section>
                    <section>
                        <h2>근태관리</h2>
                    </section>
                </div><!-- //컬럼1 -->
                <div>
                    <!-- 컬럼2 -->
                    <section>
                        <h2>일정</h2>
                        <div id="calendar"></div>
                    </section>
                    <section>
                        <h2>메일함</h2>
                    </section>
                </div><!-- //컬럼2 -->
                <div>
                    <!-- 컬럼3 -->
                    <section>
                        <h2>생일</h2>
                    </section>
                    <section>
                        <h2>결재 대기 문서</h2>
                    </section>
                </div><!-- //컬럼3 -->
            </div>
        </article>
    </div>
</body>

</html>