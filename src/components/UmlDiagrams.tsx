import React, { useState } from 'react';
import { 
  Network, 
  ArrowDown
} from 'lucide-react';

export const UmlDiagrams: React.FC = () => {
  const [activeDiagram, setActiveDiagram] = useState<'class' | 'er' | 'arch'>('class');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
            <Network className="w-5 h-5 text-blue-600" />
            <span>UML Class Diagrams &amp; Database ER Models</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Standard visual architectural diagrams formatted for academic project reports and viva defense.
          </p>
        </div>

        {/* Diagram Switcher Tabs */}
        <div className="flex space-x-1 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs">
          <button
            onClick={() => setActiveDiagram('class')}
            className={`px-3 py-1.5 rounded-md font-medium transition-all cursor-pointer ${
              activeDiagram === 'class'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            UML Class Diagram
          </button>
          <button
            onClick={() => setActiveDiagram('er')}
            className={`px-3 py-1.5 rounded-md font-medium transition-all cursor-pointer ${
              activeDiagram === 'er'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Database ER Diagram
          </button>
          <button
            onClick={() => setActiveDiagram('arch')}
            className={`px-3 py-1.5 rounded-md font-medium transition-all cursor-pointer ${
              activeDiagram === 'arch'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            3-Tier Architecture
          </button>
        </div>
      </div>

      {/* Diagram Viewport */}
      {activeDiagram === 'class' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">Object-Oriented Class Hierarchy (UML)</h3>
              <p className="text-xs text-slate-500">Demonstrating Inheritance, Generalization, and Association</p>
            </div>
            <span className="px-2.5 py-1 rounded bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold">
              Inheritance &amp; Polymorphism
            </span>
          </div>

          <div className="flex flex-col items-center space-y-6 py-4">
            {/* 1. Base Class: Person */}
            <div className="w-80 bg-white border-2 border-blue-600 rounded-xl overflow-hidden shadow-xs">
              <div className="bg-blue-50 p-2.5 text-center border-b border-blue-200">
                <div className="text-[10px] uppercase font-bold text-blue-700 font-mono">&laquo;abstract&raquo;</div>
                <div className="font-bold text-slate-900 text-sm">Person</div>
              </div>
              <div className="p-3 text-xs font-mono text-slate-700 space-y-1 border-b border-slate-100 bg-slate-50/50">
                <div>- id : String</div>
                <div>- name : String</div>
                <div>- email : String</div>
                <div>- phone : String</div>
                <div>- address : String</div>
              </div>
              <div className="p-3 text-xs font-mono text-blue-800 space-y-1 bg-white">
                <div>+ displayDetails() : void &laquo;abstract&raquo;</div>
                <div>+ getName() : String</div>
                <div>+ getEmail() : String</div>
              </div>
            </div>

            {/* Inheritance Connector */}
            <div className="flex items-center space-x-2 text-slate-400 text-xs">
              <div className="h-6 w-0.5 bg-blue-600" />
              <span className="font-mono text-xs text-blue-600 font-semibold">&laquo;extends (Inheritance)&raquo;</span>
              <div className="h-6 w-0.5 bg-blue-600" />
            </div>

            {/* Subclasses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl">
              {/* Student Subclass */}
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
                <div className="bg-slate-50 p-2.5 text-center border-b border-slate-200">
                  <div className="font-bold text-slate-900 text-sm">Student</div>
                  <div className="text-[10px] text-slate-500 font-mono">implements Comparable&lt;Student&gt;</div>
                </div>
                <div className="p-3 text-xs font-mono text-slate-700 space-y-1 border-b border-slate-100 bg-slate-50/50">
                  <div>- rollNo : String</div>
                  <div>- branch : String</div>
                  <div>- semester : int</div>
                  <div>- cgpa : double</div>
                  <div>- attendancePct : double</div>
                  <div>- courseMarks : Map&lt;String, Double&gt;</div>
                </div>
                <div className="p-3 text-xs font-mono text-green-700 space-y-1 bg-white">
                  <div>+ displayDetails() : void &laquo;override&raquo;</div>
                  <div>+ hasAttendanceShortage() : boolean</div>
                  <div>+ compareTo(Student) : int</div>
                </div>
              </div>

              {/* Faculty Subclass */}
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
                <div className="bg-slate-50 p-2.5 text-center border-b border-slate-200">
                  <div className="font-bold text-slate-900 text-sm">Faculty</div>
                </div>
                <div className="p-3 text-xs font-mono text-slate-700 space-y-1 border-b border-slate-100 bg-slate-50/50">
                  <div>- empCode : String</div>
                  <div>- department : String</div>
                  <div>- designation : String</div>
                  <div>- experienceYears : int</div>
                  <div>- assignedCourses : List&lt;String&gt;</div>
                </div>
                <div className="p-3 text-xs font-mono text-green-700 space-y-1 bg-white">
                  <div>+ displayDetails() : void &laquo;override&raquo;</div>
                  <div>+ assignSubject(String) : void</div>
                  <div>+ getDepartment() : String</div>
                </div>
              </div>
            </div>

            {/* Service & DAO Layer Connectors */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl pt-4 border-t border-slate-100">
              <div className="bg-slate-50 border border-blue-200 rounded-xl p-4 space-y-2">
                <div className="font-bold text-blue-700 text-xs font-mono">StudentService (Business Layer)</div>
                <div className="text-xs font-mono text-slate-700 space-y-0.5">
                  <div>- studentRegistry: Map&lt;String, Student&gt;</div>
                  <div>+ registerStudent(Student) : void</div>
                  <div>+ getRankList() : List&lt;Student&gt;</div>
                  <div>+ getAttendanceDefaulters() : List&lt;Student&gt;</div>
                </div>
              </div>

              <div className="bg-slate-50 border border-green-200 rounded-xl p-4 space-y-2">
                <div className="font-bold text-green-700 text-xs font-mono">DatabaseHelper (JDBC DAO)</div>
                <div className="text-xs font-mono text-slate-700 space-y-0.5">
                  <div>+ getConnection() : Connection</div>
                  <div>+ insertStudent(Student) : boolean</div>
                  <div>+ getAllStudents() : List&lt;Student&gt;</div>
                  <div>+ findByRollNo(String) : Student</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ER Diagram View */}
      {activeDiagram === 'er' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">Relational Database ER Schema</h3>
              <p className="text-xs text-slate-500">Primary Key (PK) and Foreign Key (FK) relational mappings</p>
            </div>
            <span className="px-2.5 py-1 rounded bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold">
              3rd Normal Form (3NF)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-2">
            {/* Table 1: students */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden text-xs shadow-xs">
              <div className="bg-blue-50 p-2.5 font-bold text-blue-900 border-b border-blue-100 flex items-center justify-between">
                <span>students</span>
                <span className="text-[10px] text-blue-600 font-normal">Entity</span>
              </div>
              <div className="p-3 font-mono space-y-1.5 text-xs">
                <div className="text-blue-700 font-bold">PK student_id (VARCHAR)</div>
                <div className="text-slate-900 font-semibold">UNIQUE roll_no (VARCHAR)</div>
                <div className="text-slate-600">full_name (VARCHAR)</div>
                <div className="text-slate-600">email (VARCHAR)</div>
                <div className="text-purple-600 font-medium">FK dept_code</div>
                <div className="text-slate-600">semester (INT)</div>
                <div className="text-slate-600">cgpa (DECIMAL)</div>
                <div className="text-slate-600">attendance_pct (DECIMAL)</div>
                <div className="text-slate-600">fee_status (ENUM)</div>
              </div>
            </div>

            {/* Table 2: courses */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden text-xs shadow-xs">
              <div className="bg-blue-50 p-2.5 font-bold text-blue-900 border-b border-blue-100 flex items-center justify-between">
                <span>courses</span>
                <span className="text-[10px] text-blue-600 font-normal">Entity</span>
              </div>
              <div className="p-3 font-mono space-y-1.5 text-xs">
                <div className="text-blue-700 font-bold">PK course_code (VARCHAR)</div>
                <div className="text-slate-900 font-semibold">course_title (VARCHAR)</div>
                <div className="text-purple-600 font-medium">FK dept_code</div>
                <div className="text-slate-600">credits (INT)</div>
                <div className="text-slate-600">semester (INT)</div>
                <div className="text-purple-600 font-medium">FK faculty_id</div>
              </div>
            </div>

            {/* Table 3: enrollments / grades */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden text-xs shadow-xs">
              <div className="bg-blue-50 p-2.5 font-bold text-blue-900 border-b border-blue-100 flex items-center justify-between">
                <span>enrollments &amp; grades</span>
                <span className="text-[10px] text-blue-600 font-normal">Relation</span>
              </div>
              <div className="p-3 font-mono space-y-1.5 text-xs">
                <div className="text-blue-700 font-bold">PK enrollment_id (AUTO_INT)</div>
                <div className="text-purple-600 font-semibold">FK roll_no</div>
                <div className="text-purple-600 font-semibold">FK course_code</div>
                <div className="text-slate-600">internal_marks (DECIMAL)</div>
                <div className="text-slate-600">endsem_marks (DECIMAL)</div>
                <div className="text-slate-600">total_marks (DECIMAL)</div>
                <div className="text-slate-600">grade (VARCHAR)</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3-Tier Architecture View */}
      {activeDiagram === 'arch' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">3-Tier Enterprise Java Architecture</h3>
              <p className="text-xs text-slate-500">Separation of Presentation, Business Service, and Persistence Layers</p>
            </div>
          </div>

          <div className="space-y-4 py-2">
            {/* Tier 1: Presentation */}
            <div className="bg-slate-50 border-2 border-blue-300 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="inline-block px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-bold uppercase">
                  Tier 1: Presentation Layer
                </div>
                <h4 className="text-sm font-bold text-slate-900">Java Swing GUI &amp; Console CLI</h4>
                <p className="text-xs text-slate-600">CollegeSwingGUI.java (JFrame, JTable, ActionListeners) &amp; StudentManagementSystem.java (CLI)</p>
              </div>
              <div className="px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-mono rounded-lg border border-blue-200">
                User Events &amp; Input Validation
              </div>
            </div>

            <div className="flex justify-center text-slate-400">
              <ArrowDown className="w-5 h-5 text-blue-600" />
            </div>

            {/* Tier 2: Business Logic */}
            <div className="bg-slate-50 border-2 border-blue-300 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="inline-block px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-bold uppercase">
                  Tier 2: Business Logic &amp; Service Layer
                </div>
                <h4 className="text-sm font-bold text-slate-900">StudentService.java &amp; GradeCalculator</h4>
                <p className="text-xs text-slate-600">GPA Formulas, Attendance Defaulter Alerts, Merit Sorting with Java Streams API</p>
              </div>
              <div className="px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-mono rounded-lg border border-blue-200">
                Collections &amp; OOP Rules
              </div>
            </div>

            <div className="flex justify-center text-slate-400">
              <ArrowDown className="w-5 h-5 text-blue-600" />
            </div>

            {/* Tier 3: Data Persistence */}
            <div className="bg-slate-50 border-2 border-blue-300 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="inline-block px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-bold uppercase">
                  Tier 3: Data Access &amp; Database Layer
                </div>
                <h4 className="text-sm font-bold text-slate-900">DatabaseHelper.java (JDBC) &amp; MySQL Server</h4>
                <p className="text-xs text-slate-600">PreparedStatement CRUD queries, Connection Pooling, and Serializable File Storage</p>
              </div>
              <div className="px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-mono rounded-lg border border-blue-200">
                SQL / Relational Storage
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
