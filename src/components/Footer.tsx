import React from 'react';
import { SCHOOL_INFO } from '../data/schoolData';
import { PageType } from '../types';
import { MapPin, Mail, Phone, MessageCircle, ArrowUpRight, GraduationCap } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const whatsappUrl = `https://wa.me/${SCHOOL_INFO.whatsappNumber}?text=${encodeURIComponent(
    'Hello Legacy Private School, I am reaching out to inquire about student enrollment and school details.'
  )}`;

  return (
    <footer className="bg-[#000b20] text-white border-t border-[#ffbe3b]/20 mt-auto">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#ffbe3b] text-[#000b20] flex items-center justify-center font-black text-xl">
                L
              </div>
              <span className="text-2xl font-black tracking-tight text-[#ffbe3b] font-display">
                LEGACY PRIVATE SCHOOL
              </span>
            </div>
            <p className="text-white/80 text-sm leading-relaxed max-w-md">
              © 2026 Legacy Private Secondary School. Igniting Minds, Shaping Legacy.
              Empowering Malawi&apos;s youth with world-class academic standards, moral leadership, and holistic development.
            </p>
            <div className="pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold px-4 py-2.5 rounded shadow transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Chat with Admissions on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-[#ffbe3b] font-bold text-sm tracking-wider uppercase">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-[#ffbe3b] transition-colors flex items-center gap-1">
                  <span>Home & Overview</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('faculty')} className="hover:text-[#ffbe3b] transition-colors flex items-center gap-1">
                  <span>Faculty & Leadership</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('calendar')} className="hover:text-[#ffbe3b] transition-colors flex items-center gap-1">
                  <span>Academic Calendar</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('admissions')} className="hover:text-[#ffbe3b] transition-colors flex items-center gap-1 font-semibold text-white">
                  <span>Admissions & Express Enrollment</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('student-portal')} className="hover:text-[#ffbe3b] transition-colors flex items-center gap-1 text-[#ffbe3b]">
                  <span>Student Portal Access</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-[#ffbe3b] font-bold text-sm tracking-wider uppercase">
              Contact Info
            </h4>
            <ul className="space-y-3 text-sm text-white/80">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#ffbe3b] shrink-0 mt-0.5" />
                <span>{SCHOOL_INFO.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#ffbe3b] shrink-0" />
                <span>{SCHOOL_INFO.postal}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#ffbe3b] shrink-0" />
                <a href={`tel:${SCHOOL_INFO.phoneRaw}`} className="hover:text-[#ffbe3b] transition-colors">
                  {SCHOOL_INFO.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#ffbe3b] shrink-0" />
                <a href={`mailto:${SCHOOL_INFO.email}`} className="hover:text-[#ffbe3b] transition-colors break-all">
                  {SCHOOL_INFO.email}
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center text-xs text-white/60 gap-4">
          <p>© 2026 Legacy Private Secondary School. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Terms of Admissions</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Nasenga, Mangochi</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
