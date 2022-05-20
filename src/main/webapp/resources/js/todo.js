$('.todo--today .btn--plus').on('click', function () {
    if ($('.todo--today .no-data').length != 0) {
        $('.todo--today .no-data').hide();
    }
    $('.todo--today ul').append(
        '<li>' +
        '<input id="todoNew" type="checkbox">' +
        '<label for="todoNew"></label>' +
        '<input name="todoConts" type="text">' +
        '<div class="btns-wrap">' +
        '<button class="point" onclick="addTodo(this)">등록</button>' +
        '<button class="finished" onclick="removeLine(this)">취소</button>' +
        '</div>' +
        '</li>'
    );
});

$('.memo--list .btn--plus').on('click', function () {
    if ($('.memo--list .no-data').length != 0) {
        $('.memo--list .no-data').hide();
    }
    $('.memo--list ul').append(
        '<li>' +
        '<textarea name="memoConts"></textarea>' +
        '<div class="btns-wrap">' +
        '<button class="point" onclick="addMemo(this)">등록</button>' +
        '<button class="finished" onclick="removeLine(this)">취소</button>' +
        '</div>' +
        '</li>'
    );
});

$('.todo--today label').on('click', function () {
    let checkedValue = $(this).siblings('input[type="checkbox"]').prop('checked');
    let todoNo = $(this).attr('for');
    let isFinished;

    if (checkedValue == false) {
        isFinished = 'Y'
    } else {
        isFinished = 'N'
    };

    $.ajax({
        url: '/todo/checked.hirp',
        type: 'post',
        data: {
            'isFinished': isFinished,
            'todoNo': todoNo
        },
        success: function (data) {
            if (data == 'success') {
                console.log('체크 성공!');
            } else {
                console.log('체크 실패');
            }
        },
        error: function () {
            alert('ajax오류!')
        }
    });
});

function addTodo(obj) {
    let todoConts = $(obj).parent().siblings('input[name="todoConts"]').val();

    $.ajax({
        url: '/todo/write.hirp',
        type: 'post',
        data: {
            'todoConts': todoConts
        },
        success: function (data) {
            if (data == 'success') {
                console.log('등록 성공!');
                window.location.reload();
            } else {
                console.log('등록 실패');
            }
        },
        error: function () {
            alert('ajax오류!')
        }
    });
}

function editTodo(todoNo, obj) {
    let todoConts = $(obj).parent().siblings('input[name="todoConts"]').val();

    $.ajax({
        url: '/todo/modify.hirp',
        type: 'post',
        data: {
            'todoNo': todoNo,
            'todoConts': todoConts
        },
        success: function (data) {
            if (data == 'success') {
                console.log('수정 성공!');
            } else {
                console.log('수정 실패');
            }
        },
        error: function () {
            alert('ajax오류!')
        }
    });
}

function removeLine(obj) {
    $(obj).parent().parent().remove();
}

function removeTodo(todoNo) {
    $.ajax({
        url: '/todo/remove.hirp',
        type: 'get',
        data: {
            'todoNo': todoNo
        },
        success: function (data) {
            if (data == 'success') {
                console.log('삭제 성공!');
            } else {
                console.log('삭제 실패');
            }
        },
        error: function () {
            alert('ajax오류!')
        }
    });
}

function addMemo(obj) {
    let memoConts = $(obj).parent().siblings('textarea[name="memoConts"]').val();

    $.ajax({
        url: '/memo/write.hirp',
        type: 'post',
        data: {
            'memoConts': memoConts
        },
        success: function (data) {
            if (data == 'success') {
                console.log('등록 성공!');
                window.location.reload();
            } else {
                console.log('등록 실패');
            }
        },
        error: function () {
            alert('ajax오류!')
        }
    });
}

function editMemo(memoNo, obj) {
    let memoConts = $(obj).parent().siblings('textarea[name="memoConts"]').val();

    $.ajax({
        url: '/memo/modify.hirp',
        type: 'post',
        data: {
            'memoNo': memoNo,
            'memoConts': memoConts
        },
        success: function (data) {
            if (data == 'success') {
                console.log('수정 성공!');
            } else {
                console.log('수정 실패');
            }
        },
        error: function () {
            alert('ajax오류!')
        }
    });
}

function removeMemo(memoNo) {
    $.ajax({
        url: '/memo/remove.hirp',
        type: 'get',
        data: {
            'memoNo': memoNo
        },
        success: function (data) {
            if (data == 'success') {
                console.log('삭제 성공!');
                window.location.reload();
            } else {
                console.log('삭제 실패');
            }
        },
        error: function () {
            alert('ajax오류!')
        }
    });
}

let calendarEl = document.getElementById('todoCalendar');
let calendar = new FullCalendar.Calendar(calendarEl, {
    headerToolbar: {
        left: '',
        center: 'prev,title,next,today',
        right: '',
    },
    buttonText: {
        today: '오늘',
    },
    initialView: 'dayGridMonth',
    navLinks: false, 
    selectable: false,
    locale: 'en',
    events: [
    ],
    eventClick: function(data) {
        //openScheduleModal(data); //이벤트 클릭 시 모달 호출
    },
    select: function(selectionInfo) {
        //openSelectedScheduleModal(selectionInfo);	//일자 클릭 시 모달 호출
    },
    editable: false,
    dayMaxEvents: true,
});
calendar.render();