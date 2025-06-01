import React from "react";
import cloudIcon from "../assets/cloud.svg";
import pinIcon from "../assets/pin.svg";
import heartIcon from "../assets/heart.svg";
import tempMaxIcon from "../assets/icons/temp-max.svg";
import tempMinIcon from "../assets/icons/temp-min.svg";
import humidityIcon from "../assets/icons/humidity.svg";
import cloudyIcon from "../assets/icons/cloud.svg";
import windIcon from "../assets/icons/wind.svg";

export default function WeatherCard({
  weather,
  loading,
  error,
  onAddFavourite,
}) {
  if (loading) {
    return (
      <div className="grid bg-black/20 rounded-xl backdrop-blur-md border-2 lg:border-[3px] border-white/[14%] px-4 lg:px-14 py-6 lg:py-10 min-h-[520px] max-w-[1058px] mx-auto text-white">
        <p className="text-center text-lg">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="grid bg-black/20 rounded-xl backdrop-blur-md border-2 lg:border-[3px] border-white/[14%] px-4 lg:px-14 py-6 lg:py-10 min-h-[520px] max-w-[1058px] mx-auto text-white">
        <p className="text-center text-red-500">{error}</p>
      </div>
    );
  }

  if (!weather) {
    return (
      <div className="grid bg-black/20 rounded-xl backdrop-blur-md border-2 lg:border-[3px] border-white/[14%] px-4 lg:px-14 py-6 lg:py-10 min-h-[520px] max-w-[1058px] mx-auto text-white">
        <p className="text-center text-lg">
          Search for a location to see weather details
        </p>
      </div>
    );
  }

  return (
    <div className="grid bg-black/20 rounded-xl backdrop-blur-md border-2 lg:border-[3px] border-white/[14%] px-4 lg:px-14 py-6 lg:py-10 min-h-[520px] max-w-[1058px] mx-auto text-white">
      <div className="grid md:grid-cols-2 gap-10 md:gap-6">
        <div className="md:col-span-2 flex items-center justify-end space-x-6">
          <button
            onClick={onAddFavourite}
            className="text-white text-sm md:text-base inline-flex items-center space-x-2 px-4 py-2 rounded-md bg-[#C5C5C54D] backdrop-blur-sm"
          >
            <span>Add to Favourite</span>
            <img src={heartIcon} alt="Heart" className="w-4 h-4" />
          </button>
        </div>

        <div>
          <div className="max-md:flex items-center justify-between md:-mt-10">
            <img src={cloudIcon} alt="Cloud" />
            <div className="max-md:flex items-center max-md:space-x-4">
              <h1 className="text-[60px] lg:text-[80px] xl:text-[100px] leading-none md:mb-4">
                {Math.round(weather.main.temp)}°
              </h1>
              <div className="flex items-center space-x-4 md:mb-4">
                <img src={pinIcon} alt="Pin" />
                <h2 className="text-2xl lg:text-[50px]">{weather.name}</h2>
              </div>
            </div>
          </div>
          <p className="text-sm lg:text-lg">
            {new Date(weather.dt * 1000).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}{" "}
            - {new Date(weather.dt * 1000).toLocaleDateString()}
          </p>
        </div>

        <div>
          <p className="text-sm lg:text-lg font-bold uppercase mb-8">
            {weather.weather[0].description}
          </p>
          <ul className="space-y-6 lg:space-y-6">
            <li className="text-sm lg:text-lg flex items-center justify-between space-x-4">
              <span>Temp max</span>
              <div className="inline-flex space-x-4">
                <p>{weather.main.temp_max}°</p>
                <img src={tempMaxIcon} alt="Temp Max" />
              </div>
            </li>
            <li className="text-sm lg:text-lg flex items-center justify-between space-x-4">
              <span>Temp min</span>
              <div className="inline-flex space-x-4">
                <p>{weather.main.temp_min}°</p>
                <img src={tempMinIcon} alt="Temp Min" />
              </div>
            </li>
            <li className="text-sm lg:text-lg flex items-center justify-between space-x-4">
              <span>Humidity</span>
              <div className="inline-flex space-x-4">
                <p>{weather.main.humidity}%</p>
                <img src={humidityIcon} alt="Humidity" />
              </div>
            </li>
            <li className="text-sm lg:text-lg flex items-center justify-between space-x-4">
              <span>Cloudiness</span>
              <div className="inline-flex space-x-4">
                <p>{weather.clouds.all}%</p>
                <img src={cloudyIcon} alt="Cloudy" />
              </div>
            </li>
            <li className="text-sm lg:text-lg flex items-center justify-between space-x-4">
              <span>Wind</span>
              <div className="inline-flex space-x-4">
                <p>{weather.wind.speed} km/h</p>
                <img src={windIcon} alt="Wind" />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
