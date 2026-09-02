import React, { useState } from 'react';
import { 
  Navbar 
} from './components/Navbar';
import { 
  Dashboard 
} from './components/Dashboard';
import { 
  StudentManager 
} from './components/StudentManager';
import { 
  AttendanceManager 
} from './components/AttendanceManager';
import { 
  CourseManager 
} from './components/CourseManager';
import { 
  GradeManager 
} from './components/GradeManager';
import { 
  FeeManager 
} from './components/FeeManager';
import { 
  LibraryManager 
} from './components/LibraryManager';
import { 
  JavaCodeViewer 
} from './components/JavaCodeViewer';
import { 
  JavaConsoleRunner 
} from './components/JavaConsoleRunner';
import { 
  UmlDiagrams 
} from './components/UmlDiagrams';
import { 
  VivaPreparation 
} from './components/VivaPreparation';
import { 
  ProjectReportViewer 
} from './components/ProjectReportViewer';
import { 
  StudentMarksheetModal 
} from './components/StudentMarksheetModal';

import { 
  INITIAL_STUDENTS, 
  INITIAL_COURSES, 
  INITIAL_FACULTY, 
  INITIAL_FEES, 
  INITIAL_BOOKS 
} from './data/initialData';
import { PROJECT_BLUEPRINTS } from './data/javaSourceCodes';
import { VIVA_QUESTIONS } from './data/vivaQuestions';
import { downloadProjectZip } from './utils/exportProject';
import { Student, Course, Faculty, FeeInvoice, LibraryBook, CourseMarks, ProjectBlueprint, MainTab } from './types';

