<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<%@ include file="/WEB-INF/views/include/inc_head.jsp"%>
<link rel="stylesheet" href="../../../resources/css/sub.css">
<!-- 하이알피 서브페이지 CSS -->

<link
	href="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-lite.min.css"
	rel="stylesheet">
<script
	src="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-lite.min.js"></script>
<style>
#approvalLine-btn {
	background-color: white;
	border: solid 1px #888;
	border-radius: 4px;
	width: 80px;
	height: 35px;
	float: right;
}

#submit-btn {
	background-color: white;
	border: solid 1px #888;
	border-radius: 4px;
	width: 80px;
	height: 35px;
	float: right;
	margin :30px 0px;
}



#apprTable {
	border: solid 1px lightgray;
	width: 230px;
	font-size: 15px;
	text-align: center;
	margin: 30px;
}

#approvalLine {
	position: absolute;
	right: 30px;
	top: 30px;
}

.singleApprLine {
	width: 100px;
	height: 100px;
	display: inline-block;
	text-align : center;
	border: solid 1px lightgray;
	margin : 0px;
}

.singleApprType{
	width: 20px;
	height: 100px;
	display: inline-block;
	text-align : center;
	border: solid 1px lightgray;

}

.singleApprLineTop{
	width: 100%;
	height: 20%;
	display: inline-block;
	text-align : center;
	border-bottom: solid 1px lightgray;
	margin : 0px;
	padding-top : 2px;
}

.singleApprLineMiddle{
	width: 100%;
	height: 60%;
	display: inline-block;
	text-align : center;
	border-bottom: solid 1px lightgray;
	margin : 0px;
	padding-top : 23px;

}

.singleApprLineBottom{
	width: 100%;
	height: 20%;
	display: inline-block;
	text-align : center;
	border-bottom: solid 1px lightgray;
	margin : 0px;
	color :  #888;
	padding-top : 2px;
}
</style>


