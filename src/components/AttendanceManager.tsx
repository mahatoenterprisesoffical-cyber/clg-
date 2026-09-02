import React, { useState } from 'react';
import { 
  CalendarCheck, 
  Check, 
  X, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Search,
  Filter
} from 'lucide-react';
import { Student, Course } from '../types';

interface AttendanceManagerProps {
  students: Student[];
  courses: Course[];
  onUpdateAttendance: (studentId: string, newPercentage: number) => void;
}

export const AttendanceManager: React.FC<AttendanceManagerProps> = ({
  students,
  courses,
  onUpdateAttendance
}) => {
  const [selectedCourse, setSelectedCourse] = useState<string>(courses[0]?.code || 'CS401');
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [dailyStatus, setDailyStatus] = useState<Record<string, 'Present' | 'Absent' | 'Late'>>({});
  const [searchQuery, setSearchQuery] = useState('');

  const currentCourse = courses.find((c) => c.code === selectedCourse);

  const toggleStatus = (studentId: string, status: 'Present' | 'Absent' | 'Late') => {
    setDailyStatus((prev) => ({
      ...prev,
      [studentId]: status
    }));

    // Adjust attendance percentage slightly for simulation
    const student = students.find((s) => s.id === studentId);
    if (student) {
      let delta = 0;
      if (status === 'Present') delta = 0.5;
      else if (status === 'Absent') delta = -0.8;
      const updated = Math.min(100, Math.max(0, parseFloat((student.attendancePercentage + delta).toFixed(1))));
      onUpdateAttendance(studentId, updated);
    }
  };

  const markAll = (status: 'Present' | 'Absent') => {
    const updated: Record<string, 'Present' | 'Absent' | 'Late'> = {};
    students.forEach((s) => {
      updated[s.id] = status;
      let delta = status === 'Present' ? 0.4 : -0.6;
      const newPct = Math.min(100, Math.max(0, parseFloat((s.attendancePercentage + delta).toFixed(1))));
      onUpdateAttendance(s.id, newPct);
    });
    setDailyStatus(updated);
  };

  const presentCount = Object.values(dailyStatus).filter((s) => s === 'Present').length;
  const absentCount = Object.values(dailyStatus).filter((s) => s === 'Absent').length;
  const lateCount = Object.values(dailyStatus).filter((s) => s === 'Late').length;

  const filteredStudents = students.filter((s) => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.rollNo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Banner & Quick Bulk Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
            <CalendarCheck className="w-5 h-5 text-blue-600" />
            <span>Attendance Ledger &amp; Eligibility Engine</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Log subject-wise daily attendance records and enforce minimum 75% university examination eligibility criteria.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => markAll('Present')}
            className="px-3 py-1.5 bg-green-50 hover:bg-green-100 text-green-700 border border-green-200 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Mark All Present
          </button>
          <button
            onClick={() => markAll('Absent')}
            className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Mark All Absent
          </button>
        </div>
      </div>

      {/* Course & Date Selector Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white border border-slate-200 rounded-xl p-4 shadow-xs text-xs">
        <div>
          <label className="block text-slate-700 font-semibold mb-1">Select Subject / Course</label>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
          >
            {courses.map((c) => (
              <option key={c.code} value={c.code}>
                {c.code}: {c.title} ({c.facultyName})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-slate-700 font-semibold mb-1">Session Date</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
          />
        </div>

        <div>
          <label className="block text-slate-700 font-semibold mb-1">Search Student</label>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name or roll..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Stats Summary Chips */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Enrolled</div>
            <div className="text-2xl font-bold text-slate-900 mt-1">{students.length}</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
            {students.length}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Present Today</div>
            <div className="text-2xl font-bold text-green-600 mt-1">{presentCount}</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-green-50 text-green-600 flex items-center justify-center">
            <Check className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Absent Today</div>
            <div className="text-2xl font-bold text-rose-600 mt-1">{absentCount}</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
            <X className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Shortage (&lt;75%)</div>
            <div className="text-2xl font-bold text-amber-600 mt-1">
              {students.filter((s) => s.attendancePercentage < 75.0).length}
            </div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
            <AlertTriangle className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Attendance Roster Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Daily Attendance Sheet • {currentCourse?.code}: {currentCourse?.title}
          </h3>
          <span className="text-xs text-slate-500">Date: <strong className="text-slate-800">{selectedDate}</strong></span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="px-6 py-3.5">Roll No</th>
                <th className="px-6 py-3.5">Student Name</th>
                <th className="px-6 py-3.5">Department</th>
                <th className="px-6 py-3.5">Cumulative Attendance</th>
                <th className="px-6 py-3.5">Eligibility Status</th>
                <th className="px-6 py-3.5 text-center">Mark Attendance</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-slate-100">
              {filteredStudents.map((student) => {
                const status = dailyStatus[student.id] || 'Present';
                const isShortage = student.attendancePercentage < 75.0;

                return (
                  <tr key={student.id} className="hover:bg-slate-50/75 transition-colors">
                    <td className="px-6 py-4 font-mono font-bold text-xs text-slate-800">
                      {student.rollNo}
                    </td>
                    <td className="px-6 py-4 font-semibold text-slate-900">
                      {student.name}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {student.branch} • Sem {student.semester}
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs font-bold">
                          <span className={isShortage ? 'text-rose-600' : 'text-green-600'}>
                            {student.attendancePercentage}%
                          </span>
                        </div>
                        <div className="w-32 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${isShortage ? 'bg-rose-500' : 'bg-green-500'}`}
                            style={{ width: `${student.attendancePercentage}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {isShortage ? (
                        <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          <span>Debarred (&lt;75%)</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          <span>Eligible</span>
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center space-x-1.5">
                        <button
                          onClick={() => toggleStatus(student.id, 'Present')}
                          className={`w-7 h-7 rounded-md text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                            status === 'Present'
                              ? 'bg-green-600 text-white shadow-xs'
                              : 'bg-slate-100 text-slate-600 hover:bg-green-100 hover:text-green-800'
                          }`}
                          title="Mark Present"
                        >
                          P
                        </button>
                        <button
                          onClick={() => toggleStatus(student.id, 'Late')}
                          className={`w-7 h-7 rounded-md text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                            status === 'Late'
                              ? 'bg-orange-500 text-white shadow-xs'
                              : 'bg-slate-100 text-slate-600 hover:bg-orange-100 hover:text-orange-800'
                          }`}
                          title="Mark Late"
                        >
                          L
                        </button>
                        <button
                          onClick={() => toggleStatus(student.id, 'Absent')}
                          className={`w-7 h-7 rounded-md text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                            status === 'Absent'
                              ? 'bg-rose-600 text-white shadow-xs'
                              : 'bg-slate-100 text-slate-600 hover:bg-rose-100 hover:text-rose-800'
                          }`}
                          title="Mark Absent"
                        >
                          A
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
