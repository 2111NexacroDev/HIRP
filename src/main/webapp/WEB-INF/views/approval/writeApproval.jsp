<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<%@ include file="/WEB-INF/views/include/inc_head.jsp" %>
<link rel="stylesheet" href="../../../resources/css/sub.css"><!-- 하이알피 서브페이지 CSS -->

 <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
    <link href="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-lite.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-lite.min.js"></script>
<style>
#approvalLine-btn{
background-color : white;
border : solid 1px #888;
border-radius: 4px;
margin-top : 10px;
margin-right : 30px;

width : 80px;
height : 35px;
float : right;
}



</style>


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
                            <h3>결재양식 선택</h3>
                            <p class="mb-20">
                               <div>
		                            <div class="bor-round shadow" id="formListDiv" style="width: 250px; height:180px;">
		                            <ul>
		                            <c:forEach var="form" items="${formList }" >
		                            	<c:url var="fDetail" value="/approvalForm/detail.hirp">
		                            		<c:param name="formNo" value="${form.formNo }"></c:param>
		                            	</c:url>
									<li><a href="${fDetail }">${form.formTitle }</a></li>
		                            </c:forEach>
		                            </ul>
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

           
            <h1 class="basic-border-bottom">기안하기</h1>

            <div id="guide" class="subConts">
                <!-- 여백 필요 없을 경우 클래스에 padding-0 추가, 
            	필요 없으면 지울 것 -->
            <button class="basic"  type="button" id="approvalLine-btn" onclick="openModal(this);"><img src="../../../../resources/images/icons/btn_plus.png"style="width:10px; height:auto; vertical-align: middle;"/>&nbsp&nbsp결재선</button>
                    <section class="section--modal">
                        <div class="bg-black"></div>
                        <!-- 검은배경 필요할 경우, 필요없으면 이 태그 통째로 지우기 -->
                        <div class="section--modal__conts">
                            <button class="btn--close" type="button"></button>
                            <h3>모달창</h3>
                            <p class="mb-20">
                                필요한 내용 쫘르륵
                                최대값 화면의 800px,
                                많이 입력하면 너비 넓어지게 만들어둠
                            </p>
                            
                            <div class="btns-wrap mt-20 t-r">
                                <button class="point" type="button">확인</button>
                                <button class="finished closeWindow" type="button">닫기</button>
                            </div>
                        </div>
                    </section>
                    <br><br>    
                      		 <form action="/register/appr" method="post">
                      		 <div class="basic-border-bottom padding-20">
				            	<div class="row mt-20">
					                <div style="width:8%">
					                    <div style="font-size:15px; line-height: 30px;">제목</div>
					                </div>
					                <div>
					                    <input type="text" size="117">
					                </div>
					            </div>
					            <div class="row mt-20">
					                <div style="width:8%">
					                    <div style="font-size:15px;">기안자</div>
					                </div>
					                <div>${emplName}</div>
					            </div>
					            <div class="row mt-20">
					                <div style="width:8%">
					                    <div style="font-size:15px;">기안일</div>
					                </div>
					                <div id="current_date"></div>
					            </div>
					            <div class="row mt-20">
					                <div style="width:8%">
					                    <div style="font-size:15px;">소속</div>
					                </div>
					                <div>${deptCode}</div>
					            </div><br>
					            <div>
					                  <textarea id="summernote" name="formContents">${apprform.formContents}</textarea>
					            </div>
					         </div>
                      		 
                    		</form>
               
              
        </article>
    </div>
    
    <script>

    
    var today = new Date();
	 // 년도 getFullYear()
	var year = today.getFullYear(); 
	 // 월 getMonth() (0~11로 1월이 0으로 표현되기 때문에 + 1을 해주어야 원하는 월을 구할 수 있다.)
	var month = today.getMonth() + 1
	 // 일 getDate()
	var date = today.getDate(); // 일
 	 today = year + '-' + month + '-' + date;
    document.getElementById("current_date").innerHTML = today; 
    
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
    
    

    
    // 조직도 조회
    $(document).ready(function(){
       $.ajax({
          url : "/group/groupViewData.hirp",
          type : "get",
          dataType : "json",
          success : function(data) {
             if (data.length != 0) {
                data.forEach(function(e, i) {
                   console.log(e);
                   var codeNm = e.deptName;
                   var codeId = e.deptCode;
                   var parentId = e.deptUppercode;
                   var codeLvl = e.deptLevel;
                   var $rootList = $("#orgList");
                   var $li = '<li id="'+ codeId +'" lvl="' + codeLvl + '"><a href="#">'+ codeNm + '</a></li>';
                   //var $li = '<li id="'+ codeId +'"><span>' + codeNm+ '</span></li>';
                   //var $sLi = '<li id="'+ codeId +'"><span>'+ codeNm + '</span></li>';
                   var $ul = '<ul><li id="'+ codeId +'"><a href="#">' + codeNm+ '</a></li></ul>';
                   // 1레벨은 그냥 추가
                   // 다음 레벨부터는 상위 li의 클래스를 폴더로 바꾸고 자기 자신을 추가
                   if (codeLvl == 0) {
                      $rootList.append($li);
                   } else {
//                       var parentLi = $("li[id='"+parentId+"']");
//                       var $bUl = parentLi.find("ul");
//                       if($bUl.length == 0) {
//                          $li = "<ul>" + $li + "</ul>";
//                          parentLi.append($li);
//                       }else{
//                          $bUl.append($li);
//                       }
                      $("#" + parentId).append($ul);
                   }
                });
             } else {
                alert("조직도 데이터가 없습니다.");
             }
             
             $("#orgList, #navigation").treeview({
                collapsed : true
             });
          },
          error : function() {
             alert("조직도 조회 중에 실패했습니다.");

          }
       });
       
    });
    
    
    </script>
</body>

</html>