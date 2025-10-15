const auctionHighlights = [
  {
    title: "ห้องประมูลสด",
    detail: "อัปเดตราคาปัจจุบันพร้อมเสียงแจ้งเตือน ให้คุณตัดสินใจได้ทันที",
    icon: "📡",
  },
  {
    title: "แผงควบคุมส่วนตัว",
    detail: "ติดตามสินค้าที่สนใจ ตั้งค่าราคาสูงสุด และรับการแจ้งเตือนผ่าน LINE",
    icon: "🎯",
  },
  {
    title: "รายงานผลอัตโนมัติ",
    detail: "สรุปผลผู้ชนะ กำหนดการชำระเงิน และเส้นทางลอจิสติกส์ในหน้าเดียว",
    icon: "📦",
  },
];

const auctionSteps = [
  {
    label: "1",
    title: "เลือกสินค้าที่ต้องการ",
    detail: "ค้นหาทั้งจาก Yahoo Auction และตลาดญี่ปุ่นชั้นนำ",
  },
  {
    label: "2",
    title: "กำหนดกลยุทธ์ประมูล",
    detail: "ตั้งราคาสูงสุดหรือกำหนดให้ทีมเราช่วยประมูลแบบมืออาชีพ",
  },
  {
    label: "3",
    title: "รับแจ้งเตือนและยืนยันผล",
    detail: "ระบบส่งการแจ้งเตือนเมื่อชนะ หรือเสนอรอบประมูลถัดไปทันที",
  },
];

export default function Auction() {
  return (
    <section className="container">
      <header className="page-header">
        <h1>ห้องประมูล Bid2hand</h1>
        <p className="muted">
          ติดตามความเคลื่อนไหวได้ทุกวินาที พร้อมสรุปข้อมูลสำคัญและแนะนำดีลที่คุณไม่ควรพลาด
        </p>
      </header>

      <div className="page-grid">
        {auctionHighlights.map(({ title, detail, icon }) => (
          <article className="card feature-card" key={title}>
            <div className="feature-icon">{icon}</div>
            <div>
              <h3>{title}</h3>
              <p className="muted">{detail}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="section-block">
        <div className="card">
          <h2 className="section-title">เริ่มต้นการประมูลใน 3 ขั้น</h2>
          <div className="grid" style={{ gap: "18px" }}>
            {auctionSteps.map(({ label, title, detail }) => (
              <div className="timeline-item" key={title}>
                <strong>
                  {label}. {title}
                </strong>
                <span className="muted">{detail}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="section-block">
        <div className="callout">
          <strong>ต้องการทดลองระบบ?</strong>
          <p className="muted">
            ติดต่อทีม Samurai Express เพื่อเปิดบัญชีทดลอง แล้วรับสิทธิ์เข้าชมห้องประมูลจริงพร้อมคำแนะนำส่วนตัว
          </p>
        </div>
      </div>
    </section>
  );
}
