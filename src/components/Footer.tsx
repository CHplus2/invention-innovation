import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Mail, MapPin, Globe, Shield, Heart } from 'lucide-react';
import { ClubSettings } from '../types';

interface FooterProps {
  settings?: ClubSettings;
}

export const Footer: React.FC<FooterProps> = ({ settings }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#040913] text-slate-400 border-t border-slate-800/80 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-slate-950 font-black">
                <span className="font-heading text-base">i-C</span>
              </div>
              <span className="font-heading font-bold text-lg text-white">
                {settings?.club_name || 'i-CATS Invention & Innovation Club'}
              </span>
            </div>
            
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              An interdisciplinary university student community dedicated to turning curiosity and ideas from all fields—engineering, business, design, arts, and sciences—into impactful prototypes and real-world solutions.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-amber-400/90 uppercase tracking-wider">
              <span>Create</span>
              <span>·</span>
              <span>Collaborate</span>
              <span>·</span>
              <span>Innovate</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Explore
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="hover:text-amber-400 transition-colors">
                  About the Club
                </Link>
              </li>
              <li>
                <Link to="/activities" className="hover:text-amber-400 transition-colors">
                  Activities & Events
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-amber-400 transition-colors">
                  Project Showcase
                </Link>
              </li>
              <li>
                <Link to="/hackathon" className="hover:text-amber-400 transition-colors">
                  Hackathon (Proposal)
                </Link>
              </li>
              <li>
                <Link to="/team" className="hover:text-amber-400 transition-colors">
                  Committee Board
                </Link>
              </li>
            </ul>
          </div>

          {/* Membership & Involvement */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Involvement
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/join" className="hover:text-amber-400 transition-colors">
                  Join as Member
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-amber-400 transition-colors">
                  Partner / Sponsor Inquiry
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-amber-400 transition-colors">
                  Submit a Project Idea
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Admin Portal</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Campus & Contact */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Campus Location
            </p>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>{settings?.campus_location || 'Student Innovation Studio, i-CATS University Main Campus'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <a href={`mailto:${settings?.contact_email || 'innovation.club@icats.edu.my'}`} className="hover:text-slate-200 transition-colors">
                  {settings?.contact_email || 'innovation.club@icats.edu.my'}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-amber-500 shrink-0" />
                <span>{settings?.university_name || 'i-CATS University'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-slate-900/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {currentYear} i-CATS Invention & Innovation Club. Open to students of all disciplines.</p>
          <div className="flex items-center gap-4">
            <Link to="/about" className="hover:text-slate-400 transition-colors">Constitution & Values</Link>
            <span>·</span>
            <Link to="/contact" className="hover:text-slate-400 transition-colors">Feedback & Inquiries</Link>
            <span>·</span>
            <Link to="/admin" className="hover:text-slate-400 transition-colors">Administrator</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
