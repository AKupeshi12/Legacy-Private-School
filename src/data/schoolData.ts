import { FacultyMember, CalendarEvent, TermDate, SchoolAnnouncement, StudentProfile, LearnerApplication } from '../types';

export const SCHOOL_INFO = {
  name: 'LEGACY PRIVATE SCHOOL',
  fullName: 'Legacy Private Secondary School',
  tagline: 'Building Leaders For Tomorrow',
  motto: 'Igniting Minds, Shaping Legacy.',
  openingDate: '2026-09-14',
  openingDateDisplay: '14 September 2026',
  phone: '+265 997 074 888',
  phoneRaw: '265997074888',
  email: 'legacyprivateschool@gmail.com',
  address: 'Nasenga, along Monkey Bay Road, Mangochi',
  postal: 'P.O. BOX 435, Mangochi',
  whatsappNumber: '265997074888',
  fees: {
    termFeeMWK: 130000,
    registrationFeeMWK: 10000,
    boardingFeeMWK: 120000,
    uniformSetMWK: 25000,
  }
};

export const ANNOUNCEMENTS: SchoolAnnouncement[] = [
  {
    id: 'ann-1',
    title: 'Admissions Open for Forms 1 to 4 - Academic Year 2026/2027',
    date: '10 August 2026',
    category: 'Admissions',
    summary: 'Legacy Private Secondary School is now accepting applications for Form 1 through Form 4. Swift online enrollment available now!',
    fullContent: 'We are thrilled to announce that registration for the upcoming academic year is officially open. Term fees are MWK 130,000.00 with a registration fee of MWK 10,000.00. Early submission ensures placement in our high-tech, discipline-focused secondary school campus in Mangochi.',
    isUrgent: true,
  },
  {
    id: 'ann-2',
    title: 'Inaugural Grand Opening Ceremony & Campus Tours',
    date: '12 August 2026',
    category: 'Launch',
    summary: 'Join us on 14 September 2026 from 09:00 AM for the official ribbon-cutting ceremony, guided tours, and speeches.',
    fullContent: 'Parents, prospective learners, and community leaders are warmly invited to attend our official Grand Opening Day at Nasenga Campus along Monkey Bay Road. Tour our brand new science labs, modern classrooms, and student hostels.',
    isUrgent: false,
  },
  {
    id: 'ann-3',
    title: 'Entrance Examinations & Placement Assessment Schedule',
    date: '08 August 2026',
    category: 'Academics',
    summary: 'Placement assessments for transfer students entering Form 2, 3, and 4 will take place weekly on Saturdays.',
    fullContent: 'All registered transfer applicants will sit for a 2-hour general assessment covering Mathematics and English Language. Candidates can track their results through the online Swift Application Portal.',
    isUrgent: false,
  },
];

export const TERM_DATES: TermDate[] = [
  { term: 'Term 1 (Advent)', name: 'First Term', dates: '15 Sep - 12 Dec 2026', status: 'Upcoming' },
  { term: 'Term 2 (Lent)', name: 'Second Term', dates: '05 Jan - 27 Mar 2027', status: 'Scheduled' },
  { term: 'Term 3 (Trinity)', name: 'Third Term', dates: '13 Apr - 03 Jul 2027', status: 'Scheduled' },
];

