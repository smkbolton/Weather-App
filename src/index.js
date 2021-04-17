//CURRENT DATE AND TIME
function formatDate(today) {
  let hour = today.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = today.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  let date = today.getDate();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "Septemper",
    "October",
    "November",
    "December",
  ];
  let month = months[today.getMonth()];

  let currentTime = `${month} ${date}\n${hour}:${minute}`;
  let displayCurrentTime = document.querySelector("#current-date");
  displayCurrentTime.innerHTML = currentTime;
}

let today = new Date();
console.log(formatDate(today));

//CITY AND WEATHER INNER HTML UPDATES
function showWeather(response) {
  let newTemp = Math.round(response.data.main.temp);
  let newCity = response.data.name;
  let humidity = response.data.main.humidity;
  let wind = response.data.wind.speed;
  //let precipitation = response.data.main.precipitation;
  //let weatherIcons = response.data.weather[0].description;
  document.querySelector("#temperature").innerHTML = newTemp;
  document.querySelector("#current-city").innerHTML = newCity;
  document.querySelector("#humidity").innerHTML = humidity;
  document.querySelector("#wind").innerHTML = wind;
  //document.querySelector("#precipitation").innerHTML = precipitation;
  //document.querySelector("#weather-icons").innerHTML = weatherIcons;

  return newTemp;
}

//API WEATHER USING CITY INPUT
function citySearch(city) {
  let units = "imperial";
  let apiKey = "2c3b195efbedc960ba063392d31bc9bd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

//CITY INPUT
function clickSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search-input").value;
  citySearch(city);
}
let searchForm = document.querySelector("#city-search");
searchForm.addEventListener("submit", clickSubmit);

//API WEATHER USING CURRENT LOCATION COORDINATES
function searchCoords(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let units = "imperial";
  let apiKey = "2c3b195efbedc960ba063392d31bc9bd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

//CURRENT LOCATION IN COORDINATES
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCoords);
}
let currentCityButton = document.querySelector("#current-city-button");
currentCityButton.addEventListener("click", getCurrentLocation);

//TEMPERATURE CONVERSION TO FAHRENHEIT
function changeToFahrenheit(event) {
  event.preventDefault();
  document.querySelector("#temperature").innerHTML = 42;
}
let toFahrenheit = document.querySelector("#temp-fahrenheit-link");
toFahrenheit.addEventListener("click", changeToFahrenheit);

//TEMPERATURE CONVERSION TO CELSIUS
function changeToCelsius(event) {
  event.preventDefault();
  document.querySelector("#temperature").innerHTML = 5;
}
let toCelsius = document.querySelector("#temp-celsius-link");
toCelsius.addEventListener("click", changeToCelsius);
