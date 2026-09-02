import React from 'react';
import { 
  Menu, 
  Download, 
  Search, 
  FolderGit2, 
  Sparkles
} from 'lucide-react';
import { MainTab, ProjectBlueprint } from '../types';

interface HeaderProps {
  currentTab: MainTab;
  onToggleSidebar: () => void;
  selectedBlueprint: ProjectBlueprint;
  allBlueprints: ProjectBlueprint[];
  onSelectBlueprint: (blueprint: ProjectBlueprint) => void;
  onQuickExport: () => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onToggleSidebar,
  selectedBlueprint,
  allBlueprints,
  onSelectBlueprint,
  onQuickExport,
  searchQuery = '',
  onSearchChange
}) => {
  const getTabTitle = (tab: MainTab): string => {
    switch (tab) {
      case 'dashboard': return 'Academic Overview';
      case 'students': return 'Student Registry & Profiles';
      case 'courses': return 'Course & Curriculum Catalog';
      case 'attendance': return 'Attendance Tracking & Defaulter Warnings';
      case 'grades': return 'Examinations & CGPA Gradebook';
      case 'fees': return 'Fee Invoicing & Receipts';
      case 'library': return 'Digital Library Circulation';
      case 'java-studio': return 'Java 17+ Source Code Studio';
      case 'jvm-runner': return 'Virtual JVM Console Emulator';
      case 'uml': return 'UML Class & ER Architecture';
      case 'viva': return 'Viva-Voce Defense Preparation';
      case 'report': return 'Academic Project Report (SRS)';
      default: return 'College Management System';
    }
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      {/* Left: Mobile Toggle & Page Title */}
      <div className="flex items-center space-x-3 sm:space-x-4">
        <button
          onClick={onToggleSidebar}
          className="p-2 -ml-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg lg:hidden transition-colors"
          aria-label="Open Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-slate-800 tracking-tight">
            {getTabTitle(currentTab)}
          </h1>
        </div>
      </div>

      {/* Right: Search, Blueprint selector, and Quick Export */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        {/* Project Variant Selector */}
        <div className="hidden md:flex items-center space-x-2 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs">
          <FolderGit2 className="w-3.5 h-3.5 text-blue-600" />
          <span className="text-slate-500 font-medium">Blueprint:</span>
          <select
            value={selectedBlueprint.id}
            onChange={(e) => {
              const bp = allBlueprints.find((b) => b.id === e.target.value);
              if (bp) onSelectBlueprint(bp);
            }}
            className="bg-transparent text-slate-800 font-medium focus:outline-none cursor-pointer pr-1 text-xs"
          >
            {allBlueprints.map((bp) => (
              <option key={bp.id} value={bp.id} className="text-slate-900">
                {bp.shortTitle}
              </option>
            ))}
          </select>
        </div>

        {/* Export Button */}
        <button
          onClick={onQuickExport}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium shadow-xs flex items-center space-x-1.5 transition-colors cursor-pointer"
          title="Download Complete Java Project (.zip)"
        >
          <Download className="w-4 h-4" />
          <span className="hidden sm:inline">Export Java Files</span>
          <span className="sm:hidden">Export</span>
        </button>
      </div>
    </header>
  );
};
