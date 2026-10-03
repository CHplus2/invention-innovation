import React, { useEffect, useState } from 'react';
import { Mail, MapPin, Globe, Send, CheckCircle2, MessageCircle, Clock, HeartHandshake } from 'lucide-react';
import { clubService } from '../services/clubService';
import { ClubSettings } from '../types';

export const ContactPage: React.FC = () => {
  const [settings, setSettings] = useState<ClubSettings | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    programme: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function loadSettings() {
      try {
        const data = await clubService.getClubSettings();
        setSettings(data);
      } catch (err) {
        console.error('Error loading settings:', err);
      }
    }
    loadSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await clubService.submitContactInquiry(formData);
      setSubmitted(true);
    } catch (err) {
      console.error('Submission error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">
          Get in Touch
        </p>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Contact the Club
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Have questions about joining, proposing an inter-faculty collaboration, inviting us to an event, or partnering as an industry mentor? Reach out to the student committee.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Col: Contact Information */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-[#0B1528] rounded-2xl p-7 border border-slate-800 space-y-6">
            <h2 className="text-lg font-bold text-white tracking-tight">
              Club Contact Information
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-slate-300">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">Official Email</span>
                  <a
                    href={`mailto:${settings?.contact_email || 'innovation.club@icats.edu.my'}`}
                    className="font-semibold text-white hover:text-amber-400 transition-colors"
                  >
                    {settings?.contact_email || 'innovation.club@icats.edu.my'}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">Campus Studio</span>
                  <p className="text-white mt-0.5">
                    {settings?.campus_location || 'Student Innovation Studio, Level 3, i-CATS University Campus'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">General Meeting Hours</span>
                  <p className="text-white mt-0.5">
                    Wednesday & Friday afternoons (during active academic semester)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Globe className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">University</span>
                  <p className="text-white mt-0.5">{settings?.university_name || 'i-CATS University'}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#0B1528] rounded-2xl p-7 border border-amber-500/20 space-y-3">
            <div className="flex items-center gap-2 text-amber-400">
              <HeartHandshake className="w-5 h-5" />
              <h3 className="text-base font-bold text-white">Sponsorship & Industry Mentors</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Companies and alumni who want to propose challenge statements, provide workshop mentorship, or support student prototypes can select "Partnership / Sponsorship" as the subject.
            </p>
          </div>

        </div>

        {/* Right Col: Interactive Inquiry Form */}
        <div className="lg:col-span-7">
          <div className="bg-[#0B1528] rounded-2xl p-8 sm:p-10 border border-slate-800 space-y-6">
            <h2 className="text-xl font-bold text-white tracking-tight">
              Send an Inquiry or Message
            </h2>

            {submitted ? (
              <div className="p-8 rounded-xl bg-emerald-950/40 border border-emerald-800 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="text-lg font-bold text-white">Message Sent Successfully!</h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                  Thank you for contacting the i-CATS Invention & Innovation Club. A committee member will reply to your email shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', programme: '', subject: '', message: '' });
                  }}
                  className="mt-4 px-4 py-2 text-xs font-semibold text-emerald-400 bg-emerald-900/50 hover:bg-emerald-900 rounded-lg"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">
                      Your Name <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Sarah Lee"
                      className="w-full px-4 py-2.5 bg-[#070F1E] border border-slate-700/80 rounded-lg text-sm text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">
                      Email Address <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. sarah@example.com"
                      className="w-full px-4 py-2.5 bg-[#070F1E] border border-slate-700/80 rounded-lg text-sm text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300">
                    Faculty / Organization (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.programme}
                    onChange={(e) => setFormData({ ...formData, programme: e.target.value })}
                    placeholder="e.g. Faculty of Business / External Partner"
                    className="w-full px-4 py-2.5 bg-[#070F1E] border border-slate-700/80 rounded-lg text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300">
                    Subject / Topic <span className="text-amber-400">*</span>
                  </label>
                  <select
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#070F1E] border border-slate-700/80 rounded-lg text-sm text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="">Select an inquiry category</option>
                    <option value="Club Membership Inquiry">Club Membership Inquiry</option>
                    <option value="Activity or Workshop Question">Activity or Workshop Question</option>
                    <option value="Hackathon Collaboration">Hackathon Collaboration</option>
                    <option value="Partnership / Sponsorship">Partnership / Sponsorship</option>
                    <option value="Student Project Showcase Submission">Student Project Showcase Submission</option>
                    <option value="Other General Inquiry">Other General Inquiry</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300">
                    Message <span className="text-amber-400">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your inquiry, proposed idea, or questions..."
                    className="w-full px-4 py-2.5 bg-[#070F1E] border border-slate-700/80 rounded-lg text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 rounded-lg shadow transition-colors"
                  >
                    {submitting ? 'Sending Message...' : 'Send Message'}
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
