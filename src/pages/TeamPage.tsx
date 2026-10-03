import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Linkedin, Mail, ArrowRight, UserCheck } from 'lucide-react';
import { clubService } from '../services/clubService';
import { CommitteeMember } from '../types';

export const TeamPage: React.FC = () => {
  const [members, setMembers] = useState<CommitteeMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTeam() {
      try {
        const data = await clubService.getCommittee();
        setMembers(data);
      } catch (err) {
        console.error('Failed to load committee:', err);
      } finally {
        setLoading(false);
      }
    }
    loadTeam();
  }, []);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .slice(0, 2)
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Heading */}
      <div className="max-w-3xl space-y-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">
          Student Leadership
        </p>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Club Committee & Leadership
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          The i-CATS Invention & Innovation Club is organized and steered by an elected, multidisciplinary student committee representing various academic faculties.
        </p>
      </div>

      {/* Committee Grid */}
      {loading ? (
        <div className="py-20 text-center text-slate-400">Loading committee board...</div>
      ) : members.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {members.map((member) => (
            <div
              key={member.id}
              className="bg-[#0B1528] rounded-2xl p-6 border border-slate-800/80 hover:border-amber-500/30 transition-all flex flex-col justify-between space-y-5"
            >
              {/* Photo or Monogram */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#0E1E38] to-[#070F1E] border border-amber-500/20 flex items-center justify-center overflow-hidden shrink-0">
                  {member.photo_url ? (
                    <img
                      src={member.photo_url}
                      alt={member.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="font-heading text-lg font-bold text-amber-400">
                      {getInitials(member.name)}
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-semibold text-amber-400 block">
                    {member.role}
                  </span>
                  <h3 className="text-base font-bold text-white leading-snug">
                    {member.name}
                  </h3>
                </div>
              </div>

              {/* Programme */}
              <div className="pt-3 border-t border-slate-800/80 space-y-2">
                <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
                  Academic Programme
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {member.programme}
                </p>
              </div>

              {/* LinkedIn / Profile if present */}
              {member.linkedin_url && (
                <div className="pt-2 flex items-center justify-end">
                  <a
                    href={member.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-amber-400 transition-colors"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                    <span>LinkedIn Profile</span>
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-[#0B1528] rounded-2xl p-12 text-center border border-slate-800">
          <p className="text-sm text-slate-400">Committee appointments for the current term are being finalized.</p>
        </div>
      )}

      {/* Want to Join Leadership Banner */}
      <div className="bg-[#0B1528] rounded-2xl p-8 sm:p-10 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
            Interested in Joining the Club Committee or Sub-Committees?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300">
            We open call for sub-committee volunteers and event coordinators at the start of each academic semester.
          </p>
        </div>
        <Link
          to="/join"
          className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shrink-0"
        >
          <span>Join as a Member First</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
};
