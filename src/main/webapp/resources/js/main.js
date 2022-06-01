$(function () {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'ko'
    });
    calendar.render();

    const monthNames = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

    let dateObj = new Date();
    let month = monthNames[dateObj.getUTCMonth()];
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();

    let newdate = `${year}년 ${month}월 ${day}일`;

    const app = document.querySelector('.weather-box');

    fetch('https://api.openweathermap.org/data/2.5/weather?q=Seoul&lang=kr&APPID=674ef6a6bffc027168759b898f13e752&units=metric')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            app.insertAdjacentHTML('afterbegin', `
        <div class="titlebar">
            <p class="date">${newdate}</p>
            <h4 class="city">${data.name}</h4>
            <p class="description">오늘의 날씨는 '${data.weather[0].description}' !</p>
        </div>
        <div class="temperature">
            <p><img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" /></p>
        </div>
        <div class="extra">
            <div class="info col-3">
                <h5>기온</h5>
                <p>${Math.round(data.main.temp)}°C</p>
            </div>
            <div class="info col-3">
                <h5>풍속</h5>
                <p>${data.wind.speed}mps</p>
            </div>
            <div class="info col-3">
                <h5>가시거리</h5>
                <p>${data.visibility} m</p>
            </div>
            <div class="info col-3">
                <h5>기압</h5>
                <p>${data.main.pressure} mph</p>
            </div>
        </div>`)
        });
});
