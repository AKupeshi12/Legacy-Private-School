import React, { useState } from 'react';
import { FACULTY_MEMBERS, SCHOOL_INFO } from '../data/schoolData';
import { FacultyMember } from '../types';
import { Phone, Mail, Send, X, CheckCircle2, MessageCircle, User } from 'lucide-react';

export const FacultyPage: React.FC = () => {
  const [selectedFaculty, setSelectedFaculty] = useState<FacultyMember | null>(null);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactMessage, setContactMessage] = useState('');
  const [senderName, setSenderName] = useState('');
  const [senderPhone, setSenderPhone] = useState('');

  const leadershipMembers = FACULTY_MEMBERS.filter((m) => m.department === 'leadership');
  const scienceMembers = FACULTY_MEMBERS.filter((m) => m.department === 'sciences');
  const humanitiesMembers = FACULTY_MEMBERS.filter((m) => m.department === 'humanities');
  const sportsMembers = FACULTY_MEMBERS.filter((m) => m.department === 'sports');

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
  };

  const handleCloseModal = () => {
    setSelectedFaculty(null);
    setContactSubmitted(false);
    setContactMessage('');
    setSenderName('');
    setSenderPhone('');
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Page Header */}
      <div className="max-w-2xl space-y-3">
        <h1 className="text-3xl sm:text-5xl font-black text-[#000b20] tracking-tight font-display">
          Faculty & Leadership
        </h1>
        <p className="text-base sm:text-lg text-[#44474d] leading-relaxed">
          Meet the dedicated educators and professionals shaping the legacy of our students. Our faculty combines rigorous academic standards with a commitment to holistic student development.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Sidebar (Academic Enquiries & Department Nav) */}
        <aside className="lg:col-span-3 space-y-6">
          
          {/* General Academic Enquiries Card */}
          <div className="bg-white border border-[#c4c6ce] rounded-xl p-6 shadow-xs space-y-4">
            <h3 className="text-lg font-bold text-[#000b20]">Academic Enquiries</h3>
            <div className="space-y-3 text-sm text-[#44474d]">
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#7c5800] shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-[#000b20]">Main Office</p>
                  <p>{SCHOOL_INFO.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#7c5800] shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-[#000b20]">Email</p>
                  <a
                    href={`mailto:${SCHOOL_INFO.email}`}
                    className="hover:text-[#7c5800] transition-colors break-all"
                  >
                    {SCHOOL_INFO.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Department Navigation Links */}
          <div className="bg-[#f0f3ff] border border-[#c4c6ce] rounded-xl p-5 space-y-3 hidden lg:block sticky top-24">
            <h4 className="text-xs font-bold text-[#74777e] uppercase tracking-wider border-b border-[#c4c6ce] pb-2">
              Departments
            </h4>
            <ul className="space-y-1.5 text-sm font-semibold">
              <li>
                <a
                  href="#leadership"
                  className="block text-[#000b20] hover:text-[#7c5800] hover:bg-white px-3 py-2 rounded transition-colors"
                >
                  School Leadership
                </a>
              </li>
              <li>
                <a
                  href="#sciences"
                  className="block text-[#44474d] hover:text-[#7c5800] hover:bg-white px-3 py-2 rounded transition-colors"
                >
                  Sciences & Mathematics
                </a>
              </li>
              <li>
                <a
                  href="#humanities"
                  className="block text-[#44474d] hover:text-[#7c5800] hover:bg-white px-3 py-2 rounded transition-colors"
                >
                  Humanities & Arts
                </a>
              </li>
              <li>
                <a
                  href="#sports"
                  className="block text-[#44474d] hover:text-[#7c5800] hover:bg-white px-3 py-2 rounded transition-colors"
                >
                  Sports & Life Skills
                </a>
              </li>
            </ul>
          </div>

        </aside>

        {/* Faculty Grid Content */}
        <div className="lg:col-span-9 space-y-12">
          
          {/* Section: School Leadership */}
          <section id="leadership" className="space-y-6">
            <h2 className="text-2xl font-bold text-[#000b20] border-b border-[#c4c6ce] pb-3">
              School Leadership
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {leadershipMembers.map((member) => (
                <FacultyCard key={member.id} member={member} onContact={setSelectedFaculty} />
              ))}
            </div>
          </section>

          {/* Section: Sciences & Mathematics */}
          <section id="sciences" className="space-y-6">
            <h2 className="text-2xl font-bold text-[#000b20] border-b border-[#c4c6ce] pb-3">
              Sciences & Mathematics
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {scienceMembers.map((member) => (
                <FacultyCard key={member.id} member={member} onContact={setSelectedFaculty} />
              ))}
            </div>
          </section>

          {/* Section: Humanities & Arts */}
          <section id="humanities" className="space-y-6">
            <h2 className="text-2xl font-bold text-[#000b20] border-b border-[#c4c6ce] pb-3">
              Humanities & Arts
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {humanitiesMembers.map((member) => (
                <FacultyCard key={member.id} member={member} onContact={setSelectedFaculty} />
              ))}
            </div>
          </section>

          {/* Section: Sports & Life Skills */}
          <section id="sports" className="space-y-6">
            <h2 className="text-2xl font-bold text-[#000b20] border-b border-[#c4c6ce] pb-3">
              Sports & Life Skills
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sportsMembers.map((member) => (
                <FacultyCard key={member.id} member={member} onContact={setSelectedFaculty} />
              ))}
            </div>
          </section>

        </div>

      </div>

      {/* Direct Faculty Contact Modal */}
      {selectedFaculty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl overflow-hidden border border-[#000b20]/10">
            
            <div className="bg-[#000b20] text-white p-5 flex justify-between items-center border-b border-[#ffbe3b]/30">
              <div>
                <h3 className="font-bold text-lg text-white">Contact {selectedFaculty.name}</h3>
                <p className="text-xs text-[#ffbe3b]">{selectedFaculty.title} • {selectedFaculty.departmentName}</p>
              </div>
              <button onClick={handleCloseModal} className="p-1 text-white/70 hover:text-white rounded">
                <X className="w-5 h-5" />
              </button>
            </div>

            {contactSubmitted ? (
              <div className="p-8 text-center space-y-4">
                <div className="w-14 h-14 bg-[#e7eeff] text-[#7c5800] rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-[#000b20]">Message Sent!</h4>
                <p className="text-xs text-[#44474d]">
                  Your enquiry has been dispatched to {selectedFaculty.name}&apos;s department inbox. You will receive a response via email or WhatsApp shortly.
                </p>
                <button
                  onClick={handleCloseModal}
                  className="bg-[#000b20] text-white font-bold px-5 py-2 rounded text-xs hover:bg-[#0d223f]"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleSendEmail} className="p-6 space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-[#000b20] mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Parent / Guardian Name"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    className="w-full bg-white border border-[#c4c6ce] rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#7c5800] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#000b20] mb-1">Phone Number / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+265 999 000 000"
                    value={senderPhone}
                    onChange={(e) => setSenderPhone(e.target.value)}
                    className="w-full bg-white border border-[#c4c6ce] rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#7c5800] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#000b20] mb-1">Message / Academic Query *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder={`Hello ${selectedFaculty.name}, I would like to inquire about...`}
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    className="w-full bg-white border border-[#c4c6ce] rounded-lg p-3 focus:ring-2 focus:ring-[#7c5800] focus:outline-none"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-4 py-2 border border-[#c4c6ce] rounded font-semibold text-[#111c2c]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#ffbe3b] text-[#000b20] font-bold rounded hover:bg-[#ffbe3b]/90 flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message</span>
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};

interface FacultyCardProps {
  member: FacultyMember;
  onContact: (member: FacultyMember) => void;
}

const FacultyCard: React.FC<FacultyCardProps> = ({ member, onContact }) => {
  return (
    <div className="group bg-white border border-[#000b20]/10 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full">
      <div className="relative aspect-4/5 w-full bg-[#d8e3fa] overflow-hidden">
        <img
          src={member.image}
          alt={member.name}
          className="object-cover w-full h-64 group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#000b20]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-4 bg-white flex flex-col flex-grow justify-between space-y-3">
        <div>
          <h3 className="text-lg font-bold text-[#000b20] group-hover:text-[#7c5800] transition-colors">
            {member.name}
          </h3>
          <p className="text-xs font-semibold text-[#7c5800] mb-1">
            {member.title}
          </p>
          <p className="text-xs text-[#44474d] line-clamp-2">
            {member.qualifications}. {member.bio}
          </p>
        </div>

        <div className="pt-2 border-t border-[#f0f3ff]">
          <button
            onClick={() => onContact(member)}
            className="inline-flex items-center gap-1 text-xs font-bold text-[#778aac] hover:text-[#000b20] transition-colors"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Contact {member.name.split(' ')[0]}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
