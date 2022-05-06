function getStyle(elem, cssprop, cssprop2) {
    //IE
    if (elem.currentStyle) {
        return elem.currentStyle[cssprop];

        //다른 브라우저    
    } else if (document.defaultView && document.defaultView.getComputedStyle) {
        return document.defaultView.getComputedStyle(elem, null).getPropertyValue(cssprop2);

    } else {
        return null;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    let selectedColor = '#f3cccc';

    let colors = document.querySelectorAll('.colors > span');

    colors.forEach((el, index) => {
        el.onclick = () => {
            selectedColor = getStyle(colors[index], "backgroundColor", "background-color");
            document.getElementsByName('scheduleColor')[0].value = selectedColor;
        }
    });

    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        headerToolbar: {
            left: 'dayGridMonth,dayGridWeek,timeGrid,listWeek',
            center: 'prev,title,next,today',
            right: '',
        },
        buttonText: {
            today: '오늘',
            month: '월간',
            week: '주간',
            timeGrid: '일간',
            list: '목록'
        },
        initialView: 'dayGridMonth',
        locale: 'ko',
        views: {}
    });
    calendar.render();
});