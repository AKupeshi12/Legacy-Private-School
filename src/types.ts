export type PageType = 'home' | 'faculty' | 'calendar' | 'admissions' | 'student-portal';

export interface FacultyMember {
  id: string;
  name: string;
  title: string;
  department: 'leadership' | 'sciences' | 'humanities' | 'sports';
  departmentName: string;
  qualifications: string;
  bio: string;
  email: string;
  image: string;
  phone?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  category: 'Student Life' | 'Academic' | 'Arts' | 'Sports' | 'Featured';
  dateDisplay: string;
  month: string;
  day: string;
  time: string;
  location: string;
  description: string;
  isFeatured?: boolean;
  image?: string;
}

export interface TermDate {
  term: string;
  name: string;
  dates: string;
  status?: string;
}

export interface SchoolAnnouncement {
  id: string;
  title: string;
  date: string;
  category: 'Admissions' | 'Launch' | 'Academics' | 'Notice';
  summary: string;
  fullContent: string;
  isUrgent?: boolean;
}

export interface LearnerApplication {
  id: string; // e.g., LEG-2026-8942
  submittedAt: string;
  // Learner Info
  learnerName: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female';
  applyingForForm: 'Form 1' | 'Form 2' | 'Form 3' | 'Form 4';
  previousSchool: string;
  pslceGradeOrAggregate: string;
  
  // Parent Info
  parentName: string;
  relationship: 'Father' | 'Mother' | 'Guardian';
  parentPhone: string;
  parentWhatsapp: string;
  parentEmail: string;
  residentialAddress: string;

  // Options
  boardingType: 'Day Student' | 'Full Boarder';
  transportRoute?: string;
  extraUniformSets: number;

  // Documents
  uploadedDocs: {
    resultSlipName?: string;
    birthCertName?: string;
    photoName?: string;
  };

  // Fees Calculated (in MWK)
  termFee: number;
  registrationFee: number;
  boardingFee: number;
  totalFee: number;

  // Processing Status
  status: 'Submitted' | 'Documents Under Review' | 'Interview Scheduled' | 'Provisionally Admitted' | 'Fully Enrolled' | 'Rejected';
  adminNotes?: string;
  interviewDate?: string;
}

export interface StudentProfile {
  id: string;
  studentIdNumber: string;
  name: string;
  formGrade: string;
  gender: string;
  house: string;
  attendancePercentage: number;
  parentName: string;
  parentPhone: string;
  feeBalanceMWK: number;
  feePaidMWK: number;
  timetable: {
    day: string;
    periods: { time: string; subject: string; teacher: string; room: string }[];
  }[];
  grades: {
    subject: string;
    score: number;
    grade: string;
    teacherRemark: string;
  }[];
  assignments: {
    id: string;
    subject: string;
    title: string;
    dueDate: string;
    status: 'Pending' | 'Submitted' | 'Graded';
  }[];
  paymentHistory: {
    receiptNo: string;
    date: string;
    amountMWK: number;
    method: string;
    description: string;
  }[];
}
