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
                        <input type="hidden" name="reservationStartDate">
                        <input type="hidden" name="reservationEndDate">
                        <button class="btn--close" type="button"></button>
                        <h3>공용품 예약</h3>
                        <ul>
                            <li>
                                <label class="mr-20" for="utilityNo">예약대상</label>
                                <select name="utilityNo" id="utilityNo">
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
                                <label class="mr-20" for="">예약시작일</label>
                                <input type="date" name="startDate">
                                <select class="time-select-1">
                                    <option value="am">오전</option>
                                    <option value="pm">오후</option>
                                </select>
                                <select class="time-select-2">
                                    <option value="01">1</option>
                                    <option value="02">2</option>
                                    <option value="03">3</option>
                                    <option value="04">4</option>
                                    <option value="05">5</option>
                                    <option value="06">6</option>
                                    <option value="07">7</option>
                                    <option value="08">8</option>
                                    <option value="09">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="00">12</option>
                                </select>
                                <span>&nbsp;:&nbsp;</span>
                                <select class="time-select-3">
                                    <option value="00">00</option>
                                    <option value="30">30</option>
                                </select>
                            </li>
                            <li>
                                <label class="mr-20" for="">예약종료일</label>
                                <input type="date" name="endDate">
                                <select class="time-select-1">
                                    <option value="am">오전</option>
                                    <option value="pm">오후</option>
                                </select>
                                <select class="time-select-2">
                                    <option value="01">1</option>
                                    <option value="02">2</option>
                                    <option value="03">3</option>
                                    <option value="04">4</option>
                                    <option value="05">5</option>
                                    <option value="06">6</option>
                                    <option value="07">7</option>
                                    <option value="08">8</option>
                                    <option value="09">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="00">12</option>
                                </select>
                                <span>&nbsp;:&nbsp;</span>
                                <select class="time-select-3">
                                    <option value="00">00</option>
                                    <option value="30">30</option>
                                </select>
                            </li>
                            <li>
                                <label class="mr-20" for="reservationConts">예약 내용</label>
                                <textarea name="reservationConts" id="reservationConts" cols="20" rows="4"
                                    placeholder="예약 상세정보를 입력해주세요."></textarea>
                            </li>
                        </ul>
                        <div class="btns-wrap mt-20 t-r">
                            <button id="addReservation" class="point" type="button">예약</button>
                            <button class="finished closeWindow" type="button">닫기</button>
                        </div>
                    </form>
                </section>

                <div id="reservationCalendar"></div>

                <h2 class="padding-20">내 예약/대여 현황</h2>
                <table class="table--basic">
                    <thead>
                        <th>s</th>
                        <th>s</th>
                        <th>s</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td>내용1</td>
                            <td>내용2</td>
                            <td>내용3</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </article>
    </div>
    <script>
        function openUtility() {
            $('.modal--utility').css('display', 'flex');
        }

        function openReservation() {
            let today = new Date().toISOString().split('T')[0];
            $('input[name="startDate"]').val(today);
            $('input[name="endDate"]').val(today);
            $('.modal--reservation').css('display', 'flex');
        }

        $(function(){
            setTimeout(function(){
                let nowTimeOffsetY = $('.fc-timegrid-now-indicator-arrow').attr('style').split(':')[1];
                let offsetTop = $('.fc-view-harness').offset().top;
                console.log(offsetTop)
                nowTimeOffsetY = parseInt(nowTimeOffsetY)+offsetTop;
                $('body,html').stop().animate({'scrollTop':nowTimeOffsetY+'px'},300);
            }, 300);
        });

        $('#addReservation').on('click', function(){
            let startDate = $('input[name="startDate"]').val();
            let startTime1 = $('input[name="startDate"]').siblings('.time-select-1').val();
            let startTime2 = $('input[name="startDate"]').siblings('.time-select-2').val();
            if(startTime1 == 'pm') {
                startTime2 = parseInt(startTime2) + 12;
            }
            let startTime3 = $('input[name="startDate"]').siblings('.time-select-3').val();
            let startDateTime = startDate+'T'+startTime2+':'+startTime3;

            let endDate = $('input[name="endDate"]').val();
            let endTime1 = $('input[name="endDate"]').siblings('.time-select-1').val();
            let endTime2 = $('input[name="endDate"]').siblings('.time-select-2').val();
            if(endTime1 == 'pm') {
                endTime2 = parseInt(endTime2) + 12;
            }
            let endTime3 = $('input[name="endDate"]').siblings('.time-select-3').val();
            let endDateTime = endDate+'T'+endTime2+':'+endTime3;
            $('input[name="reservationStartDate"]').val(startDateTime);
            $('input[name="reservationEndDate"]').val(endDateTime);
            $(this).parents('.modal--reservation').children('form').submit();
        });

        $(function () {
            var calendarEl = document.getElementById('reservationCalendar');
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
                initialView: 'timeGridWeek',
                locale: 'ko',
                views: {},
                allDaySlot: false,
                nowIndicator: true,
                events: [
                <c:forEach items="${rList }" var="rList">
                    {
                        title: '${rList.utility.utilityName }',
                        start: '${rList.reservationStartDate }',
                        end: '${rList.reservationEndDate }'
                    }
                </c:forEach>   
                ]
            });
            calendar.render();
        });
    </script>
</body>

</html>