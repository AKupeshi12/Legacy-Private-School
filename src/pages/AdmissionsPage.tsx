import React, { useState } from 'react';
import { SCHOOL_INFO, INITIAL_APPLICATIONS } from '../data/schoolData';
import { LearnerApplication } from '../types';
import { 
  User, FileText, CheckCircle2, Clock, Upload, Calculator, ShieldCheck, 
  Search, ArrowRight, Printer, Copy, MessageCircle, AlertCircle, RefreshCw, 
  Plus, Sparkles, Phone, Mail, MapPin, ExternalLink, Filter, Check, Eye
} from 'lucide-react';

export const AdmissionsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'apply' | 'track' | 'admin'>('apply');
  const [applications, setApplications] = useState<LearnerApplication[]>(INITIAL_APPLICATIONS);

  // Form State
  const [step, setStep] = useState(1);
  const [submittedApp, setSubmittedApp] = useState<LearnerApplication | null>(null);

  const [formData, setFormData] = useState({
    learnerName: '',
    dateOfBirth: '2012-05-10',
    gender: 'Male' as 'Male' | 'Female',
    applyingForForm: 'Form 1' as 'Form 1' | 'Form 2' | 'Form 3' | 'Form 4',
    previousSchool: '',
    pslceGradeOrAggregate: '',

    parentName: '',
    relationship: 'Father' as 'Father' | 'Mother' | 'Guardian',
    parentPhone: '',
    parentWhatsapp: '',
    parentEmail: '',
    residentialAddress: 'Mangochi',

    boardingType: 'Day Student' as 'Day Student' | 'Full Boarder',
    extraUniformSets: 0,

    resultSlipName: '',
    birthCertName: '',
    photoName: '',
    agreeTerms: false,
  });

  // Lookup State
  const [searchQuery, setSearchQuery] = useState('');
  const [trackedApp, setTrackedApp] = useState<LearnerApplication | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Admin filter & notes state
  const [adminFilterForm, setAdminFilterForm] = useState<string>('All');
  const [adminSelectedApp, setAdminSelectedApp] = useState<LearnerApplication | null>(null);
  const [copiedSuccess, setCopiedSuccess] = useState(false);

  // Calculate fees in real-time
  const termFee = SCHOOL_INFO.fees.termFeeMWK;
  const registrationFee = SCHOOL_INFO.fees.registrationFeeMWK;
  const boardingFee = formData.boardingType === 'Full Boarder' ? SCHOOL_INFO.fees.boardingFeeMWK : 0;
  const uniformFee = formData.extraUniformSets * SCHOOL_INFO.fees.uniformSetMWK;
  const totalFeeMWK = termFee + registrationFee + boardingFee + uniformFee;

  const handleNextStep = () => {
    if (step < 5) setStep(step + 1);
  };

  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleFileUploadSim = (field: 'resultSlipName' | 'birthCertName' | 'photoName', name: string) => {
    setFormData((prev) => ({ ...prev, [field]: name }));
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newRefId = `LEG-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newApp: LearnerApplication = {
      id: newRefId,
      submittedAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
      learnerName: formData.learnerName,
      dateOfBirth: formData.dateOfBirth,
      gender: formData.gender,
      applyingForForm: formData.applyingForForm,
      previousSchool: formData.previousSchool || 'Primary School',
      pslceGradeOrAggregate: formData.pslceGradeOrAggregate || 'Passed',
      parentName: formData.parentName,
      relationship: formData.relationship,
      parentPhone: formData.parentPhone,
      parentWhatsapp: formData.parentWhatsapp || formData.parentPhone,
      parentEmail: formData.parentEmail,
      residentialAddress: formData.residentialAddress,
      boardingType: formData.boardingType,
      extraUniformSets: formData.extraUniformSets,
      uploadedDocs: {
        resultSlipName: formData.resultSlipName || 'Result_Slip.pdf',
        birthCertName: formData.birthCertName || 'Birth_Certificate.pdf',
        photoName: formData.photoName || 'Learner_Passport_Photo.jpg',
      },
      termFee,
      registrationFee,
      boardingFee,
      totalFee: totalFeeMWK,
      status: 'Submitted',
      adminNotes: 'Swift application received via web portal.',
    };

    setApplications((prev) => [newApp, ...prev]);
    setSubmittedApp(newApp);
  };

  const handleTrackSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    const found = applications.find(
      (a) =>
        a.id.toLowerCase() === searchQuery.trim().toLowerCase() ||
        a.parentPhone.includes(searchQuery.trim()) ||
        a.learnerName.toLowerCase().includes(searchQuery.trim().toLowerCase())
    );
    setTrackedApp(found || null);
  };

  const handleAdminStatusChange = (appId: string, newStatus: LearnerApplication['status']) => {
    setApplications((prev) =>
      prev.map((a) => (a.id === appId ? { ...a, status: newStatus } : a))
    );
    if (adminSelectedApp && adminSelectedApp.id === appId) {
      setAdminSelectedApp((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  const copyWhatsappNotice = (app: LearnerApplication) => {
    const text = `Hello ${app.parentName}, this is Legacy Private Secondary School regarding ${app.learnerName}'s application (${app.id}). Status: ${app.status.toUpperCase()}. Total Term Fees: MWK ${app.totalFee.toLocaleString()}. Please contact +265 997 074 888 for next steps.`;
    navigator.clipboard.writeText(text);
    setCopiedSuccess(true);
    setTimeout(() => setCopiedSuccess(false), 2500);
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header Banner */}
      <div className="bg-[#000b20] text-white rounded-2xl p-8 sm:p-10 shadow-xl border border-[#ffbe3b]/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-[#ffbe3b] text-[#000b20] font-bold text-xs px-3 py-1 rounded">
            <Sparkles className="w-3.5 h-3.5" />
            Swift Application Processing Engine
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white font-display">
            Admissions & Learner Enrollment
          </h1>
          <p className="text-sm text-white/80 max-w-2xl leading-relaxed">
            Apply online in minutes, track your application status in real time, and receive instant digital confirmation slips.
          </p>
        </div>

        {/* Action Tabs Navigation */}
        <div className="flex bg-[#0d223f] p-1.5 rounded-xl border border-white/10 shrink-0 w-full md:w-auto">
          <button
            onClick={() => setActiveTab('apply')}
            className={`flex-1 md:flex-none px-4 py-2.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'apply'
                ? 'bg-[#ffbe3b] text-[#000b20] shadow-sm'
                : 'text-white/80 hover:text-white'
            }`}
          >
            Apply Now
          </button>
          <button
            onClick={() => setActiveTab('track')}
            className={`flex-1 md:flex-none px-4 py-2.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'track'
                ? 'bg-[#ffbe3b] text-[#000b20] shadow-sm'
                : 'text-white/80 hover:text-white'
            }`}
          >
            Track Status
          </button>
          <button
            onClick={() => setActiveTab('admin')}
            className={`flex-1 md:flex-none px-4 py-2.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'admin'
                ? 'bg-[#ffbe3b] text-[#000b20] shadow-sm'
                : 'text-white/80 hover:text-white'
            }`}
          >
            Admin Portal ({applications.length})
          </button>
        </div>
      </div>

      {/* TAB 1: APPLY NOW WIZARD */}
      {activeTab === 'apply' && (
        <div className="bg-white border border-[#c4c6ce] rounded-xl shadow-md overflow-hidden">
          
          {submittedApp ? (
            /* Submission Confirmation Card */
            <div className="p-8 sm:p-12 text-center space-y-6">
              <div className="w-20 h-20 bg-[#e7eeff] text-[#7c5800] rounded-full flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-12 h-12" />
              </div>

              <div className="space-y-2">
                <span className="bg-[#e7eeff] text-[#000b20] font-mono font-bold text-sm px-3 py-1 rounded">
                  Application Ref: {submittedApp.id}
                </span>
                <h2 className="text-3xl font-black text-[#000b20]">
                  Application Submitted Successfully!
                </h2>
                <p className="text-sm text-[#44474d] max-w-xl mx-auto leading-relaxed">
                  Thank you, <span className="font-bold text-[#000b20]">{submittedApp.parentName}</span>. Your application for <span className="font-bold text-[#000b20]">{submittedApp.learnerName}</span> ({submittedApp.applyingForForm}) has been recorded into our swift processing queue.
                </p>
              </div>

              {/* Instant Fee Breakdown & Digital Slip */}
              <div className="bg-[#f0f3ff] border border-[#c4c6ce] rounded-xl p-6 max-w-xl mx-auto text-left space-y-3">
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#000b20] border-b border-[#c4c6ce] pb-2">
                  Official Admission Summary Slip
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div><strong className="text-[#000b20]">Learner Name:</strong> {submittedApp.learnerName}</div>
                  <div><strong className="text-[#000b20]">Form Applying:</strong> {submittedApp.applyingForForm}</div>
                  <div><strong className="text-[#000b20]">Boarding Status:</strong> {submittedApp.boardingType}</div>
                  <div><strong className="text-[#000b20]">Parent Contact:</strong> {submittedApp.parentPhone}</div>
                  <div><strong className="text-[#000b20]">Total Fees:</strong> MWK {submittedApp.totalFee.toLocaleString()}</div>
                  <div><strong className="text-[#000b20]">Current Status:</strong> <span className="text-[#7c5800] font-bold">{submittedApp.status}</span></div>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-3 pt-4">
                <button
                  onClick={() => window.print()}
                  className="bg-[#000b20] text-white font-bold px-6 py-3 rounded-lg text-sm hover:bg-[#0d223f] flex items-center gap-2"
                >
                  <Printer className="w-4 h-4 text-[#ffbe3b]" />
                  <span>Print Official Slip</span>
                </button>

                <button
                  onClick={() => {
                    setSubmittedApp(null);
                    setStep(1);
                  }}
                  className="bg-[#ffbe3b] text-[#000b20] font-bold px-6 py-3 rounded-lg text-sm hover:bg-[#ffbe3b]/90"
                >
                  Submit Another Learner
                </button>
              </div>
            </div>
          ) : (
            <div>
              {/* Wizard Step Progress Bar */}
              <div className="bg-[#f0f3ff] border-b border-[#c4c6ce] p-4 sm:p-6 overflow-x-auto">
                <div className="flex items-center justify-between min-w-[600px] text-xs font-bold">
                  {[
                    { num: 1, title: 'Learner Details' },
                    { num: 2, title: 'Parent Contacts' },
                    { num: 3, title: 'Package & Fees' },
                    { num: 4, title: 'Upload Docs' },
                    { num: 5, title: 'Review & Submit' },
                  ].map((s) => (
                    <div key={s.num} className="flex items-center gap-2">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                          step === s.num
                            ? 'bg-[#000b20] text-[#ffbe3b] ring-2 ring-[#7c5800]'
                            : step > s.num
                            ? 'bg-[#e7eeff] text-[#7c5800]'
                            : 'bg-white text-[#74777e] border border-[#c4c6ce]'
                        }`}
                      >
                        {step > s.num ? <Check className="w-4 h-4" /> : s.num}
                      </div>
                      <span className={step === s.num ? 'text-[#000b20] font-extrabold' : 'text-[#74777e]'}>
                        {s.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Wizard Form Body */}
              <form onSubmit={handleFinalSubmit} className="p-6 sm:p-10 space-y-6">
                
                {/* STEP 1: Learner Info */}
                {step === 1 && (
                  <div className="space-y-6 animate-in fade-in">
                    <div>
                      <h3 className="text-xl font-bold text-[#000b20]">Step 1: Learner Basic Details</h3>
                      <p className="text-xs text-[#44474d]">Provide legal student details matching primary certificates.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <label className="block font-bold text-[#000b20] mb-1">Learner Full Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Tiwonge Banda"
                          value={formData.learnerName}
                          onChange={(e) => setFormData({ ...formData, learnerName: e.target.value })}
                          className="w-full bg-white border border-[#c4c6ce] rounded-lg p-2.5 focus:ring-2 focus:ring-[#7c5800] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-[#000b20] mb-1">Date of Birth *</label>
                        <input
                          type="date"
                          required
                          value={formData.dateOfBirth}
                          onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                          className="w-full bg-white border border-[#c4c6ce] rounded-lg p-2.5 focus:ring-2 focus:ring-[#7c5800] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-[#000b20] mb-1">Gender *</label>
                        <select
                          value={formData.gender}
                          onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                          className="w-full bg-white border border-[#c4c6ce] rounded-lg p-2.5 focus:ring-2 focus:ring-[#7c5800] focus:outline-none"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-bold text-[#000b20] mb-1">Applying For Form / Grade *</label>
                        <select
                          value={formData.applyingForForm}
                          onChange={(e) => setFormData({ ...formData, applyingForForm: e.target.value as any })}
                          className="w-full bg-white border border-[#c4c6ce] rounded-lg p-2.5 focus:ring-2 focus:ring-[#7c5800] focus:outline-none font-bold text-[#000b20]"
                        >
                          <option value="Form 1">Form 1 (New Secondary Entry)</option>
                          <option value="Form 2">Form 2 Transfer</option>
                          <option value="Form 3">Form 3 Transfer</option>
                          <option value="Form 4">Form 4 Transfer</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-bold text-[#000b20] mb-1">Previous Primary / Secondary School</label>
                        <input
                          type="text"
                          placeholder="e.g. Mangochi Primary School"
                          value={formData.previousSchool}
                          onChange={(e) => setFormData({ ...formData, previousSchool: e.target.value })}
                          className="w-full bg-white border border-[#c4c6ce] rounded-lg p-2.5 focus:ring-2 focus:ring-[#7c5800] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-[#000b20] mb-1">PSLCE Grade / Points or JCE Aggregate</label>
                        <input
                          type="text"
                          placeholder="e.g. Passed - 14 Points / A Grade"
                          value={formData.pslceGradeOrAggregate}
                          onChange={(e) => setFormData({ ...formData, pslceGradeOrAggregate: e.target.value })}
                          className="w-full bg-white border border-[#c4c6ce] rounded-lg p-2.5 focus:ring-2 focus:ring-[#7c5800] focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2: Parent Contacts */}
                {step === 2 && (
                  <div className="space-y-6 animate-in fade-in">
                    <div>
                      <h3 className="text-xl font-bold text-[#000b20]">Step 2: Parent / Guardian Details</h3>
                      <p className="text-xs text-[#44474d]">Required for SMS/WhatsApp notifications and billing statements.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <label className="block font-bold text-[#000b20] mb-1">Parent / Guardian Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Mrs. Agnes Banda"
                          value={formData.parentName}
                          onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                          className="w-full bg-white border border-[#c4c6ce] rounded-lg p-2.5 focus:ring-2 focus:ring-[#7c5800] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-[#000b20] mb-1">Relationship to Learner *</label>
                        <select
                          value={formData.relationship}
                          onChange={(e) => setFormData({ ...formData, relationship: e.target.value as any })}
                          className="w-full bg-white border border-[#c4c6ce] rounded-lg p-2.5 focus:ring-2 focus:ring-[#7c5800] focus:outline-none"
                        >
                          <option value="Father">Father</option>
                          <option value="Mother">Mother</option>
                          <option value="Guardian">Guardian</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-bold text-[#000b20] mb-1">Primary Phone Number *</label>
                        <input
                          type="tel"
                          required
                          placeholder="+265 888 123 456"
                          value={formData.parentPhone}
                          onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                          className="w-full bg-white border border-[#c4c6ce] rounded-lg p-2.5 focus:ring-2 focus:ring-[#7c5800] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-[#000b20] mb-1">WhatsApp Number</label>
                        <input
                          type="tel"
                          placeholder="265888123456"
                          value={formData.parentWhatsapp}
                          onChange={(e) => setFormData({ ...formData, parentWhatsapp: e.target.value })}
                          className="w-full bg-white border border-[#c4c6ce] rounded-lg p-2.5 focus:ring-2 focus:ring-[#7c5800] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-[#000b20] mb-1">Email Address</label>
                        <input
                          type="email"
                          placeholder="parent@example.com"
                          value={formData.parentEmail}
                          onChange={(e) => setFormData({ ...formData, parentEmail: e.target.value })}
                          className="w-full bg-white border border-[#c4c6ce] rounded-lg p-2.5 focus:ring-2 focus:ring-[#7c5800] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-[#000b20] mb-1">Residential Address</label>
                        <input
                          type="text"
                          placeholder="e.g. Nasenga, Mangochi"
                          value={formData.residentialAddress}
                          onChange={(e) => setFormData({ ...formData, residentialAddress: e.target.value })}
                          className="w-full bg-white border border-[#c4c6ce] rounded-lg p-2.5 focus:ring-2 focus:ring-[#7c5800] focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3: Package & Fees */}
                {step === 3 && (
                  <div className="space-y-6 animate-in fade-in">
                    <div>
                      <h3 className="text-xl font-bold text-[#000b20]">Step 3: Boarding Package & Fee Breakdown</h3>
                      <p className="text-xs text-[#44474d]">Configure student options with real-time fee calculation.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* Options Form */}
                      <div className="space-y-4 text-xs">
                        <div>
                          <label className="block font-bold text-[#000b20] mb-2">Student Residency Type *</label>
                          <div className="grid grid-cols-2 gap-3">
                            <button
                              type="button"
                              onClick={() => setFormData({ ...formData, boardingType: 'Day Student' })}
                              className={`p-4 rounded-lg border text-left transition-all ${
                                formData.boardingType === 'Day Student'
                                  ? 'bg-[#000b20] text-white border-[#000b20] ring-2 ring-[#7c5800]'
                                  : 'bg-white text-[#111c2c] border-[#c4c6ce]'
                              }`}
                            >
                              <div className="font-bold">Day Student</div>
                              <div className="text-[11px] opacity-80 mt-1">Daily attendance & lunch</div>
                            </button>

                            <button
                              type="button"
                              onClick={() => setFormData({ ...formData, boardingType: 'Full Boarder' })}
                              className={`p-4 rounded-lg border text-left transition-all ${
                                formData.boardingType === 'Full Boarder'
                                  ? 'bg-[#000b20] text-white border-[#000b20] ring-2 ring-[#7c5800]'
                                  : 'bg-white text-[#111c2c] border-[#c4c6ce]'
                              }`}
                            >
                              <div className="font-bold">Full Boarder</div>
                              <div className="text-[11px] opacity-80 mt-1">Hostel, meals & supervision</div>
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block font-bold text-[#000b20] mb-1">Additional Uniform Sets (Optional)</label>
                          <select
                            value={formData.extraUniformSets}
                            onChange={(e) => setFormData({ ...formData, extraUniformSets: parseInt(e.target.value) })}
                            className="w-full bg-white border border-[#c4c6ce] rounded-lg p-2.5 font-semibold text-[#000b20]"
                          >
                            <option value={0}>0 Sets (Standard issue included in tuition)</option>
                            <option value={1}>1 Additional Set (+MWK 25,000)</option>
                            <option value={2}>2 Additional Sets (+MWK 50,000)</option>
                          </select>
                        </div>
                      </div>

                      {/* Real-Time Fee Summary Box */}
                      <div className="bg-[#f0f3ff] border border-[#c4c6ce] rounded-xl p-6 space-y-4">
                        <h4 className="font-bold text-xs uppercase tracking-wider text-[#000b20] flex items-center gap-2 border-b border-[#c4c6ce] pb-2">
                          <Calculator className="w-4 h-4 text-[#7c5800]" />
                          <span>Estimated Term 1 Fee Invoice (MWK)</span>
                        </h4>

                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between py-1 border-b border-white">
                            <span>Base Term Tuition Fee:</span>
                            <span className="font-bold text-[#000b20]">MWK {termFee.toLocaleString()}</span>
                          </div>

                          <div className="flex justify-between py-1 border-b border-white">
                            <span>Registration Fee (One-off):</span>
                            <span className="font-bold text-[#000b20]">MWK {registrationFee.toLocaleString()}</span>
                          </div>

                          {formData.boardingType === 'Full Boarder' && (
                            <div className="flex justify-between py-1 border-b border-white text-[#7c5800]">
                              <span>Boarding Hostel & Meals:</span>
                              <span className="font-bold">MWK {boardingFee.toLocaleString()}</span>
                            </div>
                          )}

                          {formData.extraUniformSets > 0 && (
                            <div className="flex justify-between py-1 border-b border-white">
                              <span>Extra Uniform Sets ({formData.extraUniformSets}):</span>
                              <span className="font-bold">MWK {uniformFee.toLocaleString()}</span>
                            </div>
                          )}

                          <div className="flex justify-between py-3 font-extrabold text-base text-[#000b20] border-t-2 border-[#000b20]">
                            <span>TOTAL TERM INVOICE:</span>
                            <span className="text-[#000b20]">MWK {totalFeeMWK.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                )}

                {/* STEP 4: Upload Docs */}
                {step === 4 && (
                  <div className="space-y-6 animate-in fade-in">
                    <div>
                      <h3 className="text-xl font-bold text-[#000b20]">Step 4: Digital Document Attachment</h3>
                      <p className="text-xs text-[#44474d]">Attach primary certificates or result slips for swift verification.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                      
                      {/* Document Card 1 */}
                      <div className="border border-dashed border-[#c4c6ce] rounded-xl p-5 text-center bg-[#f9f9ff] space-y-3 hover:border-[#7c5800]">
                        <Upload className="w-8 h-8 text-[#7c5800] mx-auto" />
                        <div>
                          <p className="font-bold text-[#000b20]">PSLCE / Result Slip *</p>
                          <p className="text-[10px] text-[#74777e]">PDF, PNG, or JPG up to 5MB</p>
                        </div>
                        {formData.resultSlipName ? (
                          <div className="bg-[#e7eeff] text-[#000b20] font-bold py-1.5 px-2 rounded text-[11px] truncate">
                            ✓ {formData.resultSlipName}
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleFileUploadSim('resultSlipName', 'PSLCE_Slip_Learner.pdf')}
                            className="bg-[#000b20] text-white px-3 py-1.5 rounded text-xs font-bold"
                          >
                            Simulate Upload
                          </button>
                        )}
                      </div>

                      {/* Document Card 2 */}
                      <div className="border border-dashed border-[#c4c6ce] rounded-xl p-5 text-center bg-[#f9f9ff] space-y-3 hover:border-[#7c5800]">
                        <Upload className="w-8 h-8 text-[#7c5800] mx-auto" />
                        <div>
                          <p className="font-bold text-[#000b20]">Birth Certificate</p>
                          <p className="text-[10px] text-[#74777e]">PDF or scanned image</p>
                        </div>
                        {formData.birthCertName ? (
                          <div className="bg-[#e7eeff] text-[#000b20] font-bold py-1.5 px-2 rounded text-[11px] truncate">
                            ✓ {formData.birthCertName}
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleFileUploadSim('birthCertName', 'BirthCert_Learner.pdf')}
                            className="bg-[#000b20] text-white px-3 py-1.5 rounded text-xs font-bold"
                          >
                            Simulate Upload
                          </button>
                        )}
                      </div>

                      {/* Document Card 3 */}
                      <div className="border border-dashed border-[#c4c6ce] rounded-xl p-5 text-center bg-[#f9f9ff] space-y-3 hover:border-[#7c5800]">
                        <Upload className="w-8 h-8 text-[#7c5800] mx-auto" />
                        <div>
                          <p className="font-bold text-[#000b20]">Passport Photo</p>
                          <p className="text-[10px] text-[#74777e]">Learner headshot photo</p>
                        </div>
                        {formData.photoName ? (
                          <div className="bg-[#e7eeff] text-[#000b20] font-bold py-1.5 px-2 rounded text-[11px] truncate">
                            ✓ {formData.photoName}
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleFileUploadSim('photoName', 'Passport_Photo.jpg')}
                            className="bg-[#000b20] text-white px-3 py-1.5 rounded text-xs font-bold"
                          >
                            Simulate Upload
                          </button>
                        )}
                      </div>

                    </div>
                  </div>
                )}

                {/* STEP 5: Review & Terms */}
                {step === 5 && (
                  <div className="space-y-6 animate-in fade-in">
                    <div>
                      <h3 className="text-xl font-bold text-[#000b20]">Step 5: Review & Formal Declaration</h3>
                      <p className="text-xs text-[#44474d]">Verify all learner details before final submission.</p>
                    </div>

                    <div className="bg-[#f0f3ff] border border-[#c4c6ce] rounded-xl p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="text-[#74777e] block">Learner Name:</span>
                        <strong className="text-sm text-[#000b20]">{formData.learnerName || 'Not specified'}</strong>
                      </div>
                      <div>
                        <span className="text-[#74777e] block">Form Applying:</span>
                        <strong className="text-sm text-[#000b20]">{formData.applyingForForm}</strong>
                      </div>
                      <div>
                        <span className="text-[#74777e] block">Parent Contact:</span>
                        <strong className="text-[#000b20]">{formData.parentName} ({formData.parentPhone})</strong>
                      </div>
                      <div>
                        <span className="text-[#74777e] block">Residency & Boarding:</span>
                        <strong className="text-[#000b20]">{formData.boardingType}</strong>
                      </div>
                      <div>
                        <span className="text-[#74777e] block">Calculated Term Fee:</span>
                        <strong className="text-[#7c5800] text-sm">MWK {totalFeeMWK.toLocaleString()}</strong>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <input
                        type="checkbox"
                        id="terms"
                        required
                        checked={formData.agreeTerms}
                        onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                        className="w-4 h-4 text-[#7c5800] rounded focus:ring-[#7c5800]"
                      />
                      <label htmlFor="terms" className="text-xs text-[#111c2c] font-medium cursor-pointer">
                        I declare that the information provided is accurate and agree to Legacy Private Secondary School admissions guidelines.
                      </label>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center pt-6 border-t border-[#c4c6ce]">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="px-5 py-2.5 border border-[#c4c6ce] text-[#000b20] rounded-lg text-xs font-bold hover:bg-[#f0f3ff]"
                    >
                      Back
                    </button>
                  ) : <div />}

                  {step < 5 ? (
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="px-7 py-2.5 bg-[#000b20] text-[#ffbe3b] font-bold rounded-lg text-xs hover:bg-[#0d223f] transition-colors flex items-center gap-2"
                    >
                      <span>Continue to Step {step + 1}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={!formData.learnerName || !formData.agreeTerms}
                      className="px-8 py-3 bg-[#ffbe3b] text-[#000b20] font-black rounded-lg text-sm hover:bg-[#ffbe3b]/90 shadow-md transition-all disabled:opacity-50"
                    >
                      Submit Express Application
                    </button>
                  )}
                </div>

              </form>
            </div>
          )}

        </div>
      )}

      {/* TAB 2: TRACK STATUS */}
      {activeTab === 'track' && (
        <div className="bg-white border border-[#c4c6ce] rounded-xl p-8 shadow-md space-y-8">
          <div className="max-w-xl mx-auto text-center space-y-3">
            <h2 className="text-2xl font-bold text-[#000b20]">
              Track Learner Application Status
            </h2>
            <p className="text-xs text-[#44474d]">
              Enter your Application Ref (e.g., LEG-2026-1042) or registered parent phone number to check live processing progress.
            </p>

            <form onSubmit={handleTrackSearch} className="flex gap-2 pt-2">
              <div className="relative flex-grow">
                <Search className="w-4 h-4 absolute left-3 top-3 text-[#74777e]" />
                <input
                  type="text"
                  required
                  placeholder="e.g. LEG-2026-1042 or 0888123456"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-[#c4c6ce] rounded-lg pl-9 pr-3 py-2.5 text-xs text-[#111c2c] focus:ring-2 focus:ring-[#7c5800] focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="bg-[#000b20] text-[#ffbe3b] font-bold px-5 py-2.5 rounded-lg text-xs hover:bg-[#0d223f]"
              >
                Track Now
              </button>
            </form>
          </div>

          {/* Results Display */}
          {hasSearched && (
            <div className="max-w-2xl mx-auto pt-4">
              {trackedApp ? (
                <div className="bg-[#f0f3ff] border border-[#c4c6ce] rounded-xl p-6 space-y-6">
                  
                  <div className="flex justify-between items-start border-b border-[#c4c6ce] pb-4">
                    <div>
                      <span className="text-xs font-mono font-bold text-[#7c5800]">
                        Ref: {trackedApp.id}
                      </span>
                      <h3 className="text-xl font-bold text-[#000b20]">
                        {trackedApp.learnerName}
                      </h3>
                      <p className="text-xs text-[#44474d]">
                        Applying for: {trackedApp.applyingForForm} ({trackedApp.boardingType})
                      </p>
                    </div>
                    <span className="bg-[#ffbe3b] text-[#000b20] font-bold text-xs px-3 py-1 rounded-full">
                      {trackedApp.status}
                    </span>
                  </div>

                  {/* Progress Pipeline Visual */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-[#000b20] block">
                      Enrollment Progress Pipeline:
                    </span>
                    <div className="grid grid-cols-4 gap-2 text-[10px] text-center font-bold">
                      {['Submitted', 'Documents Under Review', 'Provisionally Admitted', 'Fully Enrolled'].map((st, i) => {
                        const isDone = trackedApp.status === st || (
                          (trackedApp.status === 'Provisionally Admitted' && i <= 2) ||
                          (trackedApp.status === 'Fully Enrolled' && i <= 3)
                        );
                        return (
                          <div
                            key={st}
                            className={`p-2 rounded border ${
                              isDone
                                ? 'bg-[#000b20] text-[#ffbe3b] border-[#000b20]'
                                : 'bg-white text-[#74777e] border-[#c4c6ce]'
                            }`}
                          >
                            {st}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {trackedApp.adminNotes && (
                    <div className="bg-white p-3 rounded border border-[#c4c6ce] text-xs space-y-1">
                      <strong className="text-[#000b20]">Admissions Office Note:</strong>
                      <p className="text-[#44474d]">{trackedApp.adminNotes}</p>
                    </div>
                  )}

                  <div className="pt-2 flex justify-between items-center text-xs">
                    <span className="text-[#74777e]">Submitted: {trackedApp.submittedAt}</span>
                    <button
                      onClick={() => window.print()}
                      className="bg-[#000b20] text-white font-bold px-4 py-2 rounded flex items-center gap-1.5"
                    >
                      <Printer className="w-3.5 h-3.5 text-[#ffbe3b]" />
                      <span>Print Summary Slip</span>
                    </button>
                  </div>

                </div>
              ) : (
                <div className="text-center py-8 text-[#74777e] bg-[#f9f9ff] border border-[#c4c6ce] rounded-xl space-y-2">
                  <AlertCircle className="w-8 h-8 mx-auto text-[#74777e] opacity-60" />
                  <p className="font-bold text-[#000b20]">No Application Record Found</p>
                  <p className="text-xs">
                    Please verify the Application ID or phone number entered. You can also contact admissions directly at +265 997 074 888.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: ADMIN / ADMISSIONS OFFICER PORTAL */}
      {activeTab === 'admin' && (
        <div className="bg-white border border-[#c4c6ce] rounded-xl p-6 shadow-md space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#c4c6ce] pb-4">
            <div>
              <h2 className="text-xl font-bold text-[#000b20]">
                Admissions Officer Dashboard
              </h2>
              <p className="text-xs text-[#44474d]">
                Manage incoming learner applications, update statuses, and notify parents via WhatsApp.
              </p>
            </div>

            {/* Filter by Form */}
            <div className="flex items-center gap-2 text-xs">
              <span className="font-bold text-[#000b20]">Filter Form:</span>
              <select
                value={adminFilterForm}
                onChange={(e) => setAdminFilterForm(e.target.value)}
                className="bg-[#f0f3ff] border border-[#c4c6ce] rounded-lg px-3 py-1.5 font-bold text-[#000b20]"
              >
                <option value="All">All Forms (1 - 4)</option>
                <option value="Form 1">Form 1</option>
                <option value="Form 2">Form 2</option>
                <option value="Form 3">Form 3</option>
                <option value="Form 4">Form 4</option>
              </select>
            </div>
          </div>

          {/* Applications Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#000b20] text-white">
                  <th className="p-3">Ref ID</th>
                  <th className="p-3">Learner Name</th>
                  <th className="p-3">Grade</th>
                  <th className="p-3">Residency</th>
                  <th className="p-3">Parent & Contact</th>
                  <th className="p-3">Fee Total</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#c4c6ce]">
                {applications
                  .filter((a) => adminFilterForm === 'All' || a.applyingForForm === adminFilterForm)
                  .map((app) => (
                    <tr key={app.id} className="hover:bg-[#f0f3ff] transition-colors">
                      <td className="p-3 font-mono font-bold text-[#000b20]">{app.id}</td>
                      <td className="p-3 font-bold text-[#000b20]">{app.learnerName}</td>
                      <td className="p-3 font-semibold">{app.applyingForForm}</td>
                      <td className="p-3">{app.boardingType}</td>
                      <td className="p-3">
                        <div className="font-bold">{app.parentName}</div>
                        <div className="text-[11px] text-[#74777e]">{app.parentPhone}</div>
                      </td>
                      <td className="p-3 font-bold text-[#7c5800]">
                        MWK {app.totalFee.toLocaleString()}
                      </td>
                      <td className="p-3">
                        <span className="bg-[#e7eeff] text-[#000b20] font-bold px-2.5 py-1 rounded-full text-[10px]">
                          {app.status}
                        </span>
                      </td>
                      <td className="p-3 text-right space-x-1">
                        <button
                          onClick={() => setAdminSelectedApp(app)}
                          className="bg-[#000b20] text-white font-bold px-2.5 py-1 rounded text-[11px] hover:bg-[#0d223f]"
                        >
                          Manage
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* Manage Selected Application Modal */}
          {adminSelectedApp && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
              <div className="bg-white w-full max-w-xl rounded-xl shadow-2xl overflow-hidden border border-[#000b20]/10 p-6 space-y-4">
                <div className="flex justify-between items-center border-b border-[#c4c6ce] pb-3">
                  <h3 className="font-bold text-lg text-[#000b20]">
                    Manage Ref: {adminSelectedApp.id}
                  </h3>
                  <button onClick={() => setAdminSelectedApp(null)} className="font-bold text-[#74777e]">
                    ✕
                  </button>
                </div>

                <div className="text-xs space-y-2 bg-[#f0f3ff] p-4 rounded-lg">
                  <p><strong className="text-[#000b20]">Learner:</strong> {adminSelectedApp.learnerName} ({adminSelectedApp.gender})</p>
                  <p><strong className="text-[#000b20]">Parent:</strong> {adminSelectedApp.parentName} ({adminSelectedApp.parentPhone})</p>
                  <p><strong className="text-[#000b20]">Uploaded Documents:</strong> {Object.values(adminSelectedApp.uploadedDocs).filter(Boolean).join(', ')}</p>
                </div>

                <div className="space-y-2 text-xs">
                  <label className="block font-bold text-[#000b20]">Update Application Processing Status:</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      'Submitted',
                      'Documents Under Review',
                      'Interview Scheduled',
                      'Provisionally Admitted',
                      'Fully Enrolled',
                      'Rejected',
                    ].map((st) => (
                      <button
                        key={st}
                        onClick={() => handleAdminStatusChange(adminSelectedApp.id, st as any)}
                        className={`p-2 rounded text-xs font-bold border transition-colors ${
                          adminSelectedApp.status === st
                            ? 'bg-[#000b20] text-[#ffbe3b] border-[#000b20]'
                            : 'bg-white text-[#111c2c] border-[#c4c6ce]'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-[#c4c6ce] flex justify-between items-center text-xs">
                  <button
                    onClick={() => copyWhatsappNotice(adminSelectedApp)}
                    className="bg-[#25D366] text-white font-bold px-4 py-2 rounded flex items-center gap-1.5"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>{copiedSuccess ? 'Copied WhatsApp Message!' : 'Copy WhatsApp Parent Alert'}</span>
                  </button>

                  <button
                    onClick={() => setAdminSelectedApp(null)}
                    className="bg-[#000b20] text-white font-bold px-4 py-2 rounded"
                  >
                    Close & Save
                  </button>
                </div>

              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
