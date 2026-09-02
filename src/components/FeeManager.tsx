import React, { useState } from 'react';
import { 
  CreditCard, 
  Search, 
  Printer, 
  FileText, 
  X
} from 'lucide-react';
import { FeeInvoice } from '../types';

interface FeeManagerProps {
  fees: FeeInvoice[];
  onRecordPayment: (invoiceId: string, amount: number, method: string) => void;
}

export const FeeManager: React.FC<FeeManagerProps> = ({
  fees,
  onRecordPayment
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [selectedInvoiceForPayment, setSelectedInvoiceForPayment] = useState<FeeInvoice | null>(null);
  const [selectedInvoiceForReceipt, setSelectedInvoiceForReceipt] = useState<FeeInvoice | null>(null);

  const [paymentAmount, setPaymentAmount] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<string>('UPI / QR Code');

  const filteredFees = fees.filter((f) => {
    const matchesSearch = 
      f.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.rollNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.invoiceNo.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'All' || f.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const totalCollected = fees.reduce((acc, f) => acc + f.paidAmount, 0);
  const totalPending = fees.reduce((acc, f) => acc + (f.totalAmount - f.paidAmount), 0);

  const handleOpenPayment = (inv: FeeInvoice) => {
    setSelectedInvoiceForPayment(inv);
    setPaymentAmount(inv.totalAmount - inv.paidAmount);
  };

  const handleConfirmPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInvoiceForPayment) return;
    onRecordPayment(selectedInvoiceForPayment.id, paymentAmount, paymentMethod);
    setSelectedInvoiceForPayment(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
            <CreditCard className="w-5 h-5 text-blue-600" />
            <span>Tuition &amp; Examination Fee Accounting</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Semester billing invoices, payment processing, outstanding balance tracking, and university receipts.
          </p>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <div className="bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
            <span className="text-slate-500 font-medium">Total Collected: </span>
            <strong className="text-green-700 font-mono font-bold">₹{totalCollected.toLocaleString()}</strong>
          </div>
          <div className="bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
            <span className="text-slate-500 font-medium">Outstanding: </span>
            <strong className="text-rose-600 font-mono font-bold">₹{totalPending.toLocaleString()}</strong>
          </div>
        </div>
      </div>

      {/* Filter Row */}
      <div className="flex flex-col sm:flex-row gap-3 bg-white border border-slate-200 rounded-xl p-4 shadow-xs text-xs">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by Invoice No, Student Name, Roll No..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
        >
          <option value="All">All Statuses</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
          <option value="Partial">Partial</option>
          <option value="Overdue">Overdue</option>
        </select>
      </div>

      {/* Invoices Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="px-6 py-3.5">Invoice #</th>
                <th className="px-6 py-3.5">Student Details</th>
                <th className="px-6 py-3.5">Fee Breakdown</th>
                <th className="px-6 py-3.5">Total Amount</th>
                <th className="px-6 py-3.5">Paid Amount</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-slate-100">
              {filteredFees.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/75 transition-colors">
                  <td className="px-6 py-4 font-mono font-bold text-xs text-blue-700">
                    {inv.invoiceNo}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-900">{inv.studentName}</div>
                    <div className="text-xs text-slate-500">{inv.rollNo} • {inv.branch}</div>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-600">
                    <div>Tuition: ₹{inv.tuitionFee.toLocaleString()}</div>
                    <div>Lab + Exam: ₹{(inv.labFee + inv.examFee).toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 font-mono font-bold text-slate-900">
                    ₹{inv.totalAmount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 font-mono font-bold text-green-700">
                    ₹{inv.paidAmount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      inv.status === 'Paid' ? 'bg-green-100 text-green-700' :
                      inv.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                      inv.status === 'Partial' ? 'bg-blue-100 text-blue-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      {inv.status !== 'Paid' && (
                        <button
                          onClick={() => handleOpenPayment(inv)}
                          className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs rounded-md transition-colors cursor-pointer shadow-xs"
                        >
                          Collect Fee
                        </button>
                      )}
                      <button
                        onClick={() => setSelectedInvoiceForReceipt(inv)}
                        className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
                        title="Print Official Receipt"
                      >
                        <FileText className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Collect Fee Payment Modal */}
      {selectedInvoiceForPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="font-mono text-xs text-blue-600 font-bold">{selectedInvoiceForPayment.invoiceNo}</span>
                <h3 className="text-base font-bold text-slate-900">Record Fee Payment</h3>
              </div>
              <button onClick={() => setSelectedInvoiceForPayment(null)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleConfirmPayment} className="space-y-3.5 text-xs">
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <div className="font-semibold text-slate-900">{selectedInvoiceForPayment.studentName} ({selectedInvoiceForPayment.rollNo})</div>
                <div className="text-slate-500 mt-1 flex justify-between">
                  <span>Total Bill: ₹{selectedInvoiceForPayment.totalAmount.toLocaleString()}</span>
                  <span>Paid: ₹{selectedInvoiceForPayment.paidAmount.toLocaleString()}</span>
                </div>
                <div className="text-blue-700 font-bold mt-1 text-sm">
                  Remaining Due: ₹{(selectedInvoiceForPayment.totalAmount - selectedInvoiceForPayment.paidAmount).toLocaleString()}
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Amount to Pay (₹) *</label>
                <input
                  type="number"
                  required
                  min="1"
                  max={selectedInvoiceForPayment.totalAmount - selectedInvoiceForPayment.paidAmount}
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono font-bold focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Payment Method</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="UPI / QR Code">UPI (Google Pay / PhonePe / Paytm)</option>
                  <option value="Net Banking / NEFT">Net Banking / NEFT / RTGS</option>
                  <option value="Credit / Debit Card">Credit / Debit Card</option>
                  <option value="Demand Draft / Cash">Demand Draft / Campus Cash Counter</option>
                </select>
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setSelectedInvoiceForPayment(null)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-medium rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg cursor-pointer shadow-xs"
                >
                  Confirm Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Official Fee Receipt Modal */}
      {selectedInvoiceForReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white text-slate-900 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl border border-slate-200">
            {/* College Header */}
            <div className="text-center border-b border-slate-200 pb-4">
              <h2 className="text-lg font-black tracking-tight text-slate-900 uppercase">
                National Institute of Engineering &amp; Technology
              </h2>
              <p className="text-xs text-slate-500">Accredited by AICTE / Affiliated to State Technological University</p>
              <div className="mt-2 inline-block px-3 py-0.5 bg-blue-600 text-white text-[11px] font-bold rounded uppercase tracking-wider">
                Official Fee Payment Receipt
              </div>
            </div>

            {/* Receipt Metadata */}
            <div className="grid grid-cols-2 gap-2 text-xs border-b border-slate-200 pb-3">
              <div><strong>Receipt / Inv No:</strong> {selectedInvoiceForReceipt.invoiceNo}</div>
              <div className="text-right"><strong>Date:</strong> {selectedInvoiceForReceipt.paymentDate || new Date().toISOString().split('T')[0]}</div>
              <div><strong>Student Name:</strong> {selectedInvoiceForReceipt.studentName}</div>
              <div className="text-right"><strong>Roll No:</strong> {selectedInvoiceForReceipt.rollNo}</div>
              <div><strong>Branch:</strong> {selectedInvoiceForReceipt.branch}</div>
              <div className="text-right"><strong>Semester:</strong> Semester {selectedInvoiceForReceipt.semester}</div>
            </div>

            {/* Fee Items Table */}
            <table className="w-full text-xs text-left border border-slate-200">
              <thead className="bg-slate-50 font-bold border-b border-slate-200 text-slate-700">
                <tr>
                  <th className="p-2">Particulars / Head</th>
                  <th className="p-2 text-right">Amount (INR)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="p-2 text-slate-800">Semester Tuition &amp; Academic Instruction Fee</td>
                  <td className="p-2 text-right font-mono">₹{selectedInvoiceForReceipt.tuitionFee.toLocaleString()}</td>
                </tr>
                <tr>
                  <td className="p-2 text-slate-800">Laboratory &amp; Computing Infrastructure Fee</td>
                  <td className="p-2 text-right font-mono">₹{selectedInvoiceForReceipt.labFee.toLocaleString()}</td>
                </tr>
                <tr>
                  <td className="p-2 text-slate-800">University Examination &amp; Evaluation Fee</td>
                  <td className="p-2 text-right font-mono">₹{selectedInvoiceForReceipt.examFee.toLocaleString()}</td>
                </tr>
                <tr>
                  <td className="p-2 text-slate-800">Digital Library &amp; IEEE E-Journal Access</td>
                  <td className="p-2 text-right font-mono">₹{selectedInvoiceForReceipt.libraryFee.toLocaleString()}</td>
                </tr>
                <tr className="bg-slate-50 font-bold text-slate-900">
                  <td className="p-2">Total Invoiced Amount</td>
                  <td className="p-2 text-right font-mono">₹{selectedInvoiceForReceipt.totalAmount.toLocaleString()}</td>
                </tr>
                <tr className="font-bold text-green-800 bg-green-50">
                  <td className="p-2">Amount Paid Received</td>
                  <td className="p-2 text-right font-mono">₹{selectedInvoiceForReceipt.paidAmount.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>

            <div className="text-xs flex justify-between items-end pt-4 border-t border-slate-200">
              <div>
                <div><strong>Payment Mode:</strong> {selectedInvoiceForReceipt.paymentMethod || 'Online Transfer'}</div>
                <div className="text-[10px] text-slate-500 mt-1">Status: {selectedInvoiceForReceipt.status.toUpperCase()}</div>
              </div>
              <div className="text-center">
                <div className="w-28 border-b border-slate-900 pb-8 text-[10px] text-slate-500 font-semibold">
                  Authorized Signatory
                </div>
                <span className="text-[10px] font-bold text-slate-700">Accounts Officer</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-3 no-print">
              <button
                onClick={() => setSelectedInvoiceForReceipt(null)}
                className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-medium rounded-lg hover:bg-slate-200 cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg flex items-center space-x-1.5 cursor-pointer shadow-xs"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Receipt</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
