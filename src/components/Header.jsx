import React from "react";
import SearchForm from "./SearchForm";
import FavouriteModal from "./FavouriteModal";
import logo from "../assets/logo.svg";
import heartIcon from "../assets/heart.svg";

export default function Header() {
  return (
    <header className="fixed w-full top-0 z-50 bg-gradient-to-b from-black/60 to-black/0 pb-10">
      <nav className="container mx-auto flex items-center justify-between py-6 px-4">
        <a href="#">
          <img className="h-9" src={logo} alt="Weather App" />
        </a>

        <div className="flex items-center gap-4 relative">
          <SearchForm />
          <button className="p-2 hover:bg-black/30 cursor-pointer flex gap-2 items-center rounded-md transition-all">
            <img src={heartIcon} alt="Heart" />
            <span className="text-sm lg:text-base text-white">
              Favourite Locations
            </span>
          </button>

          <FavouriteModal />
        </div>
      </nav>
    </header>
  );
}
