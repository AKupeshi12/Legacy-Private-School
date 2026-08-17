import React, { useState } from 'react';
import { DEMO_STUDENTS, SCHOOL_INFO } from '../data/schoolData';
import { StudentProfile } from '../types';
import { 
  User, BookOpen, Calendar, Clock, DollarSign, Award, Download, 
  CheckCircle2, AlertCircle, FileText, Lock, LogOut, ArrowRight, ShieldCheck, 
  CreditCard, Smartphone, Check, Sparkles, UserCheck, RefreshCw
} from 'lucide-react';

export const StudentPortalPage: React.FC = () => {
  const [currentStudent, setCurrentStudent] = useState<StudentProfile | null>(DEMO_STUDENTS[0]);
  const [portalTab, setPortalTab] = useState<'dashboard' | 'timetable' | 'grades' | 'fees' | 'assignments'>('dashboard');

  // Custom login inputs
  const [loginId, setLoginId] = useState('');
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  // Fee payment simulation state
  const [paymentAmount, setPaymentAmount] = useState('130000');
  const [paymentMethod, setPaymentMethod] = useState<'Airtel Money' | 'TNM Mpamba' | 'Bank Transfer'>('Airtel Money');
  const [paymentPhone, setPaymentPhone] = useState('+265 888 123 456');
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const found = DEMO_STUDENTS.find(
      (s) => s.studentIdNumber.toLowerCase() === loginId.trim().toLowerCase() || s.name.toLowerCase().includes(loginId.trim().toLowerCase())
    );
    if (found) {
      setCurrentStudent(found);
      setIsLoggedOut(false);
    } else {
      // Fallback: create dynamic view
      setCurrentStudent({
        ...DEMO_STUDENTS[0],
        studentIdNumber: loginId.toUpperCase() || 'LEG-2026-999',
        name: 'Learner ' + (loginId || 'Guest'),
      });
      setIsLoggedOut(false);
    }
  };

  const handleSimulatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentStudent) return;

    const paidMWK = parseInt(paymentAmount) || 0;
    const newReceipt = {
      receiptNo: `RCP-2026-${Math.floor(100 + Math.random() * 900)}`,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      amountMWK: paidMWK,
      method: paymentMethod,
      description: 'Online Term Fee Payment',
    };

    setCurrentStudent((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        feeBalanceMWK: Math.max(0, prev.feeBalanceMWK - paidMWK),
        feePaidMWK: prev.feePaidMWK + paidMWK,
        paymentHistory: [newReceipt, ...prev.paymentHistory],
      };
    });

    setPaymentSuccess(true);
    setTimeout(() => setPaymentSuccess(false), 3000);
  };

  if (isLoggedOut || !currentStudent) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 bg-white border border-[#c4c6ce] rounded-xl shadow-xl space-y-6 text-[#111c2c]">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 bg-[#000b20] text-[#ffbe3b] rounded-full flex items-center justify-center mx-auto shadow-md">
            <UserCheck className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-black text-[#000b20]">Student & Parent Portal</h2>
          <p className="text-xs text-[#44474d]">Login with your Student ID Number or select a demo profile below.</p>
        </div>

        <form onSubmit={handleCustomLogin} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-[#000b20] mb-1">Student ID Number / Name</label>
            <input
              type="text"
              placeholder="e.g. LEG-2026-001"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
              className="w-full bg-[#f0f3ff] border border-[#c4c6ce] rounded-lg px-3 py-2.5 font-bold focus:ring-2 focus:ring-[#7c5800] focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#000b20] text-[#ffbe3b] font-bold py-2.5 rounded-lg text-xs hover:bg-[#0d223f]"
          >
            Access Portal
          </button>
        </form>

        <div className="pt-4 border-t border-[#c4c6ce] space-y-2">
          <span className="text-[11px] font-bold text-[#74777e] uppercase block">Or Switch Demo Profile:</span>
          {DEMO_STUDENTS.map((std) => (
            <button
              key={std.id}
              onClick={() => {
                setCurrentStudent(std);
                setIsLoggedOut(false);
              }}
              className="w-full text-left p-3 rounded-lg border border-[#c4c6ce] hover:bg-[#f0f3ff] flex items-center justify-between text-xs transition-colors"
            >
              <div>
                <strong className="text-[#000b20] block">{std.name}</strong>
                <span className="text-[11px] text-[#74777e]">{std.formGrade} • {std.house}</span>
              </div>
              <span className="font-mono text-[#7c5800] font-bold text-[11px]">{std.studentIdNumber}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Welcome Bar */}
      <div className="bg-[#000b20] text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-[#ffbe3b]/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-[#ffbe3b] text-[#000b20] font-black text-2xl rounded-xl flex items-center justify-center shrink-0 border border-[#7c5800]/50 shadow-md">
            {currentStudent.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-[#0d223f] text-[#ffbe3b] border border-[#ffbe3b]/40 font-mono font-bold text-[11px] px-2.5 py-0.5 rounded">
                {currentStudent.studentIdNumber}
              </span>
              <span className="bg-[#25D366] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                Active Enrolled
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white font-display mt-1">
              Welcome, {currentStudent.name}
            </h1>
            <p className="text-xs text-white/80">
              {currentStudent.formGrade} • House: <strong className="text-[#ffbe3b]">{currentStudent.house}</strong> • Attendance Rate: <strong className="text-white">{currentStudent.attendancePercentage}%</strong>
            </p>
          </div>
        </div>

        {/* Demo Switcher & Logout */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="bg-[#0d223f] p-1 rounded-lg border border-white/10 flex items-center gap-1 text-xs">
            {DEMO_STUDENTS.map((std) => (
              <button
                key={std.id}
                onClick={() => setCurrentStudent(std)}
                className={`px-3 py-1.5 rounded font-bold transition-all ${
                  currentStudent.id === std.id
                    ? 'bg-[#ffbe3b] text-[#000b20]'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {std.name.split(' ')[0]}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsLoggedOut(true)}
            className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-lg transition-colors"
            title="Log out of portal"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Portal Inner Tabs Navigation */}
      <div className="flex bg-[#e7eeff] p-1.5 rounded-xl border border-[#c4c6ce] overflow-x-auto text-xs font-bold">
        {[
          { id: 'dashboard', label: 'Dashboard & ID' },
          { id: 'timetable', label: 'Class Timetable' },
          { id: 'grades', label: 'Report Card & Grades' },
          { id: 'fees', label: 'Fees & Payment Receipts' },
          { id: 'assignments', label: 'Assignments' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setPortalTab(tab.id as any)}
            className={`flex-1 py-2.5 px-4 rounded-lg whitespace-nowrap transition-all ${
              portalTab === tab.id
                ? 'bg-[#000b20] text-[#ffbe3b] shadow-xs'
                : 'text-[#111c2c] hover:bg-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: DASHBOARD OVERVIEW */}
      {portalTab === 'dashboard' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Digital Student Badge ID */}
          <div className="lg:col-span-4 bg-white border border-[#c4c6ce] rounded-xl p-6 shadow-md space-y-6">
            <div className="bg-[#000b20] text-white p-5 rounded-xl text-center space-y-3 relative overflow-hidden border border-[#ffbe3b]/30">
              <div className="w-12 h-12 bg-[#ffbe3b] text-[#000b20] rounded-full font-black text-xl flex items-center justify-center mx-auto shadow-md">
                L
              </div>
              <div>
                <h3 className="font-black text-lg text-[#ffbe3b] uppercase tracking-wider font-display">
                  LEGACY PRIVATE SCHOOL
                </h3>
                <p className="text-[10px] text-white/80 uppercase tracking-widest">
                  OFFICIAL STUDENT IDENTIFICATION
                </p>
              </div>

              <div className="bg-white text-[#111c2c] rounded-lg p-4 text-left space-y-2 border border-[#c4c6ce] shadow-inner text-xs">
                <div><span className="text-[#74777e] block text-[10px]">Student Name:</span> <strong className="text-sm text-[#000b20]">{currentStudent.name}</strong></div>
                <div><span className="text-[#74777e] block text-[10px]">ID Number:</span> <strong className="font-mono text-[#7c5800]">{currentStudent.studentIdNumber}</strong></div>
                <div><span className="text-[#74777e] block text-[10px]">Class / Form:</span> <strong>{currentStudent.formGrade}</strong></div>
                <div><span className="text-[#74777e] block text-[10px]">House:</span> <strong>{currentStudent.house}</strong></div>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center py-2 border-b border-[#c4c6ce]">
                <span className="text-[#74777e]">Parent / Guardian:</span>
                <span className="font-bold text-[#000b20]">{currentStudent.parentName}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-[#c4c6ce]">
                <span className="text-[#74777e]">Attendance Rate:</span>
                <span className="font-bold text-[#25D366]">{currentStudent.attendancePercentage}%</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-[#c4c6ce]">
                <span className="text-[#74777e]">Tuition Fee Balance:</span>
                <span className={`font-bold ${currentStudent.feeBalanceMWK > 0 ? 'text-[#ba1a1a]' : 'text-[#25D366]'}`}>
                  MWK {currentStudent.feeBalanceMWK.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Today's Schedule & Academic Summary */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Quick Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white border border-[#c4c6ce] p-5 rounded-xl space-y-1 shadow-xs">
                <span className="text-xs text-[#74777e] font-bold uppercase">Term 1 Performance</span>
                <div className="text-2xl font-black text-[#000b20]">A Average</div>
                <span className="text-[11px] text-[#7c5800] font-semibold">Top 5% in {currentStudent.formGrade}</span>
              </div>

              <div className="bg-white border border-[#c4c6ce] p-5 rounded-xl space-y-1 shadow-xs">
                <span className="text-xs text-[#74777e] font-bold uppercase">Pending Homework</span>
                <div className="text-2xl font-black text-[#000b20]">
                  {currentStudent.assignments.filter((a) => a.status === 'Pending').length} Tasks
                </div>
                <span className="text-[11px] text-[#74777e]">Due this week</span>
              </div>

              <div className="bg-white border border-[#c4c6ce] p-5 rounded-xl space-y-1 shadow-xs">
                <span className="text-xs text-[#74777e] font-bold uppercase">Fee Account Status</span>
                <div className="text-2xl font-black text-[#000b20]">
                  {currentStudent.feeBalanceMWK === 0 ? 'Cleared' : 'Deposit due'}
                </div>
                <span className="text-[11px] text-[#25D366] font-semibold">MWK {currentStudent.feePaidMWK.toLocaleString()} Paid</span>
              </div>
            </div>

            {/* Today's Schedule Overview */}
            <div className="bg-white border border-[#c4c6ce] rounded-xl p-6 shadow-sm space-y-4">
              <h3 className="font-bold text-base text-[#000b20] border-b border-[#c4c6ce] pb-2 flex items-center justify-between">
                <span>Today&apos;s Class Schedule ({currentStudent.timetable[0]?.day || 'Monday'})</span>
                <span className="text-xs text-[#7c5800] font-normal">Nasenga Campus</span>
              </h3>

              <div className="space-y-3">
                {currentStudent.timetable[0]?.periods.map((p, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-[#f0f3ff] border border-[#c4c6ce]/60 text-xs">
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-[#7c5800]" />
                      <div>
                        <div className="font-bold text-[#000b20]">{p.subject}</div>
                        <div className="text-[11px] text-[#74777e]">Teacher: {p.teacher}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="bg-white text-[#000b20] font-bold px-2 py-1 rounded border border-[#c4c6ce]">
                        {p.room}
                      </span>
                      <div className="text-[10px] text-[#74777e] mt-1">{p.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* TAB 2: CLASS TIMETABLE */}
      {portalTab === 'timetable' && (
        <div className="bg-white border border-[#c4c6ce] rounded-xl p-6 shadow-md space-y-6">
          <h2 className="text-xl font-bold text-[#000b20] border-b border-[#c4c6ce] pb-3">
            Weekly Class Timetable - {currentStudent.formGrade}
          </h2>

          <div className="space-y-6">
            {currentStudent.timetable.map((day, i) => (
              <div key={i} className="space-y-3">
                <h3 className="font-bold text-sm text-[#000b20] bg-[#f0f3ff] px-4 py-2 rounded-lg border border-[#c4c6ce]">
                  {day.day}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                  {day.periods.map((p, idx) => (
                    <div key={idx} className="p-3 border border-[#c4c6ce] rounded-lg bg-white space-y-1">
                      <span className="text-[10px] font-bold text-[#7c5800] uppercase block">{p.time}</span>
                      <h4 className="font-bold text-sm text-[#000b20]">{p.subject}</h4>
                      <p className="text-[#74777e]">Teacher: {p.teacher}</p>
                      <p className="text-[11px] font-semibold text-[#000b20]">{p.room}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: REPORT CARD & GRADES */}
      {portalTab === 'grades' && (
        <div className="bg-white border border-[#c4c6ce] rounded-xl p-6 shadow-md space-y-6">
          <div className="flex justify-between items-center border-b border-[#c4c6ce] pb-3">
            <div>
              <h2 className="text-xl font-bold text-[#000b20]">
                Term 1 Academic Progress Report
              </h2>
              <p className="text-xs text-[#44474d]">Official grade breakdown for {currentStudent.name}</p>
            </div>

            <button
              onClick={() => window.print()}
              className="bg-[#000b20] text-white font-bold text-xs px-4 py-2 rounded flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-[#ffbe3b]" />
              <span>Print Report Card</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#000b20] text-white">
                  <th className="p-3">Subject Name</th>
                  <th className="p-3">Score (%)</th>
                  <th className="p-3">Grade</th>
                  <th className="p-3">Teacher&apos;s Remark</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#c4c6ce]">
                {currentStudent.grades.map((g, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-[#f0f3ff]'}>
                    <td className="p-3 font-bold text-[#000b20]">{g.subject}</td>
                    <td className="p-3 font-bold">{g.score}%</td>
                    <td className="p-3">
                      <span className="bg-[#ffbe3b] text-[#000b20] font-black px-2.5 py-0.5 rounded text-[11px]">
                        {g.grade}
                      </span>
                    </td>
                    <td className="p-3 text-[#44474d]">{g.teacherRemark}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: FEES & ONLINE PAYMENT */}
      {portalTab === 'fees' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Mobile Money Online Fee Payment Form */}
          <div className="lg:col-span-6 bg-white border border-[#c4c6ce] rounded-xl p-6 shadow-md space-y-6">
            <div className="border-b border-[#c4c6ce] pb-3">
              <h3 className="text-lg font-bold text-[#000b20]">
                Make Online Fee Deposit
              </h3>
              <p className="text-xs text-[#44474d]">
                Instant payment via Airtel Money, TNM Mpamba, or National Bank Transfer.
              </p>
            </div>

            {paymentSuccess && (
              <div className="bg-[#e7eeff] border border-[#7c5800] p-4 rounded-lg text-xs text-[#000b20] font-bold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#7c5800]" />
                <span>Payment Processed! Receipt added to transaction history below.</span>
              </div>
            )}

            <form onSubmit={handleSimulatePayment} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#000b20] mb-1">Select Payment Method</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Airtel Money', 'TNM Mpamba', 'Bank Transfer'].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setPaymentMethod(m as any)}
                      className={`p-2.5 rounded-lg border font-bold text-[11px] transition-colors ${
                        paymentMethod === m
                          ? 'bg-[#000b20] text-[#ffbe3b] border-[#000b20]'
                          : 'bg-white text-[#111c2c] border-[#c4c6ce]'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#000b20] mb-1">Mobile Money Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+265 888 123 456"
                  value={paymentPhone}
                  onChange={(e) => setPaymentPhone(e.target.value)}
                  className="w-full bg-white border border-[#c4c6ce] rounded-lg p-2.5 focus:ring-2 focus:ring-[#7c5800] focus:outline-none font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-[#000b20] mb-1">Payment Amount (MWK) *</label>
                <input
                  type="number"
                  required
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  className="w-full bg-white border border-[#c4c6ce] rounded-lg p-2.5 focus:ring-2 focus:ring-[#7c5800] focus:outline-none font-bold text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#ffbe3b] text-[#000b20] font-bold py-3 rounded-lg text-sm hover:bg-[#ffbe3b]/90 shadow-xs"
              >
                Pay MWK {parseInt(paymentAmount || '0').toLocaleString()} Now
              </button>
            </form>
          </div>

          {/* Payment History & Receipts */}
          <div className="lg:col-span-6 bg-white border border-[#c4c6ce] rounded-xl p-6 shadow-md space-y-4">
            <h3 className="font-bold text-base text-[#000b20] border-b border-[#c4c6ce] pb-2">
              Payment Receipts History
            </h3>

            <div className="space-y-3">
              {currentStudent.paymentHistory.map((receipt, i) => (
                <div key={i} className="p-4 rounded-lg bg-[#f0f3ff] border border-[#c4c6ce] text-xs space-y-1">
                  <div className="flex justify-between items-center font-bold">
                    <span className="font-mono text-[#7c5800]">{receipt.receiptNo}</span>
                    <span className="text-[#25D366]">MWK {receipt.amountMWK.toLocaleString()}</span>
                  </div>
                  <p className="text-[#000b20] font-semibold">{receipt.description}</p>
                  <div className="flex justify-between text-[11px] text-[#74777e]">
                    <span>Method: {receipt.method}</span>
                    <span>Date: {receipt.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* TAB 5: ASSIGNMENTS */}
      {portalTab === 'assignments' && (
        <div className="bg-white border border-[#c4c6ce] rounded-xl p-6 shadow-md space-y-6">
          <h2 className="text-xl font-bold text-[#000b20] border-b border-[#c4c6ce] pb-3">
            Assignments & Coursework Tracker
          </h2>

          <div className="space-y-4">
            {currentStudent.assignments.map((asg) => (
              <div key={asg.id} className="p-4 border border-[#c4c6ce] rounded-lg bg-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs">
                <div>
                  <span className="bg-[#e7eeff] text-[#000b20] font-bold text-[10px] px-2 py-0.5 rounded uppercase">
                    {asg.subject}
                  </span>
                  <h4 className="font-bold text-sm text-[#000b20] mt-1">{asg.title}</h4>
                  <p className="text-[#74777e]">Due Date: {asg.dueDate}</p>
                </div>

                <span className={`font-bold px-3 py-1 rounded-full text-[11px] ${
                  asg.status === 'Graded'
                    ? 'bg-[#e7eeff] text-[#7c5800]'
                    : asg.status === 'Submitted'
                    ? 'bg-[#25D366]/20 text-[#20bd5a]'
                    : 'bg-[#ffbe3b] text-[#000b20]'
                }`}>
                  {asg.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
