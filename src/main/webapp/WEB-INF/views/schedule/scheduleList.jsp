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
            <h1>일정관리</h1>
            <button class="btn--function" type="button" onclick="openCleanedScheduleModal();">일정등록</button>
            <!-- 수정 시 값 세팅되므로 위 버튼 누를 시 초기화되는 코드 추가해야함 -->
            <section class="section--modal">
                <div class="bg-black"></div>
                <form class="section--modal__conts modal--shcedule" action="/schedule/write.hirp" method="post"
                    enctype="multipart/form-data" style="width:90%; max-width:600px;">
                    <input type="hidden" name="scheduleColor">
                    <input type="hidden" name="scheduleAlarm" value="N">
                    <button class="btn--close" type="button"></button>
                    <h3>일정 등록</h3>
                    <ul>
                        <li>
                            <label class="mr-20" for="">일정명</label><input type="text" name="scheduleTitle">
                        </li>
                        <li class="li--colors">
                            <label class="mr-20" for="">색 선택</label>
                            <div class="colors">
                                <span class="selected" style="background-color: rgb(195,96,96);"></span>
                                <span style="background-color: rgb(212,137,100);"></span>
                                <span style="background-color: rgb(215,195,26);"></span>
                                <span style="background-color: rgb(137,198,77);"></span>
                                <span style="background-color: rgb(85,127,79);"></span>
                                <span style="background-color: rgb(74,133,132);"></span>
                                <span style="background-color: rgb(25,44,106);"></span>
                                <span style="background-color: rgb(82,38,109);"></span>
                            </div>
                        </li>
                        <li>
                            <label class="mr-20" for="">일시</label><input type="datetime-local"
                                name="scheduleStartDate">&nbsp;&nbsp;~&nbsp;&nbsp;<input type="datetime-local"
                                name="scheduleEndDate">
                        </li>
                        <li class="categories">
                            <label class="mr-20" for="">일정구분</label>
                            <div class="fz-0">
                                <c:if test="${sessionScope.emplId ne 'admin'}">
                                    <input id="valueA" name="scheduleCategory" type="radio" value="개인" checked>
                                    <label class="mr-20" for="valueA">개인일정</label>
                                    <input id="valueB" name="scheduleCategory" type="radio" value="부서">
                                    <label class="mr-20" for="valueB">부서일정</label>
                                </c:if>
                                <c:if test="${sessionScope.emplId eq 'admin'}">
                                    <input id="valueC" name="scheduleCategory" type="radio" value="전사">
                                    <label for="valueC">전사일정</label>
                                </c:if>
                            </div>
                        </li>
                        <li>
                            <label class="mr-20" for="">장소</label><input type="text" name="schedulePlace">
                        </li>
                        <li>
                            <label class="mr-20" for="">내용</label>
                            <textarea name="scheduleConts" id="" cols="20" rows="4"
                                placeholder="상세내용을 입력하세요."></textarea>
                        </li>
                        <li>
                            <label class="mr-20" for="">알림여부</label>
                            <input id="scheduleAlarm" type="checkbox" onclick="getAlarm(this);">
                            <label for="scheduleAlarm" onclick="getAlarm(this.previousSibling);">일정 전날 알림</label>
                        </li>
                    </ul>
                    <div class="btns-wrap mt-20 t-r">
                        <button class="point" type="submit">확인</button>
                        <button class="finished closeWindow" type="button">닫기</button>
                    </div>
                </form>
            </section>

            <ul>
                <li>
                    <a href="">내 캘린더</a>
                    <ul class="ul--category">
                        <li><input id="company" type="checkbox" checked><label for="company">전사 일정</label></li>
                        <c:if test="${sessionScope.emplId ne 'admin'}">
                            <li><input id="team" type="checkbox" checked><label for="team">부서 일정</label></li>
                            <li><input id="personal" type="checkbox" checked><label for="personal">개인 일정</label></li>
                        </c:if>
                    </ul>
                </li>
            </ul>
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
        let emplId = '${sessionScope.emplId}';
        
        // 입력값 초기화 함수
        function openCleanedScheduleModal() {
            // 스케쥴 넘버 제거
            if($('input[name="scheduleNo"]').length != 0) {
                $('input[name="scheduleNo"]').remove();
            }
            
            // 일정 삭제 버튼 제거
            if($('.btns-wrap a.delete').length != 0) {
                $('.btns-wrap a.delete').remove();
            }

            // 전송 주소 수정
            $('.modal--shcedule').attr('action', '/schedule/write.hirp');

            // 텍스트 원래대로
            $('.modal--shcedule h3').text('일정 등록');
            $('.btns-wrap button[type="submit"]').text('확인');

            // 입력값 리셋
            $('input[name="scheduleNo"]').val('');
            $('input[name="scheduleTitle"]').val('');
            $('input[name="scheduleStartDate"]').val('');
            $('input[name="scheduleEndDate"]').val('');
            $('input[name="schedulePlace"]').val('');
            $('textarea[name="scheduleConts"]').val('');

            // 시작일 변경 시 마감일을 시작일과 같은 날로 세팅
            $('input[name="scheduleStartDate"]').on('change', function(){
                let startDate = $(this).val();
                if($('input[name="scheduleEndDate"]').val() == '') {
                    $('input[name="scheduleEndDate"]').val(startDate);
                }
            });

            // 선택색상 첫 순서 색으로 리셋
            $('.colors span').removeClass('selected');
            $('.colors span:first-of-type').addClass('selected');

            let defaultColor = $('.colors span:first-of-type').css('background-color');
            $('input[name="scheduleColor"]').val('defaultColor');

            // 카테고리 세팅
            $('.categories').css('display', 'block');
            $('.categories div>*').css('display', 'inline-block');
            if(emplId != 'admin') {
                $('input[value="전사"]').prop('checked', false);
                $('input[value="부서"]').prop('checked', false);
                $('input[value="개인"]').prop('checked', true);
            } else {
                $('input[value="전사"]').prop('checked', true);
            }

            // 알림 여부 세팅
            document.getElementsByName('scheduleAlarm')[0].value = 'N';
            $('#scheduleAlarm').prop('checked', false);

            // 모달 열기
            $('.section--modal').css('display', 'flex');
        }

        // 모달에 입력값 세팅 함수
        function openScheduleModal(data) {
            // 부서 일정일 경우 등록한 사람(팀장)만 수정할 수 있도록 조건문 추가, 아닐 경우 일반 텍스트로 표출

            // 스케쥴 넘버 전송용 인풋 추가
            if($('input[name="scheduleNo"]').length == 0) {
                $('.modal--shcedule').prepend('<input type="hidden" name="scheduleNo">');
            }

            // 일정 삭제 버튼 추가
            if($('.btns-wrap a.delete').length == 0) {
                $('.btns-wrap').prepend('<a class=\"delete\" href="">일정 삭제</a>');
                // 전사 일정일 경우
                if(data.event.extendedProps.scheduleCategory == '전사') {
                    $('.btns-wrap a.delete').attr('href', '/schedule/deleteCompanySchedule.hirp?scheduleNo='+ data.event.extendedProps.scheduleNo);
                } else {
                    $('.btns-wrap a.delete').attr('href', '/schedule/delete.hirp?scheduleNo='+ data.event.extendedProps.scheduleNo);
                }
            }

            if(data.event.extendedProps.scheduleCategory == '전사') {
                    $('.btns-wrap a.delete').attr('href', '/schedule/deleteCompanySchedule.hirp?scheduleNo='+ data.event.extendedProps.scheduleNo);
            } else {
                $('.btns-wrap a.delete').attr('href', '/schedule/delete.hirp?scheduleNo='+ data.event.extendedProps.scheduleNo);
            }

            // 전송 주소 수정
            $('.modal--shcedule').attr('action', '/schedule/modify.hirp');

            // 기존 텍스트 수정
            $('.modal--shcedule h3').text('일정 상세보기');
            $('.btns-wrap button[type="submit"]').text('수정');

            // 기존 입력값 세팅
            let startDate = data.event.startStr.split(':');
            let endDate = data.event.endStr.split(':');
            
            $('input[name="scheduleNo"]').val(data.event.extendedProps.scheduleNo);
            $('input[name="scheduleTitle"]').val(data.event.title);
            $('input[name="scheduleStartDate"]').val(startDate[0]+':'+startDate[1]);
            $('input[name="scheduleEndDate"]').val(endDate[0]+':'+endDate[1]);
            $('input[name="schedulePlace"]').val(data.event.extendedProps.schedulePlace);
            $('textarea[name="scheduleConts"]').val(data.event.extendedProps.scheduleConts);            

            // 선택색상 세팅
            $('input[name="scheduleColor"]').val(data.event.backgroundColor);
            $('.colors span').removeClass('selected');
            for(let i=1; i <= $('.colors span').length; i++) {
                if($('.colors span:nth-child('+i+')').css('background-color') == data.event.backgroundColor) {
                    $('.colors span:nth-child('+i+')').addClass('selected');
                }
            }

            // 카테고리 세팅
            if(emplId != 'admin') {
                if(data.event.extendedProps.scheduleCategory == '전사') {
                    $('input[value="전사"]').prop('checked', true);
                    $('.btns-wrap').css('display', 'none');
                    $('.modal--shcedule h3').append('<span>※ 전사 일정은 관리팀에서만 수정 가능합니다.</span>');
                    $('.categories').css('display', 'none');
                    $('input[value="개인"], input[value="개인"]+label').css('display', 'none');
                    $('input[value="부서"], input[value="부서"]+label').css('display', 'none');
                } else if(data.event.extendedProps.scheduleCategory == '부서') {
                    $('input[value="부서"]').prop('checked', true);
                    $('.btns-wrap').css('display', 'block');
                    $('.categories').css('display', 'block');
                    $('input[value="전사"], input[value="전사"]+label').css('display', 'none');
                    $('input[value="개인"], input[value="개인"]+label').css('display', 'inline-block');
                    $('input[value="부서"], input[value="부서"]+label').css('display', 'inline-block');
                    if($('.modal--shcedule h3 span').length != 0) {
                        $('.modal--shcedule h3 span').remove();
                    }
                } else { // 개인 일정
                    $('input[value="개인"]').prop('checked', true);
                    $('input[value="전사"], input[value="전사"]+label').css('display', 'none');
                    $('input[value="개인"], input[value="개인"]+label').css('display', 'inline-block');
                    $('input[value="부서"], input[value="부서"]+label').css('display', 'inline-block');
                    $('.btns-wrap').css('display', 'block');
                    $('.categories').css('display', 'block');
                    if($('.modal--shcedule h3 span').length != 0) {
                        $('.modal--shcedule h3 span').remove();
                    }
                }
            } else {// 관리자일 경우
                if(data.event.extendedProps.scheduleCategory == '전사') {
                    $('input[value="전사"]').prop('checked', true);
                    $('input[value="전사"], input[value="전사"]+label').css('display', 'inline-block');
                    $('input[value="개인"], input[value="개인"]+label').css('display', 'none');
                    $('input[value="부서"], input[value="부서"]+label').css('display', 'none');
                }
            }

            // 알림 여부 세팅
            if(data.event.extendedProps.scheduleAlarm == 'Y') {
                document.getElementsByName('scheduleAlarm')[0].value = 'Y';
                $('#scheduleAlarm').prop('checked', true);
            } else {
                document.getElementsByName('scheduleAlarm')[0].value = 'N';
                $('#scheduleAlarm').prop('checked', false);
            }

            // 모달 열기
            $('.section--modal').css('display', 'flex');
        }

        // 셀렉트한 날짜 세팅하여 열기
        function openSelectedScheduleModal(selectionInfo) {
            openCleanedScheduleModal();
            let startDate = selectionInfo.startStr;
            let endDateFull = selectionInfo.endStr.split('-');
            let dayOfEndDate = parseInt(endDateFull[2])-1;
            if(dayOfEndDate<10) {
                dayOfEndDate = '0' + dayOfEndDate;
            }
            let endDate = endDateFull[0]+ '-' +endDateFull[1]+ '-' +dayOfEndDate;

            $('input[name="scheduleStartDate"]').val(startDate+'T09:00');
            $('input[name="scheduleEndDate"]').val(endDate+'T18:00');
        }

        let calendarEl = document.getElementById('calendar');
        let calendar = new FullCalendar.Calendar(calendarEl, {
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
            navLinks: false, 
            selectable: true,
            //selectMirror: true,
            locale: 'ko',
            events: [
                <c:forEach items="${sListCompany }" var="sCompany">
                {
                    title: '${sCompany.scheduleTitle }',
                    start: '${sCompany.scheduleStartDate }',
                    end: '${sCompany.scheduleEndDate }',
                    backgroundColor: '${sCompany.scheduleColor }',
                    borderColor: '${sCompany.scheduleColor }',
                    className: 'category-all',
                    extendedProps: {
                        'scheduleNo': '${sCompany.scheduleNo }',
                        'scheduleCategory': '전사',
                        'schedulePlace': '${sCompany.schedulePlace }',
                        'scheduleConts': '${sCompany.scheduleConts }',
                        'scheduleAlarm': '${sCompany.scheduleAlarm }'
                    }
                },
                </c:forEach>
                <c:forEach items="${sListTeam }" var="sListTeam">
                {
                    title: '${sListTeam.scheduleTitle }',
                    start: '${sListTeam.scheduleStartDate }',
                    end: '${sListTeam.scheduleEndDate }',
                    backgroundColor: '${sListTeam.scheduleColor }',
                    borderColor: '${sListTeam.scheduleColor }',
                    className: 'category-team',
                    extendedProps: {
                        'scheduleNo': '${sListTeam.scheduleNo }',
                        'scheduleCategory': '부서',
                        'schedulePlace': '${sListTeam.schedulePlace }',
                        'scheduleConts': '${sListTeam.scheduleConts }',
                        'scheduleAlarm': '${sListTeam.scheduleAlarm }'
                    }
                },
                </c:forEach>
                <c:forEach items="${sListPersonal }" var="sPersonal">
                {
                    title: '${sPersonal.scheduleTitle }',
                    start: '${sPersonal.scheduleStartDate }',
                    end: '${sPersonal.scheduleEndDate }',
                    backgroundColor: '${sPersonal.scheduleColor }',
                    borderColor: '${sPersonal.scheduleColor }',
                    className: 'category-personal',
                    extendedProps: {
                        'scheduleNo': '${sPersonal.scheduleNo }',
                        'scheduleCategory': '개인',
                        'schedulePlace': '${sPersonal.schedulePlace }',
                        'scheduleConts': '${sPersonal.scheduleConts }',
                        'scheduleAlarm': '${sPersonal.scheduleAlarm }'
                    }
                },
                </c:forEach>
            ],
            eventClick: function(data) {
                openScheduleModal(data); //이벤트 클릭 시 모달 호출
            },
            select: function(selectionInfo) {
                openSelectedScheduleModal(selectionInfo);	//일자 클릭 시 모달 호출
            },
            editable: false,
            dayMaxEvents: true,
            eventLimit: true,
        });
        calendar.render();
    </script>
    <script src="../../../resources/js/schedule.js"></script>
</body>

</html>