export const CALENDAR_EVENTS: CalendarEvent[] = [
  {
    id: 'evt-grand-opening',
    title: 'Grand Opening Day',
    category: 'Featured',
    dateDisplay: '14 September 2026',
    month: 'SEP',
    day: '14',
    time: '09:00 AM - 14:00 PM',
    location: 'Main Campus Assembly Ground',
    description: 'Join us as we officially open the doors to Legacy Private Secondary School. The day will feature ribbon-cutting ceremonies, campus tours, and introductory speeches from our esteemed faculty and leadership team.',
    isFeatured: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzKJpH55iZt3xJjtwf7qOqs6jetcBoqBlN6xV4h3DNbnCCSvASJnxitTkfnHz6sdiCmAKu_g3VTzo6alnXnUtjsz8yOPVg1MqNwpMuBB3ObYftlM9GN3qwXZ-Ildm_ONooQaqN9m1Md_YV4FJuq5pyyqqR_bQtuqchwlZmNee9tXU54pmn3cF4rn6XaGNPADoi1TEbePSibIqLeLknDPrBiacXaJhQRsU57nLb112h2-UprmXZVXDoYQ',
  },
  {
    id: 'evt-orientation',
    title: 'Orientation Week Begins',
    category: 'Student Life',
    dateDisplay: '07 September 2026',
    month: 'SEP',
    day: '07',
    time: 'All Week',
    location: 'Main Campus',
    description: 'A crucial week for all new students to familiarize themselves with the campus, meet their advisors, and understand the academic expectations.',
  },
  {
    id: 'evt-parent-teacher',
    title: 'Parent-Teacher Conferences',
    category: 'Academic',
    dateDisplay: '15 October 2026',
    month: 'OCT',
    day: '15',
    time: '16:00 - 19:30',
    location: 'Assembly Hall',
    description: 'An opportunity for parents to meet one-on-one with faculty to discuss student progress, set goals for the term, and build a collaborative support system.',
  },
  {
    id: 'evt-arts-showcase',
    title: 'Autumn Arts Showcase',
    category: 'Arts',
    dateDisplay: '02 November 2026',
    month: 'NOV',
    day: '02',
    time: '18:00 - 21:00',
    location: 'Creative Arts Center',
    description: 'Experience the creative talents of our students across visual arts, music, and drama in our inaugural seasonal showcase.',
  },
  {
    id: 'evt-science-fair',
    title: 'Annual STEM & Innovation Fair',
    category: 'Academic',
    dateDisplay: '20 November 2026',
    month: 'NOV',
    day: '20',
    time: '08:30 - 15:00',
    location: 'Science Complex',
    description: 'Learners showcase inventive robotics, renewable energy projects, and environmental science solutions.',
  },
  {
    id: 'evt-sports-day',
    title: 'Inter-House Sports Competition',
    category: 'Sports',
    dateDisplay: '04 December 2026',
    month: 'DEC',
    day: '04',
    time: '08:00 - 16:30',
    location: 'Legacy Sports Grounds',
    description: 'Track and field events, football matches, and netball tournaments featuring Nyika, Mulanje, and Zomba house teams.',
  }
];

export const FACULTY_MEMBERS: FacultyMember[] = [
  {
    id: 'fac-1',
    name: 'Dr. Emmanuel Kalu',
    title: 'Headmaster',
    department: 'leadership',
    departmentName: 'School Leadership',
    qualifications: 'Ph.D. Educational Leadership',
    bio: '20+ years guiding institutional excellence across East & Southern Africa. Dedicated to academic rigor and moral discipline.',
    email: 'headmaster@legacyprivateschool.com',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZslkJHQ4wj4SGZD2x4-8uyaevzYOjDTksuUuGrXyezOMM2CLaj8BUUjuyjaKLTHXgOS-gQPN7YMUTK99chuH7rr4vOEHIi92Ok_oUg9emoOA9xOVYTCE4TVK_ArK0q4nIGhsT_K8aP-2GfvQiyzA8lVkVBhqRE0DCQ4O6vHYdmbQBvXw4hWWmUtlPjqg4b0vuNAaLWRWjt57bGgcQUSzyR1zFEFREp3LBZXbEpiGgT0yVEYlR1BA5hg',
    phone: '+265 997 074 888',
  },
  {
    id: 'fac-2',
    name: 'Grace Chitala',
    title: 'Head of Sciences',
    department: 'sciences',
    departmentName: 'Sciences & Mathematics',
    qualifications: 'M.Sc. Biochemistry, B.Ed. Science',
    bio: 'Passionate STEM educator specializing in practical physics, chemistry, and preparing students for national science olympiads.',
    email: 'g.chitala@legacyprivateschool.com',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChKzhzi35xa_rGbkAvV352iHnkvUuvF3exvKzjsEeKUr9r9qScxhMI40RBO6Eezkpb-mzVFzAY2TyDC6EvlHPMCSxILfatRg-1SY_2-4B8SDpD-nRe_8Fi2e8rvq-rYnYTTlIKeUEahpbQvBOscrIDJahnQI6ydGxKyVSxMOhZlDyZjtGOyTL2j0uzJU91t8pEebkgMSa8aJ6XVrGdn7iCwGnn_T7sC8esN8yZ8tLLPq68E2Rq_YuJgg',
  },
  {
    id: 'fac-3',
    name: 'Daniel Tembo',
    title: 'Senior Mathematics',
    department: 'sciences',
    departmentName: 'Sciences & Mathematics',
    qualifications: 'B.Sc. Mathematics & Statistics',
    bio: 'Focused on making algebra and calculus intuitive, building strong logic skills, and mentoring student chess teams.',
    email: 'd.tembo@legacyprivateschool.com',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbi-QBx32ypYSHAY94XAryyzrXM4YtvCn2ie6AKeAGZMk3DzJjGcoSX6XP46tiUMG8w2ZpsuvVgyGzGAfX22CCymLGh4uyQQWsftbAb64qnnLq18d1kaSNYtfO5vP3eIe5qkHqTaFTbX_7tox35YnBl6u64ohSsFZ3tBeUWZVOEkhSp6KIHgcVG7PmUCJU4G_l5n0XfKSzF7AWaIWVb2yrNgXuDwRzo_cc-FBXNZhrgVKW6jeFzsveEg',
  },
  {
    id: 'fac-4',
    name: 'Mrs. Tendai Banda',
    title: 'Head of Humanities',
    department: 'humanities',
    departmentName: 'Humanities & Arts',
    qualifications: 'M.A. English Literature & Communication',
    bio: 'Encourages critical thinking, expressive writing, debate club coaching, and African literature appreciation.',
    email: 't.banda@legacyprivateschool.com',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'fac-5',
    name: 'Mr. Chisomo Phiri',
    title: 'Senior History & Social Studies',
    department: 'humanities',
    departmentName: 'Humanities & Arts',
    qualifications: 'B.Ed. History & Political Studies',
    bio: 'Brings historical events to life through interactive debate, heritage preservation projects, and civic duty awareness.',
    email: 'c.phiri@legacyprivateschool.com',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'fac-6',
    name: 'Coach Joseph Mwale',
    title: 'Director of Sports & Physical Education',
    department: 'sports',
    departmentName: 'Sports & Life Skills',
    qualifications: 'B.Sc. Sports Science & Coaching Cert.',
    bio: 'Former national athlete leading our football, netball, and athletics programs with emphasis on teamwork and endurance.',
    email: 'j.mwale@legacyprivateschool.com',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop',
  }
];

