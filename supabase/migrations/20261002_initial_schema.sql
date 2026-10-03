-- Migration: 20261002_initial_schema.sql
-- Description: Initial schema for i-CATS Invention & Innovation Club

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  short_description TEXT NOT NULL,
  full_description TEXT NOT NULL,
  event_type TEXT NOT NULL CHECK (event_type IN ('Workshop', 'Competition', 'Hackathon', 'Sharing Session', 'Innovation Challenge', 'Networking', 'Club Session', 'Other')),
  start_date DATE NOT NULL,
  end_date DATE,
  start_time TEXT,
  end_time TEXT,
  location TEXT NOT NULL,
  image_url TEXT,
  registration_url TEXT,
  status TEXT NOT NULL DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'ongoing', 'completed')),
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  summary TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Technology', 'Business', 'Sustainability', 'Creative', 'Education', 'Social Innovation', 'Engineering', 'Other')),
  team_name TEXT NOT NULL,
  team_members JSONB NOT NULL DEFAULT '[]'::jsonb,
  image_url TEXT,
  demo_url TEXT,
  repository_url TEXT,
  year INTEGER NOT NULL DEFAULT EXTRACT(YEAR FROM CURRENT_DATE),
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.committee_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  programme TEXT NOT NULL,
  photo_url TEXT,
  linkedin_url TEXT,
  display_order INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.sponsors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  logo_url TEXT,
  website_url TEXT,
  sponsorship_tier TEXT NOT NULL CHECK (sponsorship_tier IN ('Title Partner', 'Gold', 'Silver', 'Supporting Partner')),
  description TEXT,
  display_order INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.hackathon_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  tagline TEXT NOT NULL,
  theme TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'proposal' CHECK (status IN ('proposal', 'upcoming', 'active', 'completed')),
  status_label TEXT NOT NULL DEFAULT 'Proposal & Planning Stage',
  about_description TEXT NOT NULL,
  proposed_timeline JSONB NOT NULL DEFAULT '[]'::jsonb,
  eligibility_rules JSONB NOT NULL DEFAULT '[]'::jsonb,
  team_guidelines JSONB NOT NULL DEFAULT '[]'::jsonb,
  challenges JSONB NOT NULL DEFAULT '[]'::jsonb,
  prizes_note TEXT NOT NULL DEFAULT 'Details coming soon upon official approval',
  prizes_list JSONB NOT NULL DEFAULT '[]'::jsonb,
  judges_note TEXT NOT NULL DEFAULT 'Judges panel to be announced',
  sponsors_note TEXT NOT NULL DEFAULT 'Sponsorship invitations open',
  registration_url TEXT,
  faq_list JSONB NOT NULL DEFAULT '[]'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.club_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  club_name TEXT NOT NULL DEFAULT 'i-CATS Invention & Innovation Club',
  tagline TEXT NOT NULL DEFAULT 'Create. Collaborate. Innovate.',
  university_name TEXT NOT NULL DEFAULT 'i-CATS University',
  contact_email TEXT NOT NULL DEFAULT 'innovation.club@icats.edu.my',
  whatsapp_group_url TEXT,
  membership_form_url TEXT,
  instagram_url TEXT,
  linkedin_url TEXT,
  campus_location TEXT NOT NULL DEFAULT 'Student Innovation Studio, i-CATS Main Campus',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.contact_inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  programme TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- RLS
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.committee_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sponsors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hackathon_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.club_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read events" ON public.events FOR SELECT USING (true);
CREATE POLICY "Public read projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Public read committee" ON public.committee_members FOR SELECT USING (true);
CREATE POLICY "Public read sponsors" ON public.sponsors FOR SELECT USING (true);
CREATE POLICY "Public read hackathon_settings" ON public.hackathon_settings FOR SELECT USING (true);
CREATE POLICY "Public read club_settings" ON public.club_settings FOR SELECT USING (true);
CREATE POLICY "Public can submit contact inquiries" ON public.contact_inquiries FOR INSERT WITH CHECK (true);

CREATE POLICY "Admin full access on events" ON public.events FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access on projects" ON public.projects FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access on committee" ON public.committee_members FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access on sponsors" ON public.sponsors FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access on hackathon_settings" ON public.hackathon_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access on club_settings" ON public.club_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin read contact inquiries" ON public.contact_inquiries FOR SELECT TO authenticated USING (true);
