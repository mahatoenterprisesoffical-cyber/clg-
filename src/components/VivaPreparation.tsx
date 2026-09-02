import React, { useState } from 'react';
import { 
  GraduationCap, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle, 
  Lightbulb, 
  Zap,
  Check
} from 'lucide-react';
import { VivaQuestion } from '../types';

interface VivaPreparationProps {
  questions: VivaQuestion[];
}

export const VivaPreparation: React.FC<VivaPreparationProps> = ({ questions = [] }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedId, setExpandedId] = useState<string | null>(questions[0]?.id || null);
  const [isQuizMode, setIsQuizMode] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [showQuizAnswer, setShowQuizAnswer] = useState(false);
  const [masteredIds, setMasteredIds] = useState<string[]>([]);

  // Collect unique categories
  const categories = ['All', ...Array.from(new Set(questions.map((q) => q.category)))];

  const filteredQuestions = questions.filter((q) => {
    const matchesSearch = 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (q.keyPoints || []).some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCat = selectedCategory === 'All' || q.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const markMastered = (id: string) => {
    if (!id) return;
    setMasteredIds((prev) => 
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const currentQuizQuestion = questions[quizIndex];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
              Exam &amp; Defense Ready
            </span>
            <span className="text-xs text-slate-500 font-medium">{masteredIds.length} of {questions.length} Mastered</span>
          </div>
          <h2 className="text-lg font-bold text-slate-900 mt-1.5 flex items-center space-x-2">
            <GraduationCap className="w-5 h-5 text-blue-600" />
            <span>Viva Voce &amp; Project Defense Preparation Guide</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Curated list of technical questions asked by external examiners with sample model answers.
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            onClick={() => {
              setIsQuizMode(!isQuizMode);
              setShowQuizAnswer(false);
              setQuizIndex(0);
            }}
            className={`flex items-center space-x-1.5 px-4 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer ${
              isQuizMode
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>{isQuizMode ? 'Exit Flashcards' : 'Flashcard Mode'}</span>
          </button>
        </div>
      </div>

      {/* Flashcard Quiz Mode */}
      {isQuizMode && currentQuizQuestion ? (
        <div className="bg-white border-2 border-blue-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl max-w-2xl mx-auto">
          <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-100 pb-3">
            <span className="font-bold text-blue-600 uppercase tracking-wider">
              Question {quizIndex + 1} of {questions.length}
            </span>
            <span className="bg-slate-50 px-2.5 py-1 rounded-md text-slate-700 font-medium border border-slate-200">
              {currentQuizQuestion.category}
            </span>
          </div>

          <div className="space-y-4">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
              {currentQuizQuestion.question}
            </h3>

            {showQuizAnswer ? (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="text-xs font-bold text-green-700 uppercase tracking-wider flex items-center space-x-1.5">
                  <CheckCircle className="w-4 h-4" />
                  <span>Model Answer for Examiner:</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {currentQuizQuestion.answer}
                </p>

                {currentQuizQuestion.keyPoints && currentQuizQuestion.keyPoints.length > 0 && (
                  <div className="pt-2 border-t border-slate-200 space-y-1">
                    <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">Key Viva Points to Mention:</span>
                    <ul className="space-y-1">
                      {currentQuizQuestion.keyPoints.map((pt, i) => (
                        <li key={i} className="text-xs text-slate-600 flex items-start space-x-1.5">
                          <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {currentQuizQuestion.codeSnippet && (
                  <pre className="p-3 bg-slate-900 rounded-lg text-blue-300 font-mono text-xs overflow-x-auto border border-slate-800">
                    {currentQuizQuestion.codeSnippet}
                  </pre>
                )}
              </div>
            ) : (
              <button
                onClick={() => setShowQuizAnswer(true)}
                className="w-full py-6 bg-slate-50 hover:bg-slate-100/80 border-2 border-dashed border-slate-200 hover:border-blue-300 rounded-xl text-center text-slate-600 text-xs font-medium transition-all cursor-pointer"
              >
                Click to Reveal Sample Answer &amp; Code Example
              </button>
            )}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              disabled={quizIndex === 0}
              onClick={() => {
                setQuizIndex(quizIndex - 1);
                setShowQuizAnswer(false);
              }}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-50 text-xs font-medium text-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              Previous
            </button>

            <button
              onClick={() => markMastered(currentQuizQuestion.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border flex items-center space-x-1.5 cursor-pointer ${
                masteredIds.includes(currentQuizQuestion.id)
                  ? 'bg-green-50 text-green-700 border-green-200 font-semibold'
                  : 'bg-white text-slate-600 border-slate-200 hover:text-slate-900'
              }`}
            >
              <CheckCircle className="w-3.5 h-3.5" />
              <span>{masteredIds.includes(currentQuizQuestion.id) ? 'Mastered!' : 'Mark as Mastered'}</span>
            </button>

            <button
              disabled={quizIndex === questions.length - 1}
              onClick={() => {
                setQuizIndex(quizIndex + 1);
                setShowQuizAnswer(false);
              }}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-xs font-medium text-white rounded-lg transition-colors shadow-xs cursor-pointer"
            >
              Next Question
            </button>
          </div>
        </div>
      ) : (
        /* Regular Interactive List Mode */
        <div className="space-y-4">
          {/* Filter and Search Bar */}
          <div className="flex flex-col sm:flex-row gap-3 bg-white border border-slate-200 rounded-xl p-4 shadow-xs text-xs">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search question, concept, JDBC, OOP, Streams..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg font-medium text-xs transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white shadow-xs font-semibold'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Questions Accordion */}
          <div className="space-y-3">
            {filteredQuestions.map((q) => {
              const isExpanded = expandedId === q.id;
              const isDone = masteredIds.includes(q.id);

              return (
                <div
                  key={q.id}
                  className={`bg-white border rounded-xl overflow-hidden transition-all shadow-xs ${
                    isExpanded ? 'border-blue-300 ring-1 ring-blue-100' : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div
                    onClick={() => toggleExpand(q.id)}
                    className="p-4 flex items-start justify-between gap-3 cursor-pointer select-none"
                  >
                    <div className="flex items-start space-x-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          markMastered(q.id);
                        }}
                        className={`mt-0.5 p-1 rounded-full border transition-colors cursor-pointer ${
                          isDone
                            ? 'bg-green-100 text-green-700 border-green-300'
                            : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-green-600'
                        }`}
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                      </button>

                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                            {q.category}
                          </span>
                          <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                            q.difficulty === 'Advanced' ? 'text-red-700 bg-red-50' :
                            q.difficulty === 'Intermediate' ? 'text-amber-700 bg-amber-50' :
                            'text-green-700 bg-green-50'
                          }`}>
                            {q.difficulty} • {q.frequency}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 leading-snug">
                          {q.question}
                        </h4>
                      </div>
                    </div>

                    <div className="text-slate-400 shrink-0 mt-1">
                      {isExpanded ? <ChevronUp className="w-5 h-5 text-blue-600" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="p-4 bg-slate-50/70 border-t border-slate-100 space-y-3 text-xs">
                      <div>
                        <div className="text-[11px] font-bold text-blue-700 uppercase tracking-wider mb-1 flex items-center space-x-1">
                          <Lightbulb className="w-3.5 h-3.5" />
                          <span>Detailed Explanation for Viva:</span>
                        </div>
                        <p className="text-slate-700 leading-relaxed">
                          {q.answer}
                        </p>
                      </div>

                      {q.keyPoints && q.keyPoints.length > 0 && (
                        <div className="space-y-1">
                          <span className="text-[10px] uppercase font-bold text-slate-500">Key Points to State:</span>
                          <ul className="space-y-1">
                            {q.keyPoints.map((pt, i) => (
                              <li key={i} className="text-xs text-slate-600 flex items-start space-x-1.5">
                                <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                                <span>{pt}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {q.codeSnippet && (
                        <div className="space-y-1">
                          <span className="text-[10px] uppercase font-bold text-slate-500">Java Implementation Example:</span>
                          <pre className="p-3 bg-slate-900 rounded-lg text-blue-300 font-mono text-xs overflow-x-auto border border-slate-800 leading-relaxed">
                            {q.codeSnippet}
                          </pre>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
