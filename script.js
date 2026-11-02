// Replace with your free OpenWeather API key
const API_KEY = "YOUR_OPENWEATHER_API_KEY";

const form = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const errorMsg = document.getElementById("error-message");
const loader = document.getElementById("loader");
const weatherDisplay = document.getElementById("weather-display");

const cityName = document.getElementById("city-name");
const currentDate = document.getElementById("current-date");
const currentIcon = document.getElementById("current-icon");
const currentTemp = document.getElementById("current-temp");
const currentDesc = document.getElementById("current-desc");
const feelsLike = document.getElementById("feels-like");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const pressure = document.getElementById("pressure");
const forecastCards = document.getElementById("forecast-cards");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (!city) return;

  if (API_KEY === "YOUR_OPENWEATHER_API_KEY") {
    showError("Please configure a valid OpenWeather API key inside script.js.");
    return;
  }

  clearError();
  showLoader(true);
  weatherDisplay.classList.add("hidden");

  try {
    const currentRes = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`
    );

    if (!currentRes.ok) {
      if (currentRes.status === 404) {
        throw new Error("City not found. Please verify spelling.");
      } else if (currentRes.status === 401) {
        throw new Error("Invalid API key. Check your OpenWeather configuration.");
      } else {
        throw new Error("Unable to retrieve weather data at this time.");
      }
    }

    const currentData = await currentRes.json();

    const forecastRes = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`
    );

    if (!forecastRes.ok) {
      throw new Error("Failed to load forecast data.");
    }

    const forecastData = await forecastRes.json();

    renderCurrentWeather(currentData);
    renderForecast(forecastData);
    weatherDisplay.classList.remove("hidden");
  } catch (err) {
    showError(err.message);
  } finally {
    showLoader(false);
  }
});

function renderCurrentWeather(data) {
  cityName.textContent = `${data.name}, ${data.sys.country}`;
  currentDate.textContent = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
  currentTemp.textContent = Math.round(data.main.temp);
  currentDesc.textContent = data.weather[0].description;
  currentIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  currentIcon.alt = data.weather[0].main;

  feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;
  humidity.textContent = `${data.main.humidity}%`;
  windSpeed.textContent = `${data.wind.speed} m/s`;
  pressure.textContent = `${data.main.pressure} hPa`;
}

function renderForecast(data) {
  forecastCards.innerHTML = "";

  const dailyReadings = data.list.filter((reading) =>
    reading.dt_txt.includes("12:00:00")
  );

  dailyReadings.slice(0, 5).forEach((item) => {
    const date = new Date(item.dt_txt);
    const dayName = date.toLocaleDateString(undefined, { weekday: "short" });
    const temp = Math.round(item.main.temp);
    const iconCode = item.weather[0].icon;
    const desc = item.weather[0].main;

    const card = document.createElement("div");
    card.className = "forecast-card";
    card.innerHTML = `
      <p class="forecast-day">${dayName}</p>
      <img src="https://openweathermap.org/img/wn/${iconCode}.png" alt="${desc}" />
      <p class="forecast-temp">${temp}°C</p>
    `;
    forecastCards.appendChild(card);
  });
}

function showLoader(isLoading) {
  if (isLoading) {
    loader.classList.remove("hidden");
  } else {
    loader.classList.add("hidden");
  }
}

function showError(msg) {
  errorMsg.textContent = msg;
}

function clearError() {
  errorMsg.textContent = "";
}
