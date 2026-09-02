import React from 'react';
import { 
  Users, 
  Award, 
  CalendarCheck, 
  AlertTriangle, 
  BookOpen, 
  CreditCard, 
  ArrowUpRight, 
  Terminal, 
  Code2, 
  FileText,
  UserPlus,
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowRight
} from 'lucide-react';
import { Student, Course, Faculty, FeeInvoice, LibraryBook, MainTab } from '../types';

interface DashboardProps {
  students: Student[];
  courses: Course[];
  faculty: Faculty[];
  fees: FeeInvoice[];
  books: LibraryBook[];
  onNavigate: (tab: MainTab) => void;
  onOpenMarksheet?: (student: Student) => void;
  onViewStudent?: (student: Student) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  students,
  courses,
  faculty,
  fees,
  books,
  onNavigate,
  onOpenMarksheet,
  onViewStudent
}) => {
  // Calculations
  const totalStudents = students.length;
  const avgCgpa = (students.reduce((acc, s) => acc + s.cgpa, 0) / (totalStudents || 1)).toFixed(2);
  const avgAttendance = (students.reduce((acc, s) => acc + s.attendancePercentage, 0) / (totalStudents || 1)).toFixed(1);
  const lowAttendanceStudents = students.filter((s) => s.attendancePercentage < 75.0);
  
  const totalFeeCollected = fees.reduce((acc, f) => acc + f.paidAmount, 0);
  const totalFeePending = fees.reduce((acc, f) => acc + (f.totalAmount - f.paidAmount), 0);
  const pendingInvoicesCount = fees.filter((f) => f.status !== 'Paid').length;

  // Group by branch
  const branchCounts: Record<string, number> = {};
  students.forEach((s) => {
    branchCounts[s.branch] = (branchCounts[s.branch] || 0) + 1;
  });

  return (
    <div className="space-y-6">
      {/* KPI Stats Grid - Professional Polish Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat 1: Total Students */}
        <div 
          onClick={() => onNavigate('students')}
          className="bg-white p-5 border border-slate-200 rounded-xl shadow-xs hover:border-blue-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Total Students</p>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">{totalStudents}</h3>
          <p className="text-xs text-green-600 mt-2 font-medium flex items-center">
            <span>Across {Object.keys(branchCounts).length} Academic Branches</span>
          </p>
        </div>

        {/* Stat 2: Active Courses */}
        <div 
          onClick={() => onNavigate('courses')}
          className="bg-white p-5 border border-slate-200 rounded-xl shadow-xs hover:border-blue-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Active Courses</p>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">{courses.length}</h3>
          <p className="text-xs text-slate-500 mt-2 font-medium">
            {faculty.length} Faculty Members Assigned
          </p>
        </div>

        {/* Stat 3: Avg Attendance */}
        <div 
          onClick={() => onNavigate('attendance')}
          className="bg-white p-5 border border-slate-200 rounded-xl shadow-xs hover:border-blue-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Avg Attendance</p>
            <div className={`p-2 rounded-lg transition-colors ${
              lowAttendanceStudents.length > 0 ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'
            }`}>
              <CalendarCheck className="w-4 h-4" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">{avgAttendance}%</h3>
          <p className={`text-xs mt-2 font-medium ${
            lowAttendanceStudents.length > 0 ? 'text-amber-600' : 'text-blue-600'
          }`}>
            {lowAttendanceStudents.length > 0 
              ? `${lowAttendanceStudents.length} Students < 75% (Shortage)` 
              : 'Target: 75%+ Compliant'}
          </p>
        </div>

        {/* Stat 4: Fee Reconciliation */}
        <div 
          onClick={() => onNavigate('fees')}
          className="bg-white p-5 border border-slate-200 rounded-xl shadow-xs hover:border-blue-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Fee Collections</p>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">₹{(totalFeeCollected / 1000).toFixed(0)}k</h3>
          <p className="text-xs text-orange-600 mt-2 font-medium">
            Pending: ₹{(totalFeePending / 1000).toFixed(0)}k ({pendingInvoicesCount} invoices)
          </p>
        </div>
      </div>

      {/* Defaulter Alert Banner (If Attendance Shortage Detected) */}
      {lowAttendanceStudents.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-amber-100 text-amber-700 rounded-lg shrink-0 mt-0.5">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-amber-900">
                Attendance Shortage Warning ({lowAttendanceStudents.length} Students &lt; 75% Threshold)
              </h4>
              <p className="text-xs text-amber-700 mt-0.5">
                Students below 75% attendance are debarred from End-Semester Exams per university statutory compliance.
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('attendance')}
            className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-lg shrink-0 transition-colors shadow-xs"
          >
            Review Defaulters
          </button>
        </div>
      )}

      {/* Main Content Area: Recent Student Registry Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="font-bold text-slate-800 text-base">Recent Student Registry</h2>
            <p className="text-xs text-slate-500">Live enrolled candidates and academic status</p>
          </div>
          <button
            onClick={() => onNavigate('students')}
            className="text-xs text-blue-600 hover:text-blue-700 font-semibold cursor-pointer flex items-center space-x-1"
          >
            <span>View Full Registry</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="px-6 py-3.5">Roll No</th>
                <th className="px-6 py-3.5">Full Name</th>
                <th className="px-6 py-3.5">Department</th>
                <th className="px-6 py-3.5">Semester</th>
                <th className="px-6 py-3.5">CGPA</th>
                <th className="px-6 py-3.5">Attendance</th>
                <th className="px-6 py-3.5">Fee Status</th>
                <th className="px-6 py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-slate-100">
              {students.slice(0, 6).map((student) => (
                <tr key={student.id} className="hover:bg-slate-50/75 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs font-semibold text-slate-700">
                    {student.rollNo}
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-900">
                    {student.name}
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    <span className="font-medium text-slate-800">{student.branch}</span>
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    Sem {student.semester}
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-slate-800">{student.cgpa.toFixed(2)}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      student.attendancePercentage >= 75.0 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {student.attendancePercentage}%
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      student.feeStatus === 'Paid' 
                        ? 'bg-green-100 text-green-700'
                        : student.feeStatus === 'Partial' 
                        ? 'bg-orange-100 text-orange-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {student.feeStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {onOpenMarksheet && (
                      <button
                        onClick={() => onOpenMarksheet(student)}
                        className="text-xs text-blue-600 hover:text-blue-800 font-medium hover:underline cursor-pointer"
                      >
                        Marksheet
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Two Column Grid: Top Merit Leaderboard & Quick Project Architecture */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Academic Merit & Rank List */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl shadow-xs p-5">
          <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-800 flex items-center space-x-2">
                <Award className="w-4 h-4 text-blue-600" />
                <span>Academic Merit &amp; Rank List</span>
              </h3>
              <p className="text-xs text-slate-500">Ranked by Cumulative Grade Point Average (CGPA)</p>
            </div>
            <button
              onClick={() => onNavigate('grades')}
              className="text-xs text-blue-600 hover:text-blue-700 font-semibold cursor-pointer"
            >
              Gradebook
            </button>
          </div>

          <div className="space-y-2.5">
            {[...students]
              .sort((a, b) => b.cgpa - a.cgpa)
              .slice(0, 4)
              .map((student, idx) => (
                <div
                  key={student.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100 hover:border-slate-300 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                      idx === 0 
                        ? 'bg-amber-100 text-amber-800 border border-amber-300' 
                        : idx === 1 
                        ? 'bg-slate-200 text-slate-700' 
                        : idx === 2 
                        ? 'bg-orange-100 text-orange-800' 
                        : 'bg-slate-100 text-slate-500'
                    }`}>
                      #{idx + 1}
                    </div>
                    <div>
                      <span className="font-semibold text-sm text-slate-900 block">{student.name}</span>
                      <span className="text-xs text-slate-500 font-mono">{student.rollNo} • {student.branch}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-bold text-base text-slate-900">{student.cgpa.toFixed(2)}</span>
                    <span className="text-[11px] text-slate-400 block">CGPA</span>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Right Col: Java Architecture & Submission Toolkit */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-xs p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-800 flex items-center space-x-2 mb-1">
              <Code2 className="w-4 h-4 text-blue-600" />
              <span>Java Submission Toolkit</span>
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Integrated academic artifacts and compilable project files
            </p>

            <div className="space-y-2">
              <button
                onClick={() => onNavigate('java-studio')}
                className="w-full flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100 hover:border-blue-300 hover:bg-blue-50/40 transition-colors text-left group cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                    <Code2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">Java 17 OOP Sources</span>
                    <span className="text-[11px] text-slate-500">model, dao, service, gui</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
              </button>

              <button
                onClick={() => onNavigate('jvm-runner')}
                className="w-full flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100 hover:border-emerald-300 hover:bg-emerald-50/40 transition-colors text-left group cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
                    <Terminal className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">Virtual JVM Console</span>
                    <span className="text-[11px] text-slate-500">Interactive CLI simulator</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
              </button>

              <button
                onClick={() => onNavigate('viva')}
                className="w-full flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100 hover:border-rose-300 hover:bg-rose-50/40 transition-colors text-left group cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-rose-100 text-rose-600 rounded-lg">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">Viva-Voce Questions</span>
                    <span className="text-[11px] text-slate-500">Defense Q&amp;A &amp; Examiner tips</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-rose-600 group-hover:translate-x-0.5 transition-all" />
              </button>

              <button
                onClick={() => onNavigate('report')}
                className="w-full flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100 hover:border-purple-300 hover:bg-purple-50/40 transition-colors text-left group cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">Academic Report (SRS)</span>
                    <span className="text-[11px] text-slate-500">Synopsis, SRS &amp; Test Matrix</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-purple-600 group-hover:translate-x-0.5 transition-all" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
