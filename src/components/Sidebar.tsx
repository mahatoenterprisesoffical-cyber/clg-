import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  CalendarCheck, 
  Award, 
  CreditCard, 
  BookMarked, 
  Code2, 
  Terminal, 
  Network, 
  HelpCircle, 
  FileText,
  GraduationCap,
  X
} from 'lucide-react';
import { MainTab } from '../types';

interface SidebarProps {
  currentTab: MainTab;
  onSelectTab: (tab: MainTab) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  isOpen,
  onClose
}) => {
  const academicNav = [
    { id: 'dashboard' as MainTab, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'students' as MainTab, label: 'Student Registry', icon: Users },
    { id: 'courses' as MainTab, label: 'Course Catalog', icon: BookOpen },
    { id: 'attendance' as MainTab, label: 'Attendance Ledger', icon: CalendarCheck },
    { id: 'grades' as MainTab, label: 'Academic Grading', icon: Award },
    { id: 'fees' as MainTab, label: 'Fee Accounting', icon: CreditCard },
    { id: 'library' as MainTab, label: 'Digital Library', icon: BookMarked },
  ];

  const javaNav = [
    { id: 'java-studio' as MainTab, label: 'Java Source Code', icon: Code2 },
    { id: 'jvm-runner' as MainTab, label: 'JVM Console Runner', icon: Terminal },
    { id: 'uml' as MainTab, label: 'UML & ER Models', icon: Network },
    { id: 'viva' as MainTab, label: 'Viva-Voce Prep', icon: HelpCircle },
    { id: 'report' as MainTab, label: 'Project Report (SRS)', icon: FileText },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#1E293B] border-r border-slate-800 flex flex-col transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-6 flex items-center justify-between border-b border-slate-800/80">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-lg shadow-sm">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-white font-semibold text-lg tracking-tight block">EduCore v1.0</span>
              <span className="text-[11px] text-slate-400 font-medium block">Java Academic ERP</span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-6 overflow-y-auto custom-scrollbar">
          {/* Section 1: Academic ERP */}
          <div>
            <div className="px-3 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Academic Management
            </div>
            <div className="space-y-1">
              {academicNav.map((item) => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectTab(item.id);
                      onClose();
                    }}
                    className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left ${
                      isActive 
                        ? 'bg-blue-600/20 text-blue-400 font-semibold border border-blue-500/30' 
                        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-blue-400' : 'text-slate-400'}`} />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 2: Java Studio & Submission Kit */}
          <div>
            <div className="px-3 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Java &amp; Submission Kit
            </div>
            <div className="space-y-1">
              {javaNav.map((item) => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectTab(item.id);
                      onClose();
                    }}
                    className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left ${
                      isActive 
                        ? 'bg-blue-600/20 text-blue-400 font-semibold border border-blue-500/30' 
                        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-blue-400' : 'text-slate-400'}`} />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Sidebar Footer User Info */}
        <div className="p-4 border-t border-slate-800 bg-[#172033]">
          <div className="flex items-center space-x-3 px-2 py-1.5">
            <div className="h-8 w-8 rounded-full bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-xs font-bold text-blue-300 shrink-0">
              AD
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-sm text-white font-medium truncate">Admin User</span>
              <span className="text-xs text-slate-400 truncate">Java 17 (OpenJDK) • JDBC</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