export const INITIAL_APPLICATIONS: LearnerApplication[] = [
  {
    id: 'LEG-2026-1042',
    submittedAt: '2026-08-11 14:20',
    learnerName: 'Tiwonge Banda',
    dateOfBirth: '2012-04-15',
    gender: 'Female',
    applyingForForm: 'Form 1',
    previousSchool: 'Mangochi Primary School',
    pslceGradeOrAggregate: 'A - 12 Points',
    parentName: 'Mrs. Agnes Banda',
    relationship: 'Mother',
    parentPhone: '+265 888 123 456',
    parentWhatsapp: '265888123456',
    parentEmail: 'agnes.banda@gmail.com',
    residentialAddress: 'Monkey Bay, Mangochi',
    boardingType: 'Full Boarder',
    extraUniformSets: 1,
    uploadedDocs: {
      resultSlipName: 'PSLCE_Result_Slip_Banda.pdf',
      birthCertName: 'Birth_Certificate_Tiwonge.jpg',
      photoName: 'Passport_Photo_Banda.jpg',
    },
    termFee: 130000,
    registrationFee: 10000,
    boardingFee: 120000,
    totalFee: 260000,
    status: 'Provisionally Admitted',
    interviewDate: '2026-08-20 at 10:00 AM',
    adminNotes: 'Excellent primary results. Provisional acceptance issued. Awaiting tuition deposit.',
  },
  {
    id: 'LEG-2026-1088',
    submittedAt: '2026-08-11 16:45',
    learnerName: 'Chifundo Mwale',
    dateOfBirth: '2010-09-02',
    gender: 'Male',
    applyingForForm: 'Form 3',
    previousSchool: 'Saint Patrick Secondary',
    pslceGradeOrAggregate: 'JCE Passed - B Average',
    parentName: 'Mr. Patrick Mwale',
    relationship: 'Father',
    parentPhone: '+265 999 456 789',
    parentWhatsapp: '265999456789',
    parentEmail: 'pmwale@gmail.com',
    residentialAddress: 'Nasenga, Mangochi',
    boardingType: 'Day Student',
    extraUniformSets: 0,
    uploadedDocs: {
      resultSlipName: 'JCE_Certificate_Mwale.pdf',
      birthCertName: 'BirthCert_Chifundo.pdf',
    },
    termFee: 130000,
    registrationFee: 10000,
    boardingFee: 0,
    totalFee: 140000,
    status: 'Submitted',
    adminNotes: 'Application received. Pending verification of JCE certificate.',
  }
];

