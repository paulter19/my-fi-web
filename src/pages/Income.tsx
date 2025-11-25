import { AddIncomeModal } from '@/components/AddIncomeModal';
import { EditIncomeModal } from '@/components/EditIncomeModal';
import { deleteIncome, type Income } from '@/store/slices/incomeSlice';
import type { RootState } from '@/store/store';
import { DollarSign, Edit2, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const Income = () => {
    const dispatch = useDispatch();
    const incomes = useSelector((state: RootState) => state.income.items);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedIncome, setSelectedIncome] = useState<Income | null>(null);
    const [frequencyFilter, setFrequencyFilter] = useState<'all' | 'monthly' | 'one-time'>('all');

    const filteredIncomes = incomes.filter(income => {
        return frequencyFilter === 'all' || income.frequency === frequencyFilter;
    });

    const handleEdit = (income: Income) => {
        setSelectedIncome(income);
        setIsEditModalOpen(true);
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this income source?')) {
            dispatch(deleteIncome(id));
        }
    };

    const totalMonthlyIncome = incomes
        .filter(i => i.frequency === 'monthly')
        .reduce((sum, i) => sum + i.amount, 0);

    const totalOneTimeIncome = incomes
        .filter(i => i.frequency === 'one-time')
        .reduce((sum, i) => sum + i.amount, 0);

    const totalIncome = incomes.reduce((sum, i) => sum + i.amount, 0);

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">Income</h1>
                    <p className="text-slate-600 dark:text-slate-400">Manage your income sources</p>
                </div>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="btn-primary flex items-center gap-2"
                >
                    <Plus size={20} />
                    Add Income
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="stat-card">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Income</span>
                        <DollarSign size={20} className="text-green-600" />
                    </div>
                    <div className="text-3xl font-bold text-green-600">
                        ${totalIncome.toLocaleString()}
                    </div>
                </div>

                <div className="stat-card">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Monthly Income</span>
                        <DollarSign size={20} className="text-indigo-600" />
                    </div>
                    <div className="text-3xl font-bold text-indigo-600">
                        ${totalMonthlyIncome.toLocaleString()}
                    </div>
                </div>

                <div className="stat-card">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">One-time Income</span>
                        <DollarSign size={20} className="text-purple-600" />
                    </div>
                    <div className="text-3xl font-bold text-purple-600">
                        ${totalOneTimeIncome.toLocaleString()}
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="card-glass p-4">
                <div className="flex gap-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mr-4 flex items-center">Filter:</label>
                    {(['all', 'monthly', 'one-time'] as const).map((f) => (
                        <button
                            key={f}
                            onClick={() => setFrequencyFilter(f)}
                            className={`px-4 py-2 rounded-lg font-medium capitalize transition-all ${frequencyFilter === f
                                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700'
                                }`}
                        >
                            {f === 'one-time' ? 'One-time' : f}
                        </button>
                    ))}
                </div>
            </div>

            {/* Income List */}
            <div className="card-glass p-6">
                {filteredIncomes.length === 0 ? (
                    <div className="text-center py-12">
                        <DollarSign size={64} className="mx-auto text-slate-300 dark:text-slate-600 mb-4" />
                        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">No income sources found</h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-6">
                            {frequencyFilter !== 'all'
                                ? 'Try adjusting your filters'
                                : 'Get started by adding your first income source'}
                        </p>
                        {frequencyFilter === 'all' && (
                            <button onClick={() => setIsAddModalOpen(true)} className="btn-primary">
                                <Plus size={20} className="inline mr-2" />
                                Add Your First Income Source
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="space-y-3">
                        {filteredIncomes.map((income) => (
                            <div
                                key={income.id}
                                className="flex items-center justify-between p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all"
                            >
                                <div className="flex items-center gap-4 flex-1">
                                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                                        <DollarSign size={24} className="text-white" />
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-semibold text-slate-900 dark:text-white">
                                                {income.title}
                                            </h3>
                                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300">
                                                {income.frequency === 'monthly' ? 'Monthly' : 'One-time'}
                                            </span>
                                        </div>
                                        <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                            {income.frequency === 'monthly' ? 'Recurring monthly' : 'One-time payment'}
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <div className="text-2xl font-bold text-green-600">
                                            ${income.amount.toLocaleString()}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 ml-4">
                                    <button
                                        onClick={() => handleEdit(income)}
                                        className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                                        title="Edit income source"
                                    >
                                        <Edit2 size={18} className="text-slate-600 dark:text-slate-400" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(income.id)}
                                        className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                                        title="Delete income source"
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
            <AddIncomeModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
            <EditIncomeModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} income={selectedIncome} />
        </div>
    );
};
