// NotFound.jsx → 404 page.
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>

        <p className="text-gray-500">
          The page you are looking for does not exist.
        </p>

        <Link
          to="/"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
