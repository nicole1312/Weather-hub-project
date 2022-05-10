let apiKey = "57f652d59f6bbf0d76afefad23d740f6";
let city = "London";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
axios.get(`${apiUrl}`).then(showWeather);

function formatDate(timeStamp) {
  let date = new Date(timeStamp);

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

  let currentDay = days[date.getDay(4)];
  let currentMonth = months[date.getMonth(3)];
  let currentDates = date.getDate();
  let currentYear = date.getFullYear();
  let currentHour = date.getHours();
  let currentMinutes = date.getMinutes();
  if (currentHour < 10) {
    currentHour = "0" + date.getHours();
  }
  if (currentMinutes < 10) {
    currentMinutes = "0" + date.getMinutes();
  }

  return `${currentDay}, ${currentDates} ${currentMonth}  ${currentYear},   ${currentHour}:${currentMinutes}`;
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row"> `;
  forecastHTML =
    forecastHTML +
    `   <div class="col-2">
            <div class="weather-forecast-date"><strong>Sat</strong></div>
            <div class="clearfix">
              <img
                src=" https://openweathermap.org/img/wn/09d@2x.png"
                alt=" "
                width="60"
              />
            </div>
            <div class="weather-forecast-temperatures">
              <span class="weater-forecast-temperature-max"> 17° </span>
              <span class="weather-forecast-temperature-min"> 9° </span>
            </div>
        </div>`;

  forecastHTML =
    forecastHTML +
    `   <div class="col-2">
            <div class="weather-forecast-date"><strong>Sat</strong></div>
            <div class="clearfix">
              <img
                src=" https://openweathermap.org/img/wn/09d@2x.png"
                alt=" "
                width="60"
              />
            </div>
            <div class="weather-forecast-temperatures">
              <span class="weater-forecast-temperature-max"> 17° </span>
              <span class="weather-forecast-temperature-min"> 9° </span>
            </div>
        </div>`;

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function showWeather(response) {
  let currentCity = document.querySelector("#city");
  currentCity.innerHTML = response.data.name;
  let temp = document.querySelector("#degrees");
  temp.innerHTML = Math.round(response.data.main.temp);
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

  document.querySelector("#date").innerHTML = formatDate(
    response.data.dt * 1000
  );

  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    ` http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  celsiusTemperature = response.data.main.temp;
}

function search(city) {
  let apiKey = "57f652d59f6bbf0d76afefad23d740f6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(showWeather);
}
function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  search(cityInput.value);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

function showCelsius(event) {
  event.preventDefault();
  celsiusTemperature = ((fahrenheitTemperature - 32) * 5) / 9;
  let tempCelsius = document.querySelector("#degrees");
  tempCelsius.innerHTML = Math.round(celsiusTemperature);
}

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", showCelsius);

function showFahrenheit(event) {
  event.preventDefault();
  fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let tempFahrenheit = document.querySelector("#degrees");
  tempFahrenheit.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitTemperature = document.querySelector("#fahrenheit");
fahrenheitTemperature.addEventListener("click", showFahrenheit);

let celsiusTemperature = null;

function showCurrentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "57f652d59f6bbf0d76afefad23d740f6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(showWeather);
}

search(showCurrentLocation);
displayForecast();

navigator.geolocation.getCurrentPosition(showCurrentLocation);
