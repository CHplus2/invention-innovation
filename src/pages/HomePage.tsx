import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Lightbulb,
  Cpu,
  Briefcase,
  Palette,
  Leaf,
  GraduationCap,
  HeartHandshake,
  Users,
  Compass,
  Trophy,
  CheckCircle2,
  Calendar,
  Layers,
  Rocket
} from 'lucide-react';
import { clubService } from '../services/clubService';
import { EventItem, ProjectItem, SponsorItem, ClubSettings, HackathonSettings } from '../types';
import { EventCard } from '../components/EventCard';
import { ProjectCard } from '../components/ProjectCard';
import { SponsorSection } from '../components/SponsorSection';

export const HomePage: React.FC = () => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [sponsors, setSponsors] = useState<SponsorItem[]>([]);
  const [hackathon, setHackathon] = useState<HackathonSettings | null>(null);
  const [settings, setSettings] = useState<ClubSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [evts, projs, spons, hack, sett] = await Promise.all([
          clubService.getEvents(),
          clubService.getProjects(),
          clubService.getSponsors(),
          clubService.getHackathonSettings(),
          clubService.getClubSettings()
        ]);
        setEvents(evts);
        setProjects(projs);
        setSponsors(spons);
        setHackathon(hack);
        setSettings(sett);
      } catch (err) {
        console.error('Error loading home data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const upcomingEvents = events.filter((e) => e.status === 'upcoming').slice(0, 3);
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);

  const innovationFields = [
    {
      icon: Cpu,
      title: 'Technology & Engineering',
      desc: 'Smart devices, embedded systems, software prototypes, robotics, and hardware automation.'
    },
    {
      icon: Briefcase,
      title: 'Business & Entrepreneurship',
      desc: 'Business models, market validation, venture pitching, unit economics, and startup feasibility.'
    },
    {
      icon: Palette,
      title: 'Design & Creative Arts',
      desc: 'User experience design, industrial product aesthetics, visual storytelling, and digital media.'
    },
    {
      icon: Leaf,
      title: 'Sustainability & Environment',
      desc: 'Renewable solutions, circular waste initiatives, energy conservation, and green technology.'
    },
    {
      icon: GraduationCap,
      title: 'Education & Learning Tech',
      desc: 'Interactive learning tools, campus peer platforms, and accessible educational experiences.'
    },
    {
      icon: Compass,
      title: 'Food & Lifestyle Innovation',
      desc: 'Modern agro-technology, culinary packaging, lifestyle products, and urban living concepts.'
    },
    {
      icon: HeartHandshake,
      title: 'Social Innovation',
      desc: 'Community empowerment projects, accessible public services, and non-profit solution design.'
    },
    {
      icon: Users,
      title: 'Human-Centred Solutions',
      desc: 'Ergonomic designs, assistive accessibility tools, and empathetic everyday problem solving.'
    }
  ];

  return (
    <div className="space-y-24 sm:space-y-32">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative pt-8 sm:pt-14 pb-12 overflow-hidden">
        {/* Background ambient lighting */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-10 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 text-xs font-semibold text-amber-400">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span>i-CATS University Student Community</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
                i-CATS Invention &{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500">
                  Innovation Club
                </span>
              </h1>

              <p className="text-lg sm:text-xl font-medium text-amber-300/90 tracking-wide">
                Create. Collaborate. Innovate.
              </p>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                A student-led community where ideas from different fields come together to become projects, solutions and real-world impact. Open to students from all programmes and faculties.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  to="/join"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-xl shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all active:scale-[0.98]"
                >
                  <span>Join the Club</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/activities"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold text-slate-200 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 rounded-xl transition-all"
                >
                  <span>Explore Our Activities</span>
                </Link>
              </div>

              {/* Zero-Pill Quick Trust Attributes */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <span>Open to All Programmes</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <span>No Prior Invention Needed</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <span>Hands-on Project Mentorship</span>
                </div>
              </div>
            </div>

            {/* Right Media Hero Box */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 bg-[#0B1528] shadow-2xl group">
                <img
                  src="/src/assets/images/hero_innovation_hub_1790998710760.jpg"
                  alt="i-CATS University Innovation Studio with students collaborating"
                  referrerPolicy="no-referrer"
                  className="w-full aspect-[4/3] object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070F1E] via-transparent to-transparent" />
                
                {/* Overlay quote card */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#070F1E]/90 backdrop-blur-md border border-slate-800">
                  <p className="text-xs text-slate-300 leading-relaxed italic">
                    "Innovation happens when engineering meets business acumen, creative design, and real community needs."
                  </p>
                  <p className="mt-1 text-[11px] font-semibold text-amber-400 uppercase tracking-wider">
                    — Interdisciplinary Community Vision
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. ABOUT THE CLUB & WHAT WE DO */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">
              Interdisciplinary Philosophy
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Innovation Belongs to Every Discipline
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              At i-CATS, we believe groundbreaking solutions don't originate from a single department. A computer scientist needs a business strategist; an engineer needs a creative designer; a social innovator needs practical technology.
            </p>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              Our club is the collaborative bridge where students from every diploma and degree programme assemble, test bold ideas, and create tangible prototypes together.
            </p>

            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-400 hover:text-amber-300 transition-colors"
              >
                <span>Read more about our mission and values</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="p-6 rounded-xl bg-[#0B1528] border border-slate-800/80 hover:border-amber-500/30 transition-colors space-y-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Lightbulb className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Hands-on Ideation</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Transform rough concepts into functional wireframes, physical models, and validated pitch decks.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#0B1528] border border-slate-800/80 hover:border-amber-500/30 transition-colors space-y-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Cross-Faculty Teams</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Connect with passionate peers across different years and programmes who complement your unique skills.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#0B1528] border border-slate-800/80 hover:border-amber-500/30 transition-colors space-y-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Trophy className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Competitions & Hackathons</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Prepare for campus, state, and national innovation challenges with peer coaching and structured sprints.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#0B1528] border border-slate-800/80 hover:border-amber-500/30 transition-colors space-y-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Rocket className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Project Showcase</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Document and exhibit your work to university leaders, industry mentors, and potential future collaborators.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. DIFFERENT FIELDS OF INNOVATION */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
            Multi-Disciplinary Spectrum
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Fields of Innovation We Explore
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed">
            Invention is not limited to software or robotics. We encourage exploration across diverse practical and creative domains.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {innovationFields.map((field) => {
            const Icon = field.icon;
            return (
              <div
                key={field.title}
                className="bg-[#0B1528] rounded-xl p-5 border border-slate-800/80 hover:border-amber-500/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-3.5">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-2">{field.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{field.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. UPCOMING ACTIVITIES */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">
              Events & Sessions
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Upcoming Club Activities
            </h2>
          </div>

          <Link
            to="/activities"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-400 hover:text-amber-300 transition-colors"
          >
            <span>View All Activities</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {upcomingEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="bg-[#0B1528] rounded-xl p-8 text-center border border-slate-800">
            <p className="text-sm text-slate-400">Upcoming activities are currently being scheduled.</p>
          </div>
        )}
      </section>

      {/* ========================================================================= */}
      {/* 5. FEATURED PROJECTS SHOWCASE */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">
              Student Creations
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Featured Innovation Projects
            </h2>
          </div>

          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-400 hover:text-amber-300 transition-colors"
          >
            <span>Browse Project Showcase</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {featuredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="bg-[#0B1528] rounded-xl p-8 text-center border border-slate-800">
            <p className="text-sm text-slate-400">Student projects will be featured here upon club submission.</p>
          </div>
        )}
      </section>

      {/* ========================================================================= */}
      {/* 6. HACKATHON INITIATIVE HIGHLIGHT */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#0C1A33] via-[#09152C] to-[#0A172F] rounded-2xl p-8 sm:p-12 border border-slate-700/80 shadow-2xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-xs font-semibold text-amber-300">
                <Trophy className="w-3.5 h-3.5" />
                <span>{hackathon?.status_label || 'Proposed Initiative (Planning Stage)'}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                {hackathon?.title || 'i-CATS Inter-Faculty Hackathon'}
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {hackathon?.tagline || 'Bridging ideas across faculties to create real-world solutions.'}
              </p>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                A proposed multi-disciplinary event open to all university faculties. Teams will tackle real campus and community challenges with prototype development, business models, and faculty mentorship.
              </p>

              <div className="pt-2 flex items-center gap-4">
                <Link
                  to="/hackathon"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow transition-colors"
                >
                  <span>View Hackathon Proposal</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-xl overflow-hidden border border-slate-700 bg-slate-900 aspect-[16/10]">
                <img
                  src="/src/assets/images/hackathon_ideation_1790998749567.jpg"
                  alt="Student hackathon planning session"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. WHY JOIN SECTION */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
            Why Become a Member
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Ready to Build Something Meaningful?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed">
            You do not need to be a technical genius or have an existing invention. All you need is the drive to learn, collaborate, and create.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#0B1528] rounded-xl p-6 border border-slate-800/80 space-y-3">
            <span className="text-lg font-bold text-amber-400">01.</span>
            <h3 className="text-base font-bold text-white">Cross-Programme Networking</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Expand your campus circle beyond your course cohort. Work with peers from computing, business, design, and engineering.
            </p>
          </div>

          <div className="bg-[#0B1528] rounded-xl p-6 border border-slate-800/80 space-y-3">
            <span className="text-lg font-bold text-amber-400">02.</span>
            <h3 className="text-base font-bold text-white">Portfolio-Ready Experience</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Gain demonstrable project experience solving realistic challenges, building prototypes, and participating in challenges.
            </p>
          </div>

          <div className="bg-[#0B1528] rounded-xl p-6 border border-slate-800/80 space-y-3">
            <span className="text-lg font-bold text-amber-400">03.</span>
            <h3 className="text-base font-bold text-white">Mentorship & Skill Sprints</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Participate in club workshops covering design thinking, rapid prototyping, pitching, and business model formulation.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. FINAL MEMBERSHIP CALL TO ACTION */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0B1528] rounded-2xl p-8 sm:p-12 text-center border border-amber-500/20 relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-5">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              Join the i-CATS Invention & Innovation Club
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Open to all students across every faculty. Start collaborating on ideas today.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/join"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-lg transition-all"
              >
                <span>Register as a Member</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 rounded-xl transition-all"
              >
                <span>Ask a Question</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. SPONSOR / PARTNER SECTION */}
      {/* ========================================================================= */}
      <SponsorSection sponsors={sponsors} />

    </div>
  );
};
