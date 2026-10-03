import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Shield, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { isAdmin } = useAuth();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Activities', href: '/activities' },
    { name: 'Projects', href: '/projects' },
    { name: 'Hackathon', href: '/hackathon' },
    { name: 'Committee', href: '/team' },
    { name: 'Contact', href: '/contact' }
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#070F1E]/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Zone 1: Single text element wordmark with logo icon */}
          <Link
            to="/"
            className="flex items-center gap-3 text-slate-100 hover:text-amber-400 transition-colors shrink-0 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-slate-950 font-black shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <span className="font-heading text-lg">i-C</span>
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-base sm:text-lg tracking-tight leading-tight text-white group-hover:text-amber-300 transition-colors">
                i-CATS Invention & Innovation Club
              </span>
              <span className="text-[11px] font-medium text-amber-400/90 tracking-wider uppercase">
                Create · Collaborate · Innovate
              </span>
            </div>
          </Link>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`transition-colors hover:text-amber-400 relative py-1 ${
                  isActive(link.href)
                    ? 'text-amber-400 font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-amber-400'
                    : 'text-slate-300'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <Link
              to="/admin"
              className={`p-2 rounded-lg transition-colors text-xs font-medium flex items-center gap-1.5 ${
                isAdmin
                  ? 'text-emerald-400 hover:bg-emerald-950/40 border border-emerald-800/60'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
              title={isAdmin ? 'Admin Dashboard (Active)' : 'Admin Portal Login'}
            >
              <Shield className="w-4 h-4" />
              <span className="hidden xl:inline">{isAdmin ? 'Admin Portal' : 'Admin'}</span>
            </Link>

            <Link
              to="/join"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-lg shadow-sm shadow-amber-500/20 hover:shadow-amber-500/30 transition-all active:scale-[0.98] whitespace-nowrap"
            >
              <span>Join the Club</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex sm:hidden items-center gap-2">
            <Link
              to="/admin"
              className="p-2 text-slate-400 hover:text-slate-200"
              aria-label="Admin Portal"
            >
              <Shield className="w-4 h-4" />
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-300 hover:text-white rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="lg:hidden border-b border-slate-800 bg-[#070F1E] px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className={`px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? 'bg-amber-500/10 text-amber-400 font-semibold'
                    : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-800 flex flex-col gap-2.5">
            <Link
              to="/join"
              onClick={() => setIsOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow transition-colors"
            >
              <span>Join the Club</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
