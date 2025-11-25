import { nanoid } from '@reduxjs/toolkit';
import { X } from 'lucide-react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTransaction } from '@/store/slices/transactionsSlice';

interface AddTransactionModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const CATEGORIES = ['Food', 'Transport', 'Entertainment', 'Shopping', 'Healthcare', 'Education', 'Salary', 'Freelance', 'Investment', 'Other'];

export const AddTransactionModal: React.FC<AddTransactionModalProps> = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [category, setCategory] = useState('Food');
    const [type, setType] = useState<'income' | 'expense'>('expense');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !amount || !date) return;

        dispatch(addTransaction({
            id: nanoid(),
            title,
            amount: parseFloat(amount),
            date,
            category,
            type,
        }));

        // Reset form
        setTitle('');
        setAmount('');
        setDate(new Date().toISOString().split('T')[0]);
        setCategory('Food');
        setType('expense');
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
            <div className="card-glass w-full max-w-md p-6 shadow-xl animate-fade-in m-4" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Add Transaction</h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors">
                        <X size={24} className="text-slate-600 dark:text-slate-400" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Description</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="e.g. Grocery Shopping"
                            autoFocus
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Amount</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="0.00"
                            step="0.01"
                            min="0"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Type</label>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                onClick={() => setType('expense')}
                                className={`py-2 px-4 rounded-xl font-medium transition-all ${type === 'expense'
                                        ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg'
                                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700'
                                    }`}
                            >
                                Expense
                            </button>
                            <button
                                type="button"
                                onClick={() => setType('income')}
                                className={`py-2 px-4 rounded-xl font-medium transition-all ${type === 'income'
                                        ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg'
                                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700'
                                    }`}
                            >
                                Income
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Date</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Category</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            {CATEGORIES.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full btn-primary mt-6"
                    >
                        Add Transaction
                    </button>
                </form>
            </div>
        </div>
    );
};
