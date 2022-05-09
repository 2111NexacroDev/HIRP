<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
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

            <h1 class="basic-border-bottom">설문 문항 작성</h1>
            <!-- 메인 상단 끝 -->
            
            <!-- 페이지 내용 -->
            <div id="" class="subConts padding-0">
            	<!-- basic-border-bottom 넣어주려고 각각 padding 넣어줌 -->
            	<!-- 시작 안내 문구 -->
            	<div class="row padding-20 basic-border-bottom">
	                <div class="col-3">
	                    <div >시작 안내 문구</div>
	                </div>
	                <div class="">
	                    <textarea name="" id="" class="" cols="50" rows="3" placeholder="시작 안내 문구를 입력해주세요."></textarea>
	                </div>
	            </div>
	            <!-- 시작 안내 문구 끝 -->
	            <!-- 문항 입력 -->
	            <div class="padding-20 basic-border-bottom">
	            	<div class="row">
		                <div class="col-3">
		                    <div>질문</div>
		                </div>
		                <div class="">
		                    <input type="text" placeholder="질문을 입력해주세요">
		                </div>
		            </div>
		            <div class="row mt-20">
		                <div class="col-3">
		                    <div>설문 문항 타입</div>
		                </div>
		                <div class="">
		                   	<select class="" name="questType1" id="questType1" onchange="questTypeChange(this)">
		                   		<option value="">유형 선택</option>
			                    <option value="C">선택형</option>
			                    <option value="D">날짜형</option>
			                    <option value="T">텍스트형</option>
			                </select>
			                <select class="" name="questType2" id="questType2">
			                	<option value="">선택해주세요</option>
			                </select>
		                </div>
		            </div>
		            
		            <div id="choiceList">
<!-- 			            <div class="row mt-20"> -->
<!-- 			                <div class="col-3"> -->
<!-- 			                    <div>보기</div> -->
<!-- 			                </div> -->
<!-- 			                <div class=""> -->
<!-- 			                   	<input type="text" placeholder="보기1 입력"> -->
<!-- 			                   	<button class="noneBackground"><i class="fa-solid fa-plus"></i></button> -->
<!-- 			                   	<button class="noneBackground"><i class="fa-solid fa-xmark"></i></button> -->
<!-- 			                </div> -->
<!-- 			            </div> -->
		            </div>
		            
		            <!-- script로 보였다 안보였다 할 때 마진 안 보이게 하려고 div 한번 더 감싸주었음. -->
		            <div id="choiceMax">
