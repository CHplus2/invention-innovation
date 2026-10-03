import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Layers, PlusCircle, Sparkles, Filter } from 'lucide-react';
import { clubService } from '../services/clubService';
import { ProjectItem } from '../types';
import { ProjectCard } from '../components/ProjectCard';

export const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await clubService.getProjects();
        setProjects(data);
      } catch (err) {
        console.error('Failed to load projects:', err);
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);

  const categories: Array<ProjectItem['category']> = [
    'Technology',
    'Business',
    'Sustainability',
    'Creative',
    'Education',
    'Social Innovation',
    'Engineering',
    'Other'
  ];

  const filteredProjects = projects.filter((project) => {
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.team_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.team_members.some((m) => m.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Heading */}
      <div className="max-w-3xl space-y-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">
          Student Innovation Showcase
        </p>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Student Projects & Solutions
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Explore cross-disciplinary projects developed by i-CATS students. From sustainable environmental prototypes and business models to creative media and automated systems.
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
              placeholder="Search by project name, faculty, or topic..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#070F1E] border border-slate-700/80 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-400 shrink-0">
            <span>Showing <strong className="text-white">{filteredProjects.length}</strong> projects</span>
          </div>

        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-800/80">
          <span className="text-xs font-medium text-slate-400 mr-2">Discipline:</span>
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              selectedCategory === 'all'
                ? 'bg-amber-400 text-slate-950 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                selectedCategory === cat
                  ? 'bg-amber-400 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      {loading ? (
        <div className="py-20 text-center text-sm text-slate-400">Loading student projects...</div>
      ) : filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="bg-[#0B1528] rounded-2xl p-12 text-center border border-slate-800 space-y-4">
          <Layers className="w-10 h-10 text-amber-400 mx-auto opacity-60" />
          <h3 className="text-lg font-bold text-white">No projects found in this category</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Try adjusting your search criteria or view all categories to see student innovations.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="inline-flex px-4 py-2 text-xs font-semibold text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 rounded-lg transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Submit Your Project Banner */}
      <div className="bg-[#0B1528] rounded-2xl p-8 sm:p-10 border border-amber-500/20 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
            Have a Student Project or Idea to Showcase?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300">
            Club members can feature their prototypes, assignments, or hackathon projects on the official showcase.
          </p>
        </div>
        <Link
          to="/join"
          className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shrink-0"
        >
          <span>Join Club to Exhibit</span>
        </Link>
      </div>

    </div>
  );
};
