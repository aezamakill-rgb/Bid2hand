const milestones = [
  {
    year: "2023",
    title: "เริ่มต้นโครงการ",
    detail: "Samurai Express วางแผนแพลตฟอร์มประมูลออนไลน์สำหรับลูกค้าในไทย",
  },
  {
    year: "2024",
    title: "เปิดทดสอบระบบภายใน",
    detail: "ทีมงานและลูกค้ากลุ่มแรกเริ่มใช้งานระบบประมูลและติดตามพัสดุ",
  },
  {
    year: "2025",
    title: "Bid2hand 2025 Preview",
    detail: "เปิดตัวดีไซน์ใหม่ พร้อม roadmap มินิเกมและระบบสมาชิก",
  },
];

const values = [
  {
    title: "ความโปร่งใส",
    description: "ทุกขั้นตอนประมูลและค่าบริการระบุอย่างชัดเจน ติดตามย้อนหลังได้",
  },
  {
    title: "การสนับสนุนลูกค้า",
    description: "ทีมงานตอบกลับอย่างรวดเร็ว พร้อมที่ปรึกษาด้านสินค้าเฉพาะทาง",
  },
  {
    title: "ประสบการณ์ครบวงจร",
    description: "เชื่อมต่อคลังญี่ปุ่น ระบบจัดส่ง และมินิเกมสะสมสิทธิพิเศษในบัญชีเดียว",
  },
];

export default function About() {
  return (
    <section className="container">
      <header className="page-header">
        <h1>เกี่ยวกับ Bid2hand</h1>
        <p className="muted">
          แพลตฟอร์มที่ออกแบบโดย Samurai Express เพื่อให้คนไทยเข้าถึงสินค้าญี่ปุ่นที่รัก
          ได้ง่าย สนุก และมั่นใจในทุกขั้นตอน
        </p>
      </header>

      <div className="page-grid">
        {values.map(({ title, description }) => (
          <article className="card feature-card" key={title}>
            <div>
              <h3>{title}</h3>
              <p className="muted">{description}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="section-block">
        <div className="card">
          <h2 className="section-title">Milestones</h2>
          <ul className="timeline">
            {milestones.map(({ year, title, detail }) => (
              <li className="timeline-item" key={title}>
                <strong>
                  {year} · {title}
                </strong>
                <span className="muted">{detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="section-block">
        <div className="callout">
          <strong>มาร่วมออกแบบอนาคตของ Bid2hand</strong>
          <p className="muted">
            ส่งคำแนะนำ ฟีเจอร์ที่อยากเห็น หรือข้อเสนอความร่วมมือทางธุรกิจถึงทีม Samurai Express ได้ตลอด
          </p>
        </div>
      </div>
    </section>
  );
}
