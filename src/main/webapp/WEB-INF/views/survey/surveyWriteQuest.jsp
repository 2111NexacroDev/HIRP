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

			<form action="/survey/addSurveyQuest.hirp" method="post">
				<input type="hidden" name="surveyNo" value="2"/>
				<!-- 임시로 넣어준 것. 두 개 화면 합치면, 따로 no value 없이 mapper에서 seq.currval 쓰면 될 듯-->
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
		                    <textarea name="surveyStartcomment" id="" class="" cols="70" rows="3" placeholder="시작 안내 문구를 입력해주세요."></textarea>
		                </div>
		            </div>
		            <!-- 시작 안내 문구 끝 -->
		            <!-- 문항 입력 -->
		            <div class=" basic-border-bottom">
		            	<!-- 첫번째 질문 div 시작 -->
		            	<div class="padding-20">
		            		<div class="row">
				                <div class="col-3">
				                    <div>질문</div>
				                </div>
				                <div class="">
				                    <input type="text" size="50" placeholder="질문을 입력해주세요">
				                </div>
				            </div>
				            <div class="row mt-20">
				                <div class="col-3">
				                    <div>설문 문항 타입</div>
				                </div>
				                <div class="">
				                   	<select class="" name="questType1" id="questType1" onchange="questType1Change(this)">
				                   		<option value="">유형 선택</option>
					                    <option value="C">선택형</option>
					                    <option value="D">날짜형</option>
					                    <option value="T">텍스트형</option>
					                </select>
					                <select class="" name="questType2" id="questType2" onchange="questType2Change(this)">
					                	<option value="">선택해주세요</option>
					                </select>
				                </div>
				            </div>
				            <!-- script로 보였다 안보였다 할 때 마진 안 보이게 하려고 div 한번 더 감싸주었음. -->
				            <div id="choiceList">
				            	<!-- 첫번째 유형 선택하면 보기 1개 기본값으로 추가 -->
				            </div>
				            <div id="choiceMaxAlert">
				            	<!-- choice가 4개 이상일 때 안내글 띄워줌. -->
				            </div>
				            <div id="choiceMax">
								<!-- 최대 보기 선택 개수 콤보 박스도 첫번째 유형 선택하면 기본값으로 추가 -->
			            	</div>
		            	</div>
		            	<!-- 첫번째 질문 div 끝 -->
		            	
		            	
	            </div>
	            
	            <!-- 문항 추가 -->
	            <div class="t-c">
		            <button class="basic mt-20" style="width:50%;"type="button" onclick="addQuest(this)">문항 추가</button>
	            </div>
		            
	            <div class="t-c">
		            <button class="point mt-20" type="submit">작성 완료</button>
		            <!-- 완료 누르면 안내창 띄워서 
		            설문 문항은 수정할 수 없습니다. 문항 작성을 완료하시겠습니까? -->
	            </div>
	            <!-- 페이지 내용 끝 -->
	            
	            <!-- 질문 추가 div 시작 -->
	           	<div class="basic-border-top padding-20" style="display:none;">
	           		<div class="row">
		                <div class="col-3">
		                    <div>질문</div>
		                </div>
		                <div class="">
		                    <input type="text" size="50" placeholder="질문을 입력해주세요">
		                </div>
		            </div>
		            <div class="row mt-20">
		                <div class="col-3">
		                    <div>설문 문항 타입</div>
		                </div>
		                <div class="">
		                   	<select class="" name="questType1" id="questType1" onchange="questType1Change(this)">
		                   		<option value="">유형 선택</option>
			                    <option value="C">선택형</option>
			                    <option value="D">날짜형</option>
			                    <option value="T">텍스트형</option>
			                </select>
			                <select class="" name="questType2" id="questType2" onchange="questType2Change(this)">
			                	<option value="">선택해주세요</option>
			                </select>
		                </div>
		            </div>
		            
		            <!-- script로 보였다 안보였다 할 때 마진 안 보이게 하려고 div 한번 더 감싸주었음. -->
		            <div id="choiceList">
		            	<!-- 첫번째 유형 선택하면 보기 1개 기본값으로 추가 -->
		            </div>
		            <div id="choiceMaxAlert">
		            	<!-- choice가 4개 이상일 때 안내글 띄워줌. -->
		            </div>
		            <div id="choiceMax">
						<!-- 최대 보기 선택 개수 콤보 박스도 첫번째 유형 선택하면 기본값으로 추가 -->
	            	</div>
	           	</div>
	           	<!-- 질문 추가 div 끝 -->
			</form>
            
           	
        </article>
        
        <script>
        	//문항 추가
        	function addQuest(e){
        		console.log("addQuest: "+e);
        		var $questListDiv = $(e).parent().prev(); //질문 리스트 감싸는 div
        		console.log($questListDiv);
        		var qCount = $questListDiv.children().length; //질문 갯수
        		
//         		var $quest = $(e).parent().prev().children().next(); //질문 div 통째로
				var $quest = $(e).parent().next().next(); //질문 div 통째로
        		console.log("퀘스트");
        		console.log($quest);
        		var $borderDiv = $("<div class='basic-border-top padding-20'>");
        		$borderDiv.append($quest.html());
        		if(qCount < 4) {
					$questListDiv.append($borderDiv);
        		} else {
        			console.log("문항은 최대 4개까지");
        		}
        		
        	}
        	
        	//첫번째 문항 타입 change
        	function questType1Change(e) {
        		console.log("questType1Change:" + e.value);
        		var choice = ["하나만 선택", "복수 선택"];
        		var text = ["단문 입력", "장문 입력"];
        		var target2 = $(e).next()[0]; //questType1
//         		console.log(target);
        		console.log(target2);
        		var $chList = $(e).parent().parent().next();	//보기 리스트 출력하는 div
//         		var $chMaxCombo = $("#choiceMax"); 
        		var $chMaxCombo = $(e).parent().parent().next().next().next(); //최대 선택 개수 출력하는 div
    			$chList.html("");
        		$chMaxCombo.html("");
//     			$chMaxCombo.html("");
//     			var choiceCount = 0; //보기 개수
    			var choiceCount = 1; //보기 개수
    			
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
			                   	+"<button type='button' class='noneBackground' onclick='addChList(this);'><i class='fa-solid fa-plus'></i></button>"
			                   	+"<button type='button' class='noneBackground' onclick='deleteChList(this);'><i class='fa-solid fa-xmark'></i></button>"
			                +"</div>"
			            +"</div>");
        		
        			$chList.append($chListDiv);
        			
        			choiceCount = $chList.children().length; //보기 개수
        			console.log(choiceCount);
        			console.log("선택형이나 날짜형을 눌렀을 때 보기 개수:"+choiceCount);
        			
        		}
        		else if(e.value == "T") {
        			var type2 = text;
        			$chList.html("");
//         			$chMaxCombo.html("");
        			choiceCount = $chList.children().length; //보기 개수
        			console.log("텍스트를 눌렀을 때 보기 개수:"+choiceCount2);
        		}
        		
        		console.log("보기 개수:"+choiceCount);
        		
        		target2.options.length = 0;
        		for(i in type2) {
        			var opt = document.createElement("option");
        			opt.value = type2[i];	//value를 이렇게 가는 게 맞나? 고민 좀 해보기
        			opt.innerHTML = type2[i];
        			target2.appendChild(opt);
        		}
        	}
        	
        	//두번째 문항 타입 change
        	function questType2Change(e){
        		console.log("questType2Change:"+e.value);
        		if(e.value == "복수 선택"){
        			addChMaxCombo(e);
        		} else { //복수 선택이 아니면 다시 비워주기
        			var $chMaxCombo = $(e).parent().parent().next().next().next(); //최대 선택 개수 출력하는 div
            		$chMaxCombo.html("");
        		}
        	}
        	
        	
        	//보기 추가
        	function addChList(e) {
        		var $chList = $(e).parent().parent().parent(); //보기 리스트 출력하는 div (choiceList)
//         		var target = document.getElementById("questAnswerCount"); //최대 선택 개수 콤보
//         		var target2 = $("#questAnswerCount")[0];
        		var target = $chList.next().next().children().find("#questAnswerCount")[0];  //최대 선택 개수 combo
        		console.log($chList.next().next());
//         		console.log(target);
        		
        		var chCount = $chList.children().length; //보기 개수
        		var $chMaxAlert = $chList.next(); //보기 max일 때 알림 적어줄 div
        		console.log("addChList:maxAlert");
        		console.log($chMaxAlert);
        		
        		//보기 4개까지 추가 가능
        		if(chCount < 4) {
        			$chMaxAlert.html("");
        			//보기 추가
           			var $chListDiv2 = 
           				$("<div class='row mt-10'>"
    				     	+"<div class='col-3'>"
    	                	+"</div>"
    		                +"<div class='questChoiceList'>"
    		                   	+"<input type='text' placeholder='보기 입력'>"
    		                   	+"<button type='button' class='noneBackground' onclick='addChList(this);'><i class='fa-solid fa-plus'></i></button>"
    		                   	+"<button type='button' class='noneBackground' onclick='deleteChList(this);'><i class='fa-solid fa-xmark'></i></button>"
    		                +"</div>"
    		            +"</div>");
        			
           			$chList.append($chListDiv2);
    				chCount++;
    				console.log(chCount);
    				
        		} else {
        			console.log("보기가 너무 많습니다.");
        			$chMaxAlert.html("");
        			var $chAlert =
        				$("<div class='row mt-10 padding-left'>"
        				     	+"<div class='col-3'></div>"
        	                	+"<h3 style='color:red;'>보기는 최대 4개까지 추가 가능합니다.</h3>"
        		            +"</div>");
        			$chMaxAlert.append($chAlert);
        		}
        		console.log("addChList:chList");
        		console.log($chList);
        		console.log("타겟");
        		console.log(target);
        		chMaxList(target, chCount);
        	}
        	
        	//보기 삭제
        	function deleteChList(e){
        		var $chList = $(e).parent().parent().parent(); //보기 리스트 출력하는 div (choiceList)
        		$(e).parent().parent().remove(); //보기 div 삭제
        		console.log("deleteChList:chList");
        		console.log($chList);
        		var target = $chList.next().next().children().find("#questAnswerCount")[0];  //최대 선택 개수 combo
        		console.log("타겟2");
        		console.log(target);
        		var chCount = $chList.children().length; //보기 개수
        		chMaxList(target, chCount);
        	}
        	
        	//최대 선택 개수 콤보 추가
        	function addChMaxCombo(e){
        		console.log("addchmaxcombo");
        		var $chList = $(e).parent().parent().next(); //보기 리스트 출력하는 div (choiceList)
        		console.log($chList);
        		var $chMaxCombo = $(e).parent().parent().next().next().next(); //최대 선택 개수 출력하는 div
        		$chMaxCombo.html("");
        		
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
    			$chMaxCombo.append($chMaxDiv);
    			
        		var target = $chList.next().next().children().find("#questAnswerCount")[0];  //최대 선택 개수 combo
        		console.log("addChMaxCombo: target");
        		console.log(target);
        		var chCount = $chList.children().length; //보기 개수
        		
    			chMaxList(target, chCount);
        	}
        	
        	//최대 선택 개수 옵션 변경
        	function chMaxList(target, chCount){
        		console.log("chMaxList");
        		//보기에 맞춰서 최대 개수 옵션 변경
        		target.options.length = 0;
        		//제한 없음
        		var opt = document.createElement("option");
    			opt.value = 0;	//value를 이렇게 가는 게 맞나? 고민 좀 해보기
    			opt.innerHTML = "제한없음";
    			target.appendChild(opt);
    			
        		for(var i = 1; i < chCount+1; i++) {
        			var opt = document.createElement("option");
        			opt.value = i;	//value를 이렇게 가는 게 맞나? 고민 좀 해보기
        			opt.innerHTML = i;
        			target.appendChild(opt);
        		}
        	}
//         		var elements = document.querySelectorAll("#questAnswerCount");
//         		console.log("elements");
//         		console.log(elements);
        	
        </script>
</body>
</html>