<body>
	<%@ include file="/WEB-INF/views/include/inc_header.jsp"%>

	<div id="conts">
		<aside id="snb">
			<h1>전자결재</h1>
			<a class="btn--function" class="basic" type="button"
				onclick="openModal(this);">새 결재 진행</a>
			<section class="section--modal">
				<div class="bg-black"></div>
				<!-- 검은배경 필요할 경우, 필요없으면 이 태그 통째로 지우기 -->
				<div class="section--modal__conts">
					<button class="btn--close"></button>
					<h3>결재양식 선택</h3>
					<p class="mb-20">
					<div>
						<div class="bor-round shadow" id="formListDiv"
							style="width: 250px; height: 180px;">
							<ul>
								<c:forEach var="form" items="${formList }">
									<c:url var="fDetail" value="/approvalForm/detail.hirp">
										<c:param name="formNo" value="${form.formNo }"></c:param>
									</c:url>
									<li><a href="${fDetail }">${form.formTitle }</a></li>
								</c:forEach>
							</ul>
						</div>
					</div>
					</p>
					<div></div>
					<div class="btns-wrap mt-20 t-r">
						<button class="point" type="button">확인</button>
						<button class="finished closeWindow" type="button">닫기</button>
					</div>
				</div>
			</section>
			<ul>
				<li><a href="">결재하기</a>
					<ul>
						<li><a href="#">결재문서함</a></li>
					</ul></li>
				<li><a href="">기안문서함</a>
					<ul>
						<li><a href="#">상신문서함</a></li>
						<li><a href="#">임시문서함</a></li>
						<li><a href="#">반려문서함</a></li>
						<li><a href="#">결재완료함</a></li>
					</ul></li>
				<li><a href="">참조함</a>
					<ul>
						<li><a href="#">참조문서함</a></li>
						<li><a href="#">열람문서함</a></li>
					</ul></li>
			</ul>
		</aside>

		<article id="sub" class="">

			<%@ include file="/WEB-INF/views/include/inc_nav_right.jsp"%>


			<h1 class="basic-border-bottom">기안하기</h1>

			<div id="guide" class="subConts">
				<!-- 여백 필요 없을 경우 클래스에 padding-0 추가, 
            	필요 없으면 지울 것 -->
				<button class="basic" type="button" id="approvalLine-btn"
					onclick="openModal(this);">
					<img src="../../../../resources/images/icons/btn_plus.png"
						style="width: 10px; height: auto; vertical-align: middle;" />&nbsp&nbsp결재선
				</button>
				<section class="section--modal">
					<div class="bg-black"></div>
					<div class="section--modal__conts"
						style="border: none; width: 1200px;">
						<button class="btn--close" type="button"></button>
						<h3>결재선 선택</h3>
						<div class="row mt-20">
							<div width="30%">
								<table class="table--basic mt-20" id="emplTable">
									<tr>
										<th>부서</th>
										<th>직급</th>
										<th>이름</th>
									</tr>
									<c:forEach items="${emplList }" var="empl">
										<c:if test="${empl.deptName eq employee.deptCode }">
											<tr onclick="emplClick(this);">
												<td>${empl.deptName}</td>
												<td>${empl.positionName}</td>
												<td>${empl.emplName}</td>
											</tr>
											<input type="hidden" name="emplId" value="${empl.emplId }">
										</c:if>
									</c:forEach>

								</table>
							</div>
							<div width="70%" id="emplListDiv">
								<table class="table--basic mt-20" id="apprEmplTable">
									<tr>
										<th>부서</th>
										<th>직급</th>
										<th>이름</th>
										<th>구분</th>
									</tr>
								</table>
							</div>
							<div class="btns-wrap mt-20 t-r">
								<button class="point" type="button" onclick="addApprLine()">확인</button>
								<button class="finished closeWindow" type="button">닫기</button>
							</div>

						</div>
				</section>
				<br> <br>
				<form action="/register/appr.hirp" method="post">
					<input type="hidden" name="formNo" value="${apprform.formNo}">
					<input type="hidden" name="emplId" value="${emplId}">
					<div style="border: solid 1px lightgray; margin-top: 20px; position: relative;">
						<table id="apprTable">
							<tr
								style="height: 30px; border: solid 1px lightgray; line-height: 30px;">
								<td>기안자</td>
								<td>${emplName}${employee.positionCode }</td>
							</tr>
							<tr
								style="height: 30px; border: solid 1px lightgray; line-height: 30px;">
								<td>기안일</td>
								<td><div id="current_date" /></td>
							</tr>
							<tr
								style="height: 35px; border: solid 1px lightgray; line-height: 30px;">
								<td>소속</td>
								<td>${employee.deptCode}</td>
							</tr>
						</table>
						<div id="approvalLine">
							<!-- <div class="singleApprType">기안자</div> -->
							<div class="singleApprLine" style="margin-right:20px;">
							<div class='singleApprLineTop'>${employee.positionCode}</div>
							<div class='singleApprLineMiddle'>${emplName}</div>
							<div class='singleApprLineBottom'>기안자</div>
							</div>
						</div>
						
						</div>
						<div class="row mt-20">
							<div style="width: 6%">
								<div style="font-size: 15px; line-height: 30px; text-align: center;">제목</div>
							</div>

							<div>
								<input type="text" size="125" name="apprTitle">
							</div>
						</div>
						<div class="row mt-20">
							<div style="line-height: 25px;">첨부파일</div>
							<div>
								<button id="btn-upload" type="button"
									style="border: 1px solid #ddd; outline: none;">파일 추가</button>
							</div>
							<input id="uploadFiles" name="uploadFiles" type="file" multiple
								style="display: none;"> <span
								style="font-size: 10px; color: gray; line-height: 25px;">※첨부파일은
								최대 10개까지 등록이 가능합니다.</span>
							<div class="data_file_txt" id="data_file_txt"
								style="margin: 40px; margin-left:0px;">
								<span></span> <br>
								<div id="articlefileChange"></div>
							</div>
						</div>
					
					<br>
					<div>
						<textarea id="summernote" name="apprContents">${apprform.formContents}</textarea>
					</div>
			<button type="submit" id="submit-btn">상신하기</button>
			</form>
			</div>
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
	
		    
		    $(document).ready(function()
		    		// 파일 첨부시 fileCheck 함수 실행
		    		{
		    			$("#uploadFiles").on("change", fileCheck);
		    		});

		    /**
		     * 첨부파일로직
		     */
		    $(function () {
		        $('#btn-upload').click(function (e) {
		            e.preventDefault();
		            $('#uploadFiles').click();
		        });
		    });

		    // 파일 현재 필드 숫자 totalCount랑 비교값
		    var fileCount = 0;
		    // 해당 숫자를 수정하여 전체 업로드 갯수를 정한다.
		    var totalCount = 10;
		    // 파일 고유넘버
		    var fileNum = 0;
		    // 첨부파일 배열
		    var content_files = new Array();

		    function fileCheck(e) {
		        var files = e.target.files;//파일객체, 파일 목록에 접근 가능
		        
		        // 파일 배열 담기
		        var filesArr = Array.prototype.slice.call(files);//객체를 배열로 변환
		        
		        // 파일 개수 확인 및 제한
		        if (fileCount + filesArr.length > totalCount) {
		          alert('파일은 최대 '+totalCount+'개까지 업로드 할 수 있습니다.');
		          return;
		        } else {
		        	 fileCount = fileCount + filesArr.length;
		        }
		        
		        // 각각의 파일 배열담기 및 기타
		        filesArr.forEach(function (f) {
		          var reader = new FileReader();
		          reader.onload = function (e) {
		            content_files.push(f);
		            $('#articlefileChange').append(
		           		'<div id="file' + fileNum + '" onclick="fileDelete(\'file' + fileNum + '\')">'
		           		+ '<font style="font-size:12px">' + f.name + '</font>'  
		           		+ '<img src="../../../../resources/images/bg_close.png" style="width:20px; height:auto; vertical-align: middle; cursor: pointer;"/>' 
		           		+ '<div/>'
		    		);
		            fileNum ++;
		          };
		          reader.readAsDataURL(f);
		        });
		        console.log(content_files);
		        //초기화 한다.
		        $("#input_file").val("");
		      }

		    // 파일 부분 삭제 함수
		    function fileDelete(fileNum){
		        var no = fileNum.replace(/[^0-9]/g, "");
		        content_files[no].is_delete = true;
		    	$('#' + fileNum).remove();
		    	fileCount --;
		        console.log(content_files);
		    }

		    
		    
		    
		    
		    
	  
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
    
  
			function emplClick(e) {
				var tdArr = new Array();
				var tr = $(e)//클릭한 tr
				var td = tr.children();//tr의 후손인 td
				td.each(function(i, e) {
					tdArr.push(td.eq(i).text());//td의 각각의 값을 배열에 넣어줌(deptName, positionName, emplName값 들어가있음)  
				})
				tdArr.push(tr.next().val());//hidden값인 emplId값을 배열에 넣어줌
				addEmplDiv(tdArr); //(deptNAme, positionName, emplName, emplId)
			}

			
			var arr = []; //2차원 배열{(deptNAme, positionName, emplName, emplId),(deptNAme, positionName, emplName, emplId),...}
			function addEmplDiv(tdArr) {
				arr.push(tdArr);//tdArr 배열을 2차원 배열에 넣어줌
				var $apprEmplTable = $("#apprEmplTable");//모달창에 클릭한 값을 넣어줄 테이블
				var emplDivHtml = "<tr>"
						+ "<td>"
						+ tdArr[0]
						+ "</td>"
						+ "<td>"
						+ tdArr[1]
						+ "</td>"
						+ "<td>"
						+ tdArr[2]
						+ "</td>"
						+ "<td>"
						+ "<select id='apprOpt[]' name='apprOpt[]'style='width:50px;'>"
						+ "<option value='approval'>결재</option>"
						+ "<option value='agreement'>합의</option>"
						+ "</select>" + "</td>" + "</tr>"
				$apprEmplTable.append(emplDivHtml);//값을 넣어준다.
			}

			
			function addApprLine() {
				//배열에 값이 들어있을 경우 동작
				if (arr != null) {
					var $approvalLine = $("#approvalLine");

					for (var i = 0; i < arr.length; i++) {
						//결재type select 값 배열에 넣어줌
						arr[i].push($('select[name="apprOpt[]"]')[i].value);
						arr[i].push($('select[name="apprOpt[]"] option:checked')[i].text);
						//결재라인 div 출력
						var apprLineHtml = /*"<div class='singleApprType'>"+arr[i][0]+"</div>"+*/"<div class='singleApprLine'>"+"<div class='singleApprLineTop'>"+ arr[i][1]+"</div>"+"<div class='singleApprLineMiddle'>"+ arr[i][2]+"</div>"+"<div class='singleApprLineBottom'>"+ arr[i][5]+"</div>"+ "</div>"
								+ "<input type='hidden' value='arr[i][3]' name='aList[i].emplId'>"
								+ "<input type='hidden' value='arr[i][4]' name='aList[i].apprType'>"
						$approvalLine.append(apprLineHtml)
						
					}
					arr = [];//배열값 비움
					$(".section--modal").stop().fadeOut(100);
				} else {
					$(".section--modal").stop().fadeOut(100);//배열이 null일 경우 모달창 닫기
				}
			}
		</script>
	</body>
</html>