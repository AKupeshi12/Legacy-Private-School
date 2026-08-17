import React, { useState } from 'react';
import { ANNOUNCEMENTS, SCHOOL_INFO } from '../data/schoolData';
import { Megaphone, X, Calendar, ArrowRight, MessageCircle, AlertCircle, Search } from 'lucide-react';

interface AnnouncementsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAdmissions: () => void;
}

export const AnnouncementsModal: React.FC<AnnouncementsModalProps> = ({
  isOpen,
  onClose,
  onOpenAdmissions,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const categories = ['All', 'Admissions', 'Launch', 'Academics'];

  const filteredAnnouncements = ANNOUNCEMENTS.filter((item) => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const whatsappUrl = `https://wa.me/${SCHOOL_INFO.whatsappNumber}?text=${encodeURIComponent(
    'Hello Legacy Private School, I am inquiring about the recent school announcements and launch details.'
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#f9f9ff] w-full max-w-3xl rounded-xl shadow-2xl overflow-hidden border border-[#000b20]/10 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-[#000b20] text-white p-6 flex justify-between items-center relative border-b border-[#ffbe3b]/30">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#ffbe3b] text-[#000b20] rounded-lg">
              <Megaphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-[#ffbe3b]">
                School Announcements & Launch Updates
              </h3>
              <p className="text-xs text-white/80">
                Official notices from Legacy Private Secondary School Leadership
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="p-4 bg-[#e7eeff] border-b border-[#c4c6ce] flex flex-col sm:flex-row gap-3 items-center justify-between">
          {/* Categories */}
          <div className="flex gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#000b20] text-[#ffbe3b]'
                    : 'bg-white text-[#111c2c] hover:bg-[#dee8ff]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#74777e]" />
            <input
              type="text"
              placeholder="Search notices..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-[#c4c6ce] rounded-lg pl-9 pr-3 py-1.5 text-xs text-[#111c2c] focus:outline-none focus:ring-2 focus:ring-[#7c5800]"
            />
          </div>
        </div>

        {/* Announcement List */}
        <div className="p-6 overflow-y-auto space-y-4 flex-grow">
          {filteredAnnouncements.length === 0 ? (
            <div className="text-center py-10 text-[#74777e]">
              <AlertCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>No announcements found matching your criteria.</p>
            </div>
          ) : (
            filteredAnnouncements.map((item) => (
              <div
                key={item.id}
                className={`bg-white border rounded-lg p-5 transition-all hover:shadow-md ${
                  item.isUrgent ? 'border-[#ffbe3b] ring-1 ring-[#ffbe3b]/50' : 'border-[#c4c6ce]'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#e7eeff] text-[#000b20] font-semibold text-[11px] px-2.5 py-0.5 rounded-full uppercase">
                      {item.category}
                    </span>
                    {item.isUrgent && (
                      <span className="bg-[#ba1a1a] text-white font-bold text-[10px] px-2 py-0.5 rounded-full uppercase">
                        Urgent
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-[#74777e] flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {item.date}
                  </span>
                </div>

                <h4 className="text-base font-bold text-[#000b20] mb-2">{item.title}</h4>
                <p className="text-sm text-[#44474d] mb-3 leading-relaxed">{item.fullContent}</p>

                {item.category === 'Admissions' && (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenAdmissions();
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7c5800] hover:text-[#000b20] transition-colors"
                  >
                    <span>Apply for Enrollment Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#f0f3ff] border-t border-[#c4c6ce] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <span className="text-[#44474d]">
            Have questions regarding announcements? Reach out directly via WhatsApp.
          </span>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold px-4 py-2 rounded flex items-center gap-1.5 transition-colors"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

      </div>
    </div>
  );
};
