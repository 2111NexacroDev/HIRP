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
<style>
#boardTop{
position : relative;
width : 1000px;
min-height : 500px;
margin-left : 38px;
margin-top : 55px;
padding : 30px;
border : solid 1px lightgray; 
}

#title-div{
font-size: 30px;
margin-bottom : 10px;
}

.write-div{
margin-top : 10px;
margin-right : 10px;
margin-bottom : 10px;
font-size : 15px;
display: inline-block;
}

.write-div:last-child{
font-size : 10px;
color : lightgray;
}

#attached-file-div{
padding-top : 10px;
padding-bottom : 10px;
font-size : 12px;
border-top : solid 1px lightgray;
border-bottom : solid 1px lightgray;
}

#board-contents-div{
margin-top : 30px;
}

#rContents{
float : left;
}

.board-btn-div{
align : right;
margin-right : 40px;
}

.board-detail-btn{
float : right;
background-color : white;
border : solid 1px lightgray;
border-radius: 10px;
margin-top : 10px;
margin-left : 10px;
width : 100px;
height : 35px;

}

#reply-div{
margin-left : 38px;
}

#rSubmit{
background-color : white;
border : solid 1px lightgray;
height: 30px;
width : 100px;
}

#board-bottom-div{
position : absolute;
bottom : 20px;
left : 20px;
}


#board-bottom-div2{
position : absolute;
bottom : 20px;
left : 100px;
}


.reply-table {
    width: 1000px;
    margin-left : 38px;
    border : 1px solid #ccc;
}

.reply-table th,
.reply-table td {
    /* vertical-align: middle; */
    /* border-collapse: collapse;
    border-bottom: 1px solid #ccc; */
}

.reply-table th {
    padding: 10px 20px;
    text-align: left;
}

.reply-table td {
    padding: 16px 20px;
}

.rContent{
color : gray;
}

#reWriter{
	padding-left : 100px;
}


</style>
<body>
    <%@ include file="/WEB-INF/views/include/inc_header.jsp" %>

	<div id="conts">
		<%@ include file="/WEB-INF/views/include/inc_board.jsp"%>

		<article id="sub" class="">

			<%@ include file="/WEB-INF/views/include/inc_nav_right.jsp"%>


			<h1 class="basic-border-bottom">부서게시판</h1>

			<div class="board-btn-div">
					<c:url var="nModify" value="/department/modifyView.hirp">
						<c:param name="deptNo" value="${dept.deptNo}"></c:param>
					</c:url> 
					<c:url var="nDelete" value="/department/remove.hirp">
						<c:param name="deptNo" value="${dept.deptNo} "></c:param>
					</c:url>

					<button class="board-detail-btn" onclick="remove()" style='color:rgb(192, 57, 43);'><img src="../../../../resources/images/icons/redgarbage.png"style="width:18px; height:auto; vertical-align: middle;"/>삭제하기</button>
					<button class="board-detail-btn" onclick="location.href='${nModify }'"><img src="../../../../resources/images/icons/write.png"style="width:18px; height:auto; vertical-align: middle;"/>수정하기</button>
					
			</div>
			
			
			
			
			<div id="boardTop">
				<div id="title-div"> ${dept.deptTitle }</div>
					<div class="write-div"><img src="../../../../resources/images/profile.jpg" style="width:40px; height:auto; vertical-align: middle;"/> ${dept.emplId }</div>
					<div class="write-div">${dept.writeDate }</div>
				<div id="attached-file-div">		
					<c:forEach var="file" items="${dept.bList}">
						<div><img src="../../../../resources/images/icons/attachedFile.png" style="width:12px; height:auto; vertical-align: middle;"/><a href="../../../../resources/uploadFiles/${file.fileRename }" download>${file.fileName}</a></div>
					</c:forEach>
				</div>
				<div id="board-contents-div">${dept.deptContents }</div>
				<div id="board-bottom-div">조회수   ${dept.deptCount }&nbsp&nbsp&nbsp&nbsp|</div>
			</div>
			
			

				
			<div id="reply-div">
					<div ><input type="text"  id="rContents" style='width:900px;' placeholder="댓글을 입력해 주세요."></div>
					<div><button id="rSubmit">댓글 작성</button></div>
			</div>
			<table class="reply-table" id="rtb">
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
			var boardNo = "${dept.deptNo}";
			var boardCode = "${dept.boardCode}";
			var replyContents = $("#rContents").val();
			$.ajax({
				url : "/reply/add.hirp",
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
			var boardNo = "${dept.deptNo}";
			var boardCode = "${dept.boardCode}"
			$.ajax({
				url  : "/reply/list.hirp",
				type : "get",
				data : { "boardNo" : boardNo, "boardCode" : boardCode },
				dataType : "json",
				success : function(data) { 
					var count = data.length;
					var $boardDiv = $("#boardTop");
					var $tableBody = $("#rtb tbody");
					$tableBody.html(""); 
					var $trCount = $("<tr>");
					
					var $tdCount = $("<div id='board-bottom-div2'>").html("&nbsp&nbsp&nbsp&nbsp<img src='../../../../resources/images/icons/reply.png' style='width:15px; height:auto; vertical-align: middle;'/>&nbsp&nbsp<b>댓글  " + count + "개</b></div>");
					
					
					
					$trCount.append($tdCount);
					$tableBody.append($trCount);
					$boardDiv.append($trCount);
					for(var i = 0; i < data.length; i++) {
						var $tr = $("<tr>");

						var $br = $("<br>");
						var $rWriter 	 = $("<td width='80'><b>").text(data[i].emplId).append("</b>");
						
						var $reWriter 	 = $("<td align : 'right' id='reWriter'><img src='../../../../resources/images/icons/rereply.png' style='width:20px; height:auto; vertical-align: middle; align :right;'/>");
						var $rContent 	 = $("<td width='250' colspan='2' class='rContent'>").text(data[i].replyContents);
						var $reContent 	 = $("<td width='250' class='rContent' >").text(data[i].replyContents);
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
							$tr.append($reWriter).append($rWriter);
							$tr.append($reContent);
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
				url  : "/reply/delete.hirp",
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
				url : "/reply/modify.hirp",
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
			   var boardNo = "${dept.deptNo}";
			   var boardCode = "${dept.boardCode}"; 
			   var replyContents = $("#reReplyData").val();
				$.ajax({
					url : "/register/reReply.hirp",
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