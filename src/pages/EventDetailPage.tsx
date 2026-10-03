import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  MapPin,
  ArrowLeft,
  Share2,
  ExternalLink,
  CheckCircle2,
  Lightbulb,
  Users
} from 'lucide-react';
import { clubService } from '../services/clubService';
import { EventItem } from '../types';

export const EventDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [event, setEvent] = useState<EventItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageFailed, setImageFailed] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function loadEvent() {
      if (!slug) return;
      try {
        const data = await clubService.getEventBySlug(slug);
        setEvent(data);
      } catch (err) {
        console.error('Error loading event detail:', err);
      } finally {
        setLoading(false);
      }
    }
    loadEvent();
  }, [slug]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center text-slate-400">
        Loading event details...
      </div>
    );
  }

  if (!event) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-2xl font-bold text-white">Event Not Found</h1>
        <p className="text-sm text-slate-400">
          The requested club activity could not be found or may have been moved.
        </p>
        <Link
          to="/activities"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-950 bg-amber-400 rounded-lg"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Activities</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Back Link */}
      <div>
        <Link
          to="/activities"
          className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-amber-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Activities</span>
        </Link>
      </div>

      {/* Main Container */}
      <div className="bg-[#0B1528] rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
        
        {/* Banner Media */}
        <div className="relative aspect-[21/9] w-full bg-slate-900 overflow-hidden">
          {event.image_url && !imageFailed ? (
            <img
              src={event.image_url}
              alt={event.title}
              referrerPolicy="no-referrer"
              onError={() => setImageFailed(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-[#0C1A33] to-[#070F1E] flex items-center justify-center p-8">
              <Lightbulb className="w-16 h-16 text-amber-400/40" />
            </div>
          )}

          <div className="absolute top-4 right-4">
            <span
              className={`text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded shadow-md ${
                event.status === 'upcoming'
                  ? 'bg-amber-500 text-slate-950'
                  : event.status === 'ongoing'
                  ? 'bg-emerald-500 text-slate-950'
                  : 'bg-slate-800 text-slate-300'
              }`}
            >
              {event.status}
            </span>
          </div>
        </div>

        {/* Content Details */}
        <div className="p-6 sm:p-10 space-y-8">
          
          <div className="space-y-3">
            {/* Zero-pill metadata */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
              <span>{event.event_type}</span>
              <span aria-hidden="true">·</span>
              <span>Open to All Faculties</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              {event.title}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              {event.short_description}
            </p>
          </div>

          {/* Key Event Logistics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-xl bg-[#070F1E] border border-slate-800">
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Date</span>
                <p className="text-xs sm:text-sm font-semibold text-white mt-0.5">{formatDate(event.start_date)}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Time</span>
                <p className="text-xs sm:text-sm font-semibold text-white mt-0.5">
                  {event.start_time || 'TBA'} {event.end_time ? `– ${event.end_time}` : ''}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Venue</span>
                <p className="text-xs sm:text-sm font-semibold text-white mt-0.5">{event.location}</p>
              </div>
            </div>
          </div>

          {/* Full Description & Markdown-like prose */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <h2 className="text-lg font-bold text-white tracking-tight">
              Session Overview & Guidelines
            </h2>
            <div className="text-sm sm:text-base text-slate-300 leading-relaxed space-y-4 whitespace-pre-line">
              {event.full_description}
            </div>
          </div>

          {/* Registration / Action Section */}
          <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              {event.registration_url ? (
                <a
                  href={event.registration_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow transition-colors w-full sm:w-auto"
                >
                  <span>Register for this Session</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <Link
                  to="/join"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow transition-colors w-full sm:w-auto"
                >
                  <span>Join Club to Participate</span>
                </Link>
              )}

              <button
                onClick={handleShare}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 rounded-lg border border-slate-700 transition-colors"
                title="Copy share link"
              >
                <Share2 className="w-4 h-4" />
                <span>{copied ? 'Link Copied!' : 'Share'}</span>
              </button>
            </div>

            <span className="text-xs text-slate-400">
              Open to students from all faculties.
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};
