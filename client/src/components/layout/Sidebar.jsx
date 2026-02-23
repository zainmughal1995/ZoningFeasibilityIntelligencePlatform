import { NavLink } from "react-router-dom";
import { Home, Map, History } from "lucide-react";
import React from "react";
function Sidebar() {
  const linkClass =
    "flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition";

  const activeClass = "bg-blue-600 text-white";
  const inactiveClass = "text-gray-600 hover:bg-gray-200 hover:text-gray-900";

  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-4 flex flex-col">
      {/* Logo */}
      <div className="mb-8">
        <h1 className="text-xl font-bold text-blue-600">ZoningAI</h1>
        <p className="text-xs text-gray-500">Feasibility Intelligence</p>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : inactiveClass}`
          }
        >
          <Home size={18} />
          Dashboard
        </NavLink>

        <NavLink
          to="/analysis"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : inactiveClass}`
          }
        >
          <Map size={18} />
          Analysis
        </NavLink>

        <NavLink
          to="/history"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : inactiveClass}`
          }
        >
          <History size={18} />
          History
        </NavLink>
      </nav>

      {/* Footer */}
      <div className="mt-auto pt-6 text-xs text-gray-400">© 2026 ZoningAI</div>
    </aside>
  );
}

export default Sidebar;
