<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
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

            <button class="btn--function" type="button" onclick="openReservation();">공용품 예약</button>

            <h2 class="h2--reservation mt-20 mb-20">
                전사공용품
                <button type="button" onclick="openUtility();"></button>
            </h2>

            <ul>
                <li>
                    <button type="button">회의실</button>
                    <ul>
                    <c:forEach items="${uList }" var="utility">
                        <c:if test="${utility.utilityCategory eq 'room'}"><li><a href="#">${utility.utilityName}</a></li></c:if>
                    </c:forEach>
                    </ul>
                </li>
                <li>
                    <button type="button">차량</button>
                    <ul>
                        <c:forEach items="${uList }" var="utility">
                            <c:if test="${utility.utilityCategory eq 'car'}">
                                <li><a href="#">${utility.utilityName}</a></li>
                            </c:if>
                        </c:forEach>
                    </ul>
                </li>
                <li>
                    <button type="button">기타</button>
                    <ul>
                        <c:forEach items="${uList }" var="utility">
                            <c:if test="${utility.utilityCategory eq 'etc'}">
                                <li><a href="#">${utility.utilityName}</a></li>
                            </c:if>
                        </c:forEach>
                    </ul>
                </li>
            </ul>
        </aside>

        <article id="sub">
            <%@ include file="/WEB-INF/views/include/inc_nav_right.jsp" %>

            <h1 class="basic-border-bottom">예약현황</h1>

            <div id="reservation" class="subConts padding-0">
                <section class="section--modal modal--utility">
                    <div class="bg-black"></div>
                    <form class="section--modal__conts" action="/utility/write.hirp" method="post"
                        enctype="multipart/form-data" style="width:90%; max-width:600px;">
                        <input type="hidden" name="scheduleColor">
                        <input type="hidden" name="scheduleAlarm" value="N">
                        <button class="btn--close" type="button"></button>
                        <h3>공용품 추가</h3>
                        <ul>
                            <li>
                                <label class="mr-20" for="utilityName">공용품명</label>
                                <input type="text" name="utilityName">
                            </li>
                            <li>
                                <label class="mr-20" for="utilityCategory">카테고리</label>
                                <select name="utilityCategory" id="utilityCategory">
                                    <option value="room">회의실</option>
                                    <option value="car">차량</option>
                                    <option value="etc">기타</option>
                                </select>
                            </li>
                            <li>
                                <label class="mr-20" for="utilityConts">상세정보</label>
                                <textarea name="utilityConts" id="utilityConts" cols="20" rows="4"
                                    placeholder="상세정보를 입력해주세요."></textarea>
                            </li>
                        </ul>
                        <div class="btns-wrap mt-20 t-r">
                            <button class="point" type="submit">추가</button>
                            <button class="finished closeWindow" type="button">닫기</button>
                        </div>
                    </form>
                </section>

                <section class="section--modal modal--reservation">
                    <div class="bg-black"></div>
                    <form class="section--modal__conts" action="/reservation/write.hirp" method="post"
                        enctype="multipart/form-data" style="width:90%; max-width:600px;">
                        <input type="hidden" name="scheduleColor">
                        <input type="hidden" name="scheduleAlarm" value="N">
                        <button class="btn--close" type="button"></button>
                        <h3>공용품 예약</h3>
                        <ul>
                            <li>
                                <label class="mr-20" for="">예약대상</label>
                                <select name="" id="">
                                    <optgroup label="회의실">
                                        <c:forEach items="${uList }" var="utility">
                                            <c:if test="${utility.utilityCategory eq 'room'}">
                                                <option value="${utility.utilityNo}">${utility.utilityName}</option>
                                            </c:if>
                                        </c:forEach>
                                    </optgroup>
                                    <optgroup label="차량">
                                        <c:forEach items="${uList }" var="utility">
                                            <c:if test="${utility.utilityCategory eq 'car'}">
                                                <option value="${utility.utilityNo}">${utility.utilityName}</option>
                                            </c:if>
                                        </c:forEach>
                                    </optgroup>
                                    <optgroup label="기타">
                                        <c:forEach items="${uList }" var="utility">
                                            <c:if test="${utility.utilityCategory eq 'etc'}">
                                                <option value="${utility.utilityNo}">${utility.utilityName}</option>
                                            </c:if>
                                        </c:forEach>
                                    </optgroup>
                                </select>
                            </li>
                            <li>
                                <label class="mr-20" for="">일시</label>
                                <input type="date" name="reservationStartDate">
                                <span>&nbsp;&nbsp;~&nbsp;&nbsp;</span>
                                <input type="date" name="reservationEndDate">
                            </li>
                            <li>
                                <label class="mr-20" for="">상세정보</label>
                                <textarea name="scheduleConts" id="" cols="20" rows="4"
                                    placeholder="상세정보를 입력해주세요."></textarea>
                            </li>
                        </ul>
                        <div class="btns-wrap mt-20 t-r">
                            <button class="point" type="submit">예약</button>
                            <button class="finished closeWindow" type="button">닫기</button>
                        </div>
                    </form>
                </section>

                <div id="calendar"></div>
            </div>
        </article>
    </div>
    <script>
        function openUtility() {
            $('.modal--utility').css('display', 'flex');
        }

        function openReservation() {
            let today = new Date().toISOString().split('T')[0];
            $('input[name="reservationStartDate"]').val(today);
            $('input[name="reservationEndDate"]').val(today);
            $('.modal--reservation').css('display', 'flex');
        }

        // $(function () {
        //     var calendarEl = document.getElementById('calendar');
        //     var calendar = new FullCalendar.Calendar(calendarEl, {
        //         headerToolbar: {
        //             left: '',
        //             center: 'prev,title,next,today',
        //             right: '',
        //         },
        //         buttonText: {
        //             today: '오늘',
        //             month: '월간',
        //             week: '주간',
        //             timeGrid: '일간',
        //             list: '목록'
        //         },
        //         initialView: 'listWeek',
        //         locale: 'ko',
        //         views: {}
        //     });
        //     calendar.render();
        // });
    </script>
</body>

</html>