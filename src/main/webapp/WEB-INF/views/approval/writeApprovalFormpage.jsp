<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<%@ include file="/WEB-INF/views/include/inc_head.jsp" %>
<link rel="stylesheet" href="../../../resources/css/sub.css"><!-- 하이알피 서브페이지 CSS -->
  <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
    <link href="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-lite.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-lite.min.js"></script>
</head>

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
                               <div>
		                            <div class="bor-round shadow" style="width: 250px; height:180px;">
		                            <a href="/approval/form.hirp">기안서</a><br>
		                            <a>지출결의서</a><br>
		                            <a>휴가신청서</a><br>
		                            </div>
                      		  </div>
                            </p>
                           <div >
                           </div>
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

       <form action="/register/apprForm.hirp" method="post">    
            <h1 class="basic-border-bottom">결재폼 만들기</h1>

            <div id="guide" class="subConts">
                <!-- 여백 필요 없을 경우 클래스에 padding-0 추가, 
            	필요 없으면 지울 것 -->
       
                <div>제목<input type="text" size="100" name="formTitle"></div>
                <textarea id="summernote" name="formContents"></textarea>
                </form>
                	<button type="submit" style="border: 1px solid #ddd; outline: none;">전송</button>
    <script>
      $('#summernote').summernote({
        placeholder: 'Hello stand alone ui',
        tabsize: 2,
        height: 500,
        toolbar: [
		    // [groupName, [list of button]]
		    ['fontname', ['fontname']],
		    ['fontsize', ['fontsize']],
		    ['style', ['bold', 'italic', 'underline','strikethrough', 'clear']],
		    ['color', ['forecolor','color']],
		    ['table', ['table']],
		    ['para', ['ul', 'ol', 'paragraph']],
		    ['height', ['height']],
		    ['insert',['picture','link','video','hr']],
		    ['view', ['fullscreen', 'codeview', 'help']]
		  ],
		fontNames: ['Arial', 'Arial Black', 'Comic Sans MS', 'Courier New','맑은 고딕','궁서','굴림체','굴림','돋움체','바탕체'],
		fontSizes: ['8','9','10','11','12','14','16','18','20','22','24','28','30','36','50','72']
      });
    </script>     
               
              
        </article>
    </div>