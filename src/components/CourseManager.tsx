import React, { useState } from 'react';
import { 
  BookOpen, 
  Plus, 
  Users, 
  GraduationCap, 
  Calendar, 
  X
} from 'lucide-react';
import { Course, Faculty, Student, Branch } from '../types';

interface CourseManagerProps {
  courses: Course[];
  faculty: Faculty[];
  students: Student[];
  onAddCourse: (course: Course) => void;
}

export const CourseManager: React.FC<CourseManagerProps> = ({
  courses,
  faculty,
  students,
  onAddCourse
}) => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedCourseForStudents, setSelectedCourseForStudents] = useState<Course | null>(null);

  const [formData, setFormData] = useState({
    code: '',
    title: '',
    department: 'CSE' as Branch,
    credits: 4,
    semester: 4,
    facultyId: faculty[0]?.id || 'FAC01',
    description: '',
    maxCapacity: 60,
    syllabusTopics: 'Classes & Objects, Inheritance, Polymorphism, JDBC, Swing'
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const fac = faculty.find((f) => f.id === formData.facultyId);
    const newCourse: Course = {
      code: formData.code.toUpperCase(),
      title: formData.title,
      department: formData.department,
      credits: formData.credits,
      semester: formData.semester,
      facultyId: formData.facultyId,
      facultyName: fac ? fac.name : 'Unassigned',
      description: formData.description,
      maxCapacity: formData.maxCapacity,
      enrolledCount: 0,
      syllabusTopics: formData.syllabusTopics.split(',').map((t) => t.trim()).filter(Boolean)
    };
    onAddCourse(newCourse);
    setIsAddOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <span>Academic Curriculum &amp; Course Catalog</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Department course structures, credit allocations, faculty assignments, and syllabus outlines.
          </p>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs sm:text-sm rounded-lg shadow-xs transition-colors cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Subject</span>
        </button>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {courses.map((course) => {
          const enrolledStudents = students.filter((s) => s.enrolledCourses.includes(course.code));

          return (
            <div
              key={course.code}
              className="bg-white border border-slate-200 hover:border-blue-300 rounded-xl p-5 flex flex-col justify-between space-y-4 shadow-xs hover:shadow-sm transition-all"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-blue-700 px-2.5 py-0.5 rounded-md bg-blue-50 border border-blue-200">
                    {course.code}
                  </span>
                  <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                    {course.credits} Credits • Sem {course.semester}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 mt-3 line-clamp-1">
                  {course.title}
                </h3>

                <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                  {course.description}
                </p>

                {/* Faculty Info */}
                <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center space-x-2 text-xs">
                  <GraduationCap className="w-4 h-4 text-blue-600 shrink-0" />
                  <div className="truncate">
                    <span className="text-slate-500">Faculty: </span>
                    <strong className="text-slate-800 font-medium">{course.facultyName}</strong>
                  </div>
                </div>

                {/* Syllabus Tags */}
                <div className="mt-3 space-y-1.5">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    Key Topics
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {course.syllabusTopics.slice(0, 4).map((topic, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 text-[10px] font-medium rounded bg-slate-100 text-slate-700 border border-slate-200"
                      >
                        {topic}
                      </span>
                    ))}
                    {course.syllabusTopics.length > 4 && (
                      <span className="px-1.5 py-0.5 text-[10px] rounded bg-slate-100 text-slate-500 font-medium">
                        +{course.syllabusTopics.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Enrollment Bar */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <button
                  onClick={() => setSelectedCourseForStudents(course)}
                  className="flex items-center space-x-1.5 text-blue-600 hover:text-blue-800 font-semibold cursor-pointer"
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>{enrolledStudents.length} Students Enrolled</span>
                </button>
                <span className="text-slate-400 text-xs">Cap: {course.maxCapacity}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Enrolled Students Modal */}
      {selectedCourseForStudents && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="font-mono text-xs text-blue-600 font-bold">{selectedCourseForStudents.code}</span>
                <h3 className="text-base font-bold text-slate-900">{selectedCourseForStudents.title}</h3>
              </div>
              <button
                onClick={() => setSelectedCourseForStudents(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-72 overflow-y-auto space-y-2 text-xs">
              {students.filter((s) => s.enrolledCourses.includes(selectedCourseForStudents.code)).map((s) => (
                <div key={s.id} className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-900">{s.name}</div>
                    <div className="text-slate-500">{s.rollNo} • {s.branch}</div>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-slate-900 font-bold">CGPA: {s.cgpa.toFixed(2)}</span>
                    <div className="text-slate-500">Att: {s.attendancePercentage}%</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-100">
              <button
                onClick={() => setSelectedCourseForStudents(null)}
                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-200 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Course Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                <span>Register New Academic Subject</span>
              </h3>
              <button onClick={() => setIsAddOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Course Code *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. CS405"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Credits</label>
                  <input
                    type="number"
                    min="1"
                    max="6"
                    value={formData.credits}
                    onChange={(e) => setFormData({ ...formData, credits: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Course Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Cloud Computing & Microservices"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Department</label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value as Branch })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="CSE">CSE</option>
                    <option value="IT">IT</option>
                    <option value="ECE">ECE</option>
                    <option value="ME">ME</option>
                    <option value="AI & DS">AI & DS</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Faculty In-Charge</label>
                  <select
                    value={formData.facultyId}
                    onChange={(e) => setFormData({ ...formData, facultyId: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    {faculty.map((f) => (
                      <option key={f.id} value={f.id}>{f.name} ({f.department})</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Course Description</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Brief synopsis of core topics and learning outcomes..."
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Syllabus Topics (comma-separated)</label>
                <input
                  type="text"
                  value={formData.syllabusTopics}
                  onChange={(e) => setFormData({ ...formData, syllabusTopics: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-xs cursor-pointer shadow-xs"
                >
                  Add Subject
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
