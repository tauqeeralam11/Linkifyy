<div align="center">
  <img src="public/logo.png" alt="Linkifyy Logo" width="100" height="100" />
  
  # Linkifyy
  
  <h3><strong>Shorten links. Expand reach.</strong></h3>

  <p>
    A professional, privacy-focused URL shortener with built-in analytics, QR codes, and custom aliases. <br />
    Built with modern web technologies for speed and security.
  </p>

  <p>
    <img src="https://img.shields.io/badge/React-20232a?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="TailwindCSS" />
    <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
  </p>
</div>

---

## 📸 Screenshots

<div align="center">
  <img src="screenshot/home.png" alt="Home Desktop" width="800" style="border-radius: 15px; border: 1px solid #333; margin-bottom: 20px;" />
</div>

<br />

## 🚀 Key Features

* **⚡ Instant Shortening:** Generate short links instantly without a login wall.
* **🎨 Custom Aliases:** Create branded links (e.g., `linkifyy.netlify.app/my-brand`).
* **📊 Smart Analytics:** Track total clicks and see device breakdowns (Mobile vs. Desktop vs. Tablet).
* **📱 Fully Responsive:** A sleek, dark mode UI that looks great on all devices.
* **🔐 PIN Protection:** Securely edit or delete your links using a unique 6-digit PIN.
* **📂 Local History:** Automatically remembers your recently created links for quick access.
* **📷 QR Codes:** Auto-generated, high-resolution QR codes for every link.

---

## 🛠️ Tech Stack

* **Frontend:** React.js (Vite)
* **Styling:** Tailwind CSS + Lucide React Icons
* **Backend:** Supabase
* **Utilities:** `nanoid` (ID generation), `qrcode.react`

---

## 🏁 Getting Started

Follow these steps to run Linkifyy on your local machine.

### 1. Clone the repository
```bash
git clone https://github.com/tauqeeralam/Linkifyy.git
cd linkifyy
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Environment
Create a `.env` file in the root directory and add your Supabase credentials:

```env
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

### 4. Run the development server
```bash
npm run dev
```

---

## 🗄️ Database Setup

To make the app function, you need to set up the tables in your Supabase SQL Editor.

<details>
<summary><strong>🔻 Click here to view the complete SQL Script</strong></summary>

Copy and run this in your **Supabase SQL Editor**:

```sql
CREATE TABLE urls (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    original_url TEXT NOT NULL,
    short_code TEXT UNIQUE NOT NULL,
    pin TEXT NOT NULL,
    visit_count INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE clicks (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    url_id uuid REFERENCES urls(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    device TEXT,
    country TEXT,
    city TEXT
);

ALTER TABLE urls ENABLE ROW LEVEL SECURITY;
ALTER TABLE clicks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public Insert URLs" ON urls FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Read URLs" ON urls FOR SELECT USING (true);
CREATE POLICY "Public Update URLs" ON urls FOR UPDATE USING (true);
CREATE POLICY "Public Delete URLs" ON urls FOR DELETE USING (true);
CREATE POLICY "Public Insert Clicks" ON clicks FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Read Clicks" ON clicks FOR SELECT USING (true);
```
</details>

## 👨‍💻 Author

<div align="center">
  <a href="https://www.linkedin.com/in/tauqeer-alam/">
    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
  </a>
  <a href="https://github.com/tauqeeralam11">
    <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
  </a>
  
</div>


<div align="center">
  <p>Made with ❤️ by <strong>Tauqeer Alam</strong></p>
</div>
