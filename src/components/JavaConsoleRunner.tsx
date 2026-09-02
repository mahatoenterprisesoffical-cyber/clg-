import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal as TerminalIcon, 
  RotateCcw, 
  Send
} from 'lucide-react';
import { Student } from '../types';

interface JavaConsoleRunnerProps {
  students: Student[];
  onAddStudentFromCli?: (student: Student) => void;
}

type StepState = 'MENU' | 'ADD_ROLL' | 'ADD_NAME' | 'ADD_BRANCH' | 'ADD_CGPA' | 'ADD_ATT' | 'SEARCH_ROLL' | 'DELETE_ROLL';

export const JavaConsoleRunner: React.FC<JavaConsoleRunnerProps> = ({
  students
}) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [inputVal, setInputVal] = useState('');
  const [step, setStep] = useState<StepState>('MENU');
  
  const [tempStudent, setTempStudent] = useState({
    rollNo: '',
    name: '',
    branch: 'CSE',
    cgpa: 8.0,
    attendance: 85.0
  });

  const [localStudents, setLocalStudents] = useState<Student[]>(students);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const initConsole = () => {
    setLogs([
      '==============================================================',
      '  JAVA VIRTUAL MACHINE (JVM 21.0.2 - OpenJDK 64-Bit Server) ',
      '  Compiling: javac com/college/main/StudentManagementSystem.java',
      '  Executing: java com.college.main.StudentManagementSystem      ',
      '==============================================================',
      ' ',
      '------------------ MAIN OPERATIONS MENU ------------------',
      ' [1] Register New Student',
      ' [2] View All Registered Students',
      ' [3] Search Student by Roll Number',
      ' [4] Generate Merit / CGPA Rank List',
      ' [5] View Attendance Shortage (<75%) List',
      ' [6] View College Academic Performance Stats',
      ' [7] Delete Student Record',
      ' [8] Exit Application',
      '----------------------------------------------------------',
      '>> Enter your choice [1-8]: '
    ]);
    setStep('MENU');
  };

  useEffect(() => {
    initConsole();
  }, []);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    const newLogs = [...logs, `> ${trimmed}`];

    if (step === 'MENU') {
      switch (trimmed) {
        case '1':
          newLogs.push('--- [Register New Student] ---');
          newLogs.push('Enter Roll Number (e.g. 22CS109):');
          setStep('ADD_ROLL');
          break;
        case '2':
          newLogs.push('--------------------- ALL STUDENTS DIRECTORY ---------------------');
          newLogs.push(String('ROLL NO   | NAME                 | BRANCH | SEM | CGPA | ATTENDANCE'));
          newLogs.push('------------------------------------------------------------------');
          localStudents.forEach((s) => {
            const warning = s.attendancePercentage < 75.0 ? '[SHORTAGE]' : '[OK]';
            newLogs.push(
              `${s.rollNo.padEnd(9)} | ${s.name.padEnd(20)} | ${s.branch.padEnd(6)} | ${s.semester}   | ${s.cgpa.toFixed(2)} | ${s.attendancePercentage}% ${warning}`
            );
          });
          newLogs.push('------------------------------------------------------------------');
          newLogs.push('>> Enter your choice [1-8]: ');
          break;
        case '3':
          newLogs.push('Enter Roll Number to Search (e.g. 22CS101):');
          setStep('SEARCH_ROLL');
          break;
        case '4':
          newLogs.push('--------------------- TOP MERIT / CGPA RANK LIST ---------------------');
          const sorted = [...localStudents].sort((a, b) => b.cgpa - a.cgpa);
          sorted.forEach((s, idx) => {
            newLogs.push(` Rank #${idx + 1}: ${s.name} (${s.rollNo}) - Branch: ${s.branch} | CGPA: ${s.cgpa.toFixed(2)}`);
          });
          newLogs.push('---------------------------------------------------------------------');
          newLogs.push('>> Enter your choice [1-8]: ');
          break;
        case '5':
          newLogs.push('------------- ATTENDANCE DEFICIENCY REPORT (<75%) -------------');
          const defaulters = localStudents.filter((s) => s.attendancePercentage < 75);
          if (defaulters.length === 0) {
            newLogs.push('All students fulfill university mandatory attendance (>75%).');
          } else {
            defaulters.forEach((s) => {
              newLogs.push(` [Shortage] ${s.name} (${s.rollNo}) - ${s.branch} | Attendance: ${s.attendancePercentage}%`);
            });
          }
          newLogs.push('---------------------------------------------------------------');
          newLogs.push('>> Enter your choice [1-8]: ');
          break;
        case '6':
          const avgCgpa = (localStudents.reduce((acc, s) => acc + s.cgpa, 0) / localStudents.length).toFixed(2);
          const avgAtt = (localStudents.reduce((acc, s) => acc + s.attendancePercentage, 0) / localStudents.length).toFixed(1);
          newLogs.push('----------------- INSTITUTIONAL ACADEMIC METRICS -----------------');
          newLogs.push(` Total Enrolled Students: ${localStudents.length}`);
          newLogs.push(` Average Institute CGPA: ${avgCgpa} / 10.0`);
          newLogs.push(` Average Class Attendance: ${avgAtt}%`);
          newLogs.push(` Total Defaulters (<75%): ${localStudents.filter((s) => s.attendancePercentage < 75).length}`);
          newLogs.push('------------------------------------------------------------------');
          newLogs.push('>> Enter your choice [1-8]: ');
          break;
        case '7':
          newLogs.push('Enter Roll Number of Student to Delete:');
          setStep('DELETE_ROLL');
          break;
        case '8':
          newLogs.push('Terminating Java Virtual Machine session. Thank you!');
          newLogs.push('Process finished with exit code 0.');
          break;
        default:
          newLogs.push('Invalid command option. Please enter a valid number [1-8]:');
          break;
      }
    } else if (step === 'ADD_ROLL') {
      setTempStudent((prev) => ({ ...prev, rollNo: trimmed }));
      newLogs.push(`Roll: ${trimmed}`);
      newLogs.push('Enter Full Student Name:');
      setStep('ADD_NAME');
    } else if (step === 'ADD_NAME') {
      setTempStudent((prev) => ({ ...prev, name: trimmed }));
      newLogs.push(`Name: ${trimmed}`);
      newLogs.push('Enter Department Branch [CSE / IT / ECE / ME / AI & DS]:');
      setStep('ADD_BRANCH');
    } else if (step === 'ADD_BRANCH') {
      setTempStudent((prev) => ({ ...prev, branch: trimmed }));
      newLogs.push(`Branch: ${trimmed}`);
      newLogs.push('Enter Initial CGPA (0.0 to 10.0):');
      setStep('ADD_CGPA');
    } else if (step === 'ADD_CGPA') {
      const cgpa = parseFloat(trimmed) || 7.5;
      setTempStudent((prev) => ({ ...prev, cgpa }));
      newLogs.push(`CGPA: ${cgpa}`);
      newLogs.push('Enter Attendance Percentage (0 to 100):');
      setStep('ADD_ATT');
    } else if (step === 'ADD_ATT') {
      const att = parseFloat(trimmed) || 80.0;
      const newSt: Student = {
        id: `STU${Date.now().toString().slice(-4)}`,
        rollNo: tempStudent.rollNo.toUpperCase(),
        name: tempStudent.name,
        branch: tempStudent.branch as any,
        semester: 4,
        section: 'A',
        email: `${tempStudent.name.toLowerCase().replace(/\s+/g, '.')}@college.edu`,
        phone: '+91 98765 43210',
        dateOfBirth: '2004-05-15',
        bloodGroup: 'B+',
        parentName: 'Guardian',
        parentPhone: '+91 98765 00000',
        address: 'University Campus Hostel',
        admissionYear: 2022,
        status: 'Active',
        cgpa: tempStudent.cgpa,
        attendancePercentage: att,
        enrolledCourses: ['CS401', 'CS402'],
        marks: {},
        feeStatus: 'Paid'
      };

      setLocalStudents((prev) => [newSt, ...prev]);
      newLogs.push('=========================================');
      newLogs.push(` SUCCESS: Student ${newSt.name} (${newSt.rollNo}) Registered!`);
      newLogs.push('=========================================');
      newLogs.push('>> Enter your choice [1-8]: ');
      setStep('MENU');
    } else if (step === 'SEARCH_ROLL') {
      const found = localStudents.find((s) => s.rollNo.toLowerCase() === trimmed.toLowerCase());
      if (found) {
        newLogs.push('------------------ STUDENT RECORD FOUND ------------------');
        newLogs.push(` Name        : ${found.name}`);
        newLogs.push(` Roll Number : ${found.rollNo}`);
        newLogs.push(` Branch      : ${found.branch} (Semester ${found.semester})`);
        newLogs.push(` CGPA        : ${found.cgpa.toFixed(2)} / 10.0`);
        newLogs.push(` Attendance  : ${found.attendancePercentage}%`);
        newLogs.push(` Fee Status  : ${found.feeStatus}`);
        newLogs.push('----------------------------------------------------------');
      } else {
        newLogs.push(` Error: No student found with Roll Number: ${trimmed}`);
      }
      newLogs.push('>> Enter your choice [1-8]: ');
      setStep('MENU');
    } else if (step === 'DELETE_ROLL') {
      const exists = localStudents.some((s) => s.rollNo.toLowerCase() === trimmed.toLowerCase());
      if (exists) {
        setLocalStudents((prev) => prev.filter((s) => s.rollNo.toLowerCase() !== trimmed.toLowerCase()));
        newLogs.push(` SUCCESS: Student with Roll Number ${trimmed} deleted.`);
      } else {
        newLogs.push(` Error: Student with Roll Number ${trimmed} not found.`);
      }
      newLogs.push('>> Enter your choice [1-8]: ');
      setStep('MENU');
    }

    setLogs(newLogs);
    setInputVal('');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    handleCommand(inputVal);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 font-mono">
              Live Java CLI Simulator
            </span>
            <span className="text-xs text-slate-500 font-medium">Scanner &amp; OOP Console Interface</span>
          </div>
          <h2 className="text-lg font-bold text-slate-900 mt-1.5 flex items-center space-x-2">
            <TerminalIcon className="w-5 h-5 text-blue-600" />
            <span>Interactive Java Console Terminal</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Test the Java console application live in the browser with interactive menu navigation.
          </p>
        </div>

        <button
          onClick={initConsole}
          className="flex items-center space-x-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs rounded-lg transition-colors cursor-pointer shrink-0 border border-slate-200"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Restart JVM Process</span>
        </button>
      </div>

      {/* Quick Menu Triggers */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-2">
        <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          Quick Action Buttons (Instant CLI Menu Triggers)
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleCommand('2')}
            className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs rounded-lg border border-slate-200 font-medium transition-colors cursor-pointer"
          >
            [2] View All Students
          </button>
          <button
            onClick={() => handleCommand('4')}
            className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-blue-700 text-xs rounded-lg border border-slate-200 font-medium transition-colors cursor-pointer"
          >
            [4] CGPA Merit List
          </button>
          <button
            onClick={() => handleCommand('5')}
            className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-rose-600 text-xs rounded-lg border border-slate-200 font-medium transition-colors cursor-pointer"
          >
            [5] Attendance Defaulters
          </button>
          <button
            onClick={() => handleCommand('6')}
            className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs rounded-lg border border-slate-200 font-medium transition-colors cursor-pointer"
          >
            [6] College Statistics
          </button>
          <button
            onClick={() => handleCommand('1')}
            className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs rounded-lg border border-blue-200 font-semibold transition-colors cursor-pointer"
          >
            [1] Register Student
          </button>
        </div>
      </div>

      {/* Terminal Window */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg font-mono text-xs">
        {/* Terminal Header Bar */}
        <div className="bg-slate-950 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="text-[11px] text-slate-400 ml-2 font-sans font-medium">
              bash - java com.college.main.StudentManagementSystem (JVM 21)
            </span>
          </div>
          <div className="flex items-center space-x-2 text-[11px] text-green-400">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span>JVM Running</span>
          </div>
        </div>

        {/* Terminal Logs View */}
        <div className="p-4 sm:p-6 max-h-[460px] min-h-[340px] overflow-y-auto space-y-1 text-slate-300 leading-relaxed">
          {logs.map((log, index) => (
            <div
              key={index}
              className={`${
                log.startsWith('>') ? 'text-blue-400 font-bold' :
                log.includes('SUCCESS') ? 'text-green-400 font-semibold' :
                log.includes('Error') || log.includes('SHORTAGE') ? 'text-rose-400' :
                'text-slate-300'
              }`}
            >
              {log}
            </div>
          ))}
          <div ref={terminalEndRef} />
        </div>

        {/* Terminal Input Bar */}
        <form onSubmit={handleFormSubmit} className="bg-slate-950 p-3 border-t border-slate-800 flex items-center space-x-2">
          <span className="text-green-400 font-bold select-none pl-2">$</span>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type command or option number [1-8] and press Enter..."
            className="flex-1 bg-transparent text-white font-mono text-xs focus:outline-none placeholder-slate-500"
            autoFocus
          />
          <button
            type="submit"
            className="p-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
