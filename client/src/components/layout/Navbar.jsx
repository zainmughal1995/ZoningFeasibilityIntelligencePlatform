import { Search, User } from "lucide-react";
import React from "react";
function Navbar() {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Zoning Feasibility Platform
        </h2>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Search Placeholder */}
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search parcel..."
            className="pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* User */}
        <div className="flex items-center gap-2 cursor-pointer">
          <User size={18} className="text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Admin</span>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
