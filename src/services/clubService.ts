import { supabase, isSupabaseConfigured } from '../lib/supabase';
import {
  EventItem,
  ProjectItem,
  CommitteeMember,
  SponsorItem,
  HackathonSettings,
  ClubSettings
} from '../types';
import {
  INITIAL_EVENTS,
  INITIAL_PROJECTS,
  INITIAL_COMMITTEE,
  INITIAL_SPONSORS,
  INITIAL_HACKATHON_SETTINGS,
  INITIAL_CLUB_SETTINGS
} from './seedData';

// Local storage keys for offline/fallback mode
const STORAGE_KEYS = {
  EVENTS: 'icats_club_events_v1',
  PROJECTS: 'icats_club_projects_v1',
  COMMITTEE: 'icats_club_committee_v1',
  SPONSORS: 'icats_club_sponsors_v1',
  HACKATHON: 'icats_club_hackathon_v1',
  SETTINGS: 'icats_club_settings_v1',
  CONTACTS: 'icats_club_contacts_v1'
};

function getLocal<T>(key: string, defaultData: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(defaultData));
      return defaultData;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.warn(`Local storage read error for ${key}:`, e);
    return defaultData;
  }
}

function setLocal<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.warn(`Local storage write error for ${key}:`, e);
  }
}

export const clubService = {
  // ==========================================
  // EVENTS
  // ==========================================
  async getEvents(): Promise<EventItem[]> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('start_date', { ascending: false });
      if (!error && data && data.length > 0) {
        return data as EventItem[];
      }
    }
    return getLocal<EventItem[]>(STORAGE_KEYS.EVENTS, INITIAL_EVENTS);
  },

  async getEventBySlug(slug: string): Promise<EventItem | null> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('slug', slug)
        .single();
      if (!error && data) return data as EventItem;
    }
    const local = getLocal<EventItem[]>(STORAGE_KEYS.EVENTS, INITIAL_EVENTS);
    return local.find((e) => e.slug === slug) || null;
  },

  async saveEvent(event: Partial<EventItem> & { title: string }): Promise<EventItem> {
    const now = new Date().toISOString();
    const slug = event.slug || event.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    
    if (isSupabaseConfigured && supabase) {
      if (event.id && !event.id.startsWith('evt-')) {
        const { data, error } = await supabase
          .from('events')
          .update({ ...event, slug, updated_at: now })
          .eq('id', event.id)
          .select()
          .single();
        if (!error && data) return data as EventItem;
      } else {
        const { id: _, ...insertData } = event;
        const { data, error } = await supabase
          .from('events')
          .insert({ ...insertData, slug, updated_at: now })
          .select()
          .single();
        if (!error && data) return data as EventItem;
      }
    }

    // Local fallback
    const list = getLocal<EventItem[]>(STORAGE_KEYS.EVENTS, INITIAL_EVENTS);
    const existingIndex = event.id ? list.findIndex((e) => e.id === event.id) : -1;
    const finalItem: EventItem = {
      id: event.id || `evt-${Date.now()}`,
      title: event.title,
      slug,
      short_description: event.short_description || '',
      full_description: event.full_description || '',
      event_type: event.event_type || 'Workshop',
      start_date: event.start_date || new Date().toISOString().split('T')[0],
      end_date: event.end_date,
      start_time: event.start_time || '14:00',
      end_time: event.end_time || '17:00',
      location: event.location || 'i-CATS Innovation Lab',
      image_url: event.image_url || '/src/assets/images/interdisciplinary_collab_1790998727769.jpg',
      registration_url: event.registration_url || '',
      status: event.status || 'upcoming',
      featured: Boolean(event.featured),
      created_at: event.created_at || now,
      updated_at: now
    };

    if (existingIndex >= 0) {
      list[existingIndex] = finalItem;
    } else {
      list.unshift(finalItem);
    }
    setLocal(STORAGE_KEYS.EVENTS, list);
    return finalItem;
  },

  async deleteEvent(id: string): Promise<boolean> {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('events').delete().eq('id', id);
      if (error) console.error('Error deleting event in Supabase:', error);
    }
    const list = getLocal<EventItem[]>(STORAGE_KEYS.EVENTS, INITIAL_EVENTS);
    const filtered = list.filter((e) => e.id !== id);
    setLocal(STORAGE_KEYS.EVENTS, filtered);
    return true;
  },

  // ==========================================
  // PROJECTS
  // ==========================================
  async getProjects(): Promise<ProjectItem[]> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('year', { ascending: false });
      if (!error && data && data.length > 0) {
        return data as ProjectItem[];
      }
    }
    return getLocal<ProjectItem[]>(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS);
  },

  async getProjectBySlug(slug: string): Promise<ProjectItem | null> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('slug', slug)
        .single();
      if (!error && data) return data as ProjectItem;
    }
    const local = getLocal<ProjectItem[]>(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS);
    return local.find((p) => p.slug === slug) || null;
  },

  async saveProject(proj: Partial<ProjectItem> & { title: string; category: ProjectItem['category'] }): Promise<ProjectItem> {
    const now = new Date().toISOString();
    const slug = proj.slug || proj.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    if (isSupabaseConfigured && supabase) {
      if (proj.id && !proj.id.startsWith('proj-')) {
        const { data, error } = await supabase
          .from('projects')
          .update({ ...proj, slug })
          .eq('id', proj.id)
          .select()
          .single();
        if (!error && data) return data as ProjectItem;
      } else {
        const { id: _, ...insertData } = proj;
        const { data, error } = await supabase
          .from('projects')
          .insert({ ...insertData, slug })
          .select()
          .single();
        if (!error && data) return data as ProjectItem;
      }
    }

    const list = getLocal<ProjectItem[]>(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS);
    const existingIndex = proj.id ? list.findIndex((p) => p.id === proj.id) : -1;
    const finalItem: ProjectItem = {
      id: proj.id || `proj-${Date.now()}`,
      title: proj.title,
      slug,
      summary: proj.summary || '',
      description: proj.description || '',
      category: proj.category || 'Technology',
      team_name: proj.team_name || 'Innovation Project Team',
      team_members: proj.team_members || ['Student Innovator'],
      image_url: proj.image_url || '/src/assets/images/student_project_demo_1790998739311.jpg',
      demo_url: proj.demo_url || '',
      repository_url: proj.repository_url || '',
      year: proj.year || new Date().getFullYear(),
      featured: Boolean(proj.featured),
      created_at: proj.created_at || now
    };

    if (existingIndex >= 0) {
      list[existingIndex] = finalItem;
    } else {
      list.unshift(finalItem);
    }
    setLocal(STORAGE_KEYS.PROJECTS, list);
    return finalItem;
  },

  async deleteProject(id: string): Promise<boolean> {
    if (isSupabaseConfigured && supabase) {
      await supabase.from('projects').delete().eq('id', id);
    }
    const list = getLocal<ProjectItem[]>(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS);
    setLocal(STORAGE_KEYS.PROJECTS, list.filter((p) => p.id !== id));
    return true;
  },

  // ==========================================
  // COMMITTEE
  // ==========================================
  async getCommittee(): Promise<CommitteeMember[]> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('committee_members')
        .select('*')
        .order('display_order', { ascending: true });
      if (!error && data && data.length > 0) return data as CommitteeMember[];
    }
    const list = getLocal<CommitteeMember[]>(STORAGE_KEYS.COMMITTEE, INITIAL_COMMITTEE);
    return list.sort((a, b) => a.display_order - b.display_order);
  },

  async saveCommitteeMember(member: Partial<CommitteeMember> & { name: string; role: string; programme: string }): Promise<CommitteeMember> {
    if (isSupabaseConfigured && supabase) {
      if (member.id && !member.id.startsWith('comm-')) {
        const { data, error } = await supabase
          .from('committee_members')
          .update(member)
          .eq('id', member.id)
          .select()
          .single();
        if (!error && data) return data as CommitteeMember;
      } else {
        const { id: _, ...insertData } = member;
        const { data, error } = await supabase
          .from('committee_members')
          .insert(insertData)
          .select()
          .single();
        if (!error && data) return data as CommitteeMember;
      }
    }

    const list = getLocal<CommitteeMember[]>(STORAGE_KEYS.COMMITTEE, INITIAL_COMMITTEE);
    const existingIndex = member.id ? list.findIndex((m) => m.id === member.id) : -1;
    const finalItem: CommitteeMember = {
      id: member.id || `comm-${Date.now()}`,
      name: member.name,
      role: member.role,
      programme: member.programme,
      photo_url: member.photo_url || '',
      linkedin_url: member.linkedin_url || '',
      display_order: member.display_order ?? (list.length + 1),
      created_at: member.created_at || new Date().toISOString()
    };

    if (existingIndex >= 0) {
      list[existingIndex] = finalItem;
    } else {
      list.push(finalItem);
    }
    setLocal(STORAGE_KEYS.COMMITTEE, list);
    return finalItem;
  },

  async deleteCommitteeMember(id: string): Promise<boolean> {
    if (isSupabaseConfigured && supabase) {
      await supabase.from('committee_members').delete().eq('id', id);
    }
    const list = getLocal<CommitteeMember[]>(STORAGE_KEYS.COMMITTEE, INITIAL_COMMITTEE);
    setLocal(STORAGE_KEYS.COMMITTEE, list.filter((m) => m.id !== id));
    return true;
  },

  // ==========================================
  // SPONSORS
  // ==========================================
  async getSponsors(): Promise<SponsorItem[]> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('sponsors')
        .select('*')
        .order('display_order', { ascending: true });
      if (!error && data) return data as SponsorItem[];
    }
    return getLocal<SponsorItem[]>(STORAGE_KEYS.SPONSORS, INITIAL_SPONSORS);
  },

  async saveSponsor(sponsor: Partial<SponsorItem> & { name: string; sponsorship_tier: SponsorItem['sponsorship_tier'] }): Promise<SponsorItem> {
    if (isSupabaseConfigured && supabase) {
      if (sponsor.id && !sponsor.id.startsWith('sp-')) {
        const { data, error } = await supabase
          .from('sponsors')
          .update(sponsor)
          .eq('id', sponsor.id)
          .select()
          .single();
        if (!error && data) return data as SponsorItem;
      } else {
        const { id: _, ...insertData } = sponsor;
        const { data, error } = await supabase
          .from('sponsors')
          .insert(insertData)
          .select()
          .single();
        if (!error && data) return data as SponsorItem;
      }
    }

    const list = getLocal<SponsorItem[]>(STORAGE_KEYS.SPONSORS, INITIAL_SPONSORS);
    const existingIndex = sponsor.id ? list.findIndex((s) => s.id === sponsor.id) : -1;
    const finalItem: SponsorItem = {
      id: sponsor.id || `sp-${Date.now()}`,
      name: sponsor.name,
      logo_url: sponsor.logo_url || '',
      website_url: sponsor.website_url || '',
      sponsorship_tier: sponsor.sponsorship_tier,
      description: sponsor.description || '',
      display_order: sponsor.display_order ?? (list.length + 1),
      created_at: sponsor.created_at || new Date().toISOString()
    };

    if (existingIndex >= 0) {
      list[existingIndex] = finalItem;
    } else {
      list.push(finalItem);
    }
    setLocal(STORAGE_KEYS.SPONSORS, list);
    return finalItem;
  },

  async deleteSponsor(id: string): Promise<boolean> {
    if (isSupabaseConfigured && supabase) {
      await supabase.from('sponsors').delete().eq('id', id);
    }
    const list = getLocal<SponsorItem[]>(STORAGE_KEYS.SPONSORS, INITIAL_SPONSORS);
    setLocal(STORAGE_KEYS.SPONSORS, list.filter((s) => s.id !== id));
    return true;
  },

  // ==========================================
  // HACKATHON SETTINGS
  // ==========================================
  async getHackathonSettings(): Promise<HackathonSettings> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('hackathon_settings')
        .select('*')
        .limit(1)
        .maybeSingle();
      if (!error && data) return data as HackathonSettings;
    }
    return getLocal<HackathonSettings>(STORAGE_KEYS.HACKATHON, INITIAL_HACKATHON_SETTINGS);
  },

  async updateHackathonSettings(settings: Partial<HackathonSettings>): Promise<HackathonSettings> {
    const current = await this.getHackathonSettings();
    const updated: HackathonSettings = {
      ...current,
      ...settings,
      updated_at: new Date().toISOString()
    };

    if (isSupabaseConfigured && supabase) {
      const { id, ...dataToSave } = updated;
      if (id) {
        await supabase.from('hackathon_settings').update(dataToSave).eq('id', id);
      } else {
        await supabase.from('hackathon_settings').upsert(dataToSave);
      }
    }

    setLocal(STORAGE_KEYS.HACKATHON, updated);
    return updated;
  },

  // ==========================================
  // CLUB SETTINGS
  // ==========================================
  async getClubSettings(): Promise<ClubSettings> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('club_settings')
        .select('*')
        .limit(1)
        .maybeSingle();
      if (!error && data) return data as ClubSettings;
    }
    return getLocal<ClubSettings>(STORAGE_KEYS.SETTINGS, INITIAL_CLUB_SETTINGS);
  },

  async updateClubSettings(settings: Partial<ClubSettings>): Promise<ClubSettings> {
    const current = await this.getClubSettings();
    const updated: ClubSettings = {
      ...current,
      ...settings,
      updated_at: new Date().toISOString()
    };

    if (isSupabaseConfigured && supabase) {
      const { id, ...dataToSave } = updated;
      if (id) {
        await supabase.from('club_settings').update(dataToSave).eq('id', id);
      } else {
        await supabase.from('club_settings').upsert(dataToSave);
      }
    }

    setLocal(STORAGE_KEYS.SETTINGS, updated);
    return updated;
  },

  // ==========================================
  // CONTACT SUBMISSIONS
  // ==========================================
  async submitContactInquiry(inquiry: {
    name: string;
    email: string;
    programme?: string;
    subject: string;
    message: string;
  }): Promise<{ success: boolean; message: string }> {
    const record = {
      id: `inq-${Date.now()}`,
      ...inquiry,
      created_at: new Date().toISOString()
    };

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('contact_inquiries').insert([inquiry]);
      if (error) {
        console.error('Supabase contact submission error:', error);
      }
    }

    const current = getLocal<any[]>(STORAGE_KEYS.CONTACTS, []);
    current.unshift(record);
    setLocal(STORAGE_KEYS.CONTACTS, current);

    return {
      success: true,
      message: 'Thank you for reaching out! Your message has been received by the i-CATS Invention & Innovation Club committee.'
    };
  }
};
