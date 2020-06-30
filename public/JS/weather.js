// api key : 82005d27a116c2880c8f0fcb866998a0

//SELECT ELEMENTS
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");

//App data
const weather = {};

weather.temperature = {
    unit: "celsius"
}

//App Consts and vars
const KELVIN = 273;
//API KEY
const key = "82005d27a116c2880c8f0fcb866998a0";


//DISPLAY WEATHER TO UI
function displayWeather() {
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

//C to F conversion
function celsiusTOFahrenheit(temperature) {
    return (temperature * 9 / 5) + 32;
}

//WHEN THE USER CLICKS ON THE TEMPERATURE ELEMENT
tempElement.addEventListener("click", function () {

    if (weather.temperature.value === undefined) return
    if (weather.temperature.unit == "celsius") {
        let fahrenheit = celsiusTOFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);
        weather.temperature.unit = "fahrenheit";
        tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    } else {
        tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit = "celsius"
    }
})

// SHOW THE RESULT OF THE CHOSEN CITY
document.addEventListener('DOMContentLoaded', async (e) => {
    let placeTile = document.querySelector(".placeTile").textContent;
    let api = await `https://api.openweathermap.org/data/2.5/weather?q=${placeTile}&appid=${key}`;
    fetch(api)
        .then(function (response) {
            let data = response.json();
            return data;
        })
        .then(function (data) {
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function () {
            displayWeather();
        })

})
