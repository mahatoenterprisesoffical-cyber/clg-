import React, { useState } from 'react';
import { 
  Award, 
  FileSpreadsheet, 
  CheckCircle2, 
  BarChart3
} from 'lucide-react';
import { Student, Course, CourseMarks } from '../types';

interface GradeManagerProps {
  students: Student[];
  courses: Course[];
  onUpdateMarks: (studentId: string, courseCode: string, marks: CourseMarks) => void;
  onOpenMarksheet: (student: Student) => void;
}

export const GradeManager: React.FC<GradeManagerProps> = ({
  students,
  courses,
  onUpdateMarks,
  onOpenMarksheet
}) => {
  const [selectedStudentId, setSelectedStudentId] = useState<string>(students[0]?.id || '');
  const [selectedCourseCode, setSelectedCourseCode] = useState<string>(courses[0]?.code || 'CS401');

  const selectedStudent = students.find((s) => s.id === selectedStudentId) || students[0];
  const currentMarks: CourseMarks = selectedStudent?.marks[selectedCourseCode] || {
    internal1: 20,
    internal2: 20,
    assignment: 8,
    endSem: 80,
    total: 82,
    grade: 'A',
    gradePoint: 9
  };

  const [editForm, setEditForm] = useState({
    internal1: currentMarks.internal1,
    internal2: currentMarks.internal2,
    assignment: currentMarks.assignment,
    endSem: currentMarks.endSem
  });

  const calculateResult = (i1: number, i2: number, asg: number, end: number) => {
    const internalAvg = ((i1 + i2) / 50) * 25;
    const endSemScaled = (end / 100) * 65;
    const total = Math.round(internalAvg + asg + endSemScaled);

    let grade: 'A+' | 'A' | 'B+' | 'B' | 'C' | 'D' | 'F' = 'F';
    let gradePoint = 0;

    if (total >= 90) { grade = 'A+'; gradePoint = 10; }
    else if (total >= 80) { grade = 'A'; gradePoint = 9; }
    else if (total >= 70) { grade = 'B+'; gradePoint = 8; }
    else if (total >= 60) { grade = 'B'; gradePoint = 7; }
    else if (total >= 50) { grade = 'C'; gradePoint = 6; }
    else if (total >= 40) { grade = 'D'; gradePoint = 5; }
    else { grade = 'F'; gradePoint = 0; }

    return { total, grade, gradePoint };
  };

  const handleSaveMarks = (e: React.FormEvent) => {
    e.preventDefault();
    const result = calculateResult(editForm.internal1, editForm.internal2, editForm.assignment, editForm.endSem);
    const updatedMarks: CourseMarks = {
      internal1: editForm.internal1,
      internal2: editForm.internal2,
      assignment: editForm.assignment,
      endSem: editForm.endSem,
      total: result.total,
      grade: result.grade,
      gradePoint: result.gradePoint
    };

    onUpdateMarks(selectedStudent.id, selectedCourseCode, updatedMarks);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
            <Award className="w-5 h-5 text-blue-600" />
            <span>Examinations, Grading &amp; CGPA Engine</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Continuous internal evaluations, SGPA/CGPA calculations, and standardized academic marksheet generation.
          </p>
        </div>

        {selectedStudent && (
          <button
            onClick={() => onOpenMarksheet(selectedStudent)}
            className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs sm:text-sm rounded-lg shadow-xs transition-colors cursor-pointer shrink-0"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Generate Marksheet</span>
          </button>
        )}
      </div>

      {/* Main Grid: Student Gradebook & Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col: Student List */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-3">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Student Roster
          </h3>

          <div className="space-y-1.5 max-h-[500px] overflow-y-auto pr-1">
            {students.map((s) => (
              <div
                key={s.id}
                onClick={() => {
                  setSelectedStudentId(s.id);
                  const marks = s.marks[selectedCourseCode] || { internal1: 20, internal2: 20, assignment: 8, endSem: 80 };
                  setEditForm({
                    internal1: marks.internal1,
                    internal2: marks.internal2,
                    assignment: marks.assignment,
                    endSem: marks.endSem
                  });
                }}
                className={`p-3 rounded-lg border transition-all cursor-pointer text-xs flex items-center justify-between ${
                  s.id === selectedStudentId
                    ? 'bg-blue-50/80 border-blue-200 text-blue-900 font-semibold'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div>
                  <div className="font-bold flex items-center space-x-1.5">
                    <span>{s.name}</span>
                    <span className="font-mono text-[10px] text-blue-600">({s.rollNo})</span>
                  </div>
                  <div className="text-[11px] text-slate-500">{s.branch} • Sem {s.semester}</div>
                </div>
                <div className="text-right">
                  <div className="font-mono font-bold text-slate-900">{s.cgpa.toFixed(2)}</div>
                  <div className="text-[10px] text-slate-400">CGPA</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Center & Right Col: Evaluation & Marks Entry Form */}
        <div className="lg:col-span-2 space-y-6">
          {selectedStudent && (
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <span className="font-mono text-xs font-bold text-blue-600">{selectedStudent.rollNo}</span>
                  <h3 className="text-base font-bold text-slate-900">{selectedStudent.name}</h3>
                  <p className="text-xs text-slate-500">{selectedStudent.branch} • Semester {selectedStudent.semester}</p>
                </div>
                <div className="flex items-center space-x-3 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200">
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase font-semibold">Cumulative CGPA</div>
                    <div className="text-xl font-mono font-bold text-slate-900">{selectedStudent.cgpa.toFixed(2)} / 10.0</div>
                  </div>
                  <Award className="w-6 h-6 text-blue-600" />
                </div>
              </div>

              {/* Subject Selector for Marks Entry */}
              <div className="flex items-center space-x-3 text-xs">
                <label className="font-semibold text-slate-700">Target Subject:</label>
                <select
                  value={selectedCourseCode}
                  onChange={(e) => {
                    const code = e.target.value;
                    setSelectedCourseCode(code);
                    const marks = selectedStudent.marks[code] || { internal1: 20, internal2: 20, assignment: 8, endSem: 80 };
                    setEditForm({
                      internal1: marks.internal1,
                      internal2: marks.internal2,
                      assignment: marks.assignment,
                      endSem: marks.endSem
                    });
                  }}
                  className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
                >
                  {courses.map((c) => (
                    <option key={c.code} value={c.code}>{c.code}: {c.title}</option>
                  ))}
                </select>
              </div>

              {/* Live Assessment Form */}
              <form onSubmit={handleSaveMarks} className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <label className="block text-slate-700 font-semibold mb-1">Continuous Internal 1 (Max 25)</label>
                    <input
                      type="number"
                      min="0"
                      max="25"
                      value={editForm.internal1}
                      onChange={(e) => setEditForm({ ...editForm, internal1: Number(e.target.value) })}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded text-slate-900 font-mono font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <label className="block text-slate-700 font-semibold mb-1">Continuous Internal 2 (Max 25)</label>
                    <input
                      type="number"
                      min="0"
                      max="25"
                      value={editForm.internal2}
                      onChange={(e) => setEditForm({ ...editForm, internal2: Number(e.target.value) })}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded text-slate-900 font-mono font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <label className="block text-slate-700 font-semibold mb-1">Assignment &amp; Lab (Max 10)</label>
                    <input
                      type="number"
                      min="0"
                      max="10"
                      value={editForm.assignment}
                      onChange={(e) => setEditForm({ ...editForm, assignment: Number(e.target.value) })}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded text-slate-900 font-mono font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <label className="block text-slate-700 font-semibold mb-1">End Sem Exam (Max 100)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={editForm.endSem}
                      onChange={(e) => setEditForm({ ...editForm, endSem: Number(e.target.value) })}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded text-slate-900 font-mono font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Calculated Result Preview */}
                {(() => {
                  const res = calculateResult(editForm.internal1, editForm.internal2, editForm.assignment, editForm.endSem);
                  return (
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="text-[10px] uppercase font-bold text-slate-500">Calculated Final Score</div>
                        <div className="text-xl font-bold text-slate-900 font-mono">
                          {res.total} / 100 <span className="text-xs text-slate-500 font-normal">Marks</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <div className="text-[10px] text-slate-500 uppercase font-semibold">Grade</div>
                          <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-green-100 text-green-800">
                            {res.grade}
                          </span>
                        </div>
                        <div className="text-center">
                          <div className="text-[10px] text-slate-500 uppercase font-semibold">Grade Point</div>
                          <span className="font-mono text-sm font-bold text-slate-900">
                            {res.gradePoint}
                          </span>
                        </div>
                        <button
                          type="submit"
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs rounded-lg transition-colors cursor-pointer shadow-xs"
                        >
                          Commit Grade
                        </button>
                      </div>
                    </div>
                  );
                })()}
              </form>

              {/* Student's Current Enrolled Courses Table */}
              <div className="pt-2">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Academic Performance Summary (Semester {selectedStudent.semester})
                </h4>
                <div className="overflow-x-auto border border-slate-200 rounded-lg">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-semibold">
                      <tr>
                        <th className="py-2.5 px-3">Course</th>
                        <th className="py-2.5 px-3">Title</th>
                        <th className="py-2.5 px-3 text-center">Internal (50)</th>
                        <th className="py-2.5 px-3 text-center">End Sem (100)</th>
                        <th className="py-2.5 px-3 text-center">Total (100)</th>
                        <th className="py-2.5 px-3 text-right">Grade</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {selectedStudent.enrolledCourses.map((code) => {
                        const m = selectedStudent.marks[code];
                        const c = courses.find((course) => course.code === code);
                        return (
                          <tr key={code} className="hover:bg-slate-50/75">
                            <td className="py-2.5 px-3 font-mono font-bold text-blue-700">{code}</td>
                            <td className="py-2.5 px-3 font-medium text-slate-900">{c?.title || code}</td>
                            <td className="py-2.5 px-3 text-center font-mono">
                              {m ? m.internal1 + m.internal2 : '-'}
                            </td>
                            <td className="py-2.5 px-3 text-center font-mono">
                              {m ? m.endSem : '-'}
                            </td>
                            <td className="py-2.5 px-3 text-center font-mono font-bold text-slate-900">
                              {m ? m.total : '-'}
                            </td>
                            <td className="py-2.5 px-3 text-right">
                              {m ? (
                                <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-green-100 text-green-700">
                                  {m.grade}
                                </span>
                              ) : (
                                <span className="text-slate-400">Pending</span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
