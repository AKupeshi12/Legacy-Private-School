import React, { useState, useEffect } from 'react';
import { SCHOOL_INFO } from '../data/schoolData';
import { Phone, MessageCircle, Megaphone, Calendar, Clock, ChevronRight, X } from 'lucide-react';

interface TopBannerProps {
  onOpenAnnouncements: () => void;
  onOpenAdmissions: () => void;
}

export const TopBanner: React.FC<TopBannerProps> = ({ onOpenAnnouncements, onOpenAdmissions }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    const targetDate = new Date(`${SCHOOL_INFO.openingDate}T09:00:00`).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const whatsappUrl = `https://wa.me/${SCHOOL_INFO.whatsappNumber}?text=${encodeURIComponent(
    'Hello Legacy Private School, I am reaching out to inquire about new learner enrollment and admissions.'
  )}`;

  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-4 right-4 z-50 bg-[#000b20] text-[#ffbe3b] border border-[#ffbe3b]/40 shadow-xl px-4 py-2.5 rounded-full flex items-center gap-2 font-semibold text-xs hover:bg-[#0d223f] transition-all"
      >
        <Megaphone className="w-4 h-4 animate-bounce text-[#ffbe3b]" />
        <span>Launch Date: {SCHOOL_INFO.openingDateDisplay}</span>
      </button>
    );
  }

  return (
    <div className="bg-[#000b20] text-white border-b border-[#ffbe3b]/30 relative z-40">
      {/* Top Bar with Ticker & Quick Contact */}
      <div className="max-w-[1400px] mx-auto px-4 py-2 flex flex-col md:flex-row items-center justify-between text-xs gap-2">
        
        {/* Launch Countdown Badge */}
        <div className="flex items-center gap-3 shrink-0 bg-[#0d223f] px-3 py-1 rounded-md border border-[#ffbe3b]/30">
          <span className="flex items-center gap-1.5 font-bold text-[#ffbe3b]">
            <Calendar className="w-3.5 h-3.5" />
            GRAND LAUNCH:
          </span>
          <span className="font-mono text-white tracking-wide font-semibold">
            {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
          </span>
        </div>

        {/* Scrolling Ticker */}
        <div className="overflow-hidden relative w-full max-w-2xl mx-2 py-0.5">
          <div className="animate-ticker cursor-pointer flex items-center gap-8 text-[#d6e3ff]" onClick={onOpenAnnouncements}>
            <span className="flex items-center gap-2 hover:text-[#ffbe3b] transition-colors">
              <span className="bg-[#ffbe3b] text-[#000b20] font-bold px-1.5 py-0.5 rounded text-[10px] uppercase">New</span>
              Registrations Are Open for Forms 1, 2, 3 & 4 for Academic Year 2026/2027!
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-3 h-3 text-[#ffbe3b]" />
              Opening Day Ceremony: {SCHOOL_INFO.openingDateDisplay} at 09:00 AM
            </span>
            <span className="flex items-center gap-2 text-[#ffbe3b] font-medium">
              Term Fees: MWK 130,000.00 | Registration Fee: MWK 10,000.00
            </span>
            <span className="flex items-center gap-2">
              Location: Nasenga, along Monkey Bay Road, Mangochi
            </span>
          </div>
        </div>

        {/* Reach Out / WhatsApp & Direct Call */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenAnnouncements}
            className="hidden lg:flex items-center gap-1.5 bg-[#0d223f] hover:bg-[#1a335a] text-[#d6e3ff] px-2.5 py-1 rounded border border-[#74777e]/40 transition-colors"
          >
            <Megaphone className="w-3.5 h-3.5 text-[#ffbe3b]" />
            <span>Announcements</span>
          </button>

          <a
            href={`tel:${SCHOOL_INFO.phoneRaw}`}
            className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white px-2.5 py-1 rounded transition-colors"
            title="Call Main Office"
          >
            <Phone className="w-3.5 h-3.5 text-[#ffbe3b]" />
            <span className="hidden sm:inline font-medium">{SCHOOL_INFO.phone}</span>
          </a>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold px-3 py-1 rounded transition-all shadow-sm hover:shadow"
            title="Reach via WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-current" />
            <span>WhatsApp</span>
          </a>

          <button
            onClick={() => setIsMinimized(true)}
            className="text-white/60 hover:text-white p-1 rounded transition-colors ml-1"
            title="Minimize banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
