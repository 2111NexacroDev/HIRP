$(function () {
    $('#gnb__btn--burger').on('click', function () {
        $('#gnb').toggleClass('on');
    });

    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'ko'
    });
    calendar.render();
});