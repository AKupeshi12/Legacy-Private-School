import React from 'react';
import { SCHOOL_INFO, TERM_DATES, CALENDAR_EVENTS } from '../data/schoolData';
import { Printer, Download, X, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

interface PDFCalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PDFCalendarModal: React.FC<PDFCalendarModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white w-full max-w-4xl rounded-xl shadow-2xl overflow-hidden border border-[#000b20]/10 flex flex-col max-h-[95vh]">
        
        {/* Modal Controls (Hidden in Print) */}
        <div className="bg-[#000b20] text-white p-4 flex justify-between items-center no-print">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#ffbe3b]" />
            <span className="font-extrabold text-sm sm:text-base text-white">
              Official Academic Calendar 2026/2027 Prospectus
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="bg-[#ffbe3b] text-[#000b20] font-bold text-xs px-3 py-1.5 rounded flex items-center gap-1.5 hover:bg-[#ffbe3b]/90 transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-white/70 hover:text-white rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Prospectus Content */}
        <div className="p-8 sm:p-12 overflow-y-auto bg-white text-[#111c2c] space-y-8 font-sans">
          
          {/* Header Header */}
          <div className="border-b-2 border-[#000b20] pb-6 flex justify-between items-start">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#000b20] tracking-tight">
                {SCHOOL_INFO.fullName}
              </h1>
              <p className="text-xs uppercase tracking-widest text-[#7c5800] font-bold mt-1">
                Academic Year 2026 / 2027 Calendar & Term Dates
              </p>
              <p className="text-xs text-[#44474d] mt-1">
                {SCHOOL_INFO.address} • Phone: {SCHOOL_INFO.phone}
              </p>
            </div>
            <div className="text-right">
              <span className="inline-block bg-[#000b20] text-[#ffbe3b] font-bold text-xs px-3 py-1 rounded">
                Official Document
              </span>
              <p className="text-[11px] text-[#74777e] mt-1">Ref: LEG-ACAD-2026</p>
            </div>
          </div>

          {/* Term Dates Section */}
          <div>
            <h2 className="text-lg font-bold text-[#000b20] mb-3 pb-1 border-b border-[#c4c6ce] uppercase tracking-wider text-xs">
              1. Term Structure & Operating Schedule
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {TERM_DATES.map((term, i) => (
                <div key={i} className="border border-[#c4c6ce] p-4 rounded-lg bg-[#f9f9ff]">
                  <span className="text-xs font-bold text-[#7c5800] uppercase block mb-1">
                    {term.term}
                  </span>
                  <div className="text-sm font-bold text-[#000b20]">{term.dates}</div>
                  <div className="text-xs text-[#44474d] mt-1">Mandatory Attendance</div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Academic & Co-Curricular Events Table */}
          <div>
            <h2 className="text-lg font-bold text-[#000b20] mb-3 pb-1 border-b border-[#c4c6ce] uppercase tracking-wider text-xs">
              2. Major Key Dates & Institutional Events
            </h2>
            <table className="w-full text-left text-xs border-collapse border border-[#c4c6ce]">
              <thead>
                <tr className="bg-[#000b20] text-white">
                  <th className="p-2.5 border border-[#c4c6ce]">Date</th>
                  <th className="p-2.5 border border-[#c4c6ce]">Event Title</th>
                  <th className="p-2.5 border border-[#c4c6ce]">Category</th>
                  <th className="p-2.5 border border-[#c4c6ce]">Venue</th>
                </tr>
              </thead>
              <tbody>
                {CALENDAR_EVENTS.map((evt, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-[#f0f3ff]'}>
                    <td className="p-2.5 border border-[#c4c6ce] font-bold">{evt.dateDisplay}</td>
                    <td className="p-2.5 border border-[#c4c6ce] font-medium text-[#000b20]">{evt.title}</td>
                    <td className="p-2.5 border border-[#c4c6ce] text-[#7c5800] font-semibold">{evt.category}</td>
                    <td className="p-2.5 border border-[#c4c6ce]">{evt.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* School Fees & Enrollment Notice */}
          <div className="bg-[#f0f3ff] p-5 rounded-lg border border-[#c4c6ce] space-y-2">
            <h3 className="font-bold text-xs uppercase tracking-wider text-[#000b20]">
              Admissions Fee Policy Notice
            </h3>
            <p className="text-xs text-[#44474d] leading-relaxed">
              Term fees for all secondary forms (Form 1 - Form 4) are set at <strong>MWK 130,000.00</strong> per term, with a non-refundable application/registration fee of <strong>MWK 10,000.00</strong>. Payments are accepted via Bank Transfer or Mobile Money.
            </p>
          </div>

          {/* Footer Signature */}
          <div className="pt-6 border-t border-[#c4c6ce] flex justify-between items-center text-xs text-[#74777e]">
            <div>
              <p className="font-bold text-[#000b20]">Office of the Headmaster</p>
              <p>Legacy Private Secondary School • Mangochi</p>
            </div>
            <div className="text-right">
              <p className="italic">Igniting Minds, Shaping Legacy</p>
              <p>Verified: 2026/2027</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
