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
            <h1>
                프론트 가이드
            </h1>
            <a class="btn--function" href="#">등록 버튼</a>

            snb 메뉴디자인
        </aside>

        <article id="sub" class="">
            <!--
                같은 기능일 때 id가 class보다 우선순위가 높음.
                id는 보통 절대 겹치면 안되는 것,
                백엔드 기능 개발에 쓰는 경우 많이 줌

                **클래스 작성 법
                사람마다 다른데 난 bem 이라는 방법론으루! 검색하면 나와~
                상위 요소의 자식 태그인 걸 나타내고 싶을 땐 __ 언더스코어 두 개,
                적용하고 싶은 요소의 특성을 쓸 땐 -- 줄표 두 개로 쓰는 법이구
                그냥 띄어쓰기 하고 싶을 땐 - 줄표 하나로 써(_ <- 요거 하나로 쓰는 사람도 있음)
                이거 하기 어려우면 그냥 줄표로만 구분해줘도 돼~
            -->
            <%@ include file="/WEB-INF/views/include/inc_nav_right.jsp" %>

            <h1 class="basic-border-bottom">
                가이드페이지
            </h1>

            <div id="guide" class="subConts">
                <!-- 여백 필요 없을 경우 클래스에 padding-0 추가, 
            	필요 없으면 지울 것 -->

                <input type="text" placeholder="플레이스 홀더 예시">

                <table class="table--basic mt-20">
                    <thead>
                        <tr>
                            <th>제목1</th>
                            <th>제목2</th>
                            <th>제목3</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>내용1</td>
                            <td>내용2</td>
                            <td>내용3</td>
                        </tr>
                        <tr>
                            <td>내용1</td>
                            <td>내용2</td>
                            <td>내용3</td>
                        </tr>
                    </tbody>
                </table>

                <button class="basic mt-20" type="button">기본</button>
                <button class="point mt-20" type="button">포인트컬러 들어간 버튼</button>
                <button class="ongoing mt-20" type="button">진행중</button>
                <button class="finished mt-20" type="button">완료</button>
                <button class="emergency mt-20" type="button">긴급</button>

                <div class="basic-border bor-round mt-20 padding-20">
                    모서리 둥글 경우 사용

                    <p class="color-point mt-20">글자색이 강조색이어야 할 경우</p>
                    <p class="bg-point color-white mt-20">배경색이 강조색이어야 할 경우</p>
                </div>

                <textarea name="" id="" class="mt-20" cols="30" rows="5">
