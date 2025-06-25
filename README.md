# Student App Final

[![Preview](https://img.shields.io/badge/Live-Demo-blue)](https://student-app-ss0i.onrender.com) 👉  
[ทดลองใช้งานที่นี่](https://student-app-ss0i.onrender.com)

## รายละเอียดโปรเจกต์

Student App เป็นเว็บแอปพลิเคชันสำหรับจัดการข้อมูลนักศึกษา  
สามารถบันทึก ค้นหา แก้ไข และแสดงข้อมูลนักศึกษาได้แบบ Real-time ผ่านหน้าเว็บที่ใช้งานง่าย

---

## ลิงก์ทดลองใช้งาน (Live Demo)

ลองใช้งาน Student App ได้ที่:  
👉 [https://student-app-ss0i.onrender.com](https://student-app-ss0i.onrender.com)

---

## ฟีเจอร์หลัก

- ลงทะเบียนนักศึกษาใหม่  
- แก้ไขข้อมูลนักศึกษา  
- ค้นหาข้อมูลตามชื่อและนามสกุล  
- แสดงผลข้อมูลแบบเรียลไทม์  
- ระบบ Authentication (เข้าสู่ระบบ/ลงทะเบียน)  
- ระบบ Backend API ที่เชื่อมต่อฐานข้อมูลแบบครบวงจร

---

## สถาปัตยกรรมระบบ

- Frontend: Angular  
- Backend: NestJS  
- Database: MongoDB  
- Deployment: Render (Frontend และ Backend)

---

## การใช้งาน LINE Messaging API

โปรเจกต์นี้มีการเชื่อมต่อกับ **LINE Messaging API** เพื่อรองรับฟีเจอร์ต่าง ๆ เช่น

- รับและส่งข้อความผ่าน LINE  
- ตั้งค่า webhook สำหรับรับ event จาก LINE  
- ประมวลผลข้อความและตอบกลับอัตโนมัติ  

### การตั้งค่าเบื้องต้น

1. ลงทะเบียนแอปใน [LINE Developers Console](https://developers.line.biz/)  
2. สร้าง Channel และรับ Channel Secret, Channel Access Token  
3. กำหนด URL ของ Webhook ให้ชี้มาที่ API ของเรา (เช่น `/line/webhook`)  
4. ตั้งค่า environment variables ใน backend เช่น

