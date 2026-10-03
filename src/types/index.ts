export interface EventItem {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  full_description: string;
  event_type: 'Workshop' | 'Competition' | 'Hackathon' | 'Sharing Session' | 'Innovation Challenge' | 'Networking' | 'Club Session' | 'Other';
  start_date: string; // YYYY-MM-DD
  end_date?: string;   // YYYY-MM-DD
  start_time?: string; // e.g. "14:00"
  end_time?: string;   // e.g. "17:00"
  location: string;
  image_url?: string;
  registration_url?: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  featured: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  category: 'Technology' | 'Business' | 'Sustainability' | 'Creative' | 'Education' | 'Social Innovation' | 'Engineering' | 'Other';
  team_name: string;
  team_members: string[]; // List of team members / disciplines
  image_url?: string;
  demo_url?: string;
  repository_url?: string;
  year: number;
  featured: boolean;
  created_at?: string;
}

export interface CommitteeMember {
  id: string;
  name: string;
  role: string;
  programme: string; // e.g., "Diploma in Computer Science", "Bachelor of Software Engineering", "Faculty of Business", "Design & Arts"
  photo_url?: string;
  linkedin_url?: string;
  display_order: number;
  created_at?: string;
}

export interface SponsorItem {
  id: string;
  name: string;
  logo_url?: string;
  website_url?: string;
  sponsorship_tier: 'Title Partner' | 'Gold' | 'Silver' | 'Supporting Partner';
  description?: string;
  display_order: number;
  created_at?: string;
}

export interface HackathonSettings {
  id?: string;
  title: string;
  tagline: string;
  theme: string;
  status: 'proposal' | 'upcoming' | 'active' | 'completed';
  status_label: string; // e.g. "Proposal & Planning Stage" or "Officially Approved"
  about_description: string;
  proposed_timeline: Array<{
    phase: string;
    date_or_status: string;
    description: string;
  }>;
  eligibility_rules: string[];
  team_guidelines: string[];
  challenges: Array<{
    title: string;
    category: string;
    description: string;
  }>;
  prizes_note: string; // e.g. "Details coming soon upon official approval"
  prizes_list?: Array<{
    place: string;
    reward: string;
  }>;
  judges_note: string; // e.g. "Judges panel to be announced"
  sponsors_note: string;
  registration_url?: string;
  faq_list: Array<{
    question: string;
    answer: string;
  }>;
  updated_at?: string;
}

export interface ClubSettings {
  id?: string;
  club_name: string;
  tagline: string;
  university_name: string;
  contact_email: string;
  whatsapp_group_url?: string;
  membership_form_url?: string;
  instagram_url?: string;
  linkedin_url?: string;
  campus_location: string;
  updated_at?: string;
}
