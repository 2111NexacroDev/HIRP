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
                    <a href="#none">업무 관리</a>
                    <ul>
                        <li><a href="/todo/list.hirp">할 일/메모 목록</a></li>
                        <li><a href="/todo/doneList.hirp">완료 목록</a></li>
                    </ul>
                </li>
            </ul>
        </aside>

        <article id="sub" class="bg--gray">
            <%@ include file="/WEB-INF/views/include/inc_nav_right.jsp" %>

            <h1 class="basic-border-bottom">
                개인업무관리
            </h1>

            <div id="todo" class="subConts">
                <div class="todo__wrap">
                    <section class="todo--today">
                        <h2>TODAY</h2>
                        <ul>
                            <c:forEach items="${todayList }" var="todo">
                                <li>
                                    <c:if test="${todo.isFinished eq 'Y' }">
                                        <input id="${todo.todoNo }" type="checkbox" checked>
                                    </c:if>
                                    <c:if test="${todo.isFinished eq 'N' }">
                                        <input id="${todo.todoNo }" type="checkbox">
                                    </c:if>
                                    <label for="${todo.todoNo }"></label>
                                    <input name="todoConts" type="text" value="${todo.todoConts }">
                                    <div class="btns-wrap">
                                        <button class="point" onclick="editTodo(${todo.todoNo }, this)">수정</button>
                                        <button class="finished" onclick="removeTodo(${todo.todoNo })">삭제</button>
                                    </div>
                                </li>
                            </c:forEach>
                            <c:choose>
                                <c:when test="${empty todayList}">
                                    <li class="no-data">
                                        <p>등록된 내용이 없습니다.</p>
                                    </li>
                                </c:when>
                            </c:choose>
                        </ul>
                        <button class="btn--plus" type="button"></button>
                    </section>
                    <section class="todo--month">
                        <h2>
                            <span>MONTH</span>
                            <span class="span--todo-guide">하단 달력의 날짜를 클릭하시면 그 날의 할 일을 편집하실 수 있습니다!</span>
                        </h2>
                        <div id="todoCalendar"></div>
                    </section>
                </div>
                <section class="memo--list">
                    <h2>MEMO</h2>
                    <ul>
                        <c:forEach items="${mList }" var="memo">
                            <li>
                                <textarea name="memoConts">${memo.memoConts}</textarea>
                                <div class="btns-wrap">
                                    <button class="point" onclick="editMemo(${memo.memoNo }, this)">수정</button>
                                    <button class="finished" onclick="removeMemo(${memo.memoNo })">삭제</button>
                                </div>
                            </li>
                        </c:forEach>
                        <c:choose>
                            <c:when test="${empty mList}">
                                <li class="no-data">
                                    <p>아직 등록된 메모가 없습니다. <br>오른쪽 위의 + 버튼을 눌러 업무를 관리해보세요!</p>
                                </li>
                            </c:when>
                        </c:choose>
                    </ul>
                    <button class="btn--plus" type="button"></button>
                    <p class="p--memo-guide">
                        저장된 메모는 노란색으로 표시됩니다.<br>
                        작성 후 반드시 체크표시를 눌러 저장해주세요!
                    </p>
                </section>
            </div>
        </article>
    </div>

    <script>
        function printToDoByDate(date) {
            let offset = date.getTimezoneOffset() * 60000; 
            let dateOffset = new Date(date.getTime() - offset);                
            let selectedDate = dateOffset.toISOString().split('T')[0];
            $('.todo--today h2').text(selectedDate);
            $.ajax({
                url: '/todo/listByDate.hirp',
                type: 'get',
                data: {
                    'selectedDate': selectedDate
                },
                success: function(data){
                    $('.todo--today ul').html('');
                    for(let i=0; i < data.length; i++) {
                        $('.todo--today ul').append('<li></li>');
                        console.log(data[i]["isFinished"]);
                        if(data[i]["isFinished"] == 'N') {
                            $('.todo--today ul li:last-child').append('<input id="' + data[i]["todoNo"] + '" type="checkbox">');
                            $('.todo--today ul li:last-child input[type="checkbox"]').prop('checked',false);
                        }
                        else if(data[i]["isFinished"] == 'Y') {
                            $('.todo--today ul li:last-child').append('<input id="' + data[i]["todoNo"] + '" type="checkbox">');
                            $('.todo--today ul li:last-child input[type="checkbox"]').prop('checked',true);
                        }
                        $('.todo--today ul li:last-child').append('<label for="'+ data[i]["todoNo"] +'"></label>');
                        $('.todo--today ul li:last-child').append('<input name="todoConts" type="text" value="'+ data[i]["todoConts"] +'">');
                        $('.todo--today ul li:last-child').append('<div class="btns-wrap"></div>');
                        $('.todo--today ul li:last-child .btns-wrap').append('<button class="point" onclick="editTodo('+ data[i]["todoNo"] +', this)">수정</button>');
                        $('.todo--today ul li:last-child .btns-wrap').append('<button class="finished" onclick="removeTodo('+ data[i]["todoNo"] +')">삭제</button>');
                    }
                },
                error: function(){
                    $('.todo--today ul').html('<li class="no-data"><p>등록된 내용이 없습니다.</p></li>');
                }
            });
        }
        let calendarEl = document.getElementById('todoCalendar');
        let calendar = new FullCalendar.Calendar(calendarEl, {
            headerToolbar: {
                left: '',
                center: 'prev,title,next,today',
                right: '',
            },
            buttonText: {
                today: '오늘',
            },
            initialView: 'dayGridMonth',
            locale: 'en',
            events: [
            <c:forEach items="${tList }" var="tList">
                {
                    title: '${tList.todoConts }',
                    start: '${tList.todoDate }',
                    className: 'tlist',
                },
            </c:forEach>
            ],
            navLinks: true, 
            navLinkDayClick: function(date, jsEvent){
                printToDoByDate(date);
            },
            eventClick: function(data) {
                printToDoByDate(data.event.start);
            },
            dayMaxEvents: true,
            eventLimit: true,
        });
        calendar.render();
    </script>
    <script src="../../../resources/js/todo.js"></script>
</body>

</html>