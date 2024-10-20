import { Outlet } from "react-router";
import { Link, NavLink } from "react-router-dom";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/wishlist", label: "Wish List" },
];

export default function RootLayout() {
  return (
    <div>
      <header>
        <nav className="flex max-w-6xl mx-auto items-center h-20 shadow-md">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold">
            <h1 className="text-2xl font-bold text-center py-4 text-purple-400 font-mono">
              Books.
            </h1>
          </Link>
          {/* Nav */}
          <ul className="flex items-center justify-center gap-8 ml-12">
            {
              // This is the same as navItems.map((item) => ...)
              navItems.map(({ to, label }) => (
                <li key={to}>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "text-brand font-bold"
                        : "text-gray-500 capitalize font-semibold"
                    }
                    to={to}
                  >
                    {label}
                  </NavLink>
                </li>
              ))
            }
          </ul>
        </nav>
      </header>
      <main className="bg-slate-100 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}
