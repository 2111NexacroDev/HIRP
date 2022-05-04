<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<%@ include file="/WEB-INF/views/include/inc_head.jsp" %>
<link rel="stylesheet" href="../../../resources/css/sub.css"><!-- 하이알피 서브페이지 CSS -->
<!-- jQuery import -->
<script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
<!-- jQuery Form Plugin import -->
<script src="<%=request.getContextPath() %>/resources/js/jquery.form.min.js"></script>
<!-- jQuery MultiFile Plugin import -->
<script src="<%=request.getContextPath() %>/resources/js/jQuery.MultiFile.min.js"></script>
<script>
$(document).ready(function(){
    //use jQuery MultiFile Plugin 
    $('#multiform input[name=uploadFile]').MultiFile({
        max: 5, //업로드 최대 파일 갯수 (지정하지 않으면 무한대)
        accept: 'jpg|png|gif', //허용할 확장자(지정하지 않으면 모든 확장자 허용)
        maxfile: 1024, //각 파일 최대 업로드 크기
        maxsize: 3024,  //전체 파일 최대 업로드 크기
        STRING: { //Multi-lingual support : 메시지 수정 가능
            remove : "제거", //추가한 파일 제거 문구, 이미태그를 사용하면 이미지사용가능
            duplicate : "$file 은 이미 선택된 파일입니다.", 
            denied : "$ext 는(은) 업로드 할수 없는 파일확장자입니다.",
            selected:'$file 을 선택했습니다.', 
            toomuch: "업로드할 수 있는 최대크기를 초과하였습니다.($size)", 
            toomany: "업로드할 수 있는 최대 갯수는 $max개 입니다.",
            toobig: "$file 은 크기가 매우 큽니다. (max $size)"
        },
        list:"#afile3-list" //파일목록을 출력할 요소 지정가능
    });
});
</script>
<body>
    <%@ include file="/WEB-INF/views/include/inc_header.jsp" %>
    <div id="conts">
        <article id="sub" class="">
            <%@ include file="/WEB-INF/views/include/inc_nav_right.jsp" %>
            <h1 class="basic-border-bottom">글쓰기</h1>
				<form  id="multiform" action="/notice/register.hirp" method="post" enctype="multipart/form-data" multiple="multiple">
				<div>게시판 선택</div>
				<select name="boardCode">
					<option value="N">공지게시판</option>
					<option value="F">자유게시판</option>
					<option value="A">익명게시판</option>
					<option value="D">부서게시판</option>
				</select>
				<div>제목</div>
				<input type="text" name ="noticeTitle" style="width:1300px;">
				<div>첨부파일</div>
				<input type="file" name="uploadFile">
				<div id="afile3-list" style="border:2px solid #c9c9c9;min-height:50px"></div> 
				<textarea name="noticeContents"></textarea>
				<input type="submit">
				</form>
				<div id="result"></div>


<script>

/*jQuery form 플러그인을 사용하여 폼데이터를 ajax로 전송*/

var downGroupCnt =0; //다운로드그룹 개수카운트

$(function(){
    
    //폼전송 : 해당폼의 submit 이벤트가 발생했을경우 실행  
    $('#multiform').ajaxForm({
       cache: false,
       dataType:"json",
       //보내기전 validation check가 필요할경우
       beforeSubmit: function (data, frm, opt) {
           //console.log(data);
           alert("전송전!!");
           return true;
       },
       //submit이후의 처리
       success: function(data, statusText){
           
           alert("전송성공!!");
           console.log(data); //응답받은 데이터 콘솔로 출력         
           
           output(data); //받은 정보를 화면 출력하는 함수 호출
       },
       //ajax error
       error: function(e){
           alert("에러발생!!");
           console.log(e);
       }                               
    });
});

//전달받은 정보를 가지고 화면에 보기 좋게 출력
function output(data) {
    //업로드한 파일을 다운로드할수있도록 화면 구성
    $("#result").append("<h3>("+(++downGroupCnt)+") 다운로드</h3>");
    $("#result").append("제목:"+data.title+"<br/>");
    $("#result").append("설명:"+data.description+"<br/>");
  
    if(data.file && data.file.length != 0){
        $("#result").append("파일:<br/>");           
        $.each(data.file, function(index, item){
            //var link = "fileDownload2?f="+item.fileName+"&of="+item.uploadedFileName;
            $("#result").append("<a href='"+ item.downlink +"' download>"+item.fileName+"</a>");
           $("#result").append("<br/>");                   
        });
    }       
    
    $('#multiform')[0].reset(); //폼 초기화(리셋);
    //$('#multiform').resetForm(); //(jQuery.Form 플러그인 메서드)
    //$('#multiform').clearForm(); //(jQuery.Form 플러그인 메서드)  
    $('#multiform input:file').MultiFile('reset'); //멀티파일 초기화        
}
</script>
				
           
               
               
              
               
               
               
               
              
        </article>
    </div>
</body>

</html>