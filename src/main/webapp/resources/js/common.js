$(function () {
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

    /* 모달 및 팝업 닫기 */
    $('.btn--close').on('click', function () {
        $(this).parent().parent().stop().fadeOut(100);
    });

    $('.closeWindow').on('click', function () {
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

    $('.btn--alarm').on('click', function () {
        $(this).children('span').text('');
    })

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