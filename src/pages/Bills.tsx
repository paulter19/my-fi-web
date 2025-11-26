import { AddBillModal } from '@/components/AddBillModal';
import { EditBillModal } from '@/components/EditBillModal';
import { deleteBill, toggleBillPaid, type Bill } from '@/store/slices/billsSlice';
import type { RootState } from '@/store/store';
import { Check, Edit2, Plus, Receipt, Trash2, X } from 'lucide-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const Bills = () => {
    const dispatch = useDispatch();
    const bills = useSelector((state: RootState) => state.bills.items);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
    const [filter, setFilter] = useState<'all' | 'paid' | 'unpaid'>('all');
    const [typeFilter, setTypeFilter] = useState<'all' | 'monthly' | 'one-time'>('all');

    const filteredBills = bills.filter((bill: Bill) => {
        const statusMatch = filter === 'all' || (filter === 'paid' ? bill.isPaid : !bill.isPaid);
        const typeMatch = typeFilter === 'all' || bill.type === typeFilter;
        return statusMatch && typeMatch;
    });

    const handleEdit = (bill: Bill) => {
        setSelectedBill(bill);
        setIsEditModalOpen(true);
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this bill?')) {
            dispatch(deleteBill(id));
        }
    };

    const handleTogglePaid = (id: string) => {
        dispatch(toggleBillPaid(id));
    };

    const totalBills = filteredBills.reduce((sum: number, bill: Bill) => sum + bill.amount, 0);
    const paidBills = filteredBills.filter((b: Bill) => b.isPaid).reduce((sum: number, bill: Bill) => sum + bill.amount, 0);
    const unpaidBills = totalBills - paidBills;

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">Bills</h1>
                    <p className="text-slate-600 dark:text-slate-400">Manage your recurring and one-time bills</p>
                </div>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="btn-primary flex items-center gap-2"
                >
                    <Plus size={20} />
                    Add Bill
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="stat-card">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Bills</span>
                        <Receipt size={20} className="text-indigo-600" />
                    </div>
                    <div className="text-3xl font-bold text-slate-900 dark:text-white">
                        ${totalBills.toLocaleString()}
                    </div>
                </div>

                <div className="stat-card">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Paid</span>
                        <Check size={20} className="text-green-600" />
                    </div>
                    <div className="text-3xl font-bold text-green-600">
                        ${paidBills.toLocaleString()}
                    </div>
                </div>

                <div className="stat-card">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Unpaid</span>
                        <X size={20} className="text-red-600" />
                    </div>
                    <div className="text-3xl font-bold text-red-600">
                        ${unpaidBills.toLocaleString()}
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="card-glass p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Status</label>
                        <div className="flex gap-2">
                            {(['all', 'paid', 'unpaid'] as const).map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setFilter(f)}
                                    className={`px-4 py-2 rounded-lg font-medium capitalize transition-all ${filter === f
                                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700'
                                        }`}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1">
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Type</label>
                        <div className="flex gap-2">
                            {(['all', 'monthly', 'one-time'] as const).map((t) => (
                                <button
                                    key={t}
                                    onClick={() => setTypeFilter(t)}
                                    className={`px-4 py-2 rounded-lg font-medium capitalize transition-all ${typeFilter === t
                                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700'
                                        }`}
                                >
                                    {t === 'one-time' ? 'One-time' : t}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bills List */}
            <div className="card-glass p-6">
                {filteredBills.length === 0 ? (
                    <div className="text-center py-12">
                        <Receipt size={64} className="mx-auto text-slate-300 dark:text-slate-600 mb-4" />
                        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">No bills found</h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-6">
                            {filter !== 'all' || typeFilter !== 'all'
                                ? 'Try adjusting your filters'
                                : 'Get started by adding your first bill'}
                        </p>
                        {filter === 'all' && typeFilter === 'all' && (
                            <button onClick={() => setIsAddModalOpen(true)} className="btn-primary">
                                <Plus size={20} className="inline mr-2" />
                                Add Your First Bill
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="space-y-3">
                        {filteredBills.map((bill: Bill) => (
                            <div
                                key={bill.id}
                                className="flex items-center justify-between p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all"
                            >
                                <div className="flex items-center gap-4 flex-1">
                                    <button
                                        onClick={() => handleTogglePaid(bill.id)}
                                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${bill.isPaid
                                            ? 'bg-green-500 border-green-500'
                                            : 'border-slate-300 dark:border-slate-600 hover:border-green-500'
                                            }`}
                                    >
                                        {bill.isPaid && <Check size={16} className="text-white" />}
                                    </button>

                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <h3 className={`font-semibold text-slate-900 dark:text-white ${bill.isPaid ? 'line-through opacity-60' : ''}`}>
                                                {bill.title}
                                            </h3>
                                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300">
                                                {bill.type === 'monthly' ? 'Monthly' : 'One-time'}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-4 mt-1 text-sm text-slate-600 dark:text-slate-400">
                                            <span>{bill.category}</span>
                                            <span>•</span>
                                            <span>Due: {bill.type === 'monthly' ? `Day ${bill.dueDate}` : bill.dueDate}</span>
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <div className={`text-2xl font-bold ${bill.isPaid ? 'text-green-600' : 'text-red-600'}`}>
                                            ${bill.amount.toLocaleString()}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 ml-4">
                                    <button
                                        onClick={() => handleEdit(bill)}
                                        className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                                        title="Edit bill"
                                    >
                                        <Edit2 size={18} className="text-slate-600 dark:text-slate-400" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(bill.id)}
                                        className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                                        title="Delete bill"
                                    >
                                        <Trash2 size={18} className="text-red-600" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Modals */}
            <AddBillModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
            <EditBillModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} bill={selectedBill} />
        </div>
    );
};
