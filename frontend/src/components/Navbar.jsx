import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

function Navbar() {
  const navigate = useNavigate();

  const today = useMemo(() => {
    return new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }, []);

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");

      await api.post("auth/logout/", {
        refresh: refreshToken,
      });
    } catch (error) {
      console.error("Logout Error:", error);
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");

      navigate("/", { replace: true });
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
      <div className="container">

        <a className="navbar-brand fw-bold" href="/home">
          🎓 Student Management System
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="navbarNav"
        >
          <ul className="navbar-nav ms-auto align-items-center">

            <li className="nav-item me-3">
              <span className="text-white fw-semibold">
                Student CRUD Project
              </span>
            </li>

            <li className="nav-item me-3">
              <span className="badge bg-light text-dark px-3 py-2">
                {today}
              </span>
            </li>

            {/* Logout Button */}
            <li className="nav-item">
              <button
                className="btn btn-danger"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>

          </ul>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;