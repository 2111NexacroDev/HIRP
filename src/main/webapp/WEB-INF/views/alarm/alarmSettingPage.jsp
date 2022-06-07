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
	                    <input id="check0" name="alarmMail" class="mt-20" type="checkbox" value="${alarmSetting.alarmMail }" checked="checked">
	           			<label for="check0">받은 메일</label><br>
	        		</div>
	        		<div class="basic-border-bottom padding-20">
	        			<h2 class="mb-20">게시판</h2>
<!-- 	                    <input id="check1" name="alarmBoardAll" class="mt-20" type="checkbox"  checked="checked"> -->
<!-- 	           			<label for="check1" class="mr-20">전체</label> -->
	           			<input id="check2" name="alarmNoticeboard" class="mt-20" type="checkbox" value="${alarmSetting.alarmNoticeboard }" checked="checked">
	           			<label for="check2" class="mr-20">공지게시판</label>
	           			<input id="check3" name="alarmDeptboard" class="mt-20" type="checkbox" value="${alarmSetting.alarmDeptboard }" checked="checked">
	           			<label for="check3" class="mr-20">부서게시판</label>
	           			<input id="check4" name="alarmFreeboard" class="mt-20" type="checkbox" value="${alarmSetting.alarmFreeboard }" checked="checked">
	           			<label for="check4" class="mr-20">자유게시판</label>
	           			<input id="check5" name="alarmAnonymousboard" class="mt-20" type="checkbox" value="${alarmSetting.alarmAnonymousboard }" checked="checked">
	           			<label for="check5" class="mr-20">익명게시판</label>
	        		</div>
	        		<div class="basic-border-bottom padding-20">
	        			<h2 class="mb-20">일정관리</h2>
<!-- 	                    <input id="check6" name="alarmScheduleAll" class="mt-20" type="checkbox"  checked="checked"> -->
<!-- 	           			<label for="check6" class="mr-20">전체</label> -->
	           			<input id="check7" name="alarmAllschedule" class="mt-20" type="checkbox" value="${alarmSetting.alarmAllschedule }" checked="checked">
	           			<label for="check7" class="mr-20">전사 일정</label>
	           			<input id="check8" name="alarmTeamschedule" class="mt-20" type="checkbox" value="${alarmSetting.alarmTeamschedule }" checked="checked">
	           			<label for="check8" class="mr-20">팀 일정</label>
	           			<input id="check9" name="alarmPersonalschedule" class="mt-20" type="checkbox" value="${alarmSetting.alarmPersonalschedule }" checked="checked">
	           			<label for="check9" class="mr-20">개인 일정</label>
	        		</div>
	        		<div class="basic-border-bottom padding-20">
	        			<h2 class="mb-20">전자결재</h2>
<!-- 	                    <input id="check10" name="alarmPayAll" class="mt-20" type="checkbox"  checked="checked"> -->
<!-- 	           			<label for="check10" class="mr-20">전체</label> -->
	           			<input id="check11" name="alarmPayarrive" class="mt-20" type="checkbox" value="${alarmSetting.alarmPayarrive }" checked="checked">
	           			<label for="check11" class="mr-20">결재 도착</label>
	           			<input id="check12" name="alarmPaycancle" class="mt-20" type="checkbox" value="${alarmSetting.alarmPaycancle }" checked="checked">
	           			<label for="check12" class="mr-20">결재 취소</label>
	           			<input id="check13" name="alarmPaycompanion" class="mt-20" type="checkbox" value="${alarmSetting.alarmPaycompanion }" checked="checked">
	           			<label for="check13" class="mr-20">결재 반려</label>
	           			<input id="check14" name="alarmPaycomplete" class="mt-20" type="checkbox" value="${alarmSetting.alarmPaycomplete }" checked="checked">
	           			<label for="check14" class="mr-20">최종 완료</label>
	        		</div>
	        		<div class="basic-border-bottom padding-20">
	        			<h2 class="mb-20">설문조사</h2>
	                    <input id="check15" name="alarmSurvey" class="mt-20" type="checkbox" value="${alarmSetting.alarmSurvey }" checked="checked">
	           			<label for="check15" class="mr-20">설문 등록 시 대상자로 지정</label>
	        		</div>
	        	</div>
	        	<div class="t-c mt-20 padding-20">
	        		<button type="button" class="point " onclick="openModal(this);">설정 완료</button>
	        		<section class="section--modal">
                        <div class="bg-black"></div>
                        <!-- 검은배경 필요할 경우, 필요없으면 이 태그 통째로 지우기 -->
                        <div class="section--modal__conts" style="width:400px;">
                            <button class="btn--close" type="button"></button>
                            <h3 align="left">알림 설정 정보 수정</h3>
                            <p class="mb-20 padding-bottom">
                                알림 설정 정보 수정이 완료 되었습니다.
                            </p>
                            <div class="btns-wrap mt-20 t-r">
                                <button class="point" type="button" onclick="alarmSettingSubmit();">확인</button>
                                <button class="finished closeWindow" type="button" onclick="cleanEmplSearchKeyword();">취소</button>
                            </div>
                        </div>
                    </section>
	        	</div>
        	</form>
        </article>
    </div>
    <script>
	    $(document).ready(function() {
	    	console.log("알림 설정 페이지");
	    	var $checkBox = $("input[type='checkbox']");
	    	for(var i = 0; i < $checkBox.length; i++){
	    		var column = $checkBox[i].name;
	    		var val = $checkBox[i].value;
	    		console.log(column);
	    		console.log(val);
	    		console.log($checkBox[i]);
	    		if(val == 'Y'){
	    			$($checkBox[i]).prop("checked", true);
	    		} else {
	    			$($checkBox[i]).prop("checked", false);
	    		}
	    	}
		});
	
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