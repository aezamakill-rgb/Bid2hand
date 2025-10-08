import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
        background: "#111",
        padding: "15px",
      }}
    >
      <Link style={{ color: "#0ff", textDecoration: "none" }} to="/">
        หน้าแรก
      </Link>
      <Link style={{ color: "#0ff", textDecoration: "none" }} to="/auction">
        ประมูล
      </Link>
      <Link style={{ color: "#0ff", textDecoration: "none" }} to="/game">
        มินิเกม
      </Link>
      <Link style={{ color: "#0ff", textDecoration: "none" }} to="/about">
        เกี่ยวกับเรา
      </Link>
    </nav>
  );
}
