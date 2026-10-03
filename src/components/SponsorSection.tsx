import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Mail, ArrowRight, Award, ShieldCheck, HeartHandshake } from 'lucide-react';
import { SponsorItem } from '../types';

interface SponsorSectionProps {
  sponsors: SponsorItem[];
}

export const SponsorSection: React.FC<SponsorSectionProps> = ({ sponsors }) => {
  const tiers: Array<SponsorItem['sponsorship_tier']> = ['Title Partner', 'Gold', 'Silver', 'Supporting Partner'];
  
  const hasSponsors = sponsors && sponsors.length > 0;

  return (
    <section className="py-16 border-t border-slate-800/80 bg-[#070F1E]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
            Collaboration & Ecosystem
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Industry & Community Partners
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed">
            Empowering students to solve real-world problems through mentorship, challenge problem statements, and prototype resources.
          </p>
        </div>

        {/* Dynamic Sponsor Tiers if present */}
        {hasSponsors ? (
          <div className="space-y-8 mb-12">
            {tiers.map((tier) => {
              const tierSponsors = sponsors.filter((s) => s.sponsorship_tier === tier);
              if (tierSponsors.length === 0) return null;

              return (
                <div key={tier} className="text-center">
                  <span className="inline-block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4 px-3 py-1 bg-slate-800/60 rounded">
                    {tier}
                  </span>
                  <div className="flex flex-wrap justify-center items-center gap-6">
                    {tierSponsors.map((sp) => (
                      <div
                        key={sp.id}
                        className="bg-[#0B1528] border border-slate-800 rounded-xl p-5 flex flex-col items-center justify-center min-w-[200px] hover:border-amber-500/40 transition-colors"
                      >
                        {sp.logo_url ? (
                          <img
                            src={sp.logo_url}
                            alt={sp.name}
                            referrerPolicy="no-referrer"
                            className="h-12 max-w-[160px] object-contain mb-2"
                          />
                        ) : (
                          <span className="text-base font-bold text-slate-200">{sp.name}</span>
                        )}
                        {sp.description && (
                          <p className="text-xs text-slate-400 text-center mt-1">{sp.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}

        {/* Partnership / Sponsorship CTA Box */}
        <div className="bg-gradient-to-r from-[#0D1C38] via-[#09152B] to-[#0A1830] rounded-2xl p-8 sm:p-10 border border-amber-500/20 shadow-xl relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 text-center lg:text-left max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 bg-amber-500/10 px-3 py-1 rounded border border-amber-500/20">
                <HeartHandshake className="w-4 h-4" />
                <span>Open for Partnerships & Mentorship</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Interested in Supporting Student Innovation?
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Whether you represent an industry organization, government agency, local enterprise, or alumni community, partner with i-CATS Invention & Innovation Club to propose challenge statements, mentor interdisciplinary teams, or sponsor hackathons.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-md transition-colors whitespace-nowrap"
              >
                <span>Partner With Us</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
