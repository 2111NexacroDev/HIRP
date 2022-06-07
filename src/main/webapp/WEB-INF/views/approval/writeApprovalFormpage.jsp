<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>

</head>

<body>
    <%@ include file="/WEB-INF/views/approval/approvalCommonPage.jsp" %>

            <h1 class="basic-border-bottom">
            <c:if test="${not empty msg }">${msg}</c:if>
            <c:if test="${empty msg}">결재폼 만들기</c:if>
            </h1>

            <div id="guide" class="subConts">
                <!-- 여백 필요 없을 경우 클래스에 padding-0 추가, 
            	필요 없으면 지울 것 -->
       
       			<c:if test="${msg ne '결재양식조회'}">
      			 <form action="/register/apprForm.hirp" method="post">  
      			 <input type="hidden" value="${emplId}" name="emplId">  
                <div><input type="text" size="135" name="formTitle" placeholder="등록할 결재폼명을 입력해주세요"></div>
                <textarea id="summernote" name="formContents"></textarea>
                	<button type="submit" class="point mt-20" style="float:right;">등록하기</button>
                </form>
                </c:if>	
                
                <c:if test="${msg eq '결재양식조회'}">
                <form action="/modify/apprForm.hirp" method="post">
                <input type="hidden" value="${apprform.formNo}" name="formNo">     
                <div><input type="text" size="135" name="formTitle" value="${apprform.formTitle }"></div>
                <textarea id="summernote" name="formContents" >${apprform.formContents }</textarea>
						<c:url var="aDelete" value="/remove/apprForm.hirp">
							<c:param name="formNo" value="${apprform.formNo} "></c:param>
						</c:url>
						<button class="emergency mt-20" type="button" style="float:right;" onclick="openAlert(this);">삭제하기</button>
		                    <section class="section--alert">
		                        <div class="bg-black"></div>
		                        <!-- 검은배경 필요할 경우, 필요없으면 이 태그 통째로 지우기 -->
		                        <div class="section--alert__conts">
		                            <button class="btn--close" type="button"></button>
		                            <p>
		                                확인을 누르시면<br>
		                           양식이 삭제됩니다. 삭제하시겠습니까?
		                            </p>
		                            
		                            <div class="btns-wrap mt-20">
			                            
		                                <button class="point" type="button" onclick="location.href='${aDelete }'">확인</button>
		                                <button class="finished closeWindow" type="button">닫기</button>
		                            </div>
		                        </div>
		                    </section>
                	<button type="submit" class="point mt-20" style="float:right; margin-right:10px;">수정하기</button>
                </form>
                </c:if>	
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