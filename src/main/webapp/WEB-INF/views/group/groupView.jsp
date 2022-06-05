<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!-- jstl사용가능. 여러행뽑아내야해서 사용함 -->
<!DOCTYPE html>
<html>
<%@ include file="/WEB-INF/views/include/inc_head.jsp"%>
<script src="../../../resources/js/jquery.treeview.js"></script>

<link rel="stylesheet" href="../../../resources/css/sub.css">
<link rel="stylesheet" href="../../../resources/css/jquery.treeview.css" />
<link rel="stylesheet" href="../../../resources/css/screen.css" />
<link rel="stylesheet" href="../../../resources/css/employee.css">

<body>
	<%@ include file="/WEB-INF/views/include/inc_header.jsp"%>
	<div id="conts">
		<aside id="snb" class="snb--org">
			<h1>조직도</h1>
			<ul id="orgList">
			</ul>
		</aside>
		<article id="sub" class="">
			<%@ include file="/WEB-INF/views/include/inc_nav_right.jsp"%>

			<h1 class="basic-border-bottom">상세 회원 정보 조회</h1>
			<div id="mypage" class="subConts mypage-update">
				<ul>
					<li>
						<label for="">사진</label>
						<div class="profile-wrap">
							<img src="../../../resources/images/img_no_profile.png" alt="프로필사진 없음">
						</div>
					</li>
					<li>
						<label for="">이름</label> 
						<input name="emplName" type="text" value="선택된 직원 없음" readonly>
					</li>
					<li>
						<label for="">부서</label>
						<input name="deptCode" type="text" value="선택된 직원 없음" readonly>
					</li>
					<li>
						<label for="">직위</label>
						<input name="positionCode" type="text" value="선택된 직원 없음" readonly>
					</li>
					<li>
						<label for="">직통번호</label>
						<input name="directNo" type="text" value="선택된 직원 없음" readonly>
					</li>
					<li>
						<label for="">이메일</label>
						<input name="email" type="text" value="선택된 직원 없음" readonly>
					</li>
					<li>
						<label for="">연락처</label>
						<input name="phoneNo" type="text" value="선택된 직원 없음" readonly>
					</li>
					<li>
						<label for="">생년월일</label>
						<input name="birthday" type="text" value="선택된 직원 없음" readonly>
					</li>
				</ul>
			</div>
		</article>
	</div>

	<script>
		function emplDetailView(e){
			var aTag = $(e);
			aTag.each(function(i,e){
				aTag.children('input').val();
			});
			let selectedId = aTag.children('input').val();
			$.ajax({
				url: "/group/groupDetailView.hirp",
				type: "get",
				data: {"emplId" : selectedId},
				success : function(data) {
					$("input[name=emplName]").val(data["emplName"]);
					$("input[name=deptCode]").val(data["deptCode"]);
					$("input[name=positionCode]").val(data["positionCode"]);
					$("input[name=directNo]").val(data["directNo"]);
					$("input[name=email]").val(data["email"]);
					$("input[name=phoneNo]").val(data["phoneNo"]);
					$("input[name=birthday]").val(data["birthday"]);
					if(data["emplProfile"] != null) {
						$(".profile-wrap img").attr("src","../../../resources/uploadFiles/"+data["emplProfile"]);
					} else {
						$(".profile-wrap img").attr("src","../../../resources/images/img_no_profile.png");
					}
				},
				error : function() {
					alert("직원 조회에 실패했습니다.");
				}
			});
		}

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
							//var $li = '<li id="'+ codeId +'"><span>' + codeNm+ '</span></li>';
							//var $sLi = '<li id="'+ codeId +'"><span>'+ codeNm + '</span></li>';
							var $ul = '<ul><li id="'+ codeId +'"><a href="#">' + codeNm+ '</a></li></ul>';
							// 1레벨은 그냥 추가
							// 다음 레벨부터는 상위 li의 클래스를 폴더로 바꾸고 자기 자신을 추가
							if (codeLvl == 0) {
								var $li = '<li id="'+ codeId +'" lvl="' + codeLvl + '"><a href="#">'+ codeNm + '</a></li>';
								$rootList.append($li);
							} else {
								if(codeLvl == 3){
									$ul = '<ul id="emplUl"><li id="'+ codeId +'" onclick="emplDetailView(this);"><a href="#">' + codeNm+ '</a><input type="hidden" value="'+codeId+'"></li></ul>';
								}
// 								var parentLi = $("li[id='"+parentId+"']");
// 								var $bUl = parentLi.find("ul");
// 								if($bUl.length == 0) {
// 									$li = "<ul>" + $li + "</ul>";
// 									parentLi.append($li);
// 								}else{
// 									$bUl.append($li);
// 								}
								$("#" + parentId).append($ul);
							}
						});
					} else {
						alert("조직도 데이터가 없습니다.");
					}
// 					$.ajax({
// 						url : "/group/selectAllGroupMember.hirp",
// 						type : "get",
// 						dataType : "json",
// 						success : function(data) {
// 							if (data.length != 0) {
// 								data.forEach(function(e, i) {
// 									console.log(e);
// 									var emplName = e.emplName;
// 									var codeId = e.deptCode;
// 									var $ul = '<ul><li id="'+ codeId +'"><a href="#">' + emplName+ '</a></li></ul>';
// 									$("#" + codeId).append($ul);
// 								});
// 							} 
// 						},
// 						error : function() {
// 							alert("조직도 조회 중에 실패했습니다.");
// 						}
// 					});
					$("#orgList, #navigation").treeview({
						collapsed : false
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