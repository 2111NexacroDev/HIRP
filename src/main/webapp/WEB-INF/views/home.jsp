<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<%@ include file="/WEB-INF/views/include/inc_head.jsp" %>
<link rel="stylesheet" href="../../resources/css/main.css"><!-- 메인페이지 CSS -->
<script src="../../resources/js/main.js"></script>
<script src="../../resources/js/todo.js"></script>

<!-- 로그인 안했을 경우 -->
<c:if test="${empty sessionScope }">
	<script>location.href="/";</script>
</c:if>

<body class="bg--gray">
    <%@ include file="/WEB-INF/views/include/inc_header.jsp" %>

    <div id="conts">
        <article id="main">     
            <%@ include file="/WEB-INF/views/include/inc_nav_right.jsp" %>

            <h1 class="basic-border-bottom">
                <strong>${sessionScope.emplName }</strong>님, 환영합니다!&#128521;
            </h1>

            <div class="row">
                <div>
                    <!-- 컬럼1 -->
                    <section>
                        <figure class="figure--profile">
                            <c:if test="${sessionScope.emplProfile ne null}">
                                <img src="../../../resources/uploadFiles/${sessionScope.emplProfile }" alt="프로필사진">
                            </c:if>
                            <c:if test="${sessionScope.emplProfile eq null}">
                                <p>No Image</p>
                            </c:if>
                        </figure>
                        <h2 class="t-c">${sessionScope.deptName } ${sessionScope.emplName } ${sessionScope.positionName }</h2>
                    </section>
                    <section>
                        <h2>근태관리</h2>
                        <div class="snb--time">
                            <h4 id="result">2022-06-02(목)<br><span></span></h4>
                            <ul class="mt-20">
                                <li>
                                    <dl>
                                        <dt>출근시간</dt>
                                        <dd id="timeStart" class="ml-10">미출근</dd>
                                    </dl>
                                </li>
                                <li class="mt-10">
                                    <dl>
                                        <dt>퇴근시간</dt>
                                        <dd id="timeEnd" class="ml-10">미퇴근</dd>
                                    </dl>
                                </li>
                                <li>
                                    <div class="btns-wrap">
                                        <button class="finished" type="button" onclick="startBtn();">출근하기</button>	
                                        <button class="finished" type="button" onclick="endBtn();">퇴근하기</button>
                                    </div>
                                    <select class="mt-10" name="" id="">
                                        <option value="">업무</option>
                                        <option value="">업무 종료</option>
                                        <option value="">외근</option>
                                        <option value="">출장</option>
                                        <option value="">반차</option>
                                    </select>
                                </li>
                            </ul>
                        </div>
                    </section>
                </div><!-- //컬럼1 -->
                <div>
                    <!-- 컬럼2 -->
                    <section>
                        <h2>전사 일정</h2>
                        <div id="calendar"></div>
                    </section>
                    <section class="todo--today">
                        <h2>오늘의 업무</h2>
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
                </div><!-- //컬럼2 -->
                <div>
                    <!-- 컬럼3 -->
                    <section class="weather-box">
                    </section>
                    <section>
                        <h2>이번 달 생일 🎉🎉</h2>
                        <ul class="ul--birthday">
                        <c:forEach items="${birthdayList }" var="birthdayList">
                            <li><strong>${birthdayList.birthday}일</strong> ${birthdayList.deptName} ${birthdayList.emplName}</li>
                        </c:forEach>
                        <c:if test="${empty birthdayList }">
                            <li class="no-data">이번 달 생일인 사원이 없습니다 :)</li>
                        </c:if>
                        </ul>
                    </section>
                </div><!-- //컬럼3 -->
            </div>
        </article>
    </div>

    <script>
        $(function(){
            // 일정 달력
            let calendarEl = document.getElementById('calendar');
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
                navLinks: false,
                selectable: false,
                //selectMirror: true,
                locale: 'en',
                events: [
                    <c:forEach items="${sListCompany }" var="sCompany">
                    {
                        title: '${sCompany.scheduleTitle}',
                        start: '${sCompany.scheduleStartDate}',
                        end: '${sCompany.scheduleEndDate}',
                        backgroundColor: '${sCompany.scheduleColor}',
                        borderColor: '${sCompany.scheduleColor}',
                        className: 'category-all',
                        extendedProps: {
                            'scheduleNo': '${sCompany.scheduleNo}',
                            'scheduleCategory': '전사',
                            'schedulePlace': '${sCompany.schedulePlace}',
                            'scheduleConts': '${sCompany.scheduleConts}',
                            'scheduleAlarm': '${sCompany.scheduleAlarm}'
                        }
                    },
                    </c:forEach>
                ],
                eventClick: function () {
                    location.href = '/schedule/list.hirp';
                },
                editable: false,
                dayMaxEvents: true,
                eventLimit: true,
            });
            calendar.render();
        })
    </script>
</body>

</html>