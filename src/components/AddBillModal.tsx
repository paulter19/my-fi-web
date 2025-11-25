import { nanoid } from '@reduxjs/toolkit';
import { X } from 'lucide-react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBill } from '@/store/slices/billsSlice';

interface AddBillModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const CATEGORIES = ['Housing', 'Utilities', 'Insurance', 'Transportation', 'Entertainment', 'Food', 'Healthcare', 'Other'];

export const AddBillModal: React.FC<AddBillModalProps> = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [category, setCategory] = useState('Utilities');
    const [type, setType] = useState<'monthly' | 'one-time'>('monthly');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !amount || !dueDate) return;

        dispatch(addBill({
            id: nanoid(),
            title,
            amount: parseFloat(amount),
            dueDate,
            category,
            isPaid: false,
            type,
        }));

        // Reset form
        setTitle('');
        setAmount('');
        setDueDate('');
        setCategory('Utilities');
        setType('monthly');
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
            <div className="card-glass w-full max-w-md p-6 shadow-xl animate-fade-in m-4" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Add Bill</h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors">
                        <X size={24} className="text-slate-600 dark:text-slate-400" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Bill Name</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="e.g. Rent, Electricity"
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
                                onClick={() => setType('monthly')}
                                className={`py-2 px-4 rounded-xl font-medium transition-all ${type === 'monthly'
                                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700'
                                    }`}
                            >
                                Monthly
                            </button>
                            <button
                                type="button"
                                onClick={() => setType('one-time')}
                                className={`py-2 px-4 rounded-xl font-medium transition-all ${type === 'one-time'
                                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700'
                                    }`}
                            >
                                One-time
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            {type === 'monthly' ? 'Day of Month' : 'Due Date'}
                        </label>
                        {type === 'monthly' ? (
                            <input
                                type="number"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                className="w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="1-31"
                                min="1"
                                max="31"
                                required
                            />
                        ) : (
                            <input
                                type="date"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                className="w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            />
                        )}
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
                        Add Bill
                    </button>
                </form>
            </div>
        </div>
    );
};
