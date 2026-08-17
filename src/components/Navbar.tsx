import React, { useState } from 'react';
import { PageType } from '../types';
import { SCHOOL_INFO } from '../data/schoolData';
import { ArrowRight, Menu, X, GraduationCap, ShieldCheck, UserCheck } from 'lucide-react';

interface NavbarProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: PageType; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'faculty', label: 'Faculty' },
    { id: 'calendar', label: 'Calendar' },
    { id: 'admissions', label: 'Admissions' },
  ];

  const handleNavClick = (page: PageType) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 bg-[#f9f9ff] border-b border-[#c4c6ce] shadow-xs">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex justify-between items-center">
        
        {/* Brand Logo & Name */}
        <div 
          onClick={() => handleNavClick('home')}
          className="cursor-pointer flex items-center gap-3 group"
        >
          <div className="w-10 h-10 rounded-lg bg-[#000b20] text-[#ffbe3b] flex items-center justify-center font-black text-xl border border-[#7c5800]/40 group-hover:bg-[#0d223f] transition-colors shadow-xs">
            L
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-black text-[#000b20] tracking-tight block font-display leading-tight">
              LEGACY PRIVATE SCHOOL
            </span>
            <span className="text-[11px] uppercase tracking-wider text-[#7c5800] font-semibold hidden sm:block">
              Secondary Education Excellence
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 font-semibold text-sm">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`py-1 transition-colors relative ${
                  isActive
                    ? 'text-[#7c5800] font-bold border-b-2 border-[#7c5800]'
                    : 'text-[#44474d] hover:text-[#000b20]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Student Portal CTA Button */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => handleNavClick('student-portal')}
            className={`px-5 py-2.5 rounded font-semibold text-sm flex items-center gap-2 transition-all shadow-sm ${
              currentPage === 'student-portal'
                ? 'bg-[#000b20] text-[#ffbe3b] ring-2 ring-[#7c5800]'
                : 'bg-[#ffbe3b] text-[#000b20] hover:bg-[#ffbe3b]/90 hover:shadow'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>Student Portal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#000b20] hover:bg-[#e7eeff] rounded-md transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#f9f9ff] border-b border-[#c4c6ce] px-4 pt-3 pb-6 space-y-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`block w-full text-left px-4 py-2.5 rounded-lg text-base font-semibold transition-colors ${
                currentPage === item.id
                  ? 'bg-[#e7eeff] text-[#7c5800] font-bold'
                  : 'text-[#111c2c] hover:bg-[#f0f3ff]'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-[#c4c6ce]">
            <button
              onClick={() => handleNavClick('student-portal')}
              className="w-full bg-[#ffbe3b] text-[#000b20] font-bold px-4 py-3 rounded-lg flex items-center justify-center gap-2 shadow-sm"
            >
              <UserCheck className="w-5 h-5" />
              <span>Student Portal</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
