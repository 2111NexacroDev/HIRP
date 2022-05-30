<%@page import="java.util.Date"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>	<!-- jstl core -->
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %> <!-- jstl 함수 -->
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %> <!-- jstl fmt -->

<!DOCTYPE html>
<html>
<head>
	<%@ include file="/WEB-INF/views/include/inc_head.jsp" %>
	<link rel="stylesheet" href="../../../resources/css/chat.css">
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>웹소켓 채팅</title>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/sockjs-client/1.4.0/sockjs.js"></script>
	<script type="text/javascript">
		
		//이전 채팅의 값
		var prevEmplId = "";
// 		var prevDay = (year + '-' + month  + '-' + (day*1-1)); //이전 채팅의 보낸 날짜, 일단 테스트하려고 어제 날짜로 넣어놓음
		var prevDay = "";
		var prevMsgTime = "";
		
		//현재 시간
		var today = new Date();
		var year = today.getFullYear();
		var month = ('0' + (today.getMonth() + 1)).slice(-2);
		var day = ('0' + today.getDate()).slice(-2);
		var week = ['일', '월', '화', '수', '목', '금', '토'];
	    var dayOfWeek = week[new Date(today).getDay()]; //요일
		var dateString = year + '-' + month  + '-' + day;
		
		var hours = ('0' + today.getHours()).slice(-2); 
		var minutes = ('0' + today.getMinutes()).slice(-2);
		var seconds = ('0' + today.getSeconds()).slice(-2); 
		var timeString = "";
	
		if(hours < 12) {
			timeString += "오전 "+ hours + ":" + minutes;
		} else if (hours == 12){
			timeString += "오후 "+ hours + ":" + minutes;
		} else {
			timeString += "오후 "+ (hours*1-12) + ":" + minutes;
		}
		console.log(timeString);
		
	var webSocket = {
			init: function(param) {
				chatMsgList(); //웹소켓 연결될 때 이전 채팅 내역 불러오기
				this._url = param.url;
				this._initSocket();
			},
			sendChat: function() {
				//개행 처리
				var text = $('#message').val().replaceAll(/(\n|\r\n)/g, "<br>");
				console.log(text);
				this._sendMessage('${param.chatroomNo}', 'CMD_MSG_SEND', "${sessionScope.emplId}", "${sessionScope.emplName}",  "${sessionScope.deptName}", "${sessionScope.positionName}", text);
				$('#message').val('');
			},
			sendEnter: function() {
				//개행 처리
				var text = $('#message').val().replaceAll(/(\n|\r\n)/g, "<br>");
				this._sendMessage('${param.chatroomNo}', 'CMD_ENTER', "${sessionScope.emplId}", "${sessionScope.emplName}", "${sessionScope.deptName}", "${sessionScope.positionName}", text);
				$('#message').val('');
			},
			receiveMessage: function(msgData) {
				// 정의된 CMD 코드에 따라서 분기 처리
				if(msgData.cmd == 'CMD_MSG_SEND') {
					console.log(prevDay);
					if(prevDay != dateString){ //이전 메세지에서 prevDay에 오늘 날짜 저장한 값이랑 오늘 날짜랑 다르면 div를 한번 출력해준다.
						$('#divChatData').append('<div class="t-c">' 
													+ '<div class="shadow mt-10 mb-10" style="display:inline-block; border-radius: 20px; background-color:#ffffff; opacity:0.8; padding: 10px 30px 10px;">'
														+ year + "년 " + month + "월 " + day + "일 " + dayOfWeek + "요일"
													+ '</div>'
												+'</div>');
					}
					if("${sessionScope.emplId}" == msgData.emplId){ //내가 보낸 메세지
						$('#divChatData').append('<div class="" style="text-align: right; ">' 
													+ '<div class="padding-10 mt-10 bor-round shadow" style="text-align:left; max-width: 80%; word-wrap: break-word; word-break: break-word; display:inline-block; background-color:#FFF612;">' + msgData.msg + '</div>'
												+ '</div>');
						if(msgData.emplId != prevEmplId || timeString != prevMsgTime) {
							//이전 채팅의 아이디와 이 채팅의 아이디가 다르거나, 이전 시간과 현재 시간이 같지 않을 때 시간 추가
							//채팅 시간 추가
							$('#divChatData').append('<div class="mt-10" style="text-align:right;">' + timeString + '</div>');
						}
						if(msgData.emplId == prevEmplId && timeString == prevMsgTime){
							//아이디와 시간이 모두 같을 때
							//채팅 시간 위치 갱신 (원래 위에 있는 div를 지우고 아래 추가)
							console.log($('#divChatData div:nth-last-child(2)')); //뒤에서 두번째 요소 선택 = 이전 채팅 시간 div
							$('#divChatData div:nth-last-child(2)').remove(); //삭제하고
							$('#divChatData').append('<div class="mt-10" style="text-align:right;">' + timeString + '</div>'); //다시 출력
						}
					} else { //다른 사람이 보낸 메세지
						if(msgData.emplId != prevEmplId ){ //이전에 보낸 사람이랑 아이디 다를 때만 보낸 사람 정보 출력
							$('#divChatData').append('<div class="mt-10">' + msgData.deptName + " " + msgData.emplName + " " + msgData.positionName + '</div>');
						}
						$('#divChatData').append('<div class="">' 
								+ '<div class="padding-10 mt-10 bor-round shadow" style="max-width: 80%; word-wrap: break-word; word-break: break-word; display:inline-block; background-color:#ffffff;">' + msgData.msg + '</div>'
							+ '</div>');
// 						$('#divChatData').append('<div class="padding-10 mt-10 mb-10 bor-round shadow" style=" display:inline-block; background-color:#ffffff;">' + msgData.msg + '</div>');
						
						if(msgData.emplId != prevEmplId || timeString != prevMsgTime) {
							//이전 채팅의 아이디와 이 채팅의 아이디가 다르거나, 이전 시간과 현재 시간이 같지 않을 때 시간 추가
							//채팅 시간 추가
							$('#divChatData').append('<div class="mt-10">' + timeString + '</div>');
						}
						if(msgData.emplId == prevEmplId && timeString == prevMsgTime){
							//아이디와 시간이 모두 같을 때
							//채팅 시간 위치 갱신 (원래 위에 있는 div를 지우고 아래 추가)
							console.log($('#divChatData div:nth-last-child(2)')); //뒤에서 두번째 요소 선택 = 이전 채팅 시간 div
							$('#divChatData div:nth-last-child(2)').remove(); //삭제하고
							$('#divChatData').append('<div class="mt-10">' + timeString + '</div>'); //다시 출력
						}
					}
					prevEmplId = msgData.emplId;
					prevDay = dateString; //출력 후에 오늘 날짜로 prevDay 갱신
					prevMsgTime = timeString; //prevMsgTime을 현재 시간으로 갱신
				}
				// 입장
				else if(msgData.cmd == 'CMD_ENTER') {
					$('#divChatData').append('<div>' + msgData.deptName + " " + msgData.emplName + " " + msgData.positionName + msgData.msg + '</div>');
				}
				// 퇴장
				else if(msgData.cmd == 'CMD_EXIT') {					
					$('#divChatData').append('<div>' + msgData.deptName + " " + msgData.emplName + " " + msgData.positionName + msgData.msg + '</div>');
				}
			},
			closeMessage: function(str) {
				$('#divChatData').append('<div>' + '연결 끊김 : ' + str + '</div>');
			},
			disconnect: function() {
				this._socket.close();
			},
			_initSocket: function() {
				this._socket = new SockJS(this._url);
				this._socket.onopen = function(evt) {
					webSocket.sendEnter();
				};
				this._socket.onmessage = function(evt) {
					webSocket.receiveMessage(JSON.parse(evt.data));
				};
				this._socket.onclose = function(evt) {
					webSocket.closeMessage(JSON.parse(evt.data));
				}
			},
			_sendMessage: function(chatroomNo, cmd, emplId, emplName, deptName, positionName, msg) {
				var msgData = {
						chatroomNo : chatroomNo,
						cmd : cmd,
						emplId : emplId,
						emplName : emplName,
						deptName : deptName,
						positionName : positionName,
						msg : msg
				};
				var jsonData = JSON.stringify(msgData);
				this._socket.send(jsonData);
			}
		};
		$(document).ready(function() {
			webSocket.init({ url: '<c:url value="/chat" />' });
			$("#divChatParent").scrollTop($("#divChatParent")[0].scrollHeight); //스크롤 젤 밑으로 내리기가 안되는 중..
		});
		
		//이전 채팅 내역 불러오기
		function chatMsgList(){
			$.ajax({
				url:"/chat/printMessage.hirp",
				type:"post",
				data:{"chatroomNo" : "${chatroom.chatroomNo}"},
				success: function(msgList){
					console.log("성공");
	    			console.log(msgList);
	    			var count = msgList.length;
	    			
	    			var $divChatData = $("#divChatData");
	    			$divChatData.html("");//기존 내용 있으면 비우기
	    			
	    			var prevId =""; //이전 아이디값
	    			var prevTime = ""; //이전 시간값, 11:20
	    			
	    			for(var i=0; i<count; i++){
// 	    				$('#divChatData').append('<div style="text-align:center;">' 
// 								+ '<div class="shadow mt-10 mb-10" style="display:inline-block; border-radius: 20px; background-color:#ffffff; opacity:0.8; padding: 10px 30px 10px;">'
// 									+ year + "년 " + month + "월 " + day + "일 " + dayOfWeek + "요일"
// 								+ '</div>'
// 							+'</div>');
	    				
    					var msgSenddate = new Date(msgList[i].msgSenddate); //가져온 데이터 날짜
    					var msgDayOfWeek = week[new Date(msgSenddate).getDay()]; //가져온 데이터 요일
    					
	    				//날짜 출력
	    				if(i == 0) {
		    				var date = "<div class='t-c'>"
		    								+ "<div class='shadow mt-10 mb-10' style='display:inline-block; border-radius: 20px; background-color:#ffffff; opacity:0.8; padding: 10px 30px 10px;'>"
		    									+ msgList[i].msgSenddate.substr(0, 4) +  "년 " + msgList[i].msgSenddate.substr(5, 2) + "월 " + msgList[i].msgSenddate.substr(8, 2) + "일 "
		    									+ msgDayOfWeek + "요일"
		    								+ "</div>"
		    							+"</div>";
		    				$divChatData.append(date);
	    				}
	    				if(i > 0 && msgList[i].msgSenddate.substr(0, 10) != msgList[i-1].msgSenddate.substr(0, 10)){
		    				var date = "<div class='t-c'>"
											+ "<div class='shadow mt-10 mb-10' style='display:inline-block; border-radius: 20px; background-color:#ffffff; opacity:0.8; padding: 10px 30px 10px;'>"
												+ msgList[i].msgSenddate.substr(0, 4) +  "년 " + msgList[i].msgSenddate.substr(5, 2) + "월 " + msgList[i].msgSenddate.substr(8, 2) + "일 "
												+ msgDayOfWeek + "요일"
											+ "</div>"
										+"</div>";
		    				$divChatData.append(date);
	    				}
	    				
	    				
	    				var msgEmplId = "";
	    				var msgContents = "";
	    				var msgDate = "";
	    				if(msgList[i].msgSendid == "${sessionScope.emplId}"){ //내가 보낸 메세지
	    					console.log("아이디 비교");
	    					console.log("${sessionScope.emplId}");
	    					console.log(msgList[i].msgSendid);
	    					console.log(msgList[i].msgSendid == "${sessionScope.emplId}");
	    					
	    					
		    				msgEmplId = "<div class='mt-10' style='text-align:right;'>"+ msgList[i].deptName + " "+ msgList[i].emplName + " " + msgList[i].positionName + "</div>";
		    				msgContents += "<div style='text-align:right;'>"
						    					+ "<div class='padding-10 mt-10 bor-round shadow' style='text-align:left; max-width: 80%; word-wrap: break-word; word-break: break-word; display:inline-block; background-color:#FFF612;'>" 
						    						+ msgList[i].msgContents 
						    					+ "</div>"
											+ "</div>";
							if(msgList[i].msgSendid != prevId || msgList[i].msgSenddate.substring(11, 16) != prevTime){
								//이전 채팅의 아이디와 이 채팅의 아이디가 다르거나, 이전 시간과 현재 시간이 같지 않을 때 시간 추가
								//채팅 시간 추가
								if(msgList[i].msgSenddate.substring(11, 13) < 12) {
									msgDate += "<div class='mt-10' style='text-align:right;'> 오전 "+ msgList[i].msgSenddate.substring(11, 13) + ":" + msgList[i].msgSenddate.substring(14, 16) + "</div>";
								} else if (msgList[i].msgSenddate.substring(11, 13) == 12){
									msgDate += "<div class='mt-10' style='text-align:right;'> 오후 "+ msgList[i].msgSenddate.substring(11, 13) + ":" + msgList[i].msgSenddate.substring(14, 16) + "</div>";
								} else {
									msgDate += "<div class='mt-10' style='text-align:right;'> 오후 "+ (msgList[i].msgSenddate.substring(11, 13)*1-12) + ":" + msgList[i].msgSenddate.substring(14, 16) + "</div>";
								}
								
							}
							if(msgList[i].msgSendid == prevId && msgList[i].msgSenddate.substring(11, 16) == prevTime){
// 								console.log("div 삭제");
// 								console.log($('#divChatData div:last')); //위에 웹소켓 거랑 무슨 차인진 모르겠는데 이렇게 찾아야 나옴...
								$('#divChatData div:last').remove(); //이전 시간 div 삭제
								if(msgList[i].msgSenddate.substring(11, 13) < 12) {
									msgDate += "<div class='mt-10' style='text-align:right;'> 오전 "+ msgList[i].msgSenddate.substring(11, 13) + ":" + msgList[i].msgSenddate.substring(14, 16) + "</div>";
								} else if (msgList[i].msgSenddate.substring(11, 13) == 12){
									msgDate += "<div class='mt-10' style='text-align:right;'> 오후 "+ msgList[i].msgSenddate.substring(11, 13) + ":" + msgList[i].msgSenddate.substring(14, 16) + "</div>";
								} else {
									msgDate += "<div class='mt-10' style='text-align:right;'> 오후 "+ (msgList[i].msgSenddate.substring(11, 13)*1-12) + ":" + msgList[i].msgSenddate.substring(14, 16) + "</div>";
								}
							}
// 							$divChatData.append(msgEmplId);
							$divChatData.append(msgContents);
							$divChatData.append(msgDate);
	    				} else { //받은 메세지
	    					//메모!!****중요!!
	    					//|| msgList[i].msgSenddate.substring(11, 16) != prevTime
	    					//만약에 시간이 달라질 때마다 상대방 이름을 띄우게 하고 싶으면 위 코드를 아래 if문에 추가하면 됨.
	    					//근데 지금 시간이 메세지 아래 나와서 보기 싫으니까 .. 일단은 이대로 두겠음.
	    					
	    					if(prevId != msgList[i].msgSendid ){ //저장한 아이디값과 (이전 메세지 아이디값) 현재 아이디값이 다르면 출력
			    				msgEmplId = "<div class='mt-10'>"+ msgList[i].deptName + " " + msgList[i].emplName + " " + msgList[i].positionName +"</div>";
	    					}
	    					msgContents += "<div>"
					    					+ "<div class='padding-10 mt-10 bor-round shadow' style='max-width: 80%; word-wrap: break-word; word-break: break-word; display:inline-block; background-color:#ffffff;'>" 
					    						+ msgList[i].msgContents 
					    					+ "</div>"
										+ "</div>";
		    				
		    				if(msgList[i].msgSendid != prevId || msgList[i].msgSenddate.substring(11, 16) != prevTime){
								//이전 채팅의 아이디와 이 채팅의 아이디가 다르거나, 이전 시간과 현재 시간이 같지 않을 때 시간 추가
								//채팅 시간 추가
		    					if(msgList[i].msgSenddate.substring(11, 13) < 12) {
									msgDate += "<div class='mt-10'> 오전 "+ msgList[i].msgSenddate.substring(11, 13) + ":" + msgList[i].msgSenddate.substring(14, 16) + "</div>";
								} else if (msgList[i].msgSenddate.substring(11, 13) == 12){
									msgDate += "<div class='mt-10'> 오후 "+ msgList[i].msgSenddate.substring(11, 13) + ":" + msgList[i].msgSenddate.substring(14, 16) + "</div>";
								} else {
									msgDate += "<div class='mt-10'> 오후 "+ (msgList[i].msgSenddate.substring(11, 13)*1-12) + ":" + msgList[i].msgSenddate.substring(14, 16) + "</div>";
								}								
							}
							if(msgList[i].msgSendid == prevId && msgList[i].msgSenddate.substring(11, 16) == prevTime){
// 								console.log("div 삭제");
// 								console.log($('#divChatData div:last')); //위에 웹소켓 거랑 무슨 차인진 모르겠는데 이렇게 찾아야 나옴...
								$('#divChatData div:last').remove(); //이전 시간 div 삭제
								if(msgList[i].msgSenddate.substring(11, 13) < 12) {
									msgDate += "<div class='mt-10'> 오전 "+ msgList[i].msgSenddate.substring(11, 13) + ":" + msgList[i].msgSenddate.substring(14, 16) + "</div>";
								} else if (msgList[i].msgSenddate.substring(11, 13) == 12){
									msgDate += "<div class='mt-10'> 오후 "+ msgList[i].msgSenddate.substring(11, 13) + ":" + msgList[i].msgSenddate.substring(14, 16) + "</div>";
								} else {
									msgDate += "<div class='mt-10'> 오후 "+ (msgList[i].msgSenddate.substring(11, 13)*1-12) + ":" + msgList[i].msgSenddate.substring(14, 16) + "</div>";
								}							}
							
// 							if(msgList[i].msgSenddate.substring(11, 13) < 12) {
// 								msgDate += "<div class='mt-10'> 오전 "+ msgList[i].msgSenddate.substring(11, 13) + ":" + msgList[i].msgSenddate.substring(14, 16) + "</div>";
// 							} else if (msgList[i].msgSenddate.substring(11, 13) == 12){
// 								msgDate += "<div class='mt-10'> 오후 "+ msgList[i].msgSenddate.substring(11, 13) + ":" + msgList[i].msgSenddate.substring(14, 16) + "</div>";
// 							} else {
// 								msgDate += "<div class='mt-10'> 오후 "+ (msgList[i].msgSenddate.substring(11, 13)*1-12) + ":" + msgList[i].msgSenddate.substring(14, 16) + "</div>";
// 							}
							$divChatData.append(msgEmplId);
							$divChatData.append(msgContents);
							$divChatData.append(msgDate);
	    				}
	    				
	    				prevId = msgList[i].msgSendid; //for문 끝나기 직전에 현재 아이디값을 prevId로 저장
	    				prevTime = msgList[i].msgSenddate.substring(11, 16); //시간 부분 저장 (11:20 이런 식)
	    				
	    				//페이지 변수에다가 날짜값 넘겨줌
	    				//for문이 반복되는 동안 계속해서 넘겨주고, 
	    				//페이지 맨 위에 정의한 prevDay가 마지막 for문에서 담긴 값으로 적용되도록
	    				//이렇게 안해주니까 select랑 데이터 넣는 거랑 따로라서 채팅 연결되면 
	    				//prevDay = "" 라서 날짜가 무조건 나옴..
		    			prevDay = msgList[i].msgSenddate.substr(0, 10);
					}
	    			
	    		},
	    		error: function(){
	    			console.log("실패"); //새로 만든 방이라는 뜻
	    			var $divChatData = $("#divChatData");
	    			var divDate = '<div class="t-c">' 
									+ '<div class="shadow mt-10 mb-10" style="display:inline-block; border-radius: 20px; background-color:#ffffff; opacity:0.8; padding: 10px 30px 10px;">'
											+ year + "년 " + month + "월 " + day + "일 " + dayOfWeek + "요일"
										+ '</div>'
									+'</div>';
	    			$divChatData.append(divDate);
	    			prevDay = dateString; //여기서도 날짜 갱신
	    			//채팅방 새로 만들어지면 한번 띄워줌. 그다음부터는 prevDay에 담겨진 값으로 비교하기떄문에 여기서도 넣어주어야 함.
	    			
	    		}
			});
		}
		
		//채팅 정보창 열기
		function chatInfoWindow(chatroomNo){ //원래는 roomId
			window.open('/chatInfo.hirp?chatroomNo='+chatroomNo,'chattingRoomInfo'+chatroomNo,'width=350,height=550,left=820,top=0,location=no,status=no,scrollbars=no');
		}
	</script>
