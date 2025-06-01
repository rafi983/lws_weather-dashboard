import React from "react";
import cloudIcon from "../assets/cloud.svg";
import pinIcon from "../assets/pin.svg";
import heartIcon from "../assets/heart.svg";
import redHeartIcon from "../assets/heart-red.svg";
import tempMaxIcon from "../assets/icons/temp-max.svg";
import tempMinIcon from "../assets/icons/temp-min.svg";
import humidityIcon from "../assets/icons/humidity.svg";
import cloudyIcon from "../assets/icons/cloud.svg";
import windIcon from "../assets/icons/wind.svg";
import WeatherInfoRow from "./WeatherInfoRow";

export default function WeatherCard({
  weather,
  loading,
  error,
  onToggleFavourite,
  favourites,
}) {
  const isFavourited = weather && favourites.includes(weather.name);

  if (loading || error || !weather) {
    return (
      <div className="grid bg-black/20 rounded-xl backdrop-blur-md border-2 lg:border-[3px] border-white/[14%] px-4 lg:px-14 py-6 lg:py-10 min-h-[520px] max-w-[1058px] mx-auto text-white">
        <p className="text-center text-lg">
          {loading
            ? "Loading..."
            : error
              ? error
              : "Search for a location to see weather details"}
        </p>
      </div>
    );
  }

  const { main, weather: weatherDetails, wind, clouds, name, dt } = weather;

  return (
    <div className="grid bg-black/20 rounded-xl backdrop-blur-md border-2 lg:border-[3px] border-white/[14%] px-4 lg:px-14 py-6 lg:py-10 min-h-[520px] max-w-[1058px] mx-auto text-white">
      <div className="grid md:grid-cols-2 gap-10 md:gap-6">
        <div className="md:col-span-2 flex items-center justify-end">
          <button
            onClick={() => onToggleFavourite(name)}
            className="text-white text-sm md:text-base inline-flex items-center space-x-2 px-4 py-2 rounded-md bg-[#C5C5C54D] backdrop-blur-sm"
          >
            <span>
              {isFavourited ? "Remove from Favourite" : "Add to Favourite"}
            </span>
            <img
              src={isFavourited ? redHeartIcon : heartIcon}
              alt="Heart"
              className="w-4 h-4"
            />
          </button>
        </div>

        <div>
          <div className="max-md:flex items-center justify-between md:-mt-10">
            <img src={cloudIcon} alt="Cloud" />
            <div className="max-md:flex items-center max-md:space-x-4">
              <h1 className="text-[60px] lg:text-[80px] xl:text-[100px] leading-none md:mb-4">
                {Math.round(main.temp)}°
              </h1>
              <div className="flex items-center space-x-4 md:mb-4">
                <img src={pinIcon} alt="Pin" />
                <h2 className="text-2xl lg:text-[50px]">{name}</h2>
              </div>
            </div>
          </div>
          <p className="text-sm lg:text-lg">
            {new Date(dt * 1000).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}{" "}
            - {new Date(dt * 1000).toLocaleDateString()}
          </p>
        </div>

        <div>
          <p className="text-sm lg:text-lg font-bold uppercase mb-8">
            {weatherDetails[0].description}
          </p>
          <ul className="space-y-6 lg:space-y-6">
            <WeatherInfoRow
              label="Temp max"
              value={`${main.temp_max}°`}
              icon={tempMaxIcon}
            />
            <WeatherInfoRow
              label="Temp min"
              value={`${main.temp_min}°`}
              icon={tempMinIcon}
            />
            <WeatherInfoRow
              label="Humidity"
              value={`${main.humidity}%`}
              icon={humidityIcon}
            />
            <WeatherInfoRow
              label="Cloudiness"
              value={`${clouds.all}%`}
              icon={cloudyIcon}
            />
            <WeatherInfoRow
              label="Wind"
              value={`${wind.speed} km/h`}
              icon={windIcon}
            />
          </ul>
        </div>
      </div>
    </div>
  );
}
