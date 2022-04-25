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
	        <a class="btn--function" href="#">일정등록</a>
	    </aside>
    
        <article id="sub">
            <%@ include file="/WEB-INF/views/include/inc_nav_right.jsp" %>

            <form class="form--srch" action="#" method="get" enctype="multipart/form-data">
                <input type="text" name="" placeholder="일정 검색">
                <button type="submit"></button>
            </form>

            <h1 class="basic-border-bottom">일정조회</h1>

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
    			today:    '오늘',
    			month:    '월간',
    			week:     '주간',
    			timeGrid: '일간',
    			list:     '목록'
        	},
            initialView: 'dayGridMonth',
            locale: 'ko',
            views: {
            }
        });
        calendar.render();
    });
    </script>
</body>

</html>