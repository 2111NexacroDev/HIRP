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