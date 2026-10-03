import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ActivitiesPage } from './pages/ActivitiesPage';
import { EventDetailPage } from './pages/EventDetailPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { HackathonPage } from './pages/HackathonPage';
import { TeamPage } from './pages/TeamPage';
import { JoinPage } from './pages/JoinPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';
import { clubService } from './services/clubService';
import { ClubSettings } from './types';

// Scroll to top on route transition
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const [settings, setSettings] = useState<ClubSettings | undefined>(undefined);

  useEffect(() => {
    clubService.getClubSettings().then((data) => {
      setSettings(data);
    });
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-[#070F1E] text-slate-100 font-sans antialiased selection:bg-amber-500/30 selection:text-amber-200">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/activities" element={<ActivitiesPage />} />
              <Route path="/activities/:slug" element={<EventDetailPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/projects/:slug" element={<ProjectDetailPage />} />
              <Route path="/hackathon" element={<HackathonPage />} />
              <Route path="/team" element={<TeamPage />} />
              <Route path="/join" element={<JoinPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route
                path="*"
                element={
                  <div className="max-w-md mx-auto px-4 py-24 text-center space-y-4">
                    <h1 className="text-4xl font-black text-white">404</h1>
                    <p className="text-sm text-slate-400">Page not found.</p>
                    <a
                      href="/"
                      className="inline-block px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-950 bg-amber-400 rounded-lg"
                    >
                      Return Home
                    </a>
                  </div>
                }
              />
            </Routes>
          </main>
          <Footer settings={settings} />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
