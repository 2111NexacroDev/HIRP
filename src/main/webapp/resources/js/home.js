var apiURI = "http://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=674ef6a6bffc027168759b898f13e752";
$.ajax({
    url: apiURI,
    dataType: "json",
    type: "GET",
    async: "false",
    success: function (resp) {
        console.log(resp);
        console.log("현재온도 : " + (resp.main.temp - 273.15));
        console.log("현재습도 : " + resp.main.humidity);
        console.log("날씨 : " + resp.weather[0].main);
        console.log("상세날씨설명 : " + resp.weather[0].description);
        console.log("날씨 이미지 : " + resp.weather[0].icon);
        console.log("바람   : " + resp.wind.speed);
        console.log("나라   : " + resp.sys.country);
        console.log("도시이름  : " + resp.name);
        console.log("구름  : " + (resp.clouds.all) + "%");
        const markup = `
                    <h2 class="city-name" data-name="${name},${sys.country}">
                    <span>${name}</span>
                    <sup>${sys.country}</sup>
                    </h2>
                    <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
                    <figure>
                    <img class="city-icon" src="${icon}" alt="${weather[0]["description"]
            }">
                    <figcaption>${weather[0]["description"]}</figcaption>
                    </figure>
                `;
        $('.weather-box').innerHTML = markup;
    }
})