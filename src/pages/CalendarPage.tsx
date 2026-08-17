import React, { useState } from 'react';
import { CALENDAR_EVENTS, TERM_DATES, SCHOOL_INFO } from '../data/schoolData';
import { CalendarEvent } from '../types';
import { Calendar as CalendarIcon, Clock, MapPin, Download, Pin, Filter } from 'lucide-react';

interface CalendarPageProps {
  onOpenRSVP: () => void;
  onOpenPDFCalendar: () => void;
}

export const CalendarPage: React.FC<CalendarPageProps> = ({ onOpenRSVP, onOpenPDFCalendar }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All Upcoming');

  const featuredEvent = CALENDAR_EVENTS.find((e) => e.isFeatured) || CALENDAR_EVENTS[0];

  const categories = ['All Upcoming', 'Academic', 'Student Life', 'Arts', 'Sports'];

  const upcomingEvents = CALENDAR_EVENTS.filter((evt) => {
    if (evt.isFeatured) return false; // don't duplicate featured event in regular list
    if (selectedFilter === 'All Upcoming') return true;
    return evt.category === selectedFilter;
  });

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header Section */}
      <div className="max-w-2xl space-y-3">
        <h1 className="text-3xl sm:text-5xl font-black text-[#000b20] tracking-tight font-display">
          Academic Calendar
        </h1>
        <p className="text-base sm:text-lg text-[#44474d] leading-relaxed">
          Stay informed about key dates, term schedules, and major school events throughout the academic year.
        </p>
      </div>

      {/* Bento Grid Layout (Matches Screenshot) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Featured Event (Grand Opening) */}
        <div className="lg:col-span-8 bg-white border border-[#c4c6ce]/60 rounded-xl overflow-hidden shadow-sm flex flex-col justify-between">
          <div
            className="bg-cover bg-center w-full h-64 sm:h-80 relative"
            style={{ backgroundImage: `url('${featuredEvent.image}')` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#000b20] via-[#000b20]/60 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 sm:p-8 w-full text-white space-y-2">
              <div className="inline-block bg-[#ffbe3b] text-[#000b20] font-bold text-xs px-3 py-1 rounded">
                Featured Event
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                {featuredEvent.title}
              </h2>
              <div className="flex flex-wrap items-center gap-6 text-sm text-white/90 font-medium">
                <span className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-[#ffbe3b]" />
                  {featuredEvent.dateDisplay}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#ffbe3b]" />
                  {featuredEvent.time}
                </span>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 bg-white space-y-6">
            <p className="text-base text-[#44474d] leading-relaxed">
              {featuredEvent.description}
            </p>
            <button
              onClick={onOpenRSVP}
              className="border border-[#000b20] text-[#000b20] hover:bg-[#000b20] hover:text-white font-bold text-sm px-6 py-3 rounded transition-colors"
            >
              RSVP Now
            </button>
          </div>
        </div>

        {/* Quick Glance - Term Dates Sidebar */}
        <div className="lg:col-span-4 bg-[#000b20] text-white rounded-xl p-8 flex flex-col justify-between space-y-6">
          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-3 text-white">
              <Pin className="w-5 h-5 text-[#ffbe3b]" />
              <span>Term Dates</span>
            </h3>

            <ul className="space-y-6">
              {TERM_DATES.map((term, i) => (
                <li key={i} className="border-b border-white/20 pb-4 last:border-0 last:pb-0">
                  <div className="text-xs font-bold text-[#ffbe3b] mb-1 uppercase tracking-wider">
                    {term.term}
                  </div>
                  <div className="text-base font-semibold text-white">
                    {term.dates}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={onOpenPDFCalendar}
            className="inline-flex items-center gap-2 font-bold text-sm text-[#ffbe3b] hover:text-[#ffdea8] transition-colors pt-4 border-t border-white/10"
          >
            <span>Download Full PDF Calendar</span>
            <Download className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Upcoming Events List (Matches Screenshot) */}
      <div className="space-y-8 pt-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#c4c6ce] pb-4">
          <h2 className="text-2xl font-extrabold text-[#000b20]">
            Upcoming Events
          </h2>

          {/* Filter Pills */}
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
                  selectedFilter === cat
                    ? 'bg-[#000b20] text-[#ffbe3b]'
                    : 'bg-[#dee8ff] text-[#000b20] hover:bg-[#c4c6ce]/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Event List */}
        <div className="space-y-4">
          {upcomingEvents.map((evt) => (
            <div
              key={evt.id}
              className="bg-white border border-[#c4c6ce]/60 rounded-lg p-6 flex flex-col md:flex-row gap-6 items-start md:items-center hover:shadow-md transition-shadow"
            >
              {/* Date Box */}
              <div className="shrink-0 w-20 h-20 bg-[#dee8ff] rounded-lg flex flex-col items-center justify-center text-[#000b20]">
                <span className="text-xs font-bold uppercase tracking-widest text-[#778aac]">
                  {evt.month}
                </span>
                <span className="text-2xl font-black">{evt.day}</span>
              </div>

              {/* Title & Description */}
              <div className="flex-grow space-y-1.5">
                <span className="inline-block bg-[#e7eeff] text-[#000b20] font-bold text-[11px] px-2.5 py-0.5 rounded uppercase">
                  {evt.category}
                </span>
                <h4 className="text-lg font-bold text-[#000b20]">{evt.title}</h4>
                <p className="text-sm text-[#44474d] max-w-2xl leading-relaxed">
                  {evt.description}
                </p>
              </div>

              {/* Event Metadata */}
              <div className="shrink-0 md:text-right space-y-1.5 text-xs text-[#111c2c] pt-2 md:pt-0">
                <div className="flex items-center md:justify-end gap-1.5 font-semibold">
                  <Clock className="w-4 h-4 text-[#7c5800]" />
                  <span>{evt.time}</span>
                </div>
                <div className="flex items-center md:justify-end gap-1.5 font-medium text-[#44474d]">
                  <MapPin className="w-4 h-4 text-[#7c5800]" />
                  <span>{evt.location}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
