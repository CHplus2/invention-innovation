import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, ArrowRight, Lightbulb } from 'lucide-react';
import { EventItem } from '../types';

interface EventCardProps {
  event: EventItem;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const [imageFailed, setImageFailed] = useState(false);

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <article className="group bg-[#0B1528] rounded-xl border border-slate-800/80 hover:border-amber-500/40 transition-all duration-200 flex flex-col overflow-hidden shadow-lg shadow-black/20 hover:shadow-black/40">
      {/* Media container */}
      <div className="relative aspect-[16/9] w-full bg-slate-900 overflow-hidden">
        {event.image_url && !imageFailed ? (
          <img
            src={event.image_url}
            alt={event.title}
            referrerPolicy="no-referrer"
            onError={() => setImageFailed(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#0E1C36] to-[#070F1E] flex flex-col items-center justify-center p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-2">
              <Lightbulb className="w-6 h-6 text-amber-400" />
            </div>
            <span className="text-xs font-semibold text-slate-300">{event.event_type}</span>
          </div>
        )}

        {/* Status overlay banner */}
        <div className="absolute top-3 right-3">
          <span
            className={`text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded shadow-sm ${
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

      {/* Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          {/* Zero-Pill Metadata */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-amber-400/90">
            <span>{event.event_type}</span>
            <span aria-hidden="true">·</span>
            <span>{formatDate(event.start_date)}</span>
            {event.start_time && (
              <>
                <span aria-hidden="true">·</span>
                <span>{event.start_time}</span>
              </>
            )}
          </div>

          <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-2">
            <Link to={`/activities/${event.slug}`}>
              {event.title}
            </Link>
          </h3>

          <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed">
            {event.short_description}
          </p>
        </div>

        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-slate-400 truncate max-w-[200px]">
            <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span className="truncate">{event.location}</span>
          </div>

          <Link
            to={`/activities/${event.slug}`}
            className="inline-flex items-center gap-1 font-semibold text-amber-400 hover:text-amber-300 transition-colors shrink-0"
          >
            <span>Details</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
};
