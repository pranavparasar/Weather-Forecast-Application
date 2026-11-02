# Weather Forecast Web Application

A responsive frontend web application built with vanilla JavaScript, HTML5, and CSS3 that fetches real-time meteorological conditions and multi-day forecasts using the OpenWeather API.

## Features

- **Live City Search:** Query any major municipality or location globally.
- **Current Conditions:** Displays temperature (°C), feels-like values, relative humidity, atmospheric pressure, and wind speed.
- **5-Day Extended Forecast:** Aggregates midday forecasts over a 5-day cycle with dynamic condition iconography.
- **Input Validation & Error Handling:** Gracefully surfaces missing locations, invalid API tokens, and network failures.
- **Adaptive Layout:** Styled using flexbox and grid layouts for responsive performance on mobile and desktop screens.

## Tech Stack

- **Markup:** HTML5
- **Styling:** Vanilla CSS (CSS Grid, Flexbox, Glassmorphism design pattern)
- **Scripting:** Modern JavaScript (ES6+ `async`/`await`, Fetch API, DOM manipulation)
- **Data Source:** [OpenWeather Current Weather & 5-Day Forecast API](https://openweathermap.org/)

## Local Setup

1. **Clone or Download the Repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/Weather-Forecast-Application.git
   cd Weather-Forecast-Application
   ```

2. **Obtain an API Key:**
   - Register for a free account at [OpenWeather](https://home.openweathermap.org/users/sign_up).
   - Generate an API key under your account settings.

3. **Configure the Key:**
   - Open `script.js`.
   - Update `API_KEY`:
     ```javascript
     const API_KEY = "your_actual_api_key_here";
     ```

4. **Run the Project:**
   - Open `index.html` in any modern web browser, or launch it with the VS Code **Live Server** extension.

> **Security Note:** Avoid pushing your private API key to public repositories. For production releases, implement a server-side proxy or utilize serverless functions (e.g., Netlify/Vercel functions) to handle environment variables securely.
