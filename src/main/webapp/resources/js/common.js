$(function () {
    let windowSize = $(window).width();
    if (windowSize < 768) {
        $('#gnb').addClass('on');
    } else {
        $('#gnb').removeClass('on');
    }

    $(window).resize(function () {
        let windowSize = $(window).width();
        if (windowSize < 768) {
            $('#gnb').addClass('on');
        } else {
            $('#gnb').removeClass('on');
        }
    })

    // 햄버거 버튼 여닫기
    $('#gnb__btn--burger').on('click', function () {
        $('#gnb').toggleClass('on');
    });

    // 개인 메뉴 열기/닫기
    $('.btn--profile').on('click', function () {
        $('.nav--right__info').stop().fadeToggle(100);
    });
    
    // 주소별 gnb 강조색 위치 변경
    let addr = location.href;
    let fullAddr = addr.split('/');
    let selelctAddr = fullAddr[3];

    // 현재 주소와 메뉴 링크가 같을 경우 하이라이트
    if (selelctAddr == '' || selelctAddr == 'home.hirp') {
        $('#gnb>nav>ul>li:first-child>a').addClass('on');
    } else {
        for (let i = 1; i <= $('#gnb>nav>ul>li').length; i++) {
            if (addr.match($('#gnb>nav>ul>li:nth-child(' + i + ')>a').attr('href'))) {
                $('#gnb>nav>ul>li:nth-child(' + i + ')>a').addClass('on');
            }
        };
        $('#gnb>nav>ul>li:first-child>a').removeClass('on');
    }

    // 중간 이름이 동일한 경우
    if (addr.match('/mail')) {
        $('#gnb>nav>ul>li:nth-child(2)>a').addClass('on');
    }
    if (addr.match('/approval')) {
        $('#gnb>nav>ul>li:nth-child(7)>a').addClass('on');
    }
    if (addr.match('/survey')) {
        $('#gnb>nav>ul>li:nth-child(8)>a').addClass('on');
    }

    /* 모달 및 팝업 닫기 */
    $('.btn--close').on('click', function () {
        $(this).parent().parent().stop().fadeOut(100);
    });

    $(document).on('click', '.closeWindow', function () {
        $(this).parent().parent().parent().stop().fadeOut(100);
    });

    $('.bg-black').on('click', function () {
        $(this).parent().stop().fadeOut(100);
    });

    $('body,html').keydown(function (e) {
        if (e.keyCode == 27 || e.which == 27) {
            if ($('.section--modal').css('display') == 'flex') {
                $('.section--modal').fadeOut(200);
            } else if ($('.section--alert').css('display') == 'flex') {
                $('.section--alert').fadeOut(200);
            }

        }
    })
    /* //모달 및 팝업 닫기 */

    // 채팅창 이동
    $('.modal--chat').draggable({
        containment: 'window'
    });

  	// 알림 메뉴 열기/닫기
    $('.btn--alarm').on('click', function () {
        $('.nav--right__alarm').stop().fadeToggle(100);
    });
    //알림 클릭 시 숫자 없어짐
    $('.btn--alarm').on('click', function () {
        $(this).children('span').text('');
    });

    // 서브메뉴 접힘/펼침
    $('#snb>ul>li>a, #snb>ul>li>button').on('click', function () {
        if ($(this).siblings('ul').length != 0) {
            $(this).siblings('ul').stop().slideToggle();
            $(this).toggleClass('on');
            return false;
        }
    });

    // 현재 페이지 하이라이팅
    var pageNo = new URLSearchParams(location.search).get("page");
    if (pageNo != null) {
        $(".btns--paging a:nth-of-type(" + pageNo + ")").addClass("on");
    } else {
        $(".btns--paging a:nth-of-type(1)").addClass("on");
    }
});

function openAlert(alertWindow) {
    $(alertWindow).siblings('.section--alert').css('display', 'flex');
}

function openModal(modalWindow) {
    $(modalWindow).siblings('.section--modal').css('display', 'flex');
}