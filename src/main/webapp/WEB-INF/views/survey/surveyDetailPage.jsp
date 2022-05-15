<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<!-- 설문조사 응답 페이지 (상세1) -->
<body>
	<!-- survey 공통 -->
	<%@ include file="/WEB-INF/views/survey/surveyCommonPage.jsp" %>
        
        <!-- 우측 메인 -->
        <article id="sub" class="">
        	<!-- 메인 상단 -->
        	<!-- 우측 상단 바로가기 메뉴 -->
        	<%@ include file="/WEB-INF/views/include/inc_nav_right.jsp" %>
        	
        	<!-- 검색폼 필요한 사람 쓰기, class 변경 안하고 id만 부여해서 사용하면 됨 -->
            <form class="form--srch" action="">
                <input type="text" name="" placeholder="통합검색">
                <button type="submit"></button>
            </form>

            <h1 class="basic-border-bottom">설문 상세</h1>
            <!-- 메인 상단 끝 -->
            
            <!-- 페이지 내용 -->
            <div id="" class="subConts">
                <!-- 설문 정보 -->
                <h2 class="mb-20">설문조사 제목</h2>
                <p class="mb-10">작성자: 작성자 이름</p>
                <p class="mb-10">작성일 : 작성일 날짜</p>
                <p class="mb-10">설문 기간 : 시작 날짜 ~ 끝나는 날짜</p>
                <p class="mb-10">참여 후 수정 : 허용</p>
                <p class="mb-10">설문 결과 : 공개</p>
                <!-- 응답자 정보 -->
                <div class="row mt-20" style="">
                    <div class=" basic-border bor-round ml-10 mr-10 padding-10">
                        <div class="">전체 참여자</div>
                        <div class="contents-strong padding-top-10">30</div>
                    </div>
                    <div class="basic-border bor-round mr-10 padding-10">
                        <div>참여완료</div>
                        <div class="contents-strong padding-top-10">20</div>
                    </div>
                    <div class="basic-border bor-round mr-10 padding-10">
                        <div>미참여</div>
                        <div class="contents-strong padding-top-10">10</div>
                    </div>
                </div>
                <br>
                <!--시작 안내 문구-->
                <div class="row mt-20 padding-20 bc-grey">
                    시작 안내 문구입니다. 주저리 주저리....
                </div>
                <br>
                <!--문항 시작-->
                <!--문항 div -> 문항 제목 p태그 + 내용 담는 div -> 내용 담는 div 안에 유형에 맞게 다른 내용 들어감.-->
                <div class="mt-20 mb-20">
                    <!--객관식 하나만 선택-->
                    <p class="mb-10 contents-strong">1. 1번 문항 내용</p>
                    <div class="mt-20 ml-20">
                        <div class="mb-10">
                            <input id="valueA" class="mt-20" name="samevalue" type="radio" value="래디오1">
                            <label for="valueA">예시값1</label><br>
                        </div>
                        <div class="mb-10">
                            <input id="valueB" class="mt-20" name="samevalue" type="radio" value="래디오2">
                            <label for="valueB">예시값2</label><br>
                        </div>
                        <div class="mb-10">
                            <input id="valueC" class="mt-20" name="samevalue" type="radio" value="래디오3">
                            <label for="valueC">예시값3</label><br>
                        </div>
                        <div class="mb-10">
                            <input id="valueD" class="mt-20" name="samevalue" type="radio" value="래디오4">
                            <label for="valueD">예시값4</label><br>
                        </div>
                    </div>
                </div>
                <br>
                <div class="mt-20 mb-20">
                    <!--객관식 중복 선택 가능-->
                    <p class="mb-10 contents-strong">1. 1번 문항 내용</p>
                    <div class="mt-20 ml-20">
                        <div class="mb-10">
                            <input id="check1" class="mt-20" type="checkbox">
                            <label for="check1">체크박스값</label><br>
                        </div>
                        <div class="mb-10">
                            <input id="check2" class="mt-20" type="checkbox">
                            <label for="check2">체크박스값</label><br>
                        </div>
                        <div class="mb-10">
                            <input id="check3" class="mt-20" type="checkbox">
                            <label for="check3">체크박스값</label><br>
                        </div>
                        <div class="mb-10">
                            <input id="check4" class="mt-20" type="checkbox">
                            <label for="check4">체크박스값</label><br>
                        </div>
                    </div>
                </div>
                <br>
                <div class="mt-20 mb-20">
                    <!--주관식 단문형 -->
                    <p class="mb-10 contents-strong">1. 1번 문항 내용</p>
                    <div class="mt-20 ml-20">
                        <input type="text" class="" style="width:90%" placeholder="플레이스 홀더 예시">
                    </div>
                </div>
                <br>
                <div class="mt-20 mb-20">
                    <!--주관식 장문형 -->
                    <p class="mb-10 contents-strong">1. 1번 문항 내용</p>
                    <div class="mt-20 ml-20">
                        <textarea name="" id="" style="width:90%" cols="20" rows="3">
    내용1
                        </textarea>
                    </div>
                </div>
                <!--문항 끝-->
                <br>
                <!-- 설문 제출 / 취소 버튼 -->
                <div class="t-c">
                    <button class="point mt-20" type="button" onclick="openAlert(this);">설문 제출</button>
                    <section class="section--alert">
                        <div class="bg-black"></div>
                        <!-- 검은배경 필요할 경우, 필요없으면 이 태그 통째로 지우기 -->
                        <div class="section--alert__conts">
                            <button class="btn--close" type="button"></button>
                            <p>
                                설문 응답을 제출하시겠습니까?
                            </p>
                            <div class="btns-wrap mt-20">
                                <button class="point" type="button">확인</button>
                                <button class="finished closeWindow" type="button">닫기</button>
                            </div>
                        </div>
                    </section>
                    <!-- 다음 버튼 눌렀을 때 설문조사 작성할 건지 한번 더 물어보는 창 띄우기
                        뒤로가기 안되게 -->
                    &nbsp;&nbsp;&nbsp;
                    <button class="basic mt-20" type="button">취소</button>
                </div>
            </div>
            <!-- 페이지 내용 끝 -->
        </article>
</body>
</html>