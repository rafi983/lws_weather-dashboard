import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import WeatherCard from "./components/WeatherCard";
import "./index.css"; // Tailwind

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [favourites, setFavourites] = useState(() => {
    const stored = localStorage.getItem("favourites");
    return stored ? JSON.parse(stored) : [];
  });
  const [background, setBackground] = useState("bg-clear"); // Default background

  const API_KEY = "eb000243c7a20fe3c599d24aaf6477f0"; // Your API key

  const fetchWeather = async (city) => {
    if (!city) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`,
      );
      const data = await res.json();
      if (data.cod !== 200) throw new Error(data.message);
      setWeatherData(data);
      setBackground(getBackground(data.weather[0].main));
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
      );
      const data = await res.json();
      if (data.cod !== 200) throw new Error(data.message);
      setWeatherData(data);
      setBackground(getBackground(data.weather[0].main));
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const getBackground = (condition) => {
    const map = {
      Clear: "bg-clear",
      "Few clouds": "bg-few-clouds",
      Clouds: "bg-clouds",
      Rain: "bg-rain",
      "Shower rain": "bg-shower-rain",
      Snow: "bg-snow",
      Thunderstorm: "bg-thunderstorm",
      Drizzle: "bg-rain",
      Mist: "bg-mist",
      Fog: "bg-mist",
      Sunny: "bg-sunny",
      Winter: "bg-winter",
    };
    return map[condition] || "bg-clear";
  };

  const addFavourite = (city) => {
    if (!favourites.includes(city)) {
      const updated = [...favourites, city];
      setFavourites(updated);
      localStorage.setItem("favourites", JSON.stringify(updated));
    }
  };

  const removeFavourite = (city) => {
    const updated = favourites.filter((item) => item !== city);
    setFavourites(updated);
    localStorage.setItem("favourites", JSON.stringify(updated));
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByCoords(latitude, longitude);
        },
        (error) => {
          console.error("Geolocation error:", error);
          fetchWeather("Dhaka"); // Fallback
        },
      );
    } else {
      fetchWeather("Dhaka"); // Fallback
    }
  }, []);

  return (
    <div
      className={`bg-body font-[Roboto] text-light bg-no-repeat bg-cover h-screen grid place-items-center ${background}`}
    >
      <Header
        onSearch={fetchWeather}
        favourites={favourites}
        onSelectFavourite={fetchWeather}
        removeFavourite={removeFavourite}
      />
      <main className="w-full">
        <section className="w-full">
          <div className="container mx-auto px-4">
            <WeatherCard
              weather={weatherData}
              loading={loading}
              error={error}
              onAddFavourite={() =>
                weatherData && addFavourite(weatherData.name)
              }
            />
          </div>
        </section>
      </main>
    </div>
  );
}
