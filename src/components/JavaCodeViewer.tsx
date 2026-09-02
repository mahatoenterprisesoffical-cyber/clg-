import React, { useState } from 'react';
import { 
  Copy, 
  Check, 
  Download, 
  FileCode, 
  Database, 
  Sparkles
} from 'lucide-react';
import { ProjectBlueprint, JavaFile } from '../types';

interface JavaCodeViewerProps {
  blueprint: ProjectBlueprint;
  allBlueprints: ProjectBlueprint[];
  onSelectBlueprint: (bp: ProjectBlueprint) => void;
  onQuickExport: () => void;
}

export const JavaCodeViewer: React.FC<JavaCodeViewerProps> = ({
  blueprint,
  allBlueprints,
  onSelectBlueprint,
  onQuickExport
}) => {
  const [selectedFileIndex, setSelectedFileIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [showSql, setShowSql] = useState(false);

  const currentFile: JavaFile = blueprint.files[selectedFileIndex] || blueprint.files[0];

  const handleCopy = () => {
    const textToCopy = showSql ? blueprint.databaseScript : currentFile.content;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadSingle = () => {
    const filename = showSql ? 'schema.sql' : currentFile.name;
    const content = showSql ? blueprint.databaseScript : currentFile.content;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header & Blueprint Selector */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 font-mono">
              Compilable Java 17+ OOP Source
            </span>
            <span className="text-xs text-slate-500 font-medium">{blueprint.techStack.join(' • ')}</span>
          </div>
          <h2 className="text-lg font-bold text-slate-900 mt-1.5">
            {blueprint.title}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Production-grade modular Java architecture ready for Eclipse, IntelliJ IDEA, or NetBeans IDE.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Project Switcher */}
          <select
            value={blueprint.id}
            onChange={(e) => {
              const bp = allBlueprints.find((b) => b.id === e.target.value);
              if (bp) {
                onSelectBlueprint(bp);
                setSelectedFileIndex(0);
                setShowSql(false);
              }
            }}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
          >
            {allBlueprints.map((b) => (
              <option key={b.id} value={b.id}>{b.shortTitle}</option>
            ))}
          </select>

          <button
            onClick={onQuickExport}
            className="flex items-center space-x-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download Project Bundle</span>
          </button>
        </div>
      </div>

      {/* OOP Concepts Checklist Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3 flex items-center space-x-1.5">
          <Sparkles className="w-4 h-4 text-blue-600" />
          <span>Core Object-Oriented Principles Implemented in this Project</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs">
          {blueprint.oopConcepts.map((concept, idx) => (
            <div key={idx} className="flex items-start space-x-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
              <span className="text-blue-600 font-bold">•</span>
              <span className="text-slate-700 font-medium">{concept}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Code Editor Studio Container */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
        {/* File Tabs Bar */}
        <div className="flex items-center justify-between bg-slate-950 px-3 border-b border-slate-800 overflow-x-auto">
          <div className="flex space-x-1 py-2">
            {blueprint.files.map((file, idx) => (
              <button
                key={file.name}
                onClick={() => {
                  setSelectedFileIndex(idx);
                  setShowSql(false);
                }}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-mono transition-all whitespace-nowrap cursor-pointer ${
                  !showSql && selectedFileIndex === idx
                    ? 'bg-slate-800 text-blue-400 border border-slate-700 font-bold shadow-xs'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <FileCode className="w-3.5 h-3.5" />
                <span>{file.name}</span>
              </button>
            ))}

            {blueprint.databaseScript && (
              <button
                onClick={() => setShowSql(true)}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-mono transition-all whitespace-nowrap cursor-pointer ${
                  showSql
                    ? 'bg-slate-800 text-blue-400 border border-slate-700 font-bold shadow-xs'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <Database className="w-3.5 h-3.5" />
                <span>schema.sql</span>
              </button>
            )}
          </div>

          <div className="flex items-center space-x-2 py-2 pl-3">
            <button
              onClick={handleCopy}
              className="flex items-center space-x-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-lg transition-colors cursor-pointer border border-slate-700"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Code'}</span>
            </button>
            <button
              onClick={handleDownloadSingle}
              className="flex items-center space-x-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-lg transition-colors cursor-pointer border border-slate-700"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </button>
          </div>
        </div>

        {/* File Description Banner */}
        <div className="bg-slate-900/80 px-4 py-2 border-b border-slate-800 text-xs text-slate-400 flex items-center justify-between font-mono">
          <span>{showSql ? 'database/schema.sql • DDL Table Definitions & Constraints' : currentFile.path}</span>
          <span className="text-blue-400 font-sans font-medium text-[11px]">
            {showSql ? 'MySQL / PostgreSQL DDL' : currentFile.description}
          </span>
        </div>

        {/* Syntax Highlighted Code Viewer */}
        <div className="p-4 overflow-x-auto max-h-[600px] overflow-y-auto text-xs leading-relaxed font-mono">
          <pre className="text-slate-200">
            <code>
              {(showSql ? blueprint.databaseScript : currentFile.content)
                .split('\n')
                .map((line, lineIndex) => (
                  <div key={lineIndex} className="table-row hover:bg-slate-800/50">
                    <span className="table-cell select-none pr-4 text-right text-slate-500 font-mono text-[11px] w-10">
                      {lineIndex + 1}
                    </span>
                    <span className="table-cell">{line}</span>
                  </div>
                ))}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};
