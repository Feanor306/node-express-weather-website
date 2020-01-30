const weatherToday = document.querySelector('#weather-today')
const weatherWeek = document.querySelector('#weather-week')
var skycons = new Skycons({"color": "#27b322"});

const handleDataToday = (data) => {
    if (!data.data) return data;
    weatherToday.innerHTML = ''

    data.data.forEach((hour) => {
        let hd = {}
        let time = hour.time.toString()
        
        while (time.length < 13)
            time = time + "0"

        time = parseInt(time)
        //console.log(time + ' ' + moment(time).format('DD HH:mm'))
        hd.dayName = moment(time).format('dddd')
        hd.dayDate = moment(time).format('DD')
        hd.time = moment(time).format('HH:mm')

        hd.summary = hour.summary
        hd.timestamp = time

        hd.temp = hour.temperature
        
        hd.rainChance = hour.precipProbability
        hd.rainIntensity = hour.precipIntensity

        hd.wind = hour.windSpeed
        hd.windMax = hour.windGust
        hd.windBearing = hour.windBearing

        let html = getWeatherView(hd)
        weatherToday.insertAdjacentHTML('beforeend', html)
        initIcon('icon-' + time, hour.icon)
    })

    $("#weather-today").slick({
        slidesToShow: 4,
        edgeFriction: 0,
        infinite: false,
        swipeToSlide: true
    });

    skycons.play();
}

const handleDataDays = (data) => {
    if (!data.data) return data;
    weatherWeek.innerHTML = ''

    data.data.forEach((day) => {
        let dd = {}
        let time = day.time.toString()
        
        while (time.length < 13)
            time = time + "0"

        time = parseInt(time)
        //console.log(time + ' ' + moment(time).format('DD HH:mm'))
        dd.dayName = moment(time).format('dddd')
        dd.dayDate = moment(time).format('DD')
        //hd.time = moment(time).format('HH:mm')

        dd.summary = day.summary
        dd.timestamp = (time + day.sunriseTime).toString()

        dd.minTemp = day.temperatureLow
        dd.maxTemp = day.temperatureHigh
        dd.temp = parseFloat((dd.minTemp + dd.maxTemp) / 2).toFixed(2)
        
        dd.rainChance = day.precipProbability
        dd.rainIntensity = day.precipIntensity

        dd.wind = day.windSpeed
        dd.windMax = day.windGust
        dd.windBearing = day.windBearing

        let html = getWeatherView(dd)
        weatherWeek.insertAdjacentHTML('beforeend', html)
        initIcon('icon-' + dd.timestamp, day.icon)
    })

    $("#weather-week").slick({
        slidesToShow: 4,
        edgeFriction: 0,
        infinite: false,
        swipeToSlide: true
    });

    skycons.play();
}

const getWindArrow = (degrees) => {
    return '<div class="wvtw__arrow" style="transform:rotate(' + degrees + 'deg)">&uarr;</div>'
}

const getWeatherView = (data) => {
    let t = '<div class="weather-view">';

    // Time
    t += '<div class="weather-view__title">' + data.dayName + ' ' + data.dayDate + '</div>'
    if(data.time) t += '<div class="weather-view__time">' + data.time + '</div>'

    // Text + icon
    t += '<div class="weather-view__text">'
    t += '<div class="wvtx__text">' + data.summary + '</div>'
    t += '<div class="wvtx__icon"><canvas id="icon-' + data.timestamp + '" width="64" height="64"></canvas></div>'
    t += '</div>'

    // Temperature
    t += '<div class="weather-view__temp">'
    if (data.minTemp) t += '<div class="wvt__min">min ' + data.minTemp + '&deg;</div>'
    t += '<div class="wvt__temp">' + data.temp + '&deg;</div>'
    if (data.maxTemp) t += '<div class="wvt__max">max ' + data.maxTemp + '&deg;</div>'
    t += '</div>'

    // Rain
    t += '<div class="weather-view__rain">'
    t += '<div class="wvtr__chance">Rain: ' + data.rainChance + '% - ' + data.rainIntensity + 'mm</div>'
    //t += '<div class="wvtr__mm">' + data.rainIntensity + 'mm</div>'
    t += '</div>'

    // Wind
    t += '<div class="weather-view__wind">'
    t += '<div class="wvtw__wind">Wind: ' + data.wind + 'm/s - ' + data.windMax + 'm/s</div>'
    //t += '<div class="wvtw__windmax">- ' + data.windMax + 'm/s</div>'
    t += getWindArrow(data.windBearing)
    t += '</div>'

    t += '</div>';

    return t;
}

const initIcon = (id, type) => {
    //<canvas id="icon1" width="64" height="64"></canvas>

    // you can add a canvas by it's ID...
    //skycons.add("icon1", Skycons.PARTLY_CLOUDY_DAY);

    // ...or by the canvas DOM element itself.
    //skycons.add(document.getElementById("icon2"), Skycons.RAIN);

    // if you're using the Forecast API, you can also supply
    // strings: "partly-cloudy-day" or "rain".

    // start animation!
    //skycons.play();

    // you can also halt animation with skycons.pause()

    // want to change the icon? no problem:
    //skycons.set("icon1", Skycons.PARTLY_CLOUDY_NIGHT);

    // want to remove one altogether? no problem:
    //skycons.remove("icon2");
    skycons.add(document.getElementById(id), type);
}
