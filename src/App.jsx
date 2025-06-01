import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import WeatherCard from "./components/WeatherCard";
import { getBackgroundClass } from "./utils/backgroundMapper";
import "./index.css"; // Tailwind

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [favourites, setFavourites] = useState(() => {
    const stored = localStorage.getItem("favourites");
    return stored ? JSON.parse(stored) : [];
  });
  const [background, setBackground] = useState("bg-clear");
  const API_KEY = "eb000243c7a20fe3c599d24aaf6477f0";

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
      setBackground(getBackgroundClass(data.weather[0].main));
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
      setBackground(getBackgroundClass(data.weather[0].main));
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavourite = (city) => {
    if (!city) return;
    const updated = favourites.includes(city)
      ? favourites.filter((item) => item !== city)
      : [...favourites, city];
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
          fetchWeather("Dhaka"); // fallback
        },
      );
    } else {
      fetchWeather("Dhaka"); // fallback
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
        onToggleFavourite={toggleFavourite}
      />
      <main className="w-full">
        <section className="w-full">
          <div className="container mx-auto px-4">
            <WeatherCard
              weather={weatherData}
              loading={loading}
              error={error}
              onToggleFavourite={toggleFavourite}
              favourites={favourites}
            />
          </div>
        </section>
      </main>
    </div>
  );
}
