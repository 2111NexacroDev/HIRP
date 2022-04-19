<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<%@ include file="/WEB-INF/views/include/inc_head.jsp" %>

<body>
    <header id="gnb">
        <button type="button" id="gnb__btn--burger"></button>
        <h1 id="gnb__logo">
            <a href="#">
                <img src="../resources/images/logo_hirp.png" alt="HIRP">
            </a>
        </h1>
        <nav>
            <ul>
                <li><a href="#" class="on">홈</a></li>
                <li><a href="#">메일</a></li>
                <li><a href="#">게시판</a></li>
                <li><a href="#">개인업무관리</a></li>
                <li><a href="#">프로젝트관리</a></li>
                <li><a href="#">일정관리</a></li>
                <li><a href="#">전자결재</a></li>
                <li><a href="#">설문조사</a></li>
                <li><a href="#">근태관리</a></li>
                <li><a href="#">공용품 예약/관리</a></li>
            </ul>
            <button type="button" id="gnb__btn--org">조직도</button>
        </nav>
    </header>

    <div id="conts">
        <aside id="snb">
            <h1>
                            캘린더
            </h1>
            <a class="btn--function" href="#">일정등록</a>
        </aside>

        <article id="main">
            <nav id="nav--right">
                <button class="btn--alarm" type="button">
                    <span>3</span>
                </button>
                <button class="btn--profile" type="button">
                    <img src="../resources/images/profile.jpg" alt="profile">
                    <!-- 유저마다 다른 사진 출력돼야함 -->
                </button>
            </nav>

            <!-- 검색폼 필요한 사람 쓰기, class 변경 안하고 id만 부여해서 사용하면 됨 -->
            <form class="form--srch" action="">
                <input type="text" name="" placeholder="통합검색">
                <button type="submit"></button>
            </form>

            <h1 class="basic-border-bottom">
                <strong>USER</strong>님 반갑습니다!
            </h1>

            <div class="row">
            test
            </div>
        </article>
    </div>
</body>

</html>