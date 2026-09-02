import React, { useState } from 'react';
import { 
  FileText, 
  Printer, 
  CheckCircle2, 
  Database
} from 'lucide-react';
import { projectReportData } from '../data/projectReport';

export const ProjectReportViewer: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('abstract');

  const report = projectReportData;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-xl p-5 shadow-xs no-print">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
              Academic Submission Documentation
            </span>
            <span className="text-xs text-slate-500 font-medium">Standard B.Tech / BCA / MCA / B.Sc IT Format</span>
          </div>
          <h2 className="text-lg font-bold text-slate-900 mt-1.5 flex items-center space-x-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <span>Complete Project Report &amp; Synopsis</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Full academic documentation with SRS, Data Dictionary, Test Cases, and Architecture.
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            onClick={handlePrint}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs sm:text-sm rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column: Interactive Table of Contents (Hidden on print) */}
        <div className="space-y-3 no-print">
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-1">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
              Table of Contents
            </h3>
            {[
              { id: 'cover', title: '1. Title & Cover Page' },
              { id: 'abstract', title: '2. Abstract & Objectives' },
              { id: 'srs', title: '3. Requirement Specs (SRS)' },
              { id: 'modules', title: '4. System Modules' },
              { id: 'db', title: '5. Database & Schema' },
              { id: 'testcases', title: '6. Test Cases & Verification' },
              { id: 'conclusion', title: '7. Conclusion & References' },
            ].map((sec) => (
              <button
                key={sec.id}
                onClick={() => setActiveSection(sec.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  activeSection === sec.id
                    ? 'bg-blue-600 text-white font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {sec.title}
              </button>
            ))}
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs text-xs text-slate-500 space-y-2">
            <div className="font-bold text-slate-800 flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span>Submission Ready</span>
            </div>
            <p className="leading-relaxed">
              This report adheres to standard IEEE / University guidelines for Major / Minor college software engineering project documentation.
            </p>
          </div>
        </div>

        {/* Right 3 Cols: Academic Paper View (Styled like a formal thesis/report) */}
        <div className="lg:col-span-3 bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 space-y-8 shadow-xs text-slate-800 text-xs sm:text-sm leading-relaxed">
          
          {/* Cover Page */}
          {(activeSection === 'cover' || activeSection === 'all') && (
            <div className="border-b border-slate-200 pb-8 text-center space-y-4">
              <div className="text-xs uppercase tracking-widest text-blue-700 font-bold">
                A Major Project Report on
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {report.title}
              </h1>
              <div className="text-xs text-slate-500">
                Submitted in partial fulfillment of the requirements for the Degree of
              </div>
              <div className="text-sm font-bold text-blue-700">
                Bachelor of Technology in Computer Science &amp; Engineering
              </div>

              <div className="pt-6 grid grid-cols-2 text-xs border-t border-slate-200 text-left">
                <div>
                  <div className="text-slate-500 font-semibold">Submitted By:</div>
                  <div className="font-bold text-slate-900 mt-1">Final Year Project Team</div>
                  <div className="text-slate-500">Roll Numbers: 22CS101 - 22CS104</div>
                </div>
                <div className="text-right">
                  <div className="text-slate-500 font-semibold">Under the Guidance of:</div>
                  <div className="font-bold text-slate-900 mt-1">Dr. S. K. Ramanathan, Ph.D.</div>
                  <div className="text-slate-500">Head of Department, CSE</div>
                </div>
              </div>
            </div>
          )}

          {/* Section 1: Abstract & Objectives */}
          {(activeSection === 'abstract' || activeSection === 'all') && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 border-b border-slate-200 pb-2">
                <span className="font-mono text-xs text-blue-700 font-bold">CHAPTER 1</span>
                <h2 className="text-base sm:text-lg font-bold text-slate-900">Abstract &amp; Project Scope</h2>
              </div>
              <p className="text-slate-700 leading-relaxed text-justify">
                {report.abstract}
              </p>

              <div className="pt-2 space-y-2">
                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                  Key Project Objectives:
                </h3>
                <ul className="list-disc list-inside space-y-1 text-slate-700">
                  {report.objectives.map((obj, i) => (
                    <li key={i}>{obj}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Section 2: SRS */}
          {(activeSection === 'srs' || activeSection === 'all') && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 border-b border-slate-200 pb-2">
                <span className="font-mono text-xs text-blue-700 font-bold">CHAPTER 2</span>
                <h2 className="text-base sm:text-lg font-bold text-slate-900">Software Requirement Specifications (SRS)</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                  <h4 className="font-bold text-blue-900 text-xs uppercase">Hardware Requirements</h4>
                  <ul className="list-disc list-inside text-xs text-slate-700 space-y-1">
                    {report.srs.hardware.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                  <h4 className="font-bold text-blue-900 text-xs uppercase">Software Requirements</h4>
                  <ul className="list-disc list-inside text-xs text-slate-700 space-y-1">
                    {report.srs.software.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <h4 className="font-bold text-slate-900 text-xs uppercase">Functional Requirements (FR)</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {report.srs.functional.map((f, i) => (
                    <div key={i} className="flex items-center space-x-2 p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                      <span className="text-slate-800">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Section 3: Modules */}
          {(activeSection === 'modules' || activeSection === 'all') && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 border-b border-slate-200 pb-2">
                <span className="font-mono text-xs text-blue-700 font-bold">CHAPTER 3</span>
                <h2 className="text-base sm:text-lg font-bold text-slate-900">System Architecture &amp; Module Breakdown</h2>
              </div>

              <div className="space-y-3">
                {report.modules.map((mod, i) => (
                  <div key={i} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
                    <div className="font-bold text-slate-900 text-xs sm:text-sm flex items-center justify-between">
                      <span>{mod.name}</span>
                      <span className="text-[10px] text-blue-700 font-mono font-bold">Module 0{i + 1}</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {mod.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 4: Database Design */}
          {(activeSection === 'db' || activeSection === 'all') && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 border-b border-slate-200 pb-2">
                <span className="font-mono text-xs text-blue-700 font-bold">CHAPTER 4</span>
                <h2 className="text-base sm:text-lg font-bold text-slate-900">Database Design &amp; Data Dictionary</h2>
              </div>

              <div className="space-y-4">
                {report.tables.map((tbl, i) => (
                  <div key={i} className="space-y-2">
                    <div className="font-mono text-xs font-bold text-blue-800 flex items-center space-x-1.5">
                      <Database className="w-3.5 h-3.5" />
                      <span>Table: {tbl.name} ({tbl.desc})</span>
                    </div>

                    <div className="overflow-x-auto border border-slate-200 rounded-lg">
                      <table className="w-full text-left text-xs bg-white">
                        <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                          <tr>
                            <th className="p-2.5">Field / Column Name</th>
                            <th className="p-2.5">Data Type</th>
                            <th className="p-2.5">Key / Constraint</th>
                            <th className="p-2.5">Description</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-700 font-mono text-xs">
                          {tbl.columns.map((col, cIdx) => (
                            <tr key={cIdx}>
                              <td className="p-2.5 text-slate-900 font-bold">{col.name}</td>
                              <td className="p-2.5 text-blue-700">{col.type}</td>
                              <td className="p-2.5 text-purple-700 font-semibold">{col.constraint}</td>
                              <td className="p-2.5 font-sans text-slate-600">{col.desc}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 5: Test Cases */}
          {(activeSection === 'testcases' || activeSection === 'all') && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 border-b border-slate-200 pb-2">
                <span className="font-mono text-xs text-blue-700 font-bold">CHAPTER 5</span>
                <h2 className="text-base sm:text-lg font-bold text-slate-900">System Testing &amp; Verification Matrix</h2>
              </div>

              <div className="overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left text-xs bg-white">
                  <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="p-2.5">Test ID</th>
                      <th className="p-2.5">Module Tested</th>
                      <th className="p-2.5">Input Test Data</th>
                      <th className="p-2.5">Expected Output</th>
                      <th className="p-2.5 text-center">Result</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700 text-xs">
                    {report.testCases.map((tc, idx) => (
                      <tr key={idx}>
                        <td className="p-2.5 font-mono font-bold text-blue-700">{tc.id}</td>
                        <td className="p-2.5 font-semibold text-slate-900">{tc.feature}</td>
                        <td className="p-2.5 font-mono text-slate-600">{tc.input}</td>
                        <td className="p-2.5 text-slate-600">{tc.expected}</td>
                        <td className="p-2.5 text-center">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-700">
                            {tc.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Section 6: Conclusion */}
          {(activeSection === 'conclusion' || activeSection === 'all') && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 border-b border-slate-200 pb-2">
                <span className="font-mono text-xs text-blue-700 font-bold">CHAPTER 6</span>
                <h2 className="text-base sm:text-lg font-bold text-slate-900">Conclusion &amp; Future Scope</h2>
              </div>
              <p className="text-slate-700 leading-relaxed text-justify">
                {report.conclusion}
              </p>

              <div className="pt-4 border-t border-slate-200 space-y-2">
                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                  References &amp; Bibliography:
                </h3>
                <ul className="list-decimal list-inside space-y-1 text-xs text-slate-600">
                  {report.references.map((ref, idx) => (
                    <li key={idx}>{ref}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
