import React from "react";

export default function WeatherInfoRow({ label, value, icon }) {
  return (
    <li className="text-sm lg:text-lg flex items-center justify-between space-x-4">
      <span>{label}</span>
      <div className="inline-flex space-x-4">
        <p>{value}</p>
        <img src={icon} alt={label} />
      </div>
    </li>
  );
}
