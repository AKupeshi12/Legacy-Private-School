import React, { useState } from 'react';
import { SCHOOL_INFO } from '../data/schoolData';
import { Calendar, Clock, MapPin, CheckCircle2, X, User, Phone, Mail, Users } from 'lucide-react';

interface RSVPModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RSVPModal: React.FC<RSVPModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    attendeesCount: '2',
    interestedForm: 'Form 1',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-xl rounded-xl shadow-2xl overflow-hidden border border-[#000b20]/10">
        
        {/* Header */}
        <div className="bg-[#000b20] text-white p-6 relative border-b border-[#ffbe3b]/30">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="inline-block bg-[#ffbe3b] text-[#000b20] font-bold text-xs px-2.5 py-0.5 rounded mb-2">
            Inaugural Event
          </div>
          <h3 className="text-xl font-extrabold text-white">
            RSVP for Grand Opening Day
          </h3>
          <p className="text-xs text-white/80 mt-1">
            Legacy Private Secondary School • {SCHOOL_INFO.openingDateDisplay}
          </p>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-[#e7eeff] text-[#7c5800] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-xl font-bold text-[#000b20]">RSVP Reservation Confirmed!</h4>
            <p className="text-sm text-[#44474d] max-w-md mx-auto">
              Thank you, <span className="font-semibold text-[#000b20]">{formData.name}</span>. We look forward to welcoming you and your family to the campus opening ceremony on{' '}
              <span className="font-semibold">{SCHOOL_INFO.openingDateDisplay} at 09:00 AM</span>.
            </p>
            <div className="bg-[#f0f3ff] p-4 rounded-lg text-xs text-[#000b20] text-left space-y-1 max-w-md mx-auto border border-[#c4c6ce]">
              <p><strong className="text-[#000b20]">Location:</strong> {SCHOOL_INFO.address}</p>
              <p><strong className="text-[#000b20]">Attendees Reserved:</strong> {formData.attendeesCount} Persons</p>
              <p><strong className="text-[#000b20]">Contact Phone:</strong> {formData.phone}</p>
            </div>
            <div className="pt-2">
              <button
                onClick={handleReset}
                className="bg-[#000b20] text-white font-bold px-6 py-2.5 rounded-lg text-sm hover:bg-[#0d223f] transition-colors"
              >
                Close & Return
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            
            <div className="bg-[#f0f3ff] p-3.5 rounded-lg border border-[#c4c6ce] text-xs space-y-1.5 text-[#111c2c]">
              <div className="flex items-center gap-2 font-bold text-[#000b20]">
                <Calendar className="w-4 h-4 text-[#7c5800]" />
                <span>Date: {SCHOOL_INFO.openingDateDisplay}</span>
              </div>
              <div className="flex items-center gap-2 font-medium">
                <Clock className="w-4 h-4 text-[#7c5800]" />
                <span>Time: 09:00 AM - 14:00 PM</span>
              </div>
              <div className="flex items-center gap-2 font-medium">
                <MapPin className="w-4 h-4 text-[#7c5800]" />
                <span>Location: {SCHOOL_INFO.address}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-[#000b20] mb-1">Full Name *</label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-2.5 text-[#74777e]" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mr. James Phiri"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white border border-[#c4c6ce] rounded-lg pl-9 pr-3 py-2 text-xs focus:ring-2 focus:ring-[#7c5800] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#000b20] mb-1">Phone Number / WhatsApp *</label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3 top-2.5 text-[#74777e]" />
                  <input
                    type="tel"
                    required
                    placeholder="+265 999 000 000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white border border-[#c4c6ce] rounded-lg pl-9 pr-3 py-2 text-xs focus:ring-2 focus:ring-[#7c5800] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#000b20] mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-2.5 text-[#74777e]" />
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white border border-[#c4c6ce] rounded-lg pl-9 pr-3 py-2 text-xs focus:ring-2 focus:ring-[#7c5800] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#000b20] mb-1">Number of Guests</label>
                <div className="relative">
                  <Users className="w-4 h-4 absolute left-3 top-2.5 text-[#74777e]" />
                  <select
                    value={formData.attendeesCount}
                    onChange={(e) => setFormData({ ...formData, attendeesCount: e.target.value })}
                    className="w-full bg-white border border-[#c4c6ce] rounded-lg pl-9 pr-3 py-2 text-xs focus:ring-2 focus:ring-[#7c5800] focus:outline-none"
                  >
                    <option value="1">1 Person</option>
                    <option value="2">2 Persons</option>
                    <option value="3">3 Persons</option>
                    <option value="4">4+ Persons</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="block font-bold text-[#000b20] mb-1">Interested Grade / Form for Enrollment</label>
              <select
                value={formData.interestedForm}
                onChange={(e) => setFormData({ ...formData, interestedForm: e.target.value })}
                className="w-full bg-white border border-[#c4c6ce] rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-[#7c5800] focus:outline-none"
              >
                <option value="Form 1">Form 1 (New Entry)</option>
                <option value="Form 2">Form 2 Transfer</option>
                <option value="Form 3">Form 3 Transfer</option>
                <option value="Form 4">Form 4 Transfer</option>
                <option value="General Information">General Inquirer / Community Member</option>
              </select>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-[#c4c6ce] text-[#111c2c] rounded-lg text-xs font-semibold hover:bg-[#f0f3ff]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-[#ffbe3b] text-[#000b20] font-bold rounded-lg text-xs hover:bg-[#ffbe3b]/90 transition-colors shadow-xs"
              >
                Confirm RSVP
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
