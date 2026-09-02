export type Branch = 'CSE' | 'IT' | 'ECE' | 'ME' | 'Civil' | 'AI & DS';
export type FeeStatus = 'Paid' | 'Pending' | 'Partial' | 'Overdue';
export type StudentStatus = 'Active' | 'Graduated' | 'Probation' | 'Suspended';

export interface CourseMarks {
  internal1: number; // Max 25
  internal2: number; // Max 25
  assignment: number; // Max 10
  endSem: number; // Max 100 scaled to 40 or 50
  total: number; // 0-100
  grade: 'A+' | 'A' | 'B+' | 'B' | 'C' | 'D' | 'F';
  gradePoint: number;
}

export interface Student {
  id: string;
  rollNo: string;
  name: string;
  email: string;
  phone: string;
  branch: Branch;
  semester: number;
  section: string;
  cgpa: number;
  attendancePercentage: number;
  feeStatus: FeeStatus;
  status: StudentStatus;
  avatarUrl?: string;
  dateOfBirth: string;
  bloodGroup: string;
  parentName: string;
  parentPhone: string;
  address: string;
  admissionYear: number;
  enrolledCourses: string[]; // Course codes
  marks: Record<string, CourseMarks>; // Course code -> marks
}

export interface Course {
  code: string;
  title: string;
  department: Branch;
  credits: number;
  semester: number;
  facultyId: string;
  facultyName: string;
  description: string;
  maxCapacity: number;
  enrolledCount: number;
  syllabusTopics: string[];
}

export interface Faculty {
  id: string;
  empId: string;
  name: string;
  email: string;
  phone: string;
  department: Branch;
  designation: string;
  qualification: string;
  experienceYears: number;
  subjects: string[];
  avatarUrl?: string;
}

export interface AttendanceEntry {
  id: string;
  date: string;
  studentId: string;
  rollNo: string;
  studentName: string;
  courseCode: string;
  status: 'Present' | 'Absent' | 'Late';
}

export interface FeeInvoice {
  id: string;
  invoiceNo: string;
  studentId: string;
  studentName: string;
  rollNo: string;
  branch: Branch;
  semester: number;
  tuitionFee: number;
  labFee: number;
  examFee: number;
  libraryFee: number;
  totalAmount: number;
  paidAmount: number;
  status: FeeStatus;
  dueDate: string;
  paymentDate?: string;
  paymentMethod?: string;
  transactionRef?: string;
}

export interface BookIssue {
  id: string;
  studentId: string;
  rollNo: string;
  studentName: string;
  issueDate: string;
  dueDate: string;
  returnDate?: string;
  fineAmount: number;
  status: 'Issued' | 'Returned' | 'Overdue';
}

export interface LibraryBook {
  id: string;
  isbn: string;
  title: string;
  author: string;
  category: string;
  publisher: string;
  edition: string;
  totalCopies: number;
  availableCopies: number;
  shelfLocation: string;
  issues: BookIssue[];
}

export interface JavaFile {
  name: string;
  path: string;
  category: 'model' | 'dao' | 'service' | 'gui' | 'main' | 'db';
  description: string;
  content: string;
}

export interface ProjectBlueprint {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  domain: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  techStack: string[];
  keyFeatures: string[];
  oopConcepts: string[];
  files: JavaFile[];
  databaseScript: string;
}

export interface VivaQuestion {
  id: string;
  category: 'OOP Concepts' | 'Core Java & JVM' | 'Collections Framework' | 'JDBC & Database' | 'Exception Handling' | 'GUI (Swing/JavaFX)' | 'Multi-threading';
  question: string;
  answer: string;
  keyPoints: string[];
  codeSnippet?: string;
  difficulty: 'Basic' | 'Intermediate' | 'Advanced';
  frequency: 'Very Common' | 'Common' | 'Tricky';
}

export type MainTab = 
  | 'dashboard'
  | 'students'
  | 'courses'
  | 'attendance'
  | 'grades'
  | 'fees'
  | 'library'
  | 'java-studio'
  | 'jvm-runner'
  | 'uml'
  | 'viva'
  | 'report';
