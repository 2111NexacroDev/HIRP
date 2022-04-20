<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<%@ include file="/WEB-INF/views/include/inc_head.jsp" %>
<link rel="stylesheet" href="../../resources/css/main.css"><!-- 메인페이지 CSS -->

<!-- 
    id는 한 페이지 내에 동일한 id가 하나여야함
    양식 가져다 쓸 때 공통되는 내용 아니면 id 꼭 바꿔서 써주기
    스타일 중복되면 맨 밑에 거(최신 거)가 우선 적용됨
    class는 여러번 사용 가능, 여러 개 지정 가능 
-->

<body class="bg--gray">
    <!-- 배경색 회색되는 css넣어놨음. 배경색 필요할 때 클래스 bg--gray 추가하기 -->
    <%@ include file="/WEB-INF/views/include/inc_header.jsp" %>

    <div id="conts">
        <!-- 서브 메뉴 있을 경우
        <aside id="snb">
            <h1>
                캘린더
            </h1>
            <a class="btn--function" href="#">일정등록</a>
        </aside>-->

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
                <div><!-- 컬럼1 -->
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
                <div><!-- 컬럼2 -->
                    <section>
                        <h2>일정</h2>
                        <div id="calendar"></div>
                    </section>
                    <section>
                        <h2>메일함</h2>
                    </section>
                </div><!-- //컬럼2 -->
                <div><!-- 컬럼3 -->
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