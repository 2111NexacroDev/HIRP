<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<%@ include file="/WEB-INF/views/include/inc_head.jsp" %>
<link rel="stylesheet" href="../../../resources/css/sub.css"><!-- 하이알피 서브페이지 CSS -->

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

            <div id="todo" class="subConts padding-20">
            	<!-- 여백 필요할 경우 클래스에 padding-20 추가, 
            	필요 없으면(표가 꽉차야 할 경우 등) 지울 것 -->
            	<section class="todo--today">
            		<ul>
            			<li><input name="" type="text" value="항목 예시 1"></li>
            			<li><input name="" type="text" value="항목 예시 2"></li>
            			<li><input name="" type="text" value="항목 예시 3"></li>
            			<li><input name="" type="text" value="항목 예시 4"></li>
            		</ul>
            	</section>
            	<section class="todo--week">
            	    <ul>
            			<li><a href="#">2022-04-19</a></li>
            			<li><a href="#">2022-04-20</a></li>
            			<li><a href="#">2022-04-21</a></li>
            			<li><a href="#">2022-04-22</a></li>
            			<li><a href="#">2022-04-23</a></li>
            		</ul>
            	</section>
            	<section class="memo--list">
            		<ul>
            			<li><textarea></textarea></li>
            			<li><textarea></textarea></li>
            			<li><textarea></textarea></li>
            		</ul>
            	</section>
            </div>
        </article>
    </div>
</body>

</html>