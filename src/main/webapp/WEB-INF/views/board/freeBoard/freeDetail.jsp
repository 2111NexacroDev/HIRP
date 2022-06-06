<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<!DOCTYPE html>
<html>
<%@ include file="/WEB-INF/views/include/inc_head.jsp" %>
<link rel="stylesheet" href="../../../resources/css/sub.css"><!-- 하이알피 서브페이지 CSS -->
<link rel="stylesheet" href="../../../resources/css/board.css">
<script src="http://code.jquery.com/jquery-3.5.1.min.js"></script>

<body>
    <%@ include file="/WEB-INF/views/include/inc_header.jsp" %>

	<div id="conts">
		<%@ include file="/WEB-INF/views/include/inc_board.jsp"%>

		<article id="sub" class="">
			<%@ include file="/WEB-INF/views/include/inc_nav_right.jsp"%>

			<h1 class="basic-border-bottom">자유게시판</h1>

			<div class="subConts">
				
				<div id="boardTop">
					<div class="board-btn-div">
						<c:url var="nModify" value="/free/modifyView.hirp">
							<c:param name="freeNo" value="${free.freeNo}"></c:param>
						</c:url> 
						<c:url var="nDelete" value="/free/remove.hirp">
							<c:param name="freeNo" value="${free.freeNo} "></c:param>
						</c:url>
						<c:if test="${free.emplId eq emplId }">	
						<button class="board-detail-btn" type="button"  style='color:rgb(192, 57, 43);' onclick="openAlert(this);"><img src="../../../../resources/images/icons/redgarbage.png"style="width:16px; height:auto; vertical-align: middle;"/>삭제하기</button>
		                    <section class="section--alert">
		                        <div class="bg-black"></div>
		                        <!-- 검은배경 필요할 경우, 필요없으면 이 태그 통째로 지우기 -->
		                        <div class="section--alert__conts">
		                            <button class="btn--close" type="button"></button>
		                            <p>
		                                확인을 누르시면<br>
		                             게시글이 삭제됩니다. 삭제하시겠습니까?
		                            </p>
		                            
		                            <div class="btns-wrap mt-20">
			                            <c:url var="aDelete" value="/appr/remove.hirp">
											<c:param name="apprNo" value="${approval.apprNo} "></c:param>
										</c:url>
		                                <button class="point" type="button" onclick="location.href='${nDelete }'">확인</button>
		                                <button class="finished closeWindow" type="button">닫기</button>
		                            </div>
		                        </div>
		                    </section>
						<button class="board-detail-btn" onclick="location.href='${nModify }'"><img src="../../../../resources/images/icons/write.png"style="width:16px; height:auto; vertical-align: middle;"/>수정하기</button>
						</c:if>
					</div>

					<div id="title-div"> ${free.freeTitle }</div>
					<c:if test="${free.employee.emplProfile ne null}">
            			<div class="write-div"><img src="../../../resources/uploadFiles/${free.employee.emplProfile }" alt="프로필사진"style="width:35px; height:auto; vertical-align: middle;">${free.employee.emplName }</div>
        			</c:if>
        			<c:if test="${free.employee.emplProfile eq null}">
            			<div class="write-div"><img src="../../../resources/images/img_no_profile.png" alt="프로필사진">${free.employee.emplName }</div>
        			</c:if>
						<div class="write-div">${free.writeDate }</div>
					<div id="attached-file-div">		
						<c:forEach var="file" items="${free.bList}">
							<div><img src="../../../../resources/images/icons/attachedFile.png" style="width:12px; height:auto; vertical-align: middle;"/><a href="../../../../resources/uploadFiles/${file.fileRename }" download>${file.fileName}</a></div>
						</c:forEach>
						<c:if test="${empty free.bList}">
							<p>등록된 파일이 없습니다.</p>
						</c:if>
					</div>
					<div id="board-contents-div">${free.freeContents }</div>
					<div id="board-bottom-div">조회수   ${free.freeCount }&nbsp&nbsp&nbsp&nbsp</div>
				</div>
					
				<div id="reply-div">					
					<div>
						<span>${sessionScope.emplName}</span>
						<textarea id="rContents" maxlength="500" placeholder="댓글을 입력해 주세요."></textarea>
					</div>
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
			</div>
		</article>
	</div>

	<script>
		getReplyList();
		
		
		
		$("#rSubmit").on("click", function(){
			var boardNo = "${free.freeNo}";
			var boardCode = "${free.boardCode}";
			var replyContents = $("#rContents").val();
			$.ajax({
				url : "/reply/add.hirp",
				type : "post",
				data : {"boardCode" : boardCode, "boardNo" : boardNo, "replyContents" : replyContents},
				success : function(data){
					if(data == "success"){
						alert("댓글등록성공");
						$("#reply-div textarea").val("");
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
			var boardNo = "${free.freeNo}";
			var boardCode = "${free.boardCode}"
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
					
					var $tdCount = $("<div id='board-bottom-div2'>").html("|&nbsp&nbsp&nbsp&nbsp<img src='../../../../resources/images/icons/reply.png' style='width:15px; height:auto; vertical-align: middle;'/>&nbsp&nbsp<b>댓글  " + count + "개</b></div>");
					
					
					
					$trCount.append($tdCount);
					$tableBody.append($trCount);
					$boardDiv.append($trCount);
					for(var i = 0; i < data.length; i++) {
						var $tr = $("<tr>");

						var $br = $("<br>");
						var $rWriter 	 = $("<td width='160'><img src='../../../resources/uploadFiles/"+data[i].employee.emplProfile+"' alt='프로필사진'style='width:20px; height:auto; vertical-align: middle; align :right;'><b>").text(data[i].employee.emplName).append("</b>");						
						var $reWriter 	 = $("<td width='160' id='reWriter'><img src='../../../../resources/images/icons/rereply2.png' style='width:20px; height:auto; vertical-align: middle; align :right;'/><b>"+data[i].employee.emplName+"</b>");
						var $rContent 	 = $("<td width='250' colspan='2' class='rContent'>").text(data[i].replyContents);
						var $reContent 	 = $("<td width='250' colspan='2' class='rContent' >").text(data[i].replyContents);
						var $rCreateDate = $("<td class='t-c' width='120'>").text(data[i].writeDate);
						var $btnArea 	 = $("<td class='t-c' width='100'>")
											.append("<a href='javascript:void(0)' onclick='modReplyView(this, "+data[i].replyNo+", \""+data[i].replyContents+"\");'>수정</a> ")
											.append("<a href='javascript:void(0)' onclick='removeReply("+data[i].replyNo+");'>삭제</a>")

							
						var $btnReReply	 = $("<td class='t-c' width='100'>").append("<a href='javascript:void(0)' onclick='ReReplyWriteView(this, "+data[i].replyNo+", \""+data[i].replyContents+"\");'>답글</a>");
						
						if(data[i].replyOrder == 0){
							$tr.append($rWriter);
							$tr.append($rContent);
							$tr.append($rCreateDate);
							$tr.append($btnArea);
							$tr.append($btnReReply);
							$tableBody.append($tr);
						}else{
							$tr.append($reWriter);
							$tr.append($reContent);
							$tr.append($rCreateDate);
							$tr.append($btnArea);
							$tr.append("<td></td>");
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
			   var boardNo = "${free.freeNo}";
			   var boardCode = "${free.boardCode}"; 
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