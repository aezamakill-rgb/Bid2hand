# Deploying Bid2hand to Hostatom (Plesk)

คู่มือนี้ช่วยตั้งค่า pipeline อัตโนมัติให้ GitHub Actions build โปรเจ็กต์แล้ว sync ไปยัง Hostatom (Plesk)

## 1. สิ่งที่ต้องเตรียม

- Plesk ที่ Hostatom พร้อมโดเมน/ซับโดเมนที่ตั้งค่าพื้นฐานแล้ว
- สิทธิ์ SSH (ไปที่ **Websites & Domains → Web Hosting Access** แล้วตั้งค่า “Access to the server over SSH” เป็น `/bin/bash`)
- GitHub repository ที่มีโค้ดของโปรเจ็กต์นี้
- ติดตั้ง Git และ Node.js ไว้บนเครื่อง local เพื่อพัฒนาต่อ

## 2. กำหนดค่า SSH บน Plesk

1. สร้าง key pair บนเครื่องนักพัฒนา:
   ```bash
   ssh-keygen -t ed25519 -C "deploy@bid2hand" -f ~/.ssh/bid2hand_deploy
   ```
2. นำไฟล์ `~/.ssh/bid2hand_deploy.pub` ไปเพิ่มที่ **Web Hosting Access → SSH Keys → Add Key**
3. บันทึก Path ของ document root (เช่น `/var/www/vhosts/example.com/httpdocs`)

## 3. ตั้งค่า Secrets บน GitHub

ใน repository ให้ไปที่ **Settings → Secrets and variables → Actions** แล้วสร้าง secrets ตามนี้:

| Secret | ตัวอย่างค่า | หมายเหตุ |
| --- | --- | --- |
| `PLESK_HOST` | `123.45.67.89` หรือ `example.com` | Host/IP ของ Plesk |
| `PLESK_PORT` | `22` | ถ้า Hostatom เปลี่ยน port ให้ใช้ตามนั้น |
| `PLESK_USER` | `hostinguser` | User เดียวกับ Web Hosting Access |
| `PLESK_DEPLOY_PATH` | `/var/www/vhosts/example.com/httpdocs` | โฟลเดอร์ปลายทาง |
| `PLESK_SSH_KEY` | (วางเนื้อหา `~/.ssh/bid2hand_deploy`) | private key (OpenSSH) |

> ถ้า PLESK เปิด SSH ผ่าน password ได้ สามารถใช้ `PLESK_PASSWORD` แทน key แล้วแก้ workflow ให้ใช้ password ได้ แต่แนะนำให้ใช้ SSH key เพื่อความปลอดภัย

## 4. ตรวจสอบ Workflow

ไฟล์ `.github/workflows/deploy.yml` จะทำงานทุกครั้งที่ push ไปที่ `main`:

1. Checkout โค้ด
2. ติดตั้ง Node.js 20 + ติดตั้ง dependencies ภายใน `bid2hand-react/`
3. รัน `npm run build` เพื่อสร้าง `dist/`
4. ใช้ rsync ส่งไฟล์ `dist/` ไปยัง Plesk (override เดิม)

## 5. ทดสอบการ Deploy

1. ทำการ push commit ไปยัง `main`
2. ไปที่ **GitHub → Actions** เพื่อตรวจสอบ workflow
3. ถ้า success ให้เข้าเว็บเพื่อตรวจสอบหน้าเว็บจริง

หากต้องการทำ deploy manual ให้รัน workflow ผ่าน **Run workflow** ที่หน้า Actions

## 6. การ rollback

- ถ้าย้อนกลับเวอร์ชัน fast: deploy commit ก่อนหน้า (`git revert` หรือ checkout commit ที่ต้องการแล้ว push)
- หากต้องการหยุด deploy ชั่วคราว ให้ disable workflow ได้ที่ **Actions → Workflow → Disable**

## 7. เพิ่มคำสั่งหลัง deploy (ถ้ามี)

ถ้าต้องเปิดสิทธิ์ไฟล์/สร้าง symlink เพิ่ม ให้ใส่คำสั่งเพิ่มใน step “Deploy to Plesk” (ภายใน `ssh` script)

```yaml
    - name: Deploy to Plesk over SSH
      run: |
        ssh "${PLESK_USER}@${PLESK_HOST}" -p "${PLESK_PORT}" <<'EOF'
        cd "${PLESK_DEPLOY_PATH}"
        # ตัวอย่างเพิ่มเติม
        # ln -sfn shared/uploads httpdocs/uploads
        EOF
```

แก้ไข script นี้ตามโครงสร้างโฟลเดอร์ใน Plesk ของคุณ
