<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<!DOCTYPE html>
<html>
<%@ include file="/WEB-INF/views/include/inc_head.jsp" %>
<link rel="stylesheet" href="../../../resources/css/sub.css"><!-- 하이알피 서브페이지 CSS -->
<script src="http://code.jquery.com/jquery-3.5.1.min.js"></script>
<body>
    <%@ include file="/WEB-INF/views/include/inc_header.jsp" %>

	<div id="conts">
		<%@ include file="/WEB-INF/views/include/inc_board.jsp"%>

		<article id="sub" class="">

			<%@ include file="/WEB-INF/views/include/inc_nav_right.jsp"%>


			<h1 class="basic-border-bottom">게시판 홈</h1>

			<div id="guide" class="subConts"></div>
			<table>
				<tr>
					<td>번호</td>
					<td>${notice.noticeNo }</td>
				</tr>
				<tr>
					<td>제목</td>
					<td>${notice.noticeTitle }</td>
				</tr>
				<tr>
					<td>글쓴이</td>
					<td>${notice.emplId }</td>
				</tr>
				<tr>
					<td>작성날짜</td>
					<td>${notice.writeDate }</td>
				</tr>
				<tr>
					<td>조회수</td>
					<td>${notice.noticeCount }</td>
				</tr>
				<tr height="300px">
					<td>내용</td>
					<td>${notice.noticeContents }</td>
				</tr>

				<tr>
					<td>첨부파일</td>
					<c:forEach var="f" items="${fList}">
						<td>${f.fileName }</td>
					</c:forEach>
				</tr>

				<tr>
					<td colspan="2" align="center"><c:url var="nModify"
							value="/notice/modifyView.hirp">
							<c:param name="noticeNo" value="${notice.noticeNo}"></c:param>
						</c:url> <c:url var="nDelete" value="/notice/remove.hirp">
							<c:param name="noticeNo" value="${notice.noticeNo} "></c:param>
						</c:url>

						<button onclick="location.href='${nModify }'">수정</button>
						<button id="remove-btn" onclick="remove()">삭제</button></td>
				</tr>
			</table>
			<table>
				<tr>
					<td><input type="text"  id="rContents" style='width:800px;' placeholder="댓글을 입력해 주세요."></td>
					<td><button id="rSubmit">등록하기</button></td>
				</tr>
			</table>
			<table id="rtb">
				<thead>
					<!-- <tr>
						<td><b id="rCount"></b></td>
					</tr> -->
				</thead>
				<tbody>
				</tbody>
			</table>
		</article>
	</div>

	<script>
		getReplyList();
		
		function remove() {
				if (confirm("정말삭제하시겠습니까?") == true) {
					window.location.href = '${nDelete }'
				} else {
					return;
				}
			} 
		
		$("#rSubmit").on("click", function(){
			var boardNo = "${notice.noticeNo}";
			var boardCode = "${notice.boardCode}";
			var replyContents = $("#rContents").val();
			$.ajax({
				url : "/notice/replyAdd.hirp",
				type : "post",
				data : {"boardCode" : boardCode, "boardNo" : boardNo, "replyContents" : replyContents},
				success : function(data){
					if(data == "success"){
						alert("댓글등록성공");
						getReplyList();
					}else{
						alert("댓글 등록 실패");
					}
				},
				error : function(){
					alert("댓글 등록 과정에서 오류가 발생했습니다.");	
				}
			});
		});
	
		function getReplyList() {
			var boardNo = "${notice.noticeNo}";
			var boardCode = "${notice.boardCode}"
			$.ajax({
				url  : "/notice/replyList.hirp",
				type : "get",
				data : { "boardNo" : boardNo, "boardCode" : boardCode },
				dataType : "json",
				success : function(data) { 
					var count = data.length;
					var $tableBody = $("#rtb tbody");
					$tableBody.html(""); 
					var $trCount = $("<tr>");
					var $tdCount = $("<td colspan='4'>").html("<b>댓글 (" + count + ")</b>");
					$trCount.append($tdCount);
					$tableBody.append($trCount);
					for(var i = 0; i < data.length; i++) {
						var $tr = $("<tr>");
						var $br = $("<br>");
						var $rWriter 	 = $("<td width='100'>").text(data[i].emplId);
						var $rContent 	 = $("<td width='250'>").text(data[i].replyContents);
						var $rCreateDate = $("<td width='100'>").text(data[i].writeDate);
						var $btnArea 	 = $("<td width='80'>")
											.append("<a href='javascript:void(0)' onclick='modReplyView(this, "+data[i].replyNo+", \""+data[i].replyContents+"\");'>수정</a> ")
											.append("<a href='javascript:void(0)' onclick='removeReply("+data[i].replyNo+");'>삭제</a>")
							
						var $btnReReply	 = $("<td width='80'>").append("<a href='javascript:void(0)' onclick='ReReplyWriteView(this, "+data[i].replyNo+", \""+data[i].replyContents+"\");'>답글</a>");
						
						if(data[i].replyOrder == 0){
							$tr.append($rWriter);
							$tr.append($rContent);
							$tr.append($rCreateDate);
							$tr.append($btnArea);
							$tr.append($btnReReply);
							$tableBody.append($tr);
						}else{
							$tr.append($br).append($rWriter);
							$tr.append($rContent);
							$tr.append($rCreateDate);
							$tr.append($btnArea);
							$tableBody.append($tr);
						}
					}
				},
				error   : function() { 
					var $tableBody = $("#rtb tbody");
					$tableBody.html(""); 
					var $trCount = $("<tr>");
					var $trMsg = $("<tr>");
					var $tdCount = $("<td colspan='4'>").html("<b>댓글 (0)</b>");
					var $tdMsg = $("<td colspan='4'>").text("댓글이 없습니다.");
					$trCount.append($tdCount);
					$trMsg.append($tdMsg);
					$tableBody.append($trCount);
					$tableBody.append($trMsg);
				}
			});
		}
		
		function removeReply(replyNo) {
			var answer = confirm("정말 삭제하시겠습니까?"); 
			if (answer) { 
			$.ajax({
				url  : "/notice/deleteReply.hirp",
				type : "get",
				data : { "replyNo" : replyNo },
				success : function(data) {
					if(data == "success") {
						getReplyList();
					}else{
						alert("댓글 삭제 실패!");
					}
				},
				error 	: function() {
					alert("Ajax 통신 실패");
				}
			});
			}
		}
		
		function modReplyView(obj, replyNo, replyContents) {
			var $trModify = $("<tr>");
			var $tdModify = $("<td colspan='3'>");
			var $tdModifyBtn = $("<td>");
			
			$tdModify.append("<input type='text' size='50' value='"+replyContents+"' id='modifyData'>");
			$tdModifyBtn.append("<button onclick='modReply("+replyNo+");'>수정완료</button>");
			$trModify.append($tdModify);
			$trModify.append($tdModifyBtn);
			$(obj).parent().parent().after($trModify);
		}
		
		   function modReply(replyNo) {
			var modifiedData = $("#modifyData").val();
			$.ajax({
				url : "/notice/modifyReply.hirp",
				type : "post",
				data : { "replyNo" : replyNo, "replyContents" : modifiedData },
				success : function(data) {
					if(data == "success") {
						getReplyList();
					}else{
						alert("댓글 수정 실패");
					}
				},
				error : function() {
					alert("Ajax 통신 실패");
				}
			})
		} 
		
		   function ReReplyWriteView(obj, parentReplyNo, replyContents) {
			    var $trReReply = $("<tr>");
				var $tdReReply = $("<td colspan='3'>");
				var $tdReReplyBtn = $("<td>");
				
				$tdReReply.append("<input type='text' size='50' id='reReplyData'>");
				$tdReReplyBtn.append("<button onclick='insertReReply("+parentReplyNo+");'>등록</button>");
				$trReReply.append($tdReReply);
				$trReReply.append($tdReReplyBtn);
				$(obj).parent().parent().after($trReReply);
			
			}
		   
		   function insertReReply(parentReplyNo) {
			   var boardNo = "${notice.noticeNo}";
			   var boardCode = "${notice.boardCode}"; 
			   var replyContents = $("#reReplyData").val();
				$.ajax({
					url : "/notice/registerReReply.hirp",
					type : "post",
					data : { "parentReplyNo" : parentReplyNo, "replyContents" : replyContents,"boardCode" : boardCode, "boardNo" : boardNo, "replyContents" : replyContents },
					success : function(data) {
						if(data == "success") {
							alert("등록 성공");
							getReplyList();
						}else{
							alert("등록 실패");
						}
					},
					error : function() {
						alert("Ajax 통신 실패");
					}
				})
			} 
		   
		   
	</script>		
			
</body>
</html>