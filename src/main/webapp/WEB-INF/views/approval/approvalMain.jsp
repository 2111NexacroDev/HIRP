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
            <h1>전자결재</h1>
            <a class="btn--function" class="basic" type="button" onclick="openModal(this);">새 결재 진행</a>
                    <section class="section--modal">
                        <div class="bg-black"></div>
                        <!-- 검은배경 필요할 경우, 필요없으면 이 태그 통째로 지우기 -->
                        <div class="section--modal__conts">
                            <button class="btn--close"></button>
                            <h3>모달창</h3>
                            <p class="mb-20">
                              
                            </p>
                            <ul>
                                <li>
                                    <label for="">항목1</label><input type="text" name="">
                                </li>
                                <li>
                                    <label for="">항목2</label><input type="text" name="">
                                </li>
                                <li>
                                    <label for="">항목3</label><input type="date" name="">
                                </li>
                            </ul>
                            <div class="btns-wrap mt-20 t-r">
                                <button class="point" type="button">확인</button>
                                <button class="finished closeWindow" type="button">닫기</button>
                            </div>
                        </div>
                    </section>
            <ul>
                <li>
                    <a href="">결재하기</a>
                    <ul>
                        <li><a href="#">결재문서함</a></li>
                    </ul>
                </li>
                 <li>
                    <a href="">기안문서함</a>
                    <ul>       
                        <li><a href="#">상신문서함</a></li>
                        <li><a href="#">임시문서함</a></li>
                        <li><a href="#">반려문서함</a></li>
                        <li><a href="#">결재완료함</a></li>
                    </ul>
                </li>
                <li>
                    <a href="">참조함</a>
                    <ul>       
                        <li><a href="#">참조문서함</a></li>
                        <li><a href="#">열람문서함</a></li>
                    </ul>
                </li>
            </ul>
        </aside>

        <article id="sub" class="">
       
            <%@ include file="/WEB-INF/views/include/inc_nav_right.jsp" %>

           
            <h1 class="basic-border-bottom">전자결재 홈</h1>

            <div id="guide" class="subConts">
                <!-- 여백 필요 없을 경우 클래스에 padding-0 추가, 
            	필요 없으면 지울 것 -->

               
                 <!-- 칸 나누는 법 예시 -->
                <div class="grid-guide-wrap  padding-20 mt-20">
                  
                    <div class=" row mt-20 " >
                        <!-- <h4 class="col-12 mb-20">자식 요소 높이 통일 필요할 경우</h4> -->
                        <div class="col-3">
                            <div class="bor-round shadow" style="height:180px;">결재대기1</div>
                        </div>
                        <div class="col-3">
                            <div class="bor-round shadow" style="height:180px;">결재대기2</div>
                        </div>
                        <div class="col-3">
                            <div class="bor-round shadow" style="height:180px;">결재대기3</div>
                        </div>
                        <div class="col-3">
                            <div class="bor-round shadow" style="height:180px;">결재대기4</div>
                        </div>
                    </div>
                </div>
               
            </div>
               
               

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
               
              
        </article>
    </div>
</body>

</html>