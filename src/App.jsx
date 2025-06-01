import React from "react";
import Header from "./components/Header";
import WeatherCard from "./components/WeatherCard";

export default function App() {
  return (
    <div className="bg-body font-[Roboto] text-light bg-[url('./assets/body-bg.png')] bg-no-repeat bg-cover h-screen grid place-items-center">
      <Header />
      <main>
        <section>
          <div className="container">
            <WeatherCard />
          </div>
        </section>
      </main>
    </div>
  );
}
