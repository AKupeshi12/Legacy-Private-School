import React, { useState, useEffect } from 'react';
import { SCHOOL_INFO } from '../data/schoolData';
import { PageType } from '../types';
import { BookOpen, ShieldCheck, Award, MapPin, Mail, ArrowRight, Calendar, Sparkles, Phone, MessageCircle, Clock, CheckCircle2, DollarSign } from 'lucide-react';
import { motion } from 'motion/react';

interface HomePageProps {
  onNavigate: (page: PageType) => void;
  onOpenRSVP: () => void;
}

// Background images of happy, smiling secondary school students
const STUDENT_BG_IMAGES = [
  'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDzKJpH55iZt3xJjtwf7qOqs6jetcBoqBlN6xV4h3DNbnCCSvASJnxitTkfnHz6sdiCmAKu_g3VTzo6alnXnUtjsz8yOPVg1MqNwpMuBB3ObYftlM9GN3qwXZ-Ildm_ONooQaqN9m1Md_YV4FJuq5pyyqqR_bQtuqchwlZmNee9tXU54pmn3cF4rn6XaGNPADoi1TEbePSibIqLeLknDPrBiacXaJhQRsU57nLb112h2-UprmXZVXDoYQ',
  'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80',
];

// Custom typewriter hook
const useTypewriter = (phrases: string[], speed = 90, pause = 2200) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (index >= phrases.length) return;

    if (subIndex === phrases[index].length + 1 && !reverse) {
      const timeout = setTimeout(() => {
        setReverse(true);
      }, pause);
      return () => clearTimeout(timeout);
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % phrases.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? speed / 2 : speed);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, phrases, speed, pause]);

  return phrases[index].substring(0, subIndex);
};

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenRSVP }) => {
  const whatsappUrl = `https://wa.me/${SCHOOL_INFO.whatsappNumber}?text=${encodeURIComponent(
    'Hello Legacy Private School, I am interested in applying for Form 1-4 admissions for the upcoming term.'
  )}`;

  const typedTitle = useTypewriter([
    'Building Leaders For Tomorrow',
    'Igniting Minds & Character',
    'Fostering Academic Excellence',
    'Shaping Future Champions',
  ]);

  return (
    <div className="space-y-16 pb-16">
      
      {/* HERO SECTION */}
      <section className="relative min-h-[580px] lg:min-h-[640px] flex items-center bg-[#000b20] overflow-hidden">
        
        {/* Continuous Scrolling Background Image Banner of Happy Students */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-65 sm:opacity-75">
          <div className="animate-bg-scroll h-full flex">
            {[...STUDENT_BG_IMAGES, ...STUDENT_BG_IMAGES].map((imgUrl, idx) => (
              <div 
                key={idx} 
                className="h-full w-[400px] sm:w-[550px] shrink-0 bg-cover bg-center border-r-2 border-[#ffbe3b]/20 filter brightness-95 contrast-105"
                style={{ backgroundImage: `url('${imgUrl}')` }}
              />
            ))}
          </div>
        </div>

        {/* Gradient Overlay for Readable Typography and Rich Contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#000b20] via-[#000b20]/85 to-[#000b20]/40 pointer-events-none" />

        <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content Column */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6 text-white text-center lg:text-left"
            >
              
              {/* Floating Animated Registrations Badge */}
              <div className="inline-flex items-center gap-2 bg-[#ffbe3b] text-[#000b20] font-extrabold text-xs uppercase tracking-wider px-4 py-2 rounded-full shadow-lg animate-float-slow">
                <Sparkles className="w-4 h-4 animate-spin-slow" />
                <span>Registrations Are Open!</span>
              </div>

              {/* H1 WITH TYPING MOTION */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight font-display min-h-[100px] sm:min-h-[140px] flex items-center justify-center lg:justify-start">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-[#ffbe3b]">
                  {typedTitle}
                </span>
                <span className="inline-block w-1.5 h-8 sm:h-12 bg-[#ffbe3b] ml-1.5 animate-typing-cursor rounded-full shadow-md" />
              </h1>

              <p className="text-base sm:text-lg text-white/90 max-w-xl mx-auto lg:mx-0 leading-relaxed font-body">
                Join a legacy of excellence. We are dedicated to igniting minds and shaping the legacy of our future leaders through rigorous academics, discipline, and strong character development.
              </p>

              {/* ANIMATED HERO BUTTONS */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onNavigate('admissions')}
                  className="group bg-[#ffbe3b] text-[#000b20] hover:bg-[#ffc95e] font-black text-sm px-8 py-4 rounded-xl shadow-xl transition-all flex items-center gap-2 animate-btn-glow cursor-pointer"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onNavigate('faculty')}
                  className="group border-2 border-white/40 text-white hover:bg-white/15 hover:border-white font-bold text-sm px-7 py-4 rounded-xl transition-all backdrop-blur-xs cursor-pointer flex items-center gap-2"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                </motion.button>
              </div>
            </motion.div>

            {/* Right Admissions Fee Card Overlay */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-5"
            >
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-2xl border border-white/30 text-[#111c2c] space-y-6 hover:shadow-[#ffbe3b]/10 transition-shadow">
                
                <div className="border-b border-[#c4c6ce] pb-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-2xl font-black text-[#000b20]">Admissions Open</h3>
                    <span className="bg-[#e7eeff] text-[#000b20] font-bold text-xs px-2.5 py-1 rounded">
                      2026/2027
                    </span>
                  </div>
                  <p className="text-xs text-[#44474d] mt-1 flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#7c5800]" />
                    <span>Classes Form 1 - 4</span>
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-[#74777e] font-bold block">
                      TERM FEES
                    </span>
                    <span className="text-2xl sm:text-3xl font-black text-[#000b20]">
                      MWK 130,000.00
                    </span>
                  </div>

                  <div>
                    <span className="text-xs uppercase tracking-wider text-[#74777e] font-bold block">
                      REGISTRATION FEE
                    </span>
                    <span className="text-base font-bold text-[#7c5800]">
                      MWK 10,000.00
                    </span>
                  </div>

                  <div className="bg-[#f0f3ff] p-4 rounded-lg border border-[#c4c6ce] flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-[#7c5800] shrink-0" />
                    <div>
                      <span className="text-[11px] text-[#74777e] font-semibold block uppercase">
                        Opening Day
                      </span>
                      <span className="text-sm font-bold text-[#000b20]">
                        {SCHOOL_INFO.openingDateDisplay}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 space-y-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onNavigate('admissions')}
                    className="group w-full bg-[#000b20] text-[#ffbe3b] hover:bg-[#0d223f] font-bold py-3.5 rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                  >
                    <span>Start Express Application</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.button>

                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3 rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Ask Admission Office on WhatsApp</span>
                  </motion.a>
                </div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* WHY CHOOSE LEGACY? (Matches Screenshot Grid) */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#000b20]">
            Why Choose Legacy?
          </h2>
          <p className="text-base text-[#44474d] leading-relaxed">
            Our holistic approach ensures students are prepared not just for exams, but for life&apos;s challenges.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Quality Education Card */}
          <div className="bg-white border border-[#c4c6ce]/60 rounded-xl p-8 hover:shadow-lg transition-all space-y-4">
            <div className="w-12 h-12 bg-[#e7eeff] text-[#000b20] rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#000b20]">
              Quality Education
            </h3>
            <p className="text-sm text-[#44474d] leading-relaxed">
              Rigorous curriculum designed to challenge and inspire students to achieve their highest academic potential.
            </p>
          </div>

          {/* Discipline Card */}
          <div className="bg-white border border-[#c4c6ce]/60 rounded-xl p-8 hover:shadow-lg transition-all space-y-4">
            <div className="w-12 h-12 bg-[#ffdea8] text-[#7c5800] rounded-lg flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#000b20]">
              Discipline
            </h3>
            <p className="text-sm text-[#44474d] leading-relaxed">
              Fostering a structured environment that builds respect, responsibility, and strong personal habits.
            </p>
          </div>

          {/* Character & Success Card */}
          <div className="bg-white border border-[#c4c6ce]/60 rounded-xl p-8 hover:shadow-lg transition-all space-y-4">
            <div className="w-12 h-12 bg-[#e7eeff] text-[#000b20] rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#000b20]">
              Character & Success
            </h3>
            <p className="text-sm text-[#44474d] leading-relaxed">
              We believe true success is rooted in strong moral character, leadership skills, and community engagement.
            </p>
          </div>

        </div>
      </section>

      {/* QUICK LAUNCH BANNER CTA */}
      <section className="bg-[#000b20] text-white py-12">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[#ffbe3b] font-extrabold text-xs tracking-wider uppercase">
              Grand Launch Date Announced
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold">
              Grand Opening Day: 14 September 2026
            </h3>
            <p className="text-sm text-white/80 max-w-xl">
              Be part of history! Join our inaugural assembly, campus tours, and ribbon-cutting ceremony.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={onOpenRSVP}
              className="bg-[#ffbe3b] text-[#000b20] hover:bg-[#ffbe3b]/90 font-bold px-6 py-3 rounded text-sm transition-colors shadow-md"
            >
              RSVP For Ceremony
            </button>
            <button
              onClick={() => onNavigate('admissions')}
              className="bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 rounded text-sm transition-colors border border-white/20"
            >
              Enroll Learner
            </button>
          </div>
        </div>
      </section>

      {/* FIND US HERE SECTION (Matches Screenshot) */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Location Info */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-3xl font-extrabold text-[#000b20]">
              Find Us Here
            </h2>

            <div className="space-y-4 text-sm text-[#44474d]">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-[#e7eeff] text-[#000b20] rounded shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-[#000b20]">Campus Location</h4>
                  <p>{SCHOOL_INFO.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-[#ffdea8] text-[#7c5800] rounded shrink-0 mt-0.5">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-[#000b20]">Postal Address</h4>
                  <p>{SCHOOL_INFO.postal}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-[#e7eeff] text-[#000b20] rounded shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-[#000b20]">Inquiries & Direct Call</h4>
                  <p>{SCHOOL_INFO.phone}</p>
                  <p className="text-xs text-[#74777e]">{SCHOOL_INFO.email}</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('admissions')}
                className="inline-flex items-center gap-2 font-bold text-[#7c5800] hover:text-[#000b20] text-sm transition-colors"
              >
                <span>Contact Admissions Office</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Visual Location Map Frame */}
          <div className="lg:col-span-7 bg-white p-3 rounded-xl border border-[#c4c6ce] shadow-md">
            <div className="relative rounded-lg overflow-hidden bg-[#e7eeff] aspect-video border border-[#c4c6ce]/50 flex flex-col items-center justify-center p-6 text-center">
              {/* Styled Mock Map Representation corresponding to Mangochi / Lake Malawi / Monkey Bay Road */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#000b20_1px,transparent_1px)] [background-size:16px_16px]" />
              <div className="relative z-10 space-y-3">
                <div className="w-14 h-14 bg-[#000b20] text-[#ffbe3b] rounded-full flex items-center justify-center mx-auto shadow-lg ring-4 ring-white">
                  <MapPin className="w-7 h-7" />
                </div>
                <h4 className="text-lg font-black text-[#000b20]">NASENGA CAMPUS</h4>
                <p className="text-xs text-[#44474d] max-w-sm mx-auto font-medium">
                  Located along Monkey Bay Road (S35), Mangochi District, Malawi. Convenient transportation access for day students & full boarders.
                </p>
                <a
                  href={`https://maps.google.com/?q=Mangochi+Monkey+Bay+Road+Malawi`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-[#000b20] text-white text-xs font-bold px-4 py-2 rounded hover:bg-[#0d223f] transition-colors"
                >
                  <span>Open in Google Maps</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
