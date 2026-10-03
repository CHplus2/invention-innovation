import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Trophy,
  Sparkles,
  Calendar,
  Users,
  CheckCircle2,
  Clock,
  ArrowRight,
  HelpCircle,
  Award,
  Layers,
  FileText,
  Mail,
  HeartHandshake
} from 'lucide-react';
import { clubService } from '../services/clubService';
import { HackathonSettings, SponsorItem } from '../types';

export const HackathonPage: React.FC = () => {
  const [hackathon, setHackathon] = useState<HackathonSettings | null>(null);
  const [sponsors, setSponsors] = useState<SponsorItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [settings, spon] = await Promise.all([
          clubService.getHackathonSettings(),
          clubService.getSponsors()
        ]);
        setHackathon(settings);
        setSponsors(spon);
      } catch (err) {
        console.error('Error loading hackathon settings:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return <div className="py-20 text-center text-slate-400">Loading hackathon initiative details...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-20">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative bg-gradient-to-r from-[#0C1B36] via-[#09152B] to-[#0A1830] rounded-3xl p-8 sm:p-14 border border-slate-700/80 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-xs font-semibold text-amber-300">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>{hackathon?.status_label || 'Proposed Initiative (Planning & Proposal Stage)'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            {hackathon?.title || 'i-CATS Inter-Faculty Hackathon'}
          </h1>

          <p className="text-lg sm:text-xl font-medium text-amber-300/90">
            {hackathon?.tagline || 'Bridging ideas across faculties to create real-world solutions.'}
          </p>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            A proposed campus-wide innovation challenge where students from every faculty assemble cross-functional teams to build practical prototypes addressing real community and campus challenges.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
            {hackathon?.registration_url ? (
              <a
                href={hackathon.registration_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-lg transition-colors"
              >
                <span>Register Your Team</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            ) : (
              <Link
                to="/join"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-lg transition-colors"
              >
                <span>Join Club for Announcements</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}

            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 rounded-lg border border-slate-700 transition-colors"
            >
              <span>Partner as Mentor / Sponsor</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. ABOUT THE HACKATHON & HOW IT WORKS */}
      {/* ========================================================================= */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 space-y-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">
            Event Overview
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            About the Hackathon Initiative
          </h2>
          <div className="text-sm sm:text-base text-slate-300 leading-relaxed space-y-4 whitespace-pre-line">
            {hackathon?.about_description}
          </div>

          <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[#0B1528] border border-slate-800 space-y-1.5">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-amber-400" />
                <span>Interdisciplinary by Design</span>
              </h3>
              <p className="text-xs text-slate-400">
                Teams bring together business thinkers, designers, engineers, and domain researchers.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#0B1528] border border-slate-800 space-y-1.5">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-400" />
                <span>Tangible Prototype Sprints</span>
              </h3>
              <p className="text-xs text-slate-400">
                Emphasis on working low/high-fidelity prototypes alongside viable business models.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-2xl overflow-hidden border border-slate-700 bg-slate-900 aspect-[4/3] shadow-xl">
            <img
              src="/src/assets/images/hackathon_ideation_1790998749567.jpg"
              alt="Hackathon ideation whiteboard session"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. PROPOSED TIMELINE */}
      {/* ========================================================================= */}
      <section className="space-y-8">
        <div className="max-w-2xl space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">
            Roadmap & Sprints
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Proposed Event Timeline
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            The timeline below reflects the planned event structure subject to university calendar scheduling.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {hackathon?.proposed_timeline.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#0B1528] rounded-xl p-6 border border-slate-800 relative flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-amber-400">Phase 0{idx + 1}</span>
                  <span className="text-[11px] font-semibold text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded">
                    {item.date_or_status}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white">{item.phase}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. CHALLENGE THEMES */}
      {/* ========================================================================= */}
      <section className="space-y-8">
        <div className="max-w-2xl space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">
            Problem Focus Areas
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Proposed Challenge Themes
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Themes are designed to encourage multi-faculty problem solving rather than purely algorithmic coding.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {hackathon?.challenges.map((c, i) => (
            <div key={i} className="bg-[#0B1528] rounded-xl p-6 border border-slate-800 space-y-3">
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                {c.category}
              </span>
              <h3 className="text-base font-bold text-white">{c.title}</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{c.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. ELIGIBILITY & TEAM GUIDELINES */}
      {/* ========================================================================= */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div className="bg-[#0B1528] rounded-xl p-8 border border-slate-800 space-y-4">
          <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-amber-400" />
            <span>Eligibility Criteria</span>
          </h2>
          <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
            {hackathon?.eligibility_rules.map((rule, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="text-amber-400 font-bold">·</span>
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-[#0B1528] rounded-xl p-8 border border-slate-800 space-y-4">
          <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <Users className="w-5 h-5 text-amber-400" />
            <span>Team Formulation Guidelines</span>
          </h2>
          <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
            {hackathon?.team_guidelines.map((guide, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="text-amber-400 font-bold">·</span>
                <span>{guide}</span>
              </li>
            ))}
          </ul>
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 6. PRIZES, JUDGES & SPONSOR NOTICE */}
      {/* ========================================================================= */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div className="bg-[#0B1528] rounded-xl p-8 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-amber-400">
            <Award className="w-5 h-5" />
            <h3 className="text-base font-bold text-white">Prizes & Recognition</h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {hackathon?.prizes_note}
          </p>
        </div>

        <div className="bg-[#0B1528] rounded-xl p-8 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-amber-400">
            <Users className="w-5 h-5" />
            <h3 className="text-base font-bold text-white">Mentorship & Judges Panel</h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {hackathon?.judges_note}
          </p>
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 7. FREQUENTLY ASKED QUESTIONS */}
      {/* ========================================================================= */}
      <section className="space-y-8">
        <div className="max-w-2xl space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">
            Clarifications
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {hackathon?.faq_list.map((faq, idx) => (
            <div key={idx} className="bg-[#0B1528] rounded-xl p-6 border border-slate-800 space-y-2">
              <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{faq.question}</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-6">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. SPONSOR / PARTNER INQUIRY CTA */}
      {/* ========================================================================= */}
      <section className="bg-gradient-to-r from-[#0C1A35] to-[#081326] rounded-2xl p-8 sm:p-10 border border-amber-500/20 text-center space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-white">
          Interested in Sponsoring or Mentoring the Hackathon?
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          We welcome collaboration with industry mentors, alumni innovators, and organizations looking to present real-world challenge statements.
        </p>
        <div className="pt-2">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span>Submit Partner / Sponsor Inquiry</span>
          </Link>
        </div>
      </section>

    </div>
  );
};
