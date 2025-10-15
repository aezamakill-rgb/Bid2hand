const footerLinks = [
  { href: "/auction", label: "ประมูล" },
  { href: "/game", label: "มินิเกม" },
  { href: "/about", label: "เกี่ยวกับเรา" },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <small>© {new Date().getFullYear()} Bid2hand — Powered by Samurai Express</small>
        <div className="footer-links">
          {footerLinks.map(({ href, label }) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
