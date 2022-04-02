// Variables
const api = "https://fcc-weather-api.glitch.me/api/current?";
let unit =0, temp=0, feels=0;

// Sets the Time
setInterval(() => {
    let date = new Date();
    let hour = date.getHours();
    let min = date.getMinutes();
    min = min < 10 ? "0"+min : min;
    let timestat = hour <= 12 ? 'a.m.' : 'p.m.';
    $('#time').text(`${hour}:${min} ${timestat}`)
}, 10)

// Loads when the document is ready and asks user for their location
$(document).ready(() => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            getWeather(`lat=${position.coords.latitude}`, `lon=${position.coords.longitude}`);
        });
    } else {
        $('main').hide();
        $('.error-text').text("Geolocation is not supported by this browser.")
    }
})

// Get the weather details and show it to the user
const getWeather = (lat, lon) => {
    $.ajax({
        url: api + lat + '&' + lon,
        success: (result) => {
            $("#city").text(`${result.name}, `);
            $("#country").text(result.sys.country);
            $("#status").text(result.weather[0].description);
            temp = Math.round(result.main.temp * 10) / 10;
            feels = Math.round(result.main.feels_like * 10) / 10;
            $('#temp').text(temp + " C");
            $('#feels').text(feels + " C");
            $('#pressure').text(result.main.pressure);
            $('#humidity').text(result.main.humidity + '%');
            $('#weather-icon').attr('src', result.weather[0].icon)
        }
    })
}


// Changes the temperature from Celsius to Fahrenheit and vice-versa
$('#toggle').click(() => {
    let currentUnit = $('#toggle').text();
    let newUnit = currentUnit === 'In C' ? 'In F' : 'In C';
    $('#toggle').text(newUnit);
    if(newUnit === 'In F'){
        let newTemp = Math.round(parseInt($("#temp").text()) * 9 / 5 + 32);
        $("#temp").text(newTemp + ' F');
    }else{
        $("#temp").text(temp + ' C');
    }
})