<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<%@ include file="/WEB-INF/views/include/inc_head.jsp" %>
<link rel="stylesheet" href="../../../resources/css/sub.css"><!-- 하이알피 서브페이지 CSS -->

<body>
    <%@ include file="/WEB-INF/views/include/inc_header.jsp" %>

    <div id="conts">
        <article id="sub" class="bg--gray">
            <nav id="nav--right">
                <button class="btn--alarm" type="button">
                    <span>3</span>
                </button>
                <button class="btn--profile" type="button">
                    <img src="../resources/images/profile.jpg" alt="profile">
                    <!-- 유저마다 다른 사진 출력돼야함 -->
                </button>
            </nav>

            <h1 class="basic-border-bottom">
                개인업무관리
            </h1>

            <div id="todo" class="subConts">
                <!-- 여백 필요 없을 경우 클래스에 padding-0 추가, 
            	필요 없으면 지울 것 -->
                <div class="todo__wrap">
                    <section class="todo--today">
                        <h2>TODAY</h2>
                        <ul>
                            <li><input name="" type="text" value="항목 예시 1"></li>
                            <li><input name="" type="text" value="항목 예시 2"></li>
                            <li><input name="" type="text" value="항목 예시 3"></li>
                            <li><input name="" type="text" value="항목 예시 4"></li>
                            <li><input name="" type="text" value="항목 예시 5"></li>
                        </ul>
                    </section>
                    <section class="todo--week">
                        <h2>WEEK</h2>
                        <ul>
                            <li><a href="#">2022-04-19</a></li>
                            <li><a href="#">2022-04-20</a></li>
                            <li><a href="#">2022-04-21</a></li>
                            <li><a href="#">2022-04-22</a></li>
                            <li><a href="#">2022-04-23</a></li>
                        </ul>
                    </section>
                </div>
                <section class="memo--list">
                    <h2>MEMO</h2>
                    <ul>
                        <li><textarea></textarea></li>
                        <li><textarea></textarea></li>
                        <li><textarea></textarea></li>
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