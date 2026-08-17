import React, { useState } from 'react';
import { PageType } from './types';
import { TopBanner } from './components/TopBanner';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AnnouncementsModal } from './components/AnnouncementsModal';
import { RSVPModal } from './components/RSVPModal';
import { PDFCalendarModal } from './components/PDFCalendarModal';

import { HomePage } from './pages/HomePage';
import { FacultyPage } from './pages/FacultyPage';
import { CalendarPage } from './pages/CalendarPage';
import { AdmissionsPage } from './pages/AdmissionsPage';
import { StudentPortalPage } from './pages/StudentPortalPage';

export function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [announcementsOpen, setAnnouncementsOpen] = useState(false);
  const [rsvpOpen, setRsvpOpen] = useState(false);
  const [pdfCalendarOpen, setPdfCalendarOpen] = useState(false);

  const handleNavigate = (page: PageType) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f9f9ff] text-[#111c2c] font-sans antialiased selection:bg-[#ffbe3b] selection:text-[#000b20]">
      
      {/* Top Moving Ticker Banner */}
      <TopBanner
        onOpenAnnouncements={() => setAnnouncementsOpen(true)}
        onOpenAdmissions={() => handleNavigate('admissions')}
      />

      {/* Primary Sticky Header & Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />

      {/* Main Page Content Views */}
      <main className="flex-grow">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenRSVP={() => setRsvpOpen(true)}
          />
        )}

        {currentPage === 'faculty' && (
          <FacultyPage />
        )}

        {currentPage === 'calendar' && (
          <CalendarPage
            onOpenRSVP={() => setRsvpOpen(true)}
            onOpenPDFCalendar={() => setPdfCalendarOpen(true)}
          />
        )}

        {currentPage === 'admissions' && (
          <AdmissionsPage />
        )}

        {currentPage === 'student-portal' && (
          <StudentPortalPage />
        )}
      </main>

      {/* Primary Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Interactive Modals */}
      <AnnouncementsModal
        isOpen={announcementsOpen}
        onClose={() => setAnnouncementsOpen(false)}
        onOpenAdmissions={() => {
          setAnnouncementsOpen(false);
          handleNavigate('admissions');
        }}
      />

      <RSVPModal
        isOpen={rsvpOpen}
        onClose={() => setRsvpOpen(false)}
      />

      <PDFCalendarModal
        isOpen={pdfCalendarOpen}
        onClose={() => setPdfCalendarOpen(false)}
      />

    </div>
  );
}

export default App;
