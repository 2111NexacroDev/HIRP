<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<%@ include file="/WEB-INF/views/include/inc_head.jsp" %>
<link rel="stylesheet" href="../../../resources/css/sub.css">

<body>
    <%@ include file="/WEB-INF/views/include/inc_header.jsp" %>

    <div id="conts">
        <aside id="snb">
            <h1>개인업무관리</h1>
            <ul>
                <li>
                    <button type="button">업무 관리</button>
                    <ul>
                        <li><a href="/todo/list.hirp">할 일/메모 목록</a></li>
                        <li><a href="/todo/doneList.hirp">완료 목록</a></li>
                    </ul>
                </li>
            </ul>
        </aside>

        <article id="sub">
            <%@ include file="/WEB-INF/views/include/inc_nav_right.jsp" %>

            <h1 class="basic-border-bottom">
                완료 목록
            </h1>

            <div id="doneList" class="subConts padding-0">
                <section>
                    <div id="doneCalendar"></div>
                </section>
            </div>
        </article>
    </div>

    <script>        
        let calendarEl2 = document.getElementById('doneCalendar');
        let calendar2 = new FullCalendar.Calendar(calendarEl2, {
            headerToolbar: {
                left: '',
                center: 'prev,title,next,today',
                right: '',
            },
            buttonText: {
                today: '오늘',
            },
            initialView: 'listMonth',
            navLinks: false, 
            selectable: false,
            locale: 'ko',
            events: [                
            <c:forEach items="${fList }" var="fList">
                {
                    title: '${fList.todoConts }',
                    start: '${fList.todoDate }',
                    className: 'done-list',
                },
            </c:forEach>
            ],
            eventClick: function(data) {
                //openScheduleModal(data); //이벤트 클릭 시 모달 호출
            },
            select: function(selectionInfo) {
                //openSelectedScheduleModal(selectionInfo);	//일자 클릭 시 모달 호출
            },
            editable: false,
            dayMaxEvents: true,
        });
        calendar2.render();
    </script>
    <script src="../../../resources/js/todo.js"></script>
</body>

</html>