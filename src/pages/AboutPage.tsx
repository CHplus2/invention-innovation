import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Compass,
  Target,
  Eye,
  CheckCircle2,
  ArrowRight,
  Lightbulb,
  Cpu,
  Layers,
  HeartHandshake,
  Flame,
  Zap,
  ShieldCheck
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const values = [
    {
      name: 'Curiosity',
      desc: 'Asking "why", questioning standard assumptions, and exploring how things work beneath the surface.'
    },
    {
      name: 'Creativity',
      desc: 'Combining ideas from unrelated fields into inventive, practical solutions that challenge conventional approaches.'
    },
    {
      name: 'Collaboration',
      desc: 'Fostering respect and active teamwork between diverse faculties, recognizing that different skills make projects resilient.'
    },
    {
      name: 'Experimentation',
      desc: 'Embracing rapid prototyping, trial and error, and learning constructively from ideas that fail fast.'
    },
    {
      name: 'Impact',
      desc: 'Directing our energy towards real community, campus, and environmental challenges that deliver tangible benefit.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-20">
      
      {/* Header Banner */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
          <span>About the Organization</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          About i-CATS Invention & Innovation Club
        </h1>
        <p className="text-lg text-amber-300/90 font-medium">
          Create. Collaborate. Innovate.
        </p>
        <p className="text-base text-slate-300 leading-relaxed">
          The i-CATS Invention & Innovation Club is a student-led university society established to encourage inventive thinking, practical problem solving, and cross-disciplinary collaboration among students across all academic faculties.
        </p>
      </div>

      {/* Interdisciplinary Philosophy */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-[#0B1528] rounded-2xl p-8 sm:p-12 border border-slate-800">
        <div className="lg:col-span-7 space-y-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">
            Our Guiding Principle
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Innovation is Not Restricted to Any Single Faculty
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Invention and innovation are frequently misunderstood as purely software coding or technical engineering. In reality, the most impactful innovations require:
          </p>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span><strong>Designers & Artists</strong> to shape intuitive user experience, ergonomics, and visual identity.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span><strong>Business & Management Students</strong> to test commercial viability, financial models, and marketing.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span><strong>Engineers & Technologists</strong> to build, assemble, and automate robust physical/digital systems.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span><strong>Sciences, Agro & Social Innovators</strong> to identify critical environmental, food, and societal challenges.</span>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-xl overflow-hidden border border-slate-700 bg-slate-900 aspect-[4/3]">
            <img
              src="/src/assets/images/interdisciplinary_collab_1790998727769.jpg"
              alt="Interdisciplinary students collaborating in workshop"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div className="bg-[#0B1528] rounded-xl p-8 border border-slate-800 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Our Mission</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            To provide an open, supportive campus environment where students from all programmes can explore novel ideas, develop prototypes, gain hands-on multidisciplinary experience, and build solutions for community and global challenges.
          </p>
        </div>

        <div className="bg-[#0B1528] rounded-xl p-8 border border-slate-800 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Eye className="w-6 h-6" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Our Vision</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            To become a vibrant student innovation ecosystem at i-CATS University recognized for nurturing creative confidence, entrepreneurship, and interdisciplinary collaboration that makes a real-world difference.
          </p>
        </div>

      </section>

      {/* Core Values */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">
            Our Culture & Ethics
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Club Core Values
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            These five values guide how we work together, mentor peers, and approach problem solving.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {values.map((v, i) => (
            <div
              key={v.name}
              className="bg-[#0B1528] rounded-xl p-6 border border-slate-800/80 hover:border-amber-500/30 transition-colors flex flex-col justify-between"
            >
              <div className="space-y-3">
                <span className="text-xs font-mono font-bold text-amber-400">0{i + 1}.</span>
                <h3 className="text-base font-bold text-white">{v.name}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Club Background & Foundation */}
      <section className="bg-[#0B1528] rounded-2xl p-8 sm:p-10 border border-slate-800 space-y-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">
          Club Foundation & Context
        </p>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Background of the Club
        </h2>
        <div className="text-sm text-slate-300 leading-relaxed space-y-3">
          <p>
            The i-CATS Invention & Innovation Club was initiated to bridge the gap between academic theory and practical invention. While students work hard on assignments within their respective faculties, real-world problems require combined perspectives that cross traditional classroom boundaries.
          </p>
          <p>
            By providing a structured platform for ideation workshops, inter-faculty hackathon preparations, and project showcases, the club empowers every student to experience the full lifecycle of an idea—from early concept sketch to functional demonstration.
          </p>
        </div>
      </section>

      {/* CTA */}
      <div className="pt-6 text-center space-y-4">
        <h3 className="text-xl font-bold text-white">Join our next activity</h3>
        <div className="flex items-center justify-center gap-4">
          <Link
            to="/join"
            className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors"
          >
            <span>Register as a Member</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/activities"
            className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 rounded-lg transition-colors"
          >
            <span>Browse Activities</span>
          </Link>
        </div>
      </div>

    </div>
  );
};
