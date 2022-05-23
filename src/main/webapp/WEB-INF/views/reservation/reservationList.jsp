<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<%@ include file="/WEB-INF/views/include/inc_head.jsp" %>
<link rel="stylesheet" href="../../../resources/css/sub.css"><!-- 하이알피 서브페이지 CSS -->

<body>
    <%@ include file="/WEB-INF/views/include/inc_header.jsp" %>

    <div id="conts">
        <aside id="snb">
            <h1>
                예약관리
            </h1>

            <h2 class="h2--reservation mt-20 mb-20">
                전사공용품
                <button type="button"></button>
            </h2>

            <ul>
                <li>
                    <a href="">회의실</a>
                    <ul>
                        <li><a href="#">본사 1층 회의실</a></li>
                        <li><a href="#">본사 2층 회의실</a></li>
                        <li><a href="#">본사 3층 회의실</a></li>
                    </ul>
                </li>
                <li>
                    <a href="">차량</a>
                    <ul>
                        <li><a href="#">메뉴1</a></li>
                        <li><a href="#">메뉴2</a></li>
                        <li><a href="#">메뉴3</a></li>
                    </ul>
                </li>
            </ul>
        </aside>

        <article id="sub">
            <%@ include file="/WEB-INF/views/include/inc_nav_right.jsp" %>

            <h1 class="basic-border-bottom">예약현황</h1>

            <div id="reservation" class="subConts padding-0">
                <div id="calendar"></div>
            </div>
        </article>
    </div>
    <script>
        $(function () {
            var calendarEl = document.getElementById('calendar');
            var calendar = new FullCalendar.Calendar(calendarEl, {
                headerToolbar: {
                    left: '',
                    center: 'prev,title,next,today',
                    right: '',
                },
                buttonText: {
                    today: '오늘',
                    month: '월간',
                    week: '주간',
                    timeGrid: '일간',
                    list: '목록'
                },
                initialView: 'listWeek',
                locale: 'ko',
                views: {}
            });
            calendar.render();
        });
    </script>
</body>

</html>