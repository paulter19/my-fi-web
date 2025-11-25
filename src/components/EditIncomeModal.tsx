import { X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateIncome, type Income } from '@/store/slices/incomeSlice';

interface EditIncomeModalProps {
    isOpen: boolean;
    onClose: () => void;
    income: Income | null;
}

export const EditIncomeModal: React.FC<EditIncomeModalProps> = ({ isOpen, onClose, income }) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [frequency, setFrequency] = useState<'monthly' | 'one-time'>('monthly');

    useEffect(() => {
        if (income) {
            setTitle(income.title);
            setAmount(income.amount.toString());
            setFrequency(income.frequency);
        }
    }, [income]);

    if (!isOpen || !income) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !amount) return;

        dispatch(updateIncome({
            id: income.id,
            title,
            amount: parseFloat(amount),
            frequency,
        }));

        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
            <div className="card-glass w-full max-w-md p-6 shadow-xl animate-fade-in m-4" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Edit Income Source</h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors">
                        <X size={24} className="text-slate-600 dark:text-slate-400" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Income Source</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="e.g. Full-time Job, Freelance"
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
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Frequency</label>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                onClick={() => setFrequency('monthly')}
                                className={`py-2 px-4 rounded-xl font-medium transition-all ${frequency === 'monthly'
                                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700'
                                    }`}
                            >
                                Monthly
                            </button>
                            <button
                                type="button"
                                onClick={() => setFrequency('one-time')}
                                className={`py-2 px-4 rounded-xl font-medium transition-all ${frequency === 'one-time'
                                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700'
                                    }`}
                            >
                                One-time
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full btn-primary mt-6"
                    >
                        Update Income Source
                    </button>
                </form>
            </div>
        </div>
    );
};