공통디자인에서 약간 변경될 경우 클래스 추가해서
바뀌는 부분 css 작성하면 됩니다.
예를 들어, 현재 디자인 상태에서 테두리 색만 바꾸고 싶을 때
클래스를 추가해서 css 지정해주면 돼!
                </textarea>

                <textarea name="" id="" class="mt-20 bor-red" cols="30" rows="3">이거처럼</textarea>
                <!--
                    css에
                    .border-red {
                        border: 1px solid red;
                    }
                    추가
                -->

                <!-- 체크박스랑 래디오 쓸 때 라벨 꼭 데리고 다니기, id와 for는 같아야함 -->
                <input id="valueA" class="mt-20" name="samevalue" type="radio" value="래디오1">
                <label for="valueA">예시값1</label><br>

                <input id="valueB" class="mt-20" name="samevalue" type="radio" value="래디오2">
                <label for="valueB">예시값2</label><br>

                <input class="mt-20" type="date"><br>

                <input id="check1" class="mt-20" type="checkbox">
                <label for="check1">체크박스값</label><br>

                <select class="mt-20" name="" id="">
                    <option value="">옵션1</option>
                    <option value="">옵션2</option>
                    <option value="">옵션3</option>
                </select>

                <div class="basic-border mt-20 padding-20">
                    <button class="basic" type="button" onclick="openAlert(this);">안내창 띄움</button>
                    <section class="section--alert">
                        <div class="bg-black"></div>
                        <!-- 검은배경 필요할 경우, 필요없으면 이 태그 통째로 지우기 -->
                        <div class="section--alert__conts">
                            <button class="btn--close"></button>
                            <p>
                                확인을 누르시면<br>
                                ~~이 진행됩니다. 삭제하시겠습니까?
                            </p>
                            <div class="btns-wrap mt-20">
                                <button class="point" type="button">확인</button>
                                <button class="finished closeWindow" type="button">닫기</button>
                            </div>
                        </div>
                    </section>

                    <button class="basic" type="button" onclick="openModal(this);">모달창 띄움</button>
                    <section class="section--modal">
                        <div class="bg-black"></div>
                        <!-- 검은배경 필요할 경우, 필요없으면 이 태그 통째로 지우기 -->
                        <div class="section--modal__conts">
                            <button class="btn--close"></button>
                            <h3>모달창</h3>
                            <p class="mb-20">
                                필요한 내용 쫘르륵
                                최대값 화면의 800px,
                                많이 입력하면 너비 넓어지게 만들어둠
                            </p>
                            <label class="mr-20" for="">항목1</label><input type="text" placeholder="입력">
                            <div class="btns-wrap mt-20 t-r">
                                <button class="point" type="button">확인</button>
                                <button class="finished closeWindow" type="button">닫기</button>
                            </div>
                        </div>
                    </section>
                </div>

                <!-- 칸 나누는 법 예시 -->
                <div class="grid-guide-wrap basic-border padding-20 mt-20">
                    <h3>
                        칸 나누기
                    </h3>

                    <div class="row mt-20">
                        <h4 class="col-12 mb-20">2등분</h4>
                        <div class="col-6">
                            <div>칸</div>
                        </div>
                        <div class="col-6">
                            <div>칸</div>
                        </div>
                    </div>

                    <div class="row mt-20">
                        <h4 class="col-12 mb-20">3등분</h4>
                        <div class="col-4">
                            <div>칸</div>
                        </div>
                        <div class="col-4">
                            <div>칸</div>
                        </div>
                        <div class="col-4">
                            <div>칸</div>
                        </div>
                    </div>

                    <div class="row mt-20">
                        <h4 class="col-12 mb-20">4등분</h4>
                        <div class="col-3">
                            <div>칸</div>
                        </div>
                        <div class="col-3">
                            <div>칸</div>
                        </div>
                        <div class="col-3">
                            <div>칸</div>
                        </div>
                        <div class="col-3">
                            <div>칸</div>
                        </div>
                    </div>

                    <div class="row mt-20 no-space">
                        <h4 class="col-12 mb-20">여백 필요 없을 경우</h4>
                        <div class="col-3">
                            <div>칸</div>
                        </div>
                        <div class="col-3">
                            <div>
                                칸<br>
                                칸<br>
                                칸<br>
                                칸<br>
                                칸<br>
                                칸<br>
                                칸<br>
                                칸<br>
                                칸<br>
                                칸<br>
                                칸<br>
                            </div>
                        </div>
                        <div class="col-3">
                            <div>칸</div>
                        </div>
                        <div class="col-3">
                            <div>칸</div>
                        </div>
                    </div>

                    <div class="row mt-20 child-same-height">
                        <h4 class="col-12 mb-20">자식 요소 높이 통일 필요할 경우</h4>
                        <div class="col-3">
                            <div>칸</div>
                        </div>
                        <div class="col-3">
                            <div>
                                칸<br>
                                칸<br>
                                칸<br>
                                칸<br>
                                칸<br>
                                칸<br>
                                칸<br>
                                칸<br>
                                칸<br>
                                칸<br>
                                칸<br>
                            </div>
                        </div>
                        <div class="col-3">
                            <div>칸</div>
                        </div>
                        <div class="col-3">
                            <div>칸</div>
                        </div>
                    </div>
                </div>
                <!-- 칸 나누는 법 예시 끝 -->

                <div class="row child-same-height mt-20">
                    <div class="col-6">
                        <div class="basic-border shadow-darken">
                            <p class="padding-20">그림자 진함</p>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="basic-border shadow">
                            <p class="padding-20">그림자 연함</p>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    </div>
</body>

</html>