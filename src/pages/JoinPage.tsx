import React, { useEffect, useState } from 'react';
import {
  CheckCircle2,
  Users,
  Lightbulb,
  Trophy,
  ArrowRight,
  ExternalLink,
  MessageCircle,
  FileCheck,
  Sparkles,
  HelpCircle,
  Send
} from 'lucide-react';
import { clubService } from '../services/clubService';
import { ClubSettings } from '../types';

export const JoinPage: React.FC = () => {
  const [settings, setSettings] = useState<ClubSettings | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    studentId: '',
    email: '',
    phone: '',
    facultyProgramme: '',
    yearOfStudy: 'Year 1',
    interests: [] as string[],
    motivation: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function loadSettings() {
      try {
        const data = await clubService.getClubSettings();
        setSettings(data);
      } catch (err) {
        console.error('Failed to load club settings:', err);
      }
    }
    loadSettings();
  }, []);

  const interestOptions = [
    'Technology & Software',
    'Hardware & Embedded Systems',
    'Business & Entrepreneurship',
    'Creative & UI/UX Design',
    'Sustainability & Green Tech',
    'Social & Community Innovation',
    'Hackathon Competitions',
    'Event Organization & Media'
  ];

  const handleInterestToggle = (interest: string) => {
    if (formData.interests.includes(interest)) {
      setFormData({
        ...formData,
        interests: formData.interests.filter((i) => i !== interest)
      });
    } else {
      setFormData({
        ...formData,
        interests: [...formData.interests, interest]
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await clubService.submitContactInquiry({
        name: formData.fullName,
        email: formData.email,
        programme: `${formData.facultyProgramme} (${formData.yearOfStudy})`,
        subject: `New Member Application: ${formData.fullName} - ${formData.studentId}`,
        message: `Student ID: ${formData.studentId}\nPhone: ${formData.phone}\nInterests: ${formData.interests.join(', ')}\nMotivation: ${formData.motivation}`
      });
      setSubmitted(true);
    } catch (err) {
      console.error('Submission error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Hero / Header */}
      <div className="max-w-3xl space-y-5">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
          <span>Student Membership</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Join the i-CATS Invention & Innovation Club
        </h1>
        <p className="text-lg text-amber-300 font-medium">
          "You don't need an existing invention or previous experience."
        </p>
        <p className="text-base text-slate-300 leading-relaxed">
          Students from ALL programmes and faculties are welcome. Whether you study Business, Computing, Design, Engineering, Media, or Sciences, your perspective is valuable to our team projects.
        </p>
      </div>

      {/* Quick Direct Actions (WhatsApp & External Form if configured) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* WhatsApp Community */}
        <div className="bg-[#0B1528] rounded-2xl p-7 border border-slate-800 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <MessageCircle className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Join the WhatsApp Community</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Connect directly with club members, get instant workshop notifications, and join project ideation chats.
            </p>
          </div>

          {settings?.whatsapp_group_url ? (
            <a
              href={settings.whatsapp_group_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors"
            >
              <span>Join WhatsApp Group</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          ) : (
            <div className="p-3 bg-slate-900/60 rounded-lg text-xs text-slate-400">
              WhatsApp group link is currently being refreshed for the new semester. Use the registration form below to receive the invite link directly.
            </div>
          )}
        </div>

        {/* Official Google / University Registration Form */}
        <div className="bg-[#0B1528] rounded-2xl p-7 border border-slate-800 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <FileCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Official Membership Form</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Register your official student details to be recorded in the active member directory and receive certificate eligibility.
            </p>
          </div>

          {settings?.membership_form_url ? (
            <a
              href={settings.membership_form_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors"
            >
              <span>Open Registration Form</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          ) : (
            <div className="p-3 bg-slate-900/60 rounded-lg text-xs text-slate-400">
              Direct web membership registration is active below. Submit your details directly through this page!
            </div>
          )}
        </div>

      </div>

      {/* Why Join (7 Key Pillars) */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white tracking-tight">
          What You Gain as a Club Member
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="p-5 bg-[#0B1528] rounded-xl border border-slate-800 space-y-2">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="text-amber-400 font-mono">01.</span>
              <span>Meet Students from Different Programmes</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Expand your network across faculties and discover teammates with skills different from your own.
            </p>
          </div>

          <div className="p-5 bg-[#0B1528] rounded-xl border border-slate-800 space-y-2">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="text-amber-400 font-mono">02.</span>
              <span>Develop Ideas from Scratch</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Learn how to validate ideas, frame real user problems, and move from concept sketches to testable prototypes.
            </p>
          </div>

          <div className="p-5 bg-[#0B1528] rounded-xl border border-slate-800 space-y-2">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="text-amber-400 font-mono">03.</span>
              <span>Collaborate on Hands-On Projects</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Gain portfolio-ready project credentials solving realistic campus, community, and environmental problems.
            </p>
          </div>

          <div className="p-5 bg-[#0B1528] rounded-xl border border-slate-800 space-y-2">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="text-amber-400 font-mono">04.</span>
              <span>Participate in Competitions</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Get peer coaching and structured preparation for inter-university hackathons and innovation challenges.
            </p>
          </div>

          <div className="p-5 bg-[#0B1528] rounded-xl border border-slate-800 space-y-2">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="text-amber-400 font-mono">05.</span>
              <span>Learn Practical New Skills</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Join workshops on design thinking, pitching, business model canvases, UI/UX, and prototyping tools.
            </p>
          </div>

          <div className="p-5 bg-[#0B1528] rounded-xl border border-slate-800 space-y-2">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="text-amber-400 font-mono">06.</span>
              <span>Event & Committee Experience</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Volunteer for event sub-committees, manage media campaigns, and lead campus workshops.
            </p>
          </div>
        </div>
      </section>

      {/* Direct In-App Membership Application Form */}
      <section className="bg-[#0B1528] rounded-2xl p-8 sm:p-12 border border-slate-800 space-y-8">
        <div className="max-w-2xl space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">
            Online Registration
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Member Registration Form
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Fill out your details below to register your interest with the club committee.
          </p>
        </div>

        {submitted ? (
          <div className="p-8 rounded-xl bg-emerald-950/40 border border-emerald-800 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h3 className="text-xl font-bold text-white">Application Received!</h3>
            <p className="text-sm text-slate-300 max-w-lg mx-auto">
              Welcome to the i-CATS Invention & Innovation Club! The committee will review your submission and contact you via email/WhatsApp for upcoming session onboarding.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  fullName: '',
                  studentId: '',
                  email: '',
                  phone: '',
                  facultyProgramme: '',
                  yearOfStudy: 'Year 1',
                  interests: [],
                  motivation: ''
                });
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold text-emerald-400 bg-emerald-900/50 hover:bg-emerald-900 rounded-lg"
            >
              Submit Another Application
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">
                  Full Name <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Alex Tan"
                  className="w-full px-4 py-2.5 bg-[#070F1E] border border-slate-700/80 rounded-lg text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">
                  Student ID Number <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.studentId}
                  onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                  placeholder="e.g. IC20240012"
                  className="w-full px-4 py-2.5 bg-[#070F1E] border border-slate-700/80 rounded-lg text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">
                  Student Email Address <span className="text-amber-400">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. student@icats.edu.my"
                  className="w-full px-4 py-2.5 bg-[#070F1E] border border-slate-700/80 rounded-lg text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">
                  Contact / WhatsApp Number <span className="text-amber-400">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="e.g. +60 12-345 6789"
                  className="w-full px-4 py-2.5 bg-[#070F1E] border border-slate-700/80 rounded-lg text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">
                  Academic Programme / Faculty <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.facultyProgramme}
                  onChange={(e) => setFormData({ ...formData, facultyProgramme: e.target.value })}
                  placeholder="e.g. Diploma in Business Management, Bachelor of IT, etc."
                  className="w-full px-4 py-2.5 bg-[#070F1E] border border-slate-700/80 rounded-lg text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">
                  Current Year of Study
                </label>
                <select
                  value={formData.yearOfStudy}
                  onChange={(e) => setFormData({ ...formData, yearOfStudy: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#070F1E] border border-slate-700/80 rounded-lg text-sm text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="Foundation">Foundation</option>
                  <option value="Year 1">Year 1</option>
                  <option value="Year 2">Year 2</option>
                  <option value="Year 3">Year 3</option>
                  <option value="Year 4">Year 4</option>
                  <option value="Postgraduate">Postgraduate</option>
                </select>
              </div>
            </div>

            {/* Interest Areas Multi-select */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-medium text-slate-300">
                Areas You Are Interested in Exploring (Select any that apply)
              </label>
              <div className="flex flex-wrap gap-2">
                {interestOptions.map((opt) => (
                  <button
                    type="button"
                    key={opt}
                    onClick={() => handleInterestToggle(opt)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                      formData.interests.includes(opt)
                        ? 'bg-amber-400 text-slate-950 font-semibold'
                        : 'bg-[#070F1E] text-slate-300 border border-slate-700 hover:border-slate-500'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Motivation */}
            <div className="space-y-1.5 pt-2">
              <label className="text-xs font-medium text-slate-300">
                What would you like to achieve or learn through the club? (Optional)
              </label>
              <textarea
                rows={3}
                value={formData.motivation}
                onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                placeholder="e.g. I want to meet teammates to build an environmental project idea, or learn how to pitch solutions..."
                className="w-full px-4 py-2.5 bg-[#070F1E] border border-slate-700/80 rounded-lg text-sm text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 rounded-lg shadow transition-colors"
              >
                {submitting ? 'Submitting Application...' : 'Submit Membership Registration'}
                <Send className="w-4 h-4" />
              </button>
            </div>

          </form>
        )}
      </section>

    </div>
  );
};
