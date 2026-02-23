import { Search, User } from "lucide-react";
import React from "react";
import useCityStore from "../../store/cityStore";
function Navbar() {
  const { selectedCity, cities, setCity } = useCityStore();

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <h2 className="text-lg font-semibold text-gray-800">
        Zoning Feasibility Platform
      </h2>

      <div className="flex items-center gap-4">
        <select
          value={selectedCity}
          onChange={(e) => setCity(e.target.value)}
          className="px-3 py-2 border rounded-lg text-sm"
        >
          {Object.entries(cities).map(([key, city]) => (
            <option key={key} value={key}>
              {city.name}
            </option>
          ))}
        </select>

        <span className="text-sm font-medium text-gray-700">Admin</span>
      </div>
    </header>
  );
}

export default Navbar;
