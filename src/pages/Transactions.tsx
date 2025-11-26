import { AddTransactionModal } from '@/components/AddTransactionModal';
import { EditTransactionModal } from '@/components/EditTransactionModal';
import { deleteTransaction, type Transaction } from '@/store/slices/transactionsSlice';
import type { RootState } from '@/store/store';
import { ArrowDownLeft, ArrowUpRight, Edit2, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const Transactions = () => {
    const dispatch = useDispatch();
    const transactions = useSelector((state: RootState) => state.transactions.items);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
    const [typeFilter, setTypeFilter] = useState<'all' | 'income' | 'expense'>('all');

    // Sort by date (newest first)
    const sortedTransactions = [...transactions].sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    const filteredTransactions = sortedTransactions.filter(transaction => {
        return typeFilter === 'all' || transaction.type === typeFilter;
    });

    const handleEdit = (transaction: Transaction) => {
        setSelectedTransaction(transaction);
        setIsEditModalOpen(true);
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this transaction?')) {
            dispatch(deleteTransaction(id));
        }
    };

    const totalIncome = transactions.filter((t: Transaction) => t.type === 'income').reduce((sum: number, t: Transaction) => sum + t.amount, 0);
    const totalExpenses = transactions.filter((t: Transaction) => t.type === 'expense').reduce((sum: number, t: Transaction) => sum + t.amount, 0);
    const netAmount = totalIncome - totalExpenses;

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">Transactions</h1>
                    <p className="text-slate-600 dark:text-slate-400">Track all your income and expenses</p>
                </div>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="btn-primary flex items-center gap-2"
                >
                    <Plus size={20} />
                    Add Transaction
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="stat-card">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Income</span>
                        <ArrowDownLeft size={20} className="text-green-600" />
                    </div>
                    <div className="text-3xl font-bold text-green-600">
                        ${totalIncome.toLocaleString()}
                    </div>
                </div>

                <div className="stat-card">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Expenses</span>
                        <ArrowUpRight size={20} className="text-red-600" />
                    </div>
                    <div className="text-3xl font-bold text-red-600">
                        ${totalExpenses.toLocaleString()}
                    </div>
                </div>

                <div className="stat-card">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Net Amount</span>
                    </div>
                    <div className={`text-3xl font-bold ${netAmount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        ${netAmount.toLocaleString()}
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="card-glass p-4">
                <div className="flex gap-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mr-4 flex items-center">Filter:</label>
                    {(['all', 'income', 'expense'] as const).map((f) => (
                        <button
                            key={f}
                            onClick={() => setTypeFilter(f)}
                            className={`px-4 py-2 rounded-lg font-medium capitalize transition-all ${typeFilter === f
                                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700'
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {/* Transactions List */}
            <div className="card-glass p-6">
                {filteredTransactions.length === 0 ? (
                    <div className="text-center py-12">
                        <ArrowUpRight size={64} className="mx-auto text-slate-300 dark:text-slate-600 mb-4" />
                        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">No transactions found</h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-6">
                            {typeFilter !== 'all'
                                ? 'Try adjusting your filters'
                                : 'Get started by adding your first transaction'}
                        </p>
                        {typeFilter === 'all' && (
                            <button onClick={() => setIsAddModalOpen(true)} className="btn-primary">
                                <Plus size={20} className="inline mr-2" />
                                Add Your First Transaction
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="space-y-3">
                        {filteredTransactions.map((transaction) => (
                            <div
                                key={transaction.id}
                                className="flex items-center justify-between p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all"
                            >
                                <div className="flex items-center gap-4 flex-1">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${transaction.type === 'income'
                                        ? 'bg-green-100 dark:bg-green-900/30'
                                        : 'bg-red-100 dark:bg-red-900/30'
                                        }`}>
                                        {transaction.type === 'income' ? (
                                            <ArrowDownLeft size={24} className="text-green-600" />
                                        ) : (
                                            <ArrowUpRight size={24} className="text-red-600" />
                                        )}
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-semibold text-slate-900 dark:text-white">
                                                {transaction.title}
                                            </h3>
                                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                                                {transaction.category}
                                            </span>
                                        </div>
                                        <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                            {new Date(transaction.date).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <div className={`text-2xl font-bold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                                            }`}>
                                            {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toLocaleString()}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 ml-4">
                                    <button
                                        onClick={() => handleEdit(transaction)}
                                        className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                                        title="Edit transaction"
                                    >
                                        <Edit2 size={18} className="text-slate-600 dark:text-slate-400" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(transaction.id)}
                                        className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                                        title="Delete transaction"
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
            <AddTransactionModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
            <EditTransactionModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} transaction={selectedTransaction} />
        </div>
    );
};
