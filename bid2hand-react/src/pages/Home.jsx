import { Link } from "react-router-dom";

const featureCards = [
  {
    icon: "🎌",
    title: "ประมูลสินค้าญี่ปุ่น",
    description: "ประมูลแบบเรียลไทม์พร้อมระบบแจ้งเตือนสเต็ปต่อสเต็ป",
  },
  {
    icon: "⚡️",
    title: "แจ้งเตือนสถานะทันที",
    description: "รู้ผลสินค้าชนะประมูล ส่งเข้าคลัง และจัดส่งถึงมือแบบครบวงจร",
  },
  {
    icon: "🎁",
    title: "มินิเกม & สิทธิพิเศษ",
    description: "ปลดล็อกสิทธิ์หมุนวงล้อ สะสมแต้ม แลกคูปอง และกิจกรรมประจำสัปดาห์",
  },
];

const timelineItems = [
  {
    title: "เลือกและประมูลสินค้า",
    detail: "ค้นหาสินค้าในตลาดญี่ปุ่น เลือกแพ็กเกจประมูลที่เหมาะกับคุณ",
  },
  {
    title: "ทีมงานดูแลการประมูล",
    detail: "เจ้าหน้าที่ Samurai Express ช่วยประมูลและยืนยันผลแบบเรียลไทม์",
  },
  {
    title: "เชื่อมต่อคลังและจัดส่ง",
    detail: "รับการอัปเดตสถานะพัสดุ กำหนดวิธีการขนส่ง และติดตามสถานะได้ในระบบ",
  },
];

export default function Home() {
  return (
    <>
      <section className="hero" id="hero">
        <div className="container">
          <span className="badge">
            <span role="img" aria-label="star">
              ✨
            </span>
            Bid2hand 2025 Preview
          </span>
          <h1>แพลตฟอร์มประมูลสินค้าญี่ปุ่น ครบในที่เดียว</h1>
          <p>
            ติดตามทุกสถานะ ตั้งแต่ประมูลจนถึงส่งถึงมือ พร้อมกิจกรรมมินิเกมและ
            loyalty program จาก Samurai Express
          </p>
          <div className="hero-actions">
            <Link className="button primary" to="/auction">
              เริ่มประมูลทันที
            </Link>
            <Link className="button secondary" to="/game">
              สัมผัสมินิเกม
            </Link>
          </div>
        </div>
      </section>

      <section className="container section-block">
        <div className="card">
          <div className="grid">
            <div>
              <h2 className="section-title">ประสบการณ์ที่ออกแบบรอบตัวคุณ</h2>
              <p className="section-subtitle">
                เราออกแบบ Bid2hand ให้ใช้งานง่าย เหมือนนั่งอยู่หน้าประมูลผ่านหน้าจอเดียว
                พร้อมข้อมูลครบถ้วนตั้งแต่ราคาประมูลล่าสุดไปจนถึงเส้นทางโลจิสติกส์
              </p>
              <div className="stat-row">
                <div className="stat-card">
                  <span className="muted">เวลาตอบสนอง</span>
                  <strong>&lt; 1 นาที</strong>
                </div>
                <div className="stat-card">
                  <span className="muted">ติดตามสถานะ</span>
                  <strong>24/7</strong>
                </div>
                <div className="stat-card">
                  <span className="muted">สิทธิพิเศษสมาชิก</span>
                  <strong>+5 โปรฯ</strong>
                </div>
              </div>
            </div>
            <div className="grid feature-grid">
              {featureCards.map(({ icon, title, description }) => (
                <article className="card feature-card" key={title}>
                  <div className="feature-icon">{icon}</div>
                  <div>
                    <h3>{title}</h3>
                    <p className="muted">{description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container section-block">
        <div className="card">
          <h2 className="section-title">ขั้นตอนการใช้งาน Bid2hand</h2>
          <p className="section-subtitle">
            เพียง 3 ขั้นตอนหลัก คุณก็สามารถเลือกสินค้า ประมูล และติดตามการจัดส่งได้ครบ
          </p>
          <ul className="timeline">
            {timelineItems.map(({ title, detail }) => (
              <li className="timeline-item" key={title}>
                <strong>{title}</strong>
                <span className="muted">{detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
