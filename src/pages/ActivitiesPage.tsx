import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Calendar, MapPin, ArrowRight, Lightbulb } from 'lucide-react';
import { clubService } from '../services/clubService';
import { EventItem } from '../types';
import { EventCard } from '../components/EventCard';

export const ActivitiesPage: React.FC = () => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    async function loadEvents() {
      try {
        const data = await clubService.getEvents();
        setEvents(data);
      } catch (err) {
        console.error('Failed to load events:', err);
      } finally {
        setLoading(false);
      }
    }
    loadEvents();
  }, []);

  const eventTypes: Array<EventItem['event_type']> = [
    'Workshop',
    'Competition',
    'Hackathon',
    'Sharing Session',
    'Innovation Challenge',
    'Networking',
    'Club Session',
    'Other'
  ];

  const filteredEvents = events.filter((event) => {
    const matchesType = selectedType === 'all' || event.event_type === selectedType;
    const matchesStatus = selectedStatus === 'all' || event.status === selectedStatus;
    const matchesSearch =
      searchQuery.trim() === '' ||
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.short_description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesType && matchesStatus && matchesSearch;
  });

  const upcomingList = filteredEvents.filter((e) => e.status === 'upcoming');
  const pastList = filteredEvents.filter((e) => e.status === 'completed');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Heading */}
      <div className="max-w-3xl space-y-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">
          Club Calendar & Workshops
        </p>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Activities & Events
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          From hands-on design sprints and multidisciplinary hackathons to practical invention workshops and sharing sessions. Open to students from all faculties.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#0B1528] rounded-xl p-5 border border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-4">
          
          {/* Search Input */}
          <div className="relative w-full md:flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keyword, topic, or venue..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#070F1E] border border-slate-700/80 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Status Segmented Control */}
          <div className="flex items-center gap-1 p-1 bg-[#070F1E] rounded-lg border border-slate-800 w-full md:w-auto overflow-x-auto">
            <button
              onClick={() => setSelectedStatus('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                selectedStatus === 'all'
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All Status
            </button>
            <button
              onClick={() => setSelectedStatus('upcoming')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                selectedStatus === 'upcoming'
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setSelectedStatus('completed')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                selectedStatus === 'completed'
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Past
            </button>
          </div>

        </div>

        {/* Type Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-800/80">
          <span className="text-xs font-medium text-slate-400 mr-2">Filter Type:</span>
          <button
            onClick={() => setSelectedType('all')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              selectedType === 'all'
                ? 'bg-slate-700 text-white font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            All Types
          </button>
          {eventTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                selectedType === type
                  ? 'bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count & Grid */}
      {loading ? (
        <div className="py-20 text-center text-sm text-slate-400">Loading club activities...</div>
      ) : filteredEvents.length > 0 ? (
        <div className="space-y-12">
          
          {/* Upcoming Events */}
          {upcomingList.length > 0 && (
            <section className="space-y-6">
              <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <span>Upcoming & Scheduled Sessions</span>
                <span className="text-xs font-normal text-slate-400 font-mono">({upcomingList.length})</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingList.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </section>
          )}

          {/* Past Events */}
          {pastList.length > 0 && (
            <section className="space-y-6 pt-6 border-t border-slate-800/80">
              <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <span>Past Club Activities</span>
                <span className="text-xs font-normal text-slate-400 font-mono">({pastList.length})</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pastList.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </section>
          )}

        </div>
      ) : (
        <div className="bg-[#0B1528] rounded-2xl p-12 text-center border border-slate-800 space-y-4">
          <Lightbulb className="w-10 h-10 text-amber-400 mx-auto opacity-60" />
          <h3 className="text-lg font-bold text-white">No activities found matching your filters</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Try resetting your search query or selecting a different activity type to see scheduled events.
          </p>
          <button
            onClick={() => {
              setSelectedType('all');
              setSelectedStatus('all');
              setSearchQuery('');
            }}
            className="inline-flex px-4 py-2 text-xs font-semibold text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 rounded-lg transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}

    </div>
  );
};
