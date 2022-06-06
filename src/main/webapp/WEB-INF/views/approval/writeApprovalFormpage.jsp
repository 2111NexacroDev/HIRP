<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>

</head>

<body>
    <%@ include file="/WEB-INF/views/approval/approvalCommonPage.jsp" %>

       <form action="/register/apprForm.hirp" method="post">    
            <h1 class="basic-border-bottom">결재폼 만들기</h1>

            <div id="guide" class="subConts">
                <!-- 여백 필요 없을 경우 클래스에 padding-0 추가, 
            	필요 없으면 지울 것 -->
       
                <div><input type="text" size="135" name="formTitle" placeholder="등록할 결재폼명을 입력해주세요"></div>
                <textarea id="summernote" name="formContents"></textarea>
                </form>
                	<button type="submit" class="point mt-20" style="float:right;">등록하기</button>
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