const gameModes = [
  {
    icon: "🎰",
    title: "กงล้อเสี่ยงโชค",
    description: "หมุนรับคูปองส่วนลด ค่าส่งฟรี หรือแต้มสะสมพิเศษทุกวัน",
  },
  {
    icon: "🎯",
    title: "Mission Challenge",
    description: "ทำภารกิจสะสมดาวและปลดล็อกรางวัลลับสำหรับนักประมูลมือโปร",
  },
  {
    icon: "🎁",
    title: "Lucky Box",
    description: "สุ่มรับของที่ระลึกจากคลังญี่ปุ่นทุกสิ้นเดือน",
  },
];

const upcoming = [
  "ระบบจัดอันดับผู้เล่นพร้อม Hall of Fame",
  "แลกแต้มเป็นคูปองส่วนลดหรือบริการพรีเมียม",
  "กิจกรรม Cross-Platform ร่วมกับ Samurai Express Mobile",
];

export default function Game() {
  return (
    <section className="container">
      <header className="page-header">
        <h1>Bid2hand Arcade</h1>
        <p className="muted">
          ศูนย์รวมมินิเกมและกิจกรรมสะสมแต้มสำหรับสมาชิก Bid2hand — เตรียมรับความสนุกไปพร้อมกับสิทธิพิเศษมากมาย
        </p>
      </header>

      <div className="page-grid">
        {gameModes.map(({ icon, title, description }) => (
          <article className="card feature-card" key={title}>
            <div className="feature-icon">{icon}</div>
            <div>
              <h3>{title}</h3>
              <p className="muted">{description}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="section-block">
        <div className="card">
          <h2 className="section-title">Roadmap อัปเดตมินิเกม</h2>
          <ul className="timeline">
            {upcoming.map((item) => (
              <li className="timeline-item" key={item}>
                <strong>{item}</strong>
                <span className="muted">กำหนดเปิดตัว: Q3 2025</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