<!-- 			            <div class="row mt-20" > -->
<!-- 			                <div class="col-3"> -->
<!-- 			                    <div>최대 선택 개수</div> -->
<!-- 			                </div> -->
<!-- 			                <div class=""> -->
<!-- 			                   	<select class="" name="" id="questAnswerCount" onchange=""> -->
<!-- 			                   		<option value="">제한없음</option> -->
<!-- 				                </select> -->
<!-- 			                </div> -->
<!-- 			            </div> -->
<!-- 		            </div> -->
	            </div>
	            <!-- 문항 입력 끝 -->
	            <!-- 문항 추가 -->
	            <div class="t-c">
		            <button class="basic mt-20" style="width:50%;"type="button">문항 추가</button>
	            </div>
		            
	            <div class="t-c">
		            <button class="point mt-20" type="button">작성 완료</button>
		            <!-- 완료 누르면 안내창 띄워서 
		            설문 문항은 수정할 수 없습니다. 문항 작성을 완료하시겠습니까? -->
	            </div>

            </div>
            <!-- 페이지 내용 끝 -->
        </article>
        
        <script>
        	//두번째 select 박스 출력
        	function questTypeChange(e) {
        		console.log(e.value);
        		var choice = ["하나만 선택", "복수 선택"];
        		var text = ["단문 입력", "장문 입력"];
        		var target = document.getElementById("questType2");
        		
        		var $chList = $("#choiceList");	//보기 리스트 출력하는 div
        		var $chMaxCombo = $("#choiceMax"); //최대 선택 개수 출력하는 div
    			$chList.html("");
    			$chMaxCombo.html("");
    			var choiceCount = 0; //보기 개수
    			
//     			<div class="row mt-20">
// 	                <div class="col-3">
// 	                    <div>보기</div>
// 	                </div>
// 	                <div class="">
// 	                   	<input type="text" placeholder="보기1 입력">
// 	                   	<button class="noneBackground"><i class="fa-solid fa-plus"></i></button>
// 	                   	<button class="noneBackground"><i class="fa-solid fa-xmark"></i></button>
// 	                </div>
// 	            </div>
    			
//     			<div class="row mt-20" >
// 	                <div class="col-3">
// 	                    <div>최대 선택 개수</div>
// 	                </div>
// 	                <div class="">
// 	                   	<select class="" name="" id="questAnswerCount" onchange="">
// 	                   		<option value="">제한없음</option>
// 		                </select>
// 	                </div>
// 	            </div>
            
        		if(e.value == "C" || e.value == "D") {
        			var type2 = choice;
        			//처음에 보기 1개 출력
        			var $chListDiv = 
        				$("<div class='row mt-20'>"
						    +"<div class='col-3'>"
			                	+"<div>보기</div>"
			                +"</div>"
			                +"<div class='questChoiceList'>"
			                   	+"<input type='text' placeholder='보기 입력'>"
			                   	+"<button class='noneBackground'><i class='fa-solid fa-plus'></i></button>"
			                   	+"<button class='noneBackground'><i class='fa-solid fa-xmark'></i></button>"
			                +"</div>"
			            +"</div>");
        			//보기 추가
        			var $chListDiv2 = 
        				$("<div class='row mt-10'>"
					     	+"<div class='col-3'>"
		                	+"</div>"
			                +"<div class='questChoiceList'>"
			                   	+"<input type='text' placeholder='보기 입력'>"
			                   	+"<button class='noneBackground' onclick='addChList();'><i class='fa-solid fa-plus'></i></button>"
			                   	+"<button class='noneBackground'><i class='fa-solid fa-xmark'></i></button>"
			                +"</div>"
			            +"</div>");
        			
        			//최대 선택 개수
        			var $chMaxDiv =
        				$("<div class='row mt-20' >"
	        	                +"<div class='col-3'>"
				                    +"<div>최대 선택 개수</div>"
				                +"</div>"
				                +"<div class=''>"
				                   	+"<select class='' name='qChMax' id='questAnswerCount' onchange=''>"
				                   		+"<option value=''>제한없음</option> <option value=''>1</option>"
					                +"</select>"
				                +"</div>"
				            +"</div>");
        			
        			$chList.append($chListDiv);
        			$chList.append($chListDiv2);
        			$chMaxCombo.append($chMaxDiv);
        			choiceCount = $('.questChoiceList').length;
        			console.log("선택형이나 날짜형을 눌렀을 때 보기 개수:"+choiceCount);
        			
        		}
        		else if(e.value == "T") {
        			var type2 = text;
        			$chList.html("");
        			$chMaxCombo.html("");
        			choiceCount = $('.questChoiceList').length;
        			console.log("텍스트를 눌렀을 때 보기 개수:"+choiceCount);
        		}
        		
        		console.log("보기 개수:"+choiceCount);
        		
        		target.options.length = 0;
        		for(i in type2) {
        			var opt = document.createElement("option");
        			opt.value = type2[i];	//value를 이렇게 가는 게 맞나? 고민 좀 해보기
        			opt.innerHTML = type2[i];
        			target.appendChild(opt);
        		}
        	}
        	
        	function addChList() {
        		var $chList = $("#choiceList");	//보기 리스트 출력하는 div
        		var target = document.getElementById("questAnswerCount");
        		console.log("딩동:"+target.options.length);
        		var chCount = $('.questChoiceList').length;
        		console.log("딩동:"+chCount);
        		
        		if(chCount < 4) {
        			//보기 추가
           			var $chListDiv2 = 
           				$("<div class='row mt-10'>"
    				     	+"<div class='col-3'>"
    	                	+"</div>"
    		                +"<div class='questChoiceList'>"
    		                   	+"<input type='text' placeholder='보기 입력'>"
    		                   	+"<button class='noneBackground'><i class='fa-solid fa-plus'></i></button>"
    		                   	+"<button class='noneBackground'><i class='fa-solid fa-xmark'></i></button>"
    		                +"</div>"
    		            +"</div>");
        			
           			//최대 선택 개수
           			var $chMaxDiv =
           				$("<div class='row mt-20' >"
            	                +"<div class='col-3'>"
    			                    +"<div>최대 선택 개수</div>"
    			                +"</div>"
    			                +"<div class=''>"
    			                   	+"<select class='' name='' id='questAnswerCount' onchange=''>"
    			                   		+"<option value=''>제한없음</option> <option value=''>1</option>"
    				                +"</select>"
    			                +"</div>"
    			            +"</div>");
           			
           			$chList.append($chListDiv2);
//            			$chMaxCombo.append($chMaxDiv);
    				chCount++;
    				console.log(chCount);
    				target.options.length = 0;
        		} else {
        			console.log("보기가 너무 많습니다.");
        		}
        		chCount = $('.questChoiceList').length;
        		for(var i = 1; i < chCount+1; i++) {
        			console.log("for문");
        			var opt = document.createElement("option");
        			opt.value = i	//value를 이렇게 가는 게 맞나? 고민 좀 해보기
        			opt.innerHTML = i;
        			target.appendChild(opt);
        			console.log("추가");
        		}
        	}
        </script>
</body>
</html>