export const DEMO_STUDENTS: StudentProfile[] = [
  {
    id: 'std-1',
    studentIdNumber: 'LEG-2026-001',
    name: 'Tiwonge Banda',
    formGrade: 'Form 1 Gold',
    gender: 'Female',
    house: 'Nyika House',
    attendancePercentage: 98.5,
    parentName: 'Mrs. Agnes Banda',
    parentPhone: '+265 888 123 456',
    feeBalanceMWK: 0,
    feePaidMWK: 260000,
    timetable: [
      {
        day: 'Monday',
        periods: [
          { time: '07:30 - 08:15', subject: 'Mathematics', teacher: 'Daniel Tembo', room: 'Room 101' },
          { time: '08:15 - 09:00', subject: 'English Language', teacher: 'Mrs. Tendai Banda', room: 'Room 101' },
          { time: '09:15 - 10:00', subject: 'Physical Science', teacher: 'Grace Chitala', room: 'Science Lab A' },
          { time: '10:15 - 11:00', subject: 'Biology', teacher: 'Grace Chitala', room: 'Science Lab B' },
          { time: '11:15 - 12:00', subject: 'History', teacher: 'Mr. Chisomo Phiri', room: 'Room 103' },
        ]
      },
      {
        day: 'Tuesday',
        periods: [
          { time: '07:30 - 08:15', subject: 'Physical Science', teacher: 'Grace Chitala', room: 'Science Lab A' },
          { time: '08:15 - 09:00', subject: 'Mathematics', teacher: 'Daniel Tembo', room: 'Room 101' },
          { time: '09:15 - 10:00', subject: 'Chichewa Literature', teacher: 'Mrs. Tendai Banda', room: 'Room 102' },
          { time: '10:15 - 11:00', subject: 'Geography', teacher: 'Mr. Chisomo Phiri', room: 'Room 104' },
          { time: '11:15 - 12:00', subject: 'Physical Education', teacher: 'Coach Joseph Mwale', room: 'Sports Field' },
        ]
      }
    ],
    grades: [
      { subject: 'Mathematics', score: 92, grade: 'A*', teacherRemark: 'Outstanding problem solving and logical reasoning.' },
      { subject: 'Physical Science', score: 88, grade: 'A', teacherRemark: 'Excellent work in lab practicals and theory.' },
      { subject: 'English Language', score: 85, grade: 'A', teacherRemark: 'Strong vocabulary and essay structure.' },
      { subject: 'Biology', score: 90, grade: 'A*', teacherRemark: 'Meticulous attention to biological diagrams.' },
      { subject: 'History', score: 84, grade: 'A', teacherRemark: 'Good analytical grasp of historical events.' },
      { subject: 'Geography', score: 86, grade: 'A', teacherRemark: 'Great understanding of environmental maps.' }
    ],
    assignments: [
      { id: 'asg-1', subject: 'Mathematics', title: 'Quadratic Equations Worksheet 3', dueDate: '18 Aug 2026', status: 'Pending' },
      { id: 'asg-2', subject: 'Physical Science', title: 'Atomic Structure Lab Report', dueDate: '16 Aug 2026', status: 'Submitted' },
      { id: 'asg-3', subject: 'English Language', title: 'Essay: The Role of Youth Leadership', dueDate: '14 Aug 2026', status: 'Graded' },
    ],
    paymentHistory: [
      { receiptNo: 'RCP-2026-901', date: '11 Aug 2026', amountMWK: 260000, method: 'Airtel Money Express', description: 'Term 1 Tuition, Boarding & Registration Fee' }
    ]
  },
  {
    id: 'std-2',
    studentIdNumber: 'LEG-2026-002',
    name: 'Chifundo Mwale',
    formGrade: 'Form 3 Blue',
    gender: 'Male',
    house: 'Mulanje House',
    attendancePercentage: 96.0,
    parentName: 'Mr. Patrick Mwale',
    parentPhone: '+265 999 456 789',
    feeBalanceMWK: 10000,
    feePaidMWK: 130000,
    timetable: [
      {
        day: 'Monday',
        periods: [
          { time: '07:30 - 08:15', subject: 'Additional Mathematics', teacher: 'Daniel Tembo', room: 'Room 201' },
          { time: '08:15 - 09:00', subject: 'Physics', teacher: 'Grace Chitala', room: 'Physics Lab' },
          { time: '09:15 - 10:00', subject: 'Chemistry', teacher: 'Grace Chitala', room: 'Chemistry Lab' },
        ]
      }
    ],
    grades: [
      { subject: 'Additional Mathematics', score: 78, grade: 'B', teacherRemark: 'Consistent effort. Focus on calculus derivatives.' },
      { subject: 'Physics', score: 82, grade: 'A', teacherRemark: 'Solid grasp of mechanics and electrical circuits.' },
      { subject: 'Chemistry', score: 80, grade: 'A', teacherRemark: 'Good performance in stoichiometry.' },
    ],
    assignments: [
      { id: 'asg-201', subject: 'Physics', title: 'Ohm\'s Law & Resistor Networks', dueDate: '19 Aug 2026', status: 'Pending' }
    ],
    paymentHistory: [
      { receiptNo: 'RCP-2026-882', date: '10 Aug 2026', amountMWK: 130000, method: 'TNM Mpamba', description: 'Term 1 Tuition Fee Deposit' }
    ]
  }
];
