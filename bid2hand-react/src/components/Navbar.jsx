import { Link, NavLink } from "react-router-dom";

const navItems = [
  { to: "/", label: "หน้าแรก", end: true },
  { to: "/auction", label: "ประมูล" },
  { to: "/game", label: "มินิเกม" },
  { to: "/about", label: "เกี่ยวกับเรา" },
];

export default function Navbar() {
  return (
    <nav className="site-nav">
      <div className="container nav-inner">
        <Link className="brand" to="/">
          Bid2hand
        </Link>
        <div className="nav-links">
          {navItems.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              {label}
            </NavLink>
          ))}
        </div>
        <Link className="nav-cta" to="/auction">
          เข้าร่วมการประมูล
        </Link>
      </div>
    </nav>
  );
}
