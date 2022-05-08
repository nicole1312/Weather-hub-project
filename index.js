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

search("London");

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
