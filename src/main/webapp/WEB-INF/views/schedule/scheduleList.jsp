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
            <h1>일정관리</h1>
            <button class="btn--function" type="button" onclick="openModal(this);">일정등록</button>
            <section class="section--modal">
                <div class="bg-black"></div>
                <!-- 검은배경 필요할 경우, 필요없으면 이 태그 통째로 지우기 -->
                <div class="section--modal__conts">
                    <button class="btn--close"></button>
                    <h3>일정 등록</h3>

                    <ul>
                        <li>
                            <label class="mr-20" for="">일정명</label><input type="text" name="">
                        </li>
                        <li>
                            <label class="mr-20" for="">색 선택</label>
                        </li>
                        <li>
                            <label class="mr-20" for="">일시</label><input type="date" name="">
                        </li>
                    </ul>

                    <div class="btns-wrap mt-20 t-r">
                        <button class="point" type="button">확인</button>
                        <button class="finished closeWindow" type="button">닫기</button>
                    </div>
                </div>
            </section>
        </aside>

        <article id="sub">
            <%@ include file="/WEB-INF/views/include/inc_nav_right.jsp" %>

            <form class="form--srch" action="#" method="get" enctype="multipart/form-data">
                <input type="text" name="" placeholder="일정 검색">
                <button type="submit"></button>
            </form>

            <h1 class="basic-border-bottom">일정목록</h1>

            <div id="scheduleList" class="subConts padding-0">
                <div id="calendar"></div>
            </div>
        </article>
    </div>

    <script>
        $(function () {
            var calendarEl = document.getElementById('calendar');
            var calendar = new FullCalendar.Calendar(calendarEl, {
                headerToolbar: {
                    left: 'dayGridMonth,dayGridWeek,timeGrid,listWeek',
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
                initialView: 'dayGridMonth',
                locale: 'ko',
                views: {}
            });
            calendar.render();
        });
    </script>
</body>

</html>