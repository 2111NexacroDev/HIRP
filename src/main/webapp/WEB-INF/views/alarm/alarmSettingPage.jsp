<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<!-- survey 공통 layout 페이지 입니다. -->

<%@ include file="/WEB-INF/views/include/inc_head.jsp" %>
<link rel="stylesheet" href="../../../resources/css/sub.css"><!-- 하이알피 서브페이지 CSS -->
<script src="https://kit.fontawesome.com/08c05a1f0f.js" crossorigin="anonymous"></script> <!-- fontawesome -->

<body>
	<%@ include file="/WEB-INF/views/include/inc_header.jsp" %>
    <div id="conts">
        <aside id="snb">
			<h1>마이페이지</h1>

			<ul class="no-icon">
				<li><a href="/employee/mypageView1.hirp">내 정보 보기</a></li>
				<li class="on"><a href="/alarm/settingPage.hirp">알림 설정</a></li>
			</ul>
		</aside>
		<article id="sub">
        	<%@ include file="/WEB-INF/views/include/inc_nav_right.jsp" %>
        	<h1 class="basic-border-bottom">알림 설정</h1>
        	<form id="alarmSettingForm" action="/alarm/setting_update.hirp" method="POST"  enctype="multipart/form-data">
	        	<div id="" class="subConts padding-0">
	        		<div class="basic-border-bottom padding-20">
	        			<h2 class="mb-20">메일</h2>
	                    <input id="check0" name="alarmMail" class="mt-20" type="checkbox" checked="checked">
	           			<label for="check0">받은 메일</label><br>
	        		</div>
	        		<div class="basic-border-bottom padding-20">
	        			<h2 class="mb-20">게시판</h2>
	                    <input id="check1" name="alarmBoardAll" class="mt-20" type="checkbox" checked="checked">
	           			<label for="check1" class="mr-20">전체</label>
	           			<input id="check2" name="alarmNoticeboard" class="mt-20" type="checkbox" checked="checked">
	           			<label for="check2" class="mr-20">공지게시판</label>
	           			<input id="check3" name="alarmDeptboard" class="mt-20" type="checkbox" checked="checked">
	           			<label for="check3" class="mr-20">부서게시판</label>
	           			<input id="check4" name="alarmFreeboard" class="mt-20" type="checkbox" checked="checked">
	           			<label for="check4" class="mr-20">자유게시판</label>
	           			<input id="check5" name="alarmAnonymousboard" class="mt-20" type="checkbox" checked="checked">
	           			<label for="check5" class="mr-20">익명게시판</label>
	        		</div>
	        		<div class="basic-border-bottom padding-20">
	        			<h2 class="mb-20">일정관리</h2>
	                    <input id="check6" name="alarmScheduleAll" class="mt-20" type="checkbox" checked="checked">
	           			<label for="check6" class="mr-20">전체</label>
	           			<input id="check7" name="alarmAllschedule" class="mt-20" type="checkbox" checked="checked">
	           			<label for="check7" class="mr-20">전사 일정</label>
	           			<input id="check8" name="alarmTeamschedule" class="mt-20" type="checkbox" checked="checked">
	           			<label for="check8" class="mr-20">팀 일정</label>
	           			<input id="check9" name="alarmPersonalschedule" class="mt-20" type="checkbox" checked="checked">
	           			<label for="check9" class="mr-20">개인 일정</label>
	        		</div>
	        		<div class="basic-border-bottom padding-20">
	        			<h2 class="mb-20">전자결재</h2>
	                    <input id="check10" name="alarmPayAll" class="mt-20" type="checkbox" checked="checked">
	           			<label for="check10" class="mr-20">전체</label>
	           			<input id="check11" name="alarmPayarrive" class="mt-20" type="checkbox" checked="checked">
	           			<label for="check11" class="mr-20">결재 도착</label>
	           			<input id="check12" name="alarmPaycancle" class="mt-20" type="checkbox" checked="checked">
	           			<label for="check12" class="mr-20">결재 취소</label>
	           			<input id="check13" name="alarmPaycompanion" class="mt-20" type="checkbox" checked="checked">
	           			<label for="check13" class="mr-20">결재 반려</label>
	           			<input id="check14" name="alarmPaycomplete" class="mt-20" type="checkbox" checked="checked">
	           			<label for="check14" class="mr-20">최종 완료</label>
	        		</div>
	        		<div class="basic-border-bottom padding-20">
	        			<h2 class="mb-20">설문조사</h2>
	                    <input id="check15" name="alarmSurvey" class="mt-20" type="checkbox" checked="checked">
	           			<label for="check15" class="mr-20">설문 등록 시 대상자로 지정</label>
	        		</div>
	        	</div>
	        	<div class="t-c mt-20 padding-20">
	        		<button type="button" class="point " onclick="alarmSettingSubmit();">설정 완료</button>
	        	</div>
        	</form>
        </article>
    </div>
    <script>
    	function alarmSettingSubmit(){
    		var $checkBox = $("input[type='checkbox']");
    		console.log($checkBox.length);
    		for(var i = 0; i < $checkBox.length; i++){
    			console.log($checkBox[i].checked);
    			console.log($checkBox[i].checked == true);
    			if($checkBox[i].checked == true){
    				$checkBox[i].value = "Y";
    			} else {
    				$checkBox[i].value = "N";
    			}
    			console.log(i+"번째 : "+$checkBox[i].value);
    		}
    		console.log($checkBox);
    		
    		document.getElementById('alarmSettingForm').submit();
    	}
    </script>
</body>
</html>