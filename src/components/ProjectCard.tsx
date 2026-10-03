import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Layers, Users } from 'lucide-react';
import { ProjectItem } from '../types';

interface ProjectCardProps {
  project: ProjectItem;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <article className="group bg-[#0B1528] rounded-xl border border-slate-800/80 hover:border-amber-500/40 transition-all duration-200 flex flex-col overflow-hidden shadow-lg shadow-black/20 hover:shadow-black/40">
      {/* Media container */}
      <div className="relative aspect-[4/3] w-full bg-slate-900 overflow-hidden">
        {project.image_url && !imageFailed ? (
          <img
            src={project.image_url}
            alt={project.title}
            referrerPolicy="no-referrer"
            onError={() => setImageFailed(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#0E1C36] to-[#070F1E] flex flex-col items-center justify-center p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-2">
              <Layers className="w-6 h-6 text-amber-400" />
            </div>
            <span className="text-xs font-semibold text-slate-300">{project.category}</span>
          </div>
        )}

        {/* Category tag */}
        <div className="absolute top-3 left-3">
          <span className="text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded bg-[#070F1E]/90 text-amber-300 border border-amber-500/30 backdrop-blur-sm">
            {project.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          {/* Unboxed metadata */}
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>{project.team_name}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums">{project.year}</span>
          </div>

          <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-2">
            <Link to={`/projects/${project.slug}`}>
              {project.title}
            </Link>
          </h3>

          <p className="text-sm text-slate-400 line-clamp-3 leading-relaxed">
            {project.summary}
          </p>
        </div>

        {/* Disciplines involved */}
        {project.team_members && project.team_members.length > 0 && (
          <div className="pt-3 border-t border-slate-800/80">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1.5">
              <Users className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="font-medium text-slate-300">Disciplines Involved:</span>
            </div>
            <p className="text-xs text-slate-400 line-clamp-1">
              {project.team_members.join(' · ')}
            </p>
          </div>
        )}

        <div className="pt-2 flex items-center justify-end text-xs">
          <Link
            to={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1 font-semibold text-amber-400 hover:text-amber-300 transition-colors"
          >
            <span>View Project Showcase</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
};
