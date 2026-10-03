import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Users,
  Calendar,
  ExternalLink,
  Github,
  Layers,
  Sparkles,
  Share2
} from 'lucide-react';
import { clubService } from '../services/clubService';
import { ProjectItem } from '../types';

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<ProjectItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageFailed, setImageFailed] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function loadProject() {
      if (!slug) return;
      try {
        const data = await clubService.getProjectBySlug(slug);
        setProject(data);
      } catch (err) {
        console.error('Error loading project detail:', err);
      } finally {
        setLoading(false);
      }
    }
    loadProject();
  }, [slug]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center text-slate-400">
        Loading project details...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-2xl font-bold text-white">Project Not Found</h1>
        <p className="text-sm text-slate-400">
          The requested student innovation showcase project could not be found.
        </p>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-950 bg-amber-400 rounded-lg"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Projects</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Back Link */}
      <div>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-amber-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Project Showcase</span>
        </Link>
      </div>

      {/* Main Container */}
      <div className="bg-[#0B1528] rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
        
        {/* Banner Media */}
        <div className="relative aspect-[21/9] w-full bg-slate-900 overflow-hidden">
          {project.image_url && !imageFailed ? (
            <img
              src={project.image_url}
              alt={project.title}
              referrerPolicy="no-referrer"
              onError={() => setImageFailed(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-[#0C1A33] to-[#070F1E] flex items-center justify-center p-8">
              <Layers className="w-16 h-16 text-amber-400/40" />
            </div>
          )}

          <div className="absolute top-4 left-4">
            <span className="text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded bg-[#070F1E]/90 text-amber-300 border border-amber-500/30 backdrop-blur-sm shadow-md">
              {project.category}
            </span>
          </div>
        </div>

        {/* Content Details */}
        <div className="p-6 sm:p-10 space-y-8">
          
          <div className="space-y-3">
            {/* Unboxed metadata */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-400">
              <span>{project.team_name}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums">{project.year}</span>
              <span aria-hidden="true">·</span>
              <span className="text-amber-400">Student Innovation Project</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              {project.title}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-medium">
              {project.summary}
            </p>
          </div>

          {/* Disciplines & Team Meta */}
          <div className="p-5 rounded-xl bg-[#070F1E] border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
              <Users className="w-4 h-4" />
              <span>Multi-Disciplinary Team & Roles</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.team_members.map((member, idx) => (
                <span
                  key={idx}
                  className="text-xs font-medium text-slate-200 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60"
                >
                  {member}
                </span>
              ))}
            </div>
          </div>

          {/* Full Project Description */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <h2 className="text-lg font-bold text-white tracking-tight">
              Project Overview & Problem Statement
            </h2>
            <div className="text-sm sm:text-base text-slate-300 leading-relaxed space-y-4 whitespace-pre-line">
              {project.description}
            </div>
          </div>

          {/* Action Links & External URLs */}
          <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              {project.demo_url && (
                <a
                  href={project.demo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors"
                >
                  <span>Live Demo / Presentation</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}

              {project.repository_url && (
                <a
                  href={project.repository_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>Code / CAD Repository</span>
                </a>
              )}

              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 rounded-lg border border-slate-700 transition-colors"
                title="Copy share link"
              >
                <Share2 className="w-4 h-4" />
                <span>{copied ? 'Link Copied!' : 'Share Project'}</span>
              </button>
            </div>

            <span className="text-xs text-slate-500">
              i-CATS Student Showcase
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};
