import React from "react";

export default function FavouriteModal({ favourites, onSelect, onRemove }) {
  return (
    <div className="max-w-xs py-4 bg-white rounded-md border-gray-500 absolute right-0 top-16 text-black shadow-lg">
      <h3 className="text-lg font-bold px-4">Favourite Locations</h3>
      <ul className="space-y-2 mt-4 *:py-2 *:px-4 *:cursor-pointer">
        {favourites.length === 0 ? (
          <li className="text-gray-500">No favourites yet</li>
        ) : (
          favourites.map((city, index) => (
            <li
              key={index}
              className="hover:bg-gray-200 flex justify-between items-center"
            >
              <span onClick={() => onSelect(city)}>{city}</span>
              <button
                onClick={() => onRemove(city)}
                className="text-red-500 text-xs"
              >
                Remove
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
