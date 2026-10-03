# i-CATS Invention & Innovation Club — Official Website

> **"Create. Collaborate. Innovate."**

Official full-stack web application for the **i-CATS Invention & Innovation Club**. An interdisciplinary student community that welcomes students from all academic programmes to turn creative curiosity into functional prototypes, solutions, and real-world impact.

---

## 🌟 Key Features

- **Interdisciplinary Core**: Explicitly highlights and encourages participation across all faculties (Computing, Business, Engineering, Creative Arts, Sciences, Education, and Social Innovation).
- **Activities & Events System**: Full calendar with categorization (Workshops, Hackathons, Sharing Sessions, Ideation Sprints), past/upcoming status filters, and individual activity detail pages (`/activities/:slug`).
- **Student Project Showcase**: Multi-disciplinary showcase categorized by domain (Technology, Business, Sustainability, Creative, Social Innovation) with team member roles and demo links (`/projects/:slug`).
- **Hackathon Portal (Proposed Initiative)**: Transparent planning roadmap with problem themes, eligibility, team guidelines, prize status ("Details coming soon"), and sponsorship intake (`/hackathon`).
- **Committee & Leadership**: Clear organizational directory gracefully handling member roles, faculties, and contact profiles (`/team`).
- **Member Recruitment**: Interactive onboarding with zero-barrier messaging ("No prior experience or ready invention needed"), WhatsApp community button, and in-app registration form (`/join`).
- **Club Administration Dashboard**: Secure admin portal (`/admin`) for managing Events, Projects, Committee, Sponsors, Hackathon configuration, and Club links without modifying source code.

---

## 🛠️ Technology Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS, Outfit & Plus Jakarta Sans typography
- **Routing**: React Router v7
- **Database & Auth**: Supabase (PostgreSQL + Row Level Security + Supabase Auth)
- **Icons**: Lucide React
- **Hosting / Deployment**: Vercel / Cloud Run compatible

---

## 🚀 Quick Start (Local Development)

### 1. Clone & Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Fill in your Supabase credentials:
```env
VITE_SUPABASE_URL="https://your-supabase-project.supabase.co"
VITE_SUPABASE_ANON_KEY="your-supabase-anon-key"
```

*(Note: If Supabase credentials are not provided, the application automatically runs in seamless local persistence mode with pre-seeded sample data, allowing full testing of public and admin flows.)*

### 3. Start Development Server
```bash
npm run dev
```
Open `http://localhost:3000` in your browser.

---

## 🗄️ Supabase Database & Security Setup

1. Log in to [Supabase](https://supabase.com) and create a new project.
2. Go to **SQL Editor** in your Supabase Dashboard.
3. Open `supabase/schema.sql` from this repository and run the script.
4. The script creates:
   - `events` (with type and status constraints)
   - `projects` (with JSONB team arrays and categories)
   - `committee_members` (ordered directory)
   - `sponsors` (tiered partnerships)
   - `hackathon_settings` (configurable timeline and FAQ list)
   - `club_settings` (global contact and social URLs)
   - `contact_inquiries` (form submissions)
5. **Row Level Security (RLS)** is automatically enabled:
   - **Public**: Allowed to read public events, projects, committee, hackathon, and club settings.
   - **Public**: Allowed to insert contact inquiries.
   - **Authenticated Admins**: Full CRUD permissions on all tables.
6. To create your first administrator, go to **Authentication > Users** in Supabase and invite or create an admin email and password.

---

## 🌐 Deploy to Vercel

1. Push your code to GitHub.
2. Import the repository in [Vercel](https://vercel.com).
3. Under **Environment Variables**, add:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy! All client-side routes will resolve cleanly.

---

## 📄 License
© i-CATS Invention & Innovation Club. Open to students of all disciplines.
