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

<body>
	<%@ include file="/WEB-INF/views/include/inc_header.jsp"%>
	<div id="conts">
		<article id="sub" class="">
			<%@ include file="/WEB-INF/views/include/inc_nav_right.jsp"%>
			<h1 class="basic-border-bottom">조직도</h1>
			<div id="organization" class="subConts">
				<ul id="orgList">
				</ul>
			</div>
		</article>
	</div>

	<script>
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