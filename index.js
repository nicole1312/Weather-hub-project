let currentTime = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let currentDay = days[currentTime.getDay(4)];
let currentMonth = months[currentTime.getMonth(3)];
let currentDates = currentTime.getDate();
let currentYear = currentTime.getFullYear();
let currentHour = currentTime.getHours();
let currentMinutes = currentTime.getMinutes();
if (currentHour < 10) {
  currentHour = "0" + currentTime.getHours();
}
if (currentMinutes < 10) {
  currentMinutes = "0" + currentTime.getMinutes();
}

let formatDate = document.querySelector("#date");
formatDate.innerHTML = `${currentDay}, ${currentDates} ${currentMonth}  ${currentYear},   ${currentHour}:${currentMinutes}`;

function showCurrentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "57f652d59f6bbf0d76afefad23d740f6";
  let cityInput = document.querySelector("#city-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(showLocationWeather);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentLocation);
}
function showLocationWeather(response) {
  let currentCity = document.querySelector("#city");
  currentCity.innerHTML = response.data.name;
  let temp = Math.round(response.data.main.temp);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
  let pressure = document.querySelector("#pressure");
  pressure.innerHTML = response.data.main.pressure;
  let high = document.querySelector("#high");
  high.innerHTML = Math.round(response.data.main.temp_max);
  let low = document.querySelector("#low");
  low.innerHTML = Math.round(response.data.main.temp_min);
  let sky = document.querySelector("#sky");
  sky.innerHTML = response.data.weather[0].main;
  let degrees = document.querySelector("#degrees");
  degrees.innerHTML = temp;
}

let button = document.querySelector("#current-location");
button.addEventListener("click", getCurrentLocation);

function showCity(event) {
  event.preventDefault();
  let apiKey = "57f652d59f6bbf0d76afefad23d740f6";
  let cityInput = document.querySelector("#city-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=metric&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(showLocationWeather);
}
let cityInput = document.querySelector("form");
cityInput.addEventListener("click", showCity);
