import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const duration = 500;

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
    setMenuOpen(false);
  };

  // أقسام حسب الدور
  const sectionsByRole = {
    CEO: [
      { icon: "fa-house", label: "Home", path: "/home" },
      { icon: "fa-clock-rotate-left", label: "History", path: "/history" },
      { icon: "fa-database", label: "Database", path: "/database" },
      { icon: "fa-video", label: "Videos", path: "/videos" },
      {
        icon: "fa-solid fa-filter-circle-xmark",
        label: "Filter",
        path: "/filter",
      },
      { icon: "fa-user", label: "Profile", path: "/profile" },
    ],
    employee: [
      { icon: "fa-house", label: "Home", path: "/home" },
      { icon: "fa-database", label: "Database", path: "/database" },
      { icon: "fa-video", label: "Videos", path: "/videos" },
      {
        icon: "fa-solid fa-filter-circle-xmark",
        label: "Filter",
        path: "/filter",
      },
      { icon: "fa-user", label: "Profile", path: "/profile" },
    ],
    officer: [
      { icon: "fa-house", label: "Home", path: "/home" },
      { icon: "fa-user", label: "Profile", path: "/profile" },
    ],
  };

  const sections =
    role === "CEO"
      ? sectionsByRole.CEO
      : role === "employee"
      ? sectionsByRole.employee
      : role === "officer"
      ? sectionsByRole.officer
      : [];

  return (
    <nav
      style={{ transition: `all ${duration}ms` }}
      className="bg-black/30 fixed top-0 right-0 left-0 z-50 shadow-sm shadow-primary-500"
    >
      <div className="container mx-auto px-3 py-2">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between">
          {/* ===== Logo ===== */}
          <a href="/" className="flex items-center">
            <img
              src="/images/OzirixPng2.png"
              className="w-16 h-16"
              alt="Ozirix Logo"
            />
          </a>

          {/* ===== Burger icon (mobile) ===== */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-2xl text-white md:hidden ml-auto"
          >
            {menuOpen ? (
              <i className="fa-solid fa-xmark" />
            ) : (
              <i className="fa-solid fa-bars" />
            )}
          </button>

          {/* ===== Center Links (md+) ===== */}
          {token && sections.length > 0 && (
            <ul className="hidden md:flex items-center justify-center gap-8">
              {sections.map((sec) => (
                <NavLink
                  key={sec.path}
                  to={sec.path}
                  className={({ isActive }) =>
                    `group relative flex flex-col items-center text-lg transition-colors
                     ${
                       isActive
                         ? "text-primary-500"
                         : "text-white hover:text-primary-500"
                     }`
                  }
                >
                  <i className={`fa-solid ${sec.icon} text-3xl`} />
                  {/* Tooltip يظهر عند الهفر في الشاشات الكبيرة */}
                  <span
                    className="absolute bottom-[-2.5rem] left-1/2 -translate-x-1/2
                               bg-black/80 text-white text-sm px-3 py-1 rounded-lg shadow-lg
                               opacity-0 group-hover:opacity-100
                               hidden md:block transition duration-200 whitespace-nowrap pointer-events-none"
                  >
                    {sec.label}
                  </span>
                </NavLink>
              ))}
            </ul>
          )}

          {/* ===== Right Side: Logout OR Login/Signup (md+) ===== */}
          <div className="hidden md:flex items-center gap-4">
            {token ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition duration-300"
              >
                <i className="fa-solid fa-right-from-bracket text-xl" />
                <span>Logout</span>
              </button>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="flex items-center gap-2 text-white hover:text-primary-500"
                >
                  <i className="fa-solid fa-right-to-bracket text-xl" />
                  <span>Login</span>
                </NavLink>
                <NavLink
                  to="/signup"
                  className="flex items-center gap-2 border border-blue-400 text-blue-400 px-4 py-1 rounded-lg hover:text-blue-300 hover:border-blue-300"
                >
                  <i className="fa-solid fa-user-plus text-xl" />
                  <span>Join Free</span>
                </NavLink>
              </>
            )}
          </div>

          {/* ===== Mobile Menu ===== */}
          {menuOpen && (
            <div className="absolute top-full left-0 w-full bg-black/90 md:hidden flex flex-col items-center gap-4 py-4">
              {token ? (
                <>
                  {sections.map((sec) => (
                    <NavLink
                      key={sec.path}
                      to={sec.path}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-3 text-lg text-white hover:text-primary-500"
                    >
                      <i className={`fa-solid ${sec.icon} text-2xl`} />
                      <span>{sec.label}</span>
                    </NavLink>
                  ))}
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 text-lg text-red-400 hover:text-red-600 mt-2"
                  >
                    <i className="fa-solid fa-right-from-bracket text-2xl" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 text-lg text-white hover:text-primary-500"
                  >
                    <i className="fa-solid fa-right-to-bracket text-2xl" />
                    <span>Login</span>
                  </NavLink>
                  <NavLink
                    to="/signup"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 text-lg text-blue-400 border border-blue-400 px-4 py-1 rounded-lg hover:text-blue-300"
                  >
                    <i className="fa-solid fa-user-plus text-2xl" />
                    <span>Join Free</span>
                  </NavLink>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
