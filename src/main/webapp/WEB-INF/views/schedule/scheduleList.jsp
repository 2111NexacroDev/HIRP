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
                <form class="section--modal__conts modal--shcedule" action="/schedule/write.hirp" method="post"
                    enctype="multipart/form-data">
                    <input type="hidden" name="scheduleColor">
                    <button class="btn--close"></button>
                    <h3>일정 등록</h3>

                    <ul>
                        <li>
                            <label class="mr-20" for="">일정명</label><input type="text" name="scheduleTitle">
                        </li>
                        <li class="li--colors">
                            <label class="mr-20" for="">색 선택</label>
                            <div class="colors">
                                <span style="background-color: #f3cccc;"></span>
                                <span style="background-color: #f5c2a9;"></span>
                                <span style="background-color: #f5f4a9;"></span>
                                <span style="background-color: #d0de41;"></span>
                                <span style="background-color: #89c64d;"></span>
                                <span style="background-color: #cde7c9;"></span>
                                <span style="background-color: #8fd0cf;"></span>
                                <span style="background-color: #c6b7cf;"></span>

                            </div>
                        </li>
                        <li>
                            <label class="mr-20" for="">일시</label><input type="date"
                                name="scheduleStartDate">&nbsp;&nbsp;~&nbsp;&nbsp;<input type="date"
                                name="scheduleEndDate">
                        </li>
                        <li>
                            <label class="mr-20" for="">일정구분</label>
                            <div class="fz-0">
                                <input id="valueA" name="scheduleCategory" type="radio" value="개인" checked>
                                <label class="mr-20" for="valueA">개인일정</label>
                                <input id="valueB" name="scheduleCategory" type="radio" value="부서">
                                <label class="mr-20" for="valueB">부서일정</label>
                                <input id="valueC" name="scheduleCategory" type="radio" value="전사">
                                <label for="valueC">전사일정</label>
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
                            <input id="scheduleAlarm" type="checkbox">
                            <label for="scheduleAlarm">일정 전날 알림</label>
                        </li>
                    </ul>

                    <div class="btns-wrap mt-20 t-r">
                        <button class="point" type="submit">확인</button>
                        <button class="finished closeWindow" type="button">닫기</button>
                    </div>
                </form>
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

    <script src="../../../resources/js/schedule.js"></script>
</body>

</html>