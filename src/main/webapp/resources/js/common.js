$(function () {
    $('#gnb__btn--burger').on('click', function () {
        $('#gnb').toggleClass('on');
    });

    $('.btn--close').on('click', function () {
        $(this).parent().parent().stop().fadeOut(100);
    });

    $('.closeWindow').on('click', function () {
        $(this).parent().parent().parent().stop().fadeOut(100);
    });

    $('.bg-black').on('click', function () {
        $(this).parent().stop().fadeOut(100);
    });
});

function openAlert(alertWindow) {
    $(alertWindow).siblings('.section--alert').css('display', 'flex');
}

function openModal(modalWindow) {
    $(modalWindow).siblings('.section--modal').css('display', 'flex');
}