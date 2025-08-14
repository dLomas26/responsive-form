# 📝 Responsive Udyam Registration Form (Steps 1 & 2)

A fully responsive, modern implementation of the **first two steps** of the [Udyam Registration Portal](https://udyamregistration.gov.in/UdyamRegistration.aspx), including **Aadhaar + OTP validation** and **PAN validation**.  
This project focuses on **web scraping**, **UI/UX recreation**, **backend validation**, and **data storage** — closely mimicking the official government portal.

---

## 🚀 Features

### **1. Web Scraping**
- Extracted **form fields, labels, validation rules**, and UI structure from the Udyam portal.
- Formats handled:
  - **Aadhaar**: 12-digit numeric format
  - **PAN**: `[A-Z]{5}[0-9]{4}[A-Z]{1}`
- Tools used: **Cheerio**, or **Puppeteer**.

### **2. Responsive UI Development**
- Pixel-perfect replication of Udyam’s Step 1 & 2 forms.
- **Mobile-first** design — works seamlessly on desktops, tablets, and phones.
- Real-time validation & error messages.
- **Bonus**:
  - Auto-fill **City/State** from PIN code using [PostPin API](https://api.postalpincode.in/).

### **3. Backend Implementation**
- **Validation** against scraped rules.
- Endpoint: `POST /submit` with robust error handling.

### **4. Testing**
- Unit tests for:
  - Validation logic
  - API endpoints
- Tools: **Jest** (JavaScript)

### **5. Deployment (Bonus)**
- Dockerized for easy deployment.
- **Frontend** → Vercel/Netlify  
- **Backend** → Heroku/Railway

---
