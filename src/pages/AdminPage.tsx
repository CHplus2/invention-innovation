import React, { useState, useEffect } from 'react';
import {
  Shield,
  LogOut,
  Calendar,
  Layers,
  Users,
  Award,
  Trophy,
  Settings,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  ExternalLink,
  AlertCircle,
  Database,
  Lock,
  RefreshCw,
  Save
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { clubService } from '../services/clubService';
import {
  EventItem,
  ProjectItem,
  CommitteeMember,
  SponsorItem,
  HackathonSettings,
  ClubSettings
} from '../types';

export const AdminPage: React.FC = () => {
  const { user, isAdmin, isLoading, isSupabaseConfigured, signInWithPassword, signOut, loginAsDevAdmin } = useAuth();

  const [activeTab, setActiveTab] = useState<'events' | 'projects' | 'committee' | 'sponsors' | 'hackathon' | 'settings'>('events');

  // Auth form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);

  // Data states
  const [events, setEvents] = useState<EventItem[]>([]);
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [committee, setCommittee] = useState<CommitteeMember[]>([]);
  const [sponsors, setSponsors] = useState<SponsorItem[]>([]);
  const [hackathon, setHackathon] = useState<HackathonSettings | null>(null);
  const [settings, setSettings] = useState<ClubSettings | null>(null);

  // Form modal states
  const [editingEvent, setEditingEvent] = useState<Partial<EventItem> | null>(null);
  const [editingProject, setEditingProject] = useState<Partial<ProjectItem> | null>(null);
  const [editingCommittee, setEditingCommittee] = useState<Partial<CommitteeMember> | null>(null);
  const [editingSponsor, setEditingSponsor] = useState<Partial<SponsorItem> | null>(null);

  // Save feedback state
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setFeedbackMessage(msg);
    setTimeout(() => setFeedbackMessage(null), 3500);
  };

  const loadAllData = async () => {
    try {
      const [evts, projs, comm, spons, hack, sett] = await Promise.all([
        clubService.getEvents(),
        clubService.getProjects(),
        clubService.getCommittee(),
        clubService.getSponsors(),
        clubService.getHackathonSettings(),
        clubService.getClubSettings()
      ]);
      setEvents(evts);
      setProjects(projs);
      setCommittee(comm);
      setSponsors(spons);
      setHackathon(hack);
      setSettings(sett);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      loadAllData();
    }
  }, [isAdmin]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError(null);
    const { error } = await signInWithPassword(email, password);
    if (error) {
      setAuthError(error.message);
    }
    setAuthLoading(false);
  };

  // Event handlers
  const handleSaveEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEvent?.title) return;
    await clubService.saveEvent(editingEvent as any);
    setEditingEvent(null);
    await loadAllData();
    showToast('Event saved successfully!');
  };

  const handleDeleteEvent = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      await clubService.deleteEvent(id);
      await loadAllData();
      showToast('Event deleted.');
    }
  };

  // Project handlers
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject?.title) return;
    await clubService.saveProject(editingProject as any);
    setEditingProject(null);
    await loadAllData();
    showToast('Project saved successfully!');
  };

  const handleDeleteProject = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      await clubService.deleteProject(id);
      await loadAllData();
      showToast('Project deleted.');
    }
  };

  // Committee handlers
  const handleSaveCommittee = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCommittee?.name) return;
    await clubService.saveCommitteeMember(editingCommittee as any);
    setEditingCommittee(null);
    await loadAllData();
    showToast('Committee member updated!');
  };

  const handleDeleteCommittee = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this committee member?')) {
      await clubService.deleteCommitteeMember(id);
      await loadAllData();
      showToast('Member removed.');
    }
  };

  // Sponsor handlers
  const handleSaveSponsor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSponsor?.name) return;
    await clubService.saveSponsor(editingSponsor as any);
    setEditingSponsor(null);
    await loadAllData();
    showToast('Sponsor saved!');
  };

  const handleDeleteSponsor = async (id: string) => {
    if (window.confirm('Delete this sponsor?')) {
      await clubService.deleteSponsor(id);
      await loadAllData();
      showToast('Sponsor removed.');
    }
  };

  // Hackathon update
  const handleSaveHackathon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hackathon) return;
    await clubService.updateHackathonSettings(hackathon);
    showToast('Hackathon settings updated successfully!');
  };

  // Club Settings update
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    await clubService.updateClubSettings(settings);
    showToast('Club settings updated successfully!');
  };

  if (isLoading) {
    return <div className="py-20 text-center text-slate-400">Verifying session...</div>;
  }

  // ===========================================================================
  // NOT LOGGED IN VIEW
  // ===========================================================================
  if (!isAdmin) {
    return (
      <div className="max-w-md mx-auto px-4 py-16">
        <div className="bg-[#0B1528] rounded-2xl p-8 border border-slate-800 space-y-6 shadow-2xl">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mx-auto">
              <Shield className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Club Admin Portal
            </h1>
            <p className="text-xs text-slate-400">
              Authorized committee access for content management & updates.
            </p>
          </div>

          {authError && (
            <div className="p-3 bg-red-950/50 border border-red-800 rounded-lg text-xs text-red-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Admin Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@icats.edu.my"
                className="w-full px-4 py-2.5 bg-[#070F1E] border border-slate-700/80 rounded-lg text-sm text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 bg-[#070F1E] border border-slate-700/80 rounded-lg text-sm text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-3 text-xs font-semibold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors font-medium"
            >
              {authLoading ? 'Signing In...' : 'Sign In as Administrator'}
            </button>
          </form>

          {/* Quick Dev/Demo Admin Access Button */}
          <div className="pt-4 border-t border-slate-800 text-center space-y-2">
            <p className="text-[11px] text-slate-500">
              {isSupabaseConfigured
                ? 'Supabase backend connected via environment variables.'
                : 'Supabase credentials not detected yet. Instant dev-admin mode enabled.'}
            </p>
            <button
              type="button"
              onClick={loginAsDevAdmin}
              className="text-xs text-amber-400 hover:text-amber-300 underline font-medium"
            >
              Sign In with Quick Committee Access
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ===========================================================================
  // AUTHENTICATED ADMIN DASHBOARD
  // ===========================================================================
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Toast feedback */}
      {feedbackMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-500 text-slate-950 px-5 py-3 rounded-xl font-semibold text-xs shadow-2xl flex items-center gap-2 animate-bounce">
          <Check className="w-4 h-4" />
          <span>{feedbackMessage}</span>
        </div>
      )}

      {/* Admin Top bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#0B1528] rounded-2xl p-6 border border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-amber-400" />
            <h1 className="text-xl font-bold text-white">
              Club Administration Dashboard
            </h1>
          </div>
          <p className="text-xs text-slate-400">
            Logged in as: <strong className="text-slate-200">{(user as any)?.email || 'Administrator'}</strong>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadAllData}
            className="p-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 rounded-lg flex items-center gap-1.5"
            title="Refresh Data"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </button>
          <button
            onClick={signOut}
            className="px-4 py-2 text-xs font-semibold text-red-400 hover:text-red-300 bg-red-950/40 hover:bg-red-900/50 border border-red-800/60 rounded-lg flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800">
        <button
          onClick={() => setActiveTab('events')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'events'
              ? 'bg-amber-400 text-slate-950'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Events ({events.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('projects')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'projects'
              ? 'bg-amber-400 text-slate-950'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Projects ({projects.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('committee')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'committee'
              ? 'bg-amber-400 text-slate-950'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Committee ({committee.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('sponsors')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'sponsors'
              ? 'bg-amber-400 text-slate-950'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Sponsors ({sponsors.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('hackathon')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'hackathon'
              ? 'bg-amber-400 text-slate-950'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Trophy className="w-4 h-4" />
          <span>Hackathon Portal</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'settings'
              ? 'bg-amber-400 text-slate-950'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Club Settings</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB: EVENTS */}
      {/* ========================================================================= */}
      {activeTab === 'events' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Manage Activities & Events</h2>
            <button
              onClick={() =>
                setEditingEvent({
                  title: '',
                  short_description: '',
                  full_description: '',
                  event_type: 'Workshop',
                  start_date: new Date().toISOString().split('T')[0],
                  start_time: '14:00',
                  end_time: '17:00',
                  location: 'i-CATS Innovation Lab',
                  status: 'upcoming',
                  featured: false
                })
              }
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Event</span>
            </button>
          </div>

          <div className="bg-[#0B1528] rounded-xl border border-slate-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-[#070F1E] text-slate-400 uppercase tracking-wider border-b border-slate-800 font-medium">
                  <tr>
                    <th className="p-4">Title</th>
                    <th className="p-4">Type</th>
                    <th className="p-4">Date & Time</th>
                    <th className="p-4">Location</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {events.map((evt) => (
                    <tr key={evt.id} className="hover:bg-slate-900/40">
                      <td className="p-4 font-semibold text-white max-w-xs truncate">
                        {evt.title}
                      </td>
                      <td className="p-4 text-amber-400">{evt.event_type}</td>
                      <td className="p-4 font-mono">{evt.start_date} {evt.start_time}</td>
                      <td className="p-4 truncate max-w-[150px]">{evt.location}</td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-slate-800 text-slate-300">
                          {evt.status}
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => setEditingEvent(evt)}
                          className="p-1.5 text-slate-400 hover:text-amber-400 hover:bg-slate-800 rounded"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteEvent(evt.id)}
                          className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB: PROJECTS */}
      {/* ========================================================================= */}
      {activeTab === 'projects' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Manage Student Innovation Projects</h2>
            <button
              onClick={() =>
                setEditingProject({
                  title: '',
                  summary: '',
                  description: '',
                  category: 'Technology',
                  team_name: '',
                  team_members: ['Student Innovator'],
                  year: new Date().getFullYear(),
                  featured: true
                })
              }
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Project</span>
            </button>
          </div>

          <div className="bg-[#0B1528] rounded-xl border border-slate-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-[#070F1E] text-slate-400 uppercase tracking-wider border-b border-slate-800 font-medium">
                  <tr>
                    <th className="p-4">Project Title</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Team</th>
                    <th className="p-4">Year</th>
                    <th className="p-4">Featured</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {projects.map((proj) => (
                    <tr key={proj.id} className="hover:bg-slate-900/40">
                      <td className="p-4 font-semibold text-white max-w-xs truncate">
                        {proj.title}
                      </td>
                      <td className="p-4 text-amber-400">{proj.category}</td>
                      <td className="p-4">{proj.team_name}</td>
                      <td className="p-4 font-mono">{proj.year}</td>
                      <td className="p-4">{proj.featured ? 'Yes' : 'No'}</td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => setEditingProject(proj)}
                          className="p-1.5 text-slate-400 hover:text-amber-400 hover:bg-slate-800 rounded"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(proj.id)}
                          className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB: COMMITTEE */}
      {/* ========================================================================= */}
      {activeTab === 'committee' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Manage Committee Board</h2>
            <button
              onClick={() =>
                setEditingCommittee({
                  name: '',
                  role: '',
                  programme: '',
                  display_order: committee.length + 1
                })
              }
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg"
            >
              <Plus className="w-4 h-4" />
              <span>Add Member</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {committee.map((mem) => (
              <div key={mem.id} className="bg-[#0B1528] rounded-xl p-5 border border-slate-800 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[11px] font-semibold text-amber-400 block">{mem.role}</span>
                    <h3 className="text-sm font-bold text-white">{mem.name}</h3>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setEditingCommittee(mem)}
                      className="p-1 text-slate-400 hover:text-amber-400"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteCommittee(mem.id)}
                      className="p-1 text-slate-400 hover:text-red-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <p className="text-xs text-slate-400">{mem.programme}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB: SPONSORS */}
      {/* ========================================================================= */}
      {activeTab === 'sponsors' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Manage Industry Partners & Sponsors</h2>
            <button
              onClick={() =>
                setEditingSponsor({
                  name: '',
                  sponsorship_tier: 'Gold',
                  display_order: sponsors.length + 1
                })
              }
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg"
            >
              <Plus className="w-4 h-4" />
              <span>Add Partner</span>
            </button>
          </div>

          {sponsors.length === 0 ? (
            <div className="p-8 bg-[#0B1528] rounded-xl border border-slate-800 text-center text-xs text-slate-400 space-y-2">
              <p>No confirmed sponsor companies yet. (Respecting rule against fabricated sponsors).</p>
              <p>Use the button above when official partners are confirmed.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {sponsors.map((sp) => (
                <div key={sp.id} className="bg-[#0B1528] rounded-xl p-5 border border-slate-800 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[11px] font-semibold text-amber-400">{sp.sponsorship_tier}</span>
                      <h3 className="text-sm font-bold text-white">{sp.name}</h3>
                    </div>
                    <div className="flex items-center gap-1">
                      <button onClick={() => setEditingSponsor(sp)} className="p-1 text-slate-400 hover:text-amber-400">
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => handleDeleteSponsor(sp.id)} className="p-1 text-slate-400 hover:text-red-400">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  {sp.description && <p className="text-xs text-slate-400">{sp.description}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB: HACKATHON CONFIG */}
      {/* ========================================================================= */}
      {activeTab === 'hackathon' && hackathon && (
        <form onSubmit={handleSaveHackathon} className="bg-[#0B1528] rounded-2xl p-8 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white">Hackathon Portal Configuration</h2>
              <p className="text-xs text-slate-400">Update the proposed initiative details as the event progresses towards official approval.</p>
            </div>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg"
            >
              <Save className="w-4 h-4" />
              <span>Save Hackathon Info</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Event Title</label>
              <input
                type="text"
                value={hackathon.title}
                onChange={(e) => setHackathon({ ...hackathon, title: e.target.value })}
                className="w-full px-4 py-2 bg-[#070F1E] border border-slate-700 rounded-lg text-sm text-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Status Label</label>
              <input
                type="text"
                value={hackathon.status_label}
                onChange={(e) => setHackathon({ ...hackathon, status_label: e.target.value })}
                className="w-full px-4 py-2 bg-[#070F1E] border border-slate-700 rounded-lg text-sm text-white"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Tagline / Theme</label>
            <input
              type="text"
              value={hackathon.tagline}
              onChange={(e) => setHackathon({ ...hackathon, tagline: e.target.value })}
              className="w-full px-4 py-2 bg-[#070F1E] border border-slate-700 rounded-lg text-sm text-white"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">About Description</label>
            <textarea
              rows={4}
              value={hackathon.about_description}
              onChange={(e) => setHackathon({ ...hackathon, about_description: e.target.value })}
              className="w-full px-4 py-2 bg-[#070F1E] border border-slate-700 rounded-lg text-sm text-white"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Prizes Note</label>
            <input
              type="text"
              value={hackathon.prizes_note}
              onChange={(e) => setHackathon({ ...hackathon, prizes_note: e.target.value })}
              className="w-full px-4 py-2 bg-[#070F1E] border border-slate-700 rounded-lg text-sm text-white"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Judges Note</label>
            <input
              type="text"
              value={hackathon.judges_note}
              onChange={(e) => setHackathon({ ...hackathon, judges_note: e.target.value })}
              className="w-full px-4 py-2 bg-[#070F1E] border border-slate-700 rounded-lg text-sm text-white"
            />
          </div>
        </form>
      )}

      {/* ========================================================================= */}
      {/* TAB: SETTINGS */}
      {/* ========================================================================= */}
      {activeTab === 'settings' && settings && (
        <form onSubmit={handleSaveSettings} className="bg-[#0B1528] rounded-2xl p-8 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white">Club Global Settings & Links</h2>
              <p className="text-xs text-slate-400">Configure public URLs for WhatsApp community and registration forms without code edits.</p>
            </div>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg"
            >
              <Save className="w-4 h-4" />
              <span>Save Settings</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Club Name</label>
              <input
                type="text"
                value={settings.club_name}
                onChange={(e) => setSettings({ ...settings, club_name: e.target.value })}
                className="w-full px-4 py-2 bg-[#070F1E] border border-slate-700 rounded-lg text-sm text-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Tagline</label>
              <input
                type="text"
                value={settings.tagline}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                className="w-full px-4 py-2 bg-[#070F1E] border border-slate-700 rounded-lg text-sm text-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Contact Email</label>
              <input
                type="email"
                value={settings.contact_email}
                onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
                className="w-full px-4 py-2 bg-[#070F1E] border border-slate-700 rounded-lg text-sm text-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Campus Location / Studio</label>
              <input
                type="text"
                value={settings.campus_location}
                onChange={(e) => setSettings({ ...settings, campus_location: e.target.value })}
                className="w-full px-4 py-2 bg-[#070F1E] border border-slate-700 rounded-lg text-sm text-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">WhatsApp Group Invite URL</label>
              <input
                type="url"
                placeholder="https://chat.whatsapp.com/..."
                value={settings.whatsapp_group_url || ''}
                onChange={(e) => setSettings({ ...settings, whatsapp_group_url: e.target.value })}
                className="w-full px-4 py-2 bg-[#070F1E] border border-slate-700 rounded-lg text-sm text-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">External Membership Form URL</label>
              <input
                type="url"
                placeholder="https://forms.google.com/..."
                value={settings.membership_form_url || ''}
                onChange={(e) => setSettings({ ...settings, membership_form_url: e.target.value })}
                className="w-full px-4 py-2 bg-[#070F1E] border border-slate-700 rounded-lg text-sm text-white"
              />
            </div>
          </div>
        </form>
      )}

      {/* ========================================================================= */}
      {/* MODAL: EDIT EVENT */}
      {/* ========================================================================= */}
      {editingEvent && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0B1528] rounded-2xl p-6 sm:p-8 max-w-2xl w-full border border-slate-700 max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">
                {editingEvent.id ? 'Edit Event' : 'Create New Event'}
              </h3>
              <button onClick={() => setEditingEvent(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEvent} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs text-slate-300 font-medium">Event Title</label>
                <input
                  type="text"
                  required
                  value={editingEvent.title || ''}
                  onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
                  className="w-full px-3 py-2 bg-[#070F1E] border border-slate-700 rounded-lg text-sm text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-slate-300 font-medium">Event Type</label>
                  <select
                    value={editingEvent.event_type || 'Workshop'}
                    onChange={(e) => setEditingEvent({ ...editingEvent, event_type: e.target.value as any })}
                    className="w-full px-3 py-2 bg-[#070F1E] border border-slate-700 rounded-lg text-sm text-white"
                  >
                    <option value="Workshop">Workshop</option>
                    <option value="Competition">Competition</option>
                    <option value="Hackathon">Hackathon</option>
                    <option value="Sharing Session">Sharing Session</option>
                    <option value="Innovation Challenge">Innovation Challenge</option>
                    <option value="Networking">Networking</option>
                    <option value="Club Session">Club Session</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-slate-300 font-medium">Status</label>
                  <select
                    value={editingEvent.status || 'upcoming'}
                    onChange={(e) => setEditingEvent({ ...editingEvent, status: e.target.value as any })}
                    className="w-full px-3 py-2 bg-[#070F1E] border border-slate-700 rounded-lg text-sm text-white"
                  >
                    <option value="upcoming">Upcoming</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-slate-300 font-medium">Date</label>
                  <input
                    type="date"
                    required
                    value={editingEvent.start_date || ''}
                    onChange={(e) => setEditingEvent({ ...editingEvent, start_date: e.target.value })}
                    className="w-full px-3 py-2 bg-[#070F1E] border border-slate-700 rounded-lg text-sm text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-slate-300 font-medium">Start Time</label>
                  <input
                    type="text"
                    placeholder="14:00"
                    value={editingEvent.start_time || ''}
                    onChange={(e) => setEditingEvent({ ...editingEvent, start_time: e.target.value })}
                    className="w-full px-3 py-2 bg-[#070F1E] border border-slate-700 rounded-lg text-sm text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-slate-300 font-medium">End Time</label>
                  <input
                    type="text"
                    placeholder="17:00"
                    value={editingEvent.end_time || ''}
                    onChange={(e) => setEditingEvent({ ...editingEvent, end_time: e.target.value })}
                    className="w-full px-3 py-2 bg-[#070F1E] border border-slate-700 rounded-lg text-sm text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-300 font-medium">Location</label>
                <input
                  type="text"
                  required
                  value={editingEvent.location || ''}
                  onChange={(e) => setEditingEvent({ ...editingEvent, location: e.target.value })}
                  className="w-full px-3 py-2 bg-[#070F1E] border border-slate-700 rounded-lg text-sm text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-300 font-medium">Short Summary</label>
                <input
                  type="text"
                  required
                  value={editingEvent.short_description || ''}
                  onChange={(e) => setEditingEvent({ ...editingEvent, short_description: e.target.value })}
                  className="w-full px-3 py-2 bg-[#070F1E] border border-slate-700 rounded-lg text-sm text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-300 font-medium">Full Description</label>
                <textarea
                  rows={4}
                  required
                  value={editingEvent.full_description || ''}
                  onChange={(e) => setEditingEvent({ ...editingEvent, full_description: e.target.value })}
                  className="w-full px-3 py-2 bg-[#070F1E] border border-slate-700 rounded-lg text-sm text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-300 font-medium">Registration Link (Optional)</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={editingEvent.registration_url || ''}
                  onChange={(e) => setEditingEvent({ ...editingEvent, registration_url: e.target.value })}
                  className="w-full px-3 py-2 bg-[#070F1E] border border-slate-700 rounded-lg text-sm text-white"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingEvent(null)}
                  className="px-4 py-2 text-xs text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 text-xs font-semibold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg"
                >
                  Save Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: EDIT PROJECT */}
      {/* ========================================================================= */}
      {editingProject && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0B1528] rounded-2xl p-6 sm:p-8 max-w-2xl w-full border border-slate-700 max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">
                {editingProject.id ? 'Edit Showcase Project' : 'Create Showcase Project'}
              </h3>
              <button onClick={() => setEditingProject(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs text-slate-300 font-medium">Project Title</label>
                <input
                  type="text"
                  required
                  value={editingProject.title || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                  className="w-full px-3 py-2 bg-[#070F1E] border border-slate-700 rounded-lg text-sm text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-slate-300 font-medium">Discipline Category</label>
                  <select
                    value={editingProject.category || 'Technology'}
                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value as any })}
                    className="w-full px-3 py-2 bg-[#070F1E] border border-slate-700 rounded-lg text-sm text-white"
                  >
                    <option value="Technology">Technology</option>
                    <option value="Business">Business</option>
                    <option value="Sustainability">Sustainability</option>
                    <option value="Creative">Creative</option>
                    <option value="Education">Education</option>
                    <option value="Social Innovation">Social Innovation</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-slate-300 font-medium">Year</label>
                  <input
                    type="number"
                    value={editingProject.year || 2026}
                    onChange={(e) => setEditingProject({ ...editingProject, year: parseInt(e.target.value) || 2026 })}
                    className="w-full px-3 py-2 bg-[#070F1E] border border-slate-700 rounded-lg text-sm text-white font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-300 font-medium">Team Name</label>
                <input
                  type="text"
                  required
                  value={editingProject.team_name || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, team_name: e.target.value })}
                  className="w-full px-3 py-2 bg-[#070F1E] border border-slate-700 rounded-lg text-sm text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-300 font-medium">Disciplines / Team Members (comma-separated)</label>
                <input
                  type="text"
                  placeholder="Software Engineering, Business Marketing, UI/UX Design"
                  value={(editingProject.team_members || []).join(', ')}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      team_members: e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                    })
                  }
                  className="w-full px-3 py-2 bg-[#070F1E] border border-slate-700 rounded-lg text-sm text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-300 font-medium">Summary Abstract</label>
                <textarea
                  rows={2}
                  required
                  value={editingProject.summary || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, summary: e.target.value })}
                  className="w-full px-3 py-2 bg-[#070F1E] border border-slate-700 rounded-lg text-sm text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-300 font-medium">Detailed Description</label>
                <textarea
                  rows={4}
                  required
                  value={editingProject.description || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  className="w-full px-3 py-2 bg-[#070F1E] border border-slate-700 rounded-lg text-sm text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-slate-300 font-medium">Demo / Presentation URL</label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={editingProject.demo_url || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, demo_url: e.target.value })}
                    className="w-full px-3 py-2 bg-[#070F1E] border border-slate-700 rounded-lg text-sm text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-slate-300 font-medium">Code / CAD Repo URL</label>
                  <input
                    type="url"
                    placeholder="https://github.com/..."
                    value={editingProject.repository_url || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, repository_url: e.target.value })}
                    className="w-full px-3 py-2 bg-[#070F1E] border border-slate-700 rounded-lg text-sm text-white"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured-proj"
                  checked={Boolean(editingProject.featured)}
                  onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                  className="w-4 h-4 rounded text-amber-500"
                />
                <label htmlFor="featured-proj" className="text-xs text-slate-300 font-medium">
                  Feature on Homepage
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="px-4 py-2 text-xs text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 text-xs font-semibold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: EDIT COMMITTEE */}
      {/* ========================================================================= */}
      {editingCommittee && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0B1528] rounded-2xl p-6 sm:p-8 max-w-lg w-full border border-slate-700 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">
                {editingCommittee.id ? 'Edit Committee Member' : 'Add Committee Member'}
              </h3>
              <button onClick={() => setEditingCommittee(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCommittee} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs text-slate-300 font-medium">Name</label>
                <input
                  type="text"
                  required
                  value={editingCommittee.name || ''}
                  onChange={(e) => setEditingCommittee({ ...editingCommittee, name: e.target.value })}
                  className="w-full px-3 py-2 bg-[#070F1E] border border-slate-700 rounded-lg text-sm text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-300 font-medium">Role / Position</label>
                <input
                  type="text"
                  required
                  value={editingCommittee.role || ''}
                  onChange={(e) => setEditingCommittee({ ...editingCommittee, role: e.target.value })}
                  placeholder="e.g. President, Director of Prototyping"
                  className="w-full px-3 py-2 bg-[#070F1E] border border-slate-700 rounded-lg text-sm text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-300 font-medium">Academic Programme</label>
                <input
                  type="text"
                  required
                  value={editingCommittee.programme || ''}
                  onChange={(e) => setEditingCommittee({ ...editingCommittee, programme: e.target.value })}
                  placeholder="e.g. Faculty of Computing"
                  className="w-full px-3 py-2 bg-[#070F1E] border border-slate-700 rounded-lg text-sm text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-300 font-medium">LinkedIn URL (Optional)</label>
                <input
                  type="url"
                  placeholder="https://linkedin.com/in/..."
                  value={editingCommittee.linkedin_url || ''}
                  onChange={(e) => setEditingCommittee({ ...editingCommittee, linkedin_url: e.target.value })}
                  className="w-full px-3 py-2 bg-[#070F1E] border border-slate-700 rounded-lg text-sm text-white"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingCommittee(null)}
                  className="px-4 py-2 text-xs text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 text-xs font-semibold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg"
                >
                  Save Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: EDIT SPONSOR */}
      {/* ========================================================================= */}
      {editingSponsor && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0B1528] rounded-2xl p-6 sm:p-8 max-w-lg w-full border border-slate-700 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">
                {editingSponsor.id ? 'Edit Partner / Sponsor' : 'Add Partner / Sponsor'}
              </h3>
              <button onClick={() => setEditingSponsor(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSponsor} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs text-slate-300 font-medium">Partner Name</label>
                <input
                  type="text"
                  required
                  value={editingSponsor.name || ''}
                  onChange={(e) => setEditingSponsor({ ...editingSponsor, name: e.target.value })}
                  className="w-full px-3 py-2 bg-[#070F1E] border border-slate-700 rounded-lg text-sm text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-300 font-medium">Sponsorship Tier</label>
                <select
                  value={editingSponsor.sponsorship_tier || 'Gold'}
                  onChange={(e) => setEditingSponsor({ ...editingSponsor, sponsorship_tier: e.target.value as any })}
                  className="w-full px-3 py-2 bg-[#070F1E] border border-slate-700 rounded-lg text-sm text-white"
                >
                  <option value="Title Partner">Title Partner</option>
                  <option value="Gold">Gold</option>
                  <option value="Silver">Silver</option>
                  <option value="Supporting Partner">Supporting Partner</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-300 font-medium">Website URL (Optional)</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={editingSponsor.website_url || ''}
                  onChange={(e) => setEditingSponsor({ ...editingSponsor, website_url: e.target.value })}
                  className="w-full px-3 py-2 bg-[#070F1E] border border-slate-700 rounded-lg text-sm text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-300 font-medium">Description (Optional)</label>
                <input
                  type="text"
                  value={editingSponsor.description || ''}
                  onChange={(e) => setEditingSponsor({ ...editingSponsor, description: e.target.value })}
                  className="w-full px-3 py-2 bg-[#070F1E] border border-slate-700 rounded-lg text-sm text-white"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingSponsor(null)}
                  className="px-4 py-2 text-xs text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 text-xs font-semibold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg"
                >
                  Save Partner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
