import React, { useState } from 'react';
import { 
  BookOpen, 
  Plus, 
  Search, 
  ArrowRightLeft, 
  X
} from 'lucide-react';
import { LibraryBook, Student } from '../types';

interface LibraryManagerProps {
  books: LibraryBook[];
  students: Student[];
  onIssueBook: (bookId: string, studentId: string, dueDate: string) => void;
  onReturnBook: (bookId: string, issueId: string) => void;
  onAddBook: (book: LibraryBook) => void;
}

export const LibraryManager: React.FC<LibraryManagerProps> = ({
  books,
  students,
  onIssueBook,
  onReturnBook,
  onAddBook
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBookForIssue, setSelectedBookForIssue] = useState<LibraryBook | null>(null);
  const [isAddBookOpen, setIsAddBookOpen] = useState(false);

  const [issueStudentId, setIssueStudentId] = useState<string>(students[0]?.id || '');
  const [issueDueDate, setIssueDueDate] = useState<string>(
    new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );

  const [newBookForm, setNewBookForm] = useState({
    isbn: '',
    title: '',
    author: '',
    category: 'Computer Science',
    publisher: 'Pearson / McGraw-Hill',
    edition: '1st Edition',
    totalCopies: 10,
    shelfLocation: 'Rack CS-01'
  });

  const filteredBooks = books.filter((b) => 
    b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.isbn.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleIssueSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBookForIssue || !issueStudentId) return;
    onIssueBook(selectedBookForIssue.id, issueStudentId, issueDueDate);
    setSelectedBookForIssue(null);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBook: LibraryBook = {
      id: `LIB${Date.now().toString().slice(-4)}`,
      isbn: newBookForm.isbn,
      title: newBookForm.title,
      author: newBookForm.author,
      category: newBookForm.category,
      publisher: newBookForm.publisher,
      edition: newBookForm.edition,
      totalCopies: newBookForm.totalCopies,
      availableCopies: newBookForm.totalCopies,
      shelfLocation: newBookForm.shelfLocation,
      issues: []
    };
    onAddBook(newBook);
    setIsAddBookOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <span>Digital Library &amp; Book Circulation</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            ISBN cataloging, copy availability, book issuing/return registers, and circulation tracking.
          </p>
        </div>

        <button
          onClick={() => setIsAddBookOpen(true)}
          className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs sm:text-sm rounded-lg shadow-xs transition-colors cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Book Title</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by Book Title, Author, or ISBN..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none text-xs sm:text-sm"
          />
        </div>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredBooks.map((book) => (
          <div key={book.id} className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between space-y-4 shadow-xs hover:border-blue-300 transition-all">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {book.isbn}
                </span>
                <span className="text-[11px] text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                  {book.shelfLocation}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 mt-2.5 line-clamp-1">
                {book.title}
              </h3>
              <p className="text-xs text-slate-600 mt-0.5 font-medium">By {book.author}</p>
              <div className="text-xs text-slate-400 mt-1">{book.publisher} • {book.edition}</div>

              {/* Stock Status */}
              <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">Available Copies:</span>
                <span className={`font-mono font-bold ${book.availableCopies > 0 ? 'text-green-700' : 'text-rose-600'}`}>
                  {book.availableCopies} of {book.totalCopies}
                </span>
              </div>

              {/* Active Issues (If Any) */}
              {book.issues.length > 0 && (
                <div className="mt-3 space-y-1.5 pt-2 border-t border-slate-100">
                  <span className="text-[10px] uppercase font-bold text-slate-500">Currently Borrowed By:</span>
                  {book.issues.map((iss) => (
                    <div key={iss.id} className="p-2 rounded bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-semibold text-slate-900">{iss.studentName} ({iss.rollNo})</div>
                        <div className="text-slate-500 text-[11px]">Due: {iss.dueDate}</div>
                      </div>
                      <button
                        onClick={() => onReturnBook(book.id, iss.id)}
                        className="px-2 py-1 bg-green-50 hover:bg-green-100 text-green-700 border border-green-200 text-xs font-semibold rounded transition-colors cursor-pointer"
                      >
                        Return
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                disabled={book.availableCopies === 0}
                onClick={() => setSelectedBookForIssue(book)}
                className={`w-full py-2 rounded-lg font-medium text-xs sm:text-sm transition-colors flex items-center justify-center space-x-1.5 ${
                  book.availableCopies > 0
                    ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer shadow-xs'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
              >
                <ArrowRightLeft className="w-3.5 h-3.5" />
                <span>{book.availableCopies > 0 ? 'Issue to Student' : 'Out of Stock'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Issue Book Modal */}
      {selectedBookForIssue && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="font-mono text-xs text-blue-600 font-bold">{selectedBookForIssue.isbn}</span>
                <h3 className="text-base font-bold text-slate-900">Issue Library Book</h3>
              </div>
              <button onClick={() => setSelectedBookForIssue(null)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleIssueSubmit} className="space-y-3.5 text-xs">
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <div className="font-bold text-slate-900 text-sm">{selectedBookForIssue.title}</div>
                <div className="text-slate-500 mt-0.5">Author: {selectedBookForIssue.author}</div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Select Student *</label>
                <select
                  value={issueStudentId}
                  onChange={(e) => setIssueStudentId(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  {students.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.rollNo} - {s.name} ({s.branch})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Due Return Date (14 Days Standard)</label>
                <input
                  type="date"
                  required
                  value={issueDueDate}
                  onChange={(e) => setIssueDueDate(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setSelectedBookForIssue(null)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg cursor-pointer shadow-xs"
                >
                  Confirm Issue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add New Book Modal */}
      {isAddBookOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                <span>Catalog New Library Book</span>
              </h3>
              <button onClick={() => setIsAddBookOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">ISBN Number *</label>
                  <input
                    type="text"
                    required
                    placeholder="978-0134685991"
                    value={newBookForm.isbn}
                    onChange={(e) => setNewBookForm({ ...newBookForm, isbn: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Total Copies</label>
                  <input
                    type="number"
                    min="1"
                    value={newBookForm.totalCopies}
                    onChange={(e) => setNewBookForm({ ...newBookForm, totalCopies: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Book Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Design Patterns: Elements of Reusable Object-Oriented Software"
                  value={newBookForm.title}
                  onChange={(e) => setNewBookForm({ ...newBookForm, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Author(s) *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Erich Gamma, Richard Helm"
                    value={newBookForm.author}
                    onChange={(e) => setNewBookForm({ ...newBookForm, author: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Shelf / Rack Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Rack A-06, CS Dept"
                    value={newBookForm.shelfLocation}
                    onChange={(e) => setNewBookForm({ ...newBookForm, shelfLocation: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddBookOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg cursor-pointer shadow-xs"
                >
                  Add to Catalog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
