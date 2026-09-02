import React, { useState } from 'react';
import { 
  Search, 
  UserPlus, 
  Award, 
  AlertTriangle, 
  Edit3, 
  Trash2, 
  IdCard, 
  FileSpreadsheet, 
  Eye, 
  Phone, 
  Mail, 
  Calendar, 
  MapPin, 
  CheckCircle2,
  X,
  Printer
} from 'lucide-react';
import { Student, Branch, FeeStatus, StudentStatus, Course } from '../types';

interface StudentManagerProps {
  students: Student[];
  courses?: Course[];
  onAddStudent: (student: Student) => void;
  onUpdateStudent: (student: Student) => void;
  onDeleteStudent: (studentId: string) => void;
  onOpenMarksheet?: (student: Student) => void;
  onOpenIdCard?: (student: Student) => void;
  selectedStudentModal?: Student | null;
  setSelectedStudentModal?: (student: Student | null) => void;
}

export const StudentManager: React.FC<StudentManagerProps> = ({
  students,
  onAddStudent,
  onUpdateStudent,
  onDeleteStudent,
  onOpenMarksheet
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBranch, setSelectedBranch] = useState<string>('All');
  const [selectedSem, setSelectedSem] = useState<string>('All');
  const [selectedFeeStatus, setSelectedFeeStatus] = useState<string>('All');
  const [onlyShortage, setOnlyShortage] = useState(false);

  // Local Modal States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [activeProfileStudent, setActiveProfileStudent] = useState<Student | null>(null);
  const [activeIdCardStudent, setActiveIdCardStudent] = useState<Student | null>(null);

  const [formData, setFormData] = useState({
    rollNo: '',
    name: '',
    email: '',
    phone: '',
    branch: 'CSE' as Branch,
    semester: 4,
    section: 'A',
    cgpa: 8.50,
    attendancePercentage: 85.0,
    feeStatus: 'Paid' as FeeStatus,
    status: 'Active' as StudentStatus,
    dateOfBirth: '2004-01-01',
    bloodGroup: 'B+',
    parentName: '',
    parentPhone: '',
    address: '',
    admissionYear: 2022
  });

  // Filter students
  const filteredStudents = students.filter((student) => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.rollNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesBranch = selectedBranch === 'All' || student.branch === selectedBranch;
    const matchesSem = selectedSem === 'All' || student.semester.toString() === selectedSem;
    const matchesFee = selectedFeeStatus === 'All' || student.feeStatus === selectedFeeStatus;
    const matchesShortage = !onlyShortage || student.attendancePercentage < 75.0;

    return matchesSearch && matchesBranch && matchesSem && matchesFee && matchesShortage;
  });

  const handleOpenAdd = () => {
    setEditingStudent(null);
    setFormData({
      rollNo: `22CS${100 + students.length + 1}`,
      name: '',
      email: '',
      phone: '+91 9876543210',
      branch: 'CSE',
      semester: 4,
      section: 'A',
      cgpa: 8.0,
      attendancePercentage: 85.0,
      feeStatus: 'Paid',
      status: 'Active',
      dateOfBirth: '2004-06-15',
      bloodGroup: 'O+',
      parentName: '',
      parentPhone: '+91 9876543211',
      address: 'Hostel Block-B, Campus Road',
      admissionYear: 2022
    });
    setIsFormOpen(true);
  };

  const handleOpenEdit = (student: Student) => {
    setEditingStudent(student);
    setFormData({
      rollNo: student.rollNo,
      name: student.name,
      email: student.email,
      phone: student.phone,
      branch: student.branch,
      semester: student.semester,
      section: student.section,
      cgpa: student.cgpa,
      attendancePercentage: student.attendancePercentage,
      feeStatus: student.feeStatus,
      status: student.status,
      dateOfBirth: student.dateOfBirth,
      bloodGroup: student.bloodGroup,
      parentName: student.parentName,
      parentPhone: student.parentPhone,
      address: student.address,
      admissionYear: student.admissionYear
    });
    setIsFormOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.rollNo || !formData.name || !formData.email) {
      alert('Please fill in Roll No, Name, and Email.');
      return;
    }

    if (editingStudent) {
      const updated: Student = {
        ...editingStudent,
        ...formData
      };
      onUpdateStudent(updated);
    } else {
      const newStudent: Student = {
        id: `STU${Date.now().toString().slice(-4)}`,
        ...formData,
        enrolledCourses: ['CS401', 'CS402', 'CS403', 'CS404'],
        marks: {
          CS401: { internal1: 22, internal2: 23, assignment: 9, endSem: 82, total: 88, grade: 'A', gradePoint: 9 },
          CS402: { internal1: 21, internal2: 22, assignment: 9, endSem: 80, total: 86, grade: 'A', gradePoint: 9 }
        }
      };
      onAddStudent(newStudent);
    }

    setIsFormOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-lg font-bold text-slate-900">Student Information Registry</h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
              {filteredStudents.length} Records
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Maintain active student profiles, cumulative GPA records, attendance records, and university enrollment.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs sm:text-sm rounded-lg shadow-xs transition-colors cursor-pointer shrink-0"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add New Student</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Search Input */}
          <div className="lg:col-span-2 relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by Name, Roll No, or Email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
            />
          </div>

          {/* Branch Filter */}
          <div className="relative">
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white cursor-pointer"
            >
              <option value="All">All Branches</option>
              <option value="CSE">CSE (Computer Science)</option>
              <option value="IT">IT (Information Tech)</option>
              <option value="ECE">ECE (Electronics &amp; Comm)</option>
              <option value="ME">ME (Mechanical)</option>
              <option value="Civil">Civil Engineering</option>
              <option value="AI & DS">AI &amp; Data Science</option>
            </select>
          </div>

          {/* Semester Filter */}
          <div className="relative">
            <select
              value={selectedSem}
              onChange={(e) => setSelectedSem(e.target.value)}
              className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white cursor-pointer"
            >
              <option value="All">All Semesters</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                <option key={s} value={s}>Semester {s}</option>
              ))}
            </select>
          </div>

          {/* Fee Status Filter */}
          <div className="relative">
            <select
              value={selectedFeeStatus}
              onChange={(e) => setSelectedFeeStatus(e.target.value)}
              className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white cursor-pointer"
            >
              <option value="All">All Fee Statuses</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Partial">Partial</option>
              <option value="Overdue">Overdue</option>
            </select>
          </div>
        </div>

        {/* Shortage Toggle & Reset */}
        <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
          <label className="flex items-center space-x-2 text-slate-700 cursor-pointer hover:text-slate-900">
            <input
              type="checkbox"
              checked={onlyShortage}
              onChange={(e) => setOnlyShortage(e.target.checked)}
              className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
            />
            <span className="flex items-center space-x-1.5 font-medium">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              <span>Filter Attendance Shortage (&lt; 75%)</span>
            </span>
          </label>

          {(searchQuery || selectedBranch !== 'All' || selectedSem !== 'All' || selectedFeeStatus !== 'All' || onlyShortage) && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedBranch('All');
                setSelectedSem('All');
                setSelectedFeeStatus('All');
                setOnlyShortage(false);
              }}
              className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Student Records Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="px-6 py-3.5">Roll No</th>
                <th className="px-6 py-3.5">Student Name</th>
                <th className="px-6 py-3.5">Department</th>
                <th className="px-6 py-3.5">Semester</th>
                <th className="px-6 py-3.5">Attendance</th>
                <th className="px-6 py-3.5">CGPA</th>
                <th className="px-6 py-3.5">Fee Status</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-slate-100">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-10 text-center text-slate-400">
                    No student records found matching your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50/75 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs font-bold text-slate-800">
                      {student.rollNo}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-900">{student.name}</div>
                      <div className="text-xs text-slate-500">{student.email}</div>
                    </td>
                    <td className="px-6 py-4 text-slate-700">
                      <span className="font-medium text-slate-800">{student.branch}</span>
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      Sem {student.semester} ({student.section})
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        student.attendancePercentage >= 75.0 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-red-100 text-red-700 font-semibold'
                      }`}>
                        {student.attendancePercentage}%
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-800">
                      {student.cgpa.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        student.feeStatus === 'Paid' ? 'bg-green-100 text-green-700' :
                        student.feeStatus === 'Partial' ? 'bg-orange-100 text-orange-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {student.feeStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-1.5">
                        <button
                          onClick={() => setActiveProfileStudent(student)}
                          className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors"
                          title="View Profile Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {onOpenMarksheet && (
                          <button
                            onClick={() => onOpenMarksheet(student)}
                            className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors"
                            title="View Marksheet"
                          >
                            <FileSpreadsheet className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => setActiveIdCardStudent(student)}
                          className="p-1.5 text-emerald-600 hover:text-emerald-800 hover:bg-emerald-50 rounded-md transition-colors"
                          title="Print Student ID Card"
                        >
                          <IdCard className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenEdit(student)}
                          className="p-1.5 text-amber-600 hover:text-amber-800 hover:bg-amber-50 rounded-md transition-colors"
                          title="Edit Student Profile"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete student ${student.name} (${student.rollNo})?`)) {
                              onDeleteStudent(student.id);
                            }
                          }}
                          className="p-1.5 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded-md transition-colors"
                          title="Delete Student Record"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Student Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-800 flex items-center space-x-2">
                <UserPlus className="w-5 h-5 text-blue-600" />
                <span>{editingStudent ? 'Edit Student Profile' : 'Register New Student'}</span>
              </h3>
              <button 
                onClick={() => setIsFormOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Roll Number *</label>
                  <input
                    type="text"
                    required
                    value={formData.rollNo}
                    onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="e.g. 22CS105"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="e.g. Aarav Sharma"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="student@college.edu"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="+91 9876543210"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Department / Branch</label>
                  <select
                    value={formData.branch}
                    onChange={(e) => setFormData({ ...formData, branch: e.target.value as Branch })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="CSE">CSE (Computer Science)</option>
                    <option value="IT">IT (Information Technology)</option>
                    <option value="ECE">ECE (Electronics &amp; Comm)</option>
                    <option value="ME">ME (Mechanical)</option>
                    <option value="Civil">Civil Engineering</option>
                    <option value="AI & DS">AI &amp; Data Science</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Semester</label>
                    <select
                      value={formData.semester}
                      onChange={(e) => setFormData({ ...formData, semester: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                        <option key={s} value={s}>Sem {s}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Section</label>
                    <input
                      type="text"
                      maxLength={1}
                      value={formData.section}
                      onChange={(e) => setFormData({ ...formData, section: e.target.value.toUpperCase() })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">CGPA (0.00 - 10.00)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="10"
                    value={formData.cgpa}
                    onChange={(e) => setFormData({ ...formData, cgpa: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Attendance Percentage (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="100"
                    value={formData.attendancePercentage}
                    onChange={(e) => setFormData({ ...formData, attendancePercentage: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Fee Status</label>
                  <select
                    value={formData.feeStatus}
                    onChange={(e) => setFormData({ ...formData, feeStatus: e.target.value as FeeStatus })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                    <option value="Partial">Partial</option>
                    <option value="Overdue">Overdue</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Parent / Guardian Name</label>
                  <input
                    type="text"
                    value={formData.parentName}
                    onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Parent's Name"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs sm:text-sm rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs sm:text-sm rounded-lg shadow-xs transition-colors cursor-pointer"
                >
                  {editingStudent ? 'Save Changes' : 'Register Student'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Detailed Student Profile Modal */}
      {activeProfileStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-xl w-full p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="font-mono text-xs font-bold text-blue-600">{activeProfileStudent.rollNo}</span>
                <h3 className="text-xl font-bold text-slate-900">{activeProfileStudent.name}</h3>
              </div>
              <button
                onClick={() => setActiveProfileStudent(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-500 font-medium">Department</span>
                <p className="text-slate-900 font-semibold">{activeProfileStudent.branch} (Semester {activeProfileStudent.semester}, Sec {activeProfileStudent.section})</p>
              </div>
              <div>
                <span className="text-slate-500 font-medium">Cumulative CGPA</span>
                <p className="text-slate-900 font-bold text-sm">{activeProfileStudent.cgpa.toFixed(2)} / 10.0</p>
              </div>
              <div>
                <span className="text-slate-500 font-medium">Email</span>
                <p className="text-slate-900 font-medium">{activeProfileStudent.email}</p>
              </div>
              <div>
                <span className="text-slate-500 font-medium">Phone</span>
                <p className="text-slate-900 font-medium">{activeProfileStudent.phone}</p>
              </div>
              <div>
                <span className="text-slate-500 font-medium">Attendance Record</span>
                <p className={`font-bold ${activeProfileStudent.attendancePercentage >= 75 ? 'text-green-700' : 'text-red-700'}`}>
                  {activeProfileStudent.attendancePercentage}% ({activeProfileStudent.attendancePercentage >= 75 ? 'Eligible' : 'Shortage Alert'})
                </p>
              </div>
              <div>
                <span className="text-slate-500 font-medium">Tuition Fee Status</span>
                <p className="text-slate-900 font-semibold">{activeProfileStudent.feeStatus}</p>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <button
                onClick={() => setActiveProfileStudent(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs sm:text-sm rounded-lg transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Printable ID Card Modal */}
      {activeIdCardStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-800">Student Identity Card</h3>
              <button
                onClick={() => setActiveIdCardStudent(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* ID Card Visual */}
            <div className="border-2 border-slate-800 rounded-xl overflow-hidden bg-white shadow-md">
              <div className="bg-blue-600 text-white p-3 text-center">
                <h4 className="font-bold text-sm tracking-wide">NATIONAL INSTITUTE OF TECHNOLOGY</h4>
                <p className="text-[10px] text-blue-100">Student Academic Identity Card</p>
              </div>
              <div className="p-4 flex gap-4 items-center">
                <div className="w-20 h-24 bg-slate-100 border border-slate-200 rounded-lg flex items-center justify-center font-bold text-2xl text-blue-600">
                  {activeIdCardStudent.name.charAt(0)}
                </div>
                <div className="text-xs space-y-1">
                  <p className="font-bold text-slate-900 text-sm">{activeIdCardStudent.name}</p>
                  <p className="font-mono text-blue-600 font-semibold">{activeIdCardStudent.rollNo}</p>
                  <p className="text-slate-600">{activeIdCardStudent.branch} • Sem {activeIdCardStudent.semester}</p>
                  <p className="text-[11px] text-slate-500">Blood: {activeIdCardStudent.bloodGroup}</p>
                </div>
              </div>
              <div className="bg-slate-50 border-t border-slate-200 p-2 text-center text-[10px] text-slate-500 font-mono">
                VALID THROUGH ACADEMIC YEAR 2024-2025
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs rounded-lg shadow-xs flex items-center space-x-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Card</span>
              </button>
              <button
                onClick={() => setActiveIdCardStudent(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs rounded-lg cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
