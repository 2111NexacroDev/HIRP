// 중요메일
function importantMail(imp) {
	var mailNo = $(imp).val();
	var chkimp = $(imp).prop("checked");
	var importantMail;
	if(chkimp == true) {
		importantMail = 'Y';
	}else {
		importantMail = 'N';
	}
	$.ajax({
		url : "/mail/impMail.hirp",
		type : "post",
		data : { "mailNo" : mailNo, "importantMail" : importantMail },
		success : function() {},
		error : function() {
			alert("ajax 실패!");
		}
	});
}

// 임시저장
function temporaryStorage() {
	var mailRecipient = $("input[name=mailRecipient]").val();
	var mailReferrer = $("input[name=mailReferrer]").val();
	var mailTitle = $("input[name=mailTitle]").val();
	var mailFile = $("input[name=uploadFile]").val();
	var mailContents = $("textarea[name=mailContents]").val();
	$.ajax({
		url : "/mail/temporaryStorage.hirp",
		type : "post",
		data : { "mailRecipient" : mailRecipient,
				 "mailReferrer" : mailReferrer,
				 "mailTitle" : mailTitle,
				 "mailFile" : mailFile,
				 "mailContents" : mailContents},
		success : function() {
			location.href="Rlist.hirp";
		},
		error : function() {
			alert("ajax 실패!");
		}
	});
}
		
// 휴지통 메일 전체 삭제
function deleteAllMail() {
	$.ajax({
		url : "/mail/deleteAllMail.hirp",
		type : "get",
		data: {},
		success : function() {
			location.reload();
		},
		error : function() {
			alert("ajax 실패!");
		}
	});
}

// 메일 작성 에디터
$('#summernote').summernote({
    placeholder: '',
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