export function App() {
  const [activeTab, setActiveTab] = useState<MainTab>('dashboard');
  
  // App State
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [faculty, setFaculty] = useState<Faculty[]>(INITIAL_FACULTY);
  const [fees, setFees] = useState<FeeInvoice[]>(INITIAL_FEES);
  const [books, setBooks] = useState<LibraryBook[]>(INITIAL_BOOKS);
  
  // Selected Java Blueprint for Code Studio
  const [selectedBlueprint, setSelectedBlueprint] = useState<ProjectBlueprint>(PROJECT_BLUEPRINTS[0]);

  // Marksheet Modal State
  const [selectedStudentForMarksheet, setSelectedStudentForMarksheet] = useState<Student | null>(null);

  // Student CRUD
  const handleAddStudent = (newStudent: Student) => {
    setStudents((prev) => [newStudent, ...prev]);
  };

  const handleUpdateStudent = (updatedStudent: Student) => {
    setStudents((prev) => prev.map((s) => s.id === updatedStudent.id ? updatedStudent : s));
  };

  const handleDeleteStudent = (studentId: string) => {
    setStudents((prev) => prev.filter((s) => s.id !== studentId));
  };

  // Attendance Update
  const handleUpdateAttendance = (studentId: string, newPercentage: number) => {
    setStudents((prev) => prev.map((s) => s.id === studentId ? { ...s, attendancePercentage: newPercentage } : s));
  };

  // Course Add
  const handleAddCourse = (newCourse: Course) => {
    setCourses((prev) => [...prev, newCourse]);
  };

  // Marks / Grade Update
  const handleUpdateMarks = (studentId: string, courseCode: string, marks: CourseMarks) => {
    setStudents((prev) => prev.map((s) => {
      if (s.id !== studentId) return s;
      const updatedMarks = { ...s.marks, [courseCode]: marks };
      // Recalculate CGPA
      const marksList = Object.values(updatedMarks) as CourseMarks[];
      const avgGradePoint = marksList.reduce((acc: number, m: CourseMarks) => acc + m.gradePoint, 0) / (marksList.length || 1);
      return {
        ...s,
        marks: updatedMarks,
        cgpa: parseFloat(avgGradePoint.toFixed(2))
      };
    }));
  };

  // Fee Payment Recording
  const handleRecordPayment = (invoiceId: string, amount: number, method: string) => {
    setFees((prev) => prev.map((inv) => {
      if (inv.id !== invoiceId) return inv;
      const newPaid = inv.paidAmount + amount;
      const newStatus = newPaid >= inv.totalAmount ? 'Paid' : 'Partial';
      return {
        ...inv,
        paidAmount: newPaid,
        status: newStatus,
        paymentDate: new Date().toISOString().split('T')[0],
        paymentMethod: method
      };
    }));
  };

  // Library Book Borrowing
  const handleIssueBook = (bookId: string, studentId: string, dueDate: string) => {
    const stu = students.find((s) => s.id === studentId);
    if (!stu) return;

    setBooks((prev) => prev.map((b) => {
      if (b.id !== bookId || b.availableCopies <= 0) return b;
      return {
        ...b,
        availableCopies: b.availableCopies - 1,
        issues: [
          ...b.issues,
          {
            id: `ISS${Date.now().toString().slice(-4)}`,
            studentId: stu.id,
            studentName: stu.name,
            rollNo: stu.rollNo,
            issueDate: new Date().toISOString().split('T')[0],
            dueDate,
            isReturned: false
          }
        ]
      };
    }));
  };

  // Library Book Return
  const handleReturnBook = (bookId: string, issueId: string) => {
    setBooks((prev) => prev.map((b) => {
      if (b.id !== bookId) return b;
      return {
        ...b,
        availableCopies: Math.min(b.totalCopies, b.availableCopies + 1),
        issues: b.issues.filter((iss) => iss.id !== issueId)
      };
    }));
  };

  const handleQuickExport = () => {
    downloadProjectZip(selectedBlueprint);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-500/20 selection:text-blue-900">
      {/* Top Navbar */}
      <Navbar
        currentTab={activeTab}
        onSelectTab={setActiveTab}
        selectedBlueprint={selectedBlueprint}
        allBlueprints={PROJECT_BLUEPRINTS}
        onSelectBlueprint={setSelectedBlueprint}
        onQuickExport={handleQuickExport}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 md:p-8">
        {activeTab === 'dashboard' && (
          <Dashboard
            students={students}
            courses={courses}
            faculty={faculty}
            fees={fees}
            books={books}
            onNavigate={setActiveTab}
            onOpenMarksheet={(s) => setSelectedStudentForMarksheet(s)}
          />
        )}

        {activeTab === 'students' && (
          <StudentManager
            students={students}
            courses={courses}
            onAddStudent={handleAddStudent}
            onUpdateStudent={handleUpdateStudent}
            onDeleteStudent={handleDeleteStudent}
            onOpenMarksheet={(s) => setSelectedStudentForMarksheet(s)}
          />
        )}

        {activeTab === 'attendance' && (
          <AttendanceManager
            students={students}
            courses={courses}
            onUpdateAttendance={handleUpdateAttendance}
          />
        )}

        {activeTab === 'courses' && (
          <CourseManager
            courses={courses}
            faculty={faculty}
            students={students}
            onAddCourse={handleAddCourse}
          />
        )}

        {activeTab === 'grades' && (
          <GradeManager
            students={students}
            courses={courses}
            onUpdateMarks={handleUpdateMarks}
            onOpenMarksheet={(s) => setSelectedStudentForMarksheet(s)}
          />
        )}

        {activeTab === 'fees' && (
          <FeeManager
            fees={fees}
            onRecordPayment={handleRecordPayment}
          />
        )}

        {activeTab === 'library' && (
          <LibraryManager
            books={books}
            students={students}
            onIssueBook={handleIssueBook}
            onReturnBook={handleReturnBook}
            onAddBook={(b) => setBooks((prev) => [b, ...prev])}
          />
        )}

        {activeTab === 'java-studio' && (
          <JavaCodeViewer
            blueprint={selectedBlueprint}
            allBlueprints={PROJECT_BLUEPRINTS}
            onSelectBlueprint={setSelectedBlueprint}
            onQuickExport={handleQuickExport}
          />
        )}

        {activeTab === 'jvm-runner' && (
          <JavaConsoleRunner
            students={students}
          />
        )}

        {activeTab === 'uml' && (
          <UmlDiagrams />
        )}

        {activeTab === 'viva' && (
          <VivaPreparation
            questions={VIVA_QUESTIONS}
          />
        )}

        {activeTab === 'report' && (
          <ProjectReportViewer />
        )}
      </main>

      {/* Marksheet Modal */}
      {selectedStudentForMarksheet && (
        <StudentMarksheetModal
          student={selectedStudentForMarksheet}
          courses={courses}
          onClose={() => setSelectedStudentForMarksheet(null)}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500 no-print">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            <strong className="text-slate-700 font-semibold">College ERP &amp; Java Academic Suite</strong> • Java 17+ OOP, Swing, JDBC &amp; React Management Hub
          </div>
          <div className="flex items-center space-x-3 text-slate-500 font-medium">
            <span>Academic Submission Ready</span>
            <span>•</span>
            <span>Includes Viva Q&amp;A &amp; SRS</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
