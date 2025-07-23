import { useState } from "react";
import axios from "axios";
import "./weather.css";

function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = "b19eafcce468fac66eb582ccd69678f2";

  const getWeather = async () => {
    if (!city) {
      setError("Please enter a city name");
      setWeather(null);
      return;
    }
    try {
      const response = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
        params: {
          q: city,
          appid: API_KEY,
          units: "metric",
        },
      });
      setWeather(response.data);
      setError("");
    } catch (err) {
      console.log("Error fetching weather:", err);
      setError("City not found or invalid API key");
      setWeather(null);
    }
  };

return (
  <div className="weather-container">
    <div className="weather-box">
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter city"
        className="city-input"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={getWeather} className="weather-button">
        Get Weather
      </button>

      {error && <p className="error">{error}</p>}

      {weather && (
  <div className="weather-info">
    <h2>{weather.name}</h2>
    <p>Temperature: {weather.main.temp} °C</p>
    <p>
      Condition:{" "}
      {weather.weather[0].description}{" "}
      {(() => {
        const emojiMap = {
          Clear: "☀️",
          Clouds: "☁️",
          Rain: "🌧️",
          Thunderstorm: "⛈️",
          Drizzle: "🌦️",
          Snow: "❄️",
          Mist: "🌫️",
          Haze: "🌫️",
          Fog: "🌁",
          Smoke: "💨",
          Dust: "🌪️"
        };
        const main = weather.weather[0].main;
        return emojiMap[main] || "🌈";
      })()}
    </p>
  </div>
)}

    </div>
  </div>
);
}

export default Weather;
