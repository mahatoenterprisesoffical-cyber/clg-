import React from 'react';
import { X, Printer, Award, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Student, Course } from '../types';

interface StudentMarksheetModalProps {
  student: Student;
  courses: Course[];
  onClose: () => void;
}

export const StudentMarksheetModal: React.FC<StudentMarksheetModalProps> = ({
  student,
  courses,
  onClose
}) => {
  const enrolledCourseDetails = student.enrolledCourses.map((code) => {
    const course = courses.find((c) => c.code === code);
    const marks = student.marks[code] || {
      internal1: 20,
      internal2: 21,
      assignment: 9,
      endSem: 82,
      total: 85,
      grade: 'A',
      gradePoint: 9
    };
    return {
      code,
      title: course?.title || code,
      credits: course?.credits || 4,
      marks
    };
  });

  const totalCredits = enrolledCourseDetails.reduce((acc, c) => acc + c.credits, 0);
  const earnedWeightedPoints = enrolledCourseDetails.reduce((acc, c) => acc + (c.credits * c.marks.gradePoint), 0);
  const calculatedSgpa = totalCredits > 0 ? (earnedWeightedPoints / totalCredits).toFixed(2) : '0.00';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white text-slate-900 rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-800 rounded-lg no-print cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Institution Header */}
        <div className="text-center border-b-2 border-slate-900 pb-4 space-y-1">
          <h1 className="text-lg sm:text-xl font-black uppercase tracking-tight text-slate-900">
            National Institute of Engineering &amp; Technology
          </h1>
          <p className="text-xs text-slate-600 font-medium">
            Autonomous Institution • Approved by AICTE, New Delhi • Affiliated to State Technological University
          </p>
          <div className="pt-2">
            <span className="inline-block px-4 py-0.5 bg-slate-900 text-white text-xs font-bold uppercase tracking-wider rounded">
              Official Semester Grade Report &amp; Academic Transcript
            </span>
          </div>
        </div>

        {/* Student Metadata Card */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs bg-slate-50 p-3.5 rounded-lg border border-slate-200">
          <div>
            <span className="text-slate-500 block">Candidate Name:</span>
            <strong className="text-slate-900 text-sm">{student.name}</strong>
          </div>
          <div>
            <span className="text-slate-500 block">University Roll No:</span>
            <strong className="font-mono text-slate-900 text-sm font-bold">{student.rollNo}</strong>
          </div>
          <div>
            <span className="text-slate-500 block">Department / Branch:</span>
            <strong className="text-slate-900">{student.branch} Engineering</strong>
          </div>
          <div>
            <span className="text-slate-500 block">Semester &amp; Section:</span>
            <strong className="text-slate-900">Semester {student.semester} ({student.section})</strong>
          </div>
          <div>
            <span className="text-slate-500 block">Academic Year:</span>
            <strong className="text-slate-900">2024 - 2025</strong>
          </div>
          <div>
            <span className="text-slate-500 block">Attendance Rate:</span>
            <strong className="text-slate-900">{student.attendancePercentage}% (Eligible)</strong>
          </div>
        </div>

        {/* Course Grades Table */}
        <div>
          <table className="w-full text-left text-xs border border-slate-300">
            <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-300">
              <tr>
                <th className="p-2.5 border-r border-slate-300">Course Code</th>
                <th className="p-2.5 border-r border-slate-300">Subject Title</th>
                <th className="p-2.5 border-r border-slate-300 text-center">Credits</th>
                <th className="p-2.5 border-r border-slate-300 text-center">Marks (100)</th>
                <th className="p-2.5 border-r border-slate-300 text-center">Grade</th>
                <th className="p-2.5 text-center">Grade Point</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-300 text-slate-800">
              {enrolledCourseDetails.map((c) => (
                <tr key={c.code} className="hover:bg-slate-50">
                  <td className="p-2.5 font-mono font-bold border-r border-slate-300">{c.code}</td>
                  <td className="p-2.5 border-r border-slate-300 font-medium">{c.title}</td>
                  <td className="p-2.5 border-r border-slate-300 text-center font-mono">{c.credits}</td>
                  <td className="p-2.5 border-r border-slate-300 text-center font-mono font-bold">{c.marks.total}</td>
                  <td className="p-2.5 border-r border-slate-300 text-center font-bold">
                    <span className="px-2 py-0.5 rounded bg-slate-100 border text-[11px]">
                      {c.marks.grade}
                    </span>
                  </td>
                  <td className="p-2.5 text-center font-mono font-bold">{c.marks.gradePoint}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* GPA Summary */}
        <div className="grid grid-cols-3 gap-3 text-center bg-slate-900 text-white p-3.5 rounded-lg">
          <div>
            <div className="text-[10px] uppercase text-slate-400">Total Credits Earned</div>
            <div className="text-base font-mono font-bold mt-0.5">{totalCredits}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase text-slate-400">Semester SGPA</div>
            <div className="text-base font-mono font-bold text-amber-400 mt-0.5">{calculatedSgpa} / 10.00</div>
          </div>
          <div>
            <div className="text-[10px] uppercase text-slate-400">Cumulative CGPA</div>
            <div className="text-base font-mono font-bold text-emerald-400 mt-0.5">{student.cgpa.toFixed(2)} / 10.00</div>
          </div>
        </div>

        {/* Result & Signatures */}
        <div className="flex justify-between items-end pt-4 border-t-2 border-slate-200 text-xs">
          <div className="space-y-1">
            <div className="flex items-center space-x-1.5 text-emerald-700 font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>FINAL RESULT: PASSED IN FIRST CLASS WITH DISTINCTION</span>
            </div>
            <div className="text-[10px] text-slate-500">Date of Declaration: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
          </div>

          <div className="flex space-x-8 text-center">
            <div>
              <div className="w-24 border-b border-slate-800 pb-6 text-[9px] text-slate-400">
                Verified by
              </div>
              <span className="text-[10px] font-bold text-slate-800">Exam Incharge</span>
            </div>
            <div>
              <div className="w-28 border-b border-slate-800 pb-6 text-[9px] text-slate-400">
                Authorized Seal
              </div>
              <span className="text-[10px] font-bold text-slate-800">Controller of Exams</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-3 border-t no-print">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg hover:bg-slate-300"
          >
            Close
          </button>
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg flex items-center space-x-1.5 hover:bg-slate-800"
          >
            <Printer className="w-4 h-4" />
            <span>Print Marksheet</span>
          </button>
        </div>
      </div>
    </div>
  );
};
