import React, { useState } from "react";
import searchIcon from "../assets/search.svg";

export default function SearchForm({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
      setQuery("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center space-x-2 py-2 px-3 group focus-within:bg-black/30 transition-all border-b border-white/50 focus-within:border-b-0 focus-within:rounded-md">
        <input
          className="bg-transparent placeholder:text-white text-white w-full text-xs md:text-base outline-none border-none"
          type="search"
          placeholder="Search Location"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          required
        />
        <button type="submit">
          <img src={searchIcon} alt="Search" />
        </button>
      </div>
    </form>
  );
}
