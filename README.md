# Bid2hand

Bid2hand เป็นเว็บแอป React (สร้างด้วย Vite) สำหรับประมูลสินค้าที่มีไฟล์ซอร์สหลักอยู่ในโฟลเดอร์ `bid2hand-react/` ภายใน repository เดียวกัน

## โครงสร้างโปรเจ็กต์

- `bid2hand-react/` – เว็บแอปหลัก (Vite + React)
- `bid2hand/` – snapshot ไฟล์ static เก่าที่ build จากเว็บแอป
- `b2h/` – assets โลโก้และสื่ออื่น ๆ

> หากต้องการพัฒนา/อัปเดตเว็บ ให้ทำงานใน `bid2hand-react/` แล้ว build เพื่อสร้างไฟล์ static ใหม่เป็น `dist/`

## ขั้นตอนเริ่มต้นใช้งาน Git/GitHub

1. Fork หรือสร้าง repository ใหม่บน GitHub (เช่น `github.com/<org>/bid2hand`)
2. บนเครื่อง local:
   ```bash
   git clone git@github.com:<org>/bid2hand.git
   cd bid2hand
   # ทำงานหลักในโฟลเดอร์เว็บแอป
   cd bid2hand-react
   npm install
   npm run dev
   ```
3. เมื่อแก้ไขเสร็จ
   ```bash
   git add .
   git commit -m "feat: update feature"
   git push origin main
   ```

## Build แอปสำหรับ Deploy

```bash
cd bid2hand-react
npm install          # ทำครั้งแรก
npm run build        # สร้างโฟลเดอร์ dist/
```

ไฟล์ใน `dist/` พร้อมสำหรับอัปโหลดขึ้น Hostatom (Plesk)

## Deployment แบบอัตโนมัติ

ภายใต้ `.github/workflows/deploy.yml` จะมี GitHub Actions Workflow ที่:

1. รันทุกครั้งที่ push ไปที่ branch `main`
2. `npm ci && npm run build` ภายใน `bid2hand-react/`
3. ใช้ SSH (ผ่าน rsync) เพื่อ sync `dist/` ไปยังเซิร์ฟเวอร์ Hostatom

### การเตรียมค่า Secret บน GitHub

ไปที่ **Settings → Secrets and variables → Actions → New repository secret** แล้วสร้างค่าต่อไปนี้ (แทนค่าบนเครื่องจริง)

- `PLESK_HOST` – hostname หรือ IP ของ Hostatom
- `PLESK_PORT` – port SSH (ปกติ 22)
- `PLESK_USER` – user สำหรับ SSH
- `PLESK_DEPLOY_PATH` – โฟลเดอร์ปลายทางบน Plesk (เช่น `/var/www/vhosts/example.com/httpdocs`)
- `PLESK_SSH_KEY` – private key (OpenSSH format) ของ user บน Plesk

> อย่าลืมเพิ่ม public key คู่เดียวกันเข้าไปที่ **Web Hosting Access → SSH Keys** ในหน้า Plesk

รายละเอียดขั้นตอนตั้งค่าบน Hostatom Plesk อยู่ใน `docs/deploy-hostatom-plesk.md`
