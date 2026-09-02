import React from 'react';
import { 
  GraduationCap, 
  Code2, 
  Terminal, 
  FileText, 
  HelpCircle, 
  Network, 
  BookOpen, 
  Users, 
  CalendarCheck, 
  Award, 
  CreditCard, 
  LayoutDashboard,
  Download,
  FolderGit2
} from 'lucide-react';
import { MainTab, ProjectBlueprint } from '../types';

interface NavbarProps {
  currentTab: MainTab;
  onSelectTab: (tab: MainTab) => void;
  selectedBlueprint?: ProjectBlueprint;
  allBlueprints?: ProjectBlueprint[];
  onSelectBlueprint?: (blueprint: ProjectBlueprint) => void;
  onQuickExport: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  selectedBlueprint,
  allBlueprints = [],
  onSelectBlueprint,
  onQuickExport
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200 text-slate-800 shadow-xs">
      {/* Top Banner / Brand Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onSelectTab('dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs font-bold">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-lg tracking-tight text-slate-900">EduJava</span>
                <span className="px-2 py-0.5 text-[11px] font-semibold rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                  College ERP &amp; Project Suite
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Core Java • OOP Architecture • Swing GUI • JDBC • Viva Kit
              </p>
            </div>
          </div>

          {/* Project Variant Selector & Action Buttons */}
          <div className="flex items-center space-x-3">
            {selectedBlueprint && allBlueprints.length > 0 && onSelectBlueprint && (
              <div className="relative hidden md:flex items-center space-x-2 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs">
                <FolderGit2 className="w-4 h-4 text-blue-600" />
                <span className="text-slate-500 font-medium">Project:</span>
                <select
                  value={selectedBlueprint?.id || ''}
                  onChange={(e) => {
                    const bp = allBlueprints.find((b) => b.id === e.target.value);
                    if (bp) onSelectBlueprint(bp);
                  }}
                  className="bg-transparent text-slate-800 font-medium focus:outline-none cursor-pointer pr-2"
                >
                  {allBlueprints.map((bp) => (
                    <option key={bp.id} value={bp.id} className="text-slate-900">
                      {bp.shortTitle}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <button
              onClick={onQuickExport}
              className="flex items-center space-x-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs rounded-lg transition-colors shadow-xs cursor-pointer"
              title="Download Source Code & Documentation"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export Java Files</span>
            </button>
          </div>
        </div>

        {/* Primary Navigation Tabs */}
        <div className="flex space-x-1 overflow-x-auto no-scrollbar py-2 border-t border-slate-100 text-xs font-medium">
          {/* Section 1: ERP Simulation */}
          <button
            onClick={() => onSelectTab('dashboard')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-all cursor-pointer ${
              currentTab === 'dashboard'
                ? 'bg-blue-50 text-blue-700 font-semibold border border-blue-200 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>ERP Dashboard</span>
          </button>

          <button
            onClick={() => onSelectTab('students')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-all cursor-pointer ${
              currentTab === 'students'
                ? 'bg-blue-50 text-blue-700 font-semibold border border-blue-200 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Students</span>
          </button>

          <button
            onClick={() => onSelectTab('courses')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-all cursor-pointer ${
              currentTab === 'courses'
                ? 'bg-blue-50 text-blue-700 font-semibold border border-blue-200 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Courses</span>
          </button>

          <button
            onClick={() => onSelectTab('attendance')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-all cursor-pointer ${
              currentTab === 'attendance'
                ? 'bg-blue-50 text-blue-700 font-semibold border border-blue-200 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <CalendarCheck className="w-3.5 h-3.5" />
            <span>Attendance</span>
          </button>

          <button
            onClick={() => onSelectTab('grades')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-all cursor-pointer ${
              currentTab === 'grades'
                ? 'bg-blue-50 text-blue-700 font-semibold border border-blue-200 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Grades &amp; CGPA</span>
          </button>

          <button
            onClick={() => onSelectTab('fees')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-all cursor-pointer ${
              currentTab === 'fees'
                ? 'bg-blue-50 text-blue-700 font-semibold border border-blue-200 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Fees &amp; Invoices</span>
          </button>

          <button
            onClick={() => onSelectTab('library')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-all cursor-pointer ${
              currentTab === 'library'
                ? 'bg-blue-50 text-blue-700 font-semibold border border-blue-200 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Library</span>
          </button>

          {/* Section 2: Java Studio & Submission Kit */}
          <div className="h-4 w-px bg-slate-200 my-auto mx-1" />

          <button
            onClick={() => onSelectTab('java-studio')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap font-semibold transition-all cursor-pointer ${
              currentTab === 'java-studio'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-blue-700 hover:bg-blue-50'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Java Source Code</span>
          </button>

          <button
            onClick={() => onSelectTab('jvm-runner')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap font-semibold transition-all cursor-pointer ${
              currentTab === 'jvm-runner'
                ? 'bg-slate-900 text-green-400 font-mono shadow-xs'
                : 'text-slate-700 hover:bg-slate-100 font-mono'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>JVM CLI Simulator</span>
          </button>

          <button
            onClick={() => onSelectTab('uml')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-all cursor-pointer ${
              currentTab === 'uml'
                ? 'bg-blue-50 text-blue-700 font-semibold border border-blue-200 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Network className="w-3.5 h-3.5" />
            <span>UML &amp; ER Diagrams</span>
          </button>

          <button
            onClick={() => onSelectTab('viva')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-all cursor-pointer ${
              currentTab === 'viva'
                ? 'bg-blue-50 text-blue-700 font-semibold border border-blue-200 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Viva Voce Prep</span>
          </button>

          <button
            onClick={() => onSelectTab('report')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-all cursor-pointer ${
              currentTab === 'report'
                ? 'bg-blue-50 text-blue-700 font-semibold border border-blue-200 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Project Report</span>
          </button>
        </div>
      </div>
    </header>
  );
};