</head>
<body>
	<div id="conts" class="pos-rel">
        <article id="sub">
			<div style="background-color:#0b2a60; height:50px;">
				<h2 style="padding:12px 20px 16px; color:white; display:inline-block">
					${chatroom.chatroomName} 
					<c:if test="${chatroom.chatroomType eq 'G'}">
						(${fn:length(chatRoomJoinList)})
					</c:if>
				</h2>
				<c:if test="${chatroom.chatroomType eq 'G'}">
					<button onclick="chatInfoWindow(${chatroom.chatroomNo})" style="float:right; margin-top: 10px; margin-right: 10px; font-size:18px; background:none; color:white;"><i class="fa-solid fa-ellipsis"></i></button>&nbsp;
				</c:if>
			</div>
			<div id="divChatParent" style="background-color:#CFE4F8; overflow:scroll; height: 440px; padding:10px; padding-left: 20px; border: solid 1px #e1e3e9;">
				<div id="divChatData" style=""></div>
			</div>
			<div class="t-c" style="width: 100%; height: 10%; padding: 10px;">
		<!-- 		<input type="text" id="message" style="width:70%" onkeypress="if(event.keyCode==13){webSocket.sendChat();}" /> -->
				<!-- shift+enter로 개행 가능, 근데 그냥 엔터했을 때 왜 자꾸 한줄이 더 들어가냐구 ******* 중요 고쳐야함 -->
				<textarea id="message" style="width:80%; height:70px; white-space: pre-wrap;" onkeypress="if(event.keyCode===13){ if (!event.shiftKey) { webSocket.sendChat();} }"> 
				</textarea>
				<input type="button" id="btnSend" style="position:relative; bottom:10px" value="채팅 전송" onclick="webSocket.sendChat()" />
			</div>
		</article>
	</div>
</body>
</html>
