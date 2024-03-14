// SELECT ELEMENTS
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");
const city = "Indore";


// App data
const weather = {};
weather.temperature = {
    unit : "celsius"
}

// APP CONSTS AND VARS
const KELVIN = 273;
// API KEY
const key = "b587c73f2a12e003ba2ed083c4a9c46f";

// SET USER'S POSITION
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    
    getWeather(latitude, longitude);
}

// SHOW ERROR WHEN THERE IS AN ISSUE WITH GEOLOCATION SERVICE
function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

    getWeather();
    const data1 = fetchHourlyForecast(key, city);
    displayNext9HoursForecast(data1);
   

// SHOW ERROR WHEN THERE IS AN ISSUE WITH GEOLOCATION SERVICE
function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

// GET WEATHER FROM API PROVIDER
function getWeather(){
    const currentWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
    
    fetch(currentWeather)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function(){
            displayWeather();
        }); 
    }
async function fetchHourlyForecast(apiKey, city) {
        const baseUrl = "http://api.openweathermap.org/data/2.5/forecast";
        const params = new URLSearchParams({
            q: city,
            appid: apiKey,
            units: "metric" // You can change units to imperial for Fahrenheit
        });

        const response = await fetch(`${baseUrl}?${params}`);
        const data = await response.json();

        if (response.ok) {
            return data;
        } else {
            throw new Error(data.message || "Failed to fetch data");
        }
    }
// CURRENT WEATHER TO UI
function displayWeather(){
    //iconElement.innerHTML = `<img src="https://openweathermap.org/img/wn/10d@2x.png/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}
//Hourly weather display 
// Function to display hourly forecast for the next 9 hours
// Function to display hourly forecast for the next 9 hours
function displayNext9HoursForecast(forecastData) {
    const forecastContainer = document.querySelector(".forecast-container");

    const currentTime = new Date();
    const next9HoursForecast = forecastData.list.filter(forecast => {
        const forecastTime = new Date(forecast.dt_txt);
        const timeDifference = (forecastTime.getTime() - currentTime.getTime()) / (1000 * 60 * 60); // Difference in hours
        return timeDifference >= 0 && timeDifference < 9;
    });

    next9HoursForecast.forEach(forecast => {
        const dateTime = forecast.dt_txt;
        const temperature = forecast.main.temp;
        const weatherDescription = forecast.weather[0].description; // Accessing the weather description

        const forecastBlock = document.createElement("div");
        forecastBlock.classList.add("forecast-block");

        const timeElement = document.createElement("p");
        timeElement.textContent = `At ${dateTime}`;
        forecastBlock.appendChild(timeElement);
        //jai shree ram
        const temperatureElement = document.createElement("p");
        temperatureElement.textContent = `Temperature: ${temperature}°C`;
        forecastBlock.appendChild(temperatureElement);

        const weatherElement = document.createElement("p");
        weatherElement.textContent = `Weather: ${weatherDescription}`;
        forecastBlock.appendChild(weatherElement);

        forecastContainer.appendChild(forecastBlock);
    });
}


// C to F conversion
function celsiusToFahrenheit(temperature){
    return (temperature * 9/5) + 32;
}

// WHEN THE USER CLICKS ON THE TEMPERATURE ELEMENET
tempElement.addEventListener("click", function(){
    if(weather.temperature.value === undefined) return;
    
    if(weather.temperature.unit == "celsius"){
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);
        
        tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    }else{
        tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit = "celsius"
    }
});
