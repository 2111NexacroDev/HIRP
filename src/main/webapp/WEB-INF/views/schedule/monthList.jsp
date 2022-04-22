<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<%@ include file="/WEB-INF/views/include/inc_head.jsp" %>
<link rel="stylesheet" href="../../../resources/css/sub.css"><!-- 하이알피 서브페이지 CSS -->

<body>
    <%@ include file="/WEB-INF/views/include/inc_header.jsp" %>
    <aside id="snb">
        <h1>
            캘린더
        </h1>
        <a class="btn--function" href="#">일정등록</a>
    </aside>

    <div id="conts">
        <article id="sub" class="bg--gray">
            <%@ include file="/WEB-INF/views/include/inc_nav_right.jsp" %>

            <!-- 검색폼 필요한 사람 쓰기, class 변경 안하고 id만 부여해서 사용하면 됨 -->
            <form class="form--srch" action="">
                <input type="text" name="" placeholder="통합검색">
                <button type="submit"></button>
            </form>

            <h1 class="basic-border-bottom">
                <strong>USER</strong>님 반갑습니다!
            </h1>

            <div id="scheduleMonth" class="subConts">
                <!-- 여백 필요 없을 경우 클래스에 padding-0 추가, 
            	필요 없으면 지울 것 -->
            </div>
        </article>
    </div>
</body>